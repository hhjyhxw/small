package com.icloud.modules.mpwx.vo.sucai;

import lombok.Data;

import java.util.List;

/**
 * 用于页面展示的素材对象
 */
@Data
public class WebSucaivo {
    private Long id;//保存数据库中的id
    private String title;//标题 主要用于后台查询辨认
    private List<WebSucaiItemvo> list;

}
