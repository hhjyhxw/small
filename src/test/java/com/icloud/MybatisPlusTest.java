//package com.icloud;
//
//import com.icloud.dao.hy.HyAccountDetailMapper;
//import com.icloud.model.hy.HyAccountDetail;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.List;
//
//@RunWith(value = SpringRunner.class)
//@SpringBootTest(classes=BeanApplication.class)
//public  class MybatisPlusTest {
//
//    @Autowired
//    private HyAccountDetailMapper hyAccountDetailMapper;
//
//    @Test
//    public void testSelect() {
//        System.out.println(("----- selectAll method test ------"));
//        HyAccountDetail hyAccountDetail = hyAccountDetailMapper.selectByPrimaryKey(1L);
//        System.out.println(hyAccountDetail+"==============");
//
//    }
//
//}