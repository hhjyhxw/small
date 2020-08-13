package com.icloud.common.util;

import cn.hutool.extra.qrcode.QrCodeUtil;
import com.alibaba.fastjson.JSONObject;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.icloud.common.ConfigUtil;
import com.icloud.common.Contants;
import com.icloud.common.ftp.FtpUtils;
import com.icloud.common.ftp.FtpUtils.UploadStatus;
import com.icloud.common.util.wx.HttpRequestUtil;
import com.icloud.common.util.wx.WxConst;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class AppQRCodeUtil {

    public final static Logger log = LoggerFactory.getLogger(AppQRCodeUtil.class);

//	public static void main(String[] args) throws Exception{
//		System.out.println(createQRCode("233", null));
//	}

    /**
     * 生成微信场景二维码
     *
     * @param accessToken
     * @return url
     * @throws Exception
     */
    public static String createQRCode(String id, String accessToken) throws Exception {
        String fileName = null;
        try {
            String requestUrl = WxConst.getwxacodeunlimit.replace("ACCESS_TOKEN", accessToken);
            int width = Integer.parseInt(ConfigUtil.get("app_qrcode_width"));
            boolean autoColor = Boolean.parseBoolean(ConfigUtil.get("app_qrcode_auto_color"));
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("scene", id);
            params.put("width", width);
            params.put("auto_color", autoColor);
            if (!autoColor) {        //autoColor为false，读取配置文件的line_color并添加参数
                String line_color = ConfigUtil.get("app_qrcode_line_color");
                JSONObject jsonObj = JSONObject.parseObject(line_color);
                params.put("line_color", jsonObj);
            }
            String paramJson = JSONObject.toJSONString(params);
            byte[] imgByte = HttpRequestUtil.httpRequestByteArr(requestUrl, "POST", paramJson);
            if (null == imgByte) {
                throw new NullPointerException("saveQRCodeFile imgByte is null.");
            }
            if (imgByte.length < 5000) {    //根据返回的字节数组长度判断wx返回图片字节或者错误信息
                String error = new String(imgByte);
                throw new Exception("saveQRCodeFile wx return error: " + error);
            }
            InputStream is = new ByteArrayInputStream(imgByte);
            fileName = UUID.randomUUID().toString().replace("-", "") + ".jpg";
            String ftpPath = ConfigUtil.get("filepath") + Contants.IMG_BASE_PATH_;
            UploadStatus status = FtpUtils.uploadFile(ftpPath, fileName, is, FtpUtils.connectServer());
            if (UploadStatus.Upload_New_File_Success != status)
                throw new Exception("create qrCode fail.");
        } catch (Exception ex) {
            log.error("saveQRCodeFile error.", ex);
            throw ex;
        }
        return Contants._DO_MAIN_ + Contants.IMG_BASE_PATH_ + fileName;
    }


    /**
     * 自定义生成二维码
     *
     * @param text     内容
     * @param width    款
     * @param height   高
     * @param filePath 绝对路径
     * @throws WriterException
     * @throws IOException
     */
    public static void generateQRCodeImage(String text, int width, int height, String filePath) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
        hints.put(EncodeHintType.MARGIN, 0);
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height,hints);
        //1.1去白边
//        int[] rec = bitMatrix.getEnclosingRectangle();
//        int resWidth = rec[2] + 1;
//        int resHeight = rec[3] + 1;
//        BitMatrix resMatrix = new BitMatrix(resWidth, resHeight);
//        resMatrix.clear();
//        for (int i = 0; i < resWidth; i++) {
//            for (int j = 0; j < resHeight; j++) {
//                if (bitMatrix.get(i + rec[0], j + rec[1])) {
//                    resMatrix.set(i, j);
//                }
//            }
//        }

        Path path = FileSystems.getDefault().getPath(filePath);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
//        MatrixToImageWriter.writeToPath(resMatrix, "PNG", path);


    }



    /**
     * 自定义生成二维码
     *
     * @param text     内容
     * @param width    款
     * @param height   高
     * @param filePath 绝对路径
     * @throws WriterException
     * @throws IOException
     */
    public static void generateQRCodeImage2(String text, int width, int height, String filePath) throws WriterException, IOException {
        log.info("width=="+width+";height=="+height);
        BufferedImage image = QrCodeUtil.generate(text, width, height);
        //写到指定文件夹下
        ImageIO.write(image, "PNG", new File(filePath));
        return;
    }



}