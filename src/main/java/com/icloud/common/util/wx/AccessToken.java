package com.icloud.common.util.wx;

import java.io.Serializable;

/**
 * 
 */
public class AccessToken implements Serializable{

	private static final long serialVersionUID = 1L;

	private String token;//证书

	private int expiresIn;//微信服务器返回有效期秒数
	
	private Long createTime;//生成时间
	
	private Long allowTime=300L;//允许离失效时间差300s

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getExpiresIn() {
		return expiresIn;
	}

	public void setExpiresIn(int expiresIn) {
		this.expiresIn = expiresIn;
	}

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}

	//是否在有效期内
	public boolean isValid(Long nowTime){
		if((nowTime-createTime)/1000-allowTime<expiresIn){
			return true;
		}
		return false;
	}
}
