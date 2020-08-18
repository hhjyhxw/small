package com.icloud.exceptions;

import com.alibaba.fastjson.JSONObject;
import com.icloud.common.R;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * API全局异常处理
 */
@ControllerAdvice(basePackages="com.icloud.api")
public class ApiGlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(ApiGlobalExceptionHandler.class);


	@ExceptionHandler(ApiException.class)
	@ResponseBody
	public R HandleServiceException(ApiException e){
        R response = new R();
        response.put("code", 134);
        response.put("msg", e.getMessage());
        String result = JSONObject.toJSONString(response);
        logger.info("[用户请求] ApiException, response=" + JSONObject.toJSONString(result));
		return response;
	}

    /**
     * 默认异常处理
     * @param e
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public R HandleApiException(Exception e){
        R response = new R();
        response.put("code", 500);
        response.put("msg", e.getMessage());
        String result = JSONObject.toJSONString(response);
        logger.info("[用户请求] ApiException, response=" + JSONObject.toJSONString(result));
        return response;
    }


}
