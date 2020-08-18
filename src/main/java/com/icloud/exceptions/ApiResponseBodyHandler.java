package com.icloud.exceptions;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * API全局返回结果日志打印
 */
@ControllerAdvice(basePackages="com.icloud.api")
public class ApiResponseBodyHandler  implements ResponseBodyAdvice {

    private static final Logger logger = LoggerFactory.getLogger(ApiResponseBodyHandler.class);

    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        //获取当前处理请求的controller的方法
        String methodName=methodParameter.getMethod().getName();
        logger.info("methodName::"+methodName);
        // 不拦截/不需要处理返回值 的方法
//        String method= "loginCheck"; //如登录
//        //不拦截
//        return !method.equals(methodName);
        return true;//拦截所有 com.icloud.ap 下的
    }

    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        logger.info("api_result=="+ JSON.toJSONString(o));
        return o;
    }
}
