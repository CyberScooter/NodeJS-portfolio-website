var navbar = $(".navbar");
	
$(window).scroll(function(){
	if($(window).scrollTop() <= 40){
		navbar.removeClass('navbar-scroll');
	} else if($(window).scrollTop() > 40){
		navbar.addClass('navbar-scroll');
	} 
	
});
$(document).ready(function() {
  $('#comment_form').submit(function() {
	$(this).ajaxSubmit({
	  error: function(xhr) {
		status('Error: ' + xhr.status);
	  },
	 success: function(response) {
	  console.log(response);
	 }
	});
	//Very important line, it disable the page refresh.
	return false;
  });
});

