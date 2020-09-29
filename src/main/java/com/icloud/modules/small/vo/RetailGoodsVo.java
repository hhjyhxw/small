package com.icloud.modules.small.vo;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * 零售户信息同步vo
 */
@Data
public class RetailGoodsVo {

    @NotNull(message = "店铺编号不能为空")
    private Long id;
    /* 许可证号 */
    @NotBlank(message = "许可证号不为空")
    private String licence;
    /* 签名 */
    private String sign;

}
