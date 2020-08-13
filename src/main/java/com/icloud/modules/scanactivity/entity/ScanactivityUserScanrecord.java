package com.icloud.modules.scanactivity.entity;

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
 * @date 2020-05-08 17:24:59
 */
@Data
@TableName("t_scanactivity_user_scanrecord")
public class ScanactivityUserScanrecord implements Serializable {
    private static final long serialVersionUID = 1L;

    /*  */
    @TableId(value="id", type= IdType.AUTO)
    private Long id;
    /* 用户手机 */
    @TableField("mobile")
    private String mobile;
    /* openid */
    @TableField("openid")
    private String openid;
    /* 烟品二维码 */
    @TableField("qrcode")
    private String qrcode;
    /* 烟品id */
    @TableField("brandid")
    private Integer brandid;
    /* 扫码时间 */
    @TableField("scan_time")
    private Date scanTime;
    /* 创建时间 */
    @TableField("create_time")
    private Date createTime;
    /* 0未累计计数，1已累计计数 */
    @TableField("cacut_status")
    private String cacutStatus;
    /* provinceName */
    @TableField("province_name")
    private String provinceName;
    /* provinceCode */
    @TableField("province_code")
    private String provinceCode;
    /* cityName */
    @TableField("city_name")
    private String cityName;
    /* cityCode */
    @TableField("city_code")
    private String cityCode;
    /* countyName */
    @TableField("county_name")
    private String countyName;
    /* countyCode */
    @TableField("county_code")
    private String countyCode;
    /* address */
    @TableField("address")
    private String address;
    /* 来源（系统提供方）如：山东扫码平台【SD】 */
    @TableField("source")
    private String source;
    /* 规格类型，1-条盒，2-小盒 */
    @TableField("product_type")
    private String productType;
    /* 鲁（币），青（币） */
    @TableField("currency")
    private String currency;
    /* 参与活动获得奖励（扫码中奖才有值，获得币的数量）
10
参与活动获得奖励（扫码中奖才有值，获得币的数量）
10
参与活动获得奖励（扫码中奖才有值，获得币的数量） */
    @TableField("count")
    private String count;
    /* unionId */
    @TableField("unionid")
    private String unionid;
    /* 规格编码，如 海韵的编码为06 */
    @TableField("product_id")
    private String productId;

}
