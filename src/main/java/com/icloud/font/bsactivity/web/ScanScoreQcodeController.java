package com.icloud.font.bsactivity.web;

import com.icloud.font.bsactivity.service.BsactivityGoodsExchangeService;
import com.icloud.modules.bsactivity.service.BsactivityGoodsService;
import com.icloud.modules.bsactivity.service.BsactivityGoodsqcodeService;
import com.icloud.modules.bsactivity.vo.BsactivityGoodsqcodeProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 真龙服务号扫一扫，扫到条码的时候跳转提示
 */
@Controller
@RequestMapping("/frontpage/score")
public class ScanScoreQcodeController {

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

    /**
     * 用户扫商品专属二维码，跳转到专属二维码活动首页
     * @param qcode
     * @return
     */
    @RequestMapping("/qcode")
    public String qcode(String qcode){
        return "modules/front/bsactivity/qcode";
    }

}