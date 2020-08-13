var v_urlinfo = window.location.href;// 当前页面的访问地址

var v_hostTel = "15709";// 主号
var v_hostNumber = "gh_3d9742641f8b";// 接入号
var v_imtype = "161";// 类型。微信：161；QQ：1
var v_appid = "";// 接入号的v_appid
var v_noncestr = "";// 随机字符串
var v_timestamp = "";// 时间戳
var v_signature = "";// 使用微信jsapi接口的签名
//var v_jsWxCard =  document.getElementById("shareCommon").src;// 获取引用js文件的地址
//var v_remoteUrl = v_jsWxCard.split("js")[0];// 取得引用就是文件IP地址
var v_remoteUrl = getBasePath();// 取得引用就是文件IP地址
// 引用jquery文件

//获取appid、jsapi_ticket、noncestr、timestamp、签名
function getSignature(callback){
	$.ajaxSettings.async = false;
	$.getJSON(v_remoteUrl+"/jsSdkConfig/getJsSdkConfig",
			{"url":v_urlinfo.split('#')[0]},
		    function(json) {
				if(json!=null){
					v_appid = json.appid;
					v_noncestr = json.nonceStr;
		            v_timestamp = json.timeStamp;
		            v_signature = json.sign;
		            (callback && typeof(callback) === "function") && callback(json);
				}
		    });
}

//分享朋友圈
function menuShareTimeline(title,link,imgUrl,callback){
	if(v_signature=="")
		getSignature(callback);
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
	    appId: v_appid, // 必填，公众号的唯一标识
	    timestamp: v_timestamp, // 必填，生成签名的时间戳
	    nonceStr: v_noncestr, // 必填，生成签名的随机串
	    signature: v_signature,// 必填，签名
	    jsApiList: [
	        'onMenuShareTimeline'
		] // 必填，需要使用的JS接口列表
	});
	
	wx.ready(function () {
		wx.onMenuShareTimeline({
		    title: title, // 分享标题
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	});
}


//分享朋友
function menuShareAppMessage(title,desc,link,type,dataUrl,imgUrl,callback){
	if(v_signature=="")
		getSignature(callback);
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
	    appId: v_appid, // 必填，公众号的唯一标识
	    timestamp: v_timestamp, // 必填，生成签名的时间戳
	    nonceStr: v_noncestr, // 必填，生成签名的随机串
	    signature: v_signature,// 必填，签名
	    jsApiList: [
	        'onMenuShareAppMessage'
		] // 必填，需要使用的JS接口列表
	});
	
	wx.ready(function () {
		wx.onMenuShareAppMessage({
		    title: title, // 分享标题
		    desc: desc, // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    type: type, // 分享类型,music、video或link，不填默认为link
		    dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	});
}


function menuShare(title,desc,link,type,dataUrl,imgUrl,callback){
	if(v_signature=="")
		getSignature(callback);
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
	    appId: v_appid, // 必填，公众号的唯一标识
	    timestamp: v_timestamp, // 必填，生成签名的时间戳
	    nonceStr: v_noncestr, // 必填，生成签名的随机串
	    signature: v_signature,// 必填，签名
	    jsApiList: [
	        'onMenuShareAppMessage','onMenuShareTimeline'
		] // 必填，需要使用的JS接口列表
	});
	
	wx.ready(function () {
		wx.onMenuShareAppMessage({
		    title: title, // 分享标题
		    desc: desc, // 分享描述
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    type: type, // 分享类型,music、video或link，不填默认为link
		    dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
		
		wx.onMenuShareTimeline({
		    title: title, // 分享标题
		    link: link, // 分享链接
		    imgUrl: imgUrl, // 分享图标
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
		});
	});
}
