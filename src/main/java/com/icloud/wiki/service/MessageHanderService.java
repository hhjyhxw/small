package com.icloud.wiki.service;

import com.icloud.config.global.wx.handler.DefaultMsgHandler;
import com.icloud.config.global.wx.handler.EventHandler;
import com.icloud.config.global.wx.handler.TextMsgHandler;
import com.icloud.config.global.wx.handler.VoiceMsgHandler;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.api.WxConsts;
import me.chanjar.weixin.mp.api.WxMpMessageRouter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MessageHanderService {
    @Autowired
    private TextMsgHandler msgHandler;
    @Autowired
    private VoiceMsgHandler voiceMsgHandler;
    @Autowired
    private EventHandler eventHandler;
    @Autowired
    private DefaultMsgHandler defaultMsgHandler;
    /**
     *
     * @param async 一步执行标识
     * @param router
     * @return
     */
        public WxMpMessageRouter prepare(boolean async, WxMpMessageRouter router) {
        router
                //文本消息
                .rule().async(async) .msgType(WxConsts.XmlMsgType.TEXT) .handler(msgHandler).end()
                //连接消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.LINK) .handler(defaultMsgHandler).end()
                //事件消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.EVENT).handler(eventHandler).end()
                //图片消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.IMAGE) .handler(defaultMsgHandler).end()
                //语言消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.VOICE) .handler(voiceMsgHandler).end()
                //视频媒体消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.VIDEO) .handler(defaultMsgHandler).end()
                //音乐
                .rule().async(async).msgType(WxConsts.XmlMsgType.MUSIC) .handler(defaultMsgHandler).end()
                //地理位置消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.LOCATION) .handler(defaultMsgHandler).end()
                //图文消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.NEWS) .handler(defaultMsgHandler).end()
                //客服消息
                .rule().async(async).msgType(WxConsts.XmlMsgType.TRANSFER_CUSTOMER_SERVICE) .handler(defaultMsgHandler).end();
                /*.rule().async(async).matcher(new WxMpMessageMatcher() {
                            @Override
                            public boolean match(WxMpXmlMessage message) {
                                return "strangeformat".equals(message.getFormat());
                            }
                        });*/
        return router;
    }

}
