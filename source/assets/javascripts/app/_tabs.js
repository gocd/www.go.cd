//horizontal tabs
var startTabContainer = function ($, packageName) {
  var package_to_rel = {
    "debian": "tab-debian",
    'redhat': 'tab-redhat',
    "windows": "tab-windows",
    'zip': 'tab-zip',
    'osx': 'tab-osx'
  };

  var package_to_os = {
    "debian": "deb",
    'redhat': 'rpm',
    "windows": "win",
    'zip': 'generic',
    'osx': 'osx'
  };

  $(".tab_content").hide();
  $(".tab_content:first").show();
  $("ul.tabs li:first").addClass("active");
  $("span[rel=\"" + package_to_rel[packageName] + "\"]").addClass("active");
  $(".tab-accordion_heading[rel^='" + package_to_os[packageName] + "']").addClass("d_active");
  chooseTabContainer($);
};

var switchActiveTab = function (newElementWhichShouldBeActive, selectorForAllElementsOfThisType, selectorForOtherKindOfTab) {
  $(".tab_content").hide();
  var activeTab = $(newElementWhichShouldBeActive).attr("rel");
  $("#" + activeTab).fadeIn();

  $(selectorForAllElementsOfThisType).removeClass("active");
  $(newElementWhichShouldBeActive).addClass("active");

  $(selectorForOtherKindOfTab).removeClass("d_active");
  $(selectorForOtherKindOfTab + "[rel^='" + activeTab + "']").addClass("d_active");
};

var chooseTabContainer = function ($) {
  $("ul.tabs li").click(function () {
    switchActiveTab(this, "ul.tabs li", ".tab-accordion_heading");
  });

  $(".tab-accordion_heading").click(function () {
    switchActiveTab(this, ".tab-accordion_heading", "ul.tabs li");
  });

  if (window.location.hash) {
    release = window.location.hash.substring(1).replace(/\./g, '-');
    $('[rel=' + release + ']').click();
  }
};
