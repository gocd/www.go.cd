(function ($, dc) {
  "use strict";

  $(function gdprBanner() {
    if (!dc.hasItem("gdpr-accept")) {
      var gdpr = $("<div class='gdpr-cookie-banner'>").on("click", ".gdpr-close", function(e) {
        dc.setItem("gdpr-accept", "yes");
        $(document.body).removeClass("with-gdpr");
        gdpr.remove();
      }).append("<i class='gdpr-close fa fa-close'/>").
        append("<p>Our site uses <a href='https://www.thoughtworks.com/privacy-policy#cookie-section' target='_blank'>cookies</a> for analytics. If you're unsure about it, take a look at our <a href='https://www.thoughtworks.com/privacy-policy' target='_blank'>privacy policy</a>.</p>");

      $(document.body).addClass("with-gdpr").find("header").append(gdpr);
      dc.setItem("gdpr-accept", "yes");
    }
  });

})(jQuery, docCookies);
