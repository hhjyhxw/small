package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallProvider;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 供应商
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 15:06:49
 */
public interface SmallProviderMapper extends BaseMapper<SmallProvider> {

	List<SmallProvider> queryMixList(Map<String,Object> map);
}
