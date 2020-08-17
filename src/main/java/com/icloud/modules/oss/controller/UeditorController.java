package com.icloud.modules.oss.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.icloud.baidu.ueditor.ActionEnter;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.oss.cloud.OSSFactory;
import com.icloud.modules.oss.service.SysOssService;
import com.icloud.modules.sys.service.SysConfigService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
/**
 * 新建 UeditorController，指定路径rootPath 用来找到config.json文件
 */
@Slf4j
//@RestController
@Controller
@RequestMapping("/small/ueditor")
public class UeditorController {

    @Autowired
    private SysOssService sysOssService;
    @Autowired
    private SysConfigService sysConfigService;

//    @RequestMapping("/config")
//    public void getUEditorConfig(HttpServletResponse response, HttpServletRequest request){
//        String rootPath = request.getSession().getServletContext().getRealPath("/");
//        try {
//            String exec = new ActionEnter(request, rootPath).exec();
//            PrintWriter writer = response.getWriter();
//            writer.write(exec);
//            writer.flush();
//            writer.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    /**
     * ueditor文件上传（上传到外部服务器）
     * @param request
     * @param response
     * @param action
     */
    @ResponseBody
    @RequestMapping(value = "/config",method = {RequestMethod.GET,RequestMethod.POST})
    public JSONObject editorUpload(HttpServletRequest request, HttpServletResponse response, String action,MultipartFile upfile[],String smallSessionId) {
//        response.setContentType("application/json");
        if(StringUtil.checkStr(smallSessionId)){
            HttpSession session = request.getSession();
            Cookie cookie=new Cookie("smallSessionId", smallSessionId);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
        String rootPath = request.getSession().getServletContext().getRealPath("/");
        log.info("smallSessionId==="+smallSessionId);
        log.info("action==="+action);
        log.info("upfile==="+(upfile!=null?upfile.length:0));
        try {
//            String path= ResourceUtils.getURL("classpath:").getPath();
            if("config".equals(action)){    //如果是初始化
                log.info("rootPath==="+rootPath);
                String exec = new ActionEnter(request, rootPath).exec();
                PrintWriter writer = response.getWriter();
                writer.write(exec);
                writer.flush();
                writer.close();
            }else if("uploadimage".equals(action) || "uploadvideo".equals(action) || "uploadfile".equals(action)){    //如果是上传图片、视频、和其他文件
                try {

//                    MultipartResolver resolver = new CommonsMultipartResolver(request.getSession().getServletContext());
//                    MultipartHttpServletRequest Murequest = resolver.resolveMultipart(request);
//                    Map<String, MultipartFile> files = Murequest.getFileMap();//得到文件map对象
//                    log.info("files==="+ (files!=null?files.size():0));
                    for(MultipartFile pic: upfile){
                        JSONObject jo = new JSONObject();
                        long size = pic.getSize();    //文件大小
                        String originalFilename = pic.getOriginalFilename();  //原来的文件名
                        log.info("originalFilename==="+ originalFilename);
                        //上传文件
                        String suffix = pic.getOriginalFilename().substring(pic.getOriginalFilename().lastIndexOf("."));
                        String url = OSSFactory.build().uploadSuffix(pic.getBytes(), suffix);
                        //保存文件信息
//                        SysOssEntity ossEntity = new SysOssEntity();
//                        ossEntity.setUrl(url);
//                        ossEntity.setCreateDate(new Date());
//                        sysOssService.save(ossEntity);

                        if(!"".equals(url)){    //如果上传成功
                            jo.put("state", "SUCCESS");
                            jo.put("original", originalFilename);//原来的文件名
                            jo.put("size", size);//文件大小
                            jo.put("title", pic.getOriginalFilename());//随意，代表的是鼠标经过图片时显示的文字
                            jo.put("type", suffix);//文件后缀名
                            jo.put("url", url);//这里的url字段表示的是上传后的图片在图片服务器的完整地址（http://ip:端口/***/***/***.jpg）
                        }else{    //如果上传失败

                        }
                        log.info("result==="+ JSON.toJSONString(jo));
                       return jo;
                    }
                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}