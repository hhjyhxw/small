package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 商品分类
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Data
@TableName("t_small_category")
public class SmallCategory implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 分类名称 */
       @TableField("title")
       private String title;
   	   	   /* 父类id */
       @TableField("parent_id")
       private String parentId;
   	   	   /* 分类图标地址 */
       @TableField("pic_url")
       private String picUrl;
   	   	   /* 分类级别 */
       @TableField("level")
       private Integer level;
   	   	   /* 状态 */
       @TableField("status")
       private Integer status;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	
}
