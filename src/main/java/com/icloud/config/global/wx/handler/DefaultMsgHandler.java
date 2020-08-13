package com.icloud.config.global.wx.handler;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.config.global.wx.builder.TextBuilder;
import com.icloud.modules.mpwx.entity.MpwxReply;
import com.icloud.modules.mpwx.service.MpwxReplyService;
import com.icloud.wiki.utils.ReplyUtil;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.message.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * 回复默认消息
 */
@Component
public class DefaultMsgHandler extends AbstractHandler {

    @Autowired
    private MpwxReplyService mpwxReplyService;
    @Autowired
    private ReplyUtil replyUtil;
    @Override
    public WxMpXmlOutMessage handle(WxMpXmlMessage wxMessage,
                                    Map<String, Object> context, WxMpService weixinService,
                                    WxSessionManager sessionManager) {


        List<MpwxReply> mpwxReplylist = mpwxReplyService.list(new QueryWrapper<MpwxReply>().eq("keywords","0"));
        if(mpwxReplylist==null || mpwxReplylist.size()==0){
            return new TextBuilder().build("欢迎进入公众号!", wxMessage, weixinService);
        }
        MpwxReply pwxReply = mpwxReplylist.get(0);
        return replyUtil.mpwxReplyToWxMpXmlOutMessage(pwxReply,wxMessage, weixinService,sessionManager);
    }

}
