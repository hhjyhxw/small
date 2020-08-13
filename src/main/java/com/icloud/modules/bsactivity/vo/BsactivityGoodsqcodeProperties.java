package com.icloud.modules.bsactivity.vo;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 专属商品二维码 属性对象
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "bsactivity")
public class BsactivityGoodsqcodeProperties {

    private String text;//二维码内容
    private int width;//二维码宽度
    private int height;//二维码高度
    private String savepath;//存储路径
    private String asekey;//二维码串加密key
}
