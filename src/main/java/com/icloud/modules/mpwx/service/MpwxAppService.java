package com.icloud.modules.mpwx.service;

import com.icloud.modules.mpwx.entity.MpwxApp;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.mpwx.dao.MpwxAppMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:27
 */
@Service
@Transactional
public class MpwxAppService extends BaseServiceImpl<MpwxAppMapper,MpwxApp> {

    @Autowired
    private MpwxAppMapper mpwxAppMapper;
}

