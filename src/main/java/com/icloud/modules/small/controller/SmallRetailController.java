package com.icloud.modules.small.controller;

import com.icloud.basecommon.model.Query;
import com.icloud.common.MD5Utils;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.small.entity.SmallRetail;
import com.icloud.modules.small.service.SmallRetailService;
import com.icloud.modules.small.vo.RetailQueryVo;
import com.icloud.modules.small.vo.RetailSysVo;
import com.icloud.modules.small.vo.RetailVo;
import com.icloud.thirdinterfaces.apiservice.SmallRetailSendService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;


/**
 * 零售户
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-08-13 14:34:02
 * 菜单主连接： modules/small/smallretail.html
 */
@Slf4j
@RestController
@RequestMapping("small/smallretail")
public class SmallRetailController {
    @Autowired
    private SmallRetailService smallRetailService;

    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private SmallRetailSendService smallRetailSendService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("small:smallretail:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = smallRetailService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }
    /**
     * 列表
     */
    @RequestMapping("/selectlist")
    @RequiresPermissions("small:smallretail:list")
    public R selectlist(@RequestParam Map<String, Object> params){
       List<SmallRetail> list = smallRetailService.list();
       List<RetailQueryVo> volist = new ArrayList<RetailQueryVo>();
       list.forEach(p->{
           RetailQueryVo vo = new RetailQueryVo();
           vo.setId(p.getId().toString());
           vo.setSupplierName(p.getSupplierName());
           volist.add(vo);
       });
       return R.ok().put("retaillist", volist);
    }


    /**
     * 选择所属店铺
     */
    @RequestMapping("/select")
    @RequiresPermissions("small:smallcategory:update")
    public R select(){
        List<SmallRetail> retailList = smallRetailService.list();
        List<RetailVo> list =  new ArrayList<RetailVo>();
        RetailVo vo = null;
        if(list!=null){
            for (SmallRetail smallRetail : retailList) {
                vo =  new RetailVo();
                vo.setId(smallRetail.getId().toString());
                vo.setName(smallRetail.getSupplierName());
                vo.setParentId(null);
                vo.setParentName(null);
                list.add(vo);
            }
        }
        return R.ok().put("retailList", list);
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("small:smallretail:info")
    public R info(@PathVariable("id") Long id){
        SmallRetail smallRetail = (SmallRetail)smallRetailService.getById(id);

        return R.ok().put("smallRetail", smallRetail);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("small:smallretail:save")
    public R save(@RequestBody SmallRetail smallRetail){
        smallRetail.setCreateTime(new Date());
        boolean resutl = smallRetailService.save(smallRetail);
        if(resutl){
            RetailSysVo vo = new RetailSysVo();
            BeanUtils.copyProperties(smallRetail,vo);
            String signStr = MD5Utils.encode2hex(smallRetail.getId().toString()+smallRetail.getLicence()+myPropertitys.getYaobaokey());
            vo.setSign(signStr);
            try {
               String sysresult = smallRetailSendService.sysRetailInfo(myPropertitys.getYaobaourl(),vo);
               log.info("save同步店铺信息结果====="+sysresult);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("small:smallretail:update")
    public R update(@RequestBody SmallRetail smallRetail){
        ValidatorUtils.validateEntity(smallRetail);
        smallRetail.setModifyTime(new Date());
        boolean resutl = smallRetailService.updateById(smallRetail);
        if(resutl){
            RetailSysVo vo = new RetailSysVo();
            BeanUtils.copyProperties(smallRetail,vo);
            String signStr = MD5Utils.encode2hex(smallRetail.getId().toString()+smallRetail.getLicence()+myPropertitys.getYaobaokey());
            vo.setSign(signStr);
            try {
                String sysresult = smallRetailSendService.sysRetailInfo(myPropertitys.getYaobaourl(),vo);
                log.info("update同步店铺信息结果====="+sysresult);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("small:smallretail:delete")
    public R delete(@RequestBody Long[] ids){
        smallRetailService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
