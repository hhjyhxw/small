package com.icloud.common;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import freemarker.template.Template;
import freemarker.template.TemplateException;

/**
 * @filename      : FreeMarkConfig.java
 * @description   : 
 * @author        : zdh
 * @create        : 2017年8月4日 下午2:18:01   
 * @copyright     : zhumeng.com@console-project
 *
 * Modification History:
 * Date             Author       Version
 * --------------------------------------
 */
@org.springframework.context.annotation.Configuration
public class FreeMarkerConfig {

    @Autowired
    private FreeMarkerConfigurer freeMarkerConfigurer;

    @Bean
    public freemarker.template.Configuration getFreeMarkerConfiguration(){
        return freeMarkerConfigurer.getConfiguration();
    }

    public void resolveMap(Map<String,String> model, String templateName){
        try {
            Template template =  this.getFreeMarkerConfiguration().getTemplate(templateName);
            template.process(model, new OutputStreamWriter(System.out));
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TemplateException e) {
            e.printStackTrace();
        }
    }
    
    
  //生产文件的路径 为参数 
  	public File createDoc(Map<?, ?> dataMap, String fileName ,String templateName,String fileType) {
  		String name = "temp" + (int) (Math.random() * 100000) + ".doc";
  		/*if(fileType.equals("word")){
  			name = "temp" + (int) (Math.random() * 100000) + ".doc";
  		}*/
  		if(fileType.equals("excel"))
  		{
  			name = "temp" + (int) (Math.random() * 100000) + ".xls";
  		}
  		File f = new File(name);
  		
  		try {
  			Template template = ((freemarker.template.Configuration) this.getFreeMarkerConfiguration()).getTemplate(templateName);
  			// 这个地方不能使用FileWriter因为需要指定编码类型否则生成的Word文档会因为有无法识别的编码而无法打开
  			Writer w = new OutputStreamWriter(new FileOutputStream(f), "utf-8");
  			template.process(dataMap, w);
  			w.close();
  		} catch (Exception ex) {
  			ex.printStackTrace();
  			throw new RuntimeException(ex);
  		}
  		return f;
  	}
}