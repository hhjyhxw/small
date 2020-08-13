//package com.icloud.common.util.wx;
//
//import com.alibaba.fastjson.JSONObject;
//import com.icloud.basecommon.service.redis.RedisService;
//import com.icloud.common.ConfigUtil;
//import com.icloud.common.MD5Utils;
//import com.icloud.common.util.RandomUtil;
//import com.icloud.common.util.StringUtil;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
///**
// * 获取基础accessToken
// *
// */
//@Component
//public class AccessTokenUtil {
//
//	private static Logger logger = LoggerFactory.getLogger(AccessTokenUtil.class);
//
//    @Autowired
//    private RedisService redisService;
//
//	public  AccessToken getAccessToken(){
//		/*1、先从缓存取*/
//        Object obj = redisService.get(ConfigUtil.get("hostnumber"));
//		AccessToken accessToken = null;
//		if(obj!=null){
//            accessToken = (AccessToken) obj;
//            logger.error("accessToken.getExpiresIn()==="+accessToken.getExpiresIn());
//            logger.error("accessToken.getCreateTime()==="+accessToken.getCreateTime());
//            logger.error("System.currentTimeMillis()==="+System.currentTimeMillis());
//            logger.error("accessToken.isValid(System.currentTimeMillis())==="+accessToken.isValid(System.currentTimeMillis()));
//			if(accessToken.isValid(System.currentTimeMillis())){
//				return accessToken;
//			}else{
//				// 如果请求成功
//                String requestUrl = ConfigUtil.get("get_baseaccess_token_url").replace("APPID", ConfigUtil.get("appid")).replace("APPSECRET",  ConfigUtil.get("appsecret"));
//                JSONObject jsonObject = HttpUtils.httpsRequest(requestUrl, "GET", null);
//                if (null != jsonObject) {
//                    try {
//                        accessToken = new AccessToken();
//                        accessToken.setToken(jsonObject.getString("access_token"));
//                        accessToken.setExpiresIn(jsonObject.getIntValue("expires_in"));
//                        accessToken.setCreateTime(System.currentTimeMillis());
//                        //存入缓存
//                        redisService.set(ConfigUtil.get("hostnumber"),accessToken);
//                        return accessToken;
//                    } catch (Exception e) {
//                        accessToken = null;
//                        //刷新token失败
//                        logger.error("刷新token失败");
//                    }
//                }
//				return null;
//			}
//		}else{
//			/*2、重新请求*/
//			// 如果请求成功
//            String requestUrl = ConfigUtil.get("get_baseaccess_token_url").replace("APPID", ConfigUtil.get("appid")).replace("APPSECRET",  ConfigUtil.get("appsecret"));
//            JSONObject jsonObject = HttpUtils.httpsRequest(requestUrl, "GET", null);
//            if (null != jsonObject) {
//				try {
//					accessToken = new AccessToken();
//					accessToken.setToken(jsonObject.getString("access_token"));
//					accessToken.setExpiresIn(jsonObject.getIntValue("expires_in"));
//					accessToken.setCreateTime(System.currentTimeMillis());
//					//存入缓存
//                    redisService.set(ConfigUtil.get("hostnumber"),accessToken);
//					return accessToken;
//				} catch (Exception e) {
//					accessToken = null;
//					//刷新token失败
//					logger.error("刷新token失败");
//				}
//			}
//			return null;
//		}
//	}
//
//	public String getToken(){
//	    String randomStr = RandomUtil.getRandomString(6);
//	    String sign = MD5Utils.encode2hex(ConfigUtil.get("appid")+randomStr+ConfigUtil.get("get_basetoken_key"));
//	    String param ="?appid="+ConfigUtil.get("appid")+"&randomStr="+ randomStr+"&sign="+sign;
//        String url = ConfigUtil.get("get_basetoken_url")+param;
//        String result = HttpRequestUtil.httpPost(url);
//        logger.error("result==="+result);
//        if(StringUtil.checkStr(result)){
//            JSONObject jsonObject = JSONObject.parseObject(result);
//            if(jsonObject!=null && jsonObject.containsKey("status")){
//                if(jsonObject.getString("status").equals("success")){
//                    return jsonObject.getString("token");
//                }
//            }
//        }
//	    return null;
//    }
//}
