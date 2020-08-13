package com.icloud.common.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {
	
	private static char UNDERLINE = '_';

	/**
	 * 对字符进行去空串
	 * 
	 * @param value
	 * @param defVal
	 * @return
	 */
	public static String toTrimString(String value, String defVal) {
		if (null == value || "null".equalsIgnoreCase(value) || "".equals(value)) {
			return defVal;
		} else {
			return value.trim();
		}
	}

	public static boolean checkStr(String str) {
		boolean bool = true;
		if (str == null || "".equals(str.trim()))
			bool = false;
		return bool;
	}

	public static String toString(Object obj) {
		return obj != null ? obj.toString() : "";
	}

	public static int toInt(String str) {
		return "".equals(str) ? -1 : Integer.parseInt(str);
	}

	public static Long toLong(Object obj) {
		String str = toString(obj);
		return "".equals(str) ? 0l : Long.parseLong(str);
	}

	public static Double toDouble(String str) {
		return "".equals(str) ? 0.0 : Double.parseDouble(str);
	}

	/**
	 * 空 --false
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean checkObj(Object obj) {
		boolean bool = true;
		if (obj == null || "".equals(obj.toString().trim()))
			bool = false;
		return bool;
	}

	public static String toStringOrNbsp(Object obj) {
		if (obj == null || obj.equals("") || obj.equals("null")) {
			return "&nbsp;"; // 该返回值不能修改
		} else {
			return obj.toString().trim();
		}
	}

	public static String getISOToGBK(String str) {
		String strName = "";
		try {
			if (str != null) {
				strName = new String(str.getBytes("ISO8859_1"), "GBK");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strName;
	}

	public static String getISOToUTF8(String str) {
		String strName = "";
		try {
			if (str != null) {
				strName = new String(str.getBytes("ISO8859_1"), "UTF8");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strName;
	}

	public static String getNowTime() {
		Date nowDate = new Date();
		Calendar now = Calendar.getInstance();
		now.setTime(nowDate);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String str = formatter.format(now.getTime());
		return str;
	}

	public static String getNowTime(String format) {
		Date nowDate = new Date();
		Calendar now = Calendar.getInstance();
		now.setTime(nowDate);
		String str = "";
		try {
			SimpleDateFormat formatter = new SimpleDateFormat(format);
			str = formatter.format(now.getTime());
		} catch (Exception e) {
		}
		return str;
	}

	public static long getTimeInMillis(String sDate, String eDate) {
		Timestamp sd = Timestamp.valueOf(sDate);
		Timestamp ed = Timestamp.valueOf(eDate);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(sd);
		long timethis = calendar.getTimeInMillis();

		Calendar calendar2 = Calendar.getInstance();
		calendar2.setTime(ed);
		long timeend = calendar2.getTimeInMillis();
		long thedaymillis = timeend - timethis;
		return thedaymillis;
	}

	public static String formatDateTime(String dTime) {
		String dateTime = "";
		if (dTime != null && !"".equals(dTime)
				&& !dTime.startsWith("1900-01-01")) {
			Timestamp t = Timestamp.valueOf(dTime);
			SimpleDateFormat formatter = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm");
			dateTime = formatter.format(t);
		}
		return dateTime;
	}

	public static String formatDateTimeAddSecond(String dTime) {
		String dateTime = "";
		if (dTime != null && !"".equals(dTime)
				&& !dTime.startsWith("1900-01-01")) {
			Timestamp t = Timestamp.valueOf(dTime);
			SimpleDateFormat formatter = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			dateTime = formatter.format(t);
		}
		return dateTime;
	}

	public static String formatTime(String dTime) {
		String dateTime = "";
		if (dTime != null && !"".equals(dTime)) {
			Timestamp t = Timestamp.valueOf(dTime);
			SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
			dateTime = formatter.format(t);
		}
		return dateTime;
	}

	public static Date parses(String strDate, String pattern)
			throws ParseException {
		return new SimpleDateFormat(pattern).parse(strDate);
	}

	// 当前日期是第几周
	public static String getWeekOfYear() {
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		String week = calendar.get(Calendar.WEEK_OF_YEAR) + "";
		return week;
	}

	// 当前时间减去一年
	@SuppressWarnings("static-access")
	public static String getNowTimeLittle() {
		Calendar c = Calendar.getInstance();
		c.add(c.YEAR, +1);
		String time = "" + c.get(c.YEAR) + "-" + (c.get(c.MONTH) + 1) + "-"
				+ c.get(c.DATE) + " " + c.get(c.HOUR_OF_DAY) + ":"
				+ c.get(c.MINUTE) + ":" + c.get(c.SECOND);
		String returnstr = "";
		try {
			Date d = StringUtil.parses(time, "yyyy-MM-dd HH:mm:ss");
			// System.out.println(SimpleDateFormat(d,"yyyy-MM-dd HH:mm:ss"));
			SimpleDateFormat formatter = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");

			returnstr = formatter.format(d);
		} catch (Exception e) {

		}
		return returnstr;

	}

	// 当前时间减去一天
	@SuppressWarnings("static-access")
	public static String getNowTimeLittleDate() {
		Calendar c = Calendar.getInstance();
		c.add(c.DATE, +1);
		String time = "" + c.get(c.YEAR) + "-" + (c.get(c.MONTH) + 1) + "-"
				+ c.get(c.DATE) + " " + c.get(c.HOUR_OF_DAY) + ":"
				+ c.get(c.MINUTE) + ":" + c.get(c.SECOND);
		String returnstr = "";
		try {
			Date d = StringUtil.parses(time, "yyyy-MM-dd HH:mm:ss");
			// System.out.println(SimpleDateFormat(d,"yyyy-MM-dd HH:mm:ss"));
			SimpleDateFormat formatter = new SimpleDateFormat(
					"yyyy-MM-dd 00:00:00");

			returnstr = formatter.format(d);
		} catch (Exception e) {

		}
		return returnstr;

	}

	// 根据参数获取随机值的整位数
	public static String getRandom(int num) {
		return (Math.random() + "").substring(2, num + 2);
	}

	public static String getTimeInMillis(Date sDate, Date eDate) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(sDate);
		long timethis = calendar.getTimeInMillis();

		Calendar calendar2 = Calendar.getInstance();
		calendar2.setTime(eDate);
		long timeend = calendar2.getTimeInMillis();
		long thedaymillis = timeend - timethis;
		return thedaymillis < 1000 ? thedaymillis + "毫秒!"
				: (thedaymillis / 1000) + "秒!";
	}

	public static String showTrace() {
		StackTraceElement[] ste = new Throwable().getStackTrace();
		StringBuffer CallStack = new StringBuffer();

		for (int i = 1; i < ste.length; i++) {
			CallStack.append(ste[i].toString() + "\n");
			if (i > 4)
				break;
		}
		return CallStack.toString();
	}

	public static String checkTableDefKey(String[] key, String[] value,
			String name) {
		String str = "";
		for (int i = 0; i < key.length; i++) {
			if (name.equals(key[i])) {
				str = value[i];
				break;
			}
		}
		return str;
	}

	public static boolean isChinese(String str) {
		String regEx = "[\\u4e00-\\u9fa5]";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(str);
		return m.find();
	}

	public static String getStrToGbk(String str) {
		String strName = "";
		try {
			if (str != null) {
				strName = new String(str.getBytes("UTF-8"), "GBK");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strName;
	}

	public static String getNextDate(String ts, int i) {
		Calendar now = Calendar.getInstance();
		Timestamp t = Timestamp.valueOf(ts + " 00:00:00");
		now.setTime(t);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		now.add(Calendar.DAY_OF_MONTH, +(i));
		String dt = formatter.format(now.getTime());
		return dt;
	}

	public static String getNextTime(String ts, int i) {
		Calendar now = Calendar.getInstance();
		Timestamp t = Timestamp.valueOf(ts);
		System.out.println(t + "     " + ts);
		now.setTime(t);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		now.add(Calendar.MINUTE, +(i));
		String dt = formatter.format(now.getTime());
		return dt;
	}

	// 取Unix时间戳
	public static long getUnixTime(String dateTime) {
		Date date1 = null;
		Date date2 = null;
		try {
			date1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dateTime);
			date2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
					.parse("1970-01-01 08:00:00");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long l = (date1.getTime() - date2.getTime()) / 1000;
		return l;
	}

	public static String toFirstUpperCase(String str) {
		if (str == null || "".equals(str.trim()))
			return "";
		String firstChar = str.substring(0, 1).toUpperCase();
		String lastStr = str.substring(1);
		return firstChar + lastStr;
	}

	public static String toHTMLString(String in) {
		StringBuffer out = new StringBuffer();
		for (int i = 0; in != null && i < in.length(); i++) {
			char c = in.charAt(i);
			if (c == '\n')
				out.append("");
			else
				out.append(c);
		}
		return out.toString().trim();
	}

	/**
	 * 两位小数格式化
	 * 
//	 * @param double
	 * @return String
	 * */
	public static String format2point(double unm) {
		// 0和整数不需要格式化
		if (unm == 0)
			return "0";
		else if ((unm + "").lastIndexOf(".0") > 0)
			return (unm + "").substring(0, (unm + "").length() - 2);
		else {
			DecimalFormat df = new DecimalFormat("#.00");
			return df.format(unm);
		}
	}

	public static String formatS2p(String unm) {
		// 0、空格、整数不需要格式化
		if ("0".equals(unm) || "".equals(unm))
			return unm;
		else if ((unm + "").lastIndexOf(".00") > 0)
			return (unm + "").substring(0, (unm + "").length() - 3);
		else {
			double temp = Double.parseDouble(unm);
			DecimalFormat df = new DecimalFormat("#.00");
			return df.format(temp);
		}
	}
	/**
	 * 
	 * @Title: TimeInMillisToDate 
	 * @Description:毫秒数转成String类型的日期
	 * @param @param time
	 * @param @return 设定文件 
	 * @return String 返回类型 
	 * @author yr_xiezhy
	 * @date 2015-3-27 上午11:59:14 
	 * @throws
	 */
	public static String TimeInMillisToDate(Long time){
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(time);
		return formatter.format(calendar.getTime());
	}
	
	/**
	 * 驼峰转下划线
	 * @param param
	 * @return
	 */
	 public static String camelToUnderline(String param){  
	       if (param==null||"".equals(param.trim())){  
	           return "";  
	       }  
	       int len=param.length();  
	       StringBuilder sb=new StringBuilder(len);  
	       for (int i = 0; i < len; i++) {  
	           char c=param.charAt(i);  
	           if (Character.isUpperCase(c)){  
	               sb.append(UNDERLINE);  
	               sb.append(Character.toLowerCase(c));  
	           }else{  
	               sb.append(c);  
	           }  
	       }  
	       return sb.toString();  
	   }  
	 
	  /**
		 * 下划线转驼峰
		 * @param param
		 * @return
		 */
	   public static String underlineToCamel(String param){  
	       if (param==null||"".equals(param.trim())){  
	           return "";  
	       }  
	       int len=param.length();  
	       StringBuilder sb=new StringBuilder(len);  
	       for (int i = 0; i < len; i++) {  
	           char c=param.charAt(i);  
	           if (c==UNDERLINE){  
	              if (++i<len){  
	                  sb.append(Character.toUpperCase(param.charAt(i)));  
	              }  
	           }else{  
	               sb.append(c);  
	           }  
	       }  
	       return sb.toString();  
	   }  
	   
	   /*
	    * 下划线转驼峰
	    */
	   public static String underlineToCamel2(String param){  
	       if (param==null||"".equals(param.trim())){  
	           return "";  
	       }  
	       StringBuilder sb=new StringBuilder(param);  
	       Matcher mc= Pattern.compile("_").matcher(param);  
	       int i=0;  
	       while (mc.find()){  
	           int position=mc.end()-(i++);  
	           //String.valueOf(Character.toUpperCase(sb.charAt(position)));  
	           sb.replace(position-1,position+1,sb.substring(position,position+1).toUpperCase());  
	       }  
	       return sb.toString();  
	   }  
	
	   
/**
 * 对应JS 的escape
 * @param src
 * @return
 */
public static String escape(String src) {
  int i;
  char j;
  StringBuffer tmp = new StringBuffer();
  tmp.ensureCapacity(src.length() * 6);
  for (i = 0; i < src.length(); i++) {
   j = src.charAt(i);
   if (Character.isDigit(j) || Character.isLowerCase(j)
     || Character.isUpperCase(j))
    tmp.append(j);
   else if (j < 256) {
    tmp.append("%");
    if (j < 16)
     tmp.append("0");
    tmp.append(Integer.toString(j, 16));
   } else {
    tmp.append("%u");
    tmp.append(Integer.toString(j, 16));
   }
  }
  return tmp.toString();
 }
 

 /**
  * 对应JS 的unescape
  * @param src
  * @return
  */
 public static String unescape(String src) {
  StringBuffer tmp = new StringBuffer();
  tmp.ensureCapacity(src.length());
  int lastPos = 0, pos = 0;
  char ch;
  while (lastPos < src.length()) {
   pos = src.indexOf("%", lastPos);
   if (pos == lastPos) {
    if (src.charAt(pos + 1) == 'u') {
     ch = (char) Integer.parseInt(src
       .substring(pos + 2, pos + 6), 16);
     tmp.append(ch);
     lastPos = pos + 6;
    } else {
     ch = (char) Integer.parseInt(src
       .substring(pos + 1, pos + 3), 16);
     tmp.append(ch);
     lastPos = pos + 3;
    }
   } else {
    if (pos == -1) {
     tmp.append(src.substring(lastPos));
     lastPos = src.length();
    } else {
     tmp.append(src.substring(lastPos, pos));
     lastPos = pos;
    }
   }
  }
  return tmp.toString();
 }
 
//	public static void main(String[] args) {
//		System.out.println(TimeInMillisToDate(1427428169309L));;
//	}
	

	
	

}
