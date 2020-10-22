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
import com.icloud.modules.small.entity.SmallRececardRecord;
import com.icloud.modules.small.service.SmallRececardRecordService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import java.util.Date;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-10-22 15:30:14
 * 菜单主连接： modules/small/smallrececardrecord.html
 */
@RestController
@RequestMapping("small/smallrececardrecord")
public class SmallRececardRecordController {
    @Autowired
    private SmallRececardRecordService smallRececardRecordService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallrececardrecord:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallRececardRecordService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallrececardrecord:info")
    public R info(@PathVariable("id") Long id){
        SmallRececardRecord smallRececardRecord = (SmallRececardRecord)smallRececardRecordService.getById(id);

        return R.ok().put("smallRececardRecord", smallRececardRecord);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallrececardrecord:save")
    public R save(@RequestBody SmallRececardRecord smallRececardRecord){
        smallRececardRecord.setCreateTime(new Date());
        smallRececardRecordService.save(smallRececardRecord);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallrececardrecord:update")
    public R update(@RequestBody SmallRececardRecord smallRececardRecord){
        ValidatorUtils.validateEntity(smallRececardRecord);
        smallRececardRecord.setModifyTime(new Date());
        smallRececardRecordService.updateById(smallRececardRecord);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallrececardrecord:delete")
    public R delete(@RequestBody Long[] ids){
        smallRececardRecordService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
