package com.icloud.modules.small.vo;

import lombok.Data;

@Data
public class PresOrder {
    private Long[] skuId;//商品id
    private Long[] num;//商品数量
    private String types;// cart(购物车跳转)    buynow（商品详情页立即购买）
    private String supplierId;//商户id
    private String memo;//订单留言
    private String payType;//支付方式
}
