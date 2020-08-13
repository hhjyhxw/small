define("cardticket/add/logo.js",["common/wx/dialog.js","biz_web/ui/checkbox.js","cardticket/select_sub_merchant.js","common/qq/events.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t,e,a){
$("#js_logo_url_preview,#js_logo_url_preview_1").attr("src",e.http2https()),$("#js_logo_url_hidden").val(e.https2http()),
$("#js_brand_name_preview, #js_brand_name_preview_1").text(t),$("#js_brand_name_hidden").val(t),
$("#js_sub_merchant_id").val(a?a:""),window.card_is_sub_merchant=!!a,s.trigger("submit:sub_merchant_change",a);
}
function a(t){
return t.data.logo_url?!0:(n.show({
title:"提示",
type:"warn",
msg:"你的公众号还没有设置商户名称、商户Logo|点击“填写商户信息”进入修改页面。",
buttons:[{
text:"填写商户信息",
click:function(){
location.href=wx.url("/merchant/cardapply?action=listmerchantinfo&t=cardticket/apply_detail");
}
}]
}),!1);
}
function c(t){
$("#js_select_sub_merchant").click(function(){
return new _({
max_card:t.max_card,
is_sns_card:t.data.is_sns_card,
selectComplete:function(t,a){
e(a.BrandName,a.Logo,a.Id,2);
}
}).show(),!1;
});
e(t.data.brand_name,t.data.logo_url,t.data.sub_merchant_id),(t.data._is_global_editting||t.data.sub_merchant_id)&&s.trigger("submit:sub_merchant_change",t.data.sub_merchant_id);
}
var n=t("common/wx/dialog.js");
t("biz_web/ui/checkbox.js");
var _=t("cardticket/select_sub_merchant.js"),r=t("common/qq/events.js"),s=r(!0),o=(t("cardticket/common_template_helper.js"),
{
checkLogo:a,
initLogo:c
});
return o;
});define("cardticket/add/editor_collapse.js",[],function(){
"use strict";
var o=function(o){
function t(o,t,e){
var a=o.closest(t),r=a.find(e);
r.toggle();
var c=o.attr("data-open");
1==c?o.attr("data-open","0").find(".editor_collapsor").text("展开"):o.attr("data-open","1").find(".editor_collapsor").text("收起");
}
o=$.extend(!0,{
collapsorDom:".js_editor_collapsor",
collapseDom:".js_editor_collapse",
parentDom:".js_editor_section"
},o),$(o.collapsorDom).click(function(){
t($(this),o.parentDom,o.collapseDom);
}),$(o.collapsorDom).find("a").click(function(){
return $(this).parent().click(),!1;
});
};
return o;
});define("cardticket/add/maxlength.js",[],function(){
"use strict";
function t(t){
$(t.container).on("keyup",function(){
var n=$.trim($(this).val());
$(t.hint).text(Math.round((1==t.lentype?n.len()/2:n.length)||0));
}).keyup();
}
function n(n){
n||(n={}),$(n.container||".js_maxlength").each(function(){
var e=$(this).attr("data-maxlength"),a=$(this).attr("target");
e&&t({
container:this,
hint:a,
max:e,
lentype:n.lentype||1
});
});
}
return n;
});define("cardticket/add/submit.js",["biz_common/jquery.validate.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/clickreport.js","common/wx/dialog.js","common/wx/Tips.js","biz_web/lib/json.js","common/qq/events.js","common/wx/stopMultiRequest.js","cardticket/common_template_helper.js","cardticket/common_validate.js","common/wx/popup.js","tpl/simplePopup.html.js","biz_web/lib/store.js"],function(e){
"use strict";
function t(t){
function r(){
return t.data.MEMBER_TYPE==t.data.type;
}
function a(){
return 1==t.data.is_sns_card;
}
function u(){
return a()&&3==t.data.type;
}
function d(e){
return/^[0-9]+$/.test(e)&&!isNaN(parseInt(e))&&parseInt(e)>0?parseInt(e)>y?!1:!0:!1;
}
function p(e,i,o){
function s(){
r()?x.go(2):x.gofirst();
}
if(100==o)return!0;
if(!(e||o&&1!=o))return _.err("请选择生效时间"),s(),!1;
if(!(i||o&&2!=o))return _.err("请选择失效时间"),s(),!1;
if(!t.data._is_global_editting){
if(!r()&&e&&n.unix(e).add("d",1).unix()<n().unix())return _.err("生效时间不能是今天之前的时间"),
s(),!1;
if(e&&i&&n.unix(e).unix()>n.unix(i).unix())return _.err("生效时间不能小于失效时间"),s(),!1;
}
return i&&i<n().unix()?(_.err("生效时间不能是今天之前的时间"),s(),!1):!0;
}
function l(){
var e=$("#js_card_article").offset();
window.scrollTo(0,e.top);
}
function m(e){
if(e=$(e),e&&e.length){
var t=e.offset();
t&&window.scrollTo(0,t.top);
}
}
function f(e){
for(var t in e)e[t]=$.trim(e[t]);
return e;
}
function b(e){
var i={};
F.each(function(){
var e=$(this).serializeObject();
$.extend(!0,i,e);
});
var o=$(e).attr("id"),s="js_editform_step1"===o;
if(f(i),!i.color)return _.err("请选择%s颜色".sprintf(j)),void x.go(0);
if(!s&&!i.code_type)return _.err("请选择销券方式"),void x.go(1);
if(!s){
if(z){
var a=z.val();
if(!a)return;
if($.extend(i,a),1==i.card_pay_money&&!window.wx_is_paycard)return _.err("尚未配置商户号，无法使用自助买单"),
void z.showOpenPaycard();
}
if(!w.validate())return;
if("1"==i.shop_type){
for(var c=[],u=w.shop_select.getData(),d=0;d<u.length;d++)c.push(u[d].wx_poi_uid);
if(i.location_id_list=c.join("|"),1==i.is_sns_card&&!i.location_id_list)return void _.err("共享券必须添加门店");
}
if("2"==i.shop_type&&(i.no_store_reason="",!i.location_id_list&&2==i.shop_type))return _.err("请添加适用门店"),
void x.go(3);
if("3"==i.shop_type){
if(i.location_id_list="",i.show_in_nearby="0",3==i.no_store_reason_type&&(i.no_store_reason=$(".js_noshop_input").val()),
!i.no_store_reason)return _.err("请添加适用门店"),void x.go(3);
if(i.no_store_reason.len()>100)return _.err("无指定门店原因不能超过50个字"),void x.go(3);
}
if(1==i.show_in_nearby&&!i.poi_pic_url)return _.err("请上传卡券缩略图"),void x.go(3);
"0"==i.show_in_nearby&&(i.poi_pic_url="");
}
if(1==i.time_type){
if(i.end_time=parseInt(i.end_time)+86400-1,!p(i.begin_time,i.end_time))return;
if(i.is_swipe_card&&!i.is_global_editting){
var b=parseInt(i.begin_time),h="YYYYMMDD";
n.unix(b).format(h)==n().format(h)&&(i.begin_time=n().unix()+120);
}
}
if(i.card_type=i.type,wx.cgiData.ispay){
var g=parseFloat(parseFloat(i.price).toFixed(2));
i.detail=i.detail+"\n微信价："+g+"元";
}
for(var v=/(\.\d{2}).+$/,y=["reduce_cost","least_cost","use_condition_least_cost"],d=0;d<y.length;d++)if(i[y[d]]){
var L=i[y[d]];
L=(L+"").replace(v,"$1"),i[y[d]]=/(\.\d{0,2})$/.test(L)?L.replace(".","")+(1==RegExp.$1.length?"00":2==RegExp.$1.length?"0":""):L+"00";
}
if(1==i.is_sns_card&&4==i.type,i.price&&(i.price=100*i.price),i.ori_price&&(i.ori_price=100*i.ori_price),
i.reduce_money&&(i.reduce_money=100*i.reduce_money),i.least_money_to_use_bonus&&(i.least_money_to_use_bonus=100*i.least_money_to_use_bonus),
i.discount&&(i.discount=10*i.discount),r()){
if(!i.supply_bonus&&!i.supply_discount)return _.err("请至少选择一种会员卡优惠类型"),void x.go(2);
if(!s){
var R=k.val("1"==i.must_activate);
$.extend(i,R),1!=i.must_activate&&(i.activate_prompt="");
}
i.cost_money_unit=i.supply_bonus?100*i.cost_money_unit:i.init_bonus=i.increase_bonus=i.max_increase_bonus=0,
i.supply_discount?i.prerogative="用卡可享受%s折优惠\n".sprintf(i.discount/10)+i.prerogative:i.discount=0;
}
if(!s){
var B=M.getData();
if(!B)return void x.go(1);
$.extend(i,B);
}
var E=q.val();
if(!E)return void x.go(4);
if($.extend(i,E),I){
var P=I.val();
if(i.discount_day=P.discount_day,i.discount_time_span=P.discount_time_span,i.discount_time_span===!1)return!1;
}
if(i.business_service=D&&D.val(),T){
var Y=T&&T.val();
if(1==i.is_sns_card&&!Y.text_image_item_count)return void l();
$.extend(!0,i,Y);
}
"undefined"!=typeof i.consume_share_self_num&&1==i.card_pay_money&&(i.consume_share_self_num=parseInt(i.consume_share_self_num)+2);
var G={
0:"使用时请出示该号码",
1:"使用时请出示该条码或号码",
2:"使用时请出示该二维码或号码",
1e4:"请点击立即使用进行自助核销"
};
if(i.notice||(i.notice=G[i.code_type]||""),s&&i.is_sns_card&&!i.has_condition&&i.uncheckcount>0){
var O=$("#js_friend_desc_tips").offset();
return window.scrollTo(0,O.top),$("#js_friend_desc_tips .js_description_tips").show(),
!1;
}
if($("#js_friend_desc_tips .js_description_tips").hide(),s&&i.is_sns_card&&4==i.type&&C&&!C.isValid())return!1;
if(!t.data._is_global_editting&&10!=t.data.type){
if(!i.can_use_with_other_discount)return _.err("请选择优惠共享"),m("#js_use_condition"),
m("#js_friend_desc_tips"),!1;
if(t.data._support_can_use_with_membercard&&1==i.can_use_with_other_discount&&""===i.can_use_with_membercard)return _.err("请选择是否与会员卡优惠共享"),
m("#js_use_condition"),m("#js_friend_desc_tips"),!1;
}
return"0"==i.open_self_consume&&(i.need_verify_code=0,i.need_remark=0),i.supply_balance=t.data.supply_balance?1:0,
i;
}
function h(e){
$(e).on("submit",function(){
return!1;
}).validate({
rules:{
brand_name:{
required:!0,
utf8byteMaxLength:24
},
title:{
required:!0,
byteMaxLength:u()?12:18
},
gift_num:{
posnum:!0,
byteMaxLength:2
},
gift_unit:{
byteMaxLength:4
},
sub_title:{
byteMaxLength:36
},
logo_url:{
required:!0
},
description:{
byteMaxLength:600,
check_friend_card_word:a()
},
"abstract":{
required:!0,
byteMaxLength:24,
check_friend_card_word:a()
},
get_limit:{
digits:!0
},
service_phone:{
customer_phone:!0
},
reduce_cost:{
required:!0,
posnum:!0,
reduce_cost:a(),
maxprice:1e5
},
price:{
required:!0,
posnum:!0,
maxprice:1e3
},
ori_price:{
required:!0,
posnum:!0,
price:!0,
maxprice:1e4
},
least_cost:{
posnum:!0,
maxprice:1e5
},
discount:{
discount:!0
},
code_type:{},
gift:{
required:!0,
byteMaxLength:600,
check_friend_card_word:a()
},
quantity:{
required:!t.data._is_global_editting,
digits:!t.data._is_global_editting,
posnum:!t.data._is_global_editting,
maxQuantity:!t.data._is_global_editting
},
notice:{
required:!0,
byteMaxLength:32
},
activate_prompt:{
required:function(){
return"1"==$("#js_hidden_must_activate").val();
},
byteMaxLength:32
},
use_limit:{
required:!0,
digits:!0
},
detail:{
required:!0,
byteMaxLength:600,
check_friend_card_word:a()
},
prerogative:{
required:!0
},
bonus_rules:{
bonus_rules:!0,
byteMaxLength:600
},
url:{
required:!0,
url:!0
},
cover_logo:{
required:!0
},
cost_money_unit:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
member_bonus:!0
},
increase_bonus:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
member_bonus:!0
},
max_increase_bonus:{
member_bonus:!0,
largerthanincrease_bonus:!0
},
init_bonus:{
member_bonus:!0
},
cost_bonus_unit:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
member_bonus:!0
},
reduce_money:{
required:function(){
return r()&&$("#js_supply_bonus").prop("checked");
},
money:!0
},
least_money_to_use_bonus:{
money:!0
},
max_reduce_bonus:{
member_bonus:!0,
min_reduce_bonus:!0
},
msg_operation_url:{
required:function(){
return 4==M.content_type;
}
},
msg_operation_url_text:{
required:function(){
return 1==M.content_type||4==M.content_type||2==M.content_type;
},
byteMaxLength:32
},
use_condition_least_cost:{
required:function(){
return 3==t.data.type?$("#js_use_condition_least_cost_checkbox").prop("checked")&&1==$("#js_use_condition_least_cost_type_hidden").val():$("#js_use_condition_least_cost_checkbox").prop("checked");
},
money:!0,
maxthanleastcost:4==t.data.type,
maxprice:1e5
},
accept_category:{
required:function(){
return $("#js_use_condition_category_checkbox").prop("checked")&&!$("#js_use_condition_reject_category_input").val();
},
byteMaxLength:30
},
reject_category:{
required:function(){
return $("#js_use_condition_category_checkbox").prop("checked")&&!$("#js_use_condition_accept_category_input").val();
},
byteMaxLength:30
},
object_use_for:{
required:function(){
return $("#js_use_condition_least_cost_checkbox").prop("checked")&&2==$("#js_use_condition_least_cost_type_hidden").val();
},
byteMaxLength:30
},
background_pic_url:{
required:function(){
return 1==$("#js_background_type").val();
}
}
},
messages:{
brand_name:{
required:"请选择子商户",
utf8byteMaxLength:"商户名称长度不能超过12个汉字或24个英文字母，请重新修改商户名称"
},
logo_url:{
required:"请选择子商户"
},
title:{
required:u()?"兑换内容不能为空且长度不超过6个汉字或12个英文字母":"%s名称不能为空且长度不超过9个汉字或18个英文字母".sprintf(j),
byteMaxLength:u()?"兑换内容不能为空且长度不超过6个汉字或12个英文字母":"%s名称不能为空且长度不超过9个汉字或18个英文字母".sprintf(j)
},
gift_num:{
posnum:"兑换数量只能是整数且最多2位",
byteMaxLength:"兑换数量只能是整数且最多2位"
},
gift_unit:{
byteMaxLength:"兑换单位长度不超过2个汉字或4个英文字母"
},
sub_title:{
byteMaxLength:"副标题长度不超过18个汉字或36个英文字母"
},
code_type:{
required:"请选择销券方式"
},
description:{
required:"使用须知不能为空且长度不超过300个汉字",
byteMaxLength:"使用须知长度不超过300个汉字"
},
"abstract":{
required:"简介不能为空且长度不超过12个汉字",
byteMaxLength:"简介须知不能为空且长度不超过12个汉字",
check_friend_card_word:"测试文案"
},
get_limit:{
digits:"领券限制只能是数字"
},
service_phone:{
required:"客服电话不能为空",
customer_phone:"请输入座机号或手机号，可加区号（如：020-88888888，最长不超过15位）",
byteMaxLength:"客服电话长度不超过15个汉字或30个英文字母/数字"
},
price:{
required:"微信价只能是大于0.01的数字",
posnum:"微信价只能是大于0.01的数字",
price:"微信价必须小于原价",
maxprice:"微信价不能大于1000元"
},
ori_price:{
required:"原价只能是大于0.01的数字",
posnum:"原价只能是大于0.01的数字",
price:"原价必须大于微信价",
maxprice:"原价不能大于1万元"
},
cover_logo:{
required:"请上传封面图片"
},
reduce_cost:{
required:function(){
return 1==$("#js_is_sns_card").val()?"减免金额不小于1元":"减免金额只能是大于0.01的数字";
},
posnum:function(){
return 1==$("#js_is_sns_card").val()?"减免金额不小于1元":"减免金额只能是大于0.01的数字";
},
reduce_cost:"减免金额不小于1元",
maxprice:"金额不能大于100000"
},
least_cost:"抵扣条件只能是大于0.01的数字",
discount:"折扣额度只能是大于1且小于10的数字",
gift:{
required:"自定义优惠说明不能为空且长度不超过300个汉字",
byteMaxLength:"自定义优惠说明不能为空且长度不超过300个汉字",
check_friend_card_word:"测试文案"
},
quantity:{
required:"库存只能是大于0的数字",
digits:"库存只能是大于0的数字",
posnum:"库存只能是大于0的数字",
maxQuantity:function(){
return"商户每张券库存不超过%s".sprintf(y);
}
},
notice:"操作提示不能为空且长度不超过16个汉字或32个英文字母",
activate_prompt:"激活提示不能为空且长度不超过16个汉字或32个英文字母",
use_limit:"使用次数只能是数字",
detail:{
required:"自定义优惠说明不能为空且长度不超过300个汉字",
byteMaxLength:"自定义优惠说明不能为空且长度不超过300个汉字",
check_friend_card_word:"测试文案"
},
prerogative:{
required:"特权说明不能为空"
},
bonus_rules:"积分规则不能为空且长度不超过300个汉字",
url:"请输入正确的图文详情网址",
cost_money_unit:"消费金额和赠送积分只能大于0的整数",
increase_bonus:"消费金额和赠送积分只能大于0的整数",
max_increase_bonus:"单次送积分上限只能是大于消费赠送积分",
init_bonus:"激活送积分只能是大于0的整数",
cost_bonus_unit:"积分只能填大于0的整数，金额大于0且只能到百分位",
reduce_money:"积分只能填大于0的整数，金额大于0且只能到百分位",
least_money_to_use_bonus:"积分只能填大于0的整数，金额大于0且只能到百分位",
max_reduce_bonus:{
member_bonus:"积分只能填大于0的整数，金额大于0且只能到百分位",
min_reduce_bonus:"单笔上限积分必须大于等于每使用积分"
},
msg_operation_url_text:"介绍文字不能为空且长度不超过16个汉字或32个英文字母",
msg_operation_url:"网页链接不能为空",
use_condition_least_cost:{
required:"消费金额大于0且只能到百分位",
money:"消费金额大于0且只能到百分位",
maxthanleastcost:"消费金额必须大于"+(a()?"代金券金额":"减免金额"),
maxprice:"金额不能大于100000"
},
accept_category:"适用商品不能为空且长度不能超过15个汉字或30个英文字母",
reject_category:"不适用商品不能为空且长度不能超过15个汉字或30个英文字母",
object_use_for:"消费条件不能为空且长度不能超过15个汉字或30个英文字母",
background_pic_url:"请上传背景图片"
},
errorPlacement:function(e,t){
if("code_type"==t.attr("name")){
var r=t.parent();
return void r.append(e);
}
var i=t.closest(".js_card_input_item");
i.find(".fail").remove();
var n=i.find(".frm_tips");
t.is(".file_field")?e.insertBefore(i.find(".upload_preview")):n.length?e.insertBefore(n):i.append(e);
},
ignore:[],
submitHandler:function(e){
var t=b(e);
t&&g(t);
},
invalidHandler:function(e,t){
var r=t.errorList[0],i=($(r.element).closest(".js_edit_content"),$(r.element).parent().offset());
window.scrollTo(0,i.top);
}
});
}
function g(e){
i.post({
url:"/merchant/electroniccardmgr?CGIDB=1",
data:e,
btn:R
},function(n){
if(n.need_check)return s.show({
msg:"check_mod_member_detail"==e.action?"本次修改预计3个工作日完成审核。审核前会员卡仍为原有信息，会员可用。若审核通过，会员卡更新，若审核不通过，则继续保持修改前的信息。":"本次修改需要审核后才能生效。审核期间，已被用户领取的优惠券可正常使用。是否确认提交？",
buttons:[{
text:"确定",
click:function(){
e.action="check_mod_member_detail"==e.action?"mod_member_detail":"update_card",g(e),
this.hide();
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
}),!1;
if("check_mod_member_detail"==e.action)return e.action="mod_member_detail",g(e),
!1;
if("check_if_update_card_need_check"==e.action)return e.action="update_card",g(e),
!1;
if(0==n.base_resp.ret||1==n.base_resp.ret){
if(window.onbeforeunload=null,r())_.suc("check_mod_member_detail"==e.action||"mod_member_detail"==e.action?"修改会员卡成功":"添加会员卡成功");else{
if(e.is_global_editting)return _.suc("修改卡券成功"),void(location.href=wx.url("/merchant/electroniccardmgr?action=batch&nodelay=1"+(2==window.view_mode?"&tag_filter=sub_merchant,1":"&sub_merchant_id=0")));
var a=$(".js_addtypeclickreport_suc").get(0);
a&&o.clickele(a,!0),_.suc("创建卡券成功");
}
o.timeonpage({
actionid:15
}),r()?setTimeout(function(){
location.href=wx.url("/merchant/membercardmgr?action=overview");
},1e3):($("#js_main_content").html("").append($("#js_add_suc").show()),1==e.is_swipe_card?($("#js_add_suc .js_swipe_card_tips").show(),
$("#js_add_suc .js_notall_consumer").hide()):$("#js_add_suc .js_not_swipe_card_tips").show(),
$("#js_add_step_head").hide(),window.scrollTo(0,100));
}else 10039==n.base_resp.ret?_.err("子商户每张券库存不超过%s份".sprintf(t.max_sku)):10036==n.base_resp.ret?_.err(2==window.view_mode?"每月仅可代该子商户制券%s张，请下月继续代制。".sprintf(t.max_card):"你的账号因违规，暂被关闭制券权限，请查看通知中心"):10047==n.base_resp.ret?_.err("共享券必须添加门店"):14018==n.base_resp.ret?_.err("创建失败，请先设置自助核销验证码"):10060==n.base_resp.ret?_.err("你的类目不在会员卡开放范围，部分功能受到限制"):10013==n.base_resp.ret?_.err("有效期开始时间不能是1年后的时间"):10040==n.base_resp.ret?_.err("子商户无效不能制券"):10075==n.base_resp.ret?_.err("请勿添加其它公众号的主页链接"):10078==n.base_resp.ret?_.err("链接已失效，请在手机端重新复制链接"):50105==n.base_resp.ret?_.err("卡券生效时间需大于当前时间"):50107==n.base_resp.ret?_.err("请确认微信支付制券商户号与微信支付适用商户号一致"):(v(n),
i.handleRet(n,{
id:64463,
key:29,
showMsg:!1,
url:"/merchant/electroniccardmgr?CGIDB=1"
}));
});
}
function v(e){
var t={},r=[];
if(e.unpass_list){
if($.isArray(e.unpass_list))for(var n=0;n<e.unpass_list.length;n++){
var o=e.unpass_list[n];
t[o.ret_code]||(t[o.ret_code]=[]),t[o.ret_code].push("商户号"+o.mch_id);
}else if(e.unpass_list.ret_code){
var o=e.unpass_list;
t[o.ret_code]||(t[o.ret_code]=[]),t[o.ret_code].push("商户号"+o.mch_id);
}
for(var _ in t)t.hasOwnProperty(_)&&r.push(t[_].join("、")+(B[_]||""));
r.length&&s.show({
msg:r.join("<br>"),
buttons:[{
text:"确定",
click:function(e){
this.remove(e);
}
}]
});
}else 0!=e.base_resp.ret&&i.show(e);
}
$.validator.addMethod("member_bonus",function(e,t){
return this.optional(t)||($("#js_supply_bonus").prop("checked")?/^[0-9]+$/.test(e)&&parseInt(e)>0:!0);
}),$.validator.addMethod("largerthanincrease_bonus",function(e,t){
return this.optional(t)||($("#js_supply_bonus").prop("checked")?parseInt($("#js_increase_bonus").val())<=e:!0);
});
var y=t.data.sub_merchant_id?t.max_sku:1e9;
c.on("submit:sub_merchant_change",function(e){
y=e?t.max_sku:1e9;
}),$.validator.addMethod("maxQuantity",function(e,t){
var r=$.trim(e);
return this.optional(t)||d(r);
}),$.validator.addMethod("min_reduce_bonus",function(e,t){
var r=parseInt($("#js_cost_bonus_unit").val());
return this.optional(t)||!r||e>=r;
});
var j=r()?"会员卡":"卡券",x=t.sectionmgr,w=t.mod_shop,k=t.member_active,q=t.config_url,M=t.msg_operate,L=t.stepmgr,I=t.discountTime,D=t.businessService,T=t.cardDesc,C=t.useCondition,z=t.disposeMethod;
$.validator.addMethod("price",function(){
var e=parseFloat($.trim($("#js_ori_price").val())),t=parseFloat($.trim($("#js_price").val()));
return e&&t?parseFloat(t)<e:!0;
}),$.validator.addMethod("maxthanleastcost",function(e,t){
return this.optional(t)||this.optional($("#js_reduce_cost").get(0))||parseFloat(e)>parseFloat($("#js_reduce_cost").val());
});
$.validator.addMethod("maxprice",function(e,t,r){
var i=$.trim(e);
return this.optional(t)||parseFloat(i)<=r;
});
var F=$("#js_editform_step1,#js_editform_step2");
F.each(function(){
h(this);
});
var R=$("#js_submit").click(function(){
$("#js_editform_step2").submit();
});
$("#js_nextstep").click(function(){
var e=$("#js_editform_step1");
if(e.valid()){
var t=b(e);
t&&L.next();
}
}),$("#js_prevstep").click(function(){
L.prev();
});
var B={
3145728:"制券商户号非法",
3145729:"商户号来源非法",
3145730:"场景非法",
3145731:"appid非法",
3145732:"适用商户列表非法",
3145733:"适用商户数超出上限",
3145734:"商户号不合法",
3145735:"商户号转换商户ID失败",
3145736:"查询商户信息失败",
3145737:"appid不属于制券商户号",
3145738:"该商户未在支付开启本权限",
3145739:"系统繁忙，请稍后重试",
3145740:"无权限使用",
3145741:"查询商户类型失败",
3145742:"商户号与商户ID转换失败",
3145743:"提交支付审核失败",
3145744:"适用商户不能为受理商户",
3145745:"制券商户与适用商户无关联",
3145746:"适用商户不是该制券商户号子商户",
3145747:"未开启非充值代金券跨商户审核，请登录微信支付后台，在账户中心-审核配置中，开通非充值券跨商户审核",
3145748:"尚未完成非充值券验收，请登录微信支付后台，打开开发文档-代金券或立减优惠，参照非充值代金券验收流程操作",
3145749:"校验失败",
3145750:"尚未开启支付代金券，请登录微信支付后台，打开营销中心，申请代金券权限",
3145751:"校验商户关系失败"
};
e("common/wx/popup.js");
var E=e("tpl/simplePopup.html.js"),P=e("biz_web/lib/store.js");
$("#js_preview").click(function(){
var e=$("#js_editform_step2");
if(e.valid()){
var t=b(e);
if(!t)return;
var r=!1,n=P.get("CARDTICKET_previewusername"),o=$(template.compile(E)({
label:"请输入微信号，此卡券将发送至该微信号预览。",
value:n
})).popup({
title:"发送预览",
className:"simple label_block",
onOK:function(){
var e=this.get(),n=e.find(".frm_input"),s=n.val().trim();
return r?!0:s?(r=!0,t.action="preview",t.username=s,i.post({
url:"/merchant/electroniccardmgr?CGIDB=1",
data:t,
complete:function(){
r=!1;
}
},function(e){
if(0==e.base_resp.ret)_.suc("发送预览成功，请留意你的手机微信"),P.set("CARDTICKET_previewusername",s),
o.popup("hide");else switch(e.base_resp.ret){
case 14006:
_.err("输入的微信号需先关注公众号");
break;

case 14007:
_.err("你输入是非法的微信号，请重新输入");
break;

case 14008:
_.err("你输入的微信号不存在，请重新输入");
break;

case 14009:
_.err("用户已被加入黑名单，无法向其发送消息");
break;

case 14010:
_.err("对方关闭了接收消息");
break;

case 10013:
_.err("有效期开始时间不能是1年后的时间");
break;

case 10060:
_.err("你的类目不在会员卡开放范围，部分功能受到限制");
break;

case 10040:
_.err("子商户无效不能制券");
break;

case 10075:
_.err("请勿添加其它公众号的主页链接");
break;

case 10078:
_.err("链接已失效，请在手机端重新复制链接");
break;

case 50107:
_.err("请确认微信支付制券商户号与微信支付适用商户号一致");
break;

default:
v(e),i.handleRet(e,{
id:64463,
key:29,
showMsg:!1,
url:"/merchant/electroniccardmgr?CGIDB=1"
});
}
}),!0):(_.err("请输入微信号"),n.focus(),!0);
},
onHide:function(){
this.remove();
}
});
o.popup("get").find(".frm_input").focus();
}else e.submit();
});
}
var r=e("biz_common/jquery.validate.js"),i=e("common/wx/Cgi.js"),n=e("biz_common/moment.js"),o=e("cardticket/clickreport.js"),s=e("common/wx/dialog.js"),_=e("common/wx/Tips.js"),a=(e("biz_web/lib/json.js"),
r.rules,e("common/qq/events.js")),c=a(!0);
e("common/wx/stopMultiRequest.js"),e("cardticket/common_template_helper.js"),e("cardticket/common_validate.js");
var a=e("common/qq/events.js"),c=a(!0);
return t;
});define("cardticket/add/disabled_field.js",[],function(){
"use strict";
function t(t){
function e(t){
for(var e=0;e<a.length;e++)if(a[e]==t)return e;
return-1;
}
var i=t.data._is_global_editting;
if(i&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status){
var d=$("#js_editform_step1,#js_editform_step2");
d.find("input,textarea").each(function(){
var t=$(this).attr("name");
e(t)>=0&&$(this).prop("readonly",!0).addClass("noedit_field").parent().addClass("disabled");
});
}
if(i){
var d=$("#js_editform_step2");
d.find("input[name=quantity]").prop("readonly",!0).addClass("noedit_field").parent().addClass("disabled");
}
}
var a=["reduce_cost","title","gift_unit","gift_num","least_cost","discount","detail","gift","quantity","use_condition_least_cost","object_use_for","accept_category","reject_category"];
return t;
});define("cardticket/add/preview.js",["common/wx/preview.js"],function(e){
"use strict";
function t(t){
$(".js_can_preview").on("keyup",function(){
var e=$(this).attr("name");
e&&($("#js_"+e+"_preview").text($(this).val()),$(".js_"+e+"_preview").text($(this).val()));
}).on("blur",function(){
var e=$(this).attr("name");
e&&($("#js_"+e+"_preview").text($(this).val()),$(".js_"+e+"_preview").text($(this).val()));
});
var s=e("common/wx/preview.js");
if($(".js_img_wrap_preview").click(function(){
var e=$(this).attr("bigsrc");
return e&&(s.show({
imgdata:[{
imgsrc:e,
downsrc:e
}]
}),$("#btndown").hide()),!1;
}),10==t.data.type){
var n=$("#js_prerogative_rule");
n.length&&setInterval(function(){
var e=$("#js_editform_step1").serializeObject();
e.type=t.data.type;
var s="";
e.init_bonus&&(s="激活成功即赠送%s积分".sprintf(e.init_bonus)),e.cost_money_unit&&e.increase_bonus&&(s&&(s+="<br>"),
s+="每消费%s元，赠送%s积分".sprintf(e.cost_money_unit,e.increase_bonus)),e.max_increase_bonus&&(s&&(s+="<br>"),
s+="单次赠送上限%s积分".sprintf(e.max_increase_bonus)),e.cost_bonus_unit&&e.reduce_money&&(s&&(s+="<br>"),
s+="每使用%s积分，抵扣%s元".sprintf(e.cost_bonus_unit,e.reduce_money),e.max_reduce_bonus&&(s+="，单笔使用上限%s积分".sprintf(e.max_reduce_bonus))),
n.html(s);
},1e3);
}
}
return t;
});define("cardticket/add/config_url.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","cardticket/add/maxlength.js","tpl/cardticket/config_url.html.js","homepage/appmsgdialog.js","cardticket/select_shelf.js","tpl/cardticket/config_url_item.html.js","cardticket/parse_data.js","media/appmsg_temp_url.js"],function(t){
"use strict";
function e(t){
t.$err_msg&&t.$err_msg.hide();
}
function i(t,e){
if(t)if(t.$err_msg)t.$err_msg.find(".frm_msg_content").text(e).show(),t.$err_msg.show();else{
var i=$(t).parent().parent();
t.$err_msg=$('<p class="frm_msg fail"><span class="frm_msg_content">%s</span></p>'.sprintf(e)).appendTo(i),
t.$err_msg.show();
}
}
function s(t,s,r){
return t.val().len()<=s?(e(t[0]),!0):(i(t[0],r),!1);
}
function r(t,s){
return $.trim(t.val())?(e(t[0]),!0):(i(t[0],s),!1);
}
function n(t){
var e=!0;
return e=r(t,x),e&&(e=s(t,10,w)),e;
}
function a(t){
var e=!0;
return e=s(t,12,b);
}
function l(t){
this.opt=t;
var e=$(t.container);
if(this.$dom=e,this.cur_len=0,t.data&&t.data.config_url&&t.data.config_url.length)for(var i=0;i<t.data.config_url.length;i++)t.can_merchant||3!=t.data.config_url[i].url_type||(t.data.config_url[i].url_type=4);
t.data.config_url&&this.add(t.data.config_url),e.on("click",".js_delete_item",function(){
var e=$(this);
e.closest(".js_appmsg_url_item").remove(),s.cur_len--,s.init_title();
var i=s.check(!1,1);
return s.init_preview(i),t.onchanged&&t.onchanged(),!1;
}),e.on("click",".js_select_appmsg",function(){
var t=$(this);
return new h({
ids:[],
multi:!1,
maxNum:1,
link:1,
callback:function(e){
e.length>0&&o(t,s.config_url,e[0],1);
}
}),!1;
}),e.on("click",".js_select_card_shelf,.js_select_shop_shelf",function(){
var e=$(this),i=e.attr("shelf_type")||1,s=new f({
shelf_type:i,
url:2==i?"/merchant/shelf?status=0&action=get_shelflist":"",
render_url:2==i?"/merchant/rendershelf?shelf_id=":"",
title:2==i?"选择小店货架":void 0,
selectComplete:function(s){
var r,n=e.closest(".js_appmsg_url_item"),a=n.find(".js_link_url");
1==i?r="http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=%s&showwxpaytitle=1&biz=%s&scene=1000007#wechat_redirect".sprintf(s,t.biz):2==i&&(r="http://mp.weixin.qq.com/bizmall/mallshelf?biz=%s&shelf_id=%s&showwxpaytitle=1#wechat_redirect".sprintf(t.biz,s)),
a.attr("href",r).text(r);
}
});
return s.show(),!1;
});
var s=this;
$("#js_add_config_url").click(function(){
return s.is_max()?(p.err("最多只能添加%s个自定义入口".sprintf(t.max)),!1):(s.add(),!1);
}),this.init_preview();
}
function _(t){
return 1==t?"一":2==t?"二":3==t?"三":void 0;
}
function c(t,e){
for(var i=0;i<t.length;i++)if(t[i].idx==e)return t[i];
return null;
}
function o(t,e,i,s){
var r=t.attr("data-v"),n=t.closest(".js_appmsg_url_item"),a=n.attr("data-idx"),l=n.find(".js_appmsg_edit_item_p"),_=c(e,a);
_.appmsg=i?i:null,_.url_type=r||s,_.url_match_type=_.url_type==j.url_type(_.appmsg&&_.appmsg.link||_.url),
l.html(d({
item:_
}));
}
t("biz_web/ui/checkbox.js");
var p=t("common/wx/Tips.js"),u=t("cardticket/add/maxlength.js"),m=template.compile(t("tpl/cardticket/config_url.html.js")),h=t("homepage/appmsgdialog.js"),f=t("cardticket/select_shelf.js"),d=template.compile(t("tpl/cardticket/config_url_item.html.js")),g=template.compile('<li class="msg_card_section{if showmask} js_preview{/if}{if is_last} last_li{/if}">        <div class="li_panel"><div class="li_content"><p><span class="supply_area"><span class="js_custom_url_tips_pre">{tips}</span><span class="ic ic_go"></span></span><span class="js_custom_url_name_pre">{name}</span></p></div>                  </div>         {if showmask}<div class="msg_card_mask"> <span class="vm_box"></span>         <a href="javascript:;" class="js_edit_icon edit_oper"><i class="icon18_common edit_gray"></i></a></div>{/if}         </li>'),v=0,j=t("cardticket/parse_data.js"),k=function(t,e){
if(!t||"string"!=typeof t)return t;
var i=/[^\x00-\xff]/g;
if(t.replace(i,"mm").length<=e)return t;
for(var s=Math.floor(e/2),r=s;r<t.length;r++)if(t.substr(0,r).replace(i,"mm").length>=e)return t.substr(0,r);
return t;
},x="自定义入口名称不能为空",w="自定义入口名称最多只能输入5个中文",b="自定义入口引导语最多只能输入6个中文";
l.prototype.init_title=function(){
this.$dom.find(".js_appmsg_url_intro").each(function(t){
$(this).text("入口"+_(t+1));
});
};
var y="自定义入口(选填)";
l.prototype.init_preview=function(t){
var e=this.opt,i=e.data;
this.$pre_dom=$("#js_custom_url_preview"),this.$pre_dom.html(""),t||(t=i.config_url),
t&&t.length?$("#js_config_url_toolbar").addClass("border"):$("#js_config_url_toolbar").removeClass("border"),
t&&t.length||(t=[{
name:y
}]);
for(var s=0;s<t.length;s++){
var r=$.extend(!0,{},t[s]);
r.is_last=s==t.length-1,r.showmask=!1,r.name||(r.name=y),r.name!==y&&(r.name=k(r.name,10)),
r.tips=k(r.tips,12),this.$pre_dom.append(g(r));
}
},l.prototype.add=function(e){
if(this.is_max())return!1;
var i=this.opt,s=$(i.container);
e||(e=[{
url_type:1
}]);
for(var r=0;r<e.length;r++)e[r].idx=v++,e[r].cur_idx=++this.cur_len;
var l=this;
this.config_url=this.config_url?this.config_url.concat(e):e;
var _=$(m({
data:{
config_url:e
},
can_merchant:i.can_merchant
}));
s.append(_),u({
container:_.find(".js_maxlength")
}),_.each(function(){
if($(this).hasClass("js_appmsg_url_item")){
var t=$(this).find(".js_jump_url_p input[type=radio]");
t.checkbox({
onChanged:function(t){
o(t,l.config_url);
}
}),o(t.filter("input:checked"),l.config_url);
}
}),_.find("input.js_custom_url_name").keyup(function(){
var t=$(this).closest(".js_appmsg_url_item"),e=t.index(),i=l.$pre_dom,s=k($(this).val(),12);
s||(s=y),$(i.find(".js_custom_url_name_pre")[e]).text(s),n($(this));
}).blur(function(){
n($(this));
}),_.find("input.js_custom_url_desc").keyup(function(){
var t=$(this).closest(".js_appmsg_url_item"),e=t.index(),i=l.$pre_dom,s=k($(this).val(),12);
$(i.find(".js_custom_url_tips_pre")[e]).text(s),a($(this));
}).blur(function(){
a($(this));
});
var c=t("media/appmsg_temp_url.js");
c(s,".js_preview"),this._init&&i.onchanged&&i.onchanged(),this._init=!0;
var p=this.check(!1,1);
return this.init_preview(p),!0;
},l.prototype.is_max=function(){
var t=this.$dom;
return t.find(".js_appmsg_url_item").length>=this.opt.max;
};
var z=/^http(s)?:\/\//;
return l.prototype.check=function(t,e){
var i=this.$dom,s=i.find(".js_appmsg_url_item");
if(s.length>3)return p.err("最多只能添加3个自定义入口"),!1;
var r=!0,l={
custom_cell_size:s.length
};
return 1==e&&(l=[]),s.each(function(i){
var s=$(this),_=s.find(".js_custom_url_name"),c=s.find(".js_custom_url_desc"),o=$.trim(_.val()),u=$.trim(c.val()),m=$.trim(s.find(".js_link_url").attr("href"));
return t?(r=n(_),r&&(r=a(c)),m||(m=$.trim(s.find(".js_link_url").val())),r&&!m&&(p.err("自定义入口跳转链接不能为空"),
r=!1),r&&!z.test(m)&&(m="http://"+m),r?void(1==e?l.push({
name:o,
tips:u,
url:m
}):(l["custom_cell_name_"+i]=o,l["custom_cell_tips_"+i]=u,l["custom_cell_url_"+i]=m)):!1):void(1==e?l.push({
name:o,
tips:u,
url:m
}):(l["custom_cell_name_"+i]=o,l["custom_cell_tips_"+i]=u,l["custom_cell_url_"+i]=m));
}),r?l:r;
},l.prototype.val=function(){
return this.check(!0);
},l;
});define("cardticket/add/share_type.js",["biz_web/ui/checkbox.js"],function(e){
"use strict";
function c(e){
e=$.extend(!0,{
data:{}
},e);
var c=$("#js_active_container"),a=$("#js_share_type input[type=checkbox]").checkbox({
onChanged:function(e){
var a=$(e.attr("target")),t=e.prop("checked");
a.val(t?1:0),e.hasClass("js_active_checkbox")&&(t?c.show():c.hide(),t?$("#js_active_give_bonus").show():$("#js_active_give_bonus").hide());
}
});
return e.data.ispay&&a.disable(["1"]),1==e.data.create_source&&$("#js_share_type .js_active_checkbox").checkbox().disabled(!0),
a;
}
e("biz_web/ui/checkbox.js");
return c;
});define("cardticket/add/shop.js",["common/wx/pagebar.js","biz_web/ui/checkbox.js","common/wx/dialog.js","common/qq/events.js","cardticket/select_shop_popup.js","tpl/cardticket/create_card_shop_tips.html.js"],function(e){
"use strict";
function t(t){
function o(){
w.length?$("#js_shop_table").show():$("#js_shop_table").hide();
}
function n(e,o){
for(var _=[],n=0;n<w.length;n++)_.push(w[n].id);
r.shop_select=new y({
autoShow:"undefined"!=typeof o?o:!0,
multi:!0,
pageCapacity:5,
selectedValues:_,
help_top:-15,
nostore:!1,
show_pay:2==t.data.type||4==t.data.type||10==t.data.type,
audit_state:"2|3",
selectComplete:function(e){
k=1,p(e);
},
initComplete:function(){
f=this.getCacheData();
for(var e=x,t=[],o=0;o<e.length;o++)f[e[o]]&&t.push(f[e[o]]);
g&&(p(t),s(r),g=!1);
},
data:e
});
}
function p(e){
function t(){
for(var s=[],o=(k-1)*C,_=k*C,n=o;n<e.length&&_>n;n++)s.push(e[n]);
if(v.html(template.render("js_add_shop_tpl",{
shop_data:s
})),e.length>C){
new a({
container:"#js_shop_pager",
perPage:C,
initShowPage:k,
totalItemsNum:e.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
k=e.currentPage,t();
}
});
}else $("#js_shop_pager").html("");
}
e||(e=w);
for(var s=[],_=0;_<e.length;_++)s.push(e[_].wx_poi_uid);
w=e,x=s,b.val(s.join("|")),r.current_shop=w,t(),o(),c(!0);
}
function c(){
for(var e=(d.val(),r.shop_select.getData()),t=!1,s=0,o=0;o<e.length;o++)e[o].card_pay_money&&(t=!0,
s++);
r.has_store=t,r._wepay_shop_count=s,r._all_shop_count=e.length,r._shopinit=!0,h.trigger("shop:initComplete",t,e.length>0,e);
}
t=$.extend(!0,{
data:{}
},t);
{
var r=this,d=$("#js_hidden_shop_type"),l=$(".js_shop_type"),u=$("#js_hidden_noshop_reason"),m=$("#js_fix_shop").hide(),j=$("#js_nofix_shop").hide();
l.checkbox({
onChanged:function(e){
var t=e.val();
d.val(t),2==t||1==t?(m.show(),o(),$("#js_nearby").prop("checked")):($("#js_nearby_container").hide(),
m.hide(),$("#js_poi_pic_url").hide(),$("#js_near_tips").html(template.render("js_neartips_tpl",{}))),
3==t?j.show():j.hide(),(1==t||3==t)&&m.hide(),h.trigger("shop:type_change",t),s(r);
}
}),j.find(".js_noshop_type").checkbox({
onChanged:function(e){
var t=e.val();
switch(+t){
case 1:
u.val("网上经营，无需到店消费"),j.find(".js_noshop_sub").hide();
break;

case 2:
u.val("门店审核中"),j.find(".js_noshop_sub").hide();
break;

case 3:
j.find(".js_noshop_sub").show();
}
$("#js_hidden_noshop_reason_type").val(t);
}
});
}
j.find(".js_noshop_input").on("keyup propertychange",function(){
var e=$(this),t=e.val().trim(),s=t.bytes(),o=(s+s%2)/2,_=e.closest(".js_noshop_sub").find(".js_noshop_num");
_.text(o+"/50"),o>50?_.addClass("error"):(_.removeClass("error"),u.val(t));
});
var f={},w=[],g=!0;
2==t.data.shop_type?$(l[1]).click():3==t.data.shop_type?$(l[2]).click():1==t.data.shop_type;
var y=e("cardticket/select_shop_popup.js"),v=$("#js_shop_list"),b=$("#js_hidden_shop_id_list"),x=t.data.location_id_list||[],k=1,C=5;
n(null,!1),v.on("click",".js_delete_shop",function(){
var e=$(this).closest("tr"),t=e.data("id");
if(t){
e.remove();
for(var s=0;s<w.length;s++)if(w[s].wx_poi_uid==t||w[s].id==t){
w.splice(s,1),x.splice(s,1),w.length%C==0&&w.length==s&&k>1&&k--;
break;
}
p();
}
return!1;
}),$("#js_add_shop,#js_add_shop1").click(function(){
return n(),!1;
}),$("#js_change_consume_type").click(function(){
var e=$("#js_adv_dispose_method").offset().top;
return window.scrollTo(0,e),!1;
}),function(){
h.on("dispose_method:change",function(e){
$(".js_shop_nosupport_wepay").hide(),r.current_dispose_method=e;
}),h.on("submit:sub_merchant_change",function(e){
r.sub_merchant_id=e;
}),t.data._is_global_editting&&h.trigger("dispose_method:change",t.data.dispose_method),
r.current_dispose_method=t.data.dispose_method;
}(),r.$container=$("#js_add_shop_top_container").on("click",".js_add_shop1,.js_add_consumer",function(){
var e=$(this).hasClass("js_add_consumer"),t="",s=$(this).data("info");
return e?(window.open(wx.url("/merchant/carduse?action=listchecker")),t="配置完核销员后，请点刷新按钮，并选择带核销员的门店"):"access_deny"==s?(window.open(wx.url("/merchant/newentityshop?action=apply")),
t="开通完门店后，请点刷新按钮，并选择门店"):"from_wxapoi"==s?(window.open(wx.url("/merchant/newentityshop?action=list")),
t="新建完门店后，请点刷新按钮，并选择门店"):(window.open(wx.url("/merchant/entityshop?action=list")),
t="新建完门店后，请点刷新按钮，并选择门店"),i.show({
title:"提示",
msg:t,
buttons:[{
text:"刷新",
click:function(){
g=!0,n(null,!1),this.hide();
},
type:"primary"
}],
type:"info"
}),!1;
}).on("click",".js_reselect_shop",function(){
_(r.$container);
}),r.opt=t;
}
function s(e){
return e.shop_select?($(".js_shop_nosupport_wepay").hide(),o(e)):void 0;
}
function o(e){
if(e.shop_select){
var t=$("#js_hidden_shop_type"),s=e.current_shop,o=t.val(),_=e.shop_select.getData(),n=s.length;
if(_){
var a=0,i=0;
1==o?(a=_.length,n=_):3==o?n=[]:(a=s.length,n=s);
for(var p=0;p<n.length;p++)n[p].card_pay_money&&i++;
$("#js_hidden_card_pay_store").val(i);
var h=e.current_dispose_method;
$(".js_notall_consumer").hide(),$(".js_dispose_method_2_notall_consumer").hide(),
$(".js_dispose_method_1_notall_consumer").hide(),$(".js_notall_consumer_count").text(a-i),
1==h?a>i&&($(".js_dispose_method_1_notall_consumer").show(),$(".js_notall_consumer").show()):2==h&&a>i&&($(".js_dispose_method_2_notall_consumer").show(),
$(".js_notall_consumer").show()),e._selected_wepay_count=i,e._selected_shop_count=a;
}
}
}
function _(e){
var t=e.offset();
window.scrollTo(0,t.top);
}
function n(e){
return e.replace(/<!--.*?-->/gm,"");
}
var a=e("common/wx/pagebar.js"),i=(e("biz_web/ui/checkbox.js"),e("common/wx/dialog.js")),p=e("common/qq/events.js"),h=p(!0),c=e("tpl/cardticket/create_card_shop_tips.html.js");
return c=template.compile(c),t.prototype.validate=function(){
if(!this._shopinit)return!1;
s(this);
var e=c({
dispose_method:this.current_dispose_method,
selected_shop_count:this._selected_shop_count,
selected_wepay_shop_count:this._selected_wepay_count,
wepay_shop_count:this._wepay_shop_count,
all_shop_count:this._all_shop_count,
is_from_wxapoi:(wx.cgiData._store_data||{}).is_from_wxapoi,
access_deny:(wx.cgiData._store_data||{}).access_deny
});
return $(".js_shop_nosupport_wepay").html(e).show(),e=$.trim(e),e=n(e),e?_(this.$container):this.opt.data.is_sns_card&&(0==this._all_shop_count?$(".js_shop_nosupport_wepay").html('<p class="fail">尚未新建门店，朋友的券必须添加门店，你可以：</p>	<p>1. 去门店管理，<a href="javascript:void(0);" class="js_add_shop1">新建门店</a></p>').show():0==this._selected_shop_count&&$(".js_shop_nosupport_wepay").html('<p class="fail">尚未选择门店，朋友的券必须添加门店，你可以：</p>	<p>1. 选择“全部门店适用”</p><p></p>2. 或选择“指定门店适用”并“添加适用门店”').show()),
!e;
},t;
});define("cardticket/add/nearby.js",["biz_web/ui/checkbox.js","common/wx/media/imageDialog.js"],function(e){
"use strict";
function t(){
{
var e=$("#js_poi_pic_url");
$("#js_nearby").checkbox({
onChanged:function(t){
var i=t.prop("checked");
$("#js_show_in_nearby").val(i?1:"0"),$("#js_near_tips").html(template.render("js_neartips_tpl",{
checked:i
})),i?e.show():e.hide();
}
});
}
$("#js_nearby").prop("checked")?e.show():e.hide(),$("#js_near_tips").html(template.render("js_neartips_tpl",{})),
$(".js_select_file").click(function(){
var e=$(this).attr("id");
return i({
maxSelect:1,
desc:"建议尺寸：640像素 * 340像素",
onOK:function(t){
var i=t[0].url;
$("#"+e+"_hidden").val(i.https2http()),$("#"+e+"_preview").html("<img style='width:200px;height:128px;' src='%s'>".sprintf(i)),
$("#js_preview_logo").html('<img src="%s" style="width:94px;height:60px;">'.sprintf(i)),
this.destroy();
},
onCancel:function(){
this.destroy();
}
}),!1;
});
}
var i=(e("biz_web/ui/checkbox.js"),e("common/wx/media/imageDialog.js"));
return t;
});define("cardticket/add/msg_operate.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","cardticket/parse_data.js","common/wx/Cgi.js","biz_web/ui/dateRange.js","biz_common/moment.js","common/wx/tooltips.js","cardticket/add/msg_operate_type_html.js","cardticket/select_shelf.js","cardticket/send_card.js","homepage/appmsgdialog.js","media/appmsg_temp_url.js","page/cardticket/section_card_notification.css"],function(t){
"use strict";
function e(t){
function e(t){
var e=$(t),i=parseInt(e.val());
i=isNaN(i)?void 0:i,n.content_type=i,$("#js_msg_operate_content .js_msg_operate_content_item").hide(),
$("#js_msg_operate_content .js_"+i+"_show").show(),0===i||void 0===i?$("#js_msg_operate_endtime_container").hide():$("#js_msg_operate_endtime_container").show(),
g[i]&&g[i]();
}
var n=this;
this.sectionmgr=t.sectionmgr,this.data=t.data,this.is_can_use_msg_notify=window.wx_is_can_use_msg_notify&&10==t.data.type,
this.$contenttype=$("#js_msg_operate_contenttype"),this.$content=$("#js_msg_operate_content");
var l=this.data&&this.data.msg_operation;
if(this.msg_operation=$.extend(!0,{},l),this.content_type=this.msg_operation._type,
!this.is_can_use_msg_notify)return $("#js_msg_operate_container").hide(),n;
$("#js_msg_operate_contenttype input").checkbox({
onChanged:function(t){
e(t);
}
});
var g={
1:function(){
var t=n.$content.find(".js_msg_operate_select_appmsg"),e=t.attr("init");
1!=e&&(t.click(function(){
return new m({
ids:[],
multi:!1,
maxNum:1,
link:1,
callback:function(t){
if(t.length>0){
for(var e in t[0])n.msg_operation["appmsg_"+e]=t[0][e];
n.msg_operation.url=(t[0].link||"").html(!1),n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])({
msg_operation:n.msg_operation
}));
}
}
}),!1;
}),t.attr("init",1));
},
5:function(){
var t=n.$content.find(".js_msg_operate_select_cardticket"),e=t.attr("init");
1!=e&&(t.click(function(){
var t=new p({
multi:!1,
data:null,
neednew:!0,
noexpire:!0,
param:{
status:"2|3|6",
is_filter_out_apicard:0,
flag:!1
},
selectComplete:function(t){
t.id;
n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])(t));
var e=n.$content.find(".js_logourl");
e.attr("src",e.attr("data-src")),n.msg_operation._card_cell=t;
}
});
return t.show(),!1;
}),t.attr("init",1));
},
2:function(){
var e=n.$content.find(".js_msg_operate_select_cardshelf"),i=e.attr("init");
1!=i&&(e.click(function(){
var e=new c({
shelf_type:1,
selectComplete:function(e){
n.msg_operation.url="http://mp.weixin.qq.com/bizmall/cardshelf?shelf_id=%s&showwxpaytitle=1&biz=%s&scene=1000007#wechat_redirect".sprintf(e,t.biz),
n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])({
msg_operation:n.msg_operation
}));
}
});
return e.show(),!1;
}),e.attr("init",1));
}
};
e($("#js_msg_operate_contenttype input:checked")),this.content_type&&(5==this.content_type?o.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(t.data.msg_operation.card_id),
error:function(){}
},function(t){
if(0==t.base_resp.ret){
var e=$.parseJSON(t.card_detail);
e=i.parse_cardticket(e),n.msg_operation._card_cell=e,n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])(e));
var o=n.$content.find(".js_logourl");
o.attr("src",o.attr("data-src"));
}
}):r[n.content_type]&&n.$content.find(".js_msg_operate_"+n.content_type+"_preview").html(template.compile(r[n.content_type])({
msg_operation:this.msg_operation
})));
var u="YYYY-MM-DD",h=this.msg_operation.endtime?a.unix(this.msg_operation.endtime).format(u):"",f=s({
container:"#js_msg_operate_endtime_select",
stopToday:!1,
isTodayValid:!0,
minValidDate:a().add("d",-1).unix(),
startDate:h,
isSingleDay:!0,
endDate:h,
defaultText:"-",
autoSubmit:!0,
theme:"ta",
success:function(t){
$("#"+f.inputId).html(t.startDate);
var e=a(t.startDate,u).add("d",1).unix()-1;
$("#js_msg_operate_endtime").val(e);
}
});
this.msg_operation.endtime?$("#"+f.inputId).html(h):($("#"+f.inputId).html("请选择时间"),
$("#"+f.nextMonth).click()),this.valid_time=f;
new _({
container:$("#js_msg_operate_tips"),
content:"卡券核销后，用户在卡包会收到消息通知",
reposition:!0,
type:"hover"
});
d(n.$content,".js_preview");
}
var n=(t("biz_web/ui/checkbox.js"),t("common/wx/Tips.js")),i=t("cardticket/parse_data.js"),o=t("common/wx/Cgi.js"),s=t("biz_web/ui/dateRange.js"),a=t("biz_common/moment.js"),n=t("common/wx/Tips.js"),_=t("common/wx/tooltips.js"),r=t("cardticket/add/msg_operate_type_html.js"),c=t("cardticket/select_shelf.js"),p=t("cardticket/send_card.js"),m=t("homepage/appmsgdialog.js"),d=t("media/appmsg_temp_url.js");
return t("page/cardticket/section_card_notification.css"),e.prototype={
getData:function(){
var t=this.content_type;
if(this.is_can_use_msg_notify&&"undefined"==typeof t)return n.err("请选择内容设置"),!1;
if(!this.is_can_use_msg_notify||0===t)return{
msg_operation_type:0,
msg_operation_url:"",
msg_operation_url_text:"",
msg_operation_card_id:"",
msg_operation_endtime:""
};
var e=this.msg_operation.url,i=/^http(s)?:\/\//;
4==t&&(e=this.$content.find(".js_msg_operate_link_url").val(),i.test(e)||(e="http://"+e));
var o={
msg_operation_type:5==t?2:e?1:0,
msg_operation_url:1==t||2==t||4==t?e:"",
msg_operation_card_id:5==t&&this.msg_operation._card_cell?this.msg_operation._card_cell.id:"",
msg_operation_url_text:1===t||2===t||4===t?$("#js_msg_operation_url_text").val():"",
msg_operation_endtime:$("#js_msg_operate_endtime").val()
};
return o.msg_operation_url||o.msg_operation_card_id?o.msg_operation_endtime?o.msg_operation_endtime<a().unix()?(n.err("通知有效期不能小于当前时间"),
!1):o:(n.err("请选择通知有效期"),!1):(n.err(1==t?"请选择图文消息":2==t?"请选择卡券货架":5==t?"请选择卡券":"网页链接不能为空"),
!1);
}
},e;
});define("cardticket/add/card_desc.js",["biz_web/utils/upload.js","common/wx/Tips.js","common/wx/media/imageDialog.js","cardticket/common_template_helper.js","cardticket/add/maxlength.js"],function(t){
"use strict";
function e(t){
$("#js_card_desc_fail").text(t).show();
}
function i(){
$("#js_card_desc_fail").hide();
}
function a(t){
function a(t){
t.each(function(){
var t=$(this),e=t.attr("id"),i=t.attr("inited");
i||(t.attr("inited",1),function(t){
r.uploadCdnFile({
container:"#"+t,
multi:!1,
type:2,
onComplete:function(e,i,a,r){
var n=r.content||"";
0==r.base_resp.ret&&($("#"+t+"_preview").html('<img src="%s">'.sprintf(n.http2https())),
$("#"+t+"_hidden").val(""+n.https2http()).closest(".js_card_input_item").find(".fail").remove(),
$("#js_cover_preview").html('<img src="%s">'.sprintf(n.http2https())).closest(".js_cover_preview_container").show(),
_.suc("上传成功"));
}
});
}(e));
});
}
function o(e){
e||(e={}),m.$article_editor_container.html(template.render("js_card_article_editor_tpl",e)),
c({
container:m.$article_editor_container.find(".js_maxlength")
}),$(".js_article_item input,.js_article_item textarea",t.articleDom).focus(),$(".js_add_img",t.articleDom).click(function(){
n({
maxSelect:1,
onOK:function(e){
if(e.length){
var i=e[0].url;
$(".js_img_hidden",t.articleDom).val(i.https2http()),m.$article_editor_container.find(".js_img_preview").attr("src",i.http2https()).show(),
m.$article_editor_container.find(".js_add_img_p").hide(),m.$article_editor_container.find(".card_article_img").addClass("js_img_added"),
this.destroy();
}
},
onCancel:function(){
this.destroy();
}
});
}),$(".js_add_img_p").click(function(){
return!1;
}),e.image_url?m.$article_editor_container.find(".js_img_preview").show():m.$article_editor_container.find(".js_img_preview").hide(),
m.$add_article_container.addClass("editting");
}
function l(t){
if(p){
m.text_image_items[u]=t;
var e=$(template.render("js_ca_preview_tpl",t));
f.replaceWith(e),f=null,p=!1,_.suc("编辑成功");
}else m.$preview_container.append(template.render("js_ca_preview_tpl",t)),m.text_image_items.push(t),
_.suc("添加成功");
}
function d(t,e){
var i=t.index(),a=e.index();
if(m.text_image_items[i]&&m.text_image_items[a]){
var r=m.text_image_items[i];
m.text_image_items[i]=m.text_image_items[a],m.text_image_items[a]=r;
}
p&&(i==u&&(u=a),a==u&&(u=i));
}
a($(t.uploadDom)),this.$add_article_container=$(".js_card_article_add",t.articleDom),
this.$article_editor_container=$(".js_card_article_editor",t.articleDom);
var m=this;
m.$article_editor_container.on("mouseover",".js_img_added",function(){
m.$article_editor_container.find(".js_image_mask").show(),m.$article_editor_container.find(".js_add_img_p").show();
}).on("mouseout",".js_img_added",function(){
m.$article_editor_container.find(".js_image_mask").hide(),m.$article_editor_container.find(".js_add_img_p").hide();
}),this.$add_article_container.on("click",function(){
return $(this).hasClass("editting")?!1:(o(),!1);
}),this.$preview_container=$(".js_card_article_preview",t.articleDom),this.$article_editor_container.on("click",".js_add_confirm",function(){
var t=$(this).closest(".js_article_item").find("textarea"),a=t.val(),r=$(this).closest(".js_article_item").find(".js_img_hidden"),_=r.val();
if(i(),!a||!_)return e("图片和描述都不能为空"),!1;
var n=t.attr("data-maxlength");
return a.len()>2*n?(e("最多输入"+n+"个字"),!1):(s.check_friend_card_word(a),l({
text:a,
image_url:_
}),t.val("").keyup(),r.val(""),m.$article_editor_container.find(".js_img_preview").attr("src","").hide(),
m.$article_editor_container.find(".js_image_mask").hide(),m.$add_article_container.removeClass("editting"),
m.$article_editor_container.html(""),!1);
}).on("click",".js_add_cancel",function(){
return m.$article_editor_container.html(""),h=null,p=!1,m.$add_article_container.removeClass("editting"),
!1;
}),this.text_image_items=t.data.text_image_list||[],this.$article_toolbar=$(".js_article_toolbar",t.articleDom);
var h=null,p=!1,u=-1,f=null;
this.$preview_container.on("mouseover",".js_ca_preview",function(){
m.$article_toolbar.show();
var t=$(this),e=t.position();
m.$article_toolbar.css({
top:e.top+t.height()/2-m.$article_toolbar.height()/2,
left:e.left+t.width()/2-m.$article_toolbar.width()/2,
zIndex:1
}),h=t;
}),this.$preview_container.parent().on("mouseout",function(t){
var e=t.relatedTarget;
$(e).hasClass("js_article_toolbar")||$(e).closest(".js_article_toolbar").length||m.$article_toolbar.hide();
}).on("click","a",function(){
var t=$(this);
if(h){
if(t.hasClass("js_delete")){
var e=h.index();
e>=0&&m.text_image_items.splice(e,1),h.remove(),h=null,e==u&&m.$article_editor_container.find(".js_add_cancel").click();
}else if(t.hasClass("js_edit")){
p=!0;
var e=h.index();
e>=0&&(u=e,f=h,o(m.text_image_items[e]));
}else if(t.hasClass("js_moveup")){
var i=h.prev();
h.insertBefore(i),d(h,i);
}else if(t.hasClass("js_movedown")){
var a=h.next();
h.insertAfter(a),d(h,a);
}
m.$article_toolbar.hide();
}
}),this.opt=t;
}
var r=t("biz_web/utils/upload.js"),_=t("common/wx/Tips.js"),n=t("common/wx/media/imageDialog.js"),s=t("cardticket/common_template_helper.js"),c=t("cardticket/add/maxlength.js");
return a.prototype.val=function(){
for(var t={
text_image_item_count:this.text_image_items.length
},i=0,a=0;a<this.text_image_items.length;a++){
var r=this.text_image_items[a];
r.image_url&&(t["text_image_item_"+a+"_image_url"]=r.image_url),r.text&&(t["text_image_item_"+a+"_text"]=r.text),
i+=r.text?r.text.len():0;
}
if(i>1e4)return e("图文介绍最多输入5000个字"),!1;
var _=this.opt;
return _.is_sns_card&&!i?(e("请填写图文介绍"),!1):t;
},a;
});define("cardticket/add/dispose_method.js",["common/qq/events.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/dialog.js","biz_web/ui/dropdown.js","cardticket/tools/tools_cgi.js","cardticket/tools_add_dispel_code.js"],function(e){
"use strict";
function t(e){
var t=[];
return e.each(function(){
$(this).prop("checked")&&t.push($(this).val());
}),t;
}
function i(t){
function i(e){
var t=e.values()[0];
$("#js_hidden_code_type").val(t);
}
function _(e){
$("#js_hidden_swipe_card").val(0),$("#js_hidden_card_pay_money").val(0),2==e?($(".js_use_card_button").text("立即使用"),
$("#js_hidden_code_type").val(1e4),$("#js_hidden_dispose_method").val(1)):($("#js_hidden_dispose_method").val(0),
1==e?($("#js_hidden_card_pay_money").val(1),$("#js_hidden_code_type").val(2),$(".js_use_card_button").text("快速买单"),
$("#js_wepay_item").show(),window.report_click&&window.report_click(9030)):4==e?($(".js_use_card_button").text("刷卡买单"),
$("#js_wepay_item").show(),$("#js_hidden_code_type").val(1e4),$("#js_hidden_swipe_card").val(1)):(i(x),
$("#js_hidden_card_pay_money").val(0),$(".js_use_card_button").text("使用"),$("#js_wepay_item").hide())),
e||$(".js_dispose_method_tips",g).hide(),e&&e!=j.dispose_method&&($(".js_dispose_method_tips",g).hide(),
$(".js_dispose_method_tips_"+e,g).show(),$(".js_dispose_method_sub",g).hide(),$(".js_dispose_method_sub_"+e,g).show(),
n.trigger("dispose_method:change",e)),j.dispose_method=e;
}
function c(){
g.find(".js_self_consume_need_security_code_show").html(p(t.data));
}
function o(e){
var t=$(template.compile(F)({
mch_list:[{
checked:!0,
code:e
}]
}));
g.find(".js_mch_code_list").append(t),t.find("input[type=checkbox]").checkbox(),
O.push({
name:e,
value:e
}),$(".js_create_card_mch_list").html(""),T&&T.destroy(),T=new h({
container:g.find(".js_create_card_mch_list"),
data:O,
callback:function(e){
g.find(".js_create_card_mch_list_hidden").val(e),j.create_mid=e;
}
}),T.selected(j.create_mid||0);
}
function a(){
L.show(),I.hide(),U.hide(),N.hide();
}
function u(){
L.hide(),I.show(),U.show(),N.hide();
}
function f(){
L.hide(),I.hide(),U.hide(),N.show();
}
function v(e){
e?(P.hide(),B.show(),E.val("").focus(),H.hide(),u()):(P.show(),B.hide());
}
var b=t.data,j=(b._can_use_self_consume,!!t.data.sub_merchant_id,b._is_create,this),g=$("#js_adv_dispose_method"),y=(g.find(".js_consume_type_container_1"),
$("#js_adv_dispose_method .js_consume_type")),w=y.checkbox({
onChanged:function(e){
var t=e.val();
1==t&&(window.wx_is_paycard||j.showOpenPaycard()),_(t);
}
}),k=g.find(".js_consume_type_4").checkbox(),x=$(".js_dispose_method_sub_3 input",g).checkbox({
onChanged:function(){
i(x);
}
});
_(b.dispose_method),n.on("use_condition:use_condition_least_cost_checked_changed",function(e){
k.disabled(!$("#js_use_condition_least_cost_checkbox").is(":checked")||2==$(".js_validtime:checked").val()),
$(".js_dispose_method_tips_5").toggle(!e);
}),n.on("validtime:valid_time_changed",function(e){
k.disabled(!$("#js_use_condition_least_cost_checkbox").is(":checked")||2==$(".js_validtime:checked").val()),
$(".js_dispose_method_tips_6").toggle(2==e);
});
var q=g.find(".js_self_consume_need_security_code"),C=q.checkbox({
onChanged:function(e){
$(e).prop("checked")?(g.find(".js_self_consume_need_security_code_hidden").val(1),
g.find(".js_self_consume_need_security_code_show").show()):(g.find(".js_self_consume_need_security_code_hidden").val(0),
g.find(".js_self_consume_need_security_code_show").hide());
}
});
b.is_sns_card&&C.disabled(!0);
var M=g.find(".js_self_consume_need_fee_comment"),z=(M.checkbox({
onChanged:function(e){
$(e).prop("checked")?g.find(".js_self_consume_need_fee_comment_show").show():g.find(".js_self_consume_need_fee_comment_show").hide();
}
}),e("cardticket/tools_add_dispel_code.js"));
g.on("click",".js_add_disple_code",function(){
return new z({
success:function(e){
t.data.consume_validate_code.push({
code:e
}),c();
}
}),!1;
}),t.data._can_use_self_consume&&c(),g.on("click",".js_dispel_code_mgr",function(){
r.show({
title:"提示",
msg:"验证码更新后，请点刷新按钮",
buttons:[{
text:"刷新",
click:function(){
var e=this;
d.get({
url:"/merchant/cardsecuritycodemgr?action=list",
complete:function(){
e.hide();
},
success:function(e){
if(0==e.base_resp.ret){
var i=e.list_resp.security_code_list,s=[];
"string"==typeof i&&(i=[i]);
for(var _=0;_<i.length;_++)s.push({
code:i[_]
});
t.data.consume_validate_code=s,c();
}
}
});
},
type:"primary"
}],
type:"info"
});
}).on("click",".js_open_wxpay",function(){
r.show({
title:"提示",
msg:"开通功能后，请刷新页面",
buttons:[{
text:"刷新",
click:function(){
var e=this;
d.get({
url:"/merchant/electroniccardmgr?action=addsnspage&type=4",
complete:function(){
e.hide();
},
success:function(e){
e.card_access_info&&1==e.card_access_info.is_wxpay_open&&(g.find(".js_consume_type_container_4,.js_consume_type_container_1").show(),
g.find(".js_consume_type_container_5").hide());
}
});
},
type:"primary"
}],
type:"info"
});
});
var F='{each mch_list as item}<label class="frm_checkbox_label widget-textList__item">                                    <i class="icon_checkbox"></i>                                    <span class="lbl_content">{item.code}</span>                                    <input type="checkbox" {if item.checked}checked {/if}value="{item.code}" class="frm_checkbox">                                </label>{/each}';
if(t.data._can_use_swipe_card){
var T,D=[],O=[];
d.get({
url:"/merchant/cardmerchantprofile?action=get_mch_code_list",
data:{
only_need_normal_mch:1,
ver:1
}
},function(e){
var t=e.mch_list;
if(m=t,0!=e.base_resp.ret||0==t.length)return void $(".js_consume_type_container_4",g).remove();
1==t.length?(g.find(".sub_control_group.js_dispose_method_tips_4").hide().removeClass("js_dispose_method_tips_4"),
g.find(".js_dispose_method_tips_4.frm_tips").text("“刷卡买单”需配合机具使用实现微信支付。消费者结账时点击“快速买单”进入付款页面，商户扫描后即可完成支付并使用优惠。提交卡券审核通过后，请添加库存，并用“%s”账号登录支付后台，审核并激活代金券。".sprintf(t[0].mch_code_list))):g.find(".js_dispose_method_tips_4.frm_tips").text("“刷卡买单”需配合机具使用实现微信支付。消费者结账时点击“快速买单”进入付款页面，商户扫描后即可完成支付并使用优惠。请选择制券商户号及适用商户号，提交卡券审核通过后，添加库存，并分别用制券号和适用号登录支付平台完成券的审核和激活。");
for(var i=[],s=0;s<t.length;s++){
var _=!1;
if(D.push(t[s].mch_code_list),b.pay_info&&b.pay_info.use_mid_list)for(var c=0;c<b.pay_info.use_mid_list.length;c++)if(t[s].mch_code_list==b.pay_info.use_mid_list[c]){
_=!0;
break;
}
b._is_global_editting||(_=!0),i.push({
checked:_,
code:t[s].mch_code_list
});
}
var o=g.find(".js_mch_code_list").html(template.compile(F)({
mch_list:i,
pay_info:b.pay_info
})),n=o.find("input[type=checkbox]");
n.checkbox({
onChanged:function(){}
});
for(var d=[],s=0;s<t.length;s++)d.push({
name:t[s].mch_code_list,
value:t[s].mch_code_list
});
T=new h({
container:g.find(".js_create_card_mch_list"),
data:d,
callback:function(e){
g.find(".js_create_card_mch_list_hidden").val(e),j.create_mid=e;
}
}),O=d,T.selected(b.pay_info&&b.pay_info.create_mid||0),b._is_global_editting&&4==b.dispose_method&&(n.checkbox().disabled(!0),
T.disable(),$(".js_mchid_bind_wrap",g).hide(),$(".js_mchid_bind",g).hide()),i.length>1&&$("#is_multi_code_hidden").val(1);
});
var B=$(".js_mchid_bind_wrap",g),E=$(".js_mchid_bind_input",g),P=$(".js_mchid_bind",g),I=$(".js_mchid_bind_add",g),U=$(".js_mchid_bind_cancel",g),H=$(".js_mchid_bind_err",g),L=$(".js_mchid_bind_loading",g),N=$(".js_mchid_bind_success",g);
P.click(function(){
v(!0);
}),U.click(function(){
v(!1);
}),I.click(function(){
var e=E.val();
return 0===e.length?void H.text("请输入商户号").show():-1!==D.indexOf(e)?void H.text("请勿添加重复商户号").show():/^\d+$/.test(e)?(a(),
void l.addMchid({
mchid:e,
success:function(){
f(),setTimeout(function(){
N.fadeOut(300,function(){
o(e),v(!1);
});
},700);
},
error:function(){
u();
}
})):void H.text("请输入正确格式").show();
}),E.on("input",function(){
H.hide();
});
}
this.$container=g,b._is_global_editting&&(4==b.dispose_method?(w.disabled(!0),k.disabled(!1)):k.disabled(!0)),
s(g);
}
function s(e){
e.find(".js_dispose_method_tips_1").html(window.wx_is_paycard?"“自助买单”无需开发即可接入微信支付，消费者结账时点击“快速买单”输入金额，即可确认完成支付并使用优惠。当前收款商户号为“%s”，".sprintf(window.card_pay_mch_id)+'登录<a href="https://pay.weixin.qq.com" target="_blank">支付平台</a>可查询收入明细，详情参照<a href="/cgi-bin/announce?action=getannouncement&key=1461861451&version=1&lang=zh_CN&platform=2" target="_blank">指引</a>':"“自助买单”无需开发即可接入微信支付，消费者结账时点击“快速买单”输入金额，即可确认完成支付并使用优惠。");
}
function _(e){
var t=e.offset();
window.scrollTo(0,t.top);
}
function c(e,t){
for(var i=0;i<e.length;i++)if(2==e[i].state&&t==e[i].mch_code_list)return!0;
return!1;
}
var o=e("common/qq/events.js"),n=o(!0),d=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js"),r=e("common/wx/dialog.js"),h=e("biz_web/ui/dropdown.js"),l=e("cardticket/tools/tools_cgi.js"),p=template.compile('{if consume_validate_code && consume_validate_code.length}                    <p class="frm_tips">消费者持券到店，须输入验证码                         {each consume_validate_code as code i}                        {if i < 3}                        『<span class="dispel_code">{code.code}</span> 』                        {/if}                        {/each}                        {if consume_validate_code.length> 3}『…』{/if}才能核销卡券，保证核销准确。验证码由商户设置，点击 <a target="_blank" class="js_dispel_code_mgr" href="{addtoken \'/merchant/cardsecuritycodemgr?action=list\'}">管理验证码</a>                    </p>                    {else}                    <p class="frm_tips">消费者持券到店，须输入验证码才能核销卡券。你还没设置验证码，点击<a target="_blank" class="js_dispel_code_mgr" href="{addtoken \'/merchant/cardsecuritycodemgr?action=list\'}">管理验证码</a></p>                    </p>{/if}                    {if !consume_validate_code || !consume_validate_code.length}                    <a href="javascript:void(0);" class="btn btn_default js_add_disple_code">添加验证码</a>                    {/if}'),m=[];
i.prototype.val=function(){
var e=this.$container,i=e.find(".js_mch_code_list"),s=i.find("input[type=checkbox]"),o=t(s),n=1==wx.cgiData.data.create_source&&wx.cgiData.data.type==wx.cgiData.data.MEMBER_TYPE;
if(4==this.dispose_method&&!o.length&&!n)return a.err("请选择商户号"),_(this.$container),
!1;
if(4==this.dispose_method&&!$("#js_use_condition_least_cost_checkbox").prop("checked")&&!n)return a.err("必须选择最低消费才能使用刷卡支付方式"),
_(this.$container),!1;
if(4==this.dispose_method&&2==$(".js_validtime:checked").val()&&!n)return a.err("仅支持固定日期有效期类型"),
_(this.$container),!1;
if(4==this.dispose_method&&!n){
var d=$(".js_create_card_mch_list_hidden").val();
if(c(m,d))return r.show({
msg:"使用本功能需将商户号%s升级，详情<a href='http://kf.qq.com/faq/140225MveaUz150123BbIFvM.html' target='_blank'>咨询客服</a>".sprintf(d),
buttons:[{
text:"确定",
click:function(e){
this.remove(e);
}
}]
}),!1;
for(var h=[],l=0;l<o.length;l++)c(m,o[l])&&h.push(o[l]);
if(h.length)return r.show({
msg:"使用本功能需将商户号%s升级，详情<a href='http://kf.qq.com/faq/140225MveaUz150123BbIFvM.html' target='_blank'>咨询客服</a>".sprintf(h.join("、")),
buttons:[{
text:"确定",
click:function(e){
this.remove(e);
}
}]
}),!1;
}
for(var p={
use_mid_count:o.length
},l=0;l<o.length;l++)p["use_mid_"+l]=o[l];
return p;
};
var u="<div class='tl'>            <p>&nbsp;</p>            <p>使用自助买单功能，无需开发即可接入微信支付。消费者结账时点击“快速买单”输入金额，即可确认完成支付并使用优惠。所收款项将打入以下账号：</p>                <div><p>&nbsp;</p><span class='js_select_appoint_mch_code'>                </span> &nbsp; &nbsp;<a href='https://pay.weixin.qq.com' target='_blank'>查看帐号</a></div>                <p>&nbsp;</p>                <label class='frm_checkbox_label'>                 <i class='icon_checkbox'></i>                 <input type='checkbox' class='frm_checkbox' id='js_agree_paycard'>我同意并遵守<a href=\""+wx.url("/cgi-bin/frame?t=cardticket/faq_apply_card_pay_frame&amp;type=info")+"\" target='_blank'>《微信公众平台卡券买单功能服务协议》</a></label></div>";
return i.prototype.showOpenPaycard=function(){
var e=!1,t="",i=this,_=$(u).popup({
title:"提示",
autoShow:!0,
buttons:[{
type:"primary",
text:"确定",
click:function(){
if(!e&&$("#js_agree_paycard").prop("checked")){
if(!t)return void a.err("请选择商户号");
if(c(m,t))return void a.err("使用本功能需升级微信支付商户号，详情咨询客服");
e=!0;
var _=this;
d.post({
url:"/merchant/cardmerchantprofile?action=setcardpaymoney",
data:{
appoint_v3_mch_id:t
}
},function(e){
return 14013==e.base_resp.ret?(_.remove(),void r.show({
type:"info",
msg:"你的支付商户号目前为旧商户号，需要升级新权限才可开通买单，"+"<a href='%s' target=\"_blank\">现在去升级</a>".sprintf(wx.url("/cgi-bin/frame?nav=10010&t=business/index_frame&iframe=%2Fpaymch%2Fbusiness%3Faction%3Dfirstentry")),
buttons:[{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
})):213002==e.base_resp.ret||213003==e.base_resp.ret?(_.remove(),void r.show({
type:"info",
msg:213002==e.base_resp.ret?"微信支付服务商户号不支持开通自助买单|请更改其它核销方式":"当前微信支付商户号不支持开通自助买单|请更改其它核销方式",
buttons:[{
text:"取消",
click:function(){
this.remove();
},
type:"normal"
}]
})):0!=e.base_resp.ret?void d.show(e):(a.suc("开通成功"),window.wx_is_paycard=!0,window.card_pay_mch_id=t,
s(i.$container),void _.remove());
});
}
}
}],
onHide:function(){
this.remove();
}
});
$("#js_agree_paycard").checkbox(),d.get({
url:"/merchant/cardmerchantprofile?action=get_mch_code_list",
data:{
ver:1
}
},function(e){
if(0==e.base_resp.ret){
var i=[],s=e.mch_list;
m=s;
for(var c=0;c<s.length;c++)i.push({
name:s[c].mch_code_list,
value:s[c].mch_code_list
});
new h({
container:_.popup("get").find(".js_select_appoint_mch_code"),
data:i,
callback:function(e){
t=e;
}
}).selected(0);
}else d.show(e);
});
},i;
});define("cardticket/add/use_condition.js",["biz_web/ui/checkbox.js","cardticket/common_template_helper.js","common/wx/Tips.js","biz_web/ui/dropdown.js","common/qq/events.js","common/wx/tooltips.js"],function(t){
"use strict";
function e(t){
function e(t){
var e=$(t).closest(".js_use_condition_check_label");
$(t).prop("checked")?(e.find(".js_use_condition_append").show(),e.find(".js_use_condition_append_unchecked").hide()):(e.find(".js_use_condition_append").hide(),
e.find(".js_use_condition_append_unchecked").show(),e.find("input[type=text]").val(""));
var s=.2;
p.each(function(){
$(this).attr("name");
"js_use_condition_least_cost_checkbox"==this.id&&a.trigger("use_condition:use_condition_least_cost_checked_changed",$(this).prop("checked")),
$(this).prop("checked")&&("js_use_condition_least_cost_checkbox"==this.id?s=.4:"js_use_condition_category_checkbox"==this.id&&(s=.4));
}),$(".js_card_price").text(s);
}
function s(t){
$("#js_use_condition_least_cost_type_hidden").val(t),1==t?(u.find(".js_use_condition_least_cost").show(),
u.find(".js_object_use_for").hide().find("input[type=text]").val("")):(u.find(".js_use_condition_least_cost").hide().find("input[type=text]").val(""),
u.find(".js_object_use_for").show());
}
function _(t){
return/^[0-9\.]+$/.test(t);
}
function c(t){
return 3==t.type?t.title?t.use_condition_least_cost?"满%s送%s".sprintf(t.use_condition_least_cost,t.title):t.object_use_for?"买%s送%s".sprintf(t.object_use_for,t.title):t.title+(t.gift_num?t.gift_num:"")+(t.gift_unit?t.gift_unit:""):"":4==t.type||2==t.type?t.reduce_cost?t.use_condition_least_cost&&_(t.use_condition_least_cost)?t.accept_category||t.reject_category?t.accept_category?t.accept_category.length>5?"满%s减%s".sprintf(t.use_condition_least_cost,t.reduce_cost):"%s满%s减%s".sprintf(t.accept_category,t.use_condition_least_cost,t.reduce_cost):"满%s减%s".sprintf(t.use_condition_least_cost,t.reduce_cost):"全场满%s减%s".sprintf(t.use_condition_least_cost,t.reduce_cost):(t.accept_category||t.reject_category)&&t.accept_category?t.accept_category.length>5?"%s元代金券".sprintf(t.reduce_cost):"%s减%s元".sprintf(t.accept_category,t.reduce_cost):"%s元代金券".sprintf(t.reduce_cost):"":void 0;
}
function d(e){
if(4==t.data.type&&t.data.is_sns_card&&"0"==t.data.has_condition&&"0"!=e.uncheckcount)return"（本行是非自定义内容，无需填写）";
var s="";
if(2==e.type&&e.discount&&(s&&(s+="；"),s="凭此券消费打%s折".sprintf(e.discount)),3==e.type||2==e.type||4==e.type){
var _=i.fix_abstract4friendcard(e);
_&&(s&&(s+="；"),s+=_);
}
return 1==e.can_use_with_other_discount?(s&&(s+="；"),s+="可与其他优惠共享",(2==e.type||4==e.type)&&(1==e.can_use_with_membercard?(s&&(s+="；"),
s+="可与会员卡优惠共用"):"0"==e.can_use_with_membercard&&(s&&(s+="；"),s+="不可与会员卡优惠共用"))):"0"==e.can_use_with_other_discount&&(s&&(s+="；"),
s+="不可与其他优惠共享"),s||(s="（本行是非自定义内容，无需填写）"),s;
}
var r=t.data;
this.opt=t;
var u=$(t.container),p=u.find("input[type=checkbox]");
setTimeout(function(){
a.trigger("use_condition:use_condition_least_cost_checked_changed",$("#js_use_condition_least_cost_checkbox").is(":checked"));
},0);
var h=p.checkbox({
onChanged:function(t){
e(t);
}
});
if(p.filter("input:checked").each(function(){
e(this);
}),3==r.type){
var l=new n({
container:u.find(".js_use_condition_least_cost_type"),
data:[{
name:"金额",
value:1
},{
name:"指定商品",
value:2
}],
label:2==r.use_condition_least_cost_type?"指定商品":"金额",
callback:function(t){
s(t);
}
});
s(r.use_condition_least_cost_type),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&l.disable();
}
if(this.$conditions=p,this.$container=u,setInterval(function(){
var e=$("#js_editform_step1").serializeObject();
e.type=t.data.type;
var s=i.fix_abstract4friendcard(e,!1);
$("#js_use_condition_preview").text(s),s?$("#js_use_condition_preview_p").show():$("#js_use_condition_preview_p").hide(),
$("#js_title_preview_new").text(c(e));
var _=$.trim($("#js_get_limit").val());
$("#js_description_add_msg").text(_&&/^\d+$/.test(_)?"每人限领%s张".sprintf(_):""),$("#js_detail_msg").html(d(e));
},500),$("#js_use_condition_accept_category_input,#js_use_condition_reject_category_input").keyup(function(){
$(this).valid()&&$(this).closest(".js_use_condition_fix_product").find(".fail").hide();
}),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&h.disabled(!0),
$(".js_can_use_with_other_drop").length){
var f=new n({
container:$(".js_can_use_with_other_drop"),
data:[{
name:"请选择",
value:""
},{
name:"不与其它优惠共享",
value:0
},{
name:"可与其它优惠共享",
value:1
}],
callback:function(t){
1==t?$(".js_can_use_with_member_container").show():($(".js_can_use_with_member_container").hide(),
$("#js_can_use_with_membercard_hidden").val("")),$("#js_can_use_with_other_discount_hidden").val(t),
console.log(arguments);
}
});
t.data.id&&f.selected(t.data.can_use_with_other_discount?"1":"0"),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&f.disable(!0);
}
if(t.data.can_use_with_other_discount&&$(".js_can_use_with_member_container").show(),
$(".js_can_use_with_member_drop").length){
var m=new n({
container:$(".js_can_use_with_member_drop"),
data:[{
name:"请选择",
value:""
},{
name:"与会员卡优惠共用",
value:1
},{
name:"不与会员卡优惠共用",
value:0
}],
callback:function(t){
$("#js_can_use_with_membercard_hidden").val(t),console.log(arguments);
}
});
t.data.id&&m.selected(t.data.can_use_with_membercard?"1":"0"),t.data._is_global_editting&&2!=t.data.status&&1!=t.data.status&&8!=t.data.status&&m.disable(!0),
new o({
container:$(".js_can_use_with_member_question"),
reposition:!0,
content:"“与会员卡优惠共用”代表该券在买单时可以叠加会员卡折扣，积分抵扣共同使用<br><br>“不与会员卡优惠共用”则代表该券在买单时不可叠加会员卡折扣，积分抵扣，但积分赠送依旧享受<br><br>“不可与其他优惠共享”则也包含“不与会员卡优惠共用”",
type:"hover"
});
}
}
function s(t){
var e=t.offset();
e&&window.scrollTo(0,e.top);
}
var i=(t("biz_web/ui/checkbox.js"),t("cardticket/common_template_helper.js")),_=t("common/wx/Tips.js"),n=t("biz_web/ui/dropdown.js"),c=t("common/qq/events.js"),o=t("common/wx/tooltips.js"),a=c(!0);
return e.prototype.isValid=function(){
if(4==this.opt.data.type&&this.opt.data.has_condition){
var t=0;
if(this.$conditions.each(function(){
$(this).prop("checked")&&t++;
}),0==t)return _.err("请选择使用条件"),s(this.$container),!1;
}
return!0;
},e;
});