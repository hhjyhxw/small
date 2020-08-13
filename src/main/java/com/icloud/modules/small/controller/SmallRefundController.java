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
import com.icloud.modules.small.entity.SmallRefund;
import com.icloud.modules.small.service.SmallRefundService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 退款
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallrefund.html
 */
@RestController
@RequestMapping("small/smallrefund")
public class SmallRefundController {
    @Autowired
    private SmallRefundService smallRefundService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallrefund:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallRefundService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallrefund:info")
    public R info(@PathVariable("id") Long id){
        SmallRefund smallRefund = (SmallRefund)smallRefundService.getById(id);

        return R.ok().put("smallRefund", smallRefund);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallrefund:save")
    public R save(@RequestBody SmallRefund smallRefund){
        smallRefundService.save(smallRefund);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallrefund:update")
    public R update(@RequestBody SmallRefund smallRefund){
        ValidatorUtils.validateEntity(smallRefund);
        smallRefundService.updateById(smallRefund);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallrefund:delete")
    public R delete(@RequestBody Long[] ids){
        smallRefundService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
