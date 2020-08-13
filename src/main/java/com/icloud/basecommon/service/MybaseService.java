package com.icloud.basecommon.service;

import com.icloud.common.PageUtils;

import java.util.Map;

public interface MybaseService<T> {
    /**
     * 分页查找
     * @return
     * @throws Exception
     */
    public PageUtils<T> findByPage(int pageNo, int pageSize, Map<String, Object> query);



}
