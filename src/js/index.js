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
