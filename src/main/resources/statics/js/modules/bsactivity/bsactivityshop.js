$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'bsactivity/bsactivityshop/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '店铺名称', name: 'shopName', index: 'shop_name', width: 80 }, 			
			{ label: '店铺图标', name: 'shopImg', index: 'shop_img', width: 80 }, 			
			{ label: '店铺专卖证', name: 'shopLicense', index: 'shop_license', width: 80 }, 			
			{ label: '店铺联系人', name: 'contactMan', index: 'contact_man', width: 80 }, 			
			{ label: '联系人号码', name: 'contactPhone', index: 'contact_phone', width: 80 }, 			
			{ label: '省', name: 'provinceName', index: 'province_name', width: 80 }, 			
			{ label: '市', name: 'cityName', index: 'city_name', width: 80 }, 			
			{ label: '县', name: 'countyName', index: 'county_name', width: 80 }, 			
			{ label: '详细地址', name: 'address', index: 'address', width: 80 }, 			
			{ label: '经度', name: 'lnt', index: 'lnt', width: 80 }, 			
			{ label: '纬度', name: 'lat', index: 'lat', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '创建人', name: 'createMan', index: 'create_man', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '修改人', name: 'modifyMan', index: 'modify_man', width: 80 }, 			
			{ label: 'openid', name: 'openid', index: 'openid', width: 80 }, 			
			{ label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
                        				return value === 0 ?
                        					'<span class="label label-danger">停用</span>' :
                        					'<span class="label label-success">启用</span>';
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

     new AjaxUpload('#upload', {
                action: baseURL + "local/localUplaod/upload",
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
                        vm.bsactivityShop.shopImg = r.url;
                        vm.goodsimgshow = imgURL + r.url;
                          console.log("vm.goodsimgshow=="+vm.goodsimgshow);
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
		bsactivityShop: {},
		goodsimgshow:''
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.bsactivityShop = {};
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
                var url = vm.bsactivityShop.id == null ? "bsactivity/bsactivityshop/save" : "bsactivity/bsactivityshop/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bsactivityShop),
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
                        url: baseURL + "bsactivity/bsactivityshop/delete",
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
			$.get(baseURL + "bsactivity/bsactivityshop/info/"+id, function(r){
                vm.goodsimgshow = imgURL + r.bsactivityShop.shopImg;
                vm.bsactivityShop = r.bsactivityShop;

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