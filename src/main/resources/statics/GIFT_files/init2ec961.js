define("cardticket/tools_add_dispel_code.js",["cardticket/add/maxlength.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js"],function(s){
"use strict";
function e(s){
var e=!1,o=$(a).popup({
title:"添加验证码",
buttons:[{
text:"确定",
click:function(){
var t=$.trim(r.val());
if(!/^[0-9]{3}$/.test(t))return void r.focus();
if(!e){
e=!0;
var a=this;
c.post({
url:"/merchant/cardsecuritycodemgr",
data:{
action:"add",
security_code:t
},
complete:function(){
e=!1;
}
},function(e){
0==e.base_resp.ret?(i.suc("添加验证码成功"),a.hide(),s.success&&s.success(t)):14015==e.base_resp.ret?(i.err("验证码已经存在"),
r.focus()):14016==e.base_resp.ret?(i.err("验证码个数不能超过3个"),a.hide()):c.show(e);
});
}
},
type:"primary"
},{
text:"取消",
click:function(){
this.hide();
}
}],
onHide:function(){
this.remove();
}
}),n=o.popup("get"),r=n.find(".js_code"),d=n.find(".js_frm_tips");
r.keyup(function(){
var s=$.trim($(this).val());
s&&!/^[0-9]{3}$/.test(s)?d.css("color","#e15f63"):d.css("color","");
}),t({
container:n.find(".js_maxlength"),
lentype:2
});
}
var t=s("cardticket/add/maxlength.js"),c=s("common/wx/Cgi.js"),i=s("common/wx/Tips.js"),a=(s("common/wx/popup.js"),
'<div class="card_code_dialog_wrp" style="display:none">			<div class="card_code_dialog">			<p>店员可以凭借此验证码核销本公众号下发的优惠券</p>			<div class="frm_control_group frm_card_extend">			    <label for="" class="frm_label">			        添加验证码			    </label>			    <span class="frm_input_box with_counter counter_in append">			        <input value="" name="code" type="text" data-maxlength="3" target=".js_add_dispel_code_tips" 			        class="frm_input js_code js_maxlength" placeholder="">			        <span class="frm_input_append frm_counter"><span class="js_add_dispel_code_tips">0</span>/3</span>			    </span>			    <p class="frm_tips js_frm_tips">请输入3位数数字</p>			</div>			</div>		</div>');
return e;
});define("biz_web/ui/dateRange.js",["tpl/biz_web/ui/dateRange.html.js","biz_web/widget/date_range.css","tpl/biz_web/ui/timeRange.html.js"],function(t,e,a){
function s(t){
t.title_id="js_dateRangeTitle"+r,t.inputTrigger="js_dateRangeTrigger"+r,r++,$(t.container).html(template.compile(d)(t));
var e=new i(t.title_id,t);
return e.initOpt=t,e;
}
function i(t,e){
var a={
aToday:"aToday",
aYesterday:"aYesterday",
aRecent7Days:"aRecent7Days",
aRecent14Days:"aRecent14Days",
aRecent30Days:"aRecent30Days",
aRecent90Days:"aRecent90Days",
aDirectDay:[],
startDate:"",
endDate:"",
startCompareDate:"",
endCompareDate:"",
minValidDate:"315507600",
maxValidDate:"",
success:function(){
return!0;
},
startDateId:"startDate",
startCompareDateId:"startCompareDate",
endDateId:"endDate",
endCompareDateId:"endCompareDate",
target:"",
needCompare:!1,
suffix:"",
inputTrigger:"input_trigger",
compareTrigger:"compare_trigger",
compareCheckboxId:"needCompare",
calendars:2,
dayRangeMax:0,
monthRangeMax:12,
dateTable:"dateRangeDateTable",
selectCss:"dateRangeSelected",
compareCss:"dateRangeCompare",
coincideCss:"dateRangeCoincide",
firstCss:"first",
lastCss:"last",
clickCss:"today",
disableGray:"dateRangeGray",
isToday:"dateRangeToday",
joinLineId:"joinLine",
isSingleDay:!1,
defaultText:" 至 ",
singleCompare:!1,
stopToday:!0,
isTodayValid:!1,
weekendDis:!1,
disCertainDay:[],
disCertainDate:[],
shortOpr:!1,
noCalendar:!1,
theme:"gri",
autoCommit:!1,
autoSubmit:!1,
replaceBtn:"btn_compare",
onsubmit:$.noop,
beforeSelect:$.noop,
timePicker:!1,
defaultStartTimes:"12:00:00",
defaultEndTimes:"12:00:00"
},s=this;
if(this.inputId=t,this.inputCompareId=t+"Compare",this.compareInputDiv="div_compare_"+t,
this.mOpts=$.extend({},a,e),this.mOpts.calendars=Math.min(this.mOpts.calendars,3),
this.mOpts.compareCss="ta"==this.mOpts.theme?this.mOpts.selectCss:this.mOpts.compareCss,
this.periodObj={},s.mOpts.aDirectDay)for(var i=s.mOpts.aDirectDay,d=0,r=i.length;r>d;d++)this.periodObj[i[d].id]=i[d].value;else this.periodObj[s.mOpts.aToday]=0,
this.periodObj[s.mOpts.aYesterday]=1,this.periodObj[s.mOpts.aRecent7Days]=6,this.periodObj[s.mOpts.aRecent14Days]=13,
this.periodObj[s.mOpts.aRecent30Days]=29,this.periodObj[s.mOpts.aRecent90Days]=89;
this.startDefDate="";
var n=""==this.mOpts.suffix?(new Date).getTime():this.mOpts.suffix;
this.calendarId="calendar_"+n,this.dateListId="dateRangePicker_"+n,this.dateRangeCompareDiv="dateRangeCompareDiv_"+n,
this.dateRangeDiv="dateRangeDiv_"+n,this.compareCheckBoxDiv="dateRangeCompareCheckBoxDiv_"+n,
this.submitBtn="submit_"+n,this.closeBtn="closeBtn_"+n,this.preMonth="dateRangePreMonth_"+n,
this.nextMonth="dateRangeNextMonth_"+n,this.startDateId=this.mOpts.startDateId+"_"+n,
this.endDateId=this.mOpts.endDateId+"_"+n,this.compareCheckboxId=this.mOpts.compareCheckboxId+"_"+n,
this.startCompareDateId=this.mOpts.startCompareDateId+"_"+n,this.endCompareDateId=this.mOpts.endCompareDateId+"_"+n,
this.defaultStartTimes=this.mOpts.defaultStartTimes,this.defaultEndTimes=this.mOpts.defaultEndTimes;
var p={
gri:['<div id="'+this.calendarId+'" class="gri_dateRangeCalendar">','<table class="gri_dateRangePicker"><tr id="'+this.dateListId+'"></tr></table>','<div class="gri_dateRangeOptions" '+(this.mOpts.autoSubmit?' style="display:none" ':"")+">",'<div class="gri_dateRangeInput" id="'+this.dateRangeDiv+'" >','<input type="text" class="gri_dateRangeInput" name="'+this.startDateId+'" id="'+this.startDateId+'" value="'+this.mOpts.startDate+'" readonly />','<span id="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="gri_dateRangeInput" name="'+this.endDateId+'" id="'+this.endDateId+'" value="'+this.mOpts.endDate+'" readonly /><br />',"</div>",'<div class="gri_dateRangeInput" id="'+this.dateRangeCompareDiv+'">','<input type="text" class="gri_dateRangeInput" name="'+this.startCompareDateId+'" id="'+this.startCompareDateId+'" value="'+this.mOpts.startCompareDate+'" readonly />','<span class="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="gri_dateRangeInput" name="'+this.endCompareDateId+'" id="'+this.endCompareDateId+'" value="'+this.mOpts.endCompareDate+'" readonly />',"</div>","<div>",'<input type="button" name="'+this.submitBtn+'" id="'+this.submitBtn+'" value="确定" />','&nbsp;<a id="'+this.closeBtn+'" href="javascript:;">关闭</a>',"</div>","</div>","</div>"],
ta:['<div id="'+this.calendarId+'" class="ta_calendar ta_calendar2 cf">','<div class="ta_calendar_cont cf" id="'+this.dateListId+'">',"</div>",'<div class="ta_calendar_footer cf" '+(this.mOpts.autoSubmit?' style="display:none" ':"")+">",'<div class="frm_msg">','<div id="'+this.dateRangeDiv+'">','<input type="text" class="ta_ipt_text_s" name="'+this.startDateId+'" id="'+this.startDateId+'" value="'+this.mOpts.startDate+'" readonly />','<span class="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="ta_ipt_text_s" name="'+this.endDateId+'" id="'+this.endDateId+'" value="'+this.mOpts.endDate+'" readonly /><br />',"</div>",'<div id="'+this.dateRangeCompareDiv+'">','<input type="text" class="ta_ipt_text_s" name="'+this.startCompareDateId+'" id="'+this.startCompareDateId+'" value="'+this.mOpts.startCompareDate+'" readonly />','<span class="'+this.mOpts.joinLineId+'"> - </span>','<input type="text" class="ta_ipt_text_s" name="'+this.endCompareDateId+'" id="'+this.endCompareDateId+'" value="'+this.mOpts.endCompareDate+'" readonly />',"</div>","</div>",'<div class="frm_btn">','<input class="ta_btn ta_btn_primary" type="button" name="'+this.submitBtn+'" id="'+this.submitBtn+'" value="确定" />','<input class="ta_btn" type="button" id="'+this.closeBtn+'" value="取消"/>',"</div>","</div>","</div>"]
},m={
gri:['<label class="gri_contrast" for ="'+this.compareCheckboxId+'">','<input type="checkbox" class="gri_pc" name="'+this.compareCheckboxId+'" id="'+this.compareCheckboxId+'" value="1"/>对比',"</label>",'<input type="text" name="'+this.inputCompareId+'" id="'+this.inputCompareId+'" value="" class="gri_date"/>'],
ta:['<label class="contrast" for ="'+this.compareCheckboxId+'">','<input type="checkbox" class="pc" name="'+this.compareCheckboxId+'" id="'+this.compareCheckboxId+'" value="1"/>对比',"</label>",'<div class="ta_date" id="'+this.compareInputDiv+'">','	<span name="dateCompare" id="'+this.inputCompareId+'" class="date_title"></span>','	<a class="opt_sel" id="'+this.mOpts.compareTrigger+'" href="#">','		<i class="i_orderd"></i>',"	</a>","</div>"]
};
if($(m[this.mOpts.theme].join("")).insertAfter("ta"==this.mOpts.theme?$("#div_"+this.inputId):$("#"+this.inputId)),
this.mOpts.noCalendar&&($("#"+this.inputId).css("display","none"),$("#"+this.compareCheckboxId).parent().css("display","none")),
$(0<$("#appendParent").length?"#appendParent":document.body).append(p[this.mOpts.theme].join("")),
$("#"+this.calendarId).css("z-index",9999),1>$("#"+this.mOpts.startDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.startDateId+'" name="'+this.mOpts.startDateId+'" value="'+this.mOpts.startDate+'" />'):$("#"+this.mOpts.startDateId).val(this.mOpts.startDate),
1>$("#"+this.mOpts.endDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.endDateId+'" name="'+this.mOpts.endDateId+'" value="'+this.mOpts.endDate+'" />'):$("#"+this.mOpts.endDateId).val(this.mOpts.endDate),
1>$("#"+this.mOpts.compareCheckboxId).length&&$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="checkbox" id="'+this.mOpts.compareCheckboxId+'" name="'+this.mOpts.compareCheckboxId+'" value="0" style="display:none;" />'),
0==this.mOpts.needCompare?($("#"+this.compareInputDiv).css("display","none"),$("#"+this.compareCheckBoxDiv).css("display","none"),
$("#"+this.dateRangeCompareDiv).css("display","none"),$("#"+this.compareCheckboxId).attr("disabled",!0),
$("#"+this.startCompareDateId).attr("disabled",!0),$("#"+this.endCompareDateId).attr("disabled",!0),
$("#"+this.compareCheckboxId).parent().css("display","none"),$("#"+this.mOpts.replaceBtn).length>0&&$("#"+this.mOpts.replaceBtn).hide()):(1>$("#"+this.mOpts.startCompareDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.startCompareDateId+'" name="'+this.mOpts.startCompareDateId+'" value="'+this.mOpts.startCompareDate+'" />'):$("#"+this.mOpts.startCompareDateId).val(this.mOpts.startCompareDate),
1>$("#"+this.mOpts.endCompareDateId).length?$(""!=this.mOpts.target?"#"+this.mOpts.target:"body").append('<input type="hidden" id="'+this.mOpts.endCompareDateId+'" name="'+this.mOpts.endCompareDateId+'" value="'+this.mOpts.endCompareDate+'" />'):$("#"+this.mOpts.endCompareDateId).val(this.mOpts.endCompareDate),
(""==this.mOpts.startCompareDate||""==this.mOpts.endCompareDate)&&($("#"+this.compareCheckboxId).attr("checked",!1),
$("#"+this.mOpts.compareCheckboxId).attr("checked",!1))),this.dateInput=this.startDateId,
this.changeInput(this.dateInput),$("#"+this.startDateId).bind("click",function(){
return s.endCompareDateId==s.dateInput&&$("#"+s.startCompareDateId).val(s.startDefDate),
s.startDefDate="",s.removeCSS(1),s.changeInput(s.startDateId),!1;
}),$("#"+this.calendarId).bind("click",function(t){
t.stopPropagation();
}),$("#"+this.startCompareDateId).bind("click",function(){
return s.endDateId==s.dateInput&&$("#"+s.startDateId).val(s.startDefDate),s.startDefDate="",
s.removeCSS(0),s.changeInput(s.startCompareDateId),!1;
}),$("#"+this.submitBtn).bind("click",function(){
return s.close(1),s.mOpts.success({
startDate:s.mOpts.timePicker?$("#"+s.mOpts.startDateId).val()+" "+s.defaultStartTimes:$("#"+s.mOpts.startDateId).val(),
endDate:s.mOpts.timePicker?$("#"+s.mOpts.endDateId).val()+" "+s.defaultEndTimes:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
}),s.mOpts.onsubmit({
startDate:$("#"+s.mOpts.startDateId).val(),
endDate:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
}),!1;
}),$("#"+this.closeBtn).bind("click",function(){
return s.close(),!1;
}),$("#"+this.inputId).bind("click",function(){
return s.init(),s.show(!1,s),!1;
}),$("#"+this.mOpts.inputTrigger).bind("click",function(){
return"none"==$("#"+s.calendarId).css("display")?(s.init(),s.show(!1,s)):s.close(),
!1;
}),$("#"+this.mOpts.compareTrigger).bind("click",function(){
return s.init(!0),s.show(!0,s),!1;
}),$("#"+this.inputCompareId).bind("click",function(){
return s.init(!0),s.show(!0,s),!1;
}),this.mOpts.singleCompare&&("ta"===this.mOpts.theme?($("#"+s.startDateId).val(s.mOpts.startDate),
$("#"+s.endDateId).val(s.mOpts.startDate),$("#"+s.startCompareDateId).val(s.mOpts.startCompareDate),
$("#"+s.endCompareDateId).val(s.mOpts.startCompareDate)):($("#"+s.startDateId).val(s.mOpts.startDate),
$("#"+s.endDateId).val(s.mOpts.startDate),$("#"+s.startCompareDateId).val(s.mOpts.startCompareDate),
$("#"+s.endCompareDateId).val(s.mOpts.startCompareDate),$("#"+this.compareCheckboxId).attr("checked",!0),
$("#"+this.mOpts.compareCheckboxId).attr("checked",!0))),$("#"+this.dateRangeCompareDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none"),
$("#"+this.compareInputDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none"),
$("#"+this.compareCheckboxId).bind("click",function(){
$("#"+s.inputCompareId).css("display",this.checked?"":"none"),$("#"+s.dateRangeCompareDiv).css("display",this.checked?"":"none"),
$("#"+s.compareInputDiv).css("display",this.checked?"":"none"),$("#"+s.startCompareDateId).css("disabled",this.checked?!1:!0),
$("#"+s.endCompareDateId).css("disabled",this.checked?!1:!0),$("#"+s.mOpts.compareCheckboxId).attr("checked",$("#"+s.compareCheckboxId).attr("checked")),
$("#"+s.mOpts.compareCheckboxId).val($("#"+s.compareCheckboxId).attr("checked")?1:0),
$("#"+s.compareCheckboxId).attr("checked")?(sDate=s.str2date($("#"+s.startDateId).val()),
sTime=sDate.getTime(),eDate=s.str2date($("#"+s.endDateId).val()),eTime=eDate.getTime(),
scDate=$("#"+s.startCompareDateId).val(),ecDate=$("#"+s.endCompareDateId).val(),
(""==scDate||""==ecDate)&&(ecDate=s.str2date(s.date2ymd(sDate).join("-")),ecDate.setDate(ecDate.getDate()-1),
scDate=s.str2date(s.date2ymd(sDate).join("-")),scDate.setDate(scDate.getDate()-(eTime-sTime)/864e5-1),
ecDate.getTime()<1e3*s.mOpts.minValidDate&&(scDate=sDate,ecDate=eDate),ecDate.getTime()>=1e3*s.mOpts.minValidDate&&scDate.getTime()<1e3*s.mOpts.minValidDate&&(scDate.setTime(1e3*s.mOpts.minValidDate),
scDate=s.str2date(s.date2ymd(scDate).join("-")),ecDate.setDate(scDate.getDate()+(eTime-sTime)/864e5-1)),
$("#"+s.startCompareDateId).val(s.formatDate(s.date2ymd(scDate).join("-"))),$("#"+s.endCompareDateId).val(s.formatDate(s.date2ymd(ecDate).join("-")))),
s.addCSS(1),s.changeInput(s.startCompareDateId)):(s.removeCSS(1),s.changeInput(s.startDateId)),
s.close(1),s.mOpts.success({
startDate:$("#"+s.mOpts.startDateId).val(),
endDate:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
});
}),this.init(),this.close(1),this.mOpts.replaceBtn&&$("#"+this.mOpts.replaceBtn).length>0){
var h=$(this.mOpts.container);
$("#"+s.compareCheckboxId).hide(),h.find(".contrast").hide(),$("#"+this.mOpts.replaceBtn).bind("click",function(){
var t=this,e=$("#"+s.compareCheckboxId);
e.click(),e.attr("checked")?function(){
e.removeAttr("checked"),h.find(".contrast").hide(),$(t).text("按时间对比");
}():function(){
e.attr("checked","checked"),h.find(".contrast").show(),$(t).text("取消对比");
}();
});
}
this.mOpts.autoCommit&&this.mOpts.success({
startDate:$("#"+s.mOpts.startDateId).val(),
endDate:$("#"+s.mOpts.endDateId).val(),
needCompare:$("#"+s.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+s.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+s.mOpts.endCompareDateId).val()
}),$(document).bind("click",function(){
s.close();
});
}
var d=t("tpl/biz_web/ui/dateRange.html.js");
t("biz_web/widget/date_range.css");
var r=0;
a.exports=s,i.prototype.init=function(t){
var e=this,a="undefined"!=typeof t?t&&$("#"+e.compareCheckboxId).attr("checked"):$("#"+e.compareCheckboxId).attr("checked");
$("#"+this.dateListId).empty();
var s=""==this.mOpts.endDate?new Date:this.str2date(this.mOpts.endDate);
this.calendar_endDate=new Date(s.getFullYear(),s.getMonth()+1,0);
for(var i=0;i<this.mOpts.calendars;i++){
var d=null;
if("ta"==this.mOpts.theme?d=this.fillDate(s.getFullYear(),s.getMonth(),i):(d=document.createElement("td"),
$(d).append(this.fillDate(s.getFullYear(),s.getMonth(),i)),$(d).css("vertical-align","top")),
0==i)$("#"+this.dateListId).append(d);else{
var r="ta"==this.mOpts.theme?$("#"+this.dateListId).find("table").get(0):$("#"+this.dateListId).find("td").get(0);
$(r).before(d);
}
s.setMonth(s.getMonth()-1,1);
}
$("#"+this.preMonth).bind("click",function(){
return e.calendar_endDate.setMonth(e.calendar_endDate.getMonth()-1,1),e.mOpts.endDate=e.date2ymd(e.calendar_endDate).join("-"),
e.init(t),1==e.mOpts.calendars&&e.changeInput(""==$("#"+e.startDateId).val()?e.startDateId:e.endDateId),
!1;
}),$("#"+this.nextMonth).bind("click",function(){
return e.calendar_endDate.setMonth(e.calendar_endDate.getMonth()+1,1),e.mOpts.endDate=e.date2ymd(e.calendar_endDate).join("-"),
e.init(t),1==e.mOpts.calendars&&e.changeInput(""==$("#"+e.startDateId).val()?e.startDateId:e.endDateId),
!1;
}),this.calendar_startDate=new Date(s.getFullYear(),s.getMonth()+1,1),this.endDateId!=this.dateInput&&this.endCompareDateId!=this.dateInput&&this.addCSS(a&&"undefined"!=typeof t?1:0),
e.addCSS(a&&"undefined"!=typeof t?1:0),$("#"+e.inputCompareId).css("display",a?"":"none"),
$("#"+this.compareInputDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none");
for(var n in e.periodObj)$("#"+n).length>0&&($("#"+n).unbind("click"),$("#"+n).bind("click",function(){
var t="ta"==e.mOpts.theme?"active":"a";
$(this).parent().nextAll().removeClass(t),$(this).parent().prevAll().removeClass(t),
$(this).parent().addClass(t);
var a=e.getSpecialPeriod(e.periodObj[$(this).attr("id")]);
$("#"+e.startDateId).val(e.formatDate(a.otherday)),$("#"+e.endDateId).val(e.formatDate(a.today)),
$("#"+e.mOpts.startDateId).val($("#"+e.startDateId).val()),$("#"+e.mOpts.endDateId).val($("#"+e.endDateId).val()),
"ta"==e.mOpts.theme?$("#"+e.compareInputDiv).hide():$("#"+e.inputCompareId).css("display","none"),
$("#"+e.compareCheckboxId).attr("checked",!1),$("#"+e.mOpts.compareCheckboxId).attr("checked",!1),
$("#"+this.compareInputDiv).css("display",$("#"+this.compareCheckboxId).attr("checked")?"":"none"),
e.close(1),$("#"+e.startCompareDateId).val(""),$("#"+e.endCompareDateId).val(""),
$("#"+e.mOpts.startCompareDateId).val(""),$("#"+e.mOpts.endCompareDateId).val(""),
$("#"+e.mOpts.compareCheckboxId).val(0),$("#"+e.mOpts.replaceBtn).length>0&&($(".contrast").hide(),
$("#"+e.mOpts.replaceBtn).text("按时间对比")),e.mOpts.success({
startDate:$("#"+e.mOpts.startDateId).val(),
endDate:$("#"+e.mOpts.endDateId).val(),
needCompare:$("#"+e.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+e.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+e.mOpts.endCompareDateId).val()
});
}));
$(document).bind("click",function(){
e.close();
}),$("#"+this.inputId).bind("change",function(){
""===$(this).val()&&($("#"+e.startDateId).val(""),$("#"+e.endDateId).val(""),$("#"+e.startCompareDateId).val(""),
$("#"+e.endCompareDateId).val(""));
});
},i.prototype.getSpecialPeriod=function(t){
var e=this,a=new Date;
1==e.mOpts.isTodayValid&&""!=e.mOpts.isTodayValid||2>t?"":a.setTime(a.getTime()-864e5);
var s=a.getTime()-24*t*60*60*1e3<1e3*e.mOpts.minValidDate?1e3*e.mOpts.minValidDate:a.getTime()-24*t*60*60*1e3,i=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();
a.setTime(s);
var d=a.getFullYear()+"-"+(a.getMonth()+1)+"-"+a.getDate();
return t==e.periodObj.aYesterday&&(i=d),{
today:i,
otherday:d
};
},i.prototype.getCurrentDate=function(){
return{
startDate:$("#"+this.startDateId).val(),
endDate:$("#"+this.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
};
},i.prototype.removeCSS=function(t,e){
"undefined"==typeof e&&(e=this.mOpts.theme+"_"+this.mOpts.coincideCss),"undefined"==typeof t&&(t=0);
for(var a=new Date(this.calendar_startDate.getFullYear(),this.calendar_startDate.getMonth(),this.calendar_startDate.getDate()),s="",i=new Date(a);i.getTime()<=this.calendar_endDate.getTime();i.setDate(i.getDate()+1))s=0==t?this.mOpts.theme+"_"+this.mOpts.selectCss:this.mOpts.theme+"_"+this.mOpts.compareCss,
$("#"+this.calendarId+"_"+this.date2ymd(i).join("-")).removeClass(s),$("#"+this.calendarId+"_"+this.date2ymd(i).join("-")).removeClass(this.mOpts.firstCss).removeClass(this.mOpts.lastCss).removeClass(this.mOpts.clickCss);
},i.prototype.addCSS=function(t,e){
"undefined"==typeof e&&(e=this.mOpts.theme+"_"+this.mOpts.coincideCss),"undefined"==typeof t&&(t=0);
for(var a=this.str2date($("#"+this.startDateId).val()),s=this.str2date($("#"+this.endDateId).val()),i=this.str2date($("#"+this.startCompareDateId).val()),d=this.str2date($("#"+this.endCompareDateId).val()),r=0==t?a:i,n=0==t?s:d,p="",m=new Date(r);m.getTime()<=n.getTime();m.setDate(m.getDate()+1))0==t?(p=this.mOpts.theme+"_"+this.mOpts.selectCss,
$("#"+this.calendarId+"_"+this.date2ymd(m).join("-")).removeClass(this.mOpts.firstCss).removeClass(this.mOpts.lastCss).removeClass(this.mOpts.clickCss),
$("#"+this.calendarId+"_"+this.date2ymd(m).join("-")).removeClass(p)):p=this.mOpts.theme+"_"+this.mOpts.compareCss,
$("#"+this.calendarId+"_"+this.date2ymd(m).join("-")).attr("class",p);
"ta"==this.mOpts.theme&&($("#"+this.calendarId+"_"+this.date2ymd(new Date(r)).join("-")).removeClass().addClass(this.mOpts.firstCss),
$("#"+this.calendarId+"_"+this.date2ymd(new Date(n)).join("-")).removeClass().addClass(this.mOpts.lastCss),
r.getTime()==n.getTime()&&$("#"+this.calendarId+"_"+this.date2ymd(new Date(n)).join("-")).removeClass().addClass(this.mOpts.clickCss));
},i.prototype.checkDateRange=function(t,e){
var a=this.str2date(t),s=this.str2date(e),i=a.getTime(),d=s.getTime(),r=31*this.mOpts.monthRangeMax+this.mOpts.dayRangeMax,n=Math.abs(d-i)/864e5;
return r>0&&n>r?(alert("所选日期跨度最大不能超过"+r+"天"),!1):!0;
},i.prototype.selectDate=function(t){
this.changeInput(this.dateInput);
var e=this.formatDate(t);
if(this.startDateId==this.dateInput)this.removeCSS(0),this.removeCSS(1),$("#"+this.endDateId).val(e),
$("#"+this.calendarId+"_"+t).attr("class","ta"==this.mOpts.theme?this.mOpts.clickCss:this.mOpts.theme+"_"+this.mOpts.selectCss),
this.startDefDate=$("#"+this.dateInput).val(),$("#"+this.dateInput).val(e),1==this.mOpts.singleCompare||1==this.mOpts.isSingleDay?(this.dateInput=this.startDateId,
$("#"+this.endDateId).val(e),(this.mOpts.shortOpr||this.mOpts.autoSubmit)&&this.close(1),
this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
})):this.dateInput=this.endDateId;else if(this.endDateId==this.dateInput){
if(""==$("#"+this.startDateId).val())return this.dateInput=this.startDateId,this.selectDate(t),
!1;
if(0==this.checkDateRange($("#"+this.startDateId).val(),t))return!1;
-1==this.compareStrDate(t,$("#"+this.startDateId).val())&&($("#"+this.dateInput).val($("#"+this.startDateId).val()),
$("#"+this.startDateId).val(e),e=$("#"+this.dateInput).val()),$("#"+this.dateInput).val(e),
this.dateInput=this.startDateId,this.removeCSS(0),this.addCSS(0),this.startDefDate="",
this.mOpts.autoSubmit&&(this.close(1),this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
}));
}else if(this.startCompareDateId==this.dateInput)this.removeCSS(1),this.removeCSS(0),
$("#"+this.calendarId+"_"+t).attr("class","ta"==this.mOpts.theme?this.mOpts.clickCss:this.mOpts.theme+"_"+this.mOpts.compareCss),
$("#"+this.endCompareDateId).val(e),this.startDefDate=$("#"+this.dateInput).val(),
$("#"+this.dateInput).val(e),1==this.mOpts.singleCompare||1==this.mOpts.isSingleDay?(this.dateInput=this.startCompareDateId,
$("#"+this.endCompareDateId).val(e),(this.mOpts.shortOpr||this.mOpts.autoSubmit)&&this.close(1),
this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
})):this.dateInput=this.endCompareDateId;else if(this.endCompareDateId==this.dateInput){
if(""==$("#"+this.startCompareDateId).val())return this.dateInput=this.startCompareDateId,
this.selectDate(t),!1;
if(0==this.checkDateRange($("#"+this.startCompareDateId).val(),t))return!1;
-1==this.compareStrDate(t,$("#"+this.startCompareDateId).val())&&($("#"+this.dateInput).val($("#"+this.startCompareDateId).val()),
$("#"+this.startCompareDateId).val(e),e=$("#"+this.dateInput).val()),$("#"+this.dateInput).val(e),
this.dateInput=this.startCompareDateId,this.removeCSS(1),this.addCSS(1),this.startDefDate="",
this.mOpts.autoSubmit&&(this.close(1),this.mOpts.success({
startDate:$("#"+this.mOpts.startDateId).val(),
endDate:$("#"+this.mOpts.endDateId).val(),
needCompare:$("#"+this.mOpts.compareCheckboxId).val(),
startCompareDate:$("#"+this.mOpts.startCompareDateId).val(),
endCompareDate:$("#"+this.mOpts.endCompareDateId).val()
}));
}
},i.prototype.show=function(t,e){
if(!this._disabled){
$("#"+e.dateRangeDiv).css("display",t?"none":""),$("#"+e.dateRangeCompareDiv).css("display",t?"":"none");
var a=t?$("#"+this.inputCompareId).offset():$("#"+this.inputId).offset(),s=(t?$("#"+this.inputCompareId).height():$("#"+this.inputId).height(),
parseInt($(document.body)[0].clientWidth)),i=a.left;
return $("#"+this.calendarId).css("display","block"),(1==this.mOpts.singleCompare||1==this.mOpts.isSingleDay)&&($("#"+this.endDateId).css("display","none"),
$("#"+this.endCompareDateId).css("display","none"),$("#"+this.mOpts.joinLineId).css("display","none"),
$("."+this.mOpts.joinLineId).css("display","none")),s>0&&$("#"+this.calendarId).width()+a.left>s&&(i=a.left+$("#"+this.inputId).width()-$("#"+this.calendarId).width()+(/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent)?5:0),
"ta"==e.mOpts.theme&&(i+=50)),$("#"+this.calendarId).css("left",i+"px"),$("#"+this.calendarId).css("top",a.top+("ta"==e.mOpts.theme?35:22)+"px"),
this.changeInput(t?this.startCompareDateId:this.startDateId),!1;
}
},i.prototype.close=function(t){
if(t){
this.mOpts.shortOpr===!0?($("#"+this.inputId).val($("#"+this.startDateId).val()),
$("#"+this.inputCompareId).val($("#"+this.startCompareDateId).val())):$("#"+this.inputId).val($("#"+this.startDateId).val()+(""==$("#"+this.endDateId).val()?"":this.mOpts.defaultText+$("#"+this.endDateId).val())),
this.mOpts.timePicker&&($(".js_dr_msLabel").each(function(t,e){
$.trim($(e).val())||$(e).val("00");
}),this.defaultStartTimes=$.trim($(".js_dr_timeLabel:visible").eq(0).text())+":"+$.trim($(".js_dr_minLabel:visible").eq(0).val())+":"+$.trim($(".js_dr_secLabel:visible").eq(0).val()),
this.mOpts.shortOpr||(this.defaultEndTimes=$.trim($(".js_dr_timeLabel:visible").eq(1).text())+":"+$.trim($(".js_dr_minLabel:visible").eq(1).val())+":"+$.trim($(".js_dr_secLabel:visible").eq(1).val())));
var e=1==this.mOpts.isTodayValid&&""!=this.mOpts.isTodayValid?(new Date).getTime():(new Date).getTime()-864e5,a=this.mOpts.timePicker?Date.parse(new Date($("#"+this.startDateId).val()+" "+this.defaultStartTimes)):this.str2date($("#"+this.startDateId).val()).getTime(),s=this.mOpts.timePicker?Date.parse(new Date($("#"+this.endDateId).val()+" "+this.defaultEndTimes)):this.str2date($("#"+this.endDateId).val()).getTime();
if(a>s){
var i=$("#"+this.startDateId).val();
$("#"+this.startDateId).val($("#"+this.endDateId).val()),$("#"+this.endDateId).val(i);
}
var d=this.str2date($("#"+this.startCompareDateId).val()).getTime(),r=this.str2date($("#"+this.endCompareDateId).val()).getTime();
if(d>r){
var i=$("#"+this.startCompareDateId).val();
$("#"+this.startCompareDateId).val($("#"+this.endCompareDateId).val()),$("#"+this.endCompareDateId).val(i);
}
var n;
n=this.mOpts.timePicker?1==this.mOpts.shortOpr?$("#"+this.startDateId).val()+" "+this.defaultStartTimes:""==$("#"+this.endDateId).val()?$("#"+this.startDateId).val()+" "+this.defaultStartTimes:$("#"+this.startDateId).val()+" "+this.defaultStartTimes+this.mOpts.defaultText+$("#"+this.endDateId).val()+" "+this.defaultEndTimes:1==this.mOpts.shortOpr?$("#"+this.startDateId).val():""==$("#"+this.endDateId).val()?$("#"+this.startDateId).val():$("#"+this.startDateId).val()+this.mOpts.defaultText+$("#"+this.endDateId).val();
var p=document.getElementById(this.inputId);
if(p&&"INPUT"==p.tagName?($("#"+this.inputId).val(n),$("#"+this.inputCompareId).is(":visible")&&$("#"+this.inputCompareId).val(l)):($("#"+this.inputId).html(n),
$("#"+this.inputCompareId).is(":visible")&&$("#"+this.inputCompareId).html(l)),"ta"!=this.mOpts.theme&&""!=$("#"+this.startCompareDateId).val()&&""!=$("#"+this.endCompareDateId).val()){
var m=this.str2date($("#"+this.startCompareDateId).val()).getTime(),h=this.str2date($("#"+this.endCompareDateId).val()).getTime(),o=m+s-a;
o>e&&(o=e,$("#"+this.startCompareDateId).val(this.formatDate(this.date2ymd(new Date(o+a-s)).join("-")))),
$("#"+this.endCompareDateId).val(this.formatDate(this.date2ymd(new Date(o)).join("-")));
var m=this.str2date($("#"+this.startCompareDateId).val()).getTime(),h=this.str2date($("#"+this.endCompareDateId).val()).getTime();
if(m>h){
var i=$("#"+this.startCompareDateId).val();
$("#"+this.startCompareDateId).val($("#"+this.endCompareDateId).val()),$("#"+this.endCompareDateId).val(i);
}
}
var l=1==this.mOpts.shortOpr?$("#"+this.startCompareDateId).val():$("#"+this.startCompareDateId).val()+(""==$("#"+this.endCompareDateId).val()?"":this.mOpts.defaultText+$("#"+this.endCompareDateId).val());
p&&"INPUT"==p.tagName?$("#"+this.inputCompareId).val(l):$("#"+this.inputCompareId).html(l);
$("#"+this.mOpts.startDateId).val($("#"+this.startDateId).val()),$("#"+this.mOpts.endDateId).val($("#"+this.endDateId).val()),
$("#"+this.mOpts.startCompareDateId).val($("#"+this.startCompareDateId).val()),$("#"+this.mOpts.endCompareDateId).val($("#"+this.endCompareDateId).val());
for(var c in this.periodObj)$("#"+this.mOpts[c])&&$("#"+this.mOpts[c]).parent().removeClass("a");
}
return $("#"+this.calendarId).css("display","none"),!1;
},i.prototype.fillDate=function(e,a,s){
var i=this,d="ta"==this.mOpts.theme,r=new Date(e,a,1),n=new Date(e,a,1),p=n.getDay();
n.setDate(1-p);
var m=new Date(e,a+1,0),h=new Date(e,a+1,0);
p=h.getDay(),h.setDate(h.getDate()+6-p);
var o=new Date,l=o.getDate(),c=o.getMonth(),D=o.getFullYear(),I=null,v=document.createElement("table");
if(d){
console.log("00000"),v.className=this.mOpts.dateTable,I=document.createElement("caption"),
$(I).append(e+"年"+(a+1)+"月"),$(v).append(I);
for(var O=document.createElement("thead"),C=document.createElement("tr"),u=["日","一","二","三","四","五","六"],g=0;7>g;g++){
var f=document.createElement("th");
$(f).append(u[g]),$(C).append(f);
}
$(O).append(C),$(v).append(O);
var C=document.createElement("tr"),b=document.createElement("td");
0==s&&$(b).append('<a href="javascript:void(0);" id="'+this.nextMonth+'"><i class="i_next"></i></a>'),
s+1==this.mOpts.calendars&&$(b).append('<a href="javascript:void(0);" id="'+this.preMonth+'"><i class="i_pre"></i></a>'),
$(b).attr("colSpan",7),$(b).css("text-align","center"),$(C).append(b),$(v).append(C);
}else{
console.log("11111"),v.className=this.mOpts.theme+"_"+this.mOpts.dateTable,C=document.createElement("tr"),
b=document.createElement("td"),0==s&&$(b).append('<a href="javascript:void(0);" id="'+this.nextMonth+'" class="gri_dateRangeNextMonth"><span>next</span></a>'),
s+1==this.mOpts.calendars&&$(b).append('<a href="javascript:void(0);" id="'+this.preMonth+'" class="gri_dateRangePreMonth"><span>pre</span></a>'),
$(b).append(e+"年"+(a+1)+"月"),$(b).attr("colSpan",7),$(b).css("text-align","center"),
$(b).css("background-color","#F9F9F9"),$(C).append(b),$(v).append(C);
var u=["日","一","二","三","四","五","六"];
C=document.createElement("tr");
for(var g=0;7>g;g++)b=document.createElement("td"),$(b).append(u[g]),$(C).append(b);
$(v).append(C);
}
for(var y="",_=0,k="",T=n;T.getTime()<=h.getTime();T.setDate(T.getDate()+1)){
if(T.getTime()<r.getTime())y=this.mOpts.theme+"_"+this.mOpts.disableGray,_="-1";else if(T.getTime()>m.getTime())y=this.mOpts.theme+"_"+this.mOpts.disableGray,
_="1";else if(1==this.mOpts.stopToday&&T.getTime()>o.getTime()||T.getTime()<1e3*i.mOpts.minValidDate||""!==i.mOpts.maxValidDate&&T.getTime()>1e3*i.mOpts.maxValidDate)y=this.mOpts.theme+"_"+this.mOpts.disableGray,
_="2";else{
if(_="0",T.getDate()==l&&T.getMonth()==c&&T.getFullYear()==D?1==this.mOpts.isTodayValid?y=this.mOpts.theme+"_"+this.mOpts.isToday:(y=this.mOpts.theme+"_"+this.mOpts.disableGray,
_="2"):y="",!this.mOpts.weekendDis||6!=T.getDay()&&0!=T.getDay()||(y=this.mOpts.theme+"_"+this.mOpts.disableGray,
_="3"),this.mOpts.disCertainDay&&this.mOpts.disCertainDay.length>0)for(var x in this.mOpts.disCertainDay)isNaN(this.mOpts.disCertainDay[x])||T.getDay()!==this.mOpts.disCertainDay[x]||(y=this.mOpts.theme+"_"+this.mOpts.disableGray,
_="4");
if(this.mOpts.disCertainDate&&this.mOpts.disCertainDate.length>0){
var S=!1;
for(var x in this.mOpts.disCertainDate)if(!isNaN(this.mOpts.disCertainDate[x])||isNaN(parseInt(this.mOpts.disCertainDate[x])))if(this.mOpts.disCertainDate[0]===!0){
if(S=!(T.getDate()===this.mOpts.disCertainDate[x]),!S)break;
}else if(S=!(T.getDate()!==this.mOpts.disCertainDate[x]))break;
S&&(y=this.mOpts.theme+"_"+this.mOpts.disableGray,_="4");
}
}
0==T.getDay()&&(C=document.createElement("tr")),b=document.createElement("td"),b.innerHTML=T.getDate(),
""!=y&&$(b).attr("class",y),0==_&&(k=T.getFullYear()+"-"+(T.getMonth()+1)+"-"+T.getDate(),
$(b).attr("id",i.calendarId+"_"+k),$(b).css("cursor","pointer"),function(t){
$(b).bind("click",t,function(){
return i.mOpts.beforeSelect.call(i,t)===!1?!1:(i.selectDate(t),!1);
});
}(k)),$(C).append(b),6==T.getDay()&&$(v).append(C);
}
if(this.mOpts.timePicker){
$(v).find("tbody tr").length<7&&$(v).find("tbody").append('<tr style="background-color:white;height:28px;"><td colspan="7"></td></tr>');
var j=t("tpl/biz_web/ui/timeRange.html.js"),R={
mTime:0==!s?this.defaultStartTimes.split(":")[0]:this.defaultEndTimes.split(":")[0],
mMin:0==!s?this.defaultStartTimes.split(":")[1]:this.defaultEndTimes.split(":")[1],
mSec:0==!s?this.defaultStartTimes.split(":")[2]:this.defaultEndTimes.split(":")[2]
},C=document.createElement("tr"),b=document.createElement("td");
$(b).attr("colspan","7").css("background-color","#f4f5f9"),$(b).append(template.compile(j)({
timeList:R
})),$(b).find(".js_dr_selecter").on("click",function(){
$(this).siblings(".js_dr_option").toggle();
}),$(b).find(".js_dr_time").on("click",function(){
$(this).parents(".js_dr_timeSelectBox").find(".js_dr_timeLabel").text($(this).data("value")),
$(this).parents(".js_dr_option").hide();
}),$(b).find(".js_dr_msLabel").on("input",function(){
var t=$.trim($(this).val());
t=t.replace(/[^0-9]/gi,""),t.length>2&&(t=t.substring(0,2)),$(this).val(t);
}).on("blur",function(){
var t=$.trim($(this).val());
return t.length?(1==t.length?t="0"+$.trim($(this).val()):2==t.length&&(t=t[0].replace(/[^0-5]/gi,"0")+t[1]),
void $(this).val(t)):void $(this).val("00");
}),$(C).append(b),$(v).find("tbody").append(C);
}
return v;
},i.prototype.str2date=function(t){
var e=t.split("-");
return new Date(e[0],e[1]-1,e[2]);
},i.prototype.compareStrDate=function(t,e){
var a=this.str2date(t),s=this.str2date(e);
return a.getTime()>s.getTime()?1:a.getTime()==s.getTime()?0:-1;
},i.prototype.date2ymd=function(t){
return[t.getFullYear(),t.getMonth()+1,t.getDate()];
},i.prototype.changeInput=function(t){
1==this.mOpts.isSingleDay&&(t=this.startDateId);
var e=[this.startDateId,this.startCompareDateId,this.endDateId,this.endCompareDateId],a="";
a=t==this.startDateId||t==this.endDateId?this.mOpts.theme+"_"+this.mOpts.selectCss:this.mOpts.theme+"_"+this.mOpts.compareCss,
t==this.endDateId&&this.mOpts.singleCompare&&(a=this.mOpts.theme+"_"+this.mOpts.compareCss);
for(var s in e)e.hasOwnProperty(s)&&($("#"+e[s]).removeClass(this.mOpts.theme+"_"+this.mOpts.selectCss),
$("#"+e[s]).removeClass(this.mOpts.theme+"_"+this.mOpts.compareCss));
$("#"+t).addClass(a),$("#"+t).css("background-repeat","repeat"),this.dateInput=t;
},i.prototype.formatDate=function(t){
return t.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g,function(t,e,a,s){
return 10>a&&(a="0"+a),10>s&&(s="0"+s),e+"-"+a+"-"+s;
});
},i.prototype.setDate=function(t){
return t=$.extend({},this.initOpt||{},t),s(t);
};
});define("common/qq/events.js",[],function(t,n,a){
"use strict";
function i(t){
this.data=t===!0?window.wx.events||{}:{};
}
i.prototype={
on:function(t,n){
return this.data[t]=this.data[t]||[],this.data[t].push(n),this;
},
off:function(t,n){
return this.data[t]&&this.data[t].length>0&&(n&&"function"==typeof n?$.each(this.data[t],function(a,i){
i===n&&this.data[t].splice(a,1);
}):this.data[t]=[]),this;
},
trigger:function(t){
var n=arguments;
return this.data[t]&&this.data[t].length>0&&$.each(this.data[t],function(t,a){
var i=a.apply(this,Array.prototype.slice.call(n,1));
return i===!1?!1:void 0;
}),this;
}
},a.exports=function(t){
return new i(t);
};
});define("biz_web/utils/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js"],function(e){
"use strict";
function i(e){
g.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),a=e("common/wx/dialog.js"),t=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=wx.T,s=wx.path.webuploader,p=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",l={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif"
},
fileSingleSizeLimit:5242880
},
3:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/mp3,audio/wma,audio/wav,audio/amr"
},
fileSingleSizeLimit:5242880
},
4:{
accept:{
extensions:"rm,rmvb,wmv,avi,mpg,mpeg,mp4",
mimeTypes:"video/rm,video/rmvb,video/wmv,video/avi,video/mpg,video/mpeg,video/mp4"
},
fileSingleSizeLimit:20971520
},
5:{
accept:{
extensions:"pdf",
mimeTypes:"application/pdf"
},
fileSingleSizeLimit:10485760
},
6:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf"
},
fileSingleSizeLimit:5242880
},
7:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif"
},
fileSingleSizeLimit:5242880
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg"
},
fileSingleSizeLimit:5242880
},
9:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:204800
},
10:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:5242880
},
11:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg"
},
fileSingleSizeLimit:5242880
},
12:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/mp3,audio/wma,audio/wav,audio/amr"
},
fileSingleSizeLimit:31457280
},
13:{
accept:{
extensions:"png,bmp,jpeg,jpg,gif",
mimeTypes:"image/png,image/bmp,image/jpeg,image/jpg,image/gif"
},
fileSingleSizeLimit:2097152
}
};
l[15]=l[4];
var m=function(e){
a.show({
type:"warn",
msg:"警告|"+e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
},c=function(e){
var i=n.Uploader;
0==i.support("flash")?m("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>"):0==i.support()?m("<p>您的浏览器不支持上传</p>"):e.refresh();
},d=function(e){
e&&wx.jslog({
src:"common/wx/upload.js"
},null,e);
},u={
swf:s,
auto:!0,
pick:{
multiple:!0
},
fileNumLimit:20,
threads:3,
sendAsBinary:!1,
runtimeOrder:"html5,flash",
compress:{
width:1280,
height:1e8,
quality:90,
afterCompressSizeLimit:2097152,
compressSize:0,
resizeSize:2097152,
maxResolution:6e6,
noCompressIfLarger:!0
},
imageSize:!0,
chunked:!1,
duplicate:!0
},g=new Image,f={},h=function(e){
if(!e.url)throw"missing url";
var a,s,p,m=$('<ul class="upload_file_box" style="display:none"></ul>'),g=$(e.container);
g.on("click",function(){
Math.random()<.1&&d(12),c(a);
}).parent().append(m),function(){
n&&0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),e.only_cdn&&(e.url+="&only_cdn=1"),s={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time),
pick:{
id:g,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},p=l[e.type]||l[2],e=$.extend(!0,{},u,s,p,e);
e.server;
n&&0==n.Uploader.support("html5")&&e.compress&&(e.compress.quality=70);
try{
a=n.create(e);
}catch(h){
if(!a)return;
}
return m.on("click",".js_cancel",function(){
var e=$(this).data("id");
a.cancelFile(e),$(this).hide();
}),a.on("beforeFileQueued",function(i){
return Math.random()<.1&&d(13),e.canContinueUpload&&!e.canContinueUpload()?!1:!(e.onSelect&&e.onSelect(null,i.id,i)===!1);
}),a.on("fileQueued",function(e){
var i={
id:e.id,
fileName:e.name,
size:n.formatSize(e.size)
};
m.append(r(o,i)).show();
}),a.on("fileDequeued",function(){
Math.random()<.1&&d(14),e.onCancel&&e.onCancel();
}),a.on("uploadProgress",function(i,n){
var a="#uploadItem%s".sprintf(i.id),t=m.find(a).find(".progress_bar_thumb");
t.width("%s%".sprintf(100*n)),1==n&&m.find(a).find(".js_cancel").remove(),e.onProgress&&e.onProgress(null,i.id,i,{
percentage:n
});
}),a.on("uploadStart",function(e){
f[e.id]=+new Date;
}),a.on("uploadSuccess",function(n,a,o){
if(Math.random()<.1&&d(16),a&&a.base_resp){
var r=+a.base_resp.ret;
if(0==r)Math.random()<.1&&(d(17),f[n.id]&&i(+new Date-f[n.id]));else switch(n.setStatus("invalid"),
r){
case-18:
case 200018:
t.err("页面停留时间过久，请刷新页面后重试！");
break;

case-20:
case 200020:
t.err("无法解释该图片，请使用另一图片或截图另存");
break;

case-13:
case 200013:
t.err("上传文件过于频繁，请稍后再试");
break;

case-10:
case 200010:
t.err("上传文件过大");
break;

case-22:
case 200022:
t.err("上传音频文件不能超过60秒");
break;

case-39:
case 200039:
t.err("上传图片高度（像素）与宽度（像素）的乘积不能超过600万");
break;

case 220001:
t.err('"素材管理"中的存储数量已达到上限，请删除后再操作。');
break;

case 220002:
t.err("你的图片库已达到存储上限，请进行清理。");
break;

default:
t.err("上传文件发送出错，请刷新页面后重试！");
}
}
e.onComplete&&e.onComplete(null,n.id,n,a,{
fileCount:o.numOfProgress+o.numOfQueue
});
}),a.on("uploadFinished",function(i){
this.reset(),m.fadeOut().html(""),f={},0==i.numOfInvalid&&i.numOfSuccess>0&&e.onAllComplete&&e.onAllComplete(null,{
errors:i.numOfCancel+i.numOfInvalid+i.numOfUploadFailed+i.numofDeleted+i.numofInterrupt,
filesUploaded:i.numOfSuccess
});
}),a.on("uploadError",function(){
Math.random()<.1&&d(15),e.onError&&e.onError();
}),a.on("error",function(i,a,o){
switch("object"==typeof a&&(o=a),i){
case"Q_EXCEED_NUM_LIMIT":
t.err("一次上传最多只能上传%s个文件".sprintf(a));
break;

case"F_EXCEED_SIZE":
t.err("文件大小不能超过%s".sprintf(n.formatSize(a,"0")));
break;

case"F_EXCEED_COMPRESS_SIZE":
t.err("图片尺寸太大，压缩后不能超过%s，请缩小图片尺寸再试".sprintf(e.compress.afterCompressSizeLimit?e.compress.afterCompressSizeLimit/1048576+"M":"2M")),
d(42);
break;

case"Q_TYPE_DENIED":
t.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),a;
},b=function(e){
return function(i){
return i.url=e,h(i);
};
},w=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:h,
uploadBizFile:b(p+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:b(p+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:b(p+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:b(p+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:b(p+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:b(p+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:b(p+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:b(p+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:b(p+"/misc/setlocation?action=upload"),
mediaFile:b(p+"/cgi-bin/filetransfer?action=bizmedia"),
uploadBbsCdnFile:b(p+"/filetransfer?action=upload_cdn&f=json"),
uploadCdnFileFromAd:function(e){
return b(p+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=p+"/cgi-bin/filetransfer?action=upload_material&f=json","undefined"!=typeof e.scene&&(e.url+="&scene="+e.scene),
1==e.doublewrite&&(e.url+="&writetype=doublewrite&groupid="+(e.groupid||1)),h(e);
},
uploadCdnFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var a in e)n.push(encodeURIComponent(a)+"="+encodeURIComponent(e[a]));
return b(p+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
},
uploadTmpFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var a in e)n.push(encodeURIComponent(a)+"="+encodeURIComponent(e[a]));
return b(p+"/cgi-bin/filetransfer?action=preview_check_range&f=json&"+n.join("&"));
},
tmpFileUrl:w(p+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:w(p+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:w(p+"/cgi-bin/filetransfer?action=multimedia")
};
});define("common/wx/Step.js", [ "widget/processor_bar.css", "tpl/step.html.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = wx.T, s = e("widget/processor_bar.css"), o = e("tpl/step.html.js"), u = {
selected: 1
}, a = function() {
var e = navigator.userAgent.toLowerCase(), t = /(msie) ([\w.]+)/.exec(e) || [], n = t[1] || "";
return n == "msie";
};
function f(e) {
this.opts = $.extend(!0, {}, u, e), this.init();
}
f.prototype.init = function() {
var e = this.opts, t = e.names.length, n = parseInt(e.selected, 10), r = [], s, u;
n = n < 0 ? 0 : n > t ? t : n;
for (s = 0; s < t; s++) u = f.getClass(s + 1, n), r.push({
name: e.names[s],
cls: u
});
this.$dom = $(i(o, {
stepArr: r,
length: t
})).appendTo(e.container), a() && this.$dom.addClass("ie");
}, f.prototype.setStep = f.prototype.go = function(e) {
var t = this.$dom.find("li.step"), n = t.length;
return e = e < 0 ? 0 : e > n ? n : e, t.each(function(t, r) {
var i = f.getClass(t + 1, e);
t + 1 == n ? r.className = "no_extra " + "step grid_item size1of%s %s".sprintf(n, i) : r.className = "step grid_item size1of%s %s".sprintf(n, i);
}), this;
}, f.getClass = function(e, t) {
var n;
return e < t - 1 ? n = "pprev" : e === t - 1 ? n = "prev" : e === t ? n = "current" : e === t + 1 ? n = "next" : e > t + 1 && (n = "nnext"), n;
}, n.exports = f;
} catch (l) {
wx.jslog({
src: "common/wx/Step.js"
}, l);
}
});define("common/wx/tooltips.js",["tpl/tooltips.html.js"],function(o,t,n){
"use strict";
var i={
position:{},
container:"",
type:"hover",
buttons:[],
delay:300,
disabled:!1,
reposition:!1,
container_close:!1,
parentClass:"",
container_mode:"absolute"
},s=wx.T,e=o("tpl/tooltips.html.js"),p="btn_disabled",c="hover",h="show",a=function(o){
if(this.options=o=$.extend(!0,{},i,o),this.$container=$(this.options.container),
this.$container&&0!=this.$container.length){
var t=this.$container.offset(),n=this.$container.height(),a=this.options.position.left||this.$container.data("x")||0,l=n+(this.options.position.top||this.$container.data("y")||0);
this.options.offset={
left:t.left+a,
top:t.top+l,
left_x:a,
top_y:l
},!o.content&&(o.content=this.$container.data("tips")||""),this.$dom=$(s(e,o)).appendTo("body"),
this.options.disabled&&this.$container.addClass(p);
var d=this,f=this.options.type===c||"click"===this.options.type?this.options.type:c;
if(f==c){
var r=null;
this.$container.hover(function(){
d.options.onshow&&"function"==typeof d.options.onshow?d.options.onshow.apply(d):!d.options.disabled&&d.show();
},function(){
r=window.setTimeout(function(){
d.hide();
},d.options.delay);
}),this.$dom.hover(function(){
r&&window.clearTimeout(r);
},function(){
d.hide();
});
}else this.$container.click(function(){
return d.options.disabled||d.options.onbeforeclick&&"function"==typeof d.options.onbeforeclick&&d.options.onbeforeclick.apply(d)===!1?void 0:(d.$dom.data(h)?d.options.onclose&&"function"==typeof d.options.onclose?d.options.onclose.apply(d):d.hide():d.options.onshow&&"function"==typeof d.options.onshow?d.options.onshow.apply(d):d.show(),
!1);
});
$(document).on("click",function(o){
d.$dom.find(o.target).length||(d.options.onclose&&"function"==typeof d.options.onclose?d.options.onclose.apply(d,[o]):d.hide());
}),d.$dom.find(".js_popover_close").on("click",function(o){
return d.options.onclose&&"function"==typeof d.options.onclose?d.options.onclose.apply(d,[o]):d.hide(),
!1;
}),this.$dom.hide(),function(){
$.each(d.$dom.find(".js_btn"),function(o,t){
d.options.buttons[o].click&&$(t).on("click",function(){
d.options.buttons[o].click.apply(d);
});
});
}();
}
};
a.prototype={
constructor:a,
show:function(){
if(this.options.reposition){
var o=this.$container.offset(),t=o.left+this.options.offset.left_x,n=o.top+this.options.offset.top_y;
this.$dom.css({
left:t,
top:n
}).show();
}else this.$dom.show();
this.$dom.data(h,!0);
},
hide:function(){
this.$dom.hide(),this.$dom.data(h,!1);
},
enable:function(){
return this.options.disabled=!1,this.$container.removeClass(p),this;
},
disable:function(){
return this.options.disabled=!0,this.$container.addClass(p),this;
}
},n.exports=a;
});define("biz_web/ui/checkbox.js",["tpl/biz_web/ui/checkbox.html.js"],function(t){
"use strict";
function e(t){
var e=$(t);
e.each(function(){
var t=$(this),e=t.prop("checked"),n=t.parent();
e?n.addClass("selected"):n.removeClass("selected");
});
}
function n(t){
var e=$(t);
e.each(function(){
var t=$(this).prop("disabled"),e=$(this).parent();
t?e.addClass("disabled"):e.removeClass("disabled");
});
}
function i(){
return"checkbox"+s++;
}
var a={
container:null,
label:"",
name:"",
type:"checkbox"
},c=t("tpl/biz_web/ui/checkbox.html.js"),r=wx.T,s=1,o=1,p=function(t){
this.options=$.extend(!0,{},a,t),this.options.index=o++,this.$container=$(this.options.container),
this.$dom=$(r(c,this.options)).appendTo(this.$container),this.$input=this.$dom.find("input"),
this.$input.checkbox();
};
return p.prototype={
checked:function(t){
return"undefined"!=typeof t&&(this.$input.prop("checked",t),e(this.$input)),this.$input.prop("checked");
},
disabled:function(t){
return"undefined"!=typeof t&&(this.$input.prop("disabled",t),n(this.$input)),this.$input.prop("disabled");
}
},$.fn.checkbox=function(t){
var a,c,r,s,o=!1;
"boolean"==typeof t?a=t:$.isPlainObject(t)?(a=t.multi,c=t.onChanged):"string"==typeof t?(o=!0,
r=t,s=[].slice.call(arguments,1)):"undefined"==typeof t&&(t={}),"undefined"==typeof a&&(a=this.is("input[type=checkbox]"));
var p=this,d=a?"checkbox":"radio",h={
checked:function(t){
return p.attr("checked",t),p.prop("checked",t),e(p),p;
},
disabled:function(t){
return p.attr("disabled",t),p.prop("disabled",t),n(p),p;
},
value:function(){
var t=p.eq(0);
return t.prop("checked")?t.val():"";
},
values:function(){
var t=[];
return p.each(function(){
$(this).prop("checked")&&t.push($(this).val());
}),t;
},
adjust:function(t){
var n;
return n="string"==typeof t?t.split(","):t,n&&n.length>0&&p.each(function(){
var t=$(this);
n.indexOf(t.val())>=0&&(t.attr("checked",!0),e(t));
}),this;
},
disable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&p.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!0),n(t));
}),this;
},
setall:function(t){
p.each(function(){
var e=$(this);
e.attr("disabled",t?!1:!0),n(e);
});
},
enable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&p.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!1),n(t));
}),this;
},
label:function(t){
return t&&(p.parent().find(".lbl_content").text(t),p.attr("data-label",t)),p;
}
};
return o&&"function"==typeof h[r]?h[r].apply(h,s):(this.addClass("frm_"+d).each(function(){
var t=$(this),e=t.parent();
if(!e.is("label")){
var n=t.attr("data-label")||"";
e=$('<label class="frm_{type}_label"><i class="icon_{type}"></i></label>'.format({
type:d
})).append("<span class='lbl_content'>{content}</span>".format({
content:n.html(!0)
})),e.insertBefore(t).prepend(t);
}
if(!this.id){
var a=i();
this.id=a;
}
e.attr("for",this.id);
}),e(this),n(this),t&&t.initOnChanged&&"function"==typeof c&&p.parent().find("input[type=checkbox],input[type=radio]").each(function(){
c.call(h,$(this));
}),this.parent().delegate("input[type=checkbox],input[type=radio]","click",function(){
var t=$(this),n=t.prop("checked");
a?(t.attr("checked",n),e(t)):(p.attr("checked",!1),t.attr("checked",!0).prop("checked",!0),
e(p)),"function"==typeof c&&c.call(h,t);
}).addClass("frm_"+d+"_label"),h);
},p;
});define("biz_web/ui/dropdown.js",["biz_web/widget/dropdown.css","tpl/biz_web/ui/dropdown.html.js"],function(e){
"use strict";
function t(e){
e.render&&(e.renderHtml="",$.each(e.data,function(t,a){
e.renderHtml+=e.render(a);
})),e=$.extend(!0,{},d,e);
var t=this;
t.container=$(e.container),t.container.addClass(e.search?i+" search":i),this.isDisabled=e.disabled,
e.disabled?t.container.addClass("disabled"):t.container.removeClass("disabled"),
t.opt=e,t.container.html(template.compile(n)(e)).find(".jsDropdownList").hide(),
t.bt=t.container.find(".jsDropdownBt"),t.dropdown=t.container.find(".jsDropdownList"),
$.each(e.data,function(e,a){
$.data(t.dropdown.find(".jsDropdownItem")[e],"value",a.value),$.data(t.dropdown.find(".jsDropdownItem")[e],"name",a.name),
$.data(t.dropdown.find(".jsDropdownItem")[e],"item",a);
}),"undefined"!=typeof e.index&&0!==e.data.length&&(t.bt.find(".jsBtLabel").html(e.data[e.index].name||e.label),
t.value=e.data[e.index].value),t.bt.on("click",function(){
return a(),e.disabled||(t.dropdown.show(),t.container.addClass("open")),!1;
}),e.search&&t.bt.find(".jsBtLabel").on("keyup",function(e){
if(!t.disabled){
var a=$(this);
if(13==e.keyCode)t.value?(a.html(a.data("name")).removeClass("error"),t.dropdown.hide()):a.find("div").remove();else{
var n=a.html().trim(),d=[];
t.value=null,t.dropdown.show().find(".jsDropdownItem").each(function(){
var e=$(this);
e.hasClass("js_empty")||(e.data("name").indexOf(n)>-1?(e.parent().show(),d.push({
name:e.data("name"),
value:e.data("value")
})):e.parent().hide());
}),0==d.length?0==t.dropdown.find(".js_empty").length&&t.dropdown.append('<li class="jsDropdownItem js_empty empty">未找到"'+n+'"</li>'):(t.dropdown.find(".js_empty").remove(),
1==d.length&&(d[0].name==n?a.removeClass("error"):a.data("name",d[0].name),t.value=d[0].value));
}
}
}).on("blur",function(){
if(!t.disabled){
var a=$(this);
t.value?$(this).html()!=$(this).data("name")&&(a.addClass("error"),t.value=null):""!=a.html()?a.addClass("error"):(a.html(e.label).removeClass("error"),
t.value=null);
}
}).on("focus",function(){
if(!t.disabled){
var a=$(this),n=$(this).html().trim();
n==e.label&&a.html("").removeClass("error"),""==n&&a.removeClass("error"),t.dropdown.show(),
t.container.addClass("open");
}
}),$(document).on("click",a),t.dropdown.on("click",".jsDropdownItem",function(){
if("disabled"==$(this).attr("disabled"))return!1;
var a=$(this).data("value"),n=$(this).data("name"),d=$(this).data("index"),i=$(this).parents(".jsDropdownList").siblings(".jsDropdownBt").find(".jsBtLabel").attr("data-value");
if((!t.value||t.value&&t.value!=a)&&(t.value=a,t.name=n,e.callback&&"function"==typeof e.callback)){
var o=e.callback(a,n,d,$(this).data("item"),i)||n,s=$(this).data("value");
e.search?t.bt.find(".jsBtLabel").html(o).data("name",o).removeClass("error"):t.bt.find(".jsBtLabel").attr("data-value",s).html(o);
}
t.dropdown.hide();
});
}
function a(){
$(".jsDropdownList").hide(),$(".dropdown_menu").each(function(){
!$(this).hasClass("dropdown_checkbox")&&$(this).removeClass("open");
});
}
e("biz_web/widget/dropdown.css");
var n=e("tpl/biz_web/ui/dropdown.html.js"),d={
label:"请选择",
data:[],
callback:$.noop,
render:$.noop,
delay:500,
disabled:!1,
search:!1
},i="dropdown_menu";
return t.prototype={
selected:function(e,t){
var a=this;
if("number"==typeof e){
if(this.opt.data&&this.opt.data[e]){
var n=this.opt.data[e].name,d=this.opt.data[e].value;
0==t||this.dropdown.find(".jsDropdownItem:eq("+e+")").trigger("click",d),this.bt.find(".jsBtLabel").html(n);
}
}else $.each(this.opt.data,function(n,i){
return e==i.value||e==i.name?(0==t||a.dropdown.find(".jsDropdownItem:eq("+n+")").trigger("click",d),
a.bt.find(".jsBtLabel").html(i.name),!1):void 0;
});
return this;
},
reset:function(){
return this.bt.find(".jsBtLabel").html(this.opt.label),this.value=null,this;
},
hidegreater:function(e){
var t=this;
return"number"==typeof e&&t.opt.data&&t.opt.data[e]&&(t.dropdown.find(".jsDropdownItem").show(),
t.dropdown.find(".jsDropdownItem:gt("+e+")").hide()),this;
},
destroy:function(){
return this.isDisabled&&this.container.removeClass("disabled"),this.container.children().remove(),
this.container.off(),this;
},
enable:function(){
return this.opt.disabled=!1,this.container.removeClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!0),
this;
},
disable:function(){
return this.opt.disabled=!0,this.container.addClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!1),
this;
}
},t;
});define("cardticket/add/msg_operate_type_html.js",["tpl/media/cardmsg.html.js"],function(a){
"use strict";
var s={
1:'{if msg_operation.appmsg_title}<div class="appmsg single">                <div class="appmsg_content">                    <div class="appmsg_info">                        <em class="appmsg_date">{msg_operation.appmsg_update_time}</em>                    </div>                    <div class="appmsg_item">                        <h4 class="appmsg_title">                            <a href="{msg_operation.url}" target="_blank">{msg_operation.appmsg_title}</a>                        </h4>                        <div class="appmsg_thumb_wrp" style="background-image:url(\'{msg_operation.appmsg_cover}\')"></div>                        <p class="appmsg_desc">{msg_operation.appmsg_digest}</p>                        {if msg_operation.appmsg_type == 10}<a href="" class="edit_mask preview_mask js_preview" data-msgid="{msg_operation.appmsg_appmsgid}" data-idx="{msg_operation.appmsg_itemidx-1}">                            <div class="edit_mask_content">                                <p class="">                                    预览文章                                </p>                            </div>                            <span class="vm_box"></span>                        </a>{/if}                    </div>                </div>             </div>             {else}            <a href="{msg_operation.url}" target="_blank">{msg_operation.text}</a>             {/if}',
2:'<a target="_blank" href="{msg_operation.url}">{msg_operation.url}</a>',
5:a("tpl/media/cardmsg.html.js"),
4:'<a target="_blank" href="{msg_operation.url}">{msg_operation.url}</a>',
0:""
};
return s;
});define("biz_common/moment.js",[],function(t,e,n){
function s(t,e){
return function(n){
return c(t.call(this,n),e);
};
}
function r(t){
return function(e){
return this.lang().ordinal(t.call(this,e));
};
}
function a(){}
function i(t){
u(this,t);
}
function o(t){
var e=this._data={},n=t.years||t.year||t.y||0,s=t.months||t.month||t.M||0,r=t.weeks||t.week||t.w||0,a=t.days||t.day||t.d||0,i=t.hours||t.hour||t.h||0,o=t.minutes||t.minute||t.m||0,u=t.seconds||t.second||t.s||0,c=t.milliseconds||t.millisecond||t.ms||0;
this._milliseconds=c+1e3*u+6e4*o+36e5*i,this._days=a+7*r,this._months=s+12*n,e.milliseconds=c%1e3,
u+=d(c/1e3),e.seconds=u%60,o+=d(u/60),e.minutes=o%60,i+=d(o/60),e.hours=i%24,a+=d(i/24),
a+=7*r,e.days=a%30,s+=d(a/30),e.months=s%12,n+=d(s/12),e.years=n;
}
function u(t,e){
for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);
return t;
}
function d(t){
return 0>t?Math.ceil(t):Math.floor(t);
}
function c(t,e){
for(var n=t+"";n.length<e;)n="0"+n;
return n;
}
function h(t,e,n){
var s,r=e._milliseconds,a=e._days,i=e._months;
r&&t._d.setTime(+t+r*n),a&&t.date(t.date()+a*n),i&&(s=t.date(),t.date(1).month(t.month()+i*n).date(Math.min(s,t.daysInMonth())));
}
function f(t){
return"[object Array]"===Object.prototype.toString.call(t);
}
function l(t,e){
var n,s=Math.min(t.length,e.length),r=Math.abs(t.length-e.length),a=0;
for(n=0;s>n;n++)~~t[n]!==~~e[n]&&a++;
return a+r;
}
function _(t,e){
return e.abbr=t,A[t]||(A[t]=new a),A[t].set(e),A[t];
}
function m(e){
return e?(!A[e]&&Z&&t("./lang/"+e),A[e]):C.fn._lang;
}
function M(t){
return t.match(/\[.*\]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");
}
function y(t){
var e,n,s=t.match(E);
for(e=0,n=s.length;n>e;e++)s[e]=ie[s[e]]?ie[s[e]]:M(s[e]);
return function(r){
var a="";
for(e=0;n>e;e++)a+="function"==typeof s[e].call?s[e].call(r,t):s[e];
return a;
};
}
function Y(t,e){
function n(e){
return t.lang().longDateFormat(e)||e;
}
for(var s=5;s--&&J.test(e);)e=e.replace(J,n);
return se[e]||(se[e]=y(e)),se[e](t);
}
function D(t){
switch(t){
case"DDDD":
return $;

case"YYYY":
return I;

case"YYYYY":
return X;

case"S":
case"SS":
case"SSS":
case"DDD":
return N;

case"MMM":
case"MMMM":
case"dd":
case"ddd":
case"dddd":
case"a":
case"A":
return j;

case"X":
return G;

case"Z":
case"ZZ":
return R;

case"T":
return B;

case"MM":
case"DD":
case"YY":
case"HH":
case"hh":
case"mm":
case"ss":
case"M":
case"D":
case"d":
case"H":
case"h":
case"m":
case"s":
return V;

default:
return new RegExp(t.replace("\\",""));
}
}
function p(t,e,n){
var s,r=n._a;
switch(t){
case"M":
case"MM":
r[1]=null==e?0:~~e-1;
break;

case"MMM":
case"MMMM":
s=m(n._l).monthsParse(e),null!=s?r[1]=s:n._isValid=!1;
break;

case"D":
case"DD":
case"DDD":
case"DDDD":
null!=e&&(r[2]=~~e);
break;

case"YY":
r[0]=~~e+(~~e>68?1900:2e3);
break;

case"YYYY":
case"YYYYY":
r[0]=~~e;
break;

case"a":
case"A":
n._isPm="pm"===(e+"").toLowerCase();
break;

case"H":
case"HH":
case"h":
case"hh":
r[3]=~~e;
break;

case"m":
case"mm":
r[4]=~~e;
break;

case"s":
case"ss":
r[5]=~~e;
break;

case"S":
case"SS":
case"SSS":
r[6]=~~(1e3*("0."+e));
break;

case"X":
n._d=new Date(1e3*parseFloat(e));
break;

case"Z":
case"ZZ":
n._useUTC=!0,s=(e+"").match(te),s&&s[1]&&(n._tzh=~~s[1]),s&&s[2]&&(n._tzm=~~s[2]),
s&&"+"===s[0]&&(n._tzh=-n._tzh,n._tzm=-n._tzm);
}
null==e&&(n._isValid=!1);
}
function g(t){
var e,n,s=[];
if(!t._d){
for(e=0;7>e;e++)t._a[e]=s[e]=null==t._a[e]?2===e?1:0:t._a[e];
s[3]+=t._tzh||0,s[4]+=t._tzm||0,n=new Date(0),t._useUTC?(n.setUTCFullYear(s[0],s[1],s[2]),
n.setUTCHours(s[3],s[4],s[5],s[6])):(n.setFullYear(s[0],s[1],s[2]),n.setHours(s[3],s[4],s[5],s[6])),
t._d=n;
}
}
function w(t){
var e,n,s=t._f.match(E),r=t._i;
for(t._a=[],e=0;e<s.length;e++)n=(D(s[e]).exec(r)||[])[0],n&&(r=r.slice(r.indexOf(n)+n.length)),
ie[s[e]]&&p(s[e],n,t);
t._isPm&&t._a[3]<12&&(t._a[3]+=12),t._isPm===!1&&12===t._a[3]&&(t._a[3]=0),g(t);
}
function T(t){
for(var e,n,s,r,a=99;t._f.length;){
if(e=u({},t),e._f=t._f.pop(),w(e),n=new i(e),n.isValid()){
s=n;
break;
}
r=l(e._a,n.toArray()),a>r&&(a=r,s=n);
}
u(t,s);
}
function k(t){
var e,n=t._i;
if(q.exec(n)){
for(t._f="YYYY-MM-DDT",e=0;4>e;e++)if(Q[e][1].exec(n)){
t._f+=Q[e][0];
break;
}
R.exec(n)&&(t._f+=" Z"),w(t);
}else t._d=new Date(n);
}
function v(t){
var e=t._i,n=P.exec(e);
void 0===e?t._d=new Date:n?t._d=new Date(+n[1]):"string"==typeof e?k(t):f(e)?(t._a=e.slice(0),
g(t)):t._d=new Date(e instanceof Date?+e:e);
}
function S(t,e,n,s,r){
return r.relativeTime(e||1,!!n,t,s);
}
function L(t,e,n){
var s=U(Math.abs(t)/1e3),r=U(s/60),a=U(r/60),i=U(a/24),o=U(i/365),u=45>s&&["s",s]||1===r&&["m"]||45>r&&["mm",r]||1===a&&["h"]||22>a&&["hh",a]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",U(i/30)]||1===o&&["y"]||["yy",o];
return u[2]=e,u[3]=t>0,u[4]=n,S.apply({},u);
}
function b(t,e,n){
var s=n-e,r=n-t.day();
return r>s&&(r-=7),s-7>r&&(r+=7),Math.ceil(C(t).add("d",r).dayOfYear()/7);
}
function F(t){
var e=t._i,n=t._f;
return null===e||""===e?null:("string"==typeof e&&(t._i=e=m().preparse(e)),C.isMoment(e)?(t=u({},e),
t._d=new Date(+e._d)):n?f(n)?T(t):w(t):v(t),new i(t));
}
function H(t,e){
C.fn[t]=C.fn[t+"s"]=function(t){
var n=this._isUTC?"UTC":"";
return null!=t?(this._d["set"+n+e](t),this):this._d["get"+n+e]();
};
}
function O(t){
C.duration.fn[t]=function(){
return this._data[t];
};
}
function z(t,e){
C.duration.fn["as"+t]=function(){
return+this/e;
};
}
for(var C,W,x="2.0.0",U=Math.round,A={},Z="undefined"!=typeof n&&n.exports,P=/^\/?Date\((\-?\d+)/i,E=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,J=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,V=/\d\d?/,N=/\d{1,3}/,$=/\d{3}/,I=/\d{1,4}/,X=/[+\-]?\d{1,6}/,j=/[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,R=/Z|[\+\-]\d\d:?\d\d/i,B=/T/i,G=/[\+\-]?\d+(\.\d{1,3})?/,q=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,K="YYYY-MM-DDTHH:mm:ssZ",Q=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],te=/([\+\-]|\d\d)/gi,ee="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),ne={
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
},se={},re="DDD w W M D d".split(" "),ae="M D H h m s w W".split(" "),ie={
M:function(){
return this.month()+1;
},
MMM:function(t){
return this.lang().monthsShort(this,t);
},
MMMM:function(t){
return this.lang().months(this,t);
},
D:function(){
return this.date();
},
DDD:function(){
return this.dayOfYear();
},
d:function(){
return this.day();
},
dd:function(t){
return this.lang().weekdaysMin(this,t);
},
ddd:function(t){
return this.lang().weekdaysShort(this,t);
},
dddd:function(t){
return this.lang().weekdays(this,t);
},
w:function(){
return this.week();
},
W:function(){
return this.isoWeek();
},
YY:function(){
return c(this.year()%100,2);
},
YYYY:function(){
return c(this.year(),4);
},
YYYYY:function(){
return c(this.year(),5);
},
a:function(){
return this.lang().meridiem(this.hours(),this.minutes(),!0);
},
A:function(){
return this.lang().meridiem(this.hours(),this.minutes(),!1);
},
H:function(){
return this.hours();
},
h:function(){
return this.hours()%12||12;
},
m:function(){
return this.minutes();
},
s:function(){
return this.seconds();
},
S:function(){
return~~(this.milliseconds()/100);
},
SS:function(){
return c(~~(this.milliseconds()/10),2);
},
SSS:function(){
return c(this.milliseconds(),3);
},
Z:function(){
var t=-this.zone(),e="+";
return 0>t&&(t=-t,e="-"),e+c(~~(t/60),2)+":"+c(~~t%60,2);
},
ZZ:function(){
var t=-this.zone(),e="+";
return 0>t&&(t=-t,e="-"),e+c(~~(10*t/6),4);
},
X:function(){
return this.unix();
}
};re.length;)W=re.pop(),ie[W+"o"]=r(ie[W]);
for(;ae.length;)W=ae.pop(),ie[W+W]=s(ie[W],2);
for(ie.DDDD=s(ie.DDD,3),a.prototype={
set:function(t){
var e,n;
for(n in t)e=t[n],"function"==typeof e?this[n]=e:this["_"+n]=e;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(t){
return this._months[t.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(t){
return this._monthsShort[t.month()];
},
monthsParse:function(t){
var e,n,s;
for(this._monthsParse||(this._monthsParse=[]),e=0;12>e;e++)if(this._monthsParse[e]||(n=C([2e3,e]),
s="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[e]=new RegExp(s.replace(".",""),"i")),
this._monthsParse[e].test(t))return e;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(t){
return this._weekdays[t.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(t){
return this._weekdaysShort[t.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(t){
return this._weekdaysMin[t.day()];
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(t){
var e=this._longDateFormat[t];
return!e&&this._longDateFormat[t.toUpperCase()]&&(e=this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(t){
return t.slice(1);
}),this._longDateFormat[t]=e),e;
},
meridiem:function(t,e,n){
return t>11?n?"pm":"PM":n?"am":"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[last] dddd [at] LT",
sameElse:"L"
},
calendar:function(t,e){
var n=this._calendar[t];
return"function"==typeof n?n.apply(e):n;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(t,e,n,s){
var r=this._relativeTime[n];
return"function"==typeof r?r(t,e,n,s):r.replace(/%d/i,t);
},
pastFuture:function(t,e){
var n=this._relativeTime[t>0?"future":"past"];
return"function"==typeof n?n(e):n.replace(/%s/i,e);
},
ordinal:function(t){
return this._ordinal.replace("%d",t);
},
_ordinal:"%d",
preparse:function(t){
return t;
},
postformat:function(t){
return t;
},
week:function(t){
return b(t,this._week.dow,this._week.doy);
},
_week:{
dow:0,
doy:6
}
},C=function(t,e,n){
return F({
_i:t,
_f:e,
_l:n,
_isUTC:!1
});
},C.utc=function(t,e,n){
return F({
_useUTC:!0,
_isUTC:!0,
_l:n,
_i:t,
_f:e
});
},C.unix=function(t){
return C(1e3*t);
},C.duration=function(t,e){
var n,s=C.isDuration(t),r="number"==typeof t,a=s?t._data:r?{}:t;
return r&&(e?a[e]=t:a.milliseconds=t),n=new o(a),s&&t.hasOwnProperty("_lang")&&(n._lang=t._lang),
n;
},C.version=x,C.defaultFormat=K,C.lang=function(t,e){
return t?(e?_(t,e):A[t]||m(t),void(C.duration.fn._lang=C.fn._lang=m(t))):C.fn._lang._abbr;
},C.langData=function(t){
return t&&t._lang&&t._lang._abbr&&(t=t._lang._abbr),m(t);
},C.isMoment=function(t){
return t instanceof i;
},C.isDuration=function(t){
return t instanceof o;
},C.fn=i.prototype={
clone:function(){
return C(this);
},
valueOf:function(){
return+this._d;
},
unix:function(){
return Math.floor(+this._d/1e3);
},
toString:function(){
return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function(){
return this._d;
},
toJSON:function(){
return C.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function(){
var t=this;
return[t.year(),t.month(),t.date(),t.hours(),t.minutes(),t.seconds(),t.milliseconds()];
},
isValid:function(){
return null==this._isValid&&(this._isValid=this._a?!l(this._a,(this._isUTC?C.utc(this._a):C(this._a)).toArray()):!isNaN(this._d.getTime())),
!!this._isValid;
},
utc:function(){
return this._isUTC=!0,this;
},
local:function(){
return this._isUTC=!1,this;
},
format:function(t){
var e=Y(this,t||C.defaultFormat);
return this.lang().postformat(e);
},
add:function(t,e){
var n;
return n="string"==typeof t?C.duration(+e,t):C.duration(t,e),h(this,n,1),this;
},
subtract:function(t,e){
var n;
return n="string"==typeof t?C.duration(+e,t):C.duration(t,e),h(this,n,-1),this;
},
diff:function(t,e,n){
var s,r,a=this._isUTC?C(t).utc():C(t).local(),i=6e4*(this.zone()-a.zone());
return e&&(e=e.replace(/s$/,"")),"year"===e||"month"===e?(s=432e5*(this.daysInMonth()+a.daysInMonth()),
r=12*(this.year()-a.year())+(this.month()-a.month()),r+=(this-C(this).startOf("month")-(a-C(a).startOf("month")))/s,
"year"===e&&(r/=12)):(s=this-a-i,r="second"===e?s/1e3:"minute"===e?s/6e4:"hour"===e?s/36e5:"day"===e?s/864e5:"week"===e?s/6048e5:s),
n?r:d(r);
},
from:function(t,e){
return C.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e);
},
fromNow:function(t){
return this.from(C(),t);
},
calendar:function(){
var t=this.diff(C().startOf("day"),"days",!0),e=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";
return this.format(this.lang().calendar(e,this));
},
isLeapYear:function(){
var t=this.year();
return t%4===0&&t%100!==0||t%400===0;
},
isDST:function(){
return this.zone()<C([this.year()]).zone()||this.zone()<C([this.year(),5]).zone();
},
day:function(t){
var e=this._isUTC?this._d.getUTCDay():this._d.getDay();
return null==t?e:this.add({
d:t-e
});
},
startOf:function(t){
switch(t=t.replace(/s$/,"")){
case"year":
this.month(0);

case"month":
this.date(1);

case"week":
case"day":
this.hours(0);

case"hour":
this.minutes(0);

case"minute":
this.seconds(0);

case"second":
this.milliseconds(0);
}
return"week"===t&&this.day(0),this;
},
endOf:function(t){
return this.startOf(t).add(t.replace(/s?$/,"s"),1).subtract("ms",1);
},
isAfter:function(t,e){
return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)>+C(t).startOf(e);
},
isBefore:function(t,e){
return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)<+C(t).startOf(e);
},
isSame:function(t,e){
return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)===+C(t).startOf(e);
},
zone:function(){
return this._isUTC?0:this._d.getTimezoneOffset();
},
daysInMonth:function(){
return C.utc([this.year(),this.month()+1,0]).date();
},
dayOfYear:function(t){
var e=U((C(this).startOf("day")-C(this).startOf("year"))/864e5)+1;
return null==t?e:this.add("d",t-e);
},
isoWeek:function(t){
var e=b(this,1,4);
return null==t?e:this.add("d",7*(t-e));
},
week:function(t){
var e=this.lang().week(this);
return null==t?e:this.add("d",7*(t-e));
},
lang:function(t){
return void 0===t?this._lang:(this._lang=m(t),this);
}
},W=0;W<ee.length;W++)H(ee[W].toLowerCase().replace(/s$/,""),ee[W]);
H("year","FullYear"),C.fn.days=C.fn.day,C.fn.weeks=C.fn.week,C.fn.isoWeeks=C.fn.isoWeek,
C.duration.fn=o.prototype={
weeks:function(){
return d(this.days()/7);
},
valueOf:function(){
return this._milliseconds+864e5*this._days+2592e6*this._months;
},
humanize:function(t){
var e=+this,n=L(e,!t,this.lang());
return t&&(n=this.lang().pastFuture(e,n)),this.lang().postformat(n);
},
lang:C.fn.lang
};
for(W in ne)ne.hasOwnProperty(W)&&(z(W,ne[W]),O(W.toLowerCase()));
return z("Weeks",6048e5),C.lang("zh-cn",{
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah点mm",
L:"YYYY年MMMD日",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY年MMMD日",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(t,e){
return 9>t?"早上":11>t&&30>e?"上午":13>t&&30>e?"中午":18>t?"下午":"晚上";
},
calendar:{
sameDay:"[今天]LT",
nextDay:"[明天]LT",
nextWeek:"[下]ddddLT",
lastDay:"[昨天]LT",
lastWeek:"[上]ddddLT",
sameElse:"L"
},
ordinal:function(t,e){
switch(e){
case"d":
case"D":
case"DDD":
return t+"日";

case"M":
return t+"月";

case"w":
case"W":
return t+"周";

default:
return t;
}
},
relativeTime:{
future:"%s内",
past:"%s前",
s:"几秒",
m:"1分钟",
mm:"%d分钟",
h:"1小时",
hh:"%d小时",
d:"1天",
dd:"%d天",
M:"1个月",
MM:"%d个月",
y:"1年",
yy:"%d年"
}
}),C;
});define("common/wx/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js"],function(e){
"use strict";
function i(e){
f.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),t=e("common/wx/dialog.js"),a=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=wx.T,s=wx.path.webuploader,l=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",c={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
3:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:5242880
},
4:{
accept:{
extensions:"rm,rmvb,wmv,avi,mpg,mpeg,mp4",
mimeTypes:"video/*"
},
fileSingleSizeLimit:20971520
},
5:{
accept:{
extensions:"pdf",
mimeTypes:"application/pdf"
},
fileSingleSizeLimit:10485760
},
6:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf",
mimeTypes:"image/*,application/pdf"
},
fileSingleSizeLimit:5242880
},
7:{
accept:{
extensions:"bmp,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
9:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:204800
},
10:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:5242880
},
11:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
12:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:31457280
}
};
c[15]=c[4];
var p=function(e){
t.show({
type:"warn",
msg:"警告|"+e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
},m=function(e){
var i=n.Uploader;
0==i.support("flash")?p("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>"):0==i.support()?p("<p>您的浏览器不支持上传</p>"):e.refresh();
},u=function(e){
e&&wx.jslog({
src:"common/wx/upload.js"
},null,e);
},d={
swf:s,
auto:!0,
pick:{
multiple:!0
},
fileNumLimit:20,
threads:3,
sendAsBinary:!1,
runtimeOrder:"html5,flash",
compress:{
width:1280,
height:1e8,
quality:90,
afterCompressSizeLimit:2097152,
compressSize:0,
resizeSize:2097152,
maxResolution:6e6,
noCompressIfLarger:!0
},
imageSize:!0,
chunked:!1,
duplicate:!0
},f=new Image,g={},h=function(e){
if(!e.url)throw"missing url";
var t,s,l,p=$('<ul class="upload_file_box" style="display:none"></ul>'),f=$(e.container);
f.on("click",function(){
Math.random()<.1&&u(12),m(t);
}).parent().append(p),function(){
0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),s={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time),
pick:{
id:f,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},l=c[e.type]||c[2],e=$.extend(!0,{},d,s,l,e);
e.server;
0==n.Uploader.support("html5")&&e.compress&&(e.compress.quality=70);
try{
t=n.create(e);
}catch(h){
if(!t)return;
}
return p.on("click",".js_cancel",function(){
var e=$(this).data("id");
t.cancelFile(e),$(this).hide();
}),t.on("beforeFileQueued",function(i){
return Math.random()<.1&&u(13),e.canContinueUpload&&!e.canContinueUpload()?!1:!(e.onSelect&&e.onSelect(null,i.id,i)===!1);
}),t.on("fileQueued",function(e){
var i={
id:e.id,
fileName:e.name,
size:n.formatSize(e.size)
};
p.append(r(o,i)).show();
}),t.on("fileDequeued",function(){
Math.random()<.1&&u(14),e.onCancel&&e.onCancel();
}),t.on("uploadProgress",function(i,n){
var t="#uploadItem%s".sprintf(i.id),a=p.find(t).find(".progress_bar_thumb");
a.width("%s%".sprintf(100*n)),1==n&&p.find(t).find(".js_cancel").remove(),e.onProgress&&e.onProgress(null,i.id,i,{
percentage:n
});
}),t.on("uploadStart",function(e){
g[e.id]=+new Date;
}),t.on("uploadSuccess",function(n,t,o){
if(Math.random()<.1&&u(16),t&&t.base_resp){
var r=+t.base_resp.ret;
if(0==r)Math.random()<.1&&(u(17),g[n.id]&&i(+new Date-g[n.id]));else switch(n.setStatus("invalid"),
r){
case-18:
case 200018:
a.err("页面停留时间过久，请刷新页面后重试！");
break;

case-20:
case 200020:
a.err("无法解释该图片，请使用另一图片或截图另存");
break;

case-13:
case 200013:
a.err("上传文件过于频繁，请稍后再试");
break;

case-10:
case 200010:
a.err("上传文件过大");
break;

case-22:
case 200022:
a.err("上传音频文件不能超过60秒");
break;

case-39:
case 200039:
a.err("上传图片高度（像素）与宽度（像素）的乘积不能超过600万");
break;

case 220001:
a.err('"素材管理"中的存储数量已达到上限，请删除后再操作。');
break;

case 220002:
a.err("你的图片库已达到存储上限，请进行清理。");
break;

default:
a.err("上传文件发送出错，请刷新页面后重试！");
}
}
e.onComplete&&e.onComplete(null,n.id,n,t,{
fileCount:o.numOfProgress+o.numOfQueue
});
}),t.on("uploadFinished",function(i){
this.reset(),p.fadeOut().html(""),g={},0==i.numOfInvalid&&i.numOfSuccess>0&&e.onAllComplete&&e.onAllComplete(null,{
errors:i.numOfCancel+i.numOfInvalid+i.numOfUploadFailed+i.numofDeleted+i.numofInterrupt,
filesUploaded:i.numOfSuccess
});
}),t.on("uploadError",function(){
Math.random()<.1&&u(15),e.onError&&e.onError();
}),t.on("error",function(i,t,o){
switch("object"==typeof t&&(o=t),i){
case"Q_EXCEED_NUM_LIMIT":
a.err("一次上传最多只能上传%s个文件".sprintf(t));
break;

case"F_EXCEED_SIZE":
a.err("文件大小不能超过%s".sprintf(n.formatSize(t,"0")));
break;

case"F_EXCEED_COMPRESS_SIZE":
a.err("图片压缩后过大，请缩小图片尺寸再试"),u(42);
break;

case"Q_TYPE_DENIED":
a.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),t;
},b=function(e){
return function(i){
return i.url=e,h(i);
};
},w=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:h,
uploadBizFile:b(l+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:b(l+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:b(l+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:b(l+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:b(l+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:b(l+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:b(l+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:b(l+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:b(l+"/misc/setlocation?action=upload"),
mediaFile:b(l+"/cgi-bin/filetransfer?action=bizmedia"),
uploadCdnFileFromAd:function(e){
return b(l+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=l+"/cgi-bin/filetransfer?action=upload_material&f=json","undefined"!=typeof e.scene&&(e.url+="&scene="+e.scene),
1==e.doublewrite&&(e.url+="&writetype=doublewrite&groupid="+(e.groupid||1)),h(e);
},
uploadCdnFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return b(l+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
},
uploadTmpFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return b(l+"/cgi-bin/filetransfer?action=preview_check_range&f=json&"+n.join("&"));
},
tmpFileUrl:w(l+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:w(l+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:w(l+"/cgi-bin/filetransfer?action=multimedia")
};
});define("tpl/top.html.js", [], function(e, t, n) {
return '<ul class="tab_navs title_tab" data-index="{itemIndex=0}">\n    {each data as o index}\n    {if (typeof o.acl == "undefined" || o.acl == 1)}\n    <li data-index="{itemIndex++}" class="tab_nav {if (itemIndex == 1)}first{/if} js_top {o.className}" data-id="{o.id}"><a href="{o.url}" {if o.target==\'_blank\'}target="_blank"{/if}>{o.name}</a></li>\n    {/if}\n    {/each}\n</ul>\n';
});+function(t){
"use strict";
function i(i){
return this.each(function(){
var o=t(this),f=o.data("bs.affix"),n="object"==typeof i&&i;
f||o.data("bs.affix",f=new e(this,n)),"string"==typeof i&&f[i]();
});
}
var e=function(i,o){
this.options=t.extend({},e.DEFAULTS,o),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),
this.$element=t(i),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition();
};
e.VERSION="3.3.5",e.RESET="affix affix-top affix-bottom",e.DEFAULTS={
offset:0,
target:window
},e.prototype.getState=function(t,i,e,o){
var f=this.$target.scrollTop(),n=this.$element.offset(),s=this.$target.height();
if(null!=e&&"top"==this.affixed)return e>f?"top":!1;
if("bottom"==this.affixed)return null!=e?f+this.unpin<=n.top?!1:"bottom":t-o>=f+s?!1:"bottom";
var a=null==this.affixed,h=a?f:n.top,r=a?s:i;
return null!=e&&e>=f?"top":null!=o&&h+r>=t-o?"bottom":!1;
},e.prototype.getPinnedOffset=function(){
if(this.pinnedOffset)return this.pinnedOffset;
this.$element.removeClass(e.RESET).addClass("affix");
var t=this.$target.scrollTop(),i=this.$element.offset();
return this.pinnedOffset=i.top-t;
},e.prototype.checkPositionWithEventLoop=function(){
setTimeout(t.proxy(this.checkPosition,this),1);
},e.prototype.checkPosition=function(){
if(this.$element.is(":visible")){
var i=this.$element.height(),o=this.options.offset,f=o.top,n=o.bottom,s=Math.max(t(document).height(),t(document.body).height());
"object"!=typeof o&&(n=f=o),"function"==typeof f&&(f=o.top(this.$element)),"function"==typeof n&&(n=o.bottom(this.$element));
var a=this.getState(s,i,f,n);
if(this.affixed!=a){
null!=this.unpin&&this.$element.css("top","");
var h="affix"+(a?"-"+a:""),r=t.Event(h+".bs.affix");
if(this.$element.trigger(r),r.isDefaultPrevented())return;
this.affixed=a,this.unpin="bottom"==a?this.getPinnedOffset():null,this.$element.removeClass(e.RESET).addClass(h).trigger(h.replace("affix","affixed")+".bs.affix");
}
"bottom"==a&&this.$element.offset({
top:s-i-n
});
}
};
var o=t.fn.affix;
t.fn.affix=i,t.fn.affix.Constructor=e,t.fn.affix.noConflict=function(){
return t.fn.affix=o,this;
},t(window).on("load",function(){
t('[data-spy="affix"]').each(function(){
var e=t(this),o=e.data();
o.offset=o.offset||{},null!=o.offsetBottom&&(o.offset.bottom=o.offsetBottom),null!=o.offsetTop&&(o.offset.top=o.offsetTop),
i.call(e,o);
});
});
}(jQuery);define("cardticket/common_init.js",["cardticket/clickreport.js","cardticket/card_cgi.js"],function(c){
"use strict";
var r=c("cardticket/clickreport.js");
r.regreport(),r.regcommonclick();
var t=c("cardticket/card_cgi.js");
t.check_friend_and_money_acct(function(c,r){
r?$("#js_has_money_acct_tips").show():c&&$("#js_has_friend_card_tips").show(),c&&$(".js_has_friend_card_tips").show();
});
});define("cardticket/add/init.js",["common/wx/Cgi.js","cardticket/clickreport.js","cardticket/parse_data.js"],function(a){
"use strict";
function i(a){
if(wx.cgiData.brand_name=wx.cgiData.data.brand_name=wx.cgiData.brand_name.html(!1),
a.cardid)t.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(a.cardid),
error:function(){
a.init&&a.init();
}
},function(i){
if(0==i.base_resp.ret){
var t=$.parseJSON(i.card_detail);
t=r.parse_cardticket(t),window.wx_is_can_use_help_make_and_send||(t.brand_name=wx.cgiData.brand_name,
t.logo_url=wx.cgiData.logo),t.brand_name=t.brand_name.html(!1),a.init&&a.init(t);
}else a.init&&a.init();
var c=$(".js_addtypeclickreport").get(0);
c&&e.clickele(c,!0);
});else{
a.init&&a.init();
var i=$(".js_addtypeclickreport").get(0);
i&&e.clickele(i,!0);
}
}
var t=a("common/wx/Cgi.js"),e=a("cardticket/clickreport.js"),r=a("cardticket/parse_data.js");
return i;
});