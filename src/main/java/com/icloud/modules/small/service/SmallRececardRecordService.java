package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallRececardRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallRececardRecordMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-10-22 15:30:14
 */
@Service
@Transactional
public class SmallRececardRecordService extends BaseServiceImpl<SmallRececardRecordMapper,SmallRececardRecord> {

    @Autowired
    private SmallRececardRecordMapper smallRececardRecordMapper;
}

