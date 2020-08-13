//package com.icloud;//package com.icloud;
//
//import com.alibaba.fastjson.JSON;
//import com.icloud.common.ConfigUtil;
//import com.icloud.thirdinterfaces.score.entity.LongConsumeEntity;
//import com.icloud.thirdinterfaces.score.service.LongbiServiceImpl;
//import com.icloud.thirdinterfaces.score.utils.LongCoinUtil;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes= Application.class)
//public class LongCoinComsueTest {
//
//    @Autowired
//    private LongbiServiceImpl longbiServiceImpl;
//    @Autowired
//    private LongCoinUtil longCoinUtil;
//
//    @Test
//    public void apiTest(){
//        try {
//            LongConsumeEntity entity = new LongConsumeEntity();
//            entity.setSid(ConfigUtil.get("sid"));
//            entity.setSeq(longCoinUtil.getSerialNumber());
//            entity.setUseraccount("ocoMKt2a_9XrLt2NBG5CupS6THE4");
//            entity.setKey(ConfigUtil.get("key"));
//            entity.setAccounttype("2");
//            entity.setConsumetype(ConfigUtil.get("consumetype"));
//            entity.setConsumeamount("5");
//            entity.setTimestamp(longCoinUtil.getTimeStamp());
//
//            System.out.println("LongQueryEntity=="+ JSON.toJSONString(entity));
//
//            longbiServiceImpl.consume(entity.getRequestParamMap());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//
//}
