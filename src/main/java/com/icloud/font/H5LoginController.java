package com.icloud.font;

import cn.hutool.captcha.generator.RandomGenerator;
import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.common.util.StringUtil;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.small.entity.SmallRetail;
import com.icloud.modules.small.service.SmallRetailService;
import com.icloud.modules.wx.entity.WxUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 前后端分离之h5登陆
 */
@Slf4j
@Controller
@RequestMapping("/frontpage/h5login")
public class H5LoginController {

    @Autowired
    private HttpServletRequest request;
    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private RedisService redisService;
    @Autowired
    private SmallRetailService smallRetailService;

    @RequestMapping("/login")
    public String login(String redirect_url,HttpServletResponse response){

        try {
            log.info("redirect_url=="+redirect_url);
            if(!StringUtil.checkStr(redirect_url)){
                log.info("redirect_url");
                return "modules/h5login/error";//
            }
            WxUser user = (WxUser)request.getSession().getAttribute("wx_user");
//            Map<String,String> map = myPropertitys.getThirdloginUrlMap();
//            if(!map.containsKey(fromType)){
//                log.info("未授权的请求地址");
//                return "modules/h5login/error";//
//            }
            List<SmallRetail> retailList = smallRetailService.list(new QueryWrapper<SmallRetail>().eq("user_id",user.getId().longValue()));
            log.info("loginUser:retailList==="+ JSON.toJSONString(retailList));
            String h5token = new RandomGenerator(12).generate();
//            redisService.set(MD5Utils.encode2hex(h5token),user,3000L);//兼容h5、APP 前端服务 登陆
            redisService.set(h5token,user,3000L);//兼容h5、APP 前端服务 登陆
            log.info("redirect_url=="+ redirect_url);
            //如果历史连接带上token,去掉
            if(redirect_url.indexOf("token")>=0){
                redirect_url =  redirect_url.replace("token","oldd");//
            }
            if(redirect_url.indexOf("?")>=0){
                redirect_url = redirect_url+"&token="+h5token;
            }else{
                redirect_url = redirect_url+"?token="+h5token;
            }
            if(!redirect_url.contains("supplierId") && retailList!=null && retailList.size()>0){
                redirect_url = redirect_url+"&supplierId="+retailList.get(0).getId();
            }
            log.info("最终redirect_url=="+ redirect_url);
            response.sendRedirect(redirect_url);
            return null;
        }catch (Exception e){
            e.printStackTrace();
        }
        return "modules/h5login/error";
    }

    @RequestMapping("/loginYaobao")
    public String loginYaobao(String redirect_url,String tempUrl,Long suplierId,String keeperOpenid,HttpServletResponse response){
        log.info("redirect_url=="+redirect_url);
        log.info("tempUrl=="+tempUrl);
        log.info("suplierId=="+ suplierId);
        log.info("keeperOpenid=="+ keeperOpenid);
        if(!StringUtil.checkStr(redirect_url)){
            log.info("redirect_url");
            return "modules/h5login/error";//
        }
        try {
            WxUser user = (WxUser)request.getSession().getAttribute("wx_user");
            String h5token = new RandomGenerator(12).generate();
            redisService.set(h5token,user,3000L);//兼容h5、APP 前端服务 登陆
            Object obj = smallRetailService.getById(suplierId);
            log.info("obj=="+ JSON.toJSONString(obj));
            SmallRetail smallRetail = null;
            if(obj!=null){
                smallRetail = (SmallRetail)obj;
                log.info("smallRetail=="+ JSON.toJSONString(smallRetail));
                if(smallRetail.getUserId()==null){
                    smallRetail.setUserId(user.getId().longValue());
                    boolean result = smallRetailService.updateById(smallRetail);
                    log.info("update_result=="+ JSON.toJSONString(result));
                }

            }
            //如果历史连接带上token,去掉
            if(redirect_url.indexOf("token")>=0){
                redirect_url =  redirect_url.replace("token","oldd");
            }
            if(redirect_url.indexOf("?")>=0){
                redirect_url = redirect_url+"&token="+h5token+"&keeperOpenid="+keeperOpenid+"&suplierId="+suplierId;
            }else{
                redirect_url = redirect_url+"?token="+h5token+"&keeperOpenid="+keeperOpenid+"&suplierId="+suplierId;
            }
            redirect_url = redirect_url.replace("?","#/"+tempUrl+"?");
            log.info("loginYaobao_redirect_url=="+ redirect_url);
            response.sendRedirect(redirect_url);
            return null;
        }catch (Exception e){
            e.printStackTrace();
        }
        return "modules/h5login/error";
    }
}
