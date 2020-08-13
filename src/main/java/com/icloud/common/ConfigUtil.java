package com.icloud.common;

import java.util.ResourceBundle;

/**
 * 项目参数工具类
 */
public class ConfigUtil {

	private static final ResourceBundle bundle = java.util.ResourceBundle.getBundle("config");

	/**
	 * 通过键获取值
	 * @param key
	 */
	public static final String get(String key) {
		return bundle.getString(key);
	}

	/**
	 * 获取管理端根路径
	 */
	public static String getBackPath() {
		return get("backPath");
	}

	/**
	 * 获取前端根路径
	 */
	public static String getFrontPath() {
		return get("frontPath");
	}


}
