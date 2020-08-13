package com.icloud.font.bsactivity.web;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.LoginUser;
import com.icloud.basecommon.util.codec.AesUtils;
import com.icloud.common.R;
import com.icloud.common.util.StringUtil;
import com.icloud.font.bsactivity.service.BsactivityGoodsExchangeService;
import com.icloud.modules.bsactivity.entity.BsactivityGoods;
import com.icloud.modules.bsactivity.entity.BsactivityGoodsqcode;
import com.icloud.modules.bsactivity.service.BsactivityGoodsService;
import com.icloud.modules.bsactivity.service.BsactivityGoodsqcodeService;
import com.icloud.modules.bsactivity.vo.BsactivityGoodsqcodeProperties;
import com.icloud.modules.wx.entity.WxUser;
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
@RequestMapping("/frontpage/bsactivity/order")
public class ScanOrderController {

    private Logger log = LoggerFactory.getLogger(getClass());
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BsactivityGoodsqcodeProperties bsactivityGoodsqcodeProperties;
    @Autowired
    private BsactivityGoodsqcodeService bsactivityGoodsqcodeService;
    @Autowired
    private BsactivityGoodsService bsactivityGoodsService;
    @Autowired
    private BsactivityGoodsExchangeService bsactivityGoodsExchangeService;


    @RequestMapping("/toScanOrder")
    public String toScanOrder(){
        return "modules/front/bsactivity/scanOrder";
    }
    /**
     * 用户扫商品专属二维码，跳转到专属二维码活动首页
     * @param qcode
     * @return
     */
    @RequestMapping("/scanExchange")
    public String scanExchange(String qcode){
        log.info("scanExchange_qcode==="+qcode);
        WxUser user = (WxUser) request.getSession().getAttribute("wx_user");
//        return "modules/front/bsactivity/confirOrder";
        try {
            user.setQcode(qcode.toLowerCase());
            request.getSession().setAttribute("wx_user",user);
            String ecodeQcode = AesUtils.encode(user.getQcode(),bsactivityGoodsqcodeProperties.getAsekey());
            log.info("ecodeQcode=="+ecodeQcode);
            QueryWrapper<BsactivityGoodsqcode> queryWrapper = new QueryWrapper<BsactivityGoodsqcode>();
            queryWrapper.lambda().eq(BsactivityGoodsqcode::getQcode, user.getQcode())
                    .eq(BsactivityGoodsqcode::getSignqcode,ecodeQcode);
            BsactivityGoodsqcode bsactivityGoodsqcode = (BsactivityGoodsqcode)bsactivityGoodsqcodeService.getOne(queryWrapper);
            if(bsactivityGoodsqcode.getStatus().intValue()==1){
                return "modules/front/bsactivity/scanOrderComsued";
            }else{
//                return "modules/front/bsactivity/scanOrder";
                //用户第一次登陆需要到第三方系统获取用户信息，这时候微信jssdk 获取失败，所以做一个中转页面处理
                return "modules/front/bsactivity/scanBeforeOrder";
            }
//            return "modules/front/bsactivity/confirOrder?qcode="+qcode+"&time="+ RandomUtil.getRandomString(12);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "modules/front/bsactivity/error";
//        return "modules/front/bsactivity/confirOrder?qcode=0000&time="+ RandomUtil.getRandomString(12);
    }

    /**
     * 用户扫商品专属二维码，跳转到专属二维码活动首页
     * @return
     */
    @RequestMapping("/queryGoodsByqcode")
    @ResponseBody
    public R queryGoodsByqcode(@LoginUser WxUser wxUser){
        try {
            String qcode = wxUser.getQcode();
            log.info("qcode==="+qcode);
            if(!StringUtil.checkStr(qcode)){
                log.info("queryGoodsByqcode_result=错误二维码;qcode="+qcode);
               return R.error("错误二维码!");
            }
            String ecodeQcode = AesUtils.encode(qcode,bsactivityGoodsqcodeProperties.getAsekey());
            QueryWrapper<BsactivityGoodsqcode> queryWrapper = new QueryWrapper<BsactivityGoodsqcode>();
            queryWrapper.lambda().eq(BsactivityGoodsqcode::getQcode,qcode)
                    .eq(BsactivityGoodsqcode::getSignqcode,ecodeQcode);
            BsactivityGoodsqcode bsactivityGoodsqcode = (BsactivityGoodsqcode)bsactivityGoodsqcodeService.getOne(queryWrapper);
            BsactivityGoods bsactivityGoods = (BsactivityGoods) bsactivityGoodsService.getById(bsactivityGoodsqcode.getGoodsid());
            log.info("queryGoodsByqcode_result="+ JSON.toJSONString(bsactivityGoods));
            return R.ok().put("goods",bsactivityGoods).put("qcode",qcode);

        } catch (Exception e) {
            e.printStackTrace();
            log.info("queryGoodsByqcode_result="+ e.getMessage());
            return R.error(e.getMessage());
        }

    }

    /**
     * 用户扫商品专属二维码，跳转到专属二维码活动首页
     * @param goodsId
     * @return
     */
    @RequestMapping("/exchange")
    @ResponseBody
    public R exchange(@LoginUser WxUser wxUser, Long goodsId,Long exchangeNum,Long supplierId){
        try {
            String qcode = wxUser.getQcode();
            log.info("exchange_goodsId==="+goodsId+";qcode=="+qcode+";exchangeNum=="+exchangeNum);
            if(exchangeNum==null || exchangeNum.longValue()<=0 || exchangeNum.longValue()>100){
                return R.error("兑换数量非法!");
            }
            if(goodsId==null){
                return R.error("商品参数为空!");
            }
            if(supplierId==null){
                return R.error("请选择兑换商铺!");
            }
            if(!StringUtil.checkStr(qcode)){
                return R.error("错误二维码!");
            }
//            String decodeQcode = AesUtils.decode(qcode,bsactivityGoodsqcodeProperties.getAsekey());
//            BsactivityGoods bsactivityGoods = bsactivityGoodsService.selectByQcode(decodeQcode);

            String ecodeQcode = AesUtils.encode(qcode,bsactivityGoodsqcodeProperties.getAsekey());
            QueryWrapper<BsactivityGoodsqcode> queryWrapper = new QueryWrapper<BsactivityGoodsqcode>();
            queryWrapper.lambda().eq(BsactivityGoodsqcode::getQcode,qcode)
                    .eq(BsactivityGoodsqcode::getSignqcode,ecodeQcode);
            BsactivityGoodsqcode bsactivityGoodsqcode = (BsactivityGoodsqcode)bsactivityGoodsqcodeService.getOne(queryWrapper);

            BsactivityGoods bsactivityGoods = (BsactivityGoods) bsactivityGoodsService.getById(bsactivityGoodsqcode.getGoodsid());

            BsactivityGoods bsactivityGoods2 = (BsactivityGoods) bsactivityGoodsService.getById(goodsId);
            if(bsactivityGoods.getId()!=bsactivityGoods2.getId()){
              log.info("exchange_result=参数不匹配");
              return R.error("参数不匹配");
            }
            //下单，扣减库存
//            QueryWrapper<BsactivityGoodsqcode> queryWrapper = new QueryWrapper<BsactivityGoodsqcode>();
//            queryWrapper.lambda().eq(BsactivityGoodsqcode::getQcode, decodeQcode);
//            BsactivityGoodsqcode bsactivityGoodsqcode = (BsactivityGoodsqcode)bsactivityGoodsqcodeService.getOne(queryWrapper);

            if(bsactivityGoods.getStore()-(bsactivityGoods.getFreezeStore()!=null?bsactivityGoods.getFreezeStore():0)<exchangeNum){
                return R.error("库存不足");
            }
            bsactivityGoodsExchangeService.scanExchange(bsactivityGoods,bsactivityGoodsqcode,wxUser,exchangeNum,supplierId);
            return R.ok("兑换成功");
        } catch (Exception e) {
            e.printStackTrace();
            log.info("exchange_result="+ e.getMessage());
            return R.error(e.getMessage());
        }

    }

}