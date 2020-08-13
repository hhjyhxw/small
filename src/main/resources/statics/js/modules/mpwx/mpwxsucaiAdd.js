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
                vm.optionSucai.localUrls = r.url;
                vm.sucai.list[vm.selectIndex].localUrls =  r.url;
                console.log("vm.optionSucai.localUrls=="+vm.optionSucai.localUrls);
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
	    selectIndex:0,
        id:T.p('id') ? T.p('id') : null,
        optionSucai:{//选中的图文
            wxUrls: '',//用户访问连接
            subTitle:'',//展示的标题
            shrtContent: '',//摘要
            mainContent: '',//超文本内容，
            localUrls: fontbaseURL+'/statics/wx/image/defaultimg.png',//微信图片展示
        },
        sucai:{
	        id:null,
            title:'',//本地查看的标题
            list:[
                 {
                    wxUrls: '',//阅读原文连接不能为空
                    subTitle:'',//子项标题
                    shrtContent: '',//摘要mainContent: '',//超文本内容，暂时不使用
                    mainContent: '',//超文本内容，
                    localUrls: fontbaseURL+'/statics/wx/image/defaultimg.png',//微信图片展示
                },
            ],
        },

	},
	methods: {
	    getInfo:function(id){
            if(vm.id!='undefined' && vm.id!=null && vm.id!='null'){
                $.get(baseURL + "mpwx/mpwxsucai/info/"+vm.id, function(r){
                    console.info("result=="+JSON.stringify(r))
                    if(r.code==0) {
                        vm.sucai = JSON.parse(r.mpwxSucai.detailInfo);
                        vm.sucai.title = r.mpwxSucai.title;
                        vm.sucai.id = r.mpwxSucai.id;
                        vm.optionSucai = vm.sucai.list[0];//默认选中第一个数据
                    }
                });
            }
        },
	    //添加子项
        addItem:function(){
            if(vm.sucai.list.length>3){
                return;
            }
            var item = {
                wxUrls: '',//用户访问连接
                subTitle:'标题'+vm.sucai.list.length,//展示的标题
                shrtContent: '标题'+vm.sucai.list.length,//展示的标题,//摘要
                mainContent: '',//超文本内容，
                localUrls: fontbaseURL+'/statics/wx/image/defaultimg.png',//微信图片展示
            };
            vm.sucai.list.push(item);
        },
        //删除子项
        deleteItem:function(index){
            vm.sucai.list.splice(index,1);
            //重置第一条位选中记录
            vm.optionSucai = vm.sucai.list[0];//默认选中第一个数据
            vm.selectIndex = 0;

        },
        //选中某条目
        selectone:function(index,item){
            //更新保存上一条目
            vm.sucai.list[vm.selectIndex] = vm.optionSucai;
            //选中的新条目
            vm.selectIndex = index;
            vm.optionSucai = vm.sucai.list[index];
        },

        //保存或者更新图文
        saveOrUpdate: function (event) {
            //更新最进修改的条目保存上一条目
            vm.sucai.list[vm.selectIndex] = vm.optionSucai;
            var flag = true;
            if(vm.sucai.title==null || vm.sucai.title==''){
                alert("标题不能为空");
                flag = false;
                return;
            }
            vm.sucai.list.forEach(p=>{
                if(p.subTitle == null || p.subTitle==''){
                    alert("标题不能为空");
                    flag = false;
                    return;
                }
                if(p.mainContent == null || p.mainContent==''){
                    alert("正文内容不能为空");
                    flag = false;
                    return;
                }
                if(p.localUrls == null || p.localUrls==''){
                    alert("图片不能为空");
                    flag = false;
                    return;
                }
                if(p.wxUrls == null || p.wxUrls==''){
                    alert("阅读原文连接不能为空");
                    flag = false;
                    return;
                }
            });
            if(!flag){
                return;
            }
            $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url ="mpwx/mpwxsucai/saveOrUpdateNews";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.sucai),
                    success: function(r){
                        if(r.code === 0){
                            layer.msg("操作成功", {icon: 1});
                            vm.getInfo(vm.sucai.id);
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