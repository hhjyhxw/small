package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 折扣券管理
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:01
 */
@Data
@TableName("t_small_coupon")
public class SmallCoupon implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 代金券名称 */
       @TableField("title")
       private String title;
   	   	   /* 使用类型，如满减 */
       @TableField("coup_type")
       private Integer coupType;
   	   	   /* 描述 */
       @TableField("description")
       private String description;
   	   	   /* 订单金额 */
       @TableField("total")
       private Integer total;
   	   	   /* 会员类型0:非会员1:会员2:全部 */
       @TableField("surplus")
       private Integer surplus;
   	   	   /* 限？？ */
       @TableField("limits")
       private Integer limits;
   	   	   /* 减少金额 */
       @TableField("discount")
       private Integer discount;
   	   	   /* 最低消费金额 */
       @TableField("min")
       private Integer min;
   	   	   /* 是否可用 0不用 1可用 */
       @TableField("status")
       private Integer status;
   	   	   /* 分类id(分类可用) */
       @TableField("category_id")
       private Long categoryId;
   	   	   /* 过期天数 */
       @TableField("days")
       private Integer days;
   	   	   /* 领取开始时间 */
       @TableField("start_time")
       private Date startTime;
   	   	   /* 领取/使用结束时间 */
       @TableField("end_time")
       private Date endTime;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 商户id */
       @TableField("supplier_id")
       private Long supplierId;
   	
}
