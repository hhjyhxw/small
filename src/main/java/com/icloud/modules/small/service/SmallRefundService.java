package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallRefund;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallRefundMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 退款
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallRefundService extends BaseServiceImpl<SmallRefundMapper,SmallRefund> {

    @Autowired
    private SmallRefundMapper smallRefundMapper;
}

