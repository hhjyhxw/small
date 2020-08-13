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
public class TopicOrderUtil {

	/**
	 * 产生话题广场的订单编号
	 * @return
	 */
	public static String bulidTopicOrderNo(String lastString) {
		return "htgc" + DateTools.convertDateToString("yyyyMMddhh") + lastString;
	}
	

}
