package com.icloud.modules.mpwx.entity;

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
 * @date 2020-07-20 15:44:27
 */
@Data
@TableName("t_mpwx_app")
public class MpwxApp implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 公众号名称 */
       @TableField("name")
       private String name;
   	   	   /* 微信原始id */
       @TableField("weixin_no")
       private String weixinNo;
   	   	   /* 微信appId */
       @TableField("app_id")
       private String appId;
   	   	   /* 微信secret */
       @TableField("appsecret")
       private String appsecret;
   	   	   /* url */
       @TableField("url")
       private String url;
   	   	   /* token */
       @TableField("token")
       private String token;
   	   	   /* encodingaeskey */
       @TableField("encodingaeskey")
       private String encodingaeskey;
   	   	   /* 商户号 */
       @TableField("partner")
       private String partner;
   	   	   /* 商户签名 */
       @TableField("paysignkey")
       private String paysignkey;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	
}
