//package com.icloud.modules.mpwx.entity.menu;
//
//import lombok.Data;
//
//import java.util.Date;
//import java.util.List;
//
//@Data
//public class MpwxMenu {
//    private Long id;
//    private String appId;		// 微信号id
//    private String xcxAppid;		// 小程序id
//    private String name;		// 菜单名
//    private String url;		// url
//    private Integer menuLevel;		// 菜单级别1,2
//    private Integer sortNum;		// 排序
//    private String menuType; //菜单类型
//    private String msgType; //点击事件时需要 消息类型0 文本  1、素材 2、跳转流程。。。。。
//    private String textContent;		// 文本内容 msgType存在 且为 0 文本的时候
//    private Long materialId;		//素材id msgType存在 且为 1 素材的时候
//    private Long processId;         //流程id msgType存在 且为 2 流程
//    private MpwxMenu parent;		// 父类，0跟
//    private Long parentId;		// 父类，0跟
//    private String isUse;		// 状态0停用1正常
//    private String pagepath;		// 小程序页面路径
//    private Date createTime;
//    private Date modifyTime;
//
//    private List<MpwxMenu> childList;
//
//    // menuType 菜单类型:click:点击事件
//    //        view:跳转连接
//    //        scancode_push: ：扫码推事件用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者，开发者可以下发消息。
//    //        scancode_waitmsg:扫码推事件且弹出“消息接收中”提示框用户点击按钮后
//    //        pic_sysphoto: 弹出系统拍照发图用户点击按钮后，微信客户端将调起系统相机
//    //        pic_photo_or_album:
//    //        pic_weixin:
//    //        location_select:
//    //        media_id:
//    //       view_limited:
//    //       miniprogram:
//    //
//}
