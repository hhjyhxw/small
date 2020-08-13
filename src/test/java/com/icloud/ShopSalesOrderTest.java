//package com.icloud;//package com.icloud;
//
//import com.icloud.exceptions.BeanException;
//import com.icloud.model.hy.HyOrder;
//import com.icloud.service.hy.HyOrderService;
//import com.icloud.service.redis.RedisService;
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
//import java.math.BigDecimal;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public class ShopSalesOrderTest {
//
//	private final static Logger log = LoggerFactory.getLogger(ShopSalesOrderTest.class);
//	@Autowired
//	private HyOrderService hyOrderService;
//
//	@Autowired
//	private RedisService redisService;
//
//	@Test
//	@Transactional
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写
//	public void test() {
//		try{
//            HyOrder hyOrderParam = new HyOrder();
////            hyOrderParam.setStartTime(DateUtil.formatDate(new Date()) +" 00:00:00");
////            hyOrderParam.setEndTime(DateUtil.formatDate(new Date()) +" 23:59:59");
//            hyOrderParam.setShopSalesId(12L);
//			BigDecimal total = hyOrderService.findTotal(hyOrderParam);
//
////			List<BeanGoods> list = (List<BeanGoods>) redisService.get("goodsList");
//			log.error("total==="+total);
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
