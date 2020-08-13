package com.icloud.basecommon.util;

/**
 * Created by 512162086@qq.com on 2018/10/11 .
 */
public class ParamCheckUtil {

    /**
     * 不为空，大于0 返回true
     * @param param
     * @return
     */
    public static boolean checkLong(Long param){
        if(param==null){
            return false;
        }
        if(param<=0){
            return false;
        }
        return true;
    }

    /**
     * 不为空，大于0 返回true
     * @param param
     * @return
     */
    public static boolean checkInteger(Integer param){
        if(param==null){
            return false;
        }
        if(param<=0){
            return false;
        }
        return true;
    }
}
