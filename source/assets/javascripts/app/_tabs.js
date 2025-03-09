/*
 Expects something like the snippet below. Only the class names and IDs are important. Not the tags. Also, the tab
 ID should start with "tab-" (assumption):

 <ul class="tab-container-marker">
   <li><span class="tab-marker" rel="tab-id-1">Tab 1</li>
   <li><span class="tab-marker" rel="tab-id-2">Tab 2</li>
 </ul>

 <div>
   <div id="tab-id-1" class="tab_content">
   </div>
   <div id="tab-id-2" class="tab_content">
   </div>
 </div>
 */

var startTabContainer = (function ($) {
  return function () {
    $(".tab_content").hide();
    $(".tab_content:first").show();
    $(".tab-container-marker .tab-marker:first").addClass("active").addClass("d_active");

    $("body").on('click', '.tab-container-marker .tab-marker', function () {
      switchActiveTab($(this).attr('rel').replace(/^tab-/, ''));
    });

    if (window.location.hash) {
      switchActiveTab(window.location.hash.substring(1).replace(/\./g, '-'));
    }
  };
})(jQuery);

var switchActiveTab = function (tabIdentifier) {
  var newTabContent = $(".tab_content#tab-" + tabIdentifier);
  if (newTabContent.size() === 0) {
    return;
  }

  $(".tab_content").hide();
  newTabContent.fadeIn();

  $(".tab-container-marker .tab-marker").removeClass("active").removeClass("d_active");
  $(".tab-container-marker .tab-marker[rel='tab-" + tabIdentifier + "']").addClass("active").addClass("d_active");

  window.location.hash = tabIdentifier;
};