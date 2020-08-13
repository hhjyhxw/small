
package com.icloud.config.interceptor;

import com.icloud.common.AjaxRequestUitl;
import com.icloud.common.util.StringUtil;
import com.icloud.config.global.Constants;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.modules.wx.service.WxUserService;
import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.result.WxMpOAuth2AccessToken;
import me.chanjar.weixin.mp.bean.result.WxMpUser;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;


/**
 * 微信端登录拦截器
 *
 * @author user
 *
 */
@Component
public class WxUserLoginInterceptor implements HandlerInterceptor {

    public final static Logger log = LoggerFactory.getLogger(WxUserLoginInterceptor.class);

	@Autowired
	private WxUserService wxUserService;

    @Autowired
    private WxMpService wxMpService;

	@Autowired
	private MyPropertitys myPropertitys;

//	//微信登录方式 请求微信服务器
//	private String code_user = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";
//    private String web_access_token = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
//    private String user_info = "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        /** 不缓存页面*/
        response.setDateHeader("Expires", 0);
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");


        Object user =  session.getAttribute("wx_user");
        if(null==user){
            //判断是否是异步请求
            if(AjaxRequestUitl.isAjaxRequest(request)){
                //是异步请求，返回 code
                log.error("{\"message\":\"用户未登录！\",\"code\":\"4001\"}");
                response.getWriter().write("{\"message\":\"accessToken为空！\",\"code\":\"4001\"}");
                return false;
            }
            String code = request.getParameter("code");
            if(StringUtils.isBlank(code)) {
                sendRedirectToWx(request,response);
				return false;
            }else {
                WxMpOAuth2AccessToken wxMpOAuth2AccessToken = wxMpService.oauth2getAccessToken(code);
                WxMpUser wxMpUser = wxMpService.oauth2getUserInfo(wxMpOAuth2AccessToken, null);
                user = getUserInfoByWxMpUser(wxMpUser);
                if (null == user) {
                    sendRedirectToWx(request, response);
                    return false;
                } else {
                    session.setAttribute("wx_user", user);
					session.setAttribute("service_domain", myPropertitys.getService_domain());
                }
            }
        }
        WxUser users = (WxUser)user;
        //用于其他方法获取用户信息
        request.setAttribute(Constants.USER_KEY, users);
        log.info("nick==="+users.getNickname()+";openid==="+users.getOpenid()+";uri==="+request.getRequestURI());
         return true;
	}



	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
	}

	/**
	 * @return
	 */
	private WxUser getUserInfoByWxMpUser(WxMpUser wxMpUser) {
		if(null!=wxMpUser){
			if(StringUtil.checkStr(wxMpUser.getOpenId())){
                WxUser user = getUserByOpenid(wxMpUser.getOpenId());
			    if(user!=null){
					user.setNickname(wxMpUser.getNickname());
					user.setHeadimgurl(wxMpUser.getHeadImgUrl());
					user.setModifyTime(new Date());
                    wxUserService.updateById(user);
			    }else if(null==user){
			    	user = new WxUser();
					user.setCreateTime(new Date());
					user.setModifyTime(new Date());
					user.setOpenid(wxMpUser.getOpenId());
					user.setHeadimgurl(wxMpUser.getHeadImgUrl());
					user.setNickname(wxMpUser.getNickname());
                    wxUserService.save(user);
			    }
			    return  user;
			}
			return null;
		}
		return null;
	}


	private WxUser getUserByOpenid(String openid) {
            WxUser users = wxUserService.findByOpenId(openid);
			return users;
	}
	/**
	 * 微信授权方式 重定向
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	private void sendRedirectToWx(HttpServletRequest request ,HttpServletResponse response) throws IOException{
        StringBuffer sburl = new StringBuffer();
        sburl.append(request.getScheme() + "://");
        sburl.append(request.getHeader("host"));
        sburl.append(request.getRequestURI());
        if (request.getQueryString() != null)
            sburl.append("?" + request.getQueryString());
//        String redirectUrl = URLEncoder.encode(sburl.toString(), "UTF-8");
        String redirectUrl = sburl.toString();
        log.info("request_url===" + redirectUrl);
        redirectUrl = wxMpService.oauth2buildAuthorizationUrl(redirectUrl,  WxConsts.OAuth2Scope.SNSAPI_USERINFO, null);
        log.info("redirect_url===" + redirectUrl);
        response.sendRedirect(redirectUrl);
	}

}
