package com.icloud.basecommon.web.upload;

import com.alibaba.fastjson.JSONObject;
import com.icloud.basecommon.web.AppBaseController;
import com.icloud.common.ConfigUtil;
import com.icloud.common.Contants;
import com.icloud.common.DateTools;
import com.icloud.common.ftp.FtpFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.Date;
import java.util.UUID;


/**
 * @filename      : aa.java
 * @description   : 
 * @author        : zdh
 * @create        : 2017年9月21日 下午5:47:57   
 * @copyright     : zhumeng.com@hyzy-activities
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 */

@Controller
@RequestMapping(value = "/upload")
public class UpLoadController extends AppBaseController {
	
	@Autowired
	private FtpFileService ftpFileService;
	
	@RequestMapping(value = "/ueditor",method=RequestMethod.POST)
	@ResponseBody
	public String ueditor(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("file") MultipartFile pfile) throws Exception {
		log.error("进入文本编辑器图片上传后台");
	    	String fileName = pfile.getOriginalFilename();
			fileName = UUID.randomUUID().toString().replace("-", "")+"_"+fileName;
			String basePath = Contants.IMG_BASE_PATH_;
			boolean result = false;
			String parentDer = ConfigUtil.get("filepath")+basePath;
			System.out.println("parentDer==="+parentDer);
			result = ftpFileService.upload(pfile.getBytes(), ConfigUtil.get("filepath")+basePath, fileName);
			JSONObject obj = new JSONObject();
			if(result){
				log.error("上传成功");
				obj.put("code", 0);
				obj.put("msg", "上传成功");
			}else{
				obj.put("code", 1);
				obj.put("msg", "图片上传失败");
			}
			String paths = basePath+fileName;
			JSONObject data = new JSONObject();
//			data.put("src", Contants.IMG_SERVER+paths);
			data.put("title", "图片");
			obj.put("data", data);
			return pakageJsonp(obj);
	
	}
	
	
	@RequestMapping(value = "/uploadGoodsImage",method=RequestMethod.POST)
	@ResponseBody
	public String uploadGoodsImage(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("file") MultipartFile file) throws Exception {
		log.error("进入文本编辑器图片上传后台");
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

	
	@RequestMapping(value = "/uploadFileImage",method=RequestMethod.POST)
	@ResponseBody
	public String uploadFileImage(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("file") MultipartFile file) throws Exception {
		log.error("进入文本编辑器图片上传后台");
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
            String basePath = Contants.IMG_BASE_PATH_+"/"+DateTools.dateToStrNoBlank(new Date());
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
                data.put("src",basePath+"/"+newfileName);
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

	/**
	 * 编辑器使用 图片上传接口
	 * @param request
	 * @param response
	 * @param file
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/uploadFileImageEdit",method=RequestMethod.POST)
	@ResponseBody
	public String uploadFileImageByEdit(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("file") MultipartFile file) throws Exception {
		log.error("进入文本编辑器图片上传后台");
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
            String basePath = Contants.IMG_BASE_PATH_+"/"+DateTools.dateToStrNoBlank(new Date());
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
//                data.put("src",request.getServletContext().getContextPath()+basePath+"/"+newfileName);
                //编辑器存储 绝对路径，cdn+文件路径
                data.put("src",ConfigUtil.get("pictureVisitUrl")+"/"+basePath+"/"+newfileName);
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

