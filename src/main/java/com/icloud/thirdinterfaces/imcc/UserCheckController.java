package com.icloud.thirdinterfaces.imcc;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.common.util.StringUtil;
import com.icloud.config.global.MyPropertitys;
import com.icloud.modules.retail.entity.TRetailConfirn;
import com.icloud.modules.retail.service.TRetailConfirnService;
import com.icloud.thirdinterfaces.imcc.util.IMSessionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/thirdInterfacePath/user")
@Slf4j
public class UserCheckController {

    @Autowired
    private RedisService redisService;
    @Autowired
    private TRetailConfirnService retailConfirnService;
    @Autowired
    private MyPropertitys myPropertitys;
    /**
     * 接受imcc用户认证事件推
     * @return
     */
    @RequestMapping("/checkUser")
    public String checkUser(HttpServletRequest request, HttpServletResponse response){
        try {

            BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
            String line = null;
            StringBuilder sb = new StringBuilder();
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            line = sb.toString();
            log.info("checkUser_param : "+line);
            if(!StringUtil.checkStr(line)){
                return null;
            }
            //系统级参数节点获取
            String systemXml = line.substring(line.indexOf("<system>"), line.indexOf("</system>") + 9);
            //用户openid
            String openid = IMSessionUtil.getXmlPropertites(systemXml, "imUserNumber");
            String sessionXml = line.substring(line.indexOf("<session>"), line.indexOf("</session>") + 10);
            Object obj = redisService.get(openid);
            log.info("缓存中获取用户信息:=="+ JSON.toJSONString(obj));
            TRetailConfirn user = null;
            if(obj==null){
                QueryWrapper<TRetailConfirn> queryWrapper = new QueryWrapper<TRetailConfirn>();
                queryWrapper.lambda().eq(TRetailConfirn::getOpenid,openid);
                user = (TRetailConfirn) retailConfirnService.getOne(queryWrapper);
                log.info("数据库中获取用户信息:=="+ JSON.toJSONString(user));
                redisService.set(openid,user,3000L);//3000秒
            }else{
                user = (TRetailConfirn) obj;
            }


//            user = new TRetailConfirn();
            //返回结果
            Map<String, Object> resultMap = new HashMap<String, Object>();
            Map<String,String> sessionMap = new HashMap<String, String>(1);
            String resultxml = null;
            if(user==null){
                resultMap.put(IMSessionUtil._CODE, "0");
                resultMap.put(IMSessionUtil._REASON,"success");
                //组装返回的连接
                String userLoginCheckUrl = "<$LINK_URL|点击进入登陆认证|"+myPropertitys.getUsercheckurl()+" $>";
//                userLoginCheckUrl = URLEncoder.encode(userLoginCheckUrl,"GBK");
                sessionMap.put("inputchooseresult", userLoginCheckUrl);
                resultMap.put(IMSessionUtil._SESSION_PROPERTIES, sessionMap);
                resultxml = IMSessionUtil.createXml(resultMap, true);//失败 返回认证地址
            }else{
                resultMap.put(IMSessionUtil._CODE, "0");
                resultMap.put(IMSessionUtil._REASON,"success");
                sessionMap.put("inputchooseresult","success");
                resultMap.put(IMSessionUtil._SESSION_PROPERTIES, sessionMap);
                resultxml = IMSessionUtil.createXml(resultMap, true);//成功 返回认证地址
            }
            response.setCharacterEncoding("gbk");
            try {
                response.setContentType("text;charset=gbk");
                PrintWriter out = response.getWriter();
                log.info("checkUser_result===:"+resultxml);
                out.write(resultxml);
            } catch (IOException e) {
                log.error("TIMCC ERROR" , e);
            }
            return null;

        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
