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

    if (document.getElementsByClassName('leftnav')[0] != undefined){
        var headerTop = document.getElementsByClassName('leftnav')[0].offsetTop;
        window.addEventListener('scroll', function() {
            var top = doc && doc.scrollTop || body && body.scrollTop || 0;
            if (top > headerTop)
                document.getElementsByClassName('leftnav')[0].classList.add('fixedToTop')
            else
                document.getElementsByClassName('leftnav')[0].classList.remove('fixedToTop')
        });
    }

});
