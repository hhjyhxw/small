package com.icloud.thirdinterfaces.apiservice;

import com.dtflys.forest.annotation.DataObject;
import com.dtflys.forest.annotation.DataVariable;
import com.dtflys.forest.annotation.Request;
import com.icloud.common.BaseMessagaeVo;

/**
 * 零售户信息同步接口
 */
public interface CommonMessageService {
    @Request(
            url = "${url}",
            headers = {
                    "Content-Type: application/json",
            },
            type="POST"
    )
    String sysRetailInfo(@DataVariable("url") String url, @DataObject BaseMessagaeVo vo);

}
