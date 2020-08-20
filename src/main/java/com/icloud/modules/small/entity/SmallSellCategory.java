package com.icloud.modules.small.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

/**
 * 店铺个性化商品分类
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-20 17:21:42
 */
@Data
@TableName("t_small_sell_category")
public class SmallSellCategory implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 分类名称 */
       @NotBlank
       @TableField("title")
       private String title;
   	   	   /* 父类id */
       @TableField("parent_id")
       private Long parentId;
   	   	   /* 分类图标地址 */
       @TableField("pic_url")
       private String picUrl;
   	   	   /* 分类级别 */
       @TableField("level")
       private Integer level;
   	   	   /* 状态 */
       @NotNull
       @TableField("status")
       private Integer status;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 排序 */
       @TableField("sort_num")
       private Integer sortNum;
       /* 店铺id */
       @NotNull
       @TableField("supplier_id")
       private Long supplierId;

        /*消费商户*/
        @TableField(exist = false)
        private SmallRetail smallRetail;
   	
}
