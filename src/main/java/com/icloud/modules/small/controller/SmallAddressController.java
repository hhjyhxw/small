package com.icloud.modules.small.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.small.entity.SmallAddress;
import com.icloud.modules.small.service.SmallAddressService;
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
 * @date 2020-08-24 09:30:25
 * 菜单主连接： modules/small/smalladdress.html
 */
@RestController
@RequestMapping("small/smalladdress")
public class SmallAddressController {
    @Autowired
    private SmallAddressService smallAddressService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smalladdress:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallAddressService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smalladdress:info")
    public R info(@PathVariable("id") Long id){
        SmallAddress smallAddress = (SmallAddress)smallAddressService.getById(id);

        return R.ok().put("smallAddress", smallAddress);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smalladdress:save")
    public R save(@RequestBody SmallAddress smallAddress){
        smallAddressService.save(smallAddress);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smalladdress:update")
    public R update(@RequestBody SmallAddress smallAddress){
        ValidatorUtils.validateEntity(smallAddress);
        smallAddressService.updateById(smallAddress);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smalladdress:delete")
    public R delete(@RequestBody Long[] ids){
        smallAddressService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
