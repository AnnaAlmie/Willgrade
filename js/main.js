$(document).ready(function () {
    imageToSvg();
    sliderMain();
});

function sliderMain() { // FULL TWO COMPONENT SLIDER

    let sliderLen = $('.js-move-slide').eq(0).find('img').length,
        sliderPag = $('.slider__inner__pagination__progress'),
        sliderLenBase = 1,
        sliderPagMove = 100 / sliderLen,
        activeClass = 'active',
        canAnimate = true,
        timeOut;

    sliderPag.css('width', sliderPagMove + '%');

    function autoTimer() {
        setTimeout(function () {
            if (canAnimate) {
                requestAnimationFrame(autoTimer);
                $('.js-slider[data-move="1"]').removeClass(activeClass).trigger('click');
            }
        }, 5300);

        setTimeout(function () {
            $('.js-slider[data-move="1"]').addClass(activeClass);
        }, 300)
    }
    autoTimer();

    $('.js-slider').on('click', function (e) {
        if (e.clientX) {
            canAnimate = false;
            clearTimeout(timeOut);
            $('.js-slider[data-move="1"]').removeClass(activeClass);
        }

        let slider = $('.js-move-slide'),
            sliderImg = slider.find('img');

        sliderImg.removeClass(activeClass);

        if ($(this).data('move') > 0) {
            sliderLenBase === sliderLen ? sliderLenBase = 0 : '';
            sliderLenBase++;
            slider.each(function () {
                $(this).find('img').eq(1).addClass(activeClass);
                $(this).find('img').eq(0).appendTo($(this)); //next slide
            })
        } else {
            sliderLenBase--;
            sliderLenBase === 0 ? sliderLenBase = sliderLen : '';
            slider.each(function () {
                $(this).find('img').eq(0).addClass(activeClass);
                $(this).find('img').eq($(this).find('img').length - 1).prependTo($(this)); //prev slide
            })
        }
        sliderPag.css('width', sliderPagMove * sliderLenBase + '%');

        if (e.clientX) {
            setTimeout(function () {
                canAnimate = true;
                autoTimer()
            }, 5000)
        }
    })
}// end FULL TWO COMPONENT SLIDER

function imageToSvg() {// Image.svg to HTML.svg

    $('img.svg').each(function () {
        let $img = $(this),
            imgID = $img.attr('id'),
            imgClass = $img.attr('class'),
            imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
}// end Image.svg to HTML.svg