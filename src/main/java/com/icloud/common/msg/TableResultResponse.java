package com.icloud.common.msg;

import java.util.List;

/**
 * ${DESCRIPTION}
 *
 * @author wanghaobin
 * @create 2017-06-14 22:40
 */
public class TableResultResponse<T> extends BaseResponse {

    TableData<T> data;

    public TableResultResponse(long total, List<T> list,int pages) {
        this.data = new TableData<T>(total, list,pages);
    }

    public TableResultResponse() {
        this.data = new TableData<T>();
    }

    TableResultResponse<T> total(int total) {
        this.data.setTotal(total);
        return this;
    }

    TableResultResponse<T> list(List<T> list) {
        this.data.setList(list);
        return this;
    }

    public TableData<T> getData() {
        return data;
    }

    public void setData(TableData<T> data) {
        this.data = data;
    }

    class TableData<T> {
        long total;//总记录数
        int pages;//总页数
        List<T> list;//结果列表（记录）

        public TableData(long total, List<T> list,int pages) {
            this.total = total;
            this.list = list;
            this.pages = pages;
        }

        public TableData() {
        }

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public int getPages() {
            return pages;
        }

        public void setPages(int pages) {
            this.pages = pages;
        }

        public List<T> getList() {
            return list;
        }

        public void setList(List<T> list) {
            this.list = list;
        }
    }
}
