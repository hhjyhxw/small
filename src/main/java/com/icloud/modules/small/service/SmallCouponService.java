package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallCoupon;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallCouponMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 折扣券管理
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:01
 */
@Service
@Transactional
public class SmallCouponService extends BaseServiceImpl<SmallCouponMapper,SmallCoupon> {

    @Autowired
    private SmallCouponMapper smallCouponMapper;
}

