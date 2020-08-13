package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallSku;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallSkuMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 商品sku
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallSkuService extends BaseServiceImpl<SmallSkuMapper,SmallSku> {

    @Autowired
    private SmallSkuMapper smallSkuMapper;
}

