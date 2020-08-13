package com.icloud.config.interceptor;

import com.icloud.annotation.SysLog;
import com.icloud.common.IpUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.NamedThreadLocal;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;

/**
 * 后台拦截器
 * @author leiyi
 *
 */
@Component
public class PermissionsInterceptor implements HandlerInterceptor {
	
	public static final String NO_INTERCEPTOR_PATH = ".*((_del)|(_getList)|(_input))";	//不对匹配该值的访问路径拦截（正则）
	
	public final static Logger log = LoggerFactory.getLogger(PermissionsInterceptor.class);

	private static final ThreadLocal<Long> startTimeThreadLocal =
			new NamedThreadLocal<Long>("PermissionsInterceptor StartTime");
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {

		long beginTime = System.currentTimeMillis();// 1、开始时间
		startTimeThreadLocal.set(beginTime);

		if (log.isDebugEnabled()){
			log.debug("开始计时: {}  URI: {}", new SimpleDateFormat("hh:mm:ss.SSS")
					.format(beginTime), request.getRequestURI());
		}
        printlnVisitInfo(request,handler);
//		HttpSession session = request.getSession();
//		Object obj = session.getAttribute("admin_user");
////		printlnVisitInfo(request,handler);
//		if(null==obj){
////			response.sendRedirect("/hyzypay/tologin");
//            response.sendRedirect("/house/tologin");
//			return false;
//		}
		return true;
//        if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest"))
//        {
//            return true;
//        }
//        String requestPath = request.getServletPath();
//		if(requestPath.matches(NO_INTERCEPTOR_PATH)){
//			return true;
//		}
//		List<BmsMenu> adminMenu = (List<BmsMenu>) session.getAttribute("admin_menu");
//		for(BmsMenu m:adminMenu){
//			if(m.getMenuUrl().indexOf(requestPath)>=0){
//				return true;
//			}
//		}
//	    ResponseUtils.renderText(response, "您暂无权限");
//		return false;
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

		long beginTime = startTimeThreadLocal.get();// 得到线程绑定的局部变量（开始时间）
		long endTime = System.currentTimeMillis(); 	// 2、结束时间
		long executeTime = endTime - beginTime;	// 3、获取执行时间
		startTimeThreadLocal.remove(); // 用完之后销毁线程变量数据
		if(ex!=null){
			ex.printStackTrace();
		}
//		BmsAdmin admin = (BmsAdmin) request.getSession().getAttribute("admin_user");

		//获取操作标签上的日志
        String logTitle = null;
        if(handler instanceof HandlerMethod) {
            HandlerMethod h = (HandlerMethod)handler;
            SysLog sysLog = h.getMethodAnnotation(SysLog.class);
            if(sysLog!=null){
                logTitle = h.getMethodAnnotation(SysLog.class).value();
            }
        }
		// 保存日志

		
	}
	
	/**
	 * @Description: 打印日志
	 * @param        @param request
	 * @param        @param handler
	 * @param        @throws IOException    
	 * @return       void 
	 * @throws
	 * @author       z
	 * @datetime     2018年7月3日上午10:50:26
	 */
	private void printlnVisitInfo(HttpServletRequest request,Object handler) throws IOException{
		 // 所有请求第一个进入的方法  
        String reqURL = request.getRequestURL().toString();  
        String ip = IpUtil.getIpAddr(request);
//        InputStream  is = request.getInputStream ();
        StringBuilder responseStrBuilder = new StringBuilder ();  
//        BufferedReader streamReader = new BufferedReader (new InputStreamReader (is,"UTF-8"));
        String inputStr;  
//         while ((inputStr = streamReader.readLine ()) != null)
//         responseStrBuilder.append (inputStr);
//         String parmeter = BodyReaderHttpServletRequestWrapper.getRequestBody(request);
//         log.info("BodyReaderHttpServletRequestWrapper===");
        String parmeter = null;
         if(parmeter==null){
             parmeter = request.getQueryString();
         }
       long startTime = System.currentTimeMillis();
       request.setAttribute("startTime", startTime);  
       if (handler instanceof HandlerMethod) {  
           StringBuilder sb = new StringBuilder(1000);  
           HandlerMethod h = (HandlerMethod) handler;  
           //Controller 的包名  
           sb.append("\nController: ").append(h.getBean().getClass().getName()).append("\n");  
           //方法名称  
           sb.append("Method    : ").append(h.getMethod().getName()).append("\n");  
           //请求方式  post\put\get 等等  
           sb.append("RequestMethod    : ").append(request.getMethod()).append("\n");  
           //所有的请求参数  
           sb.append("Params    : ").append(parmeter).append("\n");  
           //部分请求链接  
           sb.append("URI       : ").append(request.getRequestURI()).append("\n");  
            //完整的请求链接  
           sb.append("AllURI    : ").append(reqURL).append("\n");  
           //请求方的 ip地址  
           sb.append("request IP: ").append(ip).append("\n");  
           
           log.info(sb.toString());  
       }
	}

}
