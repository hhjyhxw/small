$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'small/smallsellcategory/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '分类名称', name: 'title', index: 'title', width: 80 }, 			
			{ label: '父类id', name: 'parentId', index: 'parent_id', width: 80 }, 			
			{ label: '分类图标地址', name: 'picUrl', index: 'pic_url', width: 80 }, 			
			{ label: '分类级别', name: 'level', index: 'level', width: 80 }, 			
			{ label: '状态', name: 'status', index: 'status', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '排序', name: 'sortNum', index: 'sort_num', width: 80 }, 			
			{ label: '店铺id', name: 'supplierId', index: 'supplier_id', width: 80 }			
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

var settingretail = {
    data: {
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var retialztree;

var vm = new Vue({
	el:'#icloudapp',
	data:{
		showList: true,
		title: null,
		smallSellCategory: {
            smallRetail:{
                supplierName:null
            }
        }
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.smallSellCategory = {
                supplierId:null,
                smallRetail:{
                    supplierName:null
                }
            };
            vm.getRetailList();
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id);
            vm.getRetailList();
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.smallSellCategory.id == null ? "small/smallsellcategory/save" : "small/smallsellcategory/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.smallSellCategory),
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
                        url: baseURL + "small/smallsellcategory/delete",
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
			$.get(baseURL + "small/smallsellcategory/info/"+id, function(r){
                vm.smallSellCategory = r.smallSellCategory;
                vm.smallSellCategory.smallRetail = {
                    supplierName:null
                };
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		},
        //加载零售户
        getRetailList: function(){
            //加载
            $.get(baseURL + "small/smallretail/select", function(r){
                console.log("r====="+JSON.stringify(r))
                retialztree = $.fn.zTree.init($("#retailTree"), settingretail, r.retailList);
                var node = retialztree.getNodeByParam("id", vm.smallSellCategory.supplierId);
                // console.log("加载node====="+JSON.stringify(node))
                if(node!=null){
                    retialztree.selectNode(node);
                    vm.smallSellCategory.smallRetail.supplierName = node.name;
                }
            })
        },
        //加载零售户
        retailTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择零售户",
                area: ['300px', '300px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#retailLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = retialztree.getSelectedNodes();
                    //选择
                    // console.log("node====="+JSON.stringify(node))
                    vm.smallSellCategory.supplierId = node[0].id;
                    vm.smallSellCategory.smallRetail.supplierName = node[0].name;
                    layer.close(index);
                }
            });
        },




	}
});