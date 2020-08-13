package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallPayment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 支付流水
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallPaymentMapper extends BaseMapper<SmallPayment> {

	List<SmallPayment> queryMixList(Map<String,Object> map);
}
