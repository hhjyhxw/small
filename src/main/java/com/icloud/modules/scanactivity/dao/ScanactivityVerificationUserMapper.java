package com.icloud.modules.scanactivity.dao;

import com.icloud.modules.scanactivity.entity.ScanactivityVerificationUser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-09-29 14:44:58
 */
public interface ScanactivityVerificationUserMapper extends BaseMapper<ScanactivityVerificationUser> {

	List<ScanactivityVerificationUser> queryMixList(Map<String,Object> map);
}
