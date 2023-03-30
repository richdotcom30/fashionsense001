(function ($) {
    "use stict";

    $(window).on('scroll', function () {
        animateElement();
    });

    //Add before and after "blockquote" custom class
    $('blockquote.inline-blockquote').prev('p').addClass('wrap-blockquote');
    $('blockquote.inline-blockquote').next('p').addClass('wrap-blockquote');
    $('blockquote.inline-blockquote').css('display', 'table');

    //Placeholder show/hide
    $('input, textarea').focus(function () {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input, textarea').blur(function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });


    $(".site-content").fitVids();

    $(".default-menu ul:first").addClass('sm sm-clean main-menu');
	
	$('.contact-form [type="submit"]').on('click',function(){
        SendMail(); 
    });


$(window).on('load', function () {

    //Set menu
    $('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });


    var $mainMenu = $('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = $(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = $(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });



//Show-Hide header sidebar
    $('#toggle, .menu-wraper').on('click', multiClickFunctionStop);
    $('.main-menu, .search-field').on('click', function (e) {
        e.stopPropagation();
    });

    contactFormWidthFix();

    $('.grid-item').not('.hidden').addClass('loaded');

    //Fix for portfolio/gallery item text
    $('.portfolio-text-holder').each(function () {
        $(this).find('.portfolio-info').css('margin-top', ($(this).innerHeight() - $(this).find('.portfolio-info').innerHeight()) * 0.5);
    });
    $('.carousel-slider .slick-slide .item-text').each(function () {
        $(this).find('a').css('margin-top', ($(this).innerHeight() - $(this).find('a').innerHeight()) * 0.5);
    });

    //Image / Testimonial Slider Config
    $(".image-slider, .testimonial-slider").each(function () {
        var id = $(this).attr('id');

        var auto_value = window[id + '_auto'];
        var hover_pause = window[id + '_hover'];
        var dots = window[id + '_dots'];
        var speed_value = window[id + '_speed'];

        auto_value = (auto_value === 'true') ? true : false;
        hover_pause = (hover_pause === 'true') ? true : false;
        dots = (dots === 'true') ? true : false;

        $('#' + id).slick({
            arrows: false,
            dots: dots,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 750,
            autoplay: auto_value,
            autoplaySpeed: speed_value,
            pauseOnHover: hover_pause,
            fade: true,
            draggable: false,
            adaptiveHeight: true
        });
    });


    var g_speed_value = window['gallery_speed'];
    var g_auto_value = window['gallery_auto'];
    g_auto_value = (g_auto_value === 'true') ? true : false;

    $(".carousel-slider").slick({
        arrows: true,
        dots: false,
        infinite: true,
        centerMode: true,
        variableWidth: true,
        speed: g_speed_value,
        autoplaySpeed: g_speed_value,
        autoplay: g_auto_value,
        pauseOnHover: true
    });

    $('.carousel-slider .slick-slide .item-text').each(function () {
        $(this).find('a').css('margin-top', ($(this).innerHeight() - $(this).find('a').innerHeight()) * 0.5);
    });


    portfolioLoadMore();

    // Animate the elemnt if is allready visible on load
    animateElement();

    $('.doc-loader').fadeOut('slow');

});


$(window).on('resize', function () {

    contactFormWidthFix();

    //Fix for portfolio/gallery item text
    $('.portfolio-text-holder').each(function () {
        $(this).find('.portfolio-info').css('margin-top', ($(this).innerHeight() - $(this).find('.portfolio-info').innerHeight()) * 0.5);
    });
    $('.carousel-slider .slick-slide .item-text').each(function () {
        $(this).find('a').css('margin-top', ($(this).innerHeight() - $(this).find('a').innerHeight()) * 0.5);
    });
});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var animateElement = function (e) {

    $(".animate").each(function (i) {

        var top_of_object = $(this).offset().top;
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if ((bottom_of_window) > top_of_object) {
            $(this).addClass('show-it');
        }

    });

};


var contactFormWidthFix = function () {
    $('.wpcf7 input[type=text], .wpcf7 input[type=email], .wpcf7 textarea').innerWidth($('.wpcf7-form').width());
};

var multiClickFunctionStop = function (e) {
    if ($(e.target).is('.menu-wraper') || $(e.target).is('.menu-right-part') || $(e.target).is('.menu-holder') || $(e.target).is('#toggle') || $(e.target).is('#toggle div'))
    {

        $('#toggle, .menu-wraper').off("click");
        $('#toggle').toggleClass("on");
        if ($('#toggle').hasClass("on"))
        {
            $('.header-holder').addClass('down');
            $('.menu-wraper, .menu-holder').addClass('show');
            $('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        } else
        {
            $('.header-holder').removeClass('down');
            $('.menu-wraper, .menu-holder').removeClass('show');
            $('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
        }
    }
};

var portfolioLoadMore = function (e) {
    $('.more-posts-portfolio').on("click", function () {        
        $('#portfolio').find(".hidden").slice(0,4).removeClass("hidden").addClass("animate loaded");
        $('.portfolio-text-holder').each(function () {
            $(this).find('.portfolio-info').css('margin-top', ($(this).innerHeight() - $(this).find('.portfolio-info').innerHeight()) * 0.5);
        });                
        animateElement();
        if (!$('#portfolio').find(".hidden").length)
        {
            $('.more-posts-portfolio').hide();
        }
    });
};

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

var SendMail = function () {

    var emailVal = $('#contact-email').val();

    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': $('#name').val(),
            'email': $('#contact-email').val(),
            'subject': $('#subject').val(),
            'message': $('#message').val()
        };
        $.ajax({
            type: "POST",
            url: "php/sendMail.php",
            data: params,
            success: function (response) {
                if (response) {
                    var responseObj = $.parseJSON(response);
                    if (responseObj.ResponseData)
                    {
                        alert(responseObj.ResponseData);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //xhr.status : 404, 303, 501...
                var error = null;
                switch (xhr.status)
                {
                    case "301":
                        error = "Redirection Error!";
                        break;
                    case "307":
                        error = "Error, temporary server redirection!";
                        break;
                    case "400":
                        error = "Bad request!";
                        break;
                    case "404":
                        error = "Page not found!";
                        break;
                    case "500":
                        error = "Server is currently unavailable!";
                        break;
                    default:
                        error = "Unespected error, please try again later.";
                }
                if (error) {
                    alert(error);
                }
            }
        });
    } else
    {
        alert('Your email is not in valid format');
    }
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}

})(jQuery);