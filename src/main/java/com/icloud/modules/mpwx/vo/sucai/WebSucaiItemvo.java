package com.icloud.modules.mpwx.vo.sucai;

import lombok.Data;

/**
 *素材用于页面编辑展示
 */
@Data
public class WebSucaiItemvo {

    private String wxUrls;//阅读原文连接（和跳转第三方连接）不能为空
    private String subTitle;//子项标题
    private String shrtContent;//摘要
    private String mainContent;//内容
    private String localUrls; //本地图片地址
    private String wxPicUrls; //上传微信的图片
    private String thumbMediaId;//素材id

}
