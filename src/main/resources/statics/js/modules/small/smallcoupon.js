$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'small/smallcoupon/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '代金券名称', name: 'title', index: 'title', width: 80 }, 			
			{ label: '使用类型，如满减', name: 'coupType', index: 'coup_type', width: 80 }, 			
			{ label: '描述', name: 'description', index: 'description', width: 80 }, 			
			{ label: '订单金额', name: 'total', index: 'total', width: 80 }, 			
			{ label: '会员类型0:非会员1:会员2:全部', name: 'surplus', index: 'surplus', width: 80 }, 			
			{ label: '限？？', name: 'limits', index: 'limits', width: 80 }, 			
			{ label: '减少金额', name: 'discount', index: 'discount', width: 80 }, 			
			{ label: '最低消费金额', name: 'min', index: 'min', width: 80 }, 			
			{ label: '是否可用 0不用 1可用', name: 'status', index: 'status', width: 80 }, 			
			{ label: '分类id(分类可用)', name: 'categoryId', index: 'category_id', width: 80 }, 			
			{ label: '过期天数', name: 'days', index: 'days', width: 80 }, 			
			{ label: '领取开始时间', name: 'startTime', index: 'start_time', width: 80 }, 			
			{ label: '领取/使用结束时间', name: 'endTime', index: 'end_time', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '商户id', name: 'supplierId', index: 'supplier_id', width: 80 }			
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
		smallCoupon: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.smallCoupon = {};
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
                var url = vm.smallCoupon.id == null ? "small/smallcoupon/save" : "small/smallcoupon/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.smallCoupon),
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
                        url: baseURL + "small/smallcoupon/delete",
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
			$.get(baseURL + "small/smallcoupon/info/"+id, function(r){
                vm.smallCoupon = r.smallCoupon;
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