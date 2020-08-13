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
import com.icloud.modules.small.entity.SmallPayment;
import com.icloud.modules.small.service.SmallPaymentService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 支付流水
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallpayment.html
 */
@RestController
@RequestMapping("small/smallpayment")
public class SmallPaymentController {
    @Autowired
    private SmallPaymentService smallPaymentService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallpayment:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallPaymentService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallpayment:info")
    public R info(@PathVariable("id") Long id){
        SmallPayment smallPayment = (SmallPayment)smallPaymentService.getById(id);

        return R.ok().put("smallPayment", smallPayment);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallpayment:save")
    public R save(@RequestBody SmallPayment smallPayment){
        smallPaymentService.save(smallPayment);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallpayment:update")
    public R update(@RequestBody SmallPayment smallPayment){
        ValidatorUtils.validateEntity(smallPayment);
        smallPaymentService.updateById(smallPayment);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallpayment:delete")
    public R delete(@RequestBody Long[] ids){
        smallPaymentService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
