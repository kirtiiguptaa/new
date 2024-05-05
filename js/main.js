document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var loader = document.getElementById("loader");
        loader.style.display = "none";
        document.getElementById('video').style.display = 'block';
    }, 3000); 
  });
  
  // Loading
  window.addEventListener("load", function() {
    setTimeout(function() {
        var loader = document.getElementById("loader");
        loader.style.display = "none";
    }, 3000); 
    
  });

  //   Swiper testimonial
  let carousel = (el, parameter) => {
    el = el !==undefined ? el : "";
    parameter = parameter !== undefined ? parameter : {};
    let method = {
        transition: parameter.transition !== undefined ? parameter.transition : null,
        responsive: parameter.grid !== undefined ? parameter.grid : null,
        pagination: parameter.pagination !== undefined ? parameter.pagination : false,
        autoplay: parameter.autoplay !== undefined ? parameter.autoplay : null,
        playTimer: parameter.autoplay !== undefined && parameter.autoplay.playTimer !== undefined
            ? parameter.autoplay.playTimer
            : 2000,
    },trigger = document.querySelectorAll(".carousel-slider"+el);
    Array.prototype.forEach.call(trigger, function (el) {
        
    let content = el.querySelector (".carousel-content"),
        count = content.childElementCount,
        responsive = method.responsive || JSON.parse (content.getAttribute ("data-grid")),
        widths,
        d_widths = el.offsetWidth,
        c_widths = d_widths * count,
        autoplay = method.autoplay || el.getAttribute ("data-autoplay"),
        autoplay_timer = method.playTimer || el.getAttribute ("data-timer"),
        is_pagination = method.pagination || content.getAttribute ("data-pagination"),
        config = {
            "lg": 1024,
            "md": 768,
            "sm": 667
        },
        step,
        pagination_content = el.querySelector (".carousel-pagination");

    content.firstElementChild.classList.add ("active");
    content.style.transitionDuration = method.transition || "500ms";
    this.autoplayEffect = null;

    let index_settings = () => {//tabindexleri slide itemlerine aktarıyoruz
        let slides = content.querySelectorAll (".slide-item");
        for (i in slides) {
            slides[ i ].tabIndex = i;
        }
    }, size = (widths) => {
        let item_resize = el.querySelectorAll (".slide-item");
        Array.prototype.forEach.call (item_resize, (item_size) => {
            item_size.style.width = widths + "px";
        });
    }, responsive_grid = () => {
        if (responsive) {
            if (window.innerWidth >= config.lg) {
                if (responsive.xl !== undefined) {
                    gridCount = responsive.xl;
                    widths = Number (d_widths) / Number (gridCount);
                }
            } else if (window.innerWidth >= config.md) {
                if (responsive.lg !== undefined) {
                    gridCount = responsive.lg;
                    widths = Number (d_widths) / Number (gridCount);
                    console.log (d_widths, gridCount, responsive)
                }
            } else if (window.innerWidth >= config.sm) {
                if (responsive.md !== undefined) {
                    gridCount = responsive.md;
                    widths = Number (d_widths) / Number (gridCount);
                }
            } else if (window.innerWidth < config.sm) {
                if (responsive.sm !== undefined) {
                    gridCount = responsive.sm;
                    widths = Number (d_widths) / Number (gridCount);
                }
            }
        } else {
            widths = d_widths;
        }
        size (widths);
        c_widths = widths * content.lastElementChild.tabIndex;
        content.style.minWidth = c_widths;
        return widths;
    };

    let autoplay_ = () => {
        if (autoplay) {
            let i = 0;
            let last_i = content.lastElementChild.tabIndex;
            this.autoplayEffect = setInterval (() => {
                if (last_i > i) {
                    content.style.transform = "translate3d(-" + d_widths * i + "px,0px,0px)";
                    content.children.item (i + 1).classList.add ("active");
                    content.children.item (i).classList.remove ("active");
                } else {
                    content.lastElementChild.classList.remove ("active");
                    content.firstElementChild.classList.add ("active");
                    content.style.transform = "translate3d(" + 0 + "px,0px,0px)";

                    i = 0;
                }
                i++;
            }, Number (autoplay_timer));
        }
    }, pagination = () => {
        if (is_pagination) {
            let pagination_item = el.querySelector (".carousel-pagination");
            for (let i = 0; i < count; i++) {
                let p_item = document.createElement ("a");
                p_item.href = "#!";
                p_item.classList.add ("item");
                p_item.tabIndex = i;
                pagination_item.appendChild (p_item);
            }
        }
    }, slider_next = (el) => {
        let content = el.querySelector (".carousel-content");
        let last_i = content.lastElementChild.tabIndex;
        let i = content.querySelector (".slide-item.active").tabIndex + 1;
        step = d_widths / responsive_grid ();
        widths = d_widths / step;
        if (step > 1) {
            last_i = last_i - step + 1;
        }
        if (i <= last_i) {
            content.children.item (i).classList.add ("active");
            content.children.item (i - 1).classList.remove ("active");
            let ml_ = widths * i;
            content.style.transform = "translate3d(-" + ml_ + "px,0px,0px)";
            i++;
        } else {
            i = 1;
            content.lastElementChild.classList.remove ("active");
            content.firstElementChild.classList.add ("active");
            content.style.transform = "translate3d(" + 0 + "px,0px,0px)";
        }
    }, slider_prev = () => {
        let content = el.querySelector (".carousel-content");
        let last_i = content.lastElementChild.tabIndex;
        let i = content.querySelector (".slide-item.active").tabIndex;
        step = d_widths / responsive_grid ();
        widths = d_widths / step;
        if (i >= 1) {
            content.children.item (i - 1).classList.add ("active");
            content.children.item (i).classList.remove ("active");
            i--;
            let ml_ = widths * i;
            content.style.transform = "translate3d(-" + ml_ + "px,0px,0px)";
        } else {
            i = last_i;
            content.lastElementChild.classList.add ("active");
            content.firstElementChild.classList.remove ("active");
            if (step > 1) {
                last_i = last_i - step + 1;
            }
            let ml_ = widths * ( last_i - 1 );
            content.style.transform = "translate3d(-" + ml_ + "px,0px,0px)";
            i--;
        }

    }, slider_direction = (el) => {
        let prev = el.querySelector (".carousel-prev-btn");
        let next = el.querySelector (".carousel-next-btn");
        if (el.contains (prev) && el.contains (next)) {
            prev.addEventListener ("click", () => {
                window.clearInterval (this.autoplayEffect);
                slider_prev (el);
            }, false);

            next.addEventListener ("click", () => {
                window.clearInterval (this.autoplayEffect);
                slider_next (el);
            }, false);
        }
        if (el.contains (pagination_content)) {
            pagination ();
            let paginate = pagination_content.querySelectorAll (".item");
            Array.prototype.forEach.call (paginate, (el) => {
                el.addEventListener ("click", () => {
                    window.clearInterval (this.autoplayEffect);
                    let last_i = el.parentNode.lastChild.tabIndex,
                        i = el.tabIndex;
                    let ml_ = widths * i;
                    content.style.transform = "translate3d(-" + ml_ + "px,0px,0px)";
                }, false);
            });
        }
    };
    window.addEventListener ("resize", () => {
        d_widths = el.offsetWidth;
        console.log ("ekran değişti", d_widths);
        responsive_grid ();
    }, true);
    responsive_grid ();
    slider_direction (el);
    autoplay_ ();
    index_settings ();

    });

    return this;
};

carousel();

// Swiper service
var swiper = new Swiper(".dev-sections.swiper", {
    direction: "horizontal",
    slidesPerView: 3,
    spaceBetween: 24,
    mousewheel: true,
    autoplay: true,
    loop: true,
    speed: 500,
});

var swiper = new Swiper(".digital-sections.swiper", {
    direction: "horizontal",
    slidesPerView: 3,
    spaceBetween: 24,
    mousewheel: true,
    autoplay: true,
    loop: true,
    speed: 500,
});

//  Count
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        function counter(id, start, end, duration, callback) {
            let obj = document.getElementById(id),
                current = start,
                range = end - start,
                increment = end > start ? 1 : -1,
                step = Math.abs(Math.floor(duration / range)),
                timer;
            
            function updateCounter() {
                current += increment;
                obj.textContent = current;
                if (current == end) {
                    clearInterval(timer);
                    setTimeout(() => {
                        current = start;
                        timer = setInterval(updateCounter, step);
                    }, 5000);
                }
            }

            timer = setInterval(updateCounter, step);

            if (typeof callback === 'function') {
                callback();
            }
        }

        counter("count1", 0, 50, 5000);
        counter("count2", 0, 200, 5000);
        counter("count3", 0, 120, 5000);
    }, 15000);
});

document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("about-video");
    setTimeout(function() {
        // Show the video
        video.style.display = "block";
        // Play the video
        video.play();
    }, 5000);
});



(function ($) {
    "use stict";
    var count = 1;
    var $mySwiper = undefined;

    $(".site-content").fitVids();
    menuWidthHeightFix();
    setToltip();

    //Placeholder show/hide
    $('input, textarea').on('focus', function () {
        $(this).data('placeholder', $(this).attr('placeholder'));
        $(this).attr('placeholder', '');
    });
    $('input, textarea').on('blur', function () {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });

    $(".single-post .entry-info").stick_in_parent({offset_top: 64, parent: ".single-content-wrapper", spacer: ".sticky-spacer"});

    //Fix for Horizontal Slider
    horizontalSliderContentWidth();
    //Gallery Image Slider Fix    
    galleryImage();
    //PrettyPhoto initial    
    setPrettyPhoto();
    //Fix fot Hover Image Slide if no Title
    fixHoverImageNoTitle();
    //Fix Page Split Background Image
    pageSplitBackgroundImage();
    
    $('.contact-form [type="submit"]').on('click',function(){
        SendMail(); 
    });

    //Fix for default menu
    $(".default-menu ul:first").addClass('sm sm-clean main-menu');




    $(window).on('load', function () {

        //Set Carousel Slider
        setUpCarouselSlider();
        //Set Image Slider
        imageSliderSettings();
        // Animate the elemnt if is allready visible on load
        animateElement();
        //Set menu
        setMenu();
        //Blog show feature image
        showFirstBlogPostFeatureImge();
        showBlogPostFeatureImage();

        //Show-Hide header sidebar
        $('#toggle').on("click", multiClickFunctionStop);

        $('.site-content, #toggle').addClass('all-loaded');
        $('.doc-loader').fadeOut();
        $('body').removeClass('wait-preloader');
    });

    $(window).on('resize', function () {
        //Set Carousel Slider
        setUpCarouselSlider();
    });

    $(window).on('scroll', function () {
        animateElement();
    });




//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------

    function animateElement(e) {
        $(".animate").each(function (i) {
            var top_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if ((bottom_of_window - 70) > top_of_object) {
                $(this).addClass('show-it');
            }
        });
    }
    

    function multiClickFunctionStop(e) {
        e.preventDefault();
        $('#toggle').off("click");
        $('#toggle').toggleClass("on");

        $('html, body, .sidebar, .menu-left-part, .menu-right-part, .site-content').toggleClass("open").delay(500).queue(function (next) {
            $(this).toggleClass("done");
            next();
        });
        $('#toggle').on("click", multiClickFunctionStop);
    }
    


    function showFirstBlogPostFeatureImge() {
        $(".blog-item-holder .entry-holder").first().addClass('active-post');
    }

    function showBlogPostFeatureImage() {
        $(".blog-item-holder .entry-holder").on('mouseenter', function () {
            $(".blog-item-holder .entry-holder").removeClass('active-post');
            $(this).addClass('active-post');
        });
    }

    function menuWidthHeightFix() {
        if (!$(".menu-right-text").length)
        {
            $('#header-main-menu').addClass('no-right-text');
        }
        if (!$("#sidebar").length)
        {
            $('.menu-left-part').addClass('no-sidebar');
        }
    }

    function setToltip() {
        $(".tooltip").tipper({
            direction: "left",
            follow: true
        });
    }

    function is_touch_device() {
        return !!('ontouchstart' in window);
    }

    function setMenu() {
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
    }

    function setUpCarouselSlider() {
        $('.swiper-wrapper').addClass('no-horizontal-slider');
        if ($('.horizontal-slider').length) {       
            if ($(window).width() >= 1007 && $mySwiper == undefined)
            {                
                $('.swiper-wrapper').removeClass('no-horizontal-slider');
                $mySwiper = new Swiper('.horizontal-slider', {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    mousewheel: {
                        releaseOnEdges: true
                    },
                    keyboard: true,
                    simulateTouch: false,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    freeMode: true

                });
            }

            if ($(window).width() < 1007 && $mySwiper !== undefined)
            {
                $mySwiper.destroy();
                $mySwiper = undefined;
                $('.swiper-wrapper').removeAttr('style').addClass('no-horizontal-slider');
                $('.swiper-slide').removeAttr('style');

            }
        }
    }

    function galleryImage() {
        $(".inverse-black-white .coco-gallery-item").hover(function () {
            $(".inverse-black-white .coco-gallery-item").not(this).addClass('b-w');
        }, function () {
            $(".inverse-black-white .coco-gallery-item").removeClass('b-w');
        });
    }

    function setPrettyPhoto() {
        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({
            slideshow: false, /* false OR interval time in ms */
            overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            default_width: 1280,
            default_height: 720,
            deeplinking: false,
            social_tools: false,
            iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        });
    }

    function horizontalSliderContentWidth() {
        if ($('.horizontal-slider').length)
        {
            $('.site-content').addClass('has-horizontal-slider');
            $('.portfolio-content').removeClass('content-1170 center-relative');
        }
    }

    function imageSliderSettings() {
        $(".simple-image-slider-wrapper").each(function () {
            var id = $(this).attr('id');
            var auto_value = window[id + '_auto'];
            var speed_value = window[id + '_speed'];
            auto_value = (auto_value === 'true') ? true : false;
            if (auto_value === true)
            {
                var mySwiper = new Swiper('#' + id, {
                    autoplay: {
                        delay: speed_value
                    },
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination-' + id,
                        clickable: true
                    }
                });
                $('#' + id).hover(function () {
                    mySwiper.autoplay.stop();
                }, function () {
                    mySwiper.autoplay.start();
                    ;
                });
            } else {
                var mySwiper = new Swiper('#' + id, {
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination-' + id,
                        clickable: true
                    }
                });
            }
        });
    }

    function fixHoverImageNoTitle() {
        $(".horizontal-slider .carousel-item-image").each(function () {
            if ($(this).find('h2').text() == '')
            {
                $(this).addClass('no-title-on-slide');
            }
        });
    }

    function pageSplitBackgroundImage() {
        $(".page-split-right").css("background-image", 'url(' + $(".page-split-right").data('background') + ')');
        $(".blog-featured-image-holder").each(function () {
            $(this).css("background-image", 'url(' + $(this).data('background') + ')');
        });
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }

    function SendMail() {

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
    }

})(jQuery);
