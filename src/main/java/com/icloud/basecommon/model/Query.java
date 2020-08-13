package com.icloud.basecommon.model;


import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 查询参数
 */
public class Query extends LinkedHashMap<String, Object> {
	private static final long serialVersionUID = 1L;
	//当前页码
    private int pageNum = 1;
    //每页条数
    private int pageSize = 10;

    public Query(Map<String, Object> params){
        this.putAll(params);
        //分页参数
        if(params.get("page")!=null) {
            this.pageNum = Integer.parseInt(params.get("page").toString());
        }
        if(params.get("limit")!=null) {
            this.pageSize = Integer.parseInt(params.get("limit").toString());
        }
        this.remove("page");
        this.remove("limit");
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}
