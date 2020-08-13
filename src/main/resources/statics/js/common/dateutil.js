// myDate.getYear();        //获取当前年份(2位)
//			 myDate.getFullYear();    //获取完整的年份(4位,1970-????)
//			 myDate.getMonth();       //获取当前月份(0-11,0代表1月)
//			 myDate.getDate();        //获取当前日(1-31)
//			 myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
//			 myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
//			 myDate.getHours();       //获取当前小时数(0-23)
//			 myDate.getMinutes();     //获取当前分钟数(0-59)
//			 myDate.getSeconds();     //获取当前秒数(0-59)
//			 myDate.getMilliseconds();    //获取当前毫秒数(0-999)
//			 myDate.toLocaleDateString();     //获取当前日期
//			 var mytime=myDate.toLocaleTimeString();     //获取当前时间
//			 myDate.toLocaleString( );        //获取日期与时间
 	

		/*ios 时间兼容性问题解决*/	
 		function getNewDate(date){
	 		var arr = date.split(/[- : \/]/);
	 		date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
	 		document.write(date);
	 		return date;
 		}

		//将字符串转换为js的时间对象，  字符串格式yyyy-MM-dd HH:ss:mm     
		function stringToJsTime(time) { 
			time = time +"";
		    var y = time.substring(0,4);     
		    var m = time.substring(6,8)-1;     
		    var d = time.substring(9,11);     
		    var h = time.substring(13,15);     
		    var mm = time.substring(17,19);     
		    var ss = time.substring(21,23);   
		    //new Date(y+"/"+);
		    var date = new Date(y,m,d,h,mm,ss,0);     
		    return date;     
		}  
		
		 //yyyy.MM.dd
		function getDate(date){
			
			var myDate = new Date(date);
			return myDate.getFullYear()+"."+ (myDate.getMonth()+1)+"."+myDate.getDate();
		}
		
		
		 function getDateTime(date,fomat){
			 
			 var myDate = new Date(date);
			
			 if(fomat=='yyyy-MM-dd HH:mm'){
				 return myDate.getFullYear()+"-"+ (myDate.getMonth()+1)+"-"+myDate.getDate()+" "
				 +myDate.getHours()+":"+ myDate.getMinutes();
			 }
			 if(fomat=='yyyy-MM-dd HH:mm:ss'){
				 var m = myDate.getMonth()+1;
				 if(m<10){
					 m='0'+m;
				 }
				 var d = myDate.getDate();
				 if(d<10){
					 d='0'+d;
				 }
				 var h = myDate.getHours();
				 if(h<10){
					 h='0'+h;
				 }
				 var ms = myDate.getMinutes();
				 if(ms<10){
					 ms='0'+ms;
				 }
				 var s = myDate.getSeconds();
				 if(s<10){
					 s='0'+s;
				 }
				 return myDate.getFullYear()+"-"+ m+"-"+d+" "
				 +h+":"+ ms+":"+s;
			 }
			 if(fomat=='mm-dd hh:mm'){
				 var m = myDate.getMonth()+1;
				 if(m<10){
					 m='0'+m;
				 }
				 var d = myDate.getDate();
				 if(d<10){
					 d='0'+d;
				 }
				 var h = myDate.getHours();
				 if(h<10){
					 h='0'+h;
				 }
				 var ms = myDate.getMinutes();
				 if(ms<10){
					 ms='0'+ms;
				 }
				 return m+"-"+d+" "+h+":"+ms;
			 }
			 if(fomat=='h：m：s'){
				 return myDate.getHours()+":"+ myDate.getMinutes()+":"+myDate.getMilliseconds();
			 }
			  if(fomat=='yyyy_MM_dd'){
                 return myDate.getFullYear()+"年"+ (myDate.getMonth()+1)+"月"+myDate.getDate()+"日";
             }
			 if(fomat=='mm-dd hh:mm:ss'){
				 return  (myDate.getMonth()+1) +"月"+ myDate.getDate()+"日 "+ myDate.getHours()+""+ myDate.getMinutes()+":"+myDate.getMilliseconds();
			 }
			 return (myDate.getMonth()+1) +"-"+ myDate.getDate()+" "+ myDate.getHours()+""+ myDate.getMinutes()+":"+myDate.getMilliseconds();
	     }
		 