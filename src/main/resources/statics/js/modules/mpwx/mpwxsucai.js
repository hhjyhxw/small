$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'mpwx/mpwxsucai/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: 'title', index: 'title', width: 80 },
			{ label: '素材类型', name: 'scType', index: 'sc_type', width: 80,formatter: function(value, options, row){
                    return value === '1' ?'<span class="label label-info">图文素材</span>' :
                        (value === '4'?'<span class="label label-info">图片素材</span>':'<span class="label label-success">其他</span>');
                }},
			{ label: '本地访问地址', name: 'localUrls', index: 'local_urls', width: 80 },
			{ label: '微信服务器素材地址', name: 'wxUrls', index: 'wx_urls', width: 80 },
			{ label: '微信素材id', name: 'wxMediaids', index: 'wx_mediaids', width: 80 },
			{ label: '图文素材json', name: 'detailInfo', index: 'detail_info', width: 80 },
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 },
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 },
            {header:'操作', name:'操作', width:50, sortable:false, title:false, align:'center', formatter: function(val, obj, row, act){
                    var actions = [];
                        actions.push('<a title="修改" onclick="vm.update('+row.id+','+row.scType+')"><i class="fa fa-pencil"></i></a>&nbsp;');
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
});

var vm = new Vue({
	el:'#icloudapp',
	data:{
		showList: true,
		title: null,
		mpwxSucai: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.mpwxSucai = {};
		},
		update: function (id,scType) {
		   if(scType===1 || scType==='1'){//图文
		       vm.addOrupdateNewsWin(id);
           }else if(scType===4 || scType==='4'){//图片
               vm.addOrupdatePicWin(id);
           }
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
                        url: baseURL + "mpwx/mpwxsucai/delete",
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
			$.get(baseURL + "mpwx/mpwxsucai/info/"+id, function(r){
                vm.mpwxSucai = r.mpwxSucai;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		},
        //打开添加或者编辑图文弹窗
        addOrupdateNewsWin: function (id) {
		    //在当前页面打开弹窗，并定义改层的Index
            this.sucaiNewsIndex = layer.open({
                title: '图文素材',
                type: 2,
                maxmin: true,
                shadeClose: true,
                area: ['80%', '80%'],
                /*btn: ['<i class="fa fa-check"></i> 确定', '<i class="fa fa-close"></i> 关闭'],*/
                btn: ['<i class="fa fa-close"></i> 关闭'],
                content: baseURL + "modules/mpwx/mpwxsucaiAdd.html?id="+id,
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
                   // layero.find('.layui-layer-btn').append(info);
                }
            });
        },
        //打开添加或者编辑图文弹窗
        addOrupdatePicWin: function (id) {
            //在当前页面打开弹窗，并定义改层的Index
            this.sucaiNewsIndex = layer.open({
                title: '图片素材',
                type: 2,
                maxmin: true,
                shadeClose: true,
                area: ['80%', '80%'],
                /*btn: ['<i class="fa fa-check"></i> 确定', '<i class="fa fa-close"></i> 关闭'],*/
                btn: ['<i class="fa fa-close"></i> 关闭'],
                content: baseURL + "modules/mpwx/mpwxsucaiPic.html?id="+id,
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
                    // layero.find('.layui-layer-btn').append(info);
                }
            });
        },



	}
});