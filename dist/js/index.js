var pilau_popups;

jQuery(document).ready(function ($) {
  pilau_popups = $(".popup-wrap");

  pilau_popups.on("click", ".popup-button", function (e) {
    var pw = $(this).parents(".popup-wrap");
    if (pw.hasClass("popup-closed")) {
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
    this.removeClass("popup-closed")
      .addClass("popup-open")
      .children(".popup-box")
      .attr("aria-hidden", "false");
  };
  $.fn.pilauPopupClose = function () {
    this.removeClass("popup-open")
      .addClass("popup-closed")
      .children(".popup-box")
      .attr("aria-hidden", "true");
  };

  // Close popups when user clicks on page
  $(document).click(function (e) {
    var t = $(e.target);
    if (!t.hasClass("popup-button") && !t.closest(".popup-box").length) {
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

$(".search-button").click(function () {
  $(this).parent().toggleClass("open");
});

// LNB
$(document).ready(function () {
  App.LnbSlide.init();
});

var App = new Object();
App.LnbSlide = (function () {
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
    },
  };
})();

// KETA_SE_011 Tabs
var selector_tabs = $(".selector_tabs");
var selector = $(".selector_tabs").find("li").length;
var activeItem = selector_tabs.find(".active");
var activeWidth = activeItem.innerWidth();
$(".selector").css({
  left: activeItem.position.left + "px",
  width: activeWidth + "px",
});

$(".selector_tabs").on("click", "li", function (e) {
  e.preventDefault();
  $(".selector_tabs li").removeClass("active");
  $(this).addClass("active");
  var activeWidth = $(this).innerWidth();
  var itemPos = $(this).position();
  $(".selector").css({
    left: itemPos.left + "px",
    width: activeWidth + "px",
  });
});

$(".tab_content").hide();
$(".tab_content:first").show();

$("ul.tabs.grades li").click(function () {
  $(".tab_content").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();

  $("ul.tabs.grades li").removeClass("active");
  $(this).addClass("active");

  $(".tab_drawer_heading").removeClass("d_active");
  $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
});
/* if in drawer mode */
$(".tab_drawer_heading").click(function () {
  $(".tab_content").hide();
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).fadeIn();

  $(".tab_drawer_heading").removeClass("d_active");
  $(this).addClass("d_active");

  $("ul.tabs.grades li").removeClass("active");
  $("ul.tabs.grades li[rel^='" + d_activeTab + "']").addClass("active");
});

$(".tab_content_sub").hide();
$(".tab_content_sub:first").show();

/* if in tab mode */
$("ul.tabs.grades_sub li").click(function () {
  $(".tab_content_sub").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();

  $("ul.tabs.grades_sub li").removeClass("active");
  $(this).addClass("active");

  $(".tab_drawer_heading2").removeClass("d_active");
  $(".tab_drawer_heading2[rel^='" + activeTab + "']").addClass("d_active");
});
/* if in drawer mode */
$(".tab_drawer_heading2").click(function () {
  $(".tab_content_sub").hide();
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).fadeIn();

  $(".tab_drawer_heading2").removeClass("d_active");
  $(this).addClass("d_active");

  $("ul.tabs.grades_sub li").removeClass("active");
  $("ul.tabs.grades_sub li[rel^='" + d_activeTab + "']").addClass("active");
});

/////// 모달 컨트롤
jQuery(document).ready(function ($) {
  //open popup
  $(".cd-popup-trigger").on("click", function (event) {
    event.preventDefault();
    $(this).next().addClass("is-visible");
    $("body").css("overflow", "hidden");
  });

  //close popup
  $(".cd-popup").on("click", function (event) {
    if (
      $(event.target).is(".cd-popup-close") ||
      $(event.target).is(".cd-popup")
    ) {
      event.preventDefault();
      $(this).removeClass("is-visible");
      $("body").css("overflow", "auto");
    }
  });
  //close popup when clicking the esc keyboard button
  $(document).keyup(function (event) {
    if (event.which == "27") {
      $(".cd-popup").removeClass("is-visible");
    }
  });
});

/////// 팝업 가운데 정렬
jQuery.fn.center = function () {
    this.css("top",Math.max(0,($(window).height() - $(this).outerHeight()) / 2 + $(window).scrollTop()) + "px");
    this.css("left",Math.max(0,($(window).width() - $(this).outerWidth()) / 2 + $(window).scrollLeft()) + "px");
    return this;
  };
  $(".cd-popup-container").center();

/////// 테스트 결과창
$('.exam_result_box .close').click(function() {
    $(this).parent().css('display','none');
});

/////// 별점
var starRating = function () {
  var $star = $(".star-input"),
    $result = $star.find("output>b");

  $(document)
    .on("focusin", ".star-input>.input", function () {
      $(this).addClass("focus");
    })

    .on("focusout", ".star-input>.input", function () {
      var $this = $(this);
      setTimeout(function () {
        if ($this.find(":focus").length === 0) {
          $this.removeClass("focus");
        }
      }, 100);
    })

    .on("change", ".star-input :radio", function () {
      $result.text($(this).next().text());
    })
    .on("mouseover", ".star-input label", function () {
      $result.text($(this).text());
    })
    .on("mouseleave", ".star-input>.input", function () {
      var $checked = $star.find(":checked");
      if ($checked.length === 0) {
        $result.text("0");
      } else {
        $result.text($checked.next().text());
      }
    });
};

starRating();

/////// 시험테스트 확인용 - 팝업 고정일 경우
if ($(".is-visible").length) {
  $("body").css("overflow-y", "hidden");
}


