(function ($) {
  "use strict";

  function MarketoForm() {
    var displayOverlay = function() {
      $('.overlay').show();

      setTimeout(function() {
        $('.overlay').hide();
      }, 5000);
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
        $('.form-loading-error').show();
      }
    };
  }

  window.MarketoForm = MarketoForm;
})(jQuery);
