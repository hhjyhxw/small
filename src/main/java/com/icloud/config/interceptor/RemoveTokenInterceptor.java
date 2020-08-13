package com.icloud.config.interceptor;


import com.icloud.exceptions.FormRepeatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 拦截器删除token
 */
public class RemoveTokenInterceptor implements HandlerInterceptor{
	
	public final static Logger log = LoggerFactory.getLogger(RemoveTokenInterceptor.class);
	@Override
	public void afterCompletion(HttpServletRequest reqeust, HttpServletResponse response, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
	}

	@Override
	public void postHandle(HttpServletRequest reqeust, HttpServletResponse response, Object arg2, ModelAndView arg3)
			throws Exception {
 
	}

	@Override
	public boolean preHandle(HttpServletRequest reqeust, HttpServletResponse response, Object arg2) throws Exception {
		 if (isRepeatSubmit(reqeust)) {
             log.error("表单重复提交");
             throw new FormRepeatException("表单重复提交");
         }
		 reqeust.getSession(false).removeAttribute( "payToken" );
         return true;
	}
	
	

    private boolean isRepeatSubmit(HttpServletRequest request) throws FormRepeatException {
        String serverToken = (String) request.getSession( false ).getAttribute( "payToken" );
        if (serverToken == null ) {
            //throw new FormRepeatException("session 为空");
            return true;
        }
        String clinetToken = request.getParameter( "clientToken" );
        if (clinetToken == null || clinetToken.equals("")) {
            //throw new FormRepeatException("请从正常页面进入！");
            return true;
        }
        if (!serverToken.equals(clinetToken)) {
            //throw new FormRepeatException("重复表单提交！");
            return true ;
        }
        log.warn("校验是否重复提交：表单页面payToken值为："+clinetToken + ",Session中的payToken值为:"+serverToken);
        return false ;
    }

}
