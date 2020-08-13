package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallOrder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 订单表
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallOrderService extends BaseServiceImpl<SmallOrderMapper,SmallOrder> {

    @Autowired
    private SmallOrderMapper smallOrderMapper;
}

