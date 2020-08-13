package com.icloud.config.configparam;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;


/**
 * 工具类 - 系统配置
 */

//@Component
public class SettingUtil {
	
	public static final String SETTING_FILE_NAME = "mall-config.xml";// 系统配置文件名称
	public static final String SETTING_CACHE_KEY = "setting";// settging缓存Key

//	@Autowired
//	private RedisService redisService;

	public static Setting  setting = null;


	public static Setting getGloablSetting(){
//		Object settingString = redisService.get(SETTING_CACHE_KEY);
		if(setting!=null){
			return setting;
		}else{
			File settingFile = null;
			Document document = null;
			try {
				String settingFilePath = Thread.currentThread().getContextClassLoader().getResource("").toURI().getPath() + SETTING_FILE_NAME;
				settingFile = new File(settingFilePath);
				SAXReader saxReader = new SAXReader();
				document = saxReader.read(settingFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
			Node systemNameNode = document.selectSingleNode("/mall/setting/systemName");
			Node systemVersionNode = document.selectSingleNode("/mall/setting/systemVersion");
			Node systemDescriptionNode = document.selectSingleNode("/mall/setting/systemDescription");
			Node contextPathNode = document.selectSingleNode("/mall/setting/contextPath");
			Node htmlWordsNode = document.selectSingleNode("/mall/setting/htmlWords");
			Node ignoreUrlsNode = document.selectSingleNode("/mall/setting/ignoreUrls");
			Node ignoreCsrfUrlsNode = document.selectSingleNode("/mall/setting/ignoreCsrfUrls");

			setting = new Setting();
			setting.setSystemName(systemNameNode.getText());
			setting.setSystemVersion(systemVersionNode.getText());
			setting.setSystemDescription(systemDescriptionNode.getText());
			setting.setContextPath(contextPathNode.getText());
			setting.setHtmlWords(htmlWordsNode.getText());
			setting.setIgnoreUrls(ignoreUrlsNode.getText());
			setting.setIgnoreCsrfUrls(ignoreCsrfUrlsNode.getText());
			//redisService.set(SETTING_CACHE_KEY,setting);
			return setting;
		}
//		return setting;
	}

	/**
	 * 更新系统配置信息
	 * @param setting
	 */
	public static void update(Setting setting) {
		File settingFile = null;
		Document document = null;
		try {
			String settingFilePath = Thread.currentThread().getContextClassLoader().getResource("").toURI().getPath() + SETTING_FILE_NAME;
			settingFile = new File(settingFilePath);
			SAXReader saxReader = new SAXReader();
			document = saxReader.read(settingFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Element rootElement = document.getRootElement();
		Element settingElement = rootElement.element("setting");


		Node systemNameNode = document.selectSingleNode("/mall/setting/systemName");
		Node systemVersionNode = document.selectSingleNode("/mall/setting/systemVersion");
		Node systemDescriptionNode = document.selectSingleNode("/mall/setting/systemDescription");
		Node contextPathNode = document.selectSingleNode("/mall/setting/contextPath");
		Node htmlWordsNode = document.selectSingleNode("/mall/setting/htmlWords");
		Node ignoreUrlsNode = document.selectSingleNode("/mall/setting/ignoreUrls");
		Node ignoreCsrfUrlsNode = document.selectSingleNode("/mall/setting/ignoreCsrfUrls");

		if(systemNameNode == null)systemNameNode = settingElement.addElement("systemName");
		if(systemVersionNode == null)systemVersionNode = settingElement.addElement("systemVersion");
		if(systemDescriptionNode == null)systemDescriptionNode = settingElement.addElement(")systemDescription");
		if(contextPathNode == null)contextPathNode = settingElement.addElement("contextPath");
		if(htmlWordsNode == null)htmlWordsNode = settingElement.addElement("htmlWords");
		if(ignoreUrlsNode == null)ignoreUrlsNode = settingElement.addElement("ignoreUrls");
		if(ignoreCsrfUrlsNode == null)ignoreCsrfUrlsNode = settingElement.addElement("ignoreCsrfUrls");

		systemNameNode.setText(setting.getSystemName()!=null?setting.getSystemName():"");
		systemVersionNode.setText(setting.getSystemVersion()!=null?setting.getSystemVersion():"");
		systemDescriptionNode.setText(setting.getSystemDescription()!=null?setting.getSystemDescription():"");
		contextPathNode.setText(setting.getContextPath()!=null?setting.getContextPath():"");
		htmlWordsNode.setText(setting.getHtmlWords()!=null?setting.getHtmlWords():"");
		ignoreUrlsNode.setText(setting.getIgnoreUrls()!=null?setting.getIgnoreUrls():"");
		ignoreCsrfUrlsNode.setText(setting.getIgnoreCsrfUrls()!=null?setting.getIgnoreCsrfUrls():"");
		OutputStream outs = null;
		XMLWriter xmlWriter = null;

		try {
			OutputFormat outputFormat = OutputFormat.createPrettyPrint();// 设置XML文档输出格式
			outputFormat.setEncoding("UTF-8");// 设置XML文档的编码类型
			outputFormat.setIndent(true);// 设置是否缩进
			outputFormat.setIndent("	");// 以TAB方式实现缩进
			outputFormat.setNewlines(true);// 设置是否换行
			outs = new FileOutputStream(settingFile);
			xmlWriter = new XMLWriter(outs, outputFormat);
			xmlWriter.write(document);
			SettingUtil.setting = setting;
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(outs!=null){
				try {
					outs.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(xmlWriter!=null){
				try {
					xmlWriter.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
//		redisService.set(SETTING_CACHE_KEY,setting);
	}
}