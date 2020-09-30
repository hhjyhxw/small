package com.icloud.modules.small.controller;

import com.alibaba.fastjson.JSON;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallSpuService;
import com.icloud.modules.small.vo.SmallSpuVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Map;


/**
 * 商品spu
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallspu.html
 */
@Slf4j
@RestController
@RequestMapping("small/smallspu")
public class SmallSpuController {
    @Autowired
    private SmallSpuService smallSpuService;
    @Autowired
    private HttpServletRequest httpServletRequest;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallspu:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallSpuService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/getSessionId")
    public R getSessionId(){
        String sessionId = httpServletRequest.getSession().getId();

        return R.ok().put("sessionId", sessionId);
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallspu:info")
    public R info(@PathVariable("id") Long id){
        SmallSpu smallSpu = (SmallSpu)smallSpuService.getById(id);
        Integer remainStock = (smallSpu.getStock()!=null?smallSpu.getStock().intValue():0) - (smallSpu.getFreezeStock()!=null?smallSpu.getFreezeStock().intValue():0);
        smallSpu.setRemainStock(remainStock>0?remainStock:0);
        return R.ok().put("smallSpu", smallSpu);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallspu:save")
    public R save(@RequestBody SmallSpuVo vo){
        SmallSpu smallSpu = new SmallSpu();
        log.info("smallSpu==="+ JSON.toJSONString(smallSpu));
        BeanUtils.copyProperties(vo,smallSpu);
        smallSpu.setSupplierId(Long.valueOf(vo.getSupplierId()));
        if(smallSpu.getAddStock()!=null && smallSpu.getAddStock()>0){
            smallSpu.setFreezeStock(0);
            smallSpu.setStock(smallSpu.getAddStock());
        }else{
            smallSpu.setStock(0);
            smallSpu.setFreezeStock(0);
        }
        smallSpuService.save(smallSpu);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallspu:update")
    public R update(@RequestBody SmallSpuVo vo){
        log.info("vo==="+ JSON.toJSONString(vo));
        ValidatorUtils.validateEntity(vo);
        SmallSpu smallSpu = new SmallSpu();
        BeanUtils.copyProperties(vo,smallSpu);
        smallSpu.setSupplierId(Long.valueOf(vo.getSupplierId()));
         //增加总库存
        if(smallSpu.getAddStock()!=null && smallSpu.getAddStock()>0){
            smallSpu.setStock(smallSpu.getStock()!=null?smallSpu.getStock().intValue()+smallSpu.getAddStock().intValue():smallSpu.getAddStock());
        //减少总库存
        }else if(smallSpu.getAddStock()!=null && smallSpu.getAddStock()<=0){
            Integer stock = smallSpu.getStock()!=null?smallSpu.getStock().intValue()+smallSpu.getAddStock().intValue():smallSpu.getAddStock();
            //总库存 不能小于已 冻结库存
            if(stock<=0){
                smallSpu.setStock(smallSpu.getFreezeStock()!=null?smallSpu.getFreezeStock():0);
            }else{
                smallSpu.setStock(stock-(smallSpu.getFreezeStock()!=null?smallSpu.getFreezeStock():0)>0?stock:smallSpu.getFreezeStock());
            }
        }
        smallSpuService.updateById(smallSpu);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallspu:delete")
    public R delete(@RequestBody Long[] ids){
        smallSpuService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
