package com.icloud.config.interceptor;

import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.common.IpUtil;
import com.icloud.config.global.Constants;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.modules.wx.service.WxUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class ApiLoginInterceptor_local extends HandlerInterceptorAdapter {
    private Logger log = LoggerFactory.getLogger(getClass());
    @Autowired
    private WxUserService wxUserService;
    @Autowired
    private RedisService redisService;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        printlnVisitInfo(request,handler);

        /** 不缓存页面*/
        response.setDateHeader("Expires", 0);
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        HttpSession session = request.getSession();
        WxUser user = (WxUser) session.getAttribute("wx_user");
        if(null==user){
            user = wxUserService.findByOpenId("ocoMKt2a_9XrLt2NBG5CupS6THE4");
            session.setAttribute("wx_user",user);
        }
        request.setAttribute(Constants.USER_KEY, user);
        return true;
    }

    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {

    }

    private void printlnVisitInfo(HttpServletRequest request,Object handler) throws IOException {
        // 所有请求第一个进入的方法
        String reqURL = request.getRequestURL().toString();
        String ip = IpUtil.getIpAddr(request);
//        InputStream is = request.getInputStream ();
//        StringBuilder responseStrBuilder = new StringBuilder ();
//        BufferedReader streamReader = new BufferedReader (new InputStreamReader(is,"UTF-8"));
//        String inputStr;
//        while ((inputStr = streamReader.readLine ()) != null)
//            responseStrBuilder.append (inputStr);
//        String parmeter = responseStrBuilder.toString();

        String parmeter = null;

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
