$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'bsactivity/bsactivitygoodsqcode/list',
        datatype: "json",
        postData: {
           goodsid: T.p('goodsid') ? T.p('goodsid') : null
        },
        colModel: [			
			{ label: '编号', name: 'id', index: 'id', width: 50, key: true },
			{ label: '关联商品', name: 'bsactivityGoods.name', index: 'goodsid', width: 80 },
			{ label: 'qcode', name: 'qcode', index: 'qcode', width: 80 },
			{ label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
                        				return value === 0 ?
                        					'<span class="label label-danger">未使用</span>' :
                        					'<span class="label label-success">已使用</span>';
                        			}},
			{ label: '生成时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '消费时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '消费用户', name: 'wxUser.nickname', index: 'userid', width: 80 }
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
        q:{
            name: '',
            nickname: '',
            qcode: '',
            status: null
        },
		showList: true,
		title: null,
		bsactivityGoodsqcode: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.bsactivityGoodsqcode = {};
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
                var url = vm.bsactivityGoodsqcode.id == null ? "bsactivity/bsactivitygoodsqcode/save" : "bsactivity/bsactivitygoodsqcode/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bsactivityGoodsqcode),
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
                        url: baseURL + "bsactivity/bsactivitygoodsqcode/delete",
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
			$.get(baseURL + "bsactivity/bsactivitygoodsqcode/info/"+id, function(r){
                vm.bsactivityGoodsqcode = r.bsactivityGoodsqcode;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
			    postData:vm.q,
                page:page
            }).trigger("reloadGrid");
		}
	}
});