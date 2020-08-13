define("biz_common/jquery.validate.js",[],function(){
!function(t){
t.extend(t.fn,{
validate:function(e){
if(!this.length)return void(e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));
var i=t.data(this[0],"validator");
return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),
i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){
i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),
void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0);
}),this.submit(function(e){
function r(){
var r;
return i.settings.submitHandler?(i.submitButton&&(r=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),
i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&r.remove(),!1):!0;
}
return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,r()):i.form()?i.pendingRequest?(i.formSubmitted=!0,
!1):r():(i.focusInvalid(),!1);
})),i);
},
valid:function(){
if(t(this[0]).is("form"))return this.validate().form();
var e=!0,i=t(this[0].form).validate();
return this.each(function(){
e=e&&i.element(this);
}),e;
},
removeAttrs:function(e){
var i={},r=this;
return t.each(e.split(/\s/),function(t,e){
i[e]=r.attr(e),r.removeAttr(e);
}),i;
},
rules:function(e,i){
var r=this[0];
if(e){
var n=t.data(r.form,"validator").settings,s=n.rules,a=t.validator.staticRules(r);
switch(e){
case"add":
t.extend(a,t.validator.normalizeRule(i)),delete a.messages,s[r.name]=a,i.messages&&(n.messages[r.name]=t.extend(n.messages[r.name],i.messages));
break;

case"remove":
if(!i)return delete s[r.name],a;
var o={};
return t.each(i.split(/\s/),function(t,e){
o[e]=a[e],delete a[e];
}),o;
}
}
var u=t.validator.normalizeRules(t.extend({},t.validator.classRules(r),t.validator.attributeRules(r),t.validator.dataRules(r),t.validator.staticRules(r)),r);
if(u.required){
var l=u.required;
delete u.required,u=t.extend({
required:l
},u);
}
return u;
}
}),t.extend(t.expr[":"],{
blank:function(e){
return!t.trim(""+t(e).val());
},
filled:function(e){
return!!t.trim(""+t(e).val());
},
unchecked:function(e){
return!t(e).prop("checked");
}
}),t.validator=function(e,i){
this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init();
},t.validator.format=function(e,i){
return 1===arguments.length?function(){
var i=t.makeArray(arguments);
return i.unshift(e),t.validator.format.apply(this,i);
}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),
i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){
e=e.replace(new RegExp("\\{"+t+"\\}","g"),function(){
return i;
});
}),e);
},t.extend(t.validator,{
defaults:{
messages:{},
groups:{},
rules:{},
errorClass:"error",
validClass:"valid",
errorElement:"label",
focusInvalid:!0,
errorContainer:t([]),
errorLabelContainer:t([]),
onsubmit:!0,
ignore:":hidden",
ignoreTitle:!1,
onfocusin:function(t){
this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),
this.addWrapper(this.errorsFor(t)).hide());
},
onfocusout:function(t){
this.checkable(t)||this.element(t);
},
onkeyup:function(t,e){
(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t);
},
onclick:function(t){
t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode);
},
highlight:function(e,i,r){
"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(r):t(e).addClass(i).removeClass(r);
},
unhighlight:function(e,i,r){
"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(r):t(e).removeClass(i).addClass(r);
}
},
setDefaults:function(e){
t.extend(t.validator.defaults,e);
},
messages:{
required:"This field is required.",
remote:"Please fix this field.",
email:"Please enter a valid email address.",
url:"Please enter a valid URL.",
date:"Please enter a valid date.",
dateISO:"Please enter a valid date (ISO).",
number:"Please enter a valid number.",
digits:"Please enter only digits.",
creditcard:"Please enter a valid credit card number.",
equalTo:"Please enter the same value again.",
maxlength:t.validator.format("Please enter no more than {0} characters."),
minlength:t.validator.format("Please enter at least {0} characters."),
rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),
range:t.validator.format("Please enter a value between {0} and {1}."),
max:t.validator.format("Please enter a value less than or equal to {0}."),
min:t.validator.format("Please enter a value greater than or equal to {0}.")
},
autoCreateRanges:!1,
prototype:{
init:function(){
function e(e){
var i=t.data(this[0].form,"validator"),r="on"+e.type.replace(/^validate/,"");
i.settings[r]&&i.settings[r].call(i,this[0],e);
}
this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),
this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),
this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},
this.reset();
var i=this.groups={};
t.each(this.settings.groups,function(e,r){
"string"==typeof r&&(r=r.split(/\s/)),t.each(r,function(t,r){
i[r]=e;
});
});
var r=this.settings.rules;
t.each(r,function(e,i){
r[e]=t.validator.normalizeRule(i);
}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),
this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
},
form:function(){
return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),
this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),
this.valid();
},
checkForm:function(){
this.prepareForm();
for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);
return this.valid();
},
element:function(e){
e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),
this.currentElements=t(e);
var i=this.check(e)!==!1;
return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),
this.showErrors(),i;
},
showErrors:function(e){
if(e){
t.extend(this.errorMap,e),this.errorList=[];
for(var i in e)this.errorList.push({
message:e[i],
element:this.findByName(i)[0]
});
this.successList=t.grep(this.successList,function(t){
return!(t.name in e);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},
resetForm:function(){
t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,
this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
},
numberOfInvalids:function(){
return this.objectLength(this.invalid);
},
objectLength:function(t){
var e=0;
for(var i in t)e++;
return e;
},
hideErrors:function(){
this.addWrapper(this.toHide).hide();
},
valid:function(){
return 0===this.size();
},
size:function(){
return this.errorList.length;
},
focusInvalid:function(){
if(this.settings.focusInvalid)try{
t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}catch(e){}
},
findLastActive:function(){
var e=this.lastActive;
return e&&1===t.grep(this.errorList,function(t){
return t.element.name===e.name;
}).length&&e;
},
elements:function(){
var e=this,i={};
return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),
this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0);
});
},
clean:function(e){
return t(e)[0];
},
errors:function(){
var e=this.settings.errorClass.replace(" ",".");
return t(this.settings.errorElement+"."+e,this.errorContext);
},
reset:function(){
this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),
this.currentElements=t([]);
},
prepareForm:function(){
this.reset(),this.toHide=this.errors().add(this.containers);
},
prepareElement:function(t){
this.reset(),this.toHide=this.errorsFor(t);
},
elementValue:function(e){
var i=t(e).attr("type"),r=t(e).val();
return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof r?r.replace(/\r/g,""):r;
},
check:function(e){
e=this.validationTargetFor(this.clean(e));
var i,r=t(e).rules(),n=!1,s=this.elementValue(e);
for(var a in r){
var o={
method:a,
parameters:r[a]
};
try{
if(i=t.validator.methods[a].call(this,s,e,o.parameters),"dependency-mismatch"===i){
n=!0;
continue;
}
if(n=!1,"pending"===i)return void(this.toHide=this.toHide.not(this.errorsFor(e)));
if(!i)return this.formatAndAdd(e,o),!1;
}catch(u){
throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+o.method+"' method.",u),
u;
}
}
return n?void 0:(this.objectLength(r)&&this.successList.push(e),!0);
},
customDataMessage:function(e,i){
return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase());
},
customMessage:function(t,e){
var i=this.settings.messages[t];
return i&&(i.constructor===String?i:i[e]);
},
findDefined:function(){
for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t];
return void 0;
},
defaultMessage:function(e,i){
return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>");
},
formatAndAdd:function(e,i){
var r=this.defaultMessage(e,i.method),n=/\$?\{(\d+)\}/g;
"function"==typeof r?r=r.call(this,i.parameters,e):n.test(r)&&(r=t.validator.format(r.replace(n,"{$1}"),i.parameters)),
this.errorList.push({
message:r,
element:e
}),this.errorMap[e.name]=r,this.submitted[e.name]=r;
},
addWrapper:function(t){
return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t;
},
defaultShowErrors:function(){
var t,e;
for(t=0;this.errorList[t];t++){
var i=this.errorList[t];
this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),
this.showLabel(i.element,i.message);
}
if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);
if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);
this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show();
},
validElements:function(){
return this.currentElements.not(this.invalidElements());
},
invalidElements:function(){
return t(this.errorList).map(function(){
return this.element;
});
},
showLabel:function(e,i){
var r=this.errorsFor(e);
r.length?(r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
r.html(i)):(r=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),
this.settings.wrapper&&(r=r.hide().show().wrap("<"+this.settings.wrapper+" class='frm_msg fail'/>").parent()),
this.labelContainer.append(r).length||(this.settings.errorPlacement?this.settings.errorPlacement(r,t(e)):r.insertAfter(e))),
!i&&this.settings.success&&(r.text(""),"string"==typeof this.settings.success?r.addClass(this.settings.success):this.settings.success(r,e)),
this.toShow=this.toShow.add(r);
},
errorsFor:function(e){
var i=this.idOrName(e);
return this.errors().filter(function(){
return t(this).attr("for")===i;
});
},
idOrName:function(t){
return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name);
},
validationTargetFor:function(t){
return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),
t;
},
checkable:function(t){
return/radio|checkbox/i.test(t.type);
},
findByName:function(e){
return t(this.currentForm).find("[name='"+e+"']");
},
getLength:function(e,i){
switch(i.nodeName.toLowerCase()){
case"select":
return t("option:selected",i).length;

case"input":
if(this.checkable(i))return this.findByName(i.name).filter(":checked").length;
}
return e.length;
},
depend:function(t,e){
return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0;
},
dependTypes:{
"boolean":function(t){
return t;
},
string:function(e,i){
return!!t(e,i.form).length;
},
"function":function(t,e){
return t(e);
}
},
optional:function(e){
var i=this.elementValue(e);
return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch";
},
startRequest:function(t){
this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0);
},
stopRequest:function(e,i){
this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],
i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),
this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),
this.formSubmitted=!1);
},
previousValue:function(e){
return t.data(e,"previousValue")||t.data(e,"previousValue",{
old:null,
valid:!0,
message:this.defaultMessage(e,"remote")
});
}
},
classRuleSettings:{
required:{
required:!0
},
email:{
email:!0
},
url:{
url:!0
},
date:{
date:!0
},
dateISO:{
dateISO:!0
},
number:{
number:!0
},
digits:{
digits:!0
},
creditcard:{
creditcard:!0
}
},
addClassRules:function(e,i){
e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e);
},
classRules:function(e){
var i={},r=t(e).attr("class");
return r&&t.each(r.split(" "),function(){
this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this]);
}),i;
},
attributeRules:function(e){
var i={},r=t(e),n=r[0].getAttribute("type");
for(var s in t.validator.methods){
var a;
"required"===s?(a=r.get(0).getAttribute(s),""===a&&(a=!0),a=!!a):a=r.attr(s),/min|max/.test(s)&&(null===n||/number|range|text/.test(n))&&(a=Number(a)),
a?i[s]=a:n===s&&"range"!==n&&(i[s]=!0);
}
return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,
i;
},
dataRules:function(e){
var i,r,n={},s=t(e);
for(i in t.validator.methods)r=s.data("rule-"+i.toLowerCase()),void 0!==r&&(n[i]=r);
return n;
},
staticRules:function(e){
var i={},r=t.data(e.form,"validator");
return r.settings.rules&&(i=t.validator.normalizeRule(r.settings.rules[e.name])||{}),
i;
},
normalizeRules:function(e,i){
return t.each(e,function(r,n){
if(n===!1)return void delete e[r];
if(n.param||n.depends){
var s=!0;
switch(typeof n.depends){
case"string":
s=!!t(n.depends,i.form).length;
break;

case"function":
s=n.depends.call(i,i);
}
s?"string"!=typeof n&&(e[r]=void 0!==n.param?n.param:!0):delete e[r];
}
}),t.each(e,function(r,n){
e[r]=t.isFunction(n)?n(i):n;
}),t.each(["minlength","maxlength"],function(){
e[this]&&(e[this]=Number(e[this]));
}),t.each(["rangelength","range"],function(){
var i;
e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),
e[this]=[Number(i[0]),Number(i[1])]));
}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,
delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],
delete e.minlength,delete e.maxlength)),e;
},
normalizeRule:function(e){
if("string"==typeof e){
var i={};
t.each(e.split(/\s/),function(){
i[this]=!0;
}),e=i;
}
return e;
},
addMethod:function(e,i,r){
t.validator.methods[e]=i,t.validator.messages[e]=void 0!==r?r:t.validator.messages[e],
i.length<3&&t.validator.addClassRules(e,t.validator.normalizeRule(e));
},
methods:{
required:function(e,i,r){
if(!this.depend(r,i))return"dependency-mismatch";
if("select"===i.nodeName.toLowerCase()){
var n=t(i).val();
return n&&n.length>0;
}
return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0;
},
email:function(t,e){
return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t);
},
url:function(t,e){
return this.optional(e)||/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t);
},
date:function(t,e){
return this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString());
},
dateISO:function(t,e){
return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t);
},
number:function(t,e){
return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t);
},
digits:function(t,e){
return this.optional(e)||/^\d+$/.test(t);
},
creditcard:function(t,e){
if(this.optional(e))return"dependency-mismatch";
if(/[^0-9 \-]+/.test(t))return!1;
var i=0,r=0,n=!1;
t=t.replace(/\D/g,"");
for(var s=t.length-1;s>=0;s--){
var a=t.charAt(s);
r=parseInt(a,10),n&&(r*=2)>9&&(r-=9),i+=r,n=!n;
}
return i%10===0;
},
minlength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||n>=r;
},
maxlength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||r>=n;
},
rangelength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||n>=r[0]&&n<=r[1];
},
min:function(t,e,i){
return this.optional(e)||t>=i;
},
max:function(t,e,i){
return this.optional(e)||i>=t;
},
range:function(t,e,i){
return this.optional(e)||t>=i[0]&&t<=i[1];
},
equalTo:function(e,i,r){
var n=t(r);
return this.settings.onfocusout&&n.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
t(i).valid();
}),e===n.val();
},
remote:function(e,i,r){
if(this.optional(i))return"dependency-mismatch";
var n=this.previousValue(i);
if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),n.originalMessage=this.settings.messages[i.name].remote,
this.settings.messages[i.name].remote=n.message,r="string"==typeof r&&{
url:r
}||r,n.old===e)return n.valid;
n.old=e;
var s=this;
this.startRequest(i);
var a={};
return a[i.name]=e,t.ajax(t.extend(!0,{
url:r,
mode:"abort",
port:"validate"+i.name,
dataType:"json",
data:a,
success:function(r){
s.settings.messages[i.name].remote=n.originalMessage;
var a=r===!0||"true"===r;
if(a){
var o=s.formSubmitted;
s.prepareElement(i),s.formSubmitted=o,s.successList.push(i),delete s.invalid[i.name],
s.showErrors();
}else{
var u={},l=r||s.defaultMessage(i,"remote");
u[i.name]=n.message=t.isFunction(l)?l(e):l,s.invalid[i.name]=!0,s.showErrors(u);
}
n.valid=a,s.stopRequest(i,a);
}
},r)),"pending";
}
}
}),t.format=t.validator.format;
}(jQuery),function(t){
var e={};
if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,r){
var n=t.port;
"abort"===t.mode&&(e[n]&&e[n].abort(),e[n]=r);
});else{
var i=t.ajax;
t.ajax=function(r){
var n=("mode"in r?r:t.ajaxSettings).mode,s=("port"in r?r:t.ajaxSettings).port;
return"abort"===n?(e[s]&&e[s].abort(),e[s]=i.apply(this,arguments),e[s]):i.apply(this,arguments);
};
}
}(jQuery),function(t){
t.extend(t.fn,{
validateDelegate:function(e,i,r){
return this.bind(i,function(i){
var n=t(i.target);
return n.is(e)?r.apply(n,arguments):void 0;
});
}
});
}(jQuery),function(t){
t.validator.defaults.errorClass="frm_msg_content",t.validator.defaults.errorElement="span",
t.validator.defaults.errorPlacement=function(t,e){
e.parent().after(t);
},t.validator.defaults.wrapper="p",t.validator.messages={
required:"必选字段",
remote:"请修正该字段",
email:"请输入正确格式的电子邮件",
url:"请输入合法的网址",
date:"请输入合法的日期",
dateISO:"请输入合法的日期 (ISO).",
number:"请输入合法的数字",
digits:"只能输入整数",
creditcard:"请输入合法的信用卡号",
equalTo:"请再次输入相同的值",
accept:"请输入拥有合法后缀名的字符串",
maxlength:t.validator.format("请输入一个长度最多是 {0} 的字符串"),
minlength:t.validator.format("请输入一个长度最少是 {0} 的字符串"),
rangelength:t.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
range:t.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
max:t.validator.format("请输入一个最大为 {0} 的值"),
min:t.validator.format("请输入一个最小为 {0} 的值")
},function(){
function e(t){
var e,i=0;
"x"==t[17].toLowerCase()&&(t[17]=10);
for(var r=0;17>r;r++)i+=n[r]*t[r];
return e=i%11,t[17]==s[e]?!0:!1;
}
function i(t){
var e=t.substring(6,10),i=t.substring(10,12),r=t.substring(12,14),n=new Date(e,parseFloat(i)-1,parseFloat(r));
return(new Date).getFullYear()-parseInt(e)<18?!1:n.getFullYear()!=parseFloat(e)||n.getMonth()!=parseFloat(i)-1||n.getDate()!=parseFloat(r)?!1:!0;
}
function r(r){
if(r=t.trim(r.replace(/ /g,"")),15==r.length)return!1;
if(18==r.length){
var n=r.split("");
return i(r)&&e(n)?!0:!1;
}
return!1;
}
var n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],s=[1,0,10,9,8,7,6,5,4,3,2];
t.validator.addMethod("idcard",function(t){
return r(t);
},"身份证格式不正确，或者年龄未满18周岁，请重新填写"),t.validator.addMethod("mobile",function(e){
return e=t.trim(e),/^1\d{10}$/.test(e);
},"请输入正确的手机号码"),t.validator.addMethod("telephone",function(e){
return e=t.trim(e),/^\d{1,4}(-\d{1,12})+$/.test(e);
},"请输入正确的座机号码，如020-12345678"),t.validator.addMethod("verifycode",function(e){
return e=t.trim(e),/^\d{6}$/.test(e);
},"验证码应为6位数字"),t.validator.addMethod("byteRangeLength",function(t,e,i){
return this.optional(e)||t.len()<=i[1]&&t.len()>=i[0];
},"_(必须为{0}到{1}个字节之间)");
}();
}(jQuery);
var t={
optional:function(){
return!1;
},
getLength:function(t){
return t?t.length:0;
}
},e=$.validator;
return e.rules={},$.each(e.methods,function(i,r){
e.rules[i]=function(e,i){
return r.call(t,e,null,i);
};
}),e;
});define("common/wx/preview.js",["common/wx/Tips.js","widget/img_preview.css","tpl/preview.html.js"],function(t,n,i){
"use strict";
var e=t("common/wx/Tips.js"),r=(t("widget/img_preview.css"),t("tpl/preview.html.js")),m=function(t){
this._initData(t),this._render(),this._initEvent();
};
m.prototype={
_moImgData:[],
_msTmplHtml:r,
_moCurrentImgIdx:0,
_initData:function(t){
return this._moImgData=t.imgdata||[],this._moCurrentImgIdx="undefined"==typeof t.current?0:"number"==typeof t.current?t.current:this._inArray(t.current,t.imgdata),
this._moImgData.length<1?void this._throwErr():((this._moCurrentImgIdx<0||this._moCurrentImgIdx>=this._moImgData.length)&&(this._moCurrentImgIdx=0),
void(this._moCfg={
view:this._moImgData.length>1?!0:!1,
imgsrc:this._moImgData[this._moCurrentImgIdx].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx].downsrc,
prev:this._moCurrentImgIdx-1>-1?!0:!1,
next:this._moCurrentImgIdx+1<this._moImgData.length?!0:!1
}));
},
_render:function(){
$(template.compile(this._msTmplHtml)(this._moCfg)).appendTo("body");
},
_prev:function(){
this._moCurrentImgIdx>0&&($.extend(this._moCfg,{
imgsrc:this._moImgData[this._moCurrentImgIdx-1].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx-1].downsrc,
prev:this._moCurrentImgIdx-1>0?!0:!1,
next:!0
}),this._changeImg(),this._moCurrentImgIdx--);
},
_next:function(){
this._moCurrentImgIdx+1<this._moImgData.length&&($.extend(this._moCfg,{
imgsrc:this._moImgData[this._moCurrentImgIdx+1].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx+1].downsrc,
next:this._moCurrentImgIdx+2<this._moImgData.length?!0:!1,
prev:!0
}),this._moCurrentImgIdx++,this._changeImg());
},
_changeImg:function(){
var t=$("#img_opr_container");
this._moCfg.next?t.removeClass("next_disabled"):t.addClass("next_disabled"),this._moCfg.prev?t.removeClass("prev_disabled"):t.addClass("prev_disabled"),
$("#img_dom").hide(),$("#loading_dom").show(),$("#img_dom").find("img").attr("src",""),
$("#img_dom").find("img").attr("src",this._moCfg.imgsrc),$("#btndown").attr("href",this._moCfg.downsrc);
},
_destory:function(){
$(".preview_mask").remove(),$("#preview_container").remove();
},
_throwErr:function(){
alert("系统错误，请重试");
},
_initEvent:function(){
var t=this;
$("#preview_container").on("click",function(n){
var i=n.srcElement||n.target;
$.contains($("#img_container")[0],i)||$.contains($("#img_opr_container")[0],i)||t._destory();
}),$("#closebtn").on("click",function(){
return t._destory(),!1;
}),$("#btnview").on("click",function(){
return""!=t._moCfg.imgsrc?window.open(t._moCfg.imgsrc):e.err("图片资源加载失败。"),!1;
}),$("#btnnext").on("click",function(){
t._next();
}),$("#btnprev").on("click",function(){
t._prev();
}),$(document).keyup(function(n){
27==n.keyCode&&t._destory(),37==n.keyCode&&t._prev(),39==n.keyCode&&t._next();
}),$("#img_dom").find("img").on("load",function(){
$("#img_dom").show(),$("#loading_dom").hide();
});
},
_inArray:function(t,n){
for(var i,e=0;i=n[e];e++)if(t==i.imgsrc)return e;
return-1;
}
},i.exports={
close:function(){
m._destory();
},
show:function(t){
return new m(t);
}
};
});define("tpl/cardticket/config_url_item.html.js",[],function(){
return'<div class="appmsg_edit_item">\n{if item.url_type == 1}\n    <label class="frm_label">\n        <strong class="title">图文消息</strong>\n    </label>\n	<div class="frm_controls">\n		<!--Begin app masg-->\n        {if item.url_match_type}\n        {if item.appmsg}\n		<div class="appmsg single appmsg_card">\n\n			<div class="appmsg_content">\n				<div class="appmsg_info">\n                    <em class="appmsg_date">{item.appmsg.update_time}</em>\n				</div>\n                <div class="appmsg_item">\n                    <h4 class="appmsg_title">\n                        <a class="js_link_url" href="{item.appmsg.link}" target="_blank">{item.appmsg.title}</a>\n                    </h4>\n                    <div class="appmsg_thumb_wrp" style="background-image:url(\'{item.appmsg.cover}\')"></div>\n                    <p class="appmsg_desc">{item.appmsg.digest}</p>\n                    {if item.appmsg.type == 10}\n                    <a href="" class="edit_mask preview_mask js_preview" data-msgid="{item.appmsg.appmsgid}" data-idx="{item.appmsg.itemidx-1}">\n                        <div class="edit_mask_content">\n                            <p class="">\n                            预览文章                            </p>\n                        </div>\n                        <span class="vm_box"></span>\n                    </a>\n                    {/if}\n                </div>\n			</div>\n\n        </div>\n        {else}\n        <a class="config_link js_link_url" href="{item.url}" target="_blank">{item.url}</a>\n        {/if}\n        {/if}\n        <a class="btn btn_default js_select_appmsg" href="javascript:;">选择图文消息</a>\n	</div>\n{else if item.url_type == 2}\n    <label class="frm_label">\n        <strong class="title">卡券货架</strong>\n    </label>\n	<div class="frm_controls">\n        <a class="config_link js_link_url" href="{item.url}" target="_blank">{if item.url_match_type}{item.url}{/if}</a>\n		<a class="btn btn_default js_select_card_shelf" href="javascript:;">选择卡券货架</a>\n	</div>\n{else if item.url_type == 3}\n    <label class="frm_label">\n        <strong class="title">小店货架</strong>\n    </label>\n	<div class="frm_controls">\n        <a class="config_link js_link_url" href="{item.url}" target="_blank">{if item.url_match_type}{item.url}{/if}</a>\n		<a shelf_type="2" class="btn btn_default js_select_shop_shelf" href="javascript:;">选择小店货架</a>\n	</div>\n{else if item.url_type == 4}\n    <label class="frm_label">\n        <strong class="title">网页链接</strong>\n    </label>\n	<div class="frm_controls">\n		<span class="frm_hint">http://</span>\n		<span class="frm_input_box url_box">\n			<input type="text" value="{item.url}" class="frm_input js_link_url">\n		</span>\n    </div>\n    <!--\n    <p class="frm_tips">表单提示</p>\n	<p class="frm_msg fail">\n		<span class="frm_msg_content">表单验证消息 失败</span>\n    </p>\n    -->\n{/if}\n</div>\n';
});define("tpl/cardticket/config_url.html.js",[],function(){
return'{each data.config_url as url}<div class="editor_section edit_section_url js_appmsg_url_item" data-idx="{url.idx}">\n    <h3 class="title js_card_title">\n        <p><span class="js_appmsg_url_intro">入口{if url.cur_idx==1}一{else if url.cur_idx==2}二{else if url.cur_idx==3}三{/if}</span>\n        <a class="link js_delete_item" href="javascript:;">删除</a>\n        </p>\n    </h3>\n    <div class="">\n        <div class="frm_control_group  frm_card_extend frm_normal">\n            <label for="" class="frm_label">\n                <strong class="title">入口名称</strong>\n            </label>\n            <span class="frm_input_box">\n                <input type="text" value="{url.name}" target=".js_url_title_{url.idx}" data-maxlength="10" class="frm_input js_maxlength js_custom_url_name">\n            </span> \n            <span class="tips"><span class="js_url_title_{url.idx}">0</span>/5</span>\n        </div>\n        <div class="frm_control_group frm_normal frm_card_extend">\n            <label for="" class="frm_label">\n                <strong class="title">引导语                    <span class="tips">(选填)</span>\n                </strong>\n            </label>\n            <span class="frm_input_box">\n                <input type="text" value="{url.tips}" target=".js_url_desc_{url.idx}" data-maxlength="6" class="frm_input js_maxlength js_custom_url_desc">\n            </span>\n            <span class="tips"><span class="js_url_desc_{url.idx}">0</span>/6</span>\n        </div>\n        <div class="frm_control_group js_jump_url_p frm_card_extend">\n            <label for="" class="frm_label">点击跳转</label>\n            <div class="frm_controls frm_vertical_lh">\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">图文消息</span>\n                    <input type="radio" data-v="1" {if url.url_type==1}checked{/if} name="js_jump_url_{url.idx}" class="frm_radio js_jump_appmsg">\n                </label>\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">卡券货架</span>\n                    <input type="radio" data-v="2"  {if url.url_type==2}checked{/if} name="js_jump_url_{url.idx}"  class="frm_radio js_jump_card_shelf">\n                </label>\n                {if can_merchant}\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">小店货架</span>\n                    <input type="radio" data-v="3"  {if url.url_type==3}checked{/if} name="js_jump_url_{url.idx}" class="frm_radio js_jump_shop_shelf">\n                </label>\n                {/if}\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">网页链接</span>\n                    <input type="radio" data-v="4" {if url.url_type==4}checked{/if} name="js_jump_url_{url.idx}" class="frm_radio js_jump_custom_url">\n                </label>\n            </div>\n        </div>\n        <div class="js_appmsg_edit_item_p">\n        </div>\n    </div>\n</div>\n{/each}\n';
});define("tpl/cardticket/create_card_shop_tips.html.js",[],function(){
return'{if dispose_method == 1}<!--买单-->\n	{if access_deny}\n		<p class="fail">尚未开通门店，无法使用自助买单，你可以：</p>\n		<p>1. 去门店小程序，<a href="javascript:void(0);" class="js_add_shop1" data-info="access_deny">开通权限</a></p>\n	{else if all_shop_count == 0}\n		<p class="fail">尚未新建门店，无法使用自助买单，你可以：</p>\n		<p>1. 去门店管理，<a href="javascript:void(0);" class="js_add_shop1" {if is_from_wxapoi}data-info="from_wxapoi"{/if}>新建门店</a>，并给新建的门店配核销员</p>\n	{else if selected_shop_count == 0}\n		<p class="fail">尚未选择门店，无法使用自助买单，你可以：</p>\n		<p>1. 选择“全部门店适用”</p>\n		<p>2. 或选择“指定门店适用”并“添加适用门店”</p>\n	{else if wepay_shop_count == 0}\n		<p class="fail">门店未设置核销员，无法使用自助买单，你可以：</p>\n		<p>1. 去“卡券核销”给门店<a href="javascript:void(0);" class="js_add_consumer">配置核销员</a></p>\n		<p>2. 或改选其他核销方式</p>\n	{else if selected_wepay_shop_count == 0}\n		<p class="fail">所选门店未设置核销员，无法使用自助买单，你可以：</p>\n		<p>1. 选择带核销员的门店，<a href="javascript:void(0);" class="js_reselect_shop">重新选择门店</a></p>\n		<p>2. 或改选其他核销方式</p>\n	{/if}\n{else if dispose_method==2}\n	{if access_deny}\n		<p class="fail">尚未开通门店，无法使用自助核销，你可以：</p>\n		<p>1. 去门店小程序，<a href="javascript:void(0);" class="js_add_shop1" data-info="access_deny">开通权限</a></p>\n	{else if all_shop_count == 0}\n		<p class="fail">尚未新建门店，无法使用自助核销，你可以：</p>\n		<p>1. 去门店管理，<a href="javascript:void(0);" class="js_add_shop1" {if is_from_wxapoi}data-info="from_wxapoi"{/if}>新建门店</a></p>\n	{else if selected_shop_count == 0}\n		<p class="fail">尚未选择门店，无法使用自助核销，你可以：</p>\n		<p>1. 选择“全部门店适用”</p>\n		<p>2. 或选择“指定门店适用”并“添加适用门店”</p>\n	{/if}\n{else if dispose_method==3}\n{else if dispose_method==4}<!--刷卡-->\n{/if}';
});define("cardticket/select_shop_popup.js",["cardticket/select_shop.js","common/wx/popup.js","common/wx/Tips.js"],function(t){
"use strict";
function e(t){
this.opt=$.extend(!0,{},p,t);
var e=this,t=this.opt;
this.opt.buttons=[],t.hasnext&&this.opt.buttons.push({
text:"取消",
type:"default",
click:function(){
this.remove();
}
}),this.opt.buttons.push({
text:t.hasnext?"下一步":"完成",
click:function(){
var o={},p=e.shop_select.values(o);
return o.nostore||p&&p.length?t.selectLimit&&p.length>+t.selectLimit?void s.err("超过选择的数量限制："+t.selectLimit):(this.hide(),
void e.opt.selectComplete(p,o)):void s.err("请选择门店");
},
type:"primary"
});
var i=t.onHide;
this.opt.onHide=function(){
this.remove(),"function"==typeof i&&i.call(e);
},e.$popup=$("<div class='js_shop_popup_container'></div>").popup(t),t.container=e.$popup.popup("get").find(".js_shop_popup_container");
var n=t.initComplete;
t.initComplete=function(){
e.$popup.popup("resetPosition"),"function"==typeof n&&n.call(e);
},t.selectAll=function(){
e.$popup.popup("hide");
var t={},o=this.values(t);
e.opt.selectComplete(o,t);
},this.shop_select=new o(t);
}
var o=t("cardticket/select_shop.js"),p=(t("common/wx/popup.js"),{
autoShow:!1,
title:"选择门店",
hasnext:!1,
selectComplete:$.noop
}),s=t("common/wx/Tips.js");
return e.prototype={
show:function(){
this.$popup.popup("show");
},
getData:function(){
return this.shop_select.opt.data;
},
getCacheData:function(){
return this.shop_select.cache_data;
}
},e;
});define("common/wx/pagebar.js",["widget/pagination.css","tpl/pagebar.html.js","common/qq/Class.js","common/wx/Tips.js"],function(t,e){
"use strict";
var i,n,s,a=(t("widget/pagination.css"),t("tpl/pagebar.html.js")),r=t("common/qq/Class.js"),h=t("common/wx/Tips.js");
s=template.compile(a),i=e,n={
first:"首页",
last:"末页",
prev:"上页",
next:"下页",
startPage:1,
initShowPage:1,
perPage:10,
startRange:1,
midRange:3,
endRange:1,
totalItemsNum:0,
container:"",
callback:null,
isNavHide:!1,
isSimple:!0
};
var o=function(t,e,i){
var n;
return n=t+(e-1),n=n>i?i:n;
},g=function(t,e,i){
var n;
return n=i%2===0?e-(i/2-1):e-(i-1)/2,n=t>n?t:n;
},u=function(t,e,i){
var n;
return n=e%2===0?parseInt(t)+e/2:parseInt(t)+(e-1)/2,n=n>i?i:n;
},c=function(t,e,i){
var n;
return n=e-(i-1),n=t>n?t:n;
},l=function(t,e){
if(e[t]&&isNaN(e[t]))throw new Error("Invalid arguments: "+t+" should be a number");
},p=function(t){
if(l("perPage",t),l("totalItemsNum",t),l("startPage",t),l("startRange",t),l("midRange",t),
l("endRange",t),l("initShowPage",t),void 0!==t.callback&&null!==t.callback&&!$.isFunction(t.callback))throw new Error("Invalid arguments: callback should be a function");
},d=function(t,e,i){
var n=t.container.find(".page_"+i);
if("string"==typeof e){
var s=$(e);
0!==s.length&&(n=s);
}else{
if(e!==!1)throw new Error("Invalid Paramter: '"+i+"' should be a string or false");
n.hide();
}
return n;
},P=r.declare({
init:function(t){
if(t.totalItemsNum){
var e;
if(p(t),e=$.extend(!0,{},n,t),this._init(e),e.initShowPage<e.startPage)throw new Error("Invalid arguments: initShowPage should be larger than startPage");
if(e.initShowPage>e.endPage)throw new Error("Invalid arguments: initShowPage should be smaller than endPage");
this.paginate();
}
},
_init:function(t){
this.currentPage=t.initShowPage,this._isNextButtonShow=!0,this._isPrevButtonShow=!0,
this.uid="wxPagebar_"+ +new Date,this.initEventCenter(),this.optionsForTemplate={},
$.extend(this,t),this.container=$(t.container),this.optionsForTemplate.isSimple=t.isSimple,
this.optionsForTemplate.firstButtonText=0===$(t.first).length?t.first:n.first,this.optionsForTemplate.lastButtonText=0===$(t.last).length?t.last:n.last,
this.optionsForTemplate.nextButtonText=0===$(t.next).length?t.next:n.next,this.optionsForTemplate.prevButtonText=0===$(t.prev).length?t.prev:n.prev,
this.optionsForTemplate.isNavHide=t.isNavHide,this.generatePages(parseInt(this.totalItemsNum)),
this.gapForStartRange=this.container.find(".gap_prev"),this.gapForEndRange=this.container.find(".gap_next"),
this.firstButton=d(this,t.first,"first"),this.lastButton=d(this,t.last,"last"),this.prevButton=d(this,t.prev,"prev"),
this.nextButton=d(this,t.next,"next"),this.bindEvent();
},
initEventCenter:function(){
this.eventCenter={
eventList:[],
bind:function(t,e){
this.eventList[t]||(this.eventList[t]=[]),this.eventList[t].push(e);
},
trigger:function(t){
var e,i;
this.eventList[t]||(this.eventList[t]=[]),e=this.eventList[t];
for(var n=0;n<e.length;n++)if(i=Array.prototype.slice.call(arguments,1),e[n].apply(this,i)===!1)return!1;
},
unbind:function(t,e){
if(!this.eventList)throw new Error("The eventList was undefined");
if(!this.eventList[t])throw new Error("The event type "+t+" was not found");
if(void 0===e)this.eventList[t]=[];else for(var i=this.eventList[t],n=i.length,s=0;n>s;s++)if(i[s]===e){
i.splice(s,1);
break;
}
}
};
},
generatePages:function(t){
var e,i,n,a,r,h;
for(this.pageNum=Math.ceil(t/this.perPage),this.endPage=this.startPage+this.pageNum-1,
this.gapForStartRange=null,this.gapForEndRange=null,this.optionsForTemplate.startRange=[],
this.optionsForTemplate.midRange=[],this.optionsForTemplate.endRange=[],i=o(this.startPage,this.startRange,this.endPage),
n=g(this.startPage,this.currentPage,this.midRange),a=u(this.currentPage,this.midRange,this.endPage),
r=c(this.startPage,this.endPage,this.endRange),i>=r&&(r=i+1),e=this.startPage;i>=e;e+=1)this.optionsForTemplate.startRange.push(e);
for(var l=0,e=n;l<this.midRange;l+=1,e+=1)this.optionsForTemplate.midRange.push(e);
for(e=r;e<=this.endPage;e+=1)this.optionsForTemplate.endRange.push(e);
this.optionsForTemplate.endPage=this.endPage,this.optionsForTemplate.initShowPage=this.initShowPage,
h=s(this.optionsForTemplate),this.container.html(h),1==this.pageNum?this.container.hide():this.container.show(),
this.pages=this.container.find(".page_nav"),this.midPages=this.container.find(".js_mid"),
this.labels=this.container.find(".page_num label"),this.container.find(".pagination").attr("id",this.uid);
},
paginate:function(){
var t,e,i,n,s,a,r,h,l,p;
if(this.isSimple===!0)for(var d=0,P=this.labels.length;P>d;d++)d%2===0&&$(this.labels[d]).html(this.currentPage);else{
e=o(this.startPage,this.startRange,this.endPage),a=g(this.startPage,this.currentPage,this.midRange),
r=u(this.currentPage,this.midRange,this.endPage),h=c(this.startPage,this.endPage,this.endRange),
e>=h&&(h=e+1),e>=a&&(a=e+1),r>=h&&(r=h-1),this.pages.show(),this.pages.removeClass("current"),
p=parseInt(this.midPages.length/this.midRange);
for(var d=0,P=p;P>d;d++){
for(s=0,t=a;r>=t;t+=1)n=this.midRange*d+(t-a),l=$(this.midPages[n]),l.html(t),s+=1,
t==this.currentPage&&l.addClass("current");
for(n=this.midRange*d+s;s<this.midRange;s+=1)l=$(this.midPages[n]),l.hide(),l.removeClass("current"),
n+=1;
}
for(var d=0,P=this.pages.length;P>=d;d++)i=$(this.pages[d]),t=parseInt(i.html()),
t===parseInt(this.currentPage)&&i.addClass("current");
if(a>e+1?this.gapForStartRange.show():this.gapForStartRange.hide(),h>r+1?this.gapForEndRange.show():this.gapForEndRange.hide(),
this.isNavHide){
for(var d=this.startPage;d<=this.endPage;d+=1)this.pages.hide();
this.gapForStartRange.hide(),this.gapForEndRange.hide();
}
}
this.checkButtonShown();
},
destroy:function(){
this.container.off("click","#"+this.uid+" a.page_nav"),this.container.off("click","#"+this.uid+" a.page_go"),
this.container.off("keydown","#"+this.uid+" .goto_area input"),this.nextButton.off("click"),
this.prevButton.off("click"),this.firstButton.off("click"),this.lastButton.off("click");
},
bindEvent:function(){
this.container.on("click","#"+this.uid+" a.page_nav",this.proxy(function(t){
var e=$(t.target);
return e.hasClass("current")?!1:(this.clickPage(parseInt(e.html())),!1);
},this)),this.nextButton.on("click",this.proxy(function(t){
$(t.target);
return this.nextPage(),!1;
},this)),this.prevButton.on("click",this.proxy(function(t){
$(t.target);
return this.prevPage(),!1;
},this)),this.firstButton.on("click",this.proxy(function(t){
$(t.target);
return this.goFirstPage(),!1;
},this)),this.lastButton.on("click",this.proxy(function(t){
$(t.target);
return this.goLastPage(),!1;
},this)),this.container.on("click","#"+this.uid+" a.page_go",this.proxy(function(t){
var e=$(t.target).prev();
return this.goPage(e.val()),!1;
},this)),this.container.on("keydown","#"+this.uid+" .goto_area input",this.proxy(function(t){
return wx.isHotkey(t,"enter")?(this.container.find("a.page_go").click(),!1):void 0;
},this));
},
on:function(t,e){
this.eventCenter.bind(t,this.proxy(e,this));
},
callbackFunc:function(t){
var e={
currentPage:this.currentPage,
perPage:this.perPage,
count:this.pageNum
};
return $.isFunction(this.callback)&&this.callback(e)===!1?!1:this.eventCenter.trigger(t,e)===!1?!1:void this.paginate();
},
proxy:function(t,e){
return function(){
var i=Array.prototype.slice.call(arguments,0);
return t.apply(e,i);
};
},
nextPage:function(){
this.currentPage!==this.endPage&&(this.currentPage++,this.callbackFunc("next")===!1&&this.currentPage--);
},
prevPage:function(){
this.currentPage!==this.startPage&&(this.currentPage--,this.callbackFunc("prev")===!1&&this.currentPage++);
},
goFirstPage:function(){
var t=this.currentPage;
this.currentPage=this.startPage,this.callbackFunc("goFirst")===!1&&(this.currentPage=t);
},
goLastPage:function(){
var t=this.currentPage;
this.currentPage=this.endPage,this.callbackFunc("goLast")===!1&&(this.currentPage=t);
},
checkButtonShown:function(){
+this.currentPage===+this.startPage?this.hidePrevButton():this.showPrevButton(),
+this.currentPage===+this.endPage?this.hideNextButton():this.showNextButton();
},
goPage:function(t){
var e=this.currentPage,t=Math.round(t);
return t===this.currentPage?!1:isNaN(t)?(h.err("请输入正确的页码"),!1):""===t?!1:t<this.startPage?(h.err("请输入正确的页码"),
!1):t>this.endPage?(h.err("请输入正确的页码"),!1):(this.currentPage=t,void(this.callbackFunc("go")===!1&&(this.currentPage=e)));
},
clickPage:function(t){
var e=this.currentPage;
isNaN(t)&&(t=this.startPage),this.currentPage=t<this.startPage?this.startPage:t>this.endPage?this.endPage:t,
this.callbackFunc("click")===!1&&(this.currentPage=e);
},
showNextButton:function(){
this.nextButton&&this._isNextButtonShow===!1&&(this.nextButton.show(),this._isNextButtonShow=!0);
},
showPrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!1&&(this.prevButton.show(),this._isPrevButtonShow=!0);
},
hideNextButton:function(){
this.nextButton&&this._isNextButtonShow===!0&&(this.nextButton.hide(),this._isNextButtonShow=!1);
},
hidePrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!0&&(this.prevButton.hide(),this._isPrevButtonShow=!1);
}
});
return e=P;
});define("media/appmsg_temp_url.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(t){
"use strict";
var i=t("common/wx/Cgi.js"),e=t("common/wx/Tips.js");
return function(t,n){
$(t).on("click",n,function(t){
if(!$(this).attr("href")&&!$(this).find("a").attr("href")){
t.preventDefault();
var n=window.open();
i.get({
url:"/cgi-bin/appmsg?action=get_temp_url",
data:{
appmsgid:$(this).data("msgid"),
itemidx:$(this).data("idx")+1
}
},function(t){
t.base_resp&&0==t.base_resp.ret?n&&n.location&&(n.location.href=t.temp_url):(e.err("生成临时链接失败，请重试"),
n.close());
});
}
});
};
});define("homepage/appmsgdialog.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/time.js","common/wx/pagebar.js","common/wx/popup.js","tpl/homepage/appmsgdialog.html.js","tpl/homepage/appmsglist.html.js"],function(t,e,a){
"use strict";
function i(t){
return this._init(t),this;
}
var s=t("common/wx/Cgi.js"),n=t("common/wx/Tips.js"),c=(t("biz_web/ui/checkbox.js"),
t("common/wx/time.js")),l=(wx.T,t("common/wx/pagebar.js")),o=(t("common/wx/popup.js"),
t("tpl/homepage/appmsgdialog.html.js")),g=t("tpl/homepage/appmsglist.html.js");
i.prototype._init=function(t){
var e=this;
this.perPage=t.perPage||10,this._cfg=t,this._cfg.selectData=[],"undefined"==typeof this._cfg.multi&&(this._cfg.multi=!0),
"undefined"==typeof this._cfg.maxNum&&1==this._cfg.multi&&(this._cfg.maxNum=1e4),
this.dlgtpl=this._cfg.dlgtpl||o,this.msglisttpl=this._cfg.msglisttpl||g;
var a=this._mDlg=e._buildDialog(),i=a.find(".js_appmsg_tab"),s=a.find(".js_mass_tab"),n=a.find(".js_appmsg_container"),c=a.find(".js_mass_container");
i.click(function(){
i.addClass("selected"),s.removeClass("selected"),n.show(),c.hide();
}),s.click(function(){
i.removeClass("selected"),s.addClass("selected"),n.hide(),c.show();
}),this._bindEvent(this._mDlg);
},i.prototype._buildList=function(t,e,a,i,s){
var c=this,l=this._formatData(e,s);
a=a||".js_listContainer",i=i||".js_loading";
var o=t.find(a),g=t.find(i);
o.html(template.compile(this.msglisttpl)({
app_msg_list:l,
multi:c._cfg.multi
})).show(),g.hide();
o.find(".js_appmsgid").checkbox({
multi:c._cfg.multi,
onChanged:function(t){
if(c._cfg.multi===!0){
if(t[0].checked)c._cfg.selectData.length>=c._cfg.maxNum?($(t[0]).checkbox().checked(!1),
n.err("最多只能选择%s篇文章".sprintf(c._cfg.maxNum))):$.each(l,function(e,a){
a.aid==t[0].value&&c._cfg.selectData.push(l[e]);
});else{
var e=[];
$.each(c._cfg.selectData,function(a){
c._cfg.selectData[a].aid!=t[0].value&&e.push(c._cfg.selectData[a]);
}),c._cfg.selectData=e;
}
c._countTotal(c._cfg.maxNum-c._cfg.selectData.length);
}else c._cfg.selectData=[],$.each(l,function(e,a){
a.aid==t[0].value&&c._cfg.selectData.push(l[e]);
});
}
});
},i.prototype._countTotal=function(t){
0==this._cfg.multi&&this._mDlg.find(".global_extra").hide(),t>=0?this._mDlg.find(".js_remaincnt").text(t):n.err("最多只能选择30篇文章");
},i.prototype._getData=function(t,e,a,i){
if("undefined"!=typeof this._mDlg){
a=a||".js_listContainer",i=i||".js_loading";
var c=this._mDlg.find(a),l=this._mDlg.find(i);
l.show(),c.hide();
}
var o=this,g=$.extend({
action:"list_ex",
begin:0,
count:o.perPage,
type:e&&e.type?e.type:10,
link:o._cfg.link||0,
query:""
},e);
s.post({
url:"/cgi-bin/appmsg",
data:g,
success:function(e){
e&&0==e.base_resp.ret?(o.retData=e.app_msg_list,o.totalnum=e.app_msg_cnt,t(e)):n.err("系统错误");
}
});
},i.prototype._formatData=function(t,e){
var a=[];
return t&&t.app_msg_list&&(a=t.app_msg_list),$.each(this._cfg.selectData,function(t,e){
$.each(a,function(t,i){
e.aid==i.aid&&(a[t].checkbox=!0);
});
}),$.each(a,function(t,i){
a[t].update_time=c.formatDate(new Date(1e3*i.update_time),"YYYY年MM月DD日"),a[t].type=e||10;
}),a;
},i.prototype._buildDialog=function(){
var t=this,e=$(this.dlgtpl).popup({
title:t._cfg.title||"从素材管理中选择",
buttons:[{
text:"确定",
click:function(){
t._cfg.selectData.length>0&&(1==t._cfg.multi&&t._cfg.selectData.length<=t._cfg.maxNum||0==t._cfg.multi)?(t._cb(t._cfg.selectData),
e.popup("remove")):0==t._cfg.selectData.length?n.err("请选择至少一篇图文"):1==t._cfg.multi&&t._cfg.selectData.length>t._cfg.maxNum&&n.err("最多只能选择30篇文章");
},
type:"primary"
},{
text:"取消",
click:function(){
e.popup("remove");
},
type:"default"
}],
mask:!0,
className:"align_edge"
});
return this._getData(function(a){
t._buildList(e,a),t._initPageBar({
totalnum:t.totalnum,
perpage:t.perPage,
currentpage:1
});
}),this._getData(function(a){
t._buildList(e,a,".js_masslistContainer",".js_mass_loading",9),t._initMassPageBar({
totalnum:t.totalnum,
perpage:t.perPage,
currentpage:1
});
},{
type:9
}),e;
},i.prototype._bindEvent=function(t){
var e=this;
t.find(".js_a_search").on("click",function(){
var a=$.trim(t.find(".js_search").val());
e._getData(function(a){
e._buildList(t,a),e._initPageBar({
totalnum:e.totalnum,
perpage:e.perPage,
currentpage:1
});
},{
query:a
});
}),t.find(".js_search").keyup(function(e){
var a="which"in e?e.which:e.keyCode;
console.log(t.find(".js_search").val()),(13==a||""==t.find(".js_search").val())&&t.find(".js_a_search").trigger("click");
}),e._countTotal(e._cfg.maxNum);
},i.prototype._initPageBar=function(t){
{
var e=this,a=this._mDlg.find(".js_search").val(),i=t&&t.currentpage,s=t&&t.perpage,n=t&&t.totalnum;
new l({
container:e._mDlg.find(".js_pager"),
perPage:s,
initShowPage:i,
totalItemsNum:n,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var n=t.currentPage;
n!=i&&(i=n,e._getData(function(t){
e._buildList(e._mDlg,t);
},{
begin:(i-1)*s,
query:a
}));
}
});
}
},i.prototype._initMassPageBar=function(t){
{
var e=this,a=t&&t.currentpage,i=t&&t.perpage,s=t&&t.totalnum;
new l({
container:e._mDlg.find(".js_masspager"),
perPage:i,
initShowPage:a,
totalItemsNum:s,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
var s=t.currentPage;
s!=a&&(a=s,e._getData(function(t){
e._buildList(e._mDlg,t,".js_masslistContainer",".js_mass_loading",9);
},{
begin:(a-1)*i,
type:9
},".js_masslistContainer",".js_mass_loading"));
}
});
}
},i.prototype._cb=function(t){
this._cfg&&this._cfg.callback&&"function"==typeof this._cfg.callback&&this._cfg.callback(t);
},a.exports=i;
});define("cardticket/send_card.js",["common/wx/popup.js","common/wx/Step.js","cardticket/send_card_table.js","tpl/cardticket/send_card.html.js"],function(e){
"use strict";
var t=(e("common/wx/popup.js"),{
removeOnHide:!0,
view_mode:window.view_mode||0
}),p=(e("common/wx/Step.js"),function(e){
this.opt=$.extend(!0,{},t,e),this.init();
}),o=e("cardticket/send_card_table.js");
return p.prototype={
_html:e("tpl/cardticket/send_card.html.js"),
init:function(){
var e=this.opt,t=this,p=$(template.compile(this._html)()).popup({
title:"选择卡券",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
t.sendCardTable.select();
}
},{
text:"取消",
type:"default",
click:function(){
t.sendCardTable.isLoading()||this.hide();
}
}],
onHide:function(){
e.onHide&&e.onHide.call(t),e.removeOnHide&&this.remove();
},
className:"send_card align_edge",
width:960
});
if(this.$send_popup=p,e.container=this.$send_popup,e.pageChanged=function(){
t.$send_popup.popup("resetPosition");
},e.getDataComplete=function(){
t.$send_popup.popup("resetPosition");
},e.selectComplete){
var n=e.selectComplete;
e.selectComplete=function(){
n.call(t,arguments[0],arguments[1],arguments[2]),t.hide();
};
}else e.selectComplete=function(){
t.hide();
};
e.hidePopup=function(){
t.$send_popup.popup("hide");
},this.sendCardTable=new o(e);
},
show:function(){
this.$send_popup.popup("show"),this.$send_popup.popup("resetPosition");
},
hide:function(){
this.$send_popup.popup("hide");
},
destroy:function(){
this.$send_popup.popup("remove");
}
},p;
});define("cardticket/select_shelf.js",["tpl/cardticket/select_shelf.html.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js","page/cardticket/dialog_select_goods_shelf.css"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$popup.popup("get"),e.find(".dialog_bd").html(s({
loading:!0
})),t.$popup.popup("resetPosition");
}
function o(t,o){
var n=o.opt,i=$.extend(!0,{
action:"get_shelflist",
offset:n.pageInfo.begin,
count:n.pageInfo.count
},n.param);
d=!0,e(o),l.get({
url:n.url||"/merchant/cardshelf",
data:i,
complete:function(){
d=!1;
}
},function(t){
0==t.base_resp.ret||-1==t.base_resp.ret?(t=$.parseJSON(t.data),n.data=t.shelves,
n.pageInfo.total_count=t.total_cnt||0,a(n.pageInfo,o)):l.show(t);
});
}
function n(t,e){
for(var o=0;o<t.length;o++)if(t[o].id==e)return t[o];
return null;
}
function a(t,e){
var o,n=e.opt;
return o=e.$popup.popup("get"),o.find(".dialog_bd").html(s(n)),e.$popup.popup("resetPosition"),
n.data.length?($(o.find(".js_btn_p")[0]).removeClass("btn_disabled"),e.pagebar=null,
p(n.pageInfo,e),void i(e,n.data,o)):($(o.find(".js_btn_p")[0]).addClass("btn_disabled"),
void i(e,n.data,o));
}
function i(t,e,o){
for(var n=t.opt,a=0;a<e.length;a++)!function(t){
var e=$("#js_shelf_item_"+t);
l.get({
url:(n.render_url||"/merchant/cardshelf?action=render&shelf_id=")+t,
mask:!1,
error:function(){}
},function(t){
t.shelf_info&&t.shelf_info.template&&(e.append(t.shelf_info.template.http2https()),
e.find(".shop_modele_mask").remove(),e.find("a").attr("href","javascript:;"));
});
}(e[a].id);
$(".js_add_shelf",o).click(function(){
var e=t.opt;
1==e.shelf_type?window.open(wx.url("/merchant/cardshelf?action=get_shelflist&offset=0&count=5")):2==e.shelf_type&&window.open(wx.url("/merchant/shelf?action=choose"));
}),$(".js_shelf_item_p").click(function(){
$(".js_shelf_item_p").removeClass("selected"),$(this).addClass("selected");
}),t.$popup.popup("resetPosition");
}
function p(t,e){
var n=t.total_count,a=e.$popup.popup("get");
if(t.count&&n>t.count){
var i=t.begin/t.count;
e.pagebar=new c({
container:$(".js_pager",a),
first:!1,
last:!1,
midRange:5,
initShowPage:i+1,
perPage:t.count,
totalItemsNum:n,
callback:function(n){
if(d)return!1;
var a=n.currentPage;
return a!=i+1&&(t.begin=(a-1)*t.count,o(t,e)),!0;
}
});
}
}
{
var s=t("tpl/cardticket/select_shelf.html.js"),l=(t("common/wx/popup.js"),t("common/wx/Cgi.js")),c=t("common/wx/pagebar.js"),r=t("common/wx/Tips.js");
t("biz_web/ui/checkbox.js");
}
t("cardticket/common_template_helper.js"),t("page/cardticket/dialog_select_goods_shelf.css"),
s=template.compile(s);
var u={
multi:!1,
pageInfo:{
begin:0,
count:2,
total_count:0
},
param:{},
url:null,
data:null,
selectComplete:$.noop,
onHide:$.noop,
title:"选择卡券货架"
},f=function(t){
this.opt=$.extend(!0,{},u,t),this.init();
},d=!1;
return f.prototype={
init:function(){
var t=this.opt,e=this;
e.$popup=$(s({
loading:!0
})).popup({
autoShow:!1,
title:t.title,
width:960,
onOK:function(){
if(!t.data||!t.data.length)return!0;
var o=this.get(),a=o.find(".js_shelf_item_p.selected");
if(a=a.find(".js_shelf_item"),!a.length)return r.err("请选择货架"),!0;
var i=a.attr("data-id"),p={},s=n(t.data,i);
s&&(p=s),t.selectComplete.call(e,i,p);
},
onCancel:function(){},
onHide:function(){
this.remove(),t.onHide.call(e);
},
className:"dialog_select_shelf"
}),t.data?a(t.pageInfo,e):o(t.pageInfo,e);
},
show:function(){
this.$popup.popup("show");
},
destroy:function(){
this.$popup.popup("remove");
}
},f;
});define("cardticket/parse_data.js",["cardticket/add/member_info_flag.js"],function(e){
"use strict";
function _(e){
var _=u[e.card_type]||e.card_type;
switch(_+=""){
case"2":
e=e.discount;
break;

case"1":
e=e.groupon;
break;

case"3":
e=e.gift;
break;

case"4":
e=e.cash;
break;

case"0":
e=e.general_coupon;
break;

case"10":
e=e.member_card;
break;

case"21":
e=e.scenic_ticket;
break;

case"22":
e=e.movie_ticket;
break;

default:
e=e.general_coupon||e.coupon;
}
return e?(e.type=_,e):null;
}
function t(e,_){
return"number"!=typeof e&&(e=praseFloat(e),isNaN(e))?0:(_||(_=2),parseFloat(e.toFixed(_)));
}
function i(e){
var _=/^https?:\/\/mp.weixin.qq.com\/s/,t=/^http:\/\/mp.weixin.qq.com\/bizmall\/cardshelf/,i=/^http:\/\/mp.weixin.qq.com\/bizmall\/mallshelf/;
return _.test(e)?1:t.test(e)?2:i.test(e)?3:4;
}
function s(e){
return e?(e+"").html(!1):"";
}
function o(e){
var _=e.url||"",t=e.url_type;
return 4==t?_.replace("http://",""):s(_);
}
function n(e){
var n={},e=_(e);
if(!e)return null;
a(n,e),a(n,e.base_info),n.background_pic_url=e.background_pic_url;
var r=e.base_info.date_info||{};
n.time_type=f[r.type]||r.type,1==n.time_type&&(n.begin_time=r.begin_timestamp,n.end_time=r.end_timestamp),
n.from_day=r.fixed_begin_term||0,n.fixed_term=r.fixed_term||30,n.quantity=e.base_info.sku.quantity,
n.shop_id_list=e.base_info.shop_id_list,n.location_id_list=e.base_info.location_id_list;
var u=l[n.code_type];
if(n.code_type="undefined"!=typeof u?u:n.code_type,"undefined"==typeof n.code_type&&(n.code_type=1),
n.least_cost=e.least_cost&&e.least_cost/100,n.reduce_cost=e.reduce_cost&&e.reduce_cost/100,
"0"==n.least_cost&&(n.least_cost=""),n.discount=n.discount&&(100-n.discount)/10,
n.detail=1==n.type?n.deal_detail:n.default_detail,/^http/.test(n.logo_url)||(n.logo_url=""),
n.shop_type||(n.shop_type=n.location_id_list&&n.location_id_list.length?2:3),n.auto_update_new_location&&(n.shop_type=1),
n.isnew=n.func_flag?!!(16&n.func_flag):!1,n.ispay=n.func_flag?64&n.func_flag:!1,
n.func_flag&&(n.show_in_nearby=!1),n.ispay&&(n.can_share=!0),n.ispay&&(n.detail=n.detail?n.detail.replace(/\n微信价：.*?元$/gm,""):""),
n.price=t(e.base_info.sku.price/100),n.original_price=t(e.base_info.sku.original_price/100),
1==n.create_source&&(n.isnew=!0),1==n.time_type&&n.end_time<new Date/1e3&&(n.is_expire=!0),
n.is_intercomm=16384&n.func_flag,"undefined"!=typeof e.base_info.task_info&&(n.is_from_intercomm=!0,
n.task_info=e.base_info.task_info),n.is_from_intercomm&&(n.isnew=!0),n.status=m[n.status]||n.status,
n.discount&&(n.supply_discount=!0),10==n.type){
var d=[];
if(n.promotion_url_name){
var p={
name:n.promotion_url_name,
tips:n.promotion_url_sub_title,
url:n.promotion_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
e.custom_cell1&&(e.custom_cell1.url_type=i(e.custom_cell1.url),e.custom_cell1.url=o(e.custom_cell1),
d.push(e.custom_cell1)),e.custom_cell2&&(e.custom_cell2.url_type=i(e.custom_cell2.url),
e.custom_cell2.url=o(e.custom_cell2),d.push(e.custom_cell2)),n.config_url=d;
var y=e.required_info||{
info_flag:0
},g=e.optional_info||{
info_flag:0
};
n.require_keywords=c.flag2info(y.info_flag),n.option_keywords=c.flag2info(g.info_flag),
n.require_self_keywords=y.field_list,n.option_self_keywords=g.field_list,n.must_activate=!n.auto_activate,
n.supply_discount&&(n.prerogative=n.prerogative.replace(/^用卡可享受.*?折优惠\n/,"")),n.quantity="--",
n.can_modify=(e.required_info?e.required_info.can_modify:!1)||(e.optional_info?e.optional_info.can_modify:!1),
n.supply_balance=e.supply_balance;
}else{
var d=[];
if(n.custom_url_name){
var p={
name:n.custom_url_name,
tips:n.custom_url_sub_title,
url:n.custom_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
n.config_url=d;
}
var b=e.base_info;
if(10==n.type)var h=e.modify_msg_operation||{
_notexist:!0
};else var h=b.consume_msg_operation||{
_notexist:!0
};
n.msg_operation=h.url_cell||h.card_cell||{
_notexist:!0
},n.msg_operation._notexist||(n.msg_operation._type=n.msg_operation.card_id?5:i(n.msg_operation.url),
n.msg_operation.url&&(n.msg_operation.url=s(n.msg_operation.url))),n.msg_operation.endtime=n.msg_operation.end_time,
n.bonus_rule=e.bonus_rule||{},n.bonus_rule.init_bonus=n.bonus_rule.init_increase_bonus,
n.bonus_rule.cost_money_unit=n.bonus_rule.cost_money_unit&&n.bonus_rule.cost_money_unit/100,
n.bonus_rule.reduce_money=n.bonus_rule.reduce_money&&n.bonus_rule.reduce_money/100,
n.bonus_rule.least_money_to_use_bonus=n.bonus_rule.least_money_to_use_bonus&&n.bonus_rule.least_money_to_use_bonus/100,
b.sub_merchant_info&&(n.sub_merchant_id=b.sub_merchant_info.merchant_id);
var v=e.advanced_info;
if(n.use_hours=[],v){
n.is_sns_card=1==v.gen_type,n.orig_time_limit=v.time_limit||[],n.text_image_list=v.text_image_list||[],
n.time_limit=[];
var T={};
if(v.time_limit)for(var E=0;E<v.time_limit.length;E++){
var w=v.time_limit[E];
T[w.type]||(T[w.type]=!0,n.time_limit.push(w));
}
1!=n.create_source&&v.time_limit&&v.time_limit.length&&v.time_limit[0].end_hour&&(n.use_hours.push(v.time_limit[0]),
v.time_limit.length>1&&v.time_limit[0].type==v.time_limit[1].type&&n.use_hours.push(v.time_limit[1])),
n.consume_share_self_num=v.consume_share_self_num,n.consume_share_self_num>0?(n.consume_is_share=!0,
n.consume_share_type=1):v.consume_share_card_list&&v.consume_share_card_list.length?(n.consume_is_share=!0,
n.consume_share_type=2,n.consume_share_card_id=v.consume_share_card_list[0].card_id):n.consume_is_share=!1,
n.business_service=v.business_service;
var A=v.abstract;
A&&($(".section_card_intro").show(),n.abstract=A.abstract,n.cover_logo=A.icon_url_list?A.icon_url_list[0]:"");
}
if(n.is_quit_money=n.func_flag&1<<22,n.can_edit_quantity=!(n.is_quit_money||10==n.type||n.is_from_intercomm||(3!=n.status&&5!=n.status&&6!=n.status||!n.is_sns_card||n.is_expire)&&n.is_sns_card),
n.is_sns_card&&(n.isnew=!0),n.isnew||(n.quantity="--"),3==n.type&&n.is_sns_card){
n.gift_title=n.title;
var k=v.use_condition;
n.title=k?k.least_cost?"满%s送%s".sprintf(k.least_cost/100,n.gift_title):k.object_use_for?"买%s送%s".sprintf(k.object_use_for,n.gift_title):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:""):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:"");
}
n.pay_info=b.pay_info&&b.pay_info.swipe_card||{};
var S=65536&n.func_flag;
if(S)n.dispose_method=1;else{
var D=n.func_flag&1<<24;
n.pay_info.is_swipe_card?(n.dispose_method=4,n.code_type=1e4):D?(n.dispose_method=2,
n.code_type=1e4):n.dispose_method=3;
}
var C=n.pay_info;
if(C.auditing_info_list||(C.auditing_info_list=[]),C.is_swipe_card){
var R=C.auditing_info_list;
if(R.length){
var q=R[R.length-1];
if(C.swipe_card_status=0==q.mid_list.length?1:1==q.ret?C.is_active?0:3:2,q.trans_buff){
var I=q.trans_buff.html(!1);
try{
I=$.parseJSON(I);
}catch(x){
I="";
}
q.trans_buff=I,C.last_audit_item=q;
}
}else C.swipe_card_status=0==n.quantity?4:0;
}
!C.is_swipe_card||1!=C.swipe_card_status&&3!=C.swipe_card_status||(n.can_edit_quantity=!1),
v&&v.consume_cell_info&&(n.need_verify_code=v.consume_cell_info.need_verify_code,
n.need_remark=v.consume_cell_info.need_remark),n._can_global_edit=!n.is_from_intercomm&&(!n.is_sns_card||n.is_sns_card&&!n.is_expire&&(3==n.status||5==n.status||6==n.status)||n.is_sns_card&&(1==n.status||2==n.status));
var k=v&&v.use_condition;
return k&&(n.use_condition_least_cost=k.least_cost/100||"",n.accept_category=k.accept_category,
n.reject_category=k.reject_category,n.can_use_with_other_discount=k.can_use_with_other_discount,
n.can_use_with_membercard=k.can_use_with_membercard,n.object_use_for=k.object_use_for,
n.has_condition=k.least_cost||k.object_use_for||k.accept_category||k.reject_category||!k.can_use_with_other_discount,
3==n.type&&(n.use_condition_least_cost_type=n.object_use_for?2:1)),n.is_sns_card&&3==n.type&&(n.has_condition=!0),
n;
}
function a(e,_){
for(var t in _)_.hasOwnProperty(t)&&"object"!=typeof _[t]&&(e[t]=_[t]);
return e;
}
function r(e){
for(var _={},t=[],i=0;i<e.length;i++){
var s=n(e[i]);
s&&(_[s.id]=s,t.push(s));
}
return{
card_cache:_,
card_list:t
};
}
var c=e("cardticket/add/member_info_flag.js"),u={
DISCOUNT:"2",
MEMBER_CARD:"10",
GROUPON:"1",
GIFT:"3",
CASH:"4",
GENERAL_COUPON:"0",
SCENIC_TICKET:"21",
MOVIE_TICKET:"22"
},l={
CODE_TYPE_TEXT:0,
CODE_TYPE_BARCODE:1,
CODE_TYPE_QRCODE:2
},m={
CARD_STATUS_INIT:0,
CARD_STATUS_NOT_VERIFY:1,
CARD_STATUS_VERIFY_FAIL:2,
CARD_STATUS_VERIFY_OK:3,
CARD_STATUS_DELETE:4,
CARD_STATUS_SYS_DELETE:5,
CARD_STATUS_DISPATCH:6,
CARD_STATUS_SYS_OFF_SHELF:7,
CARD_STATUS_EXPIRED:8
},f={
DATE_TYPE_FIX_TIME_RANGE:1,
DATE_TYPE_FIX_TERM:2,
DATE_TYPE_PERMANENT:100
};
return{
parse_cardticket:n,
parse_cardlist:r,
url_type:i
};
});define("common/wx/media/imageDialog.js",["biz_web/ui/checkbox.js","common/wx/popover.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","common/wx/pagebar.js","biz_web/utils/upload.js","common/wx/tooltips.js","tpl/media/dialog/image_layout.html.js","tpl/media/dialog/image_list.html.js","tpl/media/dialog/image_group.html.js","tpl/media/dialog/add_group.html.js","tpl/media/dialog/image_water.html.js","page/media/dialog_img_pick.css"],function(e){
"use strict";
var i=(e("biz_web/ui/checkbox.js"),e("common/wx/popover.js")),t=e("common/wx/Cgi.js"),o=e("common/wx/Tips.js"),n=(e("common/wx/popup.js"),
e("common/wx/pagebar.js")),r=e("biz_web/utils/upload.js"),a=e("common/wx/tooltips.js"),l=e("tpl/media/dialog/image_layout.html.js"),s=e("tpl/media/dialog/image_list.html.js"),p=e("tpl/media/dialog/image_group.html.js"),d=e("tpl/media/dialog/add_group.html.js"),c=e("tpl/media/dialog/image_water.html.js"),g=(template.render,
template.compile(d)),u=template.compile(p),m=template.compile(s),f={
popover:null
};
e("page/media/dialog_img_pick.css");
var _=function(e){
return new h(e);
},h=function(e){
this.options=e,this.events=[],this.imgArr=[],this.converting=0,this.fromUpload=[],
v.init.call(this);
},v={
init:function(){
var e=this,i=e.options=$.extend(!0,{
tpl:l,
title:"选择图片",
scene:"cdn",
maxSelect:1,
perPage:10,
group:0,
uploadGroupId:1,
coverPicCheckbox:!1,
coverPic:0,
onOK:null,
onCancel:null
},e.options);
i.tpl=template.compile(i.tpl)(i),e.on("ok",function(e){
!!f.popover&&f.popover.remove(),this.destroy(),"function"==typeof i.onOK&&i.onOK.call(this,e);
}),e.on("cancel",function(){
!!f.popover&&f.popover.remove(),this.destroy(),"function"==typeof i.onCancel?i.onCancel.call(this):"function"==typeof i.onHide&&i.onHide.call(this);
}),e.on("hide",function(){
!!f.popover&&f.popover.remove(),this.destroy(),"function"==typeof i.onHide&&i.onHide.call(this);
}),e.dialog=$(i.tpl.trim()).popup({
title:i.title,
className:"img_dialog_wrp",
width:846,
buttons:[{
text:"确定",
type:"disabled",
click:function(){
var t=this.get().find(".js_btn").eq(0).parent();
return t.hasClass("btn_disabled")?void o.err("请选择图片"):(e.popup=this,$.each(e.imgArr,function(i,t){
t.source=-1!=e.fromUpload.indexOf(t.file_id+"")?"upload":"lib",e.options.coverPicCheckbox&&(t.coverPic=e.popup.get().find(".js_show_cover_pic").checkbox("value")||"");
}),void("cdn"==i.scene&&e.converting>0?(t.btn(!1),e.on("converted",function(){
0==e.converting&&(e.trigger("ok",e.imgArr||[]),t.btn(!0));
})):e.trigger("ok",e.imgArr||[])));
}
},{
text:"取消",
click:function(){
e.trigger("cancel");
}
}],
onHide:function(){
e.trigger("hide");
}
});
var t=e.dialog.popup("get");
t.find(".js_show_cover_pic").checkbox(),t.find(".js_loading").show(),j.getImagesByGroupId({
group_id:i.group,
count:i.perPage
},function(t){
if(e.dialog){
var o=t.page_info;
o.scene=i.scene,o.group=i.group;
var n=e.dialog.popup("get"),r=u(o);
n.find(".js_loading").hide(),n.find(".js_group").append(r).find(".js_total").text("(%s)".sprintf(o.file_cnt.img_cnt)),
v.renderImageList(n.find(".js_list"),o,e.imgArr),v.initEvent.call(e,t),v.initWater.call(e,o),
v.initPageBar.call(e,o,i.group),e.dialog.popup("resetPosition");
}
}),v.initUpload.call(e,i.group);
},
initEvent:function(){
var e=this,i=e.dialog.popup("get"),t=e.options;
i.on("click",".js_imageitem",function(){
var n,r=$(this),a=r.find("label"),l=i.find(".js_btn_p").eq(0),s=r.data("url"),p=r.data("id"),d=r.data("oristatus"),c=r.data("format");
a.hasClass("selected")?(s||e.converting--,a.removeClass("selected"),n=b.indexOf(e.imgArr,p),
n>=0&&e.imgArr.splice(n,1),i.find(".js_selected").text(e.imgArr.length)):1==t.maxSelect?(s||(e.converting=1),
a.addClass("selected"),r.siblings().find("label").removeClass("selected"),e.imgArr=[{
url:s,
file_id:p,
format:c,
copyright_status:d
}],i.find(".js_selected").text(e.imgArr.length)):t.maxSelect>e.imgArr.length?(s||e.converting++,
a.addClass("selected"),e.imgArr.push({
url:s,
file_id:p,
format:c,
copyright_status:d
}),i.find(".js_selected").text(e.imgArr.length)):o.err("最多可选%s张".sprintf(t.maxSelect)),
e.imgArr.length>0?l.enable().addClass("btn_primary"):l.disable(),"cdn"==t.scene&&a.hasClass("selected")&&!s&&j.getCdnUrlByFileId({
file_id:p,
group_id:i.find(".js_groupitem.selected").data("groupid")
},function(i){
0==i.errcode?(e.converting--,r.data("url",i.url),n=b.indexOf(e.imgArr,p),n>=0&&(e.imgArr[n].url=i.url),
e.trigger("converted")):(o.err("转存失败"),r.click());
});
}),i.on("click",".js_creategroup",function(){
v.createPopover.call(e,{
dom:this,
content:g({}),
ok:function(){
v.createGroup.call(e);
}
});
}),i.on("click",".js_groupitem",function(o,n){
var r=$(this),a=i.find(".js_list"),l=i.find(".js_loading"),s=i.find(".js_pagebar"),p=r.data("groupid");
r.hasClass("selected")||(r.addClass("selected").siblings(".selected").removeClass("selected"),
$(".js_imageupload").data("groupid",p),a.hide(),s.hide(),l.show(),j.getImagesByGroupId({
group_id:p,
count:t.perPage
},function(o){
if(e.dialog&&p==i.find(".js_groupitem.selected").data("groupid")){
o=o.page_info,o.scene=t.scene,l.hide(),s.show(),v.renderImageList(a,o,e.imgArr),
v.initPageBar.call(e,o,p),v.initUpload.call(e);
for(var r=0;n&&"upload"==n.source&&r<n.count;++r)a.children().eq(r).click();
}
}));
});
},
createPopover:function(e){
!!f.popover&&f.popover.remove(),f.popover=new i({
dom:e.dom,
content:e.content,
margin:"center",
place:"bottom",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove(),e.ok.call(this);
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
},
createGroup:function(){
var e=this,i=f.popover.$pop,n=i.find(".jsPopoverBt").eq(0),r=i.find("input").val().trim();
return r.length<1||r.length>6?void o.err("分组名字为1-6个字符"):(n.btn(0),void t.post({
url:wx.url("/cgi-bin/filepage"),
data:{
action:"create_group",
name:r
},
mask:!1
},function(i){
var t=i.base_resp.ret;
if(0==t){
var a=e.options;
j.getImagesByGroupId({
group_id:a.group,
count:a.perPage
},function(i){
if(e.dialog){
var t=i.page_info;
t.group=1;
for(var o=0,n=t.file_group_list.file_group.length;n>o;o++){
var a=t.file_group_list.file_group[o];
a.name==r&&(t.group=a.id);
}
var l=e.dialog.popup("get"),s=l.find(".js_list"),p=u(t);
l.find(".js_group").html(p),v.renderImageList(s,{
file_item:[]
},e.imgArr),v.initPageBar.call(e,t,t.group),l.find(".js_imageupload").data("groupid",t.group),
v.initUpload.call(e,t.group);
}
});
}else 15006==t?(o.err("已经超过100个分组，不能再创建新的分组。"),n.btn(!0)):(o.err("创建失败，请重试"),n.btn(!0));
}));
},
initPageBar:function(e,i){
var t=this,o=t.dialog.popup("get"),r=t.options;
v.pagebar&&v.pagebar.destroy();
var a=0;
return 0==i?a=e.file_cnt.img_cnt:e.file_group_list.file_group.each(function(e){
e.id==i&&(a=e.count);
}),r.perPage>=a?void o.find(".js_pagebar").empty():void(v.pagebar=new n({
container:o.find(".js_pagebar"),
perPage:r.perPage,
initShowPage:1,
totalItemsNum:a,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=o.find(".js_groupitem.selected").data("groupid"),n=o.find(".js_list"),a=o.find(".js_loading"),l=o.find(".js_pagebar");
n.hide(),l.hide(),a.show(),j.getImagesByGroupId({
group_id:i,
begin:e.perPage*(e.currentPage-1),
count:r.perPage
},function(e){
e=e.page_info,e.scene=r.scene,a.hide(),l.show(),v.renderImageList(n,e,t.imgArr);
});
}
}));
},
initUpload:function(e){
var i=this,t=i.dialog.popup("get"),n=t.find(".js_imageupload"),a="js_imageupload"+Math.random().toString().substr(2),l=i.options,s=t.find(".js_groupitem.selected").data("groupid")||e;
s=s?s:l.uploadGroupId,n.attr("id",a).off().children().remove(),r.uploadImageLibFile({
container:"#"+a,
only_cdn:l.only_cdn,
multi:!0,
type:2,
scene:l.uploadScene,
doublewrite:!0,
groupid:s,
onComplete:function(e,t,n,r){
0==r.base_resp.ret&&o.suc("上传成功"),i.fromUpload.push(r.content);
},
onAllComplete:function(e,i){
var o=t.find(".js_groupitem.selected"),n=t.find(".js_groupitem[data-groupid="+s+"]");
if(i.filesUploaded>0)if(!l.doselected||l.doselected&&i.filesUploaded<=1*l.completeUploadMinSelectNum?o.removeClass("selected").trigger("click",{
source:"upload",
count:i.filesUploaded
}):o.removeClass("selected").trigger("click",{
source:"upload",
count:0
}),n.length>0&&o.length>0&&n[0]===o[0]){
var r=+o.find("span").text();
o.find("span").text(r+i.filesUploaded);
}else{
var r=+o.find("span").text();
o.find("span").text(r+i.filesUploaded);
var a=+n.find("span").text();
n.find("span").text(a+i.filesUploaded);
}
},
showError:!0
});
},
initWater:function(e){
var i=this,t=i.options,o=i.dialog.popup("get"),n=e.watermark_status,r=template.compile(c)({
status:n,
set_water_url:wx.url("/cgi-bin/settingpage?t=setting/function&action=function&set_water=1")
});
o.find(".js_water").text((t.desc?"，":"")+(3==n?"已关闭":"已开启")+"图片水印"),new a({
container:o.find(".js_water_tips"),
content:r,
parentClass:"js_water img_water",
position:{
left:-138,
top:2
},
reposition:!0,
type:"hover"
});
},
renderImageList:function(e,i,t){
i.file_item.each(function(e){
e.img_url=e.cdn_url?e.cdn_url:wx.url("/cgi-bin/getimgdata?mode=small&source=file&fileId=%s".sprintf(e.file_id)),
-1!=b.indexOf(t,e.file_id)&&(e.selected=1);
}),e.html(m(i)).show();
var o=0,n=0,r=28308,a=28308,l=9,s=10,p=0,d=117,c=$(".js_pic"),g=c.length,u="";
c.each(function(){
var e=$(this);
e.on("error",function(){
++o,++p,u=u+e.attr("src")+" ",p===g&&((new Image).src="/mp/jsmonitor?idkey="+r+"_"+l+"_"+o+";"+a+"_"+s+"_"+n+"&lc=1&log0=[errorurl]["+encodeURIComponent(u)+"]");
}),e.on("load",function(){
++n,++p;
var i=parseInt(e.css("width")),t=parseInt(e.css("height"));
if(t>i?e.css("width",d):e.css("height",d),p===g){
var c="/mp/jsmonitor?idkey="+r+"_"+l+"_"+o+";"+a+"_"+s+"_"+n;
o>0&&(c=c+"&lc=1&log0=[errorurl]["+encodeURIComponent(u)+"]"),(new Image).src=c;
}
}),e.attr("src",e.attr("data-src"));
});
}
},j={
getImagesByGroupId:function(e,i){
e=$.extend({
group_id:1,
begin:0,
count:8,
type:2
},e),t.get({
url:wx.url("/cgi-bin/filepage"),
data:e,
mask:!1
},function(e){
0!=e.base_resp.ret?t.show(e):i(e);
});
},
getCdnUrlByFileId:function(e,i){
e.group_id=e.group_id||1,t.post({
url:wx.url("/cgi-bin/uploadimg2cdn?action=duplicate"),
data:e,
mask:!1
},function(e){
i(e);
});
}
},b={
indexOf:function(e,i){
for(var t=0,o=e.length;o>t;++t)if(e[t].file_id==i)return t;
return-1;
}
},w={
on:function(e,i){
if(i){
var t=this.events;
return t[e]=t[e]||[],t[e].push(i),this;
}
},
trigger:function(e){
var i=this,t=arguments,o=i.events[e];
return o?($.each(o,function(e,o){
o.apply(i,Array.prototype.slice.call(t,1));
}),this):void 0;
},
hide:function(){
return this.dialog.popup("hide"),this;
},
show:function(){
return this.dialog.popup("show"),this;
},
destroy:function(){
!!this.dialog&&this.dialog.popup("remove"),this.dialog=null;
}
};
return $.extend(h.prototype,w),_;
});