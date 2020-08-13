//package com.icloud.thirdinterfaces.score.service;
//
//import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONObject;
//import com.icloud.basecommon.service.redis.RedisService;
//import com.icloud.common.DateUtil;
//import com.icloud.common.MD5Utils;
//import com.icloud.common.util.StringUtil;
//import org.apache.commons.httpclient.HttpClient;
//import org.apache.commons.httpclient.HttpException;
//import org.apache.commons.httpclient.methods.PostMethod;
//import org.apache.commons.httpclient.params.HttpMethodParams;
//import org.apache.http.HttpEntity;
//import org.apache.http.HttpResponse;
//import org.apache.http.client.methods.CloseableHttpResponse;
//import org.apache.http.client.methods.HttpGet;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.conn.scheme.Scheme;
//import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
//import org.apache.http.conn.ssl.SSLContexts;
//import org.apache.http.conn.ssl.SSLSocketFactory;
//import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.DefaultHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.util.EntityUtils;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.Resource;
//import javax.net.ssl.SSLContext;
//import java.io.*;
//import java.security.KeyStore;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Properties;
//
//@Service
//public class LongbiService {
//    private final static Logger log = LoggerFactory.getLogger(LongbiService.class);
//
//	public static Map<String, String> codeMap = new HashMap<String, String>();
//
//	public static Map<String, String> getCodeMap() {
//		return codeMap;
//	}
//
//	public static void setCodeMap(Map<String, String> codeMap) {
//		LongbiService.codeMap = codeMap;
//	}
//
//	@Resource
//	private RedisService redisClientTemplate;
//
//	private static Properties props = new Properties();
//
//	static {
//		codeMap.put("000000", "处理成功");
//		codeMap.put("200001", "参数不全");
//		codeMap.put("200002", "参数格式不正确	");
//		codeMap.put("200003", "签名无效");
//		codeMap.put("200004", "时间戳超时");
//		codeMap.put("200005", "流水号重复");
//		codeMap.put("200006", "来源不合法（IP鉴权失败）");
//		codeMap.put("200007", "请求频繁");
//		codeMap.put("200008", "系统维护时间段");
//		codeMap.put("300001", "用户不存在");
//		codeMap.put("300002", "超过单次充值最大金额");
//		codeMap.put("300003", "超过单个会员每日累计最大充值金额");
//		codeMap.put("300004", "超过单次消耗最大金额");
//		codeMap.put("300005", "超过单个会员每日累计最大消耗金额");
//		codeMap.put("300006", "余额不足");
//		codeMap.put("300007", "Unionid已与其他用户关联");
//		codeMap.put("300100", "充值类别不存在");
//		codeMap.put("300101", "消耗类别不存在");
//		codeMap.put("300201", "凭证不存在");
//		codeMap.put("300202", "凭证已失效");
//		codeMap.put("999999", "未定义错误");
//		try {
//
//			props.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties"));
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}
//
//
//	private static final String KEY_STORE_TYPE_JKS = "jks";
//	private static final String KEY_STORE_TYPE_P12 = "PKCS12";
//	private static final String SCHEME_HTTPS = "https";
//	private static final int HTTPS_PORT = 8443;
//
//	private static final String KEY_STORE_CLIENT_PATH = "lb_client.p12";
//	private static final String KEY_STORE_TRUST_PATH = "lb_client.truststore";
//	private static final String KEY_STORE_PASSWORD = "zhenlong";
//	private static final String KEY_STORE_TRUST_PASSWORD = "zhenlong";
//
//	/**
//	 * 龙币查询
//	 *
//	 * @return
//	 */
//	public JSONObject queryLongbi(String accounttype, String useraccount) {
//
//		String machineNo = getMachineNo();
//		String timeStamp = getTimeStamp();
//		String seq = getSerialNumber();
//		StringBuffer sb = new StringBuffer();
//		sb.append(machineNo).append(seq).append(useraccount).append(accounttype).append(timeStamp).append(getKey());
//		String md5Str = MD5Utils.MD5Encode(sb.toString(), "utf-8");
//		Map<String, String> params = new HashMap<String, String>();
//		params.put("sid", machineNo);
//		params.put("seq", seq);
//		params.put("useraccount", useraccount);
//		params.put("accounttype", accounttype);
//		params.put("timestamp", timeStamp);
//		params.put("skey", md5Str);
//		String result = sendRequest(params, getQueryUrl());
//		log.error("龙币查询result====="+result);
//		if(result==null){
//			return	null;
//		}
//		return JSON.parseObject(result);
//	}
//
//	/**
//	 *
//	 * @param accounttype
//	 * @param useraccount
//	 * @param rechargeamount
//	 *            充值金额
//	 * @return
//	 * @throws Exception
//	 */
//	public JSONObject recharge(String accounttype, String useraccount, String rechargeamount) throws Exception {
//		String machineNo = getMachineNo();
//		String timeStamp = getTimeStamp();
//		String seq = getSerialNumber();
//		String rechargetype = getRechargetype();
//		StringBuffer sb = new StringBuffer();
//		sb.append(machineNo).append(seq).append(useraccount).append(accounttype).append(rechargetype)
//				.append(rechargeamount).append(timeStamp).append(getKey());
//		String md5Str = MD5Utils.MD5Encode(sb.toString(), "utf-8");
//		Map<String, String> params = new HashMap<String, String>();
//		params.put("sid", machineNo);
//		params.put("seq", seq);
//		params.put("useraccount", useraccount);
//		params.put("accounttype", accounttype);
//		params.put("rechargetype", rechargetype);
//		params.put("rechargeamount", rechargeamount);
//		params.put("timestamp", timeStamp);
//		params.put("skey", md5Str);
//		String result = sendRequest(params, getRechargeUrl());
//		log.error("龙币充值result====="+result);
//		if(result==null){
//			return	null;
//		}
//        return JSON.parseObject(result);
//	}
//
//	/**
//	 * 龙币消费接口
//	 *
//	 * @param accounttype
//	 * @param useraccount
//	 * @param consumeamount
//	 * @return
//	 * @throws Exception
//	 */
//	public JSONObject consume(String accounttype, String useraccount, String consumeamount) throws Exception {
//		String machineNo = getMachineNo();
//		String timeStamp = getTimeStamp();
//		String seq = getSerialNumber();
//		String consumetype = getConsumetype();
//		StringBuffer sb = new StringBuffer();
//		sb.append(machineNo).append(seq).append(useraccount).append(accounttype).append(consumetype)
//				.append(consumeamount).append(timeStamp).append(getKey());
//		String md5Str = MD5Utils.MD5Encode(sb.toString(), "utf-8");
//		Map<String, String> params = new HashMap<String, String>();
//		params.put("sid", machineNo);
//		params.put("seq", seq);
//		params.put("useraccount", useraccount);
//		params.put("accounttype", accounttype);
//		params.put("consumetype", consumetype);
//		params.put("consumeamount", consumeamount);
//		params.put("timestamp", timeStamp);
//		params.put("skey", md5Str);
//		String result = sendRequest(params, getConsumeUrl());
//		log.error("龙币消费接口result====="+result);
//		if(result==null){
//			return	null;
//		}
//        return JSON.parseObject(result);
//	}
//
//	/**
//	 * 获取流水号中的第三部分
//	 *
//	 * @return
//	 */
//	public String getBinaryString() {
//		synchronized (this) {
//			Object reno =  redisClientTemplate.get("msgSerialNumber");
//			String no = "";
//			if (!StringUtil.checkObj(reno)) {
//				no = "1";
//				redisClientTemplate.set("msgSerialNumber", no);
//				return toFillingString(no);
//			} else {
//                no = reno.toString();
//				int count = Integer.parseInt(no);
//				if (count >= 99999999) {
//					no = "1";
//					redisClientTemplate.set("msgSerialNumber", no);
//					return toFillingString(no);
//				} else {
//					no = (Integer.parseInt(no) + 1) + "";
//					redisClientTemplate.set("msgSerialNumber", no);
//					return toFillingString(no);
//				}
//			}
//		}
//
//	}
//
//	/**
//	 * 补齐八位二进制
//	 *
//	 * @param str
//	 * @return
//	 */
//	public static String toIntegerBinaryString(String str) {
//		int num = Integer.parseInt(str);
//		char[] bits = new char[8];
//		for (int i = bits.length - 1; i >= 0; --i) {
//			bits[i] = ((num & 1) == 0) ? '0' : '1';
//			num >>>= 1;// 下一位
//		}
//		return String.copyValueOf(bits);
//	}
//
//	/**
//	 * 补齐八位
//	 *
//	 * @param str
//	 * @return
//	 */
//	public static String toFillingString(String str) {
//
//		    int length = str.length();
//			for(int i=0;i<8-length;i++){
//				str = "0"+str;
//			}
//
//		return str;
//	}
//
//	/**
//	 * 获取请求参数中的时间戳
//	 *
//	 * @return
//	 */
//	public String getTimeStamp() {
//		return (System.currentTimeMillis() / 1000
//				- DateUtil.parseTimeString("2000-01-01 00:00:00", "yyyy-MM-dd HH:mm:ss").getTime() / 1000) + "";
//	}
//
//	/**
//	 * 得到请求中的流水号
//	 *
//	 * @return
//	 */
//	public String getSerialNumber() {
//		String machineNo = props.getProperty("sid");
//		String currentTime = DateUtil.getYearMonthDayWithMinus(new Date());
//		String runNum = getBinaryString();
//		return machineNo + currentTime + runNum;
//	}
//
//	/**
//	 * 获取设备号
//	 *
//	 * @return
//	 */
//	public String getMachineNo() {
//		return props.getProperty("sid");
//	}
//
//	/**
//	 * 获取key
//	 *
//	 * @return
//	 */
//	public String getKey() {
//		return props.getProperty("key");
//
//	}
//
//	/**
//	 * 获取充值类别
//	 *
//	 * @return
//	 */
//	public String getRechargetype() {
//		return props.getProperty("rechargetype");
//	}
//
//	/**
//	 * 获取查询龙币URL
//	 *
//	 * @return
//	 */
//	public String getQueryUrl() {
//		return props.getProperty("queryUrl");
//	}
//
//	/**
//	 * 获取充值接口URL
//	 *
//	 * @return
//	 */
//	public String getRechargeUrl() {
//		return props.getProperty("rechargeUrl");
//	}
//
//	/**
//	 * 获取龙币消费URL
//	 *
//	 * @return
//	 */
//	public String getConsumeUrl() {
//		return props.getProperty("consumeUrl");
//	}
//
//	/**
//	 * 获取消费类别
//	 *
//	 * @return
//	 */
//	public String getConsumetype() {
//		return props.getProperty("consumetype");
//	}
//
//	/**
//	 * post请求 返回 不带证书
//	 *
//	 * @param params
//	 * @return
//	 */
//	public String sendRequest(Map<String, String> params, String url) {
//
//		HttpClient httpClient = new HttpClient();
//		PostMethod post = new PostMethod(url);
//
//		for (Map.Entry<String, String> entry : params.entrySet()) {
//			post.addParameter(entry.getKey(), entry.getValue());
//		}
//
//		HttpMethodParams param = post.getParams();
//		param.setContentCharset("UTF-8");
//
//		try {
//			httpClient.executeMethod(post);
//		} catch (HttpException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		// 如果返回200，表明成功
//		if (post.getStatusCode() == 200) {
//			try {
//				String result = post.getResponseBodyAsString();
//				System.out.println("longbi："+result);
//				return result;
//			} catch (IOException e) {
//				e.printStackTrace();
//				return null;
//			}
//		} else {
//			return null;
//		}
//
//	}
//
//
//	public String sslRequest(Map<String, String> params, String url) throws Exception {
//
//		CloseableHttpClient httpclient = null;
//
//			// 相信自己的CA和所有自签名的证书
//			SSLContext sslcontext = SSLContexts.custom().loadTrustMaterial(null, new TrustSelfSignedStrategy())
//					.build();
//			// 只允许使用TLSv1协议
//			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext, new String[] { "TLSv1" },
//					null, SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
//			httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
//			StringBuffer sb = new StringBuffer();
//			for (Map.Entry<String, String> entry : params.entrySet()) {
//				sb.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
//			}
//			url = url + "?" + sb.toString();
//			HttpPost post = new HttpPost(url);
//
//
//			CloseableHttpResponse response = httpclient.execute(post);
//			try {
//				HttpEntity entity = response.getEntity();
//				if (entity != null) {
//					System.out.println("Response content length: " + entity.getContentLength());
//					String result = EntityUtils.toString(entity);
//					return result;
//				}
//			} finally {
//				response.close();
//			}
//
//		return null;
//
//
//	}
//	public String sslRequest_2(Map<String, String> params, String url) throws Exception {
//		org.apache.http.client.HttpClient httpClient = new DefaultHttpClient();
//		try {
//			KeyStore keyStore = KeyStore.getInstance(KEY_STORE_TYPE_P12);
//			KeyStore trustStore = KeyStore.getInstance(KEY_STORE_TYPE_JKS);
//			InputStream ksIn = Thread.currentThread().getContextClassLoader()
//					.getResourceAsStream(KEY_STORE_CLIENT_PATH);
//			InputStream tsIn = Thread.currentThread().getContextClassLoader().getResourceAsStream(KEY_STORE_TRUST_PATH);
//			try {
//				keyStore.load(ksIn, KEY_STORE_PASSWORD.toCharArray());
//				trustStore.load(tsIn, KEY_STORE_TRUST_PASSWORD.toCharArray());
//			} finally {
//				try {
//					ksIn.close();
//				} catch (Exception ignore) {
//				}
//				try {
//					tsIn.close();
//				} catch (Exception ignore) {
//				}
//			}
//			SSLSocketFactory socketFactory = new SSLSocketFactory(keyStore, KEY_STORE_PASSWORD, trustStore);
//			Scheme sch = new Scheme(SCHEME_HTTPS, HTTPS_PORT, socketFactory);
//			httpClient.getConnectionManager().getSchemeRegistry().register(sch);
//			StringBuffer sb = new StringBuffer();
//			for (Map.Entry<String, String> entry : params.entrySet()) {
//				sb.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
//			}
//			url = url + "?" + sb.toString();
//			HttpGet httpget = new HttpGet(url);
//			System.out.println("executing request" + httpget.getRequestLine());
//			HttpResponse response = httpClient.execute(httpget);
//			HttpEntity entity = response.getEntity();
//			System.out.println("----------------------------------------");
//			System.out.println(response.getStatusLine());
//			StringBuffer sbf = new StringBuffer();
//			if (entity != null) {
//				System.out.println("Response content length: " + entity.getContentLength());
//				BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entity.getContent()));
//				String text;
//
//				while ((text = bufferedReader.readLine()) != null) {
//					sbf.append(text);
//				}
//
//				bufferedReader.close();
//
//			}
//			EntityUtils.consume(entity);
//			return sbf.toString();
//		} finally {
//			httpClient.getConnectionManager().shutdown();
//		}
//
//	}
//
//	public static void main(String[] args) {
//		System.out.println(toFillingString("199999"));
//	}
//
//
//}
