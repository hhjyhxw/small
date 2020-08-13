package com.icloud.modules.mpwx.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.mpwx.entity.MpwxCard;
import com.icloud.modules.mpwx.service.MpwxCardService;
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
 * @date 2020-07-20 15:44:26
 * 菜单主连接： modules/mpwx/mpwxcard.html
 */
@RestController
@RequestMapping("mpwx/mpwxcard")
public class MpwxCardController {
    @Autowired
    private MpwxCardService mpwxCardService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("mpwx:mpwxcard:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = mpwxCardService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("mpwx:mpwxcard:info")
    public R info(@PathVariable("id") Long id){
        MpwxCard mpwxCard = (MpwxCard)mpwxCardService.getById(id);

        return R.ok().put("mpwxCard", mpwxCard);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("mpwx:mpwxcard:save")
    public R save(@RequestBody MpwxCard mpwxCard){
        mpwxCardService.save(mpwxCard);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("mpwx:mpwxcard:update")
    public R update(@RequestBody MpwxCard mpwxCard){
        ValidatorUtils.validateEntity(mpwxCard);
        mpwxCardService.updateById(mpwxCard);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("mpwx:mpwxcard:delete")
    public R delete(@RequestBody Long[] ids){
        mpwxCardService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
