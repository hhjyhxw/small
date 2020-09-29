package com.icloud.modules.scanactivity.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.model.Query;
import com.icloud.common.BaseMessagaeVo;
import com.icloud.common.MD5Utils;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.scanactivity.entity.ScanactivityVerificationUser;
import com.icloud.modules.scanactivity.service.ScanactivityVerificationUserService;
import com.icloud.thirdinterfaces.apiservice.CommonMessageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;


/**
 * 
 *
 * @author zdh
 * @email yyyyyy@cm.com
 * @date 2020-09-29 14:44:58
 * 菜单主连接： modules/scanactivity/scanactivityverificationuser.html
 */
@Slf4j
@RestController
@RequestMapping("/commonmessage")
public class ScanactivityVerificationUserController {

    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private CommonMessageService commonMessageService;
    @Autowired
    private ScanactivityVerificationUserService scanactivityVerificationUserService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("scanactivity:scanactivityverificationuser:list")
    public R list(@RequestParam Map<String, Object> params){
        Query query = new Query(params);
        PageUtils page = scanactivityVerificationUserService.findByPage(query.getPageNum(),query.getPageSize(), query);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("scanactivity:scanactivityverificationuser:info")
    public R info(@PathVariable("id") Long id){
        ScanactivityVerificationUser scanactivityVerificationUser = (ScanactivityVerificationUser)scanactivityVerificationUserService.getById(id);

        return R.ok().put("scanactivityVerificationUser", scanactivityVerificationUser);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("scanactivity:scanactivityverificationuser:save")
    public R save(@RequestBody ScanactivityVerificationUser scanactivityVerificationUser){
        scanactivityVerificationUserService.save(scanactivityVerificationUser);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("scanactivity:scanactivityverificationuser:update")
    public R update(@RequestBody ScanactivityVerificationUser scanactivityVerificationUser){
        ValidatorUtils.validateEntity(scanactivityVerificationUser);
        scanactivityVerificationUserService.updateById(scanactivityVerificationUser);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("scanactivity:scanactivityverificationuser:delete")
    public R delete(@RequestBody Long[] ids){
        scanactivityVerificationUserService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

    /**
     *
     * @param id 模板id
     * @return
     */
    @RequestMapping("/sendmessage/{id}")
    public R info(@PathVariable("id") String id){

        //templateId==PRrtFZYHTP-bw7xKYBKQs-Kz51Ma9mlTSrZ0mwV6Tko
        log.info("templateId====="+id);
        List<ScanactivityVerificationUser> list = scanactivityVerificationUserService.list(new QueryWrapper<ScanactivityVerificationUser>().eq("send_status","0"));
        log.info("list.size()====="+(list!=null?list.size():0));
        int totalsuccess = 0;
        int totalError = 0;
        for (int i = 0; i <list.size() ; i++) {
            ScanactivityVerificationUser user = list.get(i);
            BaseMessagaeVo vo = getMessage(user,id);
            String result = commonMessageService.sysRetailInfo(myPropertitys.getSendurl(),vo);
            ScanactivityVerificationUser param = null;
            if(result!=null && result.contains("status") && result.contains("success")){
                param = new ScanactivityVerificationUser();
                param.setId(user.getId());
                param.setSendStatus("1");
                scanactivityVerificationUserService.updateById(param);
                totalsuccess++;
                log.info("totalsuccess====="+totalsuccess);
            }else {
                if(result!=null){
                    JSONObject obj = JSONObject.parseObject(result);
                    param = new ScanactivityVerificationUser();
                    param.setId(user.getId());
                    param.setMsg(obj.getString("message")+"_"+obj.getString("errcode"));
                    scanactivityVerificationUserService.updateById(param);
                }
                totalError++;
                log.info("totalError====="+totalError);
            }
        }
        return R.ok().put("totalsuccess", totalsuccess).put("totalError",totalError);
    }

    public BaseMessagaeVo getMessage(ScanactivityVerificationUser user,String templateId){
        BaseMessagaeVo vo = new BaseMessagaeVo();
        vo.setFirst("尊敬的龙粉，您的新品品吸测试因为配方调整延迟发货");
        vo.setKeyword1("待定");
        vo.setKeyword2("配方调整");
        vo.setKeyword3("2020年9月30日");
        vo.setKeyword4("2020年10月31日前");
        vo.setRemark("尊敬的龙粉，为了给您带来更好的测试体验，真龙新品在吸味上还需做进一步的优化调整，因此真龙新品预计10月31日前会寄出，感谢您的支持，我们不见不散!客服热线：4008792099。");
        vo.setOpenId(user.getOpenid());
        vo.setTemplateId(templateId);
        vo.setVisitUrl(null);
        vo.setSign(MD5Utils.encode2hex(user.getOpenid()+templateId+myPropertitys.getSendkey()));
        return vo;
    }

}
