package com.icloud.thirdinterfaces.apiservice;

import com.dtflys.forest.annotation.DataObject;
import com.dtflys.forest.annotation.DataVariable;
import com.dtflys.forest.annotation.Request;
import com.icloud.modules.small.vo.card.CardReceiveParamVo;

/**
 * 领取卡券接口
 */
public interface CardReceiveService {
    @Request(
            url = "${url}",
            headers = {
                    "Content-Type: application/json",
            },
            type="POST"
    )
    String getCard(@DataVariable("url") String url, @DataObject CardReceiveParamVo vo);

}
