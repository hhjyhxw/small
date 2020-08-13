package com.icloud.modules.bsactivity.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.bsactivity.dao.BsactivityFollowuserMapper;
import com.icloud.modules.bsactivity.entity.BsactivityFollowuser;
import com.icloud.modules.wx.entity.WxUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * pos机用户引流记录表
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:44
 */
@Service
@Transactional
public class BsactivityFollowuserService extends BaseServiceImpl<BsactivityFollowuserMapper,BsactivityFollowuser> {

    @Autowired
    private BsactivityFollowuserMapper bsactivityFollowuserMapper;

    public BsactivityFollowuser findByOpenId(String openId) {
        QueryWrapper<BsactivityFollowuser> queryWrapper = new QueryWrapper<BsactivityFollowuser>();
        queryWrapper.eq("openid",openId);
        return (BsactivityFollowuser) getOne(queryWrapper);
    }

    public void saveOrUpdate(WxUser user,int longcoin,int newOrOld,int fromType){
        BsactivityFollowuser followuseruser = findByOpenId(user.getOpenid());
        if(followuseruser==null){
            followuseruser = new BsactivityFollowuser();
            followuseruser.setCreateTime(new Date());
            followuseruser.setLongcoin(longcoin);
            followuseruser.setFromType(fromType);
            followuseruser.setStatus(newOrOld);//老会员

            followuseruser.setOpenid(user.getOpenid());
            followuseruser.setHeadimgurl(user.getHeadimgurl());
            followuseruser.setNickname(user.getNickname());
            save(followuseruser);
        }else{
            followuseruser.setModifyTime(new Date());
            followuseruser.setHeadimgurl(user.getHeadimgurl());
            followuseruser.setNickname(user.getNickname());
            updateById(followuseruser);
        }
    }
}

