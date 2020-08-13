$(function () {
    new AjaxUpload('#upload', {
        action: baseURL + "sys/oss/uploadFront",
        name: 'file',
        autoSubmit:true,
        responseType:"json",
        onSubmit:function(file, extension){
            if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
                alert('只支持jpg、png、gif格式的图片！');
                return false;
            }
        },
        onComplete : function(file, r){
            console.log("r=="+JSON.stringify(r));
            console.log("file=="+file);
            if(r.code == 0){
                alert("上传成功!");
                // vm.optionSucai.localUrls = baseURL + r.url;
                // vm.sucai.list[vm.selectIndex].localUrls = baseURL + r.url;
                vm.mpwxSucai.localUrls = r.url;
                console.log("vm.optionSucai.localUrls=="+vm.mpwxSucai.localUrls);
                //vm.reload();
            }else{
                alert(r.msg);
            }
        }
    });
});

var vm = new Vue({
	el:'#icloudapp',
	data:{
        id:T.p('id') ? T.p('id') : null,
        mpwxSucai:{
            id:'',
            title:'',//展示的标题
            wxUrls: '',//用户访问连接
            localUrls: fontbaseURL+'/statics/wx/image/defaultimg.png',//微信图片展示
            wxMediaids:''
        },


	},
	methods: {
	    getInfo:function(id){
	        // console.log("id==="+id)
            // console.log(undefined==id)
            // console.log(id=='undefined')
	        if(vm.id!='undefined' && vm.id!=null && vm.id!='null'){
                $.get(baseURL + "mpwx/mpwxsucai/info/"+vm.id, function(r){
                    console.info("result=="+JSON.stringify(r))
                    if(r.code==0){
                        vm.mpwxSucai = r.mpwxSucai;
                    }
                });
            }
        },

        //保存或者更新
        saveOrUpdate: function (event) {
            var flag = true;
            if(vm.mpwxSucai.title==null || vm.mpwxSucai.title==''){
                alert("标题不能为空");
                flag = false;
                return;
            }
            $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url ="mpwx/mpwxsucai/saveOrUpdatePic";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.mpwxSucai),
                    success: function(r){
                        if(r.code === 0){
                            layer.msg("操作成功", {icon: 1});
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    },
                    error:function (r) {
                        layer.alert("保存失败");
                        $('#btnSaveOrUpdate').button('reset');
                        $('#btnSaveOrUpdate').dequeue();
                    }
                });
            });
        },


	}
});
vm.getInfo(vm.id);//加载素材信息