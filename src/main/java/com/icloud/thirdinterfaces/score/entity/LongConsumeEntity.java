package com.icloud.thirdinterfaces.score.entity;

import com.icloud.common.MD5Utils;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class LongConsumeEntity extends LongBaseEntity {
    private String consumetype;//消费类别类型(积分系统分配)
    private String consumeamount;//龙币消费金额

    /**
     * 获取签名
     * @return
     */
    @Override
    public String getMd5Sign(){
        StringBuffer sb = new StringBuffer();
        sb.append(this.getSid()).append(this.getSeq()).append(this.getUseraccount()).append(this.getAccounttype()).append(this.getConsumetype()).append(this.getConsumeamount()).append(this.getTimestamp()).append(this.getKey());
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
        params.put("consumetype", this.getConsumetype());
        params.put("consumeamount", this.getConsumeamount());
        params.put("timestamp", this.getTimestamp());
        params.put("skey", this.getMd5Sign());
        return params;
    }
}
