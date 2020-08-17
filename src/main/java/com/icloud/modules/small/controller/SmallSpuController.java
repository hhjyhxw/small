package com.icloud.modules.small.controller;

import com.alibaba.fastjson.JSON;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallSpuService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.RequiresPermissions;
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

        return R.ok().put("smallSpu", smallSpu);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallspu:save")
    public R save(@RequestBody SmallSpu smallSpu){
        log.info("smallSpu==="+ JSON.toJSONString(smallSpu));
        smallSpuService.save(smallSpu);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallspu:update")
    public R update(@RequestBody SmallSpu smallSpu){
        log.info("smallSpu==="+ JSON.toJSONString(smallSpu));
        ValidatorUtils.validateEntity(smallSpu);
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
