package com.icloud.basecommon.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 模拟表单上传图文素材
 * @author z
 *
 */
public class FormUploadMultimediaUtil {

	private static Logger logger = LoggerFactory.getLogger(FormUploadMultimediaUtil.class);
	/**
	 * 
	 * @param postUrl 请求连接
	 * @param filePath 图片绝对路径
	 * @return
	 */
    public String postFile(String postUrl, String filePath) {
       File file = new File(filePath);
       logger.error("filePath========================="+filePath);
       logger.error("!file.exists()=================="+!file.exists());
       if (!file.exists())
           return null;
       String result = "";
       try {
           URL url1 = new URL(postUrl);
           HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
           conn.setConnectTimeout(5000);
           conn.setReadTimeout(30000);
           conn.setDoOutput(true);
           conn.setDoInput(true);
           conn.setUseCaches(false);
           conn.setRequestMethod("POST");
           conn.setRequestProperty("Connection", "Keep-Alive");
           conn.setRequestProperty("Cache-Control", "no-cache");
           String boundary = "-----------------------------" + System.currentTimeMillis();
           conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

           OutputStream output = conn.getOutputStream();
           output.write(("--" + boundary + "\r\n").getBytes());
           output.write(
                   String.format("Content-Disposition: form-data; name=\"media\"; filename=\"%s\"\r\n", file.getName())
                           .getBytes());
           output.write("Content-Type: image/jpeg \r\n\r\n".getBytes());
           byte[] data = new byte[1024];
           int len = 0;
           FileInputStream input = new FileInputStream(file);
           while ((len = input.read(data)) > -1) {
               output.write(data, 0, len);
           }
           output.write(("\r\n--" + boundary + "\r\n\r\n").getBytes());
           output.flush();
           output.close();
           input.close();
           InputStream resp = conn.getInputStream();
           StringBuffer sb = new StringBuffer();
           while ((len = resp.read(data)) > -1)
               sb.append(new String(data, 0, len, "utf-8"));
           resp.close();
           result = sb.toString();
           logger.error("result==="+result);
       } catch (IOException e) {
           logger.error("postFile数据传输失败");
           e.printStackTrace();
       }catch(Exception ex){
    	   logger.error("postFile数据传输失败");
    	   ex.printStackTrace();
       }
       return result;
   }


    /**
     *
     * @param postUrl 请求连接
     * @param imgUrl 图片URL
     * @return
     */
    public String postFile(String postUrl, String imgUrl,String imageName) {

        String result = "";
        try {
            URL url1 = new URL(postUrl);
            HttpURLConnection conn = (HttpURLConnection) url1.openConnection();
            conn.setConnectTimeout(5000);
            conn.setReadTimeout(30000);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Connection", "Keep-Alive");
            conn.setRequestProperty("Cache-Control", "no-cache");
            String boundary = "-----------------------------" + System.currentTimeMillis();
            conn.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

            OutputStream output = conn.getOutputStream();
            output.write(("--" + boundary + "\r\n").getBytes());
            output.write(
                    String.format("Content-Disposition: form-data; name=\"media\"; filename=\"%s\"\r\n", imageName)
                            .getBytes());
            output.write("Content-Type: image/jpeg \r\n\r\n".getBytes());
            byte[] data = getByteData(imgUrl);
                output.write(data, 0, data.length);
            output.write(("\r\n--" + boundary + "\r\n\r\n").getBytes());
            output.flush();
            output.close();
            InputStream resp = conn.getInputStream();
            StringBuffer sb = new StringBuffer();
            int len = 0;
            while ((len = resp.read(data)) > -1)
                sb.append(new String(data, 0, len, "utf-8"));
            resp.close();
            result = sb.toString();
            logger.error("result==="+result);
        } catch (IOException e) {
            logger.error("postFile数据传输失败");
            e.printStackTrace();
        }catch(Exception ex){
            logger.error("postFile数据传输失败");
            ex.printStackTrace();
        }
        return result;
    }


    public byte[] getByteData(String imgUrl) throws Exception{
        URL url = new URL(imgUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(1000);//超时提示1秒=1000毫秒
        InputStream inStream = conn.getInputStream();//获取输出流
        byte[] data = readInputStream(inStream);
        return data;
    }

    //readInputStream方法--------------------------------------------------
    private static byte[] readInputStream(InputStream inStream) throws Exception {
        ByteArrayOutputStream outStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];//转换为二进制
        int len = 0;
        while ((len = inStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, len);
        }
        return outStream.toByteArray();
    }
}
