package com.icloud.modules.mpwx.dao;

import com.icloud.modules.mpwx.entity.MpwxCard;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:44:26
 */
public interface MpwxCardMapper extends BaseMapper<MpwxCard> {

	List<MpwxCard> queryMixList(Map<String,Object> map);
}
