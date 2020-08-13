package com.icloud.modules.bsactivity.dao;

import com.icloud.modules.bsactivity.entity.BsactivityGoods;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * 
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-17 15:11:05
 */
public interface BsactivityGoodsMapper extends BaseMapper<BsactivityGoods> {

    public BsactivityGoods selectByQcode(String qcode);

    /**
     * 更新库存
     * @param goods
     * @return
     */
    public int updateGoodsStore(BsactivityGoods goods);
}
