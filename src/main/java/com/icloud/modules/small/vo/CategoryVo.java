package com.icloud.modules.small.vo;

import lombok.Data;

@Data
public class CategoryVo {

    private Long id;
    private Long parentId;
    private String name;
    private String parentName;
    private Integer sortNum;
    private Integer status;
    private String title;


}
