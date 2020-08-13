//package com.icloud;//package com.icloud;
//
//import com.icloud.common.WeeYearkUtil;
//import com.icloud.dao.subject.RanksMapper;
//import com.icloud.service.subject.rankrecord.SendRanksPrizeService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.HashMap;
//import java.util.Map;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public class SendWeekRanksPrizeTest {
//
//	private final static Logger log = LoggerFactory.getLogger(SendWeekRanksPrizeTest.class);
//    @Autowired
//    private RanksMapper ranksMapper;
//
//    @Autowired
//    private SendRanksPrizeService sendRanksPrizeService;
//
//	@Test
//	@Transactional
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写
//	public void testExChangeGoods() {
//        log.info("===============toSendRanksJob running===============");
//        try {
//            Map<String,Object> paramMap = new HashMap<String,Object>();
//            paramMap.put("typecode","weekrank");//周榜
//
//            ///////////////////获取上一周周数
//            Map<String,String> resultMap = WeeYearkUtil.getWeekAndYear(null,-1);
//            log.info("resultMap.get(weeks)====="+resultMap.get("weeks"));
//            paramMap.put("periods",resultMap.get("weeks"));
//            ///////////////////获取上一周年数
//            paramMap.put("years",resultMap.get("years"));
//
//            sendRanksPrizeService.sendRanksPrize(paramMap);
//        } catch (Exception e) {
//            e.printStackTrace();
//            log.error(e.getMessage());
//        }
//        log.info("===============toSendRanksJob end ===============");
//    }
//
//
//}
//
//
//
