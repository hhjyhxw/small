package com.icloud.modules.mpwx.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.model.Query;
import com.icloud.basecommon.service.redislock.DistributedLock;
import com.icloud.basecommon.service.redislock.DistributedLockUtil;
import com.icloud.basecommon.util.ExcelUtils;
import com.icloud.common.AppContext;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.UrlDownLoadUtils;
import com.icloud.common.util.StringUtil;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.mpwx.entity.MpwxReply;
import com.icloud.modules.mpwx.entity.MpwxReplyKeyword;
import com.icloud.modules.mpwx.service.MpwxReplyKeywordService;
import com.icloud.modules.mpwx.service.MpwxReplyService;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.*;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 * 菜单主连接： modules/mpwx/mpwxreply.html
 */
@Slf4j
@RestController
@RequestMapping("mpwx/mpwxreply")
public class MpwxReplyController {
    @Autowired
    private MpwxReplyService mpwxReplyService;
    @Autowired
    private MpwxReplyKeywordService mpwxReplyKeywordService;
    @Autowired
    private DistributedLockUtil distributedLockUtil;
    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("mpwx:mpwxreply:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = mpwxReplyService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("mpwx:mpwxreply:info")
    public R info(@PathVariable("id") Long id){
        MpwxReply mpwxReply = (MpwxReply)mpwxReplyService.getById(id);
        List<MpwxReplyKeyword> keywordList = mpwxReplyKeywordService.list(new QueryWrapper<MpwxReplyKeyword>().eq("reply_id",id));
        mpwxReply.setKeywordList(keywordList);
        return R.ok().put("mpwxReply", mpwxReply);
    }

    /**
     * 保存
     */
    @RequestMapping("/saveOrUpdate")
    @RequiresPermissions("mpwx:mpwxreply:save")
    public R saveOrUpdate(@RequestBody MpwxReply mpwxReply){
        log.info("mpwxReply==="+ JSON.toJSONString(mpwxReply));
        mpwxReplyService.saveOrUpdateReply(mpwxReply);

        return R.ok();
    }


    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("mpwx:mpwxreply:delete")
    public R delete(@RequestBody Long[] ids){
        mpwxReplyService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }

    /**
     * 批量导入
     */
    @RequestMapping("/importData")
    @RequiresPermissions("mpwx:mpwxreply:save")
    @ResponseBody
    public R importData(@RequestBody String fileurl){
        log.info("fileurl==="+fileurl);
        DistributedLock lock = distributedLockUtil.getDistributedLock("hyEmployee_dataImport");
        InputStream is = null;
        //用于记录错误信息
        String errorMsg = "";
        try {
            if (lock.acquire()) {
                log.warn("成功获取导入关键字锁...");
                //去掉字符串空格
                fileurl = fileurl.replace("\"", "");
                log.info("fileurl===" + fileurl);
                String tempbaseDir = AppContext.baseDirectory() + "/temp/";

                File filetempbaseDir = new File(tempbaseDir);
                if (!filetempbaseDir.exists()) {
                    filetempbaseDir.mkdirs();
                }
                File file = new File(tempbaseDir + "/" + UUID.randomUUID() + ".xls");
                UrlDownLoadUtils.dowmloadUrlResoure(file, fileurl);
                is = new FileInputStream(file);
                Workbook wb = null;
                //根据文件名判断文件是2003版本还是2007版本
                if(ExcelUtils.isExcel2007(file.getName())){
                    wb = new XSSFWorkbook(is);
                }else{
                    wb = new HSSFWorkbook(is);
                }
                //储存excel解析后的内容
                List<String[]> excelValues = new ArrayList<String[]>();
                //得到第一个shell
                Sheet sheet = wb.getSheetAt(0);
                //得到Excel的行数
                int totalRows = sheet.getPhysicalNumberOfRows();
                //总列数
                int totalCells = 0;
                //得到Excel的列数(前提是有行数)，从第二行算起
                if(totalRows >= 2 && sheet.getRow(1) != null){
                    totalCells = sheet.getRow(1).getPhysicalNumberOfCells();
                }
                log.warn("totalRows:{},totalCells:{}",totalRows,totalCells);

                //循环Excel行数,从第二行开始。标题不入库
                for(int r = 1;r < totalRows;r++){
                    Row row = sheet.getRow(r);
                    if (row == null){
                        errorMsg += "第"+(r+1)+"行数据有问题，请检查！";
                        continue;
                    }
                    String[] str = new String[totalCells];
                    //循环Excel的列
                    for(int c = 0; c <totalCells; c++){
                        Cell cell = row.getCell(c);
                        if(null != cell){
                            //先暂时把所有类型指定为String，避免出现Cannot get a text value from a numeric cell的异常错误
                            cell.setCellType(Cell.CELL_TYPE_STRING);
                            String cellValue = cell.getStringCellValue();
                            str[c] = cellValue;
                        }else{
                            errorMsg += "第" + (r+1) + "行,第" + (c + 1) + "列有空内容,请检查确认！";
                        }
                    }
                    excelValues.add(str);
                }

                if(!"".equals(errorMsg)){
                    log.warn("errmsg:{}",errorMsg);
                    R.error(errorMsg);
                }
                List<MpwxReply> list = new ArrayList<>();
                MpwxReply mpwxReply = null;
                List<MpwxReplyKeyword> keywordList = null;
                MpwxReplyKeyword mpwxReplyKeyword = null;
                for (int i = 0; i < excelValues.size(); i++) {
                    mpwxReply = new MpwxReply();
                    keywordList =  new ArrayList<MpwxReplyKeyword>();
                    mpwxReplyKeyword = new MpwxReplyKeyword();
                    String[] cells = excelValues.get(i);
                    //设置关键字
                    if (StringUtil.checkObj(cells[0])) {
                        if(cells[0].indexOf("\\|")>-1){
                            String[] keywordsarry = cells[0].split("\\|");
                            if(keywordsarry!=null && keywordsarry.length>1){
                                for (int j=0;i<keywordsarry.length;j++){
                                    if(StringUtil.checkObj(keywordsarry[j])){
                                        mpwxReplyKeyword= new MpwxReplyKeyword();
                                        mpwxReplyKeyword.setKeywords(keywordsarry[j]);
                                        keywordList.add(mpwxReplyKeyword);
                                    }
                                }
                            }
                        }else{
                            mpwxReplyKeyword.setKeywords(cells[0]);
                            keywordList.add(mpwxReplyKeyword);
                        }
                    }
                    //设置关键字描述
                    if (StringUtil.checkObj(cells[1])) {
                        mpwxReply.setKeywords(cells[1]);
                    }
                    //设置回复内容
                    if (StringUtil.checkObj(cells[4])) {
                        mpwxReply.setContent(cells[4]);
                    }
                    //设置回复类型
                    mpwxReply.setReplyType("1");
                    mpwxReply.setKeywordList(keywordList);
                    list.add(mpwxReply);
                }
                log.info("记录总数======"+ list.size());
                log.info("mpwxReplyLit==="+ JSON.toJSONString(list));
                mpwxReplyService.saveOrUpdateReplList(list);
                return R.ok();
            }else {
                log.warn("获取导入关键字锁失败...");
            }
        }catch (Exception e){
            e.printStackTrace();
            errorMsg = e.getMessage();
        } finally {
            if (lock != null) {
                lock.release();
                log.warn("释放导入关键字锁成功...");
            }
        }
        return R.error(errorMsg);

    }


}
