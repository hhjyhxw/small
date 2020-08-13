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
import com.icloud.modules.small.entity.SmallSpuAttribute;
import com.icloud.modules.small.service.SmallSpuAttributeService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 商品属性
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallspuattribute.html
 */
@RestController
@RequestMapping("small/smallspuattribute")
public class SmallSpuAttributeController {
    @Autowired
    private SmallSpuAttributeService smallSpuAttributeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallspuattribute:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallSpuAttributeService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallspuattribute:info")
    public R info(@PathVariable("id") Long id){
        SmallSpuAttribute smallSpuAttribute = (SmallSpuAttribute)smallSpuAttributeService.getById(id);

        return R.ok().put("smallSpuAttribute", smallSpuAttribute);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallspuattribute:save")
    public R save(@RequestBody SmallSpuAttribute smallSpuAttribute){
        smallSpuAttributeService.save(smallSpuAttribute);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallspuattribute:update")
    public R update(@RequestBody SmallSpuAttribute smallSpuAttribute){
        ValidatorUtils.validateEntity(smallSpuAttribute);
        smallSpuAttributeService.updateById(smallSpuAttribute);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallspuattribute:delete")
    public R delete(@RequestBody Long[] ids){
        smallSpuAttributeService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
