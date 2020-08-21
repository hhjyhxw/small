package com.icloud.modules.small.vo;

import lombok.Data;

import java.util.List;

@Data
public class CategoryAndGoodListVo {

    private Long id;//分类id
    private String titile;//分类名称
    private List<SpuVo> list;//商品列表
}
