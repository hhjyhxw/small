package com.icloud.basecommon.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class RequestIpUtil {
	
	public final static Logger log = LoggerFactory.getLogger(RequestIpUtil.class);

	/**
	 * ip黑名单
	 */
	public static List<String> backIpList = new ArrayList<String>();
	static{
		backIpList.add("127.0.0.1");
	}
	
	/**
	 * 获取请求的ip
	 * @param request
	 * @return
	 */
	 public static String getIpAddress(HttpServletRequest request) {  
	        String ip = request.getHeader("x-forwarded-for");  
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	            ip = request.getHeader("Proxy-Client-IP");  
	        }  
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	            ip = request.getHeader("WL-Proxy-Client-IP");  
	        }  
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	            ip = request.getHeader("HTTP_CLIENT_IP");  
	        }  
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	            ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
	        }  
	        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	            ip = request.getRemoteAddr();  
	        }  
	        log.error("来访Ip==="+ip);
	        return ip;  
	    } 
	 
	    public static boolean isAllow(HttpServletRequest request){
	    	String ip = getIpAddress(request);
	    	if(backIpList.indexOf(ip)>=0){
	    		return false;
	    	}
			return true;
	    }
	 
}
