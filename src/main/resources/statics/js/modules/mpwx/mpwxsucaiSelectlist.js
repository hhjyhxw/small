$(function () {

});

var vm = new Vue({
    el:'#icloudapp',
    data:{
        list:[{
            id:null,
            title:'',//本地查看的标题
            scType:'',//素材类型
            localUrls:'',//图片素材地址
            webSucaivo:{
                title:'',//本地查看的标题
                list:[//图文素材列表
                    {
                        wxUrls: '',//阅读原文连接不能为空
                        subTitle:'',//子项标题
                        shrtContent: '',//摘要mainContent: '',//超文本内容，暂时不使用
                        mainContent: '',//超文本内容，
                        localUrls: '',//微信图片展示
                    },
                ],
            }
        }],
        q:{
            title:'',//标题
            scType:T.p('scType') ? T.p('scType') : '',//素材类型 1 图文，4 图片
        }

    },
    methods: {
        getsuciInfoList:function(){
            $.get(baseURL + "mpwx/mpwxsucai/list?scType="+vm.q.scType+"&title="+vm.q.title, function(r){
                console.info("result=="+JSON.stringify(r))
                if(r.code==0){
                    vm.list = r.page.list;
                }
            });
        },
        //双击选择图片
        doubleClickSelect: function (scType,id) {
            parent.vm.doubleClickSelect(scType,id);
        }


    }
});
vm.getsuciInfoList();//加载素材信息