package com.icloud.modules.small.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.small.entity.SmallRetail;
import com.icloud.modules.small.service.SmallRetailService;
import com.icloud.modules.small.vo.RetailVo;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


/**
 * 零售户
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallretail.html
 */
@RestController
@RequestMapping("small/smallretail")
public class SmallRetailController {
    @Autowired
    private SmallRetailService smallRetailService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallretail:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallRetailService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 选择部门(添加、修改菜单)
     */
    @RequestMapping("/select")
    @RequiresPermissions("small:smallcategory:update")
    public R select(){
        List<SmallRetail> retailList = smallRetailService.list();
        List<RetailVo> list =  new ArrayList<RetailVo>();
        RetailVo vo = null;
        if(list!=null){
            for (SmallRetail smallRetail : retailList) {
                vo =  new RetailVo();
                vo.setId(smallRetail.getId());
                vo.setName(smallRetail.getSupplierName());
                vo.setParentId(null);
                vo.setParentName(null);
                list.add(vo);
            }
        }
        return R.ok().put("retailList", list);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallretail:info")
    public R info(@PathVariable("id") Long id){
        SmallRetail smallRetail = (SmallRetail)smallRetailService.getById(id);

        return R.ok().put("smallRetail", smallRetail);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallretail:save")
    public R save(@RequestBody SmallRetail smallRetail){
        smallRetailService.save(smallRetail);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallretail:update")
    public R update(@RequestBody SmallRetail smallRetail){
        ValidatorUtils.validateEntity(smallRetail);
        smallRetailService.updateById(smallRetail);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallretail:delete")
    public R delete(@RequestBody Long[] ids){
        smallRetailService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
