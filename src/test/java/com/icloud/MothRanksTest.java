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
//public class MothRanksTest {
//
//	private final static Logger log = LoggerFactory.getLogger(MothRanksTest.class);
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
//
//        log.info("===============toCreateMothRanksJob running===============");
//        try {
//            Map<String,Object> paramMap = new HashMap<String,Object>();
//            //用于查询上一月数据
//            paramMap.put("moths",-1);//上一月
//            paramMap.put("limit",100);//需要读取配置,前多少条数据
//            paramMap.put("offset",0);//从0开始
//            paramMap.put("typecode","mothrank");//月榜
//
//            //用于记录排行数据
//            Calendar calendar = Calendar.getInstance();
//
//            ///////////////////获取上一月月数
//            Map<String,String> resultMap = WeeYearkUtil.getMothAndYear(null,-1);
//            log.info("resultMap.get(moths)====="+resultMap.get("moths"));
//            paramMap.put("periods",resultMap.get("moths"));
//            ///////////////////获取上一月年数
//            paramMap.put("years",resultMap.get("years"));
//
//            createRankRecordService.queryDataAndInsertRanks(paramMap);
//        } catch (Exception e) {
//            e.printStackTrace();
//            log.error(e.getMessage());
//        }
//        log.info("===============toCreateMothRanksJob end ===============");
//	}
//
//
//}
//
//
//
