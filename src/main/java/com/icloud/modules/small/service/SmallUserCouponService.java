package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallUserCoupon;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallUserCouponMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 用户拥有的折扣券
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallUserCouponService extends BaseServiceImpl<SmallUserCouponMapper,SmallUserCoupon> {

    @Autowired
    private SmallUserCouponMapper smallUserCouponMapper;
}

