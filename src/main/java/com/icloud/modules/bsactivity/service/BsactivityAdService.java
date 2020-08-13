package com.icloud.modules.bsactivity.service;

import com.icloud.modules.bsactivity.entity.BsactivityAd;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.bsactivity.dao.BsactivityAdMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:44
 */
@Service
@Transactional
public class BsactivityAdService extends BaseServiceImpl<BsactivityAdMapper,BsactivityAd> {

    @Autowired
    private BsactivityAdMapper bsactivityAdMapper;
}

