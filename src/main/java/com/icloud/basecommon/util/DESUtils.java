package com.icloud.basecommon.util;//package com.icloud.web.util;
//
//import java.security.SecureRandom;
//
//import javax.crypto.Cipher;
//import javax.crypto.SecretKey;
//import javax.crypto.SecretKeyFactory;
//import javax.crypto.spec.DESKeySpec;
//
//import org.apache.tomcat.util.codec.binary.Base64;
//
//
//
//
///**
// * DES 加密解密工具类
// * @author huangyl
// *
// */
//public class DESUtils {
//
//	private static String key = "d8192k123u4nth90";
//
//	/**
//	 * 加密
//	 * @param data
//	 * @return
//	 */
//	public static String encrypt(String data) {  //对string进行BASE64Encoder转换
//        byte[] bt = encryptByKey(data.getBytes(), key);
//        Base64 base64 = new Base64();
//        String strs = new String(base64.encode(bt));
//        return strs;
//    }
//
//	/**
//	 * 解密
//	 * @param data
//	 * @return
//	 * @throws Exception
//	 */
//	public static String decryptor(String data) throws Exception {  //对string进行BASE64Encoder转换
//        //sun.misc.BASE64Decoder base64en = new sun.misc.BASE64Decoder();
//        Base64 base64 = new Base64();;
//        byte[] bt = decrypt(base64.decode(data), key);
//
//        String strs = new String(bt);
//        return strs;
//    }
//
//	/**
//	 * 加密
//	 * @param datasource
//	 * @param key
//	 * @return
//	 */
//	private static byte[] encryptByKey(byte[] datasource, String key) {
//        try{
//            SecureRandom random = new SecureRandom();
//
//            DESKeySpec desKey = new DESKeySpec(key.getBytes());
//            //创建一个密匙工厂，然后用它把DESKeySpec转换成
//            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
//            SecretKey securekey = keyFactory.generateSecret(desKey);
//            //Cipher对象实际完成加密操作
//            Cipher cipher = Cipher.getInstance("DES");
//            //用密匙初始化Cipher对象
//            cipher.init(Cipher.ENCRYPT_MODE, securekey, random);
//            //现在，获取数据并加密
//            //正式执行加密操作
//            return cipher.doFinal(datasource);
//        }catch(Throwable e){
//            e.printStackTrace();
//        }
//        return null;
//    }
//
//	/**
//	 * 解密
//	 * @param src
//	 * @param key
//	 * @return
//	 * @throws Exception
//	 */
//	private static byte[] decrypt(byte[] src, String key) throws Exception {
//        // DES算法要求有一个可信任的随机数源
//        SecureRandom random = new SecureRandom();
//        // 创建一个DESKeySpec对象
//        DESKeySpec desKey = new DESKeySpec(key.getBytes());
//        // 创建一个密匙工厂
//        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
//        // 将DESKeySpec对象转换成SecretKey对象
//        SecretKey securekey = keyFactory.generateSecret(desKey);
//        // Cipher对象实际完成解密操作
//        Cipher cipher = Cipher.getInstance("DES");
//        // 用密匙初始化Cipher对象
//        cipher.init(Cipher.DECRYPT_MODE, securekey, random);
//        // 真正开始解密操作
//        return cipher.doFinal(src);
//    }
//
//	/*public static void main(String[] args) {
//		String pass = "1234567";
//		String encodePass = DESUtils.encrypt(pass);
//		System.out.println(pass + " 加密 => " + encodePass);
//
//		try {
//			System.out.println(encodePass + "解密 => " + DESUtils.decryptor(encodePass));
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}*/
//}
