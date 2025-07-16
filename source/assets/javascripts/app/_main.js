$(function () {
  var nb = $('.navbtn');
  var n = $('.mainnav');

  var footer = document.querySelector("footer");

  function accommodateFooter() {
    $(document.body).css("padding-bottom", footer.getBoundingClientRect().height + "px");
  }

  accommodateFooter();

  $(window).on('resize', function () {

    accommodateFooter();

    if ($(this).width() < 570 && n.hasClass('keep-nav-closed')) {
      // if the nav menu and nav button are both visible,
      // then the responsive nav transitioned from open to non-responsive, then back again.
      // re-hide the nav menu and remove the hidden class
      $('.mainnav').hide().removeAttr('class');
    }
    if (nb.is(':hidden') && n.is(':hidden') && $(window).width() > 569) {
      // if the navigation menu and nav button are both hidden,
      // then the responsive nav is closed and the window resized larger than 560px.
      // just display the nav menu which will auto-hide at <560px width.
      $('.mainnav').show().addClass('keep-nav-closed');
    }
  });

  $('.navbtn').on('click', function (e) {
    e.preventDefault();
    $(".mainnav").toggleClass('open');
  });
  
  $('.menu').click(function () {
    $(this).toggleClass('open');
    $('.slidenav').toggleClass('open');
    $('body').toggleClass('nav-open')
  });

});

// getting started navigation mobile

jQuery(document).ready(function ($) {

  enquire.register("screen and (max-width: 992px)", {
    match: function () {
      $(".get-start-btn , .getting-started-nav h5 ").click(function () {
        $(".getting-started-nav").slideToggle();
      });
      $(window).scroll(function () {
        var sc = $(window).scrollTop();
        if (sc > 58) {
          $(".get-start-btn").addClass("fixed")
        } else {
          $(".get-start-btn").removeClass("fixed")
        }
      });

      $('nav.getting-started-nav ul.verticalnav > li.dropdown ul a').click(function (e) {
        e.preventDefault();
        $(".get-start-btn").removeClass("fixed");
        $(".getting-started-nav").slideToggle();
      });
    },
    unmatch: function () {
      // Hide the sidebar
    }
  });
});

// back to top

$(document).ready(function () {

  // hide #back-top first
  $(".back-top").hide();
  // fade in #back-top
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.back-top').fadeIn();
      } else {
        $('.back-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('.back-top').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  });
});

//downloads  show hide old releases

jQuery(document).ready(function ($) {

  $(document).on('click', '.btn-release', function () {
    $(this).closest('.tab_content').find('.old-release').slideToggle('fast');
    $(this).text(function (i, text) {
      return text === "Show old releases" ? "Hide old releases" : "Show old releases";
    });
  });

  $(document).on('click', '.close-message, .verify-checksum-message', function (e) {
    if (e.target !== this)
      return;
    $('.verify-checksum-message').hide();
    $('body').removeClass("o-h");
  });

  //image zoom popup

  $(".imagezoom").click(function (evt) {
    var src = $(evt.currentTarget).children('img').attr('src');
    var imagecontent = $(".imagemodalcontent");
    imagecontent.html("<img src='" + src + "' alt='fuller image' />")
    $(".imagemodal").show();
    imagecontent.scrollTop(0).scrollLeft(0);
  });
  $(".imagemodal .close").click(function () {
    $(".imagemodal").hide();
  });

  // Add smooth scrolling to analytics CTA and support page CTA
  $(".cta-analytics, .support-banner-cta").on('click', function(event) {
    var clickedElement = $(this);
    var anchorOfTargetElement = clickedElement.data('link-target');
    var offsetToUseForScrolling = parseInt(clickedElement.data('link-target-offset') || "0");

    if (typeof anchorOfTargetElement === "undefined") {
      return;
    }

    $('html, body').animate({
      scrollTop: $(anchorOfTargetElement).offset().top + offsetToUseForScrolling
    }, 800, function() {
      history.replaceState(null, null, anchorOfTargetElement);
    });

    event.preventDefault();
  });

  //why go-cd lightbox
  $('.chocolat-parent').Chocolat();

  $(document).ready(function () {
    var redirected = window.location.search.match(/(?:\?|&)redirected=([^&]+)(?:&|$)/);

    if (redirected !== null && redirected[1] === "true") {
     $('.redirect-notice').show();
    }
  });
});
