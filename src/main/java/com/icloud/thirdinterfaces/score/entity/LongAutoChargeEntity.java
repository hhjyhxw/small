package com.icloud.thirdinterfaces.score.entity;

import com.icloud.common.MD5Utils;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * 龙币充值实体
 * 未注册用户充值，自动注册成为会员
 */
@Data
public class LongAutoChargeEntity extends LongBaseEntity {

    private String rechargetype;//充值类型积分系统分配)
    private String rechargeamount;//龙币充值金额


    /**
     * 获取数据签名
     * @return
     */
    @Override
    public String getMd5Sign(){
        StringBuffer sb = new StringBuffer();
        sb.append(this.getSid()).append(this.getSeq()).append(this.getUseraccount()).append(this.getAccounttype())
                .append(this.getRechargetype()).append(this.getRechargeamount()).append(this.getTimestamp()).append(this.getKey());
        String md5Sign = MD5Utils.MD5Encode(sb.toString(), "utf-8");
        return md5Sign;
    }

    /**
     * 获取请求参数
     * @return
     */
    @Override
    public Map<String, String> getRequestParamMap(){
        Map<String, String> params = new HashMap<String, String>();
        params.put("sid", this.getSid());
        params.put("seq", this.getSeq());
        params.put("useraccount", this.getUseraccount());
        params.put("accounttype", this.getAccounttype());
        params.put("rechargetype", this.getRechargetype());
        params.put("rechargeamount", this.getRechargeamount());
        params.put("timestamp", this.getTimestamp());
        params.put("skey", this.getMd5Sign());
        return params;
    }
}
