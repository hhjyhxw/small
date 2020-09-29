package com.icloud.modules.small.vo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SpuVo {
    private Long id;//商品id
    private String title;//商品名称
    private String img;//图片
    private BigDecimal price;//价格（现价）
    private BigDecimal originalPrice;//原价
    private Integer showFlag;//是否展示 1 展示 0不展示
}
