package com.icloud.modules.retail.service;

import com.icloud.modules.retail.entity.TRetailConfirn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.retail.dao.TRetailConfirnMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-08 11:08:09
 */
@Service
@Transactional
public class TRetailConfirnService extends BaseServiceImpl<TRetailConfirnMapper,TRetailConfirn> {


    @Autowired
    private TRetailConfirnMapper rRetailConfirnMapper;
}

