define("cardticket/add/validtime.js",["common/qq/events.js","biz_common/moment.js","biz_web/ui/dropdown.js","common/wx/Tips.js","biz_web/ui/dateRange.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js"],function(e){
"use strict";
function t(e){
e||(e=$("#js_editform_step1").serializeObject());
var t="YYYY.MM.DD";
if(1==e.time_type&&e.begin_time){
var a=e.begin_time?r.unix(e.begin_time).format(t):r().add("d",1).format(t),i=e.end_time?r.unix(e.end_time).format(t):r().add("M",1).format(t);
$("#js_use_time_preview").text(a+"-"+i);
}
2==e.time_type&&$("#js_use_time_preview").text(r().add("d",parseInt(e.from_day)).format(t)+"-"+r().add("d",parseInt(e.from_day)+parseInt(e.fixed_term-1)).format(t));
}
function a(e,t,a,i,d){
if(!(e||a&&1!=a))return _.err("请选择生效时间"),i.gofirst(),!1;
if(!(t||a&&2!=a))return _.err("请选择失效时间"),i.gofirst(),!1;
if(!d){
if(e&&r.unix(e).add("d",1).unix()<r().unix())return _.err("生效时间不能是今天之前的时间"),i.gofirst(),
!1;
if(e&&t&&r.unix(e).unix()>r.unix(t).unix())return _.err("生效时间不能小于失效时间"),i.gofirst(),
!1;
}
return!0;
}
function i(e){
function i(e){
return r(e,j).format("YYYY.MM.DD");
}
e=$.extend(!0,{
sectionmgr:null,
data:{}
},e);
for(var d=$("#js_hidden_time_type"),o=$("#js_hidden_begintime"),l=$("#js_hidden_endtime"),u=$("#js_hidden_fixed_term"),c=$("#js_hidden_from_day"),f=($("#js_invalidtime"),
$("#js_hidden_fixed_endtime"),$(".js_validtime")),b=(f.checkbox({
onChanged:function(e){
var a=e.val();
1==a?(d.val(a),h.disable(),p.disable(),z._disabled=!1,$("#"+z.inputId).parent().removeClass("disabled"),
n.trigger("validtime:valid_time_changed",1)):(d.val(2),h.enable(),p.enable(),z._disabled=!0,
$("#"+z.inputId).parent().addClass("disabled"),n.trigger("validtime:valid_time_changed",2)),
t();
}
}),[{
name:"当天",
value:0
}]),v=[],g=90,x=1;g>=x;x++)b.push({
name:x+"天",
value:x
});
for(var x=1;g>=x;x++)v.push({
name:x+"天",
value:x
});
var h=new m({
container:"#js_from_day_container",
label:"当天",
data:b,
callback:function(e){
c.val(e),t();
}
});
h.selected(e.data.from_day),c.val(e.data.from_day),b.shift();
var p=new m({
container:"#js_fixed_term_container",
label:"1天",
data:b,
callback:function(e){
u.val(e),t();
}
});
p.selected(e.data.fixed_term+""),u.val(e.data.fixed_term);
var j="YYYY-MM-DD",D=r().format(j),I=(r().add("d",1).format(j),r().add("M",1).format(j)),Y=e.data.begin_time?r.unix(e.data.begin_time).format(j):D,w=r().add("d",-1).unix(),y=e.data._is_global_editting&&e.data.begin_time&&e.data.begin_time<w?e.data.begin_time:w,k=e.data.end_time?r.unix(e.data.end_time).format(j):I,M=e.data._is_global_editting?r(Y,j).add("d",89).unix():r().add("d",89).unix(),z=s({
container:"#js_begin_time_container",
stopToday:!1,
isTodayValid:!0,
minValidDate:y,
maxValidDate:e.data.is_sns_card?M:r().add("M",120),
startDate:Y,
endDate:e.data.end_time?k:Y,
defaultText:"-",
theme:"ta",
monthRangeMax:120,
success:function(n){
$("#"+z.inputId).html(i(n.startDate)+"-"+i(n.endDate)),o.val(r(n.startDate,j).unix()),
l.val(r(n.endDate,j).unix()),t(),1==d.val()&&a(o.val(),l.val(),1,e.sectionmgr,e.data._is_global_editting);
},
beforeSelect:function(t){
if(!e.data._is_global_editting)return!0;
var a=r(t,j).unix(),i=e.data.end_time-86400+1;
if(2==e.data.time_type)return!0;
if(a>e.data.begin_time&&i>a)return _.err("只能延长有效期"),!1;
if(a<=e.data.begin_time){
this.dateInput=this.startDateId,this.selectDate(t),this.dateInput=this.endDateId;
var d=$("#"+this.endDateId).val(),d=r(d,j).format("YYYY-M-D");
this.selectDate(d);
}else this.dateInput=this.endDateId,this.selectDate(t);
return!1;
}
});
e.data.begin_time?($("#"+z.inputId).html(i(Y)+"-"+i(k)),o.val(r(Y,j).unix()),l.val(r(k,j).unix())):($("#"+z.inputId).html("请选择时间"),
$("#"+z.nextMonth).click()),1==e.data.time_type?$(f[0]).click():2==e.data.time_type&&$(f[1]).click(),
t(e.data),n.trigger("validtime:valid_time_changed",$(".js_validtime:checked").val()),
setInterval(function(){
t();
},500);
}
var d=e("common/qq/events.js"),n=d(!0),r=e("biz_common/moment.js"),m=e("biz_web/ui/dropdown.js"),_=e("common/wx/Tips.js"),s=e("biz_web/ui/dateRange.js");
e("biz_web/ui/checkbox.js");
e("cardticket/common_template_helper.js");
return i;
});define("cardticket/add/color.js",["biz_web/ui/dropdown.js","biz_web/ui/checkbox.js","biz_web/utils/upload.js","common/wx/Tips.js","common/wx/Cgi.js"],function(c){
"use strict";
var o=c("biz_web/ui/dropdown.js"),e=(c("biz_web/ui/checkbox.js"),c("biz_web/utils/upload.js")),r=c("common/wx/Tips.js"),a=c("common/wx/Cgi.js"),t=function(c){
function t(c){
if(2==c)$("#js_background_pic_url_hidden").val(""),$("#js_background_pic_url_preview").html(""),
$(".js_background_pic_url_preview").css("background-image",""),$("#js_colorpicker .jsBtLabel, #js_color_preview, .js_color_bg_preview").css({
backgroundColor:s.color
}),$(".js_title_color_preview").css({
color:s.color
}),$("#js_color").val(s.color);else if($("#js_background_pic_url_hidden").val(s.background_pic_url),
s.background_pic_url){
$("#js_background_pic_url_hidden").closest(".js_card_input_item").find(".fail").remove(),
$("#js_background_pic_url_preview").html('<img src="%s">'.sprintf(s.background_pic_url.http2https())),
$(".js_background_pic_url_preview").css("background-image","url("+s.background_pic_url.http2https()+")"),
$("#js_color").val(s.background_save_color);
var o=s.background_save_color.substr(0,7);
$("#js_colorpicker .jsBtLabel, #js_color_preview, .js_color_bg_preview").css({
backgroundColor:o
}),$(".js_title_color_preview").css({
color:o
});
}
$("#js_background_type").val(c);
}
function l(c){
c.each(function(){
var c=$(this),o=c.attr("id"),l=c.attr("inited");
l||(c.attr("inited",1),function(c){
e.uploadCdnFile({
container:"#"+c,
multi:!1,
type:11,
onComplete:function(c,o,e,l){
var _=l.content||"";
if(0==l.base_resp.ret){
var i=_.https2http();
a.get({
url:"/merchant/electroniccardmgr?action=defualt_color",
data:{
img_url:i
}
},function(c){
0==c.base_resp.ret?(s.background_save_color="#"+c.color.slice(3),s.background_pic_url=i,
t(1),r.suc("上传成功")):a.handleRet(c,{
id:64463,
key:29,
url:"/merchant/electroniccardmgr?action=defualt_color"
});
});
}
}
});
}(o));
});
}
this.opt=c=$.extend(!0,{
data:{}
},c);
var s=this;
this.background_pic_url=c.data.background_pic_url,this.color=c.data.color,this.background_save_color=c.data.color;
var _=["#55BD47","#10AD61","#35A4DE","#3D78DA","#9058CB","#DE9C33","#EBAC16","#F9861F","#E75735","#D54036"],i=!1,d=new o({
container:"#js_colorpicker",
label:"#55BD47",
data:[{
name:"#55BD47",
value:"#55BD47",
className:"tr1td1"
},{
name:"#10AD61",
value:"#10AD61",
className:"tr1td2"
},{
name:"#35A4DE",
value:"#35A4DE",
className:"tr1td3"
},{
name:"#3D78DA",
value:"#3D78DA",
className:"tr1td4"
},{
name:"#9058CB",
value:"#9058CB",
className:"tr1td5"
},{
name:"#DE9C33",
value:"#DE9C33",
className:"tr2td1"
},{
name:"#EBAC16",
value:"#EBAC16",
className:"tr2td2"
},{
name:"#F9861F",
value:"#F9861F",
className:"tr2td3"
},{
name:"#E75735",
value:"#E75735",
className:"tr2td4"
},{
name:"#D54036",
value:"#D54036",
className:"tr2td5"
}],
callback:function(c){
s.color=c,t(2);
}
});
if(d.selected(c.data.color?c.data.color.toUpperCase():""),"#F08500"==this.opt.color&&$("#js_color").val(""),
10==c.data.type){
{
$(".js_add_cover_type").checkbox({
onChanged:function(o){
var e=$(o).val();
$(".js_add_cover_type_1,.js_add_cover_type_2").hide(),$(".js_add_cover_type_"+e).show(),
i||d.selected(-1!=_.indexOf(c.data.color)?c.data.color:0),i=!0,t(e);
}
});
}
l($("#js_background_pic_url")),$(".js_add_cover_type:checked").click();
}
};
return t;
});define("cardticket/add/step_mgr.js",["common/wx/Step.js"],function(e){
"use strict";
var s=e("common/wx/Step.js"),t=function(e){
this.step=new s({
container:e.container,
names:[e.isMem?"1 填写会员卡信息":"1 填写优惠券信息","2 功能设置"]
}),this.$contents=$(e.contents);
};
return t.prototype={
prev:function(){
this.step.go(0);
var e=this.step.$dom.find("li.step");
$(e[0]).addClass("current").removeClass("prev").removeClass("next"),$(e[1]).addClass("next").removeClass("nnext"),
this.$contents.hide(),$(this.$contents[0]).show();
},
next:function(){
this.step.go(1),this.$contents.hide(),$(this.$contents[1]).show();
var e=this.step.$dom.find("li.step");
$(e[1]).addClass("current").removeClass("prev").removeClass("next"),$(e[0]).removeClass("current").addClass("prev").removeClass("next");
var s=$("#body").offset().top;
window.scrollTo(0,s);
}
},t;
});define("cardticket/add/section_mgr.js",[],function(){
"use strict";
var e=function(e){
this.opt=e=$.extend(!0,{
preview_dom:"#js_preview_area .js_preview",
edit_dom:"#js_edit_area .js_edit_content",
is_mem:!1
},e),this.$previewSections=$(e.preview_dom),this.$editSections=$(e.edit_dom),this.currentIndex=0,
this.go(this.currentIndex);
var t=this;
$("#js_preview_area").on("click",".js_edit_icon",function(){
t.$previewSections=$(e.preview_dom);
var i=t.$previewSections.find(".js_edit_icon"),n=i.index(this);
return t.go(n),!1;
});
};
return e.prototype={
next:function(){
this.go(this.currentIndex+1);
},
go:function(e){
return;
},
prev:function(){
this.go(this.currentIndex-1);
},
gofirst:function(){
this.go(0);
},
golast:function(){
this.go(this.$editSections.length-1);
}
},e;
});define("cardticket/add/discount_time.js",["biz_web/ui/checkbox.js","common/wx/tooltips.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t){
this.opt=t;
var e=$(t.container);
this.discount_checkbox=$(t.container).find("input[type=checkbox]").checkbox();
var i=$(t.container).find(".js_discount_time_ask"),n=(new s({
container:i,
reposition:!0,
content:"法定节假日",
type:"hover"
}),this),o=$(t.container).find(".js_discount_select"),d=$(t.container).find(".js_discounttype");
d.checkbox({
onChanged:function(t){
var e=$(t).val();
"all"==e?(n.discount_checkbox.checked(!0),o.hide()):o.show(),n.is_update=!0;
}
}),d.filter("input:checked").click();
var c=e.find(".js_hour_range_list"),p=e.find(".js_add_time_period"),m=e.find(".js_del_time_period"),h=e.find(".js_time_period_fail"),l=e.find(".js_time_period_interval_fail"),u=e.find(".js_hour_range_container"),f=e.find(".js_add_time_period_first").click(function(){
return u.show(),f.hide(),c.find(".js_hour_range").length||c.append(_({})),n.is_update=!0,
!1;
});
c.on("change","input",function(){
a.test($(this).val())&&!RegExp.$2&&$(this).val($(this).val()+":00"),n.check_format(!0,!0)&&(n.$time_period_fail.hide(),
n.$time_interval_check_fail.hide());
}),p.click(function(){
return c.append(_({})),2==c.find(".js_hour_range").length&&p.hide(),!1;
}),m.click(function(){
var t=c.find(".js_hour_range");
return t.last().remove(),1==t.length&&(u.hide(),f.show()),p.show(),!1;
}),this.$hour_range_list=c,this.$time_period_fail=h,this.$time_interval_check_fail=l,
setInterval(function(){
var t=n._val(!1,!0),e=r.gen_time_limit(t.discount_day),i=t.discount_time_span,s=[];
if(i)for(var _=0;_<i.length;_++){
var a=i[_].start_time.split(":"),o=i[_].end_time.split(":"),d=parseInt(a[0]||0),c=parseInt(a[1]||0),p=parseInt(o[0]||0),m=parseInt(o[1]||0);
10>d&&(d="0"+d),10>p&&(p="0"+p),10>c&&(c="0"+c),10>m&&(m="0"+m),s.push(d+":"+c+"至"+p+":"+m);
}else s=["  全天"];
e+=e?s.join("  "):"",$("#js_time_limit_preview").text($("#js_use_time_preview").text()?"，"+e:e);
},500);
}
function i(t,e){
return t=t.split(":"),e=e.split(":"),t[0]=parseInt(t[0]),t[1]=parseInt(t[1])||0,
e[0]=parseInt(e[0]),e[1]=parseInt(e[1])||0,e[0]>t[0]?!0:e[0]==t[0]?e[1]>t[1]:!1;
}
function n(t,e){
t=$.extend(!0,{},t),e=$.extend(!0,{},e),t.start_time=t.start_time.split(":"),t.end_time=t.end_time.split(":"),
t.start_time[0]=parseInt(t.start_time[0]),t.start_time[1]=parseInt(t.start_time[1])||0,
t.start_time[1]<10&&(t.start_time[1]="0"+t.start_time[1]);
var i=parseInt(""+t.start_time[0]+t.start_time[1]);
t.end_time[0]=parseInt(t.end_time[0]),t.end_time[1]=parseInt(t.end_time[1])||0,t.end_time[1]<10&&(t.end_time[1]="0"+t.end_time[1]);
var n=parseInt(""+t.end_time[0]+t.end_time[1]);
e.start_time=e.start_time.split(":"),e.end_time=e.end_time.split(":"),e.start_time[0]=parseInt(e.start_time[0]),
e.start_time[1]=parseInt(e.start_time[1])||0,e.start_time[1]<10&&(e.start_time[1]="0"+e.start_time[1]);
var s=parseInt(""+e.start_time[0]+e.start_time[1]);
e.end_time[0]=parseInt(e.end_time[0]),e.end_time[1]=parseInt(e.end_time[1])||0,e.end_time[1]<10&&(e.end_time[1]="0"+e.end_time[1]);
var _=parseInt(""+e.end_time[0]+t.end_time[1]);
return s>n||i>_?!0:!1;
}
var s=(t("biz_web/ui/checkbox.js"),t("common/wx/tooltips.js")),_=template.compile('<span class="time_range js_hour_range">                            <span class="frm_input_box frm_input_box_short">                                <input value="" name="" type="text" class="frm_input valid js_hour_start" placeholder="">                            </span>                            <span class=""> 至 </span>                            <span class="frm_input_box frm_input_box_short">                                <input value="" name="" type="text" class="frm_input valid js_hour_end" placeholder="">                            </span>                        </span>'),r=t("cardticket/common_template_helper.js"),a=/^([0-9]|[0-1][0-9]|2[0-4])(:([0-9]|[0-5][0-9]))?$/;
return e.prototype._val=function(t,e){
this.opt.is_sns_card;
var i=this.check_format(!1,t),n=this.discount_checkbox.values();
if(!n.length)return e?{
discount_day:[],
discount_time_span:[]
}:{
discount_day:"",
discount_time_span:""
};
if(!i)return e?{
discount_day:n,
discount_time_span:[]
}:{
discount_day:n.join("|"),
discount_time_span:!1
};
var s=[],_=[];
if(i.length)if(e)_=i,s=n;else for(var r=0;r<n.length;r++)for(var a=0;a<i.length;a++){
s.push(n[r]);
var o=i[a].start_time,d=i[a].end_time;
o=o.split(":"),d=d.split(":"),_.push(parseInt(o[0])+","+(parseInt(o[1])||0)+","+parseInt(d[0])+","+(parseInt(d[1])||0));
}else s=n;
return e?{
discount_day:s,
discount_time_span:_
}:{
discount_day:s.join("|"),
discount_time_span:_.join("|")
};
},e.prototype.val=function(){
var t=this._val(!0,!1);
return t;
},e.prototype.check_format=function(t,e){
var s=this.$hour_range_list.find(".js_hour_range"),_=!0,r=this,o=[];
if(e&&(r.$time_period_fail.hide(),r.$time_interval_check_fail.hide()),s.each(function(){
var n=a,s=$(this).find(".js_hour_start").val().replace(/：/g,":"),d=$(this).find(".js_hour_end").val().replace(/：/g,":");
return n.test(s)&&n.test(d)?i(s,d)?void o.push({
start_time:s,
end_time:d
}):(e&&(t?s&&d&&($(this).find(".js_hour_start").focus(),r.$time_interval_check_fail.show()):($(this).find(".js_hour_start").focus(),
r.$time_interval_check_fail.show())),_=!1,!1):(e&&(t?s&&d&&($(this).find(".js_hour_start").focus(),
r.$time_period_fail.show()):($(this).find(".js_hour_start").focus(),r.$time_period_fail.show())),
_=!1,!1);
}),_){
for(var d=1;d<o.length;d++){
for(var c=o[d],p=0;d>p&&p<o.length;p++)if(!n(c,o[p])){
_=!1;
break;
}
if(!_)break;
}
return _?o:(e&&r.$time_interval_check_fail.show(),!1);
}
return!1;
},e;
});define("cardticket/add/business_service.js",["biz_web/ui/checkbox.js"],function(e){
"use strict";
function c(e){
this.service_checkbox=$(e.container).find("input").checkbox();
}
e("biz_web/ui/checkbox.js");
return template.helper("$has_service",function(e,c){
return e&&e&1<<c-1?"checked":"";
}),c.prototype.val=function(){
for(var e=this.service_checkbox.values(),c=0,i=0;i<e.length;i++){
var t=parseInt(e[i]);
c+=1<<t;
}
return c;
},c;
});define("cardticket/topmenu.js",["biz_common/moment.js","common/wx/top.js","biz_web/ui/dropdown.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/popup.js","cardticket/common_init.js"],function(e){
"use strict";
function t(e){
for(var t=0;t<_.length;t++)if(_[t].id==e)return _.splice(t,1);
}
function a(e,t){
this.menudata=t,this.top=new r(e,t),$(".js_top[data-id=cardsend] a").append('<i class="icon_common new"></i>'),
$(".js_top[data-id=cardtools] a").append('<i class="icon_common new"></i>');
}
function i(e){
e=e.replace(/^https?:\/\/[^\/]+/,""),/(.+?)(\?|$)/.test(e);
var t=RegExp.$1;
/action=([^&]+)(&|$)/i.test(e);
var a=RegExp.$1||"";
return{
cgi:t.replace(/\/$/,""),
action:a
};
}
{
var c=e("biz_common/moment.js"),r=e("common/wx/top.js"),n=e("biz_web/ui/dropdown.js"),s=e("common/wx/Tips.js"),o=template.compile('<div class="page_msg small default tl">                <div class="inner group">                    <span class="msg_icon_wrp">                        <i class="icon_msg info"></i>                    </span>                    <div class="msg_content">                        <h4>{if mode==1}注意：你将切换到自制模式{else}注意：你将切换到代制模式{/if}</h4>                        <p>&nbsp;</p>                        {if mode==1}                        <p>切换后将以『{brand_name}』商户名称制卡券，卡券提供的优惠商品和服务，必须由该第三方公众号直接提供。</p>                        <p>自制模式下，将不能看到代制模式的子商户数据。若需进行子商户管理，请在卡券功能右上角点击切换到代制模式。</p>                        {else}                        <p>切换后可为该账号名下已授权的子商户制、发券，也可接入更多子商户。</p>                        <p>代制模式下，将不能看到自制模式的数据。若第三方公众号直接提供自己的卡券商品和服务，请在卡券功能右上角点击切换到自制模式。</p>                        {/if}                    </div>                </div>            </div>'),d=e("common/wx/Cgi.js"),m=d,l="YYYY-MM-DD";
c(c().add("d",-7).format(l),l).unix(),c(c().format(l),l).add("d",1).unix()-1;
}
e("common/wx/popup.js"),$(".js_helplink_tips").html('<div class="js_view_mode_switch"></div>&nbsp;&nbsp;<a data-actionid="1002" href="'+wx.url("/merchant/cardmerchantprofile?action=list&lang=zh_CN")+'">商户信息</a><i class="icon_common js_has_friend_card_tips" style="display:none;"></i><span class="mini_tips weak_text">&nbsp;|&nbsp;</span> <a href="'+wx.url("/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info")+'" target="_blank" data-actionid="1003">微信卡券相关文档 </a><span class="mini_tips weak_text">&nbsp;|&nbsp;</span> <a target="_blank" href="http://support.qq.com/discuss/1161_1.shtml" data-actionid="1004">意见反馈</a>');
var _=[{
id:"overviewpage",
name:"卡券概况",
url:"/merchant/cardstat?action=overviewpage&t=cardticket/overviewpage"
},{
id:"cardmgr",
name:"优惠券",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card&flag=0"+(2==window.view_mode?"&tag_filter=sub_merchant,1":"&sub_merchant_id=0")
},{
id:"cardmgr_pay",
name:"付费券",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card&flag=1",
sub:[{
name:"付费券管理",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card&flag=1",
reg:/action=(batch|detail|addpage)/
},{
name:"交易记录",
url:"/merchant/cardorder?action=getlist&t=cardticket/pay_card_record&last_days=30&count=10&offset=0",
reg:/action=(getlist|getdetail)/
}]
},{
id:"cardmgr_member",
name:"会员卡",
url:"/merchant/membercardmgr?action=overview&t=cardticket/member_card_index",
sub:[{
name:"会员卡管理",
url:"/merchant/membercardmgr?action=overview&t=cardticket/member_card_index",
reg:/action=(member_detail|member_add|overview)/
},{
name:"会员管理",
url:"/merchant/membercardmgr?action=user_list&t=cardticket/member_manage",
reg:/action=(user_list|search_user|user_detail)/
}]
},{
id:"cardsend",
name:"卡券投放",
url:"/merchant/cardsend?action=list&t=cardticket/social_sendout"
},{
id:"permission",
name:"卡券核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission",
sub:[{
name:"手机核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission"
},{
name:"网页核销",
url:"/merchant/carduse?action=listcarduse&t=cardticket/destroy_ticket",
target:"_blank"
},{
name:"自助核销配置",
url:"/merchant/cardsecuritycodemgr?action=list",
target:"_blank"
}]
},{
id:"cardtools",
name:"经营工具",
url:"/merchant/cardoptools?action=overview&t=cardticket/tools_index"
},{
id:"card_data",
name:"数据与对账",
url:"/merchant/cardstat?action=biz_effect_page&t=cardticket/data_overview",
sub:[{
name:"经营概况",
url:"/merchant/cardstat?action=biz_effect_page&t=cardticket/data_overview",
reg:/action=(biz_effect_page|entity_shop_page)/
},{
name:"卡券数据",
url:"/merchant/cardstat?action=cardstatpage&t=cardticket/overview_batch&ispay=0",
reg:/action=(cardstatpage|carddetailstatpage)/
},{
name:"核销记录",
url:"/merchant/carduserecord?action=listrecord&t=cardticket/carduse_record",
reg:/\/merchant\/carduserecord\?action=listrecord/
}]
}],p={
cardintercomm:window.wx_is_intercomm_card,
assistsend:!1,
cardmgr_member:window.wx_is_membercard&&!window.is_assistsend,
cardmgr_pay:window.wx_is_send_payment_card&&!window.is_assistsend
};
for(var u in p)p[u]||t(u);
var w=template.compile('<ul class="links">             {each sub as item i}            <li class="links_item {if item.selected}selected{/if}"><a {if item.target}target="{item.target}"{/if} href="{item.url}">{item.name}</a></li>            {/each}</ul>'),h=$(".js_helplink_tips .js_view_mode_switch");
if(window.wx_is_can_use_help_make_and_send&&h.length)var g=new n({
container:h,
label:window.is_assistsend?"代制模式":"自制模式",
data:[{
name:"自制模式",
value:1
},{
name:"代制模式",
value:2
}],
callback:function(e){
var t=!1,a=e;
$(o({
mode:e,
brand_name:window.merchant_brand_name
})).popup({
title:"切换模式",
buttons:[{
text:"确定",
type:"primary",
click:function(){
t||(window.report_click&&window.report_click(1001),t=!0,2==a?m.post({
url:"/merchant/cardapply",
data:{
action:"switch_view_mode",
view_mode:a
},
complete:function(){
t=!1;
}
},function(e){
0==e.base_resp.ret?(s.suc("已切换到代制模式"),location.href=wx.url("/merchant/cardstat?action=overviewpage"),
m.handleRet(e,{
id:64463,
key:25,
showMsg:!1,
url:"/merchant/cardapply?action=switch_view_mode"
})):m.show(e);
}):m.post({
url:"/merchant/cardapply",
data:{
action:"switch_view_mode",
view_mode:a
},
complete:function(){
t=!1;
}
},function(e){
0==e.base_resp.ret?(s.suc("已切换到自制模式"),location.href=wx.url("/merchant/cardstat?action=overviewpage")):(m.handleRet(e,{
id:64463,
key:25,
showMsg:!1,
url:"/merchant/cardapply?action=switch_view_mode"
}),m.show(e));
}));
}
}],
autoShow:!0,
onHide:function(){
t=!1,g.value=window.view_mode,$(".js_helplink_tips .js_view_mode_switch .jsBtLabel").text(window.is_assistsend?"代制模式":"自制模式"),
this.remove();
}
});
}
});
return a.prototype.selected=function(e){
var t=[],a=this.menudata;
if("number"==typeof e)t=_[e]||[];else{
/(ispay|flag)=1/.test(location.href)&&!/_pay$/.test(e)&&(e+="_pay");
for(var c=0;c<a.length;c++)if(a[c].id==e){
t=a[c];
break;
}
}
if(this.top.selected(e),t.sub){
for(var c=0;c<t.sub.length;c++){
var r=t.sub[c];
if(r.reg)r.reg.test(location.href)&&(r.selected=!0);else{
var n=r.url,s=location.href,o=i(n),d=i(s);
o.cgi&&o.action&&o.cgi==d.cgi&&o.action==d.action&&(r.selected=!0);
}
r.url=wx.url(r.url);
}
$("#js_sub_menu").html(w(t));
}
},e("cardticket/common_init.js"),new a("#topTab",_);
});define("cardticket/common_template_helper.js",["common/wx/upload.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/add/msg_operate_type_html.js"],function(e){
"use strict";
function t(e){
for(var t,r,n,a,_=[],i=0;i<e.length;i++){
var s=e[i];
"object"==typeof s&&(s=d[s.type]),a=h[s],s?i==e.length-1?n&&s-n!=1?(_.push(t+(r?"至"+r:"")),
_.push(a)):_.push(t?t+"至"+a:a):n&&s-n!=1?(_.push(t+(r?"至"+r:"")),t=a,r="",n=s):(t?r=a:t=a,
n=s):(s=8,i==e.length-1&&t&&_.push(t+"至"+r),_.push(a),t=r=n="");
}
return _.join("、");
}
function r(e){
return e.replace(/\r\n|\\n|\n/g,"<br/>");
}
function n(e){
var t="YYYY-MM-DD HH:mm:ss",r=l(e,t);
return r?r.format("YYYY-MM-DD"):"";
}
function a(e){
return 1==e||3==e||2==e;
}
function _(e,t){
return 1==e&&119>=t?!0:(2!=e||215!=t&&210!=t&&208!=t&&207!=t&&206!=t&&204!=t&&203!=t&&211!=t&&201!=t&&202!=t)&&(3!=e||308!=t&&309!=t&&306!=t&&305!=t&&304!=t&&303!=t&&314!=t&&316!=t&&317!=t)&&(6!=e||601!=t&&602!=t&&603!=t)?4==e&&402==t?!0:7==e&&701==t?!0:(5!=e||501!=t&&502!=t&&503!=t)&&(8!=e||812!=t&&811!=t&&808!=t&&817!=t&&818!=t&&827!=t&&804!=t&&803!=t&&802!=t&&801!=t&&824!=t&&822!=t&&823!=t&&821!=t&&828!=t&&814!=t&&825!=t&&826!=t&&809!=t&&807!=t&&816!=t&&819!=t&&813!=t)?!1:!0:!0;
}
function i(e){
for(var t=0;t<M.length;t++){
var r=M[t];
"function"!=typeof r&&(r=$.noop),r(e);
}
M=[];
}
function s(e){
return M.push(e),"undefined"!=typeof I?(i(I),!0):U?!1:(U=!0,u.get({
url:"/merchant/cardhelpmakesend",
data:{
action:"list",
begin:0,
count:9999999,
status_list:1
},
complete:function(){
U=!1;
}
},function(e){
if(0==e.base_resp.ret||-1==e.base_resp.ret){
for(var t=$.parseJSON(e.bind_list),r=t.List,n=!1,a=!1,s=0;s<r.length;s++){
var o=r[s];
if(_(o.PrimaryCategoryId,o.SecondaryCategoryId)){
a=!0;
break;
}
}
e.attr&&e.attr.merchant_info&&(n=_(e.attr.merchant_info.primary_category_id,e.attr.merchant_info.secondary_category_id)),
n&&a&&(I=1),n&&!a&&(I=2),!n&&a&&(I=3),n||a||(I=4),4==I&&e.is_can_use_sns_card&&!e.is_can_use_help_make_and_send&&(I=5),
i(I);
}
}),!1);
}
function o(e,t){
var r=!1;
e.create_time&&e.create_time<1463648400&&(r=!0),"undefined"==typeof t&&(t=!0);
var n="",a=!1;
return 4==e.type||2==e.type?(t&&e.reduce_cost&&(n="价值%s元代金券一张".sprintf(e.reduce_cost)),
r?n:(e.use_condition_least_cost?(n&&(n+="，"),n+="消费满%s元可用".sprintf(e.use_condition_least_cost)):4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||(n&&(n+="；"),
n+="无最低消费限制"),e.accept_category&&(n&&(n+="；"),n+="适用于%s".sprintf(e.accept_category),
a=!0),e.reject_category&&(n&&(n+="；"),n+="不适用于%s".sprintf(e.reject_category),a=!0),
"1"!=e.is_sns_card&&e.is_sns_card!==!0||4!=e.type||a||(n&&(n+="；"),n+="全场通用，不限品类"),
!(4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||e.has_condition||"0"!=e.uncheckcount&&!e.id),
n)):3==e.type?(t&&(e.title||e.gift_title)&&(n="%s%s%s%s".sprintf("1"==e.is_sns_card||e.is_sns_card===!0?"兑换":"",e.gift_title||e.title,e.gift_num||"",e.gift_unit||"")),
r?n:(2==e.use_condition_least_cost_type&&e.object_use_for&&(n&&(n+="；"),n+="购买%s可用".sprintf(e.object_use_for),
a=!0),1==e.use_condition_least_cost_type&&e.use_condition_least_cost&&(n&&(n+="，"),
n+="消费满%s元可用".sprintf(e.use_condition_least_cost),a=!0),"1"!=e.is_sns_card&&e.is_sns_card!==!0||a||(n&&(n+="；"),
n+="无最低消费限制"),n)):void 0;
}
function c(e){
if(!e.begin_time||!e.end_time)return"";
var t="YYYY.MM.DD";
return l.unix(e.begin_time).format(t)+"-"+l.unix(e.end_time).format(t);
}
var p=e("common/wx/upload.js"),u=e("common/wx/Cgi.js"),l=e("biz_common/moment.js"),m={
10:"会员卡",
21:"门票",
22:"电影票",
4:"代金券",
1:"团购券",
2:"折扣券",
3:"兑换券",
0:"优惠券"
},f={
1:"审核中",
2:"未通过",
3:"待投放",
4:"已删除",
5:"待投放",
6:"已投放",
8:"已过期",
7:"违规下架"
},d={
MONDAY:"1",
TUESDAY:"2",
WEDNESDAY:"3",
THURSDAY:"4",
FRIDAY:"5",
SATURDAY:"6",
SUNDAY:"7"
};
template.helper("$has_day",function(e,t){
if(!e)return"";
for(var r=0;r<e.length;r++){
var n=d[e[r].type];
if(n||(n=8),n==t)return"checked";
}
return"";
});
var h={
1:"周一",
2:"周二",
3:"周三",
4:"周四",
5:"周五",
6:"周六",
7:"周日",
8:"节假日"
};
template.helper("convert_time_limit",function(e){
return t(e);
});
var v={
1:"免费WIFI",
2:"可带宠物",
4:"免费停车",
8:"可外卖"
};
template.helper("convert_business_service",function(e){
if(!e)return"无";
var t=[];
for(var r in v){
var n=parseInt(r);
(e&n)>0&&t.push(v[r]);
}
return t.join("&nbsp;&nbsp;");
});
var l=e("biz_common/moment.js");
template.helper("convert_state",function(e){
return f[e]||e;
}),template.helper("convert_type",function(e){
return m[e]||e;
}),template.helper("card_type_map",function(e){
return e;
}),template.helper("unixFormat",function(e,t){
return t&&(t=t.replace(","," ")),l.unix(e).format(t);
}),template.helper("validtime",function(e,t){
if(1==e.time_type){
var r=l.unix(e.begin_time).format(t)+"至"+l.unix(e.end_time).format(t);
return e.end_time<l().unix()&&(r+="(已过期)"),r;
}
return 2==e.time_type?(e.from_day=0==e.from_day?"当":e.from_day,"领取后{from_day}天生效{fixed_term}天有效".format(e)):"";
}),template.helper("addtoken",function(e){
return wx.url(e);
}),template.helper("nl2br",function(e){
return r(e.html(!0));
});
var g={
1:"50万以下",
2:"50-100万",
3:"100-500万",
4:"500-1000万",
5:"1000万以上"
};
template.helper("convert_business_volume_type",function(e){
return g[e]||e;
});
var y={
0:"已提交",
2:"已提交",
3:"生效",
4:"不通过"
};
template.helper("convert_store_state",function(e){
return y[e]||e;
}),template.helper("$preview",function(e){
if(!e)return"无";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=p.tmpFileUrl(e)):t=p.multimediaFileUrl(e),
"<a href='%s' target='_blank'><img src='%s' /></a>".sprintf(t,t);
}),template.helper("$upload_preview",function(e){
if(!e)return"";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=p.tmpFileUrl(e)):t=p.multimediaFileUrl(e),
"<img src='%s' style='width:260px;' />".sprintf(t);
}),template.helper("$preview_stuffs",function(e){
for(var t=[],r=e.stuffs,n=0;n<r.length;n++){
var a=r[n]+"_preview_tpl";
$("#"+a).length&&t.push(template.render(a,e));
}
return t.join("");
});
var x={
2:"女",
1:"男"
};
template.helper("convert_gender",function(e){
return x[e]||"未知";
}),template.helper("percentage",function(e,t,r,n){
var r=e/t*100;
return n&&r>n&&(r=n),r.toFixed(2);
});
var b={
"":"全部",
0:"API渠道",
1:"嵌入图文消息",
2:"直接群发卡券",
3:"下载二维码"
};
template.helper("convert_channel",function(e){
return b[e]||e;
}),template.helper("convert_provide_time",n),template.helper("http2https",function(e){
return e?(e+"").http2https():"";
}),template.helper("https2http",function(e){
return e?(e+"").https2http():"";
}),template.helper("codepad",function(e){
var t=new RegExp("([^s]{4})(?=([^s])+$)","ig");
return e.replace(t,"$1-");
}),template.helper("yuan",function(e){
if(!e)return"--";
var e=e/100;
return e.toFixed(2);
}),template.helper("is_paycard",function(){
return window.wx_is_paycard;
});
var w={
0:"等待接收",
1:"已接收",
3:"过期退回",
2:"已拒绝"
},j={
0:"等待接收",
2:"已拒绝",
1:"已接收",
3:"过期退回"
};
template.helper("convert_intercard_status",function(e){
return w[e]||e;
}),template.helper("convert_intercard_rec_status",function(e){
return j[e]||e;
});
var Y={
0:"无",
1:"图文消息",
2:"卡券货架",
3:"小店货架",
4:"网页链接",
5:"卡券"
};
template.helper("convert_msg_operate_type",function(e){
return Y[e]||"无";
});
var k=e("cardticket/add/msg_operate_type_html.js"),u=e("common/wx/Cgi.js");
template.helper("msg_operate_content",function(e){
return 5===e._type?"":e._notexist?"无":template.compile(k[e._type])({
msg_operation:e
})||"";
});
var D={
CHECKING:"审核中",
APPROVED:"已通过",
REJECTED:"未通过",
EXPIRED:"已过期"
};
template.helper("convert_sub_merchant_status",function(e){
return D[e]||e;
}),template.helper("$is_can_use_help_make_and_send",function(){
return 1==window.wx_is_can_use_help_make_and_send;
}),template.helper("wx_url",function(e){
return wx.url(e);
});
var A={
".*?_4":"激活"
};
template.helper("convert_use_source",function(e,t){
var r=e+"_"+t;
return 4==t?"激活":1==t||6==t||7==t?"自助买单":5==t?"自助核销":2==t?"收款":3==e?"手机核销":1==e?"网页核销":2==e?"API核销":3==t?"积分变更":A[r]||"";
}),template.helper("convert_fee_coin",function(e,t){
return 0==t?"--":a(e)?'<span class="number_add">+%s</span>'.sprintf(t/100):'<span class="number_degress">-%s</span>'.sprintf(t/100);
});
var E={
1:"平台赠送",
2:"充值",
3:"退还券点",
4:"支出",
5:"平台扣减"
};
template.helper("convert_fee_order_type",function(e){
return E[e]||e;
});
var F={
2:{
1:"等待确认",
2:"充值成功",
3:"充值成功",
8:"充值成功"
},
3:"已退券点",
4:{
1:"等待确认",
3:"库存发放中",
4:"库存已发放",
7:"库存添加失败, 已返还券点",
6:"库存已发放",
5:"库存已发放"
}
};
template.helper("convert_fee_order_status",function(e,t){
var r=F[t];
return r?"string"==typeof r?r:r[e]||e:e;
}),template.helper("addhttp",function(e){
return/^http:\/\//.test(e)?e:"http://"+e;
});
var I,C=[],U=!1,M=[];
template.helper("$fix_abstract4friendcard",function(e,t){
return o(e,t);
}),template.helper("$gen_use_time",function(e){
return c(e);
});
var R={
0:"生效",
1:"已使用",
2:"过期",
3:"转赠中",
4:"已转赠",
5:"转赠过期",
6:"已删除"
};
template.helper("convert_user_card_state",function(e){
return R[e]||e;
});
var S={
0:"审核通过",
1:"待商户审核",
2:"审核不通过",
3:"待激活",
4:"请添加库存"
};
return template.helper("convert_swipe_card_status",function(e){
return S[e]||e;
}),{
type_map:m,
status_map:f,
store_status:y,
gender_map:x,
source_map:b,
convert_provide_time:n,
nl2br:r,
sub_merchant_status_map:D,
fix_money:function(e){
var t=/(\.\d{2}).+$/,r=e;
return r=parseFloat((r+"").replace(t,"$1"));
},
parse_assistsend_quota:function(e,t){
for(var r=0,n=0,a=0;a<e.length;a++){
var _=e[a];
_.quota_name==(t||"merchant_auth_create_card")&&(r=_.value),_.quota_name==(t?t+"_max_sku":"merchant_auth_create_card_max_sku")&&(n=_.value);
}
return{
max_card:r,
max_sku:n
};
},
check_friend_card_word:function(e,t){
if(!e)return!0;
for(var r=0;r<C.length;r++)if(e.indexOf(C[r])>=0)return t?t():!0;
return!0;
},
check_assist_brand_name_type:s,
can_category_use_sns_card:_,
fix_abstract4friendcard:o,
strlen:function(e){
for(var t=0,r=0;r<e.length;r++){
var n=e.charCodeAt(r);
128>n?t++:t+=2;
}
return t;
},
gen_use_time:c,
gen_time_limit:t
};
});define("common/wx/top.js",["tpl/top.html.js"],function(e,t,a){
"use strict";
function i(e,t,a){
return this.dom=$(e),this.dom.addClass("title_tab"),t&&"string"==typeof t&&(t=[{
name:"",
url:"javascript:;",
className:"selected"
}]),$.each(t,function(e,t){
t.url=t.url&&[t.url,wx.data.param].join("")||"javascript:;";
}),this.dom.html(template.compile(n)({
data:t
})),a&&a.render&&"function"==typeof a.render?$.each(this.dom.find("li"),function(e,i){
a.render.apply($(i),[t[e],a&&a.data]);
}):this.dom.html(template.compile(n)({
data:t
})),this.dom.on("click",".top_item",function(){
$(this).addClass("selected").siblings().removeClass("selected");
}),this;
}
var n=e("tpl/top.html.js"),s=wx.acl;
i.prototype.selected=function(e){
this.dom.find(".js_top").removeClass("selected"),"number"==typeof e?this.dom.find(".js_top:eq("+e+")").addClass("selected"):this.dom.find(".js_top[data-id="+e+"]").addClass("selected");
},i.DATA={
setting:[{
id:"info",
name:"帐号详情",
url:"/cgi-bin/settingpage?t=setting/index&action=index"
},{
id:"function",
name:"功能设置",
url:"/cgi-bin/settingpage?t=setting/function&action=function"
}],
mass:[{
id:"send",
name:"新建群发消息",
url:"/cgi-bin/masssendpage?t=mass/send"
},{
id:"jurisdiction",
name:"授权申请",
acl:s&&s.msg_acl&&s.msg_acl.can_use_reprintapply_list,
url:"/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0&lang=zh_CN"
}],
message:[{
id:"total",
name:"全部消息",
url:"/cgi-bin/message?t=message/list&count=20&day=7"
},{
id:"star",
name:"已收藏的消息",
url:"/cgi-bin/message?t=message/list&count=20&action=star"
},{
id:"search",
name:"搜索结果"
}],
media:[{
id:"media11",
name:"商品消息",
acl:s&&s.material_acl&&s.material_acl.can_commodity_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list&type=11&action=list"
},{
id:"media10",
name:"图文消息",
acl:s&&s.material_acl&&s.material_acl.can_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list2&type=10&action=list_card"
},{
id:"media2",
name:"图片",
acl:s&&s.material_acl&&s.material_acl.can_image_msg,
url:"/cgi-bin/filepage?type=2&begin=0&count=12&t=media/img_list"
},{
id:"media3",
name:"语音",
acl:s&&s.material_acl&&s.material_acl.can_voice_msg,
url:"/cgi-bin/filepage?type=3&begin=0&count=21&t=media/list"
},{
id:"media15",
name:"视频",
acl:s&&s.material_acl&&s.material_acl.can_video_msg,
url:"/cgi-bin/appmsg?begin=0&count=9&t=media/video_list&action=list_video&type=15"
}],
business:[{
id:"overview",
name:"数据概览",
url:"/merchant/business?t=business/overview&action=overview"
},{
id:"order",
name:"订单流水",
url:"/merchant/business?t=business/order&action=order"
},{
id:"info",
name:"商户信息",
url:"/merchant/business?t=business/info&action=info"
},{
id:"test",
name:"支付测试",
url:"/merchant/business?t=business/whitelist&action=whitelist"
},{
id:"rights",
name:"维权仲裁",
url:"/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback"
},{
id:"course",
name:"使用教程",
url:"/merchant/business?t=business/course&action=course"
}],
user:[{
id:"useradmin",
name:"已关注",
url:"/cgi-bin/contactmanage?t=user/index&pagesize=10&pageidx=0&type=0&groupid=0"
}],
statistics:{
user:[{
id:"summary",
name:"用户增长",
url:"/misc/pluginloginpage?action=stat_user_summary&pluginid=luopan&t=statistics/index"
},{
id:"attr",
name:"用户属性",
url:"/misc/pluginloginpage?action=stat_user_attr&pluginid=luopan&t=statistics/index"
}],
article:[{
id:"detail",
name:"图文群发",
url:"/misc/pluginloginpage?action=stat_article_detail&pluginid=luopan&t=statistics/index"
},{
id:"analyse",
name:"图文统计",
url:"/misc/pluginloginpage?action=stat_article_analyse&pluginid=luopan&t=statistics/index"
}],
message:[{
id:"message",
name:"消息分析",
url:"/misc/pluginloginpage?action=stat_message&pluginid=luopan&t=statistics/index"
},{
id:"key",
name:"消息关键词",
url:"/misc/pluginloginpage?action=ctr_keyword&pluginid=luopan&t=statistics/index"
}],
"interface":[{
id:"interface",
name:"接口分析",
url:"/misc/pluginloginpage?action=stat_interface&pluginid=luopan&t=statistics/index"
}]
},
notification:[{
id:"notification",
name:"通知中心",
url:"/cgi-bin/frame?t=notification/index_frame"
}],
templateMessage:[{
id:"my_template",
name:"我的模板",
url:"/advanced/tmplmsg?action=list&t=tmplmsg/list"
},{
id:"template_message",
name:"模板库",
url:"/advanced/tmplmsg?action=tmpl_store&t=tmplmsg/store"
}],
assistant:[{
id:"mphelper",
name:"公众号助手",
url:"/misc/assistant?t=setting/mphelper&action=mphelper"
},{
id:"warning",
name:"接口告警",
url:"/misc/assistant?t=setting/warning&action=warning"
}],
shop:[{
id:"shopoverview",
name:"小店概况",
url:"/merchant/merchantstat?t=shop/overview&action=getoverview"
},{
id:"addGoods",
name:"添加商品",
url:"/merchant/goods?type=11&t=shop/precreate",
target:"_blank"
},{
id:"goodsManagement",
name:"商品管理",
url:"/merchant/goodsgroup?t=shop/category&type=1"
},{
id:"shelfManagement",
name:"货架管理",
url:"/merchant/shelf?status=0&action=get_shelflist&t=shop/myshelf&offset=0&count=5"
},{
id:"orderManagement",
name:"订单管理",
url:"/merchant/productorder?action=getlist&t=shop/order_list&last_days=30&count=10&offset=0"
},{
id:"deliverylist",
name:"运费模板管理",
url:"/merchant/delivery?action=getlist&t=shop/delivery_list"
},{
id:"images",
name:"图片库",
url:"/merchant/goodsimage?action=getimage&t=shop/shop_img&count=20&offset=0"
}],
adClient:[{
id:"adclientreport",
name:"报表统计",
url:"/merchant/ad_client_report?t=ad_system/client_report&action=list"
},{
id:"adclientmanage",
name:"广告管理",
url:"/merchant/advert?t=ad_system/promotion_list&action=get_advert_count"
},{
id:"materialmanage",
name:"推广页管理",
url:"/merchant/ad_material?t=material/list&action=get_material_list"
},{
id:"adclientpay",
name:"财务管理",
url:"/cgi-bin/frame?nav=10026&t=ad_system/host_frame"
},{
id:"adservice",
name:"广告服务商",
acl:s&&s.ad_system&&s.ad_system.can_use_sp,
url:"/cgi-bin/frame?nav=10026&t=ad_system/client_service_frame"
}],
adHost:[{
id:"adhostreport",
name:"报表统计",
url:"/merchant/ad_host_report?t=ad_system/host_report"
},{
id:"adhostmanage",
name:"流量管理",
url:"/merchant/ad_host_manage?t=ad_system/host_manage"
},{
id:"adhostpay",
name:"财务管理",
url:"/merchant/ad_host_pay?action=ad_host_pay&t=ad_system/host_pay"
}],
advanced:[{
id:"dev",
name:"日志查询",
url:"/advanced/advanced?action=log_home"
},{
id:"group-alert",
name:"接口报警",
url:"/advanced/advanced?action=alarm&t=advanced/alarm"
}],
cardticket:[{
id:"cardmgr",
name:"卡券管理",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card"
},{
id:"permission",
name:"卡券核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission"
},{
id:"carduse",
name:"核销记录",
url:"/merchant/carduserecord?action=listrecord&t=cardticket/carduse_record"
},{
id:"cardreport",
name:"数据报表",
url:"/merchant/ecardreport?action=overviewpage&t=cardticket/overviewpage"
}],
infringement:[{
id:"infringement",
name:"我要投诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=1"
},{
id:"antiinfringement",
name:"我要申诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=2"
},{
id:"list",
name:"提交记录",
url:"/acct/infringement?action=getlist&t=infringement/ingringement_list&type=1&begin=0&count=10"
}],
scan:[{
id:"overview",
name:"数据概况",
url:"/merchant/scandataoverview?action=keydata"
},{
id:"product_list",
name:"商品管理",
url:"/merchant/scanproductlist?action=list&page=1&status=1"
},{
id:"firmcat_list",
name:"资质管理",
url:"/merchant/scanqualification?action=firmcatpage"
}],
rumor:[{
id:"list",
name:"谣言池",
url:"/misc/rumor?action=rumorlist&t=rumor/list"
},{
id:"result",
name:"辟谣数据",
url:"/misc/rumor?action=summarylist&t=rumor/result"
}],
reward:[{
id:"list",
name:"数据概况",
url:"/merchant/rewardstat?action=getoverview&t=reward/overview"
},{
id:"setting",
name:"赞赏设置",
url:"/merchant/reward?action=rewardsetting"
}],
discuss:[{
id:"list_latest",
name:"留言列表",
url:"/misc/appmsgcomment?action=list_latest_comment&begin=0&count=10&mp_version=7"
},{
id:"index",
name:"群发消息管理",
url:"/misc/appmsgcomment?action=list_app_msg&begin=0&count=10"
}],
search:[{
id:"search",
name:"搜索",
url:"/advanced/componentsearch?action=search"
},{
id:"authorized",
name:"已添加",
url:"/cgi-bin/component_unauthorize?action=list&t=service/auth_plugins"
}],
kf:[{
id:"account",
name:"账号管理",
url:"/misc/kf?t=services/list&action=list"
},{
id:"state",
name:"客服数据",
url:"/misc/kf?t=services/kf_stat&action=getstatpage"
},{
id:"media",
name:"客服素材",
url:"/misc/kf?t=services/kf-public-text&action=publicreplypage"
}],
ibeacon:[{
id:"deviceManagement",
name:"设备管理",
url:"/merchant/beacongetdevices?action=list"
},{
id:"pageManagement",
name:"页面管理",
url:"/merchant/beaconlistpage?action=list&need_dc=1"
},{
id:"dataReport",
name:"数据报表",
url:"/merchant/beaconstatsummary?action=list"
}]
},s&&s.ad_system&&s.ad_system.can_use_new_ad&&(i.DATA.adClient[0].url="/cgi-bin/frame?nav=10026&t=ad_system/client_report_frame",
i.DATA.adClient[1].url="/cgi-bin/frame?nav=10026&t=ad_system/promotion_list_frame"),
s&&s.merchant_acl&&s.merchant_acl.can_use_account_manage&&i.DATA.adClient.push({
id:"adclientaccountmanage",
name:"账户管理",
acl:s&&s.ad_system&&s.ad_system.can_use_account_manage,
url:"/cgi-bin/frame?nav=10026&t=ad_system/account_frame"
}),s&&s.merchant_acl&&s.merchant_acl.can_use_pay_tmpl&&i.DATA.templateMessage.push({
id:"template_pay_list",
name:"支付模板消息",
url:"/advanced/tmplmsg?action=pay_list&t=tmplmsg/payment"
}),i.RENDER={
setting:function(e,t){
"meeting"==e.id&&15!=t.role&&this.remove();
},
message:function(e,t){
"search"!=e.id||t&&"search"==t.action||this.remove();
},
assistant:function(e,t){
"warning"!=e.id||t&&0!=t.have_service_package||this.remove();
},
reward:function(e,t){
"invite"!=e.id||t&&0!=t.invite_authority||this.remove();
}
},a.exports=i;
});define("cardticket/add.js",["common/wx/top.js","cardticket/common_template_helper.js","cardticket/topmenu.js","cardticket/add/business_service.js","cardticket/add/discount_time.js","cardticket/add/section_mgr.js","cardticket/add/step_mgr.js","cardticket/add/color.js","cardticket/add/validtime.js","cardticket/add/use_condition.js","cardticket/add/dispose_method.js","cardticket/add/card_desc.js","cardticket/add/msg_operate.js","cardticket/add/nearby.js","cardticket/add/shop.js","cardticket/add/share_type.js","cardticket/add/config_url.js","cardticket/add/preview.js","cardticket/add/disabled_field.js","cardticket/add/submit.js","cardticket/add/maxlength.js","cardticket/add/editor_collapse.js","cardticket/add/logo.js","cardticket/add/init.js","cardticket/common_init.js","cardticket/affix.js"],function(a){
"use strict";
function d(d){
function e(){
C.is_max()?$("#js_add_config_url").addClass("btn_disabled"):$("#js_add_config_url").removeClass("btn_disabled");
}
d&&(t.data=d),t.data.consume_validate_code=t.consume_validate_code,t.data._can_use_self_consume=!wx.cgiData.is_friend_card&&10!=t.data.type,
t.data._can_use_paycard_apply=10==t.data.type||2==t.data.type||4==t.data.type,t.data._is_global_editting=t.is_global_editting,
t.data._support_can_use_with_membercard=2==t.data.type||4==t.data.type,t.data._can_use_swipe_card=window.is_can_use_swipe_card_consume&&4==t.data.type&&t.data.has_condition;
var s=a("cardticket/add/business_service.js"),_=a("cardticket/add/discount_time.js");
$("#js_edit_area").html(template.render("js_edit_tpl1",{
data:t.data,
is_can_use_help_make_and_send:window.wx_is_can_use_help_make_and_send&&!wx.cgiData.ispay&&!t.is_global_editting
})),$("#js_edit_area2").html(template.render("js_edit_tpl2",{
data:t.data,
is_can_use_help_make_and_send:window.wx_is_can_use_help_make_and_send&&!wx.cgiData.ispay&&!t.is_global_editting,
consume_validate_code:t.consume_validate_code
})),$("#js_preview_area").html(template.render("js_preview_tpl",{
data:t.data
}));
var r=a("cardticket/add/section_mgr.js"),n=new r,o=a("cardticket/add/step_mgr.js"),m=new o({
container:"#js_add_step_head",
contents:".js_tab_content"
}),j=a("cardticket/add/color.js"),l=(new j({
data:t.data
}),a("cardticket/add/validtime.js")),p=(l({
data:t.data,
sectionmgr:n
}),a("cardticket/add/use_condition.js")),k=(new p({
container:"#js_use_condition",
data:t.data
}),a("cardticket/add/dispose_method.js")),u=new k({
data:t.data
}),w=new _({
container:"#js_discount_time",
data:t.data
}),g=new s({
container:"#js_business_service",
data:t.data
}),h=a("cardticket/add/card_desc.js"),v=new h({
uploadDom:"#js_upload_cover",
data:t.data
}),b=a("cardticket/add/msg_operate.js"),f=new b({
data:t.data,
sectionmgr:n,
biz:wx.cgiData.biz
}),x=a("cardticket/add/nearby.js"),y=(new x({
data:t.data
}),a("cardticket/add/shop.js")),D=new y({
data:t.data
}),q=a("cardticket/add/share_type.js"),z=(new q({
data:t.data
}),a("cardticket/add/config_url.js")),C=new z({
data:t.data,
container:"#js_config_url_p",
onchanged:function(){
e();
},
can_merchant:t.can_merchant,
biz:t.biz,
max:1
});
e();
var L=a("cardticket/add/preview.js");
new L({
data:t.data
});
var M=a("cardticket/add/disabled_field.js");
new M({
data:t.data
});
var S=a("cardticket/add/submit.js");
new S({
data:t.data,
max_sku:c.max_sku,
max_card:c.max_card,
sectionmgr:n,
msg_operate:f,
config_url:C,
mod_shop:D,
stepmgr:m,
discountTime:w,
cardDesc:v,
businessService:g,
disposeMethod:u
}),window.onbeforeunload=function(){
return"确定不提交卡券，离开此页？";
};
var T=a("cardticket/add/maxlength.js");
T();
var A=a("cardticket/add/editor_collapse.js");
A(),i.initLogo({
data:t.data,
max_card:c.max_card
});
}
var t=wx.cgiData,e=(a("common/wx/top.js"),a("cardticket/common_template_helper.js"));
a("cardticket/topmenu.js").selected("cardmgr");
var c=e.parse_assistsend_quota(wx.cgiData.quota.quota_list),i=(e.parse_assistsend_quota(wx.cgiData.quota.quota_list,"self_create_card"),
a("cardticket/add/logo.js"));
if(!i.checkLogo({
data:t.data
}))return!1;
var s=a("cardticket/add/init.js");
s({
init:d,
cardid:t.cardid,
data:t.data
}),a("cardticket/common_init.js"),a("cardticket/affix.js");
});