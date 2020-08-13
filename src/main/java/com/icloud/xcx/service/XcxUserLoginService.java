package com.icloud.xcx.service;

import cn.hutool.extra.emoji.EmojiUtil;
import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.basecommon.util.HttpUtils;
import com.icloud.common.ShaEncry;
import com.icloud.common.util.RandomUtil;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.modules.wx.service.WxUserService;
import com.icloud.xcx.util.AES;
import com.icloud.xcx.util.WxAndXcxUtil;
import com.icloud.xcx.util.XcxUserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class XcxUserLoginService {

	private Logger log = LoggerFactory.getLogger(getClass());
	@Autowired
	private WxUserService wxUserService;
    @Autowired
    private RedisService redisService;
	/**
	 * 微信登录
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	public Map<String,Object> xcxlogin(String jsonParams, HttpServletRequest request) throws Exception{
		Map<String,Object> resjson = new HashMap<String,Object>();
		try{
            if(!StringUtils.isEmpty(jsonParams)){
                JSONObject json = JSONObject.parseObject(jsonParams);
                //小程序传入的参数
                String encryptedData = json.getString("encryptedData");
                String iv = json.getString("iv");
                String rawData = json.getString("rawData");
                String signature = json.getString("signature");

                String url = WxAndXcxUtil.getOpenIdUrl
                        .replace("APPID", WxAndXcxUtil.appid)
                        .replace("SECRET",WxAndXcxUtil.secret)
                        .replace("JSCODE",json.getString("code"));
                JSONObject jsonObject = HttpUtils.httpsRequest(url,  "GET", null);
                if (!(jsonObject == null) && null != jsonObject.getString("openid")) {
                    log.info("jsonObj:" + jsonObject.toString());
                    String openId = jsonObject.getString("openid");
                    String session_key = jsonObject.getString("session_key");
                    if(!StringUtils.isEmpty(openId) && !StringUtils.isEmpty(session_key)){
                        //验证签名
                        String newsignature = ShaEncry.getSha1(rawData+session_key);
                        if(!newsignature.equals(signature)){
                            resjson.put("errCode", "0002");
                            resjson.put("resultMsg", "签名错误");
                            return resjson;
                        }
                        //解密数据
                        String decryData = AES.decrypt(encryptedData, session_key, iv);
                        log.info("decryData:" + decryData);
                        JSONObject decryDataJson = JSONObject.parseObject(decryData);
//                        if(!decryDataJson.containsKey("unionId")){
//                            resjson.put("errCode", "1000");
//                            resjson.put("resultMsg", "没获取到用户unionId");
//                            return resjson;
//                        }
//                        WxUser user = wxUserService.findByOpenId(decryDataJson.getString("unionId"));
                        WxUser user = wxUserService.findByOpenId(openId);
                        JSONObject user_raw =  JSONObject.parseObject(json.getString("user_raw"));
                        if(user!=null){
                            user.setNickname(decryDataJson.containsKey("nickName")? EmojiUtil.toAlias(decryDataJson.getString("nickName")):user.getNickname());
                            user.setHeadimgurl(decryDataJson.containsKey("avatarUrl")?decryDataJson.getString("avatarUrl"):user.getHeadimgurl());
                            user.setModifyTime(new Date());
                            user.setUnionid(decryDataJson.containsKey("unionId")?decryDataJson.getString("unionId"):user.getUnionid());
                            wxUserService.updateById(user);
                        }else{
                            user = new WxUser();
                            user.setNickname(decryDataJson.containsKey("nickName")? EmojiUtil.toAlias(decryDataJson.getString("nickName")):user.getNickname());
                            user.setHeadimgurl(decryDataJson.containsKey("avatarUrl")?decryDataJson.getString("avatarUrl"):user.getHeadimgurl());
                            user.setCreateTime(new Date());
                            user.setUnionid(decryDataJson.containsKey("unionId")?decryDataJson.getString("unionId"):user.getUnionid());
                            user.setModifyTime(new Date());
                            user.setOpenid(openId);
                            wxUserService.save(user);
                        }
                        //更新或者保存
                        String rd_session = RandomUtil.getRandomString(20);
                        resjson.put("errCode", "0000");
                        resjson.put("resultMsg", "登陆成功");
                        resjson.put("sid", rd_session);
                        log.info("openId=" + openId+"; session_key="+session_key);
                        XcxUserSession userSession = null;
                         Object userSessionObj =  redisService.get(user.getOpenid());
                        if(userSessionObj!=null){
                            userSession=(XcxUserSession)userSessionObj;
                            userSession.setOpenId(openId);
                            userSession.setUnionId(user.getUnionid());
                            userSession.setSession_key(rd_session);
                            userSession.setLoginTime(System.currentTimeMillis());
                            userSession.setWxUser(user);
                        }else{
                            userSession =  new XcxUserSession();
                            userSession.setOpenId(openId);
                            userSession.setUnionId(user.getUnionid());
                            userSession.setSession_key(rd_session);
                            userSession.setLoginTime(System.currentTimeMillis());
                            userSession.setWxUser(user);
                        }
                        //更新缓存
                        redisService.set(rd_session,user.getOpenid(),1200L);
                        redisService.set(user.getOpenid(),userSession,1200L);
                        return resjson;
                    }else{

                        resjson.put("errCode", "0002");
                        resjson.put("resultMsg", "openid获取失败");
                    }

                }else{
                    resjson.put("errCode", "0002");
                    resjson.put("resultMsg", "openid获取失败");
                }
            }else{
                resjson.put("errCode", "1000");
                resjson.put("resultMsg", "参数缺失");
            }
        }catch (Exception e){
            resjson.put("errCode", "1000");
            resjson.put("resultMsg", "系统错误");
            e.printStackTrace();
        }
		return resjson;
		
	}
	
	public Map<String,Object> checkSession(String jsonParams,HttpServletRequest request) {
		//System.out.println(">>>>>>>rd_session>>>>>"+jsonParams);
		Map<String,Object> resjson = new HashMap<String,Object>();
		if(!StringUtils.isEmpty(jsonParams)){
            JSONObject json = JSONObject.parseObject(jsonParams);
			String rd_session = json.getString("sid");
		     if(!StringUtils.isEmpty(rd_session)){
			     Object unionid = redisService.get(rd_session);
			     if(StringUtil.checkObj(unionid)){
                        XcxUserSession user = (XcxUserSession) redisService.get(unionid.toString());
                        if(null==user){
                            resjson.put("errCode", "0011");
                            resjson.put("resultMsg", "本地会话失效");
                            log.info("redis失效式会话失效");
                            return resjson;
                        }
                        Long loginTime = user.getLoginTime();
                        if(System.currentTimeMillis()/1000-loginTime/1000>=7200){
                            resjson.put("errCode", "0012");
                            resjson.put("resultMsg", "小程登录状态失效");
                            return resjson;
                        }
						resjson.put("errCode", "0000");
						resjson.put("resultMsg", "会话尚未失效");
						return resjson;
					}else{
						resjson.put("errCode", "1000");
						resjson.put("resultMsg", "缓存中找不到unionid");
						return resjson;
					}
			 }else{
				resjson.put("errCode", "1000");
				resjson.put("resultMsg", "获取不到sid");
				return resjson;
			 }
		}
		resjson.put("errCode", "1000");
		resjson.put("resultMsg", "传入参数为空");
		return resjson;
	}
	
	/**
	 * 获取用户对象
	 * @return
	 */
	public  Map<String,Object> getWxUser(String jsonParams){
        JSONObject json = JSONObject.parseObject(jsonParams);
		Map<String,Object> resjson = new HashMap<String,Object>();
		String rd_session = json.getString("sid");
		 if(!StringUtils.isEmpty(rd_session)){
             Object unionid = redisService.get(rd_session);
             if(!StringUtil.checkObj(unionid)){
                 XcxUserSession userSession = (XcxUserSession) redisService.get(unionid.toString());
				 if(userSession!=null){
						resjson.put("errCode", "0000");
						resjson.put("resultMsg", "获取数据成功");
						resjson.put("tWxUser",userSession.getWxUser());
					}
			 }
		 }else{
			 resjson.put("errCode", "1000");
			 resjson.put("resultMsg", "参数缺失");
		 }
		return resjson;
	}
}
