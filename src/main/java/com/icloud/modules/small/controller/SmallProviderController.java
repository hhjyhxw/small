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
import com.icloud.modules.small.entity.SmallProvider;
import com.icloud.modules.small.service.SmallProviderService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 供应商
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 15:06:49
 * 菜单主连接： modules/small/smallprovider.html
 */
@RestController
@RequestMapping("small/smallprovider")
public class SmallProviderController {
    @Autowired
    private SmallProviderService smallProviderService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallprovider:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallProviderService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallprovider:info")
    public R info(@PathVariable("id") Long id){
        SmallProvider smallProvider = (SmallProvider)smallProviderService.getById(id);

        return R.ok().put("smallProvider", smallProvider);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallprovider:save")
    public R save(@RequestBody SmallProvider smallProvider){
        smallProviderService.save(smallProvider);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallprovider:update")
    public R update(@RequestBody SmallProvider smallProvider){
        ValidatorUtils.validateEntity(smallProvider);
        smallProviderService.updateById(smallProvider);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallprovider:delete")
    public R delete(@RequestBody Long[] ids){
        smallProviderService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
