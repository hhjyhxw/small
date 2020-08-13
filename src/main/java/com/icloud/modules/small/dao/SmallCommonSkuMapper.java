package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallCommonSku;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 公共商品sku;要货商提供
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 15:06:49
 */
public interface SmallCommonSkuMapper extends BaseMapper<SmallCommonSku> {

	List<SmallCommonSku> queryMixList(Map<String,Object> map);
}
