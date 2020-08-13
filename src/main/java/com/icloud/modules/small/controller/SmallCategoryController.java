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
import com.icloud.modules.small.entity.SmallCategory;
import com.icloud.modules.small.service.SmallCategoryService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 商品分类
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallcategory.html
 */
@RestController
@RequestMapping("small/smallcategory")
public class SmallCategoryController {
    @Autowired
    private SmallCategoryService smallCategoryService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallcategory:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallCategoryService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallcategory:info")
    public R info(@PathVariable("id") Long id){
        SmallCategory smallCategory = (SmallCategory)smallCategoryService.getById(id);

        return R.ok().put("smallCategory", smallCategory);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallcategory:save")
    public R save(@RequestBody SmallCategory smallCategory){
        smallCategoryService.save(smallCategory);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallcategory:update")
    public R update(@RequestBody SmallCategory smallCategory){
        ValidatorUtils.validateEntity(smallCategory);
        smallCategoryService.updateById(smallCategory);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallcategory:delete")
    public R delete(@RequestBody Long[] ids){
        smallCategoryService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
