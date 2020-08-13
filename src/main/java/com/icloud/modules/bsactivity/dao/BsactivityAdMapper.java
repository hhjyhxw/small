package com.icloud.modules.bsactivity.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.icloud.modules.bsactivity.entity.BsactivityAd;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:44
 */
public interface BsactivityAdMapper extends BaseMapper<BsactivityAd> {

	List<BsactivityAd> queryMixList(Map<String, Object> map);
}
