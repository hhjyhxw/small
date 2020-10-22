package com.icloud.modules.oss.cloud; /**
 */

import com.alibaba.fastjson.JSON;
import com.icloud.modules.oss.exceptions.OSSException;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.model.PutObjectRequest;
import com.qcloud.cos.model.PutObjectResult;
import com.qcloud.cos.region.Region;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

/**
 * 腾讯云存储
 */
@Slf4j
public class QcloudCloudStorageService extends CloudStorageService {
    private COSClient client;

    public QcloudCloudStorageService(CloudStorageConfig config){
        this.config = config;

        //初始化
        init();
    }

    private void init(){
//    	Credentials credentials = new Credentials(config.getQcloudAppId(), config.getQcloudSecretId(),
//                config.getQcloudSecretKey());

//    	//初始化客户端配置
//        ClientConfig clientConfig = new ClientConfig();
//        //设置bucket所在的区域，华南：gz 华北：tj 华东：sh
//        clientConfig.setRegion(config.getQcloudRegion());
//
//    	client = new COSClient(clientConfig, credentials);

        // 1 初始化用户身份信息（secretId, secretKey）。
//        String secretId = "COS_SECRETID";
//        String secretKey = "COS_SECRETKEY";
        COSCredentials cred = new BasicCOSCredentials(config.getQcloudSecretId(), config.getQcloudSecretId());
    // 2 设置 bucket 的区域, COS 地域的简称请参照 https://cloud.tencent.com/document/product/436/6224
    // clientConfig 中包含了设置 region, https(默认 http), 超时, 代理等 set 方法, 使用可参见源码或者常见问题 Java SDK 部分。
            Region region = new Region(config.getQcloudRegion());
            ClientConfig clientConfig = new ClientConfig(region);
    // 3 生成 cos 客户端。
        client = new COSClient(cred, clientConfig);
    }

    @Override
    public String upload(byte[] data, String path) {
        //腾讯云必需要以"/"开头
        if(!path.startsWith("/")) {
            path = "/" + path;
        }

        // 指定要上传的文件
        File localFile = new File(path);
        // 指定要上传到的存储桶
        // 指定要上传到 COS 上对象键
        PutObjectRequest putObjectRequest = new PutObjectRequest(config.getQcloudBucketName(), path, localFile);
        PutObjectResult putObjectResult = client.putObject(putObjectRequest);
//        //上传到腾讯云
//        UploadFileRequest request = new UploadFileRequest(config.getQcloudBucketName(), path, data);
//        String response = client.uploadFile(request);


//        JSONObject jsonObject = JSONObject.fromObject(response);
//        if(jsonObject.getInt("code") != 0) {
//            throw new OSSException("文件上传失败，" + jsonObject.getString("message"));
//        }
            log.info("putObjectResult==="+ JSON.toJSONString(putObjectResult));
        return config.getQcloudDomain() + path;
    }

    @Override
    public String upload(InputStream inputStream, String path) {
    	try {
            byte[] data = IOUtils.toByteArray(inputStream);
            return this.upload(data, path);
        } catch (IOException e) {
            throw new OSSException("上传文件失败", e);
        }
    }

    @Override
    public String uploadSuffix(byte[] data, String suffix) {
        return upload(data, getPath(config.getQcloudPrefix(), suffix));
    }

    @Override
    public String uploadSuffix(InputStream inputStream, String suffix) {
        return upload(inputStream, getPath(config.getQcloudPrefix(), suffix));
    }
}
