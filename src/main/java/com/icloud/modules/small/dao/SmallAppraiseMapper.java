package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallAppraise;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 商品评价
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallAppraiseMapper extends BaseMapper<SmallAppraise> {

	List<SmallAppraise> queryMixList(Map<String,Object> map);
}
