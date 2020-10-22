package com.icloud.font.small;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.annotation.LoginUser;
import com.icloud.basecommon.util.codec.AesUtils;
import com.icloud.common.DateUtil;
import com.icloud.common.R;
import com.icloud.common.util.StringUtil;
import com.icloud.config.global.MyPropertitys;
import com.icloud.font.bsactivity.service.BsactivityGoodsExchangeService;
import com.icloud.modules.bsactivity.entity.BsactivityGoods;
import com.icloud.modules.bsactivity.entity.BsactivityGoodsqcode;
import com.icloud.modules.bsactivity.service.BsactivityGoodsService;
import com.icloud.modules.bsactivity.service.BsactivityGoodsqcodeService;
import com.icloud.modules.bsactivity.vo.BsactivityGoodsqcodeProperties;
import com.icloud.modules.small.entity.SmallRececardRecord;
import com.icloud.modules.small.service.SmallRececardRecordService;
import com.icloud.modules.small.vo.card.CardInfo;
import com.icloud.modules.small.vo.card.CardReceiveParamVo;
import com.icloud.modules.small.vo.card.CardReceiveVo;
import com.icloud.modules.small.vo.card.GetCardResult;
import com.icloud.modules.wx.entity.WxUser;
import com.icloud.thirdinterfaces.apiservice.CardReceiveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * 卡券领取
 */
@Controller
@RequestMapping("/frontpage/small/card")
public class CardReceiveController {

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
    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private CardReceiveService cardReceiveService;
    @Autowired
    private SmallRececardRecordService smallRececardRecordService;

    /**
     * 领取卡券
     * @return
     */
    @RequestMapping("/toGetCardpage")
    public String toScanOrder(){
        return "modules/front/small/getCard";
    }

    /**
     * 卡券列表
     * @return
     */
    @RequestMapping("/toCardlist")
    public String toCardlist(){
        return "modules/front/small/cardlist";
    }
    /**
     * 领取卡券
     * @return
     */
    @RequestMapping("/getCard")
    @ResponseBody
    public R getCard(){
        WxUser user = (WxUser) request.getSession().getAttribute("wx_user");
        try {
          String cardId =  myPropertitys.getCard().getCardId();
          String channelCode =  myPropertitys.getCard().getChannelCode();
          String aeskey =  myPropertitys.getCard().getAeskey();
            CardReceiveVo cardReceiveVo = new CardReceiveVo();
            cardReceiveVo.setCardId(cardId);
            cardReceiveVo.setAccount(user.getOpenid());
            cardReceiveVo.setAccountType("0");
            cardReceiveVo.setSeq(DateUtil.getYearMonthDayWithMinus(new Date()));
            String data = AesUtils.encode(JSON.toJSONString(cardReceiveVo),aeskey);

            CardReceiveParamVo param = new CardReceiveParamVo();
            param.setChannelCode(channelCode);
            param.setData(data);
            String result= cardReceiveService.getCard(myPropertitys.getCard().getGetCardUrl(),param);
            log.info("getCard_result======"+result);
            if(StringUtil.checkStr(result)){
                GetCardResult getCardResult = JSON.parseObject(result, GetCardResult.class);
                if(getCardResult.getCode()==0){
                    CardInfo cardInfo = JSON.parseObject(AesUtils.decode(getCardResult.getCard(),aeskey),CardInfo.class);;
                    SmallRececardRecord record = new SmallRececardRecord();
                    BeanUtils.copyProperties(cardInfo,record);
                    record.setOrderNo(cardInfo.getCardCode());
                    record.setCardUid(cardId);
                    record.setReceverOpenid(user.getOpenid());
                    record.setCreateTime(new Date());
                    smallRececardRecordService.save(record);
                    return R.ok().put("card",cardInfo);
                }else{
                    return R.error(getCardResult.getMsg());
                }
            }else{
                return R.error("领取卡券返回结果null");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return R.error(e.getMessage());
        }
    }

    /**
     * 我的卡券列表
     * @return
     */
    @RequestMapping("/getCardList")
    @ResponseBody
    public R getCardList(){
        WxUser user = (WxUser) request.getSession().getAttribute("wx_user");
        try {
            List<SmallRececardRecord> list=smallRececardRecordService.list(new QueryWrapper<SmallRececardRecord>().eq("recever_openid",user.getOpenid()));
            return R.ok().put("list",list);
        } catch (Exception e) {
            e.printStackTrace();
            return R.error(e.getMessage());
        }
    }
}