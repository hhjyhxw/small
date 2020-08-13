package com.icloud.config.global.wx.handler;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.modules.mpwx.entity.MpwxReply;
import com.icloud.modules.mpwx.entity.MpwxReplyKeyword;
import com.icloud.modules.mpwx.service.MpwxReplyKeywordService;
import com.icloud.modules.mpwx.service.MpwxReplyService;
import com.icloud.wiki.utils.NumberUtil;
import com.icloud.wiki.utils.ReplyUtil;
import com.icloud.wiki.vo.TextUrlMessageVo;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import me.chanjar.weixin.common.session.WxSessionManager;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.message.WxMpXmlMessage;
import me.chanjar.weixin.mp.bean.message.WxMpXmlOutMessage;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author Binary Wang(https://github.com/binarywang)
 */
@Slf4j
@Component
public class TextMsgHandler extends AbstractHandler {

    @Autowired
    private MpwxReplyService mpwxReplyService;
    @Autowired
    private MpwxReplyKeywordService mpwxReplyKeywordService;
    @Autowired
    private ReplyUtil replyUtil;
    @Autowired
    private RedisService redisService;
    @Override
    public WxMpXmlOutMessage handle(WxMpXmlMessage wxMessage,
                                    Map<String, Object> context, WxMpService weixinService,
                                    WxSessionManager sessionManager) {


        String content = wxMessage.getContent();
        if(NumberUtil.isInteger(content)){
            int index = Integer.valueOf(content);
            //从缓存中读取
            List<TextUrlMessageVo> oldvolist = (List<TextUrlMessageVo>) redisService.get(wxMessage.getFromUser());
            log.info("oldvolist==="+ JSON.toJSONString(oldvolist));
            if(oldvolist!=null && oldvolist.size()>0 && index<=oldvolist.size()){
                TextUrlMessageVo vo = oldvolist.get(index-1);
                content = vo.getRecontent0();
            }
        }
        //TODO 可以选择将消息保存到本地
        //当用户输入关键词如，“客服”等，并且有客服在线时，把消息转发给在线客服
        try {
            if (StringUtils.startsWithAny(content,  "客服")
                && weixinService.getKefuService().kfOnlineList()
                .getKfOnlineList().size() > 0) {
                return WxMpXmlOutMessage.TRANSFER_CUSTOMER_SERVICE()
                    .fromUser(wxMessage.getToUser())
                    .toUser(wxMessage.getFromUser()).build();
            }
        } catch (WxErrorException e) {
            e.printStackTrace();
        }
        List<MpwxReplyKeyword> keywordList = mpwxReplyKeywordService.list(new QueryWrapper<MpwxReplyKeyword>().eq("keywords",content));
        if(keywordList!=null && keywordList.size()>0){
            MpwxReply mpwxReply = (MpwxReply) mpwxReplyService.getById(keywordList.get(0).getReplyId());
            return replyUtil.mpwxReplyToWxMpXmlOutMessage(mpwxReply,wxMessage, weixinService,sessionManager);
        }else {
            //回复默认消息
            //测试使用
//             return new TextBuilder().build("<a href=\"weixin://bizmsgmenu?msgmenucontent=密码类&msgmenuid=123\">密码类</a>", wxMessage, weixinService);

            return replyUtil.getDefautMessage(wxMessage, weixinService,sessionManager);
        }

    }

}
