package com.icloud.common.sms;

import org.springframework.stereotype.Component;

import java.util.Random;

/**
 * @filename      : VerifyCodeGenerator.java
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 * 
 */
@Component
public class VerifyCodeGenerator {
	private static final VerifyCodeGenerator generator = new VerifyCodeGenerator();

	    private final int CODE_LENGTH = 6; 

	    private final String RAND_RANGE = "1234567890" ;

	     
	    private final char[] CHARS = RAND_RANGE.toCharArray(); 
	     
	    private Random random = new Random();
	     
	    private VerifyCodeGenerator(){ } 
	     
	    public static VerifyCodeGenerator getInstance(){ 
	        return generator; 
	    } 
	     
	    /**
         * 获取随机字符串
	     * @return
	     */
	    public String getRandString(){
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < CODE_LENGTH; i++) 
	            sb.append(CHARS[random.nextInt(CHARS.length)]); 
	        return sb.toString(); 
	    } 
	    
	    /**
	     * 获取指定长度随机符串
	     * @autor zhanghaitao
	     * @param specifiedLength
	     * @return
	     */
	    public String getRandString(int specifiedLength){
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < specifiedLength; i++) 
	            sb.append(CHARS[random.nextInt(CHARS.length)]); 
	        return sb.toString(); 
	    } 
}
