package com.icloud.modules.small.controller;

import java.util.Arrays;
import java.util.Map;
import com.icloud.basecommon.model.Query;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.icloud.modules.small.entity.SmallFootprint;
import com.icloud.modules.small.service.SmallFootprintService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 用户浏览足迹
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:01
 * 菜单主连接： modules/small/smallfootprint.html
 */
@RestController
@RequestMapping("small/smallfootprint")
public class SmallFootprintController {
    @Autowired
    private SmallFootprintService smallFootprintService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallfootprint:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallFootprintService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallfootprint:info")
    public R info(@PathVariable("id") Long id){
        SmallFootprint smallFootprint = (SmallFootprint)smallFootprintService.getById(id);

        return R.ok().put("smallFootprint", smallFootprint);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallfootprint:save")
    public R save(@RequestBody SmallFootprint smallFootprint){
        smallFootprintService.save(smallFootprint);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallfootprint:update")
    public R update(@RequestBody SmallFootprint smallFootprint){
        ValidatorUtils.validateEntity(smallFootprint);
        smallFootprintService.updateById(smallFootprint);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallfootprint:delete")
    public R delete(@RequestBody Long[] ids){
        smallFootprintService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
