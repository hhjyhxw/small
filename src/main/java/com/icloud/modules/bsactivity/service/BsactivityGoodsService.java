package com.icloud.modules.bsactivity.service;

import com.icloud.modules.bsactivity.entity.BsactivityGoods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.bsactivity.dao.BsactivityGoodsMapper;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-17 15:11:05
 */
@Service
@Transactional
public class BsactivityGoodsService extends BaseServiceImpl<BsactivityGoodsMapper,BsactivityGoods> {

    @Autowired
    public BsactivityGoodsMapper bsactivityGoodsMapper;

    /**
     * 根据二维码查询
     * @param code
     * @return
     */
    public BsactivityGoods selectByQcode(String code){
        return bsactivityGoodsMapper.selectByQcode(code);
    }

    /**
     * 更新库存
     * @param goods
     */
    public int updateGoodsStore(BsactivityGoods goods,Long exchangNum){
        goods.setFreezeStore(goods.getFreezeStore()!=null?goods.getFreezeStore()+exchangNum:exchangNum);
        goods.setRealSales(goods.getRealSales()!=null?goods.getRealSales()+exchangNum:exchangNum);
        goods.setVirtlSales(goods.getVirtlSales()!=null?goods.getVirtlSales()+exchangNum:exchangNum);
       return bsactivityGoodsMapper.updateGoodsStore(goods);
    }

}

