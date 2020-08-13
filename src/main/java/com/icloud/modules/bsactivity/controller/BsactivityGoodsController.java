package com.icloud.modules.bsactivity.controller;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.SysLog;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.common.ziputils.DownloadZip;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.bsactivity.entity.BsactivityGoods;
import com.icloud.modules.bsactivity.entity.BsactivityGoodsqcode;
import com.icloud.modules.bsactivity.service.BsactivityGoodsService;
import com.icloud.modules.bsactivity.service.BsactivityGoodsqcodeService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-17 15:11:05
 * 菜单主连接： modules/bsactivity/bsactivitygoods.html
 */
@RestController
@RequestMapping("bsactivity/bsactivitygoods")
public class BsactivityGoodsController {

    private Logger log = LoggerFactory.getLogger(getClass());


    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;
    @Autowired
    private BsactivityGoodsService bsactivityGoodsService;
    @Autowired
    private BsactivityGoodsqcodeService bsactivityGoodsqcodeService;
    @Autowired
    private MyPropertitys myPropertitys;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("bsactivity:bsactivitygoods:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = bsactivityGoodsService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("bsactivity:bsactivitygoods:info")
    public R info(@PathVariable("id") Long id){
        BsactivityGoods bsactivityGoods = (BsactivityGoods)bsactivityGoodsService.getById(id);

        return R.ok().put("bsactivityGoods", bsactivityGoods);
    }

    /**
     * 保存
     */
    @SysLog("保存商品")
    @RequestMapping("/save")
    @RequiresPermissions("bsactivity:bsactivitygoods:save")
    public R save(@RequestBody BsactivityGoods bsactivityGoods){
        bsactivityGoodsService.save(bsactivityGoods);

        return R.ok();
    }

    /**
     * 修改
     */
    @SysLog("修改商品")
    @RequestMapping("/update")
    @RequiresPermissions("bsactivity:bsactivitygoods:update")
    public R update(@RequestBody BsactivityGoods bsactivityGoods){
        ValidatorUtils.validateEntity(bsactivityGoods);
        bsactivityGoodsService.updateById(bsactivityGoods);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @SysLog("删除商品")
    @RequestMapping("/delete")
    @RequiresPermissions("bsactivity:bsactivitygoods:delete")
    public R delete(@RequestBody Long[] ids){
        bsactivityGoodsService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

    /**
     * 创建二维
     */
    @RequestMapping("/creatGoodsQcode")
    @RequiresPermissions("bsactivity:bsactivitygoods:update")
    public R creatGoodsQcode(@RequestBody BsactivityGoods bsactivityGoods){
        log.info("creatGoodsQcode_bsactivityGoods="+ JSON.toJSONString(bsactivityGoods));
        Long[] ids = bsactivityGoods.getIds();
        BsactivityGoods paramgoods = null;
        for (int i = 0; i <ids.length ; i++) {
            String basepath = request.getSession().getServletContext().getRealPath(myPropertitys.getUploadpath())+"/"+ids[i];
            File file = new File(basepath);
            if(!file.exists()){
                file.mkdirs();
            }
            paramgoods = new BsactivityGoods();
            paramgoods.setId(ids[i]);
            paramgoods.setGernerNum(bsactivityGoods.getGernerNum());
            List<BsactivityGoodsqcode> list = bsactivityGoodsqcodeService.createQcodeList(paramgoods,myPropertitys.getUploadpath(),basepath);
            log.info("creatGoodsQcode_list="+ JSON.toJSONString(list));
            bsactivityGoodsqcodeService.saveBatch(list);
        }
        return R.ok();
    }

    /**
     * 下载二维
     */
    @RequestMapping("/downLoadGoodsQcode")
    @RequiresPermissions("bsactivity:bsactivitygoods:update")
    public R downLoadGoodsQcode(@RequestBody BsactivityGoods bsactivityGoods){
        log.info("creatGoodsQcode_bsactivityGoods="+ JSON.toJSONString(bsactivityGoods));
        try {
            Long[] ids = bsactivityGoods.getIds();
            QueryWrapper<BsactivityGoods> queryWrapper = new QueryWrapper<BsactivityGoods>();
            queryWrapper.lambda().in(BsactivityGoods::getId, ids);
            List<BsactivityGoods> goodsList = bsactivityGoodsService.list(queryWrapper);

            ArrayList<String> pathlist = new ArrayList<String>();
            for (BsactivityGoods goods:goodsList) {
                QueryWrapper<BsactivityGoodsqcode> qcodeWrapper = new QueryWrapper<BsactivityGoodsqcode>();
                qcodeWrapper.lambda().eq(BsactivityGoodsqcode::getGoodsid, goods.getId());
                List<BsactivityGoodsqcode> qcodeList = bsactivityGoodsqcodeService.list(qcodeWrapper);

                for (int i = 0; i <qcodeList.size() ; i++) {
                    pathlist.add(request.getSession().getServletContext().getRealPath("/")+qcodeList.get(i).getImgpath());
                }
    //            new Thread(()-> DownloadZip.downloadZipFiles(response,pathlist,goods.getName())).start();

            }
            DownloadZip.downloadZipFiles(response,pathlist,"商品专属二维码.zip");

//            response.setContentType("APPLICATION/OCTET-STREAM");
//            response.setHeader("Content-Disposition","attachment; filename=专属二维码.zip");
//            ZipOutputStream out = null;
//            out = new ZipOutputStream(response.getOutputStream());
//
//            for (String filePath:pathlist) {
//                DownloadZip.doCompress(filePath, out);
//                response.flushBuffer();
//            }
//            return  R.ok();
        } catch (Exception e) {
            e.printStackTrace();
//            return  R.error();
        }
        return null;
    }

}
