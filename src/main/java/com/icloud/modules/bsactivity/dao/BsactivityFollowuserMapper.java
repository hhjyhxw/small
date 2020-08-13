package com.icloud.modules.bsactivity.dao;

import com.icloud.modules.bsactivity.entity.BsactivityFollowuser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * pos机用户引流记录表
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:44
 */
public interface BsactivityFollowuserMapper extends BaseMapper<BsactivityFollowuser> {

	List<BsactivityFollowuser> queryMixList(Map<String, Object> map);
}
