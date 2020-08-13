package com.icloud.config.configparam;

import java.io.Serializable;

/**
 * Bean类 - 系统配置
 * @author zhanghaitao
 */

public class Setting implements Serializable{


	private String systemName;// 系统名称
	private String systemVersion;// 系统版本
	private String systemDescription;// 系统描述
	private String contextPath;
	private String htmlWords;//防xss攻击 敏感词过滤
	private String ignoreUrls;//免(xss,csrf)过滤url
	private String ignoreCsrfUrls;//免csrf过滤url


	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public String getSystemVersion() {
		return systemVersion;
	}

	public void setSystemVersion(String systemVersion) {
		this.systemVersion = systemVersion;
	}

	public String getSystemDescription() {
		return systemDescription;
	}

	public void setSystemDescription(String systemDescription) {
		this.systemDescription = systemDescription;
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}

	public String getHtmlWords() {
		return htmlWords;
	}

	public void setHtmlWords(String htmlWords) {
		this.htmlWords = htmlWords;
	}

	public String getIgnoreUrls() {
		return ignoreUrls;
	}

	public void setIgnoreUrls(String ignoreUrls) {
		this.ignoreUrls = ignoreUrls;
	}

	public String getIgnoreCsrfUrls() {
		return ignoreCsrfUrls;
	}

	public void setIgnoreCsrfUrls(String ignoreCsrfUrls) {
		this.ignoreCsrfUrls = ignoreCsrfUrls;
	}
}