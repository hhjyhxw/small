package com.icloud.aspect;


import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;


/**
 * Created by 512162086@qq.com on 2018/8/22 .
 * 日志切面，切入需要加日志的方法
 */
@Slf4j
@Aspect
@Component
public class ApiLogAspect {

//    public final static Logger log = LoggerFactory.getLogger(ApiLogAspect.class);
//            （* com.evan.crm.service.*.*（..））中几个通配符的含义：
//            |第一个 * —— 通配 随便率性返回值类型|
//            |第二个 * —— 通配包com.evan.crm.service下的随便率性class|
//            |第三个 * —— 通配包com.evan.crm.service下的随便率性class的随便率性办法|
//            |第四个 .. —— 通配 办法可以有0个或多个参数|

    @Pointcut("execution(* com.icloud.api.small..*.*(..))")
    public void apiLog(){}

//    @Around("webLog()")
    @Before("apiLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {

        // 接收到请求，记录请求内容
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();


        // 记录下请求内容
        log.info("请求URL : " + request.getRequestURL());
        log.info("请求IP : " + request.getRemoteAddr());
        log.info("请求方法 : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());

        // 只记录post方法
        if("POST".equals(request.getMethod())){
            // 获取参数, 只取自定义的参数, 自带的HttpServletRequest, HttpServletResponse不管
            if (joinPoint.getArgs().length > 0) {
                for (Object o : joinPoint.getArgs()) {
                    if (o instanceof HttpServletRequest || o instanceof HttpServletResponse) {
                        continue;
                    }
                    log.info("请求参数 : " + JSON.toJSONString(o));
                }
            }
        }else {
            Enumeration<String> names = request.getParameterNames();
            // 请求参数转换JSON 对象
            List<Map> container = new ArrayList<Map>();
            while (names.hasMoreElements()) {
                Map<String, String> map = new HashMap<String, String>();
                String key = names.nextElement();
                String value = request.getParameter(key);
                map.put(key, value);
                container.add(map);
            }
            log.info("请求参数 : " + JSON.toJSONString(container));
        }

    }

//    @AfterReturning(returning = "ret", pointcut = "apiLog()")
    public void doAfterReturning(Object ret) throws Throwable {
        // 处理完请求，返回内容
        log.info("返回 : " + JSON.toJSONString(ret));
    }


}
