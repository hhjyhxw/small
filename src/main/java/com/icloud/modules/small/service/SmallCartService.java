package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallCart;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallCartMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 购物车
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallCartService extends BaseServiceImpl<SmallCartMapper,SmallCart> {

    @Autowired
    private SmallCartMapper smallCartMapper;
}

