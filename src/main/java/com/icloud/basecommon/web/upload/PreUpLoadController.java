package com.icloud.basecommon.web.upload;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.icloud.basecommon.web.AppBaseController;
import com.icloud.common.Contants;
import com.icloud.common.DateTools;
import com.icloud.common.ftp.FtpFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;


/**
 * @filename      :PreUpLoadController
 * @description   : 页面传入 微信接口返回的  图片媒体id：mediaId，然后通过 mediaId 到微信服务器获取图片 然后保存到本地
 * @author        : zdh
 * @create        : 2017年9月21日 下午5:47:57   
 * @copyright     : zhumeng.com@hyzy-activities
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 */

@Controller
@RequestMapping(value = "/frontpage/upload")
public class PreUpLoadController extends AppBaseController {
	
	@Autowired
	private FtpFileService ftpFileService;
    @Autowired
    private WeixinInterfaceUtil weixinInterfaceUtil;

	@RequestMapping(value = "/uploadFileImage",method=RequestMethod.POST)
	@ResponseBody
	public String uploadFileImage(HttpServletRequest request, HttpServletResponse response,String mediaId){
		JSONObject obj = new JSONObject();
		try{
			log.error("用户提交上传图片,mediaId=="+mediaId);
			  //文件存储的相对路径
	        String basePath = Contants.IMG_BASE_PATH_+"/user/"+DateTools.dateToStrNoBlank(new Date())+"/";
	      //获取项目根路径的绝对路径
	        String realPath = request.getSession().getServletContext().getRealPath(basePath); 
	        File dirFile = new File(realPath);
			if (!dirFile.exists()) {
				dirFile.mkdirs();
			}
			basePath = weixinInterfaceUtil.getImageUrlByMedia(mediaId,basePath,dirFile.getPath());
			JSONObject data = new JSONObject();
			if(basePath==null){
				obj.put("code", 1);
				obj.put("msg", "图片上传失败");
			}else{
				data.put("src",basePath);
	     		data.put("title", "图片");
	     		obj.put("code", 0);
				obj.put("msg", "上传成功");
	     		obj.put("data", data);
			}
		 } catch(Exception e) {  
			 e.printStackTrace();
		 }
		return pakageJsonp(obj);
	}
	
	/**
	* Description:多图片上传
	* @author zhangdehai
	* @param request
	* @param response
	* @param mediaIds
	* @return  
	* @date 2018年8月8日上午10:24:00
	 */
	@RequestMapping(value = "/uploadFileImageMutips",method=RequestMethod.POST)
	@ResponseBody
	public String uploadFileImageMutips(HttpServletRequest request, HttpServletResponse response,String mediaIds){
		JSONObject obj = new JSONObject();
		try{
			log.error("用户提交上传图片,mediaIds=="+mediaIds);
			if(mediaIds==null ||  "".equals(mediaIds)){
				obj.put("code", 1);
				obj.put("msg", "图片上传失败");
				return pakageJsonp(obj);
			}
			  //文件存储的相对路径
	        String basePath = Contants.IMG_BASE_PATH_+"/user/"+DateTools.dateToStrNoBlank(new Date())+"/";
	      //获取项目根路径的绝对路径
	        String realPath = request.getSession().getServletContext().getRealPath(basePath); 
	        File dirFile = new File(realPath);
			if (!dirFile.exists()) {
				dirFile.mkdirs();
			}
			JSONArray basePathArray = weixinInterfaceUtil.getImageUrlByMedias(JSON.parseArray(mediaIds),basePath,dirFile.getPath());
			JSONObject data = new JSONObject();
			if(basePathArray==null || basePathArray.size()<=0){
				obj.put("code", 1);
				obj.put("msg", "图片上传失败");
			}else{
				data.put("src",basePathArray);
	     		data.put("title", "图片");
	     		obj.put("code", 0);
				obj.put("msg", "上传成功");
				obj.put("上传成功图片数",basePathArray.size());
	     		obj.put("data", data);
			}
		 } catch(Exception e) {  
			 e.printStackTrace();
		 }
		return pakageJsonp(obj);
	}
	
	
	/**
	 * 
	* Description:保存图片并 评论
	* @author zhangdehai
	* @param request
	* @param response
	* @return
	* @date 2018年8月7日下午4:49:09
	 */
	@RequestMapping(value = "/uploadBase64Image",method=RequestMethod.POST)
	@ResponseBody
	public String uploadFileImageAndSaveContent(HttpServletRequest request, HttpServletResponse response,String images){
		JSONObject obj = new JSONObject();
		JSONArray data = new JSONArray();
		try{
			log.error("用户提交上传图片");
			JSONArray arry = null;
			if(images!=null && !"".equals(images)){
				
				 //文件存储的相对路径
		        String basePath = Contants.IMG_BASE_PATH_+"/user/"+DateTools.dateToStrNoBlank(new Date())+"/";
		        //获取项目根路径的绝对路径
		        String realPath = request.getSession().getServletContext().getRealPath(basePath); 
		        File dirFile = new File(realPath);
				if (!dirFile.exists()) {
					dirFile.mkdirs();
				}
				
				arry = JSON.parseArray(images);
				for (int i = 0; i <arry.size(); i++) {
					String image = (String) arry.get(i);
					  /*进行base64解码*/
					byte[] b = Base64.getDecoder().decode(image);
					for (int j = 0; j < b.length; ++j) {
						if (b[j] < 0) {// 调整异常数据
							b[j] += 256;
						}
					}
					
					//获取新的文件名
		            String id = UUID.randomUUID().toString();
		    		id = id.replace("-", "");
		            String newfileName =  id+".jpg"; 
		            OutputStream out = new FileOutputStream(dirFile+"/"+newfileName);
		            out.write(b);
		            out.flush();
		            out.close();
		            //相对路径
		            data.add(basePath+"/"+newfileName);
					
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			obj.put("code", 1);
			obj.put("msg", "图片上传失败");
		}
		if(data.size()>0){
			obj.put("code", 0);
			obj.put("msg", "上传成功");
    		obj.put("data", data);
		}
		return pakageJsonp(obj);
	}
	
	
//	public static void main(String[] args){
////		String path = "D://project2//话题广场//htgc//images//";
////		  File dirFile = new File(path);
////		  System.out.println(dirFile.getPath());
//	}



}

