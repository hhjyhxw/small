package com.icloud.thirdinterfaces.apiservice;

import com.dtflys.forest.annotation.DataObject;
import com.dtflys.forest.annotation.DataVariable;
import com.dtflys.forest.annotation.Request;
import com.icloud.modules.small.vo.PreOrder;
import org.apache.ibatis.annotations.Param;

public interface SmallCreateOrderApiService {
    @Request(
            url = "${url}",
            headers = {
                    "Content-Type: application/json",
                    "accessToken: as02qhxz3kea"
            },
            type="POST"
    )
    String createOrder(@DataVariable("url") String url, @DataObject PreOrder preOrder);


    @Request(
            url = "${url}",
            headers = {
//                    "Content-Type: application/json",
                    "accessToken: on2dna7ayhy9"
            },
            type="GET"
    )
    String orderlist(@DataVariable("url") String url, @Param("pageNum") Integer pageNum, @Param("pageSize")Integer pageSize);
}
