package com.icloud.basecommon.web;

import com.icloud.annotation.SysLog;
import com.icloud.basecommon.model.Query;
import com.icloud.basecommon.service.BaseServiceImpl;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Map;

public abstract class BaseController<B extends BaseServiceImpl,T>{

    public final Logger log = LoggerFactory.getLogger(this.getClass());
    @Autowired
    protected HttpServletRequest request;
    @Autowired
    protected HttpServletResponse response;
    @Autowired
    protected B baseService;



    /**
     * 所有列表
     */
    @SysLog("查询列表")
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = baseService.findByPage(query.getPageNum(),query.getPageSize(), query);
        return R.ok().put("page", page);
    }


    /**
     * 查看信息
     */
    @SysLog("查看")
    @RequestMapping("/info/{id}")
    @ResponseBody
    public R info(@PathVariable("id") Long id){
        Object record = baseService.getById(id);

        return R.ok().put("record", record);
    }

    /**
     * 保存配置
     */
    @SysLog("保存")
    @RequestMapping("/save")
    @RequiresPermissions("sys:config:save")
    public R save(@RequestBody T record){
        ValidatorUtils.validateEntity(record);
        baseService.save(record);
        return R.ok();
    }

    /**
     * 修改
     */
    @SysLog("修改")
    @RequestMapping("/update")
    public R update(@RequestBody  T record){
        ValidatorUtils.validateEntity(record);
        baseService.updateById(record);
        return R.ok();
    }

    /**
     * 删除
     */
    @SysLog("删除")
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        baseService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }

}
