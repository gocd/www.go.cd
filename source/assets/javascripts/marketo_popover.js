(function ($) {
  "use strict";

  function isFirefox() {
    return !!navigator.userAgent.match(/(mozilla|gecko|firefox)/i)
  }

  var LOAD_ERR_MSG = "It looks like our signup form was blocked by an adblocker in your browser! Please email us directly or pause your adblocker to use the form.",
      LOAD_ERR_MSG_FFOX = "It looks like our signup form was blocked by Firefox! Please email us directly or try a different broswer to use the form.";

  function MarketoForm() {
    function displayOverlay() {
      $('.overlay').show();

      setTimeout(function hideOverlay() {
        $('.overlay').hide();
      }, 5000);
    }

    this.mailToFallback = function mailToFallback(id) {
      try {
        MktoForms2.loadForm("//app-e.marketo.com", "199-QDE-291", parseInt(id, 10));
        $("#backup-subscription-message").remove();
      } catch(e) {
        if (console && "function" === console.warn) {
          console.warn("Failed to load Marketo form; reason:", e);
        }
      }
    };

    this.init = function init(id) {
      $('.close-button').click(function() {
        $('.overlay').hide();
      });

      try {
        MktoForms2.loadForm("//app-e.marketo.com", "199-QDE-291", parseInt(id, 10), function(form) {
          form.onSuccess(function(values, followUpUrl) {
            form.vals({Company: "", Country: "", Email: "", FirstName: "", LastName: "", "Title": "", "User_Comments__c": ""});
            form.submittable(true);
            $(form.getFormElem()).find("button[type='submit']").text("Submit").prop("disabled", false);
            displayOverlay();
            return false;
          });
        });
      } catch(e) {
        $('.form-loading-error').text(isFirefox() ? LOAD_ERR_MSG_FFOX : LOAD_ERR_MSG).show();
      }
    };
  }

  window.MarketoForm = MarketoForm;
})(jQuery);
