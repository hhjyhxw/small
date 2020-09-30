package com.icloud.modules.small.vo;

import com.icloud.modules.small.entity.SmallCategory;
import com.icloud.modules.small.entity.SmallRetail;
import com.icloud.modules.small.entity.SmallSellCategory;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class SmallSpuVo {

    /*  */
    private Long id;
    /* 原价(按分存) */
    private BigDecimal price;
    /* 现价 */
    private BigDecimal originalPrice;
    /* vip价 */
    private BigDecimal vipPrice;
    /* 商品名称 */
    private String title;
    /* 销量 */
    private Integer sales;
    /* 商品图片 */
    private String img;
    /* 商品详情 */
    private String detail;
    /* 商品描述 */
    private String description;
    /* 分类id */
    private Long categoryId;
    /* 运费模板id */
    private Long freightTemplateId;
    /* 计量单位 */
    private String unit;
    /* 0下架 1上架 */
    private Integer status;
    /* 商户id */
    private String supplierId;
    /* 热门 */
    private Integer ihot;
    /* 新品 */
    private Integer inew;
    /* 折扣 */
    private Integer idiscount;
    /* 优选 */
    private Integer iselect;
    /* 创建时间 */
    private Date createTime;
    /* 修改时间 */
    private Date modifyTime;
    /* 零售户id*/
    private Long retailerId;
    /* 库存 */
    private Integer stock;
    /* 冻结库存 */
    private Integer freezeStock;
    /* 店铺个性分类id */
    private Long sellcategoryId;
    /* 是否展示在烟包支付系统（1展示 0不展示） */
    private Integer showFlag;

    /*关联分类*/
    private SmallCategory smallCategory;
    /*消费商户*/
    private SmallRetail smallRetail;
    /*关联商户个性化分类*/
    private SmallSellCategory smallSellCategory;
    /*增加的库存*/
    private Integer addStock;
    /*剩余库存*/
    private Integer remainStock;
}
