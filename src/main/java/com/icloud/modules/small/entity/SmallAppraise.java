package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 商品评价
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Data
@TableName("t_small_appraise")
public class SmallAppraise implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* spu_id */
       @TableField("spu_id")
       private Long spuId;
   	   	   /* sku_id */
       @TableField("sku_id")
       private Long skuId;
   	   	   /* 订单id */
       @TableField("order_id")
       private Long orderId;
   	   	   /* 用户id */
       @TableField("user_id")
       private Long userId;
   	   	   /* 评价内容 */
       @TableField("content")
       private String content;
   	   	   /* 积分 */
       @TableField("score")
       private Integer score;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	
}
