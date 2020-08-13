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
import com.icloud.modules.small.entity.SmallAppraise;
import com.icloud.modules.small.service.SmallAppraiseService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 商品评价
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallappraise.html
 */
@RestController
@RequestMapping("small/smallappraise")
public class SmallAppraiseController {
    @Autowired
    private SmallAppraiseService smallAppraiseService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallappraise:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallAppraiseService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallappraise:info")
    public R info(@PathVariable("id") Long id){
        SmallAppraise smallAppraise = (SmallAppraise)smallAppraiseService.getById(id);

        return R.ok().put("smallAppraise", smallAppraise);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallappraise:save")
    public R save(@RequestBody SmallAppraise smallAppraise){
        smallAppraiseService.save(smallAppraise);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallappraise:update")
    public R update(@RequestBody SmallAppraise smallAppraise){
        ValidatorUtils.validateEntity(smallAppraise);
        smallAppraiseService.updateById(smallAppraise);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallappraise:delete")
    public R delete(@RequestBody Long[] ids){
        smallAppraiseService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
