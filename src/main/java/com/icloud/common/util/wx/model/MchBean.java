/**    
  * @package     : com.hyzy.mall.wx.api.model 
  * @description : TODO(用一句话描述该包做什么) 
  * @Copyright   : hyzy Corporation 2015    
  */
package com.icloud.common.util.wx.model;

/**   
 * @filename     : MchBean.java   
 * @description  : 商户基本信息
 * @version      : V 1.0
 * @author       : fuxing
 * @create       : 2015-4-1 下午4:05:55  
 * @Copyright    : hyzy Corporation 2015    
 * 
 * Modification History:
 * 	Date			Author			Version			Description
 *--------------------------------------------------------------
 *2015-4-1 下午4:05:55
 */
public class MchBean {
	
	/** 公众号id*/
	protected String appid;
	/** APPSECRET*/
	protected String appsecret;
	/**时间戳 */
	protected String timeStamp;
	/**随机字符串*/
	protected String nonceStr;
	/** 商户号ID*/
	protected String mch_id;
	
	
	/**
	 *  存放所有零售商的Token 在项目启动完成获得所有的零售商信息  
	 *  然后取得所有的Token存放在这个MAP里  
	 *  有专门的定时任务两小时刷新一次从新获取Token
	 *  TimerTaskUtil  TimerTaskListener
	 */
//  public static Map<String,AccessToken> AccessTokenMap ; 
    /** 
	 *  存放所有零售商的JsApiTicket 在项目启动完成获得所有的零售商信息  
	 *  然后取得所有的JsApiTicket存放在这个MAP里  
	 *  有专门的定时任务两小时刷新一次从新获取JsApiTicket
	 *  需要获取Ticket时 可以直接使用不用再次发起请求
	 *  TimerTaskUtil  TimerTaskListener
	 */
 //  public static Map<String,JsApiTicket> JsApiTicketMap;
    
	public String getAppid() {
		return appid;
	}
	public void setAppid(String appid) {
		this.appid = appid;
	}
	public String getAppsecret() {
		return appsecret;
	}
	public void setAppsecret(String appsecret) {
		this.appsecret = appsecret;
	}
	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}
	public String getNonceStr() {
		return nonceStr;
	}
	public void setNonceStr(String nonceStr) {
		this.nonceStr = nonceStr;
	}
	public String getTimeStamp() {
		return timeStamp;
	}
	public String getMch_id() {
		return mch_id;
	}
	public void setMch_id(String mch_id) {
		this.mch_id = mch_id;
	}
	
}
