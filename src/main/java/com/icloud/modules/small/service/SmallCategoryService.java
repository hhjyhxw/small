package com.icloud.modules.small.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.common.MapEntryUtils;
import com.icloud.common.PageUtils;
import com.icloud.modules.small.dao.SmallCategoryMapper;
import com.icloud.modules.small.entity.SmallCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 商品分类
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallCategoryService extends BaseServiceImpl<SmallCategoryMapper,SmallCategory> {

    @Autowired
    private SmallCategoryMapper smallCategoryMapper;

    @Override
    public PageUtils<SmallCategory> findByPage(int pageNo, int pageSize, Map<String, Object> query) {
        PageHelper.startPage(pageNo, pageSize);
        List<SmallCategory> list = smallCategoryMapper.queryMixList(MapEntryUtils.clearNullValue(query));
        PageInfo<SmallCategory> pageInfo = new PageInfo<SmallCategory>(list);
        PageUtils<SmallCategory> page = new PageUtils<SmallCategory>(list,(int)pageInfo.getTotal(),pageSize,pageNo);
        return page;
    }


    public List<SmallCategory> queryList(Map<String, Object> map){
        return smallCategoryMapper.queryList(MapEntryUtils.clearNullValue(map));
    }
}

