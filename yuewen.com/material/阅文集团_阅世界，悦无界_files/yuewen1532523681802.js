var YUEWEN = function (e, t, a) {
  var n = "active";
  return {
    el: {},
    load: function (t, a) {
      var n = this;
      a = a || function () {};
      var i = document.createElement("script");
      i.onload = function () {
        i.isInited || (i.isInited = !0, a.call(n))
      }, i.onreadystatechange = function () {
        !i.isInited && /^loaded|complete$/.test(i.readyState) && (i.isInited = !0, a.call(n))
      }, i.src = t, e.getElementsByTagName("head")[0].appendChild(i)
    },
    scrollLoading: function (e) {
      var a = [],
        n = this.el.container;
      if (e && e.length) {
        e.each(function () {
          a.push({
            obj: this,
            src: $(this).attr("data-src")
          })
        });
        var i = e.length,
          s = function () {
            if (0 == i) return n.off("scroll.loading"), void n.off("resize.loading");
            var e = $(t).height();
            $(t).width();
            $.each(a, function (t, a) {
              var n = a.obj;
              if (n) {
                var s = n.getBoundingClientRect();
                if (0 != s.left || 0 != s.top) {
                  n.clientWidth;
                  var r = n.clientHeight,
                    o = !1;
                  s.top + r >= 0 && s.top < e && (o = !0);
                  o && (n.src = a.src, n.removeAttribute("data-src"), a.obj = null, i--)
                }
              }
            })
          };
        n.on("scroll.loading", s), n.on("resize.loading", s), s()
      }
    },
    swipe: function (e, t, a) {
      var n = this;
      if (0 == $.isFunction(a)) return n;
      var i = {
          x: 0,
          y: 0
        },
        s = {},
        r = {
          start: function (e) {
            var t = e.touches[0];
            i = {
              x: t.pageX,
              y: t.pageY,
              time: +new Date
            }
          },
          move: function (e) {
            if (!(e.touches.length > 1 || e.scale && 1 !== e.scale)) {
              var t = e.touches[0];
              s = {
                x: t.pageX - i.x,
                y: t.pageY - i.y
              }
            }
          },
          end: function (n) {
            var o = +new Date - i.time;
            if (Number(o) < 500) {
              var l = Math.abs(s.x),
                c = Math.abs(s.y);
              l > 20 && c < l && (s.x < 0 && "left" == t || s.x > 0 && "right" == t) && a.call(e[0], r), c > 20 && l < c && (s.y < 0 && "top" == t || s.y > 0 && "bottom" == t) && a.call(e[0], r)
            }
            i = {}, s = {}
          }
        };
      return e.on("touchstart", r.start), e.on("touchmove", r.move), e.on("touchend", r.end), n
    },
    slide: function (e, t) {
      var a = this;
      if ("string" == typeof e && (e = $(e)), e && e.length) {
        var i = 0,
          s = $.map(e, function (e, t) {
            var a = "";
            return (e = $(e)).hasClass(n) ? i = t : (a = e.attr("data-hash")) && location.hash.replace("#", "") == a && (i = t), $("#" + e.data("index", t).attr("data-rel"))
          });
        e.eq(i).addClass(n), e.on("click", function () {
          var e = $(this),
            t = +e.data("index");
          0 == e.hasClass(n) && r(t)
        });
        var r = function (r) {
          e.eq(i).removeClass(n), e.eq(r).addClass(n), $(s[i]).removeClass(n), $(s[r]).addClass(n), $.isFunction(t) && t.call(a, e.eq(r), s[r], e.eq(i), s[i]), i = r
        }
      }
      return this
    },
    slidePreload: function () {
      return this
    },
    slideHomeApp: function () {
      var e = this,
        a = e.el.tabApp = $("#tabApp"),
        n = e.el.tabLine = $("#tabLine"),
        i = a.find("a"),
        s = function (i) {
          var s = a.find(".active"),
            r = 0;
          if (s.length && (r = s.position().left, n.css({
              width: s.width()
            }), "S" == t.SIZE && a.css("marginLeft", -r), history.pushState ? n.css({
              webkitTransform: "translateX(" + r + "px)",
              transform: "translateX(" + r + "px)"
            }) : n.css({
              left: s.position().left
            })), t.FN_hash && !0 !== i) {
            var o = s.attr("data-hash");
            location.replace(location.href.split("#")[0] + "#" + o), FN_hash(), e.el.container.trigger("scroll")
          }
        };
      if (e.slide(i, s), s(!0), "S" == t.SIZE) {
        var r = $("#mobile ul");
        e.swipe(r, "left", function () {
          var e = 1 * a.find(".active").data("index");
          ++e > i.length - 1 && (e = 0), i.eq(e).trigger("click")
        }), e.swipe(r, "right", function () {
          var e = 1 * a.find(".active").data("index");
          --e < 0 && (e = i.length - 1), i.eq(e).trigger("click")
        }), $("#mobile a").removeAttr("target"), $(".mNoBlank").removeAttr("target")
      }
      return e
    },
    slideBrand: function () {
      var e, t = this,
        a = t.el.brandDescX = $("#brandDescX"),
        i = t.el.brandNavX = $("#brandNavX");
      return a.length && i.length && (e = a.find("li"), i.find("a").each(function (a) {
        $(this).data("index", a).on("mouseenter", function () {
          var a = $(this),
            s = null,
            r = -1,
            o = a.data("index");
          clearTimeout(t.timerNavHover), t.timerNavHover = setTimeout(function () {
            if (!1 === a.hasClass(n)) {
              1 == (s = i.find(".active")).length && (r = s.data("index"), s.removeClass(n)), a.addClass(n);
              var t = !1;
              o < r && (t = !0);
              var l = e.eq(r);
              l.length && (l.removeClass("in").removeClass("reverse").addClass("out"), t && l.addClass("reverse")), e.eq(o).addClass("in").removeClass("reverse").removeClass("out"), t && e.eq(o).addClass("reverse")
            }
          }, 225)
        })
      }), i.on("mouseleave", function () {
        clearTimeout(t.timerNavHover)
      })), t
    },
    slideHomeHeader: function () {
      var a = this,
        n = a.el.header,
        i = a.el.dots;
      if (n.length) {
        var s = function () {
          a.timerSlide || (a.timerSlide = setInterval(function () {
            var e = 1 * $("#hdDotX .active").data("index") + 1;
            i[e] || (e = 0), i.eq(e).trigger("click")
          }, 8e3))
        };
        "S" == t.SIZE && setTimeout(function () {
          s()
        }, 8e3), "S" !== t.SIZE ? (n.on("mouseenter", function () {
          clearInterval(a.timerSlide), a.timerSlide = null
        }).on("mouseleave", function () {
          s()
        }), $(e).on("mouseover", function () {
          a.isPreload || (setTimeout(function () {
            a.isPreload || a.slidePreload()
          }, 4e3), setTimeout(function () {
            s()
          }, 6e3))
        })) : (a.swipe(n, "left", function () {
          var e = 1 * $("#hdDotX .active").data("index");
          ++e > i.length - 1 && (e = 0), i.eq(e).trigger("click")
        }), a.swipe(n, "right", function () {
          var e = 1 * $("#hdDotX .active").data("index");
          --e < 0 && (e = i.length - 1), i.eq(e).trigger("click")
        }))
      }
      return this
    },
    showQr: function () {
      $(".jsLoadQr").on("mouseover mouseout", function (e) {
        $(".jsPicQr").toggle()
      })
    },
    changeLg: function () {
      "S" == t.SIZE ? $(".jsChangeLg").click(function () {
        $("#ywHdBar").addClass("fixed"), $("#ywLgUl").toggle()
      }) : $(".jsChangeLg").on("mouseover mouseout", function (e) {
        "mouseover" == e.type ? $("#ywIconArr").addClass("active") : "mouseout" == e.type && $("#ywIconArr").removeClass("active"), $("#ywLgUl").toggle()
      })
    },
    scrollBarFixed: function () {
      var e = this,
        a = e.el.header,
        i = e.el.container;
      e.el.hdBar = $("#ywHdBar");
      var s, r = $("#ywMnavBtn"),
        o = $("#ywMnavName");
      e.el.barNav = r;
      var l = 0,
        c = [],
        d = $("#ywMnav > a").each(function (e) {
          var t = this.getAttribute("href");
          /^#/.test(t) && c.push($(t)), location.hash.replace("&", "") == t && (l = e)
        });
      if (a.length)
        if ("S" == t.SIZE) {
          s = e.el.hdBar;
          $(".jsHeader"), $(".jsAppImg");
          i.on("scroll", function (e) {
            var a = $(this).scrollTop();
            document.getElementById("ywFooter").getBoundingClientRect().bottom, $(t).height();
            a <= 0 ? (s.removeClass("fixed"), s.css("opacity", 1), $(".jsKfHeader").removeClass("fixed"), $("#supervise").length > 0 && ($("#ywBarX2").removeClass("yw-bar yw-bar-fixed"), $("#ywHdBar").addClass("fixed"))) : a > 0 && a <= 50 && (s.addClass("fixed"), s.css("opacity", 1), $(".jsKfHeader").addClass("fixed"));
            var i = $.map(c, function (module) {
                return module[0].getBoundingClientRect().top
              }),
              r = $.map(i, function (e) {
                return Math.abs(e)
              }),
              u = Math.min.apply(null, r);
            $.each(i, function (e, t) {
              (0 == e && t > 0 || e == i.length - 1 && t < 0 || Math.abs(t) == u) && (d.removeClass(n), o.html(d.eq(e).addClass(n).html()), l = e)
            })
          }), r.on("touchstart", function () {
            $(this).toggleClass(n)
          })
        } else if (!t.APP) {
        if (0 !== $("#ywBarKeFux").length && i.on("scroll", function () {
            var e = $("#ywBarKeFux")[0].className.split(" ")[0] + "-fixed";
            $(this).scrollTop() <= 0 ? $("#ywBarKeFux").removeClass(e) : $("#ywBarKeFux").addClass(e)
          }), 0 == (s = $("#ywBarX")).length) return e;
        e.el.barX = s;
        var u = s[0].className.split(" ")[0] + "-fixed",
          h = $(".jsJoin"),
          f = function (e, t) {
            d.removeClass(n), d.eq(e).addClass(n);
            var a = d.eq(e).attr("href");
            t && /#/.test(a) && location.replace("#&" + a.split("#")[1]), l = e
          };
        i.on("scroll", function () {
          var t = $(this).scrollTop();
          t <= 0 ? (s.removeClass(u), s.css("opacity", 1), h.removeClass(n)) : (s.addClass(u), s.css("opacity", 1), h.addClass(n)); {
            if (!e.triggerScroll) return t == document.documentElement.scrollHeight - $(window).height() ? (l = c.length - 1, void f(l, !0)) : void(t < c[0].offset().top ? f(0, !0) : $.each(c, function (e, module) {
              var t = module[0];
              l !== e && Math.abs(t.getBoundingClientRect().top) <= 75 && f(e, !0)
            }));
            $.each(c, function (t, a) {
              a[0] == e.triggerScroll && (l = t)
            })
          }
        }), 0 != l && f(l), e.el.container.trigger("scroll")
      }
      return e.isPreload = !0, e
    },
    bookScroll: function () {
      var e = this;
      e.el.copy = $("#ywBookX");
      var a = e.el.copy;
      if (a.length) {
        var n = a.find("ul"),
          i = [{
            el: n.eq(0),
            speed: 30,
            x: 0,
            minX: -3600,
            timer: null
          }, {
            el: n.eq(1),
            speed: 25,
            x: 0,
            minX: -3600,
            timer: null
          }, {
            el: n.eq(2),
            speed: 21,
            x: 0,
            minX: -3600,
            timer: null
          }],
          s = function (e, t) {
            [].map ? e.css({
              msTransform: "translateX(" + t + "px)",
              transform: "translateX(" + t + "px)"
            }) : e.css("marginLeft", t)
          };
        $.each(i, function (e, a) {
          "S" == t.SIZE && (a.minX = -1800);
          var n = a.speed,
            i = 1e3 / 60,
            r = n / 1e3 * i;
          "S" != t.SIZE && r < 1 && (r = 1, i = 1e3 / n), a.timeLoop = i, a.speedLoop = r, a.miniSpeedLoop = r, a.el[0].dataParams = a, a.step = function () {
            clearTimeout(a.timer);
            var e = a.x;
            a.speedInertia && a.speedInertia > a.speedLoop + a.speedLoop ? a.speedInertia = a.speedInertia - (a.speedInertia - a.speedLoop) / (1e3 / a.timeLoop) : (a.speedInertia = a.speedLoop, a.inertiaing = !1), (e -= Math.max(a.speedLoop, a.speedInertia || 0)) < a.minX && (e = 0), a.x = e, s(a.el, e), a.moving || (a.timer = setTimeout(a.step, a.timeLoop))
          }, a.step();
          var o = a.el.html();
          a.el.html(o + o)
        })
      }
    },
    bookShow: function () {
      function e() {
        ++l > 14 && (l = 0), n(l), l != c ? setTimeout(function () {
          e()
        }, 100 / l) : d = !0
      }

      function a() {
        --l < 0 && (l = 14), n(l), l != c ? setTimeout(function () {
          a()
        }, 100 / l) : d = !0
      }

      function n(e) {
        for (var a = 0; a < 7; a++) {
          var n = e - 1 - a;
          n < 0 && (n += 15), s.eq(n).css("transform", "translateX(" + -160 * (a + 1) + "px)translateZ(" + (160 - 110 * a) + "px)");
          var i = e + 1 + a;
          i > 14 && (i -= 15), s.eq(i).css("transform", "translateX(" + 160 * (a + 1) + "px)translateZ(" + (160 - 110 * a) + "px)"), o.css("left", 6.66 * l + "%")
        }
        s.eq(l).css("transform", "translateZ(300px)"), s.css(m), "S" == t.SIZE && s.css(h), s.eq(l).css(f), setTimeout(function () {
          r.hide(), r.eq(l).css("display", "block")
        }, 500)
      }
      var i = this,
        s = $("#ywBookShow img"),
        r = $("#ywBookMsg li"),
        o = $("#tabBookLine"),
        l = 7,
        c = 0,
        d = !0,
        u = null,
        h = {
          msFilter: "brightness(60%)",
          filter: "brightness(60%)",
          webkitFilter: "brightness(60%)",
          oFilter: "brightness(60%)",
          mozFilter: "brightness(60%)"
        },
        f = {
          msFilter: "brightness(100%)",
          filter: "brightness(100%)",
          webkitFilter: "brightness(100%)",
          oFilter: "brightness(100%)",
          mozFilter: "brightness(100%)"
        },
        m = {
          msFilter: "brightness(70%)",
          filter: "brightness(70%)",
          webkitFilter: "brightness(70%)",
          oFilter: "brightness(70%)",
          mozFilter: "brightness(70%)"
        };
      if (n(l), "S" == t.SIZE) {
        var p = $("#ywBookShow img");
        i.swipe(p, "left", function (e) {
          var t = l;
          15 == ++t && (t = 0), s.eq(t).trigger("click")
        }), i.swipe(p, "right", function (e) {
          var t = l;
          t--, s.eq(t).trigger("click")
        })
      }
      var u = setInterval(v, 6e3),
        v = function () {
          var e = l;
          ++e >= 15 && (e = 0), s.eq(e).trigger("click")
        };
      u = setInterval(v, 6e3);
      for (var g = 0; g < s.length; g++) s[g].index = g, s[g].onclick = function () {
        if ((c = this.index) == l) return !1;
        d && (d = !1, c > l ? c - l < 8 ? e() : a() : c + 15 - l < 8 ? e() : a(), clearInterval(u), u = setInterval(v, 6e3))
      };
      s.css(m), s.eq(l).css(f), s.on("mouseenter", function () {
        var e = this.index;
        s.eq(e).css(f)
      }).on("mouseleave", function () {
        this.index;
        s.css(m), s.eq(l).css(f)
      })
    },
    tapHomeCopy: function () {
      var a = this;
      a.el.copy = $("#ywCopyX");
      var i = null,
        s = null,
        r = a.el.copy;
      if (r.length) {
        var o = r.find("ul"),
          l = [{
            el: o.eq(0),
            speed: 30,
            x: 0,
            minX: -3600,
            timer: null
          }, {
            el: o.eq(1),
            speed: 20,
            x: 0,
            minX: -3600,
            timer: null
          }],
          c = {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup"
          };
        "S" == t.SIZE && (c = {
          start: "touchstart",
          move: "touchmove",
          end: "touchend"
        });
        var d = function (e, t) {
          [].map ? e.css({
            msTransform: "translateX(" + t + "px)",
            transform: "translateX(" + t + "px)"
          }) : e.css("marginLeft", t)
        };
        return $.each(l, function (a, o) {
          "S" == t.SIZE && (o.minX = -1800);
          var l = o.speed,
            u = 1e3 / 60,
            h = l / 1e3 * u;
          "S" != t.SIZE && h < 1 && (h = 1, u = 1e3 / l), o.timeLoop = u, o.speedLoop = h, o.miniSpeedLoop = h, o.el[0].dataParams = o, o.step = function () {
            clearTimeout(o.timer);
            var e = o.x;
            o.speedInertia && o.speedInertia > o.speedLoop + o.speedLoop ? o.speedInertia = o.speedInertia - (o.speedInertia - o.speedLoop) / (1e3 / o.timeLoop) : (o.speedInertia = o.speedLoop, o.inertiaing = !1), (e -= Math.max(o.speedLoop, o.speedInertia || 0)) < o.minX && (e = 0), o.x = e, d(o.el, e), o.moving || (o.timer = setTimeout(o.step, o.timeLoop))
          }, o.step();
          var f = o.el.html();
          if (o.el.html(f + f), "S" !== t.SIZE && o.el.on("mouseenter", function () {
              o.inertiaing || clearTimeout(o.timer)
            }).on("mouseleave", function () {
              o.moving || o.inertiaing || o.step()
            }), o.el.on(c.start, function (t) {
              var a = t.touches && t.touches[0] || t;
              o.startX = a.pageX, o.timestamp = +new Date, o.moving = !0, e.currentActiveElement = this, e.targetParams = o
            }), $(e).on(c.move, function (t) {
              var a = e.targetParams;
              if (a && a.el[0] === e.currentActiveElement) {
                var n = (t.touches && t.touches[0] || t).pageX - a.startX;
                if (a.moving && t.preventDefault(), !(n >= 0) && a.moving) {
                  a.moveX = n;
                  var i = a.x + n;
                  i < a.minX && (i = 0), a.targetX = i, d(a.el, i)
                }
              }
            }).on(c.end, function () {
              var t = e.targetParams;
              if (t && t.moving) {
                var a = +new Date - t.timestamp,
                  n = t.moveX;
                t.moving = !1;
                var i = -1 * t.speedLoop * n / a;
                Math.abs(n) > 5 && (t.inertiaing = !0, t.speedInertia = 10 * i, t.x = t.targetX), t.step()
              }
            }), "S" == t.SIZE) {
            var m = {
              x: 0,
              y: 0
            };
            r.find("li > div").on({
              touchstart: function (e) {
                var t = e.touches[0] || e;
                m = {
                  x: t.pageX,
                  y: t.pageY
                };
                var a = this;
                s = a, i = setTimeout(function () {
                  s == a && $(a).addClass(n)
                }, 500)
              }
            }), $(e).on("touchend", function () {
              clearTimeout(i), s = null, r.find(".active").removeClass(n)
            }).on("touchmove", function (e) {
              var t = e.touches[0] || e;
              (Math.abs(t.pageX - m.x) > 5 || Math.abs(t.pageY - m.y) > 5) && clearTimeout(i)
            })
          }
        }), a
      }
    },
    swipeMore: function () {
      var e = this,
        t = $("#tabNewLine"),
        a = $("#ywNewsUl"),
        n = ($(".jsNewsLi"), 0),
        i = $("#ywContactUl");
      $(".jsContactLi"), e.el.container;
      e.swipe(a, "left", function () {
        ++n > 3 && (n = 3), a.css("left", "-" + 310 * n + "px"), t.css("marginLeft", 25 * n + "%")
      }), e.swipe(a, "right", function () {
        --n < 0 && (n = 0), a.css("left", "-" + 310 * n + "px"), t.css("marginLeft", 25 * n + "%")
      }), e.swipe(i, "left", function () {
        2 == ++n ? $(".jsContactI").css("display", "none") : $(".jsContactI").css("display", "block"), n > 2 && (n = 2), i.css("left", "-" + 240 * n + "px")
      }), e.swipe(i, "right", function () {
        --n < 0 && (n = 0), i.css("left", "-" + 240 * n + "px")
      })
    },
    getNews: function () {
      var a = this,
        n = a.urlNewsList,
        i = $("#tempNews"),
        s = i.parent(),
        r = $("#newsLoading"),
        o = i.html();
      $.template = function (e, t) {
        return e.replace(/\$\w+\$/gi, function (e) {
          var a = t[e.replace(/\$/g, "")];
          return a + "" == "undefined" ? "" : a
        })
      };
      var l = function (e) {
          return $.map(e, function (e) {
            return $.each(e, function (t, a) {
              e[t] = a.replace(/<|&|>/g, function (e) {
                return {
                  "<": "&lt;",
                  ">": "&gt;",
                  "&": "&amp;"
                }[e]
              }), "created_at" == t ? e[t] = e[t].split(" ")[0] : "desc" == t && (e[t] = e[t].replace(/\r|\n/g, "<br>"))
            }), $.template(o, e)
          }).join("")
        },
        c = $("#ywNewslay"),
        d = c.children("div");
      c.delegate(".jsShut", "click", function () {
        c.hide(), "S" != t.SIZE && (e.documentElement.style.overflow = "", $(e.body).css("border-right", "0"))
      });
      var u = function (e) {
        return '<p class="yw-news-fn">' + e + "</p>"
      }("已全部加载完毕");
      if (s.delegate("a[data-page]", "click", function () {
          var i = {
            more: 1,
            page: $(this).attr("data-page")
          };
          if (c.show(), "S" != t.SIZE) {
            var s = 17;
            "number" == typeof t.innerWidth && (s = t.innerWidth - e.documentElement.clientWidth), e.documentElement.style.overflow = "hidden", $(e.body).css("border-right", s + "px solid transparent")
          }
          var r = "yw-news-lay";
          d.hasClass(r) || $.ajax({
            url: n,
            dataType: "json",
            data: i,
            success: function (e) {
              if (0 == e.code) {
                var n = "",
                  i = [];
                if (e.data && e.data.listInfo) {
                  i = e.data.listInfo;
                  var s = e.data.pageInfo || {
                    totalCount: 0,
                    pageIndex: 1,
                    pageNum: 2,
                    pageMax: 1
                  };
                  if (n = l(i), s.pageIndex < s.pageMax) {
                    n += ""
                  } else n += u
                } else n = l(a.jsonNews);
                d.addClass(r), "S" == t.SIZE ? d.css({
                  width: window.innerWidth - 20,
                  height: window.innerHeight - 20
                }) : d.css({
                  width: 560,
                  height: "90%"
                }), n = '<a href="javascript:" class="' + r + '-shut jsShut">×</a><div class="' + r + '-x">' + n + "</div>", history.pushState ? setTimeout(function () {
                  d.html(n)
                }, 250) : d.html(n)
              } else d.html('<div class="error">' + (e.msg || "网络异常，稍后重试") + "</div>")
            },
            error: function () {
              d.html('<div class="error">网络异常，稍后重试</div>')
            }
          })
        }), n) {
        var h = "新闻内容没能获取成功，" + ([].map ? '<a href="javascript:" onclick="$(this).parent().empty();YUEWEN.getNews();" style="color:#019EE4;">点击这里</a>重试。' : '<a href="">刷新</a>重试。');
        $.ajax({
          url: n,
          dataType: "json",
          success: function (e) {
            0 == e.code ? e.data && e.data.length ? (s.html(l(e.data) + '<a href="javascript:" class="yw-news-btn" data-page="1">查看更多新闻</a>'), a.jsonNews = e.data) : r.html("新闻已下架，编辑正在更新内容，请稍等...") : r.html(e.msg || h)
          },
          error: function () {
            r.html(h)
          }
        })
      }
      return a
    },
    changeInvest: function () {
      var e = $("#jsInvest");
      "S" == t.SIZE && e.length > 0 && e.html(e.html().replace(/<br\/?>/gi, ""));
      var a = $("#ywFooterMore");
      "S" == t.SIZE && a.length > 0 && ($("#ywFooterMore").css("line-height", "18px"), $("#ywFooter").css("height", "70px"), a.html('<a href="./supervise.html" target="_blank"><b>舞弊监督举报</b></a> | 舞弊举报电话：021-61870509<br/>内容举报电话：13785633681；010-59357051'))
    },
    scrollAnimate: function () {
      var e = this,
        t = e.el.container,
        a = (e.el.inPage, document.getElementsByClassName("jsSlideApp")),
        n = $(".jsAppUl li");
      window.onload = function () {
        e.inPage(a[0]) || e.inPage(a[1]) || e.inPage(a[2]) || e.inPage(a[3]) ? t.trigger("scroll") : $("#tabApp a").click(function () {
          $(".jsAppUl li").removeClass("yw-slide-s yw-slide-m yw-slide-l yw-slide-xl")
        })
      }, t.on("scroll", function (t) {
        for (var i = 0; i <= 2; i++) e.inPage(a[i]) && (n.eq(3 * i + 0).addClass("yw-slide-s"), n.eq(3 * i + 1).addClass("yw-slide-m"), n.eq(3 * i + 2).addClass("yw-slide-l"));
        e.inPage(a[2]) ? n.eq(9).addClass("yw-slide-xl") : e.inPage(a[3]) && (n.eq(10).addClass("yw-slide-s"), n.eq(11).addClass("yw-slide-m"), n.eq(12).addClass("yw-slide-l"))
      })
    },
    inPage: function (e) {
      var t = (e = e).getBoundingClientRect(),
        a = t.bottom,
        n = t.top,
        i = t.left,
        s = t.right,
        r = window.innerHeight;
      if (a > 0 && n < r && i > 0 && s > 0) return !0
    },
    showImage: function (e) {
      var a = this,
        i = a.el.overlay;
      if (i) {
        if (i.data("lasturl") === e) return void i.addClass(n).show();
        i.html(i.data("origin"))
      } else(i = $("#ywOverlay")).data("origin", i.html()).on("click", function () {
        $(this).removeClass(n).hide()
      }), a.el.overlay = i;
      var s = i.children("div").removeAttr("style");
      i.show();
      var r = new Image;
      return r.onload = function () {
        var a = this.width,
          n = this.height;
        setTimeout(function () {
          s.css({
            width: a,
            height: n
          }).html('<img src="' + e + '">'), i.data("lasturl", e), "S" == t.SIZE && (s.css({
            width: 200,
            height: 200
          }), s.find("img").css({
            width: 200,
            height: 200
          }))
        }, 200)
      }, r.onerror = function () {
        s.html('<div class="error">图片显示异常，请重试</div>')
      }, r.src = e, this
    },
    scrollIntoView: function (e, a, n) {
      var i = this,
        s = i.el.container,
        r = "scroll" + (n = n || "top").slice(0, 1).toUpperCase() + n.slice(1, n.length);
      if (e && e.length) {
        clearTimeout(i.timerScroll);
        var o = s[r](),
          l = e.offset()[n] + o;
        "S" == t.SIZE ? l -= 50 : t.APP || (l = e.offset()[n] - 74);
        var c = o,
          d = function () {
            var t = (l - c) / 10;
            Math.abs(t) < .1 ? (s[r](l), $.isFunction(a) && a.call(e[0])) : (c += t, s[r](c), i.timerScroll = setTimeout(d, 20))
          };
        d()
      }
      return i
    },
    scrollSupervise: function () {
      $("#supervise").length > 0 && ("S" == t.SIZE ? ($("#ywBarX2").removeClass("yw-bar yw-bar-fixed"), $("#ywHdBar").addClass("fixed"), $("#ywHeader").css("display", "block")) : ($("#ywHeader").css("display", "none"), $("#ywBarX2").addClass("yw-bar-fixed"), $(".jsJoin").removeClass("active")));
      var e = window.location.href; - 1 !== e.indexOf("?from=supervise") && "S" == t.SIZE && ($("#ywHdBar").addClass("fixed"), -1 !== e.indexOf("?from=supervise1") ? $("#ywMnavName").html("全版权运营") : -1 !== e.indexOf("?from=supervise2") ? $("#ywMnavName").html("移动产品") : -1 !== e.indexOf("?from=supervise3") ? $("#ywMnavName").html("旗下品牌") : -1 !== e.indexOf("?from=supervise4") ? $("#ywMnavName").html("投资者关系") : -1 !== e.indexOf("?from=supervise5") ? $("#ywMnavName").html("新闻中心") : -1 !== e.indexOf("?from=supervise6") && $("#ywMnavName").html("联系我们"))
    },
    kfLogin: function () {
      function e() {
        $(".jsLoginKeFu").hide(), $(".jsLogoutKeFu").removeAttr("hidden");
        var e = document.cookie,
          t = encodeURIComponent(e.split("ywnickname=")[1].split(";")[0]),
          a = e.split("ywguid=")[1].split(";")[0];
        $(".jsOnlineAsk").css("display", "block");
        var n = "http://yw.95ib.com/online?uid=435&userid=" + a + "-" + t;
        $(".jsOnlineAsk").attr("href", n)
      }

      function t() {
        $(".jsLoginKeFu").show(), $(".jsLogoutKeFu").attr("hidden", ""), $(".jsOnlineAsk").attr("href", "javascript:"), $(".jsOnlineAsk").addClass("jsLoginKeFu");
        for (var e = document.querySelectorAll(".jsLoginKeFu"), t = 0; t < e.length; t++) e[t].setAttribute("href", ywLogin.getLoginUrl())
      }
      ywLogin.init({
        env: "dev",
        appId: 36,
        areaId: 1,
        isLogin: !1,
        loginApi: "passport.yuewen.com/yuewen.html",
        returnUrl: "//www.yuewen.com/service.html",
        success: function () {
          e()
        },
        logout: function () {
          t()
        },
        autoSuccess: function () {
          e()
        }
      }).autoLogin();
      for (var a = document.querySelectorAll(".jsLoginKeFu"), n = 0; n < a.length; n++) a[n].setAttribute("href", ywLogin.getLoginUrl());
      for (var i = document.querySelectorAll(".jsLogoutKeFu"), n = 0; n < i.length; n++) i[n].addEventListener("click", function () {
        ywLogin.logout().subscribe("logoutError", function (e) {
          alert(e.message)
        })
      })
    },
    eventsGlobal: function () {
      var a = this;
      return $(e).delegate("a", "click", function (e) {
        var i = this.getAttribute("href");
        this.href;
        /^#/.test(i) ? (a.scrollIntoView($(i), function () {
          "S" != t.SIZE && (location.replace("#&" + i.split("#")[1]), a.triggerScroll = null)
        }), "S" == t.SIZE || /nav/.test(this.className) && (a.triggerScroll = this, $(this).addClass(n).siblings("a").removeClass(n)), e.preventDefault()) : /\.(?:png|jpg)$/.test(i) ? (a.showImage(i), e.preventDefault()) : /#/.test(i) && ($(this).parent().find(".active").removeClass(n), $(this).addClass(n))
      }), this.scrollLoading($("img[data-src]")), a
    },
    getKfNotice: function () {
      var e = this,
        t = e.urlKfNotice,
        a = $("#tempNotice"),
        n = a.parent(),
        i = $("#noticeLoading"),
        s = a.html();
      $.template = function (e, t) {
        return e.replace(/\$\w+\$/gi, function (e) {
          var a = t[e.replace(/\$/g, "")];
          return a + "" == "undefined" ? "" : a
        })
      };
      var r = function (e) {
        return $.map(e, function (e) {
          return $.each(e, function (t, a) {
            "id" != t && (e[t] = a.replace(/<|&|>/g, function (e) {
              return {
                "<": "&lt;",
                ">": "&gt;",
                "&": "&amp;"
              }[e]
            }), "createTime" == t ? e[t] = e[t].split(" ")[0] : "desc" == t && (e[t] = e[t].replace(/\r|\n/g, "<br>")))
          }), $.template(s, e)
        }).join("")
      };
      if (t) {
        var o = "新闻内容没能获取成功，" + ([].map ? '<a href="javascript:" onclick="$(this).parent().empty();YUEWEN.getNews();" style="color:#019EE4;">点击这里</a>重试。' : '<a href="">刷新</a>重试。'),
          l = {
            page: 1
          };
        $.ajax({
          url: t,
          dataType: "json",
          data: l,
          success: function (t) {
            0 == t.code ? t.data.listInfo && t.data.listInfo.length ? (n.html(r(t.data.listInfo)), e.jsonNews = t.data.listInfo) : i.html("新闻已下架，编辑正在更新内容，请稍等...") : i.html(t.msg || o)
          },
          error: function () {
            i.html(o)
          }
        })
      }
    },
    getKfNews: function () {
      var a = this,
        n = a.urlKfNewsList,
        i = $("#tempKfNews"),
        s = i.parent(),
        r = $("#hotLoading"),
        o = i.html(),
        l = function (e) {
          return '<p class="yw-news-fn">' + e + "</p>"
        }("已全部加载完毕");
      $.template = function (e, t) {
        return e.replace(/\$\w+\$/gi, function (e) {
          var a = t[e.replace(/\$/g, "")];
          return a + "" == "undefined" ? "" : a
        })
      };
      var c = function (e) {
          return $.map(e, function (e) {
            return $.each(e, function (t, a) {
              "id" != t && (e[t] = a.replace(/<|&|>/g, function (e) {
                return {
                  "<": "&lt;",
                  ">": "&gt;",
                  "&": "&amp;"
                }[e]
              }), "createTime" == t ? e[t] = e[t].split(" ")[0] : "desc" == t && (e[t] = e[t].replace(/\r|\n/g, "<br>")))
            }), $.template(o, e)
          }).join("")
        },
        d = $("#ywNewslay"),
        u = d.children("div");
      if (!u.hasClass("yw-news-lay") && (d.delegate(".jsShut", "click", function () {
          d.hide(), "S" != t.SIZE && (e.documentElement.style.overflow = "", $(e.body).css("border-right", "0"))
        }), s.delegate("a[data-page]", "click", function () {
          var i = {
            page: $(this).attr("data-page")
          };
          if (d.show(), "S" != t.SIZE) {
            var s = 17;
            "number" == typeof t.innerWidth && (s = t.innerWidth - e.documentElement.clientWidth), e.documentElement.style.overflow = "hidden", $(e.body).css("border-right", s + "px solid transparent")
          }
          var r = "yw-news-lay";
          u.hasClass(r) || $.ajax({
            url: n,
            dataType: "json",
            data: i,
            success: function (e) {
              if (0 == e.code) {
                var n = "",
                  i = [];
                if (e.data && e.data.listInfo) {
                  i = e.data.listInfo;
                  var s = e.data.pageInfo || {
                    totalCount: 0,
                    pageIndex: 1,
                    pageNum: 2,
                    pageMax: 2
                  };
                  if (n = c(i), s.pageIndex < s.pageMax) {
                    n += ""
                  } else n += l
                } else n = c(a.jsonNews);
                u.addClass(r), "S" == t.SIZE ? u.css({
                  width: window.innerWidth - 20,
                  height: window.innerHeight - 20
                }) : u.css({
                  width: 560,
                  height: "90%"
                }), n = '<a href="javascript:" class="' + r + '-shut jsShut">×</a><div class="' + r + '-x">' + n + "</div>", history.pushState ? setTimeout(function () {
                  u.html(n)
                }, 250) : u.html(n)
              } else u.html('<div class="error">' + (e.msg || "网络异常，稍后重试") + "</div>")
            },
            error: function () {
              u.html('<div class="error">网络异常，稍后重试</div>')
            }
          })
        }), n)) {
        var h = "新闻内容没能获取成功，" + ([].map ? '<a href="javascript:" onclick="$(this).parent().empty();YUEWEN.getNews();" style="color:#019EE4;">点击这里</a>重试。' : '<a href="">刷新</a>重试。');
        $.ajax({
          url: n,
          dataType: "json",
          success: function (e) {
            0 == e.code ? e.data.listInfo && e.data.listInfo.length ? (s.html(c(e.data.listInfo) + '<a href="javascript:" class="yw-news-more-btn" data-page="1">查看更多新闻</a>'), a.jsonNews = e.data.listInfo) : r.html("新闻已下架，编辑正在更新内容，请稍等...") : r.html(e.msg || h)
          },
          error: function () {
            r.html(h)
          }
        })
      }
    },
    showkfEmail: function () {
      $(".jsKfEmail").on("mouseover mouseout", function (e) {
        $(".jsKfEmail div").toggleClass(n)
      })
    },
    eventsHome: function () {
      var e = this;
      e.slideHomeHeader(), e.scrollBarFixed(), e.slideHomeApp(), e.slideBrand(), e.changeInvest(), e.scrollSupervise(), e.changeLg(), "S" !== t.SIZE && $(".jsJoin").find("span").removeClass("hidden");
      var a;
      return "S" == t.SIZE && (a = e.el.barNav || $("#ywMnavBtn"), $("#ywMnav").click(function () {
        a.removeClass(n)
      })), [].map || ($("#ywBookShow").removeClass("yw-book-show").addClass("yw-book-show-ie"), $(".yw-book-show-pic").removeClass("yw-book-show-pic").addClass("yw-book-show-pic-ie"), $("#copyright").css("height", "570px"), $(".yw-hd-slide-h .yw-hd-slide-p .yw-hd-app-dld .yw-app-shine-li").css("opacity", "1")), e.bookShow(), e.bookScroll(), $("#kefuNews").length ? (e.kfLogin(), e.getKfNotice(), e.getKfNews(), e.showkfEmail()) : $("#news").length && e.getNews(), e.swipeMore(), e
    },
    eventsApp: function () {
      var e = this,
        a = /Android/i,
        i = a.test(navigator.userAgent);
      "S" == t.SIZE && $("a[data-href]").each(function () {
        $(this).attr("href", $(this).attr("data-href")).removeAttr("data-href")
      }), $(".dlBtn").each(function () {
        var e = this;
        "" == e.getAttribute("href") && $(e).siblings("a").each(function () {
          var t = this.innerHTML;
          i && a.test(t) ? e.href = this.href : 0 == i && /ios/i.test(t) && (e.href = this.href)
        })
      }), $(".jsJoinApp").html("加入我们"), e.scrollBarFixed(), e.slideHomeApp(), e.slideHomeHeader(), e.changeInvest(), e.swipeMore(), e.scrollAnimate();
      var s;
      if ("S" == t.SIZE) {
        s = e.el.barNav || $("#ywMnavBtn"), $("#ywMnav").click(function () {
          s.removeClass(n)
        });
        for (var r = 0; r < $(".jsHdApp").length; r++) "block" == window.getComputedStyle($(".jsHdApp").eq(r)[0]).display && $("#ywMnavName").html($(".jsHdApp").eq(r).attr("data-name"));
        $("#ywMnav a").click(function () {
          var e = $(this).attr("href"); - 1 !== ["app.html#appqq", "app.html#appqd", "app.html#appzj", "app.html#appwbn"].indexOf(e) && setTimeout(function () {
            location.reload(!0)
          }, 500)
        })
      }
      var o = 1;
      ![].map && (o = $(t).width() / 1440) > 1 && e.el.header.css("overflow", "hidden").find("s").each(function () {
        $(this).css("zoom", o).css("left", -.5 * $(t).width() * (o - 1))
      });
      var l = e.el.tabApp;
      return l && l.find("a").on({
        mouseenter: function () {
          var e = this,
            t = $(e),
            a = -1,
            n = "";
          e.isPreload || (a = +t.data("index") + 1, (n = $("#hdAPP" + a).find("s").css("background-image")) && (n = n.split('"')[1]) && ((new Image).src = n)), e.isPreload = !0
        }
      }), e
    },
    init: function () {
      function e() {
        var e = $("body").text();
        if (e && /聯係/.test(e))
          for (t = 0; t < $(".jsContact").length; t++) $(".jsContact").eq(t).text($(".jsContact").eq(t).text().replace(/聯係/g, "聯繫"));
        else if (e && /联繫/.test(e))
          for (var t = 0; t < $(".jsContact").length; t++) $(".jsContact").eq(t).text($(".jsContact").eq(t).text().replace(/联繫/g, "联系"))
      }
      var a = this;
      if (a.el.container = "S" == t.SIZE ? $("#ywPage") : $(t), a.el.header = $("#ywHeader"), a.el.dots = $("#hdDotX a"), t.APP ? a.eventsApp() : a.eventsHome(), a.eventsGlobal(), $("#ywLgUl").click(function () {
          setTimeout(function () {
            e()
          }, 10)
        }), setTimeout(function () {
          e()
        }, 5e3), $(".jsContactLi dl").on("mouseenter", function () {
          $(".jsContactBox").removeClass("active");
          this.index;
          $(this).find(".jsContactBox").addClass("active")
        }).on("mouseleave", function () {
          $(".jsContactBox").removeClass("active")
        }), $(document).keydown(function (e) {
          27 == e.keyCode && ($("#ywOverlay").trigger("click"), $(".jsShut").trigger("click"))
        }), "S" == t.SIZE) {
        var n = $(".jsQqread");
        n && (n.attr("title", "QQ阅读书城"), n.attr("href", "//ubook.qq.com/8/mindex.html"), n.html('<dd class="yw-kefu-dd">QQ阅读书城</dd>'), $(".jsQqreadM").html("QQ阅读书城"))
      }
      return $("#ywKfHeader").length && ($(".jsKfFocus").attr("href", "javascript:"), $(".jsKfFocus").click(function () {
        $("#ywOverlay").show(), $("#ywOverlay").find("div").html("<img src=" + $(".jsKfFocus").attr("data-href") + ' class="yw-kefu-wx-pic"/>')
      }), $("#ywOverlay").click(function () {
        $("#ywOverlay").hide()
      })), a
    }
  }
}(document, window);