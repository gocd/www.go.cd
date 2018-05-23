(function ($) {
  "use strict";

  var LOAD_ERR_MSG = "It looks like our signup form was blocked by an adblocker in your browser! Please email us directly or pause your adblocker to use the form.",
      LOAD_ERR_MSG_FFOX = "It looks like our signup form was blocked by Firefox! Please email us directly or try a different browser to use the form.",

      CONTACT_FORM_SUBSCR_FIELD = "Subscription_Enterprise_CD__c",
      SUBSCR_FORM_SUSCR_FIELD = "surveySTWhatwouldyouliketohearabout";

  function MarketoForm() {
    function displayOverlay(message) {
      var timer;
      var overlay = $(
        "<div class=\"overlay marketo-response\">" +
        "  <div class=\"popup\">" +
        "    <div class=\"close-button fa fa-times-circle-o\"/>" +
        "    <div class=\"thanks-msg\"/>" +
        "  </div>" +
        "</div>");

      function hideOverlay() {
        if ("number" === typeof timer) clearTimeout(timer);
        overlay.fadeOut("fast", function then(e) { overlay.remove(); });
      }

      overlay.on("click", ".close-button", hideOverlay).find(".thanks-msg").html(message);
      $(document.body).append(overlay);

      timer = setTimeout(hideOverlay, 5000);
    }

    this.init = function init(id) {
      $('.close-button').click(function() {
        $('.overlay').remove();
      });

      try {
        MktoForms2.loadForm("//app-e.marketo.com", "199-QDE-291", parseInt(id, 10), function(form) {
          form.onSuccess(function(values, followUpUrl) {
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

  function overlayMessage(values) {
    var keys = [CONTACT_FORM_SUBSCR_FIELD, SUBSCR_FORM_SUSCR_FIELD];
    var isContactForm = false, subscribed = false;

    for (var i = 0, len = keys.length; i < len; ++i) {
      if (CONTACT_FORM_SUBSCR_FIELD in values) {
        isContactForm = true;
      }

      if (values[keys[i]]) {
        subscribed = true;
        break;
      }
    }

    if (isContactForm) {
      if (subscribed) {
        return "<h3>Thank you for your interest!</h3>\n" +
               "<p>We've sent an email to " + sanitize(values.Email) + " about your GoCD email subscription. You must check this email to activate it.</p>\n" +
               "<p>At the same time, a member of our team will be in touch with you to talk about your GoCD enterprise needs soon.</p>";
      } else {
        return "<h3>Thank you for your interest!</h3>\n" +
               "<p>A member of our team will be in touch with you to talk about your GoCD enterprise needs soon.</p>";
      }
    } else {
      return "<h3>You are almost in!</h3>\n" +
             "<p>We've sent an email to " + sanitize(values.Email) + ". You must check this email to activate your subscription.</p>";
    }
  }

  function isFirefox() {
    return !!navigator.userAgent.match(/firefox/i)
  }

  function sanitize(str) {
    var a = document.createElement("a");
    a.textContent = str;
    return a.innerHTML;
  }

  window.MarketoForm = MarketoForm;
})(jQuery);
