package com.icloud.modules.small.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartTotalVo {

    /* 商品总数量 */
    private Integer totalNum;
    /* 商品总额 */
    private BigDecimal totalAmout;
}
