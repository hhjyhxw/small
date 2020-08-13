define(["jquery", "pnotify", "home/common", "bootstrap"], function ($, PNotify, common) {
  jQuery(document).ready(function ($) {
    var userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
    var taskCustomerId = "";       //外呼任务使用
    var taskCanCall = 1;           //外呼任务使用
    var userTel="";                 //屏蔽电话的变量
    var extension = common.getImccCookie("EXTENSION"); // 接听号码
    var listenType = common.getImccCookie("LISTENTYPE"); // 接听类型；1表示座机；2表示手机
    var showChange = common.getImccCookie("SHOWCHANGE"); // 是否显示可以改变接听方式。1表示可以；2表示不可以
    var isConnect = false   // 判断电话是否接通
    var showInvite = true
    if(userInfo && userInfo.servPhone != "Y") {
      $("#callup").hide();
      $("#throughPhone").hide(); // 隐藏改变转接方式
    }
    if(userInfo.isBindMobileNo != 1 || userInfo.mobileNo == null 
    		|| userInfo.mobileNo.trim() == ''){ // 没有开启手机绑定或者手机号码为空
    	$("#throughPhone").hide(); // 隐藏改变转接方式
    }
    if(userInfo.ctiType != "3"){ // 不是使用自助cti
    	$("#throughPhone").hide(); // 隐藏改变转接方式
    }
    if(showChange != 1){ // 不在转接时间范围内
    	$("#throughPhone").hide(); // 隐藏改变转接方式
    }
    if(listenType && listenType == 1){
    	$("#telephone").prop('checked', true);
    }else if(listenType && listenType == 2){
    	$("#mobilePhone").prop('checked', true);
    }
    
    window.isImChanged = false;

    function initPhone(AgentProxy) {
      $("#hostPhone").text(userInfo.hostPhone);
      $("#hostPhone").hide()
      var agentProxy = new AgentProxy();
	  
      agentProxy.init({
        agentId: userInfo.logonNumber,
        exten: extension,//userInfo.extension,
        password: userInfo.password,
        host: userInfo.hostPhone,
        hostTel: userInfo.hostTel,
        ctiserver: userInfo.ctiServer,
        sipip: userInfo.sipip,
        onRing: function () {
          var phoneNum = common.getImccCookie("PHONE_NUM");
          var cType = common.getImccCookie("PHONE_CALL_OUT_TYPE");
          apiRequest({
            type: 'post',
            url: window.IMCC_REMIND_PATH + 'info/findCustomer',
            data: JSON.stringify({"cusTel":phoneNum,"hostImNumber":this.host}),
            dataType:"json",
            success: function (data) {
              if(data.result && data.result.length != 0){
                var callName=data.result[0].cusName
                $("#call-name").text(callName);
              }
            },
            error: function (data) {   
            }
           });
          if (phoneNum) {
            console.log(phoneNum + '==================phoneNum')
            console.log(cType + '================ctype')
            if(cType==0) {
              //$("#contactPlan").hide();
              if($("#contactPlan").is(":visible")==true){   
                 $("#call-in").css({"right":"310px","bottom":"8px"})
              }else{ 
                 $("#call-in").css({"right":"8px","bottom":"83px"})
              }
              $("#call-in").show();
               $("#state").text("振铃");
  			   var userInfo = JSON.parse(localStorage.getItem('managerINFO'));
  				if(userInfo && userInfo['PHONE_NUM_MASK'] && userInfo['PHONE_NUM_MASK']=="1"){
  				   userTel=phoneNum.substr(0,phoneNum.length-8)+'****'+phoneNum.substr(-4);
  				  $("#call-num").text(userTel);
  				}else{
  				  $("#call-num").text(phoneNum);
  				};
            } else {
        	  $("#state").text("外拨中");
            }
            $("#Hook").removeClass("icon-guaduan");
            $("#Hook").addClass("icon-laidian");
            $("#Hook").show();
            $("#sendCall").hide();
            $("#overCall").show();
            $("#callup").hide();
            $('.icon-phone-square').addClass("tada");
            var userInfo = JSON.parse(localStorage.getItem('managerINFO'));
            if(userInfo && userInfo['PHONE_NUM_MASK'] && userInfo['PHONE_NUM_MASK']=="1"){
               userTel=phoneNum.substr(0,phoneNum.length-8)+'****'+phoneNum.substr(-4);
              $("#txtAni").text(userTel);
            }else{
              $("#txtAni").text(phoneNum);
            };
            $("#phoneHref").attr('url', window.IMCC_CONTEXT_PATH + "phone/main.do?ani=" + phoneNum
              + "&callType=" + cType + "&sessionId=" + common.getImccCookie("PHONE_SESSION_ID"));
            if(window.mainFrame.nowChatShow){          //电话页面打开时切换至当前通话
              window.mainFrame.nowChatShow(phoneNum,cType,null, common.getImccCookie("PHONE_SESSION_ID"));
            }
          }
        },
        onTalkStart: function () {
          chooseFirstMenu("电话", true);
          $("#call-in").hide();
          $("#state").text("通话中");
          $("#Hook").removeClass("icon-laidian");
          $("#Hook").addClass("icon-guaduan");
          $('#invite').show()
          $('#inviteTransfer').hide()
          $('#inviteMeet').hide()
          $('#cancelInvite').hide()
          $("#passOver").show();
          $("#Hold").show();
          $("#ServiceLevel").show();
          common.jishi();
          if(userInfo.preference == "0") {
            window.isImChanged = true;
            window.switchStatus("3");
          }
          // 电话接通后设置为true
          isConnect = true
        },
        onTalkEnd: function () {
          $("#call-in").hide();
          var phoneNum = common.getImccCookie("PHONE_NUM");
          var cType = common.getImccCookie("PHONE_CALL_OUT_TYPE");
          var sid = common.getImccCookie("PHONE_SESSION_ID");
          common.stopCount();

          //if(cType == 0) {      //电话页面打开时采集来话原因
            if(window.mainFrame.treeReasonOpen){
              window.mainFrame.treeReasonOpen(phoneNum, null, sid);
            }
          //}
          if(window.mainFrame.findHistory){
            setTimeout(function () {
              window.mainFrame.findHistory('1');
            }, 5000);
          }
          if(window.mainFrame.nowChatHide){       //电话页面打开时切换至历史通话
            window.mainFrame.nowChatHide();
          }

          if(taskCustomerId) {
            $.ajax({
              type : "POST",
              url : window.IMCC_CONTEXT_PATH + "/mycalltask/updateHangUp.do",
              data : {
                "taskCustomerId" : taskCustomerId
              },
              cache : false,
              success : function(data) {

              }
            });
          }
          taskCustomerId="";

          document.cookie="PHONE_CALL_OUT_TYPE=0;path=/;";
          document.cookie="PHONE_NUM=;path=/;";
          $("#Hook").hide();
          $('#invite').hide();
          $('#inviteTransfer').hide()
          $('#inviteMeet').hide()
          $('#cancelInvite').hide()
          $("#passOver").hide();
          $("#Hold").hide();
          $("#ServiceLevel").hide();
          $("#sendCall").show();
          $("#overCall").hide();
          $("#callup").show();
          $("#txtAni").text("");
          $('.icon-phone-square').removeClass("tada");
          $("#phoneHref").attr('url', window.IMCC_CONTEXT_PATH + "phone/main.do");

          if(userInfo.preference == "0" && window.isImChanged) {
            window.isImChanged = false;
            window.switchStatus("1");
          }
          // 电话挂断后将isConnect重置为false
          try {
            if (!isConnect && cType == 1) {
              $.ajax({
                type: 'post',
                url: window.location.origin + '/smsautosend/sendMobile.do',
                data: {"number":phoneNum},
                dataType:"json",
                success: function (data) {
                  console.log('电话未接通，已发送短信')
                },
                error: function (data) {
                  console.log(error)
                }
               })
            }
          } catch (error) {
            console.log(error)
          }
          isConnect = false
        },
        onStateChange: function (state) {
          common.stopCount();
          switch (state) {
            case 1 :
              $("#state").text("未登录");
              $("#callup").show();
              $(".callup-tpl #online").text("示忙");
              $("#passOver").popover('hide');
              $('#invite').popover("hide");
              $("#call-in").hide();
              break;
            case 2 :
              $("#state").text("在线");
              $("#callup").show();
			  $("#callup").css('background-image', 'url(../../assets/img/zaixian.png)');
              $(".callup-tpl #online").text("在线");
              $("#passOver").popover('hide');
              $('#invite').popover("hide");
              $("#call-in").hide();
              showInvite = true
              break;
            case 3 :
              $('#invite').hide()
              $('#inviteTransfer').hide()
              $('#inviteMeet').hide()
              $('#cancelInvite').hide()
              $("#passOver").hide();
              $("#Hold").hide();
              $('#ServiceLevel').hide();
              $("#Hook").hide();
              $("#callup").show();
              $("#txtAni").text(" ");
              $("#state").text("示忙");
			  $("#callup").css('background-image', 'url(../../assets/img/phone_busy.png)');
              $(".callup-tpl #online").text("示忙");
              $("#passOver").popover('hide');
              $('#invite').popover("hide");
              $("#call-in").hide();
              showInvite = true
              break;
            case 4 :
              $('#invite').hide()
              $('#inviteTransfer').hide()
              $('#inviteMeet').hide()
              $('#cancelInvite').hide()
              $("#passOver").hide();
              $("#Hold").hide();
              $('#ServiceLevel').hide();
              $("#Hook").hide();
              $("#callup").show();
              $("#txtAni").text(" ");
              $("#state").text("小休");
              $(".callup-tpl #online").text("示忙");
              $("#passOver").popover('hide');
              $('#invite').popover("hide");
              $("#call-in").hide();
              break;
            case 5 :
              $("#state").text("预占");
              $('#invite').hide()
              $("#callup").show();
              $("#call-in").hide();
              break;
            case 6 :
              $("#state").text("呼入本方振铃");
              $('#invite').hide()
              $("#passOver").popover('hide');
              $('#invite').popover("hide");
              $("#callup").hide();
              $("#call-in").show();
              break;
            case 7 :
              $("#state").text("呼出本方振铃");
              $("#passOver").popover('hide');
              $('#invite').hide()
              $('#invite').popover("hide");
              $("#callup").hide();
              break;
            case 8 :
              $("#state").text("呼出对方振铃");
              $('#invite').hide()
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 9 :
              $("#state").text("通话中");
              $("#callup").hide();
              $("#call-in").hide();
              $('#inviteTransfer').hide();
              $('#inviteMeet').hide();
              $('#invite').show();
              $('#cancelInvite').hide();
              $('#passOver').show();
              $('#Hold').show();
              $('#ServiceLevel').show();
              $('#Hook').show()
              common.jishi();
              break;
            case 10 :
              $("#state").text("呼出本方接听");
              $('#invite').hide()
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 11 :
              $("#state").text("内部通话中");
              $("#callup").hide();
              $("#call-in").hide();
              $('#inviteTransfer').hide();
              $('#inviteMeet').hide();
              $('#invite').hide();
              $('#cancelInvite').hide();
              $('#passOver').hide();
              $('#Hold').hide();
              $('#ServiceLevel').hide();
              $('#Hook').show()
              break;
            case 12 :
              $("#state").text("保持");
              $('#invite').hide();
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 13 :
              $("#state").text("咨询呼叫");
              $('#cancelInvite').show()
              $('#invite').hide();
              $("#callup").hide();
              $("#call-in").hide();
              $('#passOver').hide();
              $('#Hold').hide();
              $('#ServiceLevel').hide();
              $('#Hook').hide();
              break;
            case 14 :
              $("#state").text("咨询通话");
              if (showInvite) {
                $('#inviteTransfer').show();
                $('#inviteMeet').show();
              }
              $('#cancelInvite').show();
              $('#invite').hide()
              $('#passOver').hide();
              $('#Hold').hide();
              $('#ServiceLevel').hide();
              $('#Hook').hide();
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 15 :
              $("#state").text("会议");
              $('#inviteTransfer').hide();
              $('#inviteMeet').hide();
              $('#invite').hide();
              $('#cancelInvite').hide();
              $("#callup").hide();
              $("#call-in").hide();
              $('#passOver').hide();
              $('#Hold').hide();
              $('#ServiceLevel').hide();
              $('#Hook').show()
              common.jishi();
              break;
            case 16 :
              $("#state").text("监听中");
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 17 :
              $("#state").text("强插");
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 18 :
              $("#state").text("被监听");
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 19 :
              $("#state").text("被强插");
              $("#callup").hide();
              $("#call-in").hide();
              break;
            case 20 :
              $("#state").text("话后小结");
              $("#callup").show();
              $("#call-in").hide();
              $("#passOver").popover('hide');
              $('#invite').popover("hide");
              common.jishi();
              break;
            case 28 :
        	  new PNotify({
                title: "坐席分机未注册",
                type: "fail",
                delay: 2000
              });
              $("#call-in").hide();
              break;
            default:
              $("#state").text("未知");
              $("#callup").show();
              $("#call-in").hide();
          }
        }
      }, function () {
        $("#state").text("在线");
		$("#callup").css('background-image', 'url(../../assets/img/zaixian.png)');
      });

	  window.busy = function (state) {
        if(state == 1) {
          agentProxy.setBusy();
        } else {
          agentProxy.setIdle();
        }
      }

      // 拨打电话：实例化popover
      $('#callup').popover({
        trigger: 'click',
        placement: 'bottom',
        html: 'true',
        template: '<div class="popover popover-callup" role="tooltip"><div class="arrow"></div><div class="popover-mask"></div><div class="popover-content"></div></div>',
        content: function () {
          return $(".callup-tpl").html();
        }
      });
      $('#callup').on('click', function () {
          // 在线状态：实例化popover
        $('#online').popover({
          trigger: 'click',
          placement: 'bottom',
          html: 'true',
          template: '<div class="popover popover-online" role="tooltip"><div class="arrow"></div><div class="popover-mask"></div><div class="popover-content"></div></div>',
          content: function () {
            return $(".online-tpl").html();
          }
        });
        $('#online').on('shown.bs.popover', function () {
          $("#Busy").on("mouseover", function () {
            
          });
          $("#Busy").on("click", function () {
            $("#online").text($(this).text()).css('background-color', 'rgb(248, 139, 80)');
            $('#online').popover('hide');
            agentProxy.setBusy({"phoneStatus": "ResetStatuschangetype"});
          })
          $("#Pause").on("click", function () {
            $('#online').popover('hide');
            agentProxy.setIdle({"phoneStatus": "ResetStatuschangetype"});
          });
        });

        // 开始时为拨号键盘赋值
        $("#sendCall").on("click", function () {
          var dnis = document.getElementById("callNumber").value;
          if (dnis == "") {
            new PNotify({
              title: "提示",
              text: "请输入要外拨的号码!",
              type: "info",
              delay: 2000
            });
            return;
          }
          if (dnis.length > 15) {
            new PNotify({
              title: "提示",
              text: "号码有误",
              type: "info",
              delay: 2000
            });
            return;
          }
          $("#sendCall").hide();
          $("#overCall").show();
          var userInfo = JSON.parse(localStorage.getItem('managerINFO'));
          if(userInfo && userInfo['PHONE_NUM_MASK'] && userInfo['PHONE_NUM_MASK']=="1"){
             userTel=dnis.substr(0,dnis.length-8)+'****'+dnis.substr(-4);
            $("#txtAni").text(userTel);
          }else{
             $("#txtAni").text(dnis);
          };
          $("#state").text("外拨中");
          $('#callup').hide();
          $("#Hook").show();
          $("#Hook").addClass("icon-guaduan");
          $("#Hook").removeClass("icon-laidian");
          $('#callup').popover('hide');
          $('#invite').hide();
          $('#inviteTransfer').hide()
          $('#inviteMeet').hide()
          $('#cancelInvite').hide()
          $("#passOver").show();
          $("#Hold").show();
          $("#ServiceLevel").show();

          /**
           * @description 变更外地号码判定条件(传入外呼号码和hostPhone判断归属地是否一致),外地号码自动加0
           * @author xiex
           * time 2017-09-15 16:50
           */
          //获取cookie
          var userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
          var wctToken =localStorage.getItem("wctToken")
          //调用方法设置token
            $.ajax({
                url: '/ucc-api/v1/surveyPhone/getCallOpenCity?hosttel=' + userInfo.hostTel + '&token=' + wctToken + '&wct=1',
                type: "post",
                data:JSON.stringify({"phoneNumber":dnis,"imNumber":userInfo.hostPhone}),
                dataType: 'json',
                success: function (data) {
                  //归属地相同  rstcode=0
                  //归属地不同且正在拨打的号码首位不是0
                  dnis=''+dnis
                  // if(data.rstcode!=0&&dnis.indexOf(0)!=0){
                  //   dnis='0'+dnis
                  // }
                  var city = userInfo.city || '深圳'
                  var ht = localStorage.getItem('managerINFO');
                  if (ht) {
                    ht = JSON.parse(ht)
                    if (!ht.PHONE_AUTO_ADD_PREFIX || (ht.PHONE_AUTO_ADD_PREFIX && ht.PHONE_AUTO_ADD_PREFIX == 2)) {
                      if (data.openCity) {
                        if(data.openCity.indexOf(city) === -1 && dnis.indexOf(1) ==0 && dnis.length === 11){
                          dnis='0'+dnis
                        }
                      }
                    }
                  }
                    //拨号
                    agentProxy.callout({
                        target: dnis,
                        callback: function (res) {
                            document.cookie = "PHONE_NUM=" + dnis + ";path=/;";
                            document.cookie = "PHONE_CALL_OUT_TYPE=1;path=/;";
                            //common.jishi();
                            if (res.retcode > 0) {
                          	  new PNotify({
                                title: "电话外拨失败",
                                text: res.errmsg,
                                type: "error",
                                delay: 2000
                              });
                          	  $("#txtAni").text("");
                              $("#state").text("示忙");
                              $('#invite').hide();
                              $('#inviteTransfer').hide()
                              $('#inviteMeet').hide()
                              $('#cancelInvite').hide()
                              $("#passOver").hide();
                              $("#Hold").hide();
                              $("#ServiceLevel").hide();
                              $("#Hook").hide();
                              $("#callup").show();
                            }
                        }
                    });
                },
                error: function (data) {  }
            });
        });
        //拨号键盘-挂机
        $("#overCall").on("click", function () {
          $("#sendCall").show();
          $("#overCall").hide();
          $('#callup').show();
          $("#Hook").hide();
          $("#passOver").popover('hide');
          $('#invite').popover("hide");
        });
      })

      //挂机
      $("#Hook").on("click", function () {
        if ($("#Hook").hasClass("icon-guaduan")) {
          agentProxy.hangup();
          $('#invite').hide();
          $('#inviteTransfer').hide()
          $('#inviteMeet').hide()
          $('#cancelInvite').hide()
          $("#passOver").hide();
          $("#passOver").popover('hide');
          $('#invite').popover("hide");
          $("#Hold").hide();
          $("#ServiceLevel").hide();
          $("#Hook").hide();
          $('#callup').show();
          common.stopCount();
        } else if($("#Hook").hasClass("icon-laidian")) {
          agentProxy.answer({
            callback: function(data) {
              if(data.code != 0) {
                new PNotify({title: "提示", text: "应答失败："+data.reason, type: "fail", delay: 2000});
              }
            }
          });
        }
      });

      //保持通话
      $("#Hold").on("click", function () {
        if ($(this).text() == "保持") {
          agentProxy.hold();
          //保持
          $("#Hold").removeClass("btn-start");
          $("#Hold").addClass("btn-end");
          $('#invite').hide();
          $('#inviteTransfer').hide();
          $('#inviteMeet').hide();
          $('#cancelInvite').hide();
          $("#passOver").hide();
          $("#ServiceLevel").hide();
          $("#Hook").hide();
          $("#state").text("通话保持中");
          $(this).text("恢复");
          $(this).attr("title", "恢复");
        } else {
          agentProxy.unhold();
          //恢复
          $("#Hold").removeClass("btn-end");
          $("#Hold").addClass("btn-start");
          $('#invite').hide();
          $('#inviteTransfer').hide()
          $('#inviteMeet').hide()
          $('#cancelInvite').hide()
          $("#passOver").show();
          $("#ServiceLevel").show();
          $("#Hook").show();
          $(this).text("保持");
          $(this).attr("title", "保持");
        }
        $("#passOver").popover('hide');
        $('#invite').popover("hide");
      })
      //满意度（质检）
      $("#ServiceLevel").on("click", function () {
        agentProxy.satisfy({
          isSatisfy: true
        });
        $('#invite').hide()
        $('#inviteTransfer').hide()
        $('#inviteMeet').hide()
        $('#cancelInvite').hide()
        $("#passOver").hide();
        $("#passOver").popover('hide');
        $('#invite').popover("hide");
        $("#Hold").hide();
        $("#ServiceLevel").hide();
        $("#Hook").hide();
        $('#callup').show();
        $("#txtAni").text(" ");
      })

      // 获取C服务器地址
      var cAddr = ''
      agentProxy.getCserver(function (data) {
        if (data && data.ctiDomain) {
          cAddr = data.ctiDomain.httpReserve
        }
      })

      // 获取所有电话技能的坐席
      var serviceList = []
      agentProxy.getAllPhoneService(function (data) {
        if (data && data.rstcode == 0 && data.userList) {
          serviceList = data.userList
        }
      })

      function imcc_uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
      }
      function getNavigation () {
        var sel = '<option value="">请选择</option>'
        $.ajax({
          url: window.IMCC_CONTEXT_PATH + 'ucc-api/v1/navProcess/getPhoneNavProDir?hosttel=' + userInfo.hostTel + '&token=' + localStorage.getItem("wctToken") + '&wct=1',
          type: 'post',
          dataType: 'json',
          success: function (data) {
            if (data.rstcode == 0 && data.navProDirs) {
              for (var i = 0; i < data.navProDirs.length; i++) {
                sel += '<option value=' + data.navProDirs[i].id + '>' + data.navProDirs[i].text + '</option>'
              }
            }
            $('#navDir').html(sel)
          }
        })
      }

      getNavigation()
      $(document).on('change', '#navDir', function () {
        var str = ''
        if (!$('#navDir').val()) {
          return
        }
        $.ajax({
          url: window.IMCC_CONTEXT_PATH + 'ucc-api/v1/navProcess/getNavProByDirId/' + $(this).val() + '?hosttel=' + userInfo.hostTel + '&token=' + localStorage.getItem("wctToken") + '&wct=1',
          type: 'post',
          dataType: 'json',
          success: function (data) {
            if (data.rstcode == 0 && data.processList) {
              for (var i = 0; i < data.processList.length; i++) {
                if (data.processList[i].name.indexOf('22222') === 0 || data.processList[i].name.indexOf('11111') === 0) {
                  str += '<option value=' + data.processList[i].name + '>' + data.processList[i].name + '</option>'
                }
              }
            }
            $('#navProcess').html(str)
          }
        })
      })


      // 咨询弹框，实例化popover
      $("#invite").popover({
        trigger: 'click',
        placement: 'bottom',
        html: 'true',
        delay: {'show': 300, 'hide': 100},
        template: '<div class="popover popover-invite" role="tooltip"><div class="arrow"></div><div class="popover-mask"></div><div class="popover-content" style="width:400px;"></div></div>',
        content: function () {
          return $(".consult-tpl").html();
        }
      });

      $('#invite').on('shown.bs.popover', function () {
        $('#invite').attr('disabled', 'disabled')
				$("#ServiceLevel").attr("disabled","disabled");
        $("#Hook").attr("disabled","disabled");
        var serviceId = ''
        var agentId = ''
        var agentDn = ''
        agentProxy.getAllSkill({
          url: cAddr,
          msgid: imcc_uuid(),
          ProxyName: 'ws_' + imcc_uuid(),
          callback: function (data) {
            if (data && data.retcode == 0 && data.skill && data.skill.length) {
              var code = ''
              for (var i = 0; i < data.skill.length; i++) {
                code += '<li class="list_li" title=' + data.skill[i].name + ' data-id=' + data.skill[i].id + '>' + data.skill[i].name +'</li>'
              }
              $('#toService').html(code)
            }
          }
        })
        // li点击事件,查询人员
        $("#toService").on("click", "li", function () {
          if ($(this).hasClass('active')) {
            return
          }
          $('#service').html('')
          $(this).addClass('active').siblings().removeClass('active')
          agentProxy.getServiceById({
            command: 'GetAgentDetailsBySkill',
            url: cAddr,
            id: $(this).data('id'),
            msgid: imcc_uuid(),
            ProxyName: 'ws_' + imcc_uuid(),
            callback:function(res) {
              if (res.retcode == 0 && res.agentInfoList && res.agentInfoList.length) {
                var man = ''
                var arr = res.agentInfoList
                for(var j = 0; j < arr.length; j++) {
                  var txt = ''
                  var flag = false
                  if (arr[j].currStatus == 2) {
                    txt = '在线'
                    flag = true
                  }
                  if (!flag) {
                    continue
                  }
                  var login = arr[j].agentId.split('@')[0]
                  for (var k = 0; k < serviceList.length; k++) {
                    if (login === serviceList[k].logonNumber) {
                      man += '<li class="list_li" title=' + serviceList[k].logonNumber + '-' + serviceList[k].name + '(' + txt + ') data-agentId='+ arr[j].agentId +' data-agentDn=' + arr[j].agentDn + ' data-id=' + serviceList[k].id +'>' + serviceList[k].logonNumber + '-' + serviceList[k].name + '(' + txt + ')</li>'
                      continue
                    }
                  }
                }
                $('#service').html(man)
              }
            }
          })
        });

        // 获取需要咨询的客服的id
        $('#service').on('click', 'li', function () {
          serviceId = $(this).data('id')
          agentId = $(this).data('agentid')
          agentDn = $(this).data('agentdn')
          $(this).addClass('active').siblings().removeClass('active')
        })

        // 确认咨询
        $('#docons').on('click', function () {
          if ($('#consInner').hasClass('active')) {
            // 咨询内线
            if (!serviceId) {
              new PNotify({
                title: "提示",
                text: "请选择需要咨询的坐席",
                type: "info",
                delay: 2000
              })
              return
            }
            agentProxy.doConsult(agentId, '', agentDn + '', '0', function (data) {
              if (data.retcode != 0) {
                new PNotify({
                  title: "提示",
                  text: data.errmsg || '咨询失败',
                  type: "info",
                  delay: 2000
                })
              } else {
                $('#invite').popover("hide");
              }
            })
          } else if ($('#consOutter').hasClass('active')) {
            var consNum = $('#consNum').val()
            if (!consNum) {
              new PNotify({
                title: "提示",
                text: "请输入被咨询的外线号码",
                type: "info",
                delay: 2000
              })
              return
            }
            agentProxy.doConsult(consNum, '', agentDn + '', 1, function (data) {
              if (data.retcode != 0) {
                new PNotify({
                  title: "提示",
                  text: data.errmsg || '咨询失败',
                  type: "info",
                  delay: 2000
                })
              } else {
                $('#invite').popover("hide");
              }
            })
          } else if ($('#consNav').hasClass('active')) {
            if (!$('#navProcess').val()) {
              new PNotify({
                title: "提示",
                text: "请选择导航流程",
                type: "info",
                delay: 2000
              })
              return
            }
            if ($('#navProcess').val().indexOf('22222') === 0) {
              showInvite = false
              agentProxy.doConsult($('#navProcess').val(), '', agentDn + '', 1, function (data) {
                if (data.retcode != 0) {
                  new PNotify({
                    title: "提示",
                    text: data.errmsg || '咨询失败',
                    type: "info",
                    delay: 2000
                  })
                } else {
                  $('#inviteTransfer').hide()
                  $('#inviteMeet ').hide()
                  $('#invite').popover("hide");
                }
              })
            } else if ($('#navProcess').val().indexOf('11111') === 0) {
              showInvite = false
              agentProxy.satisfy({
                type: $('#navProcess').val(),
                callback: function (data) {
                  if (data.retcode != 0) {
                    new PNotify({
                      title: "提示",
                      text: data.errmsg || '咨询失败',
                      type: "info",
                      delay: 2000
                    })
                  } else {
                    $('#inviteTransfer').hide()
                    $('#inviteMeet ').hide()
                    $('#invite').popover("hide");
                  }
                }
              })
            } else {
              showInvite = true
              // 其余的都调满意度度接口
              $('#ServiceLevel').click()
              $('#invite').popover("hide");
            }
          }
        })

        //取消
        $("#cancelCons").on("click", function () {
          $('#invite').popover("hide");
        })
      })

      $('#invite').on('hidden.bs.popover', function () {
        $('#invite').removeAttr('disabled')
				$("#passOver").removeAttr("disabled");
		    $("#ServiceLevel").removeAttr("disabled");
		    $("#Hook").removeAttr("disabled");
      })

      // 断开咨询，返回正常通话
      $('#cancelInvite').on('click', function () {
        agentProxy.cancelConsult(function (data) {
          var title = ''
          if (data.retcode == 0) {
            title = '取消咨询成功'
            showInvite = true
          } else {
            showInvite = false
            title = data.errmsg || '取消咨询失败'
          }
          new PNotify({
            title: "提示",
            text: title,
            type: "info",
            delay: 2000
          })
        })
      })

      // 咨询转移
      $('#inviteTransfer').on('click', function () {
        agentProxy.consultTransfer(function (data) {
          var title = ''
          if (data.retcode != 0) {
            title = data.errmsg || '咨询转移失败'
            new PNotify({
              title: "提示",
              text: title,
              type: "info",
              delay: 2000
            })
          }
        })
      })

      // 咨询会议
      $('#inviteMeet').on('click', function () {
        agentProxy.consultConference(function (data) {
          var title = ''
          if (data.retcode == 0) {
            title = '开启咨询会议成功'
          } else {
            title = data.errmsg || '开启咨询会议失败'
          }
          new PNotify({
            title: "提示",
            text: title,
            type: "info",
            delay: 2000
          })
        })
      })

      // 转接会话：实例化popover
      $("#passOver").popover({
        trigger: 'click',
        placement: 'bottom',
        html: 'true',
        delay: {'show': 300, 'hide': 100},
        template: '<div class="popover popover-pass" role="tooltip"><div class="arrow"></div><div class="popover-mask"></div><div class="popover-content" style="width:300px;"></div></div>',
        content: function () {
          return $(".pass-tpl").html();
        }
      });
      //转接-确认转接
      $('#passOver').on('shown.bs.popover', function () {
        $('#invite').attr('disabled', 'disabled')
				$("#passOver").attr("disabled","disabled");
				$("#ServiceLevel").attr("disabled","disabled");
				$("#Hook").attr("disabled","disabled");
        var target = "";

        agentProxy.getAllIdleExten({
          callback: function (agents) {
            var html = "";
            if (agents && agents.length > 0) {
              for(var i=0; i<agents.length; i++) {
                html += "<li class='list-item' data-param='" + agents[i].value + "'>" + agents[i].label + "</li>";
              }
            }
            $("#agentDiv").html(html);
          }
        });

        $("#agentDiv").on("click", "li", function () {
          target = $(this).data("param");
        });

        agentProxy.getAllSkill({
          url: cAddr,
          msgid: imcc_uuid(),
          ProxyName: 'ws_' + imcc_uuid(),
          callback: function (data) {
            if (data && data.retcode == 0 && data.skill && data.skill.length) {
              var code = ''
              for (var i = 0; i < data.skill.length; i++) {
                code += '<li class="list_li" title=' + data.skill[i].name + ' data-id=' + data.skill[i].id + '>' + data.skill[i].name +'</li>'
              }
              $('#skillList').html(code)
            }
          }
        })

        $('#skillList').on('click', 'li', function () {
          $(this).addClass('active').siblings().removeClass('active')
          target = $(this).data('id')
        })

        $("#passChatGo").on("click", function () {
          if ($("#inside").hasClass("active")) {
            if (target == "") {
              new PNotify({
                title: "提示",
                text: "请选择被转接的坐席",
                type: "info",
                delay: 2000
              });
              return;
            } else {
              agentProxy.transfer({
                target: target,
                type: 0,
                callback: function (res) {
                  if(res.retcode != 0) {
                    var text = "转接失败";
                    if(res.errmsg) text = text + "," + res.errmsg;
                    new PNotify({title: "提示", text: text, type: "fail", delay: 2000});
                  }
                }
              });
              target = "";
              $("#passOver").popover('hide');
            }
          }
          if ($('#skillside').hasClass('active')) {
            var phoneNum = document.getElementById("newAni").value;
            if (target == "") {
              new PNotify({
                title: "提示",
                text: "请选择被转接的人工服务类型",
                type: "info",
                delay: 2000
              });
              return;
            } else {
              // type, skillID
              agentProxy.satisfy({
                type: '3333333333333', 
                skillID: target + '',
                callback: function (res) {
                  if (res.retcode != 0) {
                    var text = "转接失败";
                    if(res.errmsg) text = text + "," + res.errmsg;
                    new PNotify({title: "提示", text: text, type: "fail", delay: 2000});
                  }
                }
              });
              target = "";
              $("#passOver").popover('hide');
            }
          }
          if ($("#outside").hasClass("active")) {
            var phoneNum = document.getElementById("newAni").value;
            //选择的是转接外线
            if (phoneNum == "") {
              new PNotify({
                title: "提示",
                text: "请输入被转接的外线号码",
                type: "info",
                delay: 2000
              });
              return;
            } else {
              //转接座席和转接外线号码其实用的是一个函数CmdTransferToAgent
              //只不过传递的参数不一样，转接外线的传递的参数，前面以$开头，这样就表示后面跟的是号码
              agentProxy.transfer({
                target: phoneNum,
                type: 1,
                callback: function (res) {
                  if(res.retcode != 0) {
                    var text = "转接失败";
                    if(res.errmsg) text = text + "," + res.errmsg;
                    new PNotify({title: "提示", text: text, type: "fail", delay: 2000});
                  }
                }
              });
              document.getElementById("newAni").value = "";
              $("#passOver").popover('hide');
            }
          }
        });
        //转接-取消
        $("#passChatCancel").on("click", function () {
          target = "";
          $('#passOver').popover("hide");
        })
      });
			$('#passOver').on('hidden.bs.popover', function() {
        $('#invite').removeAttr('disabled')
				$("#passOver").removeAttr("disabled");
		    $("#ServiceLevel").removeAttr("disabled");
		    $("#Hook").removeAttr("disabled");
			});

   // 点击来电提醒框跳转电话页面
    $("#call-in").on("click", function () {
        chooseFirstMenu("电话", true);
        $("#call-in").hide();
    });

   //点击来电提醒框关闭图标执行来电提醒框
     $("#call-hidden").on("click", function (e) { 
          e.stopPropagation();    
          $("#call-in").hide();
      });
      $("#ignore").on("click", function (e) {
          e.stopPropagation();     
          $("#call-in").hide();
      });
      window.callOut = function(phoneNum) {
        var nowState = $("#state").text();
        if(!phoneNum) {
          taskCanCall = 9999;
          new PNotify({title: '通知', text: '外拨失败，请输入电话号码！', type: 'fail', delay: 2000});
          return false;
        } else if(nowState != "示忙" && nowState != "在线") {
          taskCanCall = 9999;
          new PNotify({title: '通知', text: '当前电话状态('+nowState+")不可外拨，请稍后再试", type: 'fail', delay: 2000});
          return false;
        }

        taskCanCall = 1;
        $("#sendCall").hide();
        $("#overCall").show();
        var userInfo = JSON.parse(localStorage.getItem('managerINFO'));
        if(userInfo && userInfo['PHONE_NUM_MASK'] && userInfo['PHONE_NUM_MASK']=="1"){
           userTel=phoneNum.substr(0,phoneNum.length-8)+'****'+phoneNum.substr(-4);
          $("#txtAni").text(userTel);
        }else{
           $("#txtAni").text(phoneNum);
        };
        $("#state").text("外拨中");
        $('#callup').hide();
        $("#Hook").show();
        $("#Hook").addClass("icon-guaduan");
        $("#Hook").removeClass("icon-laidian");
        $('#callup').popover('hide');
        $('#invite').hide()
        $('#inviteTransfer').hide()
        $('#inviteMeet').hide()
        $('#cancelInvite').hide()
        $("#passOver").show();
        $("#Hold").show();
        $("#ServiceLevel").show();

           //获取cookie
           var userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
           var wctToken =localStorage.getItem("wctToken")
           //调用方法设置token
             $.ajax({
              url: '/ucc-api/v1/surveyPhone/getCallOpenCity?hosttel=' + userInfo.hostTel + '&token=' + wctToken + '&wct=1',
              type: "post",
              data:JSON.stringify({"phoneNumber":phoneNum,'imNumber':userInfo.hostPhone}),
              dataType: 'json',
              success: function (data) {
                phoneNum=''+phoneNum
                  // if(data.rstcode!=0&&phoneNum.indexOf(0)!=0){
                  //     phoneNum='0'+phoneNum;
                  // }
                  var city = userInfo.city || '深圳'
                  var ht = localStorage.getItem('managerINFO');
                  if (ht) {
                    ht = JSON.parse(ht)
                    if (!ht.PHONE_AUTO_ADD_PREFIX || (ht.PHONE_AUTO_ADD_PREFIX && ht.PHONE_AUTO_ADD_PREFIX == 2)) {
                      if(data.openCity) {
                        if (data.openCity.indexOf(city) === -1 && phoneNum.indexOf(1) == 0 && phoneNum.length === 11) {
                          phoneNum='0'+phoneNum;
                        }
                      }
                    }
                  }
                  // if(ht != 11450 && ht != 12033 && data.openCity!='广东深圳'&&phoneNum.indexOf(0)!=0){
                  //   phoneNum='0'+phoneNum;
                  // }
                  //拨号
                  agentProxy.callout({
                      target: phoneNum,
                      callback: function (res) {
                          document.cookie = "PHONE_CALL_OUT_TYPE=1;path=/;";
                          document.cookie = "PHONE_NUM=" + phoneNum + ";path=/;";
                          //common.jishi();
                          if (res.retcode > 0) {
                        	  new PNotify({
                                title: "电话外拨失败",
                                text: res.errmsg,
                                type: "error",
                                delay: 2000
                              });
                        	  $("#txtAni").text("");
                              $("#state").text("示忙");
                              $('#invite').hide()
                              $('#inviteTransfer').hide()
                              $('#inviteMeet').hide()
                              $('#cancelInvite').hide()
                              $("#passOver").hide();
                              $("#Hold").hide();
                              $("#ServiceLevel").hide();
                              $("#Hook").hide();
                              $("#callup").show();
                          }
                      }
                  });
              },
              error: function (data) {  }
          });
      };
      
      window.getState = function(tcId, callback) {
        taskCustomerId=tcId;
        callback(taskCanCall);
      };
      
      // 改变转接方式
      $("input:radio[name='extenPhone']").change(function (){ // 改变接听方式
    	  if($(this).val() == 1){ // 座机
    		  if(userInfo && userInfo.extension != null 
    				  && userInfo.extension.trim() != '') {
    			  agentProxy.changeExten(userInfo.extension);
        		  document.cookie = "EXTENSION="+userInfo.extension+";path=/";
        		  document.cookie = "LISTENTYPE=1"+";path=/";
    		  }
    	  }else if($(this).val() == 2){ // 手机号码
    		  if(userInfo && userInfo.mobileNo != null 
    				  && userInfo.mobileNo.trim() != '') {
    			  agentProxy.changeExten(userInfo.mobileNo);
        		  document.cookie = "EXTENSION="+userInfo.mobileNo+";path=/";
        		  document.cookie = "LISTENTYPE=2"+";path=/";
    		  }
    		  
    	  }
      });
    }

    if (userInfo && userInfo.servPhone == "Y") {
      $("#state").text("电话初始化中");
      var ctiScript = userInfo.ctiType == "2" ? "cxphone/AgentProxy" : "imccphone/AgentProxy";
      require([ctiScript], function (AgentProxy) {
        initPhone(AgentProxy);
        if(userInfo.ctiType == "2") {           //长鑫一体机不能转外线
          $("#outside").hide();
        }
      });
    }
    var managerINFO = localStorage.getItem('managerINFO') ? JSON.parse(localStorage.getItem('managerINFO')) : false
    if (!managerINFO || managerINFO.PHONE_OPEN_SEARCH != 1) {
      $('#invite').remove()
      $('#cancelInvite').remove()
      $('#inviteTransfer').remove()
      $('#inviteMeet').remove()
    }

  });
});
