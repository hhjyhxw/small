package com.icloud.modules.bsactivity.controller;

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
import com.icloud.modules.bsactivity.entity.BsactivityShop;
import com.icloud.modules.bsactivity.service.BsactivityShopService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:45
 * 菜单主连接： modules/bsactivity/bsactivityshop.html
 */
@RestController
@RequestMapping("bsactivity/bsactivityshop")
public class BsactivityShopController {
    @Autowired
    private BsactivityShopService bsactivityShopService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("bsactivity:bsactivityshop:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = bsactivityShopService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("bsactivity:bsactivityshop:info")
    public R info(@PathVariable("id") Long id){
        BsactivityShop bsactivityShop = (BsactivityShop)bsactivityShopService.getById(id);

        return R.ok().put("bsactivityShop", bsactivityShop);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("bsactivity:bsactivityshop:save")
    public R save(@RequestBody BsactivityShop bsactivityShop){
        bsactivityShopService.save(bsactivityShop);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("bsactivity:bsactivityshop:update")
    public R update(@RequestBody BsactivityShop bsactivityShop){
        ValidatorUtils.validateEntity(bsactivityShop);
        bsactivityShopService.updateById(bsactivityShop);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("bsactivity:bsactivityshop:delete")
    public R delete(@RequestBody Long[] ids){
        bsactivityShopService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
