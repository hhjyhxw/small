//package com.icloud;//package com.icloud;
//
//import com.dtflys.forest.http.ForestResponse;
//import com.icloud.common.MD5Utils;
//import com.icloud.thirdinterfaces.apiservice.BeanService;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=Application.class)
//public class ForestHttpBeanTest {
//
////
////	@Value("${local.server.port}")
////	private int port;
////
//    public static String url = "";
//    public static String queryFansBeansUrl="http://zl.haiyunzy.com/integral/integralManage!getUserIntegral.action";
//    public static String rechargeFansBeansUrl="http://zl.haiyunzy.com/integral/integralManage!addIntegral.action";
//    public static String  consumeFansBeansUrl="http://zl.haiyunzy.com/integral/integralManage!consumeIntegral.action";
//    public static String app_id="ldsc";
//    public static String app_key="ldscxslilpolkjafjkdsdf";
//
//    @Autowired
//    private BeanService beanService;
//
//	@Test
//	@Transactional
//	@Rollback(false)// 事务自动回滚，默认是true。可以不写
//	public void test() {
//	    String openid = "ocoMKt2a_9XrLt2NBG5CupS6THE4";
//        String signStr  =  app_id+openid+ app_key;
//        String signs = MD5Utils.encode2hex(signStr.toString());
//        String reuslt = beanService.queryFansBeans(queryFansBeansUrl,app_id,openid,app_key,signs);
//        System.out.println("result========="+reuslt);
//        ForestResponse<String> response = null;
//
//	}
//
//
//
//}
//
//
//
