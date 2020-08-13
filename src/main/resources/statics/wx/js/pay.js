$(function() {
	 var myVar1,myVar2 ;
	
	// 获取qrcode
	window.getQrcode = function() {
		$.ajax({
			url : '../hyPay/getcode',
			type : 'get',
			success : function(data) {
				if (data.code == '0000') {
					//二维码生成，并且打开弹窗
				     $('.erWeiMa').attr('src','../hyPay/create_code?code='+data.message);   
					 $('#code').val(data.message);
					 $('.qrcode').show();
					 myVar2 = setInterval(getPayResult, 2000);//每两秒钟查询一次支付结果
				}else{
					alert(data.message);
				}

			},
			error : function() {

			}
		})
	}
	$('.erWeiMa').click(function(){
		refreshCode();
	})
	
	//刷新二维码，自动刷新，手动刷新
	window.refreshCode = function() {
		$.ajax({
			url : '../hyPay/refresh_code',
			type : 'post',
			data : {
				'code' : $('#code').val()
			},
			success : function(data) {
				if (data.code === '0000') {
					$('#code').val(data.message);
					clearInterval(myVar1);
					myVar1 = setInterval(refreshCode,60000);
					$('.erWeiMa').attr('src','');
					$('.erWeiMa').attr('src','../hyPay/create_code?code='+data.message);
				}

			},
			error : function() {

			}
		})
	}
	//getPayResult
	window.getPayResult = function() {
		$.ajax({
			url : '../hyPay/getPayResult',
			type : 'post',
			data : {
				'code' : $('#code').val()
			},
			success : function(data) {
				if (data.code == '0000') {
					//跳转支付成功页
					clearInterval(myVar2);
					window.location.href="../hyPay/paySucc?orderId="+data.message
				}

			},
			error : function() {

			}
		})
	}

	$('.closeBtn').click(function(){
		$('.modal-comfirm').hide();
		clearInterval(myVar2);
	})
		myVar1 = setInterval(refreshCode, 60000);//二维码60秒自动刷新
	
})