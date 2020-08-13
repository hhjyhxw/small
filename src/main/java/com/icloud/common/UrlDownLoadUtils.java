package com.icloud.common;

import com.icloud.exceptions.BaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URL;

public class UrlDownLoadUtils {

    private final static Logger log = LoggerFactory.getLogger(UrlDownLoadUtils.class);

    public static void dowmloadUrlResoure(File localFile, String imgurl){
        try {
            URL url = new URL(imgurl);
            BufferedInputStream in = new BufferedInputStream(url.openStream());
            FileOutputStream out = new FileOutputStream(localFile);
            int t;
            while ((t = in.read()) != -1) {
                out.write(t);
            }
            out.close();
            in.close();
            log.info("图片获取成功");
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
            throw new BaseException("下载阿里云图片失败");
        }
       log.info("fileName===:"+localFile.getName());
    }
}
