package com.icloud.modules.mpwx.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 */
@Data
@TableName("t_mpwx_menu")
public class MpwxMenu implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 公众号记录id */
       @TableField("wxapp_id")
       private Long wxappId;
   	   	   /* 菜单名称 */
       @TableField("name")
       private String name;
   	   	   /* 菜单级别 */
       @TableField("menu_level")
       private Integer menuLevel;
   	   	   /* 菜单排序 */
       @TableField("sort_num")
       private Integer sortNum;
   	   	   /* 菜单类型 */
       @TableField("menu_type")
       private String menuType;
   	   	   /* 关联小程序appId */
       @TableField("xcx_appid")
       private String xcxAppid;
   	   	   /* url */
       @TableField("url")
       private String url;
   	   	   /* 小程序页面路径 */
       @TableField("pagepath")
       private String pagepath;
   	   	   /* 点击事件时的消息类型  0文本 1素材 2跳转流程 */
       @TableField("msg_type")
       private String msgType;
   	   	   /* 回复文本 消息类型为文本的时候 */
       @TableField("text_content")
       private String textContent;
   	   	   /* 素材id */
       @TableField("wxsc_id")
       private Long wxscId;
   	   	   /* 流程id */
       @TableField("process_id")
       private Long processId;
   	   	   /* 父id */
       @TableField("parent_id")
       private Long parentId;
   	   	   /* 状态 */
       @TableField("is_use")
       private String isUse;
   	   	   /* createTime */
       @TableField("create_time")
       private Date createTime;
   	   	   /* modifyTime */
       @TableField("modify_time")
       private Date modifyTime;

       @TableField(exist = false)
       private List<MpwxMenu> childList;
}
