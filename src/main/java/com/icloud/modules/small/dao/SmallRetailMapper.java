package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallRetail;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 零售户
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallRetailMapper extends BaseMapper<SmallRetail> {

	List<SmallRetail> queryMixList(Map<String,Object> map);
}
