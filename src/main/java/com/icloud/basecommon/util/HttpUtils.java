package com.icloud.basecommon.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.icloud.common.util.wx.MyX509TrustManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ConnectException;
import java.net.URL;

/**
 * http、https 工具
 * @author zdh
 *
 */
public class HttpUtils {

	
    private static Logger logger = LoggerFactory.getLogger(HttpUtils.class);
	/**
	 * 发起https 请求
	 * @param requestUrl
	 * @param requestMethod
	 * @param outputStr
	 * @return
	 */
	public static JSONObject httpsRequest(String requestUrl,String requestMethod, String outputStr) {
			
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
				logger.info("http send txt:"+outputStr);
				OutputStream outputStream = httpUrlConn.getOutputStream();
				// 注意编码格式，防止中文乱码
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}

			// 将返回的输入流转换成字符串
			InputStream inputStream = httpUrlConn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
					
			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
					
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
			logger.error("http receive txt =="+buffer.toString());
			jsonObject = JSON.parseObject(buffer.toString());
		} catch (ConnectException ce) {
			logger.error("连接超时: {}", ce.getMessage());
		} catch (Exception e) {
			logger.error("https请求异常: {}", e.getMessage());
		}
		return jsonObject;
	}
	
	
	/** 获取ip
	 * @Title: getRemortIP 
	 * @Description: TODO
	 * @param req
	 * @return
	 * @return: String
	 */
	public static String getRemortIP(HttpServletRequest req) {
		String ip = req.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = req.getRemoteAddr();
		}
		return ip;
	}
	
	
}
