(function(root, factory){
	if(typeof define === 'function' && define.amd) {
	    define(["jquery"], factory);
	} else {
		root.ImccPlugin = factory($);
	}
})(this, function($){
	return {
		/*调用插件通知
		 * type: "0":会话通知,"1":留言通知,"2":排队通知
		 * unread: 未读数量
		 * msg: 通知消息体
		 */
		msgTip: function(tooltipid, type, sessioncount, unread, msg, title) {
			var explorer = navigator.userAgent;
			var browse = "";
			if (explorer.indexOf("MSIE") >= 0){
				//ie 
				browse = "0";
			}else if (explorer.indexOf("Firefox") >= 0) {
				// firefox 火狐
				browse = "1";
			}else if(explorer.indexOf("Chrome") >= 0){
				//Chrome 谷歌
				browse = "2";
			}else if(explorer.indexOf("Opera") >= 0){
				//Opera 欧朋
				browse = "3";
			}else if(explorer.indexOf("Safari") >= 0){
				//Safari 苹果浏览器
				browse = "4";
			}else if(explorer.indexOf("Netscape")>= 0) { 
				//Netscape
				browse = "5"; 
			}
			var arr = title.split("-");
			var content = (arr && arr.length > 0) ? arr[arr.length-1] : "";
			$.ajax({
		        url : 'http://127.0.0.1:9904',
		        type : 'post',
		        data : {
		        	MsgTipTool: 'showMsg',
		        	tooltipid: tooltipid,
		        	params: JSON.stringify({tooltipid: tooltipid, type: type, sessioncount: sessioncount, unread: unread, msg: msg, browser:browse, content: content})
		        },
		        dataType : 'jsonp',
		        jsonp: "callback",
		        jsonpCallback: "jsonpCallback",
		        success : function(data){
		        },
		        error : function(jqXHR, textStatus, errorThrown){
		        }
			});
		},
		//发送当前窗口标题至插件
		tipTitle: function(tooltipid, title) {
			var explorer = navigator.userAgent;
			var browse = "";
			if (explorer.indexOf("MSIE") >= 0){
				//ie 
				browse = "0";
			}else if (explorer.indexOf("Firefox") >= 0) {
				// firefox 火狐
				browse = "1";
			}else if(explorer.indexOf("Chrome") >= 0){
				//Chrome 谷歌
				browse = "2";
			}else if(explorer.indexOf("Opera") >= 0){
				//Opera 欧朋
				browse = "3";
			}else if(explorer.indexOf("Safari") >= 0){
				//Safari 苹果浏览器
				browse = "4";
			}else if(explorer.indexOf("Netscape")>= 0) { 
				//Netscape
				browse = "5"; 
			}
			
			$.ajax({
		        url : 'http://127.0.0.1:9904',
		        type : 'post',
		        data : {
		        	MsgTipTool: 'title',
		        	tooltipid: tooltipid,
		        	params: JSON.stringify({tooltipid: tooltipid, browser: browse, content: title})
		        },
		        dataType : 'jsonp',
		        jsonp: "callback",
		        jsonpCallback: "jsonpCallback",
		        success : function(data){
		        },
		        error : function(jqXHR, textStatus, errorThrown){
		        }
			});
		}
	}
});