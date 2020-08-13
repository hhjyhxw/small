package com.icloud.modules.retail.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.retail.entity.TRetailConfirn;
import com.icloud.modules.retail.service.TRetailConfirnService;
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
 * @date 2020-07-08 11:08:09
 * 菜单主连接： modules/retail/tretailconfirn.html
 */
@RestController
@RequestMapping("retail/tretailconfirn")
public class TRetailConfirnController {
    @Autowired
    private TRetailConfirnService tRetailConfirnService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("retail:tretailconfirn:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = tRetailConfirnService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("retail:tretailconfirn:info")
    public R info(@PathVariable("id") Long id){
        TRetailConfirn tRetailConfirn = (TRetailConfirn)tRetailConfirnService.getById(id);

        return R.ok().put("tRetailConfirn", tRetailConfirn);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("retail:tretailconfirn:save")
    public R save(@RequestBody TRetailConfirn tRetailConfirn){
        tRetailConfirnService.save(tRetailConfirn);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("retail:tretailconfirn:update")
    public R update(@RequestBody TRetailConfirn tRetailConfirn){
        ValidatorUtils.validateEntity(tRetailConfirn);
        tRetailConfirnService.updateById(tRetailConfirn);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("retail:tretailconfirn:delete")
    public R delete(@RequestBody Long[] ids){
        tRetailConfirnService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
