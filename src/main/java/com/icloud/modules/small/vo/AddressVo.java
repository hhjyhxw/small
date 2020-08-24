package com.icloud.modules.small.vo;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class AddressVo {

    /*  */
    private Long id;
    /* 省 */
    @NotBlank
    private String province;
    /* 市 */
    @NotBlank
    private String city;
    /* 县 */
    @NotBlank
    private String county;
    /* 详细地址 */
    @NotBlank
    private String address;
    /* 0非默认地址 1默认地址 */
    @NotNull
    private Integer defaultAddress;
    /* 用户id */
    private Long userId;
    /* 联系电话 */
    @NotBlank
    private String phone;
    /* 收件人 */
    @NotBlank
    private String name;
}
