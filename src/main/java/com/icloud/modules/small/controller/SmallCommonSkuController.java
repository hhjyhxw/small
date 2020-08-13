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
import com.icloud.modules.small.entity.SmallCommonSku;
import com.icloud.modules.small.service.SmallCommonSkuService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 公共商品sku;要货商提供
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 15:06:49
 * 菜单主连接： modules/small/smallcommonsku.html
 */
@RestController
@RequestMapping("small/smallcommonsku")
public class SmallCommonSkuController {
    @Autowired
    private SmallCommonSkuService smallCommonSkuService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallcommonsku:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallCommonSkuService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallcommonsku:info")
    public R info(@PathVariable("id") Long id){
        SmallCommonSku smallCommonSku = (SmallCommonSku)smallCommonSkuService.getById(id);

        return R.ok().put("smallCommonSku", smallCommonSku);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallcommonsku:save")
    public R save(@RequestBody SmallCommonSku smallCommonSku){
        smallCommonSkuService.save(smallCommonSku);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallcommonsku:update")
    public R update(@RequestBody SmallCommonSku smallCommonSku){
        ValidatorUtils.validateEntity(smallCommonSku);
        smallCommonSkuService.updateById(smallCommonSku);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallcommonsku:delete")
    public R delete(@RequestBody Long[] ids){
        smallCommonSkuService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
