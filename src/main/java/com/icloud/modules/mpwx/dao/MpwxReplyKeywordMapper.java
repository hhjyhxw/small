package com.icloud.modules.mpwx.dao;

import com.icloud.modules.mpwx.entity.MpwxReplyKeyword;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 一条回复对应一个或者多个关键字
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-07-27 10:23:43
 */
public interface MpwxReplyKeywordMapper extends BaseMapper<MpwxReplyKeyword> {

	List<MpwxReplyKeyword> queryMixList(Map<String,Object> map);
}
