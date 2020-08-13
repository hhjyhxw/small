package com.icloud.modules.sys.service;
import com.baomidou.mybatisplus.extension.service.IService;
import com.icloud.common.PageUtils;
import com.icloud.modules.sys.entity.SysRoleEntity;

import java.util.Map;


/**
 * 角色
 *
 */
public interface SysRoleService extends IService<SysRoleEntity> {

	PageUtils queryPage(Map<String, Object> params);

	void saveRole(SysRoleEntity role);

	void update(SysRoleEntity role);
	
	void deleteBatch(Long[] roleIds);

}
