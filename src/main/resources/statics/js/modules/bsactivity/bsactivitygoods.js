$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'bsactivity/bsactivitygoods/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '商品名称', name: 'name', index: 'name', width: 80 }, 			
			{ label: '商品原价', name: 'originPrice', index: 'origin_price', width: 80 },
			{ label: '商品现价', name: 'marketPrice', index: 'market_price', width: 80 }, 			
			{ label: '商品头图', name: 'goodimg', index: 'goodimg', width: 80 }, 			
			{ label: '总库存', name: 'store', index: 'store', width: 80 },
			{ label: '冻结库存', name: 'freezeStore', index: 'freeze_store', width: 80 }, 			
			{ label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
            				return value === 0 ?
            					'<span class="label label-danger">下架</span>' :
            					'<span class="label label-success">上架</span>';
            			}},
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 },
			{ label: '创建人', name: 'createMan', index: 'create_man', width: 80 }, 			
			{ label: '修改时间', name: 'modifyTime', index: 'modify_time', width: 80 }, 			
			{ label: '修改人', name: 'modifyMan', index: 'modify_man', width: 80 }, 			
			{ label: '实际销量', name: 'realSales', index: 'real_sales', width: 80 },
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
                    vm.bsactivityGoods.goodimg = r.url;
                    vm.goodsimgshow = imgURL + r.url;
                      console.log("vm.goodsimgshow=="+vm.goodsimgshow);
                    //vm.reload();
                }else{
                    alert(r.msg);
                }
            }
        });
            // 创建一个上传参数
//                var uploadOption0 =
//                {
//                    // 提交目标
//                    action: baseURL + "local/localUplaod/upload",
//                    // input file id,name
//                    id: "file",
//                    name: "file",
//                    responseType: "json", // "json",
//                    // 自动提交
//                    autoSubmit: true,
//                    // 选择文件之后…
//                    onChange: function (file, extension) {
//                        if (!new RegExp(/(jpg)|(jpeg)|(bmp)|(gif)|(png)/i).test(extension)) {
//                            layer.msg("只限上传图片文件，请重新选择！");
//                        }
//                    },
//                    // 开始上传文件
//                    onSubmit: function (file, extension) {
//                        layer.msg("正在上传文件:" + file + "...");
//                    },
//                    // 上传完成之后
//                    onComplete: function (file, responseText) {
//                        console.log("r=="+JSON.stringify(responseText));
//                        var response = eval("(" + responseText + ")");
////                           console.log("response=="+JSON.stringify(response));
////                        layer.msg(response.message);
//
//                    }
//                }
                // 初始化图片上传框
//                var oAjaxUpload0 = new AjaxUpload('#upload', uploadOption0);

//        $("#upload").click(function () {
//            $.ajaxFileUpload({
//                url: baseURL + "sys/localUplaod/upload", //用于文件上传的服务器端请求地址
//                secureuri: false, //一般设置为false
//                fileElementId: 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
//                dataType: 'json', //返回值类型 一般设置为json
//                success: function (r, status) //服务器成功响应处理函数
//                {
//                   console.log("r=="+JSON.stringify(r));
//                  if(r.code == 0){
//                      alert(r.url);
//                      vm.bsactivityGoods.goodimg = baseURL + r.url;
//                      //vm.reload();
//                  }else{
//                      alert(r.msg);
//                  }
//                },
//                error: function (data, status, e) //服务器响应失败处理函数
//                {
//                    alert(e);
//                }
//            })
//        });


});

var vm = new Vue({
	el:'#icloudapp',
	data:{
	    q:{
            name: null,
            status: null
        },
		showList: true,
		showCreateQcode:false,//是否显示二维码生成弹窗
		title: null,
		bsactivityGoods: {
		    ids:[],
		    gernerNum:10

		},
		goodsimgshow:''
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.bsactivityGoods = {};
			vm.goodsimgshow = '';
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
			vm.showCreateQcode = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},

         saveOrUpdate: function (event) {
         		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                         var url = vm.bsactivityGoods.id == null ? "bsactivity/bsactivitygoods/save" : "bsactivity/bsactivitygoods/update";
                         $.ajax({
                             type: "POST",
                             url: baseURL + url,
                             contentType: "application/json",
                             data: JSON.stringify(vm.bsactivityGoods),
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
        //打开生成二维码弹窗
        updateCreate: function (event) {
                var ids = getSelectedRows();
                if(ids == null){
                    return ;
                }
                vm.bsactivityGoods.ids = ids;
//                var id = getSelectedRow();
//                if(id == null){
//                    return ;
//                }
                vm.showList = false;
                vm.showCreateQcode = true;
//                vm.getInfo(id)
         },
		createQcode: function (event) {
		     if(vm.bsactivityGoods.ids  == null){
                return ;
             }
             if(vm.bsactivityGoods.gernerNum<=0){
                 return ;
              }
		    $('#btnCreateQcode').button('loading').delay(1000).queue(function() {
                var url = "bsactivity/bsactivitygoods/creatGoodsQcode";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bsactivityGoods),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                             vm.showList = true;
                             vm.showCreateQcode = false;
                             vm.reload();
                            // $('#btnSaveOrUpdate').button('reset');
                            // $('#btnSaveOrUpdate').dequeue();
                        }else{
                            layer.alert(r.msg);
                            //$('#btnSaveOrUpdate').button('reset');
                            //$('#btnSaveOrUpdate').dequeue();
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
                        url: baseURL + "bsactivity/bsactivitygoods/delete",
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
			$.get(baseURL + "bsactivity/bsactivitygoods/info/"+id, function(r){
                vm.bsactivityGoods = r.bsactivityGoods;
                vm.goodsimgshow = imgURL + r.bsactivityGoods.goodimg;
            });
		},
		reload: function (event) {
			vm.showList = true;
			vm.showCreateQcode = false;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
			    postData:vm.q,
                page:page
            }).trigger("reloadGrid");
		},
        //打开二维码分页查询页面
        showqcodePage: function (event) {
                var id = getSelectedRow();
                if(id == null){
                    return ;
                }
                layer.open({
                     title: '二维码管理',
                     type: 2,
                     maxmin: true,
                     shadeClose: true,
                     area: ['90%', '95%'],
                     content: baseURL + "modules/bsactivity/bsactivitygoodsqcode.html?goodsid=" + id
                 });
         },
         //下载二维码
        downloadqcode: function (event) {
                var ids = getSelectedRows();
                if(ids == null){
                    return ;
                }
                vm.bsactivityGoods.ids = ids;
                var url = "bsactivity/bsactivitygoods/downLoadGoodsQcode";
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.bsactivityGoods),
                    success: function(r){
                        if(r.code === 0){
                             layer.msg("操作成功", {icon: 1});
                        }else{
                            layer.alert(r.msg);
                        }
                    }

                });
         },

	}

});