package com.icloud.xcx.service;

import java.io.Serializable;

import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.modules.wx.service.WxUserService;
import com.icloud.xcx.util.XcxUserSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * 类名称: XcxUserSessionUtil
 * 类描述: 小程序与公众号用户session共享
 * 创建人: zhangdehai
 * 创建时间:2018年3月4日 下午3:07:22
 */
@Service
public class XcxUserSessionService implements Serializable{
    @Autowired
    private WxUserService wxUserService;
    @Autowired
    private RedisService redisService;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WxUser getTWxUser(String unionid){
        Object userSessionObj = redisService.get(unionid);
		if(userSessionObj!=null){
			return ((XcxUserSession)userSessionObj).getWxUser();
		}
		//先去查询
        WxUser wxUser = wxUserService.findByOpenId(unionid);
		if(wxUser!=null){
            setUserSession(unionid, wxUser);
            return wxUser;
        }
		return null;
	}
	
	/**
	* Description:设置rediesession
	* @author zhangdehai
	* @param unionid
	* @param tWxUser  
	* @date 2018年3月4日下午3:06:47
	 */
	public  void setUserSession(String unionid,WxUser tWxUser){
        Object userSessionObj = redisService.get(unionid);
		XcxUserSession userSession = null;
		if(userSessionObj==null){
			userSession =  new XcxUserSession();
		}else{
			userSession = (XcxUserSession) userSessionObj;
		}
		userSession.setOpenId(tWxUser.getOpenid());
		userSession.setUnionId(tWxUser.getUnionid());
		userSession.setLoginTime(System.currentTimeMillis());
		userSession.setWxUser(tWxUser);
		//更新缓存
        redisService.set(tWxUser.getUnionid(),userSession,1200L);
	}
	

	/**
	 * 获取rediesession 根据unionid 获取
	* Description:
	* @author zhangdehai
	* @param unionid
	* @return  
	* @date 2018年3月4日下午3:06:28
	 */
	public  XcxUserSession getUserSession(String unionid){
        Object userSessionObj = redisService.get(unionid);
		if(userSessionObj!=null){
			return (XcxUserSession)userSessionObj;
		}
		return null;
	}
	
	
	/**
	* Description:根据sid 获取
	* @author zhangdehai
	* @param sid
	* @return  
	* @date 2018年3月4日下午6:45:51
	 */
	public  XcxUserSession getUserSessionBysid(String sid){
        Object unionid = redisService.get(sid);
        if(StringUtil.checkObj(unionid)){
            return getUserSession(unionid.toString());
        }
        return null;
	}
}
