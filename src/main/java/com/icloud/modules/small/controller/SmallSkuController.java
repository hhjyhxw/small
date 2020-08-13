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
import com.icloud.modules.small.entity.SmallSku;
import com.icloud.modules.small.service.SmallSkuService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 商品sku
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallsku.html
 */
@RestController
@RequestMapping("small/smallsku")
public class SmallSkuController {
    @Autowired
    private SmallSkuService smallSkuService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallsku:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallSkuService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallsku:info")
    public R info(@PathVariable("id") Long id){
        SmallSku smallSku = (SmallSku)smallSkuService.getById(id);

        return R.ok().put("smallSku", smallSku);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallsku:save")
    public R save(@RequestBody SmallSku smallSku){
        smallSkuService.save(smallSku);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallsku:update")
    public R update(@RequestBody SmallSku smallSku){
        ValidatorUtils.validateEntity(smallSku);
        smallSkuService.updateById(smallSku);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallsku:delete")
    public R delete(@RequestBody Long[] ids){
        smallSkuService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
