package com.icloud.modules.bsactivity.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.icloud.modules.bsactivity.entity.BsactivityGoodsqcode;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-17 16:59:00
 */
public interface BsactivityGoodsqcodeMapper extends BaseMapper<BsactivityGoodsqcode> {

    List<BsactivityGoodsqcode> queryMixList(Map<String,Object> map);
}
