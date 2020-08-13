package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallRefund;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 退款
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallRefundMapper extends BaseMapper<SmallRefund> {

	List<SmallRefund> queryMixList(Map<String,Object> map);
}
