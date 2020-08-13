package com.icloud.config.interceptor;


import com.alibaba.fastjson.JSONObject;
import com.icloud.basecommon.util.lang.StringUtils;
import com.icloud.config.configparam.SettingUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.WebContentGenerator;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;


/**
 *防跨域脚本攻击、跨域访问伪造
 */
public class XssCsrfInterceptor implements HandlerInterceptor{
	
	public final static Logger logger = LoggerFactory.getLogger(XssCsrfInterceptor.class);


	private static List<String> ignoreURLs=new ArrayList<String>();//免过滤url

	private static String[] ignoreCSRFURLs=null;//免csrf过滤url

	private static String[] htmlWords=null;//敏感脚本词

//	static final ResourceBundle xssConfigbundle = ResourceBundle.getBundle("xssConfig");

	static {
//		String exactMatchedURLString = xssConfigbundle.getString("ignoreURLs");
		String exactMatchedURLString = SettingUtil.getGloablSetting().getIgnoreUrls();
		if (null != exactMatchedURLString) {

			String[] tmps = exactMatchedURLString.split(",");
				for (String tmp : tmps) {
					tmp = tmp.trim();
					if (tmp.length() > 0) {
						ignoreURLs.add(tmp);
					}
				}

		}
//		String htmlWordss = xssConfigbundle.getString("htmlWords");
		String htmlWordss = SettingUtil.getGloablSetting().getHtmlWords();
		if (null != htmlWordss) {
			htmlWords = htmlWordss.split(",");
		}else{
			htmlWords = new String[0];
		}
//		String ignoreCSRFURLstr = xssConfigbundle.getString("ignoreCSRFURLs");
		String ignoreCSRFURLstr = SettingUtil.getGloablSetting().getIgnoreCsrfUrls();
		if (null != ignoreCSRFURLstr) {
			ignoreCSRFURLs = ignoreCSRFURLstr.split(",");
		}else{
			ignoreCSRFURLs = new String[0];
		}

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
		logger.warn("XssCsrfInterceptor===" + reqeust.getRequestURI()+"&htmlWords==="+htmlWords.length);
		/* 预防CSRF攻击(跨域请求伪造),只针对POST请求进行拦截*/
		if (reqeust.getMethod().equalsIgnoreCase(WebContentGenerator.METHOD_POST) )
		{
			if(validateRequest(reqeust)) {
				//XSS预防
				return doXssFilter(reqeust, response);
			}
			else{
				//非法请求，跳转到错误页面
				logger.warn("CSRF warn: 访问来源异常 = " + response.getHeader("Referer") + ",[uri] = " + reqeust.getRequestURI());
				reqeust.getRequestDispatcher("/warn.html").forward(reqeust, response);
				return false;
			}
		}
		else{
			//XSS预防
			return doXssFilter(reqeust, response);
		}
//		return true;
	}




	/**
	 * 验证请求的合法性，防止跨域访问伪造攻击(csrf)
	 * @param request
	 * @return
	 */
	private boolean validateRequest(HttpServletRequest request) {

		boolean referer_sign = true;// true 站内提交，验证通过 //false 站外提交，验证失败
		if(!checkExistCsrfUrl(request.getRequestURI())){//判断是否有免过滤url,有自己放行
			String referer = request.getHeader("Referer");
			// 判断是否存在请求页面
			if(StringUtils.isBlank(referer))
			{
				referer_sign = false;
			}
			else{
				// 判断请求页面和getRequestURI是否相同
				String servername_str = request.getServerName();
				if(StringUtils.isNotBlank(servername_str))
				{
					if(!referer.contains(servername_str))
					{
						referer_sign = false;
					}
				}
				else{
					referer_sign = false;
				}
			}
		}
		return referer_sign;
	}

	/**
	 * 判断参数值是否包含定义的免csrf过滤的url
	 * @param
	 * @return
	 */
	private boolean checkExistCsrfUrl(String url) {

		boolean exist = false;
		if ((ignoreCSRFURLs != null) && (ignoreCSRFURLs.length > 0))
		{
			for (String csrfUrl : ignoreCSRFURLs)
			{
				if(url.contains(csrfUrl.trim()))
				{
					exist = true;
					break;
				}
			}
		}
		return exist;
	}

	//判断是否包含敏感字（防跨域脚本攻击）,不合法,则跳转到错误提示页面
	private boolean doXssFilter(ServletRequest request, ServletResponse response)throws IOException, ServletException {

		HttpServletRequest res = ((HttpServletRequest) request);
		HttpServletResponse rep = ((HttpServletResponse)response);
		if(!validateRequestParames(res))
		{
			logger.warn("XSS warn: 非法请求参数 = " + res.getRequestURI());
			//判断请求头是否X-Requested-With: XMLHttpRequest
			String XRequestedWith = res.getHeader("X-Requested-With");
			if(XRequestedWith != null && "XMLHttpRequest".equals(XRequestedWith))
			{   writeAjaxRepMsg(rep);
				return false;
			}
			res.getRequestDispatcher("/warn.html").forward(res, rep);
			return false;
		}
		else{
			return true;
		}
	}

	/**
	 * ajax方式提交时候返回错误json格式返回
	 * @param rep
	 */
	private void writeAjaxRepMsg(HttpServletResponse rep) {
		Map map = new HashMap();
		map.put("success", false);
		map.put("rspText", "亲~请勿随意输入非法字符哦!");
		JSONObject obj = new JSONObject(map);
		try{
			rep.setCharacterEncoding("UTF-8");
			rep.setContentType("application/json;charset=utf-8");
			PrintWriter pw = rep.getWriter();
			pw.write(obj.toString());
			pw.flush();
			pw.close();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}


	/**
	 * 验证请求参数的合法性，防止XSS攻击(跨域脚本攻击)
	 * @param request
	 * @return
	 */
	private boolean validateRequestParames(HttpServletRequest request) {

		boolean pass = true;

		if(!checkExistIgnoreURLs(request)){//判断是否存在免过滤url
			//验证参数中的值是否合法
			Map map = request.getParameterMap();
			Iterator<String> itr = map.keySet().iterator();
			String key;
			String[] values;
			while(itr.hasNext()){
				key = itr.next();
				values = request.getParameterValues(key);
				for (int i = 0; i < values.length; i++) {
					if(checkExistHtmlWord(values[i])){
						logger.warn("validateRequestParames，存在html关键字----key:"+key+"----value:"+values[i]);
						pass = false;
						break;
					}
					if(values[i].contains("<")){
						logger.warn("validateRequestParames，存在特殊字符----key:"+key+"----value:"+values[i]);
						pass = false;
						break;
					}
            /*if(values[i].contains(">")){
               System.out.println("validateRequestParames，存在特殊字符----key:"+key+"----value:"+values[i]);
               pass = false;
               break;
            }*/
					if(values[i].contains("$")){
						logger.warn("validateRequestParames，存在特殊字符----key:"+key+"----value:"+values[i]);
						pass = false;
						break;
					}
				}
				if(!pass) break;
			}
		}
		return pass;
	}

	/**
	 * 验证请求是否存在被忽略的请求中
	 *
	 * @param request
	 * @return
	 */
	private boolean checkExistIgnoreURLs(HttpServletRequest request) {

		boolean exist = false;

		String requestURI = request.getRequestURI();

		if (!ignoreURLs.isEmpty())
		{
			for (String url : ignoreURLs)
			{
				if(requestURI.contains(url))
				{
					exist = true;
					break;
				}
			}
		}
		return exist;
	}

	/**
	 * 判断参数值是否包含定义的html关键词
	 * @param
	 * @return
	 */
	private boolean checkExistHtmlWord(String paramterValue) {

		boolean exist = false;

		if ((htmlWords != null) && (htmlWords.length > 0))
		{
			for (String htmlWord : htmlWords)
			{
				if(paramterValue.contains(htmlWord.toLowerCase()))
				{
					exist = true;
					break;
				}
			}
		}
		return exist;
	}

}
