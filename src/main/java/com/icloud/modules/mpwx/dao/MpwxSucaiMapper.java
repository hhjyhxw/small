package com.icloud.modules.mpwx.dao;

import com.icloud.modules.mpwx.entity.MpwxSucai;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 */
public interface MpwxSucaiMapper extends BaseMapper<MpwxSucai> {

	List<MpwxSucai> queryMixList(Map<String,Object> map);
}
