/* ===================================================================
 * Flare 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);


    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    // const doc = document.documentElement;
    // doc.setAttribute('data-useragent', navigator.userAgent);


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };



   /* pretty print
    * -------------------------------------------------- */
    const ssPrettyPrint = function() {
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    };



   /* move header
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const $hero = $('.s-hero'),
              $hdr = $('.s-header'),
              triggerHeight = $hero.outerHeight() - 170;


        $WIN.on('scroll', function () {

            let loc = $WIN.scrollTop();

            if (loc > triggerHeight) {
                $hdr.addClass('sticky');
            } else {
                $hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                $hdr.addClass('offset');
            } else {
                $hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                $hdr.addClass('scrolling');
            } else {
                $hdr.removeClass('scrolling');
            }

        });

    };



   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const $toggleButton = $('.s-header__menu-toggle');
        const $headerContent = $('.s-header__content');
        const $siteBody = $("body");

        $toggleButton.on('click', function(event){
            event.preventDefault();
            $toggleButton.toggleClass('is-clicked');
            $siteBody.toggleClass('menu-is-open');
        });

        $headerContent.find('.s-header__nav a, .btn').on("click", function() {

            // at 900px and below
            if (window.matchMedia('(max-width: 900px)').matches) {
                $toggleButton.toggleClass('is-clicked');
                $siteBody.toggleClass('menu-is-open');
            }
        });

        $WIN.on('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if ($siteBody.hasClass("menu-is-open")) $siteBody.removeClass("menu-is-open");
                if ($toggleButton.hasClass("is-clicked")) $toggleButton.removeClass("is-clicked");
            }
        });

    };



   /* photoswipe
    * ----------------------------------------------------- */
    const ssPhotoswipe = function() {
        const items = [],
              $pswp = $('.pswp')[0],
              $folioItems = $('.folio-item');

        // get items
        $folioItems.each( function(i) {

            let $folio = $(this),
                $thumbLink =  $folio.find('.folio-item__thumb-link'),
                $title = $folio.find('.folio-item__title'),
                $caption = $folio.find('.folio-item__caption'),
                $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                $captionText = $.trim($caption.html()),
                $href = $thumbLink.attr('href'),
                $size = $thumbLink.data('size').split('x'),
                $width  = $size[0],
                $height = $size[1];
        
            let item = {
                src  : $href,
                w    : $width,
                h    : $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        // bind click event
        $folioItems.each(function(i) {

            $(this).find('.folio-item__thumb-link').on('click', function(e) {
                e.preventDefault();
                let options = {
                    index: i,
                    showHideOpacity: true
                }

                // initialize PhotoSwipe
                let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };



   /* slick slider
    * ------------------------------------------------------ */
    const ssSlickSlider = function() {

        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }

            ]
        });

        $('.testimonial-slider').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

    };


   /* animate on scroll
    * ------------------------------------------------------ */
    const ssAOS = function() {
        
        AOS.init( {
            offset: 100,
            duration: 600,
            easing: 'ease-in-out',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };



   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    
   /* smooth scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                window.location.hash = target;
            });
        });

    };


   /* back to top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow = 800;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };



   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssPrettyPrint();
        ssMoveHeader();
        ssMobileMenu();
        ssPhotoswipe();
        ssSlickSlider();
        ssAOS();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();

    })();

})(jQuery);

filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

( function($) {
  
  $(document).ready(function() {
    
    var s           = $('.slider'),
        sWrapper    = s.find('.slider-wrapper'),
        sItem       = s.find('.slide'),
        btn         = s.find('.slider-link'),
        sWidth      = sItem.width(),
        sCount      = sItem.length,
        slide_date  = s.find('.slide-date'),
        slide_title = s.find('.slide-title'),
        slide_text  = s.find('.slide-text'),
        slide_more  = s.find('.slide-more'),
        slide_image = s.find('.slide-image img'),
        sTotalWidth = sCount * sWidth;
    
    sWrapper.css('width', sTotalWidth);
    sWrapper.css('width', sTotalWidth);
    
    var clickCount  = 0;
    
    btn.on('click', function(e) {
      e.preventDefault();

      if( $(this).hasClass('next') ) {
        
        ( clickCount < ( sCount - 1 ) ) ? clickCount++ : clickCount = 0;
      } else if ( $(this).hasClass('prev') ) {
        
        ( clickCount > 0 ) ? clickCount-- : ( clickCount = sCount - 1 );
      }
      TweenMax.to(sWrapper, 0.4, {x: '-' + ( sWidth * clickCount ) })


      //CONTENT ANIMATIONS

      var fromProperties = {autoAlpha:0, x:'-50', y:'-10'};
      var toProperties = {autoAlpha:0.8, x:'0', y:'0'};

      TweenLite.fromTo(slide_image, 1, {autoAlpha:0, y:'40'}, {autoAlpha:1, y:'0'});
      TweenLite.fromTo(slide_date, 0.4, fromProperties, toProperties);
      TweenLite.fromTo(slide_title, 0.6, fromProperties, toProperties);
      TweenLite.fromTo(slide_text, 0.8, fromProperties, toProperties);
      TweenLite.fromTo(slide_more, 1, fromProperties, toProperties);

    });
          
  });
})(jQuery);

$('.overlay').addClass('overlay-blue');
