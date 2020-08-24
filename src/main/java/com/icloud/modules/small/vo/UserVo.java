package com.icloud.modules.small.vo;

import lombok.Data;

import java.util.Date;

@Data
public class UserVo {

    private Integer id;
    /* openid */
    private String openid;
    /* 昵称 */
    private String nickname;
    /* 性别 	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知 */
    private Integer sex;
    /* 头像 */
    private String headimgurl;
    /* 创建时间 */
    private Date createTime;
    /* 联系电话 */
    private String phone;


}
