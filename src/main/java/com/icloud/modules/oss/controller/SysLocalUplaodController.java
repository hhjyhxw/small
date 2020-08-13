package com.icloud.modules.oss.controller; /**
 */


import com.alibaba.fastjson.JSONObject;
import com.icloud.common.DateUtil;
import com.icloud.config.global.MyPropertitys;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.Date;
import java.util.UUID;

/**
 * 文件上传(本地上传)
 *
 */
@Controller
@RequestMapping("local/localUplaod")
public class SysLocalUplaodController {

    private Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private MyPropertitys myPropertitys;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpServletResponse response;
	/**
	 * 上传文件
	 */
//	@RequestMapping("/upload",)
    @PostMapping(value="/upload",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	@RequiresPermissions("sys:oss:all")
    @ResponseBody
	public JSONObject upload(@RequestParam("file") MultipartFile file) {
        JSONObject result = new JSONObject();
        try {
            if (file.isEmpty()) {
                result.put("code",500);
                result.put("msg","上传文件不能为");
                return result;
            }
            //上传文件
            String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
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
            String basePath = myPropertitys.getUploadpath()+"/goods/"+ DateUtil.getYearMonthDay(new Date());
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
            file.transferTo(new File(dirFile+"/"+newfileName));
            log.info("上传成功");

            result.put("code",0);
            result.put("url", basePath+"/"+newfileName);
            result.put("msg","上传成功");
            return result;

        } catch (Exception e) {
            log.info("上传文件异常=="+e.getMessage());
            result.put("code",500);
            result.put("msg",e.getMessage());
            return result;
        }
	}

}
