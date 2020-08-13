package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 订单明细
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Data
@TableName("t_small_order_detail")
public class SmallOrderDetail implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 商品(skuid) */
       @TableField("sku_id")
       private Long skuId;
   	   	   /* 商品（spuid） */
       @TableField("spu_id")
       private Long spuId;
   	   	   /* 订单id */
       @TableField("order_id")
       private Long orderId;
   	   	   /* 订单编号 */
       @TableField("order_no")
       private String orderNo;
   	   	   /* 商品spu名称 */
       @TableField("spu_title")
       private String spuTitle;
   	   	   /* 商品sku名称 */
       @TableField("sku_title")
       private String skuTitle;
   	   	   /* 条码 */
       @TableField("bar_code")
       private String barCode;
   	   	   /* 计量单位 */
       @TableField("unit")
       private String unit;
   	   	   /* 数量 */
       @TableField("num")
       private Integer num;
   	   	   /* 原价 */
       @TableField("original_price")
       private Integer originalPrice;
   	   	   /* 现价 */
       @TableField("price")
       private Integer price;
   	   	   /* spu图片 */
       @TableField("spu_img")
       private String spuImg;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	
}
