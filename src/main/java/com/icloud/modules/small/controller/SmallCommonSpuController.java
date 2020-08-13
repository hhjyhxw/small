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
import com.icloud.modules.small.entity.SmallCommonSpu;
import com.icloud.modules.small.service.SmallCommonSpuService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 公共商品spu;要货商提供
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 15:06:49
 * 菜单主连接： modules/small/smallcommonspu.html
 */
@RestController
@RequestMapping("small/smallcommonspu")
public class SmallCommonSpuController {
    @Autowired
    private SmallCommonSpuService smallCommonSpuService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallcommonspu:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallCommonSpuService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallcommonspu:info")
    public R info(@PathVariable("id") Long id){
        SmallCommonSpu smallCommonSpu = (SmallCommonSpu)smallCommonSpuService.getById(id);

        return R.ok().put("smallCommonSpu", smallCommonSpu);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallcommonspu:save")
    public R save(@RequestBody SmallCommonSpu smallCommonSpu){
        smallCommonSpuService.save(smallCommonSpu);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallcommonspu:update")
    public R update(@RequestBody SmallCommonSpu smallCommonSpu){
        ValidatorUtils.validateEntity(smallCommonSpu);
        smallCommonSpuService.updateById(smallCommonSpu);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallcommonspu:delete")
    public R delete(@RequestBody Long[] ids){
        smallCommonSpuService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
