$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'mpwx/mpwxmenu/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '公众号记录id', name: 'wxappId', index: 'wxapp_id', width: 80 }, 			
			{ label: '菜单名称', name: 'name', index: 'name', width: 80 }, 			
			{ label: '菜单级别', name: 'menuLevel', index: 'menu_level', width: 80 }, 			
			{ label: '菜单排序', name: 'sortNum', index: 'sort_num', width: 80 }, 			
			{ label: '菜单类型', name: 'menuType', index: 'menu_type', width: 80 }, 			
			{ label: '关联小程序appId', name: 'xcxAppid', index: 'xcx_appid', width: 80 }, 			
			{ label: 'url', name: 'url', index: 'url', width: 80 }, 			
			{ label: '小程序页面路径', name: 'pagepath', index: 'pagepath', width: 80 }, 			
			{ label: '点击事件时的消息类型  0文本 1素材 2跳转流程', name: 'msgType', index: 'msg_type', width: 80 }, 			
			{ label: '回复文本 消息类型为文本的时候', name: 'textContent', index: 'text_content', width: 80 }, 			
			{ label: '素材id', name: 'wxscId', index: 'wxsc_id', width: 80 }, 			
			{ label: '流程id', name: 'processId', index: 'process_id', width: 80 }, 			
			{ label: '父id', name: 'parentId', index: 'parent_id', width: 80 }, 			
			{ label: '状态', name: 'isUse', index: 'is_use', width: 80 }, 			
			{ label: 'createTime', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: 'modifyTime', name: 'modifyTime', index: 'modify_time', width: 80 }			
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
		mpwxMenu: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.mpwxMenu = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.mpwxMenu.id == null ? "mpwx/mpwxmenu/save" : "mpwx/mpwxmenu/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.mpwxMenu),
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
                        url: baseURL + "mpwx/mpwxmenu/delete",
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
			$.get(baseURL + "mpwx/mpwxmenu/info/"+id, function(r){
                vm.mpwxMenu = r.mpwxMenu;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});