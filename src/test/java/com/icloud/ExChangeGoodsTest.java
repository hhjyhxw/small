//package com.icloud;
//
//import java.util.HashMap;
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
//import com.icloud.model.business.BeanFans;
//import com.icloud.service.business.BeanFansService;
//import com.icloud.service.business.ExChangeService;
//import com.icloud.service.interfaces.impl.SmokeBeanInterfaceServiceImpl;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public class ExChangeGoodsTest {
//
////
////	@Value("${local.server.port}")
////	private int port;
////
//	private final static Logger log = LoggerFactory.getLogger(ExChangeGoodsTest.class);
//	@Autowired
//	private SmokeBeanInterfaceServiceImpl smokeBeanInterfaceServiceImpl;
//	@Autowired
//	private ExChangeService exChangeService;
//	@Autowired
//	private BeanFansService beanFansService;
//	@Test
//	@Transactional
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写
//	public void testExChangeGoods() {
//
//		Map<String,String> map = new HashMap<String,String>();
//		try{
//			BeanFans beanFans = beanFansService.findByKey(1L);
//			exChangeService.exChangeGoods("115", 100, 7, 1,beanFans);
//			log.error("兑换成功");
//		}catch(BeanException e){
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}catch(Exception e){
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}
////		try{
////			BeanFans beanFans = beanFansService.findByKey(1L);
////			Queue<ExchangeGoodsVo> queue = new ConcurrentLinkedQueue<ExchangeGoodsVo>();
////			for (int i = 0; i < 5; i++) {
////				ExchangeGoodsVo vo = new ExchangeGoodsVo();
////				vo.setBeanFans(beanFans);
////				vo.setExchangeNum(1);
////				vo.setGoodsId(7);
////				vo.setTicket_id("125"+i);
////				vo.setValue(100);
////				queue.add(vo);
////			}
////			Master master = new Master(new Worker(),1,queue,exChangeService);
////			master.execute();
////		}catch(Exception e){
////			e.printStackTrace();
////		}
//	}
//
//
//}
//
//
//
