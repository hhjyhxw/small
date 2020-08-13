package com.icloud.common.util.wx;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;
public class HttpRequestUtil {

	public final static Logger log = LoggerFactory
			.getLogger(HttpRequestUtil.class);
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
//			// 创建SSLContext对象，并使用我们指定的信任管理器初始化(证书过滤)
//			TrustManager[] tm = { new MyX509TrustManager() };
//			// 取得SSL的SSLContext实例
//			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
//			// 初始化SSLContext
//			sslContext.init(null, tm, new java.security.SecureRandom());
//			// 从上述SSLContext对象中得到SSLSocketFactory对象
//			SSLSocketFactory ssf = sslContext.getSocketFactory();

			URL url = new URL(requestUrl);
			HttpsURLConnection httpUrlConn = (HttpsURLConnection) url
					.openConnection();
//			httpUrlConn.setSSLSocketFactory(ssf);
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
			System.out.println("json is =="+buffer.toString());
			jsonObject = JSONObject.parseObject(buffer.toString());
		} catch (ConnectException ce) {
			log.error("连接超时: {}", ce.getMessage());
		} catch (Exception e) {
			log.error("http请求异常: {}", e.getMessage());
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
			System.out.println("json is =="+buffer.toString());
		} catch (ConnectException ce) {
			log.error("连接超时: {}", ce.getMessage());
		} catch (Exception e) {
			log.error("https请求异常: {}", e.getMessage());
		}
		return buffer.toString();
	}
	
	public static byte[] httpRequestByteArr(String requestUrl,
			String requestMethod, String outputStr) {
		InputStream is = null;
		byte[] data = null;
		try {
			URL url = new URL(requestUrl);
			HttpURLConnection httpUrlConn = (HttpURLConnection) url
					.openConnection();
//			httpUrlConn.setSSLSocketFactory(ssf);
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
			is = httpUrlConn.getInputStream();
			ByteArrayOutputStream tmp = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024 * 4];
			int n = 0;
			while ((n = is.read(buffer)) != -1) {
				tmp.write(buffer, 0, n);
			}
			data = tmp.toByteArray();
			// 释放资源
			httpUrlConn.disconnect();
		} catch (ConnectException ce) {
			ce.printStackTrace();
			log.error("httpRequestByte连接超时: {}", ce.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			log.error("httpRequestByte请求异常: {}", e.getMessage());
		} finally {
			if(null != is)
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
					log.error("httpRequestByte关闭inputstream异常", e.getMessage());
				}
		}
		return data;
	}
	
	
	public static String httpGet(String req_url,String para){
		StringBuffer buffer = new StringBuffer();  
        try {  
            URL url = new URL(req_url+"?"+para);  
            HttpURLConnection httpUrlConn = (HttpURLConnection) url.openConnection();  

            httpUrlConn.setDoOutput(false);  
            httpUrlConn.setDoInput(true);  
            httpUrlConn.setUseCaches(false);  

            httpUrlConn.setRequestMethod("GET");  
            httpUrlConn.connect();  

            // 将返回的输入流转换成字符串  
            InputStream inputStream = httpUrlConn.getInputStream();  
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");  
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);  

            String str = null;  
            while ((str = bufferedReader.readLine()) != null) {  
                buffer.append(str);  
            }  
            bufferedReader.close();  
            inputStreamReader.close();  
            // 释放资源  
            inputStream.close();  
            inputStream = null;  
            httpUrlConn.disconnect();  

        } catch (Exception e) {  
            System.out.println(e.getStackTrace());  
        }  
        return buffer.toString();  
	}
	
	public static String httpPostJson(String req_url,String para){
		StringBuffer buffer = new StringBuffer();  
		 InputStream inputStream = null;
         InputStreamReader inputStreamReader = null;
         BufferedReader bufferedReader = null;
         OutputStream outputStream = null;
         OutputStreamWriter outputStreamWriter = null;
        try {  
            URL url = new URL(req_url);  
            HttpURLConnection httpUrlConn = (HttpURLConnection) url.openConnection();  

            httpUrlConn.setDoOutput(true);  
            httpUrlConn.setDoInput(true);  
            httpUrlConn.setUseCaches(false);  
            httpUrlConn.setRequestMethod("POST");  
            httpUrlConn.setRequestProperty("Accept-Charset", "utf-8");
            httpUrlConn.setRequestProperty("Content-Type", "application/json");
            httpUrlConn.setRequestProperty("Content-Length", String.valueOf(para.length()));
            httpUrlConn.connect();  

            //写数据
            outputStream = httpUrlConn.getOutputStream();
            outputStreamWriter = new OutputStreamWriter(outputStream);
            outputStreamWriter.write(para.toString());
            outputStreamWriter.flush();
            if (httpUrlConn.getResponseCode() >= 300) {
                throw new Exception("HTTP Request is not success, Response code is " + httpUrlConn.getResponseCode());
            }
            
            // 将返回的输入流转换成字符串  
             inputStream = httpUrlConn.getInputStream();  
             inputStreamReader = new InputStreamReader(inputStream, "utf-8");  
             bufferedReader = new BufferedReader(inputStreamReader);  

            String str = null;  
            while ((str = bufferedReader.readLine()) != null) {  
                buffer.append(str);  
            }  
            
            // 释放资源  
            outputStreamWriter.close();
            outputStream.close();
            outputStream= null;
            
            bufferedReader.close();  
            inputStreamReader.close();  
            inputStream.close();  
            inputStream = null;  
            httpUrlConn.disconnect();  

        } catch (Exception e) {  
        	log.error("httpPOSTjson请求异常: {}", e.getMessage());
//        }finally {
//            if (outputStreamWriter != null) {
//                try {
//					outputStreamWriter.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            if (outputStream != null) {
//                try {
//					outputStream.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            
//            if (bufferedReader != null) {
//            	try {
//					bufferedReader.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            
//            if (inputStreamReader != null) {
//            	try {
//					inputStreamReader.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            
//            if (inputStream != null) {
//                try {
//					inputStream.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
        } 
        return buffer.toString();  
	}
	
	public static String httpPost(String req_url){
		StringBuffer buffer = new StringBuffer();  
		 InputStream inputStream = null;
         InputStreamReader inputStreamReader = null;
         BufferedReader bufferedReader = null;
        try {  
            URL url = new URL(req_url);  
            HttpURLConnection httpUrlConn = (HttpURLConnection) url.openConnection();  

            httpUrlConn.setDoOutput(false);  
            httpUrlConn.setDoInput(true);  
            httpUrlConn.setUseCaches(false);  
            httpUrlConn.setRequestMethod("POST");  
            httpUrlConn.setRequestProperty("Accept-Charset", "utf-8");
            httpUrlConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            httpUrlConn.connect();  
            
            // 将返回的输入流转换成字符串  
             inputStream = httpUrlConn.getInputStream();  
             inputStreamReader = new InputStreamReader(inputStream, "utf-8");  
             bufferedReader = new BufferedReader(inputStreamReader);  

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

        } catch (Exception e) {  
        	log.error("httpPOST请求异常: {}", e.getMessage());
//        }finally {
//            if (outputStreamWriter != null) {
//                try {
//					outputStreamWriter.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            if (outputStream != null) {
//                try {
//					outputStream.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            
//            if (bufferedReader != null) {
//            	try {
//					bufferedReader.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            
//            if (inputStreamReader != null) {
//            	try {
//					inputStreamReader.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
//            
//            if (inputStream != null) {
//                try {
//					inputStream.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//            }
        } 
        return buffer.toString();  
	}
}
