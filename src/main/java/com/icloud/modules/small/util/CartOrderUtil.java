package com.icloud.modules.small.util;

import com.icloud.modules.small.vo.CartTotalVo;
import com.icloud.modules.small.vo.CartVo;

import java.math.BigDecimal;
import java.util.List;

public class CartOrderUtil {
    /**
     * 计算商品总数 和总额
     * @return
     */
    public static CartTotalVo getTotal(List<CartVo> list){
        BigDecimal totalAmout = new BigDecimal(0);
        int totalNum = 0;
        CartTotalVo total = new CartTotalVo();
        for (CartVo temp:list){
            totalAmout = totalAmout.add(temp.getPrice().multiply(new BigDecimal(temp.getNum())).setScale(2,BigDecimal.ROUND_HALF_UP));
//            totalAmout+=temp.getPrice()*temp.getNum();
            totalNum+=temp.getNum();
        }
        total.setTotalAmout(totalAmout);
        total.setTotalNum(totalNum);
        return total;
    }
}
