package com.icloud.common.util;


import java.util.ArrayList;
import java.util.List;

import com.icloud.common.ftp.FtpFileService;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Copyright:   Copyright 2000 - 2011 soft Tech. Co. Ltd. All Rights Reserved.
 * Date:        2011-2-23
 * Author:      邢红
 * Version:     IM客服平台V1.0
 * Description: Initialize
 */
public class XmlParser
{
    public final static Logger logger = LoggerFactory.getLogger(XmlParser.class);


    private final String PARAMS_XPATH = "/params/*";

    Document doc;

    public XmlParser()
    {
    }

    public XmlParser(String xmlString) throws DocumentException
    {
        loadXml(xmlString);
    }

    private void loadXml(String xml) throws DocumentException
    {
        try
        {
            if (xml == null || xml.equals(""))
            {
                return;
            }
            doc = DocumentHelper.parseText(xml);
        }
        catch (DocumentException e)
        {
            logger.error("创建xml解析器失败。", e);
            throw e;
        }
    }

    private void load(String xml) throws DocumentException
    {
        if (doc == null && xml != null && !xml.trim().equals(""))
        {
            loadXml(xml);
        }
    }

    /**
     * 强行重新读入xml
     * 
     * @param xmlString
     * @throws DocumentException
     */
    public void reload(String xmlString) throws DocumentException
    {
        loadXml(xmlString);
    }

    /**
     * 获取单个属性的值
     * 
     * @param xmlString
     * @param xpath
     * @return
     * @throws Exception
     */
    public String getSingleValue(String xmlString, String xpath)
            throws Exception
    {
        try
        {
            if ((xmlString == null || xmlString.trim().equals(""))
                    && doc == null)
            {
                return null;
            }
            load(xmlString);
            Node node = doc.selectSingleNode(xpath);
            if (node != null)
                return node.getStringValue();
            else
            {
                logger.info("xml中没有指定的属性信息。" + xpath);
                return null;
            }
        }
        catch (RuntimeException e)
        {
            logger.error("获取指定属性值失败。", e);
            throw e;
        }
    }

    /**
     * 获取单个属性的值
     * 
     * @param xpath
     * @return
     */
    public String getSingleValue(String xpath) throws Exception
    {
        return getSingleValue(null, xpath);
    }

    /**
     * 根据输入的xpath，找出所有属性值
     * 
     * @param xmlString
     * @param xpath
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<String> getMultiValue(String xmlString, String xpath)
            throws Exception
    {
        try
        {
            load(xmlString);
            List<Node> nodes = doc.selectNodes(xpath);
            List<String> results = new ArrayList<String>(0);
            if (nodes != null && nodes.size() > 0)
            {
                for (Node node : nodes)
                {
                    results.add(node.getStringValue());
                }
                return results;
            }
            else
            {
                logger.info("找不到对应的节点." + xpath);
                return null;
            }
        }
        catch (DocumentException e)
        {
            logger.error("获取属性值失败。", e);
            throw e;
        }
    }

    public List<String> getMultiValue(String xpath) throws Exception
    {
        return getMultiValue(null, xpath);
    }

    /**
     * 根据输入的参数名称，从xml串获取参数值
     * 
     * @param xmlString
     * @return
     */
    public List<String> getParams(String xmlString, String[] paramNames)
            throws Exception
    {
        reload(xmlString);
        return getParams(paramNames, PARAMS_XPATH);
    }

    public List<String> getParams(String[] paramNames) throws Exception
    {
        return getParams(null, paramNames);
    }

    /**
     * 根据输入的参数名称，从xml串获取值,需要xpath
     * 
     * @param xmlString
     * @param paramNames
     * @param xpath
     * @return
     * @throws Exception
     */
    public List<String> getParams(String xmlString, String[] paramNames,
            String xpath) throws Exception
    {
        try
        {
            List<Node> nodes = getNodes(xmlString, xpath);
            List<String> rtnObj = new ArrayList<String>(0);
            if (nodes == null)
                return null;
            Outer: for (String name : paramNames)
            {
                for (Node node : nodes)
                {
                    if (node.getName().equals(name))
                    {
                        rtnObj.add(node.getStringValue());
                        continue Outer;
                    }
                }
                logger.error("传入XML参数中未找到 " + name + " 字段");
                throw new Exception("传入XML参数中未找到 " + name + " 字段");
            }
            return rtnObj;
        }
        catch (DocumentException e)
        {
            logger.error("从xml串解析参数列表失败。", e);
            throw e;
        }
    }

    public List<String> getParams(String[] paramNames, String xpath)
            throws Exception
    {
        try
        {
            List<Node> nodes = getNodes(xpath);
            List<String> rtnObj = new ArrayList<String>(0);
            if (nodes == null)
                return null;
            Outer: for (String name : paramNames)
            {
                for (Node node : nodes)
                {
                    if (node.getName().equals(name))
                    {
                        rtnObj.add(node.getStringValue());
                        continue Outer;
                    }
                }
                logger.error("传入XML参数中未找到 " + name + " 字段");
                throw new Exception("传入XML参数中未找到 " + name + " 字段");
            }
            return rtnObj;
        }
        catch (DocumentException e)
        {
            logger.error("从xml串解析参数列表失败。", e);
            throw e;
        }
    }

    /**
     * 过滤xmlString，根据输入的xml和节点名字以及值过滤条件过滤掉不需要的节点。
     * （注意，被删除掉的是输入的节点的父节点，会有非根结点的验证。）
     * 
     * @param xmlString
     *            需要过滤的串
     * @param xpath
     *            查找的xpath串（包含查找的条件信息）
     * @return 过滤后的xml串
     */
    @SuppressWarnings("unchecked")
    public String filterOutput(String xmlString, String xpath) throws Exception
    {
        try
        {
            load(xmlString);
            if (doc == null)
                return null;
            List<Node> nodes = doc.selectNodes(xpath);
            for (Node node : nodes)
            {
                node.getParent().remove(node);
            }
            return doc.asXML();
        }
        catch (DocumentException e)
        {
            logger.error("过滤xml串失败。", e);
            throw e;
        }
    }

    public void appendData(String xpath, String... xmlStrings)
    {

    }

    /**
     * 根据指定的xpath获取节点集合。
     * 
     * @param xpath
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public List<Element> getELements(String xmlString, String xpath)
            throws Exception
    {
        try
        {
            load(xmlString);
            if (doc == null)
                return null;
            List<Element> nodes = doc.selectNodes(xpath);
            return nodes;
        }
        catch (DocumentException e)
        {
            logger.error("获取节点集合失败。", e);
            throw e;
        }
    }

    public List<Element> getELements(String xpath) throws Exception
    {
        return getELements(null, xpath);
    }

    @SuppressWarnings("unchecked")
    public List<Node> getNodes(String xmlString, String xpath) throws Exception
    {
        try
        {
            load(xmlString);
            if (doc == null)
                return new ArrayList<Node>(0);
            List<Node> nodes = doc.selectNodes(xpath);
            return nodes;
        }
        catch (DocumentException e)
        {
            logger.error("获取节点失败。", e);
            throw e;
        }
    }

    public List<Node> getNodes(String xpath) throws Exception
    {
        if (doc == null)
            return null;
        return doc.selectNodes(xpath);
    }

    public Node getSingleNode(String xmlString, String xpath) throws Exception
    {
        try
        {
            load(xmlString);
            if (doc == null)
                return null;
            Node node = doc.selectSingleNode(xpath);
            return node;
        }
        catch (RuntimeException e)
        {
            logger.error("获取节点失败。", e);
            throw e;
        }
    }

    public Node getSingleNode(String xpath) throws Exception
    {
        return getSingleNode(null, xpath);
    }

    @SuppressWarnings("unchecked")
    public String addNodes(String xmlString, String xpath, String nodeName,
            String value)
    {
        try
        {
            load(xmlString);
            if (doc == null)
                return null;
            List<Node> nodes = doc.selectNodes(xpath);
            for (Node node : nodes)
            {
                Element e = (Element) node;
                Element c = e.addElement(nodeName);
                c.addText(value);
            }
            return doc.asXML();
        }
        catch (Exception e)
        {
            logger.error("添加节点失败。", e);
            return null;
        }
    }

    public String addNodes(String xpath, String nodeName, String value)
    {
        return addNodes(null, xpath, nodeName, value);
    }

    private boolean validateNull(Object s)
    {
        if (s == null || s.toString().trim().equals(""))
        {
            return false;
        }
        return true;
    }

    public String getAttributeValue(String xmlString, String xpath)
            throws DocumentException
    {
        try
        {
            load(xmlString);
            if (doc == null)
                return null;
            Attribute a = (Attribute) doc.selectObject(xpath);
            return a.getValue();
        }
        catch (DocumentException e)
        {
            logger.error("获取属性值失败。", e);
            throw e;
        }
        catch (RuntimeException e)
        {
            logger.error("获取属性值失败。", e);
            throw e;
        }
    }

    public String getAttributeValue(String xpath) throws DocumentException
    {
        return getAttributeValue(null, xpath);
    }

    public String getXmlString()
    {
        if (doc != null)
            return doc.asXML();
        else
            return null;
    }
    
    public void setEncoding(String encode) {
    	doc.setXMLEncoding(encode);
    }
}

