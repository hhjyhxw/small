package com.icloud.common.sms;

import com.icloud.basecommon.util.http.HttpClientUtils;
import com.icloud.common.MD5Utils;

import java.util.HashMap;
import java.util.Map;

public class MobileMessageSms {
    //http 访问工具类
    private static HttpClientUtils httpClientUtils = new HttpClientUtils();

//    // 用户发送短信 APPID
//    private static String APPID="10000000";
//    // 访问路径  短信发送通用接口
//    //生产环境地址
//    private static String URL="http://sms.zl-club.com/sms/phoneSms/SendSms.do";
//    //测试服务器
////    private static String URL="http://61.129.52.143/sms/phoneSms/SendSms.do";
//    // 用户访问权限 key 值
//    private static String key="hAeSJgyDJS0OQN7EtWU6";

    private static String APPID="10000012";
//    private static String URL="http://sms.zhenlongvip.com/sms/phoneSms/SendSms.do";
    private static String URL="http://sms.zhenlongvip.com/sms/phoneSms/SendSms.do";

//    private static String key="wxccb43a09acc5a5c8";
    private static String key="gret54fejDeySEWfecdDc";
    private  static String tpl_id="SMS_75";//模板id

    /**
     *
     * 访问测试
     * @author zhanghaitao
     * @throws Exception
     */
//	public static void main(String[] args) throws Exception {
//
//		//手机号  验证码  发送
//		System.out.println(smsSend("15077144027", "HelloWorld!!!","SMS_01"));
//
//	}


    /**
     * @param phone 手机号码
     * @param tpl_value 发送内容
     * @param tpl_id    模板id
     * @return
     */
    public static String smsSend(String phone,String tpl_value,String tpl_id){

        // 参数封装顺序  注意大小写    用户分配的id、 手机号码 、 发送内容
        String parm="APPID="+APPID+"&phone="+phone+"&tpl_value="+tpl_value;

        // 增加参数 key  进行MD5加密       加密后的密文 用 Sign参数传送
        String Sign= MD5Utils.makeMD5(parm+"&key="+key);

        Map<String, String> dataMap = new HashMap<String,String>();
        dataMap.put("APPID",APPID);
        dataMap.put("phone",phone);
        dataMap.put("tpl_value",tpl_value);
        dataMap.put("tpl_id",tpl_id);
        dataMap.put("Sign",Sign);
        //http post 请求   demo有帮助文档
        //参数新增 模版id tpl_id
        return httpClientUtils.post(URL,dataMap,"UTF-8");
    }



}
