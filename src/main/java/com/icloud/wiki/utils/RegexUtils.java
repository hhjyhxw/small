package com.icloud.wiki.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexUtils {


    /**
     *
     * @param s
     * @return 获得超链接集合
     */
    public static List<String> getLink(final String s)
    {
        String regex;
        final List<String> list = new ArrayList<String>();
        regex = "<a[^>]*href=(\"([^\"]*)\"|\'([^\']*)\'|([^\\s>]*))[^>]*>(.*?)</a>";
        final Pattern pa = Pattern.compile(regex, Pattern.DOTALL);
        final Matcher ma = pa.matcher(s);
        while (ma.find())
        {
            list.add(ma.group());
        }
        return list;
    }

    /**
     *
     * @param s
     * @return 获得<$ $>集合
     */
    public static List<String> getDollerList(final String s)
    {
        String regex;
        final List<String> list = new ArrayList<String>();
        regex = "<\\$INPUTCHOOSE(.+?)\\$>";
        final Pattern pa = Pattern.compile(regex, Pattern.DOTALL);
        final Matcher ma = pa.matcher(s);
        while (ma.find())
        {
            list.add(ma.group());
        }
        return list;
    }




    /**
     * 解析出url请求的路径，包括页面(不含参数)
     * @param strURL url地址
     * @return url路径
     */
    public static String UrlPage(String strURL)
    {
        String strPage=null;
        String[] arrSplit=null;
        strURL=strURL.trim().toLowerCase();
        arrSplit=strURL.split("[?]");
        if(strURL.length()>0)
        {
            if(arrSplit.length>1)
            {
                if(arrSplit[0]!=null)
                {
                    strPage=arrSplit[0];
                }
            }
        }
        return strPage;
    }
    /**
     * 去掉url中的路径，留下请求参数部分
     * @param strURL url地址
     * @return url请求参数部分
     */
    private static String TruncateUrlPage(String strURL)
    {
        String strAllParam=null;
        String[] arrSplit=null;
        strURL=strURL.trim().toLowerCase();

        arrSplit=strURL.split("[?]");
        if(strURL.length()>1)
        {
            if(arrSplit.length>1)
            {
                if(arrSplit[1]!=null)
                {
                    strAllParam=arrSplit[1];
                }
            }
        }
        return strAllParam;
    }
    /**
     * 解析出url参数中的键值对
     * 如 "index.jsp?Action=del&id=123"，解析出Action:del,id:123存入map中
     * @param URL  url地址
     * @return  url请求参数部分
     */
    public static Map<String, String> getURLRequestParamsMap(String URL)
    {
        Map<String, String> mapRequest = new HashMap<String, String>();
        String[] arrSplit=null;

        String strUrlParam=TruncateUrlPage(URL);
        if(strUrlParam==null)
        {
            return mapRequest;
        }
        //每个键值为一组
        //键=值 数组
        arrSplit=strUrlParam.split("[&]");
        for(String strSplit:arrSplit)
        {
            //键、值
            String[] arrSplitEqual=null;
            arrSplitEqual= strSplit.split("[=]");
            //解析出键值
            if(arrSplitEqual.length>1)
            {
                //正确解析
                mapRequest.put(arrSplitEqual[0], arrSplitEqual[1]);
            }
            else
            {
                if(arrSplitEqual[0]!="")
                {
                    //只有参数没有值，不加入
                    mapRequest.put(arrSplitEqual[0], "");
                }
            }
        }
        return mapRequest;
    }

}
