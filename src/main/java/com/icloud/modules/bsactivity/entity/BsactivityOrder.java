package com.icloud.modules.bsactivity.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-17 15:11:04
 */
@Data
@TableName("t_bsactivity_order")
public class BsactivityOrder implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 订单编号 */
       @TableField("order_no")
       private String orderNo;
   	   	   /* 总金额 */
       @TableField("total_amount")
       private Long totalAmount;
   	   	   /* 商品名称 */
       @TableField("good_name")
       private String goodName;
    /* 商品图片 */
    @TableField("goodimg")
    private String goodimg;
   	   	   /* 用户id */
       @TableField("userid")
       private Long userid;
   	   	   /* openid */
       @TableField("openid")
       private String openid;
   	   	   /* 订单类型（0、扫码消费、1、） */
       @TableField("order_type")
       private Integer orderType;
   	   	   /* 订单状态 0：未支付，1：已支付  ，2已完成 */
       @TableField("order_status")
       private Integer orderStatus;
   	   	   /* 发货状态 1：已发货 0：未发货 */
       @TableField("shipping_status")
       private Integer shippingStatus;
   	   	   /* 删除状态 1：已删除 0：未删除 */
       @TableField("delete_status")
       private Integer deleteStatus;
   	   	   /* 订单创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 订单修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 商品id */
       @TableField("goodid")
       private Long goodid;
   	   	   /* 商品二维id */
       @TableField("qcodeid")
       private Long qcodeid;
   	   	   /* 收货用户 */
       @TableField("name")
       private String name;
   	   	   /* 收货用户手机 */
       @TableField("phone")
       private String phone;
   	   	   /* 省 */
       @TableField("province_name")
       private String provinceName;
   	   	   /* 市 */
       @TableField("city_name")
       private String cityName;
   	   	   /* 县 */
       @TableField("county_name")
       private String countyName;
   	   	   /* 乡镇 */
       @TableField("towns_name")
       private String townsName;
   	   	   /* 详细地址 */
       @TableField("detail_address")
       private String detailAddress;
   	   	   /* 邮编 */
       @TableField("zip_code")
       private String zipCode;
        /* 邮第三方交易流水号*/
        @TableField("transationid")
        private String transationid;//如：龙币交易流水号
        /* 商户id,就近根据用户经纬度读*/
        @TableField("supplier_id")
        private Long supplierId;//

        @TableField(exist = false)
        private BsactivityShop bsactivityShop;

   	
}
