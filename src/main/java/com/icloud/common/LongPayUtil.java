package com.icloud.common;

import java.util.Date;

/**
 * @filename      : LongPayUtil.java
 * @description   : 
 * @author        : zdh
 * @create        : 2017年9月20日 下午4:45:42   
 * @copyright     : zhumeng.com@hyzy-activities
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 */
public class LongPayUtil {



	private static Long msgSerialNumber =1L;
	
	/**
	 * 获取流水号中的第三部分
	 * 
	 * @return
	 */
	public static String getBinaryString() {
		synchronized (LongPayUtil.class) {
			if (msgSerialNumber >= 99999999) {
				msgSerialNumber = 1L;
				return toFillingString(msgSerialNumber.toString());
			} else {
				msgSerialNumber = msgSerialNumber+1;
				return toFillingString(msgSerialNumber.toString());
			}
		}
	}

	/**
	 * 补齐八位二进制
	 * 
	 * @param str
	 * @return
	 */
	public static String toIntegerBinaryString(String str) {
		int num = Integer.parseInt(str);
		char[] bits = new char[8];
		for (int i = bits.length - 1; i >= 0; --i) {
			bits[i] = ((num & 1) == 0) ? '0' : '1';
			num >>>= 1;// 下一位
		}
		return String.copyValueOf(bits);
	}
	
	/**
	 * 补齐八位
	 * 
	 * @param str
	 * @return
	 */
	public static String toFillingString(String str) {
	
		    int length = str.length();
			for(int i=0;i<8-length;i++){
				str = "0"+str;
			}
		
		return str;
	}
	
	/**
	 * 获取请求参数中的时间戳
	 * 
	 * @return
	 */
	public static String getTimeStamp() {
		return (System.currentTimeMillis() / 1000
				- DateUtil.parseTimeString("2000-01-01 00:00:00", "yyyy-MM-dd HH:mm:ss").getTime() / 1000) + "";
	}

	/**
	 * 得到请求中的流水号
	 * 
	 * @return
	 */
	public static String getSerialNumber() {
		String machineNo = ConfigUtil.get("sid");//获取设备号
		String currentTime = DateUtil.getYearMonthDayWithMinus(new Date());
//		String runNum = activityOrderService.getActivityThirdSeqNo();
		String runNum = getBinaryString();
		return machineNo + currentTime + runNum;
	}

	/**
	 * 获取设备号
	 * 
	 * @return
	 */
	public static String getMachineNo() {
		return  ConfigUtil.get("sid");
	}
	
	/**
	 * 获取key
	 * 
	 * @return
	 */
	public static String getKey() {
		return ConfigUtil.get("key");

	}

	/**
	 * 获取充值类别
	 * 
	 * @return
	 */
	public static String getRechargetype() {
		return ConfigUtil.get("rechargetype");
	}

	/**
	 * 获取查询龙币URL
	 * 
	 * @return
	 */
	public static String getQueryUrl() {
		return ConfigUtil.get("queryUrl");
	}

	/**
	 * 获取充值接口URL
	 * 
	 * @return
	 */
	public static String getRechargeUrl() {
		return ConfigUtil.get("rechargeUrl");
	}

	/**
	 * 获取龙币消费URL
	 * 
	 * @return
	 */
	public static String getConsumeUrl() {
		return ConfigUtil.get("consumeUrl");
	}

	/**
	 * 获取消费类别
	 * 
	 * @return
	 */
	public static String getConsumetype() {
		return ConfigUtil.get("consumetype");
	}

}
