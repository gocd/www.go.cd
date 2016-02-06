// help landing page
jQuery(document).ready(function($) {
    $(".signupnow").click(function(event) {
        $(".signup").slideDown();
        $(this).hide();
    });

    $(".signup .close").click(function(event) {
        $(".signup").hide();
        $(".signupnow").show();
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
            $("#support_form").hide();
            $("#support_form_submit_success").show();
        }).error(function() {
            $("#support_form").hide();
            $("#support_form_submit_failure").show();
        });
    });
})
