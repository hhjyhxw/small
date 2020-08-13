package com.icloud.modules.bsactivity.service;

import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.bsactivity.dao.BsactivityShopMapper;
import com.icloud.modules.bsactivity.entity.BsactivityShop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:45
 */
@Service
@Transactional
public class BsactivityShopService extends BaseServiceImpl<BsactivityShopMapper,BsactivityShop> {

    @Autowired
    private BsactivityShopMapper bsactivityShopMapper;

    public List<BsactivityShop> selectByposition(BsactivityShop shop){
        return bsactivityShopMapper.selectByposition(shop);
    }
}

