package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallFootprint;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallFootprintMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 用户浏览足迹
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:01
 */
@Service
@Transactional
public class SmallFootprintService extends BaseServiceImpl<SmallFootprintMapper,SmallFootprint> {

    @Autowired
    private SmallFootprintMapper smallFootprintMapper;
}

