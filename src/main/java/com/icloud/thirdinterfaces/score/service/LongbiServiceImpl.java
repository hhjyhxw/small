package com.icloud.thirdinterfaces.score.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.icloud.thirdinterfaces.score.utils.LongCoinUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LongbiServiceImpl {
    private final static Logger log = LoggerFactory.getLogger(LongbiServiceImpl.class);

    public static Map<String, String> codeMap = new HashMap<String, String>();

    public static Map<String, String> getCodeMap() {
        return codeMap;
    }

    public static void setCodeMap(Map<String, String> codeMap) {
        LongbiServiceImpl.codeMap = codeMap;
    }


    static {
        codeMap.put("000000", "处理成功");
        codeMap.put("200001", "参数不全");
        codeMap.put("200002", "参数格式不正确	");
        codeMap.put("200003", "签名无效");
        codeMap.put("200004", "时间戳超时");
        codeMap.put("200005", "流水号重复");
        codeMap.put("200006", "来源不合法（IP鉴权失败）");
        codeMap.put("200007", "请求频繁");
        codeMap.put("200008", "系统维护时间段");
        codeMap.put("300001", "用户不存在");
        codeMap.put("300002", "超过单次充值最大金额");
        codeMap.put("300003", "超过单个会员每日累计最大充值金额");
        codeMap.put("300004", "超过单次消耗最大金额");
        codeMap.put("300005", "超过单个会员每日累计最大消耗金额");
        codeMap.put("300006", "余额不足");
        codeMap.put("300007", "Unionid已与其他用户关联");
        codeMap.put("300100", "充值类别不存在");
        codeMap.put("300101", "消耗类别不存在");
        codeMap.put("300201", "凭证不存在");
        codeMap.put("300202", "凭证已失效");
        codeMap.put("999999", "未定义错误");
    }

    @Autowired
    private  LongCoinUtil longCoinUtil;


	/**
	 * 龙币查询
	 * @param params
	 * @return
	 */
	public JSONObject queryLongbi(Map<String, String> params) {
        log.error("龙币查询param====="+JSON.toJSONString(params));
		String result = longCoinUtil.sendRequest(params, longCoinUtil.getQueryUrl());
		log.error("龙币查询result====="+result);
		if(result==null){
			return	null;
		}
		return JSON.parseObject(result);
	}

	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public JSONObject recharge(Map<String, String> params) throws Exception {
        log.error("龙币充值param====="+JSON.toJSONString(params));
        String result = longCoinUtil.sendRequest(params, longCoinUtil.getRechargeUrl());
        log.error("龙币充值result====="+result);
        if(result==null){
            return	null;
        }
        return JSON.parseObject(result);
	}

	/**
	 * 龙币消费接口
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public JSONObject consume(Map<String, String> params) throws Exception {
        log.error("龙币消费param====="+JSON.toJSONString(params));
        String result = longCoinUtil.sendRequest(params, longCoinUtil.getConsumeUrl());
        log.error("龙币消费result====="+result);
        if(result==null){
            return	null;
        }
        return JSON.parseObject(result);
	}

}
