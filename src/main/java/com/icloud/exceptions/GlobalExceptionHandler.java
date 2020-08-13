//package com.icloud.exceptions;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.alibaba.fastjson.JSONObject;
//
///**
// * 后台全局异常
// *
// */
//@ControllerAdvice
//public class GlobalExceptionHandler {
//
//	@ExceptionHandler(BeanException.class)
//	public String HandleBeanException(Exception ex,HttpServletRequest request){
//		request.setAttribute("error_msg", ex.getMessage());
//		return "back_error";
//	}
//
//	@ExceptionHandler(BeanSaveException.class)
//	@ResponseBody
//	public JSONObject HandleBeanSavException(BeanSaveException ex){
//		JSONObject json = new JSONObject();
//		json.put("code", ex.getStatusCode());
//		json.put("message", ex.getMessage());
//		return json;
//	}
//}
