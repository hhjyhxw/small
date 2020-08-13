package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallOrderDetail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallOrderDetailMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 订单明细
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallOrderDetailService extends BaseServiceImpl<SmallOrderDetailMapper,SmallOrderDetail> {

    @Autowired
    private SmallOrderDetailMapper smallOrderDetailMapper;
}

