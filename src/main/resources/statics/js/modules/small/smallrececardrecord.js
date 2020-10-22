$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'small/smallrececardrecord/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '卡券名称', name: 'cardName', index: 'card_name', width: 80 }, 			
			{ label: '订单唯一编号（填入卡券code）', name: 'orderNo', index: 'order_no', width: 80 }, 			
			{ label: 'card_uid', name: 'cardUid', index: 'card_uid', width: 80 }, 			
			{ label: '所属卡券id ', name: 'cardId', index: 'card_id', width: 80 }, 			
			{ label: 'account_type', name: 'accountType', index: 'account_type', width: 80 }, 			
			{ label: '领取用户openid（需建立索引）', name: 'receverOpenid', index: 'recever_openid', width: 80 }, 			
			{ label: '领取用户unionid', name: 'receverUnionid', index: 'recever_unionid', width: 80 }, 			
			{ label: '领取手机号', name: 'phone', index: 'phone', width: 80 }, 			
			{ label: '领取时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '领取渠道id （需建立索引）', name: 'channelId', index: 'channel_id', width: 80 }, 			
			{ label: '核销员id', name: 'verifyuserId', index: 'verifyuser_id', width: 80 }, 			
			{ label: '核销时间', name: 'verifyTime', index: 'verify_time', width: 80 }, 			
			{ label: '核销店铺id', name: 'supplierId', index: 'supplier_id', width: 80 }, 			
			{ label: '0 不删除 1删除', name: 'comsueDeleteFlag', index: 'comsue_delete_flag', width: 80 }, 			
			{ label: '0 不删除 1删除', name: 'verifyDeleteFlag', index: 'verify_delete_flag', width: 80 }, 			
			{ label: '有效开始时间', name: 'startTime', index: 'start_time', width: 80 }, 			
			{ label: '有效结束时间', name: 'endTime', index: 'end_time', width: 80 }, 			
			{ label: '订单类型（对应卡券类型）0礼品券，1代金券、折扣券、3满减类型', name: 'cardType', index: 'card_type', width: 80 }, 			
			{ label: '卡券面额', name: 'value', index: 'value', width: 80 }, 			
			{ label: '卡券折扣', name: 'discount', index: 'discount', width: 80 }, 			
			{ label: '最低订单金额', name: 'lowAmount', index: 'low_amount', width: 80 }, 			
			{ label: '满多少', name: 'totalAmount', index: 'total_amount', width: 80 }, 			
			{ label: '减多少', name: 'deductAmount', index: 'deduct_amount', width: 80 }, 			
			{ label: '版本号', name: 'version', index: 'version', width: 80 }, 			
			{ label: '核销状态', name: 'verifyStatus', index: 'verify_status', width: 80 }, 			
			{ label: '核心类型 0手机号核销、1输入code核销，2扫码code核销 3、第三方接口核销', name: 'verifyType', index: 'verify_type', width: 80 }			
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
		smallRececardRecord: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.smallRececardRecord = {};
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
                var url = vm.smallRececardRecord.id == null ? "small/smallrececardrecord/save" : "small/smallrececardrecord/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.smallRececardRecord),
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
                        url: baseURL + "small/smallrececardrecord/delete",
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
			$.get(baseURL + "small/smallrececardrecord/info/"+id, function(r){
                vm.smallRececardRecord = r.smallRececardRecord;
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