package com.icloud.xcx.web;

import com.alibaba.fastjson.JSON;
import com.icloud.xcx.service.XcxUserLoginService;
import com.icloud.xcx.util.RequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 小程序用户登录
 * @author z
 *
 */
@RestController
@RequestMapping(value = "/xcxpath/xcxUserLogin")
public class XcxUserLoginController {
    private Logger log = LoggerFactory.getLogger(getClass());
	@Autowired
	private XcxUserLoginService xcxUserLoginService;
 
	/**微信小程序登录接口**/
	@ResponseBody
	@RequestMapping(value = "/wx/login")
	 public Map<String,Object> login(HttpServletRequest request) throws Exception {
		String jsonText = RequestUtil.readPostContent(request);
		 Map<String,Object> map = xcxUserLoginService.xcxlogin(jsonText,request);
        log.info(JSON.toJSONString(map));
        return map;
    }
	
	/**登录会话有效性验证**/
	@ResponseBody
	@RequestMapping(value="/wx/checkSession")
	public Map<String,Object> checkSession(HttpServletRequest request){
		String jsonText = RequestUtil.readPostContent(request);
        Map<String,Object> map = xcxUserLoginService.checkSession(jsonText,request);
        log.info(JSON.toJSONString(map));
        return map;
	}
	
	/**用户信息**/
	@ResponseBody
	@RequestMapping(value="/wx/userInfo")
	public Map<String,Object> userInfo(HttpServletRequest request){
		String jsonText = RequestUtil.readPostContent(request);  
		return xcxUserLoginService.getWxUser(jsonText);
	}
	
}
