(function ($) {
  "use strict";

  function isFirefox() {
    return !!navigator.userAgent.match(/firefox/i)
  }

  var LOAD_ERR_MSG = "It looks like our signup form was blocked by an adblocker in your browser! Please email us directly or pause your adblocker to use the form.",
      LOAD_ERR_MSG_FFOX = "It looks like our signup form was blocked by Firefox! Please email us directly or try a different browser to use the form.";

  function isSubscriptionConfirmation(values) {
    var keys = ["Subscription_Enterprise_CD__c", "surveySTWhatwouldyouliketohearabout"];
    for (var i = 0, len = keys.length; i < len; ++i) {
      if (values[keys[i]]) return true;
    }
    return false;
  }

  function sanitize(str) {
    var a = document.createElement("a");
    a.textContent = str;
    return a.innerHTML;
  }

  function overlayMessage(values) {
    if (isSubscriptionConfirmation(values)) {
      return "<h3>Thank you for your interest!</h3>\n" +
             "<p>We've sent an email to " + sanitize(values.Email) + " about your GoCD email subscription. You must check this email to activate it.</p>\n" +
             "<p>At the same time, a member of our team will be in touch with you to talk about your GoCD enterprise needs soon.</p>";
    }

    return "<h3>You are almost in!</h3>\n" +
           "<p>We've sent an email to " + sanitize(values.Email) + ". You must check this email to activate your subscription.</p>";
  }

  function MarketoForm() {
    function displayOverlay(message) {
      var overlay = $(
        "<div class=\"overlay marketo-response\">" +
        "  <div class=\"popup\">" +
        "    <div class=\"close-button fa fa-times-circle-o\"/>" +
        "    <div class=\"thanks-msg\"/>" +
        "  </div>" +
        "</div>");
      overlay.find(".thanks-msg").html(message);
      $(document.body).append(overlay.show());

      setTimeout(function hideOverlay() {
        overlay.remove();
      }, 5000);
    }

    this.init = function init(id) {
      $('.close-button').click(function() {
        $('.overlay').remove();
      });

      try {
        MktoForms2.loadForm("//app-e.marketo.com", "199-QDE-291", parseInt(id, 10), function(form) {
          form.onSuccess(function(values, followUpUrl) {
            console.log(values);
            form.vals({Company: "", Country: "", Email: "", FirstName: "", LastName: "", "Title": "", "User_Comments__c": ""});
            form.submittable(true);
            $(form.getFormElem()).find("button[type='submit']").text("Submit").prop("disabled", false);
            displayOverlay(overlayMessage(values));
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
