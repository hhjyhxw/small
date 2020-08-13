$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'bsactivity/bsactivityorder/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '订单编号', name: 'orderNo', index: 'order_no', width: 120 },
			{ label: '消耗龙币（个）', name: 'totalAmount', index: 'total_amount', width: 80 },
			{ label: '商品名称', name: 'goodName', index: 'good_name', width: 120 },
			{ label: '商户名称', name: 'bsactivityShop.shopName', index: 'supplier_id', width: 120 },
			{ label: '订单状态', name: 'orderStatus', width: 60, formatter: function(value, options, row){
                                    				return value === 0 ?'<span class="label label-danger">未支付</span>' :
                                    				(value === 1?'<span class="label label-danger">已支付</span>':'<span class="label label-success">已完成</span>');
                                    			}},
			{ label: '下单时间', name: 'createTime', index: 'create_time', width: 100 },
			{ label: '用户昵称', name: 'name', index: 'name', width: 80 }
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
            name: null
        },
		showList: true,
		title: null,
		bsactivityOrder: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.bsactivityOrder = {};
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
                var url = vm.bsactivityOrder.id == null ? "bsactivity/bsactivityorder/save" : "bsactivity/bsactivityorder/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bsactivityOrder),
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
                        url: baseURL + "bsactivity/bsactivityorder/delete",
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
			$.get(baseURL + "bsactivity/bsactivityorder/info/"+id, function(r){
                vm.bsactivityOrder = r.bsactivityOrder;
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