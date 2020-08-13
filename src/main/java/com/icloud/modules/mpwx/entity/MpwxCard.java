package com.icloud.modules.mpwx.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
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
@TableName("t_mpwx_card")
public class MpwxCard implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /* id */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 公众号记录id */
       @TableField("wxapp_id")
       private Long wxappId;
   	   	   /* 卡券类型 */
       @TableField("card_type")
       private String cardType;
   	   	   /* 微信卡券id  card_id */
       @TableField("card_id")
       private String cardId;
   	   	   /* logo地址 */
       @TableField("logo_url")
       private String logoUrl;
   	   	   /* code码展示类型 */
       @TableField("code_type")
       private String codeType;
   	   	   /* 商户名称 */
       @TableField("brand_name")
       private String brandName;
   	   	   /* 卡券名称 */
       @TableField("title")
       private String title;
   	   	   /* 券名的副标题 */
       @TableField("sub_title")
       private String subTitle;
   	   	   /* 卡券颜色 */
       @TableField("color")
       private String color;
   	   	   /* 使用提醒。（一句描述，展示在首页） */
       @TableField("notice")
       private String notice;
   	   	   /* 客服电话 */
       @TableField("service_phone")
       private String servicePhone;
   	   	   /* 使用说明。长文本描述。 */
       @TableField("description")
       private String description;
   	   	   /* 每人使用次数限制 */
       @TableField("use_limit")
       private String useLimit;
   	   	   /* 每人最大领取次数 */
       @TableField("get_limit")
       private String getLimit;
   	   	   /* 是否自定义code码，填写1或0。1表示是。0表示否 */
       @TableField("use_custom_code")
       private String useCustomCode;
   	   	   /* 是否指定用户领取，填写1或0。1表示是。0表示否 */
       @TableField("bind_openid")
       private String bindOpenid;
   	   	   /* 领取卡券原生页面是否可分享，填写1或0。1表示是。0表示否 */
       @TableField("can_share")
       private String canShare;
   	   	   /* 卡券是否可转赠，填写1或0。1表示是。0表示否 */
       @TableField("can_give_friend")
       private String canGiveFriend;
   	   	   /* DATE_TYPE_FIX_TIME_RANGE 表示固定日期区间，DATE_TYPE_FIX_TERM表示自领取后按天算 */
       @TableField("date_info_type")
       private String dateInfoType;
   	   	   /* 固定日期区间专用，表示起用时间 */
       @TableField("begin_timestamp")
       private String beginTimestamp;
   	   	   /* 固定日期区间专用，表示结束时间 */
       @TableField("end_timestamp")
       private String endTimestamp;
   	   	   /* 固定时长专用，表示自领取后多少天内有效。（单位为天） */
       @TableField("fixed_term")
       private String fixedTerm;
   	   	   /* 固定时长专用，表示自领取后多少天开始生效。(单位为天) */
       @TableField("fixed_begin_term")
       private String fixedBeginTerm;
   	   	   /* 剩余库存量 */
       @TableField("sku_quantity")
       private Long skuQuantity;
   	   	   /* 总库存量 */
       @TableField("sku_total_quantity")
       private Long skuTotalQuantity;
   	   	   /* 商户自定义入口名称，与custom_url字段共同使用，长度限制在5个汉字内 */
       @TableField("custom_url_name")
       private String customUrlName;
   	   	   /* 商户自定义cell跳转外链的地址链接，跳转页面内容需与自定义cell名称保持匹配 */
       @TableField("custom_url")
       private String customUrl;
   	   	   /* 显示在cell右侧的tips，长度限制在6个汉字内 */
       @TableField("custom_url_sub_title")
       private String customUrlSubTitle;
   	   	   /* 营销场景的自定义入口 */
       @TableField("promotion_url_name")
       private String promotionUrlName;
   	   	   /* 入口跳转外链的地址链接 */
       @TableField("promotion_url")
       private String promotionUrl;
   	   	   /* 显示在入口右侧的tips，长度限制在6个汉字内 */
       @TableField("promotion_url_sub_title")
       private String promotionUrlSubTitle;
   	   	   /* 第三方来源名，例如同程旅游、格瓦拉 */
       @TableField("source")
       private String source;
   	   	   /* 卡券审核状态(CARD_STATUS_NOT_VERIFY：待审核；CARD_STATUS_VERIFY_FAIL:审核失败；CARD_STATUS_VERIFY_OK:通过审核。CARD_STATUS_DELETE:卡券在mp后台被用户删除。CARD_STATUS_DISPATCH:在公众平台投放过的卡券) */
       @TableField("verify_status")
       private String verifyStatus;
   	   	   /* 选择用户可在“附近”领取卡券时，上传的卡券缩略图 */
       @TableField("poi_pic_url")
       private String poiPicUrl;
   	   	   /* 用户选择门店。0(false):表示选择无门店限制或指定门店。1(true)：表示选择全部门店 */
       @TableField("auto_update_new_location")
       private String autoUpdateNewLocation;
   	   	   /* 存在状态。0表示存在，1表示删除 */
       @TableField("state")
       private Integer state;
   	   	   /* 创建日期 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 修改日期 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 适用门店类型 */
       @TableField("shop_type")
       private String shopType;
   	   	   /* 无指定门店的原因 */
       @TableField("no_shop_reason")
       private String noShopReason;
   	   	   /* 无指定门店的中的其它原因描述 */
       @TableField("no_shop_input")
       private String noShopInput;
   	   	   /* 是否选择用户可在“附近”领取卡券，1表示选择，0表示不选择 */
       @TableField("shop_in_nearby")
       private String shopInNearby;
   	   	   /* GET_CUSTOM_CODE_MODE_DEPOSIT 表示该卡券为预存code模式卡券， 须导入超过库存数目的自定义code后方可投放， 填入该字段后，quantity字段须为0,须导入code 后再增加库存 */
       @TableField("get_custom_code_mode")
       private String getCustomCodeMode;
   	   	   /* 卡券跳转的小程序的user_name，仅可跳转该 公众号绑定的小程序  */
       @TableField("custom_app_brand_user_name")
       private String customAppBrandUserName;
   	   	   /* 卡券跳转的小程序的path */
       @TableField("custom_app_brand_pass")
       private String customAppBrandPass;
   	   	   /* 卡券跳转的小程序的user_name，仅可跳转该 公众号绑定的小程序  */
       @TableField("promotion_app_brand_user_name")
       private String promotionAppBrandUserName;
   	   	   /* 卡券跳转的小程序的path */
       @TableField("promotion_app_brand_pass")
       private String promotionAppBrandPass;
   	   	   /* supplier_id */
       @TableField("supplier_id")
       private Long supplierId;
   	
}
