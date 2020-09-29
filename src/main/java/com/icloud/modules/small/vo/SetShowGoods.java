package com.icloud.modules.small.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SetShowGoods {

    @NotNull(message = "商品ids不能为空")
    private Long[] spuIds;
    @NotNull(message = "showFlag不能为空")
    private Integer[] showFlag;
    @NotNull(message = "店铺id不能为空")
    private Long supplierId;
    private String sign;
    @NotNull(message = "店主openid不能为空")
    private String keeperOpenid;

}
