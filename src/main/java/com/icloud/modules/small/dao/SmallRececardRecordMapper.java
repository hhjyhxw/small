package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallRececardRecord;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-10-22 15:30:14
 */
public interface SmallRececardRecordMapper extends BaseMapper<SmallRececardRecord> {

	List<SmallRececardRecord> queryMixList(Map<String, Object> map);
}
