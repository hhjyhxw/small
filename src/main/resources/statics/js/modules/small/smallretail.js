$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'small/smallretail/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '零售户名称', name: 'supplierName', index: 'supplier_name', width: 80 }, 			
			{ label: '店铺地址', name: 'address', index: 'address', width: 80 }, 			
			{ label: '许可证号', name: 'licence', index: 'licence', width: 80 }, 			
			{ label: '电话号码', name: 'phone', index: 'phone', width: 80 }, 			
			{ label: '店主openid', name: 'keeperOpenid', index: 'keeper_openid', width: 80 }, 			
			// { label: '余额', name: 'balance', index: 'balance', width: 80 },
			// { label: '冻结余额', name: 'frozenBalance', index: 'frozen_balance', width: 80 },
			/*{ label: '银行卡', name: 'bankCart', index: 'bank_cart', width: 80 },
			{ label: '开户行', name: 'bankName', index: 'bank_name', width: 80 }, 			
			{ label: '银行关联手机', name: 'bankPhone', index: 'bank_phone', width: 80 }, 			
			{ label: '开户人', name: 'bankKeeper', index: 'bank_keeper', width: 80 }, 			
			{ label: '许可证图片', name: 'licenceImg', index: 'licence_img', width: 80 }, 			
			{ label: '店铺头像', name: 'headImg', index: 'head_img', width: 80 }, 			
			{ label: 'boss', name: 'boss', index: 'boss', width: 80 }, 			
			{ label: 'password', name: 'password', index: 'password', width: 80 }, 			
			{ label: 'max_cash', name: 'maxCash', index: 'max_cash', width: 80 }, 			
			{ label: '支付用户openid', name: 'payOpenid', index: 'pay_openid', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '经度', name: 'lnt', index: 'lnt', width: 80 }, 			
			{ label: '纬度', name: 'lat', index: 'lat', width: 80 }	*/
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

        var obj1 = new AjaxUpload('#upload', {
            action: baseURL + "sys/oss/uploadFront",
            name: 'file',
            autoSubmit:true,
            responseType:"json",
            onSubmit:function(file, extension){
                if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
                    alert('只支持jpg、png、gif格式的图片！');
                    return false;
                }
            },
            onComplete : function(file, r){
                console.log("r=="+JSON.stringify(r));
                console.log("file=="+file);
                if(r.code == 0){
                    alert("上传成功!");
                    vm.smallRetail.headImg = r.url;
                    console.log("vm.smallRetail=="+vm.smallRetail.headImg);
                    //vm.reload();
                }else{
                    alert(r.msg);
                }
            }
        });

        var obj2 = new AjaxUpload('#upload2', {
            action: baseURL + "sys/oss/uploadFront",
            name: 'file',
            autoSubmit:true,
            responseType:"json",
            onSubmit:function(file, extension){
                if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
                    alert('只支持jpg、png、gif格式的图片！');
                    return false;
                }
            },
            onComplete : function(file, r){
                console.log("r=="+JSON.stringify(r));
                console.log("file=="+file);
                if(r.code == 0){
                    alert("上传成功!");
                    vm.smallRetail.payImg = r.url;
                    console.log("vm.payImg=="+vm.smallRetail.payImg);
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
		smallRetail: {
            headImg:null,
            payImg:null
        }
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.smallRetail = {
                headImg:null,
                payImg:null
            };
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
                var url = vm.smallRetail.id == null ? "small/smallretail/save" : "small/smallretail/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.smallRetail),
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
                        url: baseURL + "small/smallretail/delete",
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
			$.get(baseURL + "small/smallretail/info/"+id, function(r){
                vm.smallRetail = r.smallRetail;
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