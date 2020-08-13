package com.icloud.config.interceptor;


import com.alibaba.fastjson.JSONObject;
import com.icloud.common.ConfigUtil;
import com.icloud.common.IpUtil;
import com.icloud.common.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;


/**
 * 第三方ip拦截器
 */
public class ThirdInterfaceInterceptor implements HandlerInterceptor{
	
	public final static Logger log = LoggerFactory.getLogger(ThirdInterfaceInterceptor.class);
	public static Map<String,String> ipMap = new HashMap<String,String>();
	static {
		String[] iplist = ConfigUtil.get("iplist").split(",");
		for (String ip:iplist){
			ipMap.put(ip,ip);
		}
//
//		ipMap.put("192.168.1.108","192.168.1.108");
//		ipMap.put("192.168.29.2","192.168.29.2");
//		//对接9号店接口,即开酷吗
//		ipMap.put("118.89.30.53","118.89.30.53");


	}
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
		String key = IpUtil.getIpAddr(reqeust);
		log.info("ip==="+key);
		if(StringUtil.checkStr(key)){
			if(StringUtil.checkObj(ipMap.get(key))){
				return true;
			}
		}

		response.setContentType("text/html; charset=utf-8");
		PrintWriter writer = response.getWriter();
		JSONObject result = new JSONObject();
		result.put("status","4");
		result.put("message","ip鉴权失败");
		writer.print(result);
		writer.close();
		response.flushBuffer();
		return false;
	}
	

}
