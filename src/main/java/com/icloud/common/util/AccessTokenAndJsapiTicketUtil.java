package com.icloud.common.util;

import com.icloud.config.global.MyPropertitys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;

/**
 * 到IMCC获取access_token
 * @author z
 */
@Component
public class AccessTokenAndJsapiTicketUtil {

    
    @Autowired
    private MyPropertitys myPropertitys;

	public final static Logger log = LoggerFactory.getLogger(AccessTokenAndJsapiTicketUtil.class);
	public final static String IMCC_URL = "http://host:port/mc/comm_protocol?hostel=HOSTTEL&imtype=IMTYPE&hostnumber=HOSTNUMBER&waitret=true";
	public final static String  TOKENCONTENT = "gethostnumberinfo";
	public final static	String JSAPICONTENT = "getjsapi_ticket";
//	public  String host = myPropertitys.getWx().getImcchost()+ ":"+myPropertitys.getWx().getImcchostport();
//	public   String hosttel = myPropertitys.getWx().getHosttel();
//	public   String hostnumber = myPropertitys.getWx().getHostnumber();
	public final static String imtype = "161"; //161代表微信
	/**
	 * 步骤二
	 * 根据服务器信息,获取access_token
	 */
	public  String getAccessToken(){
		
//		 String host = "10.104.1.120:7003";
//	     String hosttel = "16760";
//	     String hostnumber = "gh_1735a070991c";
		//获取access_token的访问地址
		String accessTokenAccessAddress = "http://"+myPropertitys.getWx().getHost()+"/mc/comm_protocol?hostel="+myPropertitys.getWx().getHosttel()
				                                      +"&imtype=161"// 161代表微信
				                                      +"&hostnumber="+myPropertitys.getWx().getHostnumber()
				                                      +"&waitret=true";		
		StringBuilder rtn = new StringBuilder();
		OutputStream os = null;
		PrintWriter pw = null;
		BufferedReader in = null;
		try {
			log.error("accessTokenAccessAddress==="+accessTokenAccessAddress);
			URL url = new URL(accessTokenAccessAddress);
			HttpURLConnection uc = (HttpURLConnection) url.openConnection();
			uc.setConnectTimeout(2000); // 连接超时设置为2s
			uc.setReadTimeout(35000); // 读超时设置为35s
			uc.setDoOutput(true); // 因为这个是post请求，参数要放在http正文内，因此需要设为true，默认情况下是false
			uc.setUseCaches(false); // post请求不能使用缓存
			// 设定传送的内容类型是可序列化的java对象(如果不设此项,在传送序列化对象时,当WEB服务默认的不是这种类型时可能抛java.io.EOFException)
			uc.setRequestProperty("Content-type", "text/xml;charset=utf-8");
			uc.setRequestMethod("POST"); // 设定请求的方法为"POST"，默认是GET
			uc.connect();

			os = uc.getOutputStream();
			OutputStreamWriter out = new OutputStreamWriter(os, "utf-8");
			pw = new PrintWriter(out);
			pw.print("gethostnumberinfo");
			pw.flush();

			/* 获取服务器端返回信息 */
			in = new BufferedReader(new InputStreamReader(uc.getInputStream(), "utf-8"));
			String inputLine;
			while ((inputLine = in.readLine()) != null) {
				rtn.append(inputLine).append("\r\n");
			}
			log.error("accessTokenAccessAddress==="+accessTokenAccessAddress);
		} catch (SocketTimeoutException e) {
			e.printStackTrace();
			return "time_out";
		} catch (Exception ex) {
			log.error("调用IMCC监控中心接口异常" + ex);
		} finally {
			try {
				if (pw != null) {
					pw.close();
					pw = null;
				}
				if (os != null) {
					os.close();
					os = null;
				}
				if (in != null) {
					in.close();
					in = null;
				}
			} catch (Exception ex) {
				log.info("释放资源异常" + ex);
			}
		}
		//1.3获取请求返回的xml
		String xml = rtn.toString();// TOKENCONTENT
		log.error("access_token返回数据xml=="+xml);
		//log.info("access_token返回数据xml=="+xml);
		int beginIndex = xml.indexOf("<apptoken>");
		int endIndex   = xml.indexOf("</apptoken>");
		String access_token = xml.substring(beginIndex, endIndex).replace("<apptoken>", "");
		//log.info("access_token=="+access_token);
		return access_token;		
	}

	
	/**
	 * @Description: 获取jsapi_ticket接口

	 * @return
	 */
	public  String getJsapiTicket() {
	
		 String addr = IMCC_URL.replace("host:port", myPropertitys.getWx().getHost()).replace("HOSTTEL", myPropertitys.getWx().getHosttel()).replace("IMTYPE", imtype).replace("HOSTNUMBER", myPropertitys.getWx().getHostnumber());

        log.info("getJsapiTicket_addr===="+addr);
		String xml = invokeComm(addr, JSAPICONTENT);
        log.info("JSAPIxml:"+xml);
		log.info("++++++++++++++++++++++");
		try{
			if(xml!=null&&!"".equals(xml)){
				int beginIndex = xml.indexOf("<appticket>");
				int endIndex   = xml.indexOf("</appticket>");
				String appticket = xml.substring(beginIndex, endIndex).replace("<appticket>", "");
				return appticket;
			}else{
				log.error("http请求发送失败!"+xml);
			}
			}catch(Exception e){
				log.error("获取参数失败!"+xml);
				e.printStackTrace();
			}
		return null;
	}
	
	/**
	 * 调用mc通用接口
	 */

	public static String invokeComm(String addr, String content) {
		StringBuilder rtn = new StringBuilder();
		OutputStream os = null;
		PrintWriter pw = null;
		BufferedReader in = null;
		log.info("addr:" + addr);
		log.info("content:" + content);
		try {
			URL url = new URL(addr);
			HttpURLConnection uc = (HttpURLConnection)url.openConnection();
			
			uc.setConnectTimeout(2000);		//连接超时设置为2s
			uc.setReadTimeout(35000);			//读超时设置为35s
			uc.setDoOutput(true);				//因为这个是post请求，参数要放在http正文内，因此需要设为true，默认情况下是false
			uc.setUseCaches(false);				//post请求不能使用缓存
			// 设定传送的内容类型是可序列化的java对象(如果不设此项,在传送序列化对象时,当WEB服务默认的不是这种类型时可能抛java.io.EOFException) 
			uc.setRequestProperty("Content-type", "text/xml;charset=utf-8");
			uc.setRequestMethod("POST");	// 设定请求的方法为"POST"，默认是GET  
			uc.connect();
			
			os = uc.getOutputStream();
			OutputStreamWriter out = new OutputStreamWriter(os, "utf-8");
			pw = new PrintWriter(out);
			pw.print(content);
			pw.flush();
			
			 /*获取服务器端返回信息*/
			in = new BufferedReader(new InputStreamReader(uc.getInputStream(), "utf-8"));
			String inputLine;
			while((inputLine = in.readLine()) != null){
				rtn.append(inputLine).append("\r\n");
			}
			
		} catch(SocketTimeoutException e) {
			e.printStackTrace();
			return "time_out";
		}
		catch (Exception ex) {
			log.info("调用IMCC监控中心接口异常" + ex);
		} finally {
			try {
				if (pw != null) {
					pw.close();
					pw = null;
				}
				
				if (os != null) {
					os.close();
					os = null;
				}
				
				if (in != null) {
					in.close();
					in = null;
				}
			}
			catch (Exception ex) {
				log.info("释放资源异常" + ex);
			}
		}
		log.info("ret:" + rtn.toString());
		return rtn.toString();
	}

	
	


	@SuppressWarnings("unused")
	private static String invoke(String addr, String xml) {
		StringBuilder rtn = new StringBuilder();
		OutputStream os = null;
		PrintWriter pw = null;
		BufferedReader in = null;
		//增加access-token参数
		log.info("addr:" + addr);
		try {
			URL url = new URL(addr);
			HttpURLConnection uc = (HttpURLConnection)url.openConnection();
			
			uc.setConnectTimeout(2000);		//连接超时设置为2s
			uc.setReadTimeout(35000);			//读超时设置为35s
			uc.setDoOutput(true);				//因为这个是post请求，参数要放在http正文内，因此需要设为true，默认情况下是false
			uc.setUseCaches(false);				//post请求不能使用缓存
			// 设定传送的内容类型是可序列化的java对象(如果不设此项,在传送序列化对象时,当WEB服务默认的不是这种类型时可能抛java.io.EOFException) 
			uc.setRequestProperty("Content-type", "text/xml;charset=GBK");
			uc.setRequestMethod("POST");	// 设定请求的方法为"POST"，默认是GET  
			uc.connect();
			
			os = uc.getOutputStream();
			OutputStreamWriter out = new OutputStreamWriter(os, "GBK");
			pw = new PrintWriter(out);
			pw.print(xml);
			pw.flush();
			
			 /*获取服务器端返回信息*/                   
			in = new BufferedReader(new InputStreamReader(uc.getInputStream(), "GBK"));
			String inputLine;
			while((inputLine = in.readLine()) != null){
				rtn.append(inputLine).append("\r\n");
			}
			
		} catch(SocketTimeoutException e) {
			e.printStackTrace();
			return "time_out";
		} catch(ConnectException e) {
			e.printStackTrace();
			return "connect_exception";
		}
		catch (Exception ex) {
			log.info("调用IMCC监控中心接口异常" + ex);
		} finally {
			try {
				if (pw != null) {
					pw.close();
					pw = null;
				}
				
				if (os != null) {
					os.close();
					os = null;
				}
				
				if (in != null) {
					in.close();
					in = null;
				}
			}
			catch (Exception ex) {
				log.info("释放资源异常" + ex);
			}
		}
		log.info("mc ret:" + rtn.toString());
		log.warn("mc ret:" + rtn.toString());
		return rtn.toString();
	}
	
	/** 
	 * 过滤出现在XML里的非打印字符 
	 *  
	 * @param in 
	 * @return 
	 * @author 
	 */  
	public static String filtInvalidXMLChars(String in) {  
	    if (in == null || "".equals(in))  
	        return "";  
	  
	    StringBuilder out = new StringBuilder();  
	    char current;  
	  
	    for (int i = 0; i < in.length(); i++) {  
	        current = in.charAt(i);  
	        if ((current == 0x9) || (current == 0xA) || (current == 0xD)  
	                || ((current >= 0x20) && (current <= 0xD7FF))  
	                || ((current >= 0xE000) && (current <= 0xFFFD))  
	                || ((current >= 0x10000) && (current <= 0x10FFFF)))  
	            out.append(current);  
	    }  
	    return out.toString();  
	}  


}
