(function ($) {
 "use strict";

/*--------------------------
preloader
---------------------------- */	
	
	$(window).on('load',function(){
		var pre_loader = $('#preloader')
	pre_loader.fadeOut('slow',function(){$(this).remove();});
	});	
    
    
/*---------------------
 TOP Menu Stick
--------------------- */
	
var windows = $(window);
var sticky = $('#sticker');

windows.on('scroll', function() {
    var scroll = windows.scrollTop();
    if (scroll < 300) {
        sticky.removeClass('stick');
    }else{
        sticky.addClass('stick');
    }
});
    
	
    var mean_menu = $('nav#dropdown');
    mean_menu.meanmenu();
    

    
/*--------------------------
 scrollUp
---------------------------- */
	
	$.scrollUp({
		scrollText: '<i class="flaticon-upload"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});
    
	
/*--------------------------
 collapse
---------------------------- */
	
	var panel_test = $('.panel-heading a');
	panel_test.on('click', function(){
		panel_test.removeClass('active');
		$(this).addClass('active');
	});
/*--------------------------
 Parallax
---------------------------- */	
    var parallaxeffect = $(window);
    parallaxeffect.stellar({
        responsive: true,
        positionProperty: 'position',
        horizontalScrolling: false
    });

/*--------------------------
 MagnificPopup
---------------------------- */	
	
    $('.video-play').magnificPopup({
        type: 'iframe'
    });
    
    
/*---------------------
 Brand carousel
---------------------*/
	
    var brand = $('.brand-carousel');
    brand.owlCarousel({
		loop:true,
		nav:false,
        margin:50,
		dots:true,
		autoplay:false,
		responsive:{
			0:{
				items:1
			},
			768:{
				items:4
			},
			1000:{
				items:6
			}
		}
	});





})(jQuery); 


/* Investment Calculator */

	function calculateProfit(){

		  let startingBal = parseInt($("#initial-balance").val()) || 0;
		  const expReturn = parseInt($("#expected-return").val())/100;
		  const monthlyDep = parseInt($("#monthly-deposit").val());
		  const duration = parseInt($("#duration").val());
		  const monthlyReturn = expReturn/12;
		  
		  if(!startingBal || !expReturn || !monthlyDep || !duration) {
		    return;
		  }
		  
		  // Create formatter for USD
		  const formatter = new Intl.NumberFormat('en-US', {
		  style: 'currency',
		  currency: 'INR',
		  minimumFractionDigits: 2
		  })

		  // Loop through items to update starting balance and build out table rows
		  for(let i = 1; i <= duration*12; i++) {
		    startingBal = (startingBal * (1 + monthlyReturn)) + monthlyDep;
		  }

		  $('#total').text(formatter.format(startingBal));
	}


/* Page Scroll */

$(document).ready(function() {
  $('a[rel="relativeanchor"]').click(function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
      return false;
  }); 
});