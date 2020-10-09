package com.icloud.modules.small.service;

import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallRetailMapper;
import com.icloud.modules.small.entity.SmallRetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

//    @Override
//    public PageUtils<SmallRetail> findByPage(int pageNo, int pageSize, Map<String, Object> query) {
//        PageHelper.startPage(pageNo, pageSize);
//        List<SmallRetail> list = smallRetailMapper.queryMixList(MapEntryUtils.clearNullValue(query));
//        PageInfo<SmallRetail> pageInfo = new PageInfo<SmallRetail>(list);
//        PageUtils<SmallRetail> page = new PageUtils<SmallRetail>(list,(int)pageInfo.getTotal(),pageSize,pageNo);
//        return page;
//    }
}

