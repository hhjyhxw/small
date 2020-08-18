package com.icloud.exceptions;

import lombok.Data;


@Data
public class ApiException extends RuntimeException {

    private int code;
    private String msg;
    public ApiException(){
        super();
    }
    public ApiException(String message){
        super(message);
        this.code=134;
        this.msg = message;
    }
    public ApiException(int code, String message){
        super(message);
        this.code=code;
        this.msg = message;
    }

}
