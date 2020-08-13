//package com.icloud.config.datacache;
//
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.cache.ehcache.EhCacheCacheManager;
//import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//
///**
// * @filename      : CacheConfiguration.java
// * @description   : 
// * @author        : zdh
// * @create        : 2017年5月27日 下午3:44:59   
// * @copyright     : zhumeng.com@crowd-funding
// *
// * Modification History:
// * Date             Author       Version
// * --------------------------------------
// */
//@Configuration
////标注启动了缓存
//@EnableCaching
//public class CacheConfiguration {
//
// /*
//  * ehcache 主要的管理器
//  */
// @Bean(name = "appEhCacheCacheManager")
// public EhCacheCacheManager ehCacheCacheManager(EhCacheManagerFactoryBean bean){
//     return new EhCacheCacheManager (bean.getObject ());
// }
//
// /*
//  * 据shared与否的设置,Spring分别通过CacheManager.create()或new CacheManager()方式来创建一个ehcache基地.
//  */
// 
// @Bean
// public EhCacheManagerFactoryBean ehCacheManagerFactoryBean(){
//     EhCacheManagerFactoryBean cacheManagerFactoryBean = new EhCacheManagerFactoryBean ();
//     cacheManagerFactoryBean.setConfigLocation (new ClassPathResource ("data-ehcache.xml"));
//     cacheManagerFactoryBean.setShared (true);
//     return cacheManagerFactoryBean;
// }
// 
//}
