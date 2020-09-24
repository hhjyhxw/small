package com.icloud.thirdinterfaces;

import com.icloud.common.R;
import com.icloud.common.util.StringUtil;
import com.icloud.config.redis.RedisUtils;
import com.icloud.config.starttask.ApplicationRunnerImpl;
import com.icloud.modules.wx.entity.WxUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;

/**
 * 模拟微信授权
 */
@RestController
@RequestMapping("/oauth2")
@Slf4j
public class WeixinAuthonController {

    private static String f_appid="wxaa13dc461510723a";
    private static String f_appsecret="0fd561ea6d2bce6410805f50c041d65a";
    private static volatile int  user_index=0;
//    public static Map<String,WxUser> usermap  = new HashMap<String,WxUser>();
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    public HttpServletResponse response;
    /**
     * 授权获取code
     * @param appid
     * @param redirect_uri
     * @param response_type
     * @param scope
     * @param state
     * @return
     */
    @RequestMapping("/authorize")
    public R authorize(String appid,String redirect_uri,String response_type,String scope,String state) throws IOException {
        long startTime = System.currentTimeMillis();
        if(!f_appid.equals(appid)){
            return R.error("appid不正确");
        }
        WxUser user = null;
        user_index++;
        if(user_index< ApplicationRunnerImpl.userList.size()){
            user = ApplicationRunnerImpl.userList.get(user_index);
        }else{
            user_index = 1;
            user = ApplicationRunnerImpl.userList.get(user_index);
        }
        String code = UUID.randomUUID().toString();
        String token = UUID.randomUUID().toString();
        user.setAccess_token(token);
        redisUtils.set(code,user,300);
        redisUtils.set(token,user,300);
//        usermap.put(code,user);
        redirect_uri=redirect_uri+"?code="+code+"&state="+state;
        log.warn("redirect_uri===:"+redirect_uri);
        log.warn("authorize cost time:" + (System.currentTimeMillis() - startTime)+ "ms");
        response.sendRedirect(redirect_uri);
        return null;
    }

    /**
     * 获取用户信息
     * @param appid
     * @param secret
     * @param code
     * @param grant_type
     * @return
     */
    @RequestMapping("/access_token")
    @ResponseBody
    public Object access_token(String appid,String secret,String code,String grant_type){
        if(!f_appid.equals(appid) || !f_appsecret.equals(secret)){
            return R.error("appid或者secret不正确");
        }
        if(!StringUtil.checkStr(code)){
            return R.error("code为空");
        }
        WxUser user = redisUtils.get(code,WxUser.class);
        return user;
    }

    /**
     * 拉取用户信息
     * @param access_token
     * @param openid
     * @param lang
     * @return
     */
    @RequestMapping("/userinfo")
    @ResponseBody
    public Object userinfo(String access_token,String openid,String lang){
        if(!StringUtil.checkStr(access_token)){
            return R.error("code为空");
        }
        WxUser user = redisUtils.get(access_token,WxUser.class);
        return user;
    }


}
