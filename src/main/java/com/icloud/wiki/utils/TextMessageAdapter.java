package com.icloud.wiki.utils;

import com.alibaba.fastjson.JSON;
import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.wiki.vo.TextMessageVo;
import com.icloud.wiki.vo.TextUrlMessageVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 文本消息过滤、转换、解析适配器
 */
@Slf4j
@Component
public class TextMessageAdapter {

    @Autowired
    private RedisService redisService;
    /**
     * 文本适配器
     * 类型：
     * 1、<$INPUTCHOOSE|密码类|密码类$>
     * 2、<a href="weixin://bizmsgmenu?msgmenucontent=密码类&msgmenuid=123"><$INPUTCHOOSE|密码类|密码类$></a>
     *      0 查询会话队列数据
     *      1 获取前缀文本（直接用于展示的文本）
     *      2 正则获取超链接
     *      3 正则获取超链接中的 <$ $>
     *      4 封装会话队列
     *      5 返回数据
     * @param content
     * @return
     */
    public String adaptText(String content,String openid) {

        //包含超连接
        if(content.indexOf("<a")>-1){//含有超链接
            //获取含有超链接集合
            List<String> alist = RegexUtils.getLink(content);
            //获取$集合
            List<String> dollerlist = RegexUtils.getDollerList(content);
            //获取超链接、$、内容对象集合
            if(alist!=null && alist.size()>0 && dollerlist!=null && alist.size()==dollerlist.size()){

                List<TextUrlMessageVo> volist = getTextMessageVo(alist,dollerlist);
                String nomalContent = content.substring(0,content.indexOf("<a"));
                String lastnomalContent = content.substring(content.lastIndexOf("a>"),content.length());
                StringBuffer buf = new StringBuffer();
                buf.append(nomalContent);
                for (TextUrlMessageVo vo:volist){
                    buf.append(vo.getRetWxContent()).append("\r\n");
                }
                if(!"a>".equals(lastnomalContent)){
                    buf.append(lastnomalContent);
                }
                //保存缓存集合
                redisService.set(openid,volist);
                return buf.toString();
            }
         //只包含 <$INPUTCHOOSE
        }else if(content.indexOf("<$INPUTCHOOSE")>-1){
            //获取$集合
            List<String> dollerlist = RegexUtils.getDollerList(content);
            List<TextUrlMessageVo> volist = getTextCommMessageVo(dollerlist);
            if(volist!=null && volist.size()>0){
                String nomalContent = content.substring(0,content.indexOf("<$"));
                String lastnomalContent = content.substring(content.lastIndexOf("$>"),content.length());
                StringBuffer buf = new StringBuffer();
                buf.append(nomalContent);
                for (TextMessageVo vo:volist){
                    buf.append(vo.getRetWxContent()).append("\r\n");
                }
                if(!"$>".equals(lastnomalContent)){
                    buf.append(lastnomalContent);
                }
                //保存缓存集合
                redisService.set(openid,volist);
                return buf.toString();
            }
            //正常文本
        }else{
            return content;
        }
        return content;
    }

    /**
     * 返回连接类文类消息
     * @param linkList
     * @param dollerList
     * @return
     */
    public static List<TextUrlMessageVo> getTextMessageVo(List<String> linkList, List<String> dollerList){
        List<TextUrlMessageVo> msglist = new ArrayList<TextUrlMessageVo>(linkList.size());
        TextUrlMessageVo vo = null;
        int i = 0;
        for (String link:linkList){
            vo = new TextUrlMessageVo();
            vo.setIndex(i+1);
            vo.setWxlink(link);
            Map<String,String> map = RegexUtils.getURLRequestParamsMap(link.substring(0,link.indexOf("\">")));
            vo.setMsgmenucontent(map.get("msgmenucontent"));
            vo.setMsgmenuid(map.get("msgmenuid"));
            String dollerStr = dollerList.get(i);
            String[] doStrArry = dollerStr.split("\\|");
            log.info("doStrArry====="+JSON.toJSONString(doStrArry));
            vo.setDollerContent(dollerStr);
            vo.setRecontent0(doStrArry[1]);
            vo.setRecontent1(doStrArry[2].substring(0,doStrArry[2].length()-1));
//            String[] arrylink = vo.getWxlink().split(dollerStr);
//            System.out.println(JSON.toJSONString(arrylink));
            int startindex = vo.getWxlink().indexOf("<$INPUTCHOOSE");
            int endindex = vo.getWxlink().indexOf("$>");
            String subWxlink = vo.getWxlink().substring(startindex,endindex+2);
            System.out.println("subWxlink==="+JSON.toJSONString(subWxlink));
            String wxContent = vo.getWxlink().replace(subWxlink,"["+vo.getIndex()+"]"+vo.getRecontent0());
            vo.setRetWxContent(wxContent);
            msglist.add(vo);
            i++;
        }
        return msglist;
    }

    /**
     * 返回一般类消息
     * @param dollerList
     * @return
     */
    public static List<TextUrlMessageVo> getTextCommMessageVo(List<String> dollerList){
        List<TextUrlMessageVo> msglist = new ArrayList<TextUrlMessageVo>(dollerList.size());
        TextUrlMessageVo vo = null;
        int i = 0;
        for (String link:dollerList){
            vo = new TextUrlMessageVo();
            vo.setIndex(i+1);
            String dollerStr = dollerList.get(i);
            String[] doStrArry = dollerStr.split("\\|");
//            log.info("doStrArry====="+JSON.toJSONString(doStrArry));
            vo.setDollerContent(dollerStr);
            vo.setRecontent0(doStrArry[1]);
            vo.setRecontent1(doStrArry[2].substring(0,doStrArry[2].length()-1));
            String wxContent = "["+vo.getIndex()+"]"+vo.getRecontent0();
            vo.setRetWxContent(wxContent);
            msglist.add(vo);
            i++;
        }
        return msglist;
    }


    public static void main(String[] args) {
        String s = "\n" +
                "您好，欢迎来到云软云客服，您可以选择您的问题：\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=密码类&msgmenuid=123\"><$INPUTCHOOSE|密码类|密码类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=电子结算类&msgmenuid=123\"><$INPUTCHOOSE|电子结算类|电子结算类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=制度宣传类&msgmenuid=123\"><$INPUTCHOOSE|制度宣传类|制度宣传类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=商品信息类&msgmenuid=123\"><$INPUTCHOOSE|商品信息类|商品信息类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=卷烟质量类&msgmenuid=123\"><$INPUTCHOOSE|卷烟质量类|卷烟质量类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=货源类&msgmenuid=123\"><$INPUTCHOOSE|货源类|货源类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=明码标价类&msgmenuid=123\"><$INPUTCHOOSE|明码标价类|明码标价类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=订货类&msgmenuid=123\"><$INPUTCHOOSE|订货类|订货类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=档位测评类&msgmenuid=123\"><$INPUTCHOOSE|档位测评类|档位测评类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=物流送货类&msgmenuid=123\"><$INPUTCHOOSE|物流送货类|物流送货类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=专卖许可证类&msgmenuid=123\"><$INPUTCHOOSE|专卖许可证类|专卖许可证类$></a>\n" +
                "<a href=\"weixin://bizmsgmenu?msgmenucontent=20支相关&msgmenuid=123\"><$INPUTCHOOSE|20支相关|20支相关$></a>";

        String nomalContent = s.substring(0,s.indexOf("<a"));
        String lastnomalContent = s.substring(s.lastIndexOf("a>"),s.length());
        System.out.println("nomalContent=="+nomalContent);
        System.out.println("lastnomalContent=="+lastnomalContent);
      List<String> list = RegexUtils.getLink(s);
//      int i =1;
//      for (String temp:list){
//          System.out.println("link"+i+":==="+temp);
//          i++;
//      }
//        String ss = "<$INPUTCHOOSE为什么90天要修改密码？|为什么90天要修改密码？$>" +
//                "<$INPUTCHOOSE为什么90天要修改密码？|为什么90天要修改密码？$>" +
//                "<$INPUTCHOOSE为什么90天要修改密码？|为什么90天要修改密码？$>" +
//                "<$INPUTCHOOSE为什么90天要修改密码？|为什么90天要修改密码？$>" +
//                "<$INPUTCHOOSE为什么90天要修改密码？|为什么90天要修改密码？$>";
//      int j =1;
        List<String> list$ = RegexUtils.getDollerList(s);

        System.out.println(JSON.toJSONString(getTextMessageVo(list,list$)));
//        for (String temp:list$){
//            System.out.println("doller"+j+":==="+temp);
//            j++;
//        }

        String params = "<a href=\"weixin://bizmsgmenu?msgmenucontent=货源类&msgmenuid=123\"><$INPUTCHOOSE|货源类|货源类$></a>";

//        System.out.println(JSON.toJSONString(RegexUtils.getURLRequestParamsMap( params.substring(0,params.indexOf("\">")))));

    }
}