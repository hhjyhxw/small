package com.icloud.wiki.vo;

import lombok.Data;

/**
 * 回复文本类消息格式
 *<$INPUTCHOOSE|扫码异常|扫码异常$>
 * <$INPUTCHOOSE|品牌在线|品牌在线$>
 * <$INPUTCHOOSE|在线客服|在线客服$>
 */
@Data
public class TextMessageVo {
    private int index;
    private String dollerContent;//<$INPUTCHOOSE|密码类|密码类$>
    private String recontent0;//dollerContent 内容0 <$INPUTCHOOSE|密码类|密码类$>
    private String recontent1;//dollerContent 内容1
    private String retWxContent;//[1]密码类
}
