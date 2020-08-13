package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallCommonSku;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallCommonSkuMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 公共商品sku;要货商提供
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 15:06:49
 */
@Service
@Transactional
public class SmallCommonSkuService extends BaseServiceImpl<SmallCommonSkuMapper,SmallCommonSku> {

    @Autowired
    private SmallCommonSkuMapper smallCommonSkuMapper;
}

