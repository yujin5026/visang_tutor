var pilau_popups;

jQuery(document).ready(function ($) {
    pilau_popups = $('.popup-wrap');

    pilau_popups.on('click', '.popup-button', function (e) {
        var pw = $(this).parents('.popup-wrap')
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


// KETA_SE_011 Tabs
var selector_tabs = $('.selector_tabs');
var selector = $('.selector_tabs').find('li').length;
var activeItem = selector_tabs.find('.active');
var activeWidth = activeItem.innerWidth();
$(".selector").css({
    "left": activeItem.position.left + "px",
    "width": activeWidth + "px"
});

$(".selector_tabs").on("click", "li", function (e) {
    e.preventDefault();
    $('.selector_tabs li').removeClass("active");
    $(this).addClass('active');
    var activeWidth = $(this).innerWidth();
    var itemPos = $(this).position();
    $(".selector").css({
        "left": itemPos.left + "px",
        "width": activeWidth + "px"
    });
});

$(".tab_content").hide();
$(".tab_content:first").show();

$("ul.selector_tabs li").click(function () {
    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();

    $("ul.selector_tabs li").removeClass("active");
    $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
});

$(".tab_drawer_heading").click(function () {
    $(".tab_content").hide();
    var d_activeTab = $(this).attr("rel");
    $("#" + d_activeTab).fadeIn();
    $(".tab_drawer_heading").removeClass("d_active");
    $(this).addClass("d_active");
    $("ul.selector_tabs li").removeClass("active");
    $("ul.selector_tabs li[rel^='" + d_activeTab + "']").addClass("active");
});

$('ul.selector_tabs li').last().addClass("tab_last");





// 모달 컨트롤
function modalView(modalName) {
    var modalWidth = $(".modalpop .popupwrap." + modalName).innerWidth() / 2;
    var modalHeight = $(".modalpop .popupwrap." + modalName).innerHeight() / 2;
    $(".transparents-layer").remove();
    $(".popupwrap").removeClass("active").css("left", "-99999px").css("top", "-99999px").css("opacity", "0");
    $(".modalpop").show().css({ "top": 0, "left": 0 });
    if ($("." + modalName).outerHeight() > $(window).height() - 50) {
        $("." + modalName + " .popcontents").css({ maxHeight: $(window).height() * 0.8, overflowY: 'auto' });
        modalHeight = $(".modalpop .popupwrap." + modalName).height() / 2;
    }

    $("body").append("<div class='transparents-layer' style='background:#000; opacity:0.7'></div>");
    $(".popupwrap." + modalName).addClass("active").css("top", "40%").css("left", "50%").css("margin-top", -($(".modalpop .popupwrap." + modalName).innerHeight() / 2.7) + "px").css("margin-left", -modalWidth + "px").animate({ opacity: 1 }, 300);

    $(".transparents-layer").attr("onclick", "modalHide('" + modalName + "')");
    $(".popupwrap." + modalName).addClass("active");

}

function modalHide(modalName) {
    $(".popupwrap." + modalName).animate({ opacity: 0 }, 300, function () {
        $(".popupwrap." + modalName).css("top", "-99999px").css("left", "-99999px");
        $(".modalpop").css({ "top": "-99999px", "left": "-99999px" });
        $(".transparents-layer").animate({ opacity: 0 }, 300, function () {
            $(this).remove();
        });
        $(".popupwrap." + modalName).removeClass("active");
    });
}




jQuery(document).ready(function($){
    //open popup
    $('.cd-popup-trigger').on('click', function(event){
        event.preventDefault();
        $(this).next().addClass('is-visible');
        $('body').css('overflow','hidden');
    });

    //close popup
    $('.cd-popup').on('click', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
            $('body').css('overflow','auto');
        }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.cd-popup').removeClass('is-visible');
        }
    });
});