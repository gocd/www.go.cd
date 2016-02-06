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
    });

    ///side-panel
    var doc = document.documentElement,
        body = document.body;

    if ($('.leftnav').length > 0) {
        var leftNav = $('.leftnav')[0],
            headerTop = $(leftNav).offset().top;
        $(window).scroll(function() {
            var top = doc && doc.scrollTop || body && body.scrollTop || 0;
            if (top > headerTop)
                $(leftNav).addClass('fixedToTop')
            else
                $(leftNav).removeClass('fixedToTop')
        });
    }

});
