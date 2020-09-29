package com.icloud.modules.scanactivity.service;

import com.icloud.modules.scanactivity.entity.ScanactivityVerificationUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.scanactivity.dao.ScanactivityVerificationUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-09-29 14:44:58
 */
@Service
@Transactional
public class ScanactivityVerificationUserService extends BaseServiceImpl<ScanactivityVerificationUserMapper,ScanactivityVerificationUser> {

    @Autowired
    private ScanactivityVerificationUserMapper scanactivityVerificationUserMapper;
}

