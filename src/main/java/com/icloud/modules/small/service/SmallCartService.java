package com.icloud.modules.small.service;

import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallCartMapper;
import com.icloud.modules.small.entity.SmallCart;
import com.icloud.modules.small.vo.CartVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 购物车
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallCartService extends BaseServiceImpl<SmallCartMapper,SmallCart> {

    @Autowired
    private SmallCartMapper smallCartMapper;

    public List<CartVo> getCartVoList(Map map){
       return smallCartMapper.getCartVoList(map);
    }
}

