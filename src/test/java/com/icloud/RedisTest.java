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
//import com.icloud.service.redis.RedisService;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public class RedisTest {
// 
////
////	@Value("${local.server.port}")
////	private int port;
//// 
//
//	@Autowired
//	private RedisService redisService;
//	@Test
//	@Transactional  
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写  
//	public void testRedis() {
//		redisService.removePattern("beanFans");
//	}
//	
//	
//	
//}
//	
//	
//	
