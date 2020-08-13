package com.icloud.modules.mpwx.dao;

import com.icloud.modules.mpwx.entity.MpwxReply;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-20 15:52:13
 */
public interface MpwxReplyMapper extends BaseMapper<MpwxReply> {

	List<MpwxReply> queryMixList(Map<String,Object> map);
}
