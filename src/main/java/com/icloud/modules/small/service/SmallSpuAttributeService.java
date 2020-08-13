package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallSpuAttribute;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallSpuAttributeMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 商品属性
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallSpuAttributeService extends BaseServiceImpl<SmallSpuAttributeMapper,SmallSpuAttribute> {

    @Autowired
    private SmallSpuAttributeMapper smallSpuAttributeMapper;
}

