package com.icloud.modules.mpwx.controller;

import com.alibaba.fastjson.JSON;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.exceptions.BaseException;
import com.icloud.modules.mpwx.entity.MpwxSucai;
import com.icloud.modules.mpwx.service.MpwxSucaiService;
import com.icloud.modules.mpwx.vo.sucai.WebSucaivo;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 * 菜单主连接： modules/mpwx/mpwxsucai.html
 */
@RestController
@RequestMapping("mpwx/mpwxsucai")
@Slf4j
public class MpwxSucaiController {
    @Autowired
    private MpwxSucaiService mpwxSucaiService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("mpwx:mpwxsucai:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = mpwxSucaiService.findByPage(query.getPageNum(),query.getPageSize(), query);
        List<MpwxSucai> list = page.getList();
        if(list!=null && list.size()>0){
            //对图文消息类进行转换
            list.stream().filter(p->{
                return "1".equals(p.getScType());//过滤出图文素材
            }).map(p->{
                p.setWebSucaivo(JSON.parseObject(p.getDetailInfo(),WebSucaivo.class));//把图文详细json串转成对象
                return p;
            }).collect(Collectors.toList());
        }
        page.setList(list);
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("mpwx:mpwxsucai:info")
    public R info(@PathVariable("id") Long id){
        MpwxSucai mpwxSucai = (MpwxSucai)mpwxSucaiService.getById(id);

        return R.ok().put("mpwxSucai", mpwxSucai);
    }


    /**
     * 保存图文消息
     * @param webSucaivo
     * @return
     */
    @RequestMapping("/saveOrUpdateNews")
    @RequiresPermissions("mpwx:mpwxsucai:save")
    public R saveOrUpdateNews(@RequestBody WebSucaivo webSucaivo) {
        log.info("webSucaivo==="+ JSON.toJSONString(webSucaivo));
        try {
            mpwxSucaiService.saveOrupdateNews(webSucaivo);
        }catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(e.getMessage());
        }
        return R.ok();
    }

    /**
     * 保存图片消息
     * @param mpwxSucai
     * @return
     */
    @RequestMapping("/saveOrUpdatePic")
    @RequiresPermissions("mpwx:mpwxsucai:save")
    public R saveOrUpdatePic(@RequestBody MpwxSucai mpwxSucai) {
        log.info("mpwxSucai==="+ JSON.toJSONString(mpwxSucai));
        try {
            mpwxSucaiService.saveOrUpdatePic(mpwxSucai);
        }catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(e.getMessage());
        }
        return R.ok();
    }






    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("mpwx:mpwxsucai:delete")
    public R delete(@RequestBody Long[] ids){
        mpwxSucaiService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
