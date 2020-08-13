//package com.icloud;//package com.icloud;
////
//
//import com.icloud.basecommon.service.redis.RedisService;
//import com.icloud.exceptions.BeanException;
//import com.icloud.modules.scanactivity.entity.ScanactivityUserScanrecord;
//import com.icloud.modules.scanactivity.service.ScanactivityUserScanrecordService;
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
//import java.util.List;
//import java.util.Map;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=Application.class)
//public class ScanactivityUserscanrecordTest {
//
//	private final static Logger log = LoggerFactory.getLogger(ScanactivityUserscanrecordTest.class);
//	@Autowired
//	private ScanactivityUserScanrecordService scanactivityUserScanrecordService;
//
//	@Autowired
//	private RedisService redisService;
//
//	@Test
//	@Transactional
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写
//	public void testScanactivityUserScanrecord() {
//
//		Map<String,String> map = new HashMap<String,String>();
//		try{
//            List<ScanactivityUserScanrecord> list =  scanactivityUserScanrecordService.list();
//            log.error("list.size()===="+(list!=null?list.size():null));
//		}catch(BeanException e){
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}catch(Exception e){
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}
//	}
//}
//
//
//
