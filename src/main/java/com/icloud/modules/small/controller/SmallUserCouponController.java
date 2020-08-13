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
import com.icloud.modules.small.entity.SmallUserCoupon;
import com.icloud.modules.small.service.SmallUserCouponService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 用户拥有的折扣券
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallusercoupon.html
 */
@RestController
@RequestMapping("small/smallusercoupon")
public class SmallUserCouponController {
    @Autowired
    private SmallUserCouponService smallUserCouponService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallusercoupon:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallUserCouponService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallusercoupon:info")
    public R info(@PathVariable("id") Long id){
        SmallUserCoupon smallUserCoupon = (SmallUserCoupon)smallUserCouponService.getById(id);

        return R.ok().put("smallUserCoupon", smallUserCoupon);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallusercoupon:save")
    public R save(@RequestBody SmallUserCoupon smallUserCoupon){
        smallUserCouponService.save(smallUserCoupon);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallusercoupon:update")
    public R update(@RequestBody SmallUserCoupon smallUserCoupon){
        ValidatorUtils.validateEntity(smallUserCoupon);
        smallUserCouponService.updateById(smallUserCoupon);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallusercoupon:delete")
    public R delete(@RequestBody Long[] ids){
        smallUserCouponService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
