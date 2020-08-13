package com.icloud.modules.mpwx.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:52:13
 */
@Data
@TableName("t_mpwx_reply")
public class MpwxReply implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 公众号记录id */
       @TableField("wxapp_id")
       private Long wxappId;
   	   	   /* 关键字描述 */
       @TableField("keywords")
       private String keywords;
//   	   	   /* 回复类型 1 文本 2图文 3跳转流程 4 默认s回复 5关注回复 6图片 */
       @TableField("reply_type")
       private String replyType;
   	   	   /* 回复内容(文本内容 或者 素材id) */
       @TableField("content")
       private String content;
   	   	   /*  */
       @TableField("create_time")
       private Date createTime;
   	   	   /*  */
       @TableField("modify_time")
       private Date modifyTime;

       @TableField(exist = false)
       private List<MpwxReplyKeyword> keywordList;
   	
}
