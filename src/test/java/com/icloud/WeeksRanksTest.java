//package com.icloud;//package com.icloud;
//
//import com.icloud.common.WeeYearkUtil;
//import com.icloud.dao.subject.RanksMapper;
//import com.icloud.service.subject.rankrecord.CreateRankRecordService;
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
//import java.util.Calendar;
//import java.util.HashMap;
//import java.util.Map;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public class WeeksRanksTest {
//
//	private final static Logger log = LoggerFactory.getLogger(WeeksRanksTest.class);
//    @Autowired
//    private RanksMapper ranksMapper;
//
//    @Autowired
//    private CreateRankRecordService createRankRecordService;
//
//	@Test
//	@Transactional
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写
//	public void testExChangeGoods() {
//        log.info("===============toCreateWeekRanksJob running===============");
//        try {
//            Map<String,Object> paramMap = new HashMap<String,Object>();
//            //上一周数据，用于查询统计
//            paramMap.put("weeks",-1);
//            paramMap.put("limit",100);//需要读取配置,前多少条数据
//            paramMap.put("offset",0);
//            paramMap.put("typecode","weekrank");//周榜
//            //用于生成 排行记录的 年 周
//            Calendar calendar = Calendar.getInstance();
//
//            ///////////////////获取上一周周数
//            Map<String,String> resultMap = WeeYearkUtil.getWeekAndYear(null,-1);
//            paramMap.put("periods",resultMap.get("weeks"));
//            log.info("resultMap.get(weeks)====="+resultMap.get("weeks"));
//            ///////////////////获取上一周年数
//            log.info("resultMap.get(years)====="+resultMap.get("years"));
//            paramMap.put("years",resultMap.get("years"));
//            createRankRecordService.queryDataAndInsertRanks(paramMap);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            log.info(e.getMessage());
//        }
//        log.info("===============toCreateWeekRanksJob end ===============");
//	}
//
//
//}
//
//
//
