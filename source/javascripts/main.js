$(function(){
              var nb = $('.navbtn');
              var n = $('.mainnav');
              
              $(window).on('resize', function(){
                
                if($(this).width() < 570 && n.hasClass('keep-nav-closed')) {
                  // if the nav menu and nav button are both visible,
                  // then the responsive nav transitioned from open to non-responsive, then back again.
                  // re-hide the nav menu and remove the hidden class
                  $('.mainnav').hide().removeAttr('class');
                }
                if(nb.is(':hidden') && n.is(':hidden') && $(window).width() > 569) {
                  // if the navigation menu and nav button are both hidden,
                  // then the responsive nav is closed and the window resized larger than 560px.
                  // just display the nav menu which will auto-hide at <560px width.
                  $('.mainnav').show().addClass('keep-nav-closed');
                }
              }); 
              
              // $('.mainnav a,.top a,#btmnav nav a').on('click', function(e){
              //   e.preventDefault(); // stop all hash(#) anchor links from loading
              // });
              
              $('.navbtn').on('click', function(e){
                e.preventDefault();
                $(".mainnav").toggleClass('open');
              });
              

              $('.menu').click(function(){
			  $(this).toggleClass('open');
			  $('.slidenav').toggleClass('open')
			  $('body').toggleClass('nav-open')
			})

// fixed header

  $(window).scroll(function () {
       var sc = $(window).scrollTop()
      if (sc > 1) {
          $(".top").addClass("scroll-on")
      } else {
          $(".top").removeClass("scroll-on")
      }
  });

// $(window).scroll(function () {
//        var sc = $(window).scrollTop()
//       if (sc > 100) {
//           $(".getting-started-nav").addClass("fixed")
//       } else {
//           $(".getting-started-nav").removeClass("fixed")
          
//       }
//   });



});





//horizontal tabs

jQuery(document).ready(function($) {

    $(".tab_content").hide();
 $(".tab_content:first").show();

//tab mode

    $("ul.tabs li").click(function() {
		
      $(".tab_content").hide();
      var activeTab = $(this).attr("rel"); 
      $("#"+activeTab).fadeIn();		
      $("ul.tabs li").removeClass("active");
      $(this).addClass("active");

      $(".tab-accordion_heading").removeClass("d_active");
      $(".tab-accordion_heading[rel^='"+activeTab+"']").addClass("d_active");
      
      
 		  target= $('.tabs');
         $('html,body').animate({
           scrollTop: target.offset().top + -100
         }, 1000);
	  
    });

	/* acoordion mode */

	$(".tab-accordion_heading").click(function() {
      
      $(".tab_content").hide();
      var d_activeTab = $(this).attr("rel"); 
      $("#"+d_activeTab).fadeIn();
    
	   $(".tab-accordion_heading").removeClass("d_active");
      $(this).addClass("d_active");
	  
      $("ul.tabs li").removeClass("active");
      $("ul.tabs li[rel^='"+d_activeTab+"']").addClass("active");
       
    // if ( $( this ).hasClass( "d_active" ) ) {
    //          $(this).removeClass("d_active");
    //          $("#"+d_activeTab).fadeIn();
    // }
      target= $('.all-plugins');
         $('html,body').animate({
           scrollTop: target.offset().top + -100
         }, 1000);
    

    });
	
});


jQuery(document).ready(function($) {
  
  $('.help_cta').click(function(event) {
    $('.signup').slideDown('fast');
  });
  $('.signup .close').click(function(event) {
    $('.signup').slideUp('fast');
  });


});

//getting started sidebar
  $(document).ready(function() {
    $('.verticalnav > li.dropdown-menu > a').click(function(e){
      e.preventDefault();
      $(this).parent().toggleClass('open')
    // $(this).siblings().toggle();
  });
      });

// smooth scroll on getting started page

jQuery(document).ready(function($) {
var $root = $('html, body');
$('a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top - 100
    }, 500, function () {
        window.location.hash = href;
    });
    return false;
});
});

jQuery(document).ready(function($) {
  
// var hash = window.location.hash;

        // this will get the full URL at the address bar
        var url = window.location.href;

        // passes on every "a" tag
        $(".verticalnav a").each(function() {
            // checks if its the same on the address bar
            if (url == (this.href)) {
                $(this).closest("li").addClass("active");
            }
        });



});