package com.icloud.modules.bsactivity.entity;

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
 * @date 2020-04-26 16:19:45
 */
@Data
@TableName("t_bsactivity_shop")
public class BsactivityShop implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 店铺名称 */
       @TableField("shop_name")
       private String shopName;
   	   	   /* 店铺图标 */
       @TableField("shop_img")
       private String shopImg;
   	   	   /* 店铺专卖证 */
       @TableField("shop_license")
       private String shopLicense;
   	   	   /* 店铺联系人 */
       @TableField("contact_man")
       private String contactMan;
   	   	   /* 联系人号码 */
       @TableField("contact_phone")
       private String contactPhone;
   	   	   /* 省 */
       @TableField("province_name")
       private String provinceName;
   	   	   /* 市 */
       @TableField("city_name")
       private String cityName;
   	   	   /* 县 */
       @TableField("county_name")
       private String countyName;
   	   	   /* 详细地址 */
       @TableField("address")
       private String address;
   	   	   /* 经度 */
       @TableField("lnt")
       private BigDecimal lnt;
   	   	   /* 纬度 */
       @TableField("lat")
       private BigDecimal lat;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 创建人 */
       @TableField("create_man")
       private String createMan;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 修改人 */
       @TableField("modify_man")
       private String modifyMan;
   	   	   /* openid */
       @TableField("openid")
       private String openid;
   	   	   /* status 0停用 1启用 */
       @TableField("status")
       private Integer status;

        /* 用户与店铺直接的距离*/
        @TableField(exist = false)
        private Integer distance;
   	
}
