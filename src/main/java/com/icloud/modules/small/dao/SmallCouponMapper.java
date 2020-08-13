package com.icloud.modules.small.dao;

import com.icloud.modules.small.entity.SmallCoupon;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 折扣券管理
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:01
 */
public interface SmallCouponMapper extends BaseMapper<SmallCoupon> {

	List<SmallCoupon> queryMixList(Map<String,Object> map);
}
