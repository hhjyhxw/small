package com.icloud.modules.small.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.icloud.modules.small.entity.SmallSellCategory;

import java.util.List;
import java.util.Map;

/**
 * 店铺个性化商品分类
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-20 17:21:42
 */
public interface SmallSellCategoryMapper extends BaseMapper<SmallSellCategory> {

	List<SmallSellCategory> queryMixList(Map<String,Object> map);

	List<SmallSellCategory> queryList(Map<String, Object> map);
}
