package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallOrderDetail;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 订单明细
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallOrderDetailMapper extends BaseMapper<SmallOrderDetail> {

	List<SmallOrderDetail> queryMixList(Map<String,Object> map);
}
