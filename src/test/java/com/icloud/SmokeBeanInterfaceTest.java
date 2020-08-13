//package com.icloud;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.icloud.service.interfaces.impl.SmokeBeanInterfaceServiceImpl;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public class SmokeBeanInterfaceTest {
// 
////
////	@Value("${local.server.port}")
////	private int port;
//// 
//
//	@Autowired
//	private SmokeBeanInterfaceServiceImpl smokeBeanInterfaceServiceImpl;
//	@Test
//	@Transactional  
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写  
//	public void testInterface() {
//		//乐豆查询接口测试
////		smokeBeanInterfaceServiceImpl.queryFansBeans("ocoMKt2a_9XrLt2NBG5CupS6THE4");
//		//乐豆充值接口
////		smokeBeanInterfaceServiceImpl.rechargeFansBeans("ocoMKt2a_9XrLt2NBG5CupS6THE4", "ldsc_1", "ldsc_a_2", "20", "15", "乐豆商城抽奖", "乐豆商城抽奖");
//		//乐豆消费接口
////		smokeBeanInterfaceServiceImpl.consumeFansBeans("ocoMKt2a_9XrLt2NBG5CupS6THE4", "ldsc_d_2", "1","乐豆商城兑换", "乐豆兑换山地车");
//		//乐豆消费接口
//		smokeBeanInterfaceServiceImpl.queryss("H5annualReport","http://www.baidu.com");
//											   
//	}
//	
//	
//}
//	
//	
//	
