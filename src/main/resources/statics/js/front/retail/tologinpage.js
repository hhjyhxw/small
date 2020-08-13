$(function () {

});

var vm = new Vue({
	el:'#icloudapp',
	data:{
        userName:'',
        passwd:'',
        logining : false
	},
	methods: {
        inputChange(e) {
            const key = e.currentTarget.dataset.key;
            this[key] = e.detail.value;
        },
        navBack() {

        },
        //登陆
        toLogin: function () {
            if(vm.userName==null || vm.userName=='' || vm.passwd=='' || vm.passwd==null){
                return;
            }
            vm.logining = true;
            var passwd = md5(vm.passwd);
            $.ajax({
                url:fontbaseURL+"/frontpage/retail/userLogin/login",
                type:"get",
                async:true,
                data:{"userName":vm.userName,"passwd":passwd},
                dataType:"json",
                success:function (data){
                    //alert(JSON.stringify(data));
                    console.log("data=="+JSON.stringify(data));
                    if(data.code==0){
                        alert('登陆成功');
                        // window.opener=null;
                        // window.open('',self);
                        window.close();
                        //WeixinJSBridge.invoke('closeWindow',{},function(res){
                            //alert(res.err_msg);
                       // });
                    }else{
                        alert(data.msg);
                    }
                },
                error:function (error){
                    alert(JSON.stringify(error));
                    //alert(error)
                }
            });
        },
        toLogin_bak: function () {
            if(vm.userName==null || vm.userName=='' || vm.passwd=='' || vm.passwd==null){
                return;
            }
            vm.logining = true;
            var passwd = md5(vm.passwd);
            $.get(fontbaseURL + "/frontpage/retail/userLogin/login?userName="+vm.userName+"&passwd="+passwd, function(data){
                alert(JSON.stringify(data));
                console.log("data=="+JSON.stringify(data));
                if(data.code==0){
                    alert('登陆成功');
                    WeixinJSBridge.invoke('closeWindow',{},function(res){
                        //alert(res.err_msg);
                    });
                }
            })
        },
	}





});
