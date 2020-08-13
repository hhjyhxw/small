package com.icloud.modules.scanactivity.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.scanactivity.entity.ScanactivityUserScanrecord;
import com.icloud.modules.scanactivity.service.ScanactivityUserScanrecordService;
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
 * @date 2020-04-01 15:25:21
 * 菜单主连接： modules/scanactivity/scanactivityuserscanrecord.html
 */
@RestController
@RequestMapping("scanactivity/scanactivityuserscanrecord")
public class ScanactivityUserScanrecordController {
    @Autowired
    private ScanactivityUserScanrecordService scanactivityUserScanrecordService;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("scanactivity:scanactivityuserscanrecord:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = scanactivityUserScanrecordService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("scanactivity:scanactivityuserscanrecord:info")
    public R info(@PathVariable("id") Long id){
        ScanactivityUserScanrecord scanactivityUserScanrecord = (ScanactivityUserScanrecord)scanactivityUserScanrecordService.getById(id);

        return R.ok().put("scanactivityUserScanrecord", scanactivityUserScanrecord);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("scanactivity:scanactivityuserscanrecord:save")
    public R save(@RequestBody ScanactivityUserScanrecord scanactivityUserScanrecord){
        scanactivityUserScanrecordService.save(scanactivityUserScanrecord);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("scanactivity:scanactivityuserscanrecord:update")
    public R update(@RequestBody ScanactivityUserScanrecord scanactivityUserScanrecord){
        ValidatorUtils.validateEntity(scanactivityUserScanrecord);
        scanactivityUserScanrecordService.updateById(scanactivityUserScanrecord);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("scanactivity:scanactivityuserscanrecord:delete")
    public R delete(@RequestBody Long[] ids){
        scanactivityUserScanrecordService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
