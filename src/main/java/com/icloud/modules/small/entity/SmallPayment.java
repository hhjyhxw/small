package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 支付流水
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Data
@TableName("t_small_payment")
public class SmallPayment implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 支付单号 */
       @TableField("pay_sn")
       private String paySn;
   	   	   /* 支付状态 0 未支付，1支付中 2已支付 3已退款 4支付失败 */
       @TableField("status")
       private Integer status;
   	   	   /* 支付方式 0微信 */
       @TableField("pay_way")
       private Integer payWay;
   	   	   /* 支付金额 以分为单位 */
       @TableField("pay_amount")
       private BigDecimal payAmount;
   	   	   /* 支付手续费 */
       @TableField("pay_fee")
       private BigDecimal payFee;
   	   	   /* 用户id */
       @TableField("user_id")
       private Long userId;
   	   	   /* openid */
       @TableField("openid")
       private String openid;
   	   	   /* 交易单号 */
       @TableField("transaction_id")
       private String transactionId;
   	   	   /* 支付时间 */
       @TableField("pay_time")
       private Date payTime;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	
}
