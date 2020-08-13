package com.icloud.exceptions;

/**
 * 后台保存表单 异常处理
 * @author user
 *
 */
public class BeanSaveException extends RuntimeException {
	private String statusCode;
	private String message;
	public BeanSaveException(){
		super();
	}

	public BeanSaveException(String statusCode,String message){
		super();
		this.statusCode=statusCode;
		this.message = message;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
