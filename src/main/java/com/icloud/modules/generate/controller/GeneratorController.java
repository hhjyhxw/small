

package com.icloud.modules.generate.controller;

import com.icloud.annotation.SysLog;
import com.icloud.common.PageUtils;
import com.icloud.common.R;
import com.icloud.modules.generate.service.SysGeneratorService;
import com.icloud.modules.generate.utils.Query;
import org.apache.commons.io.IOUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * 代码生成器
 */
@RestController
@RequestMapping(value = "/generate/generator")
public class GeneratorController {
	@Autowired
	private SysGeneratorService sysGeneratorService;
	
	/**
	 * 列表
	 */
    @SysLog("查询数据列表")
    @RequestMapping("/list")
    @RequiresPermissions("generate:generator:list")
	public R list(@RequestParam Map<String, Object> params){
		PageUtils pageUtil = sysGeneratorService.queryList(new Query(params));
		
		return R.ok().put("page", pageUtil);
	}
	
	/**
	 * 生成代码
	 */
    @SysLog("生成代码")
    @RequiresPermissions("generate:generator:code")
	@RequestMapping("/code")
	public void code(String tables,String moduleName, HttpServletResponse response) throws IOException{
		byte[] data = sysGeneratorService.generatorCode(tables.split(","),moduleName);
		
		response.reset();  
        response.setHeader("Content-Disposition", "attachment; filename=\"icloud.zip\"");
        response.addHeader("Content-Length", "" + data.length);  
        response.setContentType("application/octet-stream; charset=UTF-8");  
  
        IOUtils.write(data, response.getOutputStream());
	}
}
