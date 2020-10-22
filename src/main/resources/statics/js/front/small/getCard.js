


var vm = new Vue({
	el:'#icloudapp',
	data:{
		qcode: {},//二维码
		goods: {},//商品对象
		showerror:false,//用于控制正常显示商品或者展示错误消息；true：显示提示消息；fasle显示商品消息
		exchangeSuccess:false,//true显示兑换成功消息，false显示兑换失败消息
		msg:'',
		goodimg:'',
		dcurrency:0,//我的龙币
		dcurrencyInfo:'您目前龙币余额为:0',//龙币描述
		btnshow:true,
		exchangeNum:1,//兑换数量
		goodsId:null,//兑换商品id
		totalAmount:null,//兑换总额
        shoplist:[], //店铺列表
        supplierId:null,//用户兑换所在商铺
        originLat:'',
        originLog:''

	},
	methods: {
        //领取卡券
        submitorder:function () {
            vm.btnshow = false;//不能兑换商品
          /* vm.exchangeSuccess = true;//兑换成功
           vm.msg = "兑换成功";
           vm.showerror = true;//显示非商品内容
           return;*/

             $.get(fontbaseURL + "/frontpage/small/card/getCard", function(r){
                console.log("r=="+JSON.stringify(r));
                if(r.code==0){
                   vm.exchangeSuccess = true;//兑换成功
                   vm.msg = "领取成功";
                   vm.showerror = true;//显示非商品内容

                }else{
                   vm.exchangeSuccess = false;//在次调试使用
                   vm.msg = r.msg!=null?(r.msg!=''?r.msg:'领取失败'):'领取失败';
                   vm.showerror = true;////显示非商品内容
                     //layer.msg("兑换失败", {icon: 1});
                }
              })
        },

        toCardList:function(){
         var url = fontbaseURL + "/frontpage/small/card/toCardlist";
            window.location.href=url;
        }

	}
});
