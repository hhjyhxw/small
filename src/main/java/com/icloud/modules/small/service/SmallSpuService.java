package com.icloud.modules.small.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.common.MapEntryUtils;
import com.icloud.common.PageUtils;
import com.icloud.modules.small.dao.SmallSpuMapper;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.vo.SetShowGoods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 商品spu
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 */
@Service
@Transactional
public class SmallSpuService extends BaseServiceImpl<SmallSpuMapper,SmallSpu> {

    @Autowired
    private SmallSpuMapper smallSpuMapper;


    @Override
    public PageUtils<SmallSpu> findByPage(int pageNo, int pageSize, Map<String, Object> query) {
        PageHelper.startPage(pageNo, pageSize);
        try {
            query =  MapEntryUtils.mapvalueToBeanValueAndBeanProperyToColum(query, SmallSpu.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<SmallSpu> list = smallSpuMapper.queryMixList(MapEntryUtils.clearNullValue(query));
        PageInfo<SmallSpu> pageInfo = new PageInfo<SmallSpu>(list);
        PageUtils<SmallSpu> page = new PageUtils<SmallSpu>(list,(int)pageInfo.getTotal(),pageSize,pageNo);
        return page;
    }

    public void saveShowsmokeGoodList(SetShowGoods goods) {
        SmallSpu param = new SmallSpu();
        param.setShowFlag(0);
        smallSpuMapper.update(param,new UpdateWrapper<SmallSpu>().eq("supplier_id",goods.getSupplierId()));
        List<SmallSpu> list = smallSpuMapper.selectList(new QueryWrapper<SmallSpu>().in("id",goods.getSpuIds()));
        if(list!=null && list.size()>0){
            Long[] spuIds = goods.getSpuIds();
            for (int i = 0; i <list.size() ; i++) {
                SmallSpu spu = list.get(i);
                for (int j = 0; j<spuIds.length ; j++) {
                    if(spuIds[j].longValue()==spu.getId().longValue()){
                        SmallSpu sonparam = new SmallSpu();
                        sonparam.setId(spu.getId());
                        sonparam.setShowFlag(goods.getShowFlag()[j]);
                        smallSpuMapper.updateById(sonparam);
                    }
                }
            }
        }
    }
}

