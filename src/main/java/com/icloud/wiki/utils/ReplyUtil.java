package com.icloud.wiki.utils;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.config.global.wx.builder.TextBuilder;
import com.icloud.modules.mpwx.entity.MpwxReply;
import com.icloud.modules.mpwx.entity.MpwxSucai;
import com.icloud.modules.mpwx.service.MpwxReplyService;
import com.icloud.modules.mpwx.service.MpwxSucaiForwikiService;
import com.icloud.modules.mpwx.vo.sucai.WebSucaiItemvo;
import com.icloud.modules.mpwx.vo.sucai.WebSucaivo;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.message.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutNewsMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReplyUtil {

    @Autowired
    private MpwxReplyService mpwxReplyService;
//    private MpwxSucaiService mpwxSucaiService;
    @Autowired
    private MpwxSucaiForwikiService mpwxSucaiForwikiService;
    @Autowired
    private TextMessageAdapter textMessageAdapter;
    /**
     * 根据mpwxReply 获取 微信返回消息
     * @return
     */
    public WxMpXmlOutMessage mpwxReplyToWxMpXmlOutMessage(MpwxReply pwxReply, WxMpXmlMessage wxMessage,
                                                          WxMpService weixinService,
                                                          WxSessionManager sessionManager){
        //文本
        if("1".equals(pwxReply.getReplyType())){
            String content = textMessageAdapter.adaptText(pwxReply.getContent(),wxMessage.getFromUser());
            return new TextBuilder().build(content.trim(), wxMessage, weixinService);
            //图文
        }else if("2".equals(pwxReply.getReplyType())){
            List<WxMpXmlOutNewsMessage.Item> articleList = new ArrayList<WxMpXmlOutNewsMessage.Item>();
            MpwxSucai mpwxSucai = (MpwxSucai)mpwxSucaiForwikiService.getById(Long.parseLong(pwxReply.getContent()));
            List<WebSucaiItemvo> itemlist = JSON.parseObject(mpwxSucai.getDetailInfo(), WebSucaivo.class).getList();
            for (WebSucaiItemvo vo:itemlist){
                WxMpXmlOutNewsMessage.Item item = new WxMpXmlOutNewsMessage.Item();
                item.setDescription(vo.getMainContent());
                item.setPicUrl(vo.getWxPicUrls());
                item.setTitle(vo.getSubTitle());
                item.setUrl(vo.getWxUrls());
                articleList.add(item);
            }
            return WxMpXmlOutMessage.NEWS()
                    .articles(articleList)
                    .fromUser(wxMessage.getToUser())
                    .toUser(wxMessage.getFromUser()).build();
            //图片
        }else if("6".equals(pwxReply.getReplyType())){
            MpwxSucai mpwxSucai = (MpwxSucai)mpwxSucaiForwikiService.getById(Long.parseLong(pwxReply.getContent()));
            return WxMpXmlOutMessage.IMAGE()
                    .mediaId(mpwxSucai.getWxMediaids())
                    .fromUser(wxMessage.getToUser())
                    .toUser(wxMessage.getFromUser()).build();
        }else{
            //其他
            return new TextBuilder().build("欢迎进入公众号!", wxMessage, weixinService);
        }
    }

    /**
     * 获取默认回复消息
     * @param wxMessage
     * @param weixinService
     * @param sessionManager
     * @return
     */
    public WxMpXmlOutMessage getDefautMessage(WxMpXmlMessage wxMessage,WxMpService weixinService, WxSessionManager sessionManager){

        List<MpwxReply> mpwxReplylist = mpwxReplyService.list(new QueryWrapper<MpwxReply>().eq("keywords","0"));
        if(mpwxReplylist==null || mpwxReplylist.size()==0){
            return new TextBuilder().build("欢迎进入公众号!", wxMessage, weixinService);
        }
        MpwxReply pwxReply = mpwxReplylist.get(0);
        return mpwxReplyToWxMpXmlOutMessage(pwxReply,wxMessage, weixinService,sessionManager);
    }
}
