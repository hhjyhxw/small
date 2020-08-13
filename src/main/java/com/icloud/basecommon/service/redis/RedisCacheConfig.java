package com.icloud.basecommon.service.redis;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icloud.config.global.MyPropertitys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieHttpSessionIdResolver;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.HttpSessionIdResolver;

import java.lang.reflect.Method;

@Configuration
@EnableCaching
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1600, redisNamespace = "spring:session:small")//跟配置一致 mypropertis session namespace
public class RedisCacheConfig extends CachingConfigurerSupport {

    @Autowired
    private MyPropertitys myPropertitys;
	/**
	 * 生成key的策略
	 *
	 * @return
	 */
	@Bean
	public KeyGenerator keyGenerator() {
		return new KeyGenerator() {
			@Override
			public Object generate(Object target, Method method, Object... params) {
				StringBuilder sb = new StringBuilder();
				sb.append(target.getClass().getName());
				sb.append(method.getName());
				for (Object obj : params) {
					sb.append(obj.toString());
				}
				return sb.toString();
			}
		};
	}

    /*要启用spring缓存支持,需创建一个 CacheManager的 bean，CacheManager 接口有很多实现，这里Redis 的集成，用 RedisCacheManager这个实现类 
    Redis 不是应用的共享内存，它只是一个内存服务器，就像 MySql 似的， 
    我们需要将应用连接到它并使用某种“语言”进行交互，因此我们还需要一个连接工厂以及一个 Spring 和 Redis 对话要用的 RedisTemplate， 
    这些都是 Redis 缓存所必需的配置，把它们都放在自定义的 CachingConfigurerSupport 中 
     */ 
	@SuppressWarnings("rawtypes")
//	@Bean
//	public CacheManager cacheManager(RedisTemplate redisTemplate) {
//		RedisCacheManager rcm = new RedisCacheManager(redisTemplate);
//		// 设置缓存过期时间
//		rcm.setDefaultExpiration(3000);//秒
//		// 设置value的过期时间
//		/*Map<String, Long> map = new HashMap<String, Long>();
//		map.put("test", 3000L);
//		rcm.setExpires(map);*/
//		return rcm;
//	}

	/**
	 * RedisTemplate配置
	 * 
	 * @param factory
	 * @return
	 */
	@Bean
	public RedisTemplate<String, String> redisTemplate(RedisConnectionFactory factory) {
		StringRedisTemplate template = new StringRedisTemplate(factory);
		Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);
		ObjectMapper om = new ObjectMapper();
		om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
		om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
		jackson2JsonRedisSerializer.setObjectMapper(om);
		template.setValueSerializer(jackson2JsonRedisSerializer);
		template.afterPropertiesSet();
		return template;
	}


    //Cookie配置
    @Bean
    public CookieSerializer cookieSerializer(){
        DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
        cookieSerializer.setCookieName(myPropertitys.getSession().getCookieName());//sessionId名称
        return  cookieSerializer;
    }

    /**
     *  配置cookie解析sessionId
     * @return
     */
    @Bean
    public HttpSessionIdResolver httpSessionIdResolver() {
        CookieHttpSessionIdResolver cookieHttpSessionIdResolver = new CookieHttpSessionIdResolver();
        DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
        cookieSerializer.setCookieName(myPropertitys.getSession().getCookieName());//cookies名称
        cookieSerializer.setDomainName(myPropertitys.getSession().getParentDomainName());
        cookieSerializer.setCookiePath("/");
        cookieSerializer.setUseBase64Encoding(false);
        cookieHttpSessionIdResolver.setCookieSerializer(cookieSerializer);
        return cookieHttpSessionIdResolver;
    }

}
