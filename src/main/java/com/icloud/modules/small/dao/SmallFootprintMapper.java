package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallFootprint;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 用户浏览足迹
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:01
 */
public interface SmallFootprintMapper extends BaseMapper<SmallFootprint> {

	List<SmallFootprint> queryMixList(Map<String,Object> map);
}
