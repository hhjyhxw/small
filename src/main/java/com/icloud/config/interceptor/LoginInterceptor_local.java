package com.icloud.config.interceptor;


import com.icloud.config.global.Constants;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.modules.wx.service.WxUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


/**
 * 手机端全局拦截器
 */
@Component
public class LoginInterceptor_local implements HandlerInterceptor{

	public final static Logger log = LoggerFactory.getLogger(LoginInterceptor_local.class);
    @Autowired
	private WxUserService wxUserService;
    @Autowired
    private MyPropertitys myPropertitys;
	@Override
	public void afterCompletion(HttpServletRequest reqeust, HttpServletResponse response, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
	}

	@Override
	public void postHandle(HttpServletRequest reqeust, HttpServletResponse response, Object arg2, ModelAndView arg3)
			throws Exception {

	}
//
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
        /** 不缓存页面*/
        response.setDateHeader("Expires", 0);
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        HttpSession session = request.getSession();

        log.info("myPropertitys.wx.appid=="+(myPropertitys.getWx().getAppid()));

        WxUser user = (WxUser) session.getAttribute("wx_user");
        if(null==user){
            user = wxUserService.findByOpenId("ocoMKt2a_9XrLt2NBG5CupS6THE4");
            session.setAttribute("wx_user",user);
        }
        request.setAttribute(Constants.USER_KEY, user);
        return true;
	}

	public Object getBean(String beanName,HttpServletRequest request){
		BeanFactory factory = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
	    return factory.getBean(beanName);
	}

}
