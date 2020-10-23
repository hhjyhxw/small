package com.icloud.api.small;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.AuthIgnore;
import com.icloud.annotation.LoginUser;
import com.icloud.basecommon.util.codec.AesUtils;
import com.icloud.common.R;
import com.icloud.common.validator.ValidatorUtils;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.bsactivity.service.BsactivityAdService;
import com.icloud.modules.small.entity.SmallCart;
import com.icloud.modules.small.entity.SmallRececardRecord;
import com.icloud.modules.small.entity.SmallSpu;
import com.icloud.modules.small.service.SmallCartService;
import com.icloud.modules.small.service.SmallRececardRecordService;
import com.icloud.modules.small.service.SmallSpuService;
import com.icloud.modules.small.util.CartOrderUtil;
import com.icloud.modules.small.vo.CartTotalVo;
import com.icloud.modules.small.vo.CartVo;
import com.icloud.modules.small.vo.card.CardReceiveParamVo;
import com.icloud.modules.wx.entity.WxUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Api("卡券核销数据回推接口")
@RestController
@RequestMapping("/api/card")
//http://zl.haiyunzy.com/small//api/card/cartList
public class CarCallBackController {

    @Autowired
    private BsactivityAdService bsactivityAdService;
    @Autowired
    private SmallCartService smallCartService;
    @Autowired
    private SmallSpuService smallSpuService;
    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private SmallRececardRecordService smallRececardRecordService;
    /**
     * 卡券核销数据回推接口
     * @return
     */
    @ApiOperation(value="卡券核销数据回推接口", notes="")
    @RequestMapping(value = "/cartList",method = {RequestMethod.POST})
    @ResponseBody
    @AuthIgnore
    public R cartList(@RequestBody CardReceiveParamVo verifycarvo) {
        ValidatorUtils.validateEntityForFront(verifycarvo);
        String aeskey =  myPropertitys.getCard().getAeskey();
        String cardCode = AesUtils.decode(verifycarvo.getData(),aeskey);
        log.info("cardCode==="+cardCode);
       List<SmallRececardRecord> list = smallRececardRecordService.list(new QueryWrapper<SmallRececardRecord>().eq("order_no",cardCode));
        log.info("list.size()==="+(list!=null?list.size():0));
       if(list!=null && list.size()>0){
           //核销状态(0未核销 1核销中 2已核销 3核销失败)
           SmallRececardRecord smallRececardRecord = list.get(0);
           smallRececardRecord.setVerifyStatus(2);
           boolean reuslt = smallRececardRecordService.updateById(smallRececardRecord);
           if(reuslt){
               return R.ok();
           }else{
               return R.error("核销失败");
           }
       }
       //查询不到返回成功
        return R.ok();
    }

}
