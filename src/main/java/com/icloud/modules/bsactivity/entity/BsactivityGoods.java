package com.icloud.modules.bsactivity.entity;

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
 * @date 2020-04-17 15:11:05
 */
@Data
@TableName("t_bsactivity_goods")
public class BsactivityGoods implements Serializable {
	private static final long serialVersionUID = 1L;

   	   /*  */
       @TableId(value="id", type= IdType.AUTO)
       private Long id;
   	   	   /* 商品名称 */
       @TableField("name")
       private String name;
   	   	   /* 商品原价（积分价格） */
       @TableField("origin_price")
       private Long originPrice;
   	   	   /* 商品现价 */
       @TableField("market_price")
       private Long marketPrice;
   	   	   /* 商品头图 */
       @TableField("goodimg")
       private String goodimg;
   	   	   /* 商品文字描述 */
       @TableField("describs")
       private String describs;
   	   	   /* 商品图片描述 */
       @TableField("details")
       private String details;
   	   	   /* 总库存 */
       @TableField("store")
       private Long store;
   	   	   /* 冻结库存 */
       @TableField("freeze_store")
       private Long freezeStore;
   	   	   /* 0下架、1上架 */
       @TableField("status")
       private Integer status;
   	   	   /* 逻辑删除状态：0正常 1删除 */
       @TableField("delete_status")
       private Integer deleteStatus;
   	   	   /* 分类Id */
       @TableField("categoriesid")
       private Long categoriesid;
   	   	   /* 创建时间 */
       @TableField("create_time")
       private Date createTime;
   	   	   /* 创建人 */
       @TableField("create_man")
       private String createMan;
   	   	   /* 修改时间 */
       @TableField("modify_time")
       private Date modifyTime;
   	   	   /* 修改人 */
       @TableField("modify_man")
       private String modifyMan;
   	   	   /* 操作ip */
       @TableField("operateip")
       private String operateip;
   	   	   /* 实际销量 */
       @TableField("real_sales")
       private Long realSales;
   	   	   /* 虚拟销量 */
       @TableField("virtl_sales")
       private Long virtlSales;
   	   	   /* 商品排序 */
       @TableField("sortnum")
       private Long sortnum;
   	   	   /* 备注 */
       @TableField("memo")
       private String memo;
   	   	   /* 商品策略id */
       @TableField("goods_strategyid")
       private Long goodsStrategyid;

        /* 前端传入生成二维码的数量 */
        @TableField(exist = false)
        private Long gernerNum;//

        @TableField(exist = false)
        private Long[] ids;//
}
