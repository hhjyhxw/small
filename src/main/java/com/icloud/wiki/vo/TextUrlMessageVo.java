package com.icloud.wiki.vo;

import lombok.Data;

/**
 * < a href="weixin://bizmsgmenu?msgmenucontent=品牌在线&msgmenuid=123"><$INPUTCHOOSE|品牌在线|品牌在线$> </ a>
 * < a href="weixin://bizmsgmenu?msgmenucontent=在线客服&msgmenuid=123"><$INPUTCHOOSE|在线客服|在线客服$> </ a>
 * < a href="weixin://bizmsgmenu?msgmenucontent=在线客服&msgmenuid=123"><$INPUTCHOOSE|在线客服|在线客服$> </ a>
 */
@Data
public class TextUrlMessageVo extends TextMessageVo{
//    private int index;
    private String wxlink;//原文超链接 <a href=\"weixin://bizmsgmenu?msgmenucontent=密码类&msgmenuid=123\"><$INPUTCHOOSE|密码类|密码类$></a>

    private String msgmenucontent;//wxlink超链接属性字段
    private String msgmenuid;//wxlink超链接属性字段
//    private String dollerContent;//<$INPUTCHOOSE|密码类|密码类$>
//    private String recontent0;//dollerContent 内容0 <$INPUTCHOOSE|密码类|密码类$>
//    private String recontent1;//dollerContent 内容1
//    private String retWxContent;//<a href=\"weixin://bizmsgmenu?msgmenucontent=密码类&msgmenuid=123\">[1]密码类$></a>
}
