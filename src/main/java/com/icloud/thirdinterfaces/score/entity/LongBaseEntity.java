package com.icloud.thirdinterfaces.score.entity;

import com.icloud.common.MD5Utils;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * 龙币充值消费查询基本参数
 */
@Data
public class LongBaseEntity {
    private String sid;//商户号（设备号）
    private String seq;//交易流水
    private String useraccount;//用户账户
    private String accounttype;//账户类型（1、手机号码 2、微信openId 3、微信unionId）
    private String timestamp;//交易时间戳
    private String key;//用于签名的key
    private String skey;//sign （签名）
    private String fromType = "1";//来自哪个应用 1、百色活动 2、.......

    /**
     * 获取
     * @return
     */
    public String getMd5Sign(){
        StringBuffer sb = new StringBuffer();
        sb.append(this.getSid()).append(this.getSeq()).append(this.getUseraccount()).append(this.getAccounttype()).append(this.getTimestamp()).append(this.getKey());
        String md5Sign = MD5Utils.MD5Encode(sb.toString(), "utf-8");
        return md5Sign;
    }

    /**
     * 获取请求参数
     * @return
     */
    public Map<String, String> getRequestParamMap(){
        Map<String, String> params = new HashMap<String, String>();
        params.put("sid", this.getSid());
        params.put("seq", this.getSeq());
        params.put("useraccount", this.getUseraccount());
        params.put("accounttype", this.getAccounttype());
        params.put("timestamp", this.getTimestamp());
        params.put("skey", this.getMd5Sign());
        return params;
    }

}
