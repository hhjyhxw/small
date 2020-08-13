$(function () {

});

var vm = new Vue({
	el:'#icloudapp',
	data:{
        dcurrency:0
	},
	methods: {
        //获取我的龙币
        getMylongcoin: function () {
            $.get(fontbaseURL + "/frontpage/bsactivity/user/userInfo", function(r){
                console.log("r=="+JSON.stringify(r));
                if(r.code==0){
                  vm.dcurrency = r.dcurrency;//我的龙币余额
                }else{

                }

            })
        },
	}
});
vm.getMylongcoin();