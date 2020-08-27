package com.icloud.thirdinterfaces.apiservice;

import com.dtflys.forest.annotation.DataObject;
import com.dtflys.forest.annotation.DataVariable;
import com.dtflys.forest.annotation.Request;
import com.icloud.modules.small.vo.PreOrder;

public interface SmallCreateOrderApiService {
    @Request(
            url = "${url}",
            headers = {
                    "Content-Type: application/json",
                    "accessToken: v85xycypcxb2"
            },
            type="POST"
    )
    String createOrder(@DataVariable("url") String url, @DataObject PreOrder preOrder);
}
