//package com.icloud.config.filter;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Configuration
//public class RequserAgainFilter extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        // 防止流读取一次后就没有了, 所以需要将流继续写出去
//        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
//        ServletRequest requestWrapper = new  BodyReaderHttpServletRequestWrapper(httpServletRequest);
//        //最终的塞的操作
//        filterChain.doFilter(requestWrapper, response);
//    }
//
//}