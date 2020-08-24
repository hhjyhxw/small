package com.icloud.modules.small.vo;

import lombok.Data;

import java.util.Date;

@Data
public class OrderDetailVo {

    private Long id;
    private Long skuId;
    private Long orderId;
    /* 订单编号 */
    private String orderNo;
    /* 商品sku名称 */
    private String skuTitle;
    /* 数量 */
    private Integer num;
    /* 原价 */
    private Integer originalPrice;
    /* 现价 */
    private Integer price;
    /* spu图片 */
    private String spuImg;
    /* 创建时间 */
    private Date createTime;

}
