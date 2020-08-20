package com.icloud.modules.small.vo;

import lombok.Data;

@Data
public class SellCategoryVo {
    private Long id;
    private Long parentId;
    private String name;
    private String parentName;
}
