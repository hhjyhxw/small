package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallSpu;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 商品spu
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallSpuMapper extends BaseMapper<SmallSpu> {

	List<SmallSpu> queryMixList(Map<String,Object> map);
}
