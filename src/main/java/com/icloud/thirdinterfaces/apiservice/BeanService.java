package com.icloud.thirdinterfaces.apiservice;

import com.dtflys.forest.annotation.DataParam;
import com.dtflys.forest.annotation.DataVariable;
import com.dtflys.forest.annotation.Request;

/**
 * 乐豆商城相关接口
 */
public interface BeanService {

    @Request(
            url = "${url}",
            headers = "Accept: text/plan",
            type="POST"
    )
    String queryFansBeans(@DataVariable("url") String url, @DataParam("app_id") String app_id,
                          @DataParam("openid") String openid,
                          @DataParam("app_key") String app_key,
                          @DataParam("sign") String sign);

}
