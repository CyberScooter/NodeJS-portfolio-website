var navbar = $(".navbar");
	
$(window).scroll(function(){
	if($(window).scrollTop() <= 40){
		navbar.removeClass('navbar-scroll');
	} else if($(window).scrollTop() > 40){
		navbar.addClass('navbar-scroll');
	} 
	
});



