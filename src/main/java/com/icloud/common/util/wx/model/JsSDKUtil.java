/**    
  * @package     : com.hyzy.mall.wx.api.model 
  * @description : TODO(用一句话描述该包做什么) 
  * @Copyright   : hyzy Corporation 2015    
  */
package com.icloud.common.util.wx.model;

import com.icloud.common.util.AccessTokenAndJsapiTicketUtil;
import com.icloud.common.util.wx.PayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


/**   
 * Modification History:
 *--------------------------------------------------------------
 */
@Component
public class JsSDKUtil  {

    @Autowired
    private AccessTokenAndJsapiTicketUtil accessTokenAndJsapiTicketUtil;

	public JsSDK getJssdk(String appid,String url){

        try {
            JsSDK jssdk = new JsSDK();
            jssdk.setUrl(url);
            jssdk.setAppid(appid);
            jssdk.setJsTick(accessTokenAndJsapiTicketUtil.getJsapiTicket());
            jssdk.setTimeStamp(PayUtil.getTimeStamp());
            jssdk.setNonceStr(PayUtil.getNonceStr());
            jssdk.setSign(PayUtil.createSHA1Sign(PayUtil.getJSApiParams(jssdk)));
            return jssdk;
        } catch (Exception e) {
            e.printStackTrace();
        }
       return null;
    }
}
