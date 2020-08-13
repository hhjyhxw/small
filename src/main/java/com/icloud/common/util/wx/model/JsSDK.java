/**    
  * @package     : com.hyzy.mall.wx.api.model 
  * @description : TODO(用一句话描述该包做什么) 
  * @Copyright   : hyzy Corporation 2015    
  */
package com.icloud.common.util.wx.model;

import com.icloud.common.util.wx.PayUtil;


/**   
 * @filename     : JsSDK.java   
 * @description  : TODO JSSDK实体类
 * @version      : V 1.0
 * @author       : FUXING
 * @create       : 2015-3-30 下午5:58:24  
 * @Copyright    : HYZY Corporation 2015    
 * 
 * Modification History:
 * 	Date			Author			Version			Description
 *--------------------------------------------------------------
 *2015-3-30 下午5:58:24
 */

public class JsSDK extends MchBean {


	/** 签名 */
	private String sign; 
	/** 生成签名必须参数  */
	private String jsTick; 
	/** 调起JS目录 用来签名  */
	private String url;
    public JsSDK(){}
	/**
	 * @author fwx215666
	 * @description 构造出调用JS方法的必须参数
	 * */
	public JsSDK(String appid,String appsecret,String url) throws Exception{
		
		
		this.appid     = appid;
		this.appsecret = appsecret;
		
		//原来获取JsApiTicket
		//this.jsTick    = JsApiTicketMap.get(appid).getJsApiTicket();
		//现在获取JsApiTicket
//		this.jsTick    =AccessTokenAndJsapiTicketUtil.getJsapiTicket();
		
		
		this.url = url;
		this.timeStamp = PayUtil.getTimeStamp();
		this.nonceStr  = PayUtil.getStrReq();
		this.sign      = PayUtil.createSHA1Sign(PayUtil.getJSApiParams(this));
	}
	 
	public String getSign() {
		return sign;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
	public String getJsTick() {
		return jsTick;
	}
	public void setJsTick(String jsTick) {
		this.jsTick = jsTick;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

}
