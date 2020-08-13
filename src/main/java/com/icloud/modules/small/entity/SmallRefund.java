package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 退款
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Data
@TableName("t_small_refund")
public class SmallRefund implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 订单id */
       @TableField("order_id")
       private Long orderId;
   	   	   /* 退款单号 */
       @TableField("refund_sn")
       private String refundSn;
   	   	   /* 退款金额 */
       @TableField("refund_amount")
       private Integer refundAmount;
   	   	   /* 退款时间 */
       @TableField("refund_time")
       private Date refundTime;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 更新时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 退款状态 (0 创建  1退款中 2退款成功) */
       @TableField("status")
       private Integer status;
   	
}
