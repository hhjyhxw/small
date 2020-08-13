package com.icloud.modules.mpwx.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.icloud.modules.mpwx.vo.sucai.WebSucaivo;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 */
@Data
@TableName("t_mpwx_sucai")
public class MpwxSucai implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 公众号记录Id */
       @TableField("wxapp_id")
       private Long wxappId;
   	   	   /*  */
       @TableField("title")
       private String title;
           /* 微信类型(1图文 3:文本 4:图片 5:语音 6:视频) */
       @TableField("sc_type")
       private String scType;
   	   	   /* 本地访问图片 */
       @TableField("local_urls")
       private String localUrls;
   	   	   /* 点击图文跳转地址 */
       @TableField("wx_urls")
       private String wxUrls;
   	   	   /* 图文素材id 上传图文后返回 图文id*/
       @TableField("wx_mediaids")
       private String wxMediaids;
   	   	   /* WebSucaivo对象json串   图文消息封装*/
       @TableField("detail_info")
       private String detailInfo;
   	   	   /*  */
       @TableField("create_time")
       private Date createTime;
   	   	   /*  */
       @TableField("modify_time")
       private Date modifyTime;

       @TableField(exist = false)
       private WebSucaivo webSucaivo;
   	
}
