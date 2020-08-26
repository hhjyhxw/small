package com.icloud.modules.small.service;


import com.icloud.common.ThreadLocalVars;
import com.icloud.modules.small.entity.SmallOrder;
import com.icloud.modules.small.entity.SmallRetail;
import com.icloud.modules.wx.entity.WxUser;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.error.WxErrorException;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.bean.kefu.WxMpKefuMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class SmallPlaceOrderNotifyService implements Runnable{

    @Autowired
    private WxMpService wxMpService;

    @Override
    public void run() {

        try {
            //发送客服消息通知消费者
            wxMpService.getKefuService().sendKefuMessage((WxMpKefuMessage) ThreadLocalVars.get("comsueUserMessage"));
        } catch (WxErrorException e) {
            e.printStackTrace();
        }
        try {
            //发送客服消息通知店家
            wxMpService.getKefuService().sendKefuMessage((WxMpKefuMessage) ThreadLocalVars.get("retailUserMessage"));
        } catch (WxErrorException e) {
            e.printStackTrace();
        }
    }

    public void setNotifyInof(SmallOrder order, WxUser user, SmallRetail retail,String productInfo){
        //发送消费者通知消息，何零售店消息
        WxMpKefuMessage comsueUserMessage = WxMpKefuMessage
                .TEXT()
                .toUser(user.getOpenid())
                .content("您的订单号："+order.getOrderNo()+"\r\n"
                        +"商品信息："+productInfo+"\r\n"
                        +"店铺名称："+retail.getSupplierName()+"\r\n"
                        +"店铺联系方式："+retail.getPhone()+"\r\n"
                        +"店铺收款码：<a href=\""+retail.getPayImg()+"\">点击二维码付款</a>")
                .build();
        ThreadLocalVars.put("comsueUserMessage",comsueUserMessage);

        WxMpKefuMessage retailUserMessage = WxMpKefuMessage
                .TEXT()
                .toUser(retail.getKeeperOpenid())
                .content("订单号："+order.getOrderNo()+"\r\n"
                        +"商品信息："+productInfo+"\r\n"
                        +"用户名称："+order.getConsignee()+"\r\n"
                        +"用户联系方式："+order.getPhone()+"\r\n"
                        )
                .build();
        ThreadLocalVars.put("retailUserMessage",retailUserMessage);
    }
}
