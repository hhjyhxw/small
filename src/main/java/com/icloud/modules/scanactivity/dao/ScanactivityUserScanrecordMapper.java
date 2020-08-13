package com.icloud.modules.scanactivity.dao;

import com.icloud.modules.scanactivity.entity.ScanactivityUserScanrecord;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-05-08 17:24:59
 */
public interface ScanactivityUserScanrecordMapper extends BaseMapper<ScanactivityUserScanrecord> {

    List<ScanactivityUserScanrecord> queryMixList(Map<String,Object> map);
}
