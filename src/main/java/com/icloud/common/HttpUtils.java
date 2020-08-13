package com.icloud.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.List;

import javax.net.ssl.SSLContext;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLContexts;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpUtils {

	private final static Logger log = LoggerFactory.getLogger(HttpUtils.class);
	/**
	 * HttpClient连接SSL
	 */
	public void ssl() {
		CloseableHttpClient httpclient = null;
		try {
			KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
			FileInputStream instream = new FileInputStream(new File("d:\\tomcat.keystore"));
			try {
				// 加载keyStore d:\\tomcat.keystore  
				trustStore.load(instream, "123456".toCharArray());
			} catch (CertificateException e) {
				e.printStackTrace();
			} finally {
				try {
					instream.close();
				} catch (Exception ignore) {
				}
			}
			// 相信自己的CA和所有自签名的证书
			SSLContext sslcontext = SSLContexts.custom().loadTrustMaterial(trustStore, new TrustSelfSignedStrategy()).build();
			// 只允许使用TLSv1协议
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext, new String[] { "TLSv1" }, null,
					SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
			httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
			// 创建http请求(get方式)
			HttpGet httpget = new HttpGet("https://localhost:8443/myDemo/Ajax/serivceJ.action");
			log.error("executing request" + httpget.getRequestLine());
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				HttpEntity entity = response.getEntity();
				log.error("----------------------------------------");
				log.error("statusLine", response.getStatusLine());
				if (entity != null) {
					log.error("Response content length: " + entity.getContentLength());
					log.error(EntityUtils.toString(entity));
					EntityUtils.consume(entity);
				}
			} finally {
				response.close();
			}
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		} finally {
			if (httpclient != null) {
				try {
					httpclient.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * 发送 post请求访问本地应用并根据传递参数不同返回不同结果
	 */
	public static String postMethod(String url, List<NameValuePair> param) {
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost(url);
		UrlEncodedFormEntity uefEntity;
		String result = null;
		try {
			uefEntity = new UrlEncodedFormEntity(param, "UTF-8");
			httppost.setEntity(uefEntity);
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				// 打印响应状态  
				log.error("statusLine", response.getStatusLine());
				if (entity != null) {
					log.error("Response content length: " + entity.getContentLength());
					result = EntityUtils.toString(entity, "UTF-8");
					log.error("请求结果======"+result);
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 发送 get请求
	 */
	public static String getMethod(String url, List<NameValuePair> param) {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try {
			// 创建httpget.  
			HttpGet httpget = new HttpGet(url);
			// 执行get请求.  
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				// 获取响应实体  
				HttpEntity entity = response.getEntity();
				// 打印响应状态  
				log.error("statusLine", response.getStatusLine());
				if (entity != null) {
					// 打印响应内容长度  
					log.error("Response content length: " + entity.getContentLength());
					// 打印响应内容  
					log.error("Response content: " + EntityUtils.toString(entity));
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	return null;
	}
}