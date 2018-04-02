$(function () {
  var nb = $('.navbtn');
  var n = $('.mainnav');

  $(window).on('resize', function () {

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

// Help signup

jQuery(document).ready(function ($) {

  $('.help_cta').click(function (event) {
    $('.signup').slideDown('fast');
  });
  $('.signup .close').click(function (event) {
    $('.signup').slideUp('fast');
  });
});

// getting started navigation mobile

jQuery(document).ready(function ($) {

  enquire.register("screen and (max-width: 995px)", {
    match: function () {
      $(".get-start-btn , .getting-started-nav h5 ").unbind('click').click(function () {
        $(".getting-started-nav").slideToggle();
      });

      $(".get-start-btn").addClass("fixed");
      
      $('nav.getting-started-nav ul.verticalnav > li.dropdown ul a').click(function (e) {
        e.preventDefault();
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
});

//why go-cd lightbox

$(document).ready(function () {
  $('.chocolat-parent').Chocolat();
});
