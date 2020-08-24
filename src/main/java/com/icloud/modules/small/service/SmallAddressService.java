package com.icloud.modules.small.service;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.modules.small.dao.SmallAddressMapper;
import com.icloud.modules.small.entity.SmallAddress;
import com.icloud.modules.wx.entity.WxUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-24 09:30:25
 */
@Service
@Transactional
public class SmallAddressService extends BaseServiceImpl<SmallAddressMapper,SmallAddress> {

    @Autowired
    private SmallAddressMapper smallAddressMapper;

    public boolean saveOrUpdate(SmallAddress smallAddress){
        int flag = 1;
        if (smallAddress.getDefaultAddress().intValue()==1) {
            SmallAddress preDefault = new SmallAddress();
            preDefault.setDefaultAddress(0);
            //传入entity以及更新条件进行更新信息
            //更新默认收货地址为  非默认地址
            flag = smallAddressMapper.update(preDefault, new UpdateWrapper<SmallAddress>().eq("user_id", smallAddress.getUserId()) .eq("default_address", "1"));
        }
        if(flag==0){
            return false;
        }
        if(smallAddress.getId()!=null){
            smallAddress.setModifyTime(new Date());
        }else{
            smallAddress.setCreateTime(new Date());
        }
        return super.saveOrUpdate(smallAddress);
    }


    public int setDefaut(Long id, WxUser user) {
        SmallAddress preDefault = new SmallAddress();
        preDefault.setDefaultAddress(0);
        //更新其他地址为非默认地址
        int flag = smallAddressMapper.update(preDefault, new UpdateWrapper<SmallAddress>().eq("user_id", user.getId()) .eq("default_address", "1"));

        //更新地址id为 id 的地址为默认地址
        preDefault.setDefaultAddress(1);
        preDefault.setModifyTime(new Date());
        flag = smallAddressMapper.update(preDefault, new UpdateWrapper<SmallAddress>().eq("user_id", user.getId()) .eq("id", id));
        return flag;
    }
}

