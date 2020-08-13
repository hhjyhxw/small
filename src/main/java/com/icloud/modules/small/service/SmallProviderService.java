package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallProviderMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 供应商
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 15:06:49
 */
@Service
@Transactional
public class SmallProviderService extends BaseServiceImpl<SmallProviderMapper,SmallProvider> {

    @Autowired
    private SmallProviderMapper smallProviderMapper;
}

