package com.icloud.modules.small.util;

import com.icloud.modules.small.vo.CartTotalVo;
import com.icloud.modules.small.vo.CartVo;

import java.util.List;

public class CartOrderUtil {
    /**
     * 计算商品总数 和总额
     * @return
     */
    public static CartTotalVo getTotal(List<CartVo> list){
        int totalAmout = 0;
        int totalNum = 0;
        CartTotalVo total = new CartTotalVo();
        for (CartVo temp:list){
            totalAmout+=temp.getPrice();
            totalNum+=temp.getNum();
        }
        total.setTotalAmout(totalAmout);
        total.setTotalNum(totalNum);
        return total;
    }
}
