package com.icloud.aspect;


import com.alibaba.fastjson.JSON;
import com.icloud.common.HttpContextUtils;
import com.icloud.common.IpUtil;
import javassist.*;
import javassist.bytecode.CodeAttribute;
import javassist.bytecode.LocalVariableAttribute;
import javassist.bytecode.MethodInfo;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by 512162086@qq.com on 2018/8/22 .
 * 日志切面，切入需要加日志的方法
 */
@Aspect
@Component
public class Log {

    public final static Logger log = LoggerFactory.getLogger(Log.class);
//            （* com.evan.crm.service.*.*（..））中几个通配符的含义：
//            |第一个 * —— 通配 随便率性返回值类型|
//            |第二个 * —— 通配包com.evan.crm.service下的随便率性class|
//            |第三个 * —— 通配包com.evan.crm.service下的随便率性class的随便率性办法|
//            |第四个 .. —— 通配 办法可以有0个或多个参数|

    @Pointcut("execution(* com.icloud.font.bsactivity.web.*.*(..))")
    public void webLog(){}

    @Around("webLog()")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        long beginTime = System.currentTimeMillis();
        //执行方法
        Object result = point.proceed();
        //执行时长(毫秒)
        long time = System.currentTimeMillis() - beginTime;
        printLog(point,time);
//        log.info("result=="+JSON.toJSONString(result));
        return result;
    }

    private void printLog(ProceedingJoinPoint point, long time){
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();

        WebLogVo logvo = new WebLogVo();
        //请求的方法名
        String className = point.getTarget().getClass().getName();
        String methodName = signature.getName();
        logvo.setMethod(className + "." + methodName + "()");

        //请求的参数
        Object[] args = point.getArgs();
        try{
            String classType = point.getTarget().getClass().getName();
            Class<?> clazz = Class.forName(classType);
            String clazzName = clazz.getName();
            //获取参数名称和值
            Map<String,Object > nameAndArgs = getFieldsName(this.getClass(),clazzName, methodName,args);
//            String params = JSON.toJSONString(args[0]);
            String params = JSON.toJSONString(nameAndArgs);
            logvo.setParams(params);
        }catch (Exception e){

        }

        //获取request
        HttpServletRequest request = HttpContextUtils.getHttpServletRequest();
        //设置IP地址
        logvo.setIp(IpUtil.getIpAddr(request));
        //用户名
        logvo.setTime(time);
        logvo.setCreateDate(new Date());
        log.info("requset_info=="+JSON.toJSONString(logvo));
    }

////    @After("webLog()")
//    public void after(){
//        System.out.println("执行方法后");
//    }
//
////    @AfterReturning("webLog()")
//    public void afterReturning(){
//        System.out.println("返回通知");
//    }
////    @AfterThrowing("webLog()")
//    public void AfterThrowing(){
//        System.out.println("异常通知");
//    }
//
////    @Around("webLog()")
//    public Object around(ProceedingJoinPoint pjp) throws Throwable{
//        System.out.println("环绕前");
//        System.out.println("签名:"+pjp.getSignature());
//        //执行目标方法
//        Object proceed = pjp.proceed();
//        System.out.println("环绕后");
//        return proceed;
//    }

    private Map<String,Object> getFieldsName(Class cls, String clazzName, String methodName, Object[] args) throws NotFoundException {
        Map<String,Object > map=new HashMap<String,Object>();

        ClassPool pool = ClassPool.getDefault();
        //ClassClassPath classPath = new ClassClassPath(this.getClass());
        ClassClassPath classPath = new ClassClassPath(cls);
        pool.insertClassPath(classPath);

        CtClass cc = pool.get(clazzName);
        CtMethod cm = cc.getDeclaredMethod(methodName);
        MethodInfo methodInfo = cm.getMethodInfo();
        CodeAttribute codeAttribute = methodInfo.getCodeAttribute();
        LocalVariableAttribute attr = (LocalVariableAttribute) codeAttribute.getAttribute(LocalVariableAttribute.tag);
        if (attr == null) {
            // exception
        }
        // String[] paramNames = new String[cm.getParameterTypes().length];
        int pos = Modifier.isStatic(cm.getModifiers()) ? 0 : 1;
//        for (int i = 0; i < cm.getParameterTypes().length; i++){
            for (int i = 0; i < 1; i++){
            map.put( attr.variableName(i + pos),args[i]);//paramNames即参数名
        }

        //Map<>
        return map;
    }


}
