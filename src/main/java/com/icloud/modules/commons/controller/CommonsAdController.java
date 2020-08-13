package com.icloud.modules.commons.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.commons.entity.CommonsAd;
import com.icloud.modules.commons.service.CommonsAdService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2019-12-26 17:58:04
 * 菜单主连接： modules/commons/commonsad.html
 */
@RestController
@RequestMapping(value = "/commons/commonsad")
public class CommonsAdController {
    @Autowired
    private CommonsAdService commonsAdService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("commons:commonsad:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = commonsAdService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("commons:commonsad:info")
    public R info(@PathVariable("id") Long id){
        CommonsAd commonsAd = (CommonsAd)commonsAdService.getById(id);

        return R.ok().put("commonsAd", commonsAd);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("commons:commonsad:save")
    public R save(@RequestBody CommonsAd commonsAd){
        commonsAdService.save(commonsAd);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("commons:commonsad:update")
    public R update(@RequestBody CommonsAd commonsAd){
        ValidatorUtils.validateEntity(commonsAd);
        commonsAdService.updateById(commonsAd);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("commons:commonsad:delete")
    public R delete(@RequestBody Long[] ids){
        commonsAdService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
