package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallAddress;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallAddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-24 09:30:25
 */
@Service
@Transactional
public class SmallAddressService extends BaseServiceImpl<SmallAddressMapper,SmallAddress> {

    @Autowired
    private SmallAddressMapper smallAddressMapper;
}

