package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallCategory;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 商品分类
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallCategoryMapper extends BaseMapper<SmallCategory> {

	List<SmallCategory> queryMixList(Map<String,Object> map);

	List<SmallCategory> queryList(Map<String, Object> map);
}
