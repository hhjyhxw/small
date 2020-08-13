package com.icloud.font.retail;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.icloud.basecommon.service.redis.RedisService;
import com.icloud.common.IpUtil;
import com.icloud.common.R;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.retail.entity.TRetailConfirn;
import com.icloud.modules.retail.service.TRetailConfirnService;
import com.icloud.modules.wx.entity.WxUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * imcc用户登陆认证
 */
@Controller
@RequestMapping("/frontpage/retail/userLogin")
public class UserLoginController {

    private Logger log = LoggerFactory.getLogger(getClass());
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;

    @Autowired
    private TRetailConfirnService retailConfirnService;

    @Autowired
    private RedisService redisService;

    @RequestMapping("/tologinpage")
    public String tologinpage(){
        return "modules/front/retail/tologinpage";
    }

    @RequestMapping("/login")
    @ResponseBody
    public R login(String userName,String passwd){
        try {
            WxUser user = (WxUser) request.getSession().getAttribute("wx_user");
            log.info("login_params: userName=y="+ userName+"; passwd=="+passwd);//密码添加用户的时候MD5加密；传入参数时页面加密
            if(!StringUtil.checkStr(userName)){
                return R.error("用户名不能为空");
            }
            if(!StringUtil.checkStr(passwd)){
                return R.error("密码名不能为空");
            }
            QueryWrapper<TRetailConfirn> queryWrapper = new QueryWrapper<TRetailConfirn>();
            queryWrapper.lambda().eq(TRetailConfirn::getUserName,userName);
            List<TRetailConfirn> list = retailConfirnService.list(queryWrapper);
            if(list==null || list.size()<=0){
                log.info("用户不存在");
                return R.error("用户不存在");
            }
            TRetailConfirn retail = list.get(0);
            if(!passwd.equals(list.get(0).getPasswd())){
                log.info("密码不正确");
                return R.error("密码不正确");
            }
            if(StringUtil.checkStr(retail.getOpenid()) && !retail.getOpenid().equals(user.getOpenid())){
                log.info("当前登陆账户已绑定其他微信账户");
                return R.error("当前登陆账户已绑定其他微信账户");
            }
            retail.setOpenid(user.getOpenid());
            retail.setModifyTime(new Date());
            retail.setLastLoginIp(IpUtil.getIpAddr(request));
            retailConfirnService.updateById(retail);
            //存储改用户到redis
            redisService.set(user.getOpenid(),retail,3000L);//3000秒
            log.info("登陆成功:=="+userName+"; openid=="+user.getOpenid());
            return R.ok();
        } catch (Exception e) {
            e.printStackTrace();
            log.info("login_result="+ e.getMessage());
            return R.error(e.getMessage());
        }
    }

}