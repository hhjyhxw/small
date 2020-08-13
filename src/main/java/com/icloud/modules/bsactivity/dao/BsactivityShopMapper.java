package com.icloud.modules.bsactivity.dao;
import com.icloud.modules.bsactivity.entity.BsactivityShop;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;
import java.util.Map;

/**
 * 
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-04-26 16:19:45
 */
public interface BsactivityShopMapper extends BaseMapper<BsactivityShop> {

	List<BsactivityShop> queryMixList(Map<String, Object> map);

    List<BsactivityShop> selectByposition(BsactivityShop shop);

}
