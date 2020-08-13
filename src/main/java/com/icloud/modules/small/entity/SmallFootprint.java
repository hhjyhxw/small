package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户浏览足迹
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:01
 */
@Data
@TableName("t_small_footprint")
public class SmallFootprint implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 用户id */
       @TableField("user_id")
       private Long userId;
   	   	   /* 商品id */
       @TableField("spu_id")
       private Long spuId;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	
}
