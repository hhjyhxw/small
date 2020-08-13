package com.icloud.thirdinterfaces.imcc.util;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class IMSessionUtil {
    /**
     * 第三方节点解析属性
     */
    private static final String _PROPERTY = "property";
    private static final String _KEY = "key";
    private static final String _VALUE = "value";
    private static final String _URL_CODING = "utf-8";

    /**
     * 第三方节点调用返回结果定义
     */
    public static final String _SESSION_PROPERTIES = "sessionProperties";
    public static final String _REQUEST_PROPERTIES = "requestProperties";
    public static final String _STR_REASON = "strReason";
    public static final String _REASON = "reason";
    public static final String _CODE = "code";


    /**
     * 通过第三方节点参数获取指定属性值
     * @param xml
     * @param propertyKey
     * @return
     */
    @SuppressWarnings("unchecked")
    public static String getXmlPropertites(String xml, String propertyKey){
        String keyValue = null;
        try{
            Document doc = DocumentHelper.parseText(xml);
            Element root = doc.getRootElement();
            Iterator<Element> itr = root.elementIterator(_PROPERTY);
            Element propertyElement;
            String key;
            while(itr.hasNext()){
                propertyElement = (Element)itr.next();
                key = propertyElement.attributeValue(_KEY);
                if(propertyKey.equals(key)){
                    keyValue = URLDecoder.decode(propertyElement.attributeValue(_VALUE), _URL_CODING);
                    break;
                }
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(keyValue);
        return keyValue;
    }


    /**
     * 组装第三方节点调用标准返回串
     * @param valueMap
     * @param transaction	是否增加属性的转换标识
     * @return
     */
    @SuppressWarnings("unchecked")
    public static String createXml(Map<String, Object> valueMap, boolean transaction){
        StringBuffer sb = new StringBuffer();
        sb.append("<?xml version=\"1.0\" encoding=\"GBK\"?>");
        sb.append("<response>");
        sb.append("<result>");
        sb.append("<code>").append(valueMap.get(_CODE)).append("</code>");
//        sb.append("<strReason>").append(valueMap.get(_STR_REASON)).append("</strReason>");
        sb.append("<reason>").append(valueMap.get(_REASON)).append("</reason>");

        sb.append("</result>");
        sb.append("<properties>");
        sb.append("<session>");
        if(valueMap.get(_SESSION_PROPERTIES) != null){
            sb.append(createSessionProperXml((Map<String, String>)valueMap.get(_SESSION_PROPERTIES),transaction));
        }
        sb.append("</session>");
        sb.append("</properties>");
        sb.append("</response>");
        return sb.toString();
    }

    /**
     * 组装第三方节点session属性
     * @param sessionMap
     * @param transaction	是否增加属性的转换标识
     * @return
     */
    private static String createSessionProperXml(Map<String, String> sessionMap, boolean transaction){
        StringBuffer sb = new StringBuffer();
        Iterator<String> itr = sessionMap.keySet().iterator();
        String key;
        while(itr.hasNext()){
            key = itr.next();
            sb.append("<property ");
            if(transaction){
                sb.append("transaction=\"true\" ");
            }
            sb.append("key=\"").append(key).append("\" value=\"").append(sessionMap.get(key)).append("\"/>");
        }
        return sb.toString();
    }


    /**
     * 组装第三方节点调用标准返回串
     * @param valueMap
     * @param transaction	是否增加属性的转换标识
     * @return
     */
    @SuppressWarnings("unchecked")
    public static String createXml(Map<String, Object> valueMap, boolean transaction,String sessionxml){
        StringBuffer sb = new StringBuffer();
        sb.append("<response>");
        sb.append("<result>");
        sb.append("<code>").append(valueMap.get(_CODE)).append("</code>");
        sb.append("<strReason>").append(valueMap.get(_STR_REASON)).append("</strReason>");
        sb.append("</result>");
        sb.append("<properties>");
        sb.append(sessionxml);
        sb.append("</properties>");
        sb.append("</response>");
        return sb.toString();
    }



    /**
     * 组装模拟请求参数
     * @param valueMap
     * @param transaction	是否增加属性的转换标识
     * @return
     */
    @SuppressWarnings("unchecked")
    public static String createRequestXml(Map<String, Object> valueMap, boolean transaction){
        StringBuffer sb = new StringBuffer();
        sb.append("<?xml version=\"1.0\" encoding=\"GBK\"?>");
        sb.append("<request>");
        sb.append("<properties>");
            sb.append("<system>");
            if(valueMap.get(_REQUEST_PROPERTIES) != null){
                sb.append(createSessionProperXml((Map<String, String>)valueMap.get(_REQUEST_PROPERTIES),transaction));
            }
            sb.append("</system>");

            sb.append("<session>");
            if(valueMap.get(_SESSION_PROPERTIES) != null){
                sb.append(createSessionProperXml((Map<String, String>)valueMap.get(_SESSION_PROPERTIES),transaction));
            }
            sb.append("</session>");
        sb.append("</properties>");
        sb.append("</request>");
        return sb.toString();
    }

    public static void main(String[] args) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        Map<String, Object> requestMap = new HashMap<String, Object>();
        Map<String,String> sessionMap = new HashMap<String, String>(1);
        requestMap.put("imUserNumber","ofRrGw7QmxMLBiklzEP1jGM_kMts");
        requestMap.put("hhs","626234");
        String userLoginCheckUrl = "<$LINK_URL|点击进入登陆认证|http://www.baidu.com $>";
        sessionMap.put("inputchooseresult",userLoginCheckUrl);

        resultMap.put(_REQUEST_PROPERTIES,requestMap);
        resultMap.put(_SESSION_PROPERTIES,sessionMap);


        String requestStr = createRequestXml(resultMap,true);
        System.out.println(requestStr);
        sendPost(requestStr);

//        String insl = "%3C%24LINK_URL%7C%B5%E3%BB%F7%BD%F8%C8%EB%B5%C7%C2%BD%C8%CF%D6%A4%7Chttp%3A%2F%2Fld.haiyunzy.com%2Fusercheck%2Ffrontpage%2Fretail%2FuserLogin%2Ftologinpage+%24%3E";
//        try {
//            System.out.println(URLDecoder.decode(insl,"GBK"));
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
    }


    public static String sendPost(String postXml)
    {
        String msg = null ;
        try
        {
            String httpUrl = "http://ld.haiyunzy.com/usercheck//thirdInterfacePath/user/checkUser";
            PostMethod postMethod = new PostMethod(httpUrl);

            postMethod.setRequestEntity(new StringRequestEntity(postXml, "text/html", "utf-8"));
            postMethod.setRequestHeader("Content-type", "text/xml; charset=GBK");

            HttpClient httpClient = new HttpClient();
            httpClient.executeMethod(postMethod);
            int resultint = httpClient.executeMethod(postMethod);
//   log.info("resultint====="+resultint);
//   System.out.println("resultint======="+resultint);

//msg 即为请求返回的消息，这里我们假设请求返回的消息是xml格式，

//那么，msg就是一个xml格式的字符串咯。对于xml格式字符串的解析方法看上一篇日志。
            msg = new String(postMethod.getResponseBody());
            System.out.print("result===="+msg);
//   log.info("msg=========="+msg);
//   System.out.println("mig===="+msg);
            postMethod.releaseConnection();

        }catch(Exception ex)
        {
            System.out.print("Post发生异常了"+ex.getMessage());
            System.out.print("exception message:"+ex.getMessage());
            ex.printStackTrace();
            msg = "exception ex" ;
        }
        return msg;
    }
}
