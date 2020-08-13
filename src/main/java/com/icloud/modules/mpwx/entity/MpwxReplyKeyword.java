package com.icloud.modules.mpwx.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 一条回复对应一个或者多个关键字
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-27 10:23:43
 */
@Data
@TableName("t_mpwx_reply_keyword")
public class MpwxReplyKeyword implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /*  */
       @TableField("keywords")
       private String keywords;
   	   	   /*  */
       @TableField("reply_id")
       private Long replyId;

    @Override
    public boolean equals(Object obj) {
//        if (this == obj)
//            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        MpwxReplyKeyword other = (MpwxReplyKeyword) obj;
        if (id != null && other.getId()!=null && id.longValue()==other.getId().longValue()) {
           return true;
        }
        return false;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((keywords == null) ? 0 : keywords.hashCode());
        return result;
    }

   	
}
