$(document).ready(function () {
  aoyoutoolbox.detectionInit_after();
  aoyoutoolbox._navAdd();

  getData("con01", 11288);
  getData("con02", 11289);


  //侧导航
  $(".side-nav").smartFloat(680);

  $(".tab li").eq(0).addClass("on")


  $(".rule1").click(function () {
    $('.mask1').show()
  })
  $(".rule2").click(function () {
    $('.mask2').show()
  })
  // $(".mask").click(function () {
  //   $('.mask1').hide()
  //   $('.mask2').hide()
  // })
  $(".mask .close-btn").click(function () {
    $('.mask1').hide()
    $('.mask2').hide()
  })



  // $(".side-nav li").click(function () {
  //   debugger
  //   $(this).addClass('on').siblings().removeClass('on');
  // })
  //
  // $(".tab li").click(function () {
  //   $(this).addClass('on').siblings().removeClass('on');
  //   debugger
  //   switch ($(this).index()) {
  //     case 0:
  //       getData("con01", 11063);
  //       break;
  //     case 1:
  //       getData("con01", 11064);
  //       break;
  //     case 2:
  //       getData("con01", 11065);
  //       break;
  //     case 3:
  //       getData("con01", 11066);
  //       break;
  //     default:
  //       break;
  //   }
  // });

  //锚点滑动
  $('a[href*=#],area[href*=#]').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({
            scrollTop: targetOffset
          },
          1000);
        return false;
      }
    }
  });

});



// 获取产品
function getData(destination, titleID, flag) {
  var $id = $("#" + destination);
  var $main = $(".main");

  //内部函数
  function _innerfunc() {
    if ($.trim($id.html()) == '') {
      $id.html("<p class=\"tips\">\u4ea7\u54c1\u7ef4\u62a4\u4e2d\uff0c\u8bf7\u7a0d\u7b49\u007e");
      $id.css("text-align", "center");
    }
    $id.find(".itemtwo").each(function (k, v) {
      if (k % 2 === 1) {
        $(v).css("margin-right", "0");
      }
    });
    $id.find(".itemthree").each(function (k, v) {
      if (k % 3 === 2) {
        $(v).css("margin-right", "0");
      }
    });
    $id.find(".itemfour").each(function (k, v) {
      if (k % 4 === 3) {
        $(v).css("margin-right", "0");
      }
    });
    $("#" + destination + " .reserve-btn").html("立即预订");
    $("#" + destination + " .itemtwo:gt(3)").remove();
    $("#" + destination + " .itemthree:gt(5)").remove();
    $("#" + destination + " .itemfour:gt(9)").remove();
    $("#" + destination + " .price b").each(function () {
      $(this)[0].innerHTML = $(this)[0].innerHTML.replace("起", "起")
    });
    scrollNav();
  }

  if (flag) {
    _innerfunc();
  } else {
    $id.html("<img class=\"loading\" src=\"images/loading.gif\"/>");
    $.ajax({
      type: "Get",
      url: "http://activity.aoyou.com/promotion/index?titleID=" + titleID,
      dataType: "jsonp",
      jsonp: "callback",
      cache: false,
      async: true,
      success: function (json) {
        $id.html(json.product);
        _innerfunc();
      }
    });
  }
}

function scrollNav() {
  var wrapper01 = $("#wrapper01").offset().top;
  var wrapper02 = $("#wrapper02").offset().top;
  var wrapper03 = $("#wrapper03").offset().top;
  var wrapper04 = $("#wrapper04").offset().top;
  $(window).scroll(function () {
    var top = $(window).scrollTop();
    if (top >= wrapper01) {
      $(".side-nav li").eq(0).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper02) {
      $(".side-nav li").eq(1).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper03) {
      $(".side-nav li").eq(2).addClass("on").siblings().removeClass("on");
    }
    if (top >= wrapper04) {
      $(".side-nav li").eq(3).addClass("on").siblings().removeClass("on");
    }
  });
}

//右侧漂浮
$.fn.smartFloat = function (sidenavtop) {
  var position = function (element) {
    $(window).scroll(function () {
      var scrolls = $(this).scrollTop();
      if (scrolls > sidenavtop) {
        if (window.XMLHttpRequest) {
          element.css({
            position: "fixed",
            top: "20px",
            _top: "20px"
          });
        } else {
          element.css({
            top: scrolls
          });
        }
      } else {
        element.css({
          position: "absolute",
          top: sidenavtop
        });
      }
    });
  };
  return $(this).each(function () {
    position($(this));
  });
};
