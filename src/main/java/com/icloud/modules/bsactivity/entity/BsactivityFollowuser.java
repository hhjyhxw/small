package com.icloud.modules.bsactivity.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * pos机用户引流记录表
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:37:40
 */
@Data
@TableName("t_bsactivity_followuser")
public class BsactivityFollowuser implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* opendi */
       @TableField("openid")
       private String openid;
   	   	   /* 头像 */
       @TableField("headimgurl")
       private String headimgurl;
   	   	   /* 昵称 */
       @TableField("nickname")
       private String nickname;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 来源 1、百色引流  2、mini端*/
       @TableField("from_type")
       private Integer fromType;
   	   	   /* 更新时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 赠送龙币 */
       @TableField("longcoin")
       private Integer longcoin;
   	   	   /* 0老会员  1 新注册会员 */
       @TableField("status")
       private Integer status;
   	
}
