$(function () {
   //加载
   //先加载没用定位的店铺列表
    listnocondition();
});

//获取微信jssdk参数
var wxdata = '';
getJssdk();
 wx.config({
        debug: false,
        appId: wxdata.appid,
        timestamp: wxdata.timeStamp,
        nonceStr: wxdata.nonceStr,
        signature: wxdata.sign,
        jsApiList: ['getLocation']
 });
 wx.ready(() => {
      getLocations();
 });

function getJssdk(){
        //加载微信配置
        var link = (window.location.href).split('#')[0];
        if(link.indexOf("?")>=0){
//             link = link.split('?')[0];
        }
         console.log("link=="+link);
//         link = encodeURIComponent(link);
          console.log("link2=="+link);
        $.ajax({
            url:fontbaseURL + "/frontpage/jsSdkConfig/getJsSdkConfig",//后台给你提供的接口
            type:"GET",
            data:{"url":link},
            async:false,
            dataType:"json",
            success:function (data){
                // console.log("data=="+JSON.stringify(data));
                 wxdata = data
            },
            error:function (error){
             //console.log("error=="+JSON.stringify(error));
               // alert(error)
            }
        });
    }

    function getLocations(){
         wx.getLocation({
                //type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                type: 'gcj02',
                success: function (res) {
                    // console.log("定位成功res=="+JSON.stringify(res));
                    latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    var position = GCJ02_To_BD09(latitude,longitude);
                    var lng = position[0];
                    var lat = position[1];
                    toReposition(lng,lat);
                },
                cancel: function (res) {
                    //alert("用户拒绝授权获取地理位置");
                    shoplists(null,null);
                },
                fail: function (res) {
                    shoplists(null,null);
//                    alert("获取位置失败=="+JSON.stringify(res)+",请重试");
                    //alert("获取地理位置失败,请检查是否开启定位功能哦");
                },
                complete: function (res) {
                 // console.log("定位完成res=="+JSON.stringify(res));
                },
       });
    }

    //火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
    function GCJ02_To_BD09(lat,lng){
        var pi = 3.1415926535897932384626;
        var x = lng;
        var y = lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
        var bd_lon = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return new Array(bd_lon,bd_lat);
    }

    function toReposition(lng,lat){
            //console.log("toReposition=="+JSON.stringify(lng));
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(lng,lat);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                var formatted_address = rs.formatted_address;
                var mapAddress = addComp.province+addComp.city + addComp.district
                + addComp.street + addComp.streetNumber;
                //修改详细地址的值
//                vm.detailaddress = addComp.city + addComp.district+ addComp.street + addComp.streetNumber;
            });
        //根据经纬度查询用户附近店铺列表 //后台给你提供的接口
        vm.originLat = lat;
        vm.originLog = lng;
        shoplists(lng,lat);
    }
    //附近店铺
    function shoplists(lng,lat){
        //console.log("shoplists=="+JSON.stringify(lng));
             $.ajax({
                url:fontbaseURL + "/frontpage/bsactivity/shop/listinfo",
                type:"GET",
                data:{"lnt":lng,"lat":lat},
                async:true,
                dataType:"json",
                success:function (data){
                   console.log("data=="+JSON.stringify(data));
                   if(data.code==0){
                       // vm.shoplist = data.shoplist;
                         let shoplist = data.shoplist;
                       shoplist.forEach(function(p) {
                         p.shopImg =imgURL+p.shopImg;
                       });
                       vm.shoplist = shoplist;
                       vm.supplierId=shoplist[0].id;
                       let originLat = vm.originLat;
                       let originLog = vm.originLog;
                       if(originLat=='' || originLog==''){
                            vm.originLat=data.bsactivityShop.lat;
                            vm.originLat=data.bsactivityShop.lat;
                       }

                   }
                },
                error:function (error){
                    alert(error)
                }
            });
        }

     //查询所有店铺列表，没用条件
    function listnocondition(){
             $.ajax({
                url:fontbaseURL + "/frontpage/bsactivity/shop/listnocondition",
                type:"GET",
                async:true,
                dataType:"json",
                success:function (data){
                   console.log("data=="+JSON.stringify(data));
                   if(data.code==0){
                       let shoplist = data.shoplist;
                       shoplist.forEach(function(p) {
                         p.shopImg =imgURL+p.shopImg;
                         p.distance = 0;
                       });
                       vm.shoplist =shoplist;
                       vm.supplierId = shoplist[0].id;
                   }
                },
                error:function (error){
                    alert(error)
                }
            });
        }


var vm = new Vue({
	el:'#icloudapp',
	data:{
		qcode: {},//二维码
		goods: {},//商品对象
		showerror:false,//用于控制正常显示商品或者展示错误消息；true：显示提示消息；fasle显示商品消息
		exchangeSuccess:false,//true显示兑换成功消息，false显示兑换失败消息
		msg:'',
		goodimg:'',
		dcurrency:0,//我的龙币
		dcurrencyInfo:'您目前龙币余额为:0',//龙币描述
		btnshow:true,
		exchangeNum:1,//兑换数量
		goodsId:null,//兑换商品id
		totalAmount:null,//兑换总额
        shoplist:[], //店铺列表
        supplierId:null,//用户兑换所在商铺
        originLat:'',
        originLog:''

	},
	methods: {
		getGoodsAndQcode: function () {
			$.get(fontbaseURL + "/frontpage/bsactivity/order/queryGoodsByqcode", function(r){
			    console.log("r=="+JSON.stringify(r));
			    if(r.qcode==null || r.goods==null){
                   vm.msg = r.msg;
                   vm.showerror = true;//显示非商品内容
			    }else{
                    vm.goodimg = imgURL+r.goods.goodimg;
                    console.log("vm.goodimg=="+JSON.stringify(vm.goodimg));
                    vm.goods = r.goods;
                    vm.qcode = r.qcode;
                    vm.goodsId = r.goods.id;
                    vm.totalAmount = r.goods.marketPrice;
                    vm.getMylongcoin();
			    }

            })
		},
		//获取我的龙币
        getMylongcoin: function () {
			$.get(fontbaseURL + "/frontpage/bsactivity/user/userInfo", function(r){
			    console.log("r=="+JSON.stringify(r));
			    if(r.code==0){
			      vm.dcurrency = r.dcurrency;//我的龙币余额
			      vm.dcurrencyInfo = '您目前龙币余额为:'+r.dcurrency;
			      if(vm.goods.marketPrice>parseInt(r.dcurrency)){
                     vm.btnshow = false;//不能兑换商品
			      }
			    }else{
//                  vm.dcurrencyInfo = '您当前扫码微信号还不是真龙会员';
                  vm.dcurrencyInfo = r.msg;
                   vm.dcurrencyInfo = r.msg!=null?(r.msg!=''?r.msg:'正在查询您的龙币'):'正在查询您的龙币';
                  vm.btnshow = false;//不能兑换商品
			    }

            })
		},
		//减
		minus: function () {
		    let num = vm.exchangeNum-1;
		    if(num==0){
                return;
		    }else if(num<0){
                vm.exchangeNum = 1;
                vm.totalAmount = vm.goods.marketPrice;
		    }else{
		        //增加总量，增加总额
		        vm.exchangeNum = num;
		        vm.totalAmount = vm.goods.marketPrice*num;
		    }
		},
		//加
        plus:function () {
             let num = vm.exchangeNum+1;
             if(num*vm.goods.marketPrice>vm.dcurrency){
                return;
             }else{
                //增加总量，增加总额
                vm.exchangeNum = num;
                vm.totalAmount = vm.goods.marketPrice*num;
            }
        },
        //确认兑换
        submitorder_bak:function () {

          /* vm.exchangeSuccess = true;//兑换成功
           vm.msg = "兑换成功";
           vm.showerror = true;//显示非商品内容
           return;*/

            let content = '兑换数量:'+vm.exchangeNum+";扣减龙币数:"+vm.totalAmount;
           layer.confirm(content, {btn: ['确定', '取消'], title: "提示"}, function (index) {
                       layer.close(index);
                     $.get(fontbaseURL + "/frontpage/bsactivity/order/exchange?goodsId="+vm.goodsId+"&exchangeNum="+vm.exchangeNum+"&supplierId="+vm.supplierId, function(r){
                        console.log("r=="+JSON.stringify(r));
                        if(r.code==0){
                           vm.exchangeSuccess = true;//兑换成功
                           vm.msg = "兑换成功";
                           vm.showerror = true;//显示非商品内容

                        }else{
                           vm.exchangeSuccess = false;//在次调试使用
                           vm.msg = r.msg!=null?(r.msg!=''?r.msg:'兑换失败'):'兑换失败';
                           vm.showerror = true;////显示非商品内容
                             //layer.msg("兑换失败", {icon: 1});
                        }
                      })
               });


        },
        //确认兑换
        submitorder:function () {
            vm.btnshow = false;//不能兑换商品
          /* vm.exchangeSuccess = true;//兑换成功
           vm.msg = "兑换成功";
           vm.showerror = true;//显示非商品内容
           return;*/

             $.get(fontbaseURL + "/frontpage/bsactivity/order/exchange?goodsId="+vm.goodsId+"&exchangeNum="+vm.exchangeNum+"&supplierId="+vm.supplierId, function(r){
                console.log("r=="+JSON.stringify(r));
                if(r.code==0){
                   vm.exchangeSuccess = true;//兑换成功
                   vm.msg = "兑换成功";
                   vm.showerror = true;//显示非商品内容

                }else{
                   vm.exchangeSuccess = false;//在次调试使用
                   vm.msg = r.msg!=null?(r.msg!=''?r.msg:'兑换失败'):'兑换失败';
                   vm.showerror = true;////显示非商品内容
                     //layer.msg("兑换失败", {icon: 1});
                }
              })


        },


	}
});
//页面加载的时候加载数据
vm.getGoodsAndQcode();
