package com.icloud.modules.bsactivity.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.common.MapEntryUtils;
import com.icloud.common.PageUtils;
import com.icloud.modules.bsactivity.dao.BsactivityOrderMapper;
import com.icloud.modules.bsactivity.entity.BsactivityOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-17 15:11:04
 */
@Service
@Transactional
public class BsactivityOrderService extends BaseServiceImpl<BsactivityOrderMapper,BsactivityOrder> {

    @Autowired
    private BsactivityOrderMapper bsactivityOrderMapper;

    public String getLastOrderNo() {
        return bsactivityOrderMapper.getOrderNo();
    }

    @Override
    public PageUtils<BsactivityOrder> findByPage(int pageNo, int pageSize, Map<String, Object> query) {
        PageHelper.startPage(pageNo, pageSize);
        List<BsactivityOrder> list = bsactivityOrderMapper.queryMixList(MapEntryUtils.clearNullValue(query));
        PageInfo<BsactivityOrder> pageInfo = new PageInfo<BsactivityOrder>(list);
        PageUtils<BsactivityOrder> page = new PageUtils<BsactivityOrder>(list,(int)pageInfo.getTotal(),pageSize,pageNo);
        return page;
    }
}

