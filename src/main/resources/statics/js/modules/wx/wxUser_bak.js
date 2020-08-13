$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'wx/wxUser/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', width: 30, key: true },
			{ label: '昵称', name: 'nickName', width: 50 },
			{ label: 'openid', name: 'openid', width: 70 },
			{ label: 'unionid', name: 'unionid', width: 150 },
			{ label: '头像', name: 'headphoto', width: 80 },
            { label: '手机', name: 'phone', width: 80 },
			{ label: '性别', name: 'sex', width: 70 },
			{ label: '创建时间', name: 'createTime', width: 90 },
			{ label: '修改时间', name: 'modiftyTime', width: 70 },
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: false,
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
	el:'#zhmapp',
	data:{
		q:{
            name: null
        },
        showList: true,
        title: null,
        wxUser: {}
	},
	methods: {
    		query: function () {
    			vm.reload();
    		},
    		add: function(){
    			vm.showList = false;
    			vm.title = "新增";
    			vm.dict = {};
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
    			var url = vm.dict.id == null ? "wx/wxUser/save" : "wx/wxUser/update";
    			$.ajax({
    				type: "POST",
    			    url: baseURL + url,
                    contentType: "application/json",
    			    data: JSON.stringify(vm.dict),
    			    success: function(r){
    			    	if(r.code === 0){
    						alert('操作成功', function(index){
    							vm.reload();
    						});
    					}else{
    						alert(r.msg);
    					}
    				}
    			});
    		},
    		del: function (event) {
    			var ids = getSelectedRows();
    			if(ids == null){
    				return ;
    			}

    			confirm('确定要删除选中的记录？', function(){
    				$.ajax({
    					type: "POST",
    				    url: baseURL + "wx/wxUser/delete",
                        contentType: "application/json",
    				    data: JSON.stringify(ids),
    				    success: function(r){
    						if(r.code == 0){
    							alert('操作成功', function(index){
    								$("#jqGrid").trigger("reloadGrid");
    							});
    						}else{
    							alert(r.msg);
    						}
    					}
    				});
    			});
    		},
    		getInfo: function(id){
    			$.get(baseURL + "wx/wxUser/info/"+id, function(r){
                    vm.dict = r.dict;
                });
    		},
    		reload: function (event) {
    			vm.showList = true;
    			var page = $("#jqGrid").jqGrid('getGridParam','page');
    			$("#jqGrid").jqGrid('setGridParam',{
                    postData:{'name': vm.q.name},
                    page:page
                }).trigger("reloadGrid");
    		}
    	}
});