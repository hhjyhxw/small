package com.icloud.modules.wx.web;

import com.icloud.annotation.SysLog;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.modules.wx.service.WxUserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

/**
 * @email 512162086@qq.com
 * @date 2019-11-01 21:46:51
 * 菜单主连接： modules/wx/wxUser.html
 */
@RestController
@RequestMapping(value = "/wx/wxUser")
public class WxUserController {

    @Autowired
    private WxUserService wxUserService;

    /**
     * 所有列表
     */
    @SysLog("查询用户列表")
    @RequestMapping("/list")
    @RequiresPermissions("wx:wxUser:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = wxUserService.findByPage(query.getPageNum(),query.getPageSize(), query);
        return R.ok().put("page", page);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("wx:wxUser:info")
    public R info(@PathVariable("id") Long id){
        WxUser wxUser = (WxUser) wxUserService.getById(id);
        return R.ok().put("wxUser", wxUser);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("wx:wxUser:save")
    public R save(@RequestBody WxUser wxUser){
        //校验类型
        ValidatorUtils.validateEntity(wxUser);
        wxUserService.save(wxUser);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("wx:wxUser:update")
    public R update(@RequestBody WxUser wxUser){
        //校验类型
        ValidatorUtils.validateEntity(wxUser);
        wxUserService.updateById(wxUser);
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("wx:wxUser:delete")
    public R delete(@RequestBody Long[] ids){
        wxUserService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }
}