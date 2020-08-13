package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallCollect;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallCollectMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 商品收藏
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallCollectService extends BaseServiceImpl<SmallCollectMapper,SmallCollect> {

    @Autowired
    private SmallCollectMapper smallCollectMapper;
}

