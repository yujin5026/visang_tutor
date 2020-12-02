var pilau_popups;

jQuery(document).ready(function ($) {
    pilau_popups = $('.popup-wrap');

    pilau_popups.on('click', '.popup-button', function (e) {
        var pw = $(this).parents('.popup-wrap');
        if (pw.hasClass('popup-closed')) {
            // By default, close all others before opening
            pilau_popups.not(this).each(function () {
                $(this).pilauPopupClose();
            });
            pw.pilauPopupOpen();
        } else {
            pw.pilauPopupClose();
        }
    });

    // Helpers to open/close popup
    $.fn.pilauPopupOpen = function () {
        this.removeClass('popup-closed').addClass('popup-open').children('.popup-box').attr('aria-hidden', 'false');
    };
    $.fn.pilauPopupClose = function () {
        this.removeClass('popup-open').addClass('popup-closed').children('.popup-box').attr('aria-hidden', 'true');
    };

    // Close popups when user clicks on page
    $(document).click(function (e) {
        var t = $(e.target);
        // Ignore if a button's being clicked, or if the click is somewhere inside an open popup
        if (!t.hasClass('popup-button') && !t.closest('.popup-box').length) {
            pilau_popups.each(function () {
                $(this).pilauPopupClose();
            });
        }
    });

});


// 필터박스에서 클릭 시 클래스 추가하여 스타일 변경
// 이미지 이름 변경
$(".filter_box").each(function () {
    $(this).click(function () {
        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
    });
});
$(".filter_box").on("click", function (e) {
    $(".filter_box > img").each(function (k, o) {
        var test = $(this).attr("src").replace("_on.png", "_off.png");
        $(this).attr("src", test);
    });
    var test = $(this).find("img").attr("src").replace("_off.png", "_on.png");
    $(this).find("img").attr("src", test);
    return false;
});




$('.search-button').click(function () {
    $(this).parent().toggleClass('open');
});



// LNB
$(document).ready(function () {
    App.LnbSlide.init();

});

var App = new Object();
App.LnbSlide = function () {
    var self;
    var $lnbDep02;
    return {
        init: function () {
            self = this;
            $lnbDep02 = $(".lnb-menu > li > a");

            $(".lnb-menu > li.active").find(".lnb-depth03").show();

            $lnbDep02.click(self.onClick);

        },
        onClick: function () {
            if ($(this).attr("href") == "#none") {
                if ($(this).parents("li").find(".lnb-depth03").is(":visible")) {
                    $(this).parents("li").find(".lnb-depth03").slideUp();
                    $(this).parent("li").removeClass("active");
                    $(this).removeClass("active");
                } else if ($(this).parents("li").find(".lnb-depth03").is(":hidden")) {
                    $(this).parents("li").find(".lnb-depth03").slideDown();
                    $(this).parent("li").addClass("active");
                    $(this).addClass("active");
                }


                return false;
            }
        }
    }
}();