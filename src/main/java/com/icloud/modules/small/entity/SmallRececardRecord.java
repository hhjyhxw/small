package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-10-22 15:30:14
 */
@Data
@TableName("t_small_rececard_record")
public class SmallRececardRecord implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 卡券名称 */
       @TableField("card_name")
       private String cardName;
   	   	   /* 订单唯一编号（填入卡券code） */
       @TableField("order_no")
       private String orderNo;
   	   	   /* card_uid */
       @TableField("card_uid")
       private String cardUid;
   	   	   /* 所属卡券id  */
       @TableField("card_id")
       private Long cardId;
   	   	   /* account_type */
       @TableField("account_type")
       private String accountType;
   	   	   /* 领取用户openid（需建立索引） */
       @TableField("recever_openid")
       private String receverOpenid;
   	   	   /* 领取用户unionid */
       @TableField("recever_unionid")
       private String receverUnionid;
   	   	   /* 领取手机号 */
       @TableField("phone")
       private String phone;
   	   	   /* 领取时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 领取渠道id （需建立索引） */
       @TableField("channel_id")
       private Long channelId;
   	   	   /* 核销员id */
       @TableField("verifyuser_id")
       private Long verifyuserId;
   	   	   /* 核销时间 */
       @TableField("verify_time")
       private Date verifyTime;
   	   	   /* 核销店铺id */
       @TableField("supplier_id")
       private Long supplierId;
   	   	   /* 0 不删除 1删除 */
       @TableField("comsue_delete_flag")
       private Integer comsueDeleteFlag;
   	   	   /* 0 不删除 1删除 */
       @TableField("verify_delete_flag")
       private Integer verifyDeleteFlag;
   	   	   /* 有效开始时间 */
       @TableField("start_time")
       private Date startTime;
   	   	   /* 有效结束时间 */
       @TableField("end_time")
       private Date endTime;
   	   	   /* 订单类型（对应卡券类型）0礼品券，1代金券、折扣券、3满减类型 */
       @TableField("card_type")
       private Integer cardType;
   	   	   /* 卡券面额 */
       @TableField("value")
       private Integer value;
   	   	   /* 卡券折扣 */
       @TableField("discount")
       private Integer discount;
   	   	   /* 最低订单金额 */
       @TableField("low_amount")
       private Integer lowAmount;
   	   	   /* 满多少 */
       @TableField("total_amount")
       private Integer totalAmount;
   	   	   /* 减多少 */
       @TableField("deduct_amount")
       private Integer deductAmount;
   	   	   /* 版本号 */
       @TableField("version")
       private Long version;
   	   	   /* 核销状态 */
       @TableField("verify_status")
       private Integer verifyStatus;
   	   	   /* 核心类型 0手机号核销、1输入code核销，2扫码code核销 3、第三方接口核销 */
       @TableField("verify_type")
       private Integer verifyType;
   	
}
