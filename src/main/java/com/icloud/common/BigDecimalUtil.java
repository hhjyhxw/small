package com.icloud.common;

import java.math.BigDecimal;

public class BigDecimalUtil {

	/**
	 * util四舍五入
	 */
	public static BigDecimal round(String v, int scale)
	  {
	    return round(v, scale, BigDecimal.ROUND_HALF_EVEN);
	  }
	/**
	 *辅助方法
	 */
	public static BigDecimal round(String v, int scale, int round_mode)
	  {
	     if(scale<0)
	     {
	         throw new IllegalArgumentException("The scale must be a positive integer or zero");
	     }
	     BigDecimal b = new BigDecimal(v);
	     return b.setScale(scale, round_mode);
	  }


}
