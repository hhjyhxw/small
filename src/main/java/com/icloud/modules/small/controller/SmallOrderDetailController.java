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
import com.icloud.modules.small.entity.SmallOrderDetail;
import com.icloud.modules.small.service.SmallOrderDetailService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 订单明细
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallorderdetail.html
 */
@RestController
@RequestMapping("small/smallorderdetail")
public class SmallOrderDetailController {
    @Autowired
    private SmallOrderDetailService smallOrderDetailService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallorderdetail:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallOrderDetailService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallorderdetail:info")
    public R info(@PathVariable("id") Long id){
        SmallOrderDetail smallOrderDetail = (SmallOrderDetail)smallOrderDetailService.getById(id);

        return R.ok().put("smallOrderDetail", smallOrderDetail);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallorderdetail:save")
    public R save(@RequestBody SmallOrderDetail smallOrderDetail){
        smallOrderDetailService.save(smallOrderDetail);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallorderdetail:update")
    public R update(@RequestBody SmallOrderDetail smallOrderDetail){
        ValidatorUtils.validateEntity(smallOrderDetail);
        smallOrderDetailService.updateById(smallOrderDetail);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallorderdetail:delete")
    public R delete(@RequestBody Long[] ids){
        smallOrderDetailService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
