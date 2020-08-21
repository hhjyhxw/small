package com.icloud.modules.small.vo;

import lombok.Data;

@Data
public class CartVo {

    private Long id;//购物车id
    /* 用户id */
    private Long userId;
    /* 数量 */
    private Integer num;
    /* 商品id*/
    private Long skuId;////因为目前采用单商品模式，这里替换成 spuId
    /* 原价(按分存) */
    private Integer price;
    /* 现价 */
    private Integer originalPrice;
    /* 商品名称 */
    private String title;
    /* 商品图片 */
    private String img;

    private Long supplierId;



}
