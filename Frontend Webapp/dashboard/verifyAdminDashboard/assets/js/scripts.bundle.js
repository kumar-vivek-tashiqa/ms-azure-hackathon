this.Element && function(t) {
        t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function(t) {
            for (var e = (this.parentNode || this.document).querySelectorAll(t), a = -1; e[++a] && e[a] != this;);
            return !!e[a]
        }
    }(Element.prototype), this.Element && function(t) {
        t.closest = t.closest || function(t) {
            for (var e = this; e.matches && !e.matches(t);) e = e.parentNode;
            return e.matches ? e : null
        }
    }(Element.prototype), this.Element && function(t) {
        t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function(t) {
            for (var e = (this.parentNode || this.document).querySelectorAll(t), a = -1; e[++a] && e[a] != this;);
            return !!e[a]
        }
    }(Element.prototype),
    function() {
        for (var t = 0, e = ["webkit", "moz"], a = 0; a < e.length && !window.requestAnimationFrame; ++a) window.requestAnimationFrame = window[e[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[a] + "CancelAnimationFrame"] || window[e[a] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
            var a = (new Date).getTime(),
                n = Math.max(0, 16 - (a - t)),
                o = window.setTimeout(function() {
                    e(a + n)
                }, n);
            return t = a + n, o
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(t) {
        t.hasOwnProperty("prepend") || Object.defineProperty(t, "prepend", {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            value: function() {
                var t = Array.prototype.slice.call(arguments),
                    e = document.createDocumentFragment();
                t.forEach(function(t) {
                    var a = t instanceof Node;
                    e.appendChild(a ? t : document.createTextNode(String(t)))
                }), this.insertBefore(e, this.firstChild)
            }
        })
    }), window.mUtilElementDataStore = {}, window.mUtilElementDataStoreID = 0, window.mUtilDelegatedEventHandlers = {};
var mUtil = function() {
    var t = [],
        e = {
            sm: 544,
            md: 768,
            lg: 1024,
            xl: 1200
        },
        a = function() {
            var e = !1;
            window.addEventListener("resize", function() {
                clearTimeout(e), e = setTimeout(function() {
                    ! function() {
                        for (var e = 0; e < t.length; e++) t[e].call()
                    }()
                }, 250)
            })
        };
    return {
        init: function(t) {
            t && t.breakpoints && (e = t.breakpoints), a()
        },
        addResizeHandler: function(e) {
            t.push(e)
        },
        removeResizeHandler: function(e) {
            for (var a = 0; a < t.length; a++) e === t[a] && delete t[a]
        },
        runResizeHandlers: function() {
            _runResizeHandlers()
        },
        resize: function() {
            if ("function" == typeof Event) window.dispatchEvent(new Event("resize"));
            else {
                var t = window.document.createEvent("UIEvents");
                t.initUIEvent("resize", !0, !1, window, 0), window.dispatchEvent(t)
            }
        },
        getURLParam: function(t) {
            var e, a, n = window.location.search.substring(1).split("&");
            for (e = 0; e < n.length; e++)
                if ((a = n[e].split("="))[0] == t) return unescape(a[1]);
            return null
        },
        isMobileDevice: function() {
            return this.getViewPort().width < this.getBreakpoint("lg")
        },
        isDesktopDevice: function() {
            return !mUtil.isMobileDevice()
        },
        getViewPort: function() {
            var t = window,
                e = "inner";
            return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
                width: t[e + "Width"],
                height: t[e + "Height"]
            }
        },
        isInResponsiveRange: function(t) {
            var e = this.getViewPort().width;
            return "general" == t || ("desktop" == t && e >= this.getBreakpoint("lg") + 1 || ("tablet" == t && e >= this.getBreakpoint("md") + 1 && e < this.getBreakpoint("lg") || ("mobile" == t && e <= this.getBreakpoint("md") || ("desktop-and-tablet" == t && e >= this.getBreakpoint("md") + 1 || ("tablet-and-mobile" == t && e <= this.getBreakpoint("lg") || "minimal-desktop-and-below" == t && e <= this.getBreakpoint("xl"))))))
        },
        getUniqueID: function(t) {
            return t + Math.floor(Math.random() * (new Date).getTime())
        },
        getBreakpoint: function(t) {
            return e[t]
        },
        isset: function(t, e) {
            var a;
            if (-1 !== (e = e || "").indexOf("[")) throw new Error("Unsupported object path notation.");
            e = e.split(".");
            do {
                if (void 0 === t) return !1;
                if (a = e.shift(), !t.hasOwnProperty(a)) return !1;
                t = t[a]
            } while (e.length);
            return !0
        },
        getHighestZindex: function(t) {
            for (var e, a, n = mUtil.get(t); n && n !== document;) {
                if (("absolute" === (e = mUtil.css(n, "position")) || "relative" === e || "fixed" === e) && (a = parseInt(mUtil.css(n, "z-index")), !isNaN(a) && 0 !== a)) return a;
                n = n.parentNode
            }
            return null
        },
        hasFixedPositionedParent: function(t) {
            for (; t && t !== document;) {
                if (position = mUtil.css(t, "position"), "fixed" === position) return !0;
                t = t.parentNode
            }
            return !1
        },
        sleep: function(t) {
            for (var e = (new Date).getTime(), a = 0; a < 1e7 && !((new Date).getTime() - e > t); a++);
        },
        getRandomInt: function(t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t
        },
        isAngularVersion: function() {
            return void 0 !== window.Zone
        },
        deepExtend: function(t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                if (a)
                    for (var n in a) a.hasOwnProperty(n) && ("object" == typeof a[n] ? t[n] = mUtil.deepExtend(t[n], a[n]) : t[n] = a[n])
            }
            return t
        },
        extend: function(t) {
            t = t || {};
            for (var e = 1; e < arguments.length; e++)
                if (arguments[e])
                    for (var a in arguments[e]) arguments[e].hasOwnProperty(a) && (t[a] = arguments[e][a]);
            return t
        },
        get: function(t) {
            var e;
            return t === document ? document : t && 1 === t.nodeType ? t : (e = document.getElementById(t)) ? e : (e = document.getElementsByTagName(t)) ? e[0] : (e = document.getElementsByClassName(t)) ? e[0] : null
        },
        getByClass: function(t) {
            var e;
            return (e = document.getElementsByClassName(t)) ? e[0] : null
        },
        hasClasses: function(t, e) {
            if (t) {
                for (var a = e.split(" "), n = 0; n < a.length; n++)
                    if (0 == mUtil.hasClass(t, mUtil.trim(a[n]))) return !1;
                return !0
            }
        },
        hasClass: function(t, e) {
            if (t) return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
        },
        addClass: function(t, e) {
            if (t && void 0 !== e) {
                var a = e.split(" ");
                if (t.classList)
                    for (var n = 0; n < a.length; n++) a[n] && a[n].length > 0 && t.classList.add(mUtil.trim(a[n]));
                else if (!mUtil.hasClass(t, e))
                    for (n = 0; n < a.length; n++) t.className += " " + mUtil.trim(a[n])
            }
        },
        removeClass: function(t, e) {
            if (t) {
                var a = e.split(" ");
                if (t.classList)
                    for (var n = 0; n < a.length; n++) t.classList.remove(mUtil.trim(a[n]));
                else if (mUtil.hasClass(t, e))
                    for (n = 0; n < a.length; n++) t.className = t.className.replace(new RegExp("\\b" + mUtil.trim(a[n]) + "\\b", "g"), "")
            }
        },
        triggerCustomEvent: function(t, e, a) {
            if (window.CustomEvent) var n = new CustomEvent(e, {
                detail: a
            });
            else(n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, a);
            t.dispatchEvent(n)
        },
        trim: function(t) {
            return t.trim()
        },
        eventTriggered: function(t) {
            return !!t.currentTarget.dataset.triggered || (t.currentTarget.dataset.triggered = !0, !1)
        },
        remove: function(t) {
            t && t.parentNode && t.parentNode.removeChild(t)
        },
        find: function(t, e) {
            return t.querySelector(e)
        },
        findAll: function(t, e) {
            return t.querySelectorAll(e)
        },
        insertAfter: function(t, e) {
            return e.parentNode.insertBefore(t, e.nextSibling)
        },
        parents: function(t, e) {
            function a(t, e) {
                for (var a = 0, n = t.length; a < n; a++)
                    if (t[a] == e) return !0;
                return !1
            }
            return function(t, e) {
                for (var n = document.querySelectorAll(e), o = t.parentNode; o && !a(n, o);) o = o.parentNode;
                return o
            }(t, e)
        },
        children: function(t, e, a) {
            if (t && t.childNodes) {
                for (var n = [], o = 0, i = t.childNodes.length; o < i; ++o) 1 == t.childNodes[o].nodeType && mUtil.matches(t.childNodes[o], e, a) && n.push(t.childNodes[o]);
                return n
            }
        },
        child: function(t, e, a) {
            var n = mUtil.children(t, e, a);
            return n ? n[0] : null
        },
        matches: function(t, e, a) {
            var n = Element.prototype,
                o = n.matches || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || function(t) {
                    return -1 !== [].indexOf.call(document.querySelectorAll(t), this)
                };
            return !(!t || !t.tagName) && o.call(t, e)
        },
        data: function(t) {
            return t = mUtil.get(t), {
                set: function(e, a) {
                    void 0 === t.customDataTag && (mUtilElementDataStoreID++, t.customDataTag = mUtilElementDataStoreID), void 0 === mUtilElementDataStore[t.customDataTag] && (mUtilElementDataStore[t.customDataTag] = {}), mUtilElementDataStore[t.customDataTag][e] = a
                },
                get: function(e) {
                    return this.has(e) ? mUtilElementDataStore[t.customDataTag][e] : null
                },
                has: function(e) {
                    return !(!mUtilElementDataStore[t.customDataTag] || !mUtilElementDataStore[t.customDataTag][e])
                },
                remove: function(e) {
                    this.has(e) && delete mUtilElementDataStore[t.customDataTag][e]
                }
            }
        },
        outerWidth: function(t, e) {
            if (!0 === e) {
                var a = parseFloat(t.offsetWidth);
                return a += parseFloat(mUtil.css(t, "margin-left")) + parseFloat(mUtil.css(t, "margin-right")), parseFloat(a)
            }
            return a = parseFloat(t.offsetWidth)
        },
        offset: function(t) {
            var e, a;
            if (t = mUtil.get(t)) return t.getClientRects().length ? (e = t.getBoundingClientRect(), a = t.ownerDocument.defaultView, {
                top: e.top + a.pageYOffset,
                left: e.left + a.pageXOffset
            }) : {
                top: 0,
                left: 0
            }
        },
        height: function(t) {
            return mUtil.css(t, "height")
        },
        visible: function(t) {
            return !(0 === t.offsetWidth && 0 === t.offsetHeight)
        },
        attr: function(t, e, a) {
            if (null != (t = mUtil.get(t))) return void 0 === a ? t.getAttribute(e) : void t.setAttribute(e, a)
        },
        hasAttr: function(t, e) {
            if (null != (t = mUtil.get(t))) return !!t.getAttribute(e)
        },
        removeAttr: function(t, e) {
            null != (t = mUtil.get(t)) && t.removeAttribute(e)
        },
        animate: function(t, e, a, n, o, i) {
            var l = {};
            if (l.linear = function(t, e, a, n) {
                    return a * t / n + e
                }, o = l.linear, "number" == typeof t && "number" == typeof e && "number" == typeof a && "function" == typeof n) {
                "function" != typeof i && (i = function() {});
                var r = window.requestAnimationFrame || function(t) {
                        window.setTimeout(t, 20)
                    },
                    s = e - t;
                n(t);
                var d = window.performance && window.performance.now ? window.performance.now() : +new Date;
                r(function l(c) {
                    var m = (c || +new Date) - d;
                    m >= 0 && n(o(m, t, s, a)), m >= 0 && m >= a ? (n(e), i()) : r(l)
                })
            }
        },
        actualCss: function(t, e, a) {
            var n;
            if (t instanceof HTMLElement != !1) return t.getAttribute("m-hidden-" + e) && !1 !== a ? parseFloat(t.getAttribute("m-hidden-" + e)) : (t.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" == e ? n = t.offsetWidth : "height" == e && (n = t.offsetHeight), t.style.cssText = "", t.setAttribute("m-hidden-" + e, n), parseFloat(n))
        },
        actualHeight: function(t, e) {
            return mUtil.actualCss(t, "height", e)
        },
        actualWidth: function(t, e) {
            return mUtil.actualCss(t, "width", e)
        },
        getScroll: function(t, e) {
            return e = "scroll" + e, t == window || t == document ? self["scrollTop" == e ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[e] || document.body[e] : t[e]
        },
        css: function(t, e, a) {
            if (t = mUtil.get(t))
                if (void 0 !== a) t.style[e] = a;
                else {
                    var n = (t.ownerDocument || document).defaultView;
                    if (n && n.getComputedStyle) return e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(t, null).getPropertyValue(e);
                    if (t.currentStyle) return e = e.replace(/\-(\w)/g, function(t, e) {
                        return e.toUpperCase()
                    }), a = t.currentStyle[e], /^\d+(em|pt|%|ex)?$/i.test(a) ? function(e) {
                        var a = t.style.left,
                            n = t.runtimeStyle.left;
                        return t.runtimeStyle.left = t.currentStyle.left, t.style.left = e || 0, e = t.style.pixelLeft + "px", t.style.left = a, t.runtimeStyle.left = n, e
                    }(a) : a
                }
        },
        slide: function(t, e, a, n, o) {
            if (!(!t || "up" == e && !1 === mUtil.visible(t) || "down" == e && !0 === mUtil.visible(t))) {
                a = a || 600;
                var i = mUtil.actualHeight(t),
                    l = !1,
                    r = !1;
                mUtil.css(t, "padding-top") && !0 !== mUtil.data(t).has("slide-padding-top") && mUtil.data(t).set("slide-padding-top", mUtil.css(t, "padding-top")), mUtil.css(t, "padding-bottom") && !0 !== mUtil.data(t).has("slide-padding-bottom") && mUtil.data(t).set("slide-padding-bottom", mUtil.css(t, "padding-bottom")), mUtil.data(t).has("slide-padding-top") && (l = parseInt(mUtil.data(t).get("slide-padding-top"))), mUtil.data(t).has("slide-padding-bottom") && (r = parseInt(mUtil.data(t).get("slide-padding-bottom"))), "up" == e ? (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(e) {
                    t.style.paddingTop = l - e + "px"
                }, "linear"), r && mUtil.animate(0, r, a, function(e) {
                    t.style.paddingBottom = r - e + "px"
                }, "linear"), mUtil.animate(0, i, a, function(e) {
                    t.style.height = i - e + "px"
                }, "linear", function() {
                    n(), t.style.height = "", t.style.display = "none"
                })) : "down" == e && (t.style.cssText = "display: block; overflow: hidden;", l && mUtil.animate(0, l, a, function(e) {
                    t.style.paddingTop = e + "px"
                }, "linear", function() {
                    t.style.paddingTop = ""
                }), r && mUtil.animate(0, r, a, function(e) {
                    t.style.paddingBottom = e + "px"
                }, "linear", function() {
                    t.style.paddingBottom = ""
                }), mUtil.animate(0, i, a, function(e) {
                    t.style.height = e + "px"
                }, "linear", function() {
                    n(), t.style.height = "", t.style.display = "", t.style.overflow = ""
                }))
            }
        },
        slideUp: function(t, e, a) {
            mUtil.slide(t, "up", e, a)
        },
        slideDown: function(t, e, a) {
            mUtil.slide(t, "down", e, a)
        },
        show: function(t, e) {
            t.style.display = e || "block"
        },
        hide: function(t) {
            t.style.display = "none"
        },
        addEvent: function(t, e, a, n) {
            void 0 !== (t = mUtil.get(t)) && t.addEventListener(e, a)
        },
        removeEvent: function(t, e, a) {
            (t = mUtil.get(t)).removeEventListener(e, a)
        },
        on: function(t, e, a, n) {
            if (e) {
                var o = mUtil.getUniqueID("event");
                return mUtilDelegatedEventHandlers[o] = function(a) {
                    for (var o = t.querySelectorAll(e), i = a.target; i && i !== t;) {
                        for (var l = 0, r = o.length; l < r; l++) i === o[l] && n.call(i, a);
                        i = i.parentNode
                    }
                }, mUtil.addEvent(t, a, mUtilDelegatedEventHandlers[o]), o
            }
        },
        off: function(t, e, a) {
            t && mUtilDelegatedEventHandlers[a] && (mUtil.removeEvent(t, e, mUtilDelegatedEventHandlers[a]), delete mUtilDelegatedEventHandlers[a])
        },
        one: function(t, e, a) {
            (t = mUtil.get(t)).addEventListener(e, function(t) {
                return t.target.removeEventListener(t.type, arguments.callee), a(t)
            })
        },
        hash: function(t) {
            var e, a = 0;
            if (0 === t.length) return a;
            for (e = 0; e < t.length; e++) a = (a << 5) - a + t.charCodeAt(e), a |= 0;
            return a
        },
        animateClass: function(t, e, a) {
            mUtil.addClass(t, "animated " + e), mUtil.one(t, "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                mUtil.removeClass(t, "animated " + e)
            }), a && mUtil.one(t.animationEnd, a)
        },
        animateDelay: function(t, e) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(t, a[n] + "animation-delay", e)
        },
        animateDuration: function(t, e) {
            for (var a = ["webkit-", "moz-", "ms-", "o-", ""], n = 0; n < a.length; n++) mUtil.css(t, a[n] + "animation-duration", e)
        },
        scrollTo: function(t, e, a) {
            a = a || 500;
            var n, o, i = (t = mUtil.get(t)) ? mUtil.offset(t).top : 0,
                l = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            i > l ? (n = i, o = l) : (n = l, o = i), e && (o += e), mUtil.animate(n, o, a, function(t) {
                document.documentElement.scrollTop = t, document.body.parentNode.scrollTop = t, document.body.scrollTop = t
            })
        },
        scrollTop: function(t, e) {
            mUtil.scrollTo(null, t, e)
        },
        isArray: function(t) {
            return t && Array.isArray(t)
        },
        ready: function(t) {
            (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? t(): document.addEventListener("DOMContentLoaded", t)
        },
        isEmpty: function(t) {
            for (var e in t)
                if (t.hasOwnProperty(e)) return !1;
            return !0
        },
        numberString: function(t) {
            for (var e = (t += "").split("."), a = e[0], n = e.length > 1 ? "." + e[1] : "", o = /(\d+)(\d{3})/; o.test(a);) a = a.replace(o, "$1,$2");
            return a + n
        },
        detectIE: function() {
            var t = window.navigator.userAgent,
                e = t.indexOf("MSIE ");
            if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
            if (t.indexOf("Trident/") > 0) {
                var a = t.indexOf("rv:");
                return parseInt(t.substring(a + 3, t.indexOf(".", a)), 10)
            }
            var n = t.indexOf("Edge/");
            return n > 0 && parseInt(t.substring(n + 5, t.indexOf(".", n)), 10)
        },
        isRTL: function() {
            return "rtl" == mUtil.attr(mUtil.get("html"), "direction")
        },
        scrollerInit: function(t, e) {
            function a() {
                var a, n, h, m, l, j;
                l = $('#m_aside_left').innerHeight;
                j = $('#bottom-container').css('height', l * (75 / 100) + 'px');
                h = j[0].offsetTop;
                n = h instanceof Function ? parseInt(h.call()) : parseInt(h), mUtil.isInResponsiveRange("") ? (a = mUtil.data(t).get("ps")) ? (e.resetHeightOnDestroy ? mUtil.css(t, "height", "auto") : (mUtil.css(t, "overflow", "auto"), n > 0 && mUtil.css(t, "height", n + "px")), a.destroy(), a = mUtil.data(t).remove("ps")) : n > 0 && (mUtil.css(t, "overflow", "auto"), mUtil.css(t, "height", n + "px")) : (n > 0 && mUtil.css(t, "height", n + "px"), mUtil.css(t, "overflow", "hidden"), (a = mUtil.data(t).get("ps")) ? a.update() : (mUtil.addClass(t, "m-scroller"), a = new PerfectScrollbar(t, {
                    wheelSpeed: .5,
                    swipeEasing: !0,
                    wheelPropagation: !1,
                    minScrollbarLength: 40,
                    suppressScrollX: !0
                }), mUtil.data(t).set("ps", a)))
            }
            a(), e.handleWindowResize && mUtil.addResizeHandler(function() {
                a()
            })
        },
        scrollerUpdate: function(t) {
            var e;
            (e = mUtil.data(t).get("ps")) && e.update()
        },
        scrollersUpdate: function(t) {
            for (var e = mUtil.findAll(t, ".ps"), a = 0, n = e.length; a < n; a++) mUtil.scrollerUpdate(e[a])
        },
        scrollerTop: function(t) {
            mUtil.data(t).get("ps") && (t.scrollTop = 0)
        },
        scrollerDestroy: function(t) {
            var e;
            (e = mUtil.data(t).get("ps")) && (e.destroy(), e = mUtil.data(t).remove("ps"))
        }
    }
}();
mUtil.ready(function() {
    mUtil.init()
});
var mApp = function() {
    var t = {
            brand: "#716aca",
            metal: "#c4c5d6",
            light: "#ffffff",
            accent: "#00c5dc",
            primary: "#5867dd",
            success: "#34bfa3",
            info: "#36a3f7",
            warning: "#ffb822",
            danger: "#f4516c",
            focus: "#9816f4"
        },
        e = function(t) {
            var e = t.data("skin") ? "m-tooltip--skin-" + t.data("skin") : "",
                a = "auto" == t.data("width") ? "m-tooltop--auto-width" : "",
                n = t.data("trigger") ? t.data("trigger") : "hover";
            t.data("placement") && t.data("placement");
            t.tooltip({
                trigger: n,
                template: '<div class="m-tooltip ' + e + " " + a + ' tooltip" role="tooltip">                <div class="arrow"></div>                <div class="tooltip-inner"></div>            </div>'
            })
        },
        a = function() {
            $('[data-toggle="m-tooltip"]').each(function() {
                e($(this))
            })
        },
        n = function(t) {
            var e = t.data("skin") ? "m-popover--skin-" + t.data("skin") : "",
                a = t.data("trigger") ? t.data("trigger") : "hover";
            t.popover({
                trigger: a,
                template: '            <div class="m-popover ' + e + ' popover" role="tooltip">                <div class="arrow"></div>                <h3 class="popover-header"></h3>                <div class="popover-body"></div>            </div>'
            })
        },
        o = function() {
            $('[data-toggle="m-popover"]').each(function() {
                n($(this))
            })
        },
        i = function(t, e) {
            t = $(t), new mPortlet(t[0], e)
        },
        l = function() {
            $('[m-portlet="true"]').each(function() {
                var t = $(this);
                !0 !== t.data("portlet-initialized") && (i(t, {}), t.data("portlet-initialized", !0))
            })
        },
        r = function() {
            $("[data-tab-target]").each(function() {
                1 != $(this).data("tabs-initialized") && ($(this).click(function(t) {
                    t.preventDefault();
                    var e = $(this),
                        a = e.closest('[data-tabs="true"]'),
                        n = $(a.data("tabs-contents")),
                        o = $(e.data("tab-target"));
                    a.find(".m-tabs__item.m-tabs__item--active").removeClass("m-tabs__item--active"), e.addClass("m-tabs__item--active"), n.find(".m-tabs-content__item.m-tabs-content__item--active").removeClass("m-tabs-content__item--active"), o.addClass("m-tabs-content__item--active")
                }), $(this).data("tabs-initialized", !0))
            })
        };
    return {
        init: function(e) {
            e && e.colors && (t = e.colors), mApp.initComponents()
        },
        initComponents: function() {
            jQuery.event.special.touchstart = {
                setup: function(t, e, a) {
                    "function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("touchstart", a, {
                        passive: !1
                    }) : this.addEventListener("touchstart", a, {
                        passive: !0
                    }))
                }
            }, jQuery.event.special.touchmove = {
                setup: function(t, e, a) {
                    "function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("touchmove", a, {
                        passive: !1
                    }) : this.addEventListener("touchmove", a, {
                        passive: !0
                    }))
                }
            }, jQuery.event.special.wheel = {
                setup: function(t, e, a) {
                    "function" == typeof this && (e.includes("noPreventDefault") ? this.addEventListener("wheel", a, {
                        passive: !1
                    }) : this.addEventListener("wheel", a, {
                        passive: !0
                    }))
                }
            }, $('[data-scrollable="true"]').each(function() {
                var t = $(this);
                mUtil.scrollerInit(this, {
                    disableForMobile: !0,
                    handleWindowResize: !0,
                    height: function() {
                        return mUtil.isInResponsiveRange("tablet-and-mobile") && t.data("mobile-height") ? t.data("mobile-height") : t.data("height")
                    }
                })
            }), a(), o(), $("body").on("click", "[data-close=alert]", function() {
                $(this).closest(".alert").hide()
            }), l(), $(".custom-file-input").on("change", function() {
                var t = $(this).val();
                $(this).next(".custom-file-label").addClass("selected").html(t)
            }), r()
        },
        initCustomTabs: function() {
            r()
        },
        initTooltips: function() {
            a()
        },
        initTooltip: function(t) {
            e(t)
        },
        initPopovers: function() {
            o()
        },
        initPopover: function(t) {
            n(t)
        },
        initPortlet: function(t, e) {
            i(t, e)
        },
        initPortlets: function() {
            l()
        },
        block: function(t, e) {
            var a, n, o, i = $(t);
            if ("spinner" == (e = $.extend(!0, {
                    opacity: .03,
                    overlayColor: "#000000",
                    state: "brand",
                    type: "loader",
                    size: "lg",
                    centerX: !0,
                    centerY: !0,
                    message: "",
                    shadow: !0,
                    width: "auto"
                }, e)).type ? o = '<div class="m-spinner ' + (a = e.skin ? "m-spinner--skin-" + e.skin : "") + " " + (n = e.state ? "m-spinner--" + e.state : "") + '"></div' : (a = e.skin ? "m-loader--skin-" + e.skin : "", n = e.state ? "m-loader--" + e.state : "", size = e.size ? "m-loader--" + e.size : "", o = '<div class="m-loader ' + a + " " + n + " " + size + '"></div'), e.message && e.message.length > 0) {
                var l = "m-blockui " + (!1 === e.shadow ? "m-blockui-no-shadow" : "");
                html = '<div class="' + l + '"><span>' + e.message + "</span><span>" + o + "</span></div>";
                i = document.createElement("div");
                mUtil.get("body").prepend(i), mUtil.addClass(i, l), i.innerHTML = "<span>" + e.message + "</span><span>" + o + "</span>", e.width = mUtil.actualWidth(i) + 10, mUtil.remove(i), "body" == t && (html = '<div class="' + l + '" style="margin-left:-' + e.width / 2 + 'px;"><span>' + e.message + "</span><span>" + o + "</span></div>")
            } else html = o;
            var r = {
                message: html,
                centerY: e.centerY,
                centerX: e.centerX,
                css: {
                    top: "30%",
                    left: "50%",
                    border: "0",
                    padding: "0",
                    backgroundColor: "none",
                    width: e.width
                },
                overlayCSS: {
                    backgroundColor: e.overlayColor,
                    opacity: e.opacity,
                    cursor: "wait",
                    zIndex: "10"
                },
                onUnblock: function() {
                    i && i[0] && (mUtil.css(i[0], "position", ""), mUtil.css(i[0], "zoom", ""))
                }
            };
            "body" == t ? (r.css.top = "50%", $.blockUI(r)) : (i = $(t)).block(r)
        },
        unblock: function(t) {
            t && "body" != t ? $(t).unblock() : $.unblockUI()
        },
        blockPage: function(t) {
            return mApp.block("body", t)
        },
        unblockPage: function() {
            return mApp.unblock("body")
        },
        progress: function(t, e) {
            var a = "m-loader m-loader--" + (e && e.skin ? e.skin : "light") + " m-loader--" + (e && e.alignment ? e.alignment : "right") + " m-loader--" + (e && e.size ? "m-spinner--" + e.size : "");
            mApp.unprogress(t), $(t).addClass(a), $(t).data("progress-classes", a)
        },
        unprogress: function(t) {
            $(t).removeClass($(t).data("progress-classes"))
        },
        getColor: function(e) {
            return t[e]
        }
    }
}();
$(document).ready(function() {
        mApp.init({})
    }),
function(e) {
        if (void 0 === mUtil) throw new Error("mUtil is required and must be included before mDatatable.");
        e.fn.mDatatable = function(t) {
            if (0 === e(this).length) throw new Error("No mDatatable element exist.");
            var a = this;
            a.debug = !1, a.API = {
                record: null,
                value: null,
                params: null
            };
            var n = {
                isInit: !1,
                offset: 110,
                stateId: "meta",
                ajaxParams: {},
                init: function(t) {
                    return n.setupBaseDOM.call(), n.setupDOM(a.table), n.spinnerCallback(!0), n.setDataSourceQuery(n.getOption("data.source.read.params.query")), e(a).on("m-datatable--on-layout-updated", n.afterRender), a.debug && n.stateRemove(n.stateId), e.each(n.getOption("extensions"), function(t, n) {
                        "function" == typeof e.fn.mDatatable[t] && new e.fn.mDatatable[t](a, n)
                    }), "remote" !== t.data.type && "local" !== t.data.type || ((!1 === t.data.saveState || !1 === t.data.saveState.cookie && !1 === t.data.saveState.webstorage) && n.stateRemove(n.stateId), "local" === t.data.type && "object" == typeof t.data.source && (null === t.data.source && n.extractTable(), a.dataSet = a.originalDataSet = n.dataMapCallback(t.data.source)), n.dataRender()), n.setHeadTitle(), n.setHeadTitle(a.tableFoot), null === t.data.type && (n.setupCellField.call(), n.setupTemplateCell.call(), n.setupSystemColumn.call()), void 0 !== t.layout.header && !1 === t.layout.header && e(a.table).find("thead").remove(), void 0 !== t.layout.footer && !1 === t.layout.footer && e(a.table).find("tfoot").remove(), null !== t.data.type && "local" !== t.data.type || (n.setupSubDatatable.call(), n.setupSystemColumn.call(), n.redraw()), e(window).resize(n.fullRender), e(a).height(""), e(n.getOption("search.input")).on("keyup", function(t) {
                        n.getOption("search.onEnter") && 13 !== t.which || n.search(e(this).val().toLowerCase())
                    }), a
                },
                extractTable: function() {
                    var n = [],
                        o = e(a).find("tr:first-child th").get().map(function(a, o) {
                            var i = e(a).data("field");
                            void 0 === i && (i = e(a).text().trim());
                            var l = {
                                field: i,
                                title: i
                            };
                            for (var r in t.columns) t.columns[r].field === i && (l = e.extend(!0, {}, t.columns[r], l));
                            return n.push(l), i
                        });
                    t.columns = n;
                    var i = e(a).find("tr").get().map(function(t) {
                            return e(t).find("td").get().map(function(t, a) {
                                return e(t).html()
                            })
                        }),
                        l = [];
                    e.each(i, function(t, a) {
                        if (0 !== a.length) {
                            var n = {};
                            e.each(a, function(e, t) {
                                n[o[e]] = t
                            }), l.push(n)
                        }
                    }), t.data.source = l
                },
                layoutUpdate: function() {
                    n.setupSubDatatable.call(), n.setupSystemColumn.call(), n.columnHide.call(), n.sorting.call(), n.setupHover.call(), void 0 === t.detail && 1 === n.getDepth() && n.lockTable.call(), n.isInit || (e(a).trigger("m-datatable--on-init", {
                        table: e(a.wrap).attr("id"),
                        options: t
                    }), n.isInit = !0), e(a).trigger("m-datatable--on-layout-updated", {
                        table: e(a.wrap).attr("id")
                    })
                },
                lockTable: function() {
                    var t = {
                        lockEnabled: !1,
                        init: function() {
                            t.lockEnabled = n.lockEnabledColumns(), 0 === t.lockEnabled.left.length && 0 === t.lockEnabled.right.length || t.enable()
                        },
                        enable: function() {
                            e(a.table).find("thead,tbody,tfoot").each(function() {
                                var o = this;
                                0 === e(this).find(".m-datatable__lock").length && e(this).ready(function() {
                                    ! function(o) {
                                        if (e(o).find(".m-datatable__lock").length > 0) n.log("Locked container already exist in: ", o);
                                        else if (0 !== e(o).find(".m-datatable__row").length) {
                                            var i = e("<div/>").addClass("m-datatable__lock m-datatable__lock--left"),
                                                l = e("<div/>").addClass("m-datatable__lock m-datatable__lock--scroll"),
                                                r = e("<div/>").addClass("m-datatable__lock m-datatable__lock--right");
                                            e(o).find(".m-datatable__row").each(function() {
                                                var t = e("<tr/>").addClass("m-datatable__row").appendTo(i),
                                                    a = e("<tr/>").addClass("m-datatable__row").appendTo(l),
                                                    n = e("<tr/>").addClass("m-datatable__row").appendTo(r);
                                                e(this).find(".m-datatable__cell").each(function() {
                                                    var o = e(this).data("locked");
                                                    void 0 !== o ? (void 0 === o.left && !0 !== o || e(this).appendTo(t), void 0 !== o.right && e(this).appendTo(n)) : e(this).appendTo(a)
                                                }), e(this).remove()
                                            }), t.lockEnabled.left.length > 0 && (e(a.wrap).addClass("m-datatable--lock"), e(i).appendTo(o)), (t.lockEnabled.left.length > 0 || t.lockEnabled.right.length > 0) && e(l).appendTo(o), t.lockEnabled.right.length > 0 && (e(a.wrap).addClass("m-datatable--lock"), e(r).appendTo(o))
                                        } else n.log("No row exist in: ", o)
                                    }(o)
                                })
                            })
                        }
                    };
                    return t.init(), t
                },
                fullRender: function() {
                    n.spinnerCallback(!0), e(a.wrap).removeClass("m-datatable--loaded");
                    var t = n.lockEnabledColumns();
                    0 === t.left.length && 0 === t.right.length && n.isLocked() && (e(a.tableHead).empty(), n.setHeadTitle(), void 0 !== a.tableFoot && (e(a.tableFoot).empty(), n.setHeadTitle(a.tableFoot))), n.insertData()
                },
                lockEnabledColumns: function() {
                    var a = e(window).width(),
                        n = t.columns,
                        o = {
                            left: [],
                            right: []
                        };
                    return e.each(n, function(e, t) {
                        void 0 !== t.locked && (void 0 !== t.locked.left && mUtil.getBreakpoint(t.locked.left) <= a && o.left.push(t.locked.left), void 0 !== t.locked.right && mUtil.getBreakpoint(t.locked.right) <= a && o.right.push(t.locked.right))
                    }), o
                },
                afterRender: function(t, o) {
                    o.table == e(a.wrap).attr("id") && (n.isLocked() || (n.redraw(), n.getOption("rows.autoHide") && (n.autoHide(), e(a.table).find(".m-datatable__row").css("height", ""))), e(a).ready(function() {
                        e(a.tableBody).find(".m-datatable__row").removeClass("m-datatable__row--even"), e(a.wrap).hasClass("m-datatable--subtable") ? e(a.tableBody).find(".m-datatable__row:not(.m-datatable__row-detail):even").addClass("m-datatable__row--even") : e(a.tableBody).find(".m-datatable__row:nth-child(even)").addClass("m-datatable__row--even"), n.isLocked() && n.redraw(), e(a.tableBody).css("visibility", ""), e(a.wrap).addClass("m-datatable--loaded"), n.scrollbar.call(), n.spinnerCallback(!1)
                    }))
                },
                hoverTimer: 0,
                isScrolling: !1,
                setupHover: function() {
                    e(window).scroll(function(e) {
                        clearTimeout(n.hoverTimer), n.isScrolling = !0
                    }), e(a.tableBody).find(".m-datatable__cell").off("mouseenter", "mouseleave").on("mouseenter", function() {
                        if (n.hoverTimer = setTimeout(function() {
                                n.isScrolling = !1
                            }, 200), !n.isScrolling) {
                            var t = e(this).closest(".m-datatable__row").addClass("m-datatable__row--hover"),
                                a = e(t).index() + 1;
                            e(t).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").addClass("m-datatable__row--hover")
                        }
                    }).on("mouseleave", function() {
                        var t = e(this).closest(".m-datatable__row").removeClass("m-datatable__row--hover"),
                            a = e(t).index() + 1;
                        e(t).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + a + ")").removeClass("m-datatable__row--hover")
                    })
                },
                adjustLockContainer: function() {
                    if (!n.isLocked()) return 0;
                    var t = e(a.tableHead).width(),
                        o = e(a.tableHead).find(".m-datatable__lock--left").width(),
                        i = e(a.tableHead).find(".m-datatable__lock--right").width();
                    void 0 === o && (o = 0), void 0 === i && (i = 0);
                    var l = Math.floor(t - o - i);
                    return e(a.table).find(".m-datatable__lock--scroll").css("width", l), l
                },
                dragResize: function() {
                    var t, n, o = !1,
                        i = void 0;
                    e(a.tableHead).find(".m-datatable__cell").mousedown(function(a) {
                        i = e(this), o = !0, t = a.pageX, n = e(this).width(), e(i).addClass("m-datatable__cell--resizing")
                    }).mousemove(function(l) {
                        if (o) {
                            var r = e(i).index(),
                                s = e(a.tableBody),
                                d = e(i).closest(".m-datatable__lock");
                            if (d) {
                                var c = e(d).index();
                                s = e(a.tableBody).find(".m-datatable__lock").eq(c)
                            }
                            e(s).find(".m-datatable__row").each(function(a, o) {
                                e(o).find(".m-datatable__cell").eq(r).width(n + (l.pageX - t)).children().width(n + (l.pageX - t))
                            }), e(i).children().css("width", n + (l.pageX - t))
                        }
                    }).mouseup(function() {
                        e(i).removeClass("m-datatable__cell--resizing"), o = !1
                    }), e(document).mouseup(function() {
                        e(i).removeClass("m-datatable__cell--resizing"), o = !1
                    })
                },
                initHeight: function() {
                    if (t.layout.height && t.layout.scroll) {
                        var n = e(a.tableHead).find(".m-datatable__row").height(),
                            o = e(a.tableFoot).find(".m-datatable__row").height(),
                            i = t.layout.height;
                        n > 0 && (i -= n), o > 0 && (i -= o), e(a.tableBody).css("max-height", i)
                    }
                },
                setupBaseDOM: function() {
                    a.initialDatatable = e(a).clone(), "TABLE" === e(a).prop("tagName") ? (a.table = e(a).removeClass("m-datatable").addClass("m-datatable__table"), 0 === e(a.table).parents(".m-datatable").length && (a.table.wrap(e("<div/>").addClass("m-datatable").addClass("m-datatable--" + t.layout.theme)), a.wrap = e(a.table).parent())) : (a.wrap = e(a).addClass("m-datatable").addClass("m-datatable--" + t.layout.theme), a.table = e("<table/>").addClass("m-datatable__table").appendTo(a)), void 0 !== t.layout.class && e(a.wrap).addClass(t.layout.class), e(a.table).removeClass("m-datatable--destroyed").css("display", "block"), void 0 === e(a).attr("id") && (n.setOption("data.saveState", !1), e(a.table).attr("id", mUtil.getUniqueID("m-datatable--"))), n.getOption("layout.minHeight") && e(a.table).css("min-height", n.getOption("layout.minHeight")), n.getOption("layout.height") && e(a.table).css("max-height", n.getOption("layout.height")), null === t.data.type && e(a.table).css("width", "").css("display", ""), a.tableHead = e(a.table).find("thead"), 0 === e(a.tableHead).length && (a.tableHead = e("<thead/>").prependTo(a.table)), a.tableBody = e(a.table).find("tbody"), 0 === e(a.tableBody).length && (a.tableBody = e("<tbody/>").appendTo(a.table)), void 0 !== t.layout.footer && t.layout.footer && (a.tableFoot = e(a.table).find("tfoot"), 0 === e(a.tableFoot).length && (a.tableFoot = e("<tfoot/>").appendTo(a.table)))
                },
                setupCellField: function(n) {
                    void 0 === n && (n = e(a.table).children());
                    var o = t.columns;
                    e.each(n, function(t, a) {
                        e(a).find(".m-datatable__row").each(function(t, a) {
                            e(a).find(".m-datatable__cell").each(function(t, a) {
                                void 0 !== o[t] && e(a).data(o[t])
                            })
                        })
                    })
                },
                setupTemplateCell: function(o) {
                    void 0 === o && (o = a.tableBody);
                    var i = t.columns;
                    e(o).find(".m-datatable__row").each(function(t, o) {
                        var l = e(o).data("obj") || {};
                        l.getIndex = function() {
                            return t
                        }, l.getDatatable = function() {
                            return a
                        };
                        var r = n.getOption("rows.callback");
                        "function" == typeof r && r(e(o), l, t);
                        var s = n.getOption("rows.beforeTemplate");
                        "function" == typeof s && s(e(o), l, t), void 0 === l && (l = {}, e(o).find(".m-datatable__cell").each(function(t, a) {
                            var n = e.grep(i, function(t, n) {
                                return e(a).data("field") === t.field
                            })[0];
                            void 0 !== n && (l[n.field] = e(a).text())
                        })), e(o).find(".m-datatable__cell").each(function(o, r) {
                            var s = e.grep(i, function(t, a) {
                                return e(r).data("field") === t.field
                            })[0];
                            if (void 0 !== s && void 0 !== s.template) {
                                var d = "";
                                "string" == typeof s.template && (d = n.dataPlaceholder(s.template, l)), "function" == typeof s.template && (d = s.template(l, t, a));
                                var c = e("<span/>").append(d);
                                e(r).html(c), void 0 !== s.overflow && e(c).css("overflow", s.overflow)
                            }
                        });
                        var d = n.getOption("rows.afterTemplate");
                        "function" == typeof d && d(e(o), l, t)
                    })
                },
                setupSystemColumn: function() {
                    if (a.dataSet = a.dataSet || [], 0 !== a.dataSet.length) {
                        var o = t.columns;
                        e(a.tableBody).find(".m-datatable__row").each(function(t, a) {
                            e(a).find(".m-datatable__cell").each(function(t, a) {
                                var i = e.grep(o, function(t, n) {
                                    return e(a).data("field") === t.field
                                })[0];
                                if (void 0 !== i) {
                                    var l = e(a).text();
                                    if (void 0 !== i.selector && !1 !== i.selector) {
                                        if (e(a).find('.m-checkbox [type="checkbox"]').length > 0) return;
                                        e(a).addClass("m-datatable__cell--check");
                                        var r = e("<label/>").addClass("m-checkbox m-checkbox--single").append(e("<input/>").attr("type", "checkbox").attr("value", l).on("click", function() {
                                            e(this).is(":checked") ? n.setActive(this) : n.setInactive(this)
                                        })).append(e("<span/>"));
                                        void 0 !== i.selector.class && e(r).addClass(i.selector.class), e(a).children().html(r)
                                    }
                                    if (void 0 !== i.subtable && i.subtable) {
                                        if (e(a).find(".m-datatable__toggle-subtable").length > 0) return;
                                        e(a).children().html(e("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", l).append(e("<i/>").addClass(n.getOption("layout.icons.rowDetail.collapse"))))
                                    }
                                }
                            })
                        });
                        var i = function(t) {
                            var a = e.grep(o, function(e, t) {
                                return void 0 !== e.selector && !1 !== e.selector
                            })[0];
                            if (void 0 !== a && void 0 !== a.selector && !1 !== a.selector) {
                                var i = e(t).find('[data-field="' + a.field + '"]');
                                if (e(i).find('.m-checkbox [type="checkbox"]').length > 0) return;
                                e(i).addClass("m-datatable__cell--check");
                                var l = e("<label/>").addClass("m-checkbox m-checkbox--single m-checkbox--all").append(e("<input/>").attr("type", "checkbox").on("click", function() {
                                    e(this).is(":checked") ? n.setActiveAll(!0) : n.setActiveAll(!1)
                                })).append(e("<span/>"));
                                void 0 !== a.selector.class && e(l).addClass(a.selector.class), e(i).children().html(l)
                            }
                        };
                        t.layout.header && i(e(a.tableHead).find(".m-datatable__row").first()), t.layout.footer && i(e(a.tableFoot).find(".m-datatable__row").first())
                    }
                },
                adjustCellsWidth: function() {
                    var t = e(a.tableHead).width(),
                        o = n.getOneRow(a.tableHead, 1).length;
                    if (o > 0) {
                        t -= 20 * o;
                        var i = Math.floor(t / o);
                        i <= n.offset && (i = n.offset), e(a.table).find(".m-datatable__row").find(".m-datatable__cell").each(function(t, a) {
                            var n = i,
                                o = e(a).data("width");
                            void 0 !== o && (n = o), e(a).children().css("width", n)
                        })
                    }
                },
                adjustCellsHeight: function() {
                    e.each(e(a.table).children(), function(t, a) {
                        for (var n = e(a).find(".m-datatable__row").first().parent().find(".m-datatable__row").length, o = 1; o <= n; o++) {
                            var i = e(a).find(".m-datatable__row:nth-child(" + o + ")");
                            if (e(i).length > 0) {
                                var l = Math.max.apply(null, e(i).map(function() {
                                    return e(this).height()
                                }).get());
                                e(i).css("height", Math.ceil(parseInt(l)))
                            }
                        }
                    })
                },
                setupDOM: function(t) {
                    e(t).find("> thead").addClass("m-datatable__head"), e(t).find("> tbody").addClass("m-datatable__body"), e(t).find("> tfoot").addClass("m-datatable__foot"), e(t).find("tr").addClass("m-datatable__row"), e(t).find("tr > th, tr > td").addClass("m-datatable__cell"), e(t).find("tr > th, tr > td").each(function(t, a) {
                        0 === e(a).find("span").length && e(a).wrapInner(e("<span/>").css("width", n.offset))
                    })
                },
                scrollbar: function() {
                    var o = {
                        scrollable: null,
                        tableLocked: null,
                        mcsOptions: {
                            scrollInertia: 0,
                            autoDraggerLength: !0,
                            autoHideScrollbar: !0,
                            autoExpandScrollbar: !1,
                            alwaysShowScrollbar: 0,
                            mouseWheel: {
                                scrollAmount: 120,
                                preventDefault: !1
                            },
                            advanced: {
                                updateOnContentResize: !0,
                                autoExpandHorizontalScroll: !0
                            },
                            theme: "minimal-dark"
                        },
                        init: function() {
                            n.destroyScroller(o.scrollable);
                            var i = mUtil.getViewPort().width;
                            if (t.layout.scroll) {
                                e(a.wrap).addClass("m-datatable--scroll");
                                var l = e(a.tableBody).find(".m-datatable__lock--scroll");
                                e(l).find(".m-datatable__row").length > 0 && e(l).length > 0 ? (o.scrollHead = e(a.tableHead).find("> .m-datatable__lock--scroll > .m-datatable__row"), o.scrollFoot = e(a.tableFoot).find("> .m-datatable__lock--scroll > .m-datatable__row"), o.tableLocked = e(a.tableBody).find(".m-datatable__lock:not(.m-datatable__lock--scroll)"), i > mUtil.getBreakpoint("lg") ? o.mCustomScrollbar(l) : o.defaultScrollbar(l)) : e(a.tableBody).find(".m-datatable__row").length > 0 && (o.scrollHead = e(a.tableHead).find("> .m-datatable__row"), o.scrollFoot = e(a.tableFoot).find("> .m-datatable__row"), i > mUtil.getBreakpoint("lg") ? o.mCustomScrollbar(a.tableBody) : o.defaultScrollbar(a.tableBody))
                            } else e(a.table).css("overflow-x", "auto")
                        },
                        defaultScrollbar: function(t) {
                            e(t).css("overflow", "auto").css("max-height", n.getOption("layout.height")).on("scroll", o.onScrolling)
                        },
                        onScrolling: function(t) {
                            var a = e(this).scrollLeft(),
                                n = e(this).scrollTop();
                            e(o.scrollHead).css("left", -a), e(o.scrollFoot).css("left", -a), e(o.tableLocked).each(function(t, a) {
                                e(a).css("top", -n)
                            })
                        },
                        mCustomScrollbar: function(t) {
                            o.scrollable = t;
                            var i = "xy";
                            null === n.getOption("layout.height") && (i = "x");
                            var l = e.extend({}, o.mcsOptions, {
                                axis: i,
                                setHeight: e(a.tableBody).height(),
                                callbacks: {
                                    whileScrolling: function() {
                                        var t = this.mcs;
                                        e(o.scrollHead).css("left", t.left), e(o.scrollFoot).css("left", t.left), e(o.tableLocked).each(function(a, n) {
                                            e(n).css("top", t.top)
                                        }), clearTimeout(n.hoverTimer), n.isScrolling = !0
                                    }
                                }
                            });
                            !0 === n.getOption("layout.smoothScroll.scrollbarShown") && e(t).attr("data-scrollbar-shown", "true"), n.mCustomScrollbar(t, l)
                        }
                    };
                    return o.init(), o
                },
                mCustomScrollbar: function(t, o) {
                    e(a.tableBody).css("overflow", ""), n.destroyScroller(e(a.table).find(".mCustomScrollbar")), e(t).mCustomScrollbar(o)
                },
                setHeadTitle: function(o) {
                    void 0 === o && (o = a.tableHead);
                    var i = t.columns,
                        l = e(o).find(".m-datatable__row"),
                        r = e(o).find(".m-datatable__cell");
                    0 === e(l).length && (l = e("<tr/>").appendTo(o)), e.each(i, function(t, n) {
                        var o = e(r).eq(t);
                        if (0 === e(o).length && (o = e("<th/>").appendTo(l)), void 0 !== n.title && e(o).html(n.title).attr("data-field", n.field).data(n), void 0 !== n.textAlign) {
                            var i = void 0 !== a.textAlign[n.textAlign] ? a.textAlign[n.textAlign] : "";
                            e(o).addClass(i)
                        }
                    }), n.setupDOM(o)
                },
                dataRender: function(o) {
                    e(a.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded");
                    var i = function() {
                            a.dataSet = a.dataSet || [], n.localDataUpdate();
                            var o = n.getDataSourceParam("pagination");
                            0 === o.perpage && (o.perpage = t.data.pageSize || 10), o.total = a.dataSet.length;
                            var i = Math.max(o.perpage * (o.page - 1), 0),
                                l = Math.min(i + o.perpage, o.total);
                            return a.dataSet = e(a.dataSet).slice(i, l), o
                        },
                        l = function(o) {
                            var l = function(t, o) {
                                e(t.pager).hasClass("m-datatable--paging-loaded") || (e(t.pager).remove(), t.init(o)), e(t.pager).off().on("m-datatable--on-goto-page", function(a) {
                                    e(t.pager).remove(), t.init(o)
                                });
                                var i = Math.max(o.perpage * (o.page - 1), 0),
                                    l = Math.min(i + o.perpage, o.total);
                                n.localDataUpdate(), a.dataSet = e(a.dataSet).slice(i, l), n.insertData()
                            };
                            if (e(a.wrap).removeClass("m-datatable--error"), t.pagination)
                                if (t.data.serverPaging && "local" !== t.data.type) {
                                    var r = n.getObject("meta", o || null);
                                    null !== r ? n.paging(r) : n.paging(i(), l)
                                } else n.paging(i(), l);
                            else n.localDataUpdate();
                            n.insertData()
                        };
                    "local" === t.data.type || void 0 === t.data.source.read && null !== a.dataSet || !1 === t.data.serverSorting && "sort" === o ? l() : n.getData().done(l)
                },
                insertData: function() {
                    a.dataSet = a.dataSet || [];
                    var o = n.getDataSourceParam(),
                        i = e("<tbody/>").addClass("m-datatable__body").css("visibility", "hidden"),
                        l = t.columns.length;
                    e.each(a.dataSet, function(r, s) {
                        for (var d = e("<tr/>").attr("data-row", r).data("obj", s), c = (r = 0, []), u = 0; u < l; u += 1) {
                            var m = t.columns[u],
                                p = [];
                            if (n.getObject("sort.field", o) === m.field && p.push("m-datatable__cell--sorted"), void 0 !== m.textAlign) {
                                var f = void 0 !== a.textAlign[m.textAlign] ? a.textAlign[m.textAlign] : "";
                                p.push(f)
                            }
                            c[r++] = '<td data-field="' + m.field + '"', c[r++] = ' class="' + p.join(" ") + '"', c[r++] = ">", c[r++] = n.getObject(m.field, s), c[r++] = "</td>"
                        }
                        e(d).append(c.join("")), e(i).append(d)
                    }), 0 === a.dataSet.length && (n.destroyScroller(e(a.table).find(".mCustomScrollbar")), e("<span/>").addClass("m-datatable--error").css("width", "100%").html(n.getOption("translate.records.noRecords")).appendTo(i), e(a.wrap).addClass("m-datatable--error m-datatable--loaded"), n.spinnerCallback(!1)), e(a.tableBody).replaceWith(i), a.tableBody = i, n.setupDOM(a.table), n.setupCellField([a.tableBody]), n.setupTemplateCell(a.tableBody), n.layoutUpdate()
                },
                updateTableComponents: function() {
                    a.tableHead = e(a.table).children("thead"), a.tableBody = e(a.table).children("tbody"), a.tableFoot = e(a.table).children("tfoot")
                },
                getData: function() {
                    var o = {
                        dataType: "json",
                        method: "GET",
                        data: {},
                        timeout: 3e4
                    };
                    if ("local" === t.data.type && (o.url = t.data.source), "remote" === t.data.type) {
                        o.url = n.getOption("data.source.read.url"), "string" != typeof o.url && (o.url = n.getOption("data.source.read")), "string" != typeof o.url && (o.url = n.getOption("data.source")), o.headers = n.getOption("data.source.read.headers"), o.method = n.getOption("data.source.read.method") || "POST";
                        var i = n.getDataSourceParam();
                        n.getOption("data.serverPaging") || delete i.pagination, n.getOption("data.serverSorting") || delete i.sort, o.data.datatable = i, o.data = e.extend(!0, o.data, i, n.getOption("data.source.read.params"))
                    }
                    return e.ajax(o).done(function(t, o, i) {
                        a.lastResponse = t, a.dataSet = a.originalDataSet = n.dataMapCallback(t), n.setAutoColumns(), e(a).trigger("m-datatable--on-ajax-done", [a.dataSet])
                    }).fail(function(t, o, i) {
                        n.destroyScroller(e(a.table).find(".mCustomScrollbar")), e(a).trigger("m-datatable--on-ajax-fail", [t]), e("<span/>").addClass("m-datatable--error").width("100%").html(n.getOption("translate.records.noRecords")).appendTo(a.tableBody), e(a.wrap).addClass("m-datatable--error m-datatable--loaded"), n.spinnerCallback(!1)
                    }).always(function() {})
                },
                paging: function(t, o) {
                    var i = {
                        meta: null,
                        pager: null,
                        paginateEvent: null,
                        pagerLayout: {
                            pagination: null,
                            info: null
                        },
                        callback: null,
                        init: function(t) {
                            i.meta = t, i.meta.pages = Math.max(Math.ceil(i.meta.total / i.meta.perpage), 1), i.meta.page > i.meta.pages && (i.meta.page = i.meta.pages), i.paginateEvent = n.getTablePrefix(), i.pager = e(a.table).siblings(".m-datatable__pager"), e(i.pager).hasClass("m-datatable--paging-loaded") || (e(i.pager).remove(), 0 !== i.meta.pages && (n.setDataSourceParam("pagination", {
                                page: i.meta.page,
                                pages: i.meta.pages,
                                perpage: i.meta.perpage,
                                total: i.meta.total
                            }), i.callback = i.serverCallback, "function" == typeof o && (i.callback = o), i.addPaginateEvent(), i.populate(), i.meta.page = Math.max(i.meta.page || 1, i.meta.page), e(a).trigger(i.paginateEvent, i.meta), i.pagingBreakpoint.call(), e(window).resize(i.pagingBreakpoint)))
                        },
                        serverCallback: function(e, t) {
                            n.dataRender()
                        },
                        populate: function() {
                            var t = n.getOption("layout.icons.pagination"),
                                o = n.getOption("translate.toolbar.pagination.items.default");
                            i.pager = e("<div/>").addClass("m-datatable__pager m-datatable--paging-loaded clearfix");
                            var l = e("<ul/>").addClass("m-datatable__pager-nav");
                            i.pagerLayout.pagination = l, e("<li/>").append(e("<a/>").attr("title", o.first).addClass("m-datatable__pager-link m-datatable__pager-link--first").append(e("<i/>").addClass(t.first)).on("click", i.gotoMorePage).attr("data-page", 1)).appendTo(l), e("<li/>").append(e("<a/>").attr("title", o.prev).addClass("m-datatable__pager-link m-datatable__pager-link--prev").append(e("<i/>").addClass(t.prev)).on("click", i.gotoMorePage)).appendTo(l), e("<li/>").append(e("<a/>").attr("title", o.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-prev").html(e("<i/>").addClass(t.more)).on("click", i.gotoMorePage)).appendTo(l), e("<li/>").append(e("<input/>").attr("type", "text").addClass("m-pager-input form-control").attr("title", o.input).on("keyup", function() {
                                e(this).attr("data-page", Math.abs(e(this).val()))
                            }).on("keypress", function(e) {
                                13 === e.which && i.gotoMorePage(e)
                            })).appendTo(l);
                            var r = n.getOption("toolbar.items.pagination.pages.desktop.pagesNumber"),
                                s = Math.ceil(i.meta.page / r) * r,
                                d = s - r;
                            s > i.meta.pages && (s = i.meta.pages);
                            for (var c = d; c < s; c++) {
                                var u = c + 1;
                                e("<li/>").append(e("<a/>").addClass("m-datatable__pager-link m-datatable__pager-link-number").text(u).attr("data-page", u).attr("title", u).on("click", i.gotoPage)).appendTo(l)
                            }
                            e("<li/>").append(e("<a/>").attr("title", o.more).addClass("m-datatable__pager-link m-datatable__pager-link--more-next").html(e("<i/>").addClass(t.more)).on("click", i.gotoMorePage)).appendTo(l), e("<li/>").append(e("<a/>").attr("title", o.next).addClass("m-datatable__pager-link m-datatable__pager-link--next").append(e("<i/>").addClass(t.next)).on("click", i.gotoMorePage)).appendTo(l), e("<li/>"), n.getOption("toolbar.items.info") && (i.pagerLayout.info = e("<div/>").addClass("m-datatable__pager-info").append(e("<span/>").addClass("m-datatable__pager-detail"))), e.each(n.getOption("toolbar.layout"), function(t, a) {
                                e(i.pagerLayout[a]).appendTo(i.pager)
                            });
                            var m = e("<select/>").addClass("selectpicker m-datatable__pager-size").attr("title", n.getOption("translate.toolbar.pagination.items.default.select")).attr("data-width", "70px").val(i.meta.perpage).on("change", i.updatePerpage).prependTo(i.pagerLayout.info),
                                p = n.getOption("toolbar.items.pagination.pageSizeSelect");
                            0 == p.length && (p = [10, 20, 30, 50, 100]), e.each(p, function(t, a) {
                                var n = a; - 1 === a && (n = "All"), e("<option/>").attr("value", a).html(n).appendTo(m)
                            }), e(a).ready(function() {
                                e(".selectpicker").selectpicker().siblings(".dropdown-toggle").attr("title", n.getOption("translate.toolbar.pagination.items.default.select"))
                            }), i.paste()
                        },
                        paste: function() {
                            e.each(e.unique(n.getOption("toolbar.placement")), function(t, n) {
                                "bottom" === n && e(i.pager).clone(!0).insertAfter(a.table), "top" === n && e(i.pager).clone(!0).addClass("m-datatable__pager--top").insertBefore(a.table)
                            })
                        },
                        gotoMorePage: function(t) {
                            if (t.preventDefault(), "disabled" === e(this).attr("disabled")) return !1;
                            var a = e(this).attr("data-page");
                            return void 0 === a && (a = e(t.target).attr("data-page")), i.openPage(parseInt(a)), !1
                        },
                        gotoPage: function(t) {
                            t.preventDefault(), e(this).hasClass("m-datatable__pager-link--active") || i.openPage(parseInt(e(this).data("page")))
                        },
                        openPage: function(t) {
                            i.meta.page = parseInt(t), e(a).trigger(i.paginateEvent, i.meta), i.callback(i, i.meta), e(i.pager).trigger("m-datatable--on-goto-page", i.meta)
                        },
                        updatePerpage: function(t) {
                            t.preventDefault(), null === n.getOption("layout.height") && e("html, body").animate({
                                scrollTop: e(a).position().top
                            }), i.pager = e(a.table).siblings(".m-datatable__pager").removeClass("m-datatable--paging-loaded"), t.originalEvent && (i.meta.perpage = parseInt(e(this).val())), e(i.pager).find("select.m-datatable__pager-size").val(i.meta.perpage).attr("data-selected", i.meta.perpage), n.setDataSourceParam("pagination", {
                                page: i.meta.page,
                                pages: i.meta.pages,
                                perpage: i.meta.perpage,
                                total: i.meta.total
                            }), e(i.pager).trigger("m-datatable--on-update-perpage", i.meta), e(a).trigger(i.paginateEvent, i.meta), i.callback(i, i.meta), i.updateInfo.call()
                        },
                        addPaginateEvent: function(t) {
                            e(a).off(i.paginateEvent).on(i.paginateEvent, function(t, o) {
                                n.spinnerCallback(!0), i.pager = e(a.table).siblings(".m-datatable__pager");
                                var l = e(i.pager).find(".m-datatable__pager-nav");
                                e(l).find(".m-datatable__pager-link--active").removeClass("m-datatable__pager-link--active"), e(l).find('.m-datatable__pager-link-number[data-page="' + o.page + '"]').addClass("m-datatable__pager-link--active"), e(l).find(".m-datatable__pager-link--prev").attr("data-page", Math.max(o.page - 1, 1)), e(l).find(".m-datatable__pager-link--next").attr("data-page", Math.min(o.page + 1, o.pages)), e(i.pager).each(function() {
                                    e(this).find('.m-pager-input[type="text"]').prop("value", o.page)
                                }), e(i.pager).find(".m-datatable__pager-nav").show(), o.pages <= 1 && e(i.pager).find(".m-datatable__pager-nav").hide(), n.setDataSourceParam("pagination", {
                                    page: i.meta.page,
                                    pages: i.meta.pages,
                                    perpage: i.meta.perpage,
                                    total: i.meta.total
                                }), e(i.pager).find("select.m-datatable__pager-size").val(o.perpage).attr("data-selected", o.perpage), e(a.table).find('.m-checkbox > [type="checkbox"]').prop("checked", !1), e(a.table).find(".m-datatable__row--active").removeClass("m-datatable__row--active"), i.updateInfo.call(), i.pagingBreakpoint.call()
                            })
                        },
                        updateInfo: function() {
                            var t = Math.max(i.meta.perpage * (i.meta.page - 1) + 1, 1),
                                a = Math.min(t + i.meta.perpage - 1, i.meta.total);
                            e(i.pager).find(".m-datatable__pager-info").find(".m-datatable__pager-detail").html(n.dataPlaceholder(n.getOption("translate.toolbar.pagination.items.info"), {
                                start: t,
                                end: -1 === i.meta.perpage ? i.meta.total : a,
                                pageSize: -1 === i.meta.perpage || i.meta.perpage >= i.meta.total ? i.meta.total : i.meta.perpage,
                                total: i.meta.total
                            }))
                        },
                        pagingBreakpoint: function() {
                            var t = e(a.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav");
                            if (0 !== e(t).length) {
                                var o = n.getCurrentPage(),
                                    l = e(t).find(".m-pager-input").closest("li");
                                e(t).find("li").show(), e.each(n.getOption("toolbar.items.pagination.pages"), function(a, r) {
                                    if (mUtil.isInResponsiveRange(a)) {
                                        switch (a) {
                                            case "desktop":
                                            case "tablet":
                                                Math.ceil(o / r.pagesNumber), r.pagesNumber, r.pagesNumber;
                                                e(l).hide(), i.meta = n.getDataSourceParam("pagination"), i.paginationUpdate();
                                                break;
                                            case "mobile":
                                                e(l).show(), e(t).find(".m-datatable__pager-link--more-prev").closest("li").hide(), e(t).find(".m-datatable__pager-link--more-next").closest("li").hide(), e(t).find(".m-datatable__pager-link-number").closest("li").hide()
                                        }
                                        return !1
                                    }
                                })
                            }
                        },
                        paginationUpdate: function() {
                            var t = e(a.table).siblings(".m-datatable__pager").find(".m-datatable__pager-nav"),
                                o = e(t).find(".m-datatable__pager-link--more-prev"),
                                l = e(t).find(".m-datatable__pager-link--more-next"),
                                r = e(t).find(".m-datatable__pager-link--first"),
                                s = e(t).find(".m-datatable__pager-link--prev"),
                                d = e(t).find(".m-datatable__pager-link--next"),
                                c = e(t).find(".m-datatable__pager-link--last"),
                                u = e(t).find(".m-datatable__pager-link-number"),
                                m = Math.max(e(u).first().data("page") - 1, 1);
                            e(o).each(function(t, a) {
                                e(a).attr("data-page", m)
                            }), 1 === m ? e(o).parent().hide() : e(o).parent().show();
                            var p = Math.min(e(u).last().data("page") + 1, i.meta.pages);
                            e(l).each(function(t, a) {
                                e(l).attr("data-page", p).show()
                            }), p === i.meta.pages && p === e(u).last().data("page") ? e(l).parent().hide() : e(l).parent().show(), 1 === i.meta.page ? (e(r).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), e(s).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (e(r).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), e(s).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled")), i.meta.page === i.meta.pages ? (e(d).attr("disabled", !0).addClass("m-datatable__pager-link--disabled"), e(c).attr("disabled", !0).addClass("m-datatable__pager-link--disabled")) : (e(d).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"), e(c).removeAttr("disabled").removeClass("m-datatable__pager-link--disabled"));
                            var f = n.getOption("toolbar.items.pagination.navigation");
                            f.first || e(r).remove(), f.prev || e(s).remove(), f.next || e(d).remove(), f.last || e(c).remove()
                        }
                    };
                    return i.init(t), i
                },
                columnHide: function() {
                    var n = mUtil.getViewPort().width;
                    e.each(t.columns, function(t, o) {
                        if (void 0 !== o.responsive) {
                            var i = o.field,
                                l = e.grep(e(a.table).find(".m-datatable__cell"), function(t, a) {
                                    return i === e(t).data("field")
                                });
                            mUtil.getBreakpoint(o.responsive.hidden) >= n ? e(l).hide() : e(l).show(), mUtil.getBreakpoint(o.responsive.visible) <= n ? e(l).show() : e(l).hide()
                        }
                    })
                },
                setupSubDatatable: function() {
                    var o = n.getOption("detail.content");
                    if ("function" == typeof o && !(e(a.table).find(".m-datatable__subtable").length > 0)) {
                        e(a.wrap).addClass("m-datatable--subtable"), t.columns[0].subtable = !0;
                        var i = function(i) {
                                i.preventDefault();
                                var l = e(this).closest(".m-datatable__row"),
                                    r = e(l).next(".m-datatable__row-subtable");
                                0 === e(r).length && (r = e("<tr/>").addClass("m-datatable__row-subtable m-datatable__row-loading").hide().append(e("<td/>").addClass("m-datatable__subtable").attr("colspan", n.getTotalColumns())), e(l).after(r), e(l).hasClass("m-datatable__row--even") && e(r).addClass("m-datatable__row-subtable--even")), e(r).toggle();
                                var s = e(r).find(".m-datatable__subtable"),
                                    d = e(this).closest("[data-field]:first-child").find(".m-datatable__toggle-subtable").data("value"),
                                    c = e(this).find("i").removeAttr("class");
                                e(l).hasClass("m-datatable__row--subtable-expanded") ? (e(c).addClass(n.getOption("layout.icons.rowDetail.collapse")), e(l).removeClass("m-datatable__row--subtable-expanded"), e(a).trigger("m-datatable--on-collapse-subtable", [l])) : (e(c).addClass(n.getOption("layout.icons.rowDetail.expand")), e(l).addClass("m-datatable__row--subtable-expanded"), e(a).trigger("m-datatable--on-expand-subtable", [l])), 0 === e(s).find(".m-datatable").length && (e.map(a.dataSet, function(e, a) {
                                    return d === e[t.columns[0].field] && (i.data = e, !0)
                                }), i.detailCell = s, i.parentRow = l, i.subTable = s, o(i), e(s).children(".m-datatable").on("m-datatable--on-init", function(t) {
                                    e(r).removeClass("m-datatable__row-loading")
                                }), "local" === n.getOption("data.type") && e(r).removeClass("m-datatable__row-loading"))
                            },
                            l = t.columns;
                        e(a.tableBody).find(".m-datatable__row").each(function(t, a) {
                            e(a).find(".m-datatable__cell").each(function(t, a) {
                                var o = e.grep(l, function(t, n) {
                                    return e(a).data("field") === t.field
                                })[0];
                                if (void 0 !== o) {
                                    var r = e(a).text();
                                    if (void 0 !== o.subtable && o.subtable) {
                                        if (e(a).find(".m-datatable__toggle-subtable").length > 0) return;
                                        e(a).html(e("<a/>").addClass("m-datatable__toggle-subtable").attr("href", "#").attr("data-value", r).attr("title", n.getOption("detail.title")).on("click", i).append(e("<i/>").css("width", e(a).data("width")).addClass(n.getOption("layout.icons.rowDetail.collapse"))))
                                    }
                                }
                            })
                        })
                    }
                },
                dataMapCallback: function(e) {
                    var t = e;
                    return "function" == typeof n.getOption("data.source.read.map") ? n.getOption("data.source.read.map")(e) : (void 0 !== e.data && (t = e.data), t)
                },
                isSpinning: !1,
                spinnerCallback: function(e) {
                    if (e) {
                        if (!n.isSpinning) {
                            var t = n.getOption("layout.spinner");
                            !0 === t.message && (t.message = n.getOption("translate.records.processing")), n.isSpinning = !0, void 0 !== mApp && mApp.block(a, t)
                        }
                    } else n.isSpinning = !1, void 0 !== mApp && mApp.unblock(a)
                },
                sortCallback: function(t, a, n) {
                    var o = n.type || "string",
                        i = n.format || "",
                        l = n.field;
                    if ("date" === o && "undefined" == typeof moment) throw new Error("Moment.js is required.");
                    return e(t).sort(function(e, t) {
                        var n = e[l],
                            r = t[l];
                        switch (o) {
                            case "date":
                                var s = moment(n, i).diff(moment(r, i));
                                return "asc" === a ? s > 0 ? 1 : s < 0 ? -1 : 0 : s < 0 ? 1 : s > 0 ? -1 : 0;
                            case "number":
                                return isNaN(parseFloat(n)) && null != n && (n = Number(n.replace(/[^0-9\.-]+/g, ""))), isNaN(parseFloat(r)) && null != r && (r = Number(r.replace(/[^0-9\.-]+/g, ""))), n = parseFloat(n), r = parseFloat(r), "asc" === a ? n > r ? 1 : n < r ? -1 : 0 : n < r ? 1 : n > r ? -1 : 0;
                            case "string":
                            default:
                                return "asc" === a ? n > r ? 1 : n < r ? -1 : 0 : n < r ? 1 : n > r ? -1 : 0
                        }
                    })
                },
                log: function(e, t) {
                    void 0 === t && (t = ""), a.debug && console.log(e, t)
                },
                autoHide: function() {
                    e(a.table).find(".m-datatable__cell").show(), e(a.tableBody).each(function() {
                        for (; e(this)[0].offsetWidth < e(this)[0].scrollWidth;) e(this).find(".m-datatable__row").each(function(t) {
                            var n = e(this).find(".m-datatable__cell").not(":hidden").last();
                            e(n).hide(), 0 === t && (e(a.tableHead).find(".m-datatable__cell").eq(e(n).index()).hide(), e(a.tableFoot).find(".m-datatable__cell").eq(e(n).index()).hide())
                        })
                    });
                    var t = function(t) {
                        t.preventDefault();
                        var a = e(this).closest(".m-datatable__row"),
                            o = e(a).next();
                        if (e(o).hasClass("m-datatable__row-detail")) e(this).find("i").removeClass(n.getOption("layout.icons.rowDetail.expand")).addClass(n.getOption("layout.icons.rowDetail.collapse")), e(o).remove();
                        else {
                            e(this).find("i").removeClass(n.getOption("layout.icons.rowDetail.collapse")).addClass(n.getOption("layout.icons.rowDetail.expand"));
                            var i = e(a).find(".m-datatable__cell:hidden").clone().show();
                            o = e("<tr/>").addClass("m-datatable__row-detail").insertAfter(a);
                            var l = e("<td/>").addClass("m-datatable__detail").attr("colspan", n.getTotalColumns()).appendTo(o),
                                r = e("<table/>");
                            e(i).each(function() {
                                e(r).append(e('<tr class="m-datatable__row"></tr>').append(e('<td class="m-datatable__cell"></td>').append(e("<span/>").css("width", n.offset).append(e(this).data("field")))).append(this))
                            }), e(l).append(r)
                        }
                    };
                    e(a.tableBody).find(".m-datatable__row").each(function() {
                        e(this).prepend(e("<td/>").addClass("m-datatable__cell m-datatable__toggle--detail").append(e("<a/>").addClass("m-datatable__toggle-detail").attr("href", "#").on("click", t).append(e("<i/>").css("width", "21px").addClass(n.getOption("layout.icons.rowDetail.collapse"))))), 0 === e(a.tableHead).find(".m-datatable__toggle-detail").length ? (e(a.tableHead).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>'), e(a.tableFoot).find(".m-datatable__row").first().prepend('<th class="m-datatable__cell m-datatable__toggle-detail"><span style="width: 21px"></span></th>')) : e(a.tableHead).find(".m-datatable__toggle-detail").find("span").css("width", "21px")
                    })
                },
                hoverColumn: function() {
                    e(a.tableBody).on("mouseenter", ".m-datatable__cell", function() {
                        var t = e(n.cell(this).nodes()).index();
                        e(n.cells().nodes()).removeClass("m-datatable__cell--hover"), e(n.column(t).nodes()).addClass("m-datatable__cell--hover")
                    })
                },
                setAutoColumns: function() {
                    n.getOption("data.autoColumns") && (e.each(a.dataSet[0], function(a, n) {
                        0 === e.grep(t.columns, function(e, t) {
                            return a === e.field
                        }).length && t.columns.push({
                            field: a,
                            title: a
                        })
                    }), e(a.tableHead).find(".m-datatable__row").remove(), n.setHeadTitle(), n.getOption("layout.footer") && (e(a.tableFoot).find(".m-datatable__row").remove(), n.setHeadTitle(a.tableFoot)))
                },
                isLocked: function() {
                    return e(a.wrap).hasClass("m-datatable--lock") || !1
                },
                replaceTableContent: function(t, n) {
                    void 0 === n && (n = a.tableBody), e(n).hasClass("mCustomScrollbar") ? e(n).find(".mCSB_container").html(t) : e(n).html(t)
                },
                getExtraSpace: function(t) {
                    return parseInt(e(t).css("paddingRight")) + parseInt(e(t).css("paddingLeft")) + (parseInt(e(t).css("marginRight")) + parseInt(e(t).css("marginLeft"))) + Math.ceil(e(t).css("border-right-width").replace("px", ""))
                },
                dataPlaceholder: function(t, a) {
                    var n = t;
                    return e.each(a, function(e, t) {
                        n = n.replace("{{" + e + "}}", t)
                    }), n
                },
                getTableId: function(t) {
                    void 0 === t && (t = "");
                    var n = e(a).attr("id");
                    return void 0 === n && (n = e(a).attr("class").split(" ")[0]), n + t
                },
                getTablePrefix: function(e) {
                    return void 0 !== e && (e = "-" + e), n.getTableId() + "-" + n.getDepth() + e
                },
                getDepth: function() {
                    var t = 0,
                        n = a.table;
                    do {
                        n = e(n).parents(".m-datatable__table"), t++
                    } while (e(n).length > 0);
                    return t
                },
                stateKeep: function(e, t) {
                    e = n.getTablePrefix(e), !1 !== n.getOption("data.saveState") && (n.getOption("data.saveState.webstorage") && localStorage && localStorage.setItem(e, JSON.stringify(t)), n.getOption("data.saveState.cookie") && Cookies.set(e, JSON.stringify(t)))
                },
                stateGet: function(e, t) {
                    if (e = n.getTablePrefix(e), !1 !== n.getOption("data.saveState")) {
                        var a = null;
                        return void 0 !== (a = n.getOption("data.saveState.webstorage") && localStorage ? localStorage.getItem(e) : Cookies.get(e)) && null !== a ? JSON.parse(a) : void 0
                    }
                },
                stateUpdate: function(t, a) {
                    var o = n.stateGet(t);
                    void 0 !== o && null !== o || (o = {}), n.stateKeep(t, e.extend({}, o, a))
                },
                stateRemove: function(e) {
                    e = n.getTablePrefix(e), localStorage && localStorage.removeItem(e), Cookies.remove(e)
                },
                getTotalColumns: function(t) {
                    return void 0 === t && (t = a.tableBody), e(t).find(".m-datatable__row").first().find(".m-datatable__cell").length
                },
                getOneRow: function(t, a, n) {
                    void 0 === n && (n = !0);
                    var o = e(t).find(".m-datatable__row:not(.m-datatable__row-detail):nth-child(" + a + ")");
                    return n && (o = o.find(".m-datatable__cell")), o
                },
                hasOverflowY: function(t) {
                    var a = e(t).find(".m-datatable__row"),
                        n = 0;
                    return a.length > 0 && (e(a).each(function(t, a) {
                        n += Math.floor(e(a).innerHeight())
                    }), n > e(t).innerHeight())
                },
                sortColumn: function(t, n, o) {
                    void 0 === n && (n = "asc"), void 0 === o && (o = !1);
                    var i = e(t).index(),
                        l = e(a.tableBody).find(".m-datatable__row"),
                        r = e(t).closest(".m-datatable__lock").index(); - 1 !== r && (l = e(a.tableBody).find(".m-datatable__lock:nth-child(" + (r + 1) + ")").find(".m-datatable__row"));
                    var s = e(l).parent();
                    e(l).sort(function(t, a) {
                        var l = e(t).find("td:nth-child(" + i + ")").text(),
                            r = e(a).find("td:nth-child(" + i + ")").text();
                        return o && (l = parseInt(l), r = parseInt(r)), "asc" === n ? l > r ? 1 : l < r ? -1 : 0 : l < r ? 1 : l > r ? -1 : 0
                    }).appendTo(s)
                },
                sorting: function() {
                    var o = {
                        init: function() {
                            t.sortable && (e(a.tableHead).find(".m-datatable__cell:not(.m-datatable__cell--check)").addClass("m-datatable__cell--sort").off("click").on("click", o.sortClick), o.setIcon())
                        },
                        setIcon: function() {
                            var t = n.getDataSourceParam("sort");
                            if (!e.isEmptyObject(t)) {
                                var o = e(a.tableHead).find('.m-datatable__cell[data-field="' + t.field + '"]').attr("data-sort", t.sort),
                                    i = e(o).find("span"),
                                    l = e(i).find("i"),
                                    r = n.getOption("layout.icons.sort");
                                e(l).length > 0 ? e(l).removeAttr("class").addClass(r[t.sort]) : e(i).append(e("<i/>").addClass(r[t.sort]))
                            }
                        },
                        sortClick: function(i) {
                            var l = n.getDataSourceParam("sort"),
                                r = e(this).data("field"),
                                s = n.getColumnByField(r);
                            if ((void 0 === s.sortable || !1 !== s.sortable) && (e(a.tableHead).find(".m-datatable__cell > span > i").remove(), t.sortable)) {
                                n.spinnerCallback(!0);
                                var d = "desc";
                                n.getObject("field", l) === r && (d = n.getObject("sort", l)), l = {
                                    field: r,
                                    sort: d = void 0 === d || "desc" === d ? "asc" : "desc"
                                }, n.setDataSourceParam("sort", l), o.setIcon(), setTimeout(function() {
                                    n.dataRender("sort"), e(a).trigger("m-datatable--on-sort", l)
                                }, 300)
                            }
                        }
                    };
                    o.init()
                },
                localDataUpdate: function() {
                    var t = n.getDataSourceParam();
                    void 0 === a.originalDataSet && (a.originalDataSet = a.dataSet);
                    var o = n.getObject("sort.field", t),
                        i = n.getObject("sort.sort", t),
                        l = n.getColumnByField(o);
                    if (void 0 !== l && !0 !== n.getOption("data.serverSorting") ? "function" == typeof l.sortCallback ? a.dataSet = l.sortCallback(a.originalDataSet, i, l) : a.dataSet = n.sortCallback(a.originalDataSet, i, l) : a.dataSet = a.originalDataSet, "object" == typeof t.query && !0 !== n.getOption("data.serverFiltering")) {
                        t.query = t.query || {};
                        var r = e(n.getOption("search.input")).val();
                        void 0 !== r && "" !== r && (r = r.toLowerCase(), a.dataSet = e.grep(a.dataSet, function(e) {
                            for (var t in e)
                                if (e.hasOwnProperty(t) && "string" == typeof e[t] && e[t].toLowerCase().indexOf(r) > -1) return !0;
                            return !1
                        }), delete t.query[n.getGeneralSearchKey()]), e.each(t.query, function(e, a) {
                            "" === a && delete t.query[e]
                        }), a.dataSet = n.filterArray(a.dataSet, t.query), a.dataSet = a.dataSet.filter(function() {
                            return !0
                        })
                    }
                    return a.dataSet
                },
                filterArray: function(t, a, n) {
                    if ("object" != typeof t) return [];
                    if (void 0 === n && (n = "AND"), "object" != typeof a) return t;
                    if (n = n.toUpperCase(), -1 === e.inArray(n, ["AND", "OR", "NOT"])) return [];
                    var o = Object.keys(a).length,
                        i = [];
                    return e.each(t, function(t, l) {
                        var r = l,
                            s = 0;
                        e.each(a, function(e, t) {
                            r.hasOwnProperty(e) && t == r[e] && s++
                        }), ("AND" == n && s == o || "OR" == n && s > 0 || "NOT" == n && 0 == s) && (i[t] = l)
                    }), t = i
                },
                resetScroll: function() {
                    void 0 === t.detail && 1 === n.getDepth() && (e(a.table).find(".m-datatable__row").css("left", 0), e(a.table).find(".m-datatable__lock").css("top", 0), e(a.tableBody).scrollTop(0))
                },
                getColumnByField: function(a) {
                    if (void 0 !== a) {
                        var n;
                        return e.each(t.columns, function(e, t) {
                            if (a === t.field) return n = t, !1
                        }), n
                    }
                },
                getDefaultSortColumn: function() {
                    var a;
                    return e.each(t.columns, function(t, n) {
                        if (void 0 !== n.sortable && -1 !== e.inArray(n.sortable, ["asc", "desc"])) return a = {
                            sort: n.sortable,
                            field: n.field
                        }, !1
                    }), a
                },
                getHiddenDimensions: function(t, a) {
                    var n = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        o = {
                            width: 0,
                            height: 0,
                            innerWidth: 0,
                            innerHeight: 0,
                            outerWidth: 0,
                            outerHeight: 0
                        },
                        i = e(t).parents().addBack().not(":visible");
                    a = "boolean" == typeof a && a;
                    var l = [];
                    return i.each(function() {
                        var e = {};
                        for (var t in n) e[t] = this.style[t], this.style[t] = n[t];
                        l.push(e)
                    }), o.width = e(t).width(), o.outerWidth = e(t).outerWidth(a), o.innerWidth = e(t).innerWidth(), o.height = e(t).height(), o.innerHeight = e(t).innerHeight(), o.outerHeight = e(t).outerHeight(a), i.each(function(e) {
                        var t = l[e];
                        for (var a in n) this.style[a] = t[a]
                    }), o
                },
                getGeneralSearchKey: function() {
                    var t = e(n.getOption("search.input"));
                    return e(t).prop("name") || e(t).prop("id")
                },
                getObject: function(e, t) {
                    return e.split(".").reduce(function(e, t) {
                        return null !== e && void 0 !== e[t] ? e[t] : null
                    }, t)
                },
                extendObj: function(e, t, a) {
                    function n(e) {
                        var t = o[i++];
                        void 0 !== e[t] && null !== e[t] ? "object" != typeof e[t] && "function" != typeof e[t] && (e[t] = {}) : e[t] = {}, i === o.length ? e[t] = a : n(e[t])
                    }
                    var o = t.split("."),
                        i = 0;
                    return n(e), e
                },
                timer: 0,
                redraw: function() {
                    return n.adjustCellsWidth.call(), n.isLocked() && n.adjustCellsHeight.call(), n.adjustLockContainer.call(), n.initHeight.call(), a
                },
                load: function() {
                    return n.reload(), a
                },
                reload: function() {
                    return function(e, t) {
                        clearTimeout(n.timer), n.timer = setTimeout(e, t)
                    }(function() {
                        !0 !== t.data.serverFiltering && n.localDataUpdate(), n.dataRender(), e(a).trigger("m-datatable--on-reloaded")
                    }, n.getOption("search.delay")), a
                },
                getRecord: function(t) {
                    return void 0 === a.tableBody && (a.tableBody = e(a.table).children("tbody")), e(a.tableBody).find(".m-datatable__cell:first-child").each(function(o, i) {
                        if (t == e(i).text()) {
                            var l = e(i).closest(".m-datatable__row").index() + 1;
                            return a.API.record = a.API.value = n.getOneRow(a.tableBody, l), a
                        }
                    }), a
                },
                getColumn: function(t) {
                    return n.setSelectedRecords(), a.API.value = e(a.API.record).find('[data-field="' + t + '"]'), a
                },
                destroy: function() {
                    e(a).parent().find(".m-datatable__pager").remove();
                    var t = e(a.initialDatatable).addClass("m-datatable--destroyed").show();
                    return e(a).replaceWith(t), a = t, e(a).trigger("m-datatable--on-destroy"), n.isInit = !1, t = null
                },
                sort: function(t, n) {
                    return void 0 === n && (n = "asc"), e(a.tableHead).find('.m-datatable__cell[data-field="' + t + '"]').trigger("click"), a
                },
                getValue: function() {
                    return e(a.API.value).text()
                },
                setActive: function(t) {
                    "string" == typeof t && (t = e(a.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + t + '"]')), e(t).prop("checked", !0);
                    var n = e(t).closest(".m-datatable__row").addClass("m-datatable__row--active"),
                        o = e(n).index() + 1;
                    e(n).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + o + ")").addClass("m-datatable__row--active");
                    var i = [];
                    e(n).each(function(t, a) {
                        var n = e(a).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
                        void 0 !== n && i.push(n)
                    }), e(a).trigger("m-datatable--on-check", [i])
                },
                setInactive: function(t) {
                    "string" == typeof t && (t = e(a.tableBody).find('.m-checkbox--single > [type="checkbox"][value="' + t + '"]')), e(t).prop("checked", !1);
                    var n = e(t).closest(".m-datatable__row").removeClass("m-datatable__row--active"),
                        o = e(n).index() + 1;
                    e(n).closest(".m-datatable__lock").parent().find(".m-datatable__row:nth-child(" + o + ")").removeClass("m-datatable__row--active");
                    var i = [];
                    e(n).each(function(t, a) {
                        var n = e(a).find('.m-checkbox--single:not(.m-checkbox--all) > [type="checkbox"]').val();
                        void 0 !== n && i.push(n)
                    }), e(a).trigger("m-datatable--on-uncheck", [i])
                },
                setActiveAll: function(t) {
                    var o = e(a.table).find(".m-datatable__body .m-datatable__row").find('.m-datatable__cell .m-checkbox [type="checkbox"]');
                    t ? n.setActive(o) : n.setInactive(o)
                },
                setSelectedRecords: function() {
                    return a.API.record = e(a.tableBody).find(".m-datatable__row--active"), a
                },
                getSelectedRecords: function() {
                    return n.setSelectedRecords(), a.API.record = a.rows(".m-datatable__row--active").nodes(), a.API.record
                },
                getOption: function(e) {
                    return n.getObject(e, t)
                },
                setOption: function(e, a) {
                    t = n.extendObj(t, e, a)
                },
                search: function(a, o) {
                    void 0 !== o && (o = e.makeArray(o));
                    (function(e, t) {
                        clearTimeout(n.timer), n.timer = setTimeout(e, t)
                    })(function() {
                        var i = n.getDataSourceQuery();
                        if (void 0 === o && void 0 !== a) {
                            var l = n.getGeneralSearchKey();
                            i[l] = a
                        }
                        "object" == typeof o && (e.each(o, function(e, t) {
                            i[t] = a
                        }), e.each(i, function(e, t) {
                            "" === t && delete i[e]
                        })), n.setDataSourceQuery(i), !0 !== t.data.serverFiltering && n.localDataUpdate(), n.dataRender()
                    }, n.getOption("search.delay"))
                },
                setDataSourceParam: function(t, o) {
                    a.API.params = e.extend({}, {
                        pagination: {
                            page: 1,
                            perpage: n.getOption("data.pageSize")
                        },
                        sort: n.getDefaultSortColumn(),
                        query: {}
                    }, a.API.params, n.stateGet(n.stateId)), a.API.params = n.extendObj(a.API.params, t, o), n.stateKeep(n.stateId, a.API.params)
                },
                getDataSourceParam: function(t) {
                    return a.API.params = e.extend({}, {
                        pagination: {
                            page: 1,
                            perpage: n.getOption("data.pageSize")
                        },
                        sort: n.getDefaultSortColumn(),
                        query: {}
                    }, a.API.params, n.stateGet(n.stateId)), "string" == typeof t ? n.getObject(t, a.API.params) : a.API.params
                },
                getDataSourceQuery: function() {
                    return n.getDataSourceParam("query") || {}
                },
                setDataSourceQuery: function(e) {
                    n.setDataSourceParam("query", e)
                },
                getCurrentPage: function() {
                    return e(a.table).siblings(".m-datatable__pager").last().find(".m-datatable__pager-nav").find(".m-datatable__pager-link.m-datatable__pager-link--active").data("page") || 1
                },
                getPageSize: function() {
                    return e(a.table).siblings(".m-datatable__pager").last().find(".m-datatable__pager-size").val() || 10
                },
                getTotalRows: function() {
                    return a.API.params.pagination.total
                },
                getDataSet: function() {
                    return a.originalDataSet
                },
                hideColumn: function(n) {
                    e.map(t.columns, function(e) {
                        return n === e.field && (e.responsive = {
                            hidden: "xl"
                        }), e
                    });
                    var o = e.grep(e(a.table).find(".m-datatable__cell"), function(t, a) {
                        return n === e(t).data("field")
                    });
                    e(o).hide()
                },
                showColumn: function(n) {
                    e.map(t.columns, function(e) {
                        return n === e.field && delete e.responsive, e
                    });
                    var o = e.grep(e(a.table).find(".m-datatable__cell"), function(t, a) {
                        return n === e(t).data("field")
                    });
                    e(o).show()
                },
                destroyScroller: function(t) {
                    void 0 === t && (t = a.tableBody), e(t).each(function() {
                        if (e(this).hasClass("mCustomScrollbar")) try {
                            mApp.destroyScroller(e(this))
                        } catch (e) {
                            console.log(e)
                        }
                    })
                },
                nodeTr: [],
                nodeTd: [],
                nodeCols: [],
                recentNode: [],
                table: function() {
                    return a.table
                },
                row: function(t) {
                    return n.rows(t), n.nodeTr = n.recentNode = e(n.nodeTr).first(), a
                },
                rows: function(t) {
                    return n.nodeTr = n.recentNode = e(a.tableBody).find(t).filter(".m-datatable__row"), a
                },
                column: function(t) {
                    return n.nodeCols = n.recentNode = e(a.tableBody).find(".m-datatable__cell:nth-child(" + (t + 1) + ")"), a
                },
                columns: function(t) {
                    var o = a.table;
                    n.nodeTr === n.recentNode && (o = n.nodeTr);
                    var i = e(o).find('.m-datatable__cell[data-field="' + t + '"]');
                    return i.length > 0 ? n.nodeCols = n.recentNode = i : n.nodeCols = n.recentNode = e(o).find(t).filter(".m-datatable__cell"), a
                },
                cell: function(t) {
                    return n.cells(t), n.nodeTd = n.recentNode = e(n.nodeTd).first(), a
                },
                cells: function(t) {
                    var o = e(a.tableBody).find(".m-datatable__cell");
                    return void 0 !== t && (o = e(o).filter(t)), n.nodeTd = n.recentNode = o, a
                },
                remove: function() {
                    return e(n.nodeTr.length) && n.nodeTr === n.recentNode && e(n.nodeTr).remove(), a
                },
                visible: function(t) {
                    e(n.recentNode.length) && (t ? (n.recentNode === n.nodeCols && n.setOption("columns." + n.recentNode.index() + ".responsive", {}), e(n.recentNode).show(), n.redraw()) : (n.recentNode === n.nodeCols && n.setOption("columns." + n.recentNode.index() + ".responsive", {
                        hidden: "xl"
                    }), e(n.recentNode).hide(), n.redraw()))
                },
                nodes: function() {
                    return n.recentNode
                },
                dataset: function() {
                    return a
                }
            };
            if (e.each(n, function(e, t) {
                    a[e] = t
                }), void 0 !== t)
                if ("string" == typeof t) {
                    var o = t;
                    void 0 !== (a = e(this).data("mDatatable")) && (t = a.options, n[o].apply(this, Array.prototype.slice.call(arguments, 1)))
                } else a.data("mDatatable") || e(this).hasClass("m-datatable--loaded") || (a.dataSet = null, a.textAlign = {
                    left: "m-datatable__cell--left",
                    center: "m-datatable__cell--center",
                    right: "m-datatable__cell--right"
                }, t = e.extend(!0, {}, e.fn.mDatatable.defaults, t), a.options = t, n.init.apply(this, [t]), e(a.wrap).data("mDatatable", a));
            else void 0 === (a = e(this).data("mDatatable")) && e.error("mDatatable not initialized"), t = a.options;
            return a
        }, e.fn.mDatatable.defaults = {
            data: {
                type: "local",
                source: null,
                pageSize: 10,
                saveState: {
                    cookie: !1,
                    webstorage: !0
                },
                serverPaging: !1,
                serverFiltering: !1,
                serverSorting: !1,
                autoColumns: !1
            },
            layout: {
                theme: "default",
                class: "m-datatable--brand",
                scroll: !1,
                height: null,
                minHeight: "auto",
                footer: !1,
                header: !0,
                smoothScroll: {
                    scrollbarShown: !0
                },
                spinner: {
                    overlayColor: "#000000",
                    opacity: 0,
                    type: "loader",
                    state: "brand",
                    message: !0
                },
                icons: {
                    sort: {
                        asc: "icon ni ni-caret-up-fill",
                        desc: "icon ni ni-caret-down-fill"
                    },
                    pagination: {
                        next: "icon ni ni-caret-right-fill",
                        prev: "icon ni ni-caret-left-fill",
                        first: "icon ni ni-chevrons-left",
                        last: "icon ni ni-chevrons-right",
                        more: "icon ni ni-more-h"
                    },
                    rowDetail: {
                        expand: "icon ni ni-caret-down-fill",
                        collapse: "icon ni ni-caret-right-fill"
                    }
                }
            },
            sortable: !0,
            resizable: !1,
            filterable: !1,
            pagination: !0,
            editable: !1,
            columns: [],
            search: {
                onEnter: !1,
                input: null,
                delay: 400
            },
            rows: {
                callback: function() {},
                beforeTemplate: function() {},
                afterTemplate: function() {},
                autoHide: !1
            },
            toolbar: {
                layout: ["pagination", "info"],
                placement: ["bottom"],
                items: {
                    pagination: {
                        type: "default",
                        pages: {
                            desktop: {
                                layout: "default",
                                pagesNumber: 6
                            },
                            tablet: {
                                layout: "default",
                                pagesNumber: 3
                            },
                            mobile: {
                                layout: "compact"
                            }
                        },
                        navigation: {
                            prev: !0,
                            next: !0,
                            first: !0,
                            last: !0
                        },
                        pageSizeSelect: []
                    },
                    info: !0
                }
            },
            translate: {
                records: {
                    processing: "Please wait...",
                    noRecords: "No records found"
                },
                toolbar: {
                    pagination: {
                        items: {
                            default: {
                                first: "First",
                                prev: "Previous",
                                next: "Next",
                                last: "Last",
                                more: "More pages",
                                input: "Page number",
                                select: "Select page size"
                            },
                            info: "Displaying {{start}} - {{end}} of {{total}} records"
                        }
                    }
                }
            },
            extensions: {}
        }
    }(jQuery);

var defaults = {
    layout: {
        icons: {
            pagination: {
                        next: "icon ni ni-caret-right-fill",
                        prev: "icon ni ni-caret-left-fill",
                        first: "icon ni ni-chevrons-left",
                        last: "icon ni ni-chevrons-right",
                        more: "icon ni ni-more-h"
            },
            rowDetail: {
                        expand: "icon ni ni-caret-down-fill",
                        collapse: "icon ni ni-caret-right-fill"
            }
        }
    }
};
mUtil.isRTL() && (defaults = {
    layout: {
        icons: {
            pagination: {
                next: "la la-angle-left",
                prev: "la la-angle-right",
                last: "la la-angle-double-left",
                first: "la la-angle-double-right"
            },
            rowDetail: {
                collapse: "fa fa-caret-down",
                expand: "fa fa-caret-right"
            }
        }
    }
}), $.extend(!0, $.fn.mDatatable.defaults, defaults);

