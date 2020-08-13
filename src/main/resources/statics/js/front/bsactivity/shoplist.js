
$(function () {
            //头图滚动
//        var mySwiper = new Swiper(".swiper-container", {
//            autoplay: 2000, //可选选项，自动滑动
//            autoplayDisableOnInteraction:false,
//            observer: true,
//            observeParents: true,
//            paginationClickable: true,
//            watchSlidesProgress: true,
//            watchSlidesVisibility: true
//        });

        var mySwiper = new Swiper(".swiper-container", {
            autoplay: {
              delay: 9000,
              disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,
            paginationClickable: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true
        });
         //获取广告列表
         adlist();
         //线加载没用定位的店铺列表
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
//         var link0 = window.location.href;
//         console.log("link0=="+link0);
        //加载微信配置
        var link = (window.location.href).split('#')[0];
//         console.log("link1=="+link);
        if(link.indexOf("?")>=0){
//             link = link.split('?')[0];
        }
        console.log("link1=="+link);
//        link = encodeURIComponent(link);
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
                     console.log("定位成功res=="+JSON.stringify(res));
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
                vm.detailaddress = addComp.city + addComp.district+ addComp.street + addComp.streetNumber;
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
                       vm.shoplist =shoplist;
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
                       }
                    },
                    error:function (error){
                        alert(error)
                    }
                });
            }


    //广告列表
    function adlist(){
            //根据经纬度查询用户附近店铺列表 //后台给你提供的接口
        $.ajax({
            url:fontbaseURL + "/frontpage/bsactivity/shop/adlist",
            type:"GET",
            async:true,
            dataType:"json",
            success:function (data){
               console.log("data=="+JSON.stringify(data));
               if(data.code==0){
                   let adlist = data.adlist;
                   adlist.forEach(function(p) {
                     p.adImgurl =imgURL+p.adImgurl;
                   });
                    vm.adlist =adlist;
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
	    detailaddress:'西乡塘区衡阳东路',
        shoplist:[
            /*{shopName:'test',
            contactPhone:'145822',
            cityName:'faf',
            countyName:'country',
            address:'afaf',
            distance:320,

            }*/
        ],
        adlist:[],
        showgogetLocation:false,
        originLat:'',
        originLog:''
	},
	methods: {
         closeWindown:function(){
              vm.showgogetLocation = false;
         },
         cancelGet:function(){
             vm.showgogetLocation = false;
         },
         //确认授权
         okGet:function(){
               getLocations();
                vm.showgogetLocation = false;
         },

          goToBaidumap:function(item){
             let originLat = vm.originLat;
             let originLog = vm.originLog;
             let destiLat = item.lat;
             let destLog = item.lnt;
             let address = item.address;
             var url='http://api.map.baidu.com/direction?origin='+originLat+','+originLog+'&destination='+destiLat+','+destLog+'&mode=driving&region='+address+'&output=html';
             window.location.href=url;
             return;
         }
	}
});
