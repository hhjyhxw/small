package com.icloud.font.bsactivity.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.icloud.common.R;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.bsactivity.service.BsactivityFollowuserService;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.thirdinterfaces.score.entity.LongChargeEntity;
import com.icloud.thirdinterfaces.score.entity.LongQueryEntity;
import com.icloud.thirdinterfaces.score.service.LongbiServiceImpl;
import com.icloud.thirdinterfaces.score.utils.LongCoinUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 扫码兑换
 */
@Controller
@RequestMapping("/frontpage/bsactivity/user")
public class ScanUserController {

    private Logger log = LoggerFactory.getLogger(getClass());
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;

    @Autowired
    private  LongbiServiceImpl longbiServiceImpl;
    @Autowired
    private LongCoinUtil longCoinUtil;
    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private BsactivityFollowuserService bsactivityFollowuserService;
    /**
     * @return
     */
    @RequestMapping("/userInfo")
    @ResponseBody
    public R userInfo(){
        try {
            WxUser user = (WxUser) request.getSession().getAttribute("wx_user");
            LongQueryEntity entity = longCoinUtil.getQueryEntity(user.getOpenid());
            log.info("LongQueryEntity=="+ JSON.toJSONString(entity));
            JSONObject result = longbiServiceImpl.queryLongbi(entity.getRequestParamMap());
            log.info("userInfo_querylongbi=="+ result);
            if(result!=null && result.containsKey("returncode") && "000000".equals(result.getString("returncode"))){
                return R.ok().put("dcurrency",result.getString("dcurrency"));
            }else {
                return R.error(LongbiServiceImpl.getCodeMap().get(result.getString("returncode")));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return R.error(e.getMessage());
        }

    }


    /**
     * 1、用户扫描pos机二维码，如果用户已注册会员，直接提示谢谢参与
     * 2、如果没注册会员，直接注册成会员，并且赠送龙币
     * @param qcode
     * @param ss 来源  ss=mini 终端
     * @return
     */
    @RequestMapping("/scanpos")
    public String scanExchange(String qcode,String ss){
        WxUser user = (WxUser) request.getSession().getAttribute("wx_user");
        try {
            int fromType= 1;
            if("mini".equals(ss)){
                fromType = 2;
            }
//            return "modules/front/bsactivity/registersuccess";//跳转注册成功页面
            LongQueryEntity entity = longCoinUtil.getQueryEntity(user.getOpenid());
            log.info("LongQueryEntity=="+ JSON.toJSONString(entity));
            JSONObject result = longbiServiceImpl.queryLongbi(entity.getRequestParamMap());
            log.info("scanpos_querylongbi=="+ result);

            if(result!=null && result.containsKey("returncode") && "000000".equals(result.getString("returncode"))){
                //保存引流登陆日志
                bsactivityFollowuserService.saveOrUpdate(user,0,0,fromType);
                return "modules/front/bsactivity/thanksattend";//跳转谢谢参与页面
            }

            LongChargeEntity charge = longCoinUtil.getSpecifyChargeEntity(user.getOpenid(),myPropertitys.getLongcoin().getChareAmount());
            log.info("LongChargeEntity=="+ JSON.toJSONString(entity));
            result = longbiServiceImpl.recharge(charge.getRequestParamMap());
            if(result!=null && result.containsKey("returncode") && "000000".equals(result.getString("returncode"))){
                //保存引流登陆日志
                bsactivityFollowuserService.saveOrUpdate(user,Integer.parseInt(myPropertitys.getLongcoin().getChareAmount()),1,fromType);
                return "modules/front/bsactivity/registersuccess";//跳转注册成功页面
            }else{
                return "modules/front/bsactivity/thanksattend";//注册充值失败，跳转谢谢参与
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "modules/front/bsactivity/error";
    }

}