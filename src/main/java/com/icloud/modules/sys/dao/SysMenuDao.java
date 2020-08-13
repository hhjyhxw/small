package com.icloud.modules.sys.dao;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.icloud.modules.sys.entity.SysMenuEntity;

import java.util.List;

/**
 * 菜单管理
 */
public interface SysMenuDao extends BaseMapper<SysMenuEntity> {
	
	/**
	 * 根据父菜单，查询子菜单
	 * @param parentId 父菜单ID
	 */
	List<SysMenuEntity> queryListParentId(Long parentId);
	
	/**
	 * 获取不包含按钮的菜单列表
	 */
	List<SysMenuEntity> queryNotButtonList();

}
