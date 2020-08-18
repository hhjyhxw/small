$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'bsactivity/bsactivityad/list',
        datatype: "json",
        colModel: [			
			{ label: '编号', name: 'id', index: 'id', width: 50, key: true },
			{ label: '名称', name: 'adName', index: 'ad_name', width: 80 }, 			
			{ label: '图片url', name: 'adImgurl', index: 'ad_imgurl', width: 80 }, 			
			{ label: '跳转url', name: 'addJumpurl', index: 'add_jumpurl', width: 80 }, 			
			{ label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
                                    				return value === 0 ?
                                    					'<span class="label label-danger">停用</span>' :
                                    					'<span class="label label-success">启用</span>';
                                    			}},
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '创建人', name: 'createOperator', index: 'create_operator', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '修改人', name: 'modifyOperator', index: 'modify_operator', width: 80 }, 			
			{ label: '所在广告位', name: 'posittionId', index: 'posittion_id', width: 80 }, 			
			{ label: '排序', name: 'sortNum', index: 'sort_num', width: 80 }

			//{header:'操作', name:'操作', width:90, sortable:false, title:false, align:'center', formatter: function(val, obj, row, act){
            //				var actions = [];
            //				actions.push('<a title="修改" style="display: inline-block;padding: 0 0.5rem;" onclick="vm.update('+row.id+')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>&nbsp;')
            //					actions.push('<a title="删除" style="display: inline-block;padding: 0 0.5rem;"   onclick="vm.bindPileList('+row.id+')"><i class="fa fa-trash-o" aria-hidden="true"></i></a>&nbsp;');

//


            	//			return actions.join('');
            	//		}}

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
                            vm.bsactivityAd.adImgurl = r.url;
                            // vm.goodsimgshow = imgURL + r.url;
                            vm.goodsimgshow = r.url;
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
		bsactivityAd: {},
		goodsimgshow:''
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.bsactivityAd = {};
			vm.goodsimgshow = '';
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
                var url = vm.bsactivityAd.id == null ? "bsactivity/bsactivityad/save" : "bsactivity/bsactivityad/update";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bsactivityAd),
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
                        url: baseURL + "bsactivity/bsactivityad/delete",
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
			$.get(baseURL + "bsactivity/bsactivityad/info/"+id, function(r){
                vm.bsactivityAd = r.bsactivityAd;
               // vm.goodsimgshow = imgURL + r.bsactivityAd.adImgurl;
                vm.goodsimgshow =  r.bsactivityAd.adImgurl;
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