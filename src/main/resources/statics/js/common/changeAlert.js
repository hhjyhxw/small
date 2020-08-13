function openAlert(tex){
    $('.modal-alert').find('p').text(tex);
    $('.modal-alert').fadeIn();
}

function closeAlert(){
  $('.modal-alert').hide();
}
    

    function openAlert2(){
    	 $('#opened2').css("display","block");
    }
    function closeAlert2(){
//      $('.modal-alert').hide();
       $('#opened2').css("display","none");
     }
    
