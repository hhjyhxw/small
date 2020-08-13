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
import com.icloud.modules.small.entity.SmallOrder;
import com.icloud.modules.small.service.SmallOrderService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 订单表
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallorder.html
 */
@RestController
@RequestMapping("small/smallorder")
public class SmallOrderController {
    @Autowired
    private SmallOrderService smallOrderService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallorder:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallOrderService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallorder:info")
    public R info(@PathVariable("id") Long id){
        SmallOrder smallOrder = (SmallOrder)smallOrderService.getById(id);

        return R.ok().put("smallOrder", smallOrder);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallorder:save")
    public R save(@RequestBody SmallOrder smallOrder){
        smallOrderService.save(smallOrder);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallorder:update")
    public R update(@RequestBody SmallOrder smallOrder){
        ValidatorUtils.validateEntity(smallOrder);
        smallOrderService.updateById(smallOrder);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallorder:delete")
    public R delete(@RequestBody Long[] ids){
        smallOrderService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
