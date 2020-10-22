


var vm = new Vue({
	el:'#icloudapp',
	data:{
		   list:[]

	},
	methods: {
        getCardList:function(){
        //console.log("shoplists=="+JSON.stringify(lng));
             $.ajax({
                url:fontbaseURL + "/frontpage/small/card/getCardList",
                type:"GET",
                async:true,
                dataType:"json",
                success:function (data){
                console.log("data==="+JSON.stringify(data));
                   if(data.code==0){
                        vm.list = data.list;
                   }
                },
                error:function (error){
                    console.log("error==="+JSON.stringify(error));
                }
            });
        }
	}
});
//页面加载的时候加载数据
vm.getCardList();
