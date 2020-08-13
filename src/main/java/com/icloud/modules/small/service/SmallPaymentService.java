package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallPayment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallPaymentMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 支付流水
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallPaymentService extends BaseServiceImpl<SmallPaymentMapper,SmallPayment> {

    @Autowired
    private SmallPaymentMapper smallPaymentMapper;
}

