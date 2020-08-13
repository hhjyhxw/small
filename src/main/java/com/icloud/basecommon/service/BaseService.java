package com.icloud.basecommon.service;

import com.github.pagehelper.PageInfo;

import java.util.List;

public interface BaseService<T> {
	/**
	 * 保存
	 * @param
	 */
	public int save(T record);

	/**
	 * 更新
	 * @param
	 * @throws Exception
	 */
	public int update(T record);

	/**
	 * 查找列表
	 * @param
	 * @return
	 * @throws Exception
	 */
	public List<T> findList(T record);

	/**
	 * 查找条数
	 * @return
	 * @throws Exception
	 */
	public Integer findCount(T record) ;


	/**
	 * 通过Id删除
	 * @param id
	 */
	public int delete(Long id) ;

	/**
	 * 通过主键查找
	 *
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public T findByKey(Long id)throws Exception;

	/**
	 * 分页查找
	 * @return
	 * @throws Exception
	 */
	public PageInfo<T> findByPage(int pageNo, int pageSize, T t);


}
