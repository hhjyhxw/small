package com.icloud.modules.small.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.common.MapEntryUtils;
import com.icloud.common.PageUtils;
import com.icloud.modules.small.dao.SmallSellCategoryMapper;
import com.icloud.modules.small.entity.SmallSellCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 店铺个性化商品分类
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-20 17:21:42
 */
@Service
@Transactional
public class SmallSellCategoryService extends BaseServiceImpl<SmallSellCategoryMapper,SmallSellCategory> {

    @Autowired
    private SmallSellCategoryMapper smallSellCategoryMapper;

    @Override
    public PageUtils<SmallSellCategory> findByPage(int pageNo, int pageSize, Map<String, Object> query) {
        PageHelper.startPage(pageNo, pageSize);
        List<SmallSellCategory> list = smallSellCategoryMapper.queryMixList(MapEntryUtils.clearNullValue(query));
        PageInfo<SmallSellCategory> pageInfo = new PageInfo<SmallSellCategory>(list);
        PageUtils<SmallSellCategory> page = new PageUtils<SmallSellCategory>(list,(int)pageInfo.getTotal(),pageSize,pageNo);
        return page;
    }


    public List<SmallSellCategory> queryList(Map<String, Object> map){
        return smallSellCategoryMapper.queryList(MapEntryUtils.clearNullValue(map));
    }
}

