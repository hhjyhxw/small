var setting = {
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
var ztree;

/*
$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'small/smallcategory/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '分类名称', name: 'title', index: 'title', width: 80 }, 			
			{ label: '父类id', name: 'parentId', index: 'parent_id', width: 80 }, 			
			{ label: '分类图标地址', name: 'picUrl', index: 'pic_url', width: 80 }, 			
			{ label: '分类级别', name: 'level', index: 'level', width: 80 }, 			
			{ label: '状态', name: 'status', index: 'status', width: 80 }, 			
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
*/

var vm = new Vue({
	el:'#icloudapp',
	data:{
		showList: true,
		title: null,
		smallCategory: {
		    id:null,
            name: null,
            parentName:null,
            parentId:0,
            sortNum:999
        }
	},
	methods: {
        getCategory: function(){
            //加载分类树
            $.get(baseURL + "small/smallcategory/select", function(r){
                // console.info("r==="+JSON.stringify(r))
                ztree = $.fn.zTree.init($("#deptTree"), setting, r.categoryList);
                // console.log("ztree====="+JSON.stringify(ztree))
                var node = ztree.getNodeByParam("id", vm.smallCategory.parentId);
                console.log("加载node====="+JSON.stringify(node))
                ztree.selectNode(node);
                vm.smallCategory.parentName = node.name;
            })
        },
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			//vm.smallCategory = {title:null,parentName:null,parentId:-1,orderNum:0,status:0};
            vm.getCategory();
		},
		update: function (event) {
            var id = getCategoryId();
            if(id == null){
                return ;
            }
            $.get(baseURL + "small/smallcategory/info/"+id, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.smallCategory = r.smallCategory;
                vm.getCategory();
            });
		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.smallCategory.id == null ? "small/smallcategory/save" : "small/smallcategory/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.smallCategory),
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
                        url: baseURL + "small/smallcategory/delete",
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
			$.get(baseURL + "small/smallcategory/info/"+id, function(r){
                vm.smallCategory = r.smallCategory;
            });
		},
        deptTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择上级分类",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级部门
                    console.log("node====="+JSON.stringify(node))
                    vm.smallCategory.parentId = node[0].id;
                    vm.smallCategory.parentName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            Dept.table.refresh();
        }
	}
});



var Dept = {
    id: "deptTable",
    table: null,
    layerIndex: -1
};


/**
 * 初始化表格的列
 */
Dept.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle', width: '80px'},
       /* {title: '分类名称', field: 'title',visible: false, align: 'center', valign: 'middle', sortable: true, width: '180px'},*/
        {title: '分类名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
        {title: '上级分类', field: 'parentName', align: 'center', valign: 'middle', false: true, width: '100px'},
        { title: '状态', field: 'status', width: '60px', formatter: function(value, options, row){
                return value === 0 ?
                    '<span class="label label-danger">停用</span>' :
                    '<span class="label label-success">启用</span>';
            }},
        {title: '排序号', field: 'sortNum', align: 'center', valign: 'middle', sortable: false, width: '100px'}]
    return columns;
};


function getCategoryId () {
    var selected = $('#deptTable').bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        alert("请选择一条记录");
        return null;
    } else {
        return selected[0].id;
    }
}


$(function () {
    $.get(baseURL + 'small/smallcategory/info', function(r){
        // console.info("r==="+JSON.stringify(r))
        var colunms = Dept.initColumn();
        var table = new TreeTable(Dept.id, baseURL + "small/smallcategory/list", colunms);
        //console.info("table==="+JSON.stringify(table))
        table.setRootCodeValue(r.id);
        table.setExpandColumn(2);
        table.setIdField("id");
        table.setCodeField("id");
        table.setParentCodeField("parentId");
        table.setExpandAll(false);
        table.init();
        Dept.table = table;
    });
});


