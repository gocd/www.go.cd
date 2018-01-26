(function () {
  var MarketoForm = function() {
    var displayOverlay = function() {
      $('.overlay').show();

      setTimeout(function() {
        $('.overlay').hide();
      }, 5000);
    };



    var init = function() {
      $('.close-button').click(function() {
        $('.overlay').hide();
      });

      try {
        MktoForms2.loadForm("//app-e.marketo.com", "199-QDE-291", 7582, function(form) {
          form.onSuccess(function(values, followUpUrl) {
            form.vals({Company: "", Country: "", Email: "", FirstName: "", LastName: "", "Title": "", "User_Comments__c": ""});
            form.submittable(true);
            $(form.getFormElem()).find("button[type='submit']").text("Submit").prop("disabled", false);
            displayOverlay();
            return false;
          });
        });
      } catch(e) {
        $('.form-loading-error').css('display','inline-block').css('color','#E74C3C').css('padding','.5em').css('border','2px solid #E74C3C');
      }
    };

    return {
      init: init
    };
  };

  MarketoForm().init();
}());
