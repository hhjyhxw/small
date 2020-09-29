package com.icloud.modules.scanactivity.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.math.BigDecimal;
import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-09-29 14:44:58
 */
@Data
@TableName("t_scanactivity_verification_user")
public class ScanactivityVerificationUser implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 姓名 */
       @TableField("name")
       private String name;
   	   	   /* 手机 */
       @TableField("phone")
       private String phone;
   	   	   /* openid */
       @TableField("openid")
       private String openid;
   	   	   /* uninid 尽量已这个字段为主用户信息，可用管理小程序等 */
       @TableField("uninid")
       private String uninid;
   	   	   /* 导入时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 绑定时间 */
       @TableField("bind_time")
       private Date bindTime;
   	   	   /* 创建人 */
       @TableField("create_man")
       private String createMan;
   	   	   /* 修改时间 */
       @TableField("modfiy_time")
       private Date modfiyTime;
   	   	   /* 修改人 */
       @TableField("modify_nan")
       private String modifyNan;
   	   	   /* 启用状态 */
       @TableField("status")
       private String status;
   	   	   /* 1、市场部人员 2、零售户 3、小组长  */
       @TableField("role_type")
       private String roleType;
   	   	   /* 省 */
       @TableField("province_name")
       private String provinceName;
   	   	   /* 省行政代码 */
       @TableField("province_code")
       private String provinceCode;
   	   	   /* 市 */
       @TableField("city_name")
       private String cityName;
   	   	   /* 市行政代码 */
       @TableField("city_code")
       private String cityCode;
   	   	   /* 区县 */
       @TableField("county_name")
       private String countyName;
   	   	   /* 区县行政代码 */
       @TableField("county_code")
       private String countyCode;
   	   	   /* 详细地址 */
       @TableField("address")
       private String address;
   	   	   /* 店铺名称 */
       @TableField("shop_name")
       private String shopName;
   	   	   /* 专卖许可证 */
       @TableField("shop_license")
       private String shopLicense;
   	   	   /* 活动配置id(每个核销员关联对应活动) */
       @TableField("config_id")
       private Long configId;
   	   	   /*  */
       @TableField("lnt")
       private BigDecimal lnt;
   	   	   /*  */
       @TableField("lat")
       private BigDecimal lat;
   	   	   /* 是否已发送消息 */
       @TableField("send_status")
       private String sendStatus;
        /* 发送失败原因 */
        @TableField("msg")
        private String msg;

   	
}
