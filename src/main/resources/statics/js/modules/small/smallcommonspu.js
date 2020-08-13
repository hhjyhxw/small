$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'small/smallcommonspu/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '原价(按分存)', name: 'price', index: 'price', width: 80 }, 			
			{ label: '现价', name: 'originalPrice', index: 'original_price', width: 80 }, 			
			{ label: 'vip价', name: 'vipPrice', index: 'vip_price', width: 80 }, 			
			{ label: '商品名称', name: 'title', index: 'title', width: 80 }, 			
			{ label: '销量', name: 'sales', index: 'sales', width: 80 }, 			
			{ label: '商品图片', name: 'img', index: 'img', width: 80 }, 			
			{ label: '商品详情', name: 'detail', index: 'detail', width: 80 }, 			
			{ label: '商品描述', name: 'description', index: 'description', width: 80 }, 			
			{ label: '分类id', name: 'categoryId', index: 'category_id', width: 80 }, 			
			{ label: '运费模板id', name: 'freightTemplateId', index: 'freight_template_id', width: 80 }, 			
			{ label: '计量单位', name: 'unit', index: 'unit', width: 80 }, 			
			{ label: '0下架 1上架', name: 'status', index: 'status', width: 80 }, 			
			{ label: '商户id', name: 'supplierId', index: 'supplier_id', width: 80 }, 			
			{ label: '热门', name: 'ihot', index: 'ihot', width: 80 }, 			
			{ label: '新品', name: 'inew', index: 'inew', width: 80 }, 			
			{ label: '折扣', name: 'idiscount', index: 'idiscount', width: 80 }, 			
			{ label: '优选', name: 'iselect', index: 'iselect', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }			
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
		smallCommonSpu: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.smallCommonSpu = {};
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
                var url = vm.smallCommonSpu.id == null ? "small/smallcommonspu/save" : "small/smallcommonspu/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.smallCommonSpu),
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
                        url: baseURL + "small/smallcommonspu/delete",
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
			$.get(baseURL + "small/smallcommonspu/info/"+id, function(r){
                vm.smallCommonSpu = r.smallCommonSpu;
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