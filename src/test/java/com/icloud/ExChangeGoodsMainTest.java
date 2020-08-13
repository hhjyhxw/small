//package com.icloud;
//
//import java.util.Queue;
//import java.util.concurrent.ConcurrentLinkedQueue;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.icloud.service.master.Master;
//import com.icloud.service.master.Worker;
//
//
//
//public class ExChangeGoodsMainTest {
//
////
////	@Value("${local.server.port}")
////	private int port;
////
//	private final static Logger log = LoggerFactory.getLogger(ExChangeGoodsMainTest.class);
//
//	public static void main(String[] agrs) {
//
//		String urls="http://localhost:8080/frontpage/beanGoods/exChangeGoods"
//				+ "?ticket_id=TICKET_ID&exChangeNum=EXCHAGE_NUM&goodsId=GOODS_ID"
//				+ "&ticketValue=TICKET_VALUE";
//		try{
//			Queue<String> queue = new ConcurrentLinkedQueue<String>();
//			for (int i = 0; i < 5; i++) {
//				urls=urls.replace("TICKET_ID","1106"+i).replace("EXCHAGE_NUM", "1")
//						.replace("GOODS_ID", "7").replace("TICKET_VALUE", "100");
//				queue.add(urls);
////				HttpRequestUtil.httpPost(urls);
//			}
//			Master master = new Master(new Worker(),2,queue);
//			master.execute();
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//	}
//
//
//}
//
//
//
