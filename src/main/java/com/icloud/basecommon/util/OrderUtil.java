package com.icloud.basecommon.util;

import com.icloud.common.DateTools;

/**
 * @filename      : OrderUtil.java
 * @description   : 
 * @author        : zdh
 * @create        : 2017年9月17日 下午9:44:38   
 * @copyright     : zhumeng.com@hyzy-activities
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 */
public class OrderUtil {

	/**
	 * 产生订单编号
	 * @return
	 */
	public static String bulidOrderNo(String lastString) {
		return "zssp" + DateTools.convertDateToString("yyyyMMddhhmmss") + lastString;
	}
	
	/**
	 * 退款订单编号
	 * @return
	 */
	public static String bulidRefunNo(String lastString) {
		return "R" + DateTools.convertDateToString("yyyyMMdd") + lastString;
	}
	
	/**
	 * 乐豆订单号后缀
	 * @return
	 */
	public static String bulidBeanOrderNo() {
		return "_" + DateTools.convertDateToString("yyyyMMddHHmmss");
	}
	

}
