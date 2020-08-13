String.prototype.trim = function(){
  //var reExtraSpace = /^\s+(.*?)\s+$/;
  //return this.replace(reExtraSpace, '$1');
	return this.replace(/^\s\s*/,'').replace(/\s*\s$/,'');
};

function isBlank(str){
	return (str.replace(/\s*/,"").length===0);
}

function isZeroOrNull(str){
   return (!str||str=='0'||str.replace(/\s*/,"").length===0);
}

function isNotMax(id, maxNum){
   var field = document.getElementById(id);
   if(!validateStrLen(field.value,maxNum)){
      var v = getChineseCharCount(field.value); 
      field.value= field.value.substr(0,(maxNum+field.value.length-v)/2);
    }
}

function isNotMax1(object, maxNum){
   
   var field = object.value;
   
   if(!validateStrLen(field,maxNum)){
      var v = getChineseCharCount(field); 
      
      object.value= field.substr(0,(maxNum+field.length-v)/2);
    }
}

function IgnoreHZ(id,oEvent){
   //针对输入中文，最后按空格将汉字输出到文本的情况（e.g google拼音）。
   if(oEvent.keyCode != 32 ){return;}
   
   var field = document.getElementById(id);
  
   var arrays = field.value.split("");
   var myArray = new Array();
   var x = -1, y=0;
   for(var j = 0 ;j < arrays.length; j++){
     var c = arrays[j];
     var ts = escape(c);
   	 if(ts.substring(0,2) != "%u"){
		myArray = myArray.concat(c);
	 }else if(y==0){
	    y=1;
	    x=j;
	 }
   }
   if(x>-1){
     field.value = myArray.join("");
     var e = oEvent.srcElement;
     var r = e.createTextRange();
     r.moveStart("character",x);
     r.collapse(true);
     r.select();
   }
   
}

function test(){
   alert("test");
}

function getChineseCharCount(v) {
	try {
		return v.match(/[\u4e00-\u9fa5]/g).length;
	}
	catch (e) {
		return 0;
	}
}

function validateStrLen(str, myCount){
	if(str.length+getChineseCharCount(str) > myCount){
		return false;
	}
	return true;
}

function validateEnglishStr(str){
	if(getChineseCharCount(str) > 0) {return false;}
	return true;
}

function validateEngStrLen(str, myCount){
    
	if(!validateEnglishStr(str)) {return false;}
	if(str.length > myCount) {return false;}
	
	return true;
}

function isBlankForSubmit(str,info){
    if(isBlank(str)){
      alert(info);
      return false;
    }
    return true;
}
function isZeroOrNullForSubmit(str, info){
	if(isZeroOrNull(str)) {
	  alert(info);
	  return false;
	}
	return true;
}


function validateEngStrLenForSubmit(str, info, myCount){
    
    if(myCount){
       
       if(!validateEngStrLen(str, myCount)){
       		alert(info);
       		return false;
       }
    }else{
      if(!validateEnglishStr(str)){
		 alert(info);
		 return false;
	  }
    }
	return true;
}

function validateStrLenForSubmit(str, myCount, info){
	if(!validateStrLen(str,myCount)){
		alert(info)
		return false;
	}
	return true;
}

function validateEnglishStrForFormItem(str, span, info ){
   if(!validateEnglishStr(str)){
      document.getElementById(span).innerText = info;
   }
   else{
	  document.getElementById(span).innerText = "";   
   }
}

function validatePlusNumber(value, myNumber){
	if(!(/^\s*[0-9]*[1-9][0-9]*\s*$/.test(value))){
    	return false;
    }
    if(myNumber && val > myNumber){
    	return false;
    }
    return true;
}

function validatePlusNumberForSubmit(value, info, myNumber){
	if(!validatePlusNumber(value, myNumber)){
		alert(info);
		return false;
	}
	return true;
}

function validatePhoneNumber(value){
   if(!(/(\d{3,4}-)?\d{8}/.test(value))){
     return false;
   }
   return true;
}

function validatePhoneNumberForSubmit(value, info){
   if(!validatePhoneNumber(value.trim())){
     alert(info);
     return false;
   }else{
     return true;
   }
}


//只能是数字
function onlyInteger(obj)
{
  obj.value = obj.value.replace(/[^\d]/g, "");
}


/************************************
 * 限制文本框长度
 ***********************************/
function limitLength(obj,lengthLimit) 
    {  
      var byteLength = 0;   
      var strInput = document.getElementById(obj).value; 
      
      for(var i=0;i<strInput.length;i++) 
      {  
          var ch = strInput.charAt(i);  
          if(isNormalChar(ch))  
              byteLength += 1;  
          else  
              byteLength += 2;       
      }  
      
      if(byteLength<lengthLimit) 
      { 
      document.getElementById(obj).maxLength = lengthLimit; 
      } 
      if(byteLength>=lengthLimit) 
      { 
      var str = document.getElementById(obj).value; 
      var byteLength2 = 0; 
      var temp = ""; 
      for(var j=0;j<str.length;j++) 
      {  
          var t = str.charAt(j);  
          if(isNormalChar(t))  
              byteLength2 += 1;  
          else  
              byteLength2 += 2; 
          if(byteLength2>lengthLimit) 
          { 
            break; 
          } 
          temp = temp+t;        
      }  
      
     document.getElementById(obj).maxLength = temp.length; 
     document.getElementById(obj).value=temp; 
      }   
  } 
  
   //内部函数 
  function isNormalChar(ch)  
  {  
      if(ch.length>1){  
           return false;  
      }  
      if(ch == ""){  
           return true;  
      }  

      var pattern = /^([\\uFF66-\\uFF9F]|[\\u0000-\\u00FF])*$/gi;  
      if (pattern.test(ch)){  
           return true;  
      }else{  
           return false;  
      }  
  } 
  
  function getAllownStr(str, maxLength) //获取允许字节长度的字符串
{
	var len = 0;
	var allowNum=0;
	var isCH = false;   //判断字符是否中文,影响截取长度
	for (var i=0;i<str.length;i++){
		if (str.charCodeAt(i)<0 || str.charCodeAt(i)>255) {
			len+=2; isCH = true;
		}else{
			len++;  isCH = false;
		}
		if(len >= maxLength){
			if(isCH)
				allowNum = i;
			else
				allowNum = i+1;
			break;
		}
	}
	return str.substring(0,allowNum);
}
function check_str_num(obj, maxLength, objId)  //改变备注字节数
{
	var i = strlen(obj.value);   
	var j = 1000-i;   
	if(j<0){
		j=0;
		obj.value=getAllownStr(obj.value,maxLength);
	}   
	document.getElementById(objId).innerHTML=j; 
}
//验证邮箱
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
//验证座机
function validatePhone(phone) { 
    var re = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return re.test(phone);
}

//验证手机号
function validateMobile(value) {
	//var pattern = /^(13[0-9]|15[0|3|6|7|8|9]|18[0|1|8|9])\d{8}$/;
	var pattern = /^(1)\d{10}$/;
	if (pattern.test(value))
		return true;
	else 
		return false;
}
