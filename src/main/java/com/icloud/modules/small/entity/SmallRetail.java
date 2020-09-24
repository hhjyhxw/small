package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 零售户
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Data
@TableName("t_small_retail")
public class SmallRetail implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 零售户名称 */
       @TableField("supplier_name")
       private String supplierName;
   	   	   /* 店铺地址 */
       @TableField("address")
       private String address;
   	   	   /* 许可证号 */
       @TableField("licence")
       private String licence;
       /* 联系人 */
       @TableField("contact_man")
       private String contactMan;
   	   	   /* 电话号码 */
       @TableField("phone")
       private String phone;
   	   	   /* 店主openid */
       @TableField("keeper_openid")
       private String keeperOpenid;
   	   	   /* 余额 */
       @TableField("balance")
       private Integer balance;
   	   	   /* 冻结余额 */
       @TableField("frozen_balance")
       private Integer frozenBalance;
   	   	   /* 银行卡 */
       @TableField("bank_cart")
       private String bankCart;
   	   	   /* 开户行 */
       @TableField("bank_name")
       private String bankName;
   	   	   /* 银行关联手机 */
       @TableField("bank_phone")
       private String bankPhone;
   	   	   /* 开户人 */
       @TableField("bank_keeper")
       private String bankKeeper;
   	   	   /* 许可证图片 */
       @TableField("licence_img")
       private String licenceImg;
   	   	   /* 店铺头像 */
       @TableField("head_img")
       private String headImg;
   	   	   /* boss */
       @TableField("boss")
       private String boss;
   	   	   /* password */
       @TableField("password")
       private String password;
   	   	   /* max_cash */
       @TableField("max_cash")
       private Integer maxCash;
   	   	   /* 支付用户openid */
       @TableField("pay_openid")
       private String payOpenid;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 经度 */
       @TableField("lnt")
       private BigDecimal lnt;
   	   	   /* 纬度 */
       @TableField("lat")
       private BigDecimal lat;
        /* 店铺头像 */
        @TableField("pay_img")
        private String payImg;
        /* 店铺状态 0停用 1启用 */
        @TableField("status")
        private String status;


   	
}
