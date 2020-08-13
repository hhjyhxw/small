package com.icloud.modules.commons.entity;

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
 * @date 2019-12-26 17:58:04
 */
@Data
@TableName("t_commons_ad")
public class CommonsAd implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 名称 */
       @TableField("ad_name")
       private String adName;
   	   	   /* 图片url */
       @TableField("ad_imgurl")
       private String adImgurl;
   	   	   /* 跳转url */
       @TableField("add_jumpurl")
       private String addJumpurl;
   	   	   /* 0停用、1启用 */
       @TableField("status")
       private String status;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 创建人 */
       @TableField("create_operator")
       private String createOperator;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 修改人 */
       @TableField("modify_operator")
       private String modifyOperator;
   	   	   /* 所属位置id */
       @TableField("posittion_id")
       private Long posittionId;
   	   	   /* 排序 */
       @TableField("sort_num")
       private Integer sortNum;
   	
}
