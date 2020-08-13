package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallSpuAttribute;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 商品属性
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallSpuAttributeMapper extends BaseMapper<SmallSpuAttribute> {

	List<SmallSpuAttribute> queryMixList(Map<String,Object> map);
}
