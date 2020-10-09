$(function () {
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
                // vm.optionSucai.localUrls = baseURL + r.url;
                // vm.sucai.list[vm.selectIndex].localUrls = baseURL + r.url;
                vm.smallSpu.img = r.url;
                console.log("vm.smallSpu.img=="+ vm.smallSpu.img);
                //vm.reload();
            }else{
                alert(r.msg);
            }
        }
    });
});


//实例化编辑器
var ue = UE.getEditor('detail', {
    toolbars: [
        [
            'undo', //撤销
            'bold', //加粗
            'underline', //下划线
            'preview', //预览
            'horizontal', //分隔线
            'inserttitle', //插入标题
            'cleardoc', //清空文档
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
            'simpleupload', //单图上传
            'insertimage', //多图上传
            'attachment', //附件
            'music', //音乐
            'inserttable', //插入表格
            'emotion', //表情
            'insertvideo', //视频
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对
            'justifyjustify', //两端对齐
            'forecolor', //字体颜色
            'fullscreen', //全屏
            'edittip ', //编辑提示
            'customstyle', //自定义标题
            'template', //模板
        ]
    ]
});

var ueDescription = UE.getEditor('description', {
    toolbars: [
        [
            'undo', //撤销
            'bold', //加粗
            'underline', //下划线
            'preview', //预览
            'horizontal', //分隔线
            'inserttitle', //插入标题
            'cleardoc', //清空文档
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
            'simpleupload', //单图上传
            'insertimage', //多图上传
            'attachment', //附件
            'music', //音乐
            'inserttable', //插入表格
            'emotion', //表情
            'insertvideo', //视频
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对
            'justifyjustify', //两端对齐
            'forecolor', //字体颜色
            'fullscreen', //全屏
            'edittip ', //编辑提示
            'customstyle', //自定义标题
            'template', //模板
        ]
    ]
});

//获取sessionid
var smallSessionId = '';
function getSessionId(){
    $.get(baseURL + "small/smallspu/getSessionId/", function(r){
        // console.log("result====="+JSON.stringify(r));
        smallSessionId = r.sessionId;
        // console.log("smallSessionId======"+smallSessionId);
        ue.execCommand('serverparam', 'smallSessionId', smallSessionId);
    });
}
//3.按照键值添加参数
ue.ready(function() {
    getSessionId();
});

/**
 * 商品分类选择树
 * @type {{data: {simpleData: {idKey: string, enable: boolean, pIdKey: string, rootPId: number}, key: {url: string}}}}
 */
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


/**
 * 店铺个性化分类选中树
 */
var sellCategorySetting = {
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
var sellCategoryztree;

/**
 * 店铺选址数
 * @type {{data: {simpleData: {idKey: string, enable: boolean, pIdKey: string, rootPId: number}, key: {url: string}}}}
 */
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


$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'small/smallspu/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '原价', name: 'price', index: 'price', width: 80 },
			{ label: '现价', name: 'originalPrice', index: 'original_price', width: 80 }, 			
			{ label: '商品名称', name: 'title', index: 'title', width: 80 },
			{ label: '销量', name: 'sales', index: 'sales', width: 80 },
            { label: '总库存', name: 'stock', index: 'stock', width: 80 },
            { label: '剩余库存', name: 'remainStock', index: 'remainStock', width: 80 },
            // { label: '分类id', name: 'categoryId', index: 'category_id', width: 80 },
            { label: '所属分类', name: 'smallCategory.title', index: 'category_id', width: 80 },
            { label: '个性化分类', name: 'smallSellCategory.title', index: 'sellcategory_id', width: 80 },
            { label: '状态', name: 'status', width: 60, formatter: function(value, options, row){
                    return value === 0 ?
                        '<span class="label label-danger">下架</span>' :
                        '<span class="label label-success">上架</span>';
                }},
			// { label: '商户id', name: 'supplierId', index: 'supplier_id', width: 80 },
            { label: '所属零售户', name: 'smallRetail.supplierName', index: 'supplier_id', width: 80 },
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
        // categoryId:0,
        addStock:null,//用于显示
        caculatRemainStock:null,
		smallSpu: {
            categoryId:null,
            smallCategory:{
                title:null
            },
            supplierId:null,
            smallRetail:{
                supplierName:null
            },
            sellcategoryId:null,
            smallSellCategory:{
                title:null
            }
        },
        retaillist:[],//店铺列表，用于查询
        q:{
            title:'',
            supplierName:'',
            supplierId:'',//店铺id
            status:'',
        }
	},

    watch: {
        addStock(newV,oldV) {
            // do something
            console.log(newV,oldV)
            var remainStock = vm.caculatRemainStock;//获取原来剩余库存，用于实时计算
            var pnewV = parseInt(newV);
            if(pnewV<0){
                vm.smallSpu.remainStock =  remainStock+pnewV>0?remainStock+pnewV:0;
            }else{
                vm.smallSpu.remainStock =  remainStock+pnewV;
            }
            vm.smallSpu.addStock = pnewV;
        }
    },
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
            vm.addStock = null;
			vm.smallSpu = {
                categoryId:null,
                smallCategory:{
                    title:null
                },
                retailerId:null,
                smallRetail:{
                    supplierName:null
                },
                sellcategoryId:null,
                smallSellCategory:{
                    title:null
                }

            };
            vm.getCategory();
            vm.getRetailList();
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            vm.addStock = null;
            vm.getInfo(id)

		},
		saveOrUpdate: function (event) {
		    $('#btnSaveOrUpdate').button('loading').delay(1000).queue(function() {
                var url = vm.smallSpu.id == null ? "small/smallspu/save" : "small/smallspu/update";
                // vm.smallSpu.detail = UE.getEditor('detail').getAllHtml();
                vm.smallSpu.detail = UE.getEditor('detail').getContent();
                vm.smallSpu.description =  UE.getEditor('description').getContent();
                console.log("vm.smallSpu==="+JSON.stringify(vm.smallSpu));
                $.ajax({
                    type: "POST",
                    url: baseURL + url,
                    contentType: "application/json",
                    data: JSON.stringify(vm.smallSpu),
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
                        url: baseURL + "small/smallspu/delete",
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
			$.get(baseURL + "small/smallspu/info/"+id, function(r){
                vm.smallSpu = r.smallSpu;
                console.log("smallSpu==="+JSON.stringify(vm.smallSpu));
                vm.caculatRemainStock = vm.smallSpu.remainStock;//设置剩余库存:只用于临时计算
                // ue.setHtml(r.smallSpu.detail);//设置富文本值
                ue.setContent(r.smallSpu.detail);
                ueDescription.setContent(r.smallSpu.description);
                // if(r.smallSpu.detail!=null && r.smallSpu.detail!=''){
                //     UE.getEditor('detail').setContent(r.smallSpu.detail);
                // }
                // if(r.smallSpu.description!=null && r.smallSpu.description!=''){
                //     UE.getEditor('description').setContent(r.smallSpu.description);
                // }
                vm.smallSpu.smallCategory = {
                    title:null
                };
                vm.smallSpu.smallRetail = {
                    supplierName:null
                };
                vm.smallSpu.smallSellCategory = {
                    title:null
                };
                //加载商品分类
                vm.getCategory();
                //加载零售户
                vm.getRetailList();
                //加载商户自定义分类
                vm.getSellCategory(vm.smallSpu.supplierId)//加载对应店铺的个性分类
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:vm.q,
                page: 1
            }).trigger("reloadGrid");
		},

        //加载分类树
        getCategory: function(){
            //加载分类树
            $.get(baseURL + "small/smallcategory/select", function(r){
                ztree = $.fn.zTree.init($("#categroyTree"), setting, r.categoryList);
                // console.log("ztree====="+JSON.stringify(ztree))
                var node = ztree.getNodeByParam("id", vm.smallSpu.categoryId);
                // console.log("加载node====="+JSON.stringify(node))
                if(node!=null){
                    ztree.selectNode(node);
                    vm.smallSpu.smallCategory.title = node.name;
                }
            })
        },
        categroyTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择分类",
                area: ['300px', '300px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#categroyLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择分类
                    // console.log("node====="+JSON.stringify(node))
                    if(node!=null) {
                        vm.smallSpu.categoryId = node[0].id;
                        vm.smallSpu.smallCategory.title = node[0].name;
                    }
                    layer.close(index);
                }
            });
        },
        //加载零售户
        getRetailListForquery: function(){
            //加载
            $.get(baseURL + "small/smallretail/selectlist", function(r){
                console.log("r====="+JSON.stringify(r))
                vm.retaillist =  r.retaillist;
            })
        },
        //加载零售户
        getRetailList: function(){
            //加载
            $.get(baseURL + "small/smallretail/select", function(r){
                // console.log("r====="+JSON.stringify(r))
                retialztree = $.fn.zTree.init($("#retailTree"), settingretail, r.retailList);
                var node = retialztree.getNodeByParam("id", vm.smallSpu.supplierId);
                // console.log("加载node====="+JSON.stringify(node))
                if(node!=null){
                    retialztree.selectNode(node);
                    vm.smallSpu.smallRetail.supplierName = node.name;
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
                    if(node!=null){
                        vm.smallSpu.supplierId = node[0].id;
                        vm.smallSpu.smallRetail.supplierName = node[0].name;
                        //加载店铺对应的个性化商品分类
                        vm.getSellCategory(node[0].id);
                    }
                    layer.close(index);
                }
            });
        },

        //加载店铺个性化分类树
        getSellCategory: function(supplierId){
            //加载分类树
            $.get(baseURL + "small/smallsellcategory/select?supplierId="+supplierId, function(r){
                sellCategoryztree = $.fn.zTree.init($("#sellCategoryTree"), sellCategorySetting, r.list);
                // console.log("ztree====="+JSON.stringify(ztree))
                var node = sellCategoryztree.getNodeByParam("id", vm.smallSpu.sellcategoryId);
                // console.log("加载node====="+JSON.stringify(node))
                if(node!=null){
                    sellCategoryztree.selectNode(node);
                    vm.smallSpu.smallSellCategory.title = node.name;
                }
            })
        },
        sellcategroyTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择个性化分类",
                area: ['300px', '300px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#sellCategoryLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = sellCategoryztree.getSelectedNodes();
                    //选择分类
                    // console.log("node====="+JSON.stringify(node))
                    if(node!=null){
                        vm.smallSpu.sellcategoryId = node[0].id;
                        vm.smallSpu.smallSellCategory.title = node[0].name;
                    }
                    layer.close(index);
                }
            });
        },



	}
});
vm.getRetailListForquery();