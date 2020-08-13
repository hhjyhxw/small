window.IMCC_CONTEXT_PATH = "/";
window.IMCC_API_PATH = "http://findapi.im-cc.com/ucc-api/v1/";
window.IMCC_REMIND_PATH = "http://findapi.im-cc.com/ucc-api/v1/";
var port=window.location.port;
var addr=document.domain;
if(port!="" && port!="80"){
	addr=addr+":"+port;
}
window.UEDITOR_HOME_URL = "http://"+addr+ "/chat_v4/main";

function getImccCookie(name) {
	var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    var cookieStr = document.cookie;
    while (i < clen) {
        j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            var endstr = cookieStr.indexOf(";", j);
            if (endstr == -1) endstr = cookieStr.length;
            return unescape(cookieStr.substring(j, endstr));
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
            break;
    }
    return "";
}

requirejs.config({
	urlArgs: "20180702",
	paths:{
		home: [window.IMCC_CONTEXT_PATH + "static/js/home/"],
		common: [window.IMCC_CONTEXT_PATH + "static/js/common/"],
		jquery: [window.IMCC_CONTEXT_PATH + "static/plugins/jQuery/jQuery-2.1.4.min"],
		base64: [window.IMCC_CONTEXT_PATH + "static/plugins/jQuery/jquery.base64"],
		bootstrap: [window.IMCC_CONTEXT_PATH + "static/assets/plugins/bootstrap/js/bootstrap"],
		pnotify: [window.IMCC_CONTEXT_PATH + "static/plugins/pnotify/pnotify"],
		iscroll: [window.IMCC_CONTEXT_PATH + "static/assets/plugins/iscroll/js/iscroll"],
		ztree: [window.IMCC_CONTEXT_PATH + "static/assets/plugins/ztree/jquery.ztree.core.min"],
		ztree_excheck: [window.IMCC_CONTEXT_PATH + "static/assets/plugins/ztree/jquery.ztree.excheck.min"],
		ztree_exedit: [window.IMCC_CONTEXT_PATH + "static/assets/plugins/ztree/jquery.ztree.exedit.min"],
		datepicker: [window.IMCC_CONTEXT_PATH + "static/assets/plugins/datetime/jquery.datetimepicker"],
		vue: [window.IMCC_CONTEXT_PATH + "static/plugins/vue/vue"],
		UE: [window.IMCC_CONTEXT_PATH + "static/js/wxsc/ueditor/ueditor.all.min1"],
		bdlang : [window.IMCC_CONTEXT_PATH + "static/js/wxsc/ueditor/lang/zh-cn/zh-cn"],
		zeroclipboard : [window.IMCC_CONTEXT_PATH + "static/js/wxsc/ueditor/third-party/zeroclipboard/ZeroClipboard.min"],
		cryptojs: [window.IMCC_CONTEXT_PATH + "static/plugins/crypto-js"],
		imcc_plugin: [window.IMCC_CONTEXT_PATH + "static/js/imcc_plugin"],
		chat: [window.IMCC_CONTEXT_PATH + "chat_v4"],
		cxphone: [window.IMCC_CONTEXT_PATH + "static/js/uncallcc"],
		imccphone: [window.IMCC_CONTEXT_PATH + "static/js/imccphone"],
	},
	shim: {
		bootstrap: {
			deps: ["jquery"]
		},
		vue: {
			exports: "Vue"
		},
		iscroll: {
			exports: "IScroll"
		},
		ztree :{
			deps: ["jquery"]
		},
		ztree_excheck: {
			deps: ["ztree"]
		},
		ztree_exedit: {
			deps: ["ztree"]
		},
		base64: {
			deps: ["jquery"]
		},
		UE : {
			deps : [window.IMCC_CONTEXT_PATH + "static/js/wxsc/ueditor/ueditor.config.js"],
			exports : "UE"
		},
		bdlang : {
			deps : ["UE"]
		},
		zeroclipboard : {
			exports : "ZeroClipboard"
		},
		datepicker: {
			deps: ["jquery"]
		}
	},
	waitSeconds: 0
});
