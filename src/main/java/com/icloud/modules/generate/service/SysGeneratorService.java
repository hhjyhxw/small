package com.icloud.modules.generate.service;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.icloud.common.PageUtils;
import com.icloud.common.util.StringUtil;
import com.icloud.modules.generate.dao.GeneratorDao;
import com.icloud.modules.generate.utils.GenUtils;
import com.icloud.modules.generate.utils.Query;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

/**
 * 代码生成器
 *
 */
@Service
public class SysGeneratorService {

    private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private GeneratorDao generatorDao;

	public PageUtils queryList(Query query) {
		Page<?> page = PageHelper.startPage(query.getPage(), query.getLimit());
		List<Map<String, Object>> list = generatorDao.queryList(query);

		return new PageUtils(list, (int)page.getTotal(), query.getLimit(), query.getPage());
	}

	public Map<String, String> queryTable(String tableName) {
		return generatorDao.queryTable(tableName);
	}

	public List<Map<String, String>> queryColumns(String tableName) {
		return generatorDao.queryColumns(tableName);
	}

	public byte[] generatorCode(String[] tableNames,String moduleName) {

        log.info("moduleName____"+moduleName);
        log.info("null.equals(moduleName)===================="+("null".equals(moduleName)));
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		ZipOutputStream zip = new ZipOutputStream(outputStream);
        String tempmoduleName = moduleName;
		for(String tableName : tableNames){
			//查询表信息
			Map<String, String> table = queryTable(tableName);
			//查询列信息
			List<Map<String, String>> columns = queryColumns(tableName);
			//生成代码
            String[] arry = tableName.split("_");
            if(tableName.startsWith("t_")){
				log.info("arry======================================================="+ JSON.toJSONString(arry));
				if(!"".equals(moduleName) && StringUtil.checkStr(moduleName) && arry!=null && arry.length>1){
					tempmoduleName = arry[1];
				}else {
					tempmoduleName = moduleName;
				}
				log.info("tempmoduleName======"+tempmoduleName);
				GenUtils.generatorCode(table, columns, zip,tempmoduleName);
			}else{
            	if(StringUtil.checkStr(moduleName) ){
					tempmoduleName = moduleName;
				}else{
					if(arry!=null && arry.length>1){
						tempmoduleName = arry[0];
					}else{
						tempmoduleName = tableName;
					}
				}
				log.info("tempmoduleName======"+tempmoduleName);
				GenUtils.generatorCode(table, columns, zip,tempmoduleName);
			}
		}
		IOUtils.closeQuietly(zip);
		return outputStream.toByteArray();
	}
}
