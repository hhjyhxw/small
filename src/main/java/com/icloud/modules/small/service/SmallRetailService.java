package com.icloud.modules.small.service;

import com.icloud.modules.small.entity.SmallRetail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallRetailMapper;
import org.springframework.beans.factory.annotation.Autowired;
/**
 * 零售户
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallRetailService extends BaseServiceImpl<SmallRetailMapper,SmallRetail> {

    @Autowired
    private SmallRetailMapper smallRetailMapper;

    public void saveSelf(SmallRetail smallRetail) {
        smallRetailMapper.saveSelf(smallRetail);
    }
}

