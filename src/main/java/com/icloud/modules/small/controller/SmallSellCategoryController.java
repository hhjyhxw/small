package com.icloud.modules.small.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.small.entity.SmallSellCategory;
import com.icloud.modules.small.service.SmallSellCategoryService;
import com.icloud.modules.small.vo.SellCategoryVo;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


/**
 * 店铺个性化商品分类
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-20 17:21:42
 * 菜单主连接： modules/small/smallsellcategory.html
 */
@RestController
@RequestMapping("small/smallsellcategory")
public class SmallSellCategoryController {
    @Autowired
    private SmallSellCategoryService smallSellCategoryService;


    /**
     * 选中店铺自定义分类
     */
    @RequestMapping("/select")
    @RequiresPermissions("small:smallsellcategory:update")
    public R select(@RequestParam Long supplierId){
        List<SellCategoryVo>  list = null;
        if(supplierId!=null){
            List<SmallSellCategory> clist = smallSellCategoryService.list(new QueryWrapper<SmallSellCategory>().eq("supplier_id",supplierId));
            list =  new ArrayList<SellCategoryVo>();
            SellCategoryVo vo = null;
            if(list!=null){
                for (SmallSellCategory sell : clist) {
                    vo =  new SellCategoryVo();
                    vo.setId(sell.getId());
                    vo.setName(sell.getTitle());
                    vo.setParentId(null);
                    vo.setParentName(null);
                    list.add(vo);
                }
            }
        }
        return R.ok().put("list", list);
    }


    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallsellcategory:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallSellCategoryService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallsellcategory:info")
    public R info(@PathVariable("id") Long id){
        SmallSellCategory smallSellCategory = (SmallSellCategory)smallSellCategoryService.getById(id);

        return R.ok().put("smallSellCategory", smallSellCategory);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallsellcategory:save")
    public R save(@RequestBody SmallSellCategory smallSellCategory){
        ValidatorUtils.validateEntity(smallSellCategory);
        smallSellCategoryService.save(smallSellCategory);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallsellcategory:update")
    public R update(@RequestBody SmallSellCategory smallSellCategory){
        ValidatorUtils.validateEntity(smallSellCategory);
        smallSellCategoryService.updateById(smallSellCategory);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallsellcategory:delete")
    public R delete(@RequestBody Long[] ids){
        smallSellCategoryService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
