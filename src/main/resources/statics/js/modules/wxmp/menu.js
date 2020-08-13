$(function () {

});

var vm = new Vue({
    el:'#icloudapp',
    data:{
        menuList:[

        ],//微信菜单
        optionMenu:{
            menuIndex1:null,//所属一级菜单index
            menuIndex2:null,//所属二菜单index
            menu:{
                id:null,
                appId:null,		// 微信号id
                xcxAppid:null,	// 小程序id
                name:null,		// 菜单名
                url:null,		// url
                menuLevel:null,	// 菜单级别1,2
                sortNum:null,		// 排序
                menuType:null, //菜单类型
                msgType:null, //点击事件时需要 消息类型0 文本  1、素材 2、跳转流程。。。。。
                textContent:null,		// 文本内容 msgType存在 且为 0 文本的时候
                materialId:null,		//素材id msgType存在 且为 1 素材的时候
                processId:null,         //流程id msgType存在 且为 2 流程
                parentId:null,		// 父类，0跟
                isUse:null,		// 状态0停用1正常
                pagepath:null,		// 小程序页面路径
                childList:null,
            },//所属菜单对象
        },//选中的菜单
        optionMenuStat:{
            menuIndex:null,//所属菜单index
            menuNameDisableStatus:true,//disable菜单名称不可用
            menuTypeDisableStatus:true,///disable菜单类型不可用
            msgTypeDisableStatus:true,///disable消息类型不可用
            contentDisableStatus:true,///disable文本回复不可用

            msgTypeShowStatus:true,//显示消息类型
            contentShowStatus:true,//显示文本域
            urlShowStatus:false,//显示url域 默认不显示
            processShowStatus:false,//流程 默认不显示
            sucaiShowStatus:false,//素材 默认不显示
            xiaochengxuShowStatus:false,//小程序相关


        },//选中的菜单的相关状态
    },
    methods: {
        //获取公众号菜单
        getMenuItemList: function () {
            $.get(fontbaseURL + "/mpwx/menu/list", function(r){
                //console.log("r=="+JSON.stringify(r));
                if(r.code==0){
                    vm.menuList = r.menuList;//
                }else{
                    vm.menuList = [];
                }
            })
        },
        //保存菜单，
        saveMenu: function () {
            console.log("menuList=="+JSON.stringify(vm.menuList));
            var url ="mpwx/menu/save";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.menuList),
                success: function(r){
                    if(r.code === 0){
                        layer.msg("保存成功", {icon: 1});
                        vm.getMenuItemList();
                    }else{
                        layer.alert(r.msg);
                    }
                },
                error:function (r) {
                    layer.alert("保存失败");
                }
            });
        },
        //删除菜单
        deleteMenuItem:function(index1,index2,item){
            if(index2==-1 && item.childList!=null) {//一及菜单 并且有子菜单 只显示名称
                alert("有子菜单不能删除");
                return;
            }else if(index2==-1 && item.childList==null) {
                var menu = vm.menuList[index1];
                menu.name = null;
                menu.menuType = null;
                menu.xcxAppid = null;
                menu.url = null;
                menu.msgType = null;
                menu.textContent = null;
                menu.materialId = null;
                menu.processId = null;
                vm.menuList[index1] = menu;
            }else{
                var menu = vm.menuList[index1].childList[index2];
                menu.name = null;
                menu.menuType = null;
                menu.childList = null;
                menu.xcxAppid = null;
                menu.url = null;
                menu.msgType = null;
                menu.textContent = null;
                menu.materialId = null;
                menu.processId = null;
                vm.menuList[index1].childList[index2] = menu;
            }
        },
        //菜单上移动
        moveup: function(){

        },
        //菜单向下移动
        moveup: function(){

        },
        //选中菜单
        selectItem: function (index1,index2,item) {
            //把上一步选择的属性更新到 menuList
            if(vm.optionMenu.menuIndex1!=null && vm.optionMenu.menu!=null){
                if(vm.optionMenu.menuIndex2!=null){
                    vm.menuList[vm.optionMenu.menuIndex1].childList[vm.optionMenu.menuIndex2] = vm.optionMenu.menu;
                }else{
                    vm.menuList[vm.optionMenu.menuIndex1] = vm.optionMenu.menu;
                }
            }

            vm.optionMenu.menuIndex1 = index1;
            vm.optionMenu.menuIndex2 = index2;
            vm.optionMenu.menu = item;
            vm.showInfo(index1,index2,item);

        },

        //选择 菜单类型
        selectMenuType(obj) {
            console.log("selectMenuType=="+JSON.stringify(obj));
            console.log("menu=="+JSON.stringify(vm.optionMenu.menu));
            vm.showInfo(null,null,vm.optionMenu.menu);
        },
        //选择 点击菜单类型 消息
        selectClickType() {
            console.log("menu=="+JSON.stringify(vm.optionMenu.menu));
            vm.showInfo(null,null,vm.optionMenu.menu);
        },

        //点击菜单 控制右侧内容显示或者隐藏
        showInfo:function (index1,index2,item) {

            if(index2==-1 && item.childList!=null && item.name!=null && item.name!='' && item.menuType=='menu'){//一及菜单 并且有子菜单 只显示名称
                var optionMenuStat = this.initoptionMenuStat();
                optionMenuStat.menuTypeDisableStatus = true;//隐藏菜单类型
                optionMenuStat.msgTypeDisableStatus = true;//隐藏消息类型
                optionMenuStat.contentDisableStatus = true;//隐藏文本域
                vm.optionMenuStat = optionMenuStat;
            }else{
                if(item.name==null){//菜单名是空的，默认显示:菜单名称 菜单类型 消息类型 文本域
                    var optionMenuStat = this.initoptionMenuStat();
                    optionMenuStat.msgTypeShowStatus = true;//显示消息类型
                    optionMenuStat.contentShowStatus = true;//显示文本域
                    vm.optionMenuStat = optionMenuStat;

                }else if(item.menuType==='view'){//跳转地址
                    var optionMenuStat = this.initoptionMenuStat();
                    optionMenuStat.urlShowStatus = true;//显示url
                    vm.optionMenuStat = optionMenuStat;
                }else if(item.menuType==='click') {//跳转地址
                    var optionMenuStat = this.initoptionMenuStat();
                    optionMenuStat.msgTypeShowStatus = true;//显示消息类型
                    if(item.msgType==='0'){//文本
                        optionMenuStat.contentShowStatus = true;//显示文本内容
                    }else if(item.msgType==='1'){//素材
                        optionMenuStat.sucaiShowStatus = true;//显示素材
                    }else if(item.msgType==='2'){//流程
                        optionMenuStat.processShowStatus = true;//流程
                    }else{
                        optionMenuStat.contentShowStatus = true;//显示文本内容
                    }
                    vm.optionMenuStat = optionMenuStat;
                }else if(item.menuType==='miniprogram') {//小程序
                    var optionMenuStat = this.initoptionMenuStat();
                    optionMenuStat.xiaochengxuShowStatus = true;//显示小程序
                    vm.optionMenuStat = optionMenuStat;
                 }else{
                    //其他只显示名称
                    var optionMenuStat = this.initoptionMenuStat();
                    vm.optionMenuStat = optionMenuStat;
                }
            }
        },


        initoptionMenuStat:function(){
            optionMenuStat = {
                menuIndex: null,//所属菜单index
                menuNameDisableStatus: false,//disable菜单名称不可用
                menuTypeDisableStatus: false,///disable菜单类型不可用
                msgTypeDisableStatus: false,///disable消息类型不可用
                contentDisableStatus: false,///disable文本回复不可用

                msgTypeShowStatus: false,//显示消息类型
                contentShowStatus: false,//显示文本域
                urlShowStatus: false,//显示url域 默认不显示
                processShowStatus: false,//流程 默认不显示
                sucaiShowStatus: false,//素材 默认不显示
                xiaochengxuShowStatus: false,//小程序相关
            }
            return optionMenuStat;
        }

    }



});
vm.getMenuItemList();