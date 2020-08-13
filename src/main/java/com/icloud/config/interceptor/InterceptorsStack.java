package com.icloud.config.interceptor;

import com.icloud.config.global.MyPropertitys;
import com.icloud.config.resolver.LoginUserHandlerMethodArgumentResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.charset.Charset;
import java.util.List;

@Configuration
class InterceptorsStack implements WebMvcConfigurer {

    @Autowired
    private LoginUserHandlerMethodArgumentResolver loginUserHandlerMethodArgumentResolver;
    @Autowired
    private XcxLoginInterceptor xcxLoginInterceptor;
    @Autowired
    private PermissionsInterceptor permissionsInterceptor;
    @Autowired
    private WxUserLoginInterceptor wxUserLoginInterceptor;
    @Autowired
    private LoginInterceptor_local loginInterceptor_local;


    @Autowired
	private MyPropertitys myPropertitys;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(permissionsInterceptor).addPathPatterns(new String[] { "/sys/**" });
     registry.addInterceptor(xcxLoginInterceptor).addPathPatterns(new String[]{"/xcxpath/**"}).excludePathPatterns(new String[]{"/xcxpath/xcxUserLogin/**"});
//        registry.addInterceptor(new ThirdInterfaceInterceptor()).addPathPatterns(new String[] { "/thirdInterfacePath/**" });
        //h5端拦截器
        //本地
        if("local".equals(myPropertitys.getActivein())){
            registry.addInterceptor(loginInterceptor_local).addPathPatterns(new String[]{"/frontpage/**"});
        }else{
            registry.addInterceptor(wxUserLoginInterceptor).addPathPatterns(new String[]{"/frontpage/**"});
        }

    }

    /**
     * 参数处理拦截
     *
     * @param argumentResolvers
     */
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(loginUserHandlerMethodArgumentResolver);
    }

    /**
     * 静态资源处理
     *
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/statics/**").addResourceLocations("classpath:/statics/");
    }

    @Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        StringHttpMessageConverter converter = new StringHttpMessageConverter(Charset.forName("UTF-8"));
        return converter;
    }

    /**
     * 设置全局编码
     * @param converters
     */
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(responseBodyConverter());
    }
//    @Override
//    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
//        configurer.favorPathExtension(false);
//    }



//    @Bean
//    public InternalResourceViewResolver viewResolver() {
//        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
//        viewResolver.setViewClass(HandleResourceViewExists.class); //设置检查器
//        viewResolver.setPrefix("/");
//        viewResolver.setSuffix(".ftl");
//        viewResolver.setOrder(1);
//        viewResolver.setContentType("text/html;charset=UTF-8");
//        return viewResolver;
//    }
}
