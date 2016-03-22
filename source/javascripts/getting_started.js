jQuery(document).ready(function($) {
  var highlightCorrectNavigationSectionBasedOnLocation = function() {
    $('nav.getting-started-nav a').removeClass('active');
    $("nav.getting-started-nav a[href='" + window.location.hash + "']").addClass('active');
  };

  var smoothScrollTo = function(sectionId) {
    $('html, body').animate({
      scrollTop: $(sectionId).offset().top - 100
    }, 500, function() {
      window.location.hash = sectionId;
      highlightCorrectNavigationSectionBasedOnLocation();
    });
  };

  var setupSidebar = function() {
    $('nav.getting-started-nav ul.verticalnav > li.dropdown > a').click(function(e){
      e.preventDefault();
      $('nav.getting-started-nav ul.verticalnav > li.dropdown > ul').hide();
      $('nav.getting-started-nav ul.verticalnav > li.dropdown').removeClass('open');
      $(this).parent().addClass('open');
      $(this).parent().find('ul').show();
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
    $("body").on("click", "a[href^='#'][href!='#'], a[data-dest]", function() {
      var currentPage = window.location.pathname.replace(/\/$/, '');
      var section = $.attr(this, 'href');
      var dest = $(this).data('dest') || currentPage;
      var targetIsInSamePage = (dest === currentPage);

      if (targetIsInSamePage) {
        smoothScrollTo(section);
      } else {
        window.location.href = dest + section;
      }
    });
  };

  setupSidebar();
  setupSmoothScrollForSamePageLinks();
  highlightCorrectNavigationSectionBasedOnLocation();

  enquire.register("screen and (min-width: 992px)", {
    match : function() {
      stickySidebar();
    },  

  });
});
