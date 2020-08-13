package com.icloud.modules.mpwx.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.mpwx.entity.MpwxApp;
import com.icloud.modules.mpwx.service.MpwxAppService;
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
 * @date 2020-07-20 15:44:27
 * 菜单主连接： modules/mpwx/mpwxapp.html
 */
@RestController
@RequestMapping("mpwx/mpwxapp")
public class MpwxAppController {
    @Autowired
    private MpwxAppService mpwxAppService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("mpwx:mpwxapp:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = mpwxAppService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("mpwx:mpwxapp:info")
    public R info(@PathVariable("id") Long id){
        MpwxApp mpwxApp = (MpwxApp)mpwxAppService.getById(id);

        return R.ok().put("mpwxApp", mpwxApp);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("mpwx:mpwxapp:save")
    public R save(@RequestBody MpwxApp mpwxApp){
        mpwxAppService.save(mpwxApp);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("mpwx:mpwxapp:update")
    public R update(@RequestBody MpwxApp mpwxApp){
        ValidatorUtils.validateEntity(mpwxApp);
        mpwxAppService.updateById(mpwxApp);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("mpwx:mpwxapp:delete")
    public R delete(@RequestBody Long[] ids){
        mpwxAppService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
