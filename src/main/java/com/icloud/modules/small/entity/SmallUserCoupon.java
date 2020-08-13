package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户拥有的折扣券
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Data
@TableName("t_small_user_coupon")
public class SmallUserCoupon implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 用户id */
       @TableField("user_id")
       private Long userId;
   	   	   /* 代金券id */
       @TableField("coupon_id")
       private Long couponId;
   	   	   /* 使用订单Id */
       @TableField("order_id")
       private Long orderId;
   	   	   /* 使用时间，若使用时间为空，表示未使用 */
       @TableField("use_time")
       private Date useTime;
   	   	   /* 优惠券有效开始时间（领取优惠券时写入） */
       @TableField("start_time")
       private Date startTime;
   	   	   /* 优惠券有效结束时间（领取优惠券过期时间根据策略计算） */
       @TableField("end_time")
       private Date endTime;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	
}
