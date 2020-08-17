package com.icloud;

import com.github.pagehelper.autoconfigure.PageHelperAutoConfiguration;
import com.thebeastshop.forest.springboot.annotation.ForestScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.transaction.annotation.EnableTransactionManagement;


//@EnableAutoConfiguration
//@ComponentScan   //这两个注解可以使用SpringBootApplication替代
//@MapperScan("com.icloud.modules.*.dao")/** 扫描mybatis mapper接口 */
//@PropertySource({"classpath:config.properties","classpath:jdbc.properties"})
@EnableTransactionManagement/**启用注解事务管理**/
//@ServletComponentScan(value = "com.alibaba.druid.support.http.StatViewServlet")//servlet的扫描
/*对http API 接口进行实例化*/
@ForestScan(basePackages = "com.icloud.thirdinterfaces.apiservice")
@SpringBootApplication(exclude = PageHelperAutoConfiguration.class)
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {

        return application.sources(Application.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}