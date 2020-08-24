package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallAddress;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-24 09:30:25
 */
public interface SmallAddressMapper extends BaseMapper<SmallAddress> {

	List<SmallAddress> queryMixList(Map<String,Object> map);
}
