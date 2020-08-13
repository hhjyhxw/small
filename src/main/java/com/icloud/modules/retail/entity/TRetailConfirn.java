package com.icloud.modules.retail.entity;

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
 * @date 2020-07-08 11:08:09
 */
@Data
@TableName("t_retail_confirn")
public  class TRetailConfirn implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /*  */
       @TableField("user_name")
       private String userName;
   	   	   /*  */
       @TableField("passwd")
       private String passwd;
   	   	   /*  */
       @TableField("liences")
       private String liences;
   	   	   /*  */
       @TableField("shop_name")
       private String shopName;
   	   	   /*  */
       @TableField("phone")
       private String phone;
   	   	   /*  */
       @TableField("openid")
       private String openid;
   	   	   /*  */
       @TableField("create_time")
       private Date createTime;
   	   	   /*  */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /*  */
       @TableField("last_login_time")
       private Date lastLoginTime;
   	   	   /*  */
       @TableField("last_login_ip")
       private String lastLoginIp;
   	
}
