$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'mpwx/mpwxcard/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '公众号记录id', name: 'wxappId', index: 'wxapp_id', width: 80 }, 			
			{ label: '卡券类型', name: 'cardType', index: 'card_type', width: 80 }, 			
			{ label: '微信卡券id  card_id', name: 'cardId', index: 'card_id', width: 80 }, 			
			{ label: 'logo地址', name: 'logoUrl', index: 'logo_url', width: 80 }, 			
			{ label: 'code码展示类型', name: 'codeType', index: 'code_type', width: 80 }, 			
			{ label: '商户名称', name: 'brandName', index: 'brand_name', width: 80 }, 			
			{ label: '卡券名称', name: 'title', index: 'title', width: 80 }, 			
			{ label: '券名的副标题', name: 'subTitle', index: 'sub_title', width: 80 }, 			
			{ label: '卡券颜色', name: 'color', index: 'color', width: 80 }, 			
			{ label: '使用提醒。（一句描述，展示在首页）', name: 'notice', index: 'notice', width: 80 }, 			
			{ label: '客服电话', name: 'servicePhone', index: 'service_phone', width: 80 }, 			
			{ label: '使用说明。长文本描述。', name: 'description', index: 'description', width: 80 }, 			
			{ label: '每人使用次数限制', name: 'useLimit', index: 'use_limit', width: 80 }, 			
			{ label: '每人最大领取次数', name: 'getLimit', index: 'get_limit', width: 80 }, 			
			{ label: '是否自定义code码，填写1或0。1表示是。0表示否', name: 'useCustomCode', index: 'use_custom_code', width: 80 }, 			
			{ label: '是否指定用户领取，填写1或0。1表示是。0表示否', name: 'bindOpenid', index: 'bind_openid', width: 80 }, 			
			{ label: '领取卡券原生页面是否可分享，填写1或0。1表示是。0表示否', name: 'canShare', index: 'can_share', width: 80 }, 			
			{ label: '卡券是否可转赠，填写1或0。1表示是。0表示否', name: 'canGiveFriend', index: 'can_give_friend', width: 80 }, 			
			{ label: 'DATE_TYPE_FIX_TIME_RANGE 表示固定日期区间，DATE_TYPE_FIX_TERM表示自领取后按天算', name: 'dateInfoType', index: 'date_info_type', width: 80 }, 			
			{ label: '固定日期区间专用，表示起用时间', name: 'beginTimestamp', index: 'begin_timestamp', width: 80 }, 			
			{ label: '固定日期区间专用，表示结束时间', name: 'endTimestamp', index: 'end_timestamp', width: 80 }, 			
			{ label: '固定时长专用，表示自领取后多少天内有效。（单位为天）', name: 'fixedTerm', index: 'fixed_term', width: 80 }, 			
			{ label: '固定时长专用，表示自领取后多少天开始生效。(单位为天)', name: 'fixedBeginTerm', index: 'fixed_begin_term', width: 80 }, 			
			{ label: '剩余库存量', name: 'skuQuantity', index: 'sku_quantity', width: 80 }, 			
			{ label: '总库存量', name: 'skuTotalQuantity', index: 'sku_total_quantity', width: 80 }, 			
			{ label: '商户自定义入口名称，与custom_url字段共同使用，长度限制在5个汉字内', name: 'customUrlName', index: 'custom_url_name', width: 80 }, 			
			{ label: '商户自定义cell跳转外链的地址链接，跳转页面内容需与自定义cell名称保持匹配', name: 'customUrl', index: 'custom_url', width: 80 }, 			
			{ label: '显示在cell右侧的tips，长度限制在6个汉字内', name: 'customUrlSubTitle', index: 'custom_url_sub_title', width: 80 }, 			
			{ label: '营销场景的自定义入口', name: 'promotionUrlName', index: 'promotion_url_name', width: 80 }, 			
			{ label: '入口跳转外链的地址链接', name: 'promotionUrl', index: 'promotion_url', width: 80 }, 			
			{ label: '显示在入口右侧的tips，长度限制在6个汉字内', name: 'promotionUrlSubTitle', index: 'promotion_url_sub_title', width: 80 }, 			
			{ label: '第三方来源名，例如同程旅游、格瓦拉', name: 'source', index: 'source', width: 80 }, 			
			{ label: '卡券审核状态(CARD_STATUS_NOT_VERIFY：待审核；CARD_STATUS_VERIFY_FAIL:审核失败；CARD_STATUS_VERIFY_OK:通过审核。CARD_STATUS_DELETE:卡券在mp后台被用户删除。CARD_STATUS_DISPATCH:在公众平台投放过的卡券)', name: 'verifyStatus', index: 'verify_status', width: 80 }, 			
			{ label: '选择用户可在“附近”领取卡券时，上传的卡券缩略图', name: 'poiPicUrl', index: 'poi_pic_url', width: 80 }, 			
			{ label: '用户选择门店。0(false):表示选择无门店限制或指定门店。1(true)：表示选择全部门店', name: 'autoUpdateNewLocation', index: 'auto_update_new_location', width: 80 }, 			
			{ label: '存在状态。0表示存在，1表示删除', name: 'state', index: 'state', width: 80 }, 			
			{ label: '创建日期', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '修改日期', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '适用门店类型', name: 'shopType', index: 'shop_type', width: 80 }, 			
			{ label: '无指定门店的原因', name: 'noShopReason', index: 'no_shop_reason', width: 80 }, 			
			{ label: '无指定门店的中的其它原因描述', name: 'noShopInput', index: 'no_shop_input', width: 80 }, 			
			{ label: '是否选择用户可在“附近”领取卡券，1表示选择，0表示不选择', name: 'shopInNearby', index: 'shop_in_nearby', width: 80 }, 			
			{ label: 'GET_CUSTOM_CODE_MODE_DEPOSIT 表示该卡券为预存code模式卡券， 须导入超过库存数目的自定义code后方可投放， 填入该字段后，quantity字段须为0,须导入code 后再增加库存', name: 'getCustomCodeMode', index: 'get_custom_code_mode', width: 80 }, 			
			{ label: '卡券跳转的小程序的user_name，仅可跳转该 公众号绑定的小程序 ', name: 'customAppBrandUserName', index: 'custom_app_brand_user_name', width: 80 }, 			
			{ label: '卡券跳转的小程序的path', name: 'customAppBrandPass', index: 'custom_app_brand_pass', width: 80 }, 			
			{ label: '卡券跳转的小程序的user_name，仅可跳转该 公众号绑定的小程序 ', name: 'promotionAppBrandUserName', index: 'promotion_app_brand_user_name', width: 80 }, 			
			{ label: '卡券跳转的小程序的path', name: 'promotionAppBrandPass', index: 'promotion_app_brand_pass', width: 80 }, 			
			{ label: 'supplier_id', name: 'supplierId', index: 'supplier_id', width: 80 }			
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
		mpwxCard: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.mpwxCard = {};
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
                var url = vm.mpwxCard.id == null ? "mpwx/mpwxcard/save" : "mpwx/mpwxcard/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.mpwxCard),
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
                        url: baseURL + "mpwx/mpwxcard/delete",
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
			$.get(baseURL + "mpwx/mpwxcard/info/"+id, function(r){
                vm.mpwxCard = r.mpwxCard;
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