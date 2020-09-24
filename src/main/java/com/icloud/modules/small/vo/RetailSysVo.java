package com.icloud.modules.small.vo;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * 零售户信息同步vo
 */
@Data
public class RetailSysVo {

    @NotNull(message = "店铺编号不能为空")
    private Long id;
    @NotBlank(message = "店铺名称不为空")
    private String supplierName;
    /* 店铺地址 */
    private String address;
    /* 许可证号 */
    @NotBlank(message = "许可证号不为空")
    private String licence;
    /* 联系人 */
    @NotBlank(message = "联系人不为空")
    private String contactMan;
    /* 电话号码 */
    @NotBlank(message = "电话号码不为空")
    private String phone;
    /* 店主openid */
    private String keeperOpenid;
    /* 余额 */
    private Integer balance;
    /* 冻结余额 */
    private Integer frozenBalance;
    /* 银行卡 */
    private String bankCart;
    /* 开户行 */
    private String bankName;
    /* 银行关联手机 */
    private String bankPhone;
    /* 开户人 */
    private String bankKeeper;
    /* 许可证图片 */
    private String licenceImg;
    /* 店铺头像 */
    private String headImg;
    /* boss */
    /* password */
    private String password;
    /* max_cash */
    /* 支付用户openid */
    private String payOpenid;
    /* 经度 */
    private BigDecimal lnt;
    /* 纬度 */
    private BigDecimal lat;
    /* 店铺头像 */
    private String payImg;
    /* 店铺状态 0停用 1启用 */
    private String status;
    /* 签名 */
    private String sign;

}
