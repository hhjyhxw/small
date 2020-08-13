package com.icloud.common.util.wx;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.ConnectException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;

/**
 * 常用工具类
 * 
 */
public class CommonUtil {

	
	
	public final static Logger log = LoggerFactory.getLogger(CommonUtil.class);
	/**
	 * 发起https请求并获取结果
	 * 
	 * @param requestUrl
	 *            请求地址
	 * @param requestMethod
	 *            请求方式（GET、POST）
	 * @param outputStr
	 *            提交的数据
	 * @return JSONObject (通过JSONObject.get(key)的方式获取json对象的属性值)
	 */
	public static JSONObject httpRequest(String requestUrl,
			String requestMethod, String outputStr) {
		JSONObject jsonObject = null;

		try {
			// 创建SSLContext对象，并使用我们指定的信任管理器初始化(证书过滤)
			TrustManager[] tm = { new MyX509TrustManager() };
			// 取得SSL的SSLContext实例
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			// 初始化SSLContext
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();

			URL url = new URL(requestUrl);
			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url
					.openConnection();
			httpUrlConn.setSSLSocketFactory(ssf);
			httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			httpUrlConn.setRequestMethod(requestMethod);

			/*
			 * if ("GET".equalsIgnoreCase(requestMethod)) httpUrlConn.connect();
			 */
			// 当有数据需要提交时(当outputStr不为null时，向输出流写数据)
			if (null != outputStr) {
				OutputStream outputStream = httpUrlConn.getOutputStream();
				// 注意编码格式，防止中文乱码
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}

			// 将返回的输入流转换成字符串
			InputStream inputStream = httpUrlConn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(
					inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(
					inputStreamReader);
			String str = null;
			StringBuffer buffer = new StringBuffer();
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}

			// 释放资源
			bufferedReader.close();
			inputStreamReader.close();
			inputStream.close();
			inputStream = null;
			httpUrlConn.disconnect();
			log.error("json is =="+buffer.toString());
			jsonObject = JSONObject.parseObject(buffer.toString());
		} catch (ConnectException ce) {
			log.error("连接超时: {}", ce.getMessage());
		} catch (Exception e) {
			log.error("https请求异常: {}", e.getMessage());
		}
		return jsonObject;
	}
	
	/**
	 * 发起https请求并获取结果
	 * 
	 * @param requestUrl
	 *            请求地址
	 * @param requestMethod
	 *            请求方式（GET、POST）
	 * @param outputStr
	 *            提交的数据
	 * @return 直接返回字符串,如果是xml 就需要用xml解析
	 */
	public static String httpRequestString(String requestUrl,
			String requestMethod, String outputStr) {
		StringBuffer buffer = new StringBuffer();

		try {
			// 创建SSLContext对象，并使用我们指定的信任管理器初始化(证书过滤)
			TrustManager[] tm = { new MyX509TrustManager() };
			// 取得SSL的SSLContext实例
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			// 初始化SSLContext
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();

			URL url = new URL(requestUrl);
			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url
					.openConnection();
			httpUrlConn.setSSLSocketFactory(ssf);

			httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			httpUrlConn.setRequestMethod(requestMethod);

			/*
			 * if ("GET".equalsIgnoreCase(requestMethod)) httpUrlConn.connect();
			 */
			// 当有数据需要提交时(当outputStr不为null时，向输出流写数据)
			if (null != outputStr) {
				OutputStream outputStream = httpUrlConn.getOutputStream();
				// 注意编码格式，防止中文乱码
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}

			// 将返回的输入流转换成字符串
			InputStream inputStream = httpUrlConn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(
					inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(
					inputStreamReader);
			String str = null;
			
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}

			// 释放资源
			bufferedReader.close();
			inputStreamReader.close();
			inputStream.close();
			inputStream = null;
			httpUrlConn.disconnect();
			log.error("json is =="+buffer.toString());
		} catch (ConnectException ce) {
			log.error("连接超时: {}", ce.getMessage());
		} catch (Exception e) {
			log.error("https请求异常: {}", e.getMessage());
		}
		return buffer.toString();
	}
	
	
	/**
	 * 发起https请求并获取结果
	 * 
	 * @param requestUrl
	 *            请求地址
	 * @param requestMethod
	 *            请求方式（GET、POST）
	 * @param outputStr
	 *            提交的数据
	 * @return 因为考虑到微信返回结果为文本，我们按行封装，直接返回List字符串
	 */
	public static List<String> httpRequestListString(String requestUrl,
			String requestMethod, String outputStr) {
		List<String> list = new ArrayList<String>();

		try {
			// 创建SSLContext对象，并使用我们指定的信任管理器初始化(证书过滤)
			TrustManager[] tm = { new MyX509TrustManager() };
			// 取得SSL的SSLContext实例
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			// 初始化SSLContext
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();

			URL url = new URL(requestUrl);
			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url
					.openConnection();
			httpUrlConn.setSSLSocketFactory(ssf);

			httpUrlConn.setDoOutput(true);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			httpUrlConn.setRequestMethod(requestMethod);

			/*
			 * if ("GET".equalsIgnoreCase(requestMethod)) httpUrlConn.connect();
			 */
			// 当有数据需要提交时(当outputStr不为null时，向输出流写数据)
			if (null != outputStr) {
				OutputStream outputStream = httpUrlConn.getOutputStream();
				// 注意编码格式，防止中文乱码
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}

			// 将返回的输入流转换成字符串
			InputStream inputStream = httpUrlConn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(
					inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(
					inputStreamReader);
			String str = null;
			
			while ((str = bufferedReader.readLine()) != null) {
				list.add(str);
			}

			// 释放资源
			bufferedReader.close();
			inputStreamReader.close();
			inputStream.close();
			inputStream = null;
			httpUrlConn.disconnect();
			System.out.println("json is =="+list.toString());
		} catch (ConnectException ce) {
			log.error("连接超时: {}", ce.getMessage());
		} catch (Exception e) {
			log.error("https请求异常: {}", e.getMessage());
		}
		return list;
	}
	

	/**
	 * 获取access_token
	 * 
	 * @param appid
	 *            凭证
	 * @param appsecret
	 *            密钥
	 * @return AccessToken 返回接口凭证
	 */
//	public static AccessToken getAccessToken(String appid, String appsecret) {
//		AccessToken accessToken = null;
//		String requestUrl = GET_ACCESS_TOKEN_URL.replace("APPID", appid)
//				.replace("APPSECRET", appsecret);
//		JSONObject jsonObject = httpRequest(requestUrl, "GET", null);
//		// 如果请求成功
//		if (null != jsonObject) {
//			try {
//				accessToken = new AccessToken();
//				accessToken
//						.setAccesstoken(jsonObject.getString("access_token"));
//				accessToken.setExpiresin(jsonObject.getInt("expires_in"));
//			} catch (JSONException e) {
//				// 获取token失败
//				log.error("获取token失败 errcode:{} errmsg:{}",
//						jsonObject.getInt("errcode"),
//						jsonObject.getString("errmsg"));
//			}
//		}
//		return accessToken;
//	}

	
	
	/**
	 * 获取access_token
	 * 
	 * @param appid
	 *            凭证
	 * @param appsecret
	 *            密钥
	 * @return AccessToken 返回接口凭证
	 */
//	public static JsApiTicket getJsApiTicket(AccessToken accessToken) {
//		JsApiTicket jsApiTicket = null;
//		String requestUrl = JSAPI_TICKET_URL.replace("ACCESS_TOKEN",accessToken.getAccesstoken());
//		JSONObject jsonObject = httpRequest(requestUrl, "GET", null);
//		// 如果请求成功
//		if (null != jsonObject) {
//			try {
//				jsApiTicket = new JsApiTicket();
//				jsApiTicket
//				.setJsApiTicket(jsonObject.getString("ticket"));
//				jsApiTicket.setExpiresin(jsonObject.getInt("expires_in"));
//			} catch (JSONException e) {
//				// 获取token失败
//				log.error("获取token失败 errcode:{} errmsg:{}",
//						jsonObject.getInt("errcode"),
//						jsonObject.getString("errmsg"));
//			}
//		}
//		return jsApiTicket;
//	}
	/**
	 * URL编码(utf-8)
	 * 
	 * @param source
	 * @return String
	 */
	public static String urlEncodeUTF8(String source) {
		String result = source;
		try {
			result = URLEncoder.encode(source, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return result;
	}

	
}
