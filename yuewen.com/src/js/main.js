$(function () {
  /**
   * 轮播
   */
  var timer = null;
  var num = 0;
  var spacing = 5000;
  $(".header-slide-first").fadeIn();
  $(".slide-button").eq(0).css("backgroundColor","rgba(255,255,255,1)");
  $(".slide-button:eq(0)").on({
    "click" : function () {
      $(".header-slide-first").fadeIn();
      $(".header-slide-second").fadeOut();
      $(".header-slide-third").fadeOut();
      $(this).css("backgroundColor","rgba(255,255,255,1)");
      $(".slide-button").eq(1).css("backgroundColor", "rgba(255,255,255,.3)");
      $(".slide-button").eq(2).css("backgroundColor", "rgba(255,255,255,.3)");
      num = 0;
      clearInterval(timer);
      timer = setInterval(slideContent, spacing);
    }
  });
  $(".slide-button:eq(1)").on({
    "click" : function () {
      $(".header-slide-first").fadeOut();
      $(".header-slide-second").fadeIn();
      $(".header-slide-third").fadeOut();
      $(this).css("backgroundColor", "rgba(255,255,255,1)");
      $(".slide-button").eq(0).css("backgroundColor", "rgba(255,255,255,.3)");
      $(".slide-button").eq(2).css("backgroundColor", "rgba(255,255,255,.3)");
      num = 1;
      clearInterval(timer);
      timer = setInterval(slideContent, spacing);
    }
  });
  $(".slide-button:eq(2)").on({
    "click": function () {
      $(".header-slide-first").fadeOut();
      $(".header-slide-second").fadeOut();
      $(".header-slide-third").fadeIn();
      $(this).css("backgroundColor", "rgba(255,255,255,1)");
      $(".slide-button").eq(0).css("backgroundColor", "rgba(255,255,255,.3)");
      $(".slide-button").eq(1).css("backgroundColor", "rgba(255,255,255,.3)");
      num = 2;
      clearInterval(timer);
      timer = setInterval(slideContent, spacing);
    }
  });
  $(".slide-get-more").on({
    "mouseenter": function () {
      clearInterval(timer);
    },
    "mouseleave": function () {
      timer = setInterval(slideContent, spacing);
    }
  })
  function slideContent ()  {
    if (num == 2 ) {
      $(".header-slide-item").eq(num).fadeOut();
      $(".slide-button").eq(num).css("backgroundColor","rgba(255,255,255,.3)");
      $(".header-slide-item").eq(0).fadeIn();
      $(".slide-button").eq(0).css("backgroundColor","rgba(255,255,255,1)");
      num = 0;
    }
    else {
      $(".header-slide-item").eq(num).fadeOut();
      $(".slide-button").eq(num).css("backgroundColor","rgba(255,255,255,.3)");
      $(".header-slide-item").eq(num + 1).fadeIn();
      $(".slide-button").eq(num + 1).css("backgroundColor","rgba(255,255,255,1)");
      num ++;
    }
  }
  timer = setInterval(slideContent, spacing);

  /**
   * 导航栏变色
   */
  

  /**
   * 图书传送带
   */
  var translateSpeed = 0;
  setInterval(function () {
    translateSpeed--;
    if (translateSpeed*1.4 < -5000) {
      translateSpeed = 0;
    }
    var translateFirst = "translateX(" + translateSpeed * 1.4 + "px)";
    var translateSecond = "translateX(" + translateSpeed * 1.2 + "px)";
    var translateThird = "translateX(" + translateSpeed * 1 + "px)";
    $(".copyright-move-first").css("transform", translateFirst);
    $(".copyright-move-second").css("transform", translateSecond);
    $(".copyright-move-third").css("transform", translateThird);
  }, 30);

  /**
 * 图书展示
 */
  var bookShowTimer = null;
  var picMaxIndex = 14;
  setTimeout(function () {
    picInitDisplay();
  }, 500);
  function picInitDisplay () {
    var picWidth = 160;
    var picHeight = 213;
    for(var i=0;i<picMaxIndex+1;i++) {
      if(i < picMaxIndex/2) {
        $(".book-show-pic").eq(i).css({
          "width": picWidth*(1+0.1*i/2) + "px",
          "height": picHeight*(1+0.1*i/2) + "px",
          "filter": "brightness(70%)",
          "transform": "translateX(" + -130*(picMaxIndex/2-i) +"px) translateZ(" + (i - picMaxIndex/2)*1.1 + "px)"
        });
        $(".book-show-describe-text").eq(i).hide();
      }
      else if (i > picMaxIndex/2) {
        $(".book-show-pic").eq(i).css({
          "width": picWidth*(1+0.1*(picMaxIndex-i)/2) + "px",
          "height": picHeight*(1+0.1*(picMaxIndex-i)/2) + "px",
          "filter": "brightness(70%)",
          "transform": "translateX(" + 130*(i - picMaxIndex/2) +"px) translateZ(" + (picMaxIndex/2-i)*1.1 + "px)"
        });
        $(".book-show-describe-text").eq(i).hide();
      }
      else if (i == picMaxIndex/2) {
        $(".book-show-pic").eq(i).css({
          "width": picWidth*(1+0.1*i/2) + "px",
          "height": picHeight*(1+0.1*i/2) + "px",
          "filter": "brightness(100%)",
          "transform": "translateX(" + 0 +"px) translateZ(" + i*1.1 + "px)"
        });
        $(".book-show-describe-text").eq(i).show();
      }
      // $(".book-show-pic").eq(i).on({
      //   "mouseenter": function () {
      //     clearInterval(bookShowTimer);
      //   },
      //   "mouseleave": function () {
      //     bookShowTimer = setInterval(elemSwitch, 3500);
      //   }
      // });
    }
  }
  bookShowTimer = setInterval(elemSwitch, 3500);
  function elemSwitch () {
    var firstElem = $(".book-show-pic").eq(0).prop("outerHTML");
    var firstTextElem = $(".book-show-describe-text").eq(0).prop("outerHTML");
    // console.log(firstElem);
    $(".book-show-pic").eq(0).remove();
    $(".book-show-describe").before(firstElem);
    $(".book-show-describe-text").eq(0).remove();
    $(".book-show-describe").append(firstTextElem);
    picInitDisplay();
  }

  $(".book-show-pic").on({
    "click": function (event) {
      console.log(event.target.src);
      var targetElem = event.target;
      console.log($(this));
      // $(this).target().remove();
      // $("[src=" + event.target.src + "]").remove();
      // $(".book-show-pic").eq(picMaxIndex/2 - 1).after(targetElem); 
    }
  });

  var $productIntro = $(".product-intro");
  $(".list-item-first").focus();
  $(".list-item-first").on({
    "click": function () {
      // $productIntro.eq(0).fadeIn();
      $productIntro.eq(0).css("visibility","visible");
      // $productIntro.not(".product-intro:eq(0)").fadeOut();
      $productIntro.not(".product-intro:eq(0)").css("visibility","hidden");
    }
  });
  $(".list-item-second").on({
    "click": function () {
      // $productIntro.eq(1).fadeIn();
      $productIntro.eq(1).css("visibility","visible");
      // $productIntro.not(".product-intro:eq(1)").fadeOut();
      $productIntro.not(".product-intro:eq(1)").css("visibility","hidden");
    }
  });
  $(".list-item-third").on({
    "click": function () {
      // $productIntro.eq(2).fadeIn();
      $productIntro.eq(2).css("visibility","visible");
      // $productIntro.not(".product-intro:eq(2)").fadeOut();
      $productIntro.not(".product-intro:eq(2)").css("visibility","hidden");
    }
  });
  $(".list-item-forth").on({
    "click": function () {
      // $productIntro.eq(3).fadeIn();
      $productIntro.eq(3).css("visibility","visible");
      // $productIntro.not(".product-intro:eq(3)").fadeOut();
      $productIntro.not(".product-intro:eq(3)").css("visibility","hidden");
    }
  });
  $(".list-item-fifth").on({
    "click": function () {
      // $productIntro.eq(4).fadeIn();
      $productIntro.eq(4).css("visibility","visible");
      // $productIntro.not(".product-intro:eq(4)").fadeOut();
      $productIntro.not(".product-intro:eq(4)").css("visibility","hidden");
    }
  });

  /**
   * 产品介绍标题滑标
   */
  $(".mobile-intro .list-item-first").on({
    "click": function () {
      $(".mobile-intro .bottom-short-line").css({
        "width": "51px",
        "transform": "translateX(0px)"
      });
    }
  })
  $(".mobile-intro .list-item-second").on({
    "click": function () {
      $(".mobile-intro .bottom-short-line").css({
        "width": "57px",
        "transform": "translateX(112.75px)"
      });
    }
  });
  $(".mobile-intro .list-item-third").on({
    "click": function () {
      $(".mobile-intro .bottom-short-line").css({
        "width": "57px",
        "transform": "translateX(231.167px)"
      });
    }
  });
  $(".mobile-intro .list-item-forth").on({
    "click": function () {
      $(".mobile-intro .bottom-short-line").css({
        "width": "57px",
        "transform": "translateX(349.583px)"
      });
    }
  });
  $(".mobile-intro .list-item-fifth").on({
    "click": function () {
      $(".mobile-intro .bottom-short-line").css({
        "width": "57px",
        "transform": "translateX(468px)"
      });
    }
  });
  // $(".brand-link").css({
  //   "opacity": "1"
  // })
  $(".brand-link").mouseenter(function () {
    $(this).css({
      "opacity": "1"
    }).siblings().css({
      "opacity": ".3"
    })

  });
  // $(".brand-link").mouseleave(function () {
  //   $(this).css({
  //     "opacity": ".3"
  //   });
  // });
});