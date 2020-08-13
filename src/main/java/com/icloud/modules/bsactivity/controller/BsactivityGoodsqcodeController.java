package com.icloud.modules.bsactivity.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.bsactivity.entity.BsactivityGoodsqcode;
import com.icloud.modules.bsactivity.service.BsactivityGoodsqcodeService;
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
 * @date 2020-04-17 15:14:25
 * 菜单主连接： modules/bsactivity/bsactivitygoodsqcode.html
 */
@RestController
@RequestMapping("bsactivity/bsactivitygoodsqcode")
public class BsactivityGoodsqcodeController {
    @Autowired
    private BsactivityGoodsqcodeService bsactivityGoodsqcodeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("bsactivity:bsactivitygoodsqcode:list")
    public R list(@RequestParam Map<String, Object> params){
//
//        for (Map.Entry entry: params.entrySet()) {
//            System.out.println("1_"+entry.getKey()+"======="+entry.getValue());
//        }
//        MapEntryUtils.clearNullValue(params);
//        for (Map.Entry entry: params.entrySet()) {
//            System.out.println("2_"+entry.getKey()+"======="+entry.getValue());
//        }
        Query query = new Query(params);
        PageUtils page = bsactivityGoodsqcodeService.findByPage(query.getPageNum(),query.getPageSize(), params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("bsactivity:bsactivitygoodsqcode:info")
    public R info(@PathVariable("id") Long id){
        BsactivityGoodsqcode bsactivityGoodsqcode = (BsactivityGoodsqcode)bsactivityGoodsqcodeService.getById(id);
        return R.ok().put("bsactivityGoodsqcode", bsactivityGoodsqcode);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("bsactivity:bsactivitygoodsqcode:save")
    public R save(@RequestBody BsactivityGoodsqcode bsactivityGoodsqcode){
        bsactivityGoodsqcodeService.save(bsactivityGoodsqcode);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("bsactivity:bsactivitygoodsqcode:update")
    public R update(@RequestBody BsactivityGoodsqcode bsactivityGoodsqcode){
        ValidatorUtils.validateEntity(bsactivityGoodsqcode);
        bsactivityGoodsqcodeService.updateById(bsactivityGoodsqcode);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("bsactivity:bsactivitygoodsqcode:delete")
    public R delete(@RequestBody Long[] ids){
        bsactivityGoodsqcodeService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
