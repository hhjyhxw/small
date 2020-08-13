package com.icloud.basecommon.dao;

import java.util.List;

public interface BaseMapper<T> {

    /*
    * 根据ID删除
     */
    int deleteByPrimaryKey(Long id);

    /*
     * 添加
     */
    int insert(T record);

    /**
     * 添加
     * @param record
     * @return
     */
    int insertSelective(T record);

    /**
     * 根据ID查询
     * @param id
     * @return
     */
    T selectByPrimaryKey(Long id);

    /**
     * 更加ID更新非空字段
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(T record);

    /**
     * 根据ID更新全部字段
     * @param record
     * @return
     */
    int updateByPrimaryKey(T record);

    /**
     * 根据对象查询列表
     * @param t
     * @return
     */
    public List<T> findForList(T t);

    /**
     * 根据对象统计数量
     * @param t
     * @return
     */
    Integer findCount(T t);

    public List<T> findForPage(T t);
} 
