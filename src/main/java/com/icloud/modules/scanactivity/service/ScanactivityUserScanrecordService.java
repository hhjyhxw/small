package com.icloud.modules.scanactivity.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.common.MapEntryUtils;
import com.icloud.common.PageUtils;
import com.icloud.modules.scanactivity.dao.ScanactivityUserScanrecordMapper;
import com.icloud.modules.scanactivity.entity.ScanactivityUserScanrecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-05-08 17:24:59
 */
@Service
@Transactional
public class ScanactivityUserScanrecordService extends BaseServiceImpl<ScanactivityUserScanrecordMapper,ScanactivityUserScanrecord> {

    @Autowired
    private ScanactivityUserScanrecordMapper scanactivityUserScanrecordMapper;

    @Override
    public PageUtils<ScanactivityUserScanrecord> findByPage(int pageNo, int pageSize, Map<String, Object> query) {
        PageHelper.startPage(pageNo, pageSize);
        List<ScanactivityUserScanrecord> list = scanactivityUserScanrecordMapper.queryMixList(MapEntryUtils.clearNullValue(query));
        PageInfo<ScanactivityUserScanrecord> pageInfo = new PageInfo<ScanactivityUserScanrecord>(list);
        PageUtils<ScanactivityUserScanrecord> page = new PageUtils<ScanactivityUserScanrecord>(list,(int)pageInfo.getTotal(),pageSize,pageNo);
        return page;
    }


}

