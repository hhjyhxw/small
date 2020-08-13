//package com.icloud;
//
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.HttpMessageNotReadableException;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes=Application.class)
//@AutoConfigureMockMvc
//public class QueryTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Test
//    public void apiTest(){
//        try {
//            MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/hello"))
//                    .andExpect(status().isOk()).andReturn();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//    @Test
//    public void jsonTest(){
//        String requestBody = "{\n" +
//                "\t\"village\": \"\",\n" +
//                "\t\"title\": \"\",\n" +
//                "\t\"houseType\": \"1\",\n" +
//                "\t\"status\": 1\n" +
//                "}";
//        try {
//            mockMvc.perform(post("/xcxpath/houseQuery/list").contentType(MediaType.APPLICATION_JSON).content(requestBody)
//                    .accept(MediaType.APPLICATION_JSON)) //执行请求
//                        .andExpect(content().contentType(MediaType.APPLICATION_JSON)); //验证响应contentType
////                        .andExpect(jsonPath("$.id").value(1)); //使用Json path验证JSON 请参考http://goessner.net/articles/JsonPath/
//                            String errorBody = "{id:1, name:zhang}";
//                            MvcResult result = mockMvc.perform(post("/xcxpath/houseQuery/list")
//                                    .contentType(MediaType.APPLICATION_JSON).content(errorBody)
//                                    .accept(MediaType.APPLICATION_JSON)) //执行请求
//                                    .andExpect(status().isBadRequest()) //400错误请求
//                                    .andReturn();
//
//                 Assert.assertTrue(HttpMessageNotReadableException.class.isAssignableFrom(result.getResolvedException().getClass()));//错误的请求内容体
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//}
