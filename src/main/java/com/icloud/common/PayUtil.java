package com.icloud.common;

public class PayUtil {
    public static String getFinalmoney(String money){
        float sessionmoney = Float.parseFloat(money);
        String finalmoney = String.format("%.2f", sessionmoney);
        finalmoney = finalmoney.replace(".", "");
        return String.valueOf(Integer.parseInt(finalmoney));
    }
}
