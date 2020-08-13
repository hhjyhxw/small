package com.icloud.modules.retail.dao;

import com.icloud.modules.retail.entity.TRetailConfirn;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-08 11:08:09
 */
public interface TRetailConfirnMapper extends BaseMapper<TRetailConfirn> {

	List<TRetailConfirn> queryMixList(Map<String,Object> map);
}
