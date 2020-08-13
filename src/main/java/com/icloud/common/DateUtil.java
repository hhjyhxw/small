package com.icloud.common;

import java.util.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.StringTokenizer;

/**
 * 
 * @filename       : DateUtil.java
 * @description    : TODO
 * @author         : penglong
 * @create         : 2015-1-30 下午02:08:00
 * @copyright      : mall Corporation 2015
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 * 2015-1-30 下午02:08:00  long
 */
public class DateUtil {
	/*
	 * 获得当前时间
	 */
	public static Date getCurrentDate() {
		Calendar cl = Calendar.getInstance();
		return cl.getTime();
	}

	/*
	 * 获得当前时间的前N分钟的时间
	 */
	public static Date getCurrentDateBeforeMins(int num) {
		Calendar cl = Calendar.getInstance();
		cl.add(Calendar.MINUTE, -1 * num);
		return cl.getTime();
	}

	public static Date getPureDate(String source) {
		java.util.Date date = null;
		if ("".equals(source) || null == source || "null".equalsIgnoreCase(source)) {
			return null;
		}
		int index = source.indexOf(" ");
		if (index != -1)
			source = source.substring(0, index);

		try {
			StringTokenizer st = new StringTokenizer(source, "-");
			int month = 0, day = 0, year = 0;

			if (st.hasMoreTokens()) {
				year = Integer.parseInt(st.nextToken());
				if (st.hasMoreTokens()) {
					month = Integer.parseInt(st.nextToken());
					if (st.hasMoreTokens()) {
						day = Integer.parseInt(st.nextToken());
					}
				}
			}

			Calendar cl = Calendar.getInstance();
			if (year < 100) {
				year += 1900;
			}
			cl.set(year, month - 1, day, 0, 0, 0);
			date = new java.util.Date(cl.getTime().getTime());
		} catch (Exception e) {
			date = null;
		}

		return date;
	}

	public static Date getDate(int year, int month, int day) {
		java.util.Date date = null;
		try {
			Calendar cl = Calendar.getInstance();
			if (year < 100) {
				year += 1900;
			}
			cl.set(year, month - 1, day, 0, 0, 0);
			date = new java.util.Date(cl.getTime().getTime());
		} catch (Exception e) {
			date = null;
		}

		return date;
	}

	public static Calendar getCalendar(String source) {
		if ("".equals(source) || null == source || "null".equalsIgnoreCase(source)) {
			return null;
		}

		try {
			StringTokenizer st = new StringTokenizer(source, "-");
			int month = 0, day = 0, year = 0;

			if (st.hasMoreTokens()) {
				year = Integer.parseInt(st.nextToken());
				if (st.hasMoreTokens()) {
					month = Integer.parseInt(st.nextToken());
					if (st.hasMoreTokens()) {
						day = Integer.parseInt(st.nextToken());
					}
				}
			}
			if (year < 100) {
				year += 1900;
			}
			Calendar cl = Calendar.getInstance();
			cl.set(year, month - 1, day, 0, 0, 0);
			return cl;
		} catch (Exception e) {
		}

		return null;
	}

	public static Timestamp getNextDate(String source) {
		Timestamp stamp = null;
		if ("".equals(source) || null == source || "null".equalsIgnoreCase(source)) {
			return null;
		}

		try {
			StringTokenizer st = new StringTokenizer(source, "-");
			int month = 0, day = 0, year = 0;

			if (st.hasMoreTokens()) {
				year = Integer.parseInt(st.nextToken());
				if (st.hasMoreTokens()) {
					month = Integer.parseInt(st.nextToken());
					if (st.hasMoreTokens()) {
						day = Integer.parseInt(st.nextToken());
					}
				}
			}

			Calendar cl = Calendar.getInstance();
			cl.set(year, month - 1, day + 1, 0, 0, 0);
			stamp = new Timestamp(cl.getTime().getTime());
			stamp.setNanos(0);
		} catch (Exception e) {
			stamp = null;
		}

		return stamp;
	}

	public static int[] getDateArray(java.util.Date date) {
		Calendar cl = Calendar.getInstance();
		cl.setTime(date);
		return new int[] { cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DAY_OF_MONTH) };
	}

	public static Date maxDate(java.util.Date d1, java.util.Date d2) {
		if (d1 == null)
			return d2;
		if (d2 == null)
			return d1;
		int result = d1.compareTo(d2);
		if (result <= 0)
			return d2;
		return d1;
	}

	public static Date getBeginDate(Date beginDate, Date start) {
		if (beginDate == null)
			return start;
		if (beginDate.compareTo(start) <= 0)
			return start;
		else
			return beginDate;
	}

	public static boolean equalsDate(Date d1, Date d2) {
		if (d1 == null || d2 == null)
			return false;
		if (d1.compareTo(d2) == 0)
			return true;
		return false;
	}

	public static int[] getCurrentDateArray() {
		Calendar currentDay = Calendar.getInstance();
		return new int[] { currentDay.get(Calendar.YEAR), currentDay.get(Calendar.MONTH) + 1, currentDay.get(Calendar.DAY_OF_MONTH) };
	}

	/**
	 * 将字符串转换成日期：yyyy-MM-dd
	 */
	public static Date getDateWithoutTime(String source) {
		return parseTimeString(source, "yyyy-MM-dd");
	}

	/**
	 * 将字符串转换成时间：yyyy-MM-dd HH:mm:ss
	 */
	public static Date getDateWithAll(String source) {
		return parseTimeString(source, "yyyy-MM-dd HH:mm:ss");
	}

	
	public  static Date getDateWithStirng(String source){
		return parseTimeString(source,"yyyyMMddHHmmss");
	}
	
	/**
	 * 将字符串、按照指定格式，转换成时间
	 */
	public static Date parseTimeString(String source, String fmt) {
		if (null == source || "".equals(source.trim()))
			return null;
		SimpleDateFormat format = new SimpleDateFormat(fmt);
		try {
			return new Date(format.parse(source).getTime());
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 格式化时间：yyyy-MM-dd HH:mm:ss，示例：2014-10-10 12:13:14
	 */
	public static String formatTimestamp(java.util.Date date) {
		return commonFormatDate(date, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 获得年月：yyyyMM，如201410
	 */
	public static String getYearMonth(java.util.Date date) {
		return commonFormatDate(date, "yyyyMM");
	}

	/**
	 * 获得年月日：yyyyMMdd，如20140708
	 */
	public static String getYearMonthDay(java.util.Date date) {
		return commonFormatDate(date, "yyyyMMdd");
	}

	/**
	 * 格式化时间：yyyyMMddHHmmss，如20140707010506
	 */
	public static String getYearMonthDayWithMinus(java.util.Date date) {
		return commonFormatDate(date, "yyyyMMddHHmmss");
	}

	/**
	 * 格式化时间（精确到毫秒）：yyyyMMddHHmmssSSS，如20140707010506158
	 */
	public static String getYearMonthDayWithMilsec(java.util.Date date) {
		return commonFormatDate(date, "yyyyMMddHHmmssSSS");
	}

	/**
	 * 格式化日期：yyyy-MM-dd，如2014-07-08
	 */
	public static String formatDate(java.util.Date date) {
		return commonFormatDate(date, "yyyy-MM-dd");
	}

	public static String commonFormatDate(java.util.Date date, String fmt) {
		if (null == date)
			return "";
		SimpleDateFormat formatter = new SimpleDateFormat(fmt);
		return formatter.format(date);
	}

	public static Timestamp getTimestamp(String source) {
		if (null == source || "".equals(source.trim()))
			return null;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			return new Timestamp(format.parse(source).getTime());
		} catch (ParseException e) {
			return null;
		}
	}

	public static String formatDateStr(String source) {
		if (null == source || source.length() != 14)
			return "";
		StringBuilder sb = new StringBuilder();
		sb.append(source.substring(0, 4));
		sb.append("-");
		sb.append(source.substring(4, 6));
		sb.append("-");
		sb.append(source.substring(6, 8));

		sb.append(" ");
		sb.append(source.substring(8, 10));
		sb.append(":");
		sb.append(source.substring(10, 12));
		sb.append(":");
		sb.append(source.substring(12, 14));

		return sb.toString();
	}

	public static int getDaysOfMonth(int year, int month) {
		Calendar c = Calendar.getInstance();
		c.set(year, month, 0);
		return c.get(Calendar.DAY_OF_MONTH);
	}

	public static int getDiffYearFromNow(String str) {
		Calendar cl = getCalendar(str);
		return Calendar.getInstance().get(Calendar.YEAR) - cl.get(Calendar.YEAR);
	}

	public static int compareDate(Date srcDate, Date tgtDate) {
		if (srcDate == null)
			return -1;
		if (tgtDate == null)
			return 1;
		return srcDate.compareTo(tgtDate);
	}

	public static Date getPureCurrentDate() {
		int[] arr = getCurrentDateArray();
		return getDate(arr[0], arr[1], arr[2]);
	}

	public static int compareWithCurrentDate(Date tgtDate) {
		if (tgtDate == null)
			return -1;
		int[] arr = getCurrentDateArray();
		java.util.Date curDate = getDate(arr[0], arr[1], arr[2]);
		arr = getYMD(tgtDate);
		tgtDate = getDate(arr[0], arr[1], arr[2]);
		return curDate.compareTo(tgtDate);
	}

	public static int[] getYMD(Date date) {
		if (date == null)
			return new int[] { 0, 0, 0 };
		Calendar cl = Calendar.getInstance();
		cl.setTime(date);
		return new int[] { cl.get(Calendar.YEAR), cl.get(Calendar.MONTH) + 1, cl.get(Calendar.DAY_OF_MONTH) };
	}

	/**
	 * 获得当前年份
	 */
	public static int getYear() {
		return Calendar.getInstance().get(Calendar.YEAR);
	}

	/**
	 * 获得当前月份
	 */
	public static int getMonth() {
		return Calendar.getInstance().get(Calendar.MONTH) + 1;
	}

	/**
	 * 获得今天在本年的第几天
	 */
	public static int getDayOfYear() {
		return Calendar.getInstance().get(Calendar.DAY_OF_YEAR);
	}

	/**
	 * 获得今天在本月的第几天(获得当前日)
	 */
	public static int getDayOfMonth() {
		return Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 获得今天在本周的第几天
	 */
	public static int getDayOfWeek() {
		return Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
	}

	/**
	 * 获得今天是这个月的第几周
	 */
	public static int getWeekOfMonth() {
		return Calendar.getInstance().get(Calendar.DAY_OF_WEEK_IN_MONTH);
	}

	/**
	 * 获得半年后的日期
	 */
	public static Date getTimeYearNext() {
		Calendar.getInstance().add(Calendar.DAY_OF_YEAR, 183);
		return Calendar.getInstance().getTime();
	}

	/**
	 * 将日期转换成字符串
	 */
	public static String convertDateToString(Date dateTime) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return df.format(dateTime);
	}

	/**
	 * 得到二个日期间的间隔天数
	 */
	public static String getTwoDay(String sj1, String sj2) {
		SimpleDateFormat myFormatter = new SimpleDateFormat("yyyy-MM-dd");
		long day = 0;
		try {
			java.util.Date date = myFormatter.parse(sj1);
			java.util.Date mydate = myFormatter.parse(sj2);
			day = (date.getTime() - mydate.getTime()) / (24 * 60 * 60 * 1000);
		} catch (Exception e) {
			return "";
		}
		return day + "";
	}

	/**
	 * 根据一个日期，返回是星期几的字符串
	 */
	public static String getWeek(String sdate) {
		// 再转换为时间
		Date date = strToDate(sdate);
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return new SimpleDateFormat("EEEE").format(c.getTime());
	}

	/**
	 * 将短时间格式字符串转换为时间 yyyy-MM-dd
	 */
	public static Date strToDate(String strDate) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		ParsePosition pos = new ParsePosition(0);
		Date strtodate = formatter.parse(strDate, pos);
		return strtodate;
	}

	/**
	 * 两个时间之间的天数
	 */
	public static long getDays(String date1, String date2) {
		if (date1 == null || date1.equals(""))
			return 0;
		if (date2 == null || date2.equals(""))
			return 0;
		// 转换为标准时间
		SimpleDateFormat myFormatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		Date mydate = null;
		try {
			date = myFormatter.parse(date1);
			mydate = myFormatter.parse(date2);
		} catch (Exception e) {
		}
		long day = (date.getTime() - mydate.getTime()) / (24 * 60 * 60 * 1000);
		return day;
	}

	/**
	 * 获得当天的前N天,返回字符串
	 */
	public static String getBeforeDays(int num) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.DATE, -1 * num);
		String dateStr = formatDate(calendar.getTime());
		return dateStr;
	}
	
	/**
	 * 计算当月最后一天,返回字符串
	 */
	public static String getDefaultDay() {
		String str = "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		Calendar lastDate = Calendar.getInstance();
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1号
		lastDate.add(Calendar.MONTH, 1);// 加一个月，变为下月的1号
		lastDate.add(Calendar.DATE, -1);// 减去一天，变为当月最后一天

		str = sdf.format(lastDate.getTime());
		return str;
	}

	/**
	 * 上月第一天
	 */
	public static String getPreviousMonthFirst() {
		String str = "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		Calendar lastDate = Calendar.getInstance();
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1号
		lastDate.add(Calendar.MONTH, -1);// 减一个月，变为下月的1号
		// lastDate.add(Calendar.DATE,-1);//减去一天，变为当月最后一天

		str = sdf.format(lastDate.getTime());
		return str;
	}

	/**
	 * 获取当月第一天
	 */
	public static String getFirstDayOfMonth() {
		String str = "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		Calendar lastDate = Calendar.getInstance();
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1号
		str = sdf.format(lastDate.getTime());
		return str;
	}

	/**
	 * 获取当天时间
	 */
	public static String getNowTime(String dateformat) {
		Date now = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat(dateformat);// 可以方便地修改日期格式
		String hehe = dateFormat.format(now);
		return hehe;
	}

	/**
	 * 获得当前日期与本周日相差的天数
	 */
	private static int getMondayPlus() {
		Calendar cd = Calendar.getInstance();
		// 获得今天是一周的第几天，星期日是第一天，星期二是第二天......
		int dayOfWeek = cd.get(Calendar.DAY_OF_WEEK) - 1; // 因为按中国礼拜一作为第一天所以这里减1
		if (dayOfWeek == 1) {
			return 0;
		} else {
			return 1 - dayOfWeek;
		}
	}

	/**
	 * 获得本周一的日期
	 */
	public static String getMondayOFWeek() {
		int mondayPlus = getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus);
		Date monday = currentDate.getTime();

		DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);
		return preMonday;
	}

	/**
	 * 获得上月最后一天的日期
	 */
	public static String getPreviousMonthEnd() {
		String str = "";

		Calendar lastDate = Calendar.getInstance();
		lastDate.add(Calendar.MONTH, -1);// 减一个月
		lastDate.set(Calendar.DATE, 1);// 把日期设置为当月第一天
		lastDate.roll(Calendar.DATE, -1);// 日期回滚一天，也就是本月最后一天
		str = formatDate(lastDate.getTime());
		return str;
	}

	/**
	 * 获得下个月第一天的日期
	 */
	public static String getNextMonthFirst() {
		String str = "";

		Calendar lastDate = Calendar.getInstance();
		lastDate.add(Calendar.MONTH, 1);// 减一个月
		lastDate.set(Calendar.DATE, 1);// 把日期设置为当月第一天
		str = formatDate(lastDate.getTime());
		return str;
	}

	/**
	 * 获得下个月最后一天的日期
	 */
	public static String getNextMonthEnd() {
		String str = "";

		Calendar lastDate = Calendar.getInstance();
		lastDate.add(Calendar.MONTH, 1);// 加一个月
		lastDate.set(Calendar.DATE, 1);// 把日期设置为当月第一天
		lastDate.roll(Calendar.DATE, -1);// 日期回滚一天，也就是本月最后一天
		str = formatDate(lastDate.getTime());
		return str;
	}

	/**
	 * 获得明年最后一天的日期
	 */
	public static String getNextYearEnd() {
		String str = "";

		Calendar lastDate = Calendar.getInstance();
		lastDate.add(Calendar.YEAR, 1);// 加一个年
		lastDate.set(Calendar.DAY_OF_YEAR, 1);
		lastDate.roll(Calendar.DAY_OF_YEAR, -1);
		str = formatDate(lastDate.getTime());
		return str;
	}

	/**
	 * 获得明年第一天的日期
	 */
	public static String getNextYearFirst() {
		String str = "";

		Calendar lastDate = Calendar.getInstance();
		lastDate.add(Calendar.YEAR, 1);// 加一个年
		lastDate.set(Calendar.DAY_OF_YEAR, 1);
		str = formatDate(lastDate.getTime());
		return str;
	}

	/**
	 * 获得本年有多少天
	 */
	@SuppressWarnings("unused")
	private static int getMaxYear() {
		Calendar cd = Calendar.getInstance();
		cd.set(Calendar.DAY_OF_YEAR, 1);// 把日期设为当年第一天
		cd.roll(Calendar.DAY_OF_YEAR, -1);// 把日期回滚一天。
		int MaxYear = cd.get(Calendar.DAY_OF_YEAR);
		return MaxYear;
	}

	private static int getYearPlus() {
		Calendar cd = Calendar.getInstance();
		int yearOfNumber = cd.get(Calendar.DAY_OF_YEAR);// 获得当天是一年中的第几天
		cd.set(Calendar.DAY_OF_YEAR, 1);// 把日期设为当年第一天
		cd.roll(Calendar.DAY_OF_YEAR, -1);// 把日期回滚一天。
		int MaxYear = cd.get(Calendar.DAY_OF_YEAR);
		if (yearOfNumber == 1) {
			return -MaxYear;
		} else {
			return 1 - yearOfNumber;
		}
	}

	/**
	 * 获得本年第一天的日期
	 */
	public static String getCurrentYearFirst() {
		int yearPlus = getYearPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, yearPlus);
		Date yearDay = currentDate.getTime();
		DateFormat df = DateFormat.getDateInstance();
		String preYearDay = df.format(yearDay);
		return preYearDay;
	}

	// 获得本年最后一天的日期
	public static String getCurrentYearEnd() {
		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");// 可以方便地修改日期格式
		String years = dateFormat.format(date);
		return years + "-12-31";
	}

	// 获得上年第一天的日期
	public static String getPreviousYearFirst() {
		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");// 可以方便地修改日期格式
		String years = dateFormat.format(date);
		int years_value = Integer.parseInt(years);
		years_value--;
		return years_value + "-1-1";
	}

	/**
	 * 获得本季度第一天
	 */
	public static String getThisSeasonFirstTime(int month) {
		int array[][] = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 }, { 10, 11, 12 } };
		int season = getSeasonNum(month);

		int start_month = array[season - 1][0];
		int end_month = array[season - 1][2];

		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");// 可以方便地修改日期格式
		String years = dateFormat.format(date);

		int years_value = Integer.parseInt(years);

		int start_days = 1;// years+"-"+String.valueOf(start_month)+"-1";//getLastDayOfMonth(years_value,start_month);
		@SuppressWarnings("unused")
		int end_days = getLastDayOfMonth(years_value, end_month);
		String seasonDate = years_value + "-" + start_month + "-" + start_days;
		return seasonDate;
	}

	/**
	 * 获得月份所在季度
	 */
	public static int getSeasonNum(int month) {
		int season = 1;

		if (month >= 1 && month <= 3)
			season = 1;
		else if (month >= 4 && month <= 6)
			season = 2;
		else if (month >= 7 && month <= 9)
			season = 3;
		else if (month >= 10 && month <= 12)
			season = 4;

		return season;
	}

	/**
	 * 获得季度的第一天
	 */
	public static String getFirstdayofSeason(int year, int season) {
		String str = "";
		switch (season) {
		case 1:
			str = year + "-01-01";
			break;
		case 2:
			str = year + "-04-01";
			break;
		case 3:
			str = year + "-07-01";
			break;
		case 4:
			str = year + "-10-01";
			break;
		default:
			str = year + "-01-01";
			break;
		}
		return str;
	}

	/**
	 * 获得季度的最后一天
	 */
	public static String getLastdayofSeason(int year, int season) {
		String str = "";
		switch (season) {
		case 1:
			str = year + "-03-31";
			break;
		case 2:
			str = year + "-06-30";
			break;
		case 3:
			str = year + "-09-30";
			break;
		case 4:
			str = year + "-12-31";
			break;
		default:
			str = year + "-03-31";
			break;
		}
		return str;
	}

	/**
	 * 获取某年某月的最后一天
	 */
	public static int getLastDayOfMonth(int year, int month) {
		if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
			return 31;
		} else if (month == 4 || month == 6 || month == 9 || month == 11) {
			return 30;
		}

		if (month == 2) {
			if (isLeapYear(year)) {
				return 29;
			} else {
				return 28;
			}
		}

		return 0;
	}

	/**
	 * 是否闰年
	 */
	public static boolean isLeapYear(int year) {
		return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
	}

	/**
	 * 是否闰年
	 */
	public static boolean isLeapYear2(int year) {
		return new GregorianCalendar().isLeapYear(year);
	}

	public static Date getMonday(Date date) {
		Calendar cDay = Calendar.getInstance();
		cDay.setTime(date);
		cDay.set(Calendar.DAY_OF_WEEK, 2);// 老外将周日定位第一天，周一取第二天
		return cDay.getTime();
	}

	/**
	 * 获取指定年份有多少周
	 */
	public static int getTotalWeekOfYear(int year) {
		Calendar c = Calendar.getInstance();
		return c.getActualMaximum(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * 得到本月第一天的日期
	 */
	public static Date getFirstDayOfMonth(Date date) {
		Calendar cDay = Calendar.getInstance();
		cDay.setTime(date);
		cDay.set(Calendar.DAY_OF_MONTH, 1);
		return cDay.getTime();
	}

	/**
	 * 得到本月最后一天的日期
	 */
	public static Date getLastDayOfMonth(Date date) {
		Calendar cDay = Calendar.getInstance();
		cDay.setTime(date);
		cDay.set(Calendar.DAY_OF_MONTH, cDay.getActualMaximum(Calendar.DAY_OF_MONTH));
		return cDay.getTime();
	}

	/**
	 * 得到指定日期的最近6个月日期
	 */
	public static Date[] getLastesMonths(Date date) {
		Calendar cl = Calendar.getInstance();
		cl.setTime(date);
		int year = cl.get(Calendar.YEAR);
		int month = cl.get(Calendar.MONTH) + 1;
		Date[] dates = new Date[6];

		for (int index = 0; index < dates.length; index++) {
			cl.set(year, month - 2 - index, 1, 0, 0, 0);
			dates[index] = new java.util.Date(cl.getTime().getTime());
		}

		return dates;
	}

	/**
	 * 得到本季度第一天的日期
	 */
	public static Date getFirstDayOfQuarter(Date date) {
		Calendar cDay = Calendar.getInstance();
		cDay.setTime(date);
		int curMonth = cDay.get(Calendar.MONTH);
		if (curMonth >= Calendar.JANUARY && curMonth <= Calendar.MARCH) {
			cDay.set(Calendar.MONTH, Calendar.JANUARY);
		}

		if (curMonth >= Calendar.APRIL && curMonth <= Calendar.JUNE) {
			cDay.set(Calendar.MONTH, Calendar.APRIL);
		}

		if (curMonth >= Calendar.JULY && curMonth <= Calendar.AUGUST) {
			cDay.set(Calendar.MONTH, Calendar.JULY);
		}

		if (curMonth >= Calendar.OCTOBER && curMonth <= Calendar.DECEMBER) {
			cDay.set(Calendar.MONTH, Calendar.OCTOBER);
		}

		cDay.set(Calendar.DAY_OF_MONTH, cDay.getActualMinimum(Calendar.DAY_OF_MONTH));
		return cDay.getTime();
	}

	/**
	 * 得到本季度最后一天的日期
	 */
	public static Date getLastDayOfQuarter(Date date) {
		Calendar cDay = Calendar.getInstance();
		cDay.setTime(date);
		int curMonth = cDay.get(Calendar.MONTH);
		if (curMonth >= Calendar.JANUARY && curMonth <= Calendar.MARCH) {
			cDay.set(Calendar.MONTH, Calendar.MARCH);
		}

		if (curMonth >= Calendar.APRIL && curMonth <= Calendar.JUNE) {
			cDay.set(Calendar.MONTH, Calendar.JUNE);
		}

		if (curMonth >= Calendar.JULY && curMonth <= Calendar.AUGUST) {
			cDay.set(Calendar.MONTH, Calendar.AUGUST);
		}

		if (curMonth >= Calendar.OCTOBER && curMonth <= Calendar.DECEMBER) {
			cDay.set(Calendar.MONTH, Calendar.DECEMBER);
		}

		cDay.set(Calendar.DAY_OF_MONTH, cDay.getActualMaximum(Calendar.DAY_OF_MONTH));
		return cDay.getTime();
	}

	/*****************************************
	 * @功能 计算当前日期某年的第几周
	 ****************************************/
	public static int getWeekNumOfYear() {
		Calendar calendar = Calendar.getInstance();
		int iWeekNum = calendar.get(Calendar.WEEK_OF_YEAR);
		return iWeekNum;
	}

	/**
	 * 计算指定日期为当年第几周
	 */
	public static int caculateWeekOfYear(int year, int month, int day) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, year);
		c.set(Calendar.MONTH, month - 1);
		c.set(Calendar.DATE, day);
		return c.get(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * @see 按指定格式取得当前时间()
	 */
	public static String GetTimeFormat(String strFormat) {
		SimpleDateFormat sdf = new SimpleDateFormat(strFormat);
		String sDate = sdf.format(new Date());
		return sDate;
	}

	/**
	 * @see 取得指定时间的给定格式()
	 */
	public static String SetDateFormat(String myDate, String strFormat) {
		SimpleDateFormat sdf = new SimpleDateFormat(strFormat);
		String sDate = "";
		try {
			sDate = sdf.format(sdf.parse(myDate));
		} catch (ParseException e) {
		}
		return sDate;
	}

	/*****************************************
	 * @功能 计算指定日期某年的第几周
	 ****************************************/
	public static int getWeekNumOfYearDay(String strDate) throws ParseException {
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date curDate = format.parse(strDate);
		calendar.setTime(curDate);
		int iWeekNum = calendar.get(Calendar.WEEK_OF_YEAR);
		return iWeekNum;
	}

	/*****************************************
	 * @功能 计算某年某周的开始日期
	 ****************************************/
	public static String getYearWeekFirstDay(int yearNum, int weekNum) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, yearNum);
		cal.set(Calendar.WEEK_OF_YEAR, weekNum);
		cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		// 分别取得当前日期的年、月、日
		String tempYear = Integer.toString(yearNum);
		String tempMonth = Integer.toString(cal.get(Calendar.MONTH) + 1);
		String tempDay = Integer.toString(cal.get(Calendar.DATE));
		String tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
		return SetDateFormat(tempDate, "yyyy-MM-dd");
	}

	/*****************************************
	 * @功能 计算某年某周的结束日期
	 ****************************************/
	public static String getYearWeekEndDay(int yearNum, int weekNum) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, yearNum);
		cal.set(Calendar.WEEK_OF_YEAR, weekNum + 1);
		cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		// 分别取得当前日期的年、月、日
		String tempYear = Integer.toString(yearNum);
		String tempMonth = Integer.toString(cal.get(Calendar.MONTH) + 1);
		String tempDay = Integer.toString(cal.get(Calendar.DATE));
		String tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
		return SetDateFormat(tempDate, "yyyy-MM-dd");
	}

	/*****************************************
	 * @功能 计算某年某月的开始日期
	 ****************************************/
	public static String getYearMonthFirstDay(int yearNum, int monthNum) {
		// 分别取得当前日期的年、月、日
		String tempYear = Integer.toString(yearNum);
		String tempMonth = Integer.toString(monthNum);
		String tempDay = "1";
		String tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
		return SetDateFormat(tempDate, "yyyy-MM-dd");
	}

	/*****************************************
	 * @功能 计算某年某月的结束日期
	 ****************************************/
	public static String getYearMonthEndDay(int yearNum, int monthNum) {
		// 分别取得当前日期的年、月、日
		String tempYear = Integer.toString(yearNum);
		String tempMonth = Integer.toString(monthNum);
		String tempDay = "31";
		if (tempMonth.equals("1") || tempMonth.equals("3") || tempMonth.equals("5") || tempMonth.equals("7") || tempMonth.equals("8") || tempMonth.equals("10") || tempMonth.equals("12")) {
			tempDay = "31";
		}
		if (tempMonth.equals("4") || tempMonth.equals("6") || tempMonth.equals("9") || tempMonth.equals("11")) {
			tempDay = "30";
		}
		if (tempMonth.equals("2")) {
			if (isLeapYear(yearNum)) {
				tempDay = "29";
			} else {
				tempDay = "28";
			}
		}
		String tempDate = tempYear + "-" + tempMonth + "-" + tempDay;
		return SetDateFormat(tempDate, "yyyy-MM-dd");
	}
	/*****************************************
	 * @throws ParseException 
	 * @功能 比较两个日期的大小  zdh
	 ****************************************/
	public static int compareDates(String date1,String date2) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.CHINA);
		Date d1 = sdf.parse(date1);
		Date d2 = sdf.parse(date2);
		
		if(d1.getTime()>d2.getTime()){
			return 1;
		}else if(d1.getTime()==d2.getTime()){
			return 0;
		}else{
			return -1;
		}
		
	}
	/*****************************************
	 * @throws ParseException 
	 * @功能 获取前N天  zdh
	 ****************************************/
	public static String getBeforeNDay(String date,int n){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(strToDate(date));
		calendar.add(Calendar.DATE, n);
		String dateStr = formatDate(calendar.getTime());
		return dateStr;
	}
	
	/*****************************************
	 * @throws ParseException 
	 * @功能 获取N小时后的时间  zdh
	 ****************************************/
	public static Date getDateByAddHours(Date date,int n){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int d = n/24;
		int h = n%24;
		if(d>0){
			calendar.add(Calendar.DATE,d);
		}
		if(h>0){
			calendar.add(Calendar.HOUR,h);
		}
		return calendar.getTime();
	}
	
//	public static void main(String[] args) {
////		System.out.println(DateUtil.getBeforeDays(1));
////		System.out.println(DateUtil.formatTimestamp(new Date()));
////		//System.out.println(DateUtil.getCurrentDateBeforeMins(1));
////		System.out.println(DateUtil.formatTimestamp(DateUtil.getDateByAddHours(new Date(),23)));
////		System.out.println(1/24);
////		System.out.println(2/24);
////		System.out.println(26/24);
////		System.out.println("=========================");
////		System.out.println(1%24);
////		System.out.println(2%24);
////		System.out.println(26%24);
//	}
}
