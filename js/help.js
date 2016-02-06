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
})
