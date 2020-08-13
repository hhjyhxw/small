package com.icloud.basecommon.web.upload;

import com.alibaba.fastjson.JSONObject;
import com.icloud.basecommon.web.AppBaseController;
import com.icloud.common.Contants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.UUID;

@Controller
@RequestMapping(value = "/xcxpath/uploads")
public class XcxUploadController extends AppBaseController {

    public final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/uploadImage",method= RequestMethod.POST)
    @ResponseBody
    public String uploadGoodsImage(HttpServletRequest request, HttpServletResponse response,
                                   @RequestParam("file") MultipartFile file) throws Exception {

        log.error("前端进入上传图片按钮接口");
        JSONObject obj = new JSONObject();
        JSONObject data = new JSONObject();
        if(!file.isEmpty()) {
            //获取文件类型
            String contentType = file.getContentType();
            if(!contentType.equals("")) {
                //可以对文件类型进行检查
            }
            //获取文件名，带扩展名
            String originFileName = file.getOriginalFilename();
            //获取文件扩展名
            String extension = originFileName.substring(originFileName.lastIndexOf("."));
            //获取文件大小，单位字节
            long site = file.getSize();
            if(site > 1000000) {
                //可以对文件大小进行检查
            }
            //文件存储的相对路径
            String basePath = Contants.IMG_BASE_PATH_;
            //获取项目根路径的绝对路径
            String realPath = request.getSession().getServletContext().getRealPath(basePath);
            log.error(realPath);
            File dirFile = new File(realPath);
            if (!dirFile.exists()) {
                dirFile.mkdirs();
            }
            //获取新的文件名
            String id = UUID.randomUUID().toString();
            id = id.replace("-", "");
            String newfileName =  id + extension;
            try {
                file.transferTo(new File(dirFile+"/"+newfileName));
                data.put("src", basePath+"/"+newfileName);
                data.put("title", "图片");

                obj.put("code", 0);
                obj.put("msg", "上传成功");
                obj.put("data", data);
            } catch (Exception e) {
                e.printStackTrace();
                obj.put("code", 1);
                obj.put("msg", "图片上传失败");
            }
        }else{
            obj.put("code", 1);
            obj.put("msg", "图片上传失败");
        }
        return pakageJsonp(obj);

    }
}
