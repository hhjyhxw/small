package com.icloud.basecommon.util;


import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.icloud.common.ConfigUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BaiduMapUtil {

    public static final Logger log = LoggerFactory.getLogger(BaiduMapUtil.class);

    /**
     * 发送http请求
     *
     * @param requestUrl 请求地址
     * @return String
     */
    public static String httpRequest(String requestUrl) {
        StringBuffer buffer = new StringBuffer();
        try {
            URL url = new URL(requestUrl);
            HttpURLConnection httpUrlConn = (HttpURLConnection) url.openConnection();
            httpUrlConn.setDoInput(true);
            httpUrlConn.setRequestMethod("GET");
            httpUrlConn.connect();

            // 将返回的输入流转换成字符串
            InputStream inputStream = httpUrlConn.getInputStream();
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            String str = null;
            while ((str = bufferedReader.readLine()) != null) {
                buffer.append(str);
            }
            bufferedReader.close();
            inputStreamReader.close();
            // 释放资源
            inputStream.close();
            inputStream = null;
            httpUrlConn.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return buffer.toString();
    }


    /**
     * 将微信定位的坐标转换成百度坐标（GCJ-02 -> Baidu）
     *
     * @param lng 经度
     * @param lat 纬度
     * @return
     */
    public static JSONObject convertCoord(String lng, String lat) {
        // 百度坐标转换接口
        //String convertUrl = "http://api.map.baidu.com/ag/coord/convert?from=2&to=4&x={x}&y={y}";
        String convertUrl = "http://api.map.baidu.com/geoconv/v1/?coords={x},{y}&from=3&to=5&ak=A23543b3be51778406429cba6b7d74c4";

        convertUrl = convertUrl.replace("{x}", lng);
        log.info("convertUrl:"+convertUrl);
        convertUrl = convertUrl.replace("{y}", lat);
        log.info("convertUrl:"+convertUrl);
        try {
            String jsonCoord = httpRequest(convertUrl);
            JSONObject jsonObject = JSON.parseObject(jsonCoord);
            return jsonObject;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将gps定位的坐标转换成百度坐标（GCJ-02 -> Baidu）
     *
     * @param lng 经度
     * @param lat 纬度
     * @return
     */
    public static  JSONObject gpsConvertCoord(String lng, String lat) {
        // 百度坐标转换接口
        //String convertUrl = "http://api.map.baidu.com/ag/coord/convert?from=2&to=4&x={x}&y={y}";
        String convertUrl = "http://api.map.baidu.com/geoconv/v1/?coords={x},{y}&from=1&to=5&ak=A23543b3be51778406429cba6b7d74c4";

        convertUrl = convertUrl.replace("{x}", lng);
        log.info("convertUrl:"+convertUrl);
        convertUrl = convertUrl.replace("{y}", lat);
        log.info("convertUrl:"+convertUrl);
        try {
            String jsonCoord = httpRequest(convertUrl);
            JSONObject jsonObject = JSON.parseObject(jsonCoord);
            JSONArray result    =jsonObject.getJSONArray("result");
            JSONObject info= result.getJSONObject(0);
            log.info("7777777777777777777777777777777777777777");
            log.info("baidux:"+info.getString("x"));
            log.info("baiduy:"+info.getString("y"));
            return jsonObject;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     *
     * @Title: coordToAddress
     * @Description: 通过经纬度获取中文地址
     * @param @param lat
     * @param @param lng
     * @param @return 设定文件
     * @return String 返回类型
     * @author yr_xiezhy
     * @date 2015-7-30 下午5:02:18
     * @throws
     */
    public static String coordToAddress(String lat, String lng) {
        //获取百度经纬度转中文地址api接口地址
        String addrconvertUrl = ConfigUtil.get("addrconvertUrl");
        addrconvertUrl = addrconvertUrl.replace("{x}", lat);
        log.info("convertUrl:" + addrconvertUrl);
        addrconvertUrl = addrconvertUrl.replace("{y}", lng);
        log.info("convertUrl:" + addrconvertUrl);
        String jsonCoord = httpRequest(addrconvertUrl);
        JSONObject jsonObject = JSON.parseObject(jsonCoord);
        log.info("jsonObject|" + jsonObject);
        JSONObject result = jsonObject.getJSONObject("result");
        // 得到完整的地址
        String formatted_address = result.getString("formatted_address");
        JSONObject location = result.getJSONObject("location");
        log.info("location|" + location);
        // 转换后经度
        String bdlng = location.getString("lng");
        // 转换后纬度
        String bdlat = location.getString("lat");

        log.info("bdlng|" + bdlng);
        log.info("bdlng|" + bdlat);

        JSONObject addressComponent = result.getJSONObject("addressComponent");
        log.info("addressComponent|" + addressComponent);

        // 得到省
        // String province = addressComponent.getString("province");
        // 得到市
        // String city = addressComponent.getString("city");
        // 得到区
        String district = addressComponent.getString("district");
        // 得到街道
        String street = addressComponent.getString("street");
        // 得到门牌号
        String street_number = addressComponent.getString("street_number");

        // log.info("city|"+city);
        log.info("district|" + district);
        log.info("street|" + street);
        log.info("street_number|" + street_number);
        log.info("formatted_address|" + formatted_address);

        // 拼接地址
        return district + street + street_number;

    }

    /**
     * 根据经纬度来转换为地址
     *
     * @param lng 经度
     * @param lat 纬度
     * @return
     */
    public static  String addressConvertCoord(String lat,String lng) {
        // 百度坐标转换接口
        //String convertUrl = "http://api.map.baidu.com/ag/coord/convert?from=2&to=4&x={x}&y={y}";
        //http://api.map.baidu.com/geocoder/v2/?ak=E4805d16520de693a3fe707cdc962045&callback=renderReverse&location=39.983424,116.322987&output=json&pois=1
        String addrconvertUrl = "http://api.map.baidu.com/geocoder/v2/?ak=A23543b3be51778406429cba6b7d74c4&location={x},{y}&output=json";

        addrconvertUrl = addrconvertUrl.replace("{x}", lat);
        log.info("convertUrl:"+addrconvertUrl);
        addrconvertUrl = addrconvertUrl.replace("{y}", lng);
        log.info("convertUrl:"+addrconvertUrl);
        try {
            String jsonCoord = httpRequest(addrconvertUrl);
            JSONObject jsonObject = JSON.parseObject(jsonCoord);
            log.info("jsonObject|"+jsonObject);
            JSONObject  result    =jsonObject.getJSONObject("result");
            //得到完整的地址
            String 	formatted_address = result.getString("formatted_address");
            JSONObject location =  	result.getJSONObject("location");
            log.info("location|"+location);
            //转换后经度
            String bdlng = location.getString("lng");
            //转换后纬度
            String bdlat = location.getString("lat");

            log.info("bdlng|"+bdlng);
            log.info("bdlng|"+bdlat);

            JSONObject addressComponent =  	result.getJSONObject("addressComponent");
            log.info("addressComponent|"+addressComponent);

            //得到省
            //String province = addressComponent.getString("province");
            //得到市
            //String city = addressComponent.getString("city");
            //得到区
            String district = addressComponent.getString("district");
            //得到街道
            String street = addressComponent.getString("street");
            //得到门牌号
            String street_number = addressComponent.getString("street_number");

            //log.info("city|"+city);
            log.info("district|"+district);
            log.info("street|"+street);
            log.info("street_number|"+street_number);
            log.info("formatted_address|"+formatted_address);
            //拼接地址
            String weixinLbslabel =district+street+street_number;
            //把经度，纬度，地址存到对象中


        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



    /**
     * @param addr
     * 查询的地址
     * @return
     */
    public static String[] getCoordinate(String addr) {
        String lng = null;//经度
        String lat = null;//纬度
        String address = null;
        try {
            address = java.net.URLEncoder.encode(addr, "UTF-8");

            //System.out.println(address);
            String addrconvertUrl = "http://api.map.baidu.com/geocoder/v2/?output=json&ak=A23543b3be51778406429cba6b7d74c4&address=" + address;
            URL myURL = null;

            String jsonCoord = httpRequest(addrconvertUrl);
            JSONObject jsonObject = JSON.parseObject(jsonCoord);
            log.info("jsonCoord==="+jsonCoord);
            lng = jsonObject.getJSONObject("result").getJSONObject("location").getString("lng");
            lat = jsonObject.getJSONObject("result").getJSONObject("location").getString("lat");
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        return new String[]{lng,lat};
    }


    /**
     * @param lng
     * @param lat
     * @return
     */
    public static String[] getAddr(String lng,String lat) {
        String addrconvertUrl = "http://api.map.baidu.com/geocoder/v2/?output=json&ak=A23543b3be51778406429cba6b7d74c4&location="+lat+","+lng;
        try {
            String jsonCoord = httpRequest(addrconvertUrl);
            JSONObject jsonObject = JSON.parseObject(jsonCoord);
            log.info("jsonObject==="+jsonObject);
            lng = jsonObject.getJSONObject("result").getJSONObject("location").getString("lng");
            lat = jsonObject.getJSONObject("result").getJSONObject("location").getString("lat");
        } catch (Exception e1) {
            e1.printStackTrace();
        }
        return new String[]{lng,lat};
    }

    public static void main(String[] args) {
//        String[] o = getCoordinate("深圳市南山区");
//        System.out.println(o);
        String[] o1 = getAddr("114.35047403624727","22.71623346474869");
        System.out.println(o1[0]);
        System.out.println(o1[1]);

        System.out.println();
    }
}

