package com.icloud.wiki.utils;

import java.util.regex.Pattern;

public class NumberUtil {
    public static boolean isInteger(String str) {
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        return pattern.matcher(str).matches();
    }
}
