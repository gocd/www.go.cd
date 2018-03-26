jQuery(document).ready(function($) {
  var highlightCorrectNavigationSectionBasedOnLocation = function() {
    $('nav.getting-started-nav a').removeClass('active');
    $("nav.getting-started-nav a[data-section='" + window.location.hash + "']").addClass('active');
  };

  var hightlightCorrectNavigationSectionBasedOnScroll = function(){
    var $sections = $('section');
    $(window).scroll(function(){
      var currentScroll = $(this).scrollTop();
      var $currentSection;
    $sections.each(function(){
      var divPosition = $(this).offset().top - 130;
      if( divPosition - 1 < currentScroll ){
        var $currentSection = $(this);
      }
      if($currentSection !== undefined){
        var id = $currentSection.attr('id');
   	    $('a').removeClass('active');
        $('[data-section="#'+id+'"]').addClass('active');
      }
    });

  });
  }

  var smoothScrollTo = function(sectionId) {
    $('html, body').animate({
      scrollTop: $(sectionId).offset().top - 200
    }, 1000, 'swing', function() {
      window.location.hash = sectionId;
      highlightCorrectNavigationSectionBasedOnLocation();
    });
  };

  var setupSidebar = function() {
    $('nav.getting-started-nav ul.verticalnav > li.dropdown > a').click(function(e){
      e.preventDefault();
      var isOpen = $(this).parent().hasClass('open');
      $('nav.getting-started-nav ul.verticalnav > li.dropdown > ul').hide();
      $('nav.getting-started-nav ul.verticalnav > li.dropdown').removeClass('open');
      if(!isOpen) {
        $(this).parent().addClass('open');
        $(this).parent().find('ul').show();  
      }
    });
  };

  var stickySidebar = function() {
    $('nav.getting-started-nav').affix({
      offset: {
        top: function() {
          return (this.top = $('header').outerHeight(true))
        },
        bottom: function () {
          return (this.bottom = $('footer').outerHeight(true))
        }
      }
    });
  };

  var setupSmoothScrollForSamePageLinks = function() {
    $("body").on("click", "a[href^='#'][href!='#'], a[data-dest]", function(evt) {
      var currentPage = window.location.pathname.replace(/\/$/, '');
      var section = $(this).data('section') || $.attr(this, 'href');
      var dest = $(this).data('dest') || currentPage;
      var targetIsInSamePage = $(this).data('is-local') === true;

      if (targetIsInSamePage) {
        smoothScrollTo(section);
      } else {
        window.location.href = dest + section;
      }
      evt.preventDefault();
    });
  };

  setupSidebar();
  setupSmoothScrollForSamePageLinks();
  highlightCorrectNavigationSectionBasedOnLocation();
  hightlightCorrectNavigationSectionBasedOnScroll();

  enquire.register("screen and (min-width: 992px) and (min-height: 600px)", {
    match : function() {
      stickySidebar();
    },  

  });
});
