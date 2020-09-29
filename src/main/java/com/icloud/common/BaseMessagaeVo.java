    package com.icloud.common;

    import com.alibaba.fastjson.JSONObject;
import com.icloud.common.util.StringUtil;

import java.io.Serializable;

    public class BaseMessagaeVo implements Serializable {

        private String first;//首行

        private String keyword1;//关键字1：*主题、标题、奖品名称等

        private String keyword2;//*地点、会场等、活动时间等

        private String keyword3;//主办法方等

        private String keyword4;

        private String keyword5;

        private String remark;//底部描述

        private String templateId;//模板id

        private String visitUrl;//点击模板 访问url

        private String openId;//用户openid

        private String sign;//签名 MD5(openid+key)


        public String getFirst() {
            return first;
        }

        public void setFirst(String first) {
            this.first = first;
        }

        public String getKeyword1() {
            return keyword1;
        }

        public void setKeyword1(String keyword1) {
            this.keyword1 = keyword1;
        }

        public String getKeyword2() {
            return keyword2;
        }

        public void setKeyword2(String keyword2) {
            this.keyword2 = keyword2;
        }

        public String getKeyword3() {
            return keyword3;
        }

        public void setKeyword3(String keyword3) {
            this.keyword3 = keyword3;
        }

        public String getKeyword4() {
            return keyword4;
        }

        public void setKeyword4(String keyword4) {
            this.keyword4 = keyword4;
        }

        public String getKeyword5() {
            return keyword5;
        }

        public void setKeyword5(String keyword5) {
            this.keyword5 = keyword5;
        }

        public String getRemark() {
            return remark;
        }

        public void setRemark(String remark) {
            this.remark = remark;
        }

        public String getTemplateId() {
            return templateId;
        }

        public void setTemplateId(String templateId) {
            this.templateId = templateId;
        }

        public String getVisitUrl() {
            return visitUrl;
        }

        public void setVisitUrl(String visitUrl) {
            this.visitUrl = visitUrl;
        }

        public String getOpenId() {
            return openId;
        }

        public void setOpenId(String openId) {
            this.openId = openId;
        }

        public String getSign() {
            return sign;
        }

        public void setSign(String sign) {
            this.sign = sign;
        }

        public String getMessageJson() {
            // 数据开始
            JSONObject jsonObj = new JSONObject();
            JSONObject data = new JSONObject();

            /*1开头语*/
            JSONObject first = new JSONObject();
            first.put("color", "#173177");
            first.put("value", StringUtil.checkStr(this.first)?this.first:"你好，你已成功报名参加活动！");
            /*2活动主题\活动名称*/
            JSONObject keyword1 = new JSONObject();
            keyword1.put("value", StringUtil.checkStr(this.keyword1)?this.keyword1:"XXX活动！");
            keyword1.put("color", "#173177");
            /*3、活动时间*/
            JSONObject keyword2 = new JSONObject();
            keyword2.put("value", StringUtil.checkStr(this.keyword2)?this.keyword2:"2014-10-23-2014-10-25");
            keyword2.put("color", "#173177");
            /*4活动主办*/
            JSONObject keyword3 = new JSONObject();
            keyword3.put("value", StringUtil.checkStr(this.keyword3)?this.keyword3:"广西中烟");
            keyword3.put("color", "#173177");

            JSONObject keyword4 = null;
            if(StringUtil.checkStr(this.keyword4)){
                keyword4 = new JSONObject();
                keyword4.put("value", StringUtil.checkStr(this.keyword4)?this.keyword4:"");
                keyword4.put("color", "#173177");
            }
            JSONObject keyword5 = null;
            if(StringUtil.checkStr(this.keyword4)){
                keyword5 = new JSONObject();
                keyword5.put("value", StringUtil.checkStr(this.keyword5)?this.keyword5:"");
                keyword5.put("color", "#173177");
            }

            /*5备注*/
            JSONObject remark = new JSONObject();
            String remarkStr = "如有疑问请于工作日上班时间，咨询真龙微信在线客服或致电客服热线：4008792099。";
            remark.put("value", remarkStr);
            remark.put("color", "#173177");

            data.put("first", first); //开头语
            data.put("keyword1", keyword1); // 活动主题
            data.put("keyword2", keyword2);// 活动时间
            data.put("keyword3", keyword3);// 活动地点
            if(keyword4!=null){
                data.put("keyword4", keyword4);
            }
            if(keyword5!=null){
                data.put("keyword5", keyword5);
            }

            data.put("remark", remark);// 备注
            jsonObj.put("url", this.visitUrl);
            jsonObj.put("touser", this.openId);
            jsonObj.put("template_id",this.templateId);
            jsonObj.put("data", data);

            return jsonObj.toString();
        }
    }
