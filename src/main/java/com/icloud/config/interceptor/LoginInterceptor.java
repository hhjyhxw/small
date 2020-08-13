//package com.icloud.config.interceptor;
//
//
//import com.icloud.common.MD5Utils;
//import com.icloud.common.util.StringUtil;
//import com.icloud.config.global.Constants;
//import com.icloud.config.global.MyPropertitys;
//import com.icloud.modules.wx.entity.WxUser;
//import com.icloud.modules.wx.service.WxUserService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.BeanFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.context.support.WebApplicationContextUtils;
//import org.springframework.web.servlet.HandlerInterceptor;
//import org.springframework.web.servlet.ModelAndView;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.net.URLDecoder;
//import java.nio.charset.StandardCharsets;
//import java.util.Base64;
//import java.util.Date;
//
//
///**
// * 手机端全局拦截器
// */
//@Component
//public class LoginInterceptor implements HandlerInterceptor{
//
//	public final static Logger log = LoggerFactory.getLogger(LoginInterceptor.class);
//    @Autowired
//	private WxUserService wxUserService;
//    @Autowired
//    private MyPropertitys myPropertitys;
//	@Override
//	public void afterCompletion(HttpServletRequest reqeust, HttpServletResponse response, Object arg2, Exception arg3)
//			throws Exception {
//		// TODO Auto-generated method stub
//	}
//
//	@Override
//	public void postHandle(HttpServletRequest reqeust, HttpServletResponse response, Object arg2, ModelAndView arg3)
//			throws Exception {
//
//	}
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
//        /** 不缓存页面*/
//        response.setDateHeader("Expires", 0);
//        response.setHeader("Cache-Control", "no-cache");
//        response.setHeader("Pragma", "no-cache");
//
//        StringBuffer visiturl = new StringBuffer();
//        visiturl.append(request.getScheme() + "://"+request.getHeader("host")+request.getRequestURI());
//        //请求域名
//        if (request.getQueryString() != null) // 判断请求参数是否为空
//            visiturl.append("?" + request.getQueryString()); // 参数
//        log.info("visiturl====="+visiturl);
//
//        HttpSession session = request.getSession();
//        WxUser user = null;
//        Object uerobj =  session.getAttribute("wx_user");
//        if(null!=uerobj){
//            user=(WxUser) uerobj;
//            //用于其他方法获取用户信息
//            request.setAttribute(Constants.USER_KEY, user);
//            session.setAttribute("wx_user",user);
//            log.info("用户==="+user.getNickname()+"===已登录==="+user.getOpenid());
//            return true;
//        }else{
//            /*2=========================调用真龙接口获取=============================*/
//            //获取接口参数数据,并校验
//            String nickName = request.getParameter("nickName");
//            String headPhoto = request.getParameter("headPhoto");
//            String unionid = request.getParameter("unionid");
//            String openid = request.getParameter("openid");
//            String sign = request.getParameter("sign");
//            if(StringUtil.checkStr(openid) && StringUtil.checkStr(nickName)){
//                String newsign = "";
//                if(StringUtil.checkStr(unionid)){
//                    newsign = MD5Utils.encode2hex("openid="+openid+"&unionid="+unionid+"&key="+myPropertitys.getWx().getInfokey());
//                }else{
//                    newsign = MD5Utils.encode2hex("openid="+openid+"&key="+myPropertitys.getWx().getInfokey());
//                }
//                log.error("sign====="+sign+"&newsign===="+newsign);
//                if(!newsign.equals(sign)){
//                    log.error("签名错误,非法请求");
//                    return false;
//                }
//                nickName= URLDecoder.decode(nickName, "UTF-8");
//                log.info("LoginInterceptor_nickName==="+nickName);
//                headPhoto=URLDecoder.decode(headPhoto, "UTF-8");
////					nickName=EmotioUtil.resolveToByteFromEmoji(nickName);
////					nickName=EmotioUtil.filterEmoji(nickName);
//
//                WxUser beanFansParam = new WxUser();
//                beanFansParam.setOpenid(openid);
//                WxUser beanFansList =wxUserService.findByOpenId(openid);
//                if(beanFansList!=null){
//                    user = beanFansList;
//                    //更新
//                    if(!"0000".equals(nickName)){
//                        user.setNickname(nickName);
//                    }
//                    if(!"0000".equals(headPhoto)){
//                        user.setHeadimgurl(headPhoto);
//                    }
//                    wxUserService.updateById(user);
//                    //更新缓存
//                    request.getSession().setAttribute("wx_user",user);
//                    //用于给所有需要用户参数的方法传递
//                    request.setAttribute(Constants.USER_KEY, user);
//                    //图片访问路径
//                    log.info("用户==="+user.getNickname()+"===已登录==="+user.getOpenid());
//                    return true;
//                }
//                //数据库查询不到，则保存
//                user = new WxUser();
//                user.setOpenid(openid);
//                user.setNickname(nickName);
//                user.setHeadimgurl(headPhoto);
//                user.setUnionid(unionid);
//                user.setCreateTime(new Date());
//                wxUserService.save(user);
//                request.getSession().setAttribute("wx_user",user);
//                log.info("用户==="+user.getNickname()+"===已登录==="+user.getOpenid());
//                return true;
//            }else{
//                /*3、===============从redis 和数据库 都获取不到 ，那么从接口获取=====================*/
//                //调用接口获取用户数据
//                String state = Base64.getEncoder()
//                        .encodeToString(visiturl.toString().getBytes(StandardCharsets.UTF_8))
//                        .replace("=", "-").replace("/", "_");
//                String getUserInfo = myPropertitys.getWx().getGetUserInfo();
////                String redirectUrl = ConfigUtil.get("getUserInfo")
////                        .replace("APPID", myPropertitys.getWx().getAppid())
////                        .replace("STATE", state);
//                String redirectUrl = getUserInfo
//                        .replace("APPID", myPropertitys.getWx().getAppid())
//                        .replace("STATE", state);
//                response.sendRedirect(redirectUrl);
//                return false;
//            }
//        }
//    }
//
//	public Object getBean(String beanName,HttpServletRequest request){
//		BeanFactory factory = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
//	    return factory.getBean(beanName);
//	}
//
//}
