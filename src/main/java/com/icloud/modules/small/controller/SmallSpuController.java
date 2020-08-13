package com.icloud.modules.small.controller;

import java.util.Arrays;
import java.util.Map;
import com.icloud.basecommon.model.Query;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallSpuService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 商品spu
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallspu.html
 */
@RestController
@RequestMapping("small/smallspu")
public class SmallSpuController {
    @Autowired
    private SmallSpuService smallSpuService;

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
        smallSpuService.save(smallSpu);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallspu:update")
    public R update(@RequestBody SmallSpu smallSpu){
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
