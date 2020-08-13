package com.icloud.modules.bsactivity.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.bsactivity.entity.BsactivityFollowuser;
import com.icloud.modules.bsactivity.service.BsactivityFollowuserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;


/**
 * pos机用户引流记录表
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:44
 * 菜单主连接： modules/bsactivity/bsactivityfollowuser.html
 */
@RestController
@RequestMapping("bsactivity/bsactivityfollowuser")
public class BsactivityFollowuserController {
    @Autowired
    private BsactivityFollowuserService bsactivityFollowuserService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("bsactivity:bsactivityfollowuser:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = bsactivityFollowuserService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("bsactivity:bsactivityfollowuser:info")
    public R info(@PathVariable("id") Long id){
        BsactivityFollowuser bsactivityFollowuser = (BsactivityFollowuser)bsactivityFollowuserService.getById(id);

        return R.ok().put("bsactivityFollowuser", bsactivityFollowuser);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("bsactivity:bsactivityfollowuser:save")
    public R save(@RequestBody BsactivityFollowuser bsactivityFollowuser){
        bsactivityFollowuserService.save(bsactivityFollowuser);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("bsactivity:bsactivityfollowuser:update")
    public R update(@RequestBody BsactivityFollowuser bsactivityFollowuser){
        ValidatorUtils.validateEntity(bsactivityFollowuser);
        bsactivityFollowuserService.updateById(bsactivityFollowuser);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("bsactivity:bsactivityfollowuser:delete")
    public R delete(@RequestBody Long[] ids){
        bsactivityFollowuserService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
