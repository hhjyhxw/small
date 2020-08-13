package com.icloud.wiki.service;

import com.icloud.config.global.wx.handler.DefaultMsgHandler;
import com.icloud.config.global.wx.handler.EventHandler;
import com.icloud.config.global.wx.handler.TextMsgHandler;
import com.icloud.config.global.wx.handler.VoiceMsgHandler;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.message.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 自定义路由（暂时停用）
 */
@Slf4j
@Service
public class MessageHanderRouter {

    @Autowired
    private WxMpService wxMpService;
    @Autowired
    private TextMsgHandler msgHandler;
    @Autowired
    private VoiceMsgHandler voiceMsgHandler;
    @Autowired
    private EventHandler eventHandler;
    @Autowired
    private DefaultMsgHandler defaultMsgHandler;


    public WxMpXmlOutMessage handleMessage(WxMpXmlMessage message){
        //文本消息
        if(message.getMsgType().equals(WxConsts.XmlMsgType.TEXT)){
            return msgHandler.handle(message,null,wxMpService,null);
        //事件
        }else if(message.getMsgType().equals(WxConsts.XmlMsgType.EVENT)){
            return defaultMsgHandler.handle(message,null,wxMpService,null);
            //图片
        }else if(message.getMsgType().equals(WxConsts.XmlMsgType.IMAGE)){
            return defaultMsgHandler.handle(message,null,wxMpService,null);
            //音乐
        } else if(message.getMsgType().equals(WxConsts.XmlMsgType.MUSIC)){
            return defaultMsgHandler.handle(message,null,wxMpService,null);
            //........
        } else if(message.getMsgType().equals(WxConsts.XmlMsgType.VOICE)){
            return voiceMsgHandler.handle(message,null,wxMpService,null);
            //........
        }else {
            //其他类型统一回复
            return defaultMsgHandler.handle(message,null,wxMpService,null);
        }
    }


}
