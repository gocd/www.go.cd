// help landing page
jQuery(document).ready(function($) {
    var showForm = function() {
        $("#signup_header").show();
        $("#support_form").show();

        $(".signupnow").hide();
        $("#support_form_submit_success").hide();
        $("#support_form_submit_failure").hide();

        $(".signup").slideDown();
    };

    var hideForm = function() {
        $(".signup").hide();
        $(".signupnow").show();
    };

    var showSuccessMessage = function() {
        $("#signup_header").hide();
        $("#support_form").hide();
        $("#support_form_submit_success").show();
    };

    var showFailureMessage = function() {
        $("#signup_header").hide();
        $("#support_form").hide();
        $("#support_form_submit_failure").show();
    };

    $(".signupnow").click(function(event) {
        showForm();
    });

    $(".signup .close").click(function(event) {
        hideForm();
    });

    $("#support_form_submit").click(function() {
        var name = $("#support_user_name").val();
        var email = $("#support_email_address").val();
        var query = $("#support_query").val();

        $.ajax({
            url: 'https://twstudios.zendesk.com/requests/embedded/create',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                via_id: 48,
                locale_id: 1,
                set_tags: "web_widget",
                submitted_from: document.location.href,
                name: name,
                email: email,
                description: query
            })
        }).done(function() {
            showSuccessMessage();
        }).error(function() {
            showFailureMessage();
        });
    });
})
