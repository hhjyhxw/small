//package com.icloud;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
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
//import com.icloud.exceptions.BeanException;
//import com.icloud.model.business.BeanGoods;
//import com.icloud.service.business.BeanGoodsService;
//import com.icloud.service.redis.RedisService;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public class goodsListTest {
// 
//	private final static Logger log = LoggerFactory.getLogger(goodsListTest.class);
//	@Autowired
//	private BeanGoodsService beanGoodsService;
//	
//	@Autowired
//	private RedisService redisService;
//	
//	@Test
//	@Transactional  
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写  
//	public void testExChangeGoods() {
//		
//		Map<String,String> map = new HashMap<String,String>();
//		try{
//			List<BeanGoods> list = beanGoodsService.findList(new BeanGoods());
////			List<BeanGoods> list = (List<BeanGoods>) redisService.get("goodsList");
//			log.error("兑换成功");
//		}catch(BeanException e){
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}catch(Exception e){
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}
//	}
//	
//	
//}
//	
//	
//	
