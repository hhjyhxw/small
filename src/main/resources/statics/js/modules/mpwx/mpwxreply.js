$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'mpwx/mpwxreply/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			/*{ label: '公众号记录id', name: 'mpwxAppid', index: 'mpwx_appid', width: 80 }, 			*/
			{ label: '关键字描述', name: 'keywords', index: 'keywords', width: 80 },
			{ label: '回复类型', name: 'replyType', index: 'reply_type', width: 80,formatter: function(value, options, row){
                    return value === '1' ?'<span class="label label-info">回复文本</span>' :
                        (value === '2'?'<span class="label label-info">回复图文</span>':(value === '6'?'<span class="label label-success">回复图片</span>':
                            (value === '5'?'<span class="label label-info">关注回复</span>':(value === '4'?'<span class="label">默认回复</span>':'其他')) ))

                }},
			{ label: '回复内容(文本内容 或者 素材id)', name: 'content', index: 'content', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 },
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 },
            {header:'操作', name:'操作', width:50, sortable:false, title:false, align:'center', formatter: function(val, obj, row, act){
                    var actions = [];
                    actions.push('<a title="修改" onclick="vm.addOrupdateNewsWin('+row.id+')"><i class="fa fa-pencil"></i></a>&nbsp;');
                    // actions.push('<a title="删除" onclick="vm.del('+row.id+',0)"><i class="fa fa-trash-o"></i></a>&nbsp;');
                    return actions.join('');
                }}
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });


    new AjaxUpload('#upload', {
        action: baseURL + "sys/oss/uploadFront",
        name: 'file',
        autoSubmit:true,
        responseType:"json",
        onSubmit:function(file, extension){
            if (!(extension && /^(xls|xlsx)$/.test(extension.toLowerCase()))){
                alert('只支持xls、xlsx格式的文件！');
                return false;
            }
        },
        onComplete : function(file, r){
            console.log("r=="+JSON.stringify(r));
            console.log("file=="+file);
            if(r.code == 0){
                alert("上传成功!");
                vm.fileurl =  r.url;
                console.log("vm.fileurl=="+vm.fileurl);
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
		showList: true,
		title: null,
		mpwxReply: {},
        fileurl:'',
        q:{
            keywords:''
        }
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.mpwxReply = {};
		},
		update: function (event) {

			vm.showList = false;
            vm.title = "导入关键字";
		},

        importkeywords: function () {
            vm.showList = false;
            vm.title = "导入关键字";
        },
		saveOrUpdate: function (event) {
		    if(vm.fileurl==''){
                alert("请先上传文件!");
            }
		    console.log("fileurl==="+vm.fileurl)
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = "mpwx/mpwxreply/importData";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data:JSON.stringify(vm.fileurl),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                             vm.reload();
                             $('#btnSaveOrUpdate').button('reset');
                             $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            $('#btnSaveOrUpdate').button('reset');
                            $('#btnSaveOrUpdate').dequeue();
                        }
                    }
                });
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			var lock = false;
            layer.confirm('确定要删除选中的记录？', {
                btn: ['确定','取消'] //按钮
            }, function(){
               if(!lock) {
                    lock = true;
		            $.ajax({
                        type: "POST",
                        url: baseURL + "mpwx/mpwxreply/delete",
                        contentType: "application/json",
                        data: JSON.stringify(ids),
                        success: function(r){
                            if(r.code == 0){
                                layer.msg("操作成功", {icon: 1});
                                $("#jqGrid").trigger("reloadGrid");
                            }else{
                                layer.alert(r.msg);
                            }
                        }
				    });
			    }
             }, function(){
             });
		},
		getInfo: function(id){
			$.get(baseURL + "mpwx/mpwxreply/info/"+id, function(r){
                vm.mpwxReply = r.mpwxReply;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page,
                postData:vm.q,
            }).trigger("reloadGrid");
		},
        //打开添加或者编辑关键字回复
        addOrupdateNewsWin: function (id,keywords) {
            //在当前页面打开弹窗，并定义改层的Index
            this.addOrupdateIndex = layer.open({
                title: '关键字回复',
                type: 2,
                maxmin: true,
                shadeClose: true,
                area: ['80%', '80%'],
                /*btn: ['<i class="fa fa-check"></i> 确定', '<i class="fa fa-close"></i> 关闭'],*/
                btn: ['<i class="fa fa-close"></i> 关闭'],
                content: baseURL + "modules/mpwx/mpwxreplyAdd.html?id="+id+"&keywords="+keywords,
                //按钮对应点击事件回调通知
                yes: function (index, layero) {
                    console.log("index=="+index)
                    // layer父界面调用子弹窗的方法和获取子弹窗的元素值总结
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    //关闭
                    layer.close(index);
                    vm.reload();
                },
                success: function (layero, index) {

                }
            });
        },
	}
});