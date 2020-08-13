//package com.icloud.basecommon.web;
//
//import com.alibaba.fastjson.JSONObject;
//import com.icloud.common.util.wx.AccessTokenUtil;
//import com.icloud.common.util.wx.CommonUtil;
//import com.icloud.common.util.wx.WxConst;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//@Controller
//@RequestMapping(value = "/test/testBaseAccetoken")
//public class TestBaseAccetokenController {
//
//    @Autowired
//    private AccessTokenUtil accessTokenUtil;
//
//    @RequestMapping(value = "/testSendMessage")
//    public void testSendMessage(){
//        JSONObject jsonObj = new JSONObject();
//        JSONObject data = new JSONObject();
//        JSONObject first = new JSONObject();
//        first.put("value", "新订单提醒!\n");// 开头语
//        first.put("color", "#F90E32");
//
//        JSONObject keyword1 = new JSONObject();// 订单名称
//        keyword1.put("value", "6767订单");
//        keyword1.put("color", "#173177");
//
//        JSONObject keyword2 = new JSONObject();// 订单价格
//        keyword2.put("value", "200");
//        keyword2.put("color", "#173177");
//
//        JSONObject keyword3 = new JSONObject();// 订单数量
//        keyword3.put("value", "3");
//        keyword3.put("color", "#173177");
//
//        JSONObject keyword4 = new JSONObject();// 订单类型
//        keyword4.put("value", "自提");
//        keyword4.put("color", "#173177");
//
//        JSONObject keyword5 = new JSONObject();// 订单状态
//        keyword5.put("value", "已支付\n");
//        keyword5.put("color", "#173177");
//
//        JSONObject remark = new JSONObject();
//        remark.put("value", "请您尽快备货！");
//        remark.put("color", "#173177");
//        data.put("first", first);
//        data.put("keyword1", keyword1);
//        data.put("keyword2", keyword2);
//        data.put("keyword3", keyword3);
//        data.put("keyword4", keyword4);
//        data.put("keyword5", keyword5);
//        data.put("remark", remark);
//        jsonObj.put("template_id",
//                "grYBsaef_h4ITjREF0W9ISQj_BUlAIN5TMUuYdBzEzw");
//        jsonObj.put(
//                "url",
//                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx64c5ebb35c4a5341&redirect_uri=http://www.haiyunzy.com/supplier/trade!searchList.action?parameters=unshipped&gh=gh_90d051ea91b3&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect");
//        jsonObj.put("topcolor", "#173177");
//        jsonObj.put("touser", "oCmvsju6SYK75ZuV15PvxuHIJo3A");
//        jsonObj.put("data", data);
//
//        String accessToken = accessTokenUtil.getToken();
//
//        JSONObject jsonObject = null;
//        try {
//            String urls = WxConst.SEND_TEMPLATE_MESSAGE_URL.replace("ACCESS_TOKEN", accessToken);
//            jsonObject = CommonUtil.httpRequest(urls, "POST", jsonObj.toJSONString());
//            if(jsonObject!=null && jsonObject.containsKey("errcode") && "40001".equals(jsonObject.getString("errcode"))) {
//                System.out.println("获取access_token失败:errcode=" + jsonObject.get("errcode") + ";errmsg=" + jsonObject.get("errmsg"));
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//
//}
