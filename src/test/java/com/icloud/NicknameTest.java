package com.icloud;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

public class NicknameTest {
    public static void main(String[] args) throws UnsupportedEncodingException {
        String nickname="%E9%98%BF%E6%9C%A8%E6%9C%A8";
        System.out.println("nickname==="+ URLDecoder.decode(nickname,"UTF-8"));
    }
}
