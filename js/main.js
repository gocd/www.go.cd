jQuery(document).ready(function() {
    var navLIs = $('.navigation li');
    navLIs.click(function(event) {
        event.stopPropagation();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            return false;
        }
        navLIs.removeClass('selected');
        $(this).toggleClass('selected');
    });

    $(document).click(function() {
        navLIs.removeClass('selected');
    })
});
