define("tpl/biz_web/ui/dropdown.html.js", [], function(e, t, n) {
return '<a href="javascript:;" class="btn dropdown_switch jsDropdownBt"><label class="jsBtLabel" {if search}contenteditable="true"{/if}>{label}</label><i class="arrow"></i></a>\n<div class="dropdown_data_container jsDropdownList">\n    <ul class="dropdown_data_list">\n        {if renderHtml}\n        {renderHtml}\n        {else}\n            {each data as o index}\n            <li class="dropdown_data_item {if o.className}{o.className}{/if}">  \n                <a onclick="return false;" href="javascript:;" class="jsDropdownItem" data-value="{o.value}" data-index="{index}" data-name="{o.name}">{o.name}</a>\n            </li>\n            {/each}        \n        {/if}\n    </ul>\n</div>\n';
});define("tpl/media/cardmsg.html.js",[],function(){
return'<div class="msg_card{if _className} {_className}{/if}">\n	<div class="card_content" style="background-color: {color};">\n		<img class="logo js_logourl" data-src="{logo_url}" />\n		<div class="card_info">\n			<h4 class="card_title">{title}</h4>\n		</div>\n		<div class="deco"></div>\n	</div>\n	<p class="store">{brand_name}</p>\n</div>\n';
});define("common/lib/MockJax.js", [], function(e, t, n) {
try {
var r = +(new Date);
(function(e) {
function t(t) {
window.DOMParser == undefined && window.ActiveXObject && (DOMParser = function() {}, DOMParser.prototype.parseFromString = function(e) {
var t = new ActiveXObject("Microsoft.XMLDOM");
return t.async = "false", t.loadXML(e), t;
});
try {
var n = (new DOMParser).parseFromString(t, "text/xml");
if (!e.isXMLDoc(n)) throw "Unable to parse XML";
var r = e("parsererror", n);
if (r.length == 1) throw "Error: " + e(n).text();
return n;
} catch (i) {
var s = i.name == undefined ? i : i.name + ": " + i.message;
return e(document).trigger("xmlParseError", [ s ]), undefined;
}
}
function n(t, n, r) {
(t.context ? e(t.context) : e.event).trigger(n, r);
}
function r(t, n) {
var i = !0;
return typeof n == "string" ? e.isFunction(t.test) ? t.test(n) : t == n : (e.each(t, function(s) {
if (n[s] === undefined) return i = !1, i;
typeof n[s] == "object" ? i = i && r(t[s], n[s]) : e.isFunction(t[s].test) ? i = i && t[s].test(n[s]) : i = i && t[s] == n[s];
}), i);
}
function i(t, n) {
if (e.isFunction(t)) return t(n);
if (e.isFunction(t.url.test)) {
if (!t.url.test(n.url)) return null;
} else {
var i = t.url.indexOf("*");
if (t.url !== n.url && i === -1 || !(new RegExp(t.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, ".+"))).test(n.url)) return null;
}
return t.data && n.data && !r(t.data, n.data) ? null : t && t.type && t.type.toLowerCase() != n.type.toLowerCase() ? null : t;
}
function s(n, r, i) {
var s = function(s) {
return function() {
return function() {
var s;
this.status = n.status, this.statusText = n.statusText, this.readyState = 4, e.isFunction(n.response) && n.response(i), r.dataType == "json" && typeof n.responseText == "object" ? this.responseText = JSON.stringify(n.responseText) : r.dataType == "xml" ? typeof n.responseXML == "string" ? (this.responseXML = t(n.responseXML), this.responseText = n.responseXML) : this.responseXML = n.responseXML : this.responseText = n.responseText;
if (typeof n.status == "number" || typeof n.status == "string") this.status = n.status;
typeof n.statusText == "string" && (this.statusText = n.statusText), s = this.onreadystatechange || this.onload, e.isFunction(s) ? (n.isTimeout && (this.status = -1), s.call(this, n.isTimeout ? "timeout" : undefined)) : n.isTimeout && (this.status = -1);
}.apply(s);
};
}(this);
n.proxy ? v({
global: !1,
url: n.proxy,
type: n.proxyType,
data: n.data,
dataType: r.dataType === "script" ? "text/plain" : r.dataType,
complete: function(e) {
n.responseXML = e.responseXML, n.responseText = e.responseText, n.status = e.status, n.statusText = e.statusText, this.responseTimer = setTimeout(s, n.responseTime || 0);
}
}) : r.async === !1 ? s() : this.responseTimer = setTimeout(s, n.responseTime || 50);
}
function o(t, n, r, i) {
return t = e.extend(!0, {}, e.mockjaxSettings, t), typeof t.headers == "undefined" && (t.headers = {}), t.contentType && (t.headers["content-type"] = t.contentType), {
status: t.status,
statusText: t.statusText,
readyState: 1,
open: function() {},
send: function() {
i.fired = !0, s.call(this, t, n, r);
},
abort: function() {
clearTimeout(this.responseTimer);
},
setRequestHeader: function(e, n) {
t.headers[e] = n;
},
getResponseHeader: function(e) {
if (t.headers && t.headers[e]) return t.headers[e];
if (e.toLowerCase() == "last-modified") return t.lastModified || (new Date).toString();
if (e.toLowerCase() == "etag") return t.etag || "";
if (e.toLowerCase() == "content-type") return t.contentType || "text/plain";
},
getAllResponseHeaders: function() {
var n = "";
return e.each(t.headers, function(e, t) {
n += e + ": " + t + "\n";
}), n;
}
};
}
function u(e, t, n) {
a(e), e.dataType = "json";
if (e.data && y.test(e.data) || y.test(e.url)) {
l(e, t, n);
var r = /^(\w+:)?\/\/([^\/?#]+)/, i = r.exec(e.url), s = i && (i[1] && i[1] !== location.protocol || i[2] !== location.host);
e.dataType = "script";
if (e.type.toUpperCase() === "GET" && s) {
var o = f(e, t, n);
return o ? o : !0;
}
}
return null;
}
function a(e) {
if (e.type.toUpperCase() === "GET") y.test(e.url) || (e.url += (/\?/.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?"); else if (!e.data || !y.test(e.data)) e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?";
}
function f(t, n, r) {
var i = r && r.context || t, s = null;
return n.response && e.isFunction(n.response) ? n.response(r) : typeof n.responseText == "object" ? e.globalEval("(" + JSON.stringify(n.responseText) + ")") : e.globalEval("(" + n.responseText + ")"), c(t, i, n), h(t, i, n), e.Deferred && (s = new e.Deferred, typeof n.responseText == "object" ? s.resolveWith(i, [ n.responseText ]) : s.resolveWith(i, [ e.parseJSON(n.responseText) ])), s;
}
function l(e, t, n) {
var r = n && n.context || e, i = e.jsonpCallback || "jsonp" + b++;
e.data && (e.data = (e.data + "").replace(y, "=" + i + "$1")), e.url = e.url.replace(y, "=" + i + "$1"), window[i] = window[i] || function(n) {
data = n, c(e, r, t), h(e, r, t), window[i] = undefined;
try {
delete window[i];
} catch (s) {}
head && head.removeChild(script);
};
}
function c(e, t, r) {
e.success && e.success.call(t, r.responseText || "", status, {}), e.global && n(e, "ajaxSuccess", [ {}, e ]);
}
function h(t, r) {
t.complete && t.complete.call(r, {}, status), t.global && n("ajaxComplete", [ {}, t ]), t.global && !--e.active && e.event.trigger("ajaxStop");
}
function p(t, n) {
var r, s, a;
typeof t == "object" ? (n = t, t = undefined) : n.url = t, s = e.extend(!0, {}, e.ajaxSettings, n);
for (var f = 0; f < m.length; f++) {
if (!m[f]) continue;
a = i(m[f], s);
if (!a) continue;
g.push(s), e.mockjaxSettings.log(a, s);
if (s.dataType === "jsonp") if (r = u(s, a, n)) return r;
return a.cache = s.cache, a.timeout = s.timeout, a.global = s.global, d(a, n), function(t, n, i, s) {
r = v.call(e, e.extend(!0, {}, i, {
xhr: function() {
return o(t, n, i, s);
}
}));
}(a, s, n, m[f]), r;
}
return v.apply(e, [ n ]);
}
function d(e, t) {
if (!(e.url instanceof RegExp)) return;
if (!e.hasOwnProperty("urlParams")) return;
var n = e.url.exec(t.url);
if (n.length === 1) return;
n.shift();
var r = 0, i = n.length, s = e.urlParams.length, o = Math.min(i, s), u = {};
for (r; r < o; r++) {
var a = e.urlParams[r];
u[a] = n[r];
}
t.urlParams = u;
}
var v = e.ajax, m = [], g = [], y = /=\?(&|$)/, b = (new Date).getTime();
e.extend({
ajax: p
}), e.mockjaxSettings = {
log: function(t, n) {
if (t.logging === !1 || typeof t.logging == "undefined" && e.mockjaxSettings.logging === !1) return;
if (window.console && console.log) {
var r = "MOCK " + n.type.toUpperCase() + ": " + n.url, i = e.extend({}, n);
if (typeof console.log == "function") console.log(r, i); else try {
console.log(r + " " + JSON.stringify(i));
} catch (s) {
console.log(r);
}
}
},
logging: !0,
status: 200,
statusText: "OK",
responseTime: 500,
isTimeout: !1,
contentType: "text/plain",
response: "",
responseText: "",
responseXML: "",
proxy: "",
proxyType: "GET",
lastModified: null,
etag: "",
headers: {
etag: "IJF@H#@923uf8023hFO@I#H#",
"content-type": "text/plain"
}
}, e.mockjax = function(e) {
var t = m.length;
return m[t] = e, t;
}, e.mockjaxClear = function(e) {
arguments.length == 1 ? m[e] = null : m = [], g = [];
}, e.mockjax.handler = function(e) {
if (arguments.length == 1) return m[e];
}, e.mockjax.mockedAjaxCalls = function() {
return g;
};
})(jQuery);
} catch (i) {
wx.jslog({
src: "common/lib/MockJax.js"
}, i);
}
});define("common/wx/cgiReport.js",["common/wx/Tips.js"],function(e,a){
"use strict";
var r=e("common/wx/Tips.js");
a.error=function(e,a,t){
t.responseText=t.responseText||"";
var n=-1!==location.href.indexOf("/cgi-bin/home")&&(-1!==a.url.indexOf("/misc/safeassistant")||-1!==a.url.indexOf("/safe/safeuuid")),o=11;
switch(e){
case"timeout":
o=7;
break;

case"error":
o=8;
break;

case"notmodified":
o=9;
break;

case"parsererror":
o=10;
try{
if("localStorage"in window&&null!==window.localStorage){
var s=(new Date).getTime(),i=localStorage.getItem("web_cgi_parserror_time");
i&&36e5>s-i||(localStorage.setItem("web_cgi_parserror_time",s),$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [parse_error_once] [url={url}]  [useragent={useragent}] [page={page}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:a.url
}),
id:18,
level:"error"
},
type:"POST"
}));
}
}catch(u){}
}
a.data.lang&&delete a.data.lang,a.data.random&&delete a.data.random,a.data.f&&delete a.data.f,
a.data.ajax&&delete a.data.ajax,a.data.token&&delete a.data.token,o+=n?100:0,$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}] [text={responseText}] [headers={headers}] [status={status}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:a.url,
param:$.param(a.data).substr(0,50),
info:e,
responseText:t.responseText.substr(0,500),
headers:(t.getAllResponseHeaders()||"").replace(/\s/g,""),
status:t.status
}),
id:o,
level:"error"
},
type:"POST"
}),$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:a.url,
param:$.param(a.data).substr(0,50),
info:e
}),
id:6+(n?100:0),
level:"error"
},
type:"POST"
}),"timeout"==e&&r.err("你的网络环境较差，请稍后重试");
};
});define("common/qq/mask.js", [ "biz_web/lib/spin.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict", e("biz_web/lib/spin.js");
var i = 0, s = '<div class="mask"></div>';
function o(e) {
if (this.mask) this.mask.show(); else {
var t = "body";
e && !!e.parent && (t = $(e.parent)), this.mask = $(s).appendTo(t), this.mask.id = "wxMask_" + ++i, this.mask.spin("flower");
}
if (e) {
if (e.spin === !1) return this;
this.mask.spin(e.spin || "flower");
}
return this;
}
o.prototype = {
show: function() {
this.mask.show();
},
hide: function() {
this.mask.hide();
},
remove: function() {
this.mask.remove();
}
}, t.show = function(e) {
return new o(e);
}, t.hide = function() {
$(".mask").hide();
}, t.remove = function() {
$(".mask").remove();
};
} catch (u) {
wx.jslog({
src: "common/qq/mask.js"
}, u);
}
});define("tpl/uploader.html.js",[],function(){
return'<li id="uploadItem{id}" data-status="{className}" class="upload_file">\n    <strong class="upload_file_name">{fileName}</strong>\n    <span class="upload_file_size">({size})</span>\n    <div class="progress_bar"><div class="progress_bar_thumb" style="width:0%"></div></div>\n    <a href="javascript:;" data-id="{id}" class="upload_file_cancel js_cancel">取消</a>\n</li>\n';
});define("cardticket/card_cgi.js",["common/wx/Cgi.js"],function(c){
"use strict";
var n=c("common/wx/Cgi.js");
return{
has_friend_card:function(c){
n.get({
url:"/merchant/electroniccardmgr?action=check_can_use_sns_card"
},function(n){
c(0==n.base_resp.ret?1==n.is_can_use_sns_card?!0:!1:!1);
});
},
has_money_acct:function(c){
n.get({
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
},function(n){
c(0==n.base_resp.ret?1==n.is_acct_open?!0:!1:!1);
});
},
check_friend_and_money_acct:function(c){
var n=0,e=!1,_=!1;
this.has_money_acct(function(a){
n++,e=a,2==n&&c(_,e);
}),this.has_friend_card(function(a){
n++,_=a,2==n&&c(_,e);
});
}
};
});define("cardticket/select_sub_merchant.js",["tpl/cardticket/select_sub_merchant.html.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js","cardticket/select_sub_merchant_table.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js"],function(t){
"use strict";
{
var e=t("tpl/cardticket/select_sub_merchant.html.js"),o=(t("common/wx/popup.js"),
t("common/wx/Cgi.js"),t("common/wx/pagebar.js"),t("cardticket/select_sub_merchant_table.js"));
t("common/wx/Tips.js"),t("biz_web/ui/checkbox.js"),t("cardticket/common_template_helper.js");
}
e=template.compile(e);
var n={
multi:!1,
title:"选择子商户"
},c=function(t){
this.opt=$.extend(!0,{},n,t),this.init();
};
return c.prototype={
init:function(){
var t=this.opt,n=this;
n.$popup=$(e()).popup({
autoShow:!1,
title:t.title,
width:956,
className:"align_edge",
onOK:function(){
var e=n.subMerchantSelector.selectedValue();
return e?void t.selectComplete.call(n,e.Id,e):!0;
},
onCancel:function(){},
onHide:function(){
this.remove(),t.onHide.call(n);
}
}),t.resetPosition=function(){
n.$popup.popup("resetPosition");
},t.getDataComplete=function(t){
var e=n.$popup.popup("get");
t&&t.length?$(e.find(".js_btn_p")[0]).removeClass("btn_disabled"):$(e.find(".js_btn_p")[0]).addClass("btn_disabled");
};
var c=n.$popup.find(".js_sub_merchant_list");
t.container=c,n.subMerchantSelector=new o(t);
},
show:function(){
this.$popup.popup("show");
},
destroy:function(){
this.$popup.popup("remove");
}
},c;
});define("biz_web/lib/store.js",["biz_web/lib/json.js"],function(e,t,r){
function n(){
try{
return f in window&&window[f];
}catch(e){
return!1;
}
}
function i(e){
return function(){
var t=Array.prototype.slice.call(arguments,0);
t.unshift(a),d.appendChild(a),a.addBehavior("#default#userData"),a.load(f);
var r=e.apply(u,t);
return d.removeChild(a),r;
};
}
function o(e){
return e.replace(b,"___");
}
var a,c=e("biz_web/lib/json.js"),u={},l=window.document,f="localStorage",s="__storejs__";
if(u.disabled=!1,u.set=function(){},u.get=function(){},u.remove=function(){},u.clear=function(){},
u.transact=function(e,t,r){
var n=u.get(e);
null==r&&(r=t,t=null),"undefined"==typeof n&&(n=t||{}),r(n),u.set(e,n);
},u.getAll=function(){},u.serialize=function(e){
return c.stringify2(e);
},u.deserialize=function(e){
if("string"!=typeof e)return void 0;
try{
return c.parse(e);
}catch(t){
return e||void 0;
}
},n())a=window[f],u.set=function(e,t,r){
if(void 0===t)return u.remove(e);
try{
a.setItem(e,u.serialize(t));
}catch(n){
a.clear();
try{
a.setItem(e,u.serialize(t));
}catch(i){
"function"==typeof r&&r(i);
}
}
return t;
},u.get=function(e,t){
try{
return u.deserialize(a.getItem(e));
}catch(r){
return void("function"==typeof t&&t(r));
}
},u.remove=function(e,t){
try{
a.removeItem(e);
}catch(r){
"function"==typeof t&&t(r);
}
},u.clear=function(e){
try{
a.clear();
}catch(t){
"function"==typeof e&&e(t);
}
},u.getAll=function(){
for(var e={},t=0;t<a.length;++t){
var r=a.key(t);
e[r]=u.get(r);
}
return e;
};else if(l.documentElement.addBehavior){
var d,m;
try{
m=new ActiveXObject("htmlfile"),m.open(),m.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'),
m.close(),d=m.w.frames[0].document,a=d.createElement("div");
}catch(v){
a=l.createElement("div"),d=l.body;
}
var b=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");
u.set=i(function(e,t,r){
return t=o(t),void 0===r?u.remove(t):(e.setAttribute(t,u.serialize(r)),e.save(f),
r);
}),u.get=i(function(e,t){
return t=o(t),u.deserialize(e.getAttribute(t));
}),u.remove=i(function(e,t){
t=o(t),e.removeAttribute(t),e.save(f);
}),u.clear=i(function(e){
var t=e.XMLDocument.documentElement.attributes;
e.load(f);
for(var r,n=0;r=t[n];n++)e.removeAttribute(r.name);
e.save(f);
}),u.getAll=i(function(e){
for(var t,r=e.XMLDocument.documentElement.attributes,n={},i=0;t=r[i];++i){
var a=o(t.name);
n[t.name]=u.deserialize(e.getAttribute(a));
}
return n;
});
}
try{
u.set(s,s),u.get(s)!=s&&(u.disabled=!0),u.remove(s);
}catch(v){
u.disabled=!0;
}
u.isLocalStorageNameSupported=n,u.enabled=!u.disabled,r.exports=u;
});define("tpl/simplePopup.html.js",[],function(){
return'<div class="simple_dialog_content">\n    <form id="popupForm_{id}"  method="post"  class="form" onSubmit="return false;">\n         <div class="frm_control_group">\n            {if label}<label class="frm_label">{label}</label>{/if}\n            <span class="frm_input_box">\n                <input type="text" class="frm_input" name="popInput" value="{value&&value.html(true)}"/>\n                <input style="display:none"/>\n            </span>\n            {if tips}<p class="frm_tips">{=tips}</p>{/if}\n        </div>       \n        <div class="js_verifycode"></div>\n    </form>\n</div>\n';
});define("cardticket/common_validate.js",["biz_common/jquery.validate.js","cardticket/common_template_helper.js"],function(t){
"use strict";
var e=t("biz_common/jquery.validate.js"),o=t("cardticket/common_template_helper.js");
return $.validator.addMethod("byteMaxLength",function(t,e,o){
return this.optional(e)||t.len()<=o;
},"_(必须为小于{0}个字节)"),$.validator.addMethod("utf8byteMaxLength",function(t,e,r){
return this.optional(e)||o.strlen(t)<=r;
},"_(必须为小于{0}个字节)"),$.validator.addMethod("telephone",function(t){
var o=$.trim(t);
return/^[0-9]{3,4}-[0-9]{5,}$/.test(o)||e.rules.mobile(t);
}),$.validator.addMethod("telechar",function(t,e){
var o=$.trim(t);
return this.optional(e)||/^(-|[0-9])+$/.test(o);
}),$.validator.addMethod("posnum",function(t,e){
return this.optional(e)||/^[0-9\.]+$/.test(t)&&parseFloat(t)>=.01;
}),$.validator.addMethod("reduce_cost",function(t,e){
return this.optional(e)||parseFloat(t)>=1;
}),$.validator.addMethod("money",function(t,e){
return this.optional(e)||/^[0-9]+(\.[0-9]{1,2})?$/.test(t)&&parseFloat(t)>=.01;
}),$.validator.addMethod("service_phone",function(t){
var o=$.trim(t);
return/^[0-9]{3,4}-[0-9]{5,}$/.test(o)||e.rules.mobile(t);
}),$.validator.addMethod("customer_phone",function(t,o){
var r=$.trim(t);
return this.optional(o)||/^[-0-9]{5,15}$/.test(r)||e.rules.mobile(r);
}),$.validator.addMethod("discount",function(t){
var e=$("#js_supply_discount");
if(e.length&&!e.prop("checked"))return!0;
var o=$.trim(t);
return/^[0-9\.]+$/.test(o)&&parseFloat(o)>=1&&parseFloat(o)<10;
}),$.validator.addMethod("bonus_rules",function(t,e){
return!$("#js_supply_bonus").prop("checked")||""!=$.trim($(e).val());
}),$.validator.addMethod("check_friend_card_word",function(t,e){
return this.optional(e)||o.check_friend_card_word(t,function(){});
}),e;
});define("common/wx/stopMultiRequest.js", [], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = {}, s = function(e) {
var t = e.split(/&/);
return t;
}, o = function(e) {
if (!e) return [];
var t = [];
for (var n in e) t.push(n + "=" + e[n]);
return t;
}, u = function(e) {
var t = e.url.indexOf("?"), n = [], r = e.url;
t >= 0 && (n = s(e.url.substr(t + 1)), r = r.substr(0, t)), typeof e.data == "string" ? n = n.concat(s(e.data)) : typeof e.data == "object" && (n = n.concat(o(e.data)));
var i = r + "?" + n.sort().join("&");
return i.replace(/random=[^&]*/, "");
};
return $.ajaxPrefilter(function(e, t, n) {
if (/^GET$/i.test(e.type)) return;
var r = function(e, t) {
t.pendingRequestKey = e, i[e] = !0;
}, s = u(e);
if (!!i[s]) {
n.abort(), i[s] = !1;
return;
}
r(s, n), e.btn && $(e.btn).btn(!1);
var o = e.complete;
e.complete = function(t, n) {
e.btn && $(e.btn).btn(!0), i[t.pendingRequestKey] = null, $.isFunction(o) && o.apply(this, arguments);
};
}), {};
} catch (a) {
wx.jslog({
src: "common/wx/stopMultiRequest.js"
}, a);
}
});define("biz_web/lib/json.js",[],function(require,exports,module){
return"object"!=typeof JSON&&(JSON={}),function(){
"use strict";
function f(t){
return 10>t?"0"+t:t;
}
function quote(t){
return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){
var e=meta[t];
return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+t+'"';
}
function str(t,e){
var r,n,o,f,u,i=gap,p=e[t];
switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),"function"==typeof rep&&(p=rep.call(e,t,p)),
typeof p){
case"string":
return quote(p);

case"number":
return isFinite(p)?String(p):"null";

case"boolean":
case"null":
return String(p);

case"object":
if(!p)return"null";
if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){
for(f=p.length,r=0;f>r;r+=1)u[r]=str(r,p)||"null";
return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",
gap=i,o;
}
if(rep&&"object"==typeof rep)for(f=rep.length,r=0;f>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],
o=str(n,p),o&&u.push(quote(n)+(gap?": ":":")+o));else for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(o=str(n,p),
o&&u.push(quote(n)+(gap?": ":":")+o));
return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",
gap=i,o;
}
}
"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){
return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null;
},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){
return this.valueOf();
});
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={
"\b":"\\b",
"	":"\\t",
"\n":"\\n",
"\f":"\\f",
"\r":"\\r",
'"':'\\"',
"\\":"\\\\"
},rep;
JSON.stringify2=function(t,e,r){
var n;
if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);
if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");
return str("",{
"":t
});
},"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){
function walk(t,e){
var r,n,o=t[e];
if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),
void 0!==n?o[r]=n:delete o[r]);
return reviver.call(t,e,o);
}
var j;
if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){
return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4);
})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),
"function"==typeof reviver?walk({
"":j
},""):j;
throw new SyntaxError("JSON.parse");
});
}(),JSON;
});define("cardticket/clickreport.js",["biz_web/lib/store.js","biz_common/jquery.md5.js"],function(e){
"use strict";
function t(e){
e||(e=location.href);
var t=e.indexOf("?");
if(t>=0){
e=e.substr(t+1);
for(var n=e.split("&"),r={},o=0;o<n.length;o++){
var i=n[o].split("=");
i[0]&&i[1]&&(r[i[0]]=decodeURIComponent(i[1]));
}
return r;
}
return{};
}
var n=e("biz_web/lib/store.js");
e("biz_common/jquery.md5.js");
var r=function(){
function e(e,t){
t||(t=2);
var n;
return n=2==t?"time_on_page":"action_id","/merchant/cardclickreport?action=report&"+n+"="+e+"&type="+t+"&url="+encodeURIComponent(location.href)+"&page_id="+encodeURIComponent(r(location.href))+"&from_page_id="+encodeURIComponent(r(document.referrer))+"&referer="+encodeURIComponent(document.referrer)+"&bizuin="+wx.data.uin+"&timestamp="+ +new Date+"&_token="+wx.data.t;
}
function r(e){
e||(e=location.href),e||(e="");
var n=e;
e=e.replace(location.protocol+"//"+location.host,"");
var r=e.indexOf("?"),o=r>=0?e.substring(0,r):e,i=t(e),a=o.replace(/\/$/,"")+(i.action?"?action="+i.action:i.t?"?t="+i.t:"");
return o.indexOf("electroniccardmgr")>=0&&/^addpage|batch$/.test(i.action)&&(a+="&flag="+(i.flag?i.flag:"0")),
o.indexOf("cardstat")>=0&&/^cardstatpage|carddetailstatpage$/.test(i.action)&&(a+="&ispay="+(i.ispay?i.ispay:"0")),
s.transformUrl&&(a=s.transformUrl(n,a)),a;
}
function o(){
s.clickele(this,!0);
}
function i(e){
for(var t=e.target,n=0;4>n&&t&&t!==document.body;){
var r=$(t).attr("data-actionid");
if(r){
s.clickele(t);
break;
}
t=t.parentNode,n++;
}
}
function a(e){
if(s.transformEle){
var t=s.transformEle(e);
if(t)return t;
}
if(e===document)return!1;
if($(e).closest(".col_side").length||$(e).closest("#header").length)return!1;
if(e.isdelegate)return e;
var n=$._data(e,"events"),r=n&&n.click,o=e.tagName.toLowerCase(),i=e.getAttribute("type"),a=e.parentNode.className||"",c=e.className||"";
if(c.indexOf("lbl_content")>=0)return!1;
if((a.indexOf("frm_checkbox_label")>=0||a.indexOf("frm_radio_label")>=0)&&-1===c.indexOf("frm_radio")&&-1===c.indexOf("frm_checkbox"))return!1;
if("input"==o&&("checkbox"==i||"radio"==i))return e.isdelegate=!0,e;
if("label"==o&&c.indexOf("frm_radio_label")>=0||c.indexOf("frm_checkbox_label")>=0)return!1;
var d=e.className||"",a=e.parentNode.className||"";
if(d.indexOf("jsBtLabel")>=0||d.indexOf("jsDropdownBt")>=0){
var l=$(e).closest(".dropdown_menu")[0];
return l.isdelegate=!0,l;
}
if(d.indexOf("jsDropdownItem")>=0||a.indexOf("jsDropdownItem")>=0)return!1;
var f=e.parentNode,u=e.id||"";
if(r&&r.length){
if(0==u.indexOf("calendar_")||0==u.indexOf("dateRangeNextMonth")||0==u.indexOf("dateRangePreMonth"))return!1;
if(c.indexOf("ta_btn")>=0)return e.isdelegate=!0,e;
if(0==u.indexOf("js_dateRangeTitle")||0==u.indexOf("js_dateRangeTrigger")){
var l=$(e).closest(".ta_date").parent()[0];
return l.isdelegate=!0,l.type="daterange",l;
}
return e.isdelegate=!0,e;
}
for(var f=e.parentNode,p=0;f&&f!==document;){
if(n=$._data(f,"events"),r=n&&n.click,r&&r.delegateCount>0)for(var m=0;m<r.length;m++){
var _=r[m].selector;
if($(e).is(_))return e.isdelegate=!0,e;
}
f=f.parentNode,p++;
}
for(var g=3,m=0,h=e;g>m&&h&&h!==document.body;){
if("a"===h.tagName.toLowerCase()){
var b=h.getAttribute("href")||"";
if(0==b.indexOf("javascript:")){
h=h.parentNode;
continue;
}
return void s.clickele(h);
}
h=h.parentNode;
}
for(var h=e.parentNode,m=0;h&&h!==document&&5>m;){
var v=$._data(h,"events"),r=v&&v.click;
if(r&&r.length&&$(h).data("actionid"))return h.isdelegate=!0,h;
h=h.parentNode,m++;
}
return s.notfoundele?s.notfoundele(e):!1;
}
function c(e){
if(e||(e=""),e=$.trim(e),!e)return 0;
e=$.md5(e).substr(0,8).toLowerCase();
for(var t="a".charCodeAt(0),n=0,r=1,o=0;o<e.length;o++){
var i=e[o];
n+=i>="0"&&"9">=i?parseInt(i)*r:(e.charCodeAt(o)-t+10)*r,r*=16;
}
return n;
}
function d(e){
if($(e).attr("data-actionid")){
var t,n,r=$(e).offset();
t=l($(e).text()),t||(t=$(e).attr("data-tooltip")),n||(n=$(e).attr("type"));
var o=e.tagName.toLowerCase();
if("input"===o)("checkbox"==e.type||"radio"==e.type)&&(t=l($(e.parentNode).find(".lbl_content").text()),
r=$(e.parentNode).offset()),"submit"===e.type||"button"===e.type?(n="button",t=e.value):n=e.type||"text";else if($(e).hasClass("dropdown_menu"))n="dropdown",
t=$(e).attr("id");else if("a"===o){
var i=$(e).attr("href");
n=i&&0!==i.indexOf("javascript:")?"link":"btn";
}else"button"===o?n="button":e.className.indexOf("ta_btn")>=0?n="daterange":$(e).hasClass("btn")?n="button":"daterange"==e.type&&(n=e.type,
t=e.id);
s.transformText&&(t=s.transformText(e,t)),s.transformType&&(n=s.transformType(e,n));
for(var a="",d=0;d<s.modulefunc.length;d++){
var f=s.modulefunc[d].call(s,e,n,t);
if(f!==!1&&f&&(a=f),f===!1)return;
}
var u=$(e).attr("data-actionid")||0;
if((t||u)&&(t=a?a+"_"+t:t,t&&t.length>50&&(t=t.substr(0,50)),u||(u=c(t),s.getActionid&&(u=s.getActionid(e,n,t)),
u)))return{
type:n,
text:t,
actionid:u,
offset:r
};
}
}
function l(e){
return $.trim(e).replace(/\r|\n/g,"");
}
var s={
click:function(e){
e=$.extend(!0,{
x:0,
y:0,
inputtype:"",
text:"",
action_id:0
},e),this.send({
url:"/merchant/cardclickreport?action=report&type=1&action_id="+e.action_id+"&inputtype="+e.inputtype+"&x="+e.x+"&y="+e.y+"&text="+encodeURIComponent(e.text||0)
});
},
timeonpage:function(e){
e||(e={}),e.begintime||(e.begintime=this._begintime||this.begintime()),e.begintime&&(e.usetime=+new Date-e.begintime,
this.send({
url:"/merchant/cardclickreport?action=report&time_on_page="+e.usetime+"&type=2&action_id="+(e.actionid||0),
onabort:function(e){
e.store_time();
},
callback:function(){}
}));
}
},f="__time_cache_key__",u=r(location.href)+"__"+Math.random(),p=3e3,m=u+"_end_time";
return s.store_time=function(){
if(n){
var t=this;
t._endtime=+new Date;
var r=t._endtime-t._begintime,o=e(r);
try{
var i=[],a=n.get(f);
a&&(i=a.split("|")),i.indexOf(u)<0&&(i.push(u),n.set(f,i.join("|"))),n.set(m,t._endtime),
n.set(u,o);
}catch(c){
throw c;
}
}
},s.report_store_vals=function(){
if(n)try{
var e=n.get(f);
if(e){
for(var t,r=e.split("|"),o=[],i=0;i<r.length;i++){
t=n.get(r[i]);
var a=n.get(r[i]+"_end_time");
+new Date-parseInt(a)>p?(n.remove(r[i]),n.remove(r[i]+"_end_time"),this.sendurl(t+"&abort=1")):o.push(r[i]);
}
n.set(f,o.join("|"));
}
}catch(c){
throw c;
}
},s.sendurl=function(e){
var t=new Image,n="__timeonpage_report__"+Math.random();
window[n]=t,t.onload=t.onerror=t.onabort=function(){
t.onload=t.onerror=t.onabort=null,window[n]=null;
},t.src=e+wx.data.param;
},s.send=function(e){
var t=new Image,n="__timeonpage_report__"+Math.random(),o=this;
window[n]=t,t.onload=t.onerror=t.onabort=function(){
t.onload=t.onerror=t.onabort=null,window[n]=null,e.callback&&e.callback();
},t.onabort=function(){
t.onload=t.onerror=t.onabort=null,window[n]=null,e.onabort&&e.onabort(o);
},t.src=e.url+"&url="+encodeURIComponent(location.href)+"&page_id="+encodeURIComponent(r(location.href))+wx.data.param+"&from_page_id="+encodeURIComponent(r(document.referrer))+"&referer="+encodeURIComponent(document.referrer)+"&bizuin="+wx.data.uin+"&timestamp="+ +new Date+"&_token="+wx.data.t;
},s.regclick=function(){
$(document).on("click",".js_clickreport",o);
},wx&&!wx.str2int&&(wx.str2int=c),s.hasevent=a,s.click4ie=function(e){
document.addEventListener||this.clickele(e);
},s.clickele=function(t,n){
if((n||$(t).attr("data-actionid"))&&(n||!this.canreport||this.canreport(t))){
var o,i,a="",c=d(t);
if(c){
o=c.text,a=c.type;
var l=c.actionid;
if(i=c.offset,l){
var s=$(".container_box").offset(),f=e(l,1);
f+="&x="+parseInt(i.left-s.left)+"&y="+parseInt(i.top-s.top)+"&text="+encodeURIComponent(o||"")+"&inputtype="+a,
this.sendurl(f),console&&console.log&&(console.log(c),console.log(r(location.href)));
}
}
}
},s.reportele=s.clickele,s.report=function(t){
var n=e(t,1);
n+="&x=0&y=0&text="+encodeURIComponent(t||"")+"&inputtype=",this.sendurl(n);
},window.report_click_ele=function(e){
return s.clickele(e);
},window.report_click=function(e){
return s.report(e);
},s.regcommonclick=function(){
document.addEventListener?document.addEventListener("click",i,!1):$(document).on("click",i);
},s.getparams=function(e){
return d(e);
},window._getreportparams=function(e){
var t=$(e)[0];
return t?s.getParam(t):null;
},s.regtimeonpage=function(){
var e=this;
this._begintime=this.begintime(),$(window).on("unload",function(){
e.timeonpage();
}),setInterval(function(){
e.report_store_vals();
},3e3),this.report_store_vals();
},s.begintime=function(){
return window._points&&window._points[0]||+new Date;
},s.regpv=function(){
var e=this;
setTimeout(function(){
e.click({
action_id:"0",
x:0,
y:0,
text:"",
inputtype:""
});
});
},s.regreport=function(){
s.regclick(),s.regtimeonpage(),s.regpv();
},s.setopt=function(e){
this.transformText=e.transformText,this.transformType=e.transformType,this.transformEle=e.transformEle,
this.transformUrl=e.transformUrl,this.canreport=e.canreport,this.getActionid=e.getActionid,
e.acl&&(this.acl=e.acl),this.notfoundele=e.notfoundele;
},s.modulefunc=[],s.acl={
dialog:!0,
popover:!1
},s.addmodulefunc=function(e){
"function"==typeof e&&s.modulefunc.push(e);
},s;
},o=r();
return o;
});