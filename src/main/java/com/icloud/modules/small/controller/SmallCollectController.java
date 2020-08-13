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
import com.icloud.modules.small.entity.SmallCollect;
import com.icloud.modules.small.service.SmallCollectService;
import com.icloud.basecommon.model.Query;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;


/**
 * 商品收藏
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallcollect.html
 */
@RestController
@RequestMapping("small/smallcollect")
public class SmallCollectController {
    @Autowired
    private SmallCollectService smallCollectService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallcollect:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallCollectService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallcollect:info")
    public R info(@PathVariable("id") Long id){
        SmallCollect smallCollect = (SmallCollect)smallCollectService.getById(id);

        return R.ok().put("smallCollect", smallCollect);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallcollect:save")
    public R save(@RequestBody SmallCollect smallCollect){
        smallCollectService.save(smallCollect);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallcollect:update")
    public R update(@RequestBody SmallCollect smallCollect){
        ValidatorUtils.validateEntity(smallCollect);
        smallCollectService.updateById(smallCollect);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallcollect:delete")
    public R delete(@RequestBody Long[] ids){
        smallCollectService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
