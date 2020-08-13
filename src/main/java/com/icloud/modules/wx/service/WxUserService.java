package com.icloud.modules.wx.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.wx.dao.WxUserMapper;
import com.icloud.modules.wx.entity.WxUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 
 * @author Mr.Z
 * @email 512162086@qq.com
 * @date 2019-11-01 21:46:51
 */
@Service
@Transactional
public class WxUserService extends BaseServiceImpl<WxUserMapper, WxUser> {

    public WxUser findByOpenId(String openId) {
        QueryWrapper<WxUser> queryWrapper = new QueryWrapper<WxUser>();
        queryWrapper.eq("openid",openId);
        return (WxUser) getOne(queryWrapper);
    }

}