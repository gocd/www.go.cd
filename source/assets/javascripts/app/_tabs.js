var startTabContainer = (function ($) {
  return function () {
    $(".tab_content").hide();
    $(".tab_content:first").show();
    $(".tab-container-marker .tab-marker:first").addClass("active").addClass("d_active");

    $("body").on('click', '.tab-container-marker .tab-marker', function () {
      switchActiveTab($(this).attr('rel'));
    });

    if (window.location.hash) {
      switchActiveTab(window.location.hash.substring(1).replace(/\./g, '-'));
    }
  };
})(jQuery);

var switchActiveTab = function (tabIdentifier) {
  $(".tab_content").hide();
  $(".tab_content#" + tabIdentifier).fadeIn();

  $(".tab-container-marker .tab-marker").removeClass("active").removeClass("d_active");
  $(".tab-container-marker .tab-marker[rel='" + tabIdentifier + "']").addClass("active").addClass("d_active");
};