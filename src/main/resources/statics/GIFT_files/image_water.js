define("tpl/cardticket/select_sub_merchant.html.js",[],function(){
return'<div>\n	<div class="wrp_processor js_step_container"></div>\n	<div class="first_step js_step_content js_step1">\n	    <!--选择投放方式弹窗-->\n		<div class="js_sub_merchant_list select_subshop"></div>\n		<!--选择投放方式弹窗 end-->\n	</div>\n	<div class="second_step js_step_content js_step2">\n	</div>\n</div>';
});!function(n){
"use strict";
function t(n,t){
var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);
return u<<16|65535&r;
}
function r(n,t){
return n<<t|n>>>32-t;
}
function u(n,u,e,o,c,f){
return t(r(t(t(u,n),t(o,f)),c),e);
}
function e(n,t,r,e,o,c,f){
return u(t&r|~t&e,n,t,o,c,f);
}
function o(n,t,r,e,o,c,f){
return u(t&e|r&~e,n,t,o,c,f);
}
function c(n,t,r,e,o,c,f){
return u(t^r^e,n,t,o,c,f);
}
function f(n,t,r,e,o,c,f){
return u(r^(t|~e),n,t,o,c,f);
}
function i(n,r){
n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;
var u,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;
for(u=0;u<n.length;u+=16)i=l,h=d,a=v,g=C,l=e(l,d,v,C,n[u],7,-680876936),C=e(C,l,d,v,n[u+1],12,-389564586),
v=e(v,C,l,d,n[u+2],17,606105819),d=e(d,v,C,l,n[u+3],22,-1044525330),l=e(l,d,v,C,n[u+4],7,-176418897),
C=e(C,l,d,v,n[u+5],12,1200080426),v=e(v,C,l,d,n[u+6],17,-1473231341),d=e(d,v,C,l,n[u+7],22,-45705983),
l=e(l,d,v,C,n[u+8],7,1770035416),C=e(C,l,d,v,n[u+9],12,-1958414417),v=e(v,C,l,d,n[u+10],17,-42063),
d=e(d,v,C,l,n[u+11],22,-1990404162),l=e(l,d,v,C,n[u+12],7,1804603682),C=e(C,l,d,v,n[u+13],12,-40341101),
v=e(v,C,l,d,n[u+14],17,-1502002290),d=e(d,v,C,l,n[u+15],22,1236535329),l=o(l,d,v,C,n[u+1],5,-165796510),
C=o(C,l,d,v,n[u+6],9,-1069501632),v=o(v,C,l,d,n[u+11],14,643717713),d=o(d,v,C,l,n[u],20,-373897302),
l=o(l,d,v,C,n[u+5],5,-701558691),C=o(C,l,d,v,n[u+10],9,38016083),v=o(v,C,l,d,n[u+15],14,-660478335),
d=o(d,v,C,l,n[u+4],20,-405537848),l=o(l,d,v,C,n[u+9],5,568446438),C=o(C,l,d,v,n[u+14],9,-1019803690),
v=o(v,C,l,d,n[u+3],14,-187363961),d=o(d,v,C,l,n[u+8],20,1163531501),l=o(l,d,v,C,n[u+13],5,-1444681467),
C=o(C,l,d,v,n[u+2],9,-51403784),v=o(v,C,l,d,n[u+7],14,1735328473),d=o(d,v,C,l,n[u+12],20,-1926607734),
l=c(l,d,v,C,n[u+5],4,-378558),C=c(C,l,d,v,n[u+8],11,-2022574463),v=c(v,C,l,d,n[u+11],16,1839030562),
d=c(d,v,C,l,n[u+14],23,-35309556),l=c(l,d,v,C,n[u+1],4,-1530992060),C=c(C,l,d,v,n[u+4],11,1272893353),
v=c(v,C,l,d,n[u+7],16,-155497632),d=c(d,v,C,l,n[u+10],23,-1094730640),l=c(l,d,v,C,n[u+13],4,681279174),
C=c(C,l,d,v,n[u],11,-358537222),v=c(v,C,l,d,n[u+3],16,-722521979),d=c(d,v,C,l,n[u+6],23,76029189),
l=c(l,d,v,C,n[u+9],4,-640364487),C=c(C,l,d,v,n[u+12],11,-421815835),v=c(v,C,l,d,n[u+15],16,530742520),
d=c(d,v,C,l,n[u+2],23,-995338651),l=f(l,d,v,C,n[u],6,-198630844),C=f(C,l,d,v,n[u+7],10,1126891415),
v=f(v,C,l,d,n[u+14],15,-1416354905),d=f(d,v,C,l,n[u+5],21,-57434055),l=f(l,d,v,C,n[u+12],6,1700485571),
C=f(C,l,d,v,n[u+3],10,-1894986606),v=f(v,C,l,d,n[u+10],15,-1051523),d=f(d,v,C,l,n[u+1],21,-2054922799),
l=f(l,d,v,C,n[u+8],6,1873313359),C=f(C,l,d,v,n[u+15],10,-30611744),v=f(v,C,l,d,n[u+6],15,-1560198380),
d=f(d,v,C,l,n[u+13],21,1309151649),l=f(l,d,v,C,n[u+4],6,-145523070),C=f(C,l,d,v,n[u+11],10,-1120210379),
v=f(v,C,l,d,n[u+2],15,718787259),d=f(d,v,C,l,n[u+9],21,-343485551),l=t(l,i),d=t(d,h),
v=t(v,a),C=t(C,g);
return[l,d,v,C];
}
function h(n){
var t,r="";
for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);
return r;
}
function a(n){
var t,r=[];
for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;
for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;
return r;
}
function g(n){
return h(i(a(n),8*n.length));
}
function l(n,t){
var r,u,e=a(n),o=[],c=[];
for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],
c[r]=1549556828^e[r];
return u=i(o.concat(a(t)),512+8*t.length),h(i(c.concat(u),640));
}
function d(n){
var t,r,u="0123456789abcdef",e="";
for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);
return e;
}
function v(n){
return unescape(encodeURIComponent(n));
}
function C(n){
return g(v(n));
}
function s(n){
return d(C(n));
}
function A(n,t){
return l(v(n),v(t));
}
function m(n,t){
return d(A(n,t));
}
n.md5=function(n,t,r){
return t?r?A(t,n):m(t,n):r?C(n):s(n);
};
}("function"==typeof jQuery?jQuery:this);define("tpl/preview.html.js",[],function(){
return'<div class="mask preview_mask"></div>\n<div class="img_preview_container" id="preview_container">\n    <div class="img_preview_inner" id="img_container">\n        <img src="/mpres/htmledition/images/icon/common/icon32_loading_dark.gif" id="loading_dom">\n        <span class="img_preview_wrp" style="display:none;" id="img_dom">\n            <img src="{imgsrc}">\n            <!--#0001#-->\n            <a href="javascript:;" class="img_preview_close" id="closebtn" title="关闭"><i class="icon_img_preview_close">关闭</i></a>\n            <!--%0001%-->\n        </span>\n        <span class="vm_box"></span>\n    </div>\n    <span class="vm_box"></span>\n    {if !prev}\n    <div class="img_preview_opr_container prev_disabled" id="img_opr_container">\n    {else if !next}\n    <div class="img_preview_opr_container next_disabled" id="img_opr_container">\n    {else}\n    <div class="img_preview_opr_container" id="img_opr_container">\n    {/if}\n        <ul class="img_preview_opr_list">\n            <li class="img_preview_opr_item"><a href="javascript:;" id="btnview" title="查看原图"><i class="icon_img_preview origin">查看原图</i>&nbsp;</a></li>\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnprev" title="查看上一个"><i class="icon_img_preview prev">上一个</i>&nbsp;</a></li>{/if}\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnnext" title="查看下一个"><i class="icon_img_preview next">下一个</i>&nbsp;</a></li>{/if}\n            {if downsrc}<li class="img_preview_opr_item"><a href="{downsrc}" id="btndown" title="下载图片"><i class="icon_img_preview download">下载图片</i>&nbsp;</a></li>{/if}\n        </ul>\n    </div>\n</div>\n';
});define("cardticket/select_shop.js",["biz_web/ui/checkbox.js","page/cardticket/dialog_select_shop.css","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","common/wx/tooltips.js","tpl/cardticket/select_shop.html.js","cardticket/store_cgi.js","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t){
this.opt=$.extend(!0,{},i,t),this.$dom=$(this.opt.container),this.init();
}
var i={
multi:!1,
container:null,
data:null,
initComplete:$.noop,
pageCapacity:10,
pageChange:$.noop,
selectedValues:[],
selectAll:$.noop,
nostore:!0,
notpoint:!1,
readonly:!1,
readonlyValues:[]
};
t("biz_web/ui/checkbox.js"),t("page/cardticket/dialog_select_shop.css");
var s=t("common/wx/Cgi.js"),a=(t("biz_web/ui/checkbox.js"),t("common/wx/pagebar.js")),o=t("common/wx/Tips.js"),n=t("common/wx/tooltips.js"),c=t("tpl/cardticket/select_shop.html.js"),l=t("cardticket/store_cgi.js");
return t("cardticket/common_template_helper.js"),e.prototype={
_currentPage:1,
init:function(){
var t=this,e=t.opt;
if(e.data)t.getDataComplete();else if(e.loading=!0,this.$dom.html(template.compile(c)(e)),
void 0===e.url)l.listStore({
keyword:e.keyword,
audit_state:e.audit_state,
is_validity:e.is_validity,
success:function(i){
e.data=i.shop_list,e.is_from_wxapoi=i.is_from_wxapoi,e.access_deny=i.access_deny,
e.loading=!1,t.getDataComplete();
}
});else{
var i=$.extend({},{
begin:0,
count:9999999,
keyword:e.keyword,
task_id:e.task_id,
audit_state:e.audit_state||3
},e.getDataExtra);
console.log(e.url),s.get({
url:e.url,
data:i
},function(i){
var a=i?1*i.base_resp.ret:-1;
if(0==a){
console.log("success");
var o=$.parseJSON(i.data),n=o.store_location;
e.data=n,e.is_from_wxapoi=i.is_from_wxapoi,e.loading=!1,t.getDataComplete();
}else-7==a||200007==a?(console.log("access deny"),e.data=[],e.access_deny=!0,e.loading=!1,
t.getDataComplete()):(console.log(i),s.show(i));
});
}
},
reinit:function(){
var t=this.opt;
t.data=null,this._currentPage=1,this.init();
},
select:function(){
if(!this.loading){
var t=this.opt,e=(this.$container,this.inputs.values());
return 0===e.length?void o.err("请选择门店！"):t.selectLimit&&e.length>+t.selectLimit?void o.err("超过选择的数量限制："+t.selectLimit):(t.selectComplete(e,1),
!0);
}
},
getDataComplete:function(){
function t(){
var t=s.values(),e=s.$dom;
e.find(".js_selected_count").text(t.length||0),s.no_store&&s.no_store.checked(!1);
}
function e(){
o.readonly&&s.readonlyInputs.checked(!0);
}
function i(){
var t=$.trim(v.val());
return o.keyword=t,s.reinit(),!1;
}
var s=this,o=s.opt;
if(!o.multi&&o.selectedValues&&o.selectedValues.length)for(var l=o.selectedValues[0],r=0;r<o.data.length;r++){
var p=o.data[r];
if(p.wx_poi_uid==l){
this._currentPage=parseInt((r+1)/o.pageCapacity)+((r+1)%o.pageCapacity>0?1:0);
break;
}
}
for(var h=o.data,d=o.pageCapacity,u=(this._currentPage-1)*d,_=this._currentPage*d,g=[],r=0;r<o.data.length;r++){
h[r].iscurrent=r>=u&&_>r?!0:!1;
for(var m=0;m<o.selectedValues.length;m++)if((h[r].wx_poi_uid==o.readonlyValues[m]||h[r].id==o.readonlyValues[m])&&g.push(r),
h[r].wx_poi_uid==o.selectedValues[m]||h[r].id==o.selectedValues[m]){
h[r].selected=!0;
break;
}
}
if(this.$dom.html(template.compile(c)({
multi:o.multi,
data:h,
nostore:o.nostore,
notpoint:o.notpoint,
total_count:o.data.length,
showSelectTips:o.showSelectTips,
is_from_wxapoi:o.is_from_wxapoi,
access_deny:o.access_deny
})),this.$list=this.$dom.find(".js_shop_body tr"),o.data.length>o.pageCapacity){
new a({
container:this.$dom.find(".js_pagebar"),
perPage:o.pageCapacity,
initShowPage:this._currentPage,
totalItemsNum:o.data.length,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var e=t.currentPage;
s._currentPage=e;
var i=o.pageCapacity,a=(e-1)*i,n=e*i,c=0;
s.$list.each(function(t){
t>=a&&n>t?($(this).show(),$(s.$inputs[t]).prop("checked")&&c++):$(this).hide();
}),o.pageChange(),o.pageChange.call(s);
}
});
}else this.$dom.find(".js_pagebar").html(""),o.pageChange();
this._init=!0,o.multi?(this.$inputs=this.$dom.find("tbody input[type=checkbox]"),
this.inputs=this.$inputs.checkbox({
onChanged:t
},o.max_select_num)):(this.$inputs=this.$dom.find("tbody input[type=radio]"),this.inputs=this.$inputs.checkbox({
onChanged:t
})),this.pageInputs=[];
var f=$("");
if(this.$inputs.each(function(e){
e>0&&e%o.pageCapacity==0&&(s.pageInputs.push(f.checkbox({
onChanged:t
})),f=$("")),f[f.length||0]=this,f.length++;
}),f.length&&this.pageInputs.push(f.checkbox({
onChanged:t
})),o.readonly){
for(var y=[],r=0;r<g.length;r++)y.push(this.$inputs[g[r]]);
this.$readonlyInputs=$(y).prop("readonly",!0),this.readonlyInputs=this.$readonlyInputs.checkbox(),
this.readonlyInputs.disabled(!0);
}
this.select_all=this.$dom.find(".js_select_all").checkbox({
onChanged:function(i){
{
var a=$(i).is("input[type=checkbox]"),o=$(i).prop("checked");
s._currentPage;
}
a&&s.inputs.checked(o),e(),t();
}
}),this.cache_data={};
for(var r=0;r<o.data.length;r++){
var k=o.data[r];
this.cache_data[k.id]=k,k.wx_poi_uid&&(this.cache_data[k.wx_poi_uid]=k);
}
o.nostore&&(this.no_store=$(".js_no_store",this.$dom).checkbox({
onChanged:function(t){
t.prop("checked")&&s.inputs.checked(!1);
}
}));
var v=this.$dom.find(".js_keyword"),w=this.$dom.find(".js_search");
w.click(i),v.keydown(function(t){
return wx.isHotkey(t,"enter")?(i(),!1):void 0;
}),v.val(o.keyword),t(),$(".js_all_shop",this.$dom).click(function(){
s.inputs.checked(!0),o.selectAll&&o.selectAll.call(s);
}),$(".js_help_tips",this.$dom).each(function(){
new n({
container:this,
content:template.render("js_select_shop_tips"),
type:"hover",
position:{
left:o.help_left||-106,
top:o.help_top||15
},
reposition:!0
});
$(".popover").css("z-index","10000");
}),window.wx_is_paycard&&$(".js_shopname_tips",this.$dom).each(function(){
new n({
container:this,
content:template.render("js_select_shop_shopnametips"),
type:"hover",
position:{
left:-138
},
reposition:!0
});
$(".popover").css("z-index","10000");
}).show(),"function"==typeof o.initComplete&&o.initComplete.call(this),this.opt.pageChange();
},
values:function(t){
var e=this,i=e.opt;
if(!e._init)return!1;
if(i.nostore){
var s=this.no_store.value();
if(s)return t&&(t.nostore=!0),[];
}
for(var a=this.inputs.values(),o=[],n=0;n<a.length;n++)this.cache_data[a[n]]&&(o.push(this.cache_data[a[n]]),
t&&this.cache_data[a[n]].card_pay_money&&(t.card_pay_money=!0));
return o;
}
},e;
});define("tpl/pagebar.html.js", [], function(e, t, n) {
return '<div class="pagination">\n    <span class="page_nav_area">\n        <a href="javascript:void(0);" class="btn page_first">{firstButtonText}</a>\n        <a href="javascript:void(0);" class="btn page_prev"><i class="arrow"></i></a>\n        {if isSimple}\n            <span class="page_num">\n                <label>{initShowPage}</label>\n                <span class="num_gap">/</span>\n                <label>{endPage}</label>\n            </span>\n        {else}\n            {each startRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n            <span class="gap_prev">...</span>\n            {each midRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav js_mid">{pageIndex}</a>\n            {/each}\n            <span class="gap_next">...</span>\n            {each endRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n        {/if}\n        <a href="javascript:void(0);" class="btn page_next"><i class="arrow"></i></a>\n        <a href="javascript:void(0);" class="btn page_last">{lastButtonText}</a>            \n    </span>\n    {if (endPage>1)}\n    <span class="goto_area">\n        <input type="text">\n        <a href="javascript:void(0);" class="btn page_go">跳转</a>\n    </span>\n    {/if}\n</div>\n';
});define("tpl/homepage/appmsglist.html.js",[],function(){
return'<div class="select_list">\n	{if app_msg_list.length > 0}\n    {each app_msg_list as item}\n    {if multi}\n    <label class="select_list_item frm_checkbox_label {if !item.cover||!item.title}disabled {/if} {if item.checkbox}selected {/if}">\n        <span class="lbl_content list_item_date ">{item.update_time} </span>\n        <i class="icon_checkbox"> </i>\n        <span class="list_item_title lbl_content"> \n            {if !item.title}\n                （未命名文章，无法选择）            {else if !item.cover}\n                {if item.title.length>16}\n                    {item.title.substr(0,16)}...&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {else}\n                    {item.title}&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {/if}\n            {else}\n                {item.title}\n            {/if}            \n        </span>\n        <input type="checkbox" name="appmsgid" class="frm_checkbox js_appmsgid" value="{item.aid}" {if !item.cover||!item.title}disabled {/if}  {if item.checkbox}checked="checked" {/if}>\n    </label>\n    {else}\n    <label class="select_list_item frm_radio_label {if !item.cover||!item.title}disabled {/if} {if item.checkbox}selected {/if}">\n        <span class="lbl_content list_item_date ">{item.update_time} </span>\n        <i class="icon_radio"></i>\n        <span class="lbl_content list_item_title ">\n             {if !item.title}\n                （未命名文章，无法选择）            {else if !item.cover}\n                {if item.title.length>16}\n                    {item.title.substr(0,16)}...&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {else}\n                    {item.title}&nbsp;&nbsp;&nbsp;（文章未设置封面无法选择）                {/if}\n            {else}\n                {item.title}\n            {/if}\n        </span>\n        <input type="radio" name="appmsgid" value="{item.aid}" class="frm_radio js_appmsgid" {if !item.cover||!item.title}disabled {/if} {if item.checkbox}checked {/if}>\n	</label>\n    {/if}\n    {/each}\n    {else}\n    <p class="no_appmsg">暂无图文消息</p>\n    {/if}\n</div>\n\n';
});define("tpl/homepage/appmsgdialog.html.js",[],function(){
return'<script type="text/html" id="appmsgdialogtpl" >\n    <div class="title_tab">\n        <ul class="tab_navs title_tab">\n            <li class="tab_nav js_mass_tab selected first">\n                <a href="javascript:;">已发送</a>\n            </li>\n            <li class="tab_nav js_appmsg_tab">\n                <a href="javascript:;">素材库</a>\n            </li>\n        </ul>\n    </div>\n    <div class="select_list_container js_appmsg_container" style="display:none;">\n        <div class="select_list_hd global_mod float_layout">\n            <div class="global_info">\n                <span class="frm_input_box search append">\n                    <a href="javascript:;" class="frm_input_append js_a_search"><i class="icon16_common search_gray">搜索</i>&nbsp; </a>\n                    <input type="text" placeholder="搜索相关文章" value="" class="frm_input js_search">\n                </span>\n            </div>\n            <div class="global_extra">你还可以勾选<span class=\'js_remaincnt\'></span>篇文章                <!--<a href="javascript:;" class="btn btn_add btn_primary">-->\n                    <!--<i class="icon14_common add_white"></i>新建文章-->\n                <!--</a>-->\n            </div>\n        </div>\n        <div class="select_list_bd">\n            <!--BEGIN loading-->\n            <div class="loading_area js_loading" >\n                <span class="vm_box"></span>\n                <i class="icon_loading_small white"></i>\n            </div><!--END loading-->\n            <div class=\'js_listContainer\' style="display: none;">\n            </div>\n        </div>\n        <div class="select_list_ft">\n            <div class="pagination_wrp js_pager">\n\n            </div>\n        </div>\n    </div>\n    <div class="select_list_container js_mass_container">\n        <div class="select_list_hd global_mod float_layout">\n            <div class="global_extra">你还可以勾选<span class=\'js_remaincnt\'></span>篇文章            </div>\n        </div>\n        <div class="select_list_bd">\n            <!--BEGIN loading-->\n            <div class="loading_area js_mass_loading" >\n                <span class="vm_box"></span>\n                <i class="icon_loading_small white"></i>\n            </div><!--END loading-->\n            <div class=\'js_masslistContainer\' style="display: none;">\n            </div>\n        </div>\n        <div class="select_list_ft">\n            <div class="pagination_wrp js_masspager">\n\n            </div>\n        </div>\n    </div>\n\n</script>\n';
});define("common/wx/time.js",[],function(){
"use strict";
function e(e){
var t=new Date(1e3*e),r=new Date,g=t.getTime(),a=r.getTime(),u=864e5;
return u>a-g&&r.getDate()==t.getDate()?"%s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):2*u>a-g&&new Date(1*t+u).getDate()==r.getDate()?"昨天 %s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):6*u>=a-g?"%s %s:%s".sprintf(s[t.getDay()],n(t.getHours()),n(t.getMinutes())):t.getFullYear()==r.getFullYear()?"%s月%s日".sprintf(n(t.getMonth()+1),n(t.getDate())):"%s年%s月%s日".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()));
}
function t(e){
var t=new Date(1e3*e);
return"%s-%s-%s %s:%s:%s".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()),n(t.getHours()),n(t.getMinutes()),n(t.getSeconds()));
}
function r(e,t){
var r=["日","一","二","三","四","五","六"],n=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,g(e.getFullYear()%100,2)).replace(/mm|MM/,g(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,g(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,g(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,g(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,g(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds()).replace(/w/g,e.getDay()).replace(/W/g,r[e.getDay()]);
return n;
}
function g(e,t){
for(var r=0,g=t-(e+"").length;g>r;r++)e="0"+e;
return e+"";
}
var n=function(e){
return e+="",e.length>=2?e:"0"+e;
},s=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
return{
timeFormat:e,
getFullTime:t,
formatDate:r
};
});define("tpl/cardticket/send_card.html.js",[],function(){
return'<div>\n	<div class="wrp_processor js_step_container"></div>\n	<div class="first_step js_step_content js_step1">\n	    <!--选择投放方式弹窗-->\n		<div class="js_card_list"></div>\n		<!--选择投放方式弹窗 end-->\n	</div>\n	<div class="second_step js_step_content js_step2">\n	</div>\n</div>';
});define("cardticket/send_card_table.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","cardticket/parse_data.js","biz_web/ui/dropdown.js","cardticket/store_cgi.js","cardticket/common_template_helper.js","cardticket/create_card_select.js","tpl/cardticket/card_table.html.js","tpl/cardticket/card_preview.html.js","page/cardticket/dialog_choose_card.css","biz_web/ui/checkbox.js","cardticket/card_quantity.js"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$container,e.find(".js_card_list").html(k({
loading:!0
}));
}
function a(t,a){
var r=a.opt,c=$.extend(!0,{
action:"batch",
begin:t.begin,
count:t.count,
tag_filter:r.tag_filter,
filter_out_expired_card:r.filter_out_expired_card
},r.param);
1==r.view_mode&&(c.sub_merchant_id=0),w=!0,e(a),o.get({
url:r.url||"/merchant/electroniccardmgr",
data:c,
complete:function(){
w=!1;
}
},function(t){
if(0==t.base_resp.ret){
var e=t,n=t.card_dispatching_list;
t="string"==typeof t.batch_card?$.parseJSON(t.batch_card):t.batch_card,r.data=t.card_list;
var s=l.parse_cardlist(r.data);
if(b=s.card_cache,r.data=s.card_list,r.cache_data=b,r.acl={
is_can_shake:e.is_can_shake_card,
is_can_use_sns_card:e.is_can_use_sns_card,
is_intercomm_card:e.is_intercomm_card,
is_can_card_friend:e.is_can_use_sns_card
},n)try{
var _=$.parseJSON(e.card_dispatching_list);
if(_){
_=_.card_dispatching_list;
for(var d=0;d<_.length;d++){
var u=_[d],p=b[u.card_id];
p&&(p.cansend=!u.is_dispatching);
}
}
}catch(h){}
if(r.pageInfo.total_count=t.total_num,e.biz_quota_json){
var m=$.parseJSON(e.biz_quota_json);
m=f.parse_assistsend_quota(m.quota_list),a._quota=m;
}
i(r.pageInfo,a);
}else o.handleRet(t,{
id:64463,
key:33,
url:"/merchant/electroniccardmgr"
}),(new Image).src="https://badjs.weixinbridge.com/badjs?id=33&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent("[card][sendout_err][cgi=/merchant/electroniccardmgr][data="+JSON.stringify(c)+"][ret="+(t?t.base_resp.ret:"null")+"]");
});
}
function i(t,e,a){
var i,_=e.opt;
if(_.payflag=_.param.flag,i=e.$container,a){
var o=i.find(".js_select");
return o.each(function(e){
e>=t.begin&&e<t.begin+t.count?$(this).closest("tr").show():$(this).closest("tr").hide();
}),e.pagebar=null,s(_.pageInfo,e),void(e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a));
}
if(_.data&&"undefined"!=typeof _.sub_merchant_id)for(var d=0;d<_.data.length;d++)_.sub_merchant_id?_.data[d].sub_merchant_id!=_.sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0):_.data[d].sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0);
i.find(".js_card_list").html(k(_));
var l=_.defaultValues,o=i.find(".js_select");
l.length&&o.each(function(){
for(var t=$(this),e=0;e<l.length;e++)if(l[e]==t.attr("data-id")){
t.prop("checked",!0);
break;
}
}),e.select_card_checkbox=o.checkbox({
onChanged:function(){
if(_.multi){
var t=0;
o.each(function(){
$(this).prop("checked")&&t++;
}),$(".js_selectcount",i).text(t);
}
}
}),e.pagebar=null,s(_.pageInfo,e),c(e),n(e),1==_.no_filter||r(e);
var u,p=[];
1==_.sns_card_type?u=o.filter(".js_select_disabled_1"):2==_.sns_card_type&&(u=o.filter(".js_select_disabled_2")),
u&&(u.each(function(){
p.push($(this).val());
}),e.select_card_checkbox.disable(p)),$(".js_add_card_link",i).click(function(){
return new h({
ispay:_.payflag,
is_sns_card:window.wx_is_can_use_sns_card
}),e.opt.hidePopup&&e.opt.hidePopup(),!1;
}),e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a);
}
function r(t){
var e=t.opt;
if("2"!=e.sns_card_type){
var i=[];
1==e.sns_card_type?i=[{
name:"全部卡券",
value:"friends,0"
}]:0==e.sns_card_type&&(i=[{
name:"全部卡券",
value:""
}],e.acl.is_can_card_friend&&i.push({
name:"朋友共享的券",
value:"friends,1"
})),e.acl.is_can_shake&&i.push({
name:"摇一摇",
value:"shake,1"
}),e.acl.is_intercomm_card;
var r=t.base_tag_filter?"|":"",c={};
if(c[t.base_tag_filter+r+"task,1"]="互通",c[t.base_tag_filter+r+"shake,1"]="摇一摇",c[t.base_tag_filter+r+"friends,1"]="朋友的券",
i.length>1){
new u({
container:$(".js_filter_tag",t.$container),
label:c[e.tag_filter]||"全部卡券",
data:i,
callback:function(i){
var r=t.base_tag_filter+(t.base_tag_filter&&i?"|"+i:i);
r!=e.tag_filter&&(e.tag_filter=r,a(e.pageInfo,t));
}
});
}
}
}
function c(t){
function e(e){
var i=$.trim(c.val());
(!e||e&&wx.isHotkey(e,"enter"))&&(n.param.keyword=i,a(n.pageInfo,t));
}
var i=t.$container,r=$(".js_search",i),c=$(".js_keyword",i),n=t.opt;
r.click(function(){
e();
}),c.keyup(function(t){
e(t);
}),c.val(n.param.keyword);
}
function n(t){
var e=t.$container,a=e.find(".js_modify_quantity");
a.each(function(){
var e=$(this),a=1*e.attr("data-new")||0;
new y({
container:e,
mode:"fixed",
cache_card:t.opt.cache_data,
setquantity:a?!0:!1,
max_sku_for_eachcard:t._quota&&t._quota.max_sku||1e4,
quantityChange:function(t,a){
var i=b[t];
if(i){
if(i.pay_info.is_swipe_card)return i.pay_info.swipe_card_status=1,void e.hide();
i.quantity=this.opt.setquantity?i.quantity+a:a,e.attr("data-new",1),i.isnew=!0,this.opt.setquantity=!0,
$("#js_ct_tr_"+t).find(".js_sendcard_quantity").text(i.quantity);
}
}
});
});
}
function s(t,e){
var r=t.total_count,c=e.$container;
if(t.count&&r>t.count){
var n=t.begin/t.count;
e.pagebar=new d({
container:$(".js_pager",c),
first:!1,
last:!1,
midRange:5,
initShowPage:n+1,
perPage:t.count,
totalItemsNum:r,
callback:function(r){
if(w)return!1;
var c=r.currentPage;
return c!=n+1&&(t.begin=(c-1)*t.count,e.opt.hasdata&&e.opt.data?i(t,e,!0):a(t,e)),
e.opt.pageChanged&&e.opt.pageChanged.call(e),!0;
}
});
}
}
var _=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),d=(t("common/wx/Step.js"),t("common/wx/pagebar.js")),l=t("cardticket/parse_data.js"),u=t("biz_web/ui/dropdown.js"),p=t("cardticket/store_cgi.js"),f=t("cardticket/common_template_helper.js"),h=t("cardticket/create_card_select.js"),m={
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{
keyword:"",
status:"3|6",
flag:2
},
neednew:!0,
noexpire:!0,
editquantity:!0,
onHide:$.noop,
selectComplete:$.noop,
data:null,
hasdata:!1,
maxcount:10,
sns_card_type:1,
defaultValues:[],
url:"",
removeOnHide:!0,
source:"",
has_sendout:!1,
acl:{},
view_mode:0,
sub_merchant_id:void 0,
filter_out_expired_card:1
},g=t("tpl/cardticket/card_table.html.js"),b=(template.compile(t("tpl/cardticket/card_preview.html.js")),
{});
t("page/cardticket/dialog_choose_card.css"),t("biz_web/ui/checkbox.js");
var v=function(t){
this.opt=$.extend(!0,{},m,t),this.opt.tag_filter=0==this.opt.sns_card_type?"":2==this.opt.sns_card_type?"friends,1":"friends,0",
this.init();
},k=template.compile(g),w=!1,y=t("cardticket/card_quantity.js");
return v.prototype={
_html:g,
init:function(){
var t=this.opt,e=this;
if(this.$container=$(t.container),e.base_tag_filter="",2==t.view_mode&&(e.base_tag_filter="sub_merchant,1",
t.tag_filter=t.tag_filter?e.base_tag_filter+"|"+t.tag_filter:e.base_tag_filter),
t.hasdata&&t.data){
t.pageInfo.total_count=t.data.length,b={};
for(var r=0;r<t.data.length;r++){
var c=t.data[r];
b[c.id]=c;
}
i(t.pageInfo,this);
}else a(t.pageInfo,this);
},
show:function(){
this.$container.show();
},
select:function(){
if(!w){
var t=this,e=this.opt,a=t.select_card_checkbox.values()[0],i=this.$container,r=b[a];
if(!a||!r)return void _.err("请选择卡券");
if(!e.neednew||!r.pay_info.is_swipe_card||0==r.pay_info.swipe_card_status||0!=r.quantity){
if(e.multi)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(e.neednew&&(!s.isnew||0==s.quantity))return void _.err("卡券库存不能为0，请先设置库存再投放");
}else if(e.neednew&&(!r.isnew||0==r.quantity))return _.err("卡券库存不能为0，请先设置库存再投放"),
void setTimeout(function(){
var t=i.find("input[data-id="+a+"]");
$(t.closest("tr").find(".js_modify_quantity")[0]).click();
},50);
if(!e.multi&&e.noexpire&&r.is_expire)return void _.err(r.is_sns_card?"卡券已过期":"卡券已过期，无法投放，请到卡券详情去延长有效期再投放");
if(e.multi&&e.noexpire)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(s.is_expire)return void _.err("不能选择已过期的卡券，请先到卡券详情去延长有效期");
}
var c=t.select_card_checkbox.values();
return c.length>e.maxcount?void _.err("最多只能选择%s个卡券".sprintf(e.maxcount)):2!=e.sns_card_type||r.is_sns_card?1==e.sns_card_type&&r.is_sns_card?void _.err("朋友的券只能进行社交投放, 请重新选择"):"undefined"!=typeof e.sub_merchant_id&&r.is_sub_merchant_disabled?void _.err("不支持赠送其他商户的“朋友的券”，请重新选择。"):void p.canSendCard({
card_id:a,
success:function(a){
if(a===!1)_.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。");else if(a===!0){
var i=t.select_card_checkbox.values(),r=e.multi?i:i,c=[];
if(e.multi)for(var n=0;n<r.length;n++)b[r[n]].cardid=b[r[n]].id,c.push(b[r[n]]);else c=b[r],
c.cardid=b[r].id;
e.selectComplete&&e.selectComplete(c,0);
}
}
}):void _.err("朋友的券才能进行社交投放, 请重新选择");
}
switch(r.pay_info.swipe_card_status){
case 1:
_.err("添加库存暂未生效，待商户审核完成");
break;

case 3:
_.err("请先激活本券");
break;

case 2:
case 4:
_.err("卡券库存不能为0，请先设置库存再投放");
}
}
},
isLoading:function(){
return w;
},
hide:function(){
this.$container.hide();
},
destroy:function(){
this.$container.remove();
}
},v;
});define("tpl/cardticket/select_shelf.html.js",[],function(){
return'<div class="select_shelf">\n	{if loading}\n	<i class="icon_loading_small white"></i>\n	{else}\n    <div class="sub_title_bar white group">\n        <a class="btn btn_primary r js_add_shelf" href="javascript:;"><i class="icon14_common add_white"></i>新建货架</a>\n	</div>\n	<div class="select_shelf_area group">\n		{if data.length}\n            {each data as item i}\n            {if i%2==0}\n            <div class="shelf_item_col shelf_item_col_odd">\n				<!--Begin 货架卡片-->\n				<div class="shelf_item js_shelf_item_p">\n					<div class=" js_shelf_item" data-id="{item.id}" id="js_shelf_item_{item.id}"></div>\n					<div class="shelf_item_mask">\n						<i class="icon_card_selected"></i>\n					</div>\n				</div>\n				<!--End 货架卡片-->\n			</div>\n            {else}\n            <div class="shelf_item_col shelf_item_col_even">\n				<!--Begin 货架卡片-->\n				<div class="shelf_item js_shelf_item_p">\n					<div class=" js_shelf_item" data-id="{item.id}" id="js_shelf_item_{item.id}"></div>\n					<div class="shelf_item_mask">\n						<i class="icon_card_selected"></i>\n					</div>\n				</div>\n				<!--End 货架卡片-->\n			</div>\n            {/if}\n			\n			{/each}\n		{else}\n			<div class="empty_tips">暂无数据</div>\n		{/if}\n	</div>\n	<div class="js_pager"></div>\n	{/if}\n</div>\n';
});define("cardticket/add/member_info_flag.js",[],function(){
"use strict";
function n(n,f){
for(var i=0;i<n.length;i++)if(n[i]===f)return i;
return-1;
}
var f=[1,4096,2,4,8,0,32,64,128,256,512,1024,2048];
return{
sys_info:["手机号","姓名","性别","所在地区","生日","身份证号","邮箱","详细地址","学历","职业","行业","收入","爱好"],
info_flag:f,
flag2info:function(n){
for(var f=[],i=0;i<this.info_flag.length;i++){
var r=this.info_flag[i];
r&n&&f.push(this.sys_info[i]);
}
return f;
},
info2flag:function(f){
for(var i=0,r=0;r<f.length;r++){
var t=n(this.sys_info,f[r]);
t>=0&&(i|=this.info_flag[t]);
}
return i;
}
};
});define("tpl/media/dialog/image_water.html.js",[],function(){
return'<div>\n    {if status == 3}\n    <p>不添加水印</p>\n    {else if status == 2}\n    <p>水印类型：公众号名称</p>\n    {else if status == 1}\n    <p>水印类型：微信号</p>\n    {/if}\n\n    <p>\n        {if status == 3}\n        <span>已关闭水印，所有上传的图片都不会带有水印。</span>\n        {else}\n        <span>已开启水印，所有上传的图片都会带有水印。</span>\n        {/if}\n        若需修改请前往        <a target="_blank" href="{set_water_url}">公众号设置/功能设置</a>\n        设置图片水印    </p>\n</div>\n';
});