package com.icloud.modules.small.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ShopInfo {
    /*  */
    private Long id;
    /* 零售户名称 */
    private String supplierName;
    /* 店铺地址 */
    private String address;
    /* 许可证号 */
    private String licence;
    /* 电话号码 */
    private String phone;

    /* 许可证图片 */
    private String licenceImg;
    /* 店铺头像 */
    private String headImg;
    /* 经度 */
    private BigDecimal lnt;
    /* 纬度 */
    private BigDecimal lat;
    /* 店铺收款码*/
    private String payImg;

}
