jQuery(document).ready(function($) {
  var highlightCorrectNavigationSectionBasedOnLocation = function() {
    $('nav.getting-started-nav a').removeClass('active');
    $("nav.getting-started-nav a[data-section='" + window.location.hash + "']").addClass('active');
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
      var parent = $(this).parent();
      var isOpen = parent.hasClass('open');

      $(this).next('ul').hide();
      parent.removeClass('open');
      if(!isOpen) {
        parent.addClass('open');
        parent.find('ul').show();
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
    $("body.getting-started").on("click", "a[href^='#'][href!='#'], a[data-dest]", function(evt) {
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

  enquire.register("screen and (min-width: 992px) and (min-height: 600px)", {
    match : function() {
      stickySidebar();
    },  

  });
});
