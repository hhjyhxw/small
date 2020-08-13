package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallUserCoupon;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 用户拥有的折扣券
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
public interface SmallUserCouponMapper extends BaseMapper<SmallUserCoupon> {

	List<SmallUserCoupon> queryMixList(Map<String,Object> map);
}
