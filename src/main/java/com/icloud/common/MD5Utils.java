package com.icloud.common;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
/**
 * mad5加密   短信供应商前面加了一个0
 * 
 */
public class MD5Utils {
	
	public static String makeMD5(String password) {   
		 MessageDigest md;   
		   try {   
		    // 生成一个MD5加密计算摘要   
		    md = MessageDigest.getInstance("MD5");   
		    // 计算md5函数  设置字符集   UTF-8
		    md.update(password.getBytes("UTF-8"));   
		    // digest()最后确定返回md5 hash值，返回值为8为字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符   
		    // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值   
		    
		  //  String pwd = new BigInteger(1, md.digest()).toString(16);
		    byte[] b=md.digest();
		    StringBuffer pwd=new StringBuffer();
		    for (int i = 0; i < b.length; i++) {
		    	int c=b[i];
		    	if (c < 0)
		    		c += 256;
		    	if (c < 16)
		    	pwd.append("0");
				pwd.append(Integer.toHexString(c));
			}
		    // System.err.println(pwd);   
		    return pwd.toString();   
		   } catch (Exception e) {   
		    e.printStackTrace();   
		   }   
		   return password;   
	}
	 /** 
     * 将源字符串使用MD5加密为字节数组 
     * @param source 
     * @return 
     */  
    public static byte[] encode2bytes(String source) {  
        byte[] result = null;  
        try {  
            MessageDigest md = MessageDigest.getInstance("MD5");  
            md.reset();  
            md.update(source.getBytes("UTF-8"));  
            result = md.digest();  
        } catch (NoSuchAlgorithmException e) {  
            e.printStackTrace();  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
          
        return result;  
    }  
      
    /** 
     * 将源字符串使用MD5加密为32位16进制数 
     * @param source 
     * @return 
     */  
	  public static String encode2hex(String source) {  
	        byte[] data = encode2bytes(source);  
	  
	        StringBuffer hexString = new StringBuffer();  
	        for (int i = 0; i < data.length; i++) {  
	            String hex = Integer.toHexString(0xff & data[i]);  
	              
	            if (hex.length() == 1) {  
	                hexString.append('0');  
	            }  
	              
	            hexString.append(hex);  
	        }  
	          
	        return hexString.toString();  
	    }  
	  
	  
	  
	  private static String byteArrayToHexString(byte b[]) {
			StringBuffer resultSb = new StringBuffer();
			for (int i = 0; i < b.length; i++)
				resultSb.append(byteToHexString(b[i]));

			return resultSb.toString();
		}

		private static String byteToHexString(byte b) {
			int n = b;
			if (n < 0)
				n += 256;
			int d1 = n / 16;
			int d2 = n % 16;
			return hexDigits[d1] + hexDigits[d2];
		}

		public static String MD5Encode(String origin, String charsetname) {
			String resultString = null;
			try {
				resultString = new String(origin);
				MessageDigest md = MessageDigest.getInstance("MD5");
				if (charsetname == null || "".equals(charsetname))
					resultString = byteArrayToHexString(md.digest(resultString
							.getBytes()));
				else
					resultString = byteArrayToHexString(md.digest(resultString
							.getBytes(charsetname)));
			} catch (Exception exception) {
			}
			return resultString;
		}

		private static final String hexDigits[] = { "0", "1", "2", "3", "4", "5",
				"6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };

    public static void main(String[] args) {
        String temp1 = "121125d77655ee4b00118c7576159";//12+1+12+5d77655ee4b00118c7576159
        String temp2 = new Long(12)+""+new Long(1)+""+new Long(12)+"5d77655ee4b00118c7576159";
        System.out.println(encode2hex(temp1));
        System.out.println(encode2hex(temp2));
        System.out.println(encode2hex(new Long(12)+""+new Long(1)+""+new Long(12)+"5d77655ee4b00118c7576159"));


        System.out.println(temp1);
        System.out.println(temp2);
        System.out.println(new Long(12)+""+new Long(1)+""+new Long(12)+"5d77655ee4b00118c7576159");
    }
	
}
