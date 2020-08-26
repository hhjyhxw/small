package com.icloud;//package com.icloud;//package com.icloud;

import com.dtflys.forest.http.ForestResponse;
import com.icloud.modules.small.vo.PreOrder;
import com.icloud.thirdinterfaces.apiservice.SmallCreateOrderApiService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringRunner.class)
@SpringBootTest(classes=Application.class)
public class ForestHttpCreateOrderTest {

//
//	@Value("${local.server.port}")
//	private int port;
//
    public static String url = "";
    public static String createOrderUrl="http://zl.haiyunzy.com/small/api/order/createOrder";


    @Autowired
    private SmallCreateOrderApiService smallCreateOrderApiService;

	@Test
	@Transactional
	@Rollback(false)// 事务自动回滚，默认是true。可以不写
	public void test() {
        PreOrder preOrder = new PreOrder();
        preOrder.setAddressId(5L);
        preOrder.setSkuId(new Long[]{1L});
        preOrder.setNum(new Long[]{1L});
        preOrder.setSupplierId(1L);
        preOrder.setMemo("快快发货!");
        preOrder.setTypes("cart");
        preOrder.setPayType("线下支付");
        String reuslt = smallCreateOrderApiService.createOrder(createOrderUrl,preOrder);
        System.out.println("result========="+reuslt);
        ForestResponse<String> response = null;

	}



}



