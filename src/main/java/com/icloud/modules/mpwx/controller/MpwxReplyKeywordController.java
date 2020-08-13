package com.icloud.modules.mpwx.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.mpwx.entity.MpwxReplyKeyword;
import com.icloud.modules.mpwx.service.MpwxReplyKeywordService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;


/**
 * 一条回复对应一个或者多个关键字
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-27 10:23:43
 * 菜单主连接： modules/mpwx/mpwxreplykeyword.html
 */
@RestController
@RequestMapping("mpwx/mpwxreplykeyword")
public class MpwxReplyKeywordController {
    @Autowired
    private MpwxReplyKeywordService mpwxReplyKeywordService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("mpwx:mpwxreplykeyword:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = mpwxReplyKeywordService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("mpwx:mpwxreplykeyword:info")
    public R info(@PathVariable("id") Long id){
        MpwxReplyKeyword mpwxReplyKeyword = (MpwxReplyKeyword)mpwxReplyKeywordService.getById(id);

        return R.ok().put("mpwxReplyKeyword", mpwxReplyKeyword);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("mpwx:mpwxreplykeyword:save")
    public R save(@RequestBody MpwxReplyKeyword mpwxReplyKeyword){
        mpwxReplyKeywordService.save(mpwxReplyKeyword);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("mpwx:mpwxreplykeyword:update")
    public R update(@RequestBody MpwxReplyKeyword mpwxReplyKeyword){
        ValidatorUtils.validateEntity(mpwxReplyKeyword);
        mpwxReplyKeywordService.updateById(mpwxReplyKeyword);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("mpwx:mpwxreplykeyword:delete")
    public R delete(@RequestBody Long[] ids){
        mpwxReplyKeywordService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
