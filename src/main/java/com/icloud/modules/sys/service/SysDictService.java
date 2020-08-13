package com.icloud.modules.sys.service;
import com.baomidou.mybatisplus.extension.service.IService;
import com.icloud.common.PageUtils;
import com.icloud.modules.sys.entity.SysDictEntity;

import java.util.Map;

/**
 * 数据字典
 */
public interface SysDictService extends IService<SysDictEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

