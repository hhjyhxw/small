package com.icloud.common.util.wx;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.icloud.common.util.wx.model.JsSDK;
public class PayUtil extends Sha1Util {
	
	/**
	 * 获取当前时间 yyyyMMddHHmmss
	 * @return String
	 */ 
	public static String getCurrTime() {
		Date now = new Date();
		SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String s = outFormat.format(now);
		return s;
	}
	
	/**
	 * 取出一个指定长度大小的随机正整数.
	 * @param length
	 * int 设定所取出随机数的长度。length小于11
	 * @return int 返回生成的随机数。
	 */
	public static int buildRandom(int length) {
		int num = 1;
		double random = Math.random();
		if (random < 0.1) {
			random = random + 0.1;
		}
		for (int i = 0; i < length; i++) {
			num = num * 10;
		}
		return (int) ((random * num));
	}
	
	
	/**
	 * 获取编码字符集
	 * @param request
	 * @param response
	 * @return String
	 */
	public static String getCharacterEncoding(HttpServletRequest request,
			HttpServletResponse response) {
		if(null == request || null == response) {
			return "utf-8";
		}
		String enc = request.getCharacterEncoding();
		if(null == enc || "".equals(enc)) {
			enc = response.getCharacterEncoding();
		}
		if(null == enc || "".equals(enc)) {
			enc = "utf-8";
		}
		return enc;
	}
	
	/**
	 * 字符串为空
	 * @param String
	 * @return boolean 为空返回true
	 */
	public static boolean isEmpty(String s)
	{
		if (s == null || s.trim().length() == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	
	/*
	 * 10位序列号,可以自行调整。
	 * fuxing
	 * 2015-3-5 11:55:03
	 * */
	public static String getStrReq(){
		String currTime = PayUtil.getCurrTime();
		//8位日期
		String strTime = currTime.substring(8, currTime.length());
		//四位随机数
		String strRandom = PayUtil.buildRandom(4) + ""; 
		return strTime + strRandom;
	}
	
	
	
	/**
	 *封装扫一扫签名参数 
	 */
	public static SortedMap<String, String> getJSApiParams(JsSDK jssdk){
	    SortedMap<String, String> packageParams = new TreeMap<String, String>();
		packageParams.put("jsapi_ticket", jssdk.getJsTick());  
		packageParams.put("noncestr",jssdk.getNonceStr()); 
		packageParams.put("timestamp",jssdk.getTimeStamp()); 
		packageParams.put("url", jssdk.getUrl()); 
		return packageParams;
	}
	
	
	/**
	 * MD5加密
	 * @author wuhongbo
	 * @param str
	 * @param charset
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	public static String getHashcode(String str, String charset)
			throws NoSuchAlgorithmException, UnsupportedEncodingException
	{
		String hashcodeb = "";
		// MD5加密
		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(str.getBytes(charset));
		byte[] b = md.digest();

		String temp = "";
		for (int i = 0; i < 16; i++)
		{
			temp = Integer.toHexString(b[i] & 0xFF);
			if (temp.length() == 1)
				temp = "0" + temp;
			hashcodeb += temp;
		}
		hashcodeb = hashcodeb.toUpperCase(); 
		return hashcodeb;
	}
	

	
	/*
	 * 支付时金钱转换   以分为单位
	 * fuxing
	 * 2015-3-2 10:07:18
	 * */
	public static String getFinalmoney(String money){
		float sessionmoney = Float.parseFloat(money);
		String finalmoney = String.format("%.2f", sessionmoney);
		finalmoney = finalmoney.replace(".", "");
		return String.valueOf(Integer.parseInt(finalmoney));
	}
	
	
	/** 获取请求信息里的XML*/
	  public static String getBodyString(BufferedReader br) {
    	  String inputLine;
    	       String str = "";
    	     try {
    	       while ((inputLine = br.readLine()) != null) {
    	        str += inputLine;
    	       }
    	       br.close();
    	     } catch (IOException e) {
    	       System.out.println("IOException: " + e);
    	     }
    	     return str;
    	 }
		
}
