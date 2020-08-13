package com.icloud.basecommon.web.upload;

import com.alibaba.fastjson.JSONArray;
import com.icloud.common.ConfigUtil;
import com.icloud.common.util.AccessTokenAndJsapiTicketUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
/**
 * 类名称: AcquireUserinfoUtil
 * 类描述: 微信相关接口工具
 * 创建人: zhangdehai
 * 创建时间:2018年6月4日 上午9:42:06
 */
@Component
public class WeixinInterfaceUtil {

        public final static Logger log = LoggerFactory.getLogger(WeixinInterfaceUtil.class);

    @Autowired
    private AccessTokenAndJsapiTicketUtil accessTokenAndJsapiTicketUtil;

        /**
         * 单图片上传
         *  根据微信基础accetoken 获取用户基础信息,用户关注可以获取全部信息，用户不关注，只能获取关注与否信息
         * Description:
         * @author zhangdehai
         * @param accessToken
         * @param openid
         * @return
         * @date 2018年6月4日上午10:25:34
         */
//        public static JSONObject getUserinfoByBaseAccessToken(String accessToken,String openid){
//
//             String userSubcribeInfoUrl = ConfigUtil.get("get_userinfo_by_baseaccesstoken").replace("ACCESS_TOKEN",accessToken).replace("OPENID",openid);
//             log.debug("userSubcribeInfoUrl="+userSubcribeInfoUrl);
//             JSONObject userInfojsonObject = HttpUtils.httpsRequest(userSubcribeInfoUrl, "GET",null); // 获取用户信息
//             return userInfojsonObject;
//        }

        /**
         * Description:根据mediaId获取已上传到微信的素材
         * @author zhangdehai
         * @param mediaId
         * @param basePath
         * @param savePath
         * @return
         * @date 2018年8月15日下午2:48:59
         */
        public  String getImageUrlByMedia(String mediaId,String basePath,String savePath){
            return downloadWeixinFiles(mediaId,basePath,savePath,0);
        }


        /**
         * Description:去微信下载前端用户上传的图片并保存;因为c端的 基础accetoken有可能失效得多次处理
         * @author zhangdehai
         * @param mediaId
         * @param basePath
         * @param savePath
         * @return
         * @date 2018年8月15日下午2:37:58
         */
        private  String downloadWeixinFiles(String mediaId,String basePath,String savePath,int count){
            String filePath = null;
            String requestUrl = ConfigUtil.get("get_media_info");
            String accessToken = accessTokenAndJsapiTicketUtil.getAccessToken();
            log.info("get_media_info====="+requestUrl);
            log.info("accessToken====="+accessToken);
            log.info("mediaId====="+mediaId);
            requestUrl = requestUrl.replace("ACCESS_TOKEN",accessToken).replace("MEDIA_ID", mediaId);
            log.info(requestUrl);
            try {
                URL url = new URL(requestUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setDoInput(true);
                conn.setRequestMethod("GET");
                if (!savePath.endsWith("/")) {
                    savePath += "/";
                }
                // 根据内容类型获取扩展名
                String fileExt = getFileEndWitsh(conn.getHeaderField("Content-Type"));
                log.debug("Content-Type======================================"+fileExt);
                log.info("Content-disposition==============================="+conn.getHeaderField("Content-disposition"));
                String contentDisposition = conn.getHeaderField("Content-disposition");
                count++;
                if(contentDisposition==null){
                    log.info("下载失败次数count==="+count);
                    conn.disconnect();
                    if(count>3){
                        return null;
                    }
                    return filePath = downloadWeixinFiles(mediaId,basePath,savePath,0);
                }

                // 将mediaId作为文件名
                //文件存储的绝对路径
                filePath = savePath + mediaId + fileExt;
                //文件存储的相对路径
                basePath = basePath + mediaId + fileExt;
                log.info("filePath==="+filePath);
                log.info("fileExt==="+fileExt);
                log.info("filePath==="+filePath);
                BufferedInputStream bis = new BufferedInputStream(conn.getInputStream());
                FileOutputStream fos = new FileOutputStream(new File(filePath));
                byte[] buf = new byte[8096];
                int size = 0;
                while ((size = bis.read(buf)) != -1)
                    fos.write(buf, 0, size);

                fos.close();
                bis.close();

                conn.disconnect();
                String info = String.format("下载媒体文件成功，filePath=" + filePath);
                log.info(info);
            } catch (Exception e) {
                filePath = null;
                String error = String.format("下载媒体文件失败：%s", e);
                log.info(error);
                return null;
            }
            return basePath;
        }


        /**
         * 根据内容类型判断文件扩展名
         *
         * @param contentType 内容类型
         * @return
         */
        public static String getFileEndWitsh(String contentType) {
            String fileEndWitsh = ".jpg";
            if ("image/jpeg".equals(contentType))
                fileEndWitsh = ".jpg";
            if ("image/png".equals(contentType))
                fileEndWitsh = ".png";
            else if ("audio/mpeg".equals(contentType))
                fileEndWitsh = ".mp3";
            else if ("audio/amr".equals(contentType))
                fileEndWitsh = ".amr";
            else if ("video/mp4".equals(contentType))
                fileEndWitsh = ".mp4";
            else if ("video/mpeg4".equals(contentType))
                fileEndWitsh = ".mp4";
            return fileEndWitsh;
        }

        /**
         * Description:多微信图片下载
         * @author zhangdehai
         * @param jsonArray
         * @param basePath
         * @return
         * @date 2018年8月8日上午10:21:35
         */
        public  JSONArray getImageUrlByMedias(JSONArray jsonArray, String basePath,
                                                    String savePath) {
            JSONArray filePathArray = new JSONArray();
            String requestUrl = ConfigUtil.get("get_media_info");
            String accessToken = accessTokenAndJsapiTicketUtil.getAccessToken();
            log.info("get_media_info====="+requestUrl);
            log.info("accessToken====="+accessToken);
            log.info("mediaIds====="+jsonArray);
            for (int i = 0; i < jsonArray.size(); i++) {
                String filePath = null;
                String mediaId = jsonArray.getString(i);

                requestUrl = requestUrl.replace("ACCESS_TOKEN",accessToken).replace("MEDIA_ID",mediaId);
                log.info(requestUrl);
                try {
                    URL url = new URL(requestUrl);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setDoInput(true);
                    conn.setRequestMethod("GET");

                    if (!savePath.endsWith("/")) {
                        savePath += "/";
                    }
                    // 根据内容类型获取扩展名
                    String fileExt = getFileEndWitsh(conn.getHeaderField("Content-Type"));
                    log.debug("Content-Type======================================"+fileExt);
                    log.info("Content-disposition==============================="+conn.getHeaderField("Content-disposition"));
                    log.debug("Content-Length==============================="+conn.getHeaderField("Content-Length"));
                    String contentDisposition = conn.getHeaderField("Content-disposition");
                    if(contentDisposition==null){
                        continue;
                    }
                    // 将mediaId作为文件名
                    //文件存储的绝对路径
                    filePath = savePath + mediaId + fileExt;
                    //文件存储的相对路径
                    basePath = basePath + mediaId + fileExt;
                    log.info("filePath==="+filePath);
                    log.info("fileExt==="+fileExt);
                    log.info("filePath==="+filePath);
                    BufferedInputStream bis = new BufferedInputStream(conn.getInputStream());
                    FileOutputStream fos = new FileOutputStream(new File(filePath));
                    byte[] buf = new byte[8096];
                    int size = 0;
                    while ((size = bis.read(buf)) != -1)
                        fos.write(buf, 0, size);

                    fos.close();
                    bis.close();

                    conn.disconnect();
                    String info = String.format("下载媒体文件成功，filePath=" + filePath);
                    log.info(info);
                    filePathArray.add(basePath);
                } catch (Exception e) {
                    filePath = null;
                    String error = String.format("下载媒体文件失败：%s", e);
                    log.info(error);
                }
            }
            return filePathArray;
        }
}
