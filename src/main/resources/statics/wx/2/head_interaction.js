require(["jquery", "pnotify", "home/common", "imcc_plugin", "home/top", "bootstrap"], function ($, PNotify, common, ImccPlugin) {

  PNotify.prototype.options.styling = "bootstrap3";
  var userInfo = localStorage.getItem("USER_INFO");

  var shareInfo = JSON.parse(userInfo);
   
  var storage = window.localStorage;
  var storageHosttel= storage.getItem("hosttel");
  var storageToken = storage.getItem("wctToken");
  //var manageArr=['10042']     //测试环境新版组织机构显示的主号
  //var manageArr=['11198']     //uat环境新版组织机构显示的主号
  var manageArr=['10057','10063','12016','15285']     //生产环境新版组织机构显示的主号
  $(function () {
      if(manageArr.indexOf(storageHosttel)>-1){
        $("#manage").show();
      }
      if(shareInfo && shareInfo.bindWxLogin && shareInfo.bindWxLogin==1){
        $("#scan-div").attr('title','您已绑定工号，请进入微信公众号获取更多资讯')
      }else{
        $("#scan-div").attr('title','系统检测到您未绑定工号，请点击进行扫码绑定获取更多资讯')
      }
     // 扫码绑定登录图标
    setTimeout(function(){
      $('#scan-div').tooltip('show')
    },3000)
    setTimeout(function(){
        $('#scan-div').tooltip('hide')
    },6000)
     $("#scanImg").on("mouseover",function(){
        $("#scan-tip").show()
     })
     $("#scanImg").on("mouseout",function(){
        $("#scan-tip").hide()
    })
  });
  var sessionList = []
  var rotateDeg=0   //图片旋转图片角度
  var imgArr=[]     //图片集合
  var img_index=0     //图片索引
  var img_url=''       //预览图片
  //控制session超时，跳到登录页面

  $.ajaxSetup({
    error: function (XMLHttpRequest, textStatus, errorThrown) {

    },
    complete: function (XMLHttpRequest, textStatus) {
      var reg = /session time out/gi; //正则
      if (XMLHttpRequest) {
        if (XMLHttpRequest.responseText) {
          var obj;
          try {
            obj = $.parseJSON(XMLHttpRequest.responseText);
            if (obj.error) {
              if (-1 != obj.error.search(reg)) {
                alert('登录超时，请重新登录！');
                window.top.location.href = window.IMCC_CONTEXT_PATH + "index.jsp"; //跳转到登陆页面
              }
            }
          } catch (e) {

          }
        }
      }
    }
  });

  function notify(title, text, type, times) {
    new PNotify({
      title: title,
      text: text,
      type: type,
      delay: times
    });
  }

  //在线心跳
  setInterval(function () {
    var url = window.IMCC_CONTEXT_PATH + 'intervalCheck.do?randomNum=' + Math.random() * 1000;

    $.ajax({
      async: true,
      type: 'GET',
      dataType: 'json',
      url: url,
      success: function(data) {
    	if (data.offline) {  // 强制下线
          reLoggedIn()
      		return;
      	}
        if(data && data.wctToken){
          window.localStorage.setItem("wctToken", data.wctToken);
        }
      },
      error: function () {

      },
      complete: function () {

      }
    });
  }, 10000);

	function doLogOut () {
	
	  new PNotify({
	    title: '通知',
	    text: '该账号已在其他地方登录，您已被迫下线！',
	    type: 'fail',
	    delay: 3000
	  });
	
	  setTimeout(function(){
	    document.location.href='/';
	  }, 4000);
	
	}

  // 掉线后重连

  function reLoggedIn (num) {

    if (typeof num === 'undefined') {
      num = 1
    } else if (num >=3) {
      doLogOut()
      return
    } else {
      num++
    }

    if (getHyxCookie('JJOUNT')) {
      var obj = JSON.parse(window.atob(getHyxCookie('JJOUNT')))

      $.ajax({
        async : true,
        type : 'post',
        data: {
          j_password: obj.j_password,
          j_username: obj.j_username,
          status: $('#onlineSel').val(),
          force: false,
          loginType: 1
        },
        dataType: "json",
        url : '/login.do',
        success: function (data) {
          if (data.result) {
            /****** websocket 强制登录  start add by  huangbs 2017-06-27************/
                //登录随机数，强制登录用
                var ran_num = Math.random() * 1000;
                document.cookie = "ran_num="+ran_num;
                /****** websocket 强制登录  end ************/
            //缓存客户信息及im右侧标签页到cookie
            if(data.user) {
              //document.cookie = "USER_INFO="+JSON.stringify(data.user)+";path=/";
              window.localStorage.setItem("USER_INFO",JSON.stringify(data.user));
              document.cookie = "EXTENSION="+data.extension+";path=/";
            }
            if(data.imtabs) {
              //document.cookie = "IM_TABS="+JSON.stringify(data.imtabs)+";path=/";
              window.localStorage.setItem("IM_TABS",JSON.stringify(data.imtabs));
            }
            if(data.jsver) {
              document.cookie = "jsver="+data.jsver+";path=/";
              window.localStorage.setItem("jsver",data.jsver);
            }
            if(data.alg) {
              document.cookie = "alg="+data.alg+";path=/";
              document.cookie = "hosttel="+data.hosttel+";path=/";
              document.cookie = "token="+data.token+";path=/";
              window.localStorage.setItem("alg",data.alg);
              window.localStorage.setItem("hosttel",data.hosttel);
              window.localStorage.setItem("token",data.token);
            }
            if(data.managerJB){
              window.localStorage.setItem("managerINFO",JSON.stringify(data.managerJB));
            }
            if(data.wctToken){
              window.localStorage.setItem("wctToken",data.wctToken);
            }
            if(data.wsAddr){
              document.cookie = "wsAddr="+data.wsAddr+";path=/";
              window.localStorage.setItem("wsAddr",data.wsAddr);
            }else{
              document.cookie = "wsAddr=ws://u.im-cc.com:17999/wsServlet;path=/";
              window.localStorage.setItem("wsAddr","ws://u.im-cc.com:17999/wsServlet");
            }
            document.cookie = "LISTENTYPE="+data.listenType+";path=/";
            document.cookie = "SHOWCHANGE="+data.showChange+";path=/";
            
          } else {
            doLogOut()
          }

        },
        error: function (data) {
          setTimeout(function() {
            reLoggedIn(num)
          }, 3000)

        }
      })

    } else {
      doLogOut()
    }

  }



  //----------强制登录 start----------------

  function signout() {

    if (convTimer) {
      clearInterval(convTimer);
    }

    $.ajax({
      type: 'GET',
      url: window.IMCC_CONTEXT_PATH + 'loginOut.do',
      success: function (data) {
        if (data.success) {		//请求提交成功
          document.location.href = window.IMCC_CONTEXT_PATH + 'index.jsp';
        } else {
          alert("请求提交失败," + data.respText);
        }
      },

      error: function (data) {
        document.location.href = window.IMCC_CONTEXT_PATH + 'index.jsp';
      }
    });

  }

  //生产环境
//  var wsAddr = localStorage.getItem('wsAddr') || ("ws://"+document.domain+":17999/wsServlet")
//  var ws = new WebSocket(wsAddr);

  //测试环境
  //var ws = new WebSocket("ws://"+document.domain+":8085/wsServlet");

  //UAT环境
  //var ws = new WebSocket("ws://"+document.domain+":17999/wsServlet");

  //开发环境
  //var ws = new WebSocket("ws://" + document.domain + ":8085/wsServlet");


  /****** wsocket 强制登录  end ************/
  var oldStatus = shareInfo.status;

  window.switchStatus = function (status) {
    var url = window.IMCC_CONTEXT_PATH + 'user/switchStatus.do';
    if (!status) {
      status = $('#onlineSel').val();
    }

    $.ajax({
      url: url,
      type: 'post',
      timeout: 5000, //超时时间设置，单位毫秒
      data: 'status=' + status,
      dataType: 'json',
      success: function (data) {
        if (!data) {
          return;
        }

        if ('success' == data.msg) {
          oldStatus = status;
          $("#onlineSel").val(oldStatus);
          shareInfo.status = "" + status;
          localStorage.setItem("USER_INFO", JSON.stringify(shareInfo));
        } else {

          $("#onlineSel").val(oldStatus);
          notify("提示", data.msg, "fail", 2000);
        }

        //set login user status
        var v = $("#onlineSel").find("option:selected").index();
        $('#navbar i.zt').css("background", statusArr[v]);

      },

      error: function (data) {

        $("#onlineSel").val(oldStatus);

        notify("提示", "切换状态失败！", "fail", 2000);

        //set login user status

        var v = $("#onlineSel").find("option:selected").index();

        $('#navbar i.zt').css("background", statusArr[v]);

      }

    });

  }

  $(document).ready(function () {
    
    /**
     * 一级导航交互js
     */

    // 一级导航页面跳转

    $('.ucc-main .sidebar .nav-sidebar a').on('click', function () {

      var pageName = $(this).attr('url');

      var src = pageName;

      if (window.IMCC_CONTEXT_PATH && window.IMCC_CONTEXT_PATH != "/") {

        src = window.IMCC_CONTEXT_PATH + pageName;

      }

      // 页面加载

      $('.ucc-main .main iframe').attr('src', src);

      $('.nav-sidebar li').removeClass('active');

      $(this).parents('li').addClass('active');

    })

    //企业logo

    if (!shareInfo.hostLogo) {

      $("#logo").attr("src", "../../assets/img/up_logo_white.png")

    }

    else {

      $("#logo").attr("src", shareInfo.hostLogo);

    }

    //客服头像

    if (!shareInfo.logo) {

      $("#kf_logo").attr("src", "../../assets/img/service.png")

    }

    else {

      $("#kf_logo").attr("src", shareInfo.logo);

    }

    //客服名字

    if (!shareInfo.name) {

      $("#kf_name").text("客服")

    }

    else {

      $("#kf_name").text(shareInfo.name);

    }

    //----------------页面加载完成显示新手引导 start-----------------
    /**
     控制一级菜单
     menuName : 菜单名称
     isJump : 是否跳转，true || false
     */

    window.chooseFirstMenu = function (menuName, isJump) {

      if (!menuName) {

        return;

      }

      $('.sidebar .nav-sidebar li').removeClass('active');

      var $choose = $('.sidebar .nav-sidebar li:has(a[menuName="' + menuName + '"])');

      $choose.addClass('active');

      if (isJump) {

        $choose.find('a').click();

      }

    }

    /**
     控制二级菜单
     menuName : 菜单名称
     isJump : 是否跳转，true || false
     args : 菜单链接额外带的参数，单次跳转时有效，形如：aa=12&bb=123
     */

    var chooseSecondMenuTimer = null;

    window.chooseSecondMenu = function (secondMenuName, isJump, args) {

      var iframeName = 'mainFrame'; //iframe name attribute, and the id attribute is same value

      var finish = false;

      if (frames[iframeName].chooseSecondMenu) {

        finish = frames[iframeName].chooseSecondMenu(secondMenuName, isJump, args);

      }

      if (chooseSecondMenuTimer && finish) {

        clearInterval(chooseSecondMenuTimer);

        chooseSecondMenuTimer = null;

      }

      //操作执行完成后，要取消iframe的onload事件

      if (finish) {

        var iframe = document.getElementById(iframeName); //must id

        if (iframe.attachEvent) {   //IE

          iframe.attachEvent("onload", function () {

          });

        } else {

          iframe.onload = function () {

          };

        }

      }

      return finish;

    }

    /**
     同时控制一级菜单和二级菜单
     firstMenuName : 一级菜单名称
     secondMenuName : 二级菜单名称
     isJump : 是否跳转，true || false
     args : 菜单链接额外带的参数，单次跳转时有效，形如：aa=12&bb=123
     */

    window.chooseFirstAndSecondMenu = function (firstMenuName, secondMenuName, isJump, args) {

      chooseFirstMenu(firstMenuName, true);

      var iframeName = 'mainFrame'; //iframe id attribute

      var iframe = document.getElementById(iframeName); //must id

      var itvlTime = 20;

      if (iframe.attachEvent) {   //IE

        iframe.attachEvent("onload", function () {

          if (!chooseSecondMenu(secondMenuName, isJump, args))

            chooseSecondMenuTimer = setInterval(function () {

              chooseSecondMenu(secondMenuName, isJump, args);

            }, itvlTime);

        });

      } else {

        iframe.onload = function () {

          if (!chooseSecondMenu(secondMenuName, isJump, args))

            chooseSecondMenuTimer = setInterval(function () {

              chooseSecondMenu(secondMenuName, isJump, args);

            }, itvlTime);

        };

      }

    }



    $.ajax({

      url: window.IMCC_CONTEXT_PATH + "home/init.do",
      type: "get",
      dataType: "json",
      success: function (data) {
        if (data && data.isGuide == "Y") {
          $('#modalIntro').modal('show');
        }
        if (data && data.workerCountUrl) {
          $("#r_work").on("click", function () {
            $('.ucc-main .main iframe').attr('src', window.IMCC_CONTEXT_PATH + 'outside/menu/jump.do?redirectUrl=' + data.workerCountUrl);
            return $(".sm-mask").click();
          });
        }
      }

    });
	window.addEventListener('message',function(e){
        console.log(e.data);        //hello world
        console.log(e.origin);      //http://127.0.0.1:8020 所传来数据的域
		if(e.data.code=="preview-img-url"){
      $('.media-wrapper').attr('style','')
      let oDiv = document.getElementById('media-pic').parentNode
      oDiv.style.left = null
      oDiv.style.top = null
      setTimeout(()=>{
        $('.media-center').attr('style','')
      },2000)
      img_url=e.data.url
      $('#media-pic').attr('src',e.data.url)
      if(sessionStorage.getItem('all_pic')){
        imgArr=JSON.parse(sessionStorage.getItem('all_pic'))
      }
      //img_index=0
		}
    })
    function drag(n) {
      let oDiv = n.parentNode
      let left = parseInt(window.getComputedStyle(oDiv).left)
      let top = parseInt(window.getComputedStyle(oDiv).top)
      let stX = event.x
      let stY = event.y
      event.stopPropagation()
      event.preventDefault()
      document.onmousemove = e => {
        let dx = e.x - stX
        let dy = e.y - stY
        oDiv.style.left = left + dx + 'px'
        oDiv.style.top = top + dy + 'px'
        e.stopPropagation()
        e.preventDefault()
      }
      document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
	function zoomImg(o) {
      let zoom = o.style.zoom ? parseInt(o.style.zoom) : 100
      zoom += event.wheelDelta / 10
      if (zoom >= 50 && zoom <= 300) {
        o.style.zoom = zoom + '%'
      }
  }
  function rotateImg (deg){
    rotateDeg += deg
    document.getElementById("media-pic").style.transform = 'rotate(' + rotateDeg + 'deg)'
  }
  function replaceImg(picAddr){
    //console.log('picAddr',picAddr)
    var path = picAddr.replace(/<weixin><img>/g, "").replace(/<\/img><\/weixin>/g, "")
    if (path.indexOf("http") != 0) {
        var userInfo=JSON.parse(localStorage.getItem('USER_INFO'))
        path = userInfo.downloadUrl + path;
    }
    return path
  }
  function nextImg(){
     var downloadUrl=shareInfo.downloadUrl
     var index=0
     var img_url=$('#media-pic').attr('src')
    if(img_url.indexOf(downloadUrl)==0){
     var arr=img_url.split("download/")
     for(var i = 0; i <imgArr.length; i++) {
         if (imgArr[i].msg.indexOf(arr[1])>-1) {
             index=i
             break
         }
     }
    }else{
     for(var i = 0; i < imgArr.length; i++) {
         if (imgArr[i].msg.indexOf(img_url)>-1) {
             index=i
             break
         }
     }
    }
     rotateDeg = 0
     document.getElementById('media-pic').style.transform="rotate(0deg)"
     if(imgArr.length==1){
       var picurl=replaceImg(imgArr[0].msg)
      $('#media-pic').attr('src',picurl)
       //document.getElementById('media-pic').style.zoom="normal"
       notify("提示",'已是最后一张图片', "success", 2000)
       //this.success('已是最后一张图片')
       //ulits.warmingForm('已是最后一张图片', 0)
     }else{
       if(index>-1){
         if(index>0){
           if(index==imgArr.length-1){
            notify("提示",'已是最后一张图片', "success", 2000)
             //ulits.warmingForm('已是最后一张图片', 0)
           }else{
             var picurl=replaceImg(imgArr[index+1].msg)
             $('#media-pic').attr('src',picurl)
             //document.getElementById('media-pic').style.zoom="normal"
           }
         }else{
           if(imgArr.length>0){
              var picurl=replaceImg(imgArr[index+1].msg)
             $('#media-pic').attr('src',picurl)
             //document.getElementById('media-pic').style.zoom="normal"
           }
         }
       }else{
         console.log(imgurl)
       }
     } 
  }
  function preImg(){
    var downloadUrl=shareInfo.downloadUrl
    var index=0
    var img_url=$('#media-pic').attr('src')
  if(img_url.indexOf(downloadUrl)==0){
    var arr=img_url.split("download/")
    for(let i = 0; i < imgArr.length; i++) {
        if (imgArr[i].msg.indexOf(arr[1])>-1) {
            index=i
            break
        }
    }
  }else{
    for(let i = 0; i <imgArr.length; i++) {
        if (imgArr[i].msg.indexOf(img_url)>-1) {
            index=i
            break
        }
    }
  }
    //console.log('preImg',arr,index,this.imgArr)
    rotateDeg = 0
    //document.getElementById('media-pic').style.transform="rotate(0deg)"
    if(index>-1){
      if(index>1){
        var picurl=replaceImg(imgArr[index-1].msg)
        $('#media-pic').attr('src',picurl)
        //document.getElementById('media-pic').style.zoom="normal"
      }else{
        if(imgArr[0]&&imgArr[0].msg){
            var picurl=replaceImg(imgArr[0].msg)
            $('#media-pic').attr('src',picurl)
            //document.getElementById('media-pic').style.zoom="normal"
            imgArr=JSON.parse(sessionStorage.getItem('all_pic'))
        }
        notify("提示",'已是第一张图片', "success", 2000);
        //this.success('已是第一张图片')
        //ulits.warmingForm('已是第一张图片', 0)
      }
    }else{
      //console.log(this.imgurl)
    }
  }
	$("#media-pic").bind("mousewheel", function() {
		zoomImg(this);
		return false;
  });
  $("#close-preview-img").bind("click", function() {
    document.getElementById("media-pic").style.transform = 'rotate(0deg)'
    $('#media-pic').attr('src','../../images/loading003.gif')
    $('.media-wrapper').css('display','none')
    $('#media-pic').attr('style','')
  });
  $("#media-pic").bind("mousedown", function() {
		drag(this);
		return false;
  });
  $("#rotate-left").bind("click", function() {
		rotateImg (-90)
  });
  $("#rotate-right").bind("click", function() {
		rotateImg (90)
  });
  $("#img-up").bind("click", function() {
    $('#media-pic').attr('style','')
		preImg()
  });
  $("#img-down").bind("click", function() {
    $('#media-pic').attr('style','')
		nextImg()
  });
	//跳转导出记录页面
    $('#downImg').on('click', function () {
      chooseFirstAndSecondMenu('运营', '导出记录', true)
	  $('#down-icon-red').hide()
    })
    // 新手引导跳转页面

    $('.intro-way a').on('click', function (event) {

      $('#modalIntro').modal('hide');

      event.preventDefault();

      var src = $(this).data('href');

      var name = $(this).text();

      if (src == "") {

        new PNotify({ title: "提示", text: "该功能完善中，请敬请期待！", type: "info", delay: 2000 });

        return;

      }

      chooseFirstAndSecondMenu('设置', name, true, 'isGuide=Y');

    });

    //----------------页面加载完成显示新手引导 end-----------------


    //----------------右侧边框功能 start-------------------------
    $("#r_info").on("click", function () {

      chooseFirstAndSecondMenu("设置", "个人信息", true);

      return $(".sm-mask").click();

    });

    $("#r_guide").on("click", function () {

      $('#modalIntro').modal('show');

      return $(".sm-mask").click();

    });
    //扫码登陆绑定工号
    $("#scan-div").on("click", function () {
      $('#modalScan').modal('show');
      //我处理中的工单
	    $.ajax({
        url: window.IMCC_CONTEXT_PATH + 'cloud-wo-http/v1/wo/code/createcode?hosttel='+storageHosttel+"&wct="+1+"&token="+storageToken,
        type : "post",
        data : JSON.stringify({"hostTel":storageHosttel}),
        dataType : "json",
        success : function(data) {
          console.log(data.imgUrl);
          $('#wx-code').attr('src', data.imgUrl)
        },
        error:function(){
          
        }
      });
      return $(".sm-mask").click();

    });
    
    $("#r_notice").on("click", function () {
    	parent.document.getElementById("mainFrame").src="/outside/menu/jump.do?redirectUrl=http://"+document.domain+"/ucc-api/static/html/upgradeNotice/notice.html";

      });

    $("#defaultConnCount").val(shareInfo.defaultConnCount);

    var changeCountOpera = 1; //1表示点击减号或加号或直接修改接入量的时候可以访问后台。2表示不可以。(防止多次点击后台没有处理完数据出现数据混乱)

    // 接入量加1或减1

    function addOrSubtractConnCount(changeType) {

      var userId = shareInfo.id;

      var count = $('#defaultConnCount').val();

      if (changeType == "subtract") {

        if (count != '' && count <= 0) {

          notify("提示", "接入量已不能再减", "fail", 2000);
          $('#defaultConnCount').val(1);
          return;

        }

      } else {

       /*  if (count > 50) {

          notify("提示", "接入量不能大于最大接入量", "fail", 2000);
          $('#defaultConnCount').val(50);
          return;

        } */

      }

      if (changeCountOpera == 1) {

        changeCountOpera = 2;

        $.ajax({

          url: window.IMCC_CONTEXT_PATH + 'user/addOrSubtractConnCount.do',

          type: 'post',

          data: { "userId": userId, "changeType": changeType },

          dataType: 'json',

          success: function (data) {

            if (data.success) {

              notify("提示", "修改接入量成功", "info", 2000);

              changeCountOpera = 1;

              shareInfo.defaultConnCount = $("#defaultConnCount").val();
              localStorage.setItem("USER_INFO", JSON.stringify(shareInfo));
//              document.cookie = "USER_INFO=" + JSON.stringify(shareInfo) + ";path=/;";

            } else {

              notify("提示", data.respText, "fail", 2000);

              $("#defaultConnCount").val(shareInfo.defaultConnCount);

              $ct = shareInfo.defaultConnCount * 1;

              changeCountOpera = 1;

            }

          },

          error: function (data) {

            notify("提示", "修改接入量失败", "fail", 2000);

            $("#defaultConnCount").val(shareInfo.defaultConnCount);

            $ct = shareInfo.defaultConnCount * 1;

            changeCountOpera = 1;

          }

        });

      }

    }

    //直接修改接入量

    function changeConnCount(userId, count) {

      $.ajax({

        url: window.IMCC_CONTEXT_PATH + 'user/changeConnCount.do',

        type: 'post',

        data: { "userId": userId, "count": count },

        dataType: 'json',

        success: function (data) {

          if (data.success) {

            notify("提示", "修改接入量成功", "info", 2000);

            changeCountOpera = 1;

            shareInfo.defaultConnCount = $("#defaultConnCount").val();
            localStorage.setItem("USER_INFO", JSON.stringify(shareInfo));
//            document.cookie = "USER_INFO=" + JSON.stringify(shareInfo) + ";path=/;";

          } else {

            notify("提示", data.respText, "fail", 2000);

            $("#defaultConnCount").val(shareInfo.defaultConnCount);

            $ct = shareInfo.defaultConnCount * 1;

            changeCountOpera = 1;

          }

        },

        error: function (data) {

          notify("提示", "修改接入量失败", "fail", 2000);

          $("#defaultConnCount").val(shareInfo.defaultConnCount);

          $ct = shareInfo.defaultConnCount * 1;

          changeCountOpera = 1;

        }

      });

    }

    $('#defaultConnCount').on('keyup', function () {

      $(this).val($(this).val().match(/[1-9]\d*|[0]{1,1}/));

      if (event.keyCode == 13) {

        if (this.value.trim().length == 0) return;

        if (changeCountOpera == 1) {

          changeCountOpera == 2;

          if (this.value.trim() > 50) {

            changeCountOpera = 1;

            notify("提示", "接入量不能大于最大接入量", "fail", 2000);

            return;

          }

          changeConnCount(shareInfo.id, this.value.trim());

        } else {
          if(changeCountOpera == 2) {
            notify("提示", "操作太快，请稍后再试", "fail", 2000);
            return;
	      }
		}

      }

    });

    $("#signout").on("click", function () {

      signout();

    });

    //----------------右侧边框功能 end---------------------------

    //公司通知公告弹层

    $('#notice .bottom').on('click', '.icon', function () {

      $('#notice').toggleClass('in');

    })

    $('#callup').on('mouseover', function () {

      $(this).find('.btn').css('background-image', 'url(../../assets/img/topbg38.gif)');

    }).on('mouseleave', function () {

      $(this).find('.btn').css('background-image', 'url(../../assets/img/zaixian.png)');

    })

    //铃铛右下角的点消失与显示

    //$('.icon-bell').hover(function () {

    //  $(this).addClass('in');

    //}, function () {

    //  $(this).removeClass('in');

    //})

    //点击增加或者减少按钮

    var $ct = parseInt($('.input-amount>input').val());
    $('.minus').on('click', function () {
	  if(changeCountOpera == 2) {
        notify("提示", "操作太快，请稍后再试", "fail", 2000);
        return;
	  }
      $ct = parseInt($('.input-amount>input').val());
      if ($ct > 0) {

        $ct -= 1;

      }

      $(this).parent().find('input').val($ct);
      addOrSubtractConnCount('subtract');

    })

    $('.plus').on('click', function () {
	  if(changeCountOpera == 2) {
        notify("提示", "操作太快，请稍后再试", "fail", 2000);
        return;
	  }
      $ct = parseInt($('.input-amount>input').val());
      $ct += 1;

      $(this).parent().find('input').val($ct);
      addOrSubtractConnCount('add');

    })

    //电话拨号盘点击后背景恢复

    $(document).on("click", ".numbers .number", function () {

      // $(this).removeClass("active");

      //  $(this).css({'color':'#fff','background-color':'#3ACF83'});

      $(this).addClass('active').siblings().removeClass('active');

    })

    $(document).on("mouseleave", ".numbers .number", function () {

      //$(this).css('color','#858587').css('background-color','#F7F8FC');

      //  $(this).css({'color':'#858587','background-color':'#f7f8fc'});

      $(this).removeClass('active');

    })

    /*
     二级导航交互js
     */

    // 系统设置菜单折叠/收缩

    $('.setting-list dt').on('click', function () {

      var $parent = $(this).parent('dl');

      $parent.toggleClass('collapsed');

    });

    //二级导航页面跳转

    $('.setting-list dd a').on('click', function () {

      $('.setting-list dd').removeClass('active');

      $(this).parent('dd').addClass('active');

      var moduleName = $('.setting-list').siblings('h4').text().trim();

      var $dt = $(this).parent().siblings('dt');

      var _lev2 = $dt.length > 0 ? $dt.text().trim() + "-" : "";

      var pageName = $(this).attr('href').split('#')[1];

      var src = moduleName + '-' + _lev2 + pageName + '.html';

      //alert(src)

      // 页面加载

      $('.setting-page iframe').attr('src', src);

    });

    /* 顶部功能栏*/

    // popover隐藏

    $(document).on('click', '.popover-mask', function () {

      $(this).parent('.popover').popover('hide');

    });

    // tooltip显示

    $('[data-toggle="tooltip"]').tooltip();



    // 消息通知：实例化popover

    $('#newNote').popover({

      trigger: 'click',

      placement: 'bottom',

      html: 'true',

      delay: { "show": 300 },
// *****************注释消息提醒顶部弹出框****************************************
//      template: '<div class="popover popover-newnote" role="tooltip"><div class="arrow"></div><div class="popover-mask"></div><div class="popover-content" style="width:270px"></div></div>',

      content: function () {

//        return $(".newnote-tpl").html();

      }

    });

    $('#newNote').on('shown.bs.popover', function () {

      //公司公告

      $("#affiche").on("click", function () {

        $("#modalNotice").modal("show");

      })

      $("#toCompany").on("click", function () {

        chooseFirstAndSecondMenu('运营', '公司公告', true);

        $('#newNote').popover('hide');

        $("#modalNotice").modal("hide");

        $(".newnote-container dl#laterNews dd").remove();

        var hasNoticelist = $('.newnote-container dd').length > 0;

        if (!hasNoticelist) {

          $("p.noMsg").show();

          $(".newnote-container .footer-btns").hide();

//        $("#newNote i.icon-bell").removeClass("in");

        }

      })

      //工单提醒

      $("#toWorkorder").on("click", function () {

        $("#modalOrder").modal("show");

      })

      $("#toOrder").on("click", function () {

        var orderId = $("#workOrders dd").attr("id");

        $.ajax({

          url: window.IMCC_CONTEXT_PATH + "workOrderMng/editRead.do",

          type: "get",

          data: { "id": orderId, "isRead": "1" },

          dataType: 'json',

          success: function (data) {

          },

          error: function (data) { }

        });

      /*  chooseFirstAndSecondMenu('待办', '我处理中的工单', true);*/

        $('#newNote').popover('hide');

        $("#modalOrder").modal("hide");

        $(".newnote-container dl#workOrders dd").remove();

        var hasNewslist = $('.newnote-container dd').length > 0;

        if (!hasNewslist) {

          $("p.noMsg").show();

          $(".newnote-container .footer-btns").hide();

//        $("#newNote i.icon-bell").removeClass("in");

        }

      })

      //系统提醒

      $("#toProcessingNotice").on("click", function () {

        $("#modalSystem").modal("show");

      })

      $("#toOrderstatus").on("click", function () {

        var statusId = $("#ProcessingNotice dd").attr("id");

        $.ajax({

          url: window.IMCC_CONTEXT_PATH + "workOrderMng/editProcessingRead.do",

          type: "get",

          data: { "woId": statusId, "isRead": "1" },

          dataType: 'json',

          success: function (data) {

          },

          error: function (data) { }

        });

        chooseFirstAndSecondMenu('工单', '我发起的工单', true);

        $('#newNote').popover('hide');

        $("#modalSystem").modal("hide");

        $(".newnote-container dl#ProcessingNotice dd").remove();

        var hasNewslist = $('.newnote-container dd').length > 0;

        if (!hasNewslist) {

          $("p.noMsg").show();

          $(".newnote-container .footer-btns").hide();

//        $("#newNote i.icon-bell").removeClass("in");

        }

      })

      //全部已读

      $("button.readAll").on("click", function () {

        var woId = $("#workOrders dd").attr("id");

        var arg = $("#laterNews dd").attr("id");

        window.apiRequest({

          url: "noticeuser/editStatus",

          type: "post",

          data: JSON.stringify({ "id": arg, "status": "1" }),

          dataType: 'json',

          success: function (data) {

            $("#laterNews dd#" + arg).remove();

          },

          error: function (data) { }

        });

        $.ajax({

          url: window.IMCC_CONTEXT_PATH + "workOrderMng/editRead.do",

          type: "get",

          data: { "id": woId, "isRead": "1" },

          dataType: 'json',

          success: function (data) {

            $("#workOrders dd#" + woId).remove();

          },

          error: function (data) { }

        });

        $(".newnote-container dd").remove();

//      $("#newNote i.icon-bell").removeClass("in");

        $("p.noMsg").show();

        $(".newnote-container .footer-btns").hide();



      }),

        //查看更多

        $("#toMore").on("click", function () {

          chooseFirstAndSecondMenu('运营', '公司公告', true)

        })

    })

    // 侧边栏抽屉: 滑入

    $(document).on('click', '.sidemenu', function () {

      $('.sm-container').addClass('in');

    });

    // 侧边栏抽屉: 滑出

    $(document).on('click', '#logOut .sm-mask', function () {

      $('.sm-container').removeClass('in');

    });

    // 在线状态：状态切换

    $(document).on('click', '.popover-online .list-group-item a', function () {

      if ($(this).parent('li').hasClass('busy')) return;

      var $span = $('#online');

      $span.text($(this).text()).css('background-color', $(this).data('bgcolor'));

      $(this).addClass('active').parent('li').siblings('li').find('a').removeClass('active');

      $('#online').popover('hide');

      //示忙的事件

    })

    //示闲的事件

    // 个人微信二维码
    var clickCount = 0
    if (shareInfo.servPrvwx && shareInfo.servPrvwx == 1) {

      if (storageHosttel == 10063 || storageHosttel == 10057) {

        $('#wx_login').show()

      }

      // var imgUrl = shareInfo.downloadUrl + 'weixinFile/wxgrh/' + shareInfo.hostTel + '/' + shareInfo.logonNumber + '.png?t=' + new Date().getTime()

      // $('#eqcode').attr("src", imgUrl);

    } else if (storageHosttel == 10063 && (shareInfo.logonNumber == 1063 || shareInfo.logonNumber == 1010)) {

      $('#wx_login').show()

    } else {

      $('#wx_login').hide()

    }

    $('#wx_login').click(function (event) {

      if ($('#eqcode').attr('src')) {

        $('.emsg').show()

      }

      $('.eqwrap').show()

      $('.desk').show()

      // if (clickCount === 0) {

      //   clickCount++

      //   // 执行刷新二维码事件
      //   doReFresh()

      // }

      event.stopPropagation();

      // event.preventDefault()
      
    })

    $('#reloadImg').click(function (event) {

      $('#wxlogin').modal('show')

      event.stopPropagation()

    })
    

    $('#doRefresh').click(function (e) {

      e = e || window.event

      $('.load').show()

      $('.emsg').hide()

      doReFresh()

      for (var i = 0; i < sessionList.length; i++) {

        if (sessionList[i].usertype == 132) {

          doDisconnect(sessionList[i])
        }

      }

    })

    var clickFlag = false

    function doReFresh () {

      if (clickFlag) {

        return

      }

      clickFlag = true

      removeImg()

      $('#eqcode').removeAttr("src")

      $('.load').show()

      $.ajax({

        url: window.IMCC_CONTEXT_PATH + 'ucc-api/v1/prvwx/refreshQrCode',

        type: "get",

        data: {token: storageToken, hosttel: storageHosttel},

        dataType: 'json',

        success: function (data) {

          console.log(data)

          if (data && data.code == 0) {

            setTimeout(function () {

              loadImg ()

            }, 2000)

          } else {

            $('.load').hide()

            clickFlag = false

            // 接口调用失败

            notify("提示", "二维码刷新失败！", "fail", 2000);

          }

        },

        error: function (error) {

          $('.load').hide()

          // 接口调用失败

          notify("提示", "二维码刷新失败！", "fail", 2000);

          console.log(error)

        }

      })
    }

    function removeImg() {

      var url = shareInfo.downloadUrl + 'deleteFile?noencode=true&file=/wxgrh/'+ shareInfo.hostTel + '/' + shareInfo.logonNumber + '.png'

      $.ajax({

        url: url,

        type: 'get',

        data: {},

        success: function (response) {

          console.log(response)

        },

        error: function (error) {

          console.log(error)

        }

      })
      
    }

    function loadImg () {

        var refreshUrl = shareInfo.downloadUrl + 'wxgrh/' + shareInfo.hostTel + '/' + shareInfo.logonNumber + '.png?t=' + new Date().getTime()

        $('#eqcode').attr("src", refreshUrl);

        $('#eqcode').load(function () {

          console.log('执行加载完成事件')

          $('.load').hide()

          clickFlag = false

        })

        $('#eqcode').error(function () {

          console.log('图片加载失败事件')

          setTimeout(function () {

            loadImg()

          }, 2000)

        })

    }

    function doDisconnect (currentSession) {

      if (window.frames['mainFrame']) {

        window.frames['mainFrame'].postMessage({code: 'closechat'}, '/')

      }

      var url = shareInfo.asAddr;

      var msgid = getMsgId(32);

      var obj = {

        command: '0x17',

        systemid: shareInfo.hostTel,

        loginuserid: shareInfo.id,

        convtype: '0',

        msgid: msgid,

        hostimnumber: currentSession.hostimnumber,

        imnumber: currentSession.imnumber

      }

      $.ajax({

        type: 'post',

        url: url,

        timeout: 5000, //超时时间设置，单位毫秒

        // data: '{"command":"0x17","systemid":"' + shareInfo.hostTel + '","loginuserid":"' + shareInfo.id + '","convtype":"0","msgid":"' + msgid + '"}',

        data: JSON.stringify(obj),

        dataType: "json",

        async: true,

        success: function (data) {
          
          console.log(data)

        },

        error: function (error) {

          console.log(error)

        }

      })

    }



    $('.desk').click(function () {

      $('.eqwrap').hide()

      $('.desk').hide()

    })

    $('#closeImg').click(function () {

      $('.eqwrap').hide()

      $('.desk').hide()
      
    })

  });

  // 转接会话：客服列表选中态

  $(document).on('click', '.kefu-list .list-item', function () {

    $(this).addClass('active').siblings().removeClass('active');

  });

  //状态提示：显示图片

  $(document).on("change", "#logOut select", function () {

    var v = $(this).val();

    var arr = ["online.png", "busy.png", "leave.png"];

    $('#navbar i.zt').css("background-image", 'url(../../assets/img/' + arr[v] + ')');

  })

  $(document).on('click', '.jianpan .number', function () {

    var $input = $('.jianpan .input .val'),

      val = $input.val(),

      length = val.length,

      pos = getCursorPos($input);

      $input.val(val.substr(0, pos) + $(this).text().trim() + val.substr(pos));
      
      setCursorPos($input, pos + 1);
    
      $(this).addClass('active').siblings('.number').removeClass('active');

  });

  // 拨号键盘：x号删除

  $(document).on('click', '.jianpan .btn-del', function () {

    var $input = $('.jianpan .val'),

      val = $input.val(),

      length = val.length,

      pos = getCursorPos($input);


    $input.val(val.substr(0, pos - 1) + val.substr(pos));
    
    if (!pos) {
      setCursorPos($input, 0)
    } else {
      setCursorPos($input, pos - 1);
    }

  });

  // onkeyup="this.value=this.value.replace(/[^\r\n0-9]/g,'');"
  $(document).on('keyup', '.jianpan .input .val', function(e) {

    var $input = $('.jianpan .val'),pos = getCursorPos($input);
    var reg = /^[0-9]*$/;
    console.log()
    if (!reg.test($input.val())) {
      $input.val($input.val().replace(/[^\r\n0-9]/g,''))
      setCursorPos($input, pos - 1);
    }
  })

  document.ondragstart = function() {
    return false;
  };

  // 获取文本框光标位置

  function getCursorPos(el) {

    var $el = $(el).get(0);

    var cursurPosition = -1;



    if ($el.selectionStart > -1) {//非IE浏览器

      cursurPosition = $el.selectionStart;

    } else {//IE

      var range = document.selection.createRange();

      range.moveStart("character", -$el.value.length);

      cursurPosition = range.text.length;

    }

    return cursurPosition;

  }



  // 设置文本框光标位置

  function setCursorPos(el, pos) {

    var $el = $(el).get(0);

    var val = $el.value;

    var len = val.length;

    // 超过文本长度直接返回

    if (len < pos) return

    setTimeout(function () {

      $el.focus()

      if ($el.setSelectionRange) { // 标准浏览器

        $el.setSelectionRange(pos, pos)

      } else { // IE9-

        var range = $el.createTextRange()

        range.moveStart("character", -len)

        range.moveEnd("character", -len)

        range.moveStart("character", pos)

        range.moveEnd("character", 0)

        range.select()

      }

    }, 10)

  }



  //当浏览器窗口小于780像素时 头部的图标隐藏

  $(function () {

    if ($(window).width() < 780) {

      $('#navbar').hide();

    }

    $(window).on('resize', function () {

      if ($(this).width() < 780) {

        $('#navbar').hide();

      } else {

        $('#navbar').show();

      }

    })

  });



  //-------------会话定时器 start---------------

  var titleTimer;

  var title = document.title;

  var count = 0;

  var msgCount = 0;

  var tooltipid = shareInfo.hostTel + shareInfo.logonNumber;



  function getMsgId(len) {

    len = len || 32;

    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/

    var maxPos = $chars.length;

    var pwd = '';

    for (i = 0; i < len; i++) {

      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));

    }

    return pwd;

  }



  var statusArr = ["url('../../assets/img/online.png') no-repeat center",

    "url('../../assets/img/busy.png') no-repeat center",
	"url('../../assets/img/rest.png') no-repeat center",
    "url('../../assets/img/leave.png') no-repeat center",
    "url('../../assets/img/havemeal.png') no-repeat center",
    "url('../../assets/img/train.png') no-repeat center"];



  window.syncStatus = function (status) {

    var currstatus = $('#onlineSel').val();

    if (status && status != currstatus) {

      $('#onlineSel').val(status);

      var v = $("#onlineSel").find("option:selected").index();

      $('#navbar i.zt').css("background", statusArr[v]);

    }

  }



  $("#onlineSel").on("change", function () {

    window.switchStatus($('#onlineSel').val());

  });

  window.isPhoneChange = false;

  function convlist() {

    if ($("#mainFrame").attr("src").indexOf("/chat_v5/") >= 0) {

      if (titleTimer) {

        clearInterval(titleTimer);

        titleTimer = null;

      }
      document.title = title;
      $("#chatcorner").css("display", "none");

    } else {

      var url = shareInfo.asAddr;

      var msgid = getMsgId(32);

      $.ajax({

        type: 'post',

        url: url,

        timeout: 5000, //超时时间设置，单位毫秒

        data: '{"command":"0x32","systemid":"' + shareInfo.hostTel + '","loginuserid":"' + shareInfo.id + '","convtype":"0","msgid":"' + msgid + '"}',

        dataType: "json",

        async: true,

        success: function (data) {

          if (!data) {

            return;

          }

          if (data.code == 0) {

            syncStatus(data.session_list.clientstatus);
            
            if (data.session_list) {

              var queueCount = data.session_list.queueCount || 0;
            }

            if (data.session_list && data.session_list.count > 0 && data.loginuserid == shareInfo.id) {

              var unread = 0;
              var unreply = 0;
              var hasNewConv = false;

              sessionList = data.session_list.session;

              for (var i = 0; i < sessionList.length; i++) {

                var conv = sessionList[i];

                var msguncount = parseInt(conv.message.msguncount)

                if (conv) {

                  unread += msguncount;

                }
                if (conv.sender == 1) {
                  unreply++;
                }

                if (conv.reqtimes == "0") {

                  hasNewConv = true;

                }

              }



              if (unread > 0) {

                if (msgCount < unread) {

                  $("#tipsAudio").get(0).play();

                }

                msgCount = unread;

                if (!titleTimer) {

                  titleTimer = setInterval(function () {

                    if (count % 2 == 0) {

                      document.title = "★您有新消息★-" + title;

                    } else {

                      document.title = title;

                    }

                    count++;

                  }, 1000);

                }

              }



              if (unread > 0 || unreply > 0) {
                $("#chatcorner").css("display", "block");
              } else {
                if(titleTimer){
                  clearInterval(titleTimer);
                  titleTimer = null;
                  document.title = title;				
                }
                $("#chatcorner").css("display", "none");
              }

              if (hasNewConv) {
                
                ImccPlugin.msgTip(tooltipid, "0", "" + data.session_list.count, "" + unread, "您有一通新会话", title);

              } else if (unread > 0) {
                
                ImccPlugin.msgTip(tooltipid, "0", "" + data.session_list.count, "" + unread, "您有" + unread + "条未读消息", title);

              } else if (queueCount > 0) {
                
                ImccPlugin.msgTip(tooltipid, "0", "" + data.session_list.count, "" + queueCount, "当前有" + queueCount + "位客户正在排队", title);

              } else {
                
                ImccPlugin.msgTip(tooltipid, "0", "" + data.session_list.count, "0", "0", title);

              }

            } else {
              if (titleTimer) {
                clearInterval(titleTimer);
                titleTimer = null;
              }
              document.title = title;
              $("#chatcorner").css("display", "none");
              if (queueCount > 0) {
                ImccPlugin.msgTip(tooltipid, "0", "" + data.session_list.count, "" + queueCount, "当前有" + queueCount + "位客户正在排队", title);
              } else {
                ImccPlugin.msgTip(tooltipid, "0", "0", "0", "0", title);
              }
            }

            // 电话客服且客服偏好2：如果IM达到最大接入量，则电话示忙

            if (shareInfo.servPhone == "Y" && shareInfo.preference == '2') {

              var defaultPhoneMaxcount = shareInfo.defaultPhoneMaxcount;

              if (!defaultPhoneMaxcount || data.session_list.count >= parseInt(defaultPhoneMaxcount)) {

                window.isPhoneChange = true;

                window.busy(1); //电话自动示忙

              } else {

                if (window.isPhoneChange) { //true自动切换模式

                  window.busy(0); //电话切回在线

                  window.isPhoneChange = false; //false手动切换模式

                }

              }

            }



          } else if (data.code == 1) {

            //重新登录

            cLogin();

          }



        },

        error: function (jqXHR, textStatus, errorThrown) {

        },

        complete: function () {

        }

      });

    }

  }

  function grouplist() {

    if ($("#mainFrame").attr("src").indexOf("/chat_v5/") >= 0) {

      if (titleTimer) {

        clearInterval(titleTimer);

        titleTimer = null;

      }
      document.title = title;
      $("#chatcorner").css("display", "none");

    } else {

      var url = shareInfo.asAddr;

      var msgid = getMsgId(32);

      var req = {

        command: "0x45",

        loginuserid: "" + shareInfo.id,

        systemid: "" + shareInfo.hostTel,

        msgid: msgid,

      };

      $.ajax({
        type: 'post',
        url: url,
        timeout: 5000, //超时时间设置，单位毫秒
        dataType: 'json',
        data: JSON.stringify(req),
        success: function (data) {
          var count = 0;
          if (data && data.code == "0") {
            var groups = data.group;
            if(groups && groups.length > 0) {
              for(var i=0; i<groups.length; i++) {
                count += groups[i].unmsgcount;
              }
            }
          }

          if (count > 0) {
            $("#chatcorner").css("display", "block");
            if (!titleTimer) {
              titleTimer = setInterval(function () {
                if (count % 2 == 0) {
                  document.title = "★您有新消息★-" + title;
                } else {
                  document.title = title;
                }
                count++;
              }, 1000);
            }
          } else {
            //$("#chatcorner").css("display", "none");
            if (!titleTimer) {
              clearInterval(titleTimer);
              titleTimer = null;
            }
          }
        },

        error: function (jqXHR, textStatus, errorThrown) {
        }
      });
    }
  }

  function cLogin() {

    var url = window.IMCC_CONTEXT_PATH + "chat/logon.do";
    var headers = {};

    $.ajax({

      type: 'post',
      headers: headers,
      url: url,
      async: true,
      dataType: 'json',
      success: function (data) {

      },

      error: function (jqXHR, textStatus, errorThrown) {

      },

      complete: function () {

      }

    });

  }



  convlist();

  // grouplist();

  convTimer = setInterval(function(){

    convlist();

    // grouplist();

  }, 5000);

  //-------------会话定时器 end-----------------

  //-------------消息提醒定时器 start---------------

  function addNews(id, html, dd_size) {

    /*var DD_MAX_SIZE =1;

    var $node = $('#' + id);

    var $dds = $('#' + id + ' dd');

    var len = $dds.length;

    if ((len + dd_size) > DD_MAX_SIZE) {

      var delta = (len + dd_size) - DD_MAX_SIZE;

      if (delta >= DD_MAX_SIZE) {

        $node.append(html);

        $dds.remove();

      } else {

        $node.append(html);

        for (var i = 0; i < delta; i++) {

          $dds.eq(i).remove();

        }

      }

    } else {

      $node.append(html);

    }*/

    var $node = $('#' + id);

    $node.append(html);

    //控制有无消息的提示绿点

    //控制有无消息的提示绿点

    var hasNews = $('#laterNews dd').length > 0;

    var workOrders = $('#workOrders dd').length > 0;

    var completionStatus = $('#ProcessingNotice dd').length > 0;

    if (hasNews || workOrders || completionStatus) {

//    $('.icon-bell').addClass('in');

    } else {

//    $('.icon-bell').removeClass('in');

    }

  }

  function getContactPlanNews() {

    //公司公告

    window.apiRequest({
      url: "noticeuser/search",
      type: 'get',
      data: { "count": "1", "status": "2" },
      dataType: 'json',
      success: function (data) {

        if (!data.page) { return; }
        var html = '';
        var obj = {};

        if (data.page.items) {

          if (data.page.items.length == "0") {
            return;
          }

          for (var i = 0; i < data.page.items.length; i++) {
            obj = data.page.items[i];

            if (!obj) {
              continue;
            }
            html += '<dd class="list-group-item" id="' + obj.id + '">';
            html += ' <span>【公司公告】</span>';
            html += ' <a class="limitlength" href="javascript:void(0);" id="affiche">' + obj.title + '</a>';
            html += '</dd>';

          }

          $("p.noMsg").hide();
          $(".newnote-container .footer-btns").show();
          addNews("laterNews", html, data.page.items.length)
        } else {
        	return;
        }

      },

      error: function (data) { }

    });

    //系统提醒

/*     $.ajax({

      url: window.IMCC_CONTEXT_PATH + 'workOrderMng/searchProcessingNotice.do',
      type: 'get',
      data: { "count": "1", "pn": "1" },
      dataType: 'json',
      success: function (data) {
        if (!data.page) { return; }
        var html = '';
        var obj = {};

        if (data.page.items) {
          if (data.page.items.length == "0") {
            return;
          }

          for (var i = 0; i < data.page.items.length; i++) {
            obj = data.page.items[i];
            if (!obj) {
              continue;
            }
            html += '<dd class="list-group-item" id="' + obj.woId + '">';
            html += ' <span>【系统提醒】</saan>';
            html += ' <a class="limitlength" href="javascript:void(0);" id="toProcessingNotice">' + obj.content + '</a>';
            html += '</dd>';
          }
          $("p.noMsg").hide();
          $(".newnote-container .footer-btns").show();
          addNews("ProcessingNotice", html, data.page.items.length)
        }

        else {
          return;
        }

      },

      error: function (data) { }

    }); */

  }

  var leaveWordCount = 0; // 待处理留言数
  var wordRecordCount = 0; // 处理中的工单数
  function showRedSign() {

    $.ajax({

      url: window.IMCC_CONTEXT_PATH + 'home/getStatisticLeaveWord.do',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        if (data.isSuccess && data.count > 0) {
          leaveWordCount = data.count;
          $("#chatcorner2").css("display", "block");
        } else {
          leaveWordCount = 0;
          if(wordRecordCount == 0){
        	  $("#chatcorner2").css("display", "none");
          }
        }
      },

      error: function (data) {
        $span.html(0).hide();
      },

      complete: function () {
      }

    });

    $.ajax({

      url: window.IMCC_CONTEXT_PATH + 'home/getStatisticNoAssLeaveWord.do',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        if (data.isSuccess && data.count > 0) {
          $("#chatcorner3").css("display", "block");
        } else {
          $("#chatcorner3").css("display", "none");
        }
      },

      error: function (data) {
        $span.html(0).hide();
      },

      complete: function () {
      }
    });
  }
  
  function recoders(){
	  var $obj = $('.setting-list a:contains("我处理中的工单")');
	  var $span = $obj.find('span.badge');
	  //我处理中的工单
	    $.ajax({
	        url: window.IMCC_CONTEXT_PATH + 'cloud-wo-http/v1/wo/records/getWorRecordsCount?hosttel='+storageHosttel+"&wct="+1+"&token="+storageToken,
	        type: 'post',
	        dataType: 'json',
	        success: function (data) {
	          if (data.isSuccess && data.count > 0) {
	        	wordRecordCount = data.count;
	            $("#chatcorner6").css("display", "block");
	          } else {
	        	wordRecordCount = 0;
	        	if(leaveWordCount == 0){
	        		$("#chatcorner6").css("display", "none");
	        	}
	          }
	        },
	        error: function (data) {
	          $span.html(0).hide();
	        },
	        complete: function () {
	        }
	      });
  }

  var newsTimer = setInterval(pullNews, 1 * 60 * 1000);//时间可与计数器配合自由组合
	
	//——————————————————————————————————————————————————————————
	// 定义一个显示消息提醒的全局变量——————————————————————————————————
  var isShow
  var secShow = false
  var noneShow = true
  var planList2 = []
  // 获取消息提醒记录————————————————————————————————————————————
	function getContactPlanList (){
		window.apiRequest({
      url:window.IMCC_REMIND_PATH + "remind/findRemind",
      type:"post",
      dataType: 'json',
      success : function(data){
        if (data.remindList) {
        	$('.icon-bell').addClass('in');
        	$('.contactPlan-model').css('display', 'block');
        	var count = 0;
        	if (isShow != 2) {
        		isShow = 3
        	} else {
        		if (data.remindList.length > planList2.length) {
        			secShow = true
        			isShow = 3
        		} else if (data.remindList.length == planList2.length && data.remindList[0].id != planList2[0].id) {
        			secShow = true
        			isShow = 3
        		} else {
        			secShow = false
        		}
        	}
        	if (!noneShow) {
//      		$('#planList li').empty();
						document.getElementById('planList').innerHTML = '';
        		noneShow = true;
        	}
        	var oli
        	if (isShow == 1 || isShow == 3 || secShow) {
        		planList2 = [].concat(data.remindList)
	        	var tempArr = planList2
	        	var temp
	        	if (planList2.length > 7) {
	        		temp = planList2.slice(0,7)
	        	} else {
	        		temp = planList2
	        	}
	          for (var i = 0; i < temp.length; i++) {
	          	var tempType = '';
	          	if (temp[i].remindType == 1) {
	          		tempType = '联系计划'
	          	} else if (temp[i].type == 2) {
	          		tempType = '公司公告'
	          	}
	          	tempType = tempType || temp[i].remindTypeDesc;
	          	if (!oli) {oli = ''}
	          	oli += '<li class="planContent-li" id="' + temp[i].id + '" type="' + temp[i].remindType + '"><span class="planContent-type">【'
	          			+ tempType + '】</span><span id="planAttributeTitle" class="planContent-title">'
	          			+ temp[i].title + '</span><span id="planAttributeDes" class="planContent-descrip">' + temp[i].discribe + '</span></li>'
	          }
        		document.getElementById('planList').innerHTML = oli
	          // 消息数大于7条时  显示查看全部
          	if (data.remindList.length >7) {
          		$('#searchMore').css('display', 'block')
          	} else {
          		$('#searchMore').css('display', 'none')
          	}
        		$('#contactPlan').show();
        	} else {
        			$('#contactPlan').hide();
        	}
        } else {
        	if (isShow != 1 && isShow != 3) {
        		isShow = 0
        	}
         	$('.icon-bell').removeClass('in');
        	$('#searchMore').hide()
        	if (noneShow) {
        		noneShow = false
	        	oli = '<li class="noMsgShow"><span>' + '没有消息记录' + '</span></li>'
	        	document.getElementById('planList').innerHTML = oli
        	}
        	if (isShow == 0 || isShow == 2) {
        		$('.contactPlan-model').css('display', 'none');
        	} else {
        		$('.contactPlan-model').css('display', 'block');
        	}
        }
      }
      //error : function(data){};
    });
  };
  // 点击跳转
	function liclick(self) {
		var oliid = self.id
//		var olType = self.type
		window.apiRequest({
    url:"remind/updateStart",
    type:"post",
    data:JSON.stringify({"id":oliid}),
    dataType:'json',
    success : function(data){
      if (data.rstcode === 0) {
//    	if (olType == 3) {
//    		$('#planModal').modal('show')
//    		getContactPlanList()
//    	} else {
//    		window.parent.chooseFirstAndSecondMenu('客户', '我的客户', true, 'activePanel=3')
//    		getContactPlanList()
//    	}
        if(self.type == 1){ //联系计划跳转
          window.parent.chooseFirstAndSecondMenu('客户', '我的客户', true, 'activePanel=3');
        }
      	getContactPlanList()
      }	
    },
    error : function(data){}
		});
	}
	// 触发点击事件
  $('#planList').on('click', 'li', function (e) {
	  liclick(e.currentTarget)
  })
  
		// 消息提醒的显示隐藏
		$(document).ready(function () {
			//点击隐藏下拉框
			$('#plan-hidden').click(function(){
//				$('#contactPlan').hide();
				$('.contactPlan-model').css('display', 'none');
				isShow = 2
			});
			
			//点击显示联系计划
			$('#newNote').click(function(){
//				$('#contactPlan').show();
				$('.contactPlan-model').css('display', 'block');
				isShow = 1
				getContactPlanList()
			});
			
			// 点击查看更多跳转
			$('#searchMore').on('click', function () {
				window.parent.chooseFirstAndSecondMenu('客户', '我的客户', true, 'activePanel=3');
			});
		});
  //-------------消息提醒定时器 end-----------------



  function getHyxCookie(name) {

    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    var cookieStr = document.cookie;
    while (i < clen) {
      j = i + alen;
      if (document.cookie.substring(i, j) == arg) {
        var endstr = cookieStr.indexOf(";", j);
        if (endstr == -1) endstr = cookieStr.length;
        return unescape(cookieStr.substring(j, endstr));
      }

      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0)
        break;
    }

    return "";

  }

  //调用api接口

  window.apiRequest = function (ajaxoptions) {

    var hosttel = getHyxCookie("hosttel") || "";
    var alg = getHyxCookie("alg") || "";
    var token = getHyxCookie("token") || "";
    if (ajaxoptions.url.indexOf("?") < 0) {
      if (ajaxoptions.url.indexOf("http") != 0) {
        ajaxoptions.url = window.IMCC_API_PATH + ajaxoptions.url;
      }
      ajaxoptions.url = ajaxoptions.url + "?token=" + token + "&hosttel=" + hosttel + "&alg=" + alg;

    } else {
      if (ajaxoptions.url.indexOf("http") != 0) {
        ajaxoptions.url = window.IMCC_API_PATH + ajaxoptions.url;
      }
      ajaxoptions.url = ajaxoptions.url + "&token=" + token + "&hosttel=" + hosttel + "&alg=" + alg;

    }
    $.ajax(ajaxoptions);

  }

  window.api = {

    callout: function (hostNumber, imType, openid, callback) {

      if (!hostNumber && callback && (typeof callback == "function")) {
        callback({ code: 10, reason: "外呼失败，请选择主号" });
        return;
      } else if (!imType && callback && (typeof callback == "function")) {
        callback({ code: 10, reason: "外呼失败，请选择IM类型" });
        return;
      } else if (!openid && callback && (typeof callback == "function")) {
        callback({ code: 10, reason: "外呼失败，请输入IM号码" });
        return;
      }

      var type = "0";
      var url = window.IMCC_CONTEXT_PATH + "chat/callOut.do";
      var headers = {};

      $.ajax({
        type: 'post',
        headers: headers,
        url: url,
        async: true,
        dataType: 'json',
        data: {
          hostNumber: hostNumber,
          imType: imType,
          openid: openid,
          type: type
        },
        success: function (data) {

          if (data.code == 0) {
            if (callback && (typeof callback == "function")) {
              callback({ code: 0, reason: "" });
            }
            setTimeout(function () {
              window.chooseFirstMenu("会话", true);
            }, 500);
          } else {
            var text = "外呼失败";
            if (data.code == 100) {
              text = "非好友用户，外呼失败！";
            } else if (data.code == 200) {
              text = "无QQ外呼权限，外呼失败";
            }

            if (data.reason) {
              if (callback && (typeof callback == "function")) {
                callback({ code: data.code, reason: data.reason });
              }
            } else {
              if (callback && (typeof callback == "function")) {
                callback({ code: 11, reason: text });
              }
            }
          }
        },

        error: function (jqXHR, textStatus, errorThrown) {
          if (callback && (typeof callback == "function")) {
            callback({ code: 999, reason: "外呼失败,网络请求失败" });
          }
        }
      });
    }
  };

  window.onmessage = function (event) {
    if (event.data.command == "api.callout") {
      window.api.callout(event.data.hostNumber, event.data.imType, event.data.openid, function (res) {
        res.command = "api.callout",
        event.source.postMessage(res, event.origin);
      });
    }
  }

  function joinSetting() {

    // 屏蔽指定主号的接入量设置
    var managerINFO= window.localStorage.getItem("managerINFO")
    if (managerINFO) {
      managerINFO = JSON.parse(managerINFO)
      if (managerINFO.IM_SERV_NUM_HIDE && parseInt(managerINFO.IM_SERV_NUM_HIDE) === 1) {
        $('#joinSetting').hide()
      }
    }
    var versionInfo= window.localStorage.getItem("versionInfo")
    if(versionInfo){
    	versionInfo = JSON.parse(versionInfo)
    	//版本菜单屏蔽设置
        //为兼容老客户，如果一个版本都没设置则为老客户，全部菜单显示。
        if(versionInfo.PHONE_VERSION || versionInfo.WEIXIN_VERSION || versionInfo.WEBCHAT_VERSION 
      		  || versionInfo.QQ_VERSION || versionInfo.WEIBO_VERSION || versionInfo.QIDIAN_VERSION || versionInfo.EMAIL_VERSION ){
        	$('#customer').show();
        	if(versionInfo.PHONE_VERSION && parseInt(versionInfo.PHONE_VERSION) == 1 ){
          	  $('#phone').show();
          	  $('#phoneTip').show();
          	  $('#miniPhone').show();
          	  $('#state').show();
            }
            if(versionInfo.WEIXIN_VERSION && parseInt(versionInfo.WEIXIN_VERSION) == 1 ){
          	  $('#imChat').show();
          	  $('#wxTip').show();
          	  $('#miniProgramTip').show();
            }
            if(versionInfo.WEBCHAT_VERSION && parseInt(versionInfo.WEBCHAT_VERSION) == 1 ){
          	  $('#imChat').show();
//          	  $('#marketing').show();
          	  $('#webchatTip').show();
            }
            if(versionInfo.QQ_VERSION && parseInt(versionInfo.QQ_VERSION) == 1 ){
          	  $('#imChat').show();
          	  $('#qqTip').show();
            }
            if(versionInfo.WEIBO_VERSION && parseInt(versionInfo.WEIBO_VERSION) == 1 ){
          	  $('#imChat').show();
          	  $('#weiboTip').show();
            }
            if(versionInfo.QIDIAN_VERSION && parseInt(versionInfo.QIDIAN_VERSION) == 1 ){
          	  $('#imChat').show();
            }
            if(versionInfo.EMAIL_VERSION && parseInt(versionInfo.EMAIL_VERSION) == 1 ){
          	  $('#imChat').show();
          	  $('#mail').show();
          	  $('#emailTip').show();
            }
            if(versionInfo.WORKORDER_VERSION && parseInt(versionInfo.WORKORDER_VERSION) == 1 ){
              $('#workorder').show();
            }
        }else{
      	  $('#phone').show();
      	  $('#phoneTip').show();
      	  $('#miniPhone').show();
    	  $('#state').show();
      	  $('#imChat').show();
      	  $('#wxTip').show();
      	  $('#miniProgramTip').show();
      	  $('#webchatTip').show();
      	  $('#qqTip').show();
      	  $('#weiboTip').show();
      	  $('#emailTip').show();
      	  $('#mail').show();
      	  $('#workorder').show();
      	  $('#customer').show();
        }
    }

  }
  
  function pullUpgradeNotice(){
	  $.ajax({
	        url: window.IMCC_CONTEXT_PATH + 'ucc-api/v1/upgradeNotice/getNewUpgradeNotice',
	        type: "get",
	        data: {token: storageToken, hosttel: storageHosttel},
	        dataType: 'json',
	        success: function (data) {
	          console.log(data)
	          if (data && data.rstcode == 0) {
	        	  var isNULL=$.isEmptyObject(data.content.notice);
	        	  if(data.content.notReadCount>0){
        			  $("#upgradeChatcorner").show();
        		  }else{
        			  $("#upgradeChatcorner").hide();
        		  }
	        	  if(!isNULL){
	        		  $("#upgradeNoticeId").val(data.content.notice.id);
	        		  $("#noticeTitle").html(data.content.notice.title);
	        		  $("#noticeContent").html(data.content.notice.content);
	        		  $("#noticeTime").html(data.content.notice.upTime);
	        		  $("#noticeInfoDiv").modal("show");
	        	  }else{
	        		  $("#upgradeNoticeId").val("");
	        		  $("#noticeInfoDiv").modal("hide");
	        	  }
	          } 
	        }
	  })
  }
  $('#noticeInfoDiv').on('hide.bs.modal', function () {
	 var noticeId=$("#upgradeNoticeId").val();
	 if(noticeId!=""){
		 $.ajax({
		        url: window.IMCC_CONTEXT_PATH + 'ucc-api/v1/upgradeNotice/updateReadState?token='+storageToken+'&hosttel='+storageHosttel,
		        type: "POST",
		        data: "{noticeId:"+noticeId+",type:1}",
		        dataType: 'json',
		        success: function (data) {
		          console.log(data)
		          if (data && data.rstcode == 0) {
		        	  
		          } 
		        }
		 })
	 }
  })

  joinSetting()

	  function pullNews() {
	    $(".newnote-container dd").remove();
		    getContactPlanNews();
		    showRedSign();
		    recoders();
			getContactPlanList();
			pullUpgradeNotice();
		  }
	
	  	pullNews();//初始调一次
	  	pullUpgradeNotice();

	})

