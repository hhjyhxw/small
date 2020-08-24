package com.icloud.modules.small.vo;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderVo {
    /* id */
    private Long id;
    /* 订单号 */
    private String orderNo;
    /* 用户id */
    private Long userId;
    /* 0生成、处理中、已完成 */
    private Integer orderStatus;
    /* 0未支付、1支付中、2已支付 */
    private Integer payStatus;
    /* 0生成、1、退款中、2已退款 */
    private Integer refundStatus;
    /* 0未发货、1发货中、2已发货 */
    private Integer shipStatus;
    /* 商品(sku)现价总额 */
    private Integer skuTotalPrice;
    /* 实付订单金额 */
    private Integer actualPrice;
    /* 省 */
    private String province;
    /* 市 */
    private String city;
    /* 县 */
    private String county;
    /* 详细地址 */
    private String address;
    /* 下单留言*/
    private String memo;
    /*收货人 */
    private String consignee;
    /* 联系电话*/
    private String phone;
    /*下达时间*/
    private Date createTime;
    /*  */

    private List<OrderDetailVo> detaillist;
}
