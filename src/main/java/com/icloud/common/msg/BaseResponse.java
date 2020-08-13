package com.icloud.common.msg;

/**
 * Created by ace on 2017/8/23.
 */
public class BaseResponse {
    private int status = 200;
    private String code;
    private String message;

    public BaseResponse(int status,String code, String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public BaseResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
