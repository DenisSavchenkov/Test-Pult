$(function () {
    $('.slider-top__inner').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: 3000,
        fade: true,
    });
    $('.slider-bottom__inner').slick({
        fade: true,
        autoplay: 3000,
    });

    $('.menu__tabs-item').on('click', function(e){
        e.preventDefault();

        $('.menu__tabs-item').removeClass('menu__tabs-item--active');
        $('.menu__content-item').removeClass('menu__content-item--active');

        $(this).addClass('menu__tabs-item--active');
        $($(this).attr('href')).addClass('menu__content-item--active');

    });
    
    
});