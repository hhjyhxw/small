package com.icloud.modules.bsactivity.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.bsactivity.entity.BsactivityOrder;
import com.icloud.modules.bsactivity.service.BsactivityOrderService;
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
 * @date 2020-04-17 15:11:04
 * 菜单主连接： modules/bsactivity/bsactivityorder.html
 */
@RestController
@RequestMapping("bsactivity/bsactivityorder")
public class BsactivityOrderController {
    @Autowired
    private BsactivityOrderService bsactivityOrderService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("bsactivity:bsactivityorder:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = bsactivityOrderService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("bsactivity:bsactivityorder:info")
    public R info(@PathVariable("id") Long id){
        BsactivityOrder bsactivityOrder = (BsactivityOrder)bsactivityOrderService.getById(id);

        return R.ok().put("bsactivityOrder", bsactivityOrder);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("bsactivity:bsactivityorder:save")
    public R save(@RequestBody BsactivityOrder bsactivityOrder){
        bsactivityOrderService.save(bsactivityOrder);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("bsactivity:bsactivityorder:update")
    public R update(@RequestBody BsactivityOrder bsactivityOrder){
        ValidatorUtils.validateEntity(bsactivityOrder);
        bsactivityOrderService.updateById(bsactivityOrder);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("bsactivity:bsactivityorder:delete")
    public R delete(@RequestBody Long[] ids){
        bsactivityOrderService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
