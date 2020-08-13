//package com.icloud.common.util.wx;
//
//import java.io.BufferedReader;
//import java.io.InputStream;
//import java.io.InputStreamReader;
//import java.io.OutputStream;
//import java.io.OutputStreamWriter;
//import java.io.PrintWriter;
//import java.net.ConnectException;
//import java.net.HttpURLConnection;
//import java.net.SocketTimeoutException;
//import java.net.URL;
//import java.text.SimpleDateFormat;
//import java.util.*;
//
//import javax.net.ssl.HttpsURLConnection;
//
//import org.junit.Test;
//
//import com.alibaba.fastjson.*;
//
//public class WxWithoutImccUtil {
//	private static  ResourceBundle bundle;
//	private static  String wx_host;
//	private static  String wx_hosttel;
//	private static  String wx_hostnumber;
//	static{
//		bundle = ResourceBundle.getBundle("weixin");
//		wx_host       = getPropValByKey("wx_host");
//		wx_hosttel    = getPropValByKey("wx_hosttel");
//		wx_hostnumber = getPropValByKey("wx_hostnumber");
//	}
//	/**通过键获取值@param key*/
//	public static  void  reloadPropConfg() {
//		bundle = ResourceBundle.getBundle("weixin");
//	}
//	/**通过键获取值@param key*/
//	public static  String getPropValByKey(String key) {
//		return bundle.getString(key);
//	}
//
//	/**
//	 * @param url           微信公众平台https://mp.weixin.qq.com文档上说明的地址   
//	 * @param jsonData      请求微信的json参数   
//	 * @param host          服务器地址和端口 如:211.159.184.84:7003
//	 * @param hosttel       一般为15709
//	 * @param hostnumber    公众号id 如:gh_3d9742641f8b 真龙测试公众号
//	 * @param requestMethod http请求方式:POST(默认)/GET
//	 * @return 阿里巴巴JSONObject对象
//	 */
//	
//	public static JSONObject invoke(String url,String jsonData,String host,String hosttel,String hostnumber,String requestMethod){
//		JSONObject jsonObj = null;
//		if(null==url || null==jsonData){
//			jsonObj = new JSONObject();
//			jsonObj.put("", "");
//			
//			return jsonObj;
//		}
//		if(null==host       || 
//		   null==hosttel    ||
//		   null==hostnumber ||
//		   null==requestMethod){
//			host=wx_host;
//			hosttel=wx_hosttel;
//			hostnumber=wx_hostnumber;
//			requestMethod="POST";
//		}
//		//一.获取access_token
//		String access_token = getAccesssToken();
//		//二.拼接/替换请求地址
//		url += access_token;
//		//三.调用网络链接,返回JSONObject对象
//		jsonObj = httpRequest(url, jsonData, requestMethod);
//		return jsonObj;
//	}
//	/**
//	 * @param url 微信公众平台https://mp.weixin.qq.com文档上说明的地址
//	 * @return    阿里巴巴JSONObject对象
//	 */
//	public static JSONObject invoke(String url,String jsonData){
//		return invoke(url,jsonData,null,null,null,null);
//	}
//	public static String getAccesssToken(String host,String hosttel,String hostnumber,String requestMethod){
//		//获取access_token的访问地址
//		String accessTokenAccessAddress = "http://"+host+"/mc/comm_protocol?hostel="+hosttel
//				                                      +"&imtype=161"// 161代表微信
//				                                      +"&hostnumber="+hostnumber
//				                                      +"&waitret=true";		
//		StringBuilder rtn = new StringBuilder();
//		OutputStream os = null;
//		PrintWriter pw = null;
//		BufferedReader in = null;
//		try {
//			URL url = new URL(accessTokenAccessAddress);
//			HttpURLConnection uc = (HttpURLConnection) url.openConnection();
//			uc.setConnectTimeout(2000); // 连接超时设置为2s
//			uc.setReadTimeout(35000);   // 读超时设置为35s
//			uc.setDoOutput(true);       // 因为这个是post请求，参数要放在http正文内，因此需要设为true，默认情况下是false
//			uc.setUseCaches(false);     // post请求不能使用缓存
//			// 设定传送的内容类型是可序列化的java对象(如果不设此项,在传送序列化对象时,当WEB服务默认的不是这种类型时可能抛java.io.EOFException)
//			uc.setRequestProperty("Content-type", "text/xml;charset=utf-8");
//			
//			if(null != requestMethod && "GET".equalsIgnoreCase(requestMethod)){
//				uc.setRequestMethod("GET"); //设定请求的方法为"POST"，默认是GET
//			}else{
//				uc.setRequestMethod("POST"); // 设定请求的方法为"POST"，默认是GET
//			}
//			
//			uc.connect();
//
//			os = uc.getOutputStream();
//			OutputStreamWriter out = new OutputStreamWriter(os, "utf-8");
//			pw = new PrintWriter(out);
//			//固定gethostnumberinfo
//			pw.print("gethostnumberinfo");
//			pw.flush();
//
//			/* 获取服务器端返回信息 */
//			in = new BufferedReader(new InputStreamReader(uc.getInputStream(), "utf-8"));
//			String inputLine;
//			while ((inputLine = in.readLine()) != null) {
//				rtn.append(inputLine).append("\r\n");
//			}
//		} catch (SocketTimeoutException e) {
//			e.printStackTrace();
//			return "time_out";
//		} catch (Exception ex) {
//			System.out.println("获取异常" + ex);
//			return "exception";
//		} finally {
//			try {
//				if (pw != null) {
//					pw.close();
//					pw = null;
//				}
//				if (os != null) {
//					os.close();
//					os = null;
//				}
//				if (in != null) {
//					in.close();
//					in = null;
//				}
//			} catch (Exception ex) {
//				System.out.println("释放资源异常" + ex);
//			}
//		}
//		//获取请求返回的xml
//		String xml = rtn.toString();// TOKENCONTENT
//		int beginIndex = xml.indexOf("<apptoken>");
//		int endIndex   = xml.indexOf("</apptoken>");
//		String access_token = xml.substring(beginIndex, endIndex).replace("<apptoken>", "");
//		return access_token;
//	}
//	
//	public static String getAccesssToken(){
//		return getAccesssToken(wx_host,wx_hosttel,wx_hostnumber,"POST");
//	}
//	/**
//	 * 发起https请求并获取结果
//	 * @param requestUrl    请求地址
//	 * @param requestMethod 请求方式（GET、POST）
//	 * @param outputStr     提交的数据
//	 * @return JSONObject   (通过JSONObject.get(key)的方式获取json对象的属性值)
//	 */
//	public static JSONObject httpRequest(String requestUrl,  String jsonData, String requestMethod) {
//		JSONObject jsonObject = new JSONObject();
//		try {
//			URL url = new URL(requestUrl);
//			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url.openConnection();
//            //httpUrlConn.setSSLSocketFactory(ssf);
//			httpUrlConn.setDoOutput(true);
//			httpUrlConn.setDoInput(true);
//			httpUrlConn.setUseCaches(false);
//			
//			// 设置请求方式（GET/POST）
//			if(null != requestMethod && "GET".equalsIgnoreCase(requestMethod)){
//				httpUrlConn.setRequestMethod("GET");
//			}else{
//				httpUrlConn.setRequestMethod("POST");
//			}
//			
//			// 当有数据需要提交时(当outputStr不为null时，向输出流写数据)
//			if (null != jsonData) {
//				OutputStream outputStream = httpUrlConn.getOutputStream();
//				// 注意编码格式，防止中文乱码
//				outputStream.write(jsonData.getBytes("UTF-8"));
//				outputStream.close();
//			}
//
//			// 将返回的输入流转换成字符串
//			InputStream inputStream = httpUrlConn.getInputStream();
//			InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
//			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
//			String str = null;
//			StringBuffer buffer = new StringBuffer();
//			while ((str = bufferedReader.readLine()) != null) {
//				buffer.append(str);
//			}
//
//			// 释放资源
//			bufferedReader.close();
//			inputStreamReader.close();
//			inputStream.close();
//			inputStream = null;
//			httpUrlConn.disconnect();
//			//System.out.println("json is =="+buffer.toString());
//			jsonObject = JSONObject.parseObject(buffer.toString());
//		} catch (ConnectException ce) {
//			jsonObject.put("errcode", 999);
//			jsonObject.put("errmsg", "连接超时:"+ce.getMessage());
//		} catch (Exception e) {
//			jsonObject.put("errcode", 998);
//			jsonObject.put("errmsg", "https请求异常:"+e.getMessage());
//		}
//		return jsonObject;
//	}
//	
//	@Test
//	public void  test10GetAccesssToken(){
//		System.out.println("getAccesssToken==\n"+getAccesssToken());
//	}
//	/**--------------------*/
//	@Test
//	public void  test21CardCreate(){
//		//先用平台上能创建的卡券
//		JSONObject general_COUPON = card05GENERAL_COUPON();
//		System.out.println(general_COUPON);
//		System.out.println("创建卡券:");
//		System.out.println(invoke(getPropValByKey("card_url_create"),
//				                  general_COUPON.toString()));
//		
//	}
//	@Test
//	public void  test22CardRead(){
//		//先用平台上读取的方法
//	}
//	@Test
//	public void  test23CardUpdate(){
//		//先用平台上更新
//	}
//	@Test
//	public void  test24CardDelete(){
//		//先用平台上的删除
//	}
//	/*-----------------------*/
//	@Test
//	public void  test30CardHandOut(){
//		/*
//		  {
//				"action_name": "QR_CARD", ==>设计扫描单张卡券
//				"expire_seconds": 1800,   ==>设置扫码有效时间
//				"action_info": {
//					"card": {
//							"card_id": "pFS7Fjg8kV1IdDz01r4SQwMkuCKc", 
//							"code": "198374613512",
//							"openid": "oFS7Fjl0WsZ9AMZqrI80nbIq8xrA",
//							"is_unique_code": false ,==>是否随机生成code
//							"outer_str":"https://www.baidu.com?card_id=1&code=2&openid=3"
//					  }
//				 }
//			}
//		 */		
//		//一.获取操作的url
//		String url = getPropValByKey("card_url_hand_out");
//		//二.构建jsonData
//		JSONObject jsonData = new JSONObject();
//		
//		jsonData.put("action_name", "QR_CARD");
//		jsonData.put("expire_seconds", 1800);
//		
//		/*******************************************/
//		JSONObject action_info = new JSONObject();
//		JSONObject card = new JSONObject();
//		/*******************************************/
//		//card_id案例
//			//pcoMKtydaaJ56YleAwwzInXbY7Tk
//		card.put("card_id", "pcoMKtzJAHnd_xldKqH6aIXAXwk8");
//		
//	    SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdHHmmss");
//	    String code = sdf.format(new Date());
//	    java.util.Random random=new java.util.Random();// 定义随机类
//	    code = code +random.nextInt(10000);
//		//card.put("code", code);
//	    card.put("code", "555566667777");
//		//测试openid列表
//			//刘德斐ocoMKt2tbjN19AyRUhX1VfdLmo9Q
//			//韦文艺ocoMKt0xwDVzp9dVFCd-L8_6u7go
//			//李展文ocoMKtyPRNsa5mOi-U3sF-2A4klo
//			//林宝成ocoMKt_bOB-7uSk5NrAQkyLOQeQ0
//			//朱汝陞ocoMKt2T0KEJoWqPhadxabb-3C9g
//	        //庞洪梅ocoMKt5yHgNAmEHUztP1M0L8Y6Qg
//		card.put("openid", "ocoMKt5yHgNAmEHUztP1M0L8Y6Qg");
//		card.put("is_unique_code", false);//生成的二维码随机分配一个code,false自定义生成
//		card.put("outer_str", "https://www.baidu.com");
//		
//		//卡券信息封装
//		action_info.put("card", card);
//		jsonData.put("action_info", action_info);		
//		//三.调用方法
//		System.out.println("发放卡券:");
//		System.out.println(invoke(url,jsonData.toString().toString()));		
//	}
//	@Test
//	public void  test40CardWhiteList(){
//		/*
//			{
//			  "openid": [
//					      "o1Pj9jmZvwSyyyyyyBa4aULW2mA", 
//					      "o1Pj9jmZvxxxxxxxxxULW2mA"
//			            ],
//			  "username": [   ==>测试的微信号列表
//						      "afdvvf",
//						      "abcd"
//			              ]
//			 }		 
//		 */
//		//一.获取操作的url
//		String url = getPropValByKey("card_url_white_list");
//		//二.构建jsonData
//		JSONObject jsonData = new JSONObject();
//		List<String> openidList = new ArrayList<String>();
//			openidList.add("ocoMKt2tbjN19AyRUhX1VfdLmo9Q");//刘德斐
//			openidList.add("ocoMKt0xwDVzp9dVFCd-L8_6u7go");//韦文艺
//			openidList.add("ocoMKtyPRNsa5mOi-U3sF-2A4klo");//李展文
//			openidList.add("ocoMKt_bOB-7uSk5NrAQkyLOQeQ0");//林宝成
//		List<String> usernameList = new ArrayList<String>();
//			usernameList.add("gh_3d9742641f8b");
//		jsonData.put("openid", openidList);
//		jsonData.put("username", usernameList);		
//		//三.调用方法
//		System.out.println("设置白名单:");
//		System.out.println(invoke(url,jsonData.toString().toString()));	
//	}
//	
//	@Test
//	public void  test50CardVerification(){
//		/*
//			{
//			   "card_id" : "card_id_123+",
//			   "code" : "123456789",
//			   "check_consume" : true  ==>是否校验code核销状态
//			}		 
//		 */		
//		//一.获取操作的url
//		String url = getPropValByKey("card_url_verification");
//		//二.构建jsonData
//		JSONObject jsonData = new JSONObject();
//		jsonData.put("card_id", "pcoMKt-qkIR2Fs2XylvlKGNYjlFw");
//		jsonData.put("code", "002266641705");
//		jsonData.put("check_consume", false);		
//		//三.调用方法
//		System.out.println("核销卡券:");
//		System.out.println(invoke(url,jsonData.toString().toString()));
//	}
//	/**
//	 * 01折扣券
//	 */
//	public JSONObject card01DISCOUNT(){
//		
//		return null;
//	}
//	/**
//	 *02代金券 
//	 */
//	public JSONObject card02CASH(){
//		
//		return null;
//	}	
//	/**
//	 *03兑换券
//	 */
//	public JSONObject card03GIFT(){
//		
//		return null;
//	}	
//	/**
//	 * 04团购券
//	 */	
//	public JSONObject card04GROUPON(){
//		
//		return null;
//	}
//	/**
//	 * 05优惠券
//	 */
//	public JSONObject card05GENERAL_COUPON(){
//		/**
//			优惠券
//			{
//				"card":{
//					"card_type":"GENERAL_COUPON",
//			        "general_coupon":{
//							"base_info":{
//								"logo_url":"http://mmbiz.qpic.cn/mmbiz/CNS0dhd8vDNocreSH02mhuPga60wbaMnF84NDvlTE3rWc4YoXx6PaXkYvQRe7m2At9tAEPTEgxPDDWicHT7NUOA/0",
//								"brand_name":"真龙服务号84",
//								"code_type":"CODE_TYPE_QRCODE",
//								"title":"优惠券标题",
//								"sub_title":"优惠券副标题",
//								"color":"Color010",
//								"notice":"操作提示",
//								"service_phone":"17736618875",
//								"description":"使用须知",
//								"date_info":{
//									"type":"DATE_TYPE_FIX_TERM","fixed_term":30,
//									"fixed_begin_term":0
//								},
//								"sku":{"quantity":0},
//								"get_limit":1,
//								"use_custom_code":true,
//								"bind_openid":false,
//								"can_share":true,
//								"can_give_friend":true,
//								"location_id_list":[],
//								"custom_url_name":"入口名称",
//								"custom_url":"入口地址",
//								"custom_url_sub_title":"提示",
//								"promotion_url_name":"场景名称",
//								"promotion_url":"场景地址",
//								"promotion_url_sub_title":"场景提示",
//								"source":"优惠券第三方来源"
//							},
//						"default_detail":"优惠详情"
//					}
//			    }
//			}		 
//		 */
//		JSONObject jsonData = new JSONObject();
//		JSONObject card = new JSONObject();
//		card.put("card_type", "GENERAL_COUPON");
//		JSONObject general_coupon = new JSONObject();
//		JSONObject base_info = new JSONObject();
//
//			base_info.put("logo_url", "http://mmbiz.qpic.cn/mmbiz/CNS0dhd8vDNocreSH02mhuPga60wbaMnF84NDvlTE3rWc4YoXx6PaXkYvQRe7m2At9tAEPTEgxPDDWicHT7NUOA/0");
//			base_info.put("brand_name", "真龙服务号84");
//			base_info.put("code_type", "CODE_TYPE_QRCODE");
//			base_info.put("title", "优惠券小程序自定义");
//			base_info.put("sub_title", "优惠券副小程序自定义");
//			base_info.put("color", "Color010");
//			base_info.put("notice", "操作提示");
//			base_info.put("service_phone", "17736618875");
//			base_info.put("description", "使用须知");
//			
//				JSONObject date_info = new JSONObject();
//				date_info.put("type", "DATE_TYPE_FIX_TERM");
//				date_info.put("fixed_term", 30);
//				date_info.put("fixed_begin_term", 0);
//			base_info.put("date_info", date_info);
//
//				JSONObject sku = new JSONObject();
//				sku.put("quantity", 0);
//			base_info.put("sku", sku);
//			
//			//base_info.put("use_limit", 100);
//			base_info.put("get_limit", 10);
//			base_info.put("use_custom_code", true);//自定义Code码:true卡券投放接口中填入code字段值。
//			base_info.put("bind_openid", false);
//			base_info.put("can_share", true);
//			base_info.put("can_give_friend", true);
//			
//			base_info.put("location_id_list", new JSONArray());
//			
//			base_info.put("custom_url_name", "立即使用");//入口名称
//			base_info.put("custom_url", "http://www.qq.com");//入口地址
//			base_info.put("custom_url_sub_title", "提示");
//			base_info.put("promotion_url_name", "场景名称");
//			base_info.put("source", "优惠券第三方来源");
//			
//			/*添加打通小程序的标识
//	            "custom_url_name": "立即使用",//@@已存在
//	            "custom_url": "http://www.qq.com",//@@已存在
//	            "custom_app_brand_user_name": "gh_86a091e50ad4@app",
//	            "custom_app_brand_pass":"API/cardPage",
//	            "custom_url_sub_title": "6个汉字tips",//@@已存在
//	            "promotion_url_name": "更多优惠",//@@已存在
//	            "promotion_url": "http://www.qq.com",
//	            "promotion_app_brand_user_name": "gh_86a091e50ad4@app",
//	            "promotion_app_brand_pass":"API/cardPage"   			 
//			 */
//			//base_info.put("custom_url_name", "立即使用");
//			//base_info.put("custom_url", "http://www.qq.com");
//			base_info.put("custom_app_brand_user_name", "gh_3d9742641f8b@app");
//			base_info.put("custom_app_brand_pass", "API/cardPage");
//			//base_info.put("custom_url_sub_title", "6个汉字tips");
//			//base_info.put("promotion_url_name", "更多优惠");
//			base_info.put("promotion_url", "http://www.qq.com");
//			base_info.put("promotion_app_brand_user_name", "gh_3d9742641f8b@app");
//			base_info.put("promotion_app_brand_pass", "API/cardPage");
//		//建立层级关系
//		general_coupon.put("default_detail", "优惠详情");
//		general_coupon.put("base_info", base_info);
//		card.put("general_coupon", general_coupon);	
//		jsonData.put("card", card);
//		return jsonData;
//	}	
//}
