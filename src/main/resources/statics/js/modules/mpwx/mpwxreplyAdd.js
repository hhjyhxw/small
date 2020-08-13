$(function () {

});

var vm = new Vue({
    el:'#icloudapp',
    data:{
        id:T.p('id') ? T.p('id') : null,
        // keywords:T.p('keywords') ? T.p('keywords') : '',//0 默认回复设置
        isdisplay:'none',//展示素材选项框
        mpwxReply:{
            id:null,
            keywords:T.p('keywords') ? T.p('keywords') : null,//展示的标题 (0 默认回复设置)
            // replyType: '1',//回复类型 1 文本 2图文 3跳转流程 6图片
            replyType: '1',
            content: '',//0 默认回复设置
            keywordList:[
                    {
                        id:null,
                        keywords:'',
                    }
                ],//关键字关联记录 关键字为0时默认回复
        },
        selectNews:{//选中的图文
            id:null,
            title:'',//本地查看的标题
            list:[
                {
                    wxUrls: '',//阅读原文连接不能为空
                    subTitle:'',//子项标题
                    shrtContent: '',//摘要mainContent: '',//超文本内容，暂时不使用
                    mainContent: '',//超文本内容，
                    localUrls: '',//微信图片展示
                },
            ],

        },
        selectPic:{
            id:null,
            title:'',//展示的标题
            localUrls: '',//微信图片展示
        }


    },
    methods: {
        //获取关键字回复记录
        getInfo:function(id){
            console.log(" vm.id======="+ vm.id);
            console.log("vm.mpwxReply.keywords=="+vm.mpwxReply.keywords)
            if(vm.id!='undefined' && vm.id!=null && vm.id!='null' && vm.id.trim()!=''){
                $.get(baseURL + "mpwx/mpwxreply/info/"+vm.id, function(r){
                    console.info("result=="+JSON.stringify(r))
                    if(r.code==0){
                        vm.mpwxReply = r.mpwxReply;
                        if(vm.mpwxReply.replyType=='2'){
                            //获取图文
                            vm.getNewsInfo(parseInt(r.mpwxReply.content));
                        }
                        if(vm.mpwxReply.replyType=='6'){
                            //获取图片
                            vm.getPicInfo(parseInt(r.mpwxReply.content));
                        }
                    }
                });
            }
            //读取默认回复
            if(vm.mpwxReply.keywords==0 || vm.mpwxReply.keywords=='0'){
                $.get(baseURL + "mpwx/mpwxreply/list?keywords=0", function(r){
                    console.info("result=="+JSON.stringify(r))
                    if(r.code==0 && r.page.list!=null && r.page.list.length>0){
                        vm.mpwxReply = r.page.list[0];
                        if(vm.mpwxReply.replyType=='2'){
                            //获取图文
                            vm.getNewsInfo(parseInt(vm.mpwxReply.content));
                        }
                        if(vm.mpwxReply.replyType=='6'){
                            //获取图片
                            vm.getPicInfo(parseInt(vm.mpwxReply.content));
                        }
                    }
                });
            }
        },
        //添加一项关键字
        addItem:function(){
            if(vm.mpwxReply.keywordList.length>2){
                return;
            }
            var item = {
                id:null,
                keywords:'',
            };
            vm.mpwxReply.keywordList.push(item);
        },
        //删除一项关键字
        delkeywords:function(index){
            console.log("index======"+index)
            console.log("length======"+vm.mpwxReply.keywordList.length)
            vm.mpwxReply.keywordList.splice(index,1);
            console.log("length======"+vm.mpwxReply.keywordList.length)
        },
        //选中回复类型
        selectType:function(replyType){
            console.log("replyType======"+replyType)
            vm.mpwxReply.replyType = replyType;
        },
        //点击选择素材
        selectSucai:function(sucaiType){
            vm.isdisplay='block'
        },
        //获取图文素材
        getNewsInfo:function(id){
            if(id!='undefined' && id!=null && id!='null'){
                $.get(baseURL + "mpwx/mpwxsucai/info/"+id, function(r){
                    console.info("selectNews=="+JSON.stringify(r))
                    if(r.code==0) {
                        vm.selectNews = JSON.parse(r.mpwxSucai.detailInfo);
                        vm.selectNews.title = r.mpwxSucai.title;
                        vm.selectNews.id = r.mpwxSucai.id;
                    }
                });
            }
        },
        //获取图片素材
        getPicInfo:function(id){
            if(id!='undefined' && id!=null && id!='null'){
                $.get(baseURL + "mpwx/mpwxsucai/info/"+id, function(r){
                    console.info("result=="+JSON.stringify(r))
                    if(r.code==0){
                        vm.selectPic = r.mpwxSucai;
                    }
                });
            }
        },
        //删除当前选中的素材
        delMsg:function(sucaiType){
            if(sucaiType==2){//图文
                vm.selectNews.id = null;
                vm.selectNews.list = [];
            }
            if(sucaiType==6){//图片
                vm.selectPic.id = null;
            }
        },

        //保存或者更新
        saveOrUpdate: function () {
            console.log("mpwxReply===" + JSON.stringify(vm.mpwxReply))
            var flag = true;
            if (vm.mpwxReply.keywords == null || vm.mpwxReply.keywords == '') {
                alert("关键字描述不能为空");
                flag = false;
                return;
            }
            if (vm.mpwxReply.content == null || vm.mpwxReply.content == '') {
                alert("回复内容不能为空");
                flag = false;
                return;
            }
            if ((vm.mpwxReply.keywords != 0 && vm.mpwxReply.keywords != '0') && (vm.mpwxReply.keywordList == null || vm.mpwxReply.keywordList.length <= 0)) {
                alert("关键字不能为空");
                flag = false;
                return;
            }
            if (vm.mpwxReply.keywords != 0 && vm.mpwxReply.keywords != '0'){
                vm.mpwxReply.keywordList.forEach((p) => {
                    if (p.keywords == null || p.keywords == '') {
                        flag = false;
                        return;
                    }
                });
             }
            if(!flag){
                alert("关键字不能为空");
                return;
            }
            var url = "mpwx/mpwxreply/saveOrUpdate";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.mpwxReply),
                success: function (r) {
                    if (r.code === 0) {
                        layer.msg("操作成功", {icon: 1});
                    } else {
                        layer.alert(r.msg);
                    }
                },
                error: function (r) {
                    layer.alert("保存失败");
                }
            });
        },


        //打开添加或者编辑图文弹窗
        openSelectsucaiWin: function (scType) {
            //在当前页面打开弹窗，并定义改层的Index
            this.sucaiNewsIndex = layer.open({
                title: '',
                type: 2,
                maxmin: true,
                shadeClose: true,
                area: ['90%', '90%'],
                /*btn: ['<i class="fa fa-check"></i> 确定', '<i class="fa fa-close"></i> 关闭'],*/
                btn: ['<i class="fa fa-close"></i> 关闭'],
                content: baseURL + "modules/mpwx/mpwxsucaiSelectlist.html?scType="+scType,
                //按钮对应点击事件回调通知
                yes: function (index, layero) {
                    console.log("index=="+index)
                    // layer父界面调用子弹窗的方法和获取子弹窗的元素值总结
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    //关闭
                    layer.close(index);
                },
                success: function (layero, index) {
                    // layero.find('.layui-layer-btn').append(info);
                }
            });
        },
        //素材子窗口 双击 素材调用的方法
        doubleClickSelect:function (scType,id) {
            vm.mpwxReply.content = id;
            if(scType==1){
                vm.mpwxReply.replyType = 2;
                vm.getNewsInfo(id);//加载图文素材信息

            }
            if(scType==4){//素材类型4是图片
                vm.mpwxReply.replyType = 6;//回复类型 6 是图片素材
                vm.getPicInfo(id);//加载图片素材信息*/
            }
            layer.close(vm.sucaiNewsIndex);
        }

    }
});
vm.getInfo(vm.id);//加载关键字回复消息
/*
vm.getNewsInfo(3);//加载图文素材信息
vm.getPicInfo(5);//加载图片素材信息*/
