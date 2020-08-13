/**
 * @author
 * @version
 * 2018年2月8日 下午2:46:03
 */
package com.icloud.common;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * 类名称: JsonToMapUtil
 * 类描述: 
 * 创建人: zhangdehai
 * 创建时间:2018年2月8日 下午2:46:03
 */
public class JsonToMapUtil {

	public static Map getMapFromJson(String jsonString) {
		//创建 json 对象
		JSONObject jsonObject = JSON.parseObject(jsonString);
		
		//创建map 对象
		Map map = new HashMap();
		//循环迭代数据
		for(Iterator iter = jsonObject.keySet().iterator(); iter.hasNext();) {
			String key = (String) iter.next();
			map.put(key, jsonObject.get(key));
		}
		return map;
	}
}
