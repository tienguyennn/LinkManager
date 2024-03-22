/*
 Highstock JS v8.2.2 (2020-10-22)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(T, Q) {
    "object" === typeof module && module.exports ?
        ((Q["default"] = Q), (module.exports = T.document ? Q(T) : Q)) :
        "function" === typeof define && define.amd ?
        define("highcharts/highstock", function() {
            return Q(T);
        }) :
        (T.Highcharts && T.Highcharts.error(16, !0), (T.Highcharts = Q(T)));
})("undefined" !== typeof window ? window : this, function(T) {
    function Q(B, t, k, D) {
        B.hasOwnProperty(t) || (B[t] = D.apply(null, k));
    }
    var k = {};
    Q(k, "Core/Globals.js", [], function() {
        var B =
            "undefined" !== typeof T ?
            T :
            "undefined" !== typeof window ?
            window :
            {},
            t = B.document,
            k = (B.navigator && B.navigator.userAgent) || "",
            D =
            t &&
            t.createElementNS &&
            !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            J = /(edge|msie|trident)/i.test(k) && !B.opera,
            M = -1 !== k.indexOf("Firefox"),
            n = -1 !== k.indexOf("Chrome"),
            z = M && 4 > parseInt(k.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "8.2.2",
            deg2rad: (2 * Math.PI) / 360,
            doc: t,
            hasBidiBug: z,
            hasTouch: !!B.TouchEvent,
            isMS: J,
            isWebKit: -1 !== k.indexOf("AppleWebKit"),
            isFirefox: M,
            isChrome: n,
            isSafari: !n && -1 !== k.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(k),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            win: B,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: [],
            dateFormats: {},
        };
    });
    Q(k, "Core/Utilities.js", [k["Core/Globals.js"]], function(B) {
        function t(c, l, x, a) {
            var e = l ? "Highcharts error" : "Highcharts warning";
            32 === c && (c = e + ": Deprecated member");
            var v = m(c),
                f = v ?
                e + " #" + c + ": www.highcharts.com/errors/" + c + "/" :
                c.toString();
            e = function() {
                if (l) throw Error(f);
                d.console && -1 === t.messages.indexOf(f) && console.log(f);
            };
            if ("undefined" !== typeof a) {
                var R = "";
                v && (f += "?");
                W(a, function(c, l) {
                    R += "\n - " + l + ": " + c;
                    v && (f += encodeURI(l) + "=" + encodeURI(c));
                });
                f += R;
            }
            x ? ca(x, "displayError", { code: c, message: f, params: a }, e) : e();
            t.messages.push(f);
        }

        function k() {
            var c,
                l = arguments,
                x = {},
                a = function(c, l) {
                    "object" !== typeof c && (c = {});
                    W(l, function(x, e) {
                        !D(x, !0) || r(x) || w(x) ?
                            (c[e] = l[e]) :
                            (c[e] = a(c[e] || {}, x));
                    });
                    return c;
                };
            !0 === l[0] && ((x = l[1]), (l = Array.prototype.slice.call(l, 2)));
            var e = l.length;
            for (c = 0; c < e; c++) x = a(x, l[c]);
            return x;
        }

        function D(c, l) {
            return !!c && "object" === typeof c && (!l || !F(c));
        }

        function J(c, l, x) {
            var a;
            u(l) ?
                q(x) ?
                c.setAttribute(l, x) :
                c &&
                c.getAttribute &&
                ((a = c.getAttribute(l)) ||
                    "class" !== l ||
                    (a = c.getAttribute(l + "Name"))) :
                W(l, function(l, x) {
                    c.setAttribute(x, l);
                });
            return a;
        }

        function M() {
            for (var c = arguments, l = c.length, x = 0; x < l; x++) {
                var a = c[x];
                if ("undefined" !== typeof a && null !== a) return a;
            }
        }

        function n(c, l) {
            if (!c) return l;
            var x = c.split(".").reverse();
            if (1 === x.length) return l[c];
            for (
                c = x.pop();
                "undefined" !== typeof c && "undefined" !== typeof l && null !== l;

            )
                (l = l[c]), (c = x.pop());
            return l;
        }
        B.timers = [];
        var z = B.charts,
            G = B.doc,
            d = B.win;
        (t || (t = {})).messages = [];
        B.error = t;
        B.merge = k;
        var O = (B.pInt = function(c, l) {
                return parseInt(c, l || 10);
            }),
            u = (B.isString = function(c) {
                return "string" === typeof c;
            }),
            F = (B.isArray = function(c) {
                c = Object.prototype.toString.call(c);
                return "[object Array]" === c || "[object Array Iterator]" === c;
            });
        B.isObject = D;
        var w = (B.isDOMElement = function(c) {
                return D(c) && "number" === typeof c.nodeType;
            }),
            r = (B.isClass = function(c) {
                var l = c && c.constructor;
                return !(!D(c, !0) || w(c) || !l || !l.name || "Object" === l.name);
            }),
            m = (B.isNumber = function(c) {
                return (
                    "number" === typeof c && !isNaN(c) && Infinity > c && -Infinity < c
                );
            }),
            L = (B.erase = function(c, l) {
                for (var x = c.length; x--;)
                    if (c[x] === l) {
                        c.splice(x, 1);
                        break;
                    }
            }),
            q = (B.defined = function(c) {
                return "undefined" !== typeof c && null !== c;
            });
        B.attr = J;
        var h = (B.splat = function(c) {
                return F(c) ? c : [c];
            }),
            b = (B.syncTimeout = function(c, l, x) {
                if (0 < l) return setTimeout(c, l, x);
                c.call(0, x);
                return -1;
            }),
            g = (B.clearTimeout = function(c) {
                q(c) && clearTimeout(c);
            }),
            f = (B.extend = function(c, l) {
                var x;
                c || (c = {});
                for (x in l) c[x] = l[x];
                return c;
            });
        B.pick = M;
        var a = (B.css = function(c, l) {
                B.isMS &&
                    !B.svg &&
                    l &&
                    "undefined" !== typeof l.opacity &&
                    (l.filter = "alpha(opacity=" + 100 * l.opacity + ")");
                f(c.style, l);
            }),
            p = (B.createElement = function(c, l, x, e, v) {
                c = G.createElement(c);
                l && f(c, l);
                v && a(c, { padding: "0", border: "none", margin: "0" });
                x && a(c, x);
                e && e.appendChild(c);
                return c;
            }),
            e = (B.extendClass = function(c, l) {
                var x = function() {};
                x.prototype = new c();
                f(x.prototype, l);
                return x;
            }),
            E = (B.pad = function(c, l, x) {
                return (
                    Array((l || 2) + 1 - String(c).replace("-", "").length).join(
                        x || "0"
                    ) + c
                );
            }),
            H = (B.relativeLength = function(c, l, x) {
                return /%$/.test(c) ?
                    (l * parseFloat(c)) / 100 + (x || 0) :
                    parseFloat(c);
            }),
            y = (B.wrap = function(c, l, x) {
                var a = c[l];
                c[l] = function() {
                    var c = Array.prototype.slice.call(arguments),
                        l = arguments,
                        e = this;
                    e.proceed = function() {
                        a.apply(e, arguments.length ? arguments : l);
                    };
                    c.unshift(a);
                    c = x.apply(this, c);
                    e.proceed = null;
                    return c;
                };
            }),
            N = (B.format = function(c, l, x) {
                var a = "{",
                    e = !1,
                    v = [],
                    f = /f$/,
                    R = /\.([0-9])/,
                    b = B.defaultOptions.lang,
                    p = (x && x.time) || B.time;
                for (x = (x && x.numberFormatter) || S; c;) {
                    var g = c.indexOf(a);
                    if (-1 === g) break;
                    var h = c.slice(0, g);
                    if (e) {
                        h = h.split(":");
                        a = n(h.shift() || "", l);
                        if (h.length && "number" === typeof a)
                            if (((h = h.join(":")), f.test(h))) {
                                var E = parseInt((h.match(R) || ["", "-1"])[1], 10);
                                null !== a &&
                                    (a = x(
                                        a,
                                        E,
                                        b.decimalPoint, -1 < h.indexOf(",") ? b.thousandsSep : ""
                                    ));
                            } else a = p.dateFormat(h, a);
                        v.push(a);
                    } else v.push(h);
                    c = c.slice(g + 1);
                    a = (e = !e) ? "}" : "{";
                }
                v.push(c);
                return v.join("");
            }),
            P = (B.getMagnitude = function(c) {
                return Math.pow(10, Math.floor(Math.log(c) / Math.LN10));
            }),
            K = (B.normalizeTickInterval = function(c, l, a, e, v) {
                var f = c;
                a = M(a, 1);
                var R = c / a;
                l ||
                    ((l = v ?
                            [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] :
                            [1, 2, 2.5, 5, 10]), !1 === e &&
                        (1 === a ?
                            (l = l.filter(function(c) {
                                return 0 === c % 1;
                            })) :
                            0.1 >= a && (l = [1 / a])));
                for (
                    e = 0; e < l.length &&
                    !((f = l[e]),
                        (v && f * a >= c) || (!v && R <= (l[e] + (l[e + 1] || l[e])) / 2)); e++
                );
                return (f = x(f * a, -Math.round(Math.log(0.001) / Math.LN10)));
            }),
            A = (B.stableSort = function(c, l) {
                var x = c.length,
                    a,
                    e;
                for (e = 0; e < x; e++) c[e].safeI = e;
                c.sort(function(c, x) {
                    a = l(c, x);
                    return 0 === a ? c.safeI - x.safeI : a;
                });
                for (e = 0; e < x; e++) delete c[e].safeI;
            }),
            C = (B.arrayMin = function(c) {
                for (var l = c.length, x = c[0]; l--;) c[l] < x && (x = c[l]);
                return x;
            }),
            v = (B.arrayMax = function(c) {
                for (var l = c.length, x = c[0]; l--;) c[l] > x && (x = c[l]);
                return x;
            }),
            c = (B.destroyObjectProperties = function(c, l) {
                W(c, function(x, a) {
                    x && x !== l && x.destroy && x.destroy();
                    delete c[a];
                });
            }),
            l = (B.discardElement = function(c) {
                var l = B.garbageBin;
                l || (l = p("div"));
                c && l.appendChild(c);
                l.innerHTML = "";
            }),
            x = (B.correctFloat = function(c, l) {
                return parseFloat(c.toPrecision(l || 14));
            }),
            R = (B.timeUnits = {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                week: 6048e5,
                month: 24192e5,
                year: 314496e5,
            }),
            S = (B.numberFormat = function(c, l, x, a) {
                c = +c || 0;
                l = +l;
                var e = B.defaultOptions.lang,
                    v = (c.toString().split(".")[1] || "").split("e")[0].length,
                    f = c.toString().split("e");
                if (-1 === l) l = Math.min(v, 20);
                else if (!m(l)) l = 2;
                else if (l && f[1] && 0 > f[1]) {
                    var R = l + +f[1];
                    0 <= R ?
                        ((f[0] = (+f[0]).toExponential(R).split("e")[0]), (l = R)) :
                        ((f[0] = f[0].split(".")[0] || 0),
                            (c = 20 > l ? (f[0] * Math.pow(10, f[1])).toFixed(l) : 0),
                            (f[1] = 0));
                }
                var b = (
                    Math.abs(f[1] ? f[0] : c) + Math.pow(10, -Math.max(l, v) - 1)
                ).toFixed(l);
                v = String(O(b));
                R = 3 < v.length ? v.length % 3 : 0;
                x = M(x, e.decimalPoint);
                a = M(a, e.thousandsSep);
                c = (0 > c ? "-" : "") + (R ? v.substr(0, R) + a : "");
                c += v.substr(R).replace(/(\d{3})(?=\d)/g, "$1" + a);
                l && (c += x + b.slice(-l));
                f[1] && 0 !== +c && (c += "e" + f[1]);
                return c;
            });
        Math.easeInOutSine = function(c) {
            return -0.5 * (Math.cos(Math.PI * c) - 1);
        };
        var da = (B.getStyle = function(c, l, x) {
                if ("width" === l)
                    return (
                        (l = Math.min(c.offsetWidth, c.scrollWidth)),
                        (x = c.getBoundingClientRect && c.getBoundingClientRect().width),
                        x < l && x >= l - 1 && (l = Math.floor(x)),
                        Math.max(
                            0,
                            l - B.getStyle(c, "padding-left") - B.getStyle(c, "padding-right")
                        )
                    );
                if ("height" === l)
                    return Math.max(
                        0,
                        Math.min(c.offsetHeight, c.scrollHeight) -
                        B.getStyle(c, "padding-top") -
                        B.getStyle(c, "padding-bottom")
                    );
                d.getComputedStyle || t(27, !0);
                if ((c = d.getComputedStyle(c, void 0)))
                    (c = c.getPropertyValue(l)), M(x, "opacity" !== l) && (c = O(c));
                return c;
            }),
            ha = (B.inArray = function(c, l, x) {
                t(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" });
                return l.indexOf(c, x);
            }),
            Y = (B.find = Array.prototype.find ?

                function(c, l) {
                    return c.find(l);
                } :
                function(c, l) {
                    var x,
                        a = c.length;
                    for (x = 0; x < a; x++)
                        if (l(c[x], x)) return c[x];
                });
        B.keys = function(c) {
            t(32, !1, void 0, { "Highcharts.keys": "use Object.keys" });
            return Object.keys(c);
        };
        var Z = (B.offset = function(c) {
                var l = G.documentElement;
                c =
                    c.parentElement || c.parentNode ?
                    c.getBoundingClientRect() :
                    { top: 0, left: 0 };
                return {
                    top: c.top + (d.pageYOffset || l.scrollTop) - (l.clientTop || 0),
                    left: c.left + (d.pageXOffset || l.scrollLeft) - (l.clientLeft || 0),
                };
            }),
            W = (B.objectEach = function(c, l, x) {
                for (var a in c)
                    Object.hasOwnProperty.call(c, a) && l.call(x || c[a], c[a], a, c);
            });
        W({
                map: "map",
                each: "forEach",
                grep: "filter",
                reduce: "reduce",
                some: "some",
            },
            function(c, l) {
                B[l] = function(x) {
                    var a;
                    t(
                        32, !1,
                        void 0,
                        ((a = {}), (a["Highcharts." + l] = "use Array." + c), a)
                    );
                    return Array.prototype[c].apply(x, [].slice.call(arguments, 1));
                };
            }
        );
        var aa = (B.addEvent = function(c, l, x, a) {
                void 0 === a && (a = {});
                var e = c.addEventListener || B.addEventListenerPolyfill;
                var v =
                    "function" === typeof c && c.prototype ?
                    (c.prototype.protoEvents = c.prototype.protoEvents || {}) :
                    (c.hcEvents = c.hcEvents || {});
                B.Point &&
                    c instanceof B.Point &&
                    c.series &&
                    c.series.chart &&
                    (c.series.chart.runTrackerClick = !0);
                e && e.call(c, l, x, !1);
                v[l] || (v[l] = []);
                v[l].push({
                    fn: x,
                    order: "number" === typeof a.order ? a.order : Infinity,
                });
                v[l].sort(function(c, l) {
                    return c.order - l.order;
                });
                return function() {
                    U(c, l, x);
                };
            }),
            U = (B.removeEvent = function(c, l, x) {
                function a(l, x) {
                    var a = c.removeEventListener || B.removeEventListenerPolyfill;
                    a && a.call(c, l, x, !1);
                }

                function e(x) {
                    var e;
                    if (c.nodeName) {
                        if (l) {
                            var v = {};
                            v[l] = !0;
                        } else v = x;
                        W(v, function(c, l) {
                            if (x[l])
                                for (e = x[l].length; e--;) a(l, x[l][e].fn);
                        });
                    }
                }
                var v;
                ["protoEvents", "hcEvents"].forEach(function(f, R) {
                    var b = (R = R ? c : c.prototype) && R[f];
                    b &&
                        (l ?
                            ((v = b[l] || []),
                                x ?
                                ((b[l] = v.filter(function(c) {
                                        return x !== c.fn;
                                    })),
                                    a(l, x)) :
                                (e(b), (b[l] = []))) :
                            (e(b), (R[f] = {})));
                });
            }),
            ca = (B.fireEvent = function(c, l, x, a) {
                var e;
                x = x || {};
                if (G.createEvent && (c.dispatchEvent || c.fireEvent)) {
                    var v = G.createEvent("Events");
                    v.initEvent(l, !0, !0);
                    f(v, x);
                    c.dispatchEvent ? c.dispatchEvent(v) : c.fireEvent(l, v);
                } else
                    x.target ||
                    f(x, {
                        preventDefault: function() {
                            x.defaultPrevented = !0;
                        },
                        target: c,
                        type: l,
                    }),
                    (function(l, a) {
                        void 0 === l && (l = []);
                        void 0 === a && (a = []);
                        var v = 0,
                            f = 0,
                            R = l.length + a.length;
                        for (e = 0; e < R; e++)
                            !1 ===
                            (l[v] ?
                                a[f] ?
                                l[v].order <= a[f].order ?
                                l[v++] :
                                a[f++] :
                                l[v++] :
                                a[f++]
                            ).fn.call(c, x) && x.preventDefault();
                    })(c.protoEvents && c.protoEvents[l], c.hcEvents && c.hcEvents[l]);
                a && !x.defaultPrevented && a.call(c, x);
            }),
            ea,
            ia = (B.uniqueKey = (function() {
                var c = Math.random().toString(36).substring(2, 9) + "-",
                    l = 0;
                return function() {
                    return "highcharts-" + (ea ? "" : c) + l++;
                };
            })()),
            ja = (B.useSerialIds = function(c) {
                return (ea = M(c, ea));
            }),
            ba = (B.isFunction = function(c) {
                return "function" === typeof c;
            }),
            X = (B.getOptions = function() {
                return B.defaultOptions;
            }),
            V = (B.setOptions = function(c) {
                B.defaultOptions = k(!0, B.defaultOptions, c);
                (c.time || c.global) &&
                B.time.update(
                    k(B.defaultOptions.global, B.defaultOptions.time, c.global, c.time)
                );
                return B.defaultOptions;
            });
        d.jQuery &&
            (d.jQuery.fn.highcharts = function() {
                var c = [].slice.call(arguments);
                if (this[0])
                    return c[0] ?
                        (new B[u(c[0]) ? c.shift() : "Chart"](this[0], c[0], c[1]), this) :
                        z[J(this[0], "data-highcharts-chart")];
            });
        return {
            addEvent: aa,
            arrayMax: v,
            arrayMin: C,
            attr: J,
            clamp: function(c, l, x) {
                return c > l ? (c < x ? c : x) : l;
            },
            clearTimeout: g,
            correctFloat: x,
            createElement: p,
            css: a,
            defined: q,
            destroyObjectProperties: c,
            discardElement: l,
            erase: L,
            error: t,
            extend: f,
            extendClass: e,
            find: Y,
            fireEvent: ca,
            format: N,
            getMagnitude: P,
            getNestedProperty: n,
            getOptions: X,
            getStyle: da,
            inArray: ha,
            isArray: F,
            isClass: r,
            isDOMElement: w,
            isFunction: ba,
            isNumber: m,
            isObject: D,
            isString: u,
            merge: k,
            normalizeTickInterval: K,
            numberFormat: S,
            objectEach: W,
            offset: Z,
            pad: E,
            pick: M,
            pInt: O,
            relativeLength: H,
            removeEvent: U,
            setOptions: V,
            splat: h,
            stableSort: A,
            syncTimeout: b,
            timeUnits: R,
            uniqueKey: ia,
            useSerialIds: ja,
            wrap: y,
        };
    });
    Q(
        k,
        "Core/Color/Color.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(B, t) {
            var k = t.isNumber,
                D = t.merge,
                J = t.pInt;
            ("");
            t = (function() {
                function t(n) {
                    this.parsers = [{
                            regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                            parse: function(n) {
                                return [J(n[1]), J(n[2]), J(n[3]), parseFloat(n[4], 10)];
                            },
                        },
                        {
                            regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                            parse: function(n) {
                                return [J(n[1]), J(n[2]), J(n[3]), 1];
                            },
                        },
                    ];
                    this.rgba = [];
                    if (B.Color !== t) return new B.Color(n);
                    if (!(this instanceof t)) return new t(n);
                    this.init(n);
                }
                t.parse = function(n) {
                    return new t(n);
                };
                t.prototype.init = function(n) {
                    var z, G;
                    if (
                        (this.input = n =
                            t.names[n && n.toLowerCase ? n.toLowerCase() : ""] || n) &&
                        n.stops
                    )
                        this.stops = n.stops.map(function(u) {
                            return new t(u[1]);
                        });
                    else {
                        if (n && n.charAt && "#" === n.charAt()) {
                            var d = n.length;
                            n = parseInt(n.substr(1), 16);
                            7 === d ?
                                (z = [(n & 16711680) >> 16, (n & 65280) >> 8, n & 255, 1]) :
                                4 === d &&
                                (z = [
                                    ((n & 3840) >> 4) | ((n & 3840) >> 8),
                                    ((n & 240) >> 4) | (n & 240),
                                    ((n & 15) << 4) | (n & 15),
                                    1,
                                ]);
                        }
                        if (!z)
                            for (G = this.parsers.length; G-- && !z;) {
                                var O = this.parsers[G];
                                (d = O.regex.exec(n)) && (z = O.parse(d));
                            }
                    }
                    this.rgba = z || [];
                };
                t.prototype.get = function(n) {
                    var z = this.input,
                        G = this.rgba;
                    if ("undefined" !== typeof this.stops) {
                        var d = D(z);
                        d.stops = [].concat(d.stops);
                        this.stops.forEach(function(O, u) {
                            d.stops[u] = [d.stops[u][0], O.get(n)];
                        });
                    } else
                        d =
                        G && k(G[0]) ?
                        "rgb" === n || (!n && 1 === G[3]) ?
                        "rgb(" + G[0] + "," + G[1] + "," + G[2] + ")" :
                        "a" === n ?
                        G[3] :
                        "rgba(" + G.join(",") + ")" :
                        z;
                    return d;
                };
                t.prototype.brighten = function(n) {
                    var z,
                        G = this.rgba;
                    if (this.stops)
                        this.stops.forEach(function(d) {
                            d.brighten(n);
                        });
                    else if (k(n) && 0 !== n)
                        for (z = 0; 3 > z; z++)
                            (G[z] += J(255 * n)),
                            0 > G[z] && (G[z] = 0),
                            255 < G[z] && (G[z] = 255);
                    return this;
                };
                t.prototype.setOpacity = function(n) {
                    this.rgba[3] = n;
                    return this;
                };
                t.prototype.tweenTo = function(n, z) {
                    var G = this.rgba,
                        d = n.rgba;
                    d.length && G && G.length ?
                        ((n = 1 !== d[3] || 1 !== G[3]),
                            (z =
                                (n ? "rgba(" : "rgb(") +
                                Math.round(d[0] + (G[0] - d[0]) * (1 - z)) +
                                "," +
                                Math.round(d[1] + (G[1] - d[1]) * (1 - z)) +
                                "," +
                                Math.round(d[2] + (G[2] - d[2]) * (1 - z)) +
                                (n ? "," + (d[3] + (G[3] - d[3]) * (1 - z)) : "") +
                                ")")) :
                        (z = n.input || "none");
                    return z;
                };
                t.names = { white: "#ffffff", black: "#000000" };
                return t;
            })();
            B.Color = t;
            B.color = t.parse;
            return t;
        }
    );
    Q(
        k,
        "Core/Animation/Fx.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(B, t) {
            var k = B.win,
                D = t.isNumber,
                J = t.objectEach;
            t = (function() {
                function t(n, z, G) {
                    this.pos = NaN;
                    this.options = z;
                    this.elem = n;
                    this.prop = G;
                }
                t.prototype.dSetter = function() {
                    var n = this.paths,
                        z = n && n[0];
                    n = n && n[1];
                    var G = [],
                        d = this.now || 0;
                    if (1 !== d && z && n)
                        if (z.length === n.length && 1 > d)
                            for (var O = 0; O < n.length; O++) {
                                for (var u = z[O], F = n[O], w = [], r = 0; r < F.length; r++) {
                                    var m = u[r],
                                        L = F[r];
                                    w[r] =
                                        "number" === typeof m &&
                                        "number" === typeof L &&
                                        ("A" !== F[0] || (4 !== r && 5 !== r)) ?
                                        m + d * (L - m) :
                                        L;
                                }
                                G.push(w);
                            }
                        else G = n;
                    else G = this.toD || [];
                    this.elem.attr("d", G, void 0, !0);
                };
                t.prototype.update = function() {
                    var n = this.elem,
                        z = this.prop,
                        G = this.now,
                        d = this.options.step;
                    if (this[z + "Setter"]) this[z + "Setter"]();
                    else
                        n.attr ?
                        n.element && n.attr(z, G, null, !0) :
                        (n.style[z] = G + this.unit);
                    d && d.call(n, G, this);
                };
                t.prototype.run = function(n, z, G) {
                    var d = this,
                        O = d.options,
                        u = function(r) {
                            return u.stopped ? !1 : d.step(r);
                        },
                        F =
                        k.requestAnimationFrame ||
                        function(r) {
                            setTimeout(r, 13);
                        },
                        w = function() {
                            for (var r = 0; r < B.timers.length; r++)
                                B.timers[r]() || B.timers.splice(r--, 1);
                            B.timers.length && F(w);
                        };
                    n !== z || this.elem["forceAnimate:" + this.prop] ?
                        ((this.startTime = +new Date()),
                            (this.start = n),
                            (this.end = z),
                            (this.unit = G),
                            (this.now = this.start),
                            (this.pos = 0),
                            (u.elem = this.elem),
                            (u.prop = this.prop),
                            u() && 1 === B.timers.push(u) && F(w)) :
                        (delete O.curAnim[this.prop],
                            O.complete &&
                            0 === Object.keys(O.curAnim).length &&
                            O.complete.call(this.elem));
                };
                t.prototype.step = function(n) {
                    var z = +new Date(),
                        G = this.options,
                        d = this.elem,
                        O = G.complete,
                        u = G.duration,
                        F = G.curAnim;
                    if (d.attr && !d.element) n = !1;
                    else if (n || z >= u + this.startTime) {
                        this.now = this.end;
                        this.pos = 1;
                        this.update();
                        var w = (F[this.prop] = !0);
                        J(F, function(r) {
                            !0 !== r && (w = !1);
                        });
                        w && O && O.call(d);
                        n = !1;
                    } else
                        (this.pos = G.easing((z - this.startTime) / u)),
                        (this.now = this.start + (this.end - this.start) * this.pos),
                        this.update(),
                        (n = !0);
                    return n;
                };
                t.prototype.initPath = function(n, z, G) {
                    function d(h, b) {
                        for (; h.length < q;) {
                            var g = h[0],
                                f = b[q - h.length];
                            f &&
                                "M" === g[0] &&
                                (h[0] =
                                    "C" === f[0] ?
                                    ["C", g[1], g[2], g[1], g[2], g[1], g[2]] :
                                    ["L", g[1], g[2]]);
                            h.unshift(g);
                            w && h.push(h[h.length - 1]);
                        }
                    }

                    function O(h, b) {
                        for (; h.length < q;)
                            if (
                                ((b = h[h.length / r - 1].slice()),
                                    "C" === b[0] && ((b[1] = b[5]), (b[2] = b[6])),
                                    w)
                            ) {
                                var g = h[h.length / r].slice();
                                h.splice(h.length / 2, 0, b, g);
                            } else h.push(b);
                    }
                    var u = n.startX,
                        F = n.endX;
                    z = z && z.slice();
                    G = G.slice();
                    var w = n.isArea,
                        r = w ? 2 : 1;
                    if (!z) return [G, G];
                    if (u && F) {
                        for (n = 0; n < u.length; n++)
                            if (u[n] === F[0]) {
                                var m = n;
                                break;
                            } else if (u[0] === F[F.length - u.length + n]) {
                            m = n;
                            var L = !0;
                            break;
                        } else if (u[u.length - 1] === F[F.length - u.length + n]) {
                            m = u.length - n;
                            break;
                        }
                        "undefined" === typeof m && (z = []);
                    }
                    if (z.length && D(m)) {
                        var q = G.length + m * r;
                        L ? (d(z, G), O(G, z)) : (d(G, z), O(z, G));
                    }
                    return [z, G];
                };
                t.prototype.fillSetter = function() {
                    t.prototype.strokeSetter.apply(this, arguments);
                };
                t.prototype.strokeSetter = function() {
                    this.elem.attr(
                        this.prop,
                        B.color(this.start).tweenTo(B.color(this.end), this.pos),
                        null, !0
                    );
                };
                return t;
            })();
            return (B.Fx = t);
        }
    );
    Q(
        k,
        "Core/Animation/AnimationUtilities.js", [k["Core/Animation/Fx.js"], k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(B, t, k) {
            var D = k.defined,
                J = k.getStyle,
                I = k.isArray,
                n = k.isNumber,
                z = k.isObject,
                G = k.merge,
                d = k.objectEach,
                O = k.pick;
            k = t.setAnimation = function(m, r) {
                r.renderer.globalAnimation = O(m, r.options.chart.animation, !0);
            };
            var u = (t.animObject = function(m) {
                    return z(m) ?
                        t.merge({ duration: 500, defer: 0 }, m) :
                        { duration: m ? 500 : 0, defer: 0 };
                }),
                F = (t.getDeferredAnimation = function(m, r, q) {
                    var h = u(r),
                        b = 0,
                        g = 0;
                    (q ? [q] : m.series).forEach(function(f) {
                        f = u(f.options.animation);
                        b = r && D(r.defer) ? h.defer : Math.max(b, f.duration + f.defer);
                        g = Math.min(h.duration, f.duration);
                    });
                    m.renderer.forExport && (b = 0);
                    return { defer: Math.max(0, b - g), duration: Math.min(b, g) };
                }),
                w = (t.animate = function(m, L, q) {
                    var h,
                        b = "",
                        g,
                        f;
                    if (!z(q)) {
                        var a = arguments;
                        q = { duration: a[2], easing: a[3], complete: a[4] };
                    }
                    n(q.duration) || (q.duration = 400);
                    q.easing =
                        "function" === typeof q.easing ?
                        q.easing :
                        Math[q.easing] || Math.easeInOutSine;
                    q.curAnim = G(L);
                    d(L, function(a, e) {
                        r(m, e);
                        f = new B(m, q, e);
                        g = null;
                        "d" === e && I(L.d) ?
                            ((f.paths = f.initPath(m, m.pathArray, L.d)),
                                (f.toD = L.d),
                                (h = 0),
                                (g = 1)) :
                            m.attr ?
                            (h = m.attr(e)) :
                            ((h = parseFloat(J(m, e)) || 0), "opacity" !== e && (b = "px"));
                        g || (g = a);
                        g && g.match && g.match("px") && (g = g.replace(/px/g, ""));
                        f.run(h, g, b);
                    });
                }),
                r = (t.stop = function(m, r) {
                    for (var q = t.timers.length; q--;)
                        t.timers[q].elem !== m ||
                        (r && r !== t.timers[q].prop) ||
                        (t.timers[q].stopped = !0);
                });
            return {
                animate: w,
                animObject: u,
                getDeferredAnimation: F,
                setAnimation: k,
                stop: r,
            };
        }
    );
    Q(
        k,
        "Core/Renderer/SVG/SVGElement.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Color/Color.js"],
            k["Core/Globals.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D) {
            var B = k.animate,
                M = k.animObject,
                n = k.stop,
                z = I.deg2rad,
                G = I.doc,
                d = I.hasTouch,
                O = I.isFirefox,
                u = I.noop,
                F = I.svg,
                w = I.SVG_NS,
                r = I.win,
                m = D.attr,
                L = D.createElement,
                q = D.css,
                h = D.defined,
                b = D.erase,
                g = D.extend,
                f = D.fireEvent,
                a = D.isArray,
                p = D.isFunction,
                e = D.isNumber,
                E = D.isString,
                H = D.merge,
                y = D.objectEach,
                N = D.pick,
                P = D.pInt,
                K = D.syncTimeout,
                A = D.uniqueKey;
            ("");
            k = (function() {
                function C() {
                    this.height = this.element = void 0;
                    this.opacity = 1;
                    this.renderer = void 0;
                    this.SVG_NS = w;
                    this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(
                        " "
                    );
                    this.width = void 0;
                }
                C.prototype._defaultGetter = function(a) {
                    a = N(
                        this[a + "Value"],
                        this[a],
                        this.element ? this.element.getAttribute(a) : null,
                        0
                    );
                    /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                    return a;
                };
                C.prototype._defaultSetter = function(a, c, l) {
                    l.setAttribute(c, a);
                };
                C.prototype.add = function(a) {
                    var c = this.renderer,
                        l = this.element;
                    a && (this.parentGroup = a);
                    this.parentInverted = a && a.inverted;
                    "undefined" !== typeof this.textStr &&
                        "text" === this.element.nodeName &&
                        c.buildText(this);
                    this.added = !0;
                    if (!a || a.handleZ || this.zIndex) var x = this.zIndexSetter();
                    x || (a ? a.element : c.box).appendChild(l);
                    if (this.onAdd) this.onAdd();
                    return this;
                };
                C.prototype.addClass = function(a, c) {
                    var l = c ? "" : this.attr("class") || "";
                    a = (a || "")
                        .split(/ /g)
                        .reduce(
                            function(c, a) {
                                -1 === l.indexOf(a) && c.push(a);
                                return c;
                            },
                            l ? [l] : []
                        )
                        .join(" ");
                    a !== l && this.attr("class", a);
                    return this;
                };
                C.prototype.afterSetters = function() {
                    this.doTransform && (this.updateTransform(), (this.doTransform = !1));
                };
                C.prototype.align = function(a, c, l) {
                    var x,
                        e = {};
                    var f = this.renderer;
                    var v = f.alignedObjects;
                    var p, g;
                    if (a) {
                        if (
                            ((this.alignOptions = a), (this.alignByTranslate = c), !l || E(l))
                        )
                            (this.alignTo = x = l || "renderer"),
                            b(v, this),
                            v.push(this),
                            (l = void 0);
                    } else
                        (a = this.alignOptions),
                        (c = this.alignByTranslate),
                        (x = this.alignTo);
                    l = N(l, f[x], f);
                    x = a.align;
                    f = a.verticalAlign;
                    v = (l.x || 0) + (a.x || 0);
                    var h = (l.y || 0) + (a.y || 0);
                    "right" === x ? (p = 1) : "center" === x && (p = 2);
                    p && (v += (l.width - (a.width || 0)) / p);
                    e[c ? "translateX" : "x"] = Math.round(v);
                    "bottom" === f ? (g = 1) : "middle" === f && (g = 2);
                    g && (h += (l.height - (a.height || 0)) / g);
                    e[c ? "translateY" : "y"] = Math.round(h);
                    this[this.placed ? "animate" : "attr"](e);
                    this.placed = !0;
                    this.alignAttr = e;
                    return this;
                };
                C.prototype.alignSetter = function(a) {
                    var c = { left: "start", center: "middle", right: "end" };
                    c[a] &&
                        ((this.alignValue = a),
                            this.element.setAttribute("text-anchor", c[a]));
                };
                C.prototype.animate = function(a, c, l) {
                    var x = this,
                        e = M(N(c, this.renderer.globalAnimation, !0));
                    c = e.defer;
                    N(G.hidden, G.msHidden, G.webkitHidden, !1) && (e.duration = 0);
                    0 !== e.duration ?
                        (l && (e.complete = l),
                            K(function() {
                                x.element && B(x, a, e);
                            }, c)) :
                        (this.attr(a, void 0, l),
                            y(
                                a,
                                function(c, l) {
                                    e.step && e.step.call(this, c, { prop: l, pos: 1 });
                                },
                                this
                            ));
                    return this;
                };
                C.prototype.applyTextOutline = function(a) {
                    var c = this.element,
                        l; -
                    1 !== a.indexOf("contrast") &&
                        (a = a.replace(
                            /contrast/g,
                            this.renderer.getContrast(c.style.fill)
                        ));
                    a = a.split(" ");
                    var x = a[a.length - 1];
                    if ((l = a[0]) && "none" !== l && I.svg) {
                        this.fakeTS = !0;
                        a = [].slice.call(c.getElementsByTagName("tspan"));
                        this.ySetter = this.xSetter;
                        l = l.replace(/(^[\d\.]+)(.*?)$/g, function(c, l, a) {
                            return 2 * l + a;
                        });
                        this.removeTextOutline(a);
                        var e = c.textContent ?
                            /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(
                                c.textContent
                            ) :
                            !1;
                        var f = c.firstChild;
                        a.forEach(function(a, v) {
                            0 === v &&
                                (a.setAttribute("x", c.getAttribute("x")),
                                    (v = c.getAttribute("y")),
                                    a.setAttribute("y", v || 0),
                                    null === v && c.setAttribute("y", 0));
                            v = a.cloneNode(!0);
                            m(e && !O ? a : v, {
                                class: "highcharts-text-outline",
                                fill: x,
                                stroke: x,
                                "stroke-width": l,
                                "stroke-linejoin": "round",
                            });
                            c.insertBefore(v, f);
                        });
                        e &&
                            O &&
                            a[0] &&
                            ((a = a[0].cloneNode(!0)),
                                (a.textContent = " "),
                                c.insertBefore(a, f));
                    }
                };
                C.prototype.attr = function(a, c, l, x) {
                    var e = this.element,
                        f,
                        v = this,
                        b,
                        p,
                        g = this.symbolCustomAttribs;
                    if ("string" === typeof a && "undefined" !== typeof c) {
                        var h = a;
                        a = {};
                        a[h] = c;
                    }
                    "string" === typeof a
                        ?
                        (v = (this[a + "Getter"] || this._defaultGetter).call(this, a, e)) :
                        (y(
                                a,
                                function(c, l) {
                                    b = !1;
                                    x || n(this, l);
                                    this.symbolName &&
                                        -1 !== g.indexOf(l) &&
                                        (f || (this.symbolAttr(a), (f = !0)), (b = !0));
                                    !this.rotation ||
                                        ("x" !== l && "y" !== l) ||
                                        (this.doTransform = !0);
                                    b ||
                                        ((p = this[l + "Setter"] || this._defaultSetter),
                                            p.call(this, c, l, e), !this.styledMode &&
                                            this.shadows &&
                                            /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                                                l
                                            ) &&
                                            this.updateShadows(l, c, p));
                                },
                                this
                            ),
                            this.afterSetters());
                    l && l.call(this);
                    return v;
                };
                C.prototype.clip = function(a) {
                    return this.attr(
                        "clip-path",
                        a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none"
                    );
                };
                C.prototype.crisp = function(a, c) {
                    c = c || a.strokeWidth || 0;
                    var l = (Math.round(c) % 2) / 2;
                    a.x = Math.floor(a.x || this.x || 0) + l;
                    a.y = Math.floor(a.y || this.y || 0) + l;
                    a.width = Math.floor((a.width || this.width || 0) - 2 * l);
                    a.height = Math.floor((a.height || this.height || 0) - 2 * l);
                    h(a.strokeWidth) && (a.strokeWidth = c);
                    return a;
                };
                C.prototype.complexColor = function(e, c, l) {
                    var x = this.renderer,
                        b,
                        v,
                        p,
                        g,
                        E,
                        m,
                        C,
                        q,
                        N,
                        K,
                        r = [],
                        P;
                    f(this.renderer, "complexColor", { args: arguments }, function() {
                        e.radialGradient ?
                            (v = "radialGradient") :
                            e.linearGradient && (v = "linearGradient");
                        if (v) {
                            p = e[v];
                            E = x.gradients;
                            m = e.stops;
                            N = l.radialReference;
                            a(p) &&
                                (e[v] = p = {
                                    x1: p[0],
                                    y1: p[1],
                                    x2: p[2],
                                    y2: p[3],
                                    gradientUnits: "userSpaceOnUse",
                                });
                            "radialGradient" === v &&
                                N &&
                                !h(p.gradientUnits) &&
                                ((g = p),
                                    (p = H(p, x.getRadialAttr(N, g), {
                                        gradientUnits: "userSpaceOnUse",
                                    })));
                            y(p, function(c, l) {
                                "id" !== l && r.push(l, c);
                            });
                            y(m, function(c) {
                                r.push(c);
                            });
                            r = r.join(",");
                            if (E[r]) K = E[r].attr("id");
                            else {
                                p.id = K = A();
                                var f = (E[r] = x.createElement(v).attr(p).add(x.defs));
                                f.radAttr = g;
                                f.stops = [];
                                m.forEach(function(c) {
                                    0 === c[1].indexOf("rgba") ?
                                        ((b = t.parse(c[1])),
                                            (C = b.get("rgb")),
                                            (q = b.get("a"))) :
                                        ((C = c[1]), (q = 1));
                                    c = x
                                        .createElement("stop")
                                        .attr({ offset: c[0], "stop-color": C, "stop-opacity": q })
                                        .add(f);
                                    f.stops.push(c);
                                });
                            }
                            P = "url(" + x.url + "#" + K + ")";
                            l.setAttribute(c, P);
                            l.gradient = r;
                            e.toString = function() {
                                return P;
                            };
                        }
                    });
                };
                C.prototype.css = function(a) {
                    var c = this.styles,
                        l = {},
                        x = this.element,
                        e = "",
                        f = !c,
                        b = ["textOutline", "textOverflow", "width"];
                    a && a.color && (a.fill = a.color);
                    c &&
                        y(a, function(a, x) {
                            c && c[x] !== a && ((l[x] = a), (f = !0));
                        });
                    if (f) {
                        c && (a = g(c, l));
                        if (a)
                            if (null === a.width || "auto" === a.width) delete this.textWidth;
                            else if ("text" === x.nodeName.toLowerCase() && a.width)
                            var p = (this.textWidth = P(a.width));
                        this.styles = a;
                        p && !F && this.renderer.forExport && delete a.width;
                        if (x.namespaceURI === this.SVG_NS) {
                            var v = function(c, l) {
                                return "-" + l.toLowerCase();
                            };
                            y(a, function(c, l) {
                                -1 === b.indexOf(l) &&
                                    (e += l.replace(/([A-Z])/g, v) + ":" + c + ";");
                            });
                            e && m(x, "style", e);
                        } else q(x, a);
                        this.added &&
                            ("text" === this.element.nodeName &&
                                this.renderer.buildText(this),
                                a && a.textOutline && this.applyTextOutline(a.textOutline));
                    }
                    return this;
                };
                C.prototype.dashstyleSetter = function(a) {
                    var c = this["stroke-width"];
                    "inherit" === c && (c = 1);
                    if ((a = a && a.toLowerCase())) {
                        var l = a
                            .replace("shortdashdotdot", "3,1,1,1,1,1,")
                            .replace("shortdashdot", "3,1,1,1")
                            .replace("shortdot", "1,1,")
                            .replace("shortdash", "3,1,")
                            .replace("longdash", "8,3,")
                            .replace(/dot/g, "1,3,")
                            .replace("dash", "4,3,")
                            .replace(/,$/, "")
                            .split(",");
                        for (a = l.length; a--;) l[a] = "" + P(l[a]) * N(c, NaN);
                        a = l.join(",").replace(/NaN/g, "none");
                        this.element.setAttribute("stroke-dasharray", a);
                    }
                };
                C.prototype.destroy = function() {
                    var a = this,
                        c = a.element || {},
                        l = a.renderer,
                        x = (l.isSVG && "SPAN" === c.nodeName && a.parentGroup) || void 0,
                        e = c.ownerSVGElement;
                    c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
                    n(a);
                    if (a.clipPath && e) {
                        var f = a.clipPath;
                        [].forEach.call(
                            e.querySelectorAll("[clip-path],[CLIP-PATH]"),
                            function(c) {
                                -1 < c.getAttribute("clip-path").indexOf(f.element.id) &&
                                    c.removeAttribute("clip-path");
                            }
                        );
                        a.clipPath = f.destroy();
                    }
                    if (a.stops) {
                        for (e = 0; e < a.stops.length; e++) a.stops[e].destroy();
                        a.stops.length = 0;
                        a.stops = void 0;
                    }
                    a.safeRemoveChild(c);
                    for (
                        l.styledMode || a.destroyShadows(); x && x.div && 0 === x.div.childNodes.length;

                    )
                        (c = x.parentGroup),
                        a.safeRemoveChild(x.div),
                        delete x.div,
                        (x = c);
                    a.alignTo && b(l.alignedObjects, a);
                    y(a, function(c, l) {
                        a[l] && a[l].parentGroup === a && a[l].destroy && a[l].destroy();
                        delete a[l];
                    });
                };
                C.prototype.destroyShadows = function() {
                    (this.shadows || []).forEach(function(a) {
                        this.safeRemoveChild(a);
                    }, this);
                    this.shadows = void 0;
                };
                C.prototype.destroyTextPath = function(a, c) {
                    var l = a.getElementsByTagName("text")[0];
                    if (l) {
                        if (
                            (l.removeAttribute("dx"),
                                l.removeAttribute("dy"),
                                c.element.setAttribute("id", ""),
                                this.textPathWrapper && l.getElementsByTagName("textPath").length)
                        ) {
                            for (a = this.textPathWrapper.element.childNodes; a.length;)
                                l.appendChild(a[0]);
                            l.removeChild(this.textPathWrapper.element);
                        }
                    } else if (a.getAttribute("dx") || a.getAttribute("dy"))
                        a.removeAttribute("dx"), a.removeAttribute("dy");
                    this.textPathWrapper &&
                        (this.textPathWrapper = this.textPathWrapper.destroy());
                };
                C.prototype.dSetter = function(e, c, l) {
                    a(e) &&
                        ("string" === typeof e[0] && (e = this.renderer.pathToSegments(e)),
                            (this.pathArray = e),
                            (e = e.reduce(function(c, l, a) {
                                return l && l.join ?
                                    (a ? c + " " : "") + l.join(" ") :
                                    (l || "").toString();
                            }, "")));
                    /(NaN| {2}|^$)/.test(e) && (e = "M 0 0");
                    this[c] !== e && (l.setAttribute(c, e), (this[c] = e));
                };
                C.prototype.fadeOut = function(a) {
                    var c = this;
                    c.animate({ opacity: 0 }, {
                        duration: N(a, 150),
                        complete: function() {
                            c.attr({ y: -9999 }).hide();
                        },
                    });
                };
                C.prototype.fillSetter = function(a, c, l) {
                    "string" === typeof a
                        ?
                        l.setAttribute(c, a) :
                        a && this.complexColor(a, c, l);
                };
                C.prototype.getBBox = function(a, c) {
                    var l,
                        x = this.renderer,
                        e = this.element,
                        f = this.styles,
                        b = this.textStr,
                        v = x.cache,
                        E = x.cacheKeys,
                        H = e.namespaceURI === this.SVG_NS;
                    c = N(c, this.rotation, 0);
                    var y = x.styledMode ?
                        e && C.prototype.getStyle.call(e, "font-size") :
                        f && f.fontSize;
                    if (h(b)) {
                        var A = b.toString(); -
                        1 === A.indexOf("<") && (A = A.replace(/[0-9]/g, "0"));
                        A += [
                            "",
                            c,
                            y,
                            this.textWidth,
                            f && f.textOverflow,
                            f && f.fontWeight,
                        ].join();
                    }
                    A && !a && (l = v[A]);
                    if (!l) {
                        if (H || x.forExport) {
                            try {
                                var m =
                                    this.fakeTS &&
                                    function(c) {
                                        [].forEach.call(
                                            e.querySelectorAll(".highcharts-text-outline"),
                                            function(l) {
                                                l.style.display = c;
                                            }
                                        );
                                    };
                                p(m) && m("none");
                                l = e.getBBox ?
                                    g({}, e.getBBox()) :
                                    { width: e.offsetWidth, height: e.offsetHeight };
                                p(m) && m("");
                            } catch (ca) {
                                ("");
                            }
                            if (!l || 0 > l.width) l = { width: 0, height: 0 };
                        } else l = this.htmlGetBBox();
                        x.isSVG &&
                            ((a = l.width),
                                (x = l.height),
                                H &&
                                (l.height = x = { "11px,17": 14, "13px,20": 16 }[
                                    f && f.fontSize + "," + Math.round(x)
                                ] || x),
                                c &&
                                ((f = c * z),
                                    (l.width =
                                        Math.abs(x * Math.sin(f)) + Math.abs(a * Math.cos(f))),
                                    (l.height =
                                        Math.abs(x * Math.cos(f)) + Math.abs(a * Math.sin(f)))));
                        if (A && 0 < l.height) {
                            for (; 250 < E.length;) delete v[E.shift()];
                            v[A] || E.push(A);
                            v[A] = l;
                        }
                    }
                    return l;
                };
                C.prototype.getStyle = function(a) {
                    return r
                        .getComputedStyle(this.element || this, "")
                        .getPropertyValue(a);
                };
                C.prototype.hasClass = function(a) {
                    return -1 !== ("" + this.attr("class")).split(" ").indexOf(a);
                };
                C.prototype.hide = function(a) {
                    a ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" });
                    return this;
                };
                C.prototype.htmlGetBBox = function() {
                    return { height: 0, width: 0, x: 0, y: 0 };
                };
                C.prototype.init = function(a, c) {
                    this.element =
                        "span" === c ? L(c) : G.createElementNS(this.SVG_NS, c);
                    this.renderer = a;
                    f(this, "afterInit");
                };
                C.prototype.invert = function(a) {
                    this.inverted = a;
                    this.updateTransform();
                    return this;
                };
                C.prototype.on = function(a, c) {
                    var l,
                        x,
                        e = this.element,
                        f;
                    d && "click" === a ?
                        ((e.ontouchstart = function(c) {
                                l = c.touches[0].clientX;
                                x = c.touches[0].clientY;
                            }),
                            (e.ontouchend = function(a) {
                                (l &&
                                    4 <=
                                    Math.sqrt(
                                        Math.pow(l - a.changedTouches[0].clientX, 2) +
                                        Math.pow(x - a.changedTouches[0].clientY, 2)
                                    )) ||
                                c.call(e, a);
                                f = !0;
                                !1 !== a.cancelable && a.preventDefault();
                            }),
                            (e.onclick = function(l) {
                                f || c.call(e, l);
                            })) :
                        (e["on" + a] = c);
                    return this;
                };
                C.prototype.opacitySetter = function(a, c, l) {
                    this.opacity = a = Number(Number(a).toFixed(3));
                    l.setAttribute(c, a);
                };
                C.prototype.removeClass = function(a) {
                    return this.attr(
                        "class",
                        ("" + this.attr("class"))
                        .replace(E(a) ? new RegExp("(^| )" + a + "( |$)") : a, " ")
                        .replace(/ +/g, " ")
                        .trim()
                    );
                };
                C.prototype.removeTextOutline = function(a) {
                    for (var c = a.length, l; c--;)
                        (l = a[c]),
                        "highcharts-text-outline" === l.getAttribute("class") &&
                        b(a, this.element.removeChild(l));
                };
                C.prototype.safeRemoveChild = function(a) {
                    var c = a.parentNode;
                    c && c.removeChild(a);
                };
                C.prototype.setRadialReference = function(a) {
                    var c =
                        this.element.gradient &&
                        this.renderer.gradients[this.element.gradient];
                    this.element.radialReference = a;
                    c &&
                        c.radAttr &&
                        c.animate(this.renderer.getRadialAttr(a, c.radAttr));
                    return this;
                };
                C.prototype.setTextPath = function(a, c) {
                    var l = this.element,
                        x = { textAnchor: "text-anchor" },
                        f = !1,
                        b = this.textPathWrapper,
                        p = !b;
                    c = H(!0, {
                            enabled: !0,
                            attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" },
                        },
                        c
                    );
                    var g = c.attributes;
                    if (a && c && c.enabled) {
                        b && null === b.element.parentNode ?
                            ((p = !0), (b = b.destroy())) :
                            b &&
                            this.removeTextOutline.call(
                                b.parentGroup, [].slice.call(l.getElementsByTagName("tspan"))
                            );
                        this.options &&
                            this.options.padding &&
                            (g.dx = -this.options.padding);
                        b ||
                            ((this.textPathWrapper = b = this.renderer.createElement(
                                    "textPath"
                                )),
                                (f = !0));
                        var v = b.element;
                        (c = a.element.getAttribute("id")) ||
                        a.element.setAttribute("id", (c = A()));
                        if (p)
                            for (a = l.getElementsByTagName("tspan"); a.length;)
                                a[0].setAttribute("y", 0),
                                e(g.dx) && a[0].setAttribute("x", -g.dx),
                                v.appendChild(a[0]);
                        f && b && b.add({ element: this.text ? this.text.element : l });
                        v.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            "href",
                            this.renderer.url + "#" + c
                        );
                        h(g.dy) && (v.parentNode.setAttribute("dy", g.dy), delete g.dy);
                        h(g.dx) && (v.parentNode.setAttribute("dx", g.dx), delete g.dx);
                        y(g, function(c, l) {
                            v.setAttribute(x[l] || l, c);
                        });
                        l.removeAttribute("transform");
                        this.removeTextOutline.call(
                            b, [].slice.call(l.getElementsByTagName("tspan"))
                        );
                        this.text &&
                            !this.renderer.styledMode &&
                            this.attr({ fill: "none", "stroke-width": 0 });
                        this.applyTextOutline = this.updateTransform = u;
                    } else
                        b &&
                        (delete this.updateTransform,
                            delete this.applyTextOutline,
                            this.destroyTextPath(l, a),
                            this.updateTransform(),
                            this.options &&
                            this.options.rotation &&
                            this.applyTextOutline(this.options.style.textOutline));
                    return this;
                };
                C.prototype.shadow = function(a, c, l) {
                    var x = [],
                        e = this.element,
                        f = !1,
                        b = this.oldShadowOptions;
                    var p = {
                        color: "#000000",
                        offsetX: 1,
                        offsetY: 1,
                        opacity: 0.15,
                        width: 3,
                    };
                    var v;
                    !0 === a ? (v = p) : "object" === typeof a && (v = g(p, a));
                    v &&
                        (v &&
                            b &&
                            y(v, function(c, l) {
                                c !== b[l] && (f = !0);
                            }),
                            f && this.destroyShadows(),
                            (this.oldShadowOptions = v));
                    if (!v) this.destroyShadows();
                    else if (!this.shadows) {
                        var h = v.opacity / v.width;
                        var E = this.parentInverted ?
                            "translate(-1,-1)" :
                            "translate(" + v.offsetX + ", " + v.offsetY + ")";
                        for (p = 1; p <= v.width; p++) {
                            var H = e.cloneNode(!1);
                            var A = 2 * v.width + 1 - 2 * p;
                            m(H, {
                                stroke: a.color || "#000000",
                                "stroke-opacity": h * p,
                                "stroke-width": A,
                                transform: E,
                                fill: "none",
                            });
                            H.setAttribute(
                                "class",
                                (H.getAttribute("class") || "") + " highcharts-shadow"
                            );
                            l &&
                                (m(H, "height", Math.max(m(H, "height") - A, 0)),
                                    (H.cutHeight = A));
                            c
                                ?
                                c.element.appendChild(H) :
                                e.parentNode && e.parentNode.insertBefore(H, e);
                            x.push(H);
                        }
                        this.shadows = x;
                    }
                    return this;
                };
                C.prototype.show = function(a) {
                    return this.attr({ visibility: a ? "inherit" : "visible" });
                };
                C.prototype.strokeSetter = function(a, c, l) {
                    this[c] = a;
                    this.stroke && this["stroke-width"] ?
                        (C.prototype.fillSetter.call(this, this.stroke, "stroke", l),
                            l.setAttribute("stroke-width", this["stroke-width"]),
                            (this.hasStroke = !0)) :
                        "stroke-width" === c && 0 === a && this.hasStroke ?
                        (l.removeAttribute("stroke"), (this.hasStroke = !1)) :
                        this.renderer.styledMode &&
                        this["stroke-width"] &&
                        (l.setAttribute("stroke-width", this["stroke-width"]),
                            (this.hasStroke = !0));
                };
                C.prototype.strokeWidth = function() {
                    if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                    var a = this.getStyle("stroke-width"),
                        c = 0;
                    if (a.indexOf("px") === a.length - 2) c = P(a);
                    else if ("" !== a) {
                        var l = G.createElementNS(w, "rect");
                        m(l, { width: a, "stroke-width": 0 });
                        this.element.parentNode.appendChild(l);
                        c = l.getBBox().width;
                        l.parentNode.removeChild(l);
                    }
                    return c;
                };
                C.prototype.symbolAttr = function(a) {
                    var c = this;
                    "x y r start end width height innerR anchorX anchorY clockwise"
                    .split(" ")
                        .forEach(function(l) {
                            c[l] = N(a[l], c[l]);
                        });
                    c.attr({
                        d: c.renderer.symbols[c.symbolName](c.x, c.y, c.width, c.height, c),
                    });
                };
                C.prototype.textSetter = function(a) {
                    a !== this.textStr &&
                        (delete this.textPxLength,
                            (this.textStr = a),
                            this.added && this.renderer.buildText(this));
                };
                C.prototype.titleSetter = function(a) {
                    var c = this.element.getElementsByTagName("title")[0];
                    c ||
                        ((c = G.createElementNS(this.SVG_NS, "title")),
                            this.element.appendChild(c));
                    c.firstChild && c.removeChild(c.firstChild);
                    c.appendChild(
                        G.createTextNode(
                            String(N(a, ""))
                            .replace(/<[^>]*>/g, "")
                            .replace(/&lt;/g, "<")
                            .replace(/&gt;/g, ">")
                        )
                    );
                };
                C.prototype.toFront = function() {
                    var a = this.element;
                    a.parentNode.appendChild(a);
                    return this;
                };
                C.prototype.translate = function(a, c) {
                    return this.attr({ translateX: a, translateY: c });
                };
                C.prototype.updateShadows = function(a, c, l) {
                    var x = this.shadows;
                    if (x)
                        for (var e = x.length; e--;)
                            l.call(
                                x[e],
                                "height" === a ?
                                Math.max(c - (x[e].cutHeight || 0), 0) :
                                "d" === a ?
                                this.d :
                                c,
                                a,
                                x[e]
                            );
                };
                C.prototype.updateTransform = function() {
                    var a = this.translateX || 0,
                        c = this.translateY || 0,
                        l = this.scaleX,
                        x = this.scaleY,
                        e = this.inverted,
                        f = this.rotation,
                        b = this.matrix,
                        p = this.element;
                    e && ((a += this.width), (c += this.height));
                    a = ["translate(" + a + "," + c + ")"];
                    h(b) && a.push("matrix(" + b.join(",") + ")");
                    e
                        ?
                        a.push("rotate(90) scale(-1,1)") :
                        f &&
                        a.push(
                            "rotate(" +
                            f +
                            " " +
                            N(this.rotationOriginX, p.getAttribute("x"), 0) +
                            " " +
                            N(this.rotationOriginY, p.getAttribute("y") || 0) +
                            ")"
                        );
                    (h(l) || h(x)) && a.push("scale(" + N(l, 1) + " " + N(x, 1) + ")");
                    a.length && p.setAttribute("transform", a.join(" "));
                };
                C.prototype.visibilitySetter = function(a, c, l) {
                    "inherit" === a
                        ?
                        l.removeAttribute(c) :
                        this[c] !== a && l.setAttribute(c, a);
                    this[c] = a;
                };
                C.prototype.xGetter = function(a) {
                    "circle" === this.element.nodeName &&
                        ("x" === a ? (a = "cx") : "y" === a && (a = "cy"));
                    return this._defaultGetter(a);
                };
                C.prototype.zIndexSetter = function(a, c) {
                    var l = this.renderer,
                        x = this.parentGroup,
                        e = (x || l).element || l.box,
                        f = this.element,
                        b = !1;
                    l = e === l.box;
                    var p = this.added;
                    var g;
                    h(a) ?
                        (f.setAttribute("data-z-index", a),
                            (a = +a),
                            this[c] === a && (p = !1)) :
                        h(this[c]) && f.removeAttribute("data-z-index");
                    this[c] = a;
                    if (p) {
                        (a = this.zIndex) && x && (x.handleZ = !0);
                        c = e.childNodes;
                        for (g = c.length - 1; 0 <= g && !b; g--) {
                            x = c[g];
                            p = x.getAttribute("data-z-index");
                            var v = !h(p);
                            if (x !== f)
                                if (0 > a && v && !l && !g) e.insertBefore(f, c[g]), (b = !0);
                                else if (P(p) <= a || (v && (!h(a) || 0 <= a)))
                                e.insertBefore(f, c[g + 1] || null), (b = !0);
                        }
                        b || (e.insertBefore(f, c[l ? 3 : 0] || null), (b = !0));
                    }
                    return b;
                };
                return C;
            })();
            k.prototype["stroke-widthSetter"] = k.prototype.strokeSetter;
            k.prototype.yGetter = k.prototype.xGetter;
            k.prototype.matrixSetter = k.prototype.rotationOriginXSetter = k.prototype.rotationOriginYSetter = k.prototype.rotationSetter = k.prototype.scaleXSetter = k.prototype.scaleYSetter = k.prototype.translateXSetter = k.prototype.translateYSetter = k.prototype.verticalAlignSetter = function(
                a,
                e
            ) {
                this[e] = a;
                this.doTransform = !0;
            };
            I.SVGElement = k;
            return I.SVGElement;
        }
    );
    Q(
        k,
        "Core/Renderer/SVG/SVGLabel.js", [k["Core/Renderer/SVG/SVGElement.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B =
                (this && this.__extends) ||
                (function() {
                    var n = function(d, O) {
                        n =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] }
                                instanceof Array &&
                                function(u, d) {
                                    u.__proto__ = d;
                                }) ||
                            function(u, d) {
                                for (var w in d) d.hasOwnProperty(w) && (u[w] = d[w]);
                            };
                        return n(d, O);
                    };
                    return function(d, O) {
                        function u() {
                            this.constructor = d;
                        }
                        n(d, O);
                        d.prototype =
                            null === O ?
                            Object.create(O) :
                            ((u.prototype = O.prototype), new u());
                    };
                })(),
                D = t.defined,
                J = t.extend,
                M = t.isNumber,
                n = t.merge,
                z = t.removeEvent;
            return (function(G) {
                function d(O, u, F, w, r, m, L, q, h, b) {
                    var g = G.call(this) || this;
                    g.init(O, "g");
                    g.textStr = u;
                    g.x = F;
                    g.y = w;
                    g.anchorX = m;
                    g.anchorY = L;
                    g.baseline = h;
                    g.className = b;
                    "button" !== b && g.addClass("highcharts-label");
                    b && g.addClass("highcharts-" + b);
                    g.text = O.text("", 0, 0, q).attr({ zIndex: 1 });
                    if ("string" === typeof r) {
                        var f = /^url\((.*?)\)$/.test(r);
                        if (g.renderer.symbols[r] || f) g.symbolKey = r;
                    }
                    g.bBox = d.emptyBBox;
                    g.padding = 3;
                    g.paddingLeft = 0;
                    g.baselineOffset = 0;
                    g.needsBox = O.styledMode || f;
                    g.deferredAttr = {};
                    g.alignFactor = 0;
                    return g;
                }
                B(d, G);
                d.prototype.alignSetter = function(d) {
                    d = { left: 0, center: 0.5, right: 1 }[d];
                    d !== this.alignFactor &&
                        ((this.alignFactor = d),
                            this.bBox && M(this.xSetting) && this.attr({ x: this.xSetting }));
                };
                d.prototype.anchorXSetter = function(d, u) {
                    this.anchorX = d;
                    this.boxAttr(
                        u,
                        Math.round(d) - this.getCrispAdjust() - this.xSetting
                    );
                };
                d.prototype.anchorYSetter = function(d, u) {
                    this.anchorY = d;
                    this.boxAttr(u, d - this.ySetting);
                };
                d.prototype.boxAttr = function(d, u) {
                    this.box ? this.box.attr(d, u) : (this.deferredAttr[d] = u);
                };
                d.prototype.css = function(O) {
                    if (O) {
                        var u = {};
                        O = n(O);
                        d.textProps.forEach(function(w) {
                            "undefined" !== typeof O[w] && ((u[w] = O[w]), delete O[w]);
                        });
                        this.text.css(u);
                        var F = "fontSize" in u || "fontWeight" in u;
                        if ("width" in u || F)
                            this.updateBoxSize(), F && this.updateTextPadding();
                    }
                    return k.prototype.css.call(this, O);
                };
                d.prototype.destroy = function() {
                    z(this.element, "mouseenter");
                    z(this.element, "mouseleave");
                    this.text && this.text.destroy();
                    this.box && (this.box = this.box.destroy());
                    k.prototype.destroy.call(this);
                };
                d.prototype.fillSetter = function(d, u) {
                    d && (this.needsBox = !0);
                    this.fill = d;
                    this.boxAttr(u, d);
                };
                d.prototype.getBBox = function() {
                    var d = this.bBox,
                        u = this.padding;
                    return {
                        width: d.width + 2 * u,
                        height: d.height + 2 * u,
                        x: d.x - u,
                        y: d.y - u,
                    };
                };
                d.prototype.getCrispAdjust = function() {
                    return this.renderer.styledMode && this.box ?
                        (this.box.strokeWidth() % 2) / 2 :
                        ((this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) %
                            2) /
                        2;
                };
                d.prototype.heightSetter = function(d) {
                    this.heightSetting = d;
                };
                d.prototype.on = function(d, u) {
                    var F = this,
                        w = F.text,
                        r = w && "SPAN" === w.element.tagName ? w : void 0;
                    if (r) {
                        var m = function(m) {
                            (("mouseenter" === d || "mouseleave" === d) &&
                                m.relatedTarget instanceof Element &&
                                (F.element.contains(m.relatedTarget) ||
                                    r.element.contains(m.relatedTarget))) ||
                            u.call(F.element, m);
                        };
                        r.on(d, m);
                    }
                    k.prototype.on.call(F, d, m || u);
                    return F;
                };
                d.prototype.onAdd = function() {
                    var d = this.textStr;
                    this.text.add(this);
                    this.attr({ text: D(d) ? d : "", x: this.x, y: this.y });
                    this.box &&
                        D(this.anchorX) &&
                        this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
                };
                d.prototype.paddingSetter = function(d) {
                    D(d) &&
                        d !== this.padding &&
                        ((this.padding = d), this.updateTextPadding());
                };
                d.prototype.paddingLeftSetter = function(d) {
                    D(d) &&
                        d !== this.paddingLeft &&
                        ((this.paddingLeft = d), this.updateTextPadding());
                };
                d.prototype.rSetter = function(d, u) {
                    this.boxAttr(u, d);
                };
                d.prototype.shadow = function(d) {
                    d &&
                        !this.renderer.styledMode &&
                        (this.updateBoxSize(), this.box && this.box.shadow(d));
                    return this;
                };
                d.prototype.strokeSetter = function(d, u) {
                    this.stroke = d;
                    this.boxAttr(u, d);
                };
                d.prototype["stroke-widthSetter"] = function(d, u) {
                    d && (this.needsBox = !0);
                    this["stroke-width"] = d;
                    this.boxAttr(u, d);
                };
                d.prototype["text-alignSetter"] = function(d) {
                    this.textAlign = d;
                };
                d.prototype.textSetter = function(d) {
                    "undefined" !== typeof d && this.text.attr({ text: d });
                    this.updateBoxSize();
                    this.updateTextPadding();
                };
                d.prototype.updateBoxSize = function() {
                    var n = this.text.element.style,
                        u = {},
                        F = this.padding,
                        w = this.paddingLeft,
                        r =
                        (M(this.widthSetting) &&
                            M(this.heightSetting) &&
                            !this.textAlign) ||
                        !D(this.text.textStr) ?
                        d.emptyBBox :
                        this.text.getBBox();
                    this.width = (this.widthSetting || r.width || 0) + 2 * F + w;
                    this.height = (this.heightSetting || r.height || 0) + 2 * F;
                    this.baselineOffset =
                        F +
                        Math.min(
                            this.renderer.fontMetrics(n && n.fontSize, this.text).b,
                            r.height || Infinity
                        );
                    this.needsBox &&
                        (this.box ||
                            ((n = this.box = this.symbolKey ?
                                    this.renderer.symbol(this.symbolKey) :
                                    this.renderer.rect()),
                                n.addClass(
                                    ("button" === this.className ? "" : "highcharts-label-box") +
                                    (this.className ?
                                        " highcharts-" + this.className + "-box" :
                                        "")
                                ),
                                n.add(this),
                                (n = this.getCrispAdjust()),
                                (u.x = n),
                                (u.y = (this.baseline ? -this.baselineOffset : 0) + n)),
                            (u.width = Math.round(this.width)),
                            (u.height = Math.round(this.height)),
                            this.box.attr(J(u, this.deferredAttr)),
                            (this.deferredAttr = {}));
                    this.bBox = r;
                };
                d.prototype.updateTextPadding = function() {
                    var d = this.text,
                        u = this.baseline ? 0 : this.baselineOffset,
                        F = this.paddingLeft + this.padding;
                    D(this.widthSetting) &&
                        this.bBox &&
                        ("center" === this.textAlign || "right" === this.textAlign) &&
                        (F += { center: 0.5, right: 1 }[this.textAlign] *
                            (this.widthSetting - this.bBox.width));
                    if (F !== d.x || u !== d.y)
                        d.attr("x", F),
                        d.hasBoxWidthChanged &&
                        ((this.bBox = d.getBBox(!0)), this.updateBoxSize()),
                        "undefined" !== typeof u && d.attr("y", u);
                    d.x = F;
                    d.y = u;
                };
                d.prototype.widthSetter = function(d) {
                    this.widthSetting = M(d) ? d : void 0;
                };
                d.prototype.xSetter = function(d) {
                    this.x = d;
                    this.alignFactor &&
                        ((d -=
                                this.alignFactor *
                                ((this.widthSetting || this.bBox.width) + 2 * this.padding)),
                            (this["forceAnimate:x"] = !0));
                    this.xSetting = Math.round(d);
                    this.attr("translateX", this.xSetting);
                };
                d.prototype.ySetter = function(d) {
                    this.ySetting = this.y = Math.round(d);
                    this.attr("translateY", this.ySetting);
                };
                d.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
                d.textProps = "color cursor direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(
                    " "
                );
                return d;
            })(k);
        }
    );
    Q(
        k,
        "Core/Renderer/SVG/SVGRenderer.js", [
            k["Core/Color/Color.js"],
            k["Core/Globals.js"],
            k["Core/Renderer/SVG/SVGElement.js"],
            k["Core/Renderer/SVG/SVGLabel.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J) {
            var B = J.addEvent,
                n = J.attr,
                z = J.createElement,
                G = J.css,
                d = J.defined,
                O = J.destroyObjectProperties,
                u = J.extend,
                F = J.isArray,
                w = J.isNumber,
                r = J.isObject,
                m = J.isString,
                L = J.merge,
                q = J.objectEach,
                h = J.pick,
                b = J.pInt,
                g = J.splat,
                f = J.uniqueKey,
                a = t.charts,
                p = t.deg2rad,
                e = t.doc,
                E = t.isFirefox,
                H = t.isMS,
                y = t.isWebKit;
            J = t.noop;
            var N = t.svg,
                P = t.SVG_NS,
                K = t.symbolSizes,
                A = t.win,
                C = (function() {
                    function v(c, l, a, e, f, b, p) {
                        this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                        this.init(c, l, a, e, f, b, p);
                    }
                    v.prototype.init = function(c, l, a, f, b, p, g) {
                        var x = this.createElement("svg").attr({
                            version: "1.1",
                            class: "highcharts-root",
                        });
                        g || x.css(this.getStyle(f));
                        f = x.element;
                        c.appendChild(f);
                        n(c, "dir", "ltr"); -
                        1 === c.innerHTML.indexOf("xmlns") && n(f, "xmlns", this.SVG_NS);
                        this.isSVG = !0;
                        this.box = f;
                        this.boxWrapper = x;
                        this.alignedObjects = [];
                        this.url =
                            (E || y) && e.getElementsByTagName("base").length ?
                            A.location.href
                            .split("#")[0]
                            .replace(/<[^>]*>/g, "")
                            .replace(/([\('\)])/g, "\\$1")
                            .replace(/ /g, "%20") :
                            "";
                        this.createElement("desc")
                            .add()
                            .element.appendChild(
                                e.createTextNode("Created with Highcharts 8.2.2")
                            );
                        this.defs = this.createElement("defs").add();
                        this.allowHTML = p;
                        this.forExport = b;
                        this.styledMode = g;
                        this.gradients = {};
                        this.cache = {};
                        this.cacheKeys = [];
                        this.imgCount = 0;
                        this.setSize(l, a, !1);
                        var R;
                        E &&
                            c.getBoundingClientRect &&
                            ((l = function() {
                                    G(c, { left: 0, top: 0 });
                                    R = c.getBoundingClientRect();
                                    G(c, {
                                        left: Math.ceil(R.left) - R.left + "px",
                                        top: Math.ceil(R.top) - R.top + "px",
                                    });
                                }),
                                l(),
                                (this.unSubPixelFix = B(A, "resize", l)));
                    };
                    v.prototype.definition = function(c) {
                        function l(c, x) {
                            var f;
                            g(c).forEach(function(c) {
                                var b = a.createElement(c.tagName),
                                    p = {};
                                q(c, function(c, l) {
                                    "tagName" !== l &&
                                        "children" !== l &&
                                        "textContent" !== l &&
                                        (p[l] = c);
                                });
                                b.attr(p);
                                b.add(x || a.defs);
                                c.textContent &&
                                    b.element.appendChild(e.createTextNode(c.textContent));
                                l(c.children || [], b);
                                f = b;
                            });
                            return f;
                        }
                        var a = this;
                        return l(c);
                    };
                    v.prototype.getStyle = function(c) {
                        return (this.style = u({
                                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                                fontSize: "12px",
                            },
                            c
                        ));
                    };
                    v.prototype.setStyle = function(c) {
                        this.boxWrapper.css(this.getStyle(c));
                    };
                    v.prototype.isHidden = function() {
                        return !this.boxWrapper.getBBox().width;
                    };
                    v.prototype.destroy = function() {
                        var c = this.defs;
                        this.box = null;
                        this.boxWrapper = this.boxWrapper.destroy();
                        O(this.gradients || {});
                        this.gradients = null;
                        c && (this.defs = c.destroy());
                        this.unSubPixelFix && this.unSubPixelFix();
                        return (this.alignedObjects = null);
                    };
                    v.prototype.createElement = function(c) {
                        var l = new this.Element();
                        l.init(this, c);
                        return l;
                    };
                    v.prototype.getRadialAttr = function(c, l) {
                        return {
                            cx: c[0] - c[2] / 2 + l.cx * c[2],
                            cy: c[1] - c[2] / 2 + l.cy * c[2],
                            r: l.r * c[2],
                        };
                    };
                    v.prototype.truncate = function(c, l, a, f, b, p, g) {
                        var x = this,
                            R = c.rotation,
                            h,
                            v = f ? 1 : 0,
                            E = (a || f).length,
                            S = E,
                            H = [],
                            A = function(c) {
                                l.firstChild && l.removeChild(l.firstChild);
                                c && l.appendChild(e.createTextNode(c));
                            },
                            y = function(e, p) {
                                p = p || e;
                                if ("undefined" === typeof H[p])
                                    if (l.getSubStringLength)
                                        try {
                                            H[p] = b + l.getSubStringLength(0, f ? p + 1 : p);
                                        } catch (ka) {
                                            ("");
                                        }
                                    else
                                        x.getSpanWidth &&
                                        (A(g(a || f, e)), (H[p] = b + x.getSpanWidth(c, l)));
                                return H[p];
                            },
                            m;
                        c.rotation = 0;
                        var C = y(l.textContent.length);
                        if ((m = b + C > p)) {
                            for (; v <= E;)
                                (S = Math.ceil((v + E) / 2)),
                                f && (h = g(f, S)),
                                (C = y(S, h && h.length - 1)),
                                v === E ? (v = E + 1) : C > p ? (E = S - 1) : (v = S);
                            0 === E ?
                                A("") :
                                (a && E === a.length - 1) || A(h || g(a || f, S));
                        }
                        f && f.splice(0, S);
                        c.actualWidth = C;
                        c.rotation = R;
                        return m;
                    };
                    v.prototype.buildText = function(c) {
                        var l = c.element,
                            a = this,
                            f = a.forExport,
                            p = h(c.textStr, "").toString(),
                            g = -1 !== p.indexOf("<"),
                            v = l.childNodes,
                            E,
                            H = n(l, "x"),
                            A = c.styles,
                            y = c.textWidth,
                            C = A && A.lineHeight,
                            K = A && A.textOutline,
                            r = A && "ellipsis" === A.textOverflow,
                            d = A && "nowrap" === A.whiteSpace,
                            L = A && A.fontSize,
                            w,
                            u = v.length;
                        A = y && !c.added && this.box;
                        var F = function(c) {
                                var e;
                                a.styledMode ||
                                    (e = /(px|em)$/.test(c && c.style.fontSize) ?
                                        c.style.fontSize :
                                        L || a.style.fontSize || 12);
                                return C ?
                                    b(C) :
                                    a.fontMetrics(e, c.getAttribute("style") ? c : l).h;
                            },
                            z = function(c, l) {
                                q(a.escapes, function(a, e) {
                                    (l && -1 !== l.indexOf(a)) ||
                                    (c = c.toString().replace(new RegExp(a, "g"), e));
                                });
                                return c;
                            },
                            O = function(c, l) {
                                var a = c.indexOf("<");
                                c = c.substring(a, c.indexOf(">") - a);
                                a = c.indexOf(l + "=");
                                if (-1 !== a &&
                                    ((a = a + l.length + 1),
                                        (l = c.charAt(a)),
                                        '"' === l || "'" === l)
                                )
                                    return (c = c.substring(a + 1)), c.substring(0, c.indexOf(l));
                            },
                            k = /<br.*?>/g;
                        var t = [p, r, d, C, K, L, y].join();
                        if (t !== c.textCache) {
                            for (c.textCache = t; u--;) l.removeChild(v[u]);
                            g || K || r || y || (-1 !== p.indexOf(" ") && (!d || k.test(p))) ?
                                (A && A.appendChild(l),
                                    g ?
                                    ((p = a.styledMode ?
                                            p
                                            .replace(
                                                /<(b|strong)>/g,
                                                '<span class="highcharts-strong">'
                                            )
                                            .replace(
                                                /<(i|em)>/g,
                                                '<span class="highcharts-emphasized">'
                                            ) :
                                            p
                                            .replace(
                                                /<(b|strong)>/g,
                                                '<span style="font-weight:bold">'
                                            )
                                            .replace(
                                                /<(i|em)>/g,
                                                '<span style="font-style:italic">'
                                            )),
                                        (p = p
                                            .replace(/<a/g, "<span")
                                            .replace(/<\/(b|strong|i|em|a)>/g, "</span>")
                                            .split(k))) :
                                    (p = [p]),
                                    (p = p.filter(function(c) {
                                        return "" !== c;
                                    })),
                                    p.forEach(function(x, b) {
                                        var p = 0,
                                            g = 0;
                                        x = x
                                            .replace(/^\s+|\s+$/g, "")
                                            .replace(/<span/g, "|||<span")
                                            .replace(/<\/span>/g, "</span>|||");
                                        var R = x.split("|||");
                                        R.forEach(function(x) {
                                            if ("" !== x || 1 === R.length) {
                                                var h = {},
                                                    v = e.createElementNS(a.SVG_NS, "tspan"),
                                                    S,
                                                    A;
                                                (S = O(x, "class")) && n(v, "class", S);
                                                if ((S = O(x, "style")))
                                                    (S = S.replace(/(;| |^)color([ :])/, "$1fill$2")),
                                                    n(v, "style", S);
                                                if (
                                                    (A = O(x, "href")) &&
                                                    !f &&
                                                    -1 ===
                                                    A.split(":")[0].toLowerCase().indexOf("javascript")
                                                ) {
                                                    var m = e.createElementNS(a.SVG_NS, "a");
                                                    n(m, "href", A);
                                                    n(v, "class", "highcharts-anchor");
                                                    m.appendChild(v);
                                                    a.styledMode || G(v, { cursor: "pointer" });
                                                }
                                                x = z(x.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                                if (" " !== x) {
                                                    v.appendChild(e.createTextNode(x));
                                                    p ? (h.dx = 0) : b && null !== H && (h.x = H);
                                                    n(v, h);
                                                    l.appendChild(m || v);
                                                    !p &&
                                                        w &&
                                                        (!N && f && G(v, { display: "block" }),
                                                            n(v, "dy", F(v)));
                                                    if (y) {
                                                        var C = x.replace(/([^\^])-/g, "$1- ").split(" ");
                                                        h = !d && (1 < R.length || b || 1 < C.length);
                                                        m = 0;
                                                        A = F(v);
                                                        if (r)
                                                            E = a.truncate(
                                                                c,
                                                                v,
                                                                x,
                                                                void 0,
                                                                0,
                                                                Math.max(0, y - parseInt(L || 12, 10)),
                                                                function(c, l) {
                                                                    return c.substring(0, l) + "\u2026";
                                                                }
                                                            );
                                                        else if (h)
                                                            for (; C.length;)
                                                                C.length &&
                                                                !d &&
                                                                0 < m &&
                                                                ((v = e.createElementNS(P, "tspan")),
                                                                    n(v, { dy: A, x: H }),
                                                                    S && n(v, "style", S),
                                                                    v.appendChild(
                                                                        e.createTextNode(
                                                                            C.join(" ").replace(/- /g, "-")
                                                                        )
                                                                    ),
                                                                    l.appendChild(v)),
                                                                a.truncate(
                                                                    c,
                                                                    v,
                                                                    null,
                                                                    C,
                                                                    0 === m ? g : 0,
                                                                    y,
                                                                    function(c, l) {
                                                                        return C.slice(0, l)
                                                                            .join(" ")
                                                                            .replace(/- /g, "-");
                                                                    }
                                                                ),
                                                                (g = c.actualWidth),
                                                                m++;
                                                    }
                                                    p++;
                                                }
                                            }
                                        });
                                        w = w || l.childNodes.length;
                                    }),
                                    r &&
                                    E &&
                                    c.attr("title", z(c.textStr || "", ["&lt;", "&gt;"])),
                                    A && A.removeChild(l),
                                    m(K) && c.applyTextOutline && c.applyTextOutline(K)) :
                                l.appendChild(e.createTextNode(z(p)));
                        }
                    };
                    v.prototype.getContrast = function(c) {
                        c = k.parse(c).rgba;
                        c[0] *= 1;
                        c[1] *= 1.2;
                        c[2] *= 0.5;
                        return 459 < c[0] + c[1] + c[2] ? "#000000" : "#FFFFFF";
                    };
                    v.prototype.button = function(c, l, a, e, f, b, p, g, v, h) {
                        var x = this.label(c, l, a, v, void 0, void 0, h, void 0, "button"),
                            R = 0,
                            E = this.styledMode;
                        c = ((f = f ? L(f) : f) && f.style) || {};
                        f && f.style && delete f.style;
                        x.attr(L({ padding: 8, r: 2 }, f));
                        if (!E) {
                            f = L({
                                    fill: "#f7f7f7",
                                    stroke: "#cccccc",
                                    "stroke-width": 1,
                                    style: {
                                        color: "#333333",
                                        cursor: "pointer",
                                        fontWeight: "normal",
                                    },
                                }, { style: c },
                                f
                            );
                            var A = f.style;
                            delete f.style;
                            b = L(f, { fill: "#e6e6e6" }, b);
                            var S = b.style;
                            delete b.style;
                            p = L(
                                f, {
                                    fill: "#e6ebf5",
                                    style: { color: "#000000", fontWeight: "bold" },
                                },
                                p
                            );
                            var y = p.style;
                            delete p.style;
                            g = L(f, { style: { color: "#cccccc" } }, g);
                            var m = g.style;
                            delete g.style;
                        }
                        B(x.element, H ? "mouseover" : "mouseenter", function() {
                            3 !== R && x.setState(1);
                        });
                        B(x.element, H ? "mouseout" : "mouseleave", function() {
                            3 !== R && x.setState(R);
                        });
                        x.setState = function(c) {
                            1 !== c && (x.state = R = c);
                            x.removeClass(
                                /highcharts-button-(normal|hover|pressed|disabled)/
                            ).addClass(
                                "highcharts-button-" + ["normal", "hover", "pressed", "disabled"][c || 0]
                            );
                            E || x.attr([f, b, p, g][c || 0]).css([A, S, y, m][c || 0]);
                        };
                        E || x.attr(f).css(u({ cursor: "default" }, A));
                        return x.on("click", function(c) {
                            3 !== R && e.call(x, c);
                        });
                    };
                    v.prototype.crispLine = function(c, l, a) {
                        void 0 === a && (a = "round");
                        var x = c[0],
                            e = c[1];
                        x[1] === e[1] && (x[1] = e[1] = Math[a](x[1]) - (l % 2) / 2);
                        x[2] === e[2] && (x[2] = e[2] = Math[a](x[2]) + (l % 2) / 2);
                        return c;
                    };
                    v.prototype.path = function(c) {
                        var l = this.styledMode ? {} : { fill: "none" };
                        F(c) ? (l.d = c) : r(c) && u(l, c);
                        return this.createElement("path").attr(l);
                    };
                    v.prototype.circle = function(c, l, a) {
                        c = r(c) ? c : "undefined" === typeof c ? {} : { x: c, y: l, r: a };
                        l = this.createElement("circle");
                        l.xSetter = l.ySetter = function(c, l, a) {
                            a.setAttribute("c" + l, c);
                        };
                        return l.attr(c);
                    };
                    v.prototype.arc = function(c, l, a, e, f, b) {
                        r(c) ?
                            ((e = c), (l = e.y), (a = e.r), (c = e.x)) :
                            (e = { innerR: e, start: f, end: b });
                        c = this.symbol("arc", c, l, a, a, e);
                        c.r = a;
                        return c;
                    };
                    v.prototype.rect = function(c, l, a, e, f, b) {
                        f = r(c) ? c.r : f;
                        var x = this.createElement("rect");
                        c = r(c) ?
                            c :
                            "undefined" === typeof c ?
                            {} :
                            { x: c, y: l, width: Math.max(a, 0), height: Math.max(e, 0) };
                        this.styledMode ||
                            ("undefined" !== typeof b &&
                                ((c.strokeWidth = b), (c = x.crisp(c))),
                                (c.fill = "none"));
                        f && (c.r = f);
                        x.rSetter = function(c, l, a) {
                            x.r = c;
                            n(a, { rx: c, ry: c });
                        };
                        x.rGetter = function() {
                            return x.r;
                        };
                        return x.attr(c);
                    };
                    v.prototype.setSize = function(c, l, a) {
                        var e = this.alignedObjects,
                            x = e.length;
                        this.width = c;
                        this.height = l;
                        for (
                            this.boxWrapper.animate({ width: c, height: l }, {
                                step: function() {
                                    this.attr({
                                        viewBox: "0 0 " + this.attr("width") + " " + this.attr("height"),
                                    });
                                },
                                duration: h(a, !0) ? void 0 : 0,
                            }); x--;

                        )
                            e[x].align();
                    };
                    v.prototype.g = function(c) {
                        var l = this.createElement("g");
                        return c ? l.attr({ class: "highcharts-" + c }) : l;
                    };
                    v.prototype.image = function(c, l, a, e, f, b) {
                        var x = { preserveAspectRatio: "none" },
                            p = function(c, l) {
                                c.setAttributeNS ?
                                    c.setAttributeNS("http://www.w3.org/1999/xlink", "href", l) :
                                    c.setAttribute("hc-svg-href", l);
                            },
                            g = function(l) {
                                p(R.element, c);
                                b.call(R, l);
                            };
                        1 < arguments.length && u(x, { x: l, y: a, width: e, height: f });
                        var R = this.createElement("image").attr(x);
                        b
                            ?
                            (p(
                                    R.element,
                                    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                                ),
                                (x = new A.Image()),
                                B(x, "load", g),
                                (x.src = c),
                                x.complete && g({})) :
                            p(R.element, c);
                        return R;
                    };
                    v.prototype.symbol = function(c, l, x, f, b, p) {
                        var g = this,
                            R = /^url\((.*?)\)$/,
                            v = R.test(c),
                            E = !v && (this.symbols[c] ? c : "circle"),
                            A = E && this.symbols[E],
                            H;
                        if (A) {
                            "number" === typeof l &&
                                (H = A.call(
                                    this.symbols,
                                    Math.round(l || 0),
                                    Math.round(x || 0),
                                    f || 0,
                                    b || 0,
                                    p
                                ));
                            var y = this.path(H);
                            g.styledMode || y.attr("fill", "none");
                            u(y, { symbolName: E, x: l, y: x, width: f, height: b });
                            p && u(y, p);
                        } else if (v) {
                            var S = c.match(R)[1];
                            y = this.image(S);
                            y.imgwidth = h(K[S] && K[S].width, p && p.width);
                            y.imgheight = h(K[S] && K[S].height, p && p.height);
                            var m = function() {
                                y.attr({ width: y.width, height: y.height });
                            };
                            ["width", "height"].forEach(function(c) {
                                y[c + "Setter"] = function(c, l) {
                                    var a = {},
                                        e = this["img" + l],
                                        x = "width" === l ? "translateX" : "translateY";
                                    this[l] = c;
                                    d(e) &&
                                        (p &&
                                            "within" === p.backgroundSize &&
                                            this.width &&
                                            this.height &&
                                            (e = Math.round(
                                                e *
                                                Math.min(
                                                    this.width / this.imgwidth,
                                                    this.height / this.imgheight
                                                )
                                            )),
                                            this.element && this.element.setAttribute(l, e),
                                            this.alignByTranslate ||
                                            ((a[x] = ((this[l] || 0) - e) / 2), this.attr(a)));
                                };
                            });
                            d(l) && y.attr({ x: l, y: x });
                            y.isImg = !0;
                            d(y.imgwidth) && d(y.imgheight) ?
                                m() :
                                (y.attr({ width: 0, height: 0 }),
                                    z("img", {
                                        onload: function() {
                                            var c = a[g.chartIndex];
                                            0 === this.width &&
                                                (G(this, { position: "absolute", top: "-999em" }),
                                                    e.body.appendChild(this));
                                            K[S] = { width: this.width, height: this.height };
                                            y.imgwidth = this.width;
                                            y.imgheight = this.height;
                                            y.element && m();
                                            this.parentNode && this.parentNode.removeChild(this);
                                            g.imgCount--;
                                            if (!g.imgCount && c && !c.hasLoaded) c.onload();
                                        },
                                        src: S,
                                    }),
                                    this.imgCount++);
                        }
                        return y;
                    };
                    v.prototype.clipRect = function(c, l, a, e) {
                        var x = f() + "-",
                            p = this.createElement("clipPath").attr({ id: x }).add(this.defs);
                        c = this.rect(c, l, a, e, 0).add(p);
                        c.id = x;
                        c.clipPath = p;
                        c.count = 0;
                        return c;
                    };
                    v.prototype.text = function(c, l, a, e) {
                        var x = {};
                        if (e && (this.allowHTML || !this.forExport))
                            return this.html(c, l, a);
                        x.x = Math.round(l || 0);
                        a && (x.y = Math.round(a));
                        d(c) && (x.text = c);
                        c = this.createElement("text").attr(x);
                        e ||
                            (c.xSetter = function(c, l, a) {
                                var e = a.getElementsByTagName("tspan"),
                                    x = a.getAttribute(l),
                                    f;
                                for (f = 0; f < e.length; f++) {
                                    var p = e[f];
                                    p.getAttribute(l) === x && p.setAttribute(l, c);
                                }
                                a.setAttribute(l, c);
                            });
                        return c;
                    };
                    v.prototype.fontMetrics = function(c, l) {
                        c =
                            (!this.styledMode && /px/.test(c)) || !A.getComputedStyle ?
                            c ||
                            (l && l.style && l.style.fontSize) ||
                            (this.style && this.style.fontSize) :
                            l && I.prototype.getStyle.call(l, "font-size");
                        c = /px/.test(c) ? b(c) : 12;
                        l = 24 > c ? c + 3 : Math.round(1.2 * c);
                        return { h: l, b: Math.round(0.8 * l), f: c };
                    };
                    v.prototype.rotCorr = function(c, l, a) {
                        var e = c;
                        l && a && (e = Math.max(e * Math.cos(l * p), 4));
                        return { x: (-c / 3) * Math.sin(l * p), y: e };
                    };
                    v.prototype.pathToSegments = function(c) {
                        for (
                            var l = [],
                                a = [],
                                e = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 },
                                f = 0; f < c.length; f++
                        )
                            m(a[0]) &&
                            w(c[f]) &&
                            a.length === e[a[0].toUpperCase()] &&
                            c.splice(f, 0, a[0].replace("M", "L").replace("m", "l")),
                            "string" === typeof c[f] &&
                            (a.length && l.push(a.slice(0)), (a.length = 0)),
                            a.push(c[f]);
                        l.push(a.slice(0));
                        return l;
                    };
                    v.prototype.label = function(c, l, a, e, f, p, b, g, v) {
                        return new D(this, c, l, a, e, f, p, b, g, v);
                    };
                    return v;
                })();
            C.prototype.Element = I;
            C.prototype.SVG_NS = P;
            C.prototype.draw = J;
            C.prototype.escapes = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
            };
            C.prototype.symbols = {
                circle: function(a, c, l, e) {
                    return this.arc(a + l / 2, c + e / 2, l / 2, e / 2, {
                        start: 0.5 * Math.PI,
                        end: 2.5 * Math.PI,
                        open: !1,
                    });
                },
                square: function(a, c, l, e) {
                    return [
                        ["M", a, c],
                        ["L", a + l, c],
                        ["L", a + l, c + e],
                        ["L", a, c + e],
                        ["Z"],
                    ];
                },
                triangle: function(a, c, l, e) {
                    return [
                        ["M", a + l / 2, c],
                        ["L", a + l, c + e],
                        ["L", a, c + e],
                        ["Z"],
                    ];
                },
                "triangle-down": function(a, c, l, e) {
                    return [
                        ["M", a, c],
                        ["L", a + l, c],
                        ["L", a + l / 2, c + e],
                        ["Z"]
                    ];
                },
                diamond: function(a, c, l, e) {
                    return [
                        ["M", a + l / 2, c],
                        ["L", a + l, c + e / 2],
                        ["L", a + l / 2, c + e],
                        ["L", a, c + e / 2],
                        ["Z"],
                    ];
                },
                arc: function(a, c, l, e, f) {
                    var x = [];
                    if (f) {
                        var p = f.start || 0,
                            b = f.end || 0,
                            g = f.r || l;
                        l = f.r || e || l;
                        var R = 0.001 > Math.abs(b - p - 2 * Math.PI);
                        b -= 0.001;
                        e = f.innerR;
                        R = h(f.open, R);
                        var E = Math.cos(p),
                            v = Math.sin(p),
                            A = Math.cos(b),
                            y = Math.sin(b);
                        p = h(f.longArc, 0.001 > b - p - Math.PI ? 0 : 1);
                        x.push(
                            ["M", a + g * E, c + l * v], ["A", g, l, 0, p, h(f.clockwise, 1), a + g * A, c + l * y]
                        );
                        d(e) &&
                            x.push(
                                R ? ["M", a + e * A, c + e * y] : ["L", a + e * A, c + e * y], [
                                    "A",
                                    e,
                                    e,
                                    0,
                                    p,
                                    d(f.clockwise) ? 1 - f.clockwise : 0,
                                    a + e * E,
                                    c + e * v,
                                ]
                            );
                        R || x.push(["Z"]);
                    }
                    return x;
                },
                callout: function(a, c, l, e, f) {
                    var x = Math.min((f && f.r) || 0, l, e),
                        p = x + 6,
                        b = (f && f.anchorX) || 0;
                    f = (f && f.anchorY) || 0;
                    var g = [
                        ["M", a + x, c],
                        ["L", a + l - x, c],
                        ["C", a + l, c, a + l, c, a + l, c + x],
                        ["L", a + l, c + e - x],
                        ["C", a + l, c + e, a + l, c + e, a + l - x, c + e],
                        ["L", a + x, c + e],
                        ["C", a, c + e, a, c + e, a, c + e - x],
                        ["L", a, c + x],
                        ["C", a, c, a, c, a + x, c],
                    ];
                    b && b > l ?
                        f > c + p && f < c + e - p ?
                        g.splice(
                            3,
                            1, ["L", a + l, f - 6], ["L", a + l + 6, f], ["L", a + l, f + 6], ["L", a + l, c + e - x]
                        ) :
                        g.splice(
                            3,
                            1, ["L", a + l, e / 2], ["L", b, f], ["L", a + l, e / 2], ["L", a + l, c + e - x]
                        ) :
                        b && 0 > b ?
                        f > c + p && f < c + e - p ?
                        g.splice(
                            7,
                            1, ["L", a, f + 6], ["L", a - 6, f], ["L", a, f - 6], ["L", a, c + x]
                        ) :
                        g.splice(
                            7,
                            1, ["L", a, e / 2], ["L", b, f], ["L", a, e / 2], ["L", a, c + x]
                        ) :
                        f && f > e && b > a + p && b < a + l - p ?
                        g.splice(
                            5,
                            1, ["L", b + 6, c + e], ["L", b, c + e + 6], ["L", b - 6, c + e], ["L", a + x, c + e]
                        ) :
                        f &&
                        0 > f &&
                        b > a + p &&
                        b < a + l - p &&
                        g.splice(
                            1,
                            1, ["L", b - 6, c], ["L", b, c - 6], ["L", b + 6, c], ["L", l - x, c]
                        );
                    return g;
                },
            };
            t.SVGRenderer = C;
            t.Renderer = t.SVGRenderer;
            return t.Renderer;
        }
    );
    Q(
        k,
        "Core/Renderer/HTML/HTMLElement.js", [
            k["Core/Globals.js"],
            k["Core/Renderer/SVG/SVGElement.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I) {
            var B = I.css,
                J = I.defined,
                M = I.extend,
                n = I.pick,
                z = I.pInt,
                G = k.isFirefox;
            M(t.prototype, {
                htmlCss: function(d) {
                    var z = "SPAN" === this.element.tagName && d && "width" in d,
                        u = n(z && d.width, void 0);
                    if (z) {
                        delete d.width;
                        this.textWidth = u;
                        var F = !0;
                    }
                    d &&
                        "ellipsis" === d.textOverflow &&
                        ((d.whiteSpace = "nowrap"), (d.overflow = "hidden"));
                    this.styles = M(this.styles, d);
                    B(this.element, d);
                    F && this.htmlUpdateTransform();
                    return this;
                },
                htmlGetBBox: function() {
                    var d = this.element;
                    return {
                        x: d.offsetLeft,
                        y: d.offsetTop,
                        width: d.offsetWidth,
                        height: d.offsetHeight,
                    };
                },
                htmlUpdateTransform: function() {
                    if (this.added) {
                        var d = this.renderer,
                            n = this.element,
                            u = this.translateX || 0,
                            F = this.translateY || 0,
                            w = this.x || 0,
                            r = this.y || 0,
                            m = this.textAlign || "left",
                            L = { left: 0, center: 0.5, right: 1 }[m],
                            q = this.styles,
                            h = q && q.whiteSpace;
                        B(n, { marginLeft: u, marginTop: F });
                        !d.styledMode &&
                            this.shadows &&
                            this.shadows.forEach(function(a) {
                                B(a, { marginLeft: u + 1, marginTop: F + 1 });
                            });
                        this.inverted && [].forEach.call(n.childNodes, function(a) {
                            d.invertChild(a, n);
                        });
                        if ("SPAN" === n.tagName) {
                            q = this.rotation;
                            var b = this.textWidth && z(this.textWidth),
                                g = [q, m, n.innerHTML, this.textWidth, this.textAlign].join(),
                                f;
                            (f = b !== this.oldTextWidth) &&
                            !(f = b > this.oldTextWidth) &&
                            ((f = this.textPxLength) ||
                                (B(n, { width: "", whiteSpace: h || "nowrap" }),
                                    (f = n.offsetWidth)),
                                (f = f > b));
                            f &&
                                (/[ \-]/.test(n.textContent || n.innerText) ||
                                    "ellipsis" === n.style.textOverflow) ?
                                (B(n, {
                                        width: b + "px",
                                        display: "block",
                                        whiteSpace: h || "normal",
                                    }),
                                    (this.oldTextWidth = b),
                                    (this.hasBoxWidthChanged = !0)) :
                                (this.hasBoxWidthChanged = !1);
                            g !== this.cTT &&
                                ((h = d.fontMetrics(n.style.fontSize, n).b), !J(q) ||
                                    (q === (this.oldRotation || 0) && m === this.oldAlign) ||
                                    this.setSpanRotation(q, L, h),
                                    this.getSpanCorrection(
                                        (!J(q) && this.textPxLength) || n.offsetWidth,
                                        h,
                                        L,
                                        q,
                                        m
                                    ));
                            B(n, {
                                left: w + (this.xCorr || 0) + "px",
                                top: r + (this.yCorr || 0) + "px",
                            });
                            this.cTT = g;
                            this.oldRotation = q;
                            this.oldAlign = m;
                        }
                    } else this.alignOnAdd = !0;
                },
                setSpanRotation: function(d, n, u) {
                    var F = {},
                        w = this.renderer.getTransformKey();
                    F[w] = F.transform = "rotate(" + d + "deg)";
                    F[w + (G ? "Origin" : "-origin")] = F.transformOrigin =
                        100 * n + "% " + u + "px";
                    B(this.element, F);
                },
                getSpanCorrection: function(d, n, u) {
                    this.xCorr = -d * u;
                    this.yCorr = -n;
                },
            });
            return t;
        }
    );
    Q(
        k,
        "Core/Renderer/HTML/HTMLRenderer.js", [
            k["Core/Globals.js"],
            k["Core/Renderer/SVG/SVGElement.js"],
            k["Core/Renderer/SVG/SVGRenderer.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D) {
            var B = k.isFirefox,
                M = k.isMS,
                n = k.isWebKit,
                z = k.win,
                G = D.attr,
                d = D.createElement,
                O = D.extend,
                u = D.pick;
            O(I.prototype, {
                getTransformKey: function() {
                    return M && !/Edge/.test(z.navigator.userAgent) ?
                        "-ms-transform" :
                        n ?
                        "-webkit-transform" :
                        B ?
                        "MozTransform" :
                        z.opera ?
                        "-o-transform" :
                        "";
                },
                html: function(F, w, r) {
                    var m = this.createElement("span"),
                        L = m.element,
                        q = m.renderer,
                        h = q.isSVG,
                        b = function(b, f) {
                            ["opacity", "visibility"].forEach(function(a) {
                                b[a + "Setter"] = function(p, e, g) {
                                    var h = b.div ? b.div.style : f;
                                    t.prototype[a + "Setter"].call(this, p, e, g);
                                    h && (h[e] = p);
                                };
                            });
                            b.addedSetters = !0;
                        };
                    m.textSetter = function(b) {
                        b !== L.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                        this.textStr = b;
                        L.innerHTML = u(b, "");
                        m.doTransform = !0;
                    };
                    h && b(m, m.element.style);
                    m.xSetter = m.ySetter = m.alignSetter = m.rotationSetter = function(
                        b,
                        f
                    ) {
                        "align" === f ? (m.alignValue = m.textAlign = b) : (m[f] = b);
                        m.doTransform = !0;
                    };
                    m.afterSetters = function() {
                        this.doTransform &&
                            (this.htmlUpdateTransform(), (this.doTransform = !1));
                    };
                    m.attr({ text: F, x: Math.round(w), y: Math.round(r) }).css({
                        position: "absolute",
                    });
                    q.styledMode ||
                        m.css({
                            fontFamily: this.style.fontFamily,
                            fontSize: this.style.fontSize,
                        });
                    L.style.whiteSpace = "nowrap";
                    m.css = m.htmlCss;
                    h &&
                        (m.add = function(g) {
                            var f = q.box.parentNode,
                                a = [];
                            if ((this.parentGroup = g)) {
                                var p = g.div;
                                if (!p) {
                                    for (; g;) a.push(g), (g = g.parentGroup);
                                    a.reverse().forEach(function(e) {
                                        function g(a, f) {
                                            e[f] = a;
                                            "translateX" === f
                                                ?
                                                (y.left = a + "px") :
                                                (y.top = a + "px");
                                            e.doTransform = !0;
                                        }
                                        var h = G(e.element, "class");
                                        p = e.div =
                                            e.div ||
                                            d(
                                                "div",
                                                h ? { className: h } : void 0, {
                                                    position: "absolute",
                                                    left: (e.translateX || 0) + "px",
                                                    top: (e.translateY || 0) + "px",
                                                    display: e.display,
                                                    opacity: e.opacity,
                                                    pointerEvents: e.styles && e.styles.pointerEvents,
                                                },
                                                p || f
                                            );
                                        var y = p.style;
                                        O(e, {
                                            classSetter: (function(a) {
                                                return function(e) {
                                                    this.element.setAttribute("class", e);
                                                    a.className = e;
                                                };
                                            })(p),
                                            on: function() {
                                                a[0].div &&
                                                    m.on.apply({ element: a[0].div }, arguments);
                                                return e;
                                            },
                                            translateXSetter: g,
                                            translateYSetter: g,
                                        });
                                        e.addedSetters || b(e);
                                    });
                                }
                            } else p = f;
                            p.appendChild(L);
                            m.added = !0;
                            m.alignOnAdd && m.htmlUpdateTransform();
                            return m;
                        });
                    return m;
                },
            });
            return I;
        }
    );
    Q(
        k,
        "Core/Axis/Tick.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.clamp,
                D = t.correctFloat,
                J = t.defined,
                M = t.destroyObjectProperties,
                n = t.extend,
                z = t.fireEvent,
                G = t.isNumber,
                d = t.merge,
                O = t.objectEach,
                u = t.pick,
                F = k.deg2rad;
            t = (function() {
                function w(r, m, d, q, h) {
                    this.isNewLabel = this.isNew = !0;
                    this.axis = r;
                    this.pos = m;
                    this.type = d || "";
                    this.parameters = h || {};
                    this.tickmarkOffset = this.parameters.tickmarkOffset;
                    this.options = this.parameters.options;
                    z(this, "init");
                    d || q || this.addLabel();
                }
                w.prototype.addLabel = function() {
                    var r = this,
                        m = r.axis,
                        d = m.options,
                        q = m.chart,
                        h = m.categories,
                        b = m.logarithmic,
                        g = m.names,
                        f = r.pos,
                        a = u(r.options && r.options.labels, d.labels),
                        p = m.tickPositions,
                        e = f === p[0],
                        E = f === p[p.length - 1];
                    g = this.parameters.category || (h ? u(h[f], g[f], f) : f);
                    var H = r.label;
                    h = (!a.step || 1 === a.step) && 1 === m.tickInterval;
                    p = p.info;
                    var y, N;
                    if (m.dateTime && p) {
                        var P = q.time.resolveDTLFormat(
                            d.dateTimeLabelFormats[
                                (!d.grid && p.higherRanks[f]) || p.unitName
                            ]
                        );
                        var K = P.main;
                    }
                    r.isFirst = e;
                    r.isLast = E;
                    r.formatCtx = {
                        axis: m,
                        chart: q,
                        isFirst: e,
                        isLast: E,
                        dateTimeLabelFormat: K,
                        tickPositionInfo: p,
                        value: b ? D(b.lin2log(g)) : g,
                        pos: f,
                    };
                    d = m.labelFormatter.call(r.formatCtx, this.formatCtx);
                    if ((N = P && P.list))
                        r.shortenLabel = function() {
                            for (y = 0; y < N.length; y++)
                                if (
                                    (H.attr({
                                            text: m.labelFormatter.call(
                                                n(r.formatCtx, { dateTimeLabelFormat: N[y] })
                                            ),
                                        }),
                                        H.getBBox().width < m.getSlotWidth(r) - 2 * u(a.padding, 5))
                                )
                                    return;
                            H.attr({ text: "" });
                        };
                    h && m._addedPlotLB && r.moveLabel(d, a);
                    J(H) || r.movedLabel ?
                        H &&
                        H.textStr !== d &&
                        !h &&
                        (!H.textWidth ||
                            (a.style && a.style.width) ||
                            H.styles.width ||
                            H.css({ width: null }),
                            H.attr({ text: d }),
                            (H.textPxLength = H.getBBox().width)) :
                        ((r.label = H = r.createLabel({ x: 0, y: 0 }, d, a)),
                            (r.rotation = 0));
                };
                w.prototype.createLabel = function(r, m, w) {
                    var q = this.axis,
                        h = q.chart;
                    if (
                        (r =
                            J(m) && w.enabled ?
                            h.renderer.text(m, r.x, r.y, w.useHTML).add(q.labelGroup) :
                            null)
                    )
                        h.styledMode || r.css(d(w.style)),
                        (r.textPxLength = r.getBBox().width);
                    return r;
                };
                w.prototype.destroy = function() {
                    M(this, this.axis);
                };
                w.prototype.getPosition = function(r, m, d, q) {
                    var h = this.axis,
                        b = h.chart,
                        g = (q && b.oldChartHeight) || b.chartHeight;
                    r = {
                        x: r ?
                            D(h.translate(m + d, null, null, q) + h.transB) :
                            h.left +
                            h.offset +
                            (h.opposite ?
                                ((q && b.oldChartWidth) || b.chartWidth) - h.right - h.left :
                                0),
                        y: r ?
                            g - h.bottom + h.offset - (h.opposite ? h.height : 0) :
                            D(g - h.translate(m + d, null, null, q) - h.transB),
                    };
                    r.y = B(r.y, -1e5, 1e5);
                    z(this, "afterGetPosition", { pos: r });
                    return r;
                };
                w.prototype.getLabelPosition = function(r, m, d, q, h, b, g, f) {
                    var a = this.axis,
                        p = a.transA,
                        e =
                        a.isLinked && a.linkedParent ?
                        a.linkedParent.reversed :
                        a.reversed,
                        E = a.staggerLines,
                        H = a.tickRotCorr || { x: 0, y: 0 },
                        y = h.y,
                        N =
                        q || a.reserveSpaceDefault ?
                        0 :
                        -a.labelOffset * ("center" === a.labelAlign ? 0.5 : 1),
                        P = {};
                    J(y) ||
                        (y =
                            0 === a.side ?
                            d.rotation ?
                            -8 :
                            -d.getBBox().height :
                            2 === a.side ?
                            H.y + 8 :
                            Math.cos(d.rotation * F) *
                            (H.y - d.getBBox(!1, 0).height / 2));
                    r = r + h.x + N + H.x - (b && q ? b * p * (e ? -1 : 1) : 0);
                    m = m + y - (b && !q ? b * p * (e ? 1 : -1) : 0);
                    E &&
                        ((d = (g / (f || 1)) % E),
                            a.opposite && (d = E - d - 1),
                            (m += (a.labelOffset / E) * d));
                    P.x = r;
                    P.y = Math.round(m);
                    z(this, "afterGetLabelPosition", {
                        pos: P,
                        tickmarkOffset: b,
                        index: g,
                    });
                    return P;
                };
                w.prototype.getLabelSize = function() {
                    return this.label ?
                        this.label.getBBox()[this.axis.horiz ? "height" : "width"] :
                        0;
                };
                w.prototype.getMarkPath = function(r, m, d, q, h, b) {
                    return b.crispLine(
                        [
                            ["M", r, m],
                            ["L", r + (h ? 0 : -d), m + (h ? d : 0)],
                        ],
                        q
                    );
                };
                w.prototype.handleOverflow = function(r) {
                    var m = this.axis,
                        d = m.options.labels,
                        q = r.x,
                        h = m.chart.chartWidth,
                        b = m.chart.spacing,
                        g = u(m.labelLeft, Math.min(m.pos, b[3]));
                    b = u(
                        m.labelRight,
                        Math.max(m.isRadial ? 0 : m.pos + m.len, h - b[1])
                    );
                    var f = this.label,
                        a = this.rotation,
                        p = { left: 0, center: 0.5, right: 1 }[
                            m.labelAlign || f.attr("align")
                        ],
                        e = f.getBBox().width,
                        E = m.getSlotWidth(this),
                        H = E,
                        y = 1,
                        N,
                        P = {};
                    if (a || "justify" !== u(d.overflow, "justify"))
                        0 > a && q - p * e < g ?
                        (N = Math.round(q / Math.cos(a * F) - g)) :
                        0 < a &&
                        q + p * e > b &&
                        (N = Math.round((h - q) / Math.cos(a * F)));
                    else if (
                        ((h = q + (1 - p) * e),
                            q - p * e < g ?
                            (H = r.x + H * (1 - p) - g) :
                            h > b && ((H = b - r.x + H * p), (y = -1)),
                            (H = Math.min(E, H)),
                            H < E &&
                            "center" === m.labelAlign &&
                            (r.x += y * (E - H - p * (E - Math.min(e, H)))),
                            e > H || (m.autoRotation && (f.styles || {}).width))
                    )
                        N = H;
                    N &&
                        (this.shortenLabel ?
                            this.shortenLabel() :
                            ((P.width = Math.floor(N) + "px"),
                                (d.style || {}).textOverflow || (P.textOverflow = "ellipsis"),
                                f.css(P)));
                };
                w.prototype.moveLabel = function(r, m) {
                    var d = this,
                        q = d.label,
                        h = !1,
                        b = d.axis,
                        g = b.reversed;
                    q && q.textStr === r ?
                        ((d.movedLabel = q), (h = !0), delete d.label) :
                        O(b.ticks, function(a) {
                            h ||
                                a.isNew ||
                                a === d ||
                                !a.label ||
                                a.label.textStr !== r ||
                                ((d.movedLabel = a.label),
                                    (h = !0),
                                    (a.labelPos = d.movedLabel.xy),
                                    delete a.label);
                        });
                    if (!h && (d.labelPos || q)) {
                        var f = d.labelPos || q.xy;
                        q = b.horiz ? (g ? 0 : b.width + b.left) : f.x;
                        b = b.horiz ? f.y : g ? b.width + b.left : 0;
                        d.movedLabel = d.createLabel({ x: q, y: b }, r, m);
                        d.movedLabel && d.movedLabel.attr({ opacity: 0 });
                    }
                };
                w.prototype.render = function(r, m, d) {
                    var q = this.axis,
                        h = q.horiz,
                        b = this.pos,
                        g = u(this.tickmarkOffset, q.tickmarkOffset);
                    b = this.getPosition(h, b, g, m);
                    g = b.x;
                    var f = b.y;
                    q = (h && g === q.pos + q.len) || (!h && f === q.pos) ? -1 : 1;
                    d = u(d, 1);
                    this.isActive = !0;
                    this.renderGridLine(m, d, q);
                    this.renderMark(b, d, q);
                    this.renderLabel(b, m, d, r);
                    this.isNew = !1;
                    z(this, "afterRender");
                };
                w.prototype.renderGridLine = function(r, m, d) {
                    var q = this.axis,
                        h = q.options,
                        b = this.gridLine,
                        g = {},
                        f = this.pos,
                        a = this.type,
                        p = u(this.tickmarkOffset, q.tickmarkOffset),
                        e = q.chart.renderer,
                        E = a ? a + "Grid" : "grid",
                        H = h[E + "LineWidth"],
                        y = h[E + "LineColor"];
                    h = h[E + "LineDashStyle"];
                    b ||
                        (q.chart.styledMode ||
                            ((g.stroke = y), (g["stroke-width"] = H), h && (g.dashstyle = h)),
                            a || (g.zIndex = 1),
                            r && (m = 0),
                            (this.gridLine = b = e
                                .path()
                                .attr(g)
                                .addClass("highcharts-" + (a ? a + "-" : "") + "grid-line")
                                .add(q.gridGroup)));
                    if (
                        b &&
                        (d = q.getPlotLinePath({
                            value: f + p,
                            lineWidth: b.strokeWidth() * d,
                            force: "pass",
                            old: r,
                        }))
                    )
                        b[r || this.isNew ? "attr" : "animate"]({ d: d, opacity: m });
                };
                w.prototype.renderMark = function(d, m, w) {
                    var q = this.axis,
                        h = q.options,
                        b = q.chart.renderer,
                        g = this.type,
                        f = g ? g + "Tick" : "tick",
                        a = q.tickSize(f),
                        p = this.mark,
                        e = !p,
                        E = d.x;
                    d = d.y;
                    var H = u(h[f + "Width"], !g && q.isXAxis ? 1 : 0);
                    h = h[f + "Color"];
                    a &&
                        (q.opposite && (a[0] = -a[0]),
                            e &&
                            ((this.mark = p = b
                                    .path()
                                    .addClass("highcharts-" + (g ? g + "-" : "") + "tick")
                                    .add(q.axisGroup)),
                                q.chart.styledMode || p.attr({ stroke: h, "stroke-width": H })),
                            p[e ? "attr" : "animate"]({
                                d: this.getMarkPath(E, d, a[0], p.strokeWidth() * w, q.horiz, b),
                                opacity: m,
                            }));
                };
                w.prototype.renderLabel = function(d, m, w, q) {
                    var h = this.axis,
                        b = h.horiz,
                        g = h.options,
                        f = this.label,
                        a = g.labels,
                        p = a.step;
                    h = u(this.tickmarkOffset, h.tickmarkOffset);
                    var e = !0,
                        E = d.x;
                    d = d.y;
                    f &&
                        G(E) &&
                        ((f.xy = d = this.getLabelPosition(E, d, f, b, a, h, q, p)),
                            (this.isFirst && !this.isLast && !u(g.showFirstLabel, 1)) ||
                            (this.isLast && !this.isFirst && !u(g.showLastLabel, 1)) ?
                            (e = !1) :
                            !b ||
                            a.step ||
                            a.rotation ||
                            m ||
                            0 === w ||
                            this.handleOverflow(d),
                            p && q % p && (e = !1),
                            e && G(d.y) ?
                            ((d.opacity = w),
                                f[this.isNewLabel ? "attr" : "animate"](d),
                                (this.isNewLabel = !1)) :
                            (f.attr("y", -9999), (this.isNewLabel = !0)));
                };
                w.prototype.replaceMovedLabel = function() {
                    var d = this.label,
                        m = this.axis,
                        w = m.reversed;
                    if (d && !this.isNew) {
                        var q = m.horiz ? (w ? m.left : m.width + m.left) : d.xy.x;
                        w = m.horiz ? d.xy.y : w ? m.width + m.top : m.top;
                        d.animate({ x: q, y: w, opacity: 0 }, void 0, d.destroy);
                        delete this.label;
                    }
                    m.isDirty = !0;
                    this.label = this.movedLabel;
                    delete this.movedLabel;
                };
                return w;
            })();
            k.Tick = t;
            return k.Tick;
        }
    );
    Q(
        k,
        "Core/Time.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.defined,
                D = t.error,
                J = t.extend,
                M = t.isObject,
                n = t.merge,
                z = t.objectEach,
                G = t.pad,
                d = t.pick,
                O = t.splat,
                u = t.timeUnits,
                F = k.win;
            t = (function() {
                function w(d) {
                    this.options = {};
                    this.variableTimezone = this.useUTC = !1;
                    this.Date = F.Date;
                    this.getTimezoneOffset = this.timezoneOffsetFunction();
                    this.update(d);
                }
                w.prototype.get = function(d, m) {
                    if (this.variableTimezone || this.timezoneOffset) {
                        var r = m.getTime(),
                            q = r - this.getTimezoneOffset(m);
                        m.setTime(q);
                        d = m["getUTC" + d]();
                        m.setTime(r);
                        return d;
                    }
                    return this.useUTC ? m["getUTC" + d]() : m["get" + d]();
                };
                w.prototype.set = function(d, m, w) {
                    if (this.variableTimezone || this.timezoneOffset) {
                        if ("Milliseconds" === d || "Seconds" === d || "Minutes" === d)
                            return m["setUTC" + d](w);
                        var q = this.getTimezoneOffset(m);
                        q = m.getTime() - q;
                        m.setTime(q);
                        m["setUTC" + d](w);
                        d = this.getTimezoneOffset(m);
                        q = m.getTime() + d;
                        return m.setTime(q);
                    }
                    return this.useUTC ? m["setUTC" + d](w) : m["set" + d](w);
                };
                w.prototype.update = function(r) {
                    var m = d(r && r.useUTC, !0);
                    this.options = r = n(!0, this.options || {}, r);
                    this.Date = r.Date || F.Date || Date;
                    this.timezoneOffset = (this.useUTC = m) && r.timezoneOffset;
                    this.getTimezoneOffset = this.timezoneOffsetFunction();
                    this.variableTimezone = !(m && !r.getTimezoneOffset && !r.timezone);
                };
                w.prototype.makeTime = function(r, m, w, q, h, b) {
                    if (this.useUTC) {
                        var g = this.Date.UTC.apply(0, arguments);
                        var f = this.getTimezoneOffset(g);
                        g += f;
                        var a = this.getTimezoneOffset(g);
                        f !== a ?
                            (g += a - f) :
                            f - 36e5 !== this.getTimezoneOffset(g - 36e5) ||
                            k.isSafari ||
                            (g -= 36e5);
                    } else
                        g = new this.Date(
                            r,
                            m,
                            d(w, 1),
                            d(q, 0),
                            d(h, 0),
                            d(b, 0)
                        ).getTime();
                    return g;
                };
                w.prototype.timezoneOffsetFunction = function() {
                    var d = this,
                        m = this.options,
                        w = m.moment || F.moment;
                    if (!this.useUTC)
                        return function(m) {
                            return 6e4 * new Date(m.toString()).getTimezoneOffset();
                        };
                    if (m.timezone) {
                        if (w)
                            return function(d) {
                                return 6e4 * -w.tz(d, m.timezone).utcOffset();
                            };
                        D(25);
                    }
                    return this.useUTC && m.getTimezoneOffset ?

                        function(d) {
                            return 6e4 * m.getTimezoneOffset(d.valueOf());
                        } :
                        function() {
                            return 6e4 * (d.timezoneOffset || 0);
                        };
                };
                w.prototype.dateFormat = function(r, m, w) {
                    var q;
                    if (!B(m) || isNaN(m))
                        return (
                            (null === (q = k.defaultOptions.lang) || void 0 === q ?
                                void 0 :
                                q.invalidDate) || ""
                        );
                    r = d(r, "%Y-%m-%d %H:%M:%S");
                    var h = this;
                    q = new this.Date(m);
                    var b = this.get("Hours", q),
                        g = this.get("Day", q),
                        f = this.get("Date", q),
                        a = this.get("Month", q),
                        p = this.get("FullYear", q),
                        e = k.defaultOptions.lang,
                        E = null === e || void 0 === e ? void 0 : e.weekdays,
                        H = null === e || void 0 === e ? void 0 : e.shortWeekdays;
                    q = J({
                            a: H ? H[g] : E[g].substr(0, 3),
                            A: E[g],
                            d: G(f),
                            e: G(f, 2, " "),
                            w: g,
                            b: e.shortMonths[a],
                            B: e.months[a],
                            m: G(a + 1),
                            o: a + 1,
                            y: p.toString().substr(2, 2),
                            Y: p,
                            H: G(b),
                            k: b,
                            I: G(b % 12 || 12),
                            l: b % 12 || 12,
                            M: G(this.get("Minutes", q)),
                            p: 12 > b ? "AM" : "PM",
                            P: 12 > b ? "am" : "pm",
                            S: G(q.getSeconds()),
                            L: G(Math.floor(m % 1e3), 3),
                        },
                        k.dateFormats
                    );
                    z(q, function(a, e) {
                        for (; - 1 !== r.indexOf("%" + e);)
                            r = r.replace(
                                "%" + e,
                                "function" === typeof a ? a.call(h, m) : a
                            );
                    });
                    return w ? r.substr(0, 1).toUpperCase() + r.substr(1) : r;
                };
                w.prototype.resolveDTLFormat = function(d) {
                    return M(d, !0) ?
                        d :
                        ((d = O(d)), { main: d[0], from: d[1], to: d[2] });
                };
                w.prototype.getTimeTicks = function(r, m, w, q) {
                    var h = this,
                        b = [],
                        g = {};
                    var f = new h.Date(m);
                    var a = r.unitRange,
                        p = r.count || 1,
                        e;
                    q = d(q, 1);
                    if (B(m)) {
                        h.set(
                            "Milliseconds",
                            f,
                            a >= u.second ? 0 : p * Math.floor(h.get("Milliseconds", f) / p)
                        );
                        a >= u.second &&
                            h.set(
                                "Seconds",
                                f,
                                a >= u.minute ? 0 : p * Math.floor(h.get("Seconds", f) / p)
                            );
                        a >= u.minute &&
                            h.set(
                                "Minutes",
                                f,
                                a >= u.hour ? 0 : p * Math.floor(h.get("Minutes", f) / p)
                            );
                        a >= u.hour &&
                            h.set(
                                "Hours",
                                f,
                                a >= u.day ? 0 : p * Math.floor(h.get("Hours", f) / p)
                            );
                        a >= u.day &&
                            h.set(
                                "Date",
                                f,
                                a >= u.month ?
                                1 :
                                Math.max(1, p * Math.floor(h.get("Date", f) / p))
                            );
                        if (a >= u.month) {
                            h.set(
                                "Month",
                                f,
                                a >= u.year ? 0 : p * Math.floor(h.get("Month", f) / p)
                            );
                            var E = h.get("FullYear", f);
                        }
                        a >= u.year && h.set("FullYear", f, E - (E % p));
                        a === u.week &&
                            ((E = h.get("Day", f)),
                                h.set("Date", f, h.get("Date", f) - E + q + (E < q ? -7 : 0)));
                        E = h.get("FullYear", f);
                        q = h.get("Month", f);
                        var H = h.get("Date", f),
                            y = h.get("Hours", f);
                        m = f.getTime();
                        h.variableTimezone &&
                            (e =
                                w - m > 4 * u.month ||
                                h.getTimezoneOffset(m) !== h.getTimezoneOffset(w));
                        m = f.getTime();
                        for (f = 1; m < w;)
                            b.push(m),
                            (m =
                                a === u.year ?
                                h.makeTime(E + f * p, 0) :
                                a === u.month ?
                                h.makeTime(E, q + f * p) :
                                !e || (a !== u.day && a !== u.week) ?
                                e && a === u.hour && 1 < p ?
                                h.makeTime(E, q, H, y + f * p) :
                                m + a * p :
                                h.makeTime(E, q, H + f * p * (a === u.day ? 1 : 7))),
                            f++;
                        b.push(m);
                        a <= u.hour &&
                            1e4 > b.length &&
                            b.forEach(function(a) {
                                0 === a % 18e5 &&
                                    "000000000" === h.dateFormat("%H%M%S%L", a) &&
                                    (g[a] = "day");
                            });
                    }
                    b.info = J(r, { higherRanks: g, totalRange: a * p });
                    return b;
                };
                return w;
            })();
            k.Time = t;
            return k.Time;
        }
    );
    Q(
        k,
        "Core/Options.js", [
            k["Core/Globals.js"],
            k["Core/Color/Color.js"],
            k["Core/Time.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D) {
            var B = k.isTouchDevice,
                M = k.svg;
            t = t.parse;
            D = D.merge;
            ("");
            k.defaultOptions = {
                colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(
                    " "
                ),
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(
                        " "
                    ),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(
                        " "
                    ),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                        " "
                    ),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " ",
                },
                global: {},
                time: {
                    Date: void 0,
                    getTimezoneOffset: void 0,
                    timezone: void 0,
                    timezoneOffset: 0,
                    useUTC: !0,
                },
                chart: {
                    styledMode: !1,
                    borderRadius: 0,
                    colorCount: 10,
                    defaultSeriesType: "line",
                    ignoreHiddenSeries: !0,
                    spacing: [10, 10, 15, 10],
                    resetZoomButton: {
                        theme: { zIndex: 6 },
                        position: { align: "right", x: -10, y: 10 },
                    },
                    width: null,
                    height: null,
                    borderColor: "#335cad",
                    backgroundColor: "#ffffff",
                    plotBorderColor: "#cccccc",
                },
                title: {
                    text: "Chart title",
                    align: "center",
                    margin: 15,
                    widthAdjust: -44,
                },
                subtitle: { text: "", align: "center", widthAdjust: -44 },
                caption: {
                    margin: 15,
                    text: "",
                    align: "left",
                    verticalAlign: "bottom",
                },
                plotOptions: {},
                labels: { style: { position: "absolute", color: "#333333" } },
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    layout: "horizontal",
                    labelFormatter: function() {
                        return this.name;
                    },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
                    itemStyle: {
                        color: "#333333",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                    },
                    itemHoverStyle: { color: "#000000" },
                    itemHiddenStyle: { color: "#cccccc" },
                    shadow: !1,
                    itemCheckboxStyle: {
                        position: "absolute",
                        width: "13px",
                        height: "13px",
                    },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: { style: { fontWeight: "bold" } },
                },
                loading: {
                    labelStyle: { fontWeight: "bold", position: "relative", top: "45%" },
                    style: {
                        position: "absolute",
                        backgroundColor: "#ffffff",
                        opacity: 0.5,
                        textAlign: "center",
                    },
                },
                tooltip: {
                    enabled: !0,
                    animation: M,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y",
                    },
                    footerFormat: "",
                    padding: 8,
                    snap: B ? 25 : 10,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                    backgroundColor: t("#f7f7f7").setOpacity(0.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    style: {
                        color: "#333333",
                        cursor: "default",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                    },
                },
                credits: {
                    enabled: !0,
                    href: "https://www.highcharts.com?credits",
                    position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 },
                    style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
                    text: "Highcharts.com",
                },
            };
            ("");
            k.time = new I(D(k.defaultOptions.global, k.defaultOptions.time));
            k.dateFormat = function(n, z, G) {
                return k.time.dateFormat(n, z, G);
            };
            return {
                dateFormat: k.dateFormat,
                defaultOptions: k.defaultOptions,
                time: k.time,
            };
        }
    );
    Q(
        k,
        "Core/Axis/Axis.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Color/Color.js"],
            k["Core/Globals.js"],
            k["Core/Axis/Tick.js"],
            k["Core/Utilities.js"],
            k["Core/Options.js"],
        ],
        function(k, t, I, D, J, M) {
            var n = k.animObject,
                z = J.addEvent,
                G = J.arrayMax,
                d = J.arrayMin,
                O = J.clamp,
                u = J.correctFloat,
                F = J.defined,
                w = J.destroyObjectProperties,
                r = J.error,
                m = J.extend,
                L = J.fireEvent,
                q = J.format,
                h = J.getMagnitude,
                b = J.isArray,
                g = J.isFunction,
                f = J.isNumber,
                a = J.isString,
                p = J.merge,
                e = J.normalizeTickInterval,
                E = J.objectEach,
                H = J.pick,
                y = J.relativeLength,
                N = J.removeEvent,
                P = J.splat,
                K = J.syncTimeout,
                A = M.defaultOptions,
                C = I.deg2rad;
            k = (function() {
                function v(c, a) {
                    this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.oldMin = this.oldMax = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                    this.init(c, a);
                }
                v.prototype.init = function(c, a) {
                    var l = a.isX,
                        e = this;
                    e.chart = c;
                    e.horiz = c.inverted && !e.isZAxis ? !l : l;
                    e.isXAxis = l;
                    e.coll = e.coll || (l ? "xAxis" : "yAxis");
                    L(this, "init", { userOptions: a });
                    e.opposite = a.opposite;
                    e.side =
                        a.side || (e.horiz ? (e.opposite ? 0 : 2) : e.opposite ? 1 : 3);
                    e.setOptions(a);
                    var f = this.options,
                        b = f.type;
                    e.labelFormatter = f.labels.formatter || e.defaultLabelFormatter;
                    e.userOptions = a;
                    e.minPixelPadding = 0;
                    e.reversed = f.reversed;
                    e.visible = !1 !== f.visible;
                    e.zoomEnabled = !1 !== f.zoomEnabled;
                    e.hasNames = "category" === b || !0 === f.categories;
                    e.categories = f.categories || e.hasNames;
                    e.names || ((e.names = []), (e.names.keys = {}));
                    e.plotLinesAndBandsGroups = {};
                    e.positiveValuesOnly = !!e.logarithmic;
                    e.isLinked = F(f.linkedTo);
                    e.ticks = {};
                    e.labelEdge = [];
                    e.minorTicks = {};
                    e.plotLinesAndBands = [];
                    e.alternateBands = {};
                    e.len = 0;
                    e.minRange = e.userMinRange = f.minRange || f.maxZoom;
                    e.range = f.range;
                    e.offset = f.offset || 0;
                    e.max = null;
                    e.min = null;
                    e.crosshair = H(
                        f.crosshair,
                        P(c.options.tooltip.crosshairs)[l ? 0 : 1], !1
                    );
                    a = e.options.events; -
                    1 === c.axes.indexOf(e) &&
                        (l ? c.axes.splice(c.xAxis.length, 0, e) : c.axes.push(e),
                            c[e.coll].push(e));
                    e.series = e.series || [];
                    c.inverted &&
                        !e.isZAxis &&
                        l &&
                        "undefined" === typeof e.reversed &&
                        (e.reversed = !0);
                    e.labelRotation = e.options.labels.rotation;
                    E(a, function(c, a) {
                        g(c) && z(e, a, c);
                    });
                    L(this, "afterInit");
                };
                v.prototype.setOptions = function(c) {
                    this.options = p(
                        v.defaultOptions,
                        "yAxis" === this.coll && v.defaultYAxisOptions, [
                            v.defaultTopAxisOptions,
                            v.defaultRightAxisOptions,
                            v.defaultBottomAxisOptions,
                            v.defaultLeftAxisOptions,
                        ][this.side],
                        p(A[this.coll], c)
                    );
                    L(this, "afterSetOptions", { userOptions: c });
                };
                v.prototype.defaultLabelFormatter = function() {
                    var c = this.axis,
                        a = f(this.value) ? this.value : NaN,
                        e = c.chart.time,
                        b = c.categories,
                        p = this.dateTimeLabelFormat,
                        g = A.lang,
                        h = g.numericSymbols;
                    g = g.numericSymbolMagnitude || 1e3;
                    var E = h && h.length,
                        v = c.options.labels.format;
                    c = c.logarithmic ? Math.abs(a) : c.tickInterval;
                    var y = this.chart,
                        H = y.numberFormatter;
                    if (v) var m = q(v, this, y);
                    else if (b) m = "" + this.value;
                    else if (p) m = e.dateFormat(p, a);
                    else if (E && 1e3 <= c)
                        for (; E-- && "undefined" === typeof m;)
                            (e = Math.pow(g, E + 1)),
                            c >= e &&
                            0 === (10 * a) % e &&
                            null !== h[E] &&
                            0 !== a &&
                            (m = H(a / e, -1) + h[E]);
                    "undefined" === typeof m &&
                        (m = 1e4 <= Math.abs(a) ? H(a, -1) : H(a, -1, void 0, ""));
                    return m;
                };
                v.prototype.getSeriesExtremes = function() {
                    var c = this,
                        a = c.chart,
                        e;
                    L(this, "getSeriesExtremes", null, function() {
                        c.hasVisibleSeries = !1;
                        c.dataMin = c.dataMax = c.threshold = null;
                        c.softThreshold = !c.isXAxis;
                        c.stacking && c.stacking.buildStacks();
                        c.series.forEach(function(l) {
                            if (l.visible || !a.options.chart.ignoreHiddenSeries) {
                                var x = l.options,
                                    b = x.threshold;
                                c.hasVisibleSeries = !0;
                                c.positiveValuesOnly && 0 >= b && (b = null);
                                if (c.isXAxis) {
                                    if (((x = l.xData), x.length)) {
                                        x = c.logarithmic ? x.filter(c.validatePositiveValue) : x;
                                        e = l.getXExtremes(x);
                                        var p = e.min;
                                        var g = e.max;
                                        f(p) ||
                                            p instanceof Date ||
                                            ((x = x.filter(f)),
                                                (e = l.getXExtremes(x)),
                                                (p = e.min),
                                                (g = e.max));
                                        x.length &&
                                            ((c.dataMin = Math.min(H(c.dataMin, p), p)),
                                                (c.dataMax = Math.max(H(c.dataMax, g), g)));
                                    }
                                } else if (
                                    ((l = l.applyExtremes()),
                                        f(l.dataMin) &&
                                        ((p = l.dataMin),
                                            (c.dataMin = Math.min(H(c.dataMin, p), p))),
                                        f(l.dataMax) &&
                                        ((g = l.dataMax),
                                            (c.dataMax = Math.max(H(c.dataMax, g), g))),
                                        F(b) && (c.threshold = b), !x.softThreshold || c.positiveValuesOnly)
                                )
                                    c.softThreshold = !1;
                            }
                        });
                    });
                    L(this, "afterGetSeriesExtremes");
                };
                v.prototype.translate = function(c, a, e, b, p, g) {
                    var l = this.linkedParent || this,
                        x = 1,
                        h = 0,
                        E = b ? l.oldTransA : l.transA;
                    b = b ? l.oldMin : l.min;
                    var A = l.minPixelPadding;
                    p =
                        (l.isOrdinal ||
                            (l.brokenAxis && l.brokenAxis.hasBreaks) ||
                            (l.logarithmic && p)) &&
                        l.lin2val;
                    E || (E = l.transA);
                    e && ((x *= -1), (h = l.len));
                    l.reversed && ((x *= -1), (h -= x * (l.sector || l.len)));
                    a
                        ?
                        ((c = (c * x + h - A) / E + b), p && (c = l.lin2val(c))) :
                        (p && (c = l.val2lin(c)),
                            (c = f(b) ?
                                x * (c - b) * E + h + x * A + (f(g) ? E * g : 0) :
                                void 0));
                    return c;
                };
                v.prototype.toPixels = function(c, a) {
                    return (
                        this.translate(c, !1, !this.horiz, null, !0) + (a ? 0 : this.pos)
                    );
                };
                v.prototype.toValue = function(c, a) {
                    return this.translate(
                        c - (a ? 0 : this.pos), !0, !this.horiz,
                        null, !0
                    );
                };
                v.prototype.getPlotLinePath = function(c) {
                    function a(c, a, l) {
                        if (("pass" !== y && c < a) || c > l)
                            y ? (c = O(c, a, l)) : (r = !0);
                        return c;
                    }
                    var e = this,
                        b = e.chart,
                        p = e.left,
                        g = e.top,
                        h = c.old,
                        E = c.value,
                        A = c.translatedValue,
                        v = c.lineWidth,
                        y = c.force,
                        m,
                        d,
                        C,
                        q,
                        K = (h && b.oldChartHeight) || b.chartHeight,
                        N = (h && b.oldChartWidth) || b.chartWidth,
                        r,
                        w = e.transB;
                    c = {
                        value: E,
                        lineWidth: v,
                        old: h,
                        force: y,
                        acrossPanes: c.acrossPanes,
                        translatedValue: A,
                    };
                    L(this, "getPlotLinePath", c, function(c) {
                        A = H(A, e.translate(E, null, null, h));
                        A = O(A, -1e5, 1e5);
                        m = C = Math.round(A + w);
                        d = q = Math.round(K - A - w);
                        f(A) ?
                            e.horiz ?
                            ((d = g), (q = K - e.bottom), (m = C = a(m, p, p + e.width))) :
                            ((m = p), (C = N - e.right), (d = q = a(d, g, g + e.height))) :
                            ((r = !0), (y = !1));
                        c.path =
                            r && !y ?
                            null :
                            b.renderer.crispLine(
                                [
                                    ["M", m, d],
                                    ["L", C, q],
                                ],
                                v || 1
                            );
                    });
                    return c.path;
                };
                v.prototype.getLinearTickPositions = function(c, a, e) {
                    var l = u(Math.floor(a / c) * c);
                    e = u(Math.ceil(e / c) * c);
                    var f = [],
                        x;
                    u(l + c) === l && (x = 20);
                    if (this.single) return [a];
                    for (a = l; a <= e;) {
                        f.push(a);
                        a = u(a + c, x);
                        if (a === b) break;
                        var b = a;
                    }
                    return f;
                };
                v.prototype.getMinorTickInterval = function() {
                    var c = this.options;
                    return !0 === c.minorTicks ?
                        H(c.minorTickInterval, "auto") :
                        !1 === c.minorTicks ?
                        null :
                        c.minorTickInterval;
                };
                v.prototype.getMinorTickPositions = function() {
                    var c = this.options,
                        a = this.tickPositions,
                        e = this.minorTickInterval,
                        f = [],
                        b = this.pointRangePadding || 0,
                        p = this.min - b;
                    b = this.max + b;
                    var g = b - p;
                    if (g && g / e < this.len / 3) {
                        var h = this.logarithmic;
                        if (h)
                            this.paddedTicks.forEach(function(c, a, l) {
                                a &&
                                    f.push.apply(f, h.getLogTickPositions(e, l[a - 1], l[a], !0));
                            });
                        else if (this.dateTime && "auto" === this.getMinorTickInterval())
                            f = f.concat(
                                this.getTimeTicks(
                                    this.dateTime.normalizeTimeTickInterval(e),
                                    p,
                                    b,
                                    c.startOfWeek
                                )
                            );
                        else
                            for (c = p + ((a[0] - p) % e); c <= b && c !== f[0]; c += e)
                                f.push(c);
                    }
                    0 !== f.length && this.trimTicks(f);
                    return f;
                };
                v.prototype.adjustForMinRange = function() {
                    var c = this.options,
                        a = this.min,
                        e = this.max,
                        f = this.logarithmic,
                        b,
                        p,
                        g,
                        h,
                        E;
                    this.isXAxis &&
                        "undefined" === typeof this.minRange &&
                        !f &&
                        (F(c.min) || F(c.max) ?
                            (this.minRange = null) :
                            (this.series.forEach(function(c) {
                                    h = c.xData;
                                    for (p = E = c.xIncrement ? 1 : h.length - 1; 0 < p; p--)
                                        if (
                                            ((g = h[p] - h[p - 1]), "undefined" === typeof b || g < b)
                                        )
                                            b = g;
                                }),
                                (this.minRange = Math.min(
                                    5 * b,
                                    this.dataMax - this.dataMin
                                ))));
                    if (e - a < this.minRange) {
                        var A = this.dataMax - this.dataMin >= this.minRange;
                        var y = this.minRange;
                        var v = (y - e + a) / 2;
                        v = [a - v, H(c.min, a - v)];
                        A &&
                            (v[2] = this.logarithmic ?
                                this.logarithmic.log2lin(this.dataMin) :
                                this.dataMin);
                        a = G(v);
                        e = [a + y, H(c.max, a + y)];
                        A && (e[2] = f ? f.log2lin(this.dataMax) : this.dataMax);
                        e = d(e);
                        e - a < y && ((v[0] = e - y), (v[1] = H(c.min, e - y)), (a = G(v)));
                    }
                    this.min = a;
                    this.max = e;
                };
                v.prototype.getClosest = function() {
                    var c;
                    this.categories ?
                        (c = 1) :
                        this.series.forEach(function(a) {
                            var l = a.closestPointRange,
                                e = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                            !a.noSharedTooltip &&
                                F(l) &&
                                e &&
                                (c = F(c) ? Math.min(c, l) : l);
                        });
                    return c;
                };
                v.prototype.nameToX = function(c) {
                    var a = b(this.categories),
                        e = a ? this.categories : this.names,
                        f = c.options.x;
                    c.series.requireSorting = !1;
                    F(f) ||
                        (f = !1 === this.options.uniqueNames ?
                            c.series.autoIncrement() :
                            a ?
                            e.indexOf(c.name) :
                            H(e.keys[c.name], -1));
                    if (-1 === f) {
                        if (!a) var p = e.length;
                    } else p = f;
                    "undefined" !== typeof p &&
                        ((this.names[p] = c.name), (this.names.keys[c.name] = p));
                    return p;
                };
                v.prototype.updateNames = function() {
                    var c = this,
                        a = this.names;
                    0 < a.length &&
                        (Object.keys(a.keys).forEach(function(c) {
                                delete a.keys[c];
                            }),
                            (a.length = 0),
                            (this.minRange = this.userMinRange),
                            (this.series || []).forEach(function(a) {
                                a.xIncrement = null;
                                if (!a.points || a.isDirtyData)
                                    (c.max = Math.max(c.max, a.xData.length - 1)),
                                    a.processData(),
                                    a.generatePoints();
                                a.data.forEach(function(l, e) {
                                    if (l && l.options && "undefined" !== typeof l.name) {
                                        var f = c.nameToX(l);
                                        "undefined" !== typeof f &&
                                            f !== l.x &&
                                            ((l.x = f), (a.xData[e] = f));
                                    }
                                });
                            }));
                };
                v.prototype.setAxisTranslation = function(c) {
                    var l = this,
                        e = l.max - l.min,
                        f = l.axisPointRange || 0,
                        b = 0,
                        p = 0,
                        g = l.linkedParent,
                        h = !!l.categories,
                        E = l.transA,
                        A = l.isXAxis;
                    if (A || h || f) {
                        var v = l.getClosest();
                        g
                            ?
                            ((b = g.minPointOffset), (p = g.pointRangePadding)) :
                            l.series.forEach(function(c) {
                                var e = h ?
                                    1 :
                                    A ?
                                    H(c.options.pointRange, v, 0) :
                                    l.axisPointRange || 0,
                                    x = c.options.pointPlacement;
                                f = Math.max(f, e);
                                if (!l.single || h)
                                    (c = c.is("xrange") ? !A : A),
                                    (b = Math.max(b, c && a(x) ? 0 : e / 2)),
                                    (p = Math.max(p, c && "on" === x ? 0 : e));
                            });
                        g = l.ordinal && l.ordinal.slope && v ? l.ordinal.slope / v : 1;
                        l.minPointOffset = b *= g;
                        l.pointRangePadding = p *= g;
                        l.pointRange = Math.min(f, l.single && h ? 1 : e);
                        A && (l.closestPointRange = v);
                    }
                    c && (l.oldTransA = E);
                    l.translationSlope = l.transA = E =
                        l.staticScale || l.len / (e + p || 1);
                    l.transB = l.horiz ? l.left : l.bottom;
                    l.minPixelPadding = E * b;
                    L(this, "afterSetAxisTranslation");
                };
                v.prototype.minFromRange = function() {
                    return this.max - this.range;
                };
                v.prototype.setTickInterval = function(c) {
                    var a = this,
                        b = a.chart,
                        p = a.logarithmic,
                        g = a.options,
                        E = a.isXAxis,
                        A = a.isLinked,
                        v = g.maxPadding,
                        y = g.minPadding,
                        m = g.tickInterval,
                        d = g.tickPixelInterval,
                        C = a.categories,
                        q = f(a.threshold) ? a.threshold : null,
                        K = a.softThreshold;
                    a.dateTime || C || A || this.getTickAmount();
                    var N = H(a.userMin, g.min);
                    var w = H(a.userMax, g.max);
                    if (A) {
                        a.linkedParent = b[a.coll][g.linkedTo];
                        var P = a.linkedParent.getExtremes();
                        a.min = H(P.min, P.dataMin);
                        a.max = H(P.max, P.dataMax);
                        g.type !== a.linkedParent.options.type && r(11, 1, b);
                    } else {
                        if (K && F(q))
                            if (a.dataMin >= q)(P = q), (y = 0);
                            else if (a.dataMax <= q) {
                            var n = q;
                            v = 0;
                        }
                        a.min = H(N, P, a.dataMin);
                        a.max = H(w, n, a.dataMax);
                    }
                    p &&
                        (a.positiveValuesOnly &&
                            !c &&
                            0 >= Math.min(a.min, H(a.dataMin, a.min)) &&
                            r(10, 1, b),
                            (a.min = u(p.log2lin(a.min), 16)),
                            (a.max = u(p.log2lin(a.max), 16)));
                    a.range &&
                        F(a.max) &&
                        ((a.userMin = a.min = N = Math.max(a.dataMin, a.minFromRange())),
                            (a.userMax = w = a.max),
                            (a.range = null));
                    L(a, "foundExtremes");
                    a.beforePadding && a.beforePadding();
                    a.adjustForMinRange();
                    !(
                        C ||
                        a.axisPointRange ||
                        (a.stacking && a.stacking.usePercentage) ||
                        A
                    ) &&
                    F(a.min) &&
                        F(a.max) &&
                        (b = a.max - a.min) &&
                        (!F(N) && y && (a.min -= b * y), !F(w) && v && (a.max += b * v));
                    f(a.userMin) ||
                        (f(g.softMin) && g.softMin < a.min && (a.min = N = g.softMin),
                            f(g.floor) && (a.min = Math.max(a.min, g.floor)));
                    f(a.userMax) ||
                        (f(g.softMax) && g.softMax > a.max && (a.max = w = g.softMax),
                            f(g.ceiling) && (a.max = Math.min(a.max, g.ceiling)));
                    K &&
                        F(a.dataMin) &&
                        ((q = q || 0), !F(N) && a.min < q && a.dataMin >= q ?
                            (a.min = a.options.minRange ?
                                Math.min(q, a.max - a.minRange) :
                                q) :
                            !F(w) &&
                            a.max > q &&
                            a.dataMax <= q &&
                            (a.max = a.options.minRange ?
                                Math.max(q, a.min + a.minRange) :
                                q));
                    a.tickInterval =
                        a.min === a.max ||
                        "undefined" === typeof a.min ||
                        "undefined" === typeof a.max ?
                        1 :
                        A && !m && d === a.linkedParent.options.tickPixelInterval ?
                        (m = a.linkedParent.tickInterval) :
                        H(
                            m,
                            this.tickAmount ?
                            (a.max - a.min) / Math.max(this.tickAmount - 1, 1) :
                            void 0,
                            C ? 1 : ((a.max - a.min) * d) / Math.max(a.len, d)
                        );
                    E &&
                        !c &&
                        a.series.forEach(function(c) {
                            c.processData(a.min !== a.oldMin || a.max !== a.oldMax);
                        });
                    a.setAxisTranslation(!0);
                    L(this, "initialAxisTranslation");
                    a.pointRange &&
                        !m &&
                        (a.tickInterval = Math.max(a.pointRange, a.tickInterval));
                    c = H(
                        g.minTickInterval,
                        a.dateTime &&
                        !a.series.some(function(c) {
                            return c.noSharedTooltip;
                        }) ?
                        a.closestPointRange :
                        0
                    );
                    !m && a.tickInterval < c && (a.tickInterval = c);
                    a.dateTime ||
                        a.logarithmic ||
                        m ||
                        (a.tickInterval = e(
                            a.tickInterval,
                            void 0,
                            h(a.tickInterval),
                            H(
                                g.allowDecimals,
                                0.5 > a.tickInterval || void 0 !== this.tickAmount
                            ), !!this.tickAmount
                        ));
                    this.tickAmount || (a.tickInterval = a.unsquish());
                    this.setTickPositions();
                };
                v.prototype.setTickPositions = function() {
                    var c = this.options,
                        a = c.tickPositions;
                    var e = this.getMinorTickInterval();
                    var f = c.tickPositioner,
                        b = this.hasVerticalPanning(),
                        p = "colorAxis" === this.coll,
                        g = (p || !b) && c.startOnTick;
                    b = (p || !b) && c.endOnTick;
                    this.tickmarkOffset =
                        this.categories &&
                        "between" === c.tickmarkPlacement &&
                        1 === this.tickInterval ?
                        0.5 :
                        0;
                    this.minorTickInterval =
                        "auto" === e && this.tickInterval ? this.tickInterval / 5 : e;
                    this.single =
                        this.min === this.max &&
                        F(this.min) &&
                        !this.tickAmount &&
                        (parseInt(this.min, 10) === this.min || !1 !== c.allowDecimals);
                    this.tickPositions = e = a && a.slice();
                    !e &&
                        ((this.ordinal && this.ordinal.positions) ||
                            !(
                                (this.max - this.min) / this.tickInterval >
                                Math.max(2 * this.len, 200)
                            ) ?
                            (e = this.dateTime ?
                                this.getTimeTicks(
                                    this.dateTime.normalizeTimeTickInterval(
                                        this.tickInterval,
                                        c.units
                                    ),
                                    this.min,
                                    this.max,
                                    c.startOfWeek,
                                    this.ordinal && this.ordinal.positions,
                                    this.closestPointRange, !0
                                ) :
                                this.logarithmic ?
                                this.logarithmic.getLogTickPositions(
                                    this.tickInterval,
                                    this.min,
                                    this.max
                                ) :
                                this.getLinearTickPositions(
                                    this.tickInterval,
                                    this.min,
                                    this.max
                                )) :
                            ((e = [this.min, this.max]), r(19, !1, this.chart)),
                            e.length > this.len &&
                            ((e = [e[0], e.pop()]), e[0] === e[1] && (e.length = 1)),
                            (this.tickPositions = e),
                            f && (f = f.apply(this, [this.min, this.max]))) &&
                        (this.tickPositions = e = f);
                    this.paddedTicks = e.slice(0);
                    this.trimTicks(e, g, b);
                    this.isLinked ||
                        (this.single &&
                            2 > e.length &&
                            !this.categories &&
                            !this.series.some(function(c) {
                                return (
                                    c.is("heatmap") && "between" === c.options.pointPlacement
                                );
                            }) &&
                            ((this.min -= 0.5), (this.max += 0.5)),
                            a || f || this.adjustTickAmount());
                    L(this, "afterSetTickPositions");
                };
                v.prototype.trimTicks = function(c, a, e) {
                    var l = c[0],
                        f = c[c.length - 1],
                        b = (!this.isOrdinal && this.minPointOffset) || 0;
                    L(this, "trimTicks");
                    if (!this.isLinked) {
                        if (a && -Infinity !== l) this.min = l;
                        else
                            for (; this.min - b > c[0];) c.shift();
                        if (e) this.max = f;
                        else
                            for (; this.max + b < c[c.length - 1];) c.pop();
                        0 === c.length &&
                            F(l) &&
                            !this.options.tickPositions &&
                            c.push((f + l) / 2);
                    }
                };
                v.prototype.alignToOthers = function() {
                    var c = {},
                        a,
                        e = this.options;
                    !1 === this.chart.options.chart.alignTicks ||
                        !1 === e.alignTicks ||
                        !1 === e.startOnTick ||
                        !1 === e.endOnTick ||
                        this.logarithmic ||
                        this.chart[this.coll].forEach(function(e) {
                            var l = e.options;
                            l = [e.horiz ? l.left : l.top, l.width, l.height, l.pane].join();
                            e.series.length && (c[l] ? (a = !0) : (c[l] = 1));
                        });
                    return a;
                };
                v.prototype.getTickAmount = function() {
                    var c = this.options,
                        a = c.tickAmount,
                        e = c.tickPixelInterval;
                    !F(c.tickInterval) &&
                        !a &&
                        this.len < e &&
                        !this.isRadial &&
                        !this.logarithmic &&
                        c.startOnTick &&
                        c.endOnTick &&
                        (a = 2);
                    !a && this.alignToOthers() && (a = Math.ceil(this.len / e) + 1);
                    4 > a && ((this.finalTickAmt = a), (a = 5));
                    this.tickAmount = a;
                };
                v.prototype.adjustTickAmount = function() {
                    var c = this.options,
                        a = this.tickInterval,
                        e = this.tickPositions,
                        f = this.tickAmount,
                        b = this.finalTickAmt,
                        p = e && e.length,
                        g = H(this.threshold, this.softThreshold ? 0 : null),
                        h;
                    if (this.hasData()) {
                        if (p < f) {
                            for (h = this.min; e.length < f;)
                                e.length % 2 || h === g ?
                                e.push(u(e[e.length - 1] + a)) :
                                e.unshift(u(e[0] - a));
                            this.transA *= (p - 1) / (f - 1);
                            this.min = c.startOnTick ? e[0] : Math.min(this.min, e[0]);
                            this.max = c.endOnTick ?
                                e[e.length - 1] :
                                Math.max(this.max, e[e.length - 1]);
                        } else p > f && ((this.tickInterval *= 2), this.setTickPositions());
                        if (F(b)) {
                            for (a = c = e.length; a--;)
                                ((3 === b && 1 === a % 2) || (2 >= b && 0 < a && a < c - 1)) &&
                                e.splice(a, 1);
                            this.finalTickAmt = void 0;
                        }
                    }
                };
                v.prototype.setScale = function() {
                    var c,
                        a = !1,
                        e = !1;
                    this.series.forEach(function(c) {
                        var l;
                        a = a || c.isDirtyData || c.isDirty;
                        e =
                            e ||
                            (null === (l = c.xAxis) || void 0 === l ? void 0 : l.isDirty) ||
                            !1;
                    });
                    this.oldMin = this.min;
                    this.oldMax = this.max;
                    this.oldAxisLength = this.len;
                    this.setAxisSize();
                    (c = this.len !== this.oldAxisLength) ||
                    a ||
                        e ||
                        this.isLinked ||
                        this.forceRedraw ||
                        this.userMin !== this.oldUserMin ||
                        this.userMax !== this.oldUserMax ||
                        this.alignToOthers() ?
                        (this.stacking && this.stacking.resetStacks(),
                            (this.forceRedraw = !1),
                            this.getSeriesExtremes(),
                            this.setTickInterval(),
                            (this.oldUserMin = this.userMin),
                            (this.oldUserMax = this.userMax),
                            this.isDirty ||
                            (this.isDirty =
                                c || this.min !== this.oldMin || this.max !== this.oldMax)) :
                        this.stacking && this.stacking.cleanStacks();
                    a && this.panningState && (this.panningState.isDirty = !0);
                    L(this, "afterSetScale");
                };
                v.prototype.setExtremes = function(c, a, e, f, b) {
                    var l = this,
                        p = l.chart;
                    e = H(e, !0);
                    l.series.forEach(function(c) {
                        delete c.kdTree;
                    });
                    b = m(b, { min: c, max: a });
                    L(l, "setExtremes", b, function() {
                        l.userMin = c;
                        l.userMax = a;
                        l.eventArgs = b;
                        e && p.redraw(f);
                    });
                };
                v.prototype.zoom = function(c, a) {
                    var e = this,
                        l = this.dataMin,
                        f = this.dataMax,
                        b = this.options,
                        p = Math.min(l, H(b.min, l)),
                        g = Math.max(f, H(b.max, f));
                    c = { newMin: c, newMax: a };
                    L(this, "zoom", c, function(c) {
                        var a = c.newMin,
                            b = c.newMax;
                        if (a !== e.min || b !== e.max)
                            e.allowZoomOutside ||
                            (F(l) && (a < p && (a = p), a > g && (a = g)),
                                F(f) && (b < p && (b = p), b > g && (b = g))),
                            (e.displayBtn =
                                "undefined" !== typeof a || "undefined" !== typeof b),
                            e.setExtremes(a, b, !1, void 0, { trigger: "zoom" });
                        c.zoomed = !0;
                    });
                    return c.zoomed;
                };
                v.prototype.setAxisSize = function() {
                    var c = this.chart,
                        a = this.options,
                        e = a.offsets || [0, 0, 0, 0],
                        f = this.horiz,
                        b = (this.width = Math.round(
                            y(H(a.width, c.plotWidth - e[3] + e[1]), c.plotWidth)
                        )),
                        p = (this.height = Math.round(
                            y(H(a.height, c.plotHeight - e[0] + e[2]), c.plotHeight)
                        )),
                        g = (this.top = Math.round(
                            y(H(a.top, c.plotTop + e[0]), c.plotHeight, c.plotTop)
                        ));
                    a = this.left = Math.round(
                        y(H(a.left, c.plotLeft + e[3]), c.plotWidth, c.plotLeft)
                    );
                    this.bottom = c.chartHeight - p - g;
                    this.right = c.chartWidth - b - a;
                    this.len = Math.max(f ? b : p, 0);
                    this.pos = f ? a : g;
                };
                v.prototype.getExtremes = function() {
                    var c = this.logarithmic;
                    return {
                        min: c ? u(c.lin2log(this.min)) : this.min,
                        max: c ? u(c.lin2log(this.max)) : this.max,
                        dataMin: this.dataMin,
                        dataMax: this.dataMax,
                        userMin: this.userMin,
                        userMax: this.userMax,
                    };
                };
                v.prototype.getThreshold = function(c) {
                    var a = this.logarithmic,
                        e = a ? a.lin2log(this.min) : this.min;
                    a = a ? a.lin2log(this.max) : this.max;
                    null === c || -Infinity === c ?
                        (c = e) :
                        Infinity === c ?
                        (c = a) :
                        e > c ?
                        (c = e) :
                        a < c && (c = a);
                    return this.translate(c, 0, 1, 0, 1);
                };
                v.prototype.autoLabelAlign = function(c) {
                    var a = (H(c, 0) - 90 * this.side + 720) % 360;
                    c = { align: "center" };
                    L(this, "autoLabelAlign", c, function(c) {
                        15 < a && 165 > a ?
                            (c.align = "right") :
                            195 < a && 345 > a && (c.align = "left");
                    });
                    return c.align;
                };
                v.prototype.tickSize = function(c) {
                    var a = this.options,
                        e = a["tick" === c ? "tickLength" : "minorTickLength"],
                        f = H(
                            a["tick" === c ? "tickWidth" : "minorTickWidth"],
                            "tick" === c && this.isXAxis && !this.categories ? 1 : 0
                        );
                    if (f && e) {
                        "inside" === a[c + "Position"] && (e = -e);
                        var b = [e, f];
                    }
                    c = { tickSize: b };
                    L(this, "afterTickSize", c);
                    return c.tickSize;
                };
                v.prototype.labelMetrics = function() {
                    var c = (this.tickPositions && this.tickPositions[0]) || 0;
                    return this.chart.renderer.fontMetrics(
                        this.options.labels.style && this.options.labels.style.fontSize,
                        this.ticks[c] && this.ticks[c].label
                    );
                };
                v.prototype.unsquish = function() {
                    var c = this.options.labels,
                        a = this.horiz,
                        e = this.tickInterval,
                        f = e,
                        b =
                        this.len /
                        (((this.categories ? 1 : 0) + this.max - this.min) / e),
                        p,
                        g = c.rotation,
                        h = this.labelMetrics(),
                        E,
                        A = Number.MAX_VALUE,
                        v,
                        y = this.max - this.min,
                        m = function(c) {
                            var a = c / (b || 1);
                            a = 1 < a ? Math.ceil(a) : 1;
                            a * e > y &&
                                Infinity !== c &&
                                Infinity !== b &&
                                y &&
                                (a = Math.ceil(y / e));
                            return u(a * e);
                        };
                    a
                        ?
                        (v = !c.staggerLines &&
                            !c.step &&
                            (F(g) ?
                                [g] :
                                b < H(c.autoRotationLimit, 80) && c.autoRotation)) &&
                        v.forEach(function(c) {
                            if (c === g || (c && -90 <= c && 90 >= c)) {
                                E = m(Math.abs(h.h / Math.sin(C * c)));
                                var a = E + Math.abs(c / 360);
                                a < A && ((A = a), (p = c), (f = E));
                            }
                        }) :
                        c.step || (f = m(h.h));
                    this.autoRotation = v;
                    this.labelRotation = H(p, g);
                    return f;
                };
                v.prototype.getSlotWidth = function(c) {
                    var a,
                        e = this.chart,
                        b = this.horiz,
                        p = this.options.labels,
                        g = Math.max(
                            this.tickPositions.length - (this.categories ? 0 : 1),
                            1
                        ),
                        h = e.margin[3];
                    if (c && f(c.slotWidth)) return c.slotWidth;
                    if (b && p && 2 > (p.step || 0))
                        return p.rotation ? 0 : ((this.staggerLines || 1) * this.len) / g;
                    if (!b) {
                        c =
                            null === (a = null === p || void 0 === p ? void 0 : p.style) ||
                            void 0 === a ?
                            void 0 :
                            a.width;
                        if (void 0 !== c) return parseInt(c, 10);
                        if (h) return h - e.spacing[3];
                    }
                    return 0.33 * e.chartWidth;
                };
                v.prototype.renderUnsquish = function() {
                    var c = this.chart,
                        e = c.renderer,
                        f = this.tickPositions,
                        b = this.ticks,
                        p = this.options.labels,
                        g = (p && p.style) || {},
                        h = this.horiz,
                        E = this.getSlotWidth(),
                        A = Math.max(1, Math.round(E - 2 * (p.padding || 5))),
                        v = {},
                        y = this.labelMetrics(),
                        H = p.style && p.style.textOverflow,
                        m = 0;
                    a(p.rotation) || (v.rotation = p.rotation || 0);
                    f.forEach(function(c) {
                        c = b[c];
                        c.movedLabel && c.replaceMovedLabel();
                        c &&
                            c.label &&
                            c.label.textPxLength > m &&
                            (m = c.label.textPxLength);
                    });
                    this.maxLabelLength = m;
                    if (this.autoRotation)
                        m > A && m > y.h ?
                        (v.rotation = this.labelRotation) :
                        (this.labelRotation = 0);
                    else if (E) {
                        var d = A;
                        if (!H) {
                            var C = "clip";
                            for (A = f.length; !h && A--;) {
                                var q = f[A];
                                if ((q = b[q].label))
                                    q.styles && "ellipsis" === q.styles.textOverflow ?
                                    q.css({ textOverflow: "clip" }) :
                                    q.textPxLength > E && q.css({ width: E + "px" }),
                                    q.getBBox().height > this.len / f.length - (y.h - y.f) &&
                                    (q.specificTextOverflow = "ellipsis");
                            }
                        }
                    }
                    v.rotation &&
                        ((d = m > 0.5 * c.chartHeight ? 0.33 * c.chartHeight : m),
                            H || (C = "ellipsis"));
                    if (
                        (this.labelAlign =
                            p.align || this.autoLabelAlign(this.labelRotation))
                    )
                        v.align = this.labelAlign;
                    f.forEach(function(c) {
                        var a = (c = b[c]) && c.label,
                            e = g.width,
                            l = {};
                        a &&
                            (a.attr(v),
                                c.shortenLabel ?
                                c.shortenLabel() :
                                d &&
                                !e &&
                                "nowrap" !== g.whiteSpace &&
                                (d < a.textPxLength || "SPAN" === a.element.tagName) ?
                                ((l.width = d + "px"),
                                    H || (l.textOverflow = a.specificTextOverflow || C),
                                    a.css(l)) :
                                a.styles &&
                                a.styles.width &&
                                !l.width &&
                                !e &&
                                a.css({ width: null }),
                                delete a.specificTextOverflow,
                                (c.rotation = v.rotation));
                    }, this);
                    this.tickRotCorr = e.rotCorr(
                        y.b,
                        this.labelRotation || 0,
                        0 !== this.side
                    );
                };
                v.prototype.hasData = function() {
                    return (
                        this.series.some(function(c) {
                            return c.hasData();
                        }) ||
                        (this.options.showEmpty && F(this.min) && F(this.max))
                    );
                };
                v.prototype.addTitle = function(c) {
                    var a = this.chart.renderer,
                        e = this.horiz,
                        f = this.opposite,
                        b = this.options.title,
                        g,
                        h = this.chart.styledMode;
                    this.axisTitle ||
                        ((g = b.textAlign) ||
                            (g = (e ?
                                { low: "left", middle: "center", high: "right" } :
                                {
                                    low: f ? "right" : "left",
                                    middle: "center",
                                    high: f ? "left" : "right",
                                })[b.align]),
                            (this.axisTitle = a
                                .text(b.text, 0, 0, b.useHTML)
                                .attr({ zIndex: 7, rotation: b.rotation || 0, align: g })
                                .addClass("highcharts-axis-title")),
                            h || this.axisTitle.css(p(b.style)),
                            this.axisTitle.add(this.axisGroup),
                            (this.axisTitle.isNew = !0));
                    h ||
                        b.style.width ||
                        this.isRadial ||
                        this.axisTitle.css({ width: this.len + "px" });
                    this.axisTitle[c ? "show" : "hide"](c);
                };
                v.prototype.generateTick = function(c) {
                    var a = this.ticks;
                    a[c] ? a[c].addLabel() : (a[c] = new D(this, c));
                };
                v.prototype.getOffset = function() {
                    var c = this,
                        a = c.chart,
                        e = a.renderer,
                        f = c.options,
                        b = c.tickPositions,
                        p = c.ticks,
                        g = c.horiz,
                        h = c.side,
                        A = a.inverted && !c.isZAxis ? [1, 0, 3, 2][h] : h,
                        v,
                        y = 0,
                        m = 0,
                        d = f.title,
                        C = f.labels,
                        q = 0,
                        K = a.axisOffset;
                    a = a.clipOffset;
                    var N = [-1, 1, 1, -1][h],
                        r = f.className,
                        w = c.axisParent;
                    var P = c.hasData();
                    c.showAxis = v = P || H(f.showEmpty, !0);
                    c.staggerLines = c.horiz && C.staggerLines;
                    c.axisGroup ||
                        ((c.gridGroup = e
                                .g("grid")
                                .attr({ zIndex: f.gridZIndex || 1 })
                                .addClass(
                                    "highcharts-" + this.coll.toLowerCase() + "-grid " + (r || "")
                                )
                                .add(w)),
                            (c.axisGroup = e
                                .g("axis")
                                .attr({ zIndex: f.zIndex || 2 })
                                .addClass(
                                    "highcharts-" + this.coll.toLowerCase() + " " + (r || "")
                                )
                                .add(w)),
                            (c.labelGroup = e
                                .g("axis-labels")
                                .attr({ zIndex: C.zIndex || 7 })
                                .addClass(
                                    "highcharts-" + c.coll.toLowerCase() + "-labels " + (r || "")
                                )
                                .add(w)));
                    P || c.isLinked ?
                        (b.forEach(function(a, e) {
                                c.generateTick(a, e);
                            }),
                            c.renderUnsquish(),
                            (c.reserveSpaceDefault =
                                0 === h ||
                                2 === h || { 1: "left", 3: "right" }[h] === c.labelAlign),
                            H(
                                C.reserveSpace,
                                "center" === c.labelAlign ? !0 : null,
                                c.reserveSpaceDefault
                            ) &&
                            b.forEach(function(c) {
                                q = Math.max(p[c].getLabelSize(), q);
                            }),
                            c.staggerLines && (q *= c.staggerLines),
                            (c.labelOffset = q * (c.opposite ? -1 : 1))) :
                        E(p, function(c, a) {
                            c.destroy();
                            delete p[a];
                        });
                    if (
                        d &&
                        d.text &&
                        !1 !== d.enabled &&
                        (c.addTitle(v), v && !1 !== d.reserveSpace)
                    ) {
                        c.titleOffset = y = c.axisTitle.getBBox()[g ? "height" : "width"];
                        var u = d.offset;
                        m = F(u) ? 0 : H(d.margin, g ? 5 : 10);
                    }
                    c.renderLine();
                    c.offset = N * H(f.offset, K[h] ? K[h] + (f.margin || 0) : 0);
                    c.tickRotCorr = c.tickRotCorr || { x: 0, y: 0 };
                    e = 0 === h ? -c.labelMetrics().h : 2 === h ? c.tickRotCorr.y : 0;
                    m = Math.abs(q) + m;
                    q && (m = m - e + N * (g ? H(C.y, c.tickRotCorr.y + 8 * N) : C.x));
                    c.axisTitleMargin = H(u, m);
                    c.getMaxLabelDimensions &&
                        (c.maxLabelDimensions = c.getMaxLabelDimensions(p, b));
                    g = this.tickSize("tick");
                    K[h] = Math.max(
                        K[h],
                        c.axisTitleMargin + y + N * c.offset,
                        m,
                        b && b.length && g ? g[0] + N * c.offset : 0
                    );
                    f = f.offset ? 0 : 2 * Math.floor(c.axisLine.strokeWidth() / 2);
                    a[A] = Math.max(a[A], f);
                    L(this, "afterGetOffset");
                };
                v.prototype.getLinePath = function(c) {
                    var a = this.chart,
                        e = this.opposite,
                        f = this.offset,
                        b = this.horiz,
                        p = this.left + (e ? this.width : 0) + f;
                    f = a.chartHeight - this.bottom - (e ? this.height : 0) + f;
                    e && (c *= -1);
                    return a.renderer.crispLine(
                        [
                            ["M", b ? this.left : p, b ? f : this.top],
                            [
                                "L",
                                b ? a.chartWidth - this.right : p,
                                b ? f : a.chartHeight - this.bottom,
                            ],
                        ],
                        c
                    );
                };
                v.prototype.renderLine = function() {
                    this.axisLine ||
                        ((this.axisLine = this.chart.renderer
                                .path()
                                .addClass("highcharts-axis-line")
                                .add(this.axisGroup)),
                            this.chart.styledMode ||
                            this.axisLine.attr({
                                stroke: this.options.lineColor,
                                "stroke-width": this.options.lineWidth,
                                zIndex: 7,
                            }));
                };
                v.prototype.getTitlePosition = function() {
                    var c = this.horiz,
                        a = this.left,
                        e = this.top,
                        f = this.len,
                        b = this.options.title,
                        p = c ? a : e,
                        g = this.opposite,
                        h = this.offset,
                        E = b.x || 0,
                        A = b.y || 0,
                        v = this.axisTitle,
                        y = this.chart.renderer.fontMetrics(b.style && b.style.fontSize, v);
                    v = Math.max(v.getBBox(null, 0).height - y.h - 1, 0);
                    f = {
                        low: p + (c ? 0 : f),
                        middle: p + f / 2,
                        high: p + (c ? f : 0),
                    }[b.align];
                    a =
                        (c ? e + this.height : a) +
                        (c ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + [-v, v, y.f, -v][this.side];
                    c = {
                        x: c ? f + E : a + (g ? this.width : 0) + h + E,
                        y: c ? a + A - (g ? this.height : 0) + h : f + A,
                    };
                    L(this, "afterGetTitlePosition", { titlePosition: c });
                    return c;
                };
                v.prototype.renderMinorTick = function(c) {
                    var a = this.chart.hasRendered && f(this.oldMin),
                        e = this.minorTicks;
                    e[c] || (e[c] = new D(this, c, "minor"));
                    a && e[c].isNew && e[c].render(null, !0);
                    e[c].render(null, !1, 1);
                };
                v.prototype.renderTick = function(c, a) {
                    var e,
                        l = this.isLinked,
                        b = this.ticks,
                        p = this.chart.hasRendered && f(this.oldMin);
                    if (!l ||
                        (c >= this.min && c <= this.max) ||
                        (null === (e = this.grid) || void 0 === e ? 0 : e.isColumn)
                    )
                        b[c] || (b[c] = new D(this, c)),
                        p && b[c].isNew && b[c].render(a, !0, -1),
                        b[c].render(a);
                };
                v.prototype.render = function() {
                    var c = this,
                        a = c.chart,
                        e = c.logarithmic,
                        b = c.options,
                        p = c.isLinked,
                        g = c.tickPositions,
                        h = c.axisTitle,
                        A = c.ticks,
                        v = c.minorTicks,
                        y = c.alternateBands,
                        m = b.stackLabels,
                        H = b.alternateGridColor,
                        d = c.tickmarkOffset,
                        C = c.axisLine,
                        q = c.showAxis,
                        N = n(a.renderer.globalAnimation),
                        r,
                        w;
                    c.labelEdge.length = 0;
                    c.overlap = !1;
                    [A, v, y].forEach(function(c) {
                        E(c, function(c) {
                            c.isActive = !1;
                        });
                    });
                    if (c.hasData() || p)
                        c.minorTickInterval &&
                        !c.categories &&
                        c.getMinorTickPositions().forEach(function(a) {
                            c.renderMinorTick(a);
                        }),
                        g.length &&
                        (g.forEach(function(a, e) {
                                c.renderTick(a, e);
                            }),
                            d &&
                            (0 === c.min || c.single) &&
                            (A[-1] || (A[-1] = new D(c, -1, null, !0)),
                                A[-1].render(-1))),
                        H &&
                        g.forEach(function(l, f) {
                            w =
                                "undefined" !== typeof g[f + 1] ? g[f + 1] + d : c.max - d;
                            0 === f % 2 &&
                                l < c.max &&
                                w <= c.max + (a.polar ? -d : d) &&
                                (y[l] || (y[l] = new I.PlotLineOrBand(c)),
                                    (r = l + d),
                                    (y[l].options = {
                                        from: e ? e.lin2log(r) : r,
                                        to: e ? e.lin2log(w) : w,
                                        color: H,
                                        className: "highcharts-alternate-grid",
                                    }),
                                    y[l].render(),
                                    (y[l].isActive = !0));
                        }),
                        c._addedPlotLB ||
                        ((b.plotLines || [])
                            .concat(b.plotBands || [])
                            .forEach(function(a) {
                                c.addPlotBandOrLine(a);
                            }),
                            (c._addedPlotLB = !0));
                    [A, v, y].forEach(function(c) {
                        var e,
                            l = [],
                            f = N.duration;
                        E(c, function(c, a) {
                            c.isActive || (c.render(a, !1, 0), (c.isActive = !1), l.push(a));
                        });
                        K(
                            function() {
                                for (e = l.length; e--;)
                                    c[l[e]] &&
                                    !c[l[e]].isActive &&
                                    (c[l[e]].destroy(), delete c[l[e]]);
                            },
                            c !== y && a.hasRendered && f ? f : 0
                        );
                    });
                    C &&
                        (C[C.isPlaced ? "animate" : "attr"]({
                                d: this.getLinePath(C.strokeWidth()),
                            }),
                            (C.isPlaced = !0),
                            C[q ? "show" : "hide"](q));
                    h &&
                        q &&
                        ((b = c.getTitlePosition()),
                            f(b.y) ?
                            (h[h.isNew ? "attr" : "animate"](b), (h.isNew = !1)) :
                            (h.attr("y", -9999), (h.isNew = !0)));
                    m && m.enabled && c.stacking && c.stacking.renderStackTotals();
                    c.isDirty = !1;
                    L(this, "afterRender");
                };
                v.prototype.redraw = function() {
                    this.visible &&
                        (this.render(),
                            this.plotLinesAndBands.forEach(function(c) {
                                c.render();
                            }));
                    this.series.forEach(function(c) {
                        c.isDirty = !0;
                    });
                };
                v.prototype.getKeepProps = function() {
                    return this.keepProps || v.keepProps;
                };
                v.prototype.destroy = function(c) {
                    var a = this,
                        e = a.plotLinesAndBands,
                        f;
                    L(this, "destroy", { keepEvents: c });
                    c || N(a);
                    [a.ticks, a.minorTicks, a.alternateBands].forEach(function(c) {
                        w(c);
                    });
                    if (e)
                        for (c = e.length; c--;) e[c].destroy();
                    "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar"
                    .split(" ")
                        .forEach(function(c) {
                            a[c] && (a[c] = a[c].destroy());
                        });
                    for (f in a.plotLinesAndBandsGroups)
                        a.plotLinesAndBandsGroups[f] = a.plotLinesAndBandsGroups[
                            f
                        ].destroy();
                    E(a, function(c, e) {
                        -1 === a.getKeepProps().indexOf(e) && delete a[e];
                    });
                };
                v.prototype.drawCrosshair = function(c, a) {
                    var e = this.crosshair,
                        l = H(e.snap, !0),
                        f,
                        b = this.cross,
                        p = this.chart;
                    L(this, "drawCrosshair", { e: c, point: a });
                    c || (c = this.cross && this.cross.e);
                    if (this.crosshair && !1 !== (F(a) || !l)) {
                        l
                            ?
                            F(a) &&
                            (f = H(
                                "colorAxis" !== this.coll ? a.crosshairPos : null,
                                this.isXAxis ? a.plotX : this.len - a.plotY
                            )) :
                            (f =
                                c &&
                                (this.horiz ?
                                    c.chartX - this.pos :
                                    this.len - c.chartY + this.pos));
                        if (F(f)) {
                            var g = {
                                value: a && (this.isXAxis ? a.x : H(a.stackY, a.y)),
                                translatedValue: f,
                            };
                            p.polar &&
                                m(g, {
                                    isCrosshair: !0,
                                    chartX: c && c.chartX,
                                    chartY: c && c.chartY,
                                    point: a,
                                });
                            g = this.getPlotLinePath(g) || null;
                        }
                        if (!F(g)) {
                            this.hideCrosshair();
                            return;
                        }
                        l = this.categories && !this.isRadial;
                        b ||
                            ((this.cross = b = p.renderer
                                    .path()
                                    .addClass(
                                        "highcharts-crosshair highcharts-crosshair-" +
                                        (l ? "category " : "thin ") +
                                        e.className
                                    )
                                    .attr({ zIndex: H(e.zIndex, 2) })
                                    .add()),
                                p.styledMode ||
                                (b
                                    .attr({
                                        stroke: e.color ||
                                            (l ?
                                                t.parse("#ccd6eb").setOpacity(0.25).get() :
                                                "#cccccc"),
                                        "stroke-width": H(e.width, 1),
                                    })
                                    .css({ "pointer-events": "none" }),
                                    e.dashStyle && b.attr({ dashstyle: e.dashStyle })));
                        b.show().attr({ d: g });
                        l && !e.width && b.attr({ "stroke-width": this.transA });
                        this.cross.e = c;
                    } else this.hideCrosshair();
                    L(this, "afterDrawCrosshair", { e: c, point: a });
                };
                v.prototype.hideCrosshair = function() {
                    this.cross && this.cross.hide();
                    L(this, "afterHideCrosshair");
                };
                v.prototype.hasVerticalPanning = function() {
                    var c, a;
                    return /y/.test(
                        (null ===
                            (a =
                                null === (c = this.chart.options.chart) || void 0 === c ?
                                void 0 :
                                c.panning) || void 0 === a ?
                            void 0 :
                            a.type) || ""
                    );
                };
                v.prototype.validatePositiveValue = function(c) {
                    return f(c) && 0 < c;
                };
                v.defaultOptions = {
                    dateTimeLabelFormats: {
                        millisecond: { main: "%H:%M:%S.%L", range: !1 },
                        second: { main: "%H:%M:%S", range: !1 },
                        minute: { main: "%H:%M", range: !1 },
                        hour: { main: "%H:%M", range: !1 },
                        day: { main: "%e. %b" },
                        week: { main: "%e. %b" },
                        month: { main: "%b '%y" },
                        year: { main: "%Y" },
                    },
                    endOnTick: !1,
                    labels: {
                        enabled: !0,
                        indentation: 10,
                        x: 0,
                        style: { color: "#666666", cursor: "default", fontSize: "11px" },
                    },
                    maxPadding: 0.01,
                    minorTickLength: 2,
                    minorTickPosition: "outside",
                    minPadding: 0.01,
                    showEmpty: !0,
                    startOfWeek: 1,
                    startOnTick: !1,
                    tickLength: 10,
                    tickPixelInterval: 100,
                    tickmarkPlacement: "between",
                    tickPosition: "outside",
                    title: { align: "middle", style: { color: "#666666" } },
                    type: "linear",
                    minorGridLineColor: "#f2f2f2",
                    minorGridLineWidth: 1,
                    minorTickColor: "#999999",
                    lineColor: "#ccd6eb",
                    lineWidth: 1,
                    gridLineColor: "#e6e6e6",
                    tickColor: "#ccd6eb",
                };
                v.defaultYAxisOptions = {
                    endOnTick: !0,
                    maxPadding: 0.05,
                    minPadding: 0.05,
                    tickPixelInterval: 72,
                    showLastLabel: !0,
                    labels: { x: -8 },
                    startOnTick: !0,
                    title: { rotation: 270, text: "Values" },
                    stackLabels: {
                        animation: {},
                        allowOverlap: !1,
                        enabled: !1,
                        crop: !0,
                        overflow: "justify",
                        formatter: function() {
                            var c = this.axis.chart.numberFormatter;
                            return c(this.total, -1);
                        },
                        style: {
                            color: "#000000",
                            fontSize: "11px",
                            fontWeight: "bold",
                            textOutline: "1px contrast",
                        },
                    },
                    gridLineWidth: 1,
                    lineWidth: 0,
                };
                v.defaultLeftAxisOptions = {
                    labels: { x: -15 },
                    title: { rotation: 270 },
                };
                v.defaultRightAxisOptions = {
                    labels: { x: 15 },
                    title: { rotation: 90 },
                };
                v.defaultBottomAxisOptions = {
                    labels: { autoRotation: [-45], x: 0 },
                    margin: 15,
                    title: { rotation: 0 },
                };
                v.defaultTopAxisOptions = {
                    labels: { autoRotation: [-45], x: 0 },
                    margin: 15,
                    title: { rotation: 0 },
                };
                v.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
                return v;
            })();
            I.Axis = k;
            return I.Axis;
        }
    );
    Q(
        k,
        "Core/Axis/DateTimeAxis.js", [k["Core/Axis/Axis.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.addEvent,
                D = t.getMagnitude,
                J = t.normalizeTickInterval,
                M = t.timeUnits,
                n = (function() {
                    function n(n) {
                        this.axis = n;
                    }
                    n.prototype.normalizeTimeTickInterval = function(n, d) {
                        var k = d || [
                            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                            ["second", [1, 2, 5, 10, 15, 30]],
                            ["minute", [1, 2, 5, 10, 15, 30]],
                            ["hour", [1, 2, 3, 4, 6, 8, 12]],
                            ["day", [1, 2]],
                            ["week", [1, 2]],
                            ["month", [1, 2, 3, 4, 6]],
                            ["year", null],
                        ];
                        d = k[k.length - 1];
                        var u = M[d[0]],
                            F = d[1],
                            w;
                        for (
                            w = 0; w < k.length &&
                            !((d = k[w]),
                                (u = M[d[0]]),
                                (F = d[1]),
                                k[w + 1] && n <= (u * F[F.length - 1] + M[k[w + 1][0]]) / 2); w++
                        );
                        u === M.year && n < 5 * u && (F = [1, 2, 5]);
                        n = J(n / u, F, "year" === d[0] ? Math.max(D(n / u), 1) : 1);
                        return { unitRange: u, count: n, unitName: d[0] };
                    };
                    return n;
                })();
            t = (function() {
                function k() {}
                k.compose = function(k) {
                    k.keepProps.push("dateTime");
                    k.prototype.getTimeTicks = function() {
                        return this.chart.time.getTimeTicks.apply(
                            this.chart.time,
                            arguments
                        );
                    };
                    B(k, "init", function(d) {
                        "datetime" !== d.userOptions.type ?
                            (this.dateTime = void 0) :
                            this.dateTime || (this.dateTime = new n(this));
                    });
                };
                k.AdditionsClass = n;
                return k;
            })();
            t.compose(k);
            return t;
        }
    );
    Q(
        k,
        "Core/Axis/LogarithmicAxis.js", [k["Core/Axis/Axis.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.addEvent,
                D = t.getMagnitude,
                J = t.normalizeTickInterval,
                M = t.pick,
                n = (function() {
                    function n(n) {
                        this.axis = n;
                    }
                    n.prototype.getLogTickPositions = function(n, d, k, u) {
                        var F = this.axis,
                            w = F.len,
                            r = F.options,
                            m = [];
                        u || (this.minorAutoInterval = void 0);
                        if (0.5 <= n)
                            (n = Math.round(n)), (m = F.getLinearTickPositions(n, d, k));
                        else if (0.08 <= n) {
                            r = Math.floor(d);
                            var L, q;
                            for (
                                w =
                                0.3 < n ?
                                [1, 2, 4] :
                                0.15 < n ?
                                [1, 2, 4, 6, 8] :
                                [1, 2, 3, 4, 5, 6, 7, 8, 9]; r < k + 1 && !q; r++
                            ) {
                                var h = w.length;
                                for (L = 0; L < h && !q; L++) {
                                    var b = this.log2lin(this.lin2log(r) * w[L]);
                                    b > d &&
                                        (!u || g <= k) &&
                                        "undefined" !== typeof g &&
                                        m.push(g);
                                    g > k && (q = !0);
                                    var g = b;
                                }
                            }
                        } else
                            (d = this.lin2log(d)),
                            (k = this.lin2log(k)),
                            (n = u ? F.getMinorTickInterval() : r.tickInterval),
                            (n = M(
                                "auto" === n ? null : n,
                                this.minorAutoInterval,
                                ((r.tickPixelInterval / (u ? 5 : 1)) * (k - d)) /
                                ((u ? w / F.tickPositions.length : w) || 1)
                            )),
                            (n = J(n, void 0, D(n))),
                            (m = F.getLinearTickPositions(n, d, k).map(this.log2lin)),
                            u || (this.minorAutoInterval = n / 5);
                        u || (F.tickInterval = n);
                        return m;
                    };
                    n.prototype.lin2log = function(n) {
                        return Math.pow(10, n);
                    };
                    n.prototype.log2lin = function(n) {
                        return Math.log(n) / Math.LN10;
                    };
                    return n;
                })();
            t = (function() {
                function k() {}
                k.compose = function(k) {
                    k.keepProps.push("logarithmic");
                    var d = k.prototype,
                        z = n.prototype;
                    d.log2lin = z.log2lin;
                    d.lin2log = z.lin2log;
                    B(k, "init", function(d) {
                        var u = this.logarithmic;
                        "logarithmic" !== d.userOptions.type ?
                            (this.logarithmic = void 0) :
                            (u || (u = this.logarithmic = new n(this)),
                                this.log2lin !== u.log2lin &&
                                (u.log2lin = this.log2lin.bind(this)),
                                this.lin2log !== u.lin2log &&
                                (u.lin2log = this.lin2log.bind(this)));
                    });
                    B(k, "afterInit", function() {
                        var d = this.logarithmic;
                        d &&
                            ((this.lin2val = function(u) {
                                    return d.lin2log(u);
                                }),
                                (this.val2lin = function(u) {
                                    return d.log2lin(u);
                                }));
                    });
                };
                return k;
            })();
            t.compose(k);
            return t;
        }
    );
    Q(
        k,
        "Core/Axis/PlotLineOrBand.js", [k["Core/Axis/Axis.js"], k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t, I) {
            var B = I.arrayMax,
                J = I.arrayMin,
                M = I.defined,
                n = I.destroyObjectProperties,
                z = I.erase,
                G = I.extend,
                d = I.merge,
                O = I.objectEach,
                u = I.pick;
            I = (function() {
                function k(d, r) {
                    this.axis = d;
                    r && ((this.options = r), (this.id = r.id));
                }
                k.prototype.render = function() {
                    t.fireEvent(this, "render");
                    var w = this,
                        r = w.axis,
                        m = r.horiz,
                        n = r.logarithmic,
                        q = w.options,
                        h = q.label,
                        b = w.label,
                        g = q.to,
                        f = q.from,
                        a = q.value,
                        p = M(f) && M(g),
                        e = M(a),
                        E = w.svgElem,
                        H = !E,
                        y = [],
                        N = q.color,
                        P = u(q.zIndex, 0),
                        K = q.events;
                    y = {
                        class: "highcharts-plot-" +
                            (p ? "band " : "line ") +
                            (q.className || ""),
                    };
                    var A = {},
                        C = r.chart.renderer,
                        v = p ? "bands" : "lines";
                    n && ((f = n.log2lin(f)), (g = n.log2lin(g)), (a = n.log2lin(a)));
                    r.chart.styledMode ||
                        (e ?
                            ((y.stroke = N || "#999999"),
                                (y["stroke-width"] = u(q.width, 1)),
                                q.dashStyle && (y.dashstyle = q.dashStyle)) :
                            p &&
                            ((y.fill = N || "#e6ebf5"),
                                q.borderWidth &&
                                ((y.stroke = q.borderColor),
                                    (y["stroke-width"] = q.borderWidth))));
                    A.zIndex = P;
                    v += "-" + P;
                    (n = r.plotLinesAndBandsGroups[v]) ||
                    (r.plotLinesAndBandsGroups[v] = n = C.g("plot-" + v)
                        .attr(A)
                        .add());
                    H && (w.svgElem = E = C.path().attr(y).add(n));
                    if (e)
                        y = r.getPlotLinePath({
                            value: a,
                            lineWidth: E.strokeWidth(),
                            acrossPanes: q.acrossPanes,
                        });
                    else if (p) y = r.getPlotBandPath(f, g, q);
                    else return;
                    !w.eventsAdded &&
                        K &&
                        (O(K, function(c, a) {
                                E.on(a, function(c) {
                                    K[a].apply(w, [c]);
                                });
                            }),
                            (w.eventsAdded = !0));
                    (H || !E.d) && y && y.length ?
                        E.attr({ d: y }) :
                        E &&
                        (y ?
                            (E.show(!0), E.animate({ d: y })) :
                            E.d && (E.hide(), b && (w.label = b = b.destroy())));
                    h &&
                        (M(h.text) || M(h.formatter)) &&
                        y &&
                        y.length &&
                        0 < r.width &&
                        0 < r.height &&
                        !y.isFlat ?
                        ((h = d({
                                    align: m && p && "center",
                                    x: m ? !p && 4 : 10,
                                    verticalAlign: !m && p && "middle",
                                    y: m ? (p ? 16 : 10) : p ? 6 : -4,
                                    rotation: m && !p && 90,
                                },
                                h
                            )),
                            this.renderLabel(h, y, p, P)) :
                        b && b.hide();
                    return w;
                };
                k.prototype.renderLabel = function(d, r, m, u) {
                    var q = this.label,
                        h = this.axis.chart.renderer;
                    q ||
                        ((q = {
                                align: d.textAlign || d.align,
                                rotation: d.rotation,
                                class: "highcharts-plot-" +
                                    (m ? "band" : "line") +
                                    "-label " +
                                    (d.className || ""),
                            }),
                            (q.zIndex = u),
                            (u = this.getLabelText(d)),
                            (this.label = q = h.text(u, 0, 0, d.useHTML).attr(q).add()),
                            this.axis.chart.styledMode || q.css(d.style));
                    h = r.xBounds || [r[0][1], r[1][1], m ? r[2][1] : r[0][1]];
                    r = r.yBounds || [r[0][2], r[1][2], m ? r[2][2] : r[0][2]];
                    m = J(h);
                    u = J(r);
                    q.align(d, !1, { x: m, y: u, width: B(h) - m, height: B(r) - u });
                    q.show(!0);
                };
                k.prototype.getLabelText = function(d) {
                    return M(d.formatter) ? d.formatter.call(this) : d.text;
                };
                k.prototype.destroy = function() {
                    z(this.axis.plotLinesAndBands, this);
                    delete this.axis;
                    n(this);
                };
                return k;
            })();
            G(k.prototype, {
                getPlotBandPath: function(d, w, r) {
                    void 0 === r && (r = this.options);
                    var m = this.getPlotLinePath({
                        value: w,
                        force: !0,
                        acrossPanes: r.acrossPanes,
                    });
                    r = this.getPlotLinePath({
                        value: d,
                        force: !0,
                        acrossPanes: r.acrossPanes,
                    });
                    var u = [],
                        q = this.horiz,
                        h = 1;
                    d = (d < this.min && w < this.min) || (d > this.max && w > this.max);
                    if (r && m) {
                        if (d) {
                            var b = r.toString() === m.toString();
                            h = 0;
                        }
                        for (d = 0; d < r.length; d += 2) {
                            w = r[d];
                            var g = r[d + 1],
                                f = m[d],
                                a = m[d + 1];
                            ("M" !== w[0] && "L" !== w[0]) ||
                            ("M" !== g[0] && "L" !== g[0]) ||
                            ("M" !== f[0] && "L" !== f[0]) ||
                            ("M" !== a[0] && "L" !== a[0]) ||
                            (q && f[1] === w[1] ?
                                ((f[1] += h), (a[1] += h)) :
                                q || f[2] !== w[2] || ((f[2] += h), (a[2] += h)),
                                u.push(
                                    ["M", w[1], w[2]], ["L", g[1], g[2]], ["L", a[1], a[2]], ["L", f[1], f[2]], ["Z"]
                                ));
                            u.isFlat = b;
                        }
                    }
                    return u;
                },
                addPlotBand: function(d) {
                    return this.addPlotBandOrLine(d, "plotBands");
                },
                addPlotLine: function(d) {
                    return this.addPlotBandOrLine(d, "plotLines");
                },
                addPlotBandOrLine: function(d, w) {
                    var r = new t.PlotLineOrBand(this, d),
                        m = this.userOptions;
                    this.visible && (r = r.render());
                    if (r) {
                        if (w) {
                            var u = m[w] || [];
                            u.push(d);
                            m[w] = u;
                        }
                        this.plotLinesAndBands.push(r);
                        this._addedPlotLB = !0;
                    }
                    return r;
                },
                removePlotBandOrLine: function(d) {
                    for (
                        var w = this.plotLinesAndBands,
                            r = this.options,
                            m = this.userOptions,
                            u = w.length; u--;

                    )
                        w[u].id === d && w[u].destroy();
                    [
                        r.plotLines || [],
                        m.plotLines || [],
                        r.plotBands || [],
                        m.plotBands || [],
                    ].forEach(function(m) {
                        for (u = m.length; u--;)(m[u] || {}).id === d && z(m, m[u]);
                    });
                },
                removePlotBand: function(d) {
                    this.removePlotBandOrLine(d);
                },
                removePlotLine: function(d) {
                    this.removePlotBandOrLine(d);
                },
            });
            t.PlotLineOrBand = I;
            return t.PlotLineOrBand;
        }
    );
    Q(
        k,
        "Core/Tooltip.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = k.doc,
                D = t.clamp,
                J = t.css,
                M = t.defined,
                n = t.discardElement,
                z = t.extend,
                G = t.fireEvent,
                d = t.format,
                O = t.isNumber,
                u = t.isString,
                F = t.merge,
                w = t.pick,
                r = t.splat,
                m = t.syncTimeout,
                L = t.timeUnits;
            ("");
            var q = (function() {
                function h(b, g) {
                    this.container = void 0;
                    this.crosshairs = [];
                    this.distance = 0;
                    this.isHidden = !0;
                    this.isSticky = !1;
                    this.now = {};
                    this.options = {};
                    this.outside = !1;
                    this.chart = b;
                    this.init(b, g);
                }
                h.prototype.applyFilter = function() {
                    var b = this.chart;
                    b.renderer.definition({
                        tagName: "filter",
                        id: "drop-shadow-" + b.index,
                        opacity: 0.5,
                        children: [
                            { tagName: "feGaussianBlur", in: "SourceAlpha", stdDeviation: 1 },
                            { tagName: "feOffset", dx: 1, dy: 1 },
                            {
                                tagName: "feComponentTransfer",
                                children: [{ tagName: "feFuncA", type: "linear", slope: 0.3 }],
                            },
                            {
                                tagName: "feMerge",
                                children: [
                                    { tagName: "feMergeNode" },
                                    { tagName: "feMergeNode", in: "SourceGraphic" },
                                ],
                            },
                        ],
                    });
                    b.renderer.definition({
                        tagName: "style",
                        textContent: ".highcharts-tooltip-" +
                            b.index +
                            "{filter:url(#drop-shadow-" +
                            b.index +
                            ")}",
                    });
                };
                h.prototype.bodyFormatter = function(b) {
                    return b.map(function(b) {
                        var f = b.series.tooltipOptions;
                        return (
                            f[(b.point.formatPrefix || "point") + "Formatter"] ||
                            b.point.tooltipFormatter
                        ).call(
                            b.point,
                            f[(b.point.formatPrefix || "point") + "Format"] || ""
                        );
                    });
                };
                h.prototype.cleanSplit = function(b) {
                    this.chart.series.forEach(function(g) {
                        var f = g && g.tt;
                        f && (!f.isActive || b ? (g.tt = f.destroy()) : (f.isActive = !1));
                    });
                };
                h.prototype.defaultFormatter = function(b) {
                    var g = this.points || r(this);
                    var f = [b.tooltipFooterHeaderFormatter(g[0])];
                    f = f.concat(b.bodyFormatter(g));
                    f.push(b.tooltipFooterHeaderFormatter(g[0], !0));
                    return f;
                };
                h.prototype.destroy = function() {
                    this.label && (this.label = this.label.destroy());
                    this.split &&
                        this.tt &&
                        (this.cleanSplit(this.chart, !0), (this.tt = this.tt.destroy()));
                    this.renderer &&
                        ((this.renderer = this.renderer.destroy()), n(this.container));
                    t.clearTimeout(this.hideTimer);
                    t.clearTimeout(this.tooltipTimeout);
                };
                h.prototype.getAnchor = function(b, g) {
                    var f = this.chart,
                        a = f.pointer,
                        p = f.inverted,
                        e = f.plotTop,
                        h = f.plotLeft,
                        d = 0,
                        y = 0,
                        m,
                        q;
                    b = r(b);
                    this.followPointer && g ?
                        ("undefined" === typeof g.chartX && (g = a.normalize(g)),
                            (b = [g.chartX - h, g.chartY - e])) :
                        b[0].tooltipPos ?
                        (b = b[0].tooltipPos) :
                        (b.forEach(function(a) {
                                m = a.series.yAxis;
                                q = a.series.xAxis;
                                d += a.plotX + (!p && q ? q.left - h : 0);
                                y +=
                                    (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) +
                                    (!p && m ? m.top - e : 0);
                            }),
                            (d /= b.length),
                            (y /= b.length),
                            (b = [
                                p ? f.plotWidth - y : d,
                                this.shared && !p && 1 < b.length && g ?
                                g.chartY - e :
                                p ?
                                f.plotHeight - d :
                                y,
                            ]));
                    return b.map(Math.round);
                };
                h.prototype.getDateFormat = function(b, g, f, a) {
                    var p = this.chart.time,
                        e = p.dateFormat("%m-%d %H:%M:%S.%L", g),
                        h = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
                        d = "millisecond";
                    for (y in L) {
                        if (
                            b === L.week &&
                            +p.dateFormat("%w", g) === f &&
                            "00:00:00.000" === e.substr(6)
                        ) {
                            var y = "week";
                            break;
                        }
                        if (L[y] > b) {
                            y = d;
                            break;
                        }
                        if (h[y] && e.substr(h[y]) !== "01-01 00:00:00.000".substr(h[y]))
                            break;
                        "week" !== y && (d = y);
                    }
                    if (y) var m = p.resolveDTLFormat(a[y]).main;
                    return m;
                };
                h.prototype.getLabel = function() {
                    var b,
                        g,
                        f = this,
                        a = this.chart.renderer,
                        p = this.chart.styledMode,
                        e = this.options,
                        h = "tooltip" + (M(e.className) ? " " + e.className : ""),
                        d =
                        (null === (b = e.style) || void 0 === b ?
                            void 0 :
                            b.pointerEvents) ||
                        (!this.followPointer && e.stickOnContact ? "auto" : "none"),
                        y;
                    b = function() {
                        f.inContact = !0;
                    };
                    var m = function() {
                        var a = f.chart.hoverSeries;
                        f.inContact = !1;
                        if (a && a.onMouseOut) a.onMouseOut();
                    };
                    if (!this.label) {
                        this.outside &&
                            ((this.container = y = k.doc.createElement("div")),
                                (y.className = "highcharts-tooltip-container"),
                                J(y, {
                                    position: "absolute",
                                    top: "1px",
                                    pointerEvents: d,
                                    zIndex: 3,
                                }),
                                k.doc.body.appendChild(y),
                                (this.renderer = a = new k.Renderer(
                                    y,
                                    0,
                                    0,
                                    null === (g = this.chart.options.chart) || void 0 === g ?
                                    void 0 :
                                    g.style,
                                    void 0,
                                    void 0,
                                    a.styledMode
                                )));
                        this.split ?
                            (this.label = a.g(h)) :
                            ((this.label = a
                                    .label(
                                        "",
                                        0,
                                        0,
                                        e.shape || "callout",
                                        null,
                                        null,
                                        e.useHTML,
                                        null,
                                        h
                                    )
                                    .attr({ padding: e.padding, r: e.borderRadius })),
                                p ||
                                this.label
                                .attr({
                                    fill: e.backgroundColor,
                                    "stroke-width": e.borderWidth,
                                })
                                .css(e.style)
                                .css({ pointerEvents: d })
                                .shadow(e.shadow));
                        p &&
                            (this.applyFilter(),
                                this.label.addClass("highcharts-tooltip-" + this.chart.index));
                        if (f.outside && !f.split) {
                            var q = this.label,
                                K = q.xSetter,
                                A = q.ySetter;
                            q.xSetter = function(a) {
                                K.call(q, f.distance);
                                y.style.left = a + "px";
                            };
                            q.ySetter = function(a) {
                                A.call(q, f.distance);
                                y.style.top = a + "px";
                            };
                        }
                        this.label
                            .on("mouseenter", b)
                            .on("mouseleave", m)
                            .attr({ zIndex: 8 })
                            .add();
                    }
                    return this.label;
                };
                h.prototype.getPosition = function(b, g, f) {
                    var a = this.chart,
                        p = this.distance,
                        e = {},
                        h = (a.inverted && f.h) || 0,
                        d,
                        y = this.outside,
                        m = y ? B.documentElement.clientWidth - 2 * p : a.chartWidth,
                        q = y ?
                        Math.max(
                            B.body.scrollHeight,
                            B.documentElement.scrollHeight,
                            B.body.offsetHeight,
                            B.documentElement.offsetHeight,
                            B.documentElement.clientHeight
                        ) :
                        a.chartHeight,
                        K = a.pointer.getChartPosition(),
                        A = a.containerScaling,
                        C = function(a) {
                            return A ? a * A.scaleX : a;
                        },
                        v = function(a) {
                            return A ? a * A.scaleY : a;
                        },
                        c = function(c) {
                            var e = "x" === c;
                            return [c, e ? m : q, e ? b : g].concat(
                                y ?
                                [
                                    e ? C(b) : v(g),
                                    e ?
                                    K.left - p + C(f.plotX + a.plotLeft) :
                                    K.top - p + v(f.plotY + a.plotTop),
                                    0,
                                    e ? m : q,
                                ] :
                                [
                                    e ? b : g,
                                    e ? f.plotX + a.plotLeft : f.plotY + a.plotTop,
                                    e ? a.plotLeft : a.plotTop,
                                    e ? a.plotLeft + a.plotWidth : a.plotTop + a.plotHeight,
                                ]
                            );
                        },
                        l = c("y"),
                        x = c("x"),
                        r = !this.followPointer && w(f.ttBelow, !a.inverted === !!f.negative),
                        u = function(a, c, l, f, b, g, x) {
                            var E = "y" === a ? v(p) : C(p),
                                A = (l - f) / 2,
                                d = f < b - p,
                                y = b + p + f < c,
                                m = b - E - l + A;
                            b = b + E - A;
                            if (r && y) e[a] = b;
                            else if (!r && d) e[a] = m;
                            else if (d) e[a] = Math.min(x - f, 0 > m - h ? m : m - h);
                            else if (y) e[a] = Math.max(g, b + h + l > c ? b : b + h);
                            else return !1;
                        },
                        n = function(a, c, l, f, b) {
                            var g;
                            b < p || b > c - p ?
                                (g = !1) :
                                (e[a] =
                                    b < l / 2 ? 1 : b > c - f / 2 ? c - f - 2 : b - l / 2);
                            return g;
                        },
                        k = function(a) {
                            var c = l;
                            l = x;
                            x = c;
                            d = a;
                        },
                        F = function() {
                            !1 !== u.apply(0, l) ?
                                !1 !== n.apply(0, x) || d || (k(!0), F()) :
                                d ?
                                (e.x = e.y = 0) :
                                (k(!0), F());
                        };
                    (a.inverted || 1 < this.len) && k();
                    F();
                    return e;
                };
                h.prototype.getXDateFormat = function(b, g, f) {
                    g = g.dateTimeLabelFormats;
                    var a = f && f.closestPointRange;
                    return (
                        (a ?
                            this.getDateFormat(a, b.x, f.options.startOfWeek, g) :
                            g.day) || g.year
                    );
                };
                h.prototype.hide = function(b) {
                    var g = this;
                    t.clearTimeout(this.hideTimer);
                    b = w(b, this.options.hideDelay, 500);
                    this.isHidden ||
                        (this.hideTimer = m(function() {
                            g.getLabel().fadeOut(b ? void 0 : b);
                            g.isHidden = !0;
                        }, b));
                };
                h.prototype.init = function(b, g) {
                    this.chart = b;
                    this.options = g;
                    this.crosshairs = [];
                    this.now = { x: 0, y: 0 };
                    this.isHidden = !0;
                    this.split = g.split && !b.inverted && !b.polar;
                    this.shared = g.shared || this.split;
                    this.outside = w(
                        g.outside, !(!b.scrollablePixelsX && !b.scrollablePixelsY)
                    );
                };
                h.prototype.isStickyOnContact = function() {
                    return !(
                        this.followPointer ||
                        !this.options.stickOnContact ||
                        !this.inContact
                    );
                };
                h.prototype.move = function(b, g, f, a) {
                    var p = this,
                        e = p.now,
                        h = !1 !== p.options.animation &&
                        !p.isHidden &&
                        (1 < Math.abs(b - e.x) || 1 < Math.abs(g - e.y)),
                        d = p.followPointer || 1 < p.len;
                    z(e, {
                        x: h ? (2 * e.x + b) / 3 : b,
                        y: h ? (e.y + g) / 2 : g,
                        anchorX: d ? void 0 : h ? (2 * e.anchorX + f) / 3 : f,
                        anchorY: d ? void 0 : h ? (e.anchorY + a) / 2 : a,
                    });
                    p.getLabel().attr(e);
                    p.drawTracker();
                    h &&
                        (t.clearTimeout(this.tooltipTimeout),
                            (this.tooltipTimeout = setTimeout(function() {
                                p && p.move(b, g, f, a);
                            }, 32)));
                };
                h.prototype.refresh = function(b, g) {
                    var f = this.chart,
                        a = this.options,
                        p = b,
                        e = {},
                        h = [],
                        d = a.formatter || this.defaultFormatter;
                    e = this.shared;
                    var y = f.styledMode;
                    if (a.enabled) {
                        t.clearTimeout(this.hideTimer);
                        this.followPointer = r(p)[0].series.tooltipOptions.followPointer;
                        var m = this.getAnchor(p, g);
                        g = m[0];
                        var q = m[1];
                        !e || (p.series && p.series.noSharedTooltip) ?
                            (e = p.getLabelConfig()) :
                            (f.pointer.applyInactiveState(p),
                                p.forEach(function(a) {
                                    a.setState("hover");
                                    h.push(a.getLabelConfig());
                                }),
                                (e = { x: p[0].category, y: p[0].y }),
                                (e.points = h),
                                (p = p[0]));
                        this.len = h.length;
                        f = d.call(e, this);
                        d = p.series;
                        this.distance = w(d.tooltipOptions.distance, 16);
                        !1 === f ?
                            this.hide() :
                            (this.split ?
                                this.renderSplit(f, r(b)) :
                                ((b = this.getLabel()),
                                    (a.style.width && !y) ||
                                    b.css({ width: this.chart.spacingBox.width + "px" }),
                                    b.attr({ text: f && f.join ? f.join("") : f }),
                                    b
                                    .removeClass(/highcharts-color-[\d]+/g)
                                    .addClass(
                                        "highcharts-color-" + w(p.colorIndex, d.colorIndex)
                                    ),
                                    y ||
                                    b.attr({
                                        stroke: a.borderColor || p.color || d.color || "#666666",
                                    }),
                                    this.updatePosition({
                                        plotX: g,
                                        plotY: q,
                                        negative: p.negative,
                                        ttBelow: p.ttBelow,
                                        h: m[2] || 0,
                                    })),
                                this.isHidden &&
                                this.label &&
                                this.label.attr({ opacity: 1 }).show(),
                                (this.isHidden = !1));
                        G(this, "refresh");
                    }
                };
                h.prototype.renderSplit = function(b, g) {
                    function f(a, c, e, f, b) {
                        void 0 === b && (b = !0);
                        e
                            ?
                            ((c = L ? 0 : O), (a = D(a - f / 2, n.left, n.right - f))) :
                            ((c -= t),
                                (a = b ? a - f - l : a + l),
                                (a = D(a, b ? a : n.left, n.right)));
                        return { x: a, y: c };
                    }
                    var a = this,
                        p = a.chart,
                        e = a.chart,
                        h = e.plotHeight,
                        d = e.plotLeft,
                        y = e.plotTop,
                        m = e.pointer,
                        q = e.renderer,
                        K = e.scrollablePixelsY,
                        A = void 0 === K ? 0 : K;
                    K = e.scrollingContainer;
                    K = void 0 === K ? { scrollLeft: 0, scrollTop: 0 } : K;
                    var C = K.scrollLeft,
                        v = K.scrollTop,
                        c = e.styledMode,
                        l = a.distance,
                        x = a.options,
                        r = a.options.positioner,
                        n = {
                            left: C,
                            right: C + e.chartWidth,
                            top: v,
                            bottom: v + e.chartHeight,
                        },
                        F = a.getLabel(),
                        L = !(!p.xAxis[0] || !p.xAxis[0].opposite),
                        t = y + v,
                        G = 0,
                        O = h - A;
                    u(b) && (b = [!1, b]);
                    b = b.slice(0, g.length + 1).reduce(function(e, b, p) {
                        if (!1 !== b && "" !== b) {
                            p = g[p - 1] || {
                                isHeader: !0,
                                plotX: g[0].plotX,
                                plotY: h,
                                series: {},
                            };
                            var E = p.isHeader,
                                m = E ? a : p.series,
                                H = m.tt,
                                C = p.isHeader;
                            var K = p.series;
                            var N =
                                "highcharts-color-" + w(p.colorIndex, K.colorIndex, "none");
                            H ||
                                ((H = { padding: x.padding, r: x.borderRadius }),
                                    c ||
                                    ((H.fill = x.backgroundColor),
                                        (H["stroke-width"] = x.borderWidth)),
                                    (H = q
                                        .label(
                                            "",
                                            0,
                                            0,
                                            x[C ? "headerShape" : "shape"] || "callout",
                                            void 0,
                                            void 0,
                                            x.useHTML
                                        )
                                        .addClass(
                                            (C ? "highcharts-tooltip-header " : "") +
                                            "highcharts-tooltip-box " +
                                            N
                                        )
                                        .attr(H)
                                        .add(F)));
                            H.isActive = !0;
                            H.attr({ text: b });
                            c ||
                                H.css(x.style)
                                .shadow(x.shadow)
                                .attr({
                                    stroke: x.borderColor || p.color || K.color || "#333333",
                                });
                            b = m.tt = H;
                            C = b.getBBox();
                            m = C.width + b.strokeWidth();
                            E && ((G = C.height), (O += G), L && (t -= G));
                            K = p.plotX;
                            K = void 0 === K ? 0 : K;
                            N = p.plotY;
                            N = void 0 === N ? 0 : N;
                            var R = p.series;
                            if (p.isHeader) {
                                K = d + K;
                                var P = y + h / 2;
                            } else
                                (H = R.xAxis),
                                (R = R.yAxis),
                                (K = H.pos + D(K, -l, H.len + l)),
                                R.pos + N >= v + y &&
                                R.pos + N <= v + y + h - A &&
                                (P = R.pos + N);
                            K = D(K, n.left - l, n.right + l);
                            "number" === typeof P
                                ?
                                ((C = C.height + 1),
                                    (N = r ? r.call(a, m, C, p) : f(K, P, E, m)),
                                    e.push({
                                        align: r ? 0 : void 0,
                                        anchorX: K,
                                        anchorY: P,
                                        boxWidth: m,
                                        point: p,
                                        rank: w(N.rank, E ? 1 : 0),
                                        size: C,
                                        target: N.y,
                                        tt: b,
                                        x: N.x,
                                    })) :
                                (b.isActive = !1);
                        }
                        return e;
                    }, []);
                    !r &&
                        b.some(function(a) {
                            return a.x < n.left;
                        }) &&
                        (b = b.map(function(a) {
                            var c = f(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
                            return z(a, { target: c.y, x: c.x });
                        }));
                    a.cleanSplit();
                    k.distribute(b, O);
                    b.forEach(function(a) {
                        var c = a.pos;
                        a.tt.attr({
                            visibility: "undefined" === typeof c ? "hidden" : "inherit",
                            x: a.x,
                            y: c + t,
                            anchorX: a.anchorX,
                            anchorY: a.anchorY,
                        });
                    });
                    b = a.container;
                    p = a.renderer;
                    a.outside &&
                        b &&
                        p &&
                        ((e = F.getBBox()),
                            p.setSize(e.width + e.x, e.height + e.y, !1),
                            (m = m.getChartPosition()),
                            (b.style.left = m.left + "px"),
                            (b.style.top = m.top + "px"));
                };
                h.prototype.drawTracker = function() {
                    if (this.followPointer || !this.options.stickOnContact)
                        this.tracker && this.tracker.destroy();
                    else {
                        var b = this.chart,
                            g = this.label,
                            f = b.hoverPoint;
                        if (g && f) {
                            var a = { x: 0, y: 0, width: 0, height: 0 };
                            f = this.getAnchor(f);
                            var p = g.getBBox();
                            f[0] += b.plotLeft - g.translateX;
                            f[1] += b.plotTop - g.translateY;
                            a.x = Math.min(0, f[0]);
                            a.y = Math.min(0, f[1]);
                            a.width =
                                0 > f[0] ?
                                Math.max(Math.abs(f[0]), p.width - f[0]) :
                                Math.max(Math.abs(f[0]), p.width);
                            a.height =
                                0 > f[1] ?
                                Math.max(Math.abs(f[1]), p.height - Math.abs(f[1])) :
                                Math.max(Math.abs(f[1]), p.height);
                            this.tracker ?
                                this.tracker.attr(a) :
                                ((this.tracker = g.renderer
                                        .rect(a)
                                        .addClass("highcharts-tracker")
                                        .add(g)),
                                    b.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
                        }
                    }
                };
                h.prototype.styledModeFormat = function(b) {
                    return b
                        .replace('style="font-size: 10px"', 'class="highcharts-header"')
                        .replace(
                            /style="color:{(point|series)\.color}"/g,
                            'class="highcharts-color-{$1.colorIndex}"'
                        );
                };
                h.prototype.tooltipFooterHeaderFormatter = function(b, g) {
                    var f = g ? "footer" : "header",
                        a = b.series,
                        p = a.tooltipOptions,
                        e = p.xDateFormat,
                        h = a.xAxis,
                        m = h && "datetime" === h.options.type && O(b.key),
                        y = p[f + "Format"];
                    g = { isFooter: g, labelConfig: b };
                    G(this, "headerFormatter", g, function(f) {
                        m && !e && (e = this.getXDateFormat(b, p, h));
                        m &&
                            e &&
                            ((b.point && b.point.tooltipDateKeys) || ["key"]).forEach(
                                function(a) {
                                    y = y.replace(
                                        "{point." + a + "}",
                                        "{point." + a + ":" + e + "}"
                                    );
                                }
                            );
                        a.chart.styledMode && (y = this.styledModeFormat(y));
                        f.text = d(y, { point: b, series: a }, this.chart);
                    });
                    return g.text;
                };
                h.prototype.update = function(b) {
                    this.destroy();
                    F(!0, this.chart.options.tooltip.userOptions, b);
                    this.init(this.chart, F(!0, this.options, b));
                };
                h.prototype.updatePosition = function(b) {
                    var g = this.chart,
                        f = g.pointer,
                        a = this.getLabel(),
                        p = b.plotX + g.plotLeft,
                        e = b.plotY + g.plotTop;
                    f = f.getChartPosition();
                    b = (this.options.positioner || this.getPosition).call(
                        this,
                        a.width,
                        a.height,
                        b
                    );
                    if (this.outside) {
                        var h = (this.options.borderWidth || 0) + 2 * this.distance;
                        this.renderer.setSize(a.width + h, a.height + h, !1);
                        if ((g = g.containerScaling))
                            J(this.container, {
                                transform: "scale(" + g.scaleX + ", " + g.scaleY + ")",
                            }),
                            (p *= g.scaleX),
                            (e *= g.scaleY);
                        p += f.left - b.x;
                        e += f.top - b.y;
                    }
                    this.move(Math.round(b.x), Math.round(b.y || 0), p, e);
                };
                return h;
            })();
            k.Tooltip = q;
            return k.Tooltip;
        }
    );
    Q(
        k,
        "Core/Pointer.js", [
            k["Core/Color/Color.js"],
            k["Core/Globals.js"],
            k["Core/Tooltip.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D) {
            var B = k.parse,
                M = t.charts,
                n = t.noop,
                z = D.addEvent,
                G = D.attr,
                d = D.css,
                O = D.defined,
                u = D.extend,
                F = D.find,
                w = D.fireEvent,
                r = D.isNumber,
                m = D.isObject,
                L = D.objectEach,
                q = D.offset,
                h = D.pick,
                b = D.splat;
            ("");
            k = (function() {
                function g(f, a) {
                    this.lastValidTouch = {};
                    this.pinchDown = [];
                    this.runChartClick = !1;
                    this.chart = f;
                    this.hasDragged = !1;
                    this.options = a;
                    this.unbindContainerMouseLeave = function() {};
                    this.unbindContainerMouseEnter = function() {};
                    this.init(f, a);
                }
                g.prototype.applyInactiveState = function(f) {
                    var a = [],
                        b;
                    (f || []).forEach(function(e) {
                        b = e.series;
                        a.push(b);
                        b.linkedParent && a.push(b.linkedParent);
                        b.linkedSeries && (a = a.concat(b.linkedSeries));
                        b.navigatorSeries && a.push(b.navigatorSeries);
                    });
                    this.chart.series.forEach(function(e) {
                        -1 === a.indexOf(e) ?
                            e.setState("inactive", !0) :
                            e.options.inactiveOtherPoints &&
                            e.setAllPointsToState("inactive");
                    });
                };
                g.prototype.destroy = function() {
                    var f = this;
                    "undefined" !== typeof f.unDocMouseMove && f.unDocMouseMove();
                    this.unbindContainerMouseLeave();
                    t.chartCount ||
                        (t.unbindDocumentMouseUp &&
                            (t.unbindDocumentMouseUp = t.unbindDocumentMouseUp()),
                            t.unbindDocumentTouchEnd &&
                            (t.unbindDocumentTouchEnd = t.unbindDocumentTouchEnd()));
                    clearInterval(f.tooltipTimeout);
                    L(f, function(a, b) {
                        f[b] = void 0;
                    });
                };
                g.prototype.drag = function(f) {
                    var a = this.chart,
                        b = a.options.chart,
                        e = f.chartX,
                        g = f.chartY,
                        h = this.zoomHor,
                        d = this.zoomVert,
                        q = a.plotLeft,
                        r = a.plotTop,
                        K = a.plotWidth,
                        A = a.plotHeight,
                        C = this.selectionMarker,
                        v = this.mouseDownX || 0,
                        c = this.mouseDownY || 0,
                        l = m(b.panning) ? b.panning && b.panning.enabled : b.panning,
                        x = b.panKey && f[b.panKey + "Key"];
                    if (!C || !C.touch)
                        if (
                            (e < q ? (e = q) : e > q + K && (e = q + K),
                                g < r ? (g = r) : g > r + A && (g = r + A),
                                (this.hasDragged = Math.sqrt(
                                    Math.pow(v - e, 2) + Math.pow(c - g, 2)
                                )),
                                10 < this.hasDragged)
                        ) {
                            var R = a.isInsidePlot(v - q, c - r);
                            a.hasCartesianSeries &&
                                (this.zoomX || this.zoomY) &&
                                R &&
                                !x &&
                                !C &&
                                ((this.selectionMarker = C = a.renderer
                                        .rect(q, r, h ? 1 : K, d ? 1 : A, 0)
                                        .attr({ class: "highcharts-selection-marker", zIndex: 7 })
                                        .add()),
                                    a.styledMode ||
                                    C.attr({
                                        fill: b.selectionMarkerFill ||
                                            B("#335cad").setOpacity(0.25).get(),
                                    }));
                            C &&
                                h &&
                                ((e -= v),
                                    C.attr({ width: Math.abs(e), x: (0 < e ? 0 : e) + v }));
                            C &&
                                d &&
                                ((e = g - c),
                                    C.attr({ height: Math.abs(e), y: (0 < e ? 0 : e) + c }));
                            R && !C && l && a.pan(f, b.panning);
                        }
                };
                g.prototype.dragStart = function(f) {
                    var a = this.chart;
                    a.mouseIsDown = f.type;
                    a.cancelClick = !1;
                    a.mouseDownX = this.mouseDownX = f.chartX;
                    a.mouseDownY = this.mouseDownY = f.chartY;
                };
                g.prototype.drop = function(f) {
                    var a = this,
                        b = this.chart,
                        e = this.hasPinched;
                    if (this.selectionMarker) {
                        var g = { originalEvent: f, xAxis: [], yAxis: [] },
                            h = this.selectionMarker,
                            m = h.attr ? h.attr("x") : h.x,
                            q = h.attr ? h.attr("y") : h.y,
                            P = h.attr ? h.attr("width") : h.width,
                            K = h.attr ? h.attr("height") : h.height,
                            A;
                        if (this.hasDragged || e)
                            b.axes.forEach(function(b) {
                                if (
                                    b.zoomEnabled &&
                                    O(b.min) &&
                                    (e || a[{ xAxis: "zoomX", yAxis: "zoomY" }[b.coll]]) &&
                                    r(m) &&
                                    r(q)
                                ) {
                                    var p = b.horiz,
                                        c = "touchend" === f.type ? b.minPixelPadding : 0,
                                        l = b.toValue((p ? m : q) + c);
                                    p = b.toValue((p ? m + P : q + K) - c);
                                    g[b.coll].push({
                                        axis: b,
                                        min: Math.min(l, p),
                                        max: Math.max(l, p),
                                    });
                                    A = !0;
                                }
                            }),
                            A &&
                            w(b, "selection", g, function(a) {
                                b.zoom(u(a, e ? { animation: !1 } : null));
                            });
                        r(b.index) &&
                            (this.selectionMarker = this.selectionMarker.destroy());
                        e && this.scaleGroups();
                    }
                    b &&
                        r(b.index) &&
                        (d(b.container, { cursor: b._cursor }),
                            (b.cancelClick = 10 < this.hasDragged),
                            (b.mouseIsDown = this.hasDragged = this.hasPinched = !1),
                            (this.pinchDown = []));
                };
                g.prototype.findNearestKDPoint = function(f, a, b) {
                    var e = this.chart,
                        p = e.hoverPoint;
                    e = e.tooltip;
                    if (p && e && e.isStickyOnContact()) return p;
                    var g;
                    f.forEach(function(e) {
                        var f = !(e.noSharedTooltip && a) &&
                            0 > e.options.findNearestPointBy.indexOf("y");
                        e = e.searchPoint(b, f);
                        if ((f = m(e, !0)) && !(f = !m(g, !0))) {
                            f = g.distX - e.distX;
                            var p = g.dist - e.dist,
                                h =
                                (e.series.group && e.series.group.zIndex) -
                                (g.series.group && g.series.group.zIndex);
                            f =
                                0 <
                                (0 !== f && a ?
                                    f :
                                    0 !== p ?
                                    p :
                                    0 !== h ?
                                    h :
                                    g.series.index > e.series.index ?
                                    -1 :
                                    1);
                        }
                        f && (g = e);
                    });
                    return g;
                };
                g.prototype.getChartCoordinatesFromPoint = function(f, a) {
                    var b = f.series,
                        e = b.xAxis;
                    b = b.yAxis;
                    var g = h(f.clientX, f.plotX),
                        d = f.shapeArgs;
                    if (e && b)
                        return a ?
                            { chartX: e.len + e.pos - g, chartY: b.len + b.pos - f.plotY } :
                            { chartX: g + e.pos, chartY: f.plotY + b.pos };
                    if (d && d.x && d.y) return { chartX: d.x, chartY: d.y };
                };
                g.prototype.getChartPosition = function() {
                    return (
                        this.chartPosition || (this.chartPosition = q(this.chart.container))
                    );
                };
                g.prototype.getCoordinates = function(f) {
                    var a = { xAxis: [], yAxis: [] };
                    this.chart.axes.forEach(function(b) {
                        a[b.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: b,
                            value: b.toValue(f[b.horiz ? "chartX" : "chartY"]),
                        });
                    });
                    return a;
                };
                g.prototype.getHoverData = function(f, a, b, e, g, d) {
                    var p,
                        E = [];
                    e = !(!e || !f);
                    var q = a && !a.stickyTracking,
                        H = {
                            chartX: d ? d.chartX : void 0,
                            chartY: d ? d.chartY : void 0,
                            shared: g,
                        };
                    w(this, "beforeGetHoverData", H);
                    q = q ?
                        [a] :
                        b.filter(function(a) {
                            return H.filter ?
                                H.filter(a) :
                                a.visible &&
                                !(!g && a.directTouch) &&
                                h(a.options.enableMouseTracking, !0) &&
                                a.stickyTracking;
                        });
                    a = (p = e || !d ? f : this.findNearestKDPoint(q, g, d)) && p.series;
                    p &&
                        (g && !a.noSharedTooltip ?
                            ((q = b.filter(function(a) {
                                    return H.filter ?
                                        H.filter(a) :
                                        a.visible &&
                                        !(!g && a.directTouch) &&
                                        h(a.options.enableMouseTracking, !0) &&
                                        !a.noSharedTooltip;
                                })),
                                q.forEach(function(a) {
                                    var e = F(a.points, function(a) {
                                        return a.x === p.x && !a.isNull;
                                    });
                                    m(e) &&
                                        (a.chart.isBoosting && (e = a.getPoint(e)), E.push(e));
                                })) :
                            E.push(p));
                    H = { hoverPoint: p };
                    w(this, "afterGetHoverData", H);
                    return { hoverPoint: H.hoverPoint, hoverSeries: a, hoverPoints: E };
                };
                g.prototype.getPointFromEvent = function(f) {
                    f = f.target;
                    for (var a; f && !a;)(a = f.point), (f = f.parentNode);
                    return a;
                };
                g.prototype.onTrackerMouseOut = function(f) {
                    f = f.relatedTarget || f.toElement;
                    var a = this.chart.hoverSeries;
                    this.isDirectTouch = !1;
                    if (!(!a ||
                            !f ||
                            a.stickyTracking ||
                            this.inClass(f, "highcharts-tooltip") ||
                            (this.inClass(f, "highcharts-series-" + a.index) &&
                                this.inClass(f, "highcharts-tracker"))
                        ))
                        a.onMouseOut();
                };
                g.prototype.inClass = function(f, a) {
                    for (var b; f;) {
                        if ((b = G(f, "class"))) {
                            if (-1 !== b.indexOf(a)) return !0;
                            if (-1 !== b.indexOf("highcharts-container")) return !1;
                        }
                        f = f.parentNode;
                    }
                };
                g.prototype.init = function(b, a) {
                    this.options = a;
                    this.chart = b;
                    this.runChartClick = a.chart.events && !!a.chart.events.click;
                    this.pinchDown = [];
                    this.lastValidTouch = {};
                    I &&
                        ((b.tooltip = new I(b, a.tooltip)),
                            (this.followTouchMove = h(a.tooltip.followTouchMove, !0)));
                    this.setDOMEvents();
                };
                g.prototype.normalize = function(b, a) {
                    var f = b.touches,
                        e = f ?
                        f.length ?
                        f.item(0) :
                        h(f.changedTouches, b.changedTouches)[0] :
                        b;
                    a || (a = this.getChartPosition());
                    f = e.pageX - a.left;
                    a = e.pageY - a.top;
                    if ((e = this.chart.containerScaling))
                        (f /= e.scaleX), (a /= e.scaleY);
                    return u(b, { chartX: Math.round(f), chartY: Math.round(a) });
                };
                g.prototype.onContainerClick = function(b) {
                    var a = this.chart,
                        f = a.hoverPoint;
                    b = this.normalize(b);
                    var e = a.plotLeft,
                        g = a.plotTop;
                    a.cancelClick ||
                        (f && this.inClass(b.target, "highcharts-tracker") ?
                            (w(f.series, "click", u(b, { point: f })),
                                a.hoverPoint && f.firePointEvent("click", b)) :
                            (u(b, this.getCoordinates(b)),
                                a.isInsidePlot(b.chartX - e, b.chartY - g) &&
                                w(a, "click", b)));
                };
                g.prototype.onContainerMouseDown = function(b) {
                    var a = 1 === ((b.buttons || b.button) & 1);
                    b = this.normalize(b);
                    if (t.isFirefox && 0 !== b.button) this.onContainerMouseMove(b);
                    if ("undefined" === typeof b.button || a)
                        this.zoomOption(b),
                        a && b.preventDefault && b.preventDefault(),
                        this.dragStart(b);
                };
                g.prototype.onContainerMouseLeave = function(b) {
                    var a = M[h(t.hoverChartIndex, -1)],
                        f = this.chart.tooltip;
                    b = this.normalize(b);
                    a &&
                        (b.relatedTarget || b.toElement) &&
                        (a.pointer.reset(), (a.pointer.chartPosition = void 0));
                    f && !f.isHidden && this.reset();
                };
                g.prototype.onContainerMouseEnter = function(b) {
                    delete this.chartPosition;
                };
                g.prototype.onContainerMouseMove = function(b) {
                    var a = this.chart;
                    b = this.normalize(b);
                    this.setHoverChartIndex();
                    b.preventDefault || (b.returnValue = !1);
                    "mousedown" === a.mouseIsDown && this.drag(b);
                    a.openMenu ||
                        (!this.inClass(b.target, "highcharts-tracker") &&
                            !a.isInsidePlot(b.chartX - a.plotLeft, b.chartY - a.plotTop)) ||
                        this.runPointActions(b);
                };
                g.prototype.onDocumentTouchEnd = function(b) {
                    M[t.hoverChartIndex] && M[t.hoverChartIndex].pointer.drop(b);
                };
                g.prototype.onContainerTouchMove = function(b) {
                    this.touch(b);
                };
                g.prototype.onContainerTouchStart = function(b) {
                    this.zoomOption(b);
                    this.touch(b, !0);
                };
                g.prototype.onDocumentMouseMove = function(b) {
                    var a = this.chart,
                        f = this.chartPosition;
                    b = this.normalize(b, f);
                    var e = a.tooltip;
                    !f ||
                        (e && e.isStickyOnContact()) ||
                        a.isInsidePlot(b.chartX - a.plotLeft, b.chartY - a.plotTop) ||
                        this.inClass(b.target, "highcharts-tracker") ||
                        this.reset();
                };
                g.prototype.onDocumentMouseUp = function(b) {
                    var a = M[h(t.hoverChartIndex, -1)];
                    a && a.pointer.drop(b);
                };
                g.prototype.pinch = function(b) {
                    var a = this,
                        f = a.chart,
                        e = a.pinchDown,
                        g = b.touches || [],
                        d = g.length,
                        m = a.lastValidTouch,
                        q = a.hasZoom,
                        r = a.selectionMarker,
                        K = {},
                        A =
                        1 === d &&
                        ((a.inClass(b.target, "highcharts-tracker") &&
                                f.runTrackerClick) ||
                            a.runChartClick),
                        C = {};
                    1 < d && (a.initiated = !0);
                    q && a.initiated && !A && !1 !== b.cancelable && b.preventDefault();
                    [].map.call(g, function(e) {
                        return a.normalize(e);
                    });
                    "touchstart" === b.type ?
                        ([].forEach.call(g, function(a, c) {
                                e[c] = { chartX: a.chartX, chartY: a.chartY };
                            }),
                            (m.x = [e[0].chartX, e[1] && e[1].chartX]),
                            (m.y = [e[0].chartY, e[1] && e[1].chartY]),
                            f.axes.forEach(function(a) {
                                if (a.zoomEnabled) {
                                    var c = f.bounds[a.horiz ? "h" : "v"],
                                        e = a.minPixelPadding,
                                        b = a.toPixels(
                                            Math.min(h(a.options.min, a.dataMin), a.dataMin)
                                        ),
                                        p = a.toPixels(
                                            Math.max(h(a.options.max, a.dataMax), a.dataMax)
                                        ),
                                        g = Math.max(b, p);
                                    c.min = Math.min(a.pos, Math.min(b, p) - e);
                                    c.max = Math.max(a.pos + a.len, g + e);
                                }
                            }),
                            (a.res = !0)) :
                        a.followTouchMove && 1 === d ?
                        this.runPointActions(a.normalize(b)) :
                        e.length &&
                        (r ||
                            (a.selectionMarker = r = u({ destroy: n, touch: !0 },
                                f.plotBox
                            )),
                            a.pinchTranslate(e, g, K, r, C, m),
                            (a.hasPinched = q),
                            a.scaleGroups(K, C),
                            a.res && ((a.res = !1), this.reset(!1, 0)));
                };
                g.prototype.pinchTranslate = function(b, a, p, e, g, h) {
                    this.zoomHor && this.pinchTranslateDirection(!0, b, a, p, e, g, h);
                    this.zoomVert && this.pinchTranslateDirection(!1, b, a, p, e, g, h);
                };
                g.prototype.pinchTranslateDirection = function(
                    b,
                    a,
                    p,
                    e,
                    g,
                    h,
                    d,
                    m
                ) {
                    var f = this.chart,
                        y = b ? "x" : "y",
                        A = b ? "X" : "Y",
                        E = "chart" + A,
                        v = b ? "width" : "height",
                        c = f["plot" + (b ? "Left" : "Top")],
                        l,
                        x,
                        q = m || 1,
                        H = f.inverted,
                        r = f.bounds[b ? "h" : "v"],
                        N = 1 === a.length,
                        w = a[0][E],
                        u = p[0][E],
                        n = !N && a[1][E],
                        k = !N && p[1][E];
                    p = function() {
                        "number" === typeof k &&
                            20 < Math.abs(w - n) &&
                            (q = m || Math.abs(u - k) / Math.abs(w - n));
                        x = (c - u) / q + w;
                        l = f["plot" + (b ? "Width" : "Height")] / q;
                    };
                    p();
                    a = x;
                    if (a < r.min) {
                        a = r.min;
                        var F = !0;
                    } else a + l > r.max && ((a = r.max - l), (F = !0));
                    F
                        ?
                        ((u -= 0.8 * (u - d[y][0])),
                            "number" === typeof k && (k -= 0.8 * (k - d[y][1])),
                            p()) :
                        (d[y] = [u, k]);
                    H || ((h[y] = x - c), (h[v] = l));
                    h = H ? 1 / q : q;
                    g[v] = l;
                    g[y] = a;
                    e[H ? (b ? "scaleY" : "scaleX") : "scale" + A] = q;
                    e["translate" + A] = h * c + (u - h * w);
                };
                g.prototype.reset = function(f, a) {
                    var p = this.chart,
                        e = p.hoverSeries,
                        g = p.hoverPoint,
                        h = p.hoverPoints,
                        d = p.tooltip,
                        m = d && d.shared ? h : g;
                    f &&
                        m &&
                        b(m).forEach(function(a) {
                            a.series.isCartesian &&
                                "undefined" === typeof a.plotX &&
                                (f = !1);
                        });
                    if (f)
                        d &&
                        m &&
                        b(m).length &&
                        (d.refresh(m),
                            d.shared && h ?
                            h.forEach(function(a) {
                                a.setState(a.state, !0);
                                a.series.isCartesian &&
                                    (a.series.xAxis.crosshair &&
                                        a.series.xAxis.drawCrosshair(null, a),
                                        a.series.yAxis.crosshair &&
                                        a.series.yAxis.drawCrosshair(null, a));
                            }) :
                            g &&
                            (g.setState(g.state, !0),
                                p.axes.forEach(function(a) {
                                    a.crosshair &&
                                        g.series[a.coll] === a &&
                                        a.drawCrosshair(null, g);
                                })));
                    else {
                        if (g) g.onMouseOut();
                        h &&
                            h.forEach(function(a) {
                                a.setState();
                            });
                        if (e) e.onMouseOut();
                        d && d.hide(a);
                        this.unDocMouseMove &&
                            (this.unDocMouseMove = this.unDocMouseMove());
                        p.axes.forEach(function(a) {
                            a.hideCrosshair();
                        });
                        this.hoverX = p.hoverPoints = p.hoverPoint = null;
                    }
                };
                g.prototype.runPointActions = function(b, a) {
                    var f = this.chart,
                        e = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0,
                        g = e ? e.shared : !1,
                        d = a || f.hoverPoint,
                        m = (d && d.series) || f.hoverSeries;
                    m = this.getHoverData(
                        d,
                        m,
                        f.series,
                        (!b || "touchmove" !== b.type) &&
                        (!!a || (m && m.directTouch && this.isDirectTouch)),
                        g,
                        b
                    );
                    d = m.hoverPoint;
                    var q = m.hoverPoints;
                    a = (m = m.hoverSeries) && m.tooltipOptions.followPointer;
                    g = g && m && !m.noSharedTooltip;
                    if (d && (d !== f.hoverPoint || (e && e.isHidden))) {
                        (f.hoverPoints || []).forEach(function(a) {
                            -1 === q.indexOf(a) && a.setState();
                        });
                        if (f.hoverSeries !== m) m.onMouseOver();
                        this.applyInactiveState(q);
                        (q || []).forEach(function(a) {
                            a.setState("hover");
                        });
                        f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
                        if (!d.series) return;
                        f.hoverPoints = q;
                        f.hoverPoint = d;
                        d.firePointEvent("mouseOver");
                        e && e.refresh(g ? q : d, b);
                    } else
                        a &&
                        e &&
                        !e.isHidden &&
                        ((d = e.getAnchor([{}], b)),
                            e.updatePosition({ plotX: d[0], plotY: d[1] }));
                    this.unDocMouseMove ||
                        (this.unDocMouseMove = z(
                            f.container.ownerDocument,
                            "mousemove",
                            function(a) {
                                var e = M[t.hoverChartIndex];
                                if (e) e.pointer.onDocumentMouseMove(a);
                            }
                        ));
                    f.axes.forEach(function(a) {
                        var e = h((a.crosshair || {}).snap, !0),
                            g;
                        e &&
                            (((g = f.hoverPoint) && g.series[a.coll] === a) ||
                                (g = F(q, function(e) {
                                    return e.series[a.coll] === a;
                                })));
                        g || !e ? a.drawCrosshair(b, g) : a.hideCrosshair();
                    });
                };
                g.prototype.scaleGroups = function(b, a) {
                    var f = this.chart,
                        e;
                    f.series.forEach(function(g) {
                        e = b || g.getPlotBox();
                        g.xAxis &&
                            g.xAxis.zoomEnabled &&
                            g.group &&
                            (g.group.attr(e),
                                g.markerGroup &&
                                (g.markerGroup.attr(e),
                                    g.markerGroup.clip(a ? f.clipRect : null)),
                                g.dataLabelsGroup && g.dataLabelsGroup.attr(e));
                    });
                    f.clipRect.attr(a || f.clipBox);
                };
                g.prototype.setDOMEvents = function() {
                    var b = this.chart.container,
                        a = b.ownerDocument;
                    b.onmousedown = this.onContainerMouseDown.bind(this);
                    b.onmousemove = this.onContainerMouseMove.bind(this);
                    b.onclick = this.onContainerClick.bind(this);
                    this.unbindContainerMouseEnter = z(
                        b,
                        "mouseenter",
                        this.onContainerMouseEnter.bind(this)
                    );
                    this.unbindContainerMouseLeave = z(
                        b,
                        "mouseleave",
                        this.onContainerMouseLeave.bind(this)
                    );
                    t.unbindDocumentMouseUp ||
                        (t.unbindDocumentMouseUp = z(
                            a,
                            "mouseup",
                            this.onDocumentMouseUp.bind(this)
                        ));
                    t.hasTouch &&
                        (z(b, "touchstart", this.onContainerTouchStart.bind(this)),
                            z(b, "touchmove", this.onContainerTouchMove.bind(this)),
                            t.unbindDocumentTouchEnd ||
                            (t.unbindDocumentTouchEnd = z(
                                a,
                                "touchend",
                                this.onDocumentTouchEnd.bind(this)
                            )));
                };
                g.prototype.setHoverChartIndex = function() {
                    var b = this.chart,
                        a = t.charts[h(t.hoverChartIndex, -1)];
                    if (a && a !== b)
                        a.pointer.onContainerMouseLeave({ relatedTarget: !0 });
                    (a && a.mouseIsDown) || (t.hoverChartIndex = b.index);
                };
                g.prototype.touch = function(b, a) {
                    var f = this.chart,
                        e;
                    this.setHoverChartIndex();
                    if (1 === b.touches.length)
                        if (
                            ((b = this.normalize(b)),
                                (e = f.isInsidePlot(
                                    b.chartX - f.plotLeft,
                                    b.chartY - f.plotTop
                                )) && !f.openMenu)
                        ) {
                            a && this.runPointActions(b);
                            if ("touchmove" === b.type) {
                                a = this.pinchDown;
                                var g = a[0] ?
                                    4 <=
                                    Math.sqrt(
                                        Math.pow(a[0].chartX - b.chartX, 2) +
                                        Math.pow(a[0].chartY - b.chartY, 2)
                                    ) :
                                    !1;
                            }
                            h(g, !0) && this.pinch(b);
                        } else a && this.reset();
                    else 2 === b.touches.length && this.pinch(b);
                };
                g.prototype.zoomOption = function(b) {
                    var a = this.chart,
                        f = a.options.chart,
                        e = f.zoomType || "";
                    a = a.inverted;
                    /touch/.test(b.type) && (e = h(f.pinchType, e));
                    this.zoomX = b = /x/.test(e);
                    this.zoomY = e = /y/.test(e);
                    this.zoomHor = (b && !a) || (e && a);
                    this.zoomVert = (e && !a) || (b && a);
                    this.hasZoom = b || e;
                };
                return g;
            })();
            return (t.Pointer = k);
        }
    );
    Q(
        k,
        "Core/MSPointer.js", [k["Core/Globals.js"], k["Core/Pointer.js"], k["Core/Utilities.js"]],
        function(k, t, I) {
            function B() {
                var d = [];
                d.item = function(d) {
                    return this[d];
                };
                u(w, function(m) {
                    d.push({ pageX: m.pageX, pageY: m.pageY, target: m.target });
                });
                return d;
            }

            function J(d, r, q, h) {
                ("touch" !== d.pointerType &&
                    d.pointerType !== d.MSPOINTER_TYPE_TOUCH) ||
                !n[k.hoverChartIndex] ||
                    (h(d),
                        (h = n[k.hoverChartIndex].pointer),
                        h[r]({
                            type: q,
                            target: d.currentTarget,
                            preventDefault: G,
                            touches: B(),
                        }));
            }
            var M =
                (this && this.__extends) ||
                (function() {
                    var d = function(m, q) {
                        d =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] }
                                instanceof Array &&
                                function(h, b) {
                                    h.__proto__ = b;
                                }) ||
                            function(h, b) {
                                for (var g in b) b.hasOwnProperty(g) && (h[g] = b[g]);
                            };
                        return d(m, q);
                    };
                    return function(m, q) {
                        function h() {
                            this.constructor = m;
                        }
                        d(m, q);
                        m.prototype =
                            null === q ?
                            Object.create(q) :
                            ((h.prototype = q.prototype), new h());
                    };
                })(),
                n = k.charts,
                z = k.doc,
                G = k.noop,
                d = I.addEvent,
                O = I.css,
                u = I.objectEach,
                F = I.removeEvent,
                w = {},
                r = !!k.win.PointerEvent;
            return (function(m) {
                function u() {
                    return (null !== m && m.apply(this, arguments)) || this;
                }
                M(u, m);
                u.prototype.batchMSEvents = function(d) {
                    d(
                        this.chart.container,
                        r ? "pointerdown" : "MSPointerDown",
                        this.onContainerPointerDown
                    );
                    d(
                        this.chart.container,
                        r ? "pointermove" : "MSPointerMove",
                        this.onContainerPointerMove
                    );
                    d(z, r ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
                };
                u.prototype.destroy = function() {
                    this.batchMSEvents(F);
                    m.prototype.destroy.call(this);
                };
                u.prototype.init = function(d, h) {
                    m.prototype.init.call(this, d, h);
                    this.hasZoom &&
                        O(d.container, {
                            "-ms-touch-action": "none",
                            "touch-action": "none",
                        });
                };
                u.prototype.onContainerPointerDown = function(d) {
                    J(d, "onContainerTouchStart", "touchstart", function(h) {
                        w[h.pointerId] = {
                            pageX: h.pageX,
                            pageY: h.pageY,
                            target: h.currentTarget,
                        };
                    });
                };
                u.prototype.onContainerPointerMove = function(d) {
                    J(d, "onContainerTouchMove", "touchmove", function(h) {
                        w[h.pointerId] = { pageX: h.pageX, pageY: h.pageY };
                        w[h.pointerId].target || (w[h.pointerId].target = h.currentTarget);
                    });
                };
                u.prototype.onDocumentPointerUp = function(d) {
                    J(d, "onDocumentTouchEnd", "touchend", function(h) {
                        delete w[h.pointerId];
                    });
                };
                u.prototype.setDOMEvents = function() {
                    m.prototype.setDOMEvents.call(this);
                    (this.hasZoom || this.followTouchMove) && this.batchMSEvents(d);
                };
                return u;
            })(t);
        }
    );
    Q(
        k,
        "Core/Legend.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Globals.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I) {
            var B = k.animObject,
                J = k.setAnimation,
                M = I.addEvent,
                n = I.css,
                z = I.defined,
                G = I.discardElement,
                d = I.find,
                O = I.fireEvent,
                u = I.format,
                F = I.isNumber,
                w = I.merge,
                r = I.pick,
                m = I.relativeLength,
                L = I.stableSort,
                q = I.syncTimeout;
            k = I.wrap;
            I = t.isFirefox;
            var h = t.marginNames,
                b = t.win,
                g = (function() {
                    function b(a, b) {
                        this.allItems = [];
                        this.contentGroup = this.box = void 0;
                        this.display = !1;
                        this.group = void 0;
                        this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                        this.options = {};
                        this.padding = 0;
                        this.pages = [];
                        this.proximate = !1;
                        this.scrollGroup = void 0;
                        this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                        this.chart = a;
                        this.init(a, b);
                    }
                    b.prototype.init = function(a, b) {
                        this.chart = a;
                        this.setOptions(b);
                        b.enabled &&
                            (this.render(),
                                M(this.chart, "endResize", function() {
                                    this.legend.positionCheckboxes();
                                }),
                                this.proximate ?
                                (this.unchartrender = M(this.chart, "render", function() {
                                    this.legend.proximatePositions();
                                    this.legend.positionItems();
                                })) :
                                this.unchartrender && this.unchartrender());
                    };
                    b.prototype.setOptions = function(a) {
                        var b = r(a.padding, 8);
                        this.options = a;
                        this.chart.styledMode ||
                            ((this.itemStyle = a.itemStyle),
                                (this.itemHiddenStyle = w(this.itemStyle, a.itemHiddenStyle)));
                        this.itemMarginTop = a.itemMarginTop || 0;
                        this.itemMarginBottom = a.itemMarginBottom || 0;
                        this.padding = b;
                        this.initialItemY = b - 5;
                        this.symbolWidth = r(a.symbolWidth, 16);
                        this.pages = [];
                        this.proximate = "proximate" === a.layout && !this.chart.inverted;
                        this.baseline = void 0;
                    };
                    b.prototype.update = function(a, b) {
                        var e = this.chart;
                        this.setOptions(w(!0, this.options, a));
                        this.destroy();
                        e.isDirtyLegend = e.isDirtyBox = !0;
                        r(b, !0) && e.redraw();
                        O(this, "afterUpdate");
                    };
                    b.prototype.colorizeItem = function(a, b) {
                        a.legendGroup[b ? "removeClass" : "addClass"](
                            "highcharts-legend-item-hidden"
                        );
                        if (!this.chart.styledMode) {
                            var e = this.options,
                                f = a.legendItem,
                                g = a.legendLine,
                                p = a.legendSymbol,
                                h = this.itemHiddenStyle.color;
                            e = b ? e.itemStyle.color : h;
                            var d = b ? a.color || h : h,
                                m = a.options && a.options.marker,
                                A = { fill: d };
                            f && f.css({ fill: e, color: e });
                            g && g.attr({ stroke: d });
                            p &&
                                (m &&
                                    p.isMarker &&
                                    ((A = a.pointAttribs()), b || (A.stroke = A.fill = h)),
                                    p.attr(A));
                        }
                        O(this, "afterColorizeItem", { item: a, visible: b });
                    };
                    b.prototype.positionItems = function() {
                        this.allItems.forEach(this.positionItem, this);
                        this.chart.isResizing || this.positionCheckboxes();
                    };
                    b.prototype.positionItem = function(a) {
                        var b = this,
                            e = this.options,
                            f = e.symbolPadding,
                            g = !e.rtl,
                            h = a._legendItemPos;
                        e = h[0];
                        h = h[1];
                        var d = a.checkbox,
                            m = a.legendGroup;
                        m &&
                            m.element &&
                            ((f = {
                                    translateX: g ? e : this.legendWidth - e - 2 * f - 4,
                                    translateY: h,
                                }),
                                (g = function() {
                                    O(b, "afterPositionItem", { item: a });
                                }),
                                z(m.translateY) ? m.animate(f, void 0, g) : (m.attr(f), g()));
                        d && ((d.x = e), (d.y = h));
                    };
                    b.prototype.destroyItem = function(a) {
                        var b = a.checkbox;
                        ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(
                            function(e) {
                                a[e] && (a[e] = a[e].destroy());
                            }
                        );
                        b && G(a.checkbox);
                    };
                    b.prototype.destroy = function() {
                        function a(a) {
                            this[a] && (this[a] = this[a].destroy());
                        }
                        this.getAllItems().forEach(function(b) {
                            ["legendItem", "legendGroup"].forEach(a, b);
                        });
                        "clipRect up down pager nav box title group"
                        .split(" ")
                            .forEach(a, this);
                        this.display = null;
                    };
                    b.prototype.positionCheckboxes = function() {
                        var a = this.group && this.group.alignAttr,
                            b = this.clipHeight || this.legendHeight,
                            e = this.titleHeight;
                        if (a) {
                            var f = a.translateY;
                            this.allItems.forEach(function(g) {
                                var p = g.checkbox;
                                if (p) {
                                    var h = f + e + p.y + (this.scrollOffset || 0) + 3;
                                    n(p, {
                                        left: a.translateX + g.checkboxOffset + p.x - 20 + "px",
                                        top: h + "px",
                                        display: this.proximate || (h > f - 6 && h < f + b - 6) ?
                                            "" :
                                            "none",
                                    });
                                }
                            }, this);
                        }
                    };
                    b.prototype.renderTitle = function() {
                        var a = this.options,
                            b = this.padding,
                            e = a.title,
                            f = 0;
                        e.text &&
                            (this.title ||
                                ((this.title = this.chart.renderer
                                        .label(
                                            e.text,
                                            b - 3,
                                            b - 4,
                                            null,
                                            null,
                                            null,
                                            a.useHTML,
                                            null,
                                            "legend-title"
                                        )
                                        .attr({ zIndex: 1 })),
                                    this.chart.styledMode || this.title.css(e.style),
                                    this.title.add(this.group)),
                                e.width || this.title.css({ width: this.maxLegendWidth + "px" }),
                                (a = this.title.getBBox()),
                                (f = a.height),
                                (this.offsetWidth = a.width),
                                this.contentGroup.attr({ translateY: f }));
                        this.titleHeight = f;
                    };
                    b.prototype.setText = function(a) {
                        var b = this.options;
                        a.legendItem.attr({
                            text: b.labelFormat ?
                                u(b.labelFormat, a, this.chart) :
                                b.labelFormatter.call(a),
                        });
                    };
                    b.prototype.renderItem = function(a) {
                        var b = this.chart,
                            e = b.renderer,
                            f = this.options,
                            g = this.symbolWidth,
                            h = f.symbolPadding,
                            d = this.itemStyle,
                            m = this.itemHiddenStyle,
                            q = "horizontal" === f.layout ? r(f.itemDistance, 20) : 0,
                            A = !f.rtl,
                            C = a.legendItem,
                            v = !a.series,
                            c = !v && a.series.drawLegendSymbol ? a.series : a,
                            l = c.options;
                        l = this.createCheckboxForItem && l && l.showCheckbox;
                        q = g + h + q + (l ? 20 : 0);
                        var x = f.useHTML,
                            u = a.options.className;
                        C ||
                            ((a.legendGroup = e
                                    .g("legend-item")
                                    .addClass(
                                        "highcharts-" +
                                        c.type +
                                        "-series highcharts-color-" +
                                        a.colorIndex +
                                        (u ? " " + u : "") +
                                        (v ? " highcharts-series-" + a.index : "")
                                    )
                                    .attr({ zIndex: 1 })
                                    .add(this.scrollGroup)),
                                (a.legendItem = C = e.text(
                                    "",
                                    A ? g + h : -h,
                                    this.baseline || 0,
                                    x
                                )),
                                b.styledMode || C.css(w(a.visible ? d : m)),
                                C.attr({ align: A ? "left" : "right", zIndex: 2 }).add(
                                    a.legendGroup
                                ),
                                this.baseline ||
                                ((this.fontMetrics = e.fontMetrics(
                                        b.styledMode ? 12 : d.fontSize,
                                        C
                                    )),
                                    (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
                                    C.attr("y", this.baseline)),
                                (this.symbolHeight = f.symbolHeight || this.fontMetrics.f),
                                c.drawLegendSymbol(this, a),
                                this.setItemEvents && this.setItemEvents(a, C, x));
                        l &&
                            !a.checkbox &&
                            this.createCheckboxForItem &&
                            this.createCheckboxForItem(a);
                        this.colorizeItem(a, a.visible);
                        (!b.styledMode && d.width) ||
                        C.css({
                            width:
                                (f.itemWidth || this.widthOption || b.spacingBox.width) -
                                q +
                                "px",
                        });
                        this.setText(a);
                        b = C.getBBox();
                        a.itemWidth = a.checkboxOffset =
                            f.itemWidth || a.legendItemWidth || b.width + q;
                        this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                        this.totalItemWidth += a.itemWidth;
                        this.itemHeight = a.itemHeight = Math.round(
                            a.legendItemHeight || b.height || this.symbolHeight
                        );
                    };
                    b.prototype.layoutItem = function(a) {
                        var b = this.options,
                            e = this.padding,
                            f = "horizontal" === b.layout,
                            g = a.itemHeight,
                            h = this.itemMarginBottom,
                            d = this.itemMarginTop,
                            m = f ? r(b.itemDistance, 20) : 0,
                            q = this.maxLegendWidth;
                        b =
                            b.alignColumns && this.totalItemWidth > q ?
                            this.maxItemWidth :
                            a.itemWidth;
                        f &&
                            this.itemX - e + b > q &&
                            ((this.itemX = e),
                                this.lastLineHeight &&
                                (this.itemY += d + this.lastLineHeight + h),
                                (this.lastLineHeight = 0));
                        this.lastItemY = d + this.itemY + h;
                        this.lastLineHeight = Math.max(g, this.lastLineHeight);
                        a._legendItemPos = [this.itemX, this.itemY];
                        f
                            ?
                            (this.itemX += b) :
                            ((this.itemY += d + g + h), (this.lastLineHeight = g));
                        this.offsetWidth =
                            this.widthOption ||
                            Math.max(
                                (f ? this.itemX - e - (a.checkbox ? 0 : m) : b) + e,
                                this.offsetWidth
                            );
                    };
                    b.prototype.getAllItems = function() {
                        var a = [];
                        this.chart.series.forEach(function(b) {
                            var e = b && b.options;
                            b &&
                                r(e.showInLegend, z(e.linkedTo) ? !1 : void 0, !0) &&
                                (a = a.concat(
                                    b.legendItems || ("point" === e.legendType ? b.data : b)
                                ));
                        });
                        O(this, "afterGetAllItems", { allItems: a });
                        return a;
                    };
                    b.prototype.getAlignment = function() {
                        var a = this.options;
                        return this.proximate ?
                            a.align.charAt(0) + "tv" :
                            a.floating ?
                            "" :
                            a.align.charAt(0) +
                            a.verticalAlign.charAt(0) +
                            a.layout.charAt(0);
                    };
                    b.prototype.adjustMargins = function(a, b) {
                        var e = this.chart,
                            f = this.options,
                            g = this.getAlignment();
                        g && [
                            /(lth|ct|rth)/,
                            /(rtv|rm|rbv)/,
                            /(rbh|cb|lbh)/,
                            /(lbv|lm|ltv)/,
                        ].forEach(function(p, d) {
                            p.test(g) &&
                                !z(a[d]) &&
                                (e[h[d]] = Math.max(
                                    e[h[d]],
                                    e.legend[(d + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][d] * f[d % 2 ? "x" : "y"] +
                                    r(f.margin, 12) +
                                    b[d] +
                                    (e.titleOffset[d] || 0)
                                ));
                        });
                    };
                    b.prototype.proximatePositions = function() {
                        var a = this.chart,
                            b = [],
                            e = "left" === this.options.align;
                        this.allItems.forEach(function(f) {
                            var g;
                            var p = e;
                            if (f.yAxis) {
                                f.xAxis.options.reversed && (p = !p);
                                f.points &&
                                    (g = d(
                                        p ? f.points : f.points.slice(0).reverse(),
                                        function(a) {
                                            return F(a.plotY);
                                        }
                                    ));
                                p =
                                    this.itemMarginTop +
                                    f.legendItem.getBBox().height +
                                    this.itemMarginBottom;
                                var h = f.yAxis.top - a.plotTop;
                                f.visible ?
                                    ((g = g ? g.plotY : f.yAxis.height), (g += h - 0.3 * p)) :
                                    (g = h + f.yAxis.height);
                                b.push({ target: g, size: p, item: f });
                            }
                        }, this);
                        t.distribute(b, a.plotHeight);
                        b.forEach(function(e) {
                            e.item._legendItemPos[1] = a.plotTop - a.spacing[0] + e.pos;
                        });
                    };
                    b.prototype.render = function() {
                        var a = this.chart,
                            b = a.renderer,
                            e = this.group,
                            f = this.box,
                            g = this.options,
                            h = this.padding;
                        this.itemX = h;
                        this.itemY = this.initialItemY;
                        this.lastItemY = this.offsetWidth = 0;
                        this.widthOption = m(g.width, a.spacingBox.width - h);
                        var d = a.spacingBox.width - 2 * h - g.x; -
                        1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) &&
                            (d /= 2);
                        this.maxLegendWidth = this.widthOption || d;
                        e ||
                            ((this.group = e = b.g("legend").attr({ zIndex: 7 }).add()),
                                (this.contentGroup = b.g().attr({ zIndex: 1 }).add(e)),
                                (this.scrollGroup = b.g().add(this.contentGroup)));
                        this.renderTitle();
                        var q = this.getAllItems();
                        L(q, function(a, e) {
                            return (
                                ((a.options && a.options.legendIndex) || 0) -
                                ((e.options && e.options.legendIndex) || 0)
                            );
                        });
                        g.reversed && q.reverse();
                        this.allItems = q;
                        this.display = d = !!q.length;
                        this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                        q.forEach(this.renderItem, this);
                        q.forEach(this.layoutItem, this);
                        q = (this.widthOption || this.offsetWidth) + h;
                        var r = this.lastItemY + this.lastLineHeight + this.titleHeight;
                        r = this.handleOverflow(r);
                        r += h;
                        f ||
                            ((this.box = f = b
                                    .rect()
                                    .addClass("highcharts-legend-box")
                                    .attr({ r: g.borderRadius })
                                    .add(e)),
                                (f.isNew = !0));
                        a.styledMode ||
                            f
                            .attr({
                                stroke: g.borderColor,
                                "stroke-width": g.borderWidth || 0,
                                fill: g.backgroundColor || "none",
                            })
                            .shadow(g.shadow);
                        0 < q &&
                            0 < r &&
                            (f[f.isNew ? "attr" : "animate"](
                                    f.crisp.call({}, { x: 0, y: 0, width: q, height: r },
                                        f.strokeWidth()
                                    )
                                ),
                                (f.isNew = !1));
                        f[d ? "show" : "hide"]();
                        a.styledMode && "none" === e.getStyle("display") && (q = r = 0);
                        this.legendWidth = q;
                        this.legendHeight = r;
                        d && this.align();
                        this.proximate || this.positionItems();
                        O(this, "afterRender");
                    };
                    b.prototype.align = function(a) {
                        void 0 === a && (a = this.chart.spacingBox);
                        var b = this.chart,
                            e = this.options,
                            f = a.y;
                        /(lth|ct|rth)/.test(this.getAlignment()) && 0 < b.titleOffset[0] ?
                            (f += b.titleOffset[0]) :
                            /(lbh|cb|rbh)/.test(this.getAlignment()) &&
                            0 < b.titleOffset[2] &&
                            (f -= b.titleOffset[2]);
                        f !== a.y && (a = w(a, { y: f }));
                        this.group.align(
                            w(e, {
                                width: this.legendWidth,
                                height: this.legendHeight,
                                verticalAlign: this.proximate ? "top" : e.verticalAlign,
                            }), !0,
                            a
                        );
                    };
                    b.prototype.handleOverflow = function(a) {
                        var b = this,
                            e = this.chart,
                            f = e.renderer,
                            g = this.options,
                            h = g.y,
                            d = this.padding;
                        h = e.spacingBox.height + ("top" === g.verticalAlign ? -h : h) - d;
                        var m = g.maxHeight,
                            q,
                            A = this.clipRect,
                            C = g.navigation,
                            v = r(C.animation, !0),
                            c = C.arrowSize || 12,
                            l = this.nav,
                            x = this.pages,
                            u,
                            w = this.allItems,
                            n = function(a) {
                                "number" === typeof a
                                    ?
                                    A.attr({ height: a }) :
                                    A && ((b.clipRect = A.destroy()), b.contentGroup.clip());
                                b.contentGroup.div &&
                                    (b.contentGroup.div.style.clip = a ?
                                        "rect(" + d + "px,9999px," + (d + a) + "px,0)" :
                                        "auto");
                            },
                            k = function(a) {
                                b[a] = f
                                    .circle(0, 0, 1.3 * c)
                                    .translate(c / 2, c / 2)
                                    .add(l);
                                e.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
                                return b[a];
                            };
                        "horizontal" !== g.layout ||
                            "middle" === g.verticalAlign ||
                            g.floating ||
                            (h /= 2);
                        m && (h = Math.min(h, m));
                        x.length = 0;
                        a > h && !1 !== C.enabled ?
                            ((this.clipHeight = q = Math.max(
                                    h - 20 - this.titleHeight - d,
                                    0
                                )),
                                (this.currentPage = r(this.currentPage, 1)),
                                (this.fullHeight = a),
                                w.forEach(function(a, c) {
                                    var e = a._legendItemPos[1],
                                        b = Math.round(a.legendItem.getBBox().height),
                                        l = x.length;
                                    if (!l || (e - x[l - 1] > q && (u || e) !== x[l - 1]))
                                        x.push(u || e), l++;
                                    a.pageIx = l - 1;
                                    u && (w[c - 1].pageIx = l - 1);
                                    c === w.length - 1 &&
                                        e + b - x[l - 1] > q &&
                                        e !== u &&
                                        (x.push(e), (a.pageIx = l));
                                    e !== u && (u = e);
                                }),
                                A ||
                                ((A = b.clipRect = f.clipRect(0, d, 9999, 0)),
                                    b.contentGroup.clip(A)),
                                n(q),
                                l ||
                                ((this.nav = l = f.g().attr({ zIndex: 1 }).add(this.group)),
                                    (this.up = f.symbol("triangle", 0, 0, c, c).add(l)),
                                    k("upTracker").on("click", function() {
                                        b.scroll(-1, v);
                                    }),
                                    (this.pager = f
                                        .text("", 15, 10)
                                        .addClass("highcharts-legend-navigation")),
                                    e.styledMode || this.pager.css(C.style),
                                    this.pager.add(l),
                                    (this.down = f.symbol("triangle-down", 0, 0, c, c).add(l)),
                                    k("downTracker").on("click", function() {
                                        b.scroll(1, v);
                                    })),
                                b.scroll(0),
                                (a = h)) :
                            l &&
                            (n(),
                                (this.nav = l.destroy()),
                                this.scrollGroup.attr({ translateY: 1 }),
                                (this.clipHeight = 0));
                        return a;
                    };
                    b.prototype.scroll = function(a, b) {
                        var e = this,
                            f = this.chart,
                            g = this.pages,
                            p = g.length,
                            h = this.currentPage + a;
                        a = this.clipHeight;
                        var d = this.options.navigation,
                            m = this.pager,
                            A = this.padding;
                        h > p && (h = p);
                        0 < h &&
                            ("undefined" !== typeof b && J(b, f),
                                this.nav.attr({
                                    translateX: A,
                                    translateY: a + this.padding + 7 + this.titleHeight,
                                    visibility: "visible",
                                }), [this.up, this.upTracker].forEach(function(a) {
                                    a.attr({
                                        class: 1 === h ?
                                            "highcharts-legend-nav-inactive" :
                                            "highcharts-legend-nav-active",
                                    });
                                }),
                                m.attr({ text: h + "/" + p }), [this.down, this.downTracker].forEach(function(a) {
                                    a.attr({
                                        x: 18 + this.pager.getBBox().width,
                                        class: h === p ?
                                            "highcharts-legend-nav-inactive" :
                                            "highcharts-legend-nav-active",
                                    });
                                }, this),
                                f.styledMode ||
                                (this.up.attr({
                                        fill: 1 === h ? d.inactiveColor : d.activeColor,
                                    }),
                                    this.upTracker.css({ cursor: 1 === h ? "default" : "pointer" }),
                                    this.down.attr({
                                        fill: h === p ? d.inactiveColor : d.activeColor,
                                    }),
                                    this.downTracker.css({
                                        cursor: h === p ? "default" : "pointer",
                                    })),
                                (this.scrollOffset = -g[h - 1] + this.initialItemY),
                                this.scrollGroup.animate({ translateY: this.scrollOffset }),
                                (this.currentPage = h),
                                this.positionCheckboxes(),
                                (b = B(r(b, f.renderer.globalAnimation, !0))),
                                q(function() {
                                    O(e, "afterScroll", { currentPage: h });
                                }, b.duration));
                    };
                    return b;
                })();
            (/Trident\/7\.0/.test(b.navigator && b.navigator.userAgent) || I) &&
            k(g.prototype, "positionItem", function(b, a) {
                var f = this,
                    e = function() {
                        a._legendItemPos && b.call(f, a);
                    };
                e();
                f.bubbleLegend || setTimeout(e);
            });
            t.Legend = g;
            return t.Legend;
        }
    );
    Q(
        k,
        "Core/Series/Point.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Globals.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I) {
            var B = k.animObject,
                J = I.defined,
                M = I.erase,
                n = I.extend,
                z = I.fireEvent,
                G = I.format,
                d = I.getNestedProperty,
                O = I.isArray,
                u = I.isNumber,
                F = I.isObject,
                w = I.syncTimeout,
                r = I.pick,
                m = I.removeEvent,
                L = I.uniqueKey;
            ("");
            k = (function() {
                function q() {
                    this.colorIndex = this.category = void 0;
                    this.formatPrefix = "point";
                    this.id = void 0;
                    this.isNull = !1;
                    this.percentage = this.options = this.name = void 0;
                    this.selected = !1;
                    this.total = this.series = void 0;
                    this.visible = !0;
                    this.x = void 0;
                }
                q.prototype.animateBeforeDestroy = function() {
                    var h = this,
                        b = { x: h.startXPos, opacity: 0 },
                        g,
                        f = h.getGraphicalProps();
                    f.singular.forEach(function(a) {
                        g = "dataLabel" === a;
                        h[a] = h[a].animate(
                            g ? { x: h[a].startXPos, y: h[a].startYPos, opacity: 0 } : b
                        );
                    });
                    f.plural.forEach(function(a) {
                        h[a].forEach(function(a) {
                            a.element &&
                                a.animate(
                                    n({ x: h.startXPos },
                                        a.startYPos ? { x: a.startXPos, y: a.startYPos } : {}
                                    )
                                );
                        });
                    });
                };
                q.prototype.applyOptions = function(h, b) {
                    var g = this.series,
                        f = g.options.pointValKey || g.pointValKey;
                    h = q.prototype.optionsToObject.call(this, h);
                    n(this, h);
                    this.options = this.options ? n(this.options, h) : h;
                    h.group && delete this.group;
                    h.dataLabels && delete this.dataLabels;
                    f && (this.y = q.prototype.getNestedProperty.call(this, f));
                    this.formatPrefix = (this.isNull = r(
                            this.isValid && !this.isValid(),
                            null === this.x || !u(this.y)
                        )) ?
                        "null" :
                        "point";
                    this.selected && (this.state = "select");
                    "name" in this &&
                        "undefined" === typeof b &&
                        g.xAxis &&
                        g.xAxis.hasNames &&
                        (this.x = g.xAxis.nameToX(this));
                    "undefined" === typeof this.x &&
                        g &&
                        (this.x = "undefined" === typeof b ? g.autoIncrement(this) : b);
                    return this;
                };
                q.prototype.destroy = function() {
                    function h() {
                        if (b.graphic || b.dataLabel || b.dataLabels)
                            m(b), b.destroyElements();
                        for (e in b) b[e] = null;
                    }
                    var b = this,
                        g = b.series,
                        f = g.chart;
                    g = g.options.dataSorting;
                    var a = f.hoverPoints,
                        p = B(b.series.chart.renderer.globalAnimation),
                        e;
                    b.legendItem && f.legend.destroyItem(b);
                    a && (b.setState(), M(a, b), a.length || (f.hoverPoints = null));
                    if (b === f.hoverPoint) b.onMouseOut();
                    g && g.enabled ?
                        (this.animateBeforeDestroy(), w(h, p.duration)) :
                        h();
                    f.pointCount--;
                };
                q.prototype.destroyElements = function(h) {
                    var b = this;
                    h = b.getGraphicalProps(h);
                    h.singular.forEach(function(g) {
                        b[g] = b[g].destroy();
                    });
                    h.plural.forEach(function(g) {
                        b[g].forEach(function(b) {
                            b.element && b.destroy();
                        });
                        delete b[g];
                    });
                };
                q.prototype.firePointEvent = function(h, b, g) {
                    var f = this,
                        a = this.series.options;
                    (a.point.events[h] ||
                        (f.options && f.options.events && f.options.events[h])) &&
                    f.importEvents();
                    "click" === h &&
                        a.allowPointSelect &&
                        (g = function(a) {
                            f.select && f.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
                        });
                    z(f, h, b, g);
                };
                q.prototype.getClassName = function() {
                    return (
                        "highcharts-point" +
                        (this.selected ? " highcharts-point-select" : "") +
                        (this.negative ? " highcharts-negative" : "") +
                        (this.isNull ? " highcharts-null-point" : "") +
                        ("undefined" !== typeof this.colorIndex ?
                            " highcharts-color-" + this.colorIndex :
                            "") +
                        (this.options.className ? " " + this.options.className : "") +
                        (this.zone && this.zone.className ?
                            " " + this.zone.className.replace("highcharts-negative", "") :
                            "")
                    );
                };
                q.prototype.getGraphicalProps = function(h) {
                    var b = this,
                        g = [],
                        f,
                        a = { singular: [], plural: [] };
                    h = h || { graphic: 1, dataLabel: 1 };
                    h.graphic && g.push("graphic", "shadowGroup");
                    h.dataLabel && g.push("dataLabel", "dataLabelUpper", "connector");
                    for (f = g.length; f--;) {
                        var p = g[f];
                        b[p] && a.singular.push(p);
                    }
                    ["dataLabel", "connector"].forEach(function(e) {
                        var f = e + "s";
                        h[e] && b[f] && a.plural.push(f);
                    });
                    return a;
                };
                q.prototype.getLabelConfig = function() {
                    return {
                        x: this.category,
                        y: this.y,
                        color: this.color,
                        colorIndex: this.colorIndex,
                        key: this.name || this.category,
                        series: this.series,
                        point: this,
                        percentage: this.percentage,
                        total: this.total || this.stackTotal,
                    };
                };
                q.prototype.getNestedProperty = function(h) {
                    if (h)
                        return 0 === h.indexOf("custom.") ? d(h, this.options) : this[h];
                };
                q.prototype.getZone = function() {
                    var h = this.series,
                        b = h.zones;
                    h = h.zoneAxis || "y";
                    var g = 0,
                        f;
                    for (f = b[g]; this[h] >= f.value;) f = b[++g];
                    this.nonZonedColor || (this.nonZonedColor = this.color);
                    this.color =
                        f && f.color && !this.options.color ? f.color : this.nonZonedColor;
                    return f;
                };
                q.prototype.hasNewShapeType = function() {
                    return (
                        (this.graphic &&
                            (this.graphic.symbolName || this.graphic.element.nodeName)) !==
                        this.shapeType
                    );
                };
                q.prototype.init = function(h, b, g) {
                    this.series = h;
                    this.applyOptions(b, g);
                    this.id = J(this.id) ? this.id : L();
                    this.resolveColor();
                    h.chart.pointCount++;
                    z(this, "afterInit");
                    return this;
                };
                q.prototype.optionsToObject = function(h) {
                    var b = {},
                        g = this.series,
                        f = g.options.keys,
                        a = f || g.pointArrayMap || ["y"],
                        p = a.length,
                        e = 0,
                        d = 0;
                    if (u(h) || null === h) b[a[0]] = h;
                    else if (O(h))
                        for (!f &&
                            h.length > p &&
                            ((g = typeof h[0]),
                                "string" === g ? (b.name = h[0]) : "number" === g && (b.x = h[0]),
                                e++); d < p;

                        )
                            (f && "undefined" === typeof h[e]) ||
                            (0 < a[d].indexOf(".") ?
                                q.prototype.setNestedProperty(b, h[e], a[d]) :
                                (b[a[d]] = h[e])),
                            e++,
                            d++;
                    else
                        "object" === typeof h &&
                        ((b = h),
                            h.dataLabels && (g._hasPointLabels = !0),
                            h.marker && (g._hasPointMarkers = !0));
                    return b;
                };
                q.prototype.resolveColor = function() {
                    var h = this.series;
                    var b = h.chart.options.chart.colorCount;
                    var g = h.chart.styledMode;
                    delete this.nonZonedColor;
                    g || this.options.color || (this.color = h.color);
                    h.options.colorByPoint ?
                        (g ||
                            ((b = h.options.colors || h.chart.options.colors),
                                (this.color = this.color || b[h.colorCounter]),
                                (b = b.length)),
                            (g = h.colorCounter),
                            h.colorCounter++,
                            h.colorCounter === b && (h.colorCounter = 0)) :
                        (g = h.colorIndex);
                    this.colorIndex = r(this.colorIndex, g);
                };
                q.prototype.setNestedProperty = function(h, b, g) {
                    g.split(".").reduce(function(f, a, g, e) {
                        f[a] = e.length - 1 === g ? b : F(f[a], !0) ? f[a] : {};
                        return f[a];
                    }, h);
                    return h;
                };
                q.prototype.tooltipFormatter = function(h) {
                    var b = this.series,
                        g = b.tooltipOptions,
                        f = r(g.valueDecimals, ""),
                        a = g.valuePrefix || "",
                        p = g.valueSuffix || "";
                    b.chart.styledMode && (h = b.chart.tooltip.styledModeFormat(h));
                    (b.pointArrayMap || ["y"]).forEach(function(e) {
                        e = "{point." + e;
                        if (a || p) h = h.replace(RegExp(e + "}", "g"), a + e + "}" + p);
                        h = h.replace(RegExp(e + "}", "g"), e + ":,." + f + "f}");
                    });
                    return G(h, { point: this, series: this.series }, b.chart);
                };
                return q;
            })();
            return (t.Point = k);
        }
    );
    Q(
        k,
        "Core/Series/Series.js", [k["Core/Globals.js"], k["Core/Series/Point.js"], k["Core/Utilities.js"]],
        function(k, t, I) {
            var B = I.error,
                J = I.extendClass,
                M = I.fireEvent,
                n = I.getOptions,
                z = I.isObject,
                G = I.merge,
                d = I.objectEach;
            I = (function() {
                function k(d, n) {
                    var u = G(k.defaultOptions, n);
                    this.chart = d;
                    this._i = d.series.length;
                    d.series.push(this);
                    this.options = u;
                    this.userOptions = G(n);
                }
                k.addSeries = function(d, n) {
                    k.seriesTypes[d] = n;
                };
                k.cleanRecursively = function(u, n) {
                    var w = {};
                    d(u, function(d, m) {
                        if (z(u[m], !0) && !u.nodeType && n[m])
                            (d = k.cleanRecursively(u[m], n[m])),
                            Object.keys(d).length && (w[m] = d);
                        else if (z(u[m]) || u[m] !== n[m]) w[m] = u[m];
                    });
                    return w;
                };
                k.getSeries = function(d, n) {
                    void 0 === n && (n = {});
                    var w = d.options.chart;
                    w = n.type || w.type || w.defaultSeriesType || "";
                    var r = k.seriesTypes[w];
                    r || B(17, !0, d, { missingModuleFor: w });
                    return new r(d, n);
                };
                k.seriesType = function(d, F, w, r, m) {
                    var u = n().plotOptions || {},
                        q = k.seriesTypes;
                    F = F || "";
                    u[d] = G(u[F], w);
                    k.addSeries(d, J(q[F] || function() {}, r));
                    q[d].prototype.type = d;
                    m && (q[d].prototype.pointClass = J(t, m));
                    return q[d];
                };
                k.prototype.update = function(d, n) {
                    void 0 === n && (n = !0);
                    var w = this;
                    d = k.cleanRecursively(d, this.userOptions);
                    var r = d.type;
                    "undefined" !== typeof r &&
                        r !== w.type &&
                        (w = k.getSeries(w.chart, d));
                    M(w, "update", { newOptions: d });
                    w.userOptions = G(d);
                    M(w, "afterUpdate", { newOptions: d });
                    n && w.chart.redraw();
                    return w;
                };
                k.defaultOptions = { type: "base" };
                k.seriesTypes = {};
                return k;
            })();
            I.prototype.pointClass = t;
            k.seriesType = I.seriesType;
            k.seriesTypes = I.seriesTypes;
            return I;
        }
    );
    Q(
        k,
        "Core/Chart/Chart.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Axis/Axis.js"],
            k["Core/Series/Series.js"],
            k["Core/Globals.js"],
            k["Core/Legend.js"],
            k["Core/MSPointer.js"],
            k["Core/Options.js"],
            k["Core/Pointer.js"],
            k["Core/Time.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n, z, G, d) {
            var O = k.animate,
                u = k.animObject,
                F = k.setAnimation,
                w = D.charts,
                r = D.doc,
                m = D.win,
                L = n.defaultOptions,
                q = d.addEvent,
                h = d.attr,
                b = d.createElement,
                g = d.css,
                f = d.defined,
                a = d.discardElement,
                p = d.erase,
                e = d.error,
                E = d.extend,
                H = d.find,
                y = d.fireEvent,
                N = d.getStyle,
                P = d.isArray,
                K = d.isFunction,
                A = d.isNumber,
                C = d.isObject,
                v = d.isString,
                c = d.merge,
                l = d.numberFormat,
                x = d.objectEach,
                R = d.pick,
                S = d.pInt,
                da = d.relativeLength,
                B = d.removeEvent,
                Y = d.splat,
                Z = d.syncTimeout,
                W = d.uniqueKey,
                aa = D.marginNames,
                U = (function() {
                    function n(a, c, e) {
                        this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                        this.getArgs(a, c, e);
                    }
                    n.prototype.getArgs = function(a, c, e) {
                        v(a) || a.nodeName ?
                            ((this.renderTo = a), this.init(c, e)) :
                            this.init(a, c);
                    };
                    n.prototype.init = function(a, e) {
                        var b,
                            f = a.series,
                            g = a.plotOptions || {};
                        y(this, "init", { args: arguments }, function() {
                            a.series = null;
                            b = c(L, a);
                            var h = b.chart || {};
                            x(b.plotOptions, function(a, e) {
                                C(a) && (a.tooltip = (g[e] && c(g[e].tooltip)) || void 0);
                            });
                            b.tooltip.userOptions =
                                (a.chart && a.chart.forExport && a.tooltip.userOptions) ||
                                a.tooltip;
                            b.series = a.series = f;
                            this.userOptions = a;
                            var p = h.events;
                            this.margin = [];
                            this.spacing = [];
                            this.bounds = { h: {}, v: {} };
                            this.labelCollectors = [];
                            this.callback = e;
                            this.isResizing = 0;
                            this.options = b;
                            this.axes = [];
                            this.series = [];
                            this.time =
                                a.time && Object.keys(a.time).length ? new G(a.time) : D.time;
                            this.numberFormatter = h.numberFormatter || l;
                            this.styledMode = h.styledMode;
                            this.hasCartesianSeries = h.showAxes;
                            var d = this;
                            d.index = w.length;
                            w.push(d);
                            D.chartCount++;
                            p &&
                                x(p, function(a, c) {
                                    K(a) && q(d, c, a);
                                });
                            d.xAxis = [];
                            d.yAxis = [];
                            d.pointCount = d.colorCounter = d.symbolCounter = 0;
                            y(d, "afterInit");
                            d.firstRender();
                        });
                    };
                    n.prototype.initSeries = function(a) {
                        var c = this.options.chart;
                        c = a.type || c.type || c.defaultSeriesType;
                        var b = I.seriesTypes[c];
                        b || e(17, !0, this, { missingModuleFor: c });
                        c = new b(this, a);
                        "function" === typeof c.init && c.init(this, a);
                        return c;
                    };
                    n.prototype.setSeriesData = function() {
                        this.getSeriesOrderByLinks().forEach(function(a) {
                            a.points ||
                                a.data ||
                                !a.enabledDataSorting ||
                                a.setData(a.options.data, !1);
                        });
                    };
                    n.prototype.getSeriesOrderByLinks = function() {
                        return this.series.concat().sort(function(a, c) {
                            return a.linkedSeries.length || c.linkedSeries.length ?
                                c.linkedSeries.length - a.linkedSeries.length :
                                0;
                        });
                    };
                    n.prototype.orderSeries = function(a) {
                        var c = this.series;
                        for (a = a || 0; a < c.length; a++)
                            c[a] && ((c[a].index = a), (c[a].name = c[a].getName()));
                    };
                    n.prototype.isInsidePlot = function(a, c, e) {
                        var b = e ? c : a;
                        a = e ? a : c;
                        b = {
                            x: b,
                            y: a,
                            isInsidePlot: 0 <= b && b <= this.plotWidth && 0 <= a && a <= this.plotHeight,
                        };
                        y(this, "afterIsInsidePlot", b);
                        return b.isInsidePlot;
                    };
                    n.prototype.redraw = function(a) {
                        y(this, "beforeRedraw");
                        var c = this,
                            e = c.axes,
                            b = c.series,
                            l = c.pointer,
                            f = c.legend,
                            g = c.userOptions.legend,
                            h = c.isDirtyLegend,
                            p = c.hasCartesianSeries,
                            d = c.isDirtyBox,
                            x = c.renderer,
                            m = x.isHidden(),
                            v = [];
                        c.setResponsive && c.setResponsive(!1);
                        F(c.hasRendered ? a : !1, c);
                        m && c.temporaryDisplay();
                        c.layOutTitles();
                        for (a = b.length; a--;) {
                            var q = b[a];
                            if (q.options.stacking) {
                                var C = !0;
                                if (q.isDirty) {
                                    var r = !0;
                                    break;
                                }
                            }
                        }
                        if (r)
                            for (a = b.length; a--;)
                                (q = b[a]), q.options.stacking && (q.isDirty = !0);
                        b.forEach(function(a) {
                            a.isDirty &&
                                ("point" === a.options.legendType ?
                                    ("function" === typeof a.updateTotals && a.updateTotals(),
                                        (h = !0)) :
                                    g && (g.labelFormatter || g.labelFormat) && (h = !0));
                            a.isDirtyData && y(a, "updatedData");
                        });
                        h && f && f.options.enabled && (f.render(), (c.isDirtyLegend = !1));
                        C && c.getStacks();
                        p &&
                            e.forEach(function(a) {
                                (c.isResizing && A(a.min)) || (a.updateNames(), a.setScale());
                            });
                        c.getMargins();
                        p &&
                            (e.forEach(function(a) {
                                    a.isDirty && (d = !0);
                                }),
                                e.forEach(function(a) {
                                    var c = a.min + "," + a.max;
                                    a.extKey !== c &&
                                        ((a.extKey = c),
                                            v.push(function() {
                                                y(a, "afterSetExtremes", E(a.eventArgs, a.getExtremes()));
                                                delete a.eventArgs;
                                            }));
                                    (d || C) && a.redraw();
                                }));
                        d && c.drawChartBox();
                        y(c, "predraw");
                        b.forEach(function(a) {
                            (d || a.isDirty) && a.visible && a.redraw();
                            a.isDirtyData = !1;
                        });
                        l && l.reset(!0);
                        x.draw();
                        y(c, "redraw");
                        y(c, "render");
                        m && c.temporaryDisplay(!0);
                        v.forEach(function(a) {
                            a.call();
                        });
                    };
                    n.prototype.get = function(a) {
                        function c(c) {
                            return c.id === a || (c.options && c.options.id === a);
                        }
                        var e = this.series,
                            b;
                        var l = H(this.axes, c) || H(this.series, c);
                        for (b = 0; !l && b < e.length; b++) l = H(e[b].points || [], c);
                        return l;
                    };
                    n.prototype.getAxes = function() {
                        var a = this,
                            c = this.options,
                            e = (c.xAxis = Y(c.xAxis || {}));
                        c = c.yAxis = Y(c.yAxis || {});
                        y(this, "getAxes");
                        e.forEach(function(a, c) {
                            a.index = c;
                            a.isX = !0;
                        });
                        c.forEach(function(a, c) {
                            a.index = c;
                        });
                        e.concat(c).forEach(function(c) {
                            new t(a, c);
                        });
                        y(this, "afterGetAxes");
                    };
                    n.prototype.getSelectedPoints = function() {
                        var a = [];
                        this.series.forEach(function(c) {
                            a = a.concat(
                                c.getPointsCollection().filter(function(a) {
                                    return R(a.selectedStaging, a.selected);
                                })
                            );
                        });
                        return a;
                    };
                    n.prototype.getSelectedSeries = function() {
                        return this.series.filter(function(a) {
                            return a.selected;
                        });
                    };
                    n.prototype.setTitle = function(a, c, e) {
                        this.applyDescription("title", a);
                        this.applyDescription("subtitle", c);
                        this.applyDescription("caption", void 0);
                        this.layOutTitles(e);
                    };
                    n.prototype.applyDescription = function(a, e) {
                        var b = this,
                            l =
                            "title" === a ?
                            {
                                color: "#333333",
                                fontSize: this.options.isStock ? "16px" : "18px",
                            } :
                            { color: "#666666" };
                        l = this.options[a] = c(!this.styledMode && { style: l },
                            this.options[a],
                            e
                        );
                        var f = this[a];
                        f && e && (this[a] = f = f.destroy());
                        l &&
                            !f &&
                            ((f = this.renderer
                                    .text(l.text, 0, 0, l.useHTML)
                                    .attr({
                                        align: l.align,
                                        class: "highcharts-" + a,
                                        zIndex: l.zIndex || 4,
                                    })
                                    .add()),
                                (f.update = function(c) {
                                    b[{
                                        title: "setTitle",
                                        subtitle: "setSubtitle",
                                        caption: "setCaption",
                                    }[a]](c);
                                }),
                                this.styledMode || f.css(l.style),
                                (this[a] = f));
                    };
                    n.prototype.layOutTitles = function(a) {
                        var c = [0, 0, 0],
                            e = this.renderer,
                            b = this.spacingBox;
                        ["title", "subtitle", "caption"].forEach(function(a) {
                            var l = this[a],
                                f = this.options[a],
                                g = f.verticalAlign || "top";
                            a = "title" === a ? -3 : "top" === g ? c[0] + 2 : 0;
                            if (l) {
                                if (!this.styledMode) var h = f.style.fontSize;
                                h = e.fontMetrics(h, l).b;
                                l.css({
                                    width: (f.width || b.width + (f.widthAdjust || 0)) + "px",
                                });
                                var p = Math.round(l.getBBox(f.useHTML).height);
                                l.align(
                                    E({ y: "bottom" === g ? h : a + h, height: p }, f), !1,
                                    "spacingBox"
                                );
                                f.floating ||
                                    ("top" === g ?
                                        (c[0] = Math.ceil(c[0] + p)) :
                                        "bottom" === g && (c[2] = Math.ceil(c[2] + p)));
                            }
                        }, this);
                        c[0] &&
                            "top" === (this.options.title.verticalAlign || "top") &&
                            (c[0] += this.options.title.margin);
                        c[2] &&
                            "bottom" === this.options.caption.verticalAlign &&
                            (c[2] += this.options.caption.margin);
                        var l = !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
                        this.titleOffset = c;
                        y(this, "afterLayOutTitles");
                        !this.isDirtyBox &&
                            l &&
                            ((this.isDirtyBox = this.isDirtyLegend = l),
                                this.hasRendered && R(a, !0) && this.isDirtyBox && this.redraw());
                    };
                    n.prototype.getChartSize = function() {
                        var a = this.options.chart,
                            c = a.width;
                        a = a.height;
                        var e = this.renderTo;
                        f(c) || (this.containerWidth = N(e, "width"));
                        f(a) || (this.containerHeight = N(e, "height"));
                        this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                        this.chartHeight = Math.max(
                            0,
                            da(a, this.chartWidth) ||
                            (1 < this.containerHeight ? this.containerHeight : 400)
                        );
                    };
                    n.prototype.temporaryDisplay = function(a) {
                        var c = this.renderTo;
                        if (a)
                            for (; c && c.style;)
                                c.hcOrigStyle && (g(c, c.hcOrigStyle), delete c.hcOrigStyle),
                                c.hcOrigDetached &&
                                (r.body.removeChild(c), (c.hcOrigDetached = !1)),
                                (c = c.parentNode);
                        else
                            for (; c && c.style;) {
                                r.body.contains(c) ||
                                    c.parentNode ||
                                    ((c.hcOrigDetached = !0), r.body.appendChild(c));
                                if ("none" === N(c, "display", !1) || c.hcOricDetached)
                                    (c.hcOrigStyle = {
                                        display: c.style.display,
                                        height: c.style.height,
                                        overflow: c.style.overflow,
                                    }),
                                    (a = { display: "block", overflow: "hidden" }),
                                    c !== this.renderTo && (a.height = 0),
                                    g(c, a),
                                    c.offsetWidth ||
                                    c.style.setProperty("display", "block", "important");
                                c = c.parentNode;
                                if (c === r.body) break;
                            }
                    };
                    n.prototype.setClassName = function(a) {
                        this.container.className = "highcharts-container " + (a || "");
                    };
                    n.prototype.getContainer = function() {
                        var a = this.options,
                            c = a.chart;
                        var l = this.renderTo;
                        var f = W(),
                            p,
                            d;
                        l || (this.renderTo = l = c.renderTo);
                        v(l) && (this.renderTo = l = r.getElementById(l));
                        l || e(13, !0, this);
                        var x = S(h(l, "data-highcharts-chart"));
                        A(x) && w[x] && w[x].hasRendered && w[x].destroy();
                        h(l, "data-highcharts-chart", this.index);
                        l.innerHTML = "";
                        c.skipClone || l.offsetWidth || this.temporaryDisplay();
                        this.getChartSize();
                        x = this.chartWidth;
                        var m = this.chartHeight;
                        g(l, { overflow: "hidden" });
                        this.styledMode ||
                            (p = E({
                                    position: "relative",
                                    overflow: "hidden",
                                    width: x + "px",
                                    height: m + "px",
                                    textAlign: "left",
                                    lineHeight: "normal",
                                    zIndex: 0,
                                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                                    userSelect: "none",
                                },
                                c.style
                            ));
                        this.container = l = b("div", { id: f }, p, l);
                        this._cursor = l.style.cursor;
                        this.renderer = new(D[c.renderer] || D.Renderer)(
                            l,
                            x,
                            m,
                            null,
                            c.forExport,
                            a.exporting && a.exporting.allowHTML,
                            this.styledMode
                        );
                        F(void 0, this);
                        this.setClassName(c.className);
                        if (this.styledMode)
                            for (d in a.defs) this.renderer.definition(a.defs[d]);
                        else this.renderer.setStyle(c.style);
                        this.renderer.chartIndex = this.index;
                        y(this, "afterGetContainer");
                    };
                    n.prototype.getMargins = function(a) {
                        var c = this.spacing,
                            e = this.margin,
                            b = this.titleOffset;
                        this.resetMargins();
                        b[0] &&
                            !f(e[0]) &&
                            (this.plotTop = Math.max(this.plotTop, b[0] + c[0]));
                        b[2] &&
                            !f(e[2]) &&
                            (this.marginBottom = Math.max(this.marginBottom, b[2] + c[2]));
                        this.legend &&
                            this.legend.display &&
                            this.legend.adjustMargins(e, c);
                        y(this, "getMargins");
                        a || this.getAxisMargins();
                    };
                    n.prototype.getAxisMargins = function() {
                        var a = this,
                            c = (a.axisOffset = [0, 0, 0, 0]),
                            e = a.colorAxis,
                            b = a.margin,
                            l = function(a) {
                                a.forEach(function(a) {
                                    a.visible && a.getOffset();
                                });
                            };
                        a.hasCartesianSeries ? l(a.axes) : e && e.length && l(e);
                        aa.forEach(function(e, l) {
                            f(b[l]) || (a[e] += c[l]);
                        });
                        a.setChartSize();
                    };
                    n.prototype.reflow = function(a) {
                        var c = this,
                            e = c.options.chart,
                            b = c.renderTo,
                            l = f(e.width) && f(e.height),
                            g = e.width || N(b, "width");
                        e = e.height || N(b, "height");
                        b = a ? a.target : m;
                        if (!l && !c.isPrinting && g && e && (b === m || b === r)) {
                            if (g !== c.containerWidth || e !== c.containerHeight)
                                d.clearTimeout(c.reflowTimeout),
                                (c.reflowTimeout = Z(
                                    function() {
                                        c.container && c.setSize(void 0, void 0, !1);
                                    },
                                    a ? 100 : 0
                                ));
                            c.containerWidth = g;
                            c.containerHeight = e;
                        }
                    };
                    n.prototype.setReflow = function(a) {
                        var c = this;
                        !1 === a || this.unbindReflow ?
                            !1 === a &&
                            this.unbindReflow &&
                            (this.unbindReflow = this.unbindReflow()) :
                            ((this.unbindReflow = q(m, "resize", function(a) {
                                    c.options && c.reflow(a);
                                })),
                                q(this, "destroy", this.unbindReflow));
                    };
                    n.prototype.setSize = function(a, c, e) {
                        var b = this,
                            l = b.renderer;
                        b.isResizing += 1;
                        F(e, b);
                        e = l.globalAnimation;
                        b.oldChartHeight = b.chartHeight;
                        b.oldChartWidth = b.chartWidth;
                        "undefined" !== typeof a && (b.options.chart.width = a);
                        "undefined" !== typeof c && (b.options.chart.height = c);
                        b.getChartSize();
                        b.styledMode ||
                            (e ? O : g)(
                                b.container, { width: b.chartWidth + "px", height: b.chartHeight + "px" },
                                e
                            );
                        b.setChartSize(!0);
                        l.setSize(b.chartWidth, b.chartHeight, e);
                        b.axes.forEach(function(a) {
                            a.isDirty = !0;
                            a.setScale();
                        });
                        b.isDirtyLegend = !0;
                        b.isDirtyBox = !0;
                        b.layOutTitles();
                        b.getMargins();
                        b.redraw(e);
                        b.oldChartHeight = null;
                        y(b, "resize");
                        Z(function() {
                            b &&
                                y(b, "endResize", null, function() {
                                    --b.isResizing;
                                });
                        }, u(e).duration);
                    };
                    n.prototype.setChartSize = function(a) {
                        var c = this.inverted,
                            e = this.renderer,
                            b = this.chartWidth,
                            l = this.chartHeight,
                            f = this.options.chart,
                            g = this.spacing,
                            h = this.clipOffset,
                            p,
                            d,
                            x,
                            m;
                        this.plotLeft = p = Math.round(this.plotLeft);
                        this.plotTop = d = Math.round(this.plotTop);
                        this.plotWidth = x = Math.max(
                            0,
                            Math.round(b - p - this.marginRight)
                        );
                        this.plotHeight = m = Math.max(
                            0,
                            Math.round(l - d - this.marginBottom)
                        );
                        this.plotSizeX = c ? m : x;
                        this.plotSizeY = c ? x : m;
                        this.plotBorderWidth = f.plotBorderWidth || 0;
                        this.spacingBox = e.spacingBox = {
                            x: g[3],
                            y: g[0],
                            width: b - g[3] - g[1],
                            height: l - g[0] - g[2],
                        };
                        this.plotBox = e.plotBox = { x: p, y: d, width: x, height: m };
                        b = 2 * Math.floor(this.plotBorderWidth / 2);
                        c = Math.ceil(Math.max(b, h[3]) / 2);
                        e = Math.ceil(Math.max(b, h[0]) / 2);
                        this.clipBox = {
                            x: c,
                            y: e,
                            width: Math.floor(this.plotSizeX - Math.max(b, h[1]) / 2 - c),
                            height: Math.max(
                                0,
                                Math.floor(this.plotSizeY - Math.max(b, h[2]) / 2 - e)
                            ),
                        };
                        a ||
                            this.axes.forEach(function(a) {
                                a.setAxisSize();
                                a.setAxisTranslation();
                            });
                        y(this, "afterSetChartSize", { skipAxes: a });
                    };
                    n.prototype.resetMargins = function() {
                        y(this, "resetMargins");
                        var a = this,
                            c = a.options.chart;
                        ["margin", "spacing"].forEach(function(e) {
                            var b = c[e],
                                l = C(b) ? b : [b, b, b, b];
                            ["Top", "Right", "Bottom", "Left"].forEach(function(b, f) {
                                a[e][f] = R(c[e + b], l[f]);
                            });
                        });
                        aa.forEach(function(c, e) {
                            a[c] = R(a.margin[e], a.spacing[e]);
                        });
                        a.axisOffset = [0, 0, 0, 0];
                        a.clipOffset = [0, 0, 0, 0];
                    };
                    n.prototype.drawChartBox = function() {
                        var a = this.options.chart,
                            c = this.renderer,
                            e = this.chartWidth,
                            b = this.chartHeight,
                            l = this.chartBackground,
                            f = this.plotBackground,
                            g = this.plotBorder,
                            h = this.styledMode,
                            p = this.plotBGImage,
                            d = a.backgroundColor,
                            x = a.plotBackgroundColor,
                            m = a.plotBackgroundImage,
                            A,
                            v = this.plotLeft,
                            q = this.plotTop,
                            C = this.plotWidth,
                            E = this.plotHeight,
                            r = this.plotBox,
                            H = this.clipRect,
                            K = this.clipBox,
                            n = "animate";
                        l ||
                            ((this.chartBackground = l = c
                                    .rect()
                                    .addClass("highcharts-background")
                                    .add()),
                                (n = "attr"));
                        if (h) var w = (A = l.strokeWidth());
                        else {
                            w = a.borderWidth || 0;
                            A = w + (a.shadow ? 8 : 0);
                            d = { fill: d || "none" };
                            if (w || l["stroke-width"])
                                (d.stroke = a.borderColor), (d["stroke-width"] = w);
                            l.attr(d).shadow(a.shadow);
                        }
                        l[n]({
                            x: A / 2,
                            y: A / 2,
                            width: e - A - (w % 2),
                            height: b - A - (w % 2),
                            r: a.borderRadius,
                        });
                        n = "animate";
                        f ||
                            ((n = "attr"),
                                (this.plotBackground = f = c
                                    .rect()
                                    .addClass("highcharts-plot-background")
                                    .add()));
                        f[n](r);
                        h ||
                            (f.attr({ fill: x || "none" }).shadow(a.plotShadow),
                                m &&
                                (p ?
                                    (m !== p.attr("href") && p.attr("href", m), p.animate(r)) :
                                    (this.plotBGImage = c.image(m, v, q, C, E).add())));
                        H
                            ?
                            H.animate({ width: K.width, height: K.height }) :
                            (this.clipRect = c.clipRect(K));
                        n = "animate";
                        g ||
                            ((n = "attr"),
                                (this.plotBorder = g = c
                                    .rect()
                                    .addClass("highcharts-plot-border")
                                    .attr({ zIndex: 1 })
                                    .add()));
                        h ||
                            g.attr({
                                stroke: a.plotBorderColor,
                                "stroke-width": a.plotBorderWidth || 0,
                                fill: "none",
                            });
                        g[n](
                            g.crisp({ x: v, y: q, width: C, height: E }, -g.strokeWidth())
                        );
                        this.isDirtyBox = !1;
                        y(this, "afterDrawChartBox");
                    };
                    n.prototype.propFromSeries = function() {
                        var a = this,
                            c = a.options.chart,
                            e,
                            b = a.options.series,
                            l,
                            f;
                        ["inverted", "angular", "polar"].forEach(function(g) {
                            e = I.seriesTypes[c.type || c.defaultSeriesType];
                            f = c[g] || (e && e.prototype[g]);
                            for (l = b && b.length; !f && l--;)
                                (e = I.seriesTypes[b[l].type]) && e.prototype[g] && (f = !0);
                            a[g] = f;
                        });
                    };
                    n.prototype.linkSeries = function() {
                        var a = this,
                            c = a.series;
                        c.forEach(function(a) {
                            a.linkedSeries.length = 0;
                        });
                        c.forEach(function(c) {
                            var e = c.options.linkedTo;
                            v(e) &&
                                (e = ":previous" === e ? a.series[c.index - 1] : a.get(e)) &&
                                e.linkedParent !== c &&
                                (e.linkedSeries.push(c),
                                    (c.linkedParent = e),
                                    e.enabledDataSorting && c.setDataSortingOptions(),
                                    (c.visible = R(
                                        c.options.visible,
                                        e.options.visible,
                                        c.visible
                                    )));
                        });
                        y(this, "afterLinkSeries");
                    };
                    n.prototype.renderSeries = function() {
                        this.series.forEach(function(a) {
                            a.translate();
                            a.render();
                        });
                    };
                    n.prototype.renderLabels = function() {
                        var a = this,
                            c = a.options.labels;
                        c.items &&
                            c.items.forEach(function(e) {
                                var b = E(c.style, e.style),
                                    l = S(b.left) + a.plotLeft,
                                    f = S(b.top) + a.plotTop + 12;
                                delete b.left;
                                delete b.top;
                                a.renderer.text(e.html, l, f).attr({ zIndex: 2 }).css(b).add();
                            });
                    };
                    n.prototype.render = function() {
                        var a = this.axes,
                            c = this.colorAxis,
                            e = this.renderer,
                            b = this.options,
                            l = 0,
                            f = function(a) {
                                a.forEach(function(a) {
                                    a.visible && a.render();
                                });
                            };
                        this.setTitle();
                        this.legend = new J(this, b.legend);
                        this.getStacks && this.getStacks();
                        this.getMargins(!0);
                        this.setChartSize();
                        b = this.plotWidth;
                        a.some(function(a) {
                            if (
                                a.horiz &&
                                a.visible &&
                                a.options.labels.enabled &&
                                a.series.length
                            )
                                return (l = 21), !0;
                        });
                        var g = (this.plotHeight = Math.max(this.plotHeight - l, 0));
                        a.forEach(function(a) {
                            a.setScale();
                        });
                        this.getAxisMargins();
                        var h = 1.1 < b / this.plotWidth;
                        var p = 1.05 < g / this.plotHeight;
                        if (h || p)
                            a.forEach(function(a) {
                                ((a.horiz && h) || (!a.horiz && p)) && a.setTickInterval(!0);
                            }),
                            this.getMargins();
                        this.drawChartBox();
                        this.hasCartesianSeries ? f(a) : c && c.length && f(c);
                        this.seriesGroup ||
                            (this.seriesGroup = e
                                .g("series-group")
                                .attr({ zIndex: 3 })
                                .add());
                        this.renderSeries();
                        this.renderLabels();
                        this.addCredits();
                        this.setResponsive && this.setResponsive();
                        this.updateContainerScaling();
                        this.hasRendered = !0;
                    };
                    n.prototype.addCredits = function(a) {
                        var e = this,
                            b = c(!0, this.options.credits, a);
                        b.enabled &&
                            !this.credits &&
                            ((this.credits = this.renderer
                                    .text(b.text + (this.mapCredits || ""), 0, 0)
                                    .addClass("highcharts-credits")
                                    .on("click", function() {
                                        b.href && (m.location.href = b.href);
                                    })
                                    .attr({ align: b.position.align, zIndex: 8 })),
                                e.styledMode || this.credits.css(b.style),
                                this.credits.add().align(b.position),
                                (this.credits.update = function(a) {
                                    e.credits = e.credits.destroy();
                                    e.addCredits(a);
                                }));
                    };
                    n.prototype.updateContainerScaling = function() {
                        var a = this.container;
                        if (
                            2 < a.offsetWidth &&
                            2 < a.offsetHeight &&
                            a.getBoundingClientRect
                        ) {
                            var c = a.getBoundingClientRect(),
                                e = c.width / a.offsetWidth;
                            a = c.height / a.offsetHeight;
                            1 !== e || 1 !== a ?
                                (this.containerScaling = { scaleX: e, scaleY: a }) :
                                delete this.containerScaling;
                        }
                    };
                    n.prototype.destroy = function() {
                        var c = this,
                            e = c.axes,
                            b = c.series,
                            l = c.container,
                            f,
                            g = l && l.parentNode;
                        y(c, "destroy");
                        c.renderer.forExport ? p(w, c) : (w[c.index] = void 0);
                        D.chartCount--;
                        c.renderTo.removeAttribute("data-highcharts-chart");
                        B(c);
                        for (f = e.length; f--;) e[f] = e[f].destroy();
                        this.scroller && this.scroller.destroy && this.scroller.destroy();
                        for (f = b.length; f--;) b[f] = b[f].destroy();
                        "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer"
                        .split(" ")
                            .forEach(function(a) {
                                var e = c[a];
                                e && e.destroy && (c[a] = e.destroy());
                            });
                        l && ((l.innerHTML = ""), B(l), g && a(l));
                        x(c, function(a, e) {
                            delete c[e];
                        });
                    };
                    n.prototype.firstRender = function() {
                        var a = this,
                            c = a.options;
                        if (!a.isReadyToRender || a.isReadyToRender()) {
                            a.getContainer();
                            a.resetMargins();
                            a.setChartSize();
                            a.propFromSeries();
                            a.getAxes();
                            (P(c.series) ? c.series : []).forEach(function(c) {
                                a.initSeries(c);
                            });
                            a.linkSeries();
                            a.setSeriesData();
                            y(a, "beforeRender");
                            z &&
                                (a.pointer =
                                    D.hasTouch || (!m.PointerEvent && !m.MSPointerEvent) ?
                                    new z(a, c) :
                                    new M(a, c));
                            a.render();
                            if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
                            a.temporaryDisplay(!0);
                        }
                    };
                    n.prototype.onload = function() {
                        this.callbacks.concat([this.callback]).forEach(function(a) {
                            a && "undefined" !== typeof this.index && a.apply(this, [this]);
                        }, this);
                        y(this, "load");
                        y(this, "render");
                        f(this.index) && this.setReflow(this.options.chart.reflow);
                        this.hasLoaded = !0;
                    };
                    return n;
                })();
            U.prototype.callbacks = [];
            D.chart = function(a, c, e) {
                return new U(a, c, e);
            };
            return (D.Chart = U);
        }
    );
    Q(
        k,
        "Extensions/ScrollablePlotArea.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Chart/Chart.js"],
            k["Core/Globals.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D) {
            var B = k.stop,
                M = D.addEvent,
                n = D.createElement,
                z = D.pick;
            ("");
            M(t, "afterSetChartSize", function(n) {
                var d = this.options.chart.scrollablePlotArea,
                    k = d && d.minWidth;
                d = d && d.minHeight;
                if (!this.renderer.forExport) {
                    if (k) {
                        if (
                            (this.scrollablePixelsX = k = Math.max(0, k - this.chartWidth))
                        ) {
                            this.plotWidth += k;
                            this.inverted ?
                                ((this.clipBox.height += k), (this.plotBox.height += k)) :
                                ((this.clipBox.width += k), (this.plotBox.width += k));
                            var u = { 1: { name: "right", value: k } };
                        }
                    } else
                        d &&
                        (this.scrollablePixelsY = k = Math.max(
                            0,
                            d - this.chartHeight
                        )) &&
                        ((this.plotHeight += k),
                            this.inverted ?
                            ((this.clipBox.width += k), (this.plotBox.width += k)) :
                            ((this.clipBox.height += k), (this.plotBox.height += k)),
                            (u = { 2: { name: "bottom", value: k } }));
                    u &&
                        !n.skipAxes &&
                        this.axes.forEach(function(d) {
                            u[d.side] ?
                                (d.getPlotLinePath = function() {
                                    var n = u[d.side].name,
                                        r = this[n];
                                    this[n] = r - u[d.side].value;
                                    var m = I.Axis.prototype.getPlotLinePath.apply(
                                        this,
                                        arguments
                                    );
                                    this[n] = r;
                                    return m;
                                }) :
                                (d.setAxisSize(), d.setAxisTranslation());
                        });
                }
            });
            M(t, "render", function() {
                this.scrollablePixelsX || this.scrollablePixelsY ?
                    (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) :
                    this.fixedDiv && this.applyFixed();
            });
            t.prototype.setUpScrolling = function() {
                var k = this,
                    d = {
                        WebkitOverflowScrolling: "touch",
                        overflowX: "hidden",
                        overflowY: "hidden",
                    };
                this.scrollablePixelsX && (d.overflowX = "auto");
                this.scrollablePixelsY && (d.overflowY = "auto");
                this.scrollingParent = n(
                    "div", { className: "highcharts-scrolling-parent" }, { position: "relative" },
                    this.renderTo
                );
                this.scrollingContainer = n(
                    "div", { className: "highcharts-scrolling" },
                    d,
                    this.scrollingParent
                );
                M(this.scrollingContainer, "scroll", function() {
                    k.pointer && delete k.pointer.chartPosition;
                });
                this.innerContainer = n(
                    "div", { className: "highcharts-inner-container" },
                    null,
                    this.scrollingContainer
                );
                this.innerContainer.appendChild(this.container);
                this.setUpScrolling = null;
            };
            t.prototype.moveFixedElements = function() {
                var n = this.container,
                    d = this.fixedRenderer,
                    k = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(
                        " "
                    ),
                    u;
                this.scrollablePixelsX && !this.inverted ?
                    (u = ".highcharts-yaxis") :
                    this.scrollablePixelsX && this.inverted ?
                    (u = ".highcharts-xaxis") :
                    this.scrollablePixelsY && !this.inverted ?
                    (u = ".highcharts-xaxis") :
                    this.scrollablePixelsY &&
                    this.inverted &&
                    (u = ".highcharts-yaxis");
                k.push(u, u + "-labels");
                k.forEach(function(k) {
                    [].forEach.call(n.querySelectorAll(k), function(n) {
                        (n.namespaceURI === d.SVG_NS ?
                            d.box :
                            d.box.parentNode
                        ).appendChild(n);
                        n.style.pointerEvents = "auto";
                    });
                });
            };
            t.prototype.applyFixed = function() {
                var k,
                    d,
                    t = !this.fixedDiv,
                    u = this.options.chart.scrollablePlotArea;
                t
                    ?
                    ((this.fixedDiv = n(
                            "div", { className: "highcharts-fixed" }, {
                                position: "absolute",
                                overflow: "hidden",
                                pointerEvents: "none",
                                zIndex: 2,
                                top: 0,
                            },
                            null, !0
                        )),
                        null === (k = this.scrollingContainer) || void 0 === k ?
                        void 0 :
                        k.parentNode.insertBefore(
                            this.fixedDiv,
                            this.scrollingContainer
                        ),
                        (this.renderTo.style.overflow = "visible"),
                        (this.fixedRenderer = k = new I.Renderer(
                            this.fixedDiv,
                            this.chartWidth,
                            this.chartHeight,
                            null === (d = this.options.chart) || void 0 === d ?
                            void 0 :
                            d.style
                        )),
                        (this.scrollableMask = k
                            .path()
                            .attr({
                                fill: this.options.chart.backgroundColor || "#fff",
                                "fill-opacity": z(u.opacity, 0.85),
                                zIndex: -1,
                            })
                            .addClass("highcharts-scrollable-mask")
                            .add()),
                        this.moveFixedElements(),
                        M(this, "afterShowResetZoom", this.moveFixedElements),
                        M(this, "afterLayOutTitles", this.moveFixedElements)) :
                    this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
                d = this.chartWidth + (this.scrollablePixelsX || 0);
                k = this.chartHeight + (this.scrollablePixelsY || 0);
                B(this.container);
                this.container.style.width = d + "px";
                this.container.style.height = k + "px";
                this.renderer.boxWrapper.attr({
                    width: d,
                    height: k,
                    viewBox: [0, 0, d, k].join(" "),
                });
                this.chartBackground.attr({ width: d, height: k });
                this.scrollingContainer.style.height = this.chartHeight + "px";
                t &&
                    (u.scrollPositionX &&
                        (this.scrollingContainer.scrollLeft =
                            this.scrollablePixelsX * u.scrollPositionX),
                        u.scrollPositionY &&
                        (this.scrollingContainer.scrollTop =
                            this.scrollablePixelsY * u.scrollPositionY));
                k = this.axisOffset;
                t = this.plotTop - k[0] - 1;
                u = this.plotLeft - k[3] - 1;
                d = this.plotTop + this.plotHeight + k[2] + 1;
                k = this.plotLeft + this.plotWidth + k[1] + 1;
                var F = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                    w = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
                t = this.scrollablePixelsX ?
                    [
                        ["M", 0, t],
                        ["L", this.plotLeft - 1, t],
                        ["L", this.plotLeft - 1, d],
                        ["L", 0, d],
                        ["Z"],
                        ["M", F, t],
                        ["L", this.chartWidth, t],
                        ["L", this.chartWidth, d],
                        ["L", F, d],
                        ["Z"],
                    ] :
                    this.scrollablePixelsY ?
                    [
                        ["M", u, 0],
                        ["L", u, this.plotTop - 1],
                        ["L", k, this.plotTop - 1],
                        ["L", k, 0],
                        ["Z"],
                        ["M", u, w],
                        ["L", u, this.chartHeight],
                        ["L", k, this.chartHeight],
                        ["L", k, w],
                        ["Z"],
                    ] :
                    [
                        ["M", 0, 0]
                    ];
                "adjustHeight" !== this.redrawTrigger &&
                    this.scrollableMask.attr({ d: t });
            };
        }
    );
    Q(
        k,
        "Core/Axis/StackingAxis.js", [k["Core/Animation/AnimationUtilities.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = k.getDeferredAnimation,
                D = t.addEvent,
                J = t.destroyObjectProperties,
                M = t.fireEvent,
                n = t.objectEach,
                z = t.pick,
                G = (function() {
                    function d(d) {
                        this.oldStacks = {};
                        this.stacks = {};
                        this.stacksTouched = 0;
                        this.axis = d;
                    }
                    d.prototype.buildStacks = function() {
                        var d = this.axis,
                            n = d.series,
                            k = z(d.options.reversedStacks, !0),
                            w = n.length,
                            r;
                        if (!d.isXAxis) {
                            this.usePercentage = !1;
                            for (r = w; r--;) {
                                var m = n[k ? r : w - r - 1];
                                m.setStackedPoints();
                                m.setGroupedPoints();
                            }
                            for (r = 0; r < w; r++) n[r].modifyStacks();
                            M(d, "afterBuildStacks");
                        }
                    };
                    d.prototype.cleanStacks = function() {
                        if (!this.axis.isXAxis) {
                            if (this.oldStacks) var d = (this.stacks = this.oldStacks);
                            n(d, function(d) {
                                n(d, function(d) {
                                    d.cumulative = d.total;
                                });
                            });
                        }
                    };
                    d.prototype.resetStacks = function() {
                        var d = this,
                            k = d.stacks;
                        d.axis.isXAxis ||
                            n(k, function(k) {
                                n(k, function(n, r) {
                                    n.touched < d.stacksTouched ?
                                        (n.destroy(), delete k[r]) :
                                        ((n.total = null), (n.cumulative = null));
                                });
                            });
                    };
                    d.prototype.renderStackTotals = function() {
                        var d = this.axis,
                            k = d.chart,
                            t = k.renderer,
                            w = this.stacks;
                        d = B(k, d.options.stackLabels.animation);
                        var r = (this.stackTotalGroup =
                            this.stackTotalGroup ||
                            t
                            .g("stack-labels")
                            .attr({ visibility: "visible", zIndex: 6, opacity: 0 })
                            .add());
                        r.translate(k.plotLeft, k.plotTop);
                        n(w, function(d) {
                            n(d, function(d) {
                                d.render(r);
                            });
                        });
                        r.animate({ opacity: 1 }, d);
                    };
                    return d;
                })();
            return (function() {
                function d() {}
                d.compose = function(n) {
                    D(n, "init", d.onInit);
                    D(n, "destroy", d.onDestroy);
                };
                d.onDestroy = function() {
                    var d = this.stacking;
                    if (d) {
                        var k = d.stacks;
                        n(k, function(d, n) {
                            J(d);
                            k[n] = null;
                        });
                        d && d.stackTotalGroup && d.stackTotalGroup.destroy();
                    }
                };
                d.onInit = function() {
                    this.stacking || (this.stacking = new G(this));
                };
                return d;
            })();
        }
    );
    Q(
        k,
        "Mixins/LegendSymbol.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.merge,
                D = t.pick;
            return (k.LegendSymbolMixin = {
                drawRectangle: function(k, t) {
                    var n = k.symbolHeight,
                        z = k.options.squareSymbol;
                    t.legendSymbol = this.chart.renderer
                        .rect(
                            z ? (k.symbolWidth - n) / 2 : 0,
                            k.baseline - n + 1,
                            z ? n : k.symbolWidth,
                            n,
                            D(k.options.symbolRadius, n / 2)
                        )
                        .addClass("highcharts-point")
                        .attr({ zIndex: 3 })
                        .add(t.legendGroup);
                },
                drawLineMarker: function(k) {
                    var t = this.options,
                        n = t.marker,
                        z = k.symbolWidth,
                        G = k.symbolHeight,
                        d = G / 2,
                        O = this.chart.renderer,
                        u = this.legendGroup;
                    k = k.baseline - Math.round(0.3 * k.fontMetrics.b);
                    var F = {};
                    this.chart.styledMode ||
                        ((F = { "stroke-width": t.lineWidth || 0 }),
                            t.dashStyle && (F.dashstyle = t.dashStyle));
                    this.legendLine = O.path([
                            ["M", 0, k],
                            ["L", z, k],
                        ])
                        .addClass("highcharts-graph")
                        .attr(F)
                        .add(u);
                    n &&
                        !1 !== n.enabled &&
                        z &&
                        ((t = Math.min(D(n.radius, d), d)),
                            0 === this.symbol.indexOf("url") &&
                            ((n = B(n, { width: G, height: G })), (t = 0)),
                            (this.legendSymbol = n = O.symbol(
                                    this.symbol,
                                    z / 2 - t,
                                    k - t,
                                    2 * t,
                                    2 * t,
                                    n
                                )
                                .addClass("highcharts-point")
                                .add(u)),
                            (n.isMarker = !0));
                },
            });
        }
    );
    Q(
        k,
        "Core/Series/CartesianSeries.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Series/Series.js"],
            k["Core/Globals.js"],
            k["Mixins/LegendSymbol.js"],
            k["Core/Options.js"],
            k["Core/Series/Point.js"],
            k["Core/Renderer/SVG/SVGElement.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n, z) {
            var G = k.animObject,
                d = J.defaultOptions,
                B = z.addEvent,
                u = z.arrayMax,
                F = z.arrayMin,
                w = z.clamp,
                r = z.correctFloat,
                m = z.defined,
                L = z.erase,
                q = z.error,
                h = z.extend,
                b = z.find,
                g = z.fireEvent,
                f = z.getNestedProperty,
                a = z.isArray,
                p = z.isFunction,
                e = z.isNumber,
                E = z.isString,
                H = z.merge,
                y = z.objectEach,
                N = z.pick,
                P = z.removeEvent,
                K = z.splat,
                A = z.syncTimeout;
            ("");
            var C = t.seriesTypes,
                v = I.win;
            k = t.seriesType(
                "line",
                void 0, {
                    lineWidth: 2,
                    allowPointSelect: !1,
                    crisp: !0,
                    showCheckbox: !1,
                    animation: { duration: 1e3 },
                    events: {},
                    marker: {
                        enabledThreshold: 2,
                        lineColor: "#ffffff",
                        lineWidth: 0,
                        radius: 4,
                        states: {
                            normal: { animation: !0 },
                            hover: {
                                animation: { duration: 50 },
                                enabled: !0,
                                radiusPlus: 2,
                                lineWidthPlus: 1,
                            },
                            select: {
                                fillColor: "#cccccc",
                                lineColor: "#000000",
                                lineWidth: 2,
                            },
                        },
                    },
                    point: { events: {} },
                    dataLabels: {
                        animation: {},
                        align: "center",
                        defer: !0,
                        formatter: function() {
                            var a = this.series.chart.numberFormatter;
                            return "number" !== typeof this.y ? "" : a(this.y, -1);
                        },
                        padding: 5,
                        style: {
                            fontSize: "11px",
                            fontWeight: "bold",
                            color: "contrast",
                            textOutline: "1px contrast",
                        },
                        verticalAlign: "bottom",
                        x: 0,
                        y: 0,
                    },
                    cropThreshold: 300,
                    opacity: 1,
                    pointRange: 0,
                    softThreshold: !0,
                    states: {
                        normal: { animation: !0 },
                        hover: {
                            animation: { duration: 50 },
                            lineWidthPlus: 1,
                            marker: {},
                            halo: { size: 10, opacity: 0.25 },
                        },
                        select: { animation: { duration: 0 } },
                        inactive: { animation: { duration: 50 }, opacity: 0.2 },
                    },
                    stickyTracking: !0,
                    turboThreshold: 1e3,
                    findNearestPointBy: "x",
                }, {
                    axisTypes: ["xAxis", "yAxis"],
                    coll: "series",
                    colorCounter: 0,
                    cropShoulder: 1,
                    directTouch: !1,
                    isCartesian: !0,
                    parallelArrays: ["x", "y"],
                    pointClass: M,
                    requireSorting: !0,
                    sorted: !0,
                    init: function(a, e) {
                        g(this, "init", { options: e });
                        var c = this,
                            b = a.series,
                            l;
                        this.eventOptions = this.eventOptions || {};
                        this.eventsToUnbind = [];
                        c.chart = a;
                        c.options = e = c.setOptions(e);
                        c.linkedSeries = [];
                        c.bindAxes();
                        h(c, {
                            name: e.name,
                            state: "",
                            visible: !1 !== e.visible,
                            selected: !0 === e.selected,
                        });
                        var f = e.events;
                        y(f, function(a, e) {
                            p(a) &&
                                c.eventOptions[e] !== a &&
                                (p(c.eventOptions[e]) && P(c, e, c.eventOptions[e]),
                                    (c.eventOptions[e] = a),
                                    B(c, e, a));
                        });
                        if (
                            (f && f.click) ||
                            (e.point && e.point.events && e.point.events.click) ||
                            e.allowPointSelect
                        )
                            a.runTrackerClick = !0;
                        c.getColor();
                        c.getSymbol();
                        c.parallelArrays.forEach(function(a) {
                            c[a + "Data"] || (c[a + "Data"] = []);
                        });
                        c.isCartesian && (a.hasCartesianSeries = !0);
                        b.length && (l = b[b.length - 1]);
                        c._i = N(l && l._i, -1) + 1;
                        c.opacity = c.options.opacity;
                        a.orderSeries(this.insert(b));
                        e.dataSorting && e.dataSorting.enabled ?
                            c.setDataSortingOptions() :
                            c.points || c.data || c.setData(e.data, !1);
                        g(this, "afterInit");
                    },
                    is: function(a) {
                        return C[a] && this instanceof C[a];
                    },
                    insert: function(a) {
                        var c = this.options.index,
                            b;
                        if (e(c)) {
                            for (b = a.length; b--;)
                                if (c >= N(a[b].options.index, a[b]._i)) {
                                    a.splice(b + 1, 0, this);
                                    break;
                                } -
                            1 === b && a.unshift(this);
                            b += 1;
                        } else a.push(this);
                        return N(b, a.length - 1);
                    },
                    bindAxes: function() {
                        var a = this,
                            e = a.options,
                            b = a.chart,
                            f;
                        g(this, "bindAxes", null, function() {
                            (a.axisTypes || []).forEach(function(c) {
                                b[c].forEach(function(b) {
                                    f = b.options;
                                    if (
                                        e[c] === f.index ||
                                        ("undefined" !== typeof e[c] && e[c] === f.id) ||
                                        ("undefined" === typeof e[c] && 0 === f.index)
                                    )
                                        a.insert(b.series), (a[c] = b), (b.isDirty = !0);
                                });
                                a[c] || a.optionalAxis === c || q(18, !0, b);
                            });
                        });
                        g(this, "afterBindAxes");
                    },
                    updateParallelArrays: function(a, b) {
                        var c = a.series,
                            l = arguments,
                            f = e(b) ?

                            function(e) {
                                var l = "y" === e && c.toYData ? c.toYData(a) : a[e];
                                c[e + "Data"][b] = l;
                            } :
                            function(a) {
                                Array.prototype[b].apply(
                                    c[a + "Data"],
                                    Array.prototype.slice.call(l, 2)
                                );
                            };
                        c.parallelArrays.forEach(f);
                    },
                    hasData: function() {
                        return (
                            (this.visible &&
                                "undefined" !== typeof this.dataMax &&
                                "undefined" !== typeof this.dataMin) ||
                            (this.visible && this.yData && 0 < this.yData.length)
                        );
                    },
                    autoIncrement: function() {
                        var a = this.options,
                            e = this.xIncrement,
                            b,
                            f = a.pointIntervalUnit,
                            g = this.chart.time;
                        e = N(e, a.pointStart, 0);
                        this.pointInterval = b = N(this.pointInterval, a.pointInterval, 1);
                        f &&
                            ((a = new g.Date(e)),
                                "day" === f ?
                                g.set("Date", a, g.get("Date", a) + b) :
                                "month" === f ?
                                g.set("Month", a, g.get("Month", a) + b) :
                                "year" === f &&
                                g.set("FullYear", a, g.get("FullYear", a) + b),
                                (b = a.getTime() - e));
                        this.xIncrement = e + b;
                        return e;
                    },
                    setDataSortingOptions: function() {
                        var a = this.options;
                        h(this, {
                            requireSorting: !1,
                            sorted: !1,
                            enabledDataSorting: !0,
                            allowDG: !1,
                        });
                        m(a.pointRange) || (a.pointRange = 1);
                    },
                    setOptions: function(a) {
                        var c = this.chart,
                            e = c.options,
                            b = e.plotOptions,
                            f = c.userOptions || {};
                        a = H(a);
                        c = c.styledMode;
                        var h = { plotOptions: b, userOptions: a };
                        g(this, "setOptions", h);
                        var p = h.plotOptions[this.type],
                            A = f.plotOptions || {};
                        this.userOptions = h.userOptions;
                        f = H(p, b.series, f.plotOptions && f.plotOptions[this.type], a);
                        this.tooltipOptions = H(
                            d.tooltip,
                            d.plotOptions.series && d.plotOptions.series.tooltip,
                            d.plotOptions[this.type].tooltip,
                            e.tooltip.userOptions,
                            b.series && b.series.tooltip,
                            b[this.type].tooltip,
                            a.tooltip
                        );
                        this.stickyTracking = N(
                            a.stickyTracking,
                            A[this.type] && A[this.type].stickyTracking,
                            A.series && A.series.stickyTracking,
                            this.tooltipOptions.shared && !this.noSharedTooltip ?
                            !0 :
                            f.stickyTracking
                        );
                        null === p.marker && delete f.marker;
                        this.zoneAxis = f.zoneAxis;
                        e = this.zones = (f.zones || []).slice();
                        (!f.negativeColor && !f.negativeFillColor) ||
                        f.zones ||
                            ((b = {
                                    value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
                                    className: "highcharts-negative",
                                }),
                                c ||
                                ((b.color = f.negativeColor),
                                    (b.fillColor = f.negativeFillColor)),
                                e.push(b));
                        e.length &&
                            m(e[e.length - 1].value) &&
                            e.push(c ? {} : { color: this.color, fillColor: this.fillColor });
                        g(this, "afterSetOptions", { options: f });
                        return f;
                    },
                    getName: function() {
                        return N(this.options.name, "Series " + (this.index + 1));
                    },
                    getCyclic: function(a, e, b) {
                        var c = this.chart,
                            f = this.userOptions,
                            l = a + "Index",
                            g = a + "Counter",
                            d = b ?
                            b.length :
                            N(c.options.chart[a + "Count"], c[a + "Count"]);
                        if (!e) {
                            var h = N(f[l], f["_" + l]);
                            m(h) ||
                                (c.series.length || (c[g] = 0),
                                    (f["_" + l] = h = c[g] % d),
                                    (c[g] += 1));
                            b && (e = b[h]);
                        }
                        "undefined" !== typeof h && (this[l] = h);
                        this[a] = e;
                    },
                    getColor: function() {
                        this.chart.styledMode ?
                            this.getCyclic("color") :
                            this.options.colorByPoint ?
                            (this.options.color = null) :
                            this.getCyclic(
                                "color",
                                this.options.color || d.plotOptions[this.type].color,
                                this.chart.options.colors
                            );
                    },
                    getPointsCollection: function() {
                        return (this.hasGroupedData ? this.points : this.data) || [];
                    },
                    getSymbol: function() {
                        this.getCyclic(
                            "symbol",
                            this.options.marker.symbol,
                            this.chart.options.symbols
                        );
                    },
                    findPointIndex: function(a, f) {
                        var c = a.id,
                            l = a.x,
                            g = this.points,
                            d,
                            h = this.options.dataSorting;
                        if (c) var p = this.chart.get(c);
                        else if (this.linkedParent || this.enabledDataSorting) {
                            var m = h && h.matchByName ? "name" : "index";
                            p = b(g, function(c) {
                                return !c.touched && c[m] === a[m];
                            });
                            if (!p) return;
                        }
                        if (p) {
                            var A = p && p.index;
                            "undefined" !== typeof A && (d = !0);
                        }
                        "undefined" === typeof A && e(l) && (A = this.xData.indexOf(l, f)); -
                        1 !== A &&
                            "undefined" !== typeof A &&
                            this.cropped &&
                            (A = A >= this.cropStart ? A - this.cropStart : A);
                        !d && g[A] && g[A].touched && (A = void 0);
                        return A;
                    },
                    drawLegendSymbol: D.drawLineMarker,
                    updateData: function(a, b) {
                        var c = this.options,
                            f = c.dataSorting,
                            l = this.points,
                            g = [],
                            d,
                            h,
                            p,
                            A = this.requireSorting,
                            v = a.length === l.length,
                            q = !0;
                        this.xIncrement = null;
                        a.forEach(function(a, b) {
                            var h =
                                (m(a) &&
                                    this.pointClass.prototype.optionsToObject.call({ series: this },
                                        a
                                    )) || {};
                            var x = h.x;
                            if (h.id || e(x)) {
                                if (
                                    ((x = this.findPointIndex(h, p)), -1 === x || "undefined" === typeof x ?
                                        g.push(a) :
                                        l[x] && a !== c.data[x] ?
                                        (l[x].update(a, !1, null, !1),
                                            (l[x].touched = !0),
                                            A && (p = x + 1)) :
                                        l[x] && (l[x].touched = !0), !v || b !== x || (f && f.enabled) || this.hasDerivedData)
                                )
                                    d = !0;
                            } else g.push(a);
                        }, this);
                        if (d)
                            for (a = l.length; a--;)
                                (h = l[a]) && !h.touched && h.remove && h.remove(!1, b);
                        else
                            !v || (f && f.enabled) ?
                            (q = !1) :
                            (a.forEach(function(a, c) {
                                    l[c].update && a !== l[c].y && l[c].update(a, !1, null, !1);
                                }),
                                (g.length = 0));
                        l.forEach(function(a) {
                            a && (a.touched = !1);
                        });
                        if (!q) return !1;
                        g.forEach(function(a) {
                            this.addPoint(a, !1, null, null, !1);
                        }, this);
                        null === this.xIncrement &&
                            this.xData &&
                            this.xData.length &&
                            ((this.xIncrement = u(this.xData)), this.autoIncrement());
                        return !0;
                    },
                    setData: function(c, b, f, g) {
                        var l = this,
                            h = l.points,
                            d = (h && h.length) || 0,
                            p,
                            m = l.options,
                            x = l.chart,
                            A = m.dataSorting,
                            v = null,
                            C = l.xAxis;
                        v = m.turboThreshold;
                        var y = this.xData,
                            r = this.yData,
                            k = (p = l.pointArrayMap) && p.length,
                            n = m.keys,
                            H = 0,
                            K = 1,
                            w;
                        c = c || [];
                        p = c.length;
                        b = N(b, !0);
                        A && A.enabled && (c = this.sortData(c));
                        !1 !== g &&
                            p &&
                            d &&
                            !l.cropped &&
                            !l.hasGroupedData &&
                            l.visible &&
                            !l.isSeriesBoosting &&
                            (w = this.updateData(c, f));
                        if (!w) {
                            l.xIncrement = null;
                            l.colorCounter = 0;
                            this.parallelArrays.forEach(function(a) {
                                l[a + "Data"].length = 0;
                            });
                            if (v && p > v)
                                if (((v = l.getFirstValidPoint(c)), e(v)))
                                    for (f = 0; f < p; f++)
                                        (y[f] = this.autoIncrement()), (r[f] = c[f]);
                                else if (a(v))
                                if (k)
                                    for (f = 0; f < p; f++)
                                        (g = c[f]), (y[f] = g[0]), (r[f] = g.slice(1, k + 1));
                                else
                                    for (
                                        n &&
                                        ((H = n.indexOf("x")),
                                            (K = n.indexOf("y")),
                                            (H = 0 <= H ? H : 0),
                                            (K = 0 <= K ? K : 1)),
                                        f = 0; f < p; f++
                                    )
                                        (g = c[f]), (y[f] = g[H]), (r[f] = g[K]);
                            else q(12, !1, x);
                            else
                                for (f = 0; f < p; f++)
                                    "undefined" !== typeof c[f] &&
                                    ((g = { series: l }),
                                        l.pointClass.prototype.applyOptions.apply(g, [c[f]]),
                                        l.updateParallelArrays(g, f));
                            r && E(r[0]) && q(14, !0, x);
                            l.data = [];
                            l.options.data = l.userOptions.data = c;
                            for (f = d; f--;) h[f] && h[f].destroy && h[f].destroy();
                            C && (C.minRange = C.userMinRange);
                            l.isDirty = x.isDirtyBox = !0;
                            l.isDirtyData = !!h;
                            f = !1;
                        }
                        "point" === m.legendType &&
                            (this.processData(), this.generatePoints());
                        b && x.redraw(f);
                    },
                    sortData: function(a) {
                        var c = this,
                            e = c.options.dataSorting.sortKey || "y",
                            b = function(a, c) {
                                return (
                                    (m(c) &&
                                        a.pointClass.prototype.optionsToObject.call({ series: a },
                                            c
                                        )) || {}
                                );
                            };
                        a.forEach(function(e, f) {
                            a[f] = b(c, e);
                            a[f].index = f;
                        }, this);
                        a.concat()
                            .sort(function(a, c) {
                                a = f(e, a);
                                c = f(e, c);
                                return c < a ? -1 : c > a ? 1 : 0;
                            })
                            .forEach(function(a, c) {
                                a.x = c;
                            }, this);
                        c.linkedSeries &&
                            c.linkedSeries.forEach(function(c) {
                                var e = c.options,
                                    f = e.data;
                                (e.dataSorting && e.dataSorting.enabled) ||
                                !f ||
                                    (f.forEach(function(e, l) {
                                            f[l] = b(c, e);
                                            a[l] && ((f[l].x = a[l].x), (f[l].index = l));
                                        }),
                                        c.setData(f, !1));
                            });
                        return a;
                    },
                    getProcessedData: function(a) {
                        var c = this.xData,
                            e = this.yData,
                            b = c.length;
                        var f = 0;
                        var g = this.xAxis,
                            h = this.options;
                        var d = h.cropThreshold;
                        var p = a || this.getExtremesFromAll || h.getExtremesFromAll,
                            m = this.isCartesian;
                        a = g && g.val2lin;
                        h = !(!g || !g.logarithmic);
                        var A = this.requireSorting;
                        if (g) {
                            g = g.getExtremes();
                            var v = g.min;
                            var C = g.max;
                        }
                        if (m && this.sorted && !p && (!d || b > d || this.forceCrop))
                            if (c[b - 1] < v || c[0] > C)(c = []), (e = []);
                            else if (this.yData && (c[0] < v || c[b - 1] > C)) {
                            f = this.cropData(this.xData, this.yData, v, C);
                            c = f.xData;
                            e = f.yData;
                            f = f.start;
                            var y = !0;
                        }
                        for (d = c.length || 1; --d;)
                            if (
                                ((b = h ? a(c[d]) - a(c[d - 1]) : c[d] - c[d - 1]),
                                    0 < b && ("undefined" === typeof r || b < r))
                            )
                                var r = b;
                            else 0 > b && A && (q(15, !1, this.chart), (A = !1));
                        return {
                            xData: c,
                            yData: e,
                            cropped: y,
                            cropStart: f,
                            closestPointRange: r,
                        };
                    },
                    processData: function(a) {
                        var c = this.xAxis;
                        if (
                            this.isCartesian &&
                            !this.isDirty &&
                            !c.isDirty &&
                            !this.yAxis.isDirty &&
                            !a
                        )
                            return !1;
                        a = this.getProcessedData();
                        this.cropped = a.cropped;
                        this.cropStart = a.cropStart;
                        this.processedXData = a.xData;
                        this.processedYData = a.yData;
                        this.closestPointRange = this.basePointRange = a.closestPointRange;
                    },
                    cropData: function(a, e, b, f, g) {
                        var c = a.length,
                            l = 0,
                            h = c,
                            d;
                        g = N(g, this.cropShoulder);
                        for (d = 0; d < c; d++)
                            if (a[d] >= b) {
                                l = Math.max(0, d - g);
                                break;
                            }
                        for (b = d; b < c; b++)
                            if (a[b] > f) {
                                h = b + g;
                                break;
                            }
                        return {
                            xData: a.slice(l, h),
                            yData: e.slice(l, h),
                            start: l,
                            end: h,
                        };
                    },
                    generatePoints: function() {
                        var a = this.options,
                            e = a.data,
                            b = this.data,
                            f,
                            d = this.processedXData,
                            p = this.processedYData,
                            m = this.pointClass,
                            A = d.length,
                            v = this.cropStart || 0,
                            q = this.hasGroupedData;
                        a = a.keys;
                        var C = [],
                            y;
                        b || q || ((b = []), (b.length = e.length), (b = this.data = b));
                        a && q && (this.options.keys = !1);
                        for (y = 0; y < A; y++) {
                            var r = v + y;
                            if (q) {
                                var E = new m().init(this, [d[y]].concat(K(p[y])));
                                E.dataGroup = this.groupMap[y];
                                E.dataGroup.options &&
                                    ((E.options = E.dataGroup.options),
                                        h(E, E.dataGroup.options),
                                        delete E.dataLabels);
                            } else
                                (E = b[r]) ||
                                "undefined" === typeof e[r] ||
                                (b[r] = E = new m().init(this, e[r], d[y]));
                            E && ((E.index = r), (C[y] = E));
                        }
                        this.options.keys = a;
                        if (b && (A !== (f = b.length) || q))
                            for (y = 0; y < f; y++)
                                y !== v || q || (y += A),
                                b[y] && (b[y].destroyElements(), (b[y].plotX = void 0));
                        this.data = b;
                        this.points = C;
                        g(this, "afterGeneratePoints");
                    },
                    getXExtremes: function(a) {
                        return { min: F(a), max: u(a) };
                    },
                    getExtremes: function(c, b) {
                        var f = this.xAxis,
                            l = this.yAxis,
                            d = this.processedXData || this.xData,
                            h = [],
                            p = 0,
                            m = 0;
                        var A = 0;
                        var v = this.requireSorting ? this.cropShoulder : 0,
                            q = l ? l.positiveValuesOnly : !1,
                            y;
                        c = c || this.stackedYData || this.processedYData || [];
                        l = c.length;
                        f && ((A = f.getExtremes()), (m = A.min), (A = A.max));
                        for (y = 0; y < l; y++) {
                            var C = d[y];
                            var E = c[y];
                            var r = (e(E) || a(E)) && (E.length || 0 < E || !q);
                            C =
                                b ||
                                this.getExtremesFromAll ||
                                this.options.getExtremesFromAll ||
                                this.cropped ||
                                !f ||
                                ((d[y + v] || C) >= m && (d[y - v] || C) <= A);
                            if (r && C)
                                if ((r = E.length))
                                    for (; r--;) e(E[r]) && (h[p++] = E[r]);
                                else h[p++] = E;
                        }
                        c = { dataMin: F(h), dataMax: u(h) };
                        g(this, "afterGetExtremes", { dataExtremes: c });
                        return c;
                    },
                    applyExtremes: function() {
                        var a = this.getExtremes();
                        this.dataMin = a.dataMin;
                        this.dataMax = a.dataMax;
                        return a;
                    },
                    getFirstValidPoint: function(a) {
                        for (var c = null, e = a.length, b = 0; null === c && b < e;)
                            (c = a[b]), b++;
                        return c;
                    },
                    translate: function() {
                        this.processedXData || this.processData();
                        this.generatePoints();
                        var c = this.options,
                            b = c.stacking,
                            f = this.xAxis,
                            d = f.categories,
                            h = this.enabledDataSorting,
                            p = this.yAxis,
                            A = this.points,
                            v = A.length,
                            q = !!this.modifyValue,
                            y,
                            C = this.pointPlacementToXValue(),
                            E = !!C,
                            k = c.threshold,
                            n = c.startFromThreshold ? k : 0,
                            H,
                            K = this.zoneAxis || "y",
                            u = Number.MAX_VALUE;
                        for (y = 0; y < v; y++) {
                            var P = A[y],
                                t = P.x,
                                z = P.y,
                                F = P.low,
                                L =
                                b &&
                                p.stacking &&
                                p.stacking.stacks[
                                    (this.negStacks && z < (n ? 0 : k) ? "-" : "") +
                                    this.stackKey
                                ];
                            if (
                                (p.positiveValuesOnly && !p.validatePositiveValue(z)) ||
                                (f.positiveValuesOnly && !f.validatePositiveValue(t))
                            )
                                P.isNull = !0;
                            P.plotX = H = r(
                                w(
                                    f.translate(t, 0, 0, 0, 1, C, "flags" === this.type), -1e5,
                                    1e5
                                )
                            );
                            if (b && this.visible && L && L[t]) {
                                var G = this.getStackIndicator(G, t, this.index);
                                if (!P.isNull) {
                                    var B = L[t];
                                    var D = B.points[G.key];
                                }
                            }
                            a(D) &&
                                ((F = D[0]),
                                    (z = D[1]),
                                    F === n && G.key === L[t].base && (F = N(e(k) && k, p.min)),
                                    p.positiveValuesOnly && 0 >= F && (F = null),
                                    (P.total = P.stackTotal = B.total),
                                    (P.percentage = B.total && (P.y / B.total) * 100),
                                    (P.stackY = z),
                                    this.irregularWidths ||
                                    B.setOffset(this.pointXOffset || 0, this.barW || 0));
                            P.yBottom = m(F) ?
                                w(p.translate(F, 0, 1, 0, 1), -1e5, 1e5) :
                                null;
                            q && (z = this.modifyValue(z, P));
                            P.plotY =
                                "number" === typeof z && Infinity !== z ?
                                w(p.translate(z, 0, 1, 0, 1), -1e5, 1e5) :
                                void 0;
                            P.isInside = this.isPointInside(P);
                            P.clientX = E ? r(f.translate(t, 0, 0, 0, 1, C)) : H;
                            P.negative = P[K] < (c[K + "Threshold"] || k || 0);
                            P.category = d && "undefined" !== typeof d[P.x] ? d[P.x] : P.x;
                            if (!P.isNull && !1 !== P.visible) {
                                "undefined" !== typeof O && (u = Math.min(u, Math.abs(H - O)));
                                var O = H;
                            }
                            P.zone = this.zones.length && P.getZone();
                            !P.graphic && this.group && h && (P.isNew = !0);
                        }
                        this.closestPointRangePx = u;
                        g(this, "afterTranslate");
                    },
                    getValidPoints: function(a, e, b) {
                        var c = this.chart;
                        return (a || this.points || []).filter(function(a) {
                            return e && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ?
                                !1 :
                                !1 !== a.visible && (b || !a.isNull);
                        });
                    },
                    getClipBox: function(a, e) {
                        var c = this.options,
                            b = this.chart,
                            f = b.inverted,
                            l = this.xAxis,
                            g = l && this.yAxis,
                            d = b.options.chart.scrollablePlotArea || {};
                        a && !1 === c.clip && g ?
                            (a = f ?
                                {
                                    y: -b.chartWidth + g.len + g.pos,
                                    height: b.chartWidth,
                                    width: b.chartHeight,
                                    x: -b.chartHeight + l.len + l.pos,
                                } :
                                {
                                    y: -g.pos,
                                    height: b.chartHeight,
                                    width: b.chartWidth,
                                    x: -l.pos,
                                }) :
                            ((a = this.clipBox || b.clipBox),
                                e &&
                                ((a.width = b.plotSizeX),
                                    (a.x =
                                        (b.scrollablePixelsX || 0) * (d.scrollPositionX || 0))));
                        return e ? { width: a.width, x: a.x } : a;
                    },
                    setClip: function(a) {
                        var c = this.chart,
                            b = this.options,
                            e = c.renderer,
                            f = c.inverted,
                            g = this.clipBox,
                            d = this.getClipBox(a),
                            h =
                            this.sharedClipKey || [
                                "_sharedClip",
                                a && a.duration,
                                a && a.easing,
                                d.height,
                                b.xAxis,
                                b.yAxis,
                            ].join(),
                            p = c[h],
                            m = c[h + "m"];
                        a &&
                            ((d.width = 0),
                                f && (d.x = c.plotHeight + (!1 !== b.clip ? 0 : c.plotTop)));
                        p
                            ?
                            c.hasLoaded || p.attr(d) :
                            (a &&
                                (c[h + "m"] = m = e.clipRect(
                                    f ? c.plotSizeX + 99 : -99,
                                    f ? -c.plotLeft : -c.plotTop,
                                    99,
                                    f ? c.chartWidth : c.chartHeight
                                )),
                                (c[h] = p = e.clipRect(d)),
                                (p.count = { length: 0 }));
                        a &&
                            !p.count[this.index] &&
                            ((p.count[this.index] = !0), (p.count.length += 1));
                        if (!1 !== b.clip || a)
                            this.group.clip(a || g ? p : c.clipRect),
                            this.markerGroup.clip(m),
                            (this.sharedClipKey = h);
                        a ||
                            (p.count[this.index] &&
                                (delete p.count[this.index], --p.count.length),
                                0 === p.count.length &&
                                h &&
                                c[h] &&
                                (g || (c[h] = c[h].destroy()),
                                    c[h + "m"] && (c[h + "m"] = c[h + "m"].destroy())));
                    },
                    animate: function(a) {
                        var c = this.chart,
                            b = G(this.options.animation);
                        if (!c.hasRendered)
                            if (a) this.setClip(b);
                            else {
                                var e = this.sharedClipKey;
                                a = c[e];
                                var f = this.getClipBox(b, !0);
                                a && a.animate(f, b);
                                c[e + "m"] &&
                                    c[e + "m"].animate({ width: f.width + 99, x: f.x - (c.inverted ? 0 : 99) },
                                        b
                                    );
                            }
                    },
                    afterAnimate: function() {
                        this.setClip();
                        g(this, "afterAnimate");
                        this.finishedAnimating = !0;
                    },
                    drawPoints: function() {
                        var a = this.points,
                            b = this.chart,
                            e,
                            f,
                            g = this.options.marker,
                            d = this[this.specialGroup] || this.markerGroup,
                            h = this.xAxis,
                            p = N(
                                g.enabled, !h || h.isRadial ? !0 : null,
                                this.closestPointRangePx >= g.enabledThreshold * g.radius
                            );
                        if (!1 !== g.enabled || this._hasPointMarkers)
                            for (e = 0; e < a.length; e++) {
                                var m = a[e];
                                var A = (f = m.graphic) ? "animate" : "attr";
                                var v = m.marker || {};
                                var q = !!m.marker;
                                if (
                                    ((p && "undefined" === typeof v.enabled) || v.enabled) &&
                                    !m.isNull &&
                                    !1 !== m.visible
                                ) {
                                    var y = N(v.symbol, this.symbol);
                                    var C = this.markerAttribs(m, m.selected && "select");
                                    this.enabledDataSorting &&
                                        (m.startXPos = h.reversed ? -C.width : h.width);
                                    var E = !1 !== m.isInside;
                                    f
                                        ?
                                        f[E ? "show" : "hide"](E).animate(C) :
                                        E &&
                                        (0 < C.width || m.hasImage) &&
                                        ((m.graphic = f = b.renderer
                                                .symbol(y, C.x, C.y, C.width, C.height, q ? v : g)
                                                .add(d)),
                                            this.enabledDataSorting &&
                                            b.hasRendered &&
                                            (f.attr({ x: m.startXPos }), (A = "animate")));
                                    f && "animate" === A && f[E ? "show" : "hide"](E).animate(C);
                                    if (f && !b.styledMode)
                                        f[A](this.pointAttribs(m, m.selected && "select"));
                                    f && f.addClass(m.getClassName(), !0);
                                } else f && (m.graphic = f.destroy());
                            }
                    },
                    markerAttribs: function(a, b) {
                        var c = this.options,
                            e = c.marker,
                            f = a.marker || {},
                            l = f.symbol || e.symbol,
                            g = N(f.radius, e.radius);
                        b &&
                            ((e = e.states[b]),
                                (b = f.states && f.states[b]),
                                (g = N(
                                    b && b.radius,
                                    e && e.radius,
                                    g + ((e && e.radiusPlus) || 0)
                                )));
                        a.hasImage = l && 0 === l.indexOf("url");
                        a.hasImage && (g = 0);
                        a = {
                            x: c.crisp ? Math.floor(a.plotX) - g : a.plotX - g,
                            y: a.plotY - g,
                        };
                        g && (a.width = a.height = 2 * g);
                        return a;
                    },
                    pointAttribs: function(a, b) {
                        var c = this.options.marker,
                            e = a && a.options,
                            f = (e && e.marker) || {},
                            l = this.color,
                            g = e && e.color,
                            h = a && a.color;
                        e = N(f.lineWidth, c.lineWidth);
                        var d = a && a.zone && a.zone.color;
                        a = 1;
                        l = g || d || h || l;
                        g = f.fillColor || c.fillColor || l;
                        l = f.lineColor || c.lineColor || l;
                        b = b || "normal";
                        c = c.states[b];
                        b = (f.states && f.states[b]) || {};
                        e = N(
                            b.lineWidth,
                            c.lineWidth,
                            e + N(b.lineWidthPlus, c.lineWidthPlus, 0)
                        );
                        g = b.fillColor || c.fillColor || g;
                        l = b.lineColor || c.lineColor || l;
                        a = N(b.opacity, c.opacity, a);
                        return { stroke: l, "stroke-width": e, fill: g, opacity: a };
                    },
                    destroy: function(a) {
                        var c = this,
                            b = c.chart,
                            e = /AppleWebKit\/533/.test(v.navigator.userAgent),
                            f,
                            h,
                            d = c.data || [],
                            p,
                            m;
                        g(c, "destroy");
                        this.removeEvents(a);
                        (c.axisTypes || []).forEach(function(a) {
                            (m = c[a]) &&
                            m.series &&
                                (L(m.series, c), (m.isDirty = m.forceRedraw = !0));
                        });
                        c.legendItem && c.chart.legend.destroyItem(c);
                        for (h = d.length; h--;)(p = d[h]) && p.destroy && p.destroy();
                        c.points = null;
                        z.clearTimeout(c.animationTimeout);
                        y(c, function(a, c) {
                            a instanceof n &&
                                !a.survive &&
                                ((f = e && "group" === c ? "hide" : "destroy"), a[f]());
                        });
                        b.hoverSeries === c && (b.hoverSeries = null);
                        L(b.series, c);
                        b.orderSeries();
                        y(c, function(b, e) {
                            (a && "hcEvents" === e) || delete c[e];
                        });
                    },
                    getGraphPath: function(a, b, e) {
                        var c = this,
                            f = c.options,
                            l = f.step,
                            g,
                            h = [],
                            d = [],
                            p;
                        a = a || c.points;
                        (g = a.reversed) && a.reverse();
                        (l = { right: 1, center: 2 }[l] || (l && 3)) && g && (l = 4 - l);
                        a = this.getValidPoints(a, !1, !(f.connectNulls && !b && !e));
                        a.forEach(function(g, A) {
                            var v = g.plotX,
                                q = g.plotY,
                                x = a[A - 1];
                            (g.leftCliff || (x && x.rightCliff)) && !e && (p = !0);
                            g.isNull && !m(b) && 0 < A ?
                                (p = !f.connectNulls) :
                                g.isNull && !b ?
                                (p = !0) :
                                (0 === A || p ?
                                    (A = [
                                        ["M", g.plotX, g.plotY]
                                    ]) :
                                    c.getPointSpline ?
                                    (A = [c.getPointSpline(a, g, A)]) :
                                    l ?
                                    ((A =
                                            1 === l ?
                                            [
                                                ["L", x.plotX, q]
                                            ] :
                                            2 === l ?
                                            [
                                                ["L", (x.plotX + v) / 2, x.plotY],
                                                ["L", (x.plotX + v) / 2, q],
                                            ] :
                                            [
                                                ["L", v, x.plotY]
                                            ]),
                                        A.push(["L", v, q])) :
                                    (A = [
                                        ["L", v, q]
                                    ]),
                                    d.push(g.x),
                                    l && (d.push(g.x), 2 === l && d.push(g.x)),
                                    h.push.apply(h, A),
                                    (p = !1));
                        });
                        h.xMap = d;
                        return (c.graphPath = h);
                    },
                    drawGraph: function() {
                        var a = this,
                            b = this.options,
                            e = (this.gappedPath || this.getGraphPath).call(this),
                            f = this.chart.styledMode,
                            g = [
                                ["graph", "highcharts-graph"]
                            ];
                        f || g[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
                        g = a.getZonesGraphs(g);
                        g.forEach(function(c, l) {
                            var g = c[0],
                                h = a[g],
                                d = h ? "animate" : "attr";
                            h
                                ?
                                ((h.endX = a.preventGraphAnimation ? null : e.xMap),
                                    h.animate({ d: e })) :
                                e.length &&
                                (a[g] = h = a.chart.renderer
                                    .path(e)
                                    .addClass(c[1])
                                    .attr({ zIndex: 1 })
                                    .add(a.group));
                            h &&
                                !f &&
                                ((g = {
                                        stroke: c[2],
                                        "stroke-width": b.lineWidth,
                                        fill: (a.fillGraph && a.color) || "none",
                                    }),
                                    c[3] ?
                                    (g.dashstyle = c[3]) :
                                    "square" !== b.linecap &&
                                    (g["stroke-linecap"] = g["stroke-linejoin"] = "round"),
                                    h[d](g).shadow(2 > l && b.shadow));
                            h && ((h.startX = e.xMap), (h.isArea = e.isArea));
                        });
                    },
                    getZonesGraphs: function(a) {
                        this.zones.forEach(function(c, b) {
                            b = [
                                "zone-graph-" + b,
                                "highcharts-graph highcharts-zone-graph-" +
                                b +
                                " " +
                                (c.className || ""),
                            ];
                            this.chart.styledMode ||
                                b.push(
                                    c.color || this.color,
                                    c.dashStyle || this.options.dashStyle
                                );
                            a.push(b);
                        }, this);
                        return a;
                    },
                    applyZones: function() {
                        var a = this,
                            b = this.chart,
                            e = b.renderer,
                            f = this.zones,
                            g,
                            h,
                            d = this.clips || [],
                            p,
                            m = this.graph,
                            A = this.area,
                            v = Math.max(b.chartWidth, b.chartHeight),
                            q = this[(this.zoneAxis || "y") + "Axis"],
                            y = b.inverted,
                            C,
                            E,
                            r,
                            k = !1,
                            n,
                            H;
                        if (f.length && (m || A) && q && "undefined" !== typeof q.min) {
                            var K = q.reversed;
                            var u = q.horiz;
                            m && !this.showLine && m.hide();
                            A && A.hide();
                            var P = q.getExtremes();
                            f.forEach(function(c, f) {
                                g = K ? (u ? b.plotWidth : 0) : u ? 0 : q.toPixels(P.min) || 0;
                                g = w(N(h, g), 0, v);
                                h = w(Math.round(q.toPixels(N(c.value, P.max), !0) || 0), 0, v);
                                k && (g = h = q.toPixels(P.max));
                                C = Math.abs(g - h);
                                E = Math.min(g, h);
                                r = Math.max(g, h);
                                q.isXAxis ?
                                    ((p = { x: y ? r : E, y: 0, width: C, height: v }),
                                        u || (p.x = b.plotHeight - p.x)) :
                                    ((p = { x: 0, y: y ? r : E, width: v, height: C }),
                                        u && (p.y = b.plotWidth - p.y));
                                y &&
                                    e.isVML &&
                                    (p = q.isXAxis ?
                                        {
                                            x: 0,
                                            y: K ? E : r,
                                            height: p.width,
                                            width: b.chartWidth,
                                        } :
                                        {
                                            x: p.y - b.plotLeft - b.spacingBox.x,
                                            y: 0,
                                            width: p.height,
                                            height: b.chartHeight,
                                        });
                                d[f] ? d[f].animate(p) : (d[f] = e.clipRect(p));
                                n = a["zone-area-" + f];
                                H = a["zone-graph-" + f];
                                m && H && H.clip(d[f]);
                                A && n && n.clip(d[f]);
                                k = c.value > P.max;
                                a.resetZones && 0 === h && (h = void 0);
                            });
                            this.clips = d;
                        } else a.visible && (m && m.show(!0), A && A.show(!0));
                    },
                    invertGroups: function(a) {
                        function c() {
                            ["group", "markerGroup"].forEach(function(c) {
                                b[c] &&
                                    (e.renderer.isVML &&
                                        b[c].attr({ width: b.yAxis.len, height: b.xAxis.len }),
                                        (b[c].width = b.yAxis.len),
                                        (b[c].height = b.xAxis.len),
                                        b[c].invert(b.isRadialSeries ? !1 : a));
                            });
                        }
                        var b = this,
                            e = b.chart;
                        b.xAxis &&
                            (b.eventsToUnbind.push(B(e, "resize", c)),
                                c(),
                                (b.invertGroups = c));
                    },
                    plotGroup: function(a, b, e, f, g) {
                        var c = this[a],
                            l = !c;
                        e = { visibility: e, zIndex: f || 0.1 };
                        "undefined" === typeof this.opacity ||
                            this.chart.styledMode ||
                            "inactive" === this.state ||
                            (e.opacity = this.opacity);
                        l && (this[a] = c = this.chart.renderer.g().add(g));
                        c.addClass(
                            "highcharts-" +
                            b +
                            " highcharts-series-" +
                            this.index +
                            " highcharts-" +
                            this.type +
                            "-series " +
                            (m(this.colorIndex) ?
                                "highcharts-color-" + this.colorIndex + " " :
                                "") +
                            (this.options.className || "") +
                            (c.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0
                        );
                        c.attr(e)[l ? "attr" : "animate"](this.getPlotBox());
                        return c;
                    },
                    getPlotBox: function() {
                        var a = this.chart,
                            b = this.xAxis,
                            e = this.yAxis;
                        a.inverted && ((b = e), (e = this.xAxis));
                        return {
                            translateX: b ? b.left : a.plotLeft,
                            translateY: e ? e.top : a.plotTop,
                            scaleX: 1,
                            scaleY: 1,
                        };
                    },
                    removeEvents: function(a) {
                        a
                            ?
                            this.eventsToUnbind.length &&
                            (this.eventsToUnbind.forEach(function(a) {
                                    a();
                                }),
                                (this.eventsToUnbind.length = 0)) :
                            P(this);
                    },
                    render: function() {
                        var a = this,
                            b = a.chart,
                            e = a.options,
                            f = G(e.animation),
                            h = !a.finishedAnimating && b.renderer.isSVG && f.duration,
                            d = a.visible ? "inherit" : "hidden",
                            p = e.zIndex,
                            m = a.hasRendered,
                            v = b.seriesGroup,
                            q = b.inverted;
                        g(this, "render");
                        var y = a.plotGroup("group", "series", d, p, v);
                        a.markerGroup = a.plotGroup("markerGroup", "markers", d, p, v);
                        h && a.animate && a.animate(!0);
                        y.inverted = a.isCartesian || a.invertable ? q : !1;
                        a.drawGraph && (a.drawGraph(), a.applyZones());
                        a.visible && a.drawPoints();
                        a.drawDataLabels && a.drawDataLabels();
                        a.redrawPoints && a.redrawPoints();
                        a.drawTracker &&
                            !1 !== a.options.enableMouseTracking &&
                            a.drawTracker();
                        a.invertGroups(q);
                        !1 === e.clip || a.sharedClipKey || m || y.clip(b.clipRect);
                        h && a.animate && a.animate();
                        m ||
                            (h && f.defer && (h += f.defer),
                                (a.animationTimeout = A(function() {
                                    a.afterAnimate();
                                }, h || 0)));
                        a.isDirty = !1;
                        a.hasRendered = !0;
                        g(a, "afterRender");
                    },
                    redraw: function() {
                        var a = this.chart,
                            b = this.isDirty || this.isDirtyData,
                            e = this.group,
                            f = this.xAxis,
                            g = this.yAxis;
                        e &&
                            (a.inverted &&
                                e.attr({ width: a.plotWidth, height: a.plotHeight }),
                                e.animate({
                                    translateX: N(f && f.left, a.plotLeft),
                                    translateY: N(g && g.top, a.plotTop),
                                }));
                        this.translate();
                        this.render();
                        b && delete this.kdTree;
                    },
                    kdAxisArray: ["clientX", "plotY"],
                    searchPoint: function(a, b) {
                        var c = this.xAxis,
                            e = this.yAxis,
                            f = this.chart.inverted;
                        return this.searchKDTree({
                                clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                                plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos,
                            },
                            b,
                            a
                        );
                    },
                    buildKDTree: function(a) {
                        function c(a, e, f) {
                            var g;
                            if ((g = a && a.length)) {
                                var l = b.kdAxisArray[e % f];
                                a.sort(function(a, c) {
                                    return a[l] - c[l];
                                });
                                g = Math.floor(g / 2);
                                return {
                                    point: a[g],
                                    left: c(a.slice(0, g), e + 1, f),
                                    right: c(a.slice(g + 1), e + 1, f),
                                };
                            }
                        }
                        this.buildingKdTree = !0;
                        var b = this,
                            e = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                        delete b.kdTree;
                        A(
                            function() {
                                b.kdTree = c(b.getValidPoints(null, !b.directTouch), e, e);
                                b.buildingKdTree = !1;
                            },
                            b.options.kdNow || (a && "touchstart" === a.type) ? 0 : 1
                        );
                    },
                    searchKDTree: function(a, b, e) {
                        function c(a, b, e, d) {
                            var p = b.point,
                                A = f.kdAxisArray[e % d],
                                v = p;
                            var q = m(a[g]) && m(p[g]) ? Math.pow(a[g] - p[g], 2) : null;
                            var y = m(a[l]) && m(p[l]) ? Math.pow(a[l] - p[l], 2) : null;
                            y = (q || 0) + (y || 0);
                            p.dist = m(y) ? Math.sqrt(y) : Number.MAX_VALUE;
                            p.distX = m(q) ? Math.sqrt(q) : Number.MAX_VALUE;
                            A = a[A] - p[A];
                            y = 0 > A ? "left" : "right";
                            q = 0 > A ? "right" : "left";
                            b[y] && ((y = c(a, b[y], e + 1, d)), (v = y[h] < v[h] ? y : p));
                            b[q] &&
                                Math.sqrt(A * A) < v[h] &&
                                ((a = c(a, b[q], e + 1, d)), (v = a[h] < v[h] ? a : v));
                            return v;
                        }
                        var f = this,
                            g = this.kdAxisArray[0],
                            l = this.kdAxisArray[1],
                            h = b ? "distX" : "dist";
                        b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                        this.kdTree || this.buildingKdTree || this.buildKDTree(e);
                        if (this.kdTree) return c(a, this.kdTree, b, b);
                    },
                    pointPlacementToXValue: function() {
                        var a = this.options,
                            b = a.pointRange,
                            f = this.xAxis;
                        a = a.pointPlacement;
                        "between" === a && (a = f.reversed ? -0.5 : 0.5);
                        return e(a) ? a * N(b, f.pointRange) : 0;
                    },
                    isPointInside: function(a) {
                        return (
                            "undefined" !== typeof a.plotY &&
                            "undefined" !== typeof a.plotX &&
                            0 <= a.plotY &&
                            a.plotY <= this.yAxis.len &&
                            0 <= a.plotX &&
                            a.plotX <= this.xAxis.len
                        );
                    },
                }
            );
            ("");
            return k;
        }
    );
    Q(
        k,
        "Series/LineSeries.js", [k["Core/Series/CartesianSeries.js"], k["Core/Globals.js"]],
        function(k, t) {
            t.Series = k;
            return t.Series;
        }
    );
    Q(
        k,
        "Extensions/Stacking.js", [
            k["Core/Axis/Axis.js"],
            k["Core/Chart/Chart.js"],
            k["Core/Globals.js"],
            k["Core/Axis/StackingAxis.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J) {
            var B = J.correctFloat,
                n = J.defined,
                z = J.destroyObjectProperties,
                G = J.format,
                d = J.isNumber,
                O = J.pick;
            ("");
            var u = I.Series,
                F = (function() {
                    function k(d, m, k, q, h) {
                        var b = d.chart.inverted;
                        this.axis = d;
                        this.isNegative = k;
                        this.options = m = m || {};
                        this.x = q;
                        this.total = null;
                        this.points = {};
                        this.hasValidPoints = !1;
                        this.stack = h;
                        this.rightCliff = this.leftCliff = 0;
                        this.alignOptions = {
                            align: m.align || (b ? (k ? "left" : "right") : "center"),
                            verticalAlign: m.verticalAlign || (b ? "middle" : k ? "bottom" : "top"),
                            y: m.y,
                            x: m.x,
                        };
                        this.textAlign =
                            m.textAlign || (b ? (k ? "right" : "left") : "center");
                    }
                    k.prototype.destroy = function() {
                        z(this, this.axis);
                    };
                    k.prototype.render = function(d) {
                        var m = this.axis.chart,
                            k = this.options,
                            q = k.format;
                        q = q ? G(q, this, m) : k.formatter.call(this);
                        this.label ?
                            this.label.attr({ text: q, visibility: "hidden" }) :
                            ((this.label = m.renderer.label(
                                    q,
                                    null,
                                    null,
                                    k.shape,
                                    null,
                                    null,
                                    k.useHTML, !1,
                                    "stack-labels"
                                )),
                                (q = {
                                    r: k.borderRadius || 0,
                                    text: q,
                                    rotation: k.rotation,
                                    padding: O(k.padding, 5),
                                    visibility: "hidden",
                                }),
                                m.styledMode ||
                                ((q.fill = k.backgroundColor),
                                    (q.stroke = k.borderColor),
                                    (q["stroke-width"] = k.borderWidth),
                                    this.label.css(k.style)),
                                this.label.attr(q),
                                this.label.added || this.label.add(d));
                        this.label.labelrank = m.plotHeight;
                    };
                    k.prototype.setOffset = function(k, m, w, q, h) {
                        var b = this.axis,
                            g = b.chart;
                        q = b.translate(
                            b.stacking.usePercentage ? 100 : q ? q : this.total,
                            0,
                            0,
                            0,
                            1
                        );
                        w = b.translate(w ? w : 0);
                        w = n(q) && Math.abs(q - w);
                        k = O(h, g.xAxis[0].translate(this.x)) + k;
                        b = n(q) && this.getStackBox(g, this, k, q, m, w, b);
                        m = this.label;
                        w = this.isNegative;
                        k = "justify" === O(this.options.overflow, "justify");
                        var f = this.textAlign;
                        m &&
                            b &&
                            ((h = m.getBBox()),
                                (q = m.padding),
                                (f =
                                    "left" === f ?
                                    g.inverted ?
                                    -q :
                                    q :
                                    "right" === f ?
                                    h.width :
                                    g.inverted && "center" === f ?
                                    h.width / 2 :
                                    g.inverted ?
                                    w ?
                                    h.width + q :
                                    -q :
                                    h.width / 2),
                                (w = g.inverted ? h.height / 2 : w ? -q : h.height),
                                (this.alignOptions.x = O(this.options.x, 0)),
                                (this.alignOptions.y = O(this.options.y, 0)),
                                (b.x -= f),
                                (b.y -= w),
                                m.align(this.alignOptions, null, b),
                                g.isInsidePlot(
                                    m.alignAttr.x + f - this.alignOptions.x,
                                    m.alignAttr.y + w - this.alignOptions.y
                                ) ?
                                m.show() :
                                ((m.alignAttr.y = -9999), (k = !1)),
                                k &&
                                u.prototype.justifyDataLabel.call(
                                    this.axis,
                                    m,
                                    this.alignOptions,
                                    m.alignAttr,
                                    h,
                                    b
                                ),
                                m.attr({ x: m.alignAttr.x, y: m.alignAttr.y }),
                                O(!k && this.options.crop, !0) &&
                                ((g =
                                        d(m.x) &&
                                        d(m.y) &&
                                        g.isInsidePlot(m.x - q + m.width, m.y) &&
                                        g.isInsidePlot(m.x + q, m.y)) ||
                                    m.hide()));
                    };
                    k.prototype.getStackBox = function(d, m, k, q, h, b, g) {
                        var f = m.axis.reversed,
                            a = d.inverted,
                            p = g.height + g.pos - (a ? d.plotLeft : d.plotTop);
                        m = (m.isNegative && !f) || (!m.isNegative && f);
                        return {
                            x: a ?
                                m ?
                                q - g.right :
                                q - b + g.pos - d.plotLeft :
                                k + d.xAxis[0].transB - d.plotLeft,
                            y: a ? g.height - k - h : m ? p - q - b : p - q,
                            width: a ? b : h,
                            height: a ? h : b,
                        };
                    };
                    return k;
                })();
            t.prototype.getStacks = function() {
                var d = this,
                    k = d.inverted;
                d.yAxis.forEach(function(d) {
                    d.stacking &&
                        d.stacking.stacks &&
                        d.hasVisibleSeries &&
                        (d.stacking.oldStacks = d.stacking.stacks);
                });
                d.series.forEach(function(m) {
                    var r = (m.xAxis && m.xAxis.options) || {};
                    !m.options.stacking ||
                        (!0 !== m.visible && !1 !== d.options.chart.ignoreHiddenSeries) ||
                        (m.stackKey = [
                            m.type,
                            O(m.options.stack, ""),
                            k ? r.top : r.left,
                            k ? r.height : r.width,
                        ].join());
                });
            };
            D.compose(k);
            u.prototype.setGroupedPoints = function() {
                this.options.centerInCategory &&
                    (this.is("column") || this.is("columnrange")) &&
                    !this.options.stacking &&
                    1 < this.chart.series.length &&
                    u.prototype.setStackedPoints.call(this, "group");
            };
            u.prototype.setStackedPoints = function(d) {
                var k = d || this.options.stacking;
                if (
                    k &&
                    (!0 === this.visible ||
                        !1 === this.chart.options.chart.ignoreHiddenSeries)
                ) {
                    var m = this.processedXData,
                        w = this.processedYData,
                        q = [],
                        h = w.length,
                        b = this.options,
                        g = b.threshold,
                        f = O(b.startFromThreshold && g, 0);
                    b = b.stack;
                    d = d ? this.type + "," + k : this.stackKey;
                    var a = "-" + d,
                        p = this.negStacks,
                        e = this.yAxis,
                        E = e.stacking.stacks,
                        H = e.stacking.oldStacks,
                        y,
                        u;
                    e.stacking.stacksTouched += 1;
                    for (u = 0; u < h; u++) {
                        var P = m[u];
                        var K = w[u];
                        var A = this.getStackIndicator(A, P, this.index);
                        var C = A.key;
                        var v = (y = p && K < (f ? 0 : g)) ? a : d;
                        E[v] || (E[v] = {});
                        E[v][P] ||
                            (H[v] && H[v][P] ?
                                ((E[v][P] = H[v][P]), (E[v][P].total = null)) :
                                (E[v][P] = new F(e, e.options.stackLabels, y, P, b)));
                        v = E[v][P];
                        null !== K ?
                            ((v.points[C] = v.points[this.index] = [O(v.cumulative, f)]),
                                n(v.cumulative) || (v.base = C),
                                (v.touched = e.stacking.stacksTouched),
                                0 < A.index &&
                                !1 === this.singleStacks &&
                                (v.points[C][0] = v.points[this.index + "," + P + ",0"][0])) :
                            (v.points[C] = v.points[this.index] = null);
                        "percent" === k
                            ?
                            ((y = y ? d : a),
                                p && E[y] && E[y][P] ?
                                ((y = E[y][P]),
                                    (v.total = y.total =
                                        Math.max(y.total, v.total) + Math.abs(K) || 0)) :
                                (v.total = B(v.total + (Math.abs(K) || 0)))) :
                            "group" === k ?
                            null !== K && (v.total = (v.total || 0) + 1) :
                            (v.total = B(v.total + (K || 0)));
                        v.cumulative =
                            "group" === k ?
                            (v.total || 1) - 1 :
                            O(v.cumulative, f) + (K || 0);
                        null !== K &&
                            (v.points[C].push(v.cumulative),
                                (q[u] = v.cumulative),
                                (v.hasValidPoints = !0));
                    }
                    "percent" === k && (e.stacking.usePercentage = !0);
                    "group" !== k && (this.stackedYData = q);
                    e.stacking.oldStacks = {};
                }
            };
            u.prototype.modifyStacks = function() {
                var d = this,
                    k = d.stackKey,
                    m = d.yAxis.stacking.stacks,
                    n = d.processedXData,
                    q,
                    h = d.options.stacking;
                d[h + "Stacker"] && [k, "-" + k].forEach(function(b) {
                    for (var g = n.length, f, a; g--;)
                        if (
                            ((f = n[g]),
                                (q = d.getStackIndicator(q, f, d.index, b)),
                                (a = (f = m[b] && m[b][f]) && f.points[q.key]))
                        )
                            d[h + "Stacker"](a, f, g);
                });
            };
            u.prototype.percentStacker = function(d, k, m) {
                k = k.total ? 100 / k.total : 0;
                d[0] = B(d[0] * k);
                d[1] = B(d[1] * k);
                this.stackedYData[m] = d[1];
            };
            u.prototype.getStackIndicator = function(d, k, m, u) {
                !n(d) || d.x !== k || (u && d.key !== u) ?
                    (d = { x: k, index: 0, key: u }) :
                    d.index++;
                d.key = [m, k, d.index].join();
                return d;
            };
            I.StackItem = F;
            return I.StackItem;
        }
    );
    Q(
        k,
        "Core/Dynamics.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Axis/Axis.js"],
            k["Core/Series/Series.js"],
            k["Core/Chart/Chart.js"],
            k["Core/Globals.js"],
            k["Series/LineSeries.js"],
            k["Core/Options.js"],
            k["Core/Series/Point.js"],
            k["Core/Time.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n, z, G, d) {
            var B = k.animate,
                u = k.setAnimation,
                F = I.seriesTypes,
                w = n.time,
                r = d.addEvent,
                m = d.createElement,
                L = d.css,
                q = d.defined,
                h = d.erase,
                b = d.error,
                g = d.extend,
                f = d.fireEvent,
                a = d.isArray,
                p = d.isNumber,
                e = d.isObject,
                E = d.isString,
                H = d.merge,
                y = d.objectEach,
                N = d.pick,
                P = d.relativeLength,
                K = d.splat;
            J.cleanRecursively = function(a, b) {
                var f = {};
                y(a, function(c, g) {
                    if (e(a[g], !0) && !a.nodeType && b[g])
                        (c = J.cleanRecursively(a[g], b[g])),
                        Object.keys(c).length && (f[g] = c);
                    else if (e(a[g]) || a[g] !== b[g]) f[g] = a[g];
                });
                return f;
            };
            g(D.prototype, {
                addSeries: function(a, b, e) {
                    var c,
                        g = this;
                    a &&
                        ((b = N(b, !0)),
                            f(g, "addSeries", { options: a }, function() {
                                c = g.initSeries(a);
                                g.isDirtyLegend = !0;
                                g.linkSeries();
                                c.enabledDataSorting && c.setData(a.data, !1);
                                f(g, "afterAddSeries", { series: c });
                                b && g.redraw(e);
                            }));
                    return c;
                },
                addAxis: function(a, b, e, c) {
                    return this.createAxis(b ? "xAxis" : "yAxis", {
                        axis: a,
                        redraw: e,
                        animation: c,
                    });
                },
                addColorAxis: function(a, b, e) {
                    return this.createAxis("colorAxis", {
                        axis: a,
                        redraw: b,
                        animation: e,
                    });
                },
                createAxis: function(a, b) {
                    var e = this.options,
                        c = "colorAxis" === a,
                        f = b.redraw,
                        g = b.animation;
                    b = H(b.axis, { index: this[a].length, isX: "xAxis" === a });
                    var d = c ? new J.ColorAxis(this, b) : new t(this, b);
                    e[a] = K(e[a] || {});
                    e[a].push(b);
                    c &&
                        ((this.isDirtyLegend = !0),
                            this.axes.forEach(function(a) {
                                a.series = [];
                            }),
                            this.series.forEach(function(a) {
                                a.bindAxes();
                                a.isDirtyData = !0;
                            }));
                    N(f, !0) && this.redraw(g);
                    return d;
                },
                showLoading: function(a) {
                    var b = this,
                        e = b.options,
                        c = b.loadingDiv,
                        f = e.loading,
                        d = function() {
                            c &&
                                L(c, {
                                    left: b.plotLeft + "px",
                                    top: b.plotTop + "px",
                                    width: b.plotWidth + "px",
                                    height: b.plotHeight + "px",
                                });
                        };
                    c ||
                        ((b.loadingDiv = c = m(
                                "div", { className: "highcharts-loading highcharts-loading-hidden" },
                                null,
                                b.container
                            )),
                            (b.loadingSpan = m(
                                "span", { className: "highcharts-loading-inner" },
                                null,
                                c
                            )),
                            r(b, "redraw", d));
                    c.className = "highcharts-loading";
                    b.loadingSpan.innerHTML = N(a, e.lang.loading, "");
                    b.styledMode ||
                        (L(c, g(f.style, { zIndex: 10 })),
                            L(b.loadingSpan, f.labelStyle),
                            b.loadingShown ||
                            (L(c, { opacity: 0, display: "" }),
                                B(
                                    c, { opacity: f.style.opacity || 0.5 }, { duration: f.showDuration || 0 }
                                )));
                    b.loadingShown = !0;
                    d();
                },
                hideLoading: function() {
                    var a = this.options,
                        b = this.loadingDiv;
                    b &&
                        ((b.className = "highcharts-loading highcharts-loading-hidden"),
                            this.styledMode ||
                            B(
                                b, { opacity: 0 }, {
                                    duration: a.loading.hideDuration || 100,
                                    complete: function() {
                                        L(b, { display: "none" });
                                    },
                                }
                            ));
                    this.loadingShown = !1;
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(
                    " "
                ),
                propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(
                    " "
                ),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(
                    " "
                ),
                collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
                update: function(a, b, e, c) {
                    var g = this,
                        d = {
                            credits: "addCredits",
                            title: "setTitle",
                            subtitle: "setSubtitle",
                            caption: "setCaption",
                        },
                        h,
                        m,
                        A,
                        v = a.isResponsiveOptions,
                        k = [];
                    f(g, "update", { options: a });
                    v || g.setResponsive(!1, !0);
                    a = J.cleanRecursively(a, g.options);
                    H(!0, g.userOptions, a);
                    if ((h = a.chart)) {
                        H(!0, g.options.chart, h);
                        "className" in h && g.setClassName(h.className);
                        "reflow" in h && g.setReflow(h.reflow);
                        if ("inverted" in h || "polar" in h || "type" in h) {
                            g.propFromSeries();
                            var C = !0;
                        }
                        "alignTicks" in h && (C = !0);
                        y(h, function(a, c) {
                            -1 !== g.propsRequireUpdateSeries.indexOf("chart." + c) &&
                                (m = !0); -
                            1 !== g.propsRequireDirtyBox.indexOf(c) && (g.isDirtyBox = !0); -
                            1 !== g.propsRequireReflow.indexOf(c) &&
                                (v ? (g.isDirtyBox = !0) : (A = !0));
                        });
                        !g.styledMode && "style" in h && g.renderer.setStyle(h.style);
                    }!g.styledMode && a.colors && (this.options.colors = a.colors);
                    a.time &&
                        (this.time === w && (this.time = new G(a.time)),
                            H(!0, g.options.time, a.time));
                    y(a, function(c, b) {
                        if (g[b] && "function" === typeof g[b].update) g[b].update(c, !1);
                        else if ("function" === typeof g[d[b]]) g[d[b]](c);
                        else
                            "color" !== b &&
                            -1 === g.collectionsWithUpdate.indexOf(b) &&
                            H(!0, g.options[b], a[b]);
                        "chart" !== b &&
                            -1 !== g.propsRequireUpdateSeries.indexOf(b) &&
                            (m = !0);
                    });
                    this.collectionsWithUpdate.forEach(function(c) {
                        if (a[c]) {
                            if ("series" === c) {
                                var b = [];
                                g[c].forEach(function(a, c) {
                                    a.options.isInternal || b.push(N(a.options.index, c));
                                });
                            }
                            K(a[c]).forEach(function(a, f) {
                                var l = q(a.id),
                                    d;
                                l && (d = g.get(a.id));
                                d ||
                                    ((d = g[c][b ? b[f] : f]) &&
                                        l &&
                                        q(d.options.id) &&
                                        (d = void 0));
                                d && d.coll === c && (d.update(a, !1), e && (d.touched = !0));
                                !d &&
                                    e &&
                                    g.collectionsWithInit[c] &&
                                    (g.collectionsWithInit[c][0].apply(
                                        g, [a].concat(g.collectionsWithInit[c][1] || []).concat([!1])
                                    ).touched = !0);
                            });
                            e &&
                                g[c].forEach(function(a) {
                                    a.touched || a.options.isInternal ?
                                        delete a.touched :
                                        k.push(a);
                                });
                        }
                    });
                    k.forEach(function(a) {
                        a.remove && a.remove(!1);
                    });
                    C &&
                        g.axes.forEach(function(a) {
                            a.update({}, !1);
                        });
                    m &&
                        g.getSeriesOrderByLinks().forEach(function(a) {
                            a.chart && a.update({}, !1);
                        }, this);
                    C = h && h.width;
                    h = h && h.height;
                    E(h) && (h = P(h, C || g.chartWidth));
                    A || (p(C) && C !== g.chartWidth) || (p(h) && h !== g.chartHeight) ?
                        g.setSize(C, h, c) :
                        N(b, !0) && g.redraw(c);
                    f(g, "afterUpdate", { options: a, redraw: b, animation: c });
                },
                setSubtitle: function(a, b) {
                    this.applyDescription("subtitle", a);
                    this.layOutTitles(b);
                },
                setCaption: function(a, b) {
                    this.applyDescription("caption", a);
                    this.layOutTitles(b);
                },
            });
            D.prototype.collectionsWithInit = {
                xAxis: [D.prototype.addAxis, [!0]],
                yAxis: [D.prototype.addAxis, [!1]],
                series: [D.prototype.addSeries],
            };
            g(z.prototype, {
                update: function(a, b, f, c) {
                    function g() {
                        d.applyOptions(a);
                        var c = p && d.hasDummyGraphic;
                        c = null === d.y ? !c : c;
                        p && c && ((d.graphic = p.destroy()), delete d.hasDummyGraphic);
                        e(a, !0) &&
                            (p &&
                                p.element &&
                                a &&
                                a.marker &&
                                "undefined" !== typeof a.marker.symbol &&
                                (d.graphic = p.destroy()),
                                a &&
                                a.dataLabels &&
                                d.dataLabel &&
                                (d.dataLabel = d.dataLabel.destroy()),
                                d.connector && (d.connector = d.connector.destroy()));
                        m = d.index;
                        h.updateParallelArrays(d, m);
                        v.data[m] =
                            e(v.data[m], !0) || e(a, !0) ? d.options : N(a, v.data[m]);
                        h.isDirty = h.isDirtyData = !0;
                        !h.fixedBox && h.hasCartesianSeries && (q.isDirtyBox = !0);
                        "point" === v.legendType && (q.isDirtyLegend = !0);
                        b && q.redraw(f);
                    }
                    var d = this,
                        h = d.series,
                        p = d.graphic,
                        m,
                        q = h.chart,
                        v = h.options;
                    b = N(b, !0);
                    !1 === c ? g() : d.firePointEvent("update", { options: a }, g);
                },
                remove: function(a, b) {
                    this.series.removePoint(this.series.data.indexOf(this), a, b);
                },
            });
            g(M.prototype, {
                addPoint: function(a, b, e, c, g) {
                    var l = this.options,
                        d = this.data,
                        h = this.chart,
                        p = this.xAxis;
                    p = p && p.hasNames && p.names;
                    var m = l.data,
                        q = this.xData,
                        v;
                    b = N(b, !0);
                    var A = { series: this };
                    this.pointClass.prototype.applyOptions.apply(A, [a]);
                    var y = A.x;
                    var k = q.length;
                    if (this.requireSorting && y < q[k - 1])
                        for (v = !0; k && q[k - 1] > y;) k--;
                    this.updateParallelArrays(A, "splice", k, 0, 0);
                    this.updateParallelArrays(A, k);
                    p && A.name && (p[y] = A.name);
                    m.splice(k, 0, a);
                    v && (this.data.splice(k, 0, null), this.processData());
                    "point" === l.legendType && this.generatePoints();
                    e &&
                        (d[0] && d[0].remove ?
                            d[0].remove(!1) :
                            (d.shift(), this.updateParallelArrays(A, "shift"), m.shift()));
                    !1 !== g && f(this, "addPoint", { point: A });
                    this.isDirtyData = this.isDirty = !0;
                    b && h.redraw(c);
                },
                removePoint: function(a, b, e) {
                    var c = this,
                        f = c.data,
                        g = f[a],
                        d = c.points,
                        h = c.chart,
                        p = function() {
                            d && d.length === f.length && d.splice(a, 1);
                            f.splice(a, 1);
                            c.options.data.splice(a, 1);
                            c.updateParallelArrays(g || { series: c }, "splice", a, 1);
                            g && g.destroy();
                            c.isDirty = !0;
                            c.isDirtyData = !0;
                            b && h.redraw();
                        };
                    u(e, h);
                    b = N(b, !0);
                    g ? g.firePointEvent("remove", null, p) : p();
                },
                remove: function(a, b, e, c) {
                    function g() {
                        d.destroy(c);
                        d.remove = null;
                        h.isDirtyLegend = h.isDirtyBox = !0;
                        h.linkSeries();
                        N(a, !0) && h.redraw(b);
                    }
                    var d = this,
                        h = d.chart;
                    !1 !== e ? f(d, "remove", null, g) : g();
                },
                update: function(a, e) {
                    a = J.cleanRecursively(a, this.userOptions);
                    f(this, "update", { options: a });
                    var d = this,
                        c = d.chart,
                        l = d.userOptions,
                        h = d.initialType || d.type,
                        p = c.options.plotOptions,
                        m = a.type || l.type || c.options.chart.type,
                        q = !(
                            this.hasDerivedData ||
                            (m && m !== this.type) ||
                            "undefined" !== typeof a.pointStart ||
                            "undefined" !== typeof a.pointInterval ||
                            d.hasOptionChanged("dataGrouping") ||
                            d.hasOptionChanged("pointStart") ||
                            d.hasOptionChanged("pointInterval") ||
                            d.hasOptionChanged("pointIntervalUnit") ||
                            d.hasOptionChanged("keys")
                        ),
                        A = F[h].prototype,
                        y,
                        k = ["eventOptions", "navigatorSeries", "baseSeries"],
                        E = d.finishedAnimating && { animation: !1 },
                        C = {};
                    q &&
                        (k.push(
                                "data",
                                "isDirtyData",
                                "points",
                                "processedXData",
                                "processedYData",
                                "xIncrement",
                                "cropped",
                                "_hasPointMarkers",
                                "_hasPointLabels",
                                "mapMap",
                                "mapData",
                                "minY",
                                "maxY",
                                "minX",
                                "maxX"
                            ), !1 !== a.visible && k.push("area", "graph"),
                            d.parallelArrays.forEach(function(a) {
                                k.push(a + "Data");
                            }),
                            a.data &&
                            (a.dataSorting && g(d.options.dataSorting, a.dataSorting),
                                this.setData(a.data, !1)));
                    a = H(
                        l,
                        E, {
                            index: "undefined" === typeof l.index ? d.index : l.index,
                            pointStart: N(
                                p && p.series && p.series.pointStart,
                                l.pointStart,
                                d.xData[0]
                            ),
                        }, !q && { data: d.options.data },
                        a
                    );
                    q && a.data && (a.data = d.options.data);
                    k = [
                        "group",
                        "markerGroup",
                        "dataLabelsGroup",
                        "transformGroup",
                    ].concat(k);
                    k.forEach(function(a) {
                        k[a] = d[a];
                        delete d[a];
                    });
                    d.remove(!1, null, !1, !0);
                    for (y in A) d[y] = void 0;
                    F[m || h] ?
                        g(d, F[m || h].prototype) :
                        b(17, !0, c, { missingModuleFor: m || h });
                    k.forEach(function(a) {
                        d[a] = k[a];
                    });
                    d.init(c, a);
                    if (q && this.points) {
                        var n = d.options;
                        !1 === n.visible ?
                            ((C.graphic = 1), (C.dataLabel = 1)) :
                            d._hasPointLabels ||
                            ((a = n.marker),
                                (l = n.dataLabels),
                                a && (!1 === a.enabled || "symbol" in a) && (C.graphic = 1),
                                l && !1 === l.enabled && (C.dataLabel = 1));
                        this.points.forEach(function(a) {
                            a &&
                                a.series &&
                                (a.resolveColor(),
                                    Object.keys(C).length && a.destroyElements(C), !1 === n.showInLegend &&
                                    a.legendItem &&
                                    c.legend.destroyItem(a));
                        }, this);
                    }
                    d.initialType = h;
                    c.linkSeries();
                    f(this, "afterUpdate");
                    N(e, !0) && c.redraw(q ? void 0 : !1);
                },
                setName: function(a) {
                    this.name = this.options.name = this.userOptions.name = a;
                    this.chart.isDirtyLegend = !0;
                },
                hasOptionChanged: function(a) {
                    var b = this.options[a],
                        e = this.chart.options.plotOptions,
                        c = this.userOptions[a];
                    return c ?
                        b !== c :
                        b !==
                        N(
                            e && e[this.type] && e[this.type][a],
                            e && e.series && e.series[a],
                            b
                        );
                },
            });
            g(t.prototype, {
                update: function(a, b) {
                    var e = this.chart,
                        c = (a && a.events) || {};
                    a = H(this.userOptions, a);
                    e.options[this.coll].indexOf &&
                        (e.options[this.coll][
                            e.options[this.coll].indexOf(this.userOptions)
                        ] = a);
                    y(e.options[this.coll].events, function(a, b) {
                        "undefined" === typeof c[b] && (c[b] = void 0);
                    });
                    this.destroy(!0);
                    this.init(e, g(a, { events: c }));
                    e.isDirtyBox = !0;
                    N(b, !0) && e.redraw();
                },
                remove: function(b) {
                    for (
                        var e = this.chart, f = this.coll, c = this.series, g = c.length; g--;

                    )
                        c[g] && c[g].remove(!1);
                    h(e.axes, this);
                    h(e[f], this);
                    a(e.options[f]) ?
                        e.options[f].splice(this.options.index, 1) :
                        delete e.options[f];
                    e[f].forEach(function(a, c) {
                        a.options.index = a.userOptions.index = c;
                    });
                    this.destroy();
                    e.isDirtyBox = !0;
                    N(b, !0) && e.redraw();
                },
                setTitle: function(a, b) {
                    this.update({ title: a }, b);
                },
                setCategories: function(a, b) {
                    this.update({ categories: a }, b);
                },
            });
        }
    );
    Q(
        k,
        "Series/AreaSeries.js", [
            k["Core/Series/Series.js"],
            k["Core/Color/Color.js"],
            k["Core/Globals.js"],
            k["Mixins/LegendSymbol.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J) {
            var B = t.parse,
                n = J.objectEach,
                z = J.pick,
                G = I.Series;
            k.seriesType(
                "area",
                "line", { threshold: 0 }, {
                    singleStacks: !1,
                    getStackPoints: function(d) {
                        var k = [],
                            u = [],
                            t = this.xAxis,
                            w = this.yAxis,
                            r = w.stacking.stacks[this.stackKey],
                            m = {},
                            L = this.index,
                            q = w.series,
                            h = q.length,
                            b = z(w.options.reversedStacks, !0) ? 1 : -1,
                            g;
                        d = d || this.points;
                        if (this.options.stacking) {
                            for (g = 0; g < d.length; g++)
                                (d[g].leftNull = d[g].rightNull = void 0), (m[d[g].x] = d[g]);
                            n(r, function(a, b) {
                                null !== a.total && u.push(b);
                            });
                            u.sort(function(a, b) {
                                return a - b;
                            });
                            var f = q.map(function(a) {
                                return a.visible;
                            });
                            u.forEach(function(a, d) {
                                var e = 0,
                                    p,
                                    q;
                                if (m[a] && !m[a].isNull)
                                    k.push(m[a]), [-1, 1].forEach(function(e) {
                                        var k = 1 === e ? "rightNull" : "leftNull",
                                            y = 0,
                                            E = r[u[d + e]];
                                        if (E)
                                            for (g = L; 0 <= g && g < h;)
                                                (p = E.points[g]),
                                                p ||
                                                (g === L ?
                                                    (m[a][k] = !0) :
                                                    f[g] &&
                                                    (q = r[a].points[g]) &&
                                                    (y -= q[1] - q[0])),
                                                (g += b);
                                        m[a][1 === e ? "rightCliff" : "leftCliff"] = y;
                                    });
                                else {
                                    for (g = L; 0 <= g && g < h;) {
                                        if ((p = r[a].points[g])) {
                                            e = p[1];
                                            break;
                                        }
                                        g += b;
                                    }
                                    e = w.translate(e, 0, 1, 0, 1);
                                    k.push({
                                        isNull: !0,
                                        plotX: t.translate(a, 0, 0, 0, 1),
                                        x: a,
                                        plotY: e,
                                        yBottom: e,
                                    });
                                }
                            });
                        }
                        return k;
                    },
                    getGraphPath: function(d) {
                        var k = G.prototype.getGraphPath,
                            n = this.options,
                            t = n.stacking,
                            w = this.yAxis,
                            r,
                            m = [],
                            L = [],
                            q = this.index,
                            h = w.stacking.stacks[this.stackKey],
                            b = n.threshold,
                            g = Math.round(w.getThreshold(n.threshold));
                        n = z(n.connectNulls, "percent" === t);
                        var f = function(a, e, f) {
                            var k = d[a];
                            a = t && h[k.x].points[q];
                            var y = k[f + "Null"] || 0;
                            f = k[f + "Cliff"] || 0;
                            k = !0;
                            if (f || y) {
                                var E = (y ? a[0] : a[1]) + f;
                                var A = a[0] + f;
                                k = !!y;
                            } else !t && d[e] && d[e].isNull && (E = A = b);
                            "undefined" !== typeof E &&
                                (L.push({
                                        plotX: p,
                                        plotY: null === E ? g : w.getThreshold(E),
                                        isNull: k,
                                        isCliff: !0,
                                    }),
                                    m.push({
                                        plotX: p,
                                        plotY: null === A ? g : w.getThreshold(A),
                                        doCurve: !1,
                                    }));
                        };
                        d = d || this.points;
                        t && (d = this.getStackPoints(d));
                        for (r = 0; r < d.length; r++) {
                            t ||
                                (d[r].leftCliff = d[r].rightCliff = d[r].leftNull = d[
                                    r
                                ].rightNull = void 0);
                            var a = d[r].isNull;
                            var p = z(d[r].rectPlotX, d[r].plotX);
                            var e = t ? d[r].yBottom : g;
                            if (!a || n)
                                n || f(r, r - 1, "left"),
                                (a && !t && n) ||
                                (L.push(d[r]), m.push({ x: r, plotX: p, plotY: e })),
                                n || f(r, r + 1, "right");
                        }
                        r = k.call(this, L, !0, !0);
                        m.reversed = !0;
                        a = k.call(this, m, !0, !0);
                        (e = a[0]) && "M" === e[0] && (a[0] = ["L", e[1], e[2]]);
                        a = r.concat(a);
                        k = k.call(this, L, !1, n);
                        a.xMap = r.xMap;
                        this.areaPath = a;
                        return k;
                    },
                    drawGraph: function() {
                        this.areaPath = [];
                        G.prototype.drawGraph.apply(this);
                        var d = this,
                            k = this.areaPath,
                            n = this.options,
                            t = [
                                ["area", "highcharts-area", this.color, n.fillColor]
                            ];
                        this.zones.forEach(function(k, r) {
                            t.push([
                                "zone-area-" + r,
                                "highcharts-area highcharts-zone-area-" + r + " " + k.className,
                                k.color || d.color,
                                k.fillColor || n.fillColor,
                            ]);
                        });
                        t.forEach(function(u) {
                            var r = u[0],
                                m = d[r],
                                w = m ? "animate" : "attr",
                                q = {};
                            m
                                ?
                                ((m.endX = d.preventGraphAnimation ? null : k.xMap),
                                    m.animate({ d: k })) :
                                ((q.zIndex = 0),
                                    (m = d[r] = d.chart.renderer
                                        .path(k)
                                        .addClass(u[1])
                                        .add(d.group)),
                                    (m.isArea = !0));
                            d.chart.styledMode ||
                                (q.fill = z(
                                    u[3],
                                    B(u[2]).setOpacity(z(n.fillOpacity, 0.75)).get()
                                ));
                            m[w](q);
                            m.startX = k.xMap;
                            m.shiftUnit = n.step ? 2 : 1;
                        });
                    },
                    drawLegendSymbol: D.drawRectangle,
                }
            );
            ("");
        }
    );
    Q(
        k,
        "Series/SplineSeries.js", [k["Core/Series/Series.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.pick;
            k.seriesType(
                "spline",
                "line", {}, {
                    getPointSpline: function(k, t, I) {
                        var n = t.plotX || 0,
                            z = t.plotY || 0,
                            G = k[I - 1];
                        I = k[I + 1];
                        if (
                            G &&
                            !G.isNull &&
                            !1 !== G.doCurve &&
                            !t.isCliff &&
                            I &&
                            !I.isNull &&
                            !1 !== I.doCurve &&
                            !t.isCliff
                        ) {
                            k = G.plotY || 0;
                            var d = I.plotX || 0;
                            I = I.plotY || 0;
                            var D = 0;
                            var u = (1.5 * n + (G.plotX || 0)) / 2.5;
                            var F = (1.5 * z + k) / 2.5;
                            d = (1.5 * n + d) / 2.5;
                            var w = (1.5 * z + I) / 2.5;
                            d !== u && (D = ((w - F) * (d - n)) / (d - u) + z - w);
                            F += D;
                            w += D;
                            F > k && F > z ?
                                ((F = Math.max(k, z)), (w = 2 * z - F)) :
                                F < k && F < z && ((F = Math.min(k, z)), (w = 2 * z - F));
                            w > I && w > z ?
                                ((w = Math.max(I, z)), (F = 2 * z - w)) :
                                w < I && w < z && ((w = Math.min(I, z)), (F = 2 * z - w));
                            t.rightContX = d;
                            t.rightContY = w;
                        }
                        t = [
                            "C",
                            B(G.rightContX, G.plotX, 0),
                            B(G.rightContY, G.plotY, 0),
                            B(u, n, 0),
                            B(F, z, 0),
                            n,
                            z,
                        ];
                        G.rightContX = G.rightContY = void 0;
                        return t;
                    },
                }
            );
            ("");
        }
    );
    Q(
        k,
        "Series/AreaSplineSeries.js", [
            k["Core/Series/Series.js"],
            k["Mixins/LegendSymbol.js"],
            k["Core/Options.js"],
        ],
        function(k, t, I) {
            var B = k.seriesTypes.area.prototype;
            k.seriesType("areaspline", "spline", I.defaultOptions.plotOptions.area, {
                getStackPoints: B.getStackPoints,
                getGraphPath: B.getGraphPath,
                drawGraph: B.drawGraph,
                drawLegendSymbol: t.drawRectangle,
            });
            ("");
        }
    );
    Q(
        k,
        "Series/ColumnSeries.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Series/Series.js"],
            k["Core/Color/Color.js"],
            k["Core/Globals.js"],
            k["Mixins/LegendSymbol.js"],
            k["Series/LineSeries.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n) {
            var z = k.animObject,
                G = I.parse;
            k = D.noop;
            var d = n.clamp,
                B = n.defined,
                u = n.extend,
                F = n.isArray,
                w = n.isNumber,
                r = n.merge,
                m = n.pick,
                L = n.objectEach;
            ("");
            t = t.seriesType(
                "column",
                "line", {
                    borderRadius: 0,
                    centerInCategory: !1,
                    groupPadding: 0.2,
                    marker: null,
                    pointPadding: 0.1,
                    minPointLength: 0,
                    cropThreshold: 50,
                    pointRange: null,
                    states: {
                        hover: { halo: !1, brightness: 0.1 },
                        select: { color: "#cccccc", borderColor: "#000000" },
                    },
                    dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
                    startFromThreshold: !0,
                    stickyTracking: !1,
                    tooltip: { distance: 6 },
                    threshold: 0,
                    borderColor: "#ffffff",
                }, {
                    cropShoulder: 0,
                    directTouch: !0,
                    trackerGroups: ["group", "dataLabelsGroup"],
                    negStacks: !0,
                    init: function() {
                        M.prototype.init.apply(this, arguments);
                        var d = this,
                            h = d.chart;
                        h.hasRendered &&
                            h.series.forEach(function(b) {
                                b.type === d.type && (b.isDirty = !0);
                            });
                    },
                    getColumnMetrics: function() {
                        var d = this,
                            h = d.options,
                            b = d.xAxis,
                            g = d.yAxis,
                            f = b.options.reversedStacks;
                        f = (b.reversed && !f) || (!b.reversed && f);
                        var a,
                            p = {},
                            e = 0;
                        !1 === h.grouping ?
                            (e = 1) :
                            d.chart.series.forEach(function(b) {
                                var f = b.yAxis,
                                    h = b.options;
                                if (
                                    b.type === d.type &&
                                    (b.visible || !d.chart.options.chart.ignoreHiddenSeries) &&
                                    g.len === f.len &&
                                    g.pos === f.pos
                                ) {
                                    if (h.stacking && "group" !== h.stacking) {
                                        a = b.stackKey;
                                        "undefined" === typeof p[a] && (p[a] = e++);
                                        var m = p[a];
                                    } else !1 !== h.grouping && (m = e++);
                                    b.columnIndex = m;
                                }
                            });
                        var k = Math.min(
                                Math.abs(b.transA) *
                                ((b.ordinal && b.ordinal.slope) ||
                                    h.pointRange ||
                                    b.closestPointRange ||
                                    b.tickInterval ||
                                    1),
                                b.len
                            ),
                            n = k * h.groupPadding,
                            y = (k - 2 * n) / (e || 1);
                        h = Math.min(
                            h.maxPointWidth || b.len,
                            m(h.pointWidth, y * (1 - 2 * h.pointPadding))
                        );
                        d.columnMetrics = {
                            width: h,
                            offset:
                                (y - h) / 2 +
                                (n + ((d.columnIndex || 0) + (f ? 1 : 0)) * y - k / 2) *
                                (f ? -1 : 1),
                            paddedWidth: y,
                            columnCount: e,
                        };
                        return d.columnMetrics;
                    },
                    crispCol: function(d, h, b, g) {
                        var f = this.chart,
                            a = this.borderWidth,
                            p = -(a % 2 ? 0.5 : 0);
                        a = a % 2 ? 0.5 : 1;
                        f.inverted && f.renderer.isVML && (a += 1);
                        this.options.crisp &&
                            ((b = Math.round(d + b) + p), (d = Math.round(d) + p), (b -= d));
                        g = Math.round(h + g) + a;
                        p = 0.5 >= Math.abs(h) && 0.5 < g;
                        h = Math.round(h) + a;
                        g -= h;
                        p && g && (--h, (g += 1));
                        return { x: d, y: h, width: b, height: g };
                    },
                    adjustForMissingColumns: function(d, h, b, g) {
                        var f = this,
                            a = this.options.stacking;
                        if (!b.isNull && 1 < g.columnCount) {
                            var p = 0,
                                e = 0;
                            L(
                                this.yAxis.stacking && this.yAxis.stacking.stacks,
                                function(g) {
                                    if ("number" === typeof b.x && (g = g[b.x.toString()])) {
                                        var d = g.points[f.index],
                                            h = g.total;
                                        a
                                            ?
                                            (d && (p = e), g.hasValidPoints && e++) :
                                            F(d) && ((p = d[1]), (e = h || 0));
                                    }
                                }
                            );
                            d =
                                (b.plotX || 0) +
                                ((e - 1) * g.paddedWidth + h) / 2 -
                                h -
                                p * g.paddedWidth;
                        }
                        return d;
                    },
                    translate: function() {
                        var q = this,
                            h = q.chart,
                            b = q.options,
                            g = (q.dense = 2 > q.closestPointRange * q.xAxis.transA);
                        g = q.borderWidth = m(b.borderWidth, g ? 0 : 1);
                        var f = q.xAxis,
                            a = q.yAxis,
                            p = b.threshold,
                            e = (q.translatedThreshold = a.getThreshold(p)),
                            k = m(b.minPointLength, 5),
                            n = q.getColumnMetrics(),
                            y = n.width,
                            r = (q.barW = Math.max(y, 1 + 2 * g)),
                            u = (q.pointXOffset = n.offset),
                            K = q.dataMin,
                            A = q.dataMax;
                        h.inverted && (e -= 0.5);
                        b.pointPadding && (r = Math.ceil(r));
                        M.prototype.translate.apply(q);
                        q.points.forEach(function(g) {
                            var v = m(g.yBottom, e),
                                c = 999 + Math.abs(v),
                                l = y,
                                E = g.plotX || 0;
                            c = d(g.plotY, -c, a.len + c);
                            var C = E + u,
                                H = r,
                                N = Math.min(c, v),
                                P = Math.max(c, v) - N;
                            if (k && Math.abs(P) < k) {
                                P = k;
                                var t =
                                    (!a.reversed && !g.negative) || (a.reversed && g.negative);
                                w(p) &&
                                    w(A) &&
                                    g.y === p &&
                                    A <= p &&
                                    (a.min || 0) < p &&
                                    K !== A &&
                                    (t = !t);
                                N = Math.abs(N - e) > k ? v - k : e - (t ? k : 0);
                            }
                            B(g.options.pointWidth) &&
                                ((l = H = Math.ceil(g.options.pointWidth)),
                                    (C -= Math.round((l - y) / 2)));
                            b.centerInCategory && (C = q.adjustForMissingColumns(C, l, g, n));
                            g.barX = C;
                            g.pointWidth = l;
                            g.tooltipPos = h.inverted ?
                                [
                                    a.len + a.pos - h.plotLeft - c,
                                    f.len + f.pos - h.plotTop - (E || 0) - u - H / 2,
                                    P,
                                ] :
                                [C + H / 2, c + a.pos - h.plotTop, P];
                            g.shapeType = q.pointClass.prototype.shapeType || "rect";
                            g.shapeArgs = q.crispCol.apply(
                                q,
                                g.isNull ? [C, e, H, 0] : [C, N, H, P]
                            );
                        });
                    },
                    getSymbol: k,
                    drawLegendSymbol: J.drawRectangle,
                    drawGraph: function() {
                        this.group[this.dense ? "addClass" : "removeClass"](
                            "highcharts-dense-data"
                        );
                    },
                    pointAttribs: function(d, h) {
                        var b = this.options,
                            g = this.pointAttrToOptions || {};
                        var f = g.stroke || "borderColor";
                        var a = g["stroke-width"] || "borderWidth",
                            p = (d && d.color) || this.color,
                            e = (d && d[f]) || b[f] || this.color || p,
                            k = (d && d[a]) || b[a] || this[a] || 0;
                        g = (d && d.options.dashStyle) || b.dashStyle;
                        var q = m(d && d.opacity, b.opacity, 1);
                        if (d && this.zones.length) {
                            var y = d.getZone();
                            p =
                                d.options.color ||
                                (y && (y.color || d.nonZonedColor)) ||
                                this.color;
                            y &&
                                ((e = y.borderColor || e),
                                    (g = y.dashStyle || g),
                                    (k = y.borderWidth || k));
                        }
                        h &&
                            d &&
                            ((d = r(
                                    b.states[h],
                                    (d.options.states && d.options.states[h]) || {}
                                )),
                                (h = d.brightness),
                                (p =
                                    d.color ||
                                    ("undefined" !== typeof h &&
                                        G(p).brighten(d.brightness).get()) ||
                                    p),
                                (e = d[f] || e),
                                (k = d[a] || k),
                                (g = d.dashStyle || g),
                                (q = m(d.opacity, q)));
                        f = { fill: p, stroke: e, "stroke-width": k, opacity: q };
                        g && (f.dashstyle = g);
                        return f;
                    },
                    drawPoints: function() {
                        var d = this,
                            h = this.chart,
                            b = d.options,
                            g = h.renderer,
                            f = b.animationLimit || 250,
                            a;
                        d.points.forEach(function(p) {
                            var e = p.graphic,
                                m = !!e,
                                k = e && h.pointCount < f ? "animate" : "attr";
                            if (w(p.plotY) && null !== p.y) {
                                a = p.shapeArgs;
                                e && p.hasNewShapeType() && (e = e.destroy());
                                d.enabledDataSorting &&
                                    (p.startXPos = d.xAxis.reversed ?
                                        -(a ? a.width : 0) :
                                        d.xAxis.width);
                                e ||
                                    ((p.graphic = e = g[p.shapeType](a).add(
                                            p.group || d.group
                                        )) &&
                                        d.enabledDataSorting &&
                                        h.hasRendered &&
                                        h.pointCount < f &&
                                        (e.attr({ x: p.startXPos }), (m = !0), (k = "animate")));
                                if (e && m) e[k](r(a));
                                if (b.borderRadius) e[k]({ r: b.borderRadius });
                                h.styledMode ||
                                    e[k](d.pointAttribs(p, p.selected && "select")).shadow(!1 !== p.allowShadow && b.shadow,
                                        null,
                                        b.stacking && !b.borderRadius
                                    );
                                e.addClass(p.getClassName(), !0);
                            } else e && (p.graphic = e.destroy());
                        });
                    },
                    animate: function(m) {
                        var h = this,
                            b = this.yAxis,
                            g = h.options,
                            f = this.chart.inverted,
                            a = {},
                            p = f ? "translateX" : "translateY";
                        if (m)
                            (a.scaleY = 0.001),
                            (m = d(b.toPixels(g.threshold), b.pos, b.pos + b.len)),
                            f ? (a.translateX = m - b.len) : (a.translateY = m),
                            h.clipBox && h.setClip(),
                            h.group.attr(a);
                        else {
                            var e = h.group.attr(p);
                            h.group.animate({ scaleY: 1 },
                                u(z(h.options.animation), {
                                    step: function(f, g) {
                                        h.group &&
                                            ((a[p] = e + g.pos * (b.pos - e)), h.group.attr(a));
                                    },
                                })
                            );
                        }
                    },
                    remove: function() {
                        var d = this,
                            h = d.chart;
                        h.hasRendered &&
                            h.series.forEach(function(b) {
                                b.type === d.type && (b.isDirty = !0);
                            });
                        M.prototype.remove.apply(d, arguments);
                    },
                }
            );
            ("");
            return t;
        }
    );
    Q(k, "Series/BarSeries.js", [k["Core/Series/Series.js"]], function(k) {
        k.seriesType("bar", "column", null, { inverted: !0 });
        ("");
    });
    Q(
        k,
        "Series/ScatterSeries.js", [k["Core/Series/Series.js"], k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t, I) {
            I = I.addEvent;
            var B = t.Series;
            k.seriesType(
                "scatter",
                "line", {
                    lineWidth: 0,
                    findNearestPointBy: "xy",
                    jitter: { x: 0, y: 0 },
                    marker: { enabled: !0 },
                    tooltip: {
                        headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                        pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
                    },
                }, {
                    sorted: !1,
                    requireSorting: !1,
                    noSharedTooltip: !0,
                    trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                    takeOrdinalPosition: !1,
                    drawGraph: function() {
                        (this.options.lineWidth ||
                            (0 === this.options.lineWidth &&
                                this.graph &&
                                this.graph.strokeWidth())) &&
                        B.prototype.drawGraph.call(this);
                    },
                    applyJitter: function() {
                        var k = this,
                            t = this.options.jitter,
                            n = this.points.length;
                        t &&
                            this.points.forEach(function(z, G) {
                                ["x", "y"].forEach(function(d, B) {
                                    var u = "plot" + d.toUpperCase();
                                    if (t[d] && !z.isNull) {
                                        var F = k[d + "Axis"];
                                        var w = t[d] * F.transA;
                                        if (F && !F.isLog) {
                                            var r = Math.max(0, z[u] - w);
                                            F = Math.min(F.len, z[u] + w);
                                            B = 1e4 * Math.sin(G + B * n);
                                            z[u] = r + (F - r) * (B - Math.floor(B));
                                            "x" === d && (z.clientX = z.plotX);
                                        }
                                    }
                                });
                            });
                    },
                }
            );
            I(B, "afterTranslate", function() {
                this.applyJitter && this.applyJitter();
            });
            ("");
        }
    );
    Q(
        k,
        "Mixins/CenteredSeries.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.isNumber,
                D = t.pick,
                J = t.relativeLength,
                M = k.deg2rad;
            return (k.CenteredSeriesMixin = {
                getCenter: function() {
                    var n = this.options,
                        t = this.chart,
                        G = 2 * (n.slicedOffset || 0),
                        d = t.plotWidth - 2 * G,
                        B = t.plotHeight - 2 * G,
                        u = n.center,
                        F = Math.min(d, B),
                        w = n.size,
                        r = n.innerSize || 0;
                    "string" === typeof w && (w = parseFloat(w));
                    "string" === typeof r && (r = parseFloat(r));
                    n = [
                        D(u[0], "50%"),
                        D(u[1], "50%"),
                        D(w && 0 > w ? void 0 : n.size, "100%"),
                        D(r && 0 > r ? void 0 : n.innerSize || 0, "0%"),
                    ];
                    !t.angular || this instanceof k.Series || (n[3] = 0);
                    for (u = 0; 4 > u; ++u)
                        (w = n[u]),
                        (t = 2 > u || (2 === u && /%$/.test(w))),
                        (n[u] = J(w, [d, B, F, n[2]][u]) + (t ? G : 0));
                    n[3] > n[2] && (n[3] = n[2]);
                    return n;
                },
                getStartAndEndRadians: function(k, t) {
                    k = B(k) ? k : 0;
                    t = B(t) && t > k && 360 > t - k ? t : k + 360;
                    return { start: M * (k + -90), end: M * (t + -90) };
                },
            });
        }
    );
    Q(
        k,
        "Series/PieSeries.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Series/Series.js"],
            k["Mixins/CenteredSeries.js"],
            k["Core/Globals.js"],
            k["Mixins/LegendSymbol.js"],
            k["Series/LineSeries.js"],
            k["Core/Series/Point.js"],
            k["Core/Renderer/SVG/SVGRenderer.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n, z, G) {
            var d = k.setAnimation,
                B = I.getStartAndEndRadians;
            k = D.noop;
            var u = G.addEvent,
                F = G.clamp,
                w = G.defined,
                r = G.fireEvent,
                m = G.isNumber,
                L = G.merge,
                q = G.pick,
                h = G.relativeLength;
            t.seriesType(
                "pie",
                "line", {
                    center: [null, null],
                    clip: !1,
                    colorByPoint: !0,
                    dataLabels: {
                        allowOverlap: !0,
                        connectorPadding: 5,
                        connectorShape: "fixedOffset",
                        crookDistance: "70%",
                        distance: 30,
                        enabled: !0,
                        formatter: function() {
                            return this.point.isNull ? void 0 : this.point.name;
                        },
                        softConnector: !0,
                        x: 0,
                    },
                    fillColor: void 0,
                    ignoreHiddenPoint: !0,
                    inactiveOtherPoints: !0,
                    legendType: "point",
                    marker: null,
                    size: null,
                    showInLegend: !1,
                    slicedOffset: 10,
                    stickyTracking: !1,
                    tooltip: { followPointer: !0 },
                    borderColor: "#ffffff",
                    borderWidth: 1,
                    lineWidth: void 0,
                    states: { hover: { brightness: 0.1 } },
                }, {
                    isCartesian: !1,
                    requireSorting: !1,
                    directTouch: !0,
                    noSharedTooltip: !0,
                    trackerGroups: ["group", "dataLabelsGroup"],
                    axisTypes: [],
                    pointAttribs: t.seriesTypes.column.prototype.pointAttribs,
                    animate: function(b) {
                        var g = this,
                            f = g.points,
                            a = g.startAngleRad;
                        b ||
                            f.forEach(function(b) {
                                var e = b.graphic,
                                    f = b.shapeArgs;
                                e &&
                                    f &&
                                    (e.attr({
                                            r: q(b.startR, g.center && g.center[3] / 2),
                                            start: a,
                                            end: a,
                                        }),
                                        e.animate({ r: f.r, start: f.start, end: f.end },
                                            g.options.animation
                                        ));
                            });
                    },
                    hasData: function() {
                        return !!this.processedXData.length;
                    },
                    updateTotals: function() {
                        var b,
                            g = 0,
                            f = this.points,
                            a = f.length,
                            d = this.options.ignoreHiddenPoint;
                        for (b = 0; b < a; b++) {
                            var e = f[b];
                            g += d && !e.visible ? 0 : e.isNull ? 0 : e.y;
                        }
                        this.total = g;
                        for (b = 0; b < a; b++)
                            (e = f[b]),
                            (e.percentage =
                                0 < g && (e.visible || !d) ? (e.y / g) * 100 : 0),
                            (e.total = g);
                    },
                    generatePoints: function() {
                        M.prototype.generatePoints.call(this);
                        this.updateTotals();
                    },
                    getX: function(b, g, f) {
                        var a = this.center,
                            d = this.radii ? this.radii[f.index] : a[2] / 2;
                        b = Math.asin(F((b - a[1]) / (d + f.labelDistance), -1, 1));
                        return (
                            a[0] +
                            (g ? -1 : 1) * Math.cos(b) * (d + f.labelDistance) +
                            (0 < f.labelDistance ?
                                (g ? -1 : 1) * this.options.dataLabels.padding :
                                0)
                        );
                    },
                    translate: function(b) {
                        this.generatePoints();
                        var g = 0,
                            f = this.options,
                            a = f.slicedOffset,
                            d = a + (f.borderWidth || 0),
                            e = B(f.startAngle, f.endAngle),
                            m = (this.startAngleRad = e.start);
                        e = (this.endAngleRad = e.end) - m;
                        var k = this.points,
                            y = f.dataLabels.distance;
                        f = f.ignoreHiddenPoint;
                        var n,
                            u = k.length;
                        b || (this.center = b = this.getCenter());
                        for (n = 0; n < u; n++) {
                            var K = k[n];
                            var A = m + g * e;
                            if (!f || K.visible) g += K.percentage / 100;
                            var C = m + g * e;
                            K.shapeType = "arc";
                            K.shapeArgs = {
                                x: b[0],
                                y: b[1],
                                r: b[2] / 2,
                                innerR: b[3] / 2,
                                start: Math.round(1e3 * A) / 1e3,
                                end: Math.round(1e3 * C) / 1e3,
                            };
                            K.labelDistance = q(
                                K.options.dataLabels && K.options.dataLabels.distance,
                                y
                            );
                            K.labelDistance = h(K.labelDistance, K.shapeArgs.r);
                            this.maxLabelDistance = Math.max(
                                this.maxLabelDistance || 0,
                                K.labelDistance
                            );
                            C = (C + A) / 2;
                            C > 1.5 * Math.PI ?
                                (C -= 2 * Math.PI) :
                                C < -Math.PI / 2 && (C += 2 * Math.PI);
                            K.slicedTranslation = {
                                translateX: Math.round(Math.cos(C) * a),
                                translateY: Math.round(Math.sin(C) * a),
                            };
                            var v = (Math.cos(C) * b[2]) / 2;
                            var c = (Math.sin(C) * b[2]) / 2;
                            K.tooltipPos = [b[0] + 0.7 * v, b[1] + 0.7 * c];
                            K.half = C < -Math.PI / 2 || C > Math.PI / 2 ? 1 : 0;
                            K.angle = C;
                            A = Math.min(d, K.labelDistance / 5);
                            K.labelPosition = {
                                natural: {
                                    x: b[0] + v + Math.cos(C) * K.labelDistance,
                                    y: b[1] + c + Math.sin(C) * K.labelDistance,
                                },
                                final: {},
                                alignment: 0 > K.labelDistance ? "center" : K.half ? "right" : "left",
                                connectorPosition: {
                                    breakAt: {
                                        x: b[0] + v + Math.cos(C) * A,
                                        y: b[1] + c + Math.sin(C) * A,
                                    },
                                    touchingSliceAt: { x: b[0] + v, y: b[1] + c },
                                },
                            };
                        }
                        r(this, "afterTranslate");
                    },
                    drawEmpty: function() {
                        var b = this.startAngleRad,
                            g = this.endAngleRad,
                            f = this.options;
                        if (0 === this.total && this.center) {
                            var a = this.center[0];
                            var d = this.center[1];
                            this.graph ||
                                (this.graph = this.chart.renderer
                                    .arc(a, d, this.center[1] / 2, 0, b, g)
                                    .addClass("highcharts-empty-series")
                                    .add(this.group));
                            this.graph.attr({
                                d: z.prototype.symbols.arc(a, d, this.center[2] / 2, 0, {
                                    start: b,
                                    end: g,
                                    innerR: this.center[3] / 2,
                                }),
                            });
                            this.chart.styledMode ||
                                this.graph.attr({
                                    "stroke-width": f.borderWidth,
                                    fill: f.fillColor || "none",
                                    stroke: f.color || "#cccccc",
                                });
                        } else this.graph && (this.graph = this.graph.destroy());
                    },
                    redrawPoints: function() {
                        var b = this,
                            g = b.chart,
                            f = g.renderer,
                            a,
                            d,
                            e,
                            h,
                            m = b.options.shadow;
                        this.drawEmpty();
                        !m ||
                            b.shadowGroup ||
                            g.styledMode ||
                            (b.shadowGroup = f.g("shadow").attr({ zIndex: -1 }).add(b.group));
                        b.points.forEach(function(p) {
                            var k = {};
                            d = p.graphic;
                            if (!p.isNull && d) {
                                h = p.shapeArgs;
                                a = p.getTranslate();
                                if (!g.styledMode) {
                                    var q = p.shadowGroup;
                                    m &&
                                        !q &&
                                        (q = p.shadowGroup = f.g("shadow").add(b.shadowGroup));
                                    q && q.attr(a);
                                    e = b.pointAttribs(p, p.selected && "select");
                                }
                                p.delayedRendering ?
                                    (d.setRadialReference(b.center).attr(h).attr(a),
                                        g.styledMode ||
                                        d
                                        .attr(e)
                                        .attr({ "stroke-linejoin": "round" })
                                        .shadow(m, q),
                                        (p.delayedRendering = !1)) :
                                    (d.setRadialReference(b.center),
                                        g.styledMode || L(!0, k, e),
                                        L(!0, k, h, a),
                                        d.animate(k));
                                d.attr({ visibility: p.visible ? "inherit" : "hidden" });
                                d.addClass(p.getClassName());
                            } else d && (p.graphic = d.destroy());
                        });
                    },
                    drawPoints: function() {
                        var b = this.chart.renderer;
                        this.points.forEach(function(g) {
                            g.graphic &&
                                g.hasNewShapeType() &&
                                (g.graphic = g.graphic.destroy());
                            g.graphic ||
                                ((g.graphic = b[g.shapeType](g.shapeArgs).add(g.series.group)),
                                    (g.delayedRendering = !0));
                        });
                    },
                    searchPoint: k,
                    sortByAngle: function(b, g) {
                        b.sort(function(b, a) {
                            return "undefined" !== typeof b.angle && (a.angle - b.angle) * g;
                        });
                    },
                    drawLegendSymbol: J.drawRectangle,
                    getCenter: I.getCenter,
                    getSymbol: k,
                    drawGraph: null,
                }, {
                    init: function() {
                        n.prototype.init.apply(this, arguments);
                        var b = this;
                        b.name = q(b.name, "Slice");
                        var g = function(f) {
                            b.slice("select" === f.type);
                        };
                        u(b, "select", g);
                        u(b, "unselect", g);
                        return b;
                    },
                    isValid: function() {
                        return m(this.y) && 0 <= this.y;
                    },
                    setVisible: function(b, g) {
                        var f = this,
                            a = f.series,
                            d = a.chart,
                            e = a.options.ignoreHiddenPoint;
                        g = q(g, e);
                        b !== f.visible &&
                            ((f.visible = f.options.visible = b =
                                    "undefined" === typeof b ? !f.visible : b),
                                (a.options.data[a.data.indexOf(f)] = f.options), ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(
                                    function(a) {
                                        if (f[a]) f[a][b ? "show" : "hide"](!0);
                                    }
                                ),
                                f.legendItem && d.legend.colorizeItem(f, b),
                                b || "hover" !== f.state || f.setState(""),
                                e && (a.isDirty = !0),
                                g && d.redraw());
                    },
                    slice: function(b, g, f) {
                        var a = this.series;
                        d(f, a.chart);
                        q(g, !0);
                        this.sliced = this.options.sliced = w(b) ? b : !this.sliced;
                        a.options.data[a.data.indexOf(this)] = this.options;
                        this.graphic && this.graphic.animate(this.getTranslate());
                        this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
                    },
                    getTranslate: function() {
                        return this.sliced ?
                            this.slicedTranslation :
                            { translateX: 0, translateY: 0 };
                    },
                    haloPath: function(b) {
                        var g = this.shapeArgs;
                        return this.sliced || !this.visible ?
                            [] :
                            this.series.chart.renderer.symbols.arc(
                                g.x,
                                g.y,
                                g.r + b,
                                g.r + b, { innerR: g.r - 1, start: g.start, end: g.end }
                            );
                    },
                    connectorShapes: {
                        fixedOffset: function(b, g, f) {
                            var a = g.breakAt;
                            g = g.touchingSliceAt;
                            return [
                                ["M", b.x, b.y],
                                f.softConnector ?
                                [
                                    "C",
                                    b.x + ("left" === b.alignment ? -5 : 5),
                                    b.y,
                                    2 * a.x - g.x,
                                    2 * a.y - g.y,
                                    a.x,
                                    a.y,
                                ] :
                                ["L", a.x, a.y],
                                ["L", g.x, g.y],
                            ];
                        },
                        straight: function(b, g) {
                            g = g.touchingSliceAt;
                            return [
                                ["M", b.x, b.y],
                                ["L", g.x, g.y],
                            ];
                        },
                        crookedLine: function(b, g, f) {
                            g = g.touchingSliceAt;
                            var a = this.series,
                                d = a.center[0],
                                e = a.chart.plotWidth,
                                m = a.chart.plotLeft;
                            a = b.alignment;
                            var k = this.shapeArgs.r;
                            f = h(f.crookDistance, 1);
                            e =
                                "left" === a ?
                                d + k + (e + m - d - k) * (1 - f) :
                                m + (d - k) * f;
                            f = ["L", e, b.y];
                            d = !0;
                            if ("left" === a ? e > b.x || e < g.x : e < b.x || e > g.x)
                                d = !1;
                            b = [
                                ["M", b.x, b.y]
                            ];
                            d && b.push(f);
                            b.push(["L", g.x, g.y]);
                            return b;
                        },
                    },
                    getConnectorPath: function() {
                        var b = this.labelPosition,
                            g = this.series.options.dataLabels,
                            f = g.connectorShape,
                            a = this.connectorShapes;
                        a[f] && (f = a[f]);
                        return f.call(
                            this, { x: b.final.x, y: b.final.y, alignment: b.alignment },
                            b.connectorPosition,
                            g
                        );
                    },
                }
            );
            ("");
        }
    );
    Q(
        k,
        "Core/Series/DataLabels.js", [
            k["Core/Animation/AnimationUtilities.js"],
            k["Core/Globals.js"],
            k["Core/Series/CartesianSeries.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D) {
            var B = k.getDeferredAnimation;
            k = t.noop;
            var M = t.seriesTypes,
                n = D.arrayMax,
                z = D.clamp,
                G = D.defined,
                d = D.extend,
                O = D.fireEvent,
                u = D.format,
                F = D.isArray,
                w = D.merge,
                r = D.objectEach,
                m = D.pick,
                L = D.relativeLength,
                q = D.splat,
                h = D.stableSort;
            ("");
            t.distribute = function(b, g, f) {
                function a(a, b) {
                    return a.target - b.target;
                }
                var d,
                    e = !0,
                    k = b,
                    q = [];
                var y = 0;
                var n = k.reducedLen || g;
                for (d = b.length; d--;) y += b[d].size;
                if (y > n) {
                    h(b, function(a, b) {
                        return (b.rank || 0) - (a.rank || 0);
                    });
                    for (y = d = 0; y <= n;)(y += b[d].size), d++;
                    q = b.splice(d - 1, b.length);
                }
                h(b, a);
                for (
                    b = b.map(function(a) {
                        return {
                            size: a.size,
                            targets: [a.target],
                            align: m(a.align, 0.5),
                        };
                    }); e;

                ) {
                    for (d = b.length; d--;)
                        (e = b[d]),
                        (y =
                            (Math.min.apply(0, e.targets) + Math.max.apply(0, e.targets)) /
                            2),
                        (e.pos = z(y - e.size * e.align, 0, g - e.size));
                    d = b.length;
                    for (e = !1; d--;)
                        0 < d &&
                        b[d - 1].pos + b[d - 1].size > b[d].pos &&
                        ((b[d - 1].size += b[d].size),
                            (b[d - 1].targets = b[d - 1].targets.concat(b[d].targets)),
                            (b[d - 1].align = 0.5),
                            b[d - 1].pos + b[d - 1].size > g &&
                            (b[d - 1].pos = g - b[d - 1].size),
                            b.splice(d, 1),
                            (e = !0));
                }
                k.push.apply(k, q);
                d = 0;
                b.some(function(a) {
                    var b = 0;
                    if (
                        a.targets.some(function() {
                            k[d].pos = a.pos + b;
                            if (
                                "undefined" !== typeof f &&
                                Math.abs(k[d].pos - k[d].target) > f
                            )
                                return (
                                    k.slice(0, d + 1).forEach(function(a) {
                                        delete a.pos;
                                    }),
                                    (k.reducedLen = (k.reducedLen || g) - 0.1 * g),
                                    k.reducedLen > 0.1 * g && t.distribute(k, g, f), !0
                                );
                            b += k[d].size;
                            d++;
                        })
                    )
                        return !0;
                });
                h(k, a);
            };
            I.prototype.drawDataLabels = function() {
                function b(a, b) {
                    var e = b.filter;
                    return e ?
                        ((b = e.operator),
                            (a = a[e.property]),
                            (e = e.value),
                            (">" === b && a > e) ||
                            ("<" === b && a < e) ||
                            (">=" === b && a >= e) ||
                            ("<=" === b && a <= e) ||
                            ("==" === b && a == e) ||
                            ("===" === b && a === e) ?
                            !0 :
                            !1) :
                        !0;
                }

                function g(a, b) {
                    var e = [],
                        c;
                    if (F(a) && !F(b))
                        e = a.map(function(a) {
                            return w(a, b);
                        });
                    else if (F(b) && !F(a))
                        e = b.map(function(c) {
                            return w(a, c);
                        });
                    else if (F(a) || F(b))
                        for (c = Math.max(a.length, b.length); c--;) e[c] = w(a[c], b[c]);
                    else e = w(a, b);
                    return e;
                }
                var f = this,
                    a = f.chart,
                    d = f.options,
                    e = d.dataLabels,
                    h = f.points,
                    k,
                    y = f.hasRendered || 0,
                    n = e.animation;
                n = e.defer ? B(a, n, f) : { defer: 0, duration: 0 };
                var t = a.renderer;
                e = g(
                    g(
                        a.options.plotOptions &&
                        a.options.plotOptions.series &&
                        a.options.plotOptions.series.dataLabels,
                        a.options.plotOptions &&
                        a.options.plotOptions[f.type] &&
                        a.options.plotOptions[f.type].dataLabels
                    ),
                    e
                );
                O(this, "drawDataLabels");
                if (F(e) || e.enabled || f._hasPointLabels) {
                    var K = f.plotGroup(
                        "dataLabelsGroup",
                        "data-labels",
                        y ? "inherit" : "hidden",
                        e.zIndex || 6
                    );
                    K.attr({ opacity: +y });
                    !y &&
                        (y = f.dataLabelsGroup) &&
                        (f.visible && K.show(!0),
                            y[d.animation ? "animate" : "attr"]({ opacity: 1 }, n));
                    h.forEach(function(h) {
                        k = q(g(e, h.dlOptions || (h.options && h.options.dataLabels)));
                        k.forEach(function(e, g) {
                            var c = e.enabled && (!h.isNull || h.dataLabelOnNull) && b(h, e),
                                l = h.dataLabels ? h.dataLabels[g] : h.dataLabel,
                                p = h.connectors ? h.connectors[g] : h.connector,
                                k = m(e.distance, h.labelDistance),
                                q = !l;
                            if (c) {
                                var y = h.getLabelConfig();
                                var v = m(e[h.formatPrefix + "Format"], e.format);
                                y = G(v) ?
                                    u(v, y, a) :
                                    (e[h.formatPrefix + "Formatter"] || e.formatter).call(y, e);
                                v = e.style;
                                var A = e.rotation;
                                a.styledMode ||
                                    ((v.color = m(e.color, v.color, f.color, "#000000")),
                                        "contrast" === v.color ?
                                        ((h.contrastColor = t.getContrast(h.color || f.color)),
                                            (v.color =
                                                (!G(k) && e.inside) || 0 > k || d.stacking ?
                                                h.contrastColor :
                                                "#000000")) :
                                        delete h.contrastColor,
                                        d.cursor && (v.cursor = d.cursor));
                                var n = {
                                    r: e.borderRadius || 0,
                                    rotation: A,
                                    padding: e.padding,
                                    zIndex: 1,
                                };
                                a.styledMode ||
                                    ((n.fill = e.backgroundColor),
                                        (n.stroke = e.borderColor),
                                        (n["stroke-width"] = e.borderWidth));
                                r(n, function(a, c) {
                                    "undefined" === typeof a && delete n[c];
                                });
                            }!l || (c && G(y)) ?
                                c &&
                                G(y) &&
                                (l ?
                                    (n.text = y) :
                                    ((h.dataLabels = h.dataLabels || []),
                                        (l = h.dataLabels[g] = A ?
                                            t
                                            .text(y, 0, -9999, e.useHTML)
                                            .addClass("highcharts-data-label") :
                                            t.label(
                                                y,
                                                0, -9999,
                                                e.shape,
                                                null,
                                                null,
                                                e.useHTML,
                                                null,
                                                "data-label"
                                            )),
                                        g || (h.dataLabel = l),
                                        l.addClass(
                                            " highcharts-data-label-color-" +
                                            h.colorIndex +
                                            " " +
                                            (e.className || "") +
                                            (e.useHTML ? " highcharts-tracker" : "")
                                        )),
                                    (l.options = e),
                                    l.attr(n),
                                    a.styledMode || l.css(v).shadow(e.shadow),
                                    l.added || l.add(K),
                                    e.textPath &&
                                    !e.useHTML &&
                                    (l.setTextPath(
                                            (h.getDataLabelPath && h.getDataLabelPath(l)) ||
                                            h.graphic,
                                            e.textPath
                                        ),
                                        h.dataLabelPath &&
                                        !e.textPath.enabled &&
                                        (h.dataLabelPath = h.dataLabelPath.destroy())),
                                    f.alignDataLabel(h, l, e, null, q)) :
                                ((h.dataLabel = h.dataLabel && h.dataLabel.destroy()),
                                    h.dataLabels &&
                                    (1 === h.dataLabels.length ?
                                        delete h.dataLabels :
                                        delete h.dataLabels[g]),
                                    g || delete h.dataLabel,
                                    p &&
                                    ((h.connector = h.connector.destroy()),
                                        h.connectors &&
                                        (1 === h.connectors.length ?
                                            delete h.connectors :
                                            delete h.connectors[g])));
                        });
                    });
                }
                O(this, "afterDrawDataLabels");
            };
            I.prototype.alignDataLabel = function(b, g, f, a, h) {
                var e = this,
                    p = this.chart,
                    k = this.isCartesian && p.inverted,
                    q = this.enabledDataSorting,
                    n = m(b.dlBox && b.dlBox.centerX, b.plotX, -9999),
                    r = m(b.plotY, -9999),
                    K = g.getBBox(),
                    A = f.rotation,
                    C = f.align,
                    v = p.isInsidePlot(n, Math.round(r), k),
                    c = "justify" === m(f.overflow, q ? "none" : "justify"),
                    l =
                    this.visible &&
                    !1 !== b.visible &&
                    (b.series.forceDL ||
                        (q && !c) ||
                        v ||
                        (f.inside &&
                            a &&
                            p.isInsidePlot(n, k ? a.x + 1 : a.y + a.height - 1, k)));
                var x = function(a) {
                    q && e.xAxis && !c && e.setDataLabelStartPos(b, g, h, v, a);
                };
                if (l) {
                    var u = p.renderer.fontMetrics(
                        p.styledMode ? void 0 : f.style.fontSize,
                        g
                    ).b;
                    a = d({
                            x: k ? this.yAxis.len - r : n,
                            y: Math.round(k ? this.xAxis.len - n : r),
                            width: 0,
                            height: 0,
                        },
                        a
                    );
                    d(f, { width: K.width, height: K.height });
                    A
                        ?
                        ((c = !1),
                            (n = p.renderer.rotCorr(u, A)),
                            (n = {
                                x: a.x + (f.x || 0) + a.width / 2 + n.x,
                                y: a.y +
                                    (f.y || 0) + { top: 0, middle: 0.5, bottom: 1 }[f.verticalAlign] *
                                    a.height,
                            }),
                            x(n),
                            g[h ? "attr" : "animate"](n).attr({ align: C }),
                            (x = (A + 720) % 360),
                            (x = 180 < x && 360 > x),
                            "left" === C ?
                            (n.y -= x ? K.height : 0) :
                            "center" === C ?
                            ((n.x -= K.width / 2), (n.y -= K.height / 2)) :
                            "right" === C &&
                            ((n.x -= K.width), (n.y -= x ? 0 : K.height)),
                            (g.placed = !0),
                            (g.alignAttr = n)) :
                        (x(a), g.align(f, null, a), (n = g.alignAttr));
                    c && 0 <= a.height ?
                        this.justifyDataLabel(g, f, n, K, a, h) :
                        m(f.crop, !0) &&
                        (l =
                            p.isInsidePlot(n.x, n.y) &&
                            p.isInsidePlot(n.x + K.width, n.y + K.height));
                    if (f.shape && !A)
                        g[h ? "attr" : "animate"]({
                            anchorX: k ? p.plotWidth - b.plotY : b.plotX,
                            anchorY: k ? p.plotHeight - b.plotX : b.plotY,
                        });
                }
                h && q && (g.placed = !1);
                l || (q && !c) || (g.hide(!0), (g.placed = !1));
            };
            I.prototype.setDataLabelStartPos = function(b, g, f, a, d) {
                var e = this.chart,
                    h = e.inverted,
                    p = this.xAxis,
                    m = p.reversed,
                    k = h ? g.height / 2 : g.width / 2;
                b = (b = b.pointWidth) ? b / 2 : 0;
                p = h ? d.x : m ? -k - b : p.width - k + b;
                d = h ? (m ? this.yAxis.height - k + b : -k - b) : d.y;
                g.startXPos = p;
                g.startYPos = d;
                a
                    ?
                    "hidden" === g.visibility &&
                    (g.show(), g.attr({ opacity: 0 }).animate({ opacity: 1 })) :
                    g.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, g.hide);
                e.hasRendered &&
                    (f && g.attr({ x: g.startXPos, y: g.startYPos }), (g.placed = !0));
            };
            I.prototype.justifyDataLabel = function(b, g, f, a, d, e) {
                var h = this.chart,
                    p = g.align,
                    m = g.verticalAlign,
                    k = b.box ? 0 : b.padding || 0,
                    q = g.x;
                q = void 0 === q ? 0 : q;
                var n = g.y;
                var A = void 0 === n ? 0 : n;
                n = f.x + k;
                if (0 > n) {
                    "right" === p && 0 <= q ?
                        ((g.align = "left"), (g.inside = !0)) :
                        (q -= n);
                    var r = !0;
                }
                n = f.x + a.width - k;
                n > h.plotWidth &&
                    ("left" === p && 0 >= q ?
                        ((g.align = "right"), (g.inside = !0)) :
                        (q += h.plotWidth - n),
                        (r = !0));
                n = f.y + k;
                0 > n &&
                    ("bottom" === m && 0 <= A ?
                        ((g.verticalAlign = "top"), (g.inside = !0)) :
                        (A -= n),
                        (r = !0));
                n = f.y + a.height - k;
                n > h.plotHeight &&
                    ("top" === m && 0 >= A ?
                        ((g.verticalAlign = "bottom"), (g.inside = !0)) :
                        (A += h.plotHeight - n),
                        (r = !0));
                r && ((g.x = q), (g.y = A), (b.placed = !e), b.align(g, void 0, d));
                return r;
            };
            M.pie &&
                ((M.pie.prototype.dataLabelPositioners = {
                        radialDistributionY: function(b) {
                            return b.top + b.distributeBox.pos;
                        },
                        radialDistributionX: function(b, g, f, a) {
                            return b.getX(f < g.top + 2 || f > g.bottom - 2 ? a : f, g.half, g);
                        },
                        justify: function(b, g, f) {
                            return f[0] + (b.half ? -1 : 1) * (g + b.labelDistance);
                        },
                        alignToPlotEdges: function(b, g, f, a) {
                            b = b.getBBox().width;
                            return g ? b + a : f - b - a;
                        },
                        alignToConnectors: function(b, g, f, a) {
                            var d = 0,
                                e;
                            b.forEach(function(a) {
                                e = a.dataLabel.getBBox().width;
                                e > d && (d = e);
                            });
                            return g ? d + a : f - d - a;
                        },
                    }),
                    (M.pie.prototype.drawDataLabels = function() {
                        var b = this,
                            g = b.data,
                            f,
                            a = b.chart,
                            d = b.options.dataLabels || {},
                            e = d.connectorPadding,
                            h,
                            k = a.plotWidth,
                            q = a.plotHeight,
                            r = a.plotLeft,
                            u = Math.round(a.chartWidth / 3),
                            K,
                            A = b.center,
                            C = A[2] / 2,
                            v = A[1],
                            c,
                            l,
                            x,
                            z,
                            F = [
                                [],
                                []
                            ],
                            L,
                            B,
                            D,
                            J,
                            O = [0, 0, 0, 0],
                            M = b.dataLabelPositioners,
                            U;
                        b.visible &&
                            (d.enabled || b._hasPointLabels) &&
                            (g.forEach(function(a) {
                                    a.dataLabel &&
                                        a.visible &&
                                        a.dataLabel.shortened &&
                                        (a.dataLabel
                                            .attr({ width: "auto" })
                                            .css({ width: "auto", textOverflow: "clip" }),
                                            (a.dataLabel.shortened = !1));
                                }),
                                I.prototype.drawDataLabels.apply(b),
                                g.forEach(function(a) {
                                    a.dataLabel &&
                                        (a.visible ?
                                            (F[a.half].push(a),
                                                (a.dataLabel._pos = null), !G(d.style.width) &&
                                                !G(
                                                    a.options.dataLabels &&
                                                    a.options.dataLabels.style &&
                                                    a.options.dataLabels.style.width
                                                ) &&
                                                a.dataLabel.getBBox().width > u &&
                                                (a.dataLabel.css({ width: Math.round(0.7 * u) + "px" }),
                                                    (a.dataLabel.shortened = !0))) :
                                            ((a.dataLabel = a.dataLabel.destroy()),
                                                a.dataLabels &&
                                                1 === a.dataLabels.length &&
                                                delete a.dataLabels));
                                }),
                                F.forEach(function(g, h) {
                                    var p = g.length,
                                        n = [],
                                        y;
                                    if (p) {
                                        b.sortByAngle(g, h - 0.5);
                                        if (0 < b.maxLabelDistance) {
                                            var K = Math.max(0, v - C - b.maxLabelDistance);
                                            var E = Math.min(v + C + b.maxLabelDistance, a.plotHeight);
                                            g.forEach(function(c) {
                                                0 < c.labelDistance &&
                                                    c.dataLabel &&
                                                    ((c.top = Math.max(0, v - C - c.labelDistance)),
                                                        (c.bottom = Math.min(
                                                            v + C + c.labelDistance,
                                                            a.plotHeight
                                                        )),
                                                        (y = c.dataLabel.getBBox().height || 21),
                                                        (c.distributeBox = {
                                                            target: c.labelPosition.natural.y - c.top + y / 2,
                                                            size: y,
                                                            rank: c.y,
                                                        }),
                                                        n.push(c.distributeBox));
                                            });
                                            K = E + y - K;
                                            t.distribute(n, K, K / 5);
                                        }
                                        for (J = 0; J < p; J++) {
                                            f = g[J];
                                            x = f.labelPosition;
                                            c = f.dataLabel;
                                            D = !1 === f.visible ? "hidden" : "inherit";
                                            B = K = x.natural.y;
                                            n &&
                                                G(f.distributeBox) &&
                                                ("undefined" === typeof f.distributeBox.pos ?
                                                    (D = "hidden") :
                                                    ((z = f.distributeBox.size),
                                                        (B = M.radialDistributionY(f))));
                                            delete f.positionIndex;
                                            if (d.justify) L = M.justify(f, C, A);
                                            else
                                                switch (d.alignTo) {
                                                    case "connectors":
                                                        L = M.alignToConnectors(g, h, k, r);
                                                        break;
                                                    case "plotEdges":
                                                        L = M.alignToPlotEdges(c, h, k, r);
                                                        break;
                                                    default:
                                                        L = M.radialDistributionX(b, f, B, K);
                                                }
                                            c._attr = { visibility: D, align: x.alignment };
                                            U = f.options.dataLabels || {};
                                            c._pos = {
                                                x: L +
                                                    m(U.x, d.x) +
                                                    ({ left: e, right: -e }[x.alignment] || 0),
                                                y: B + m(U.y, d.y) - 10,
                                            };
                                            x.final.x = L;
                                            x.final.y = B;
                                            m(d.crop, !0) &&
                                                ((l = c.getBBox().width),
                                                    (K = null),
                                                    L - l < e && 1 === h ?
                                                    ((K = Math.round(l - L + e)),
                                                        (O[3] = Math.max(K, O[3]))) :
                                                    L + l > k - e &&
                                                    0 === h &&
                                                    ((K = Math.round(L + l - k + e)),
                                                        (O[1] = Math.max(K, O[1]))),
                                                    0 > B - z / 2 ?
                                                    (O[0] = Math.max(Math.round(-B + z / 2), O[0])) :
                                                    B + z / 2 > q &&
                                                    (O[2] = Math.max(Math.round(B + z / 2 - q), O[2])),
                                                    (c.sideOverflow = K));
                                        }
                                    }
                                }),
                                0 === n(O) || this.verifyDataLabelOverflow(O)) &&
                            (this.placeDataLabels(),
                                this.points.forEach(function(e) {
                                    U = w(d, e.options.dataLabels);
                                    if ((h = m(U.connectorWidth, 1))) {
                                        var f;
                                        K = e.connector;
                                        if (
                                            (c = e.dataLabel) &&
                                            c._pos &&
                                            e.visible &&
                                            0 < e.labelDistance
                                        ) {
                                            D = c._attr.visibility;
                                            if ((f = !K))
                                                (e.connector = K = a.renderer
                                                    .path()
                                                    .addClass(
                                                        "highcharts-data-label-connector  highcharts-color-" +
                                                        e.colorIndex +
                                                        (e.className ? " " + e.className : "")
                                                    )
                                                    .add(b.dataLabelsGroup)),
                                                a.styledMode ||
                                                K.attr({
                                                    "stroke-width": h,
                                                    stroke: U.connectorColor || e.color || "#666666",
                                                });
                                            K[f ? "attr" : "animate"]({ d: e.getConnectorPath() });
                                            K.attr("visibility", D);
                                        } else K && (e.connector = K.destroy());
                                    }
                                }));
                    }),
                    (M.pie.prototype.placeDataLabels = function() {
                        this.points.forEach(function(b) {
                            var g = b.dataLabel,
                                f;
                            g &&
                                b.visible &&
                                ((f = g._pos) ?
                                    (g.sideOverflow &&
                                        ((g._attr.width = Math.max(
                                                g.getBBox().width - g.sideOverflow,
                                                0
                                            )),
                                            g.css({
                                                width: g._attr.width + "px",
                                                textOverflow:
                                                    (this.options.dataLabels.style || {}).textOverflow ||
                                                    "ellipsis",
                                            }),
                                            (g.shortened = !0)),
                                        g.attr(g._attr),
                                        g[g.moved ? "animate" : "attr"](f),
                                        (g.moved = !0)) :
                                    g && g.attr({ y: -9999 }));
                            delete b.distributeBox;
                        }, this);
                    }),
                    (M.pie.prototype.alignDataLabel = k),
                    (M.pie.prototype.verifyDataLabelOverflow = function(b) {
                        var g = this.center,
                            f = this.options,
                            a = f.center,
                            d = f.minSize || 80,
                            e = null !== f.size;
                        if (!e) {
                            if (null !== a[0]) var h = Math.max(g[2] - Math.max(b[1], b[3]), d);
                            else
                                (h = Math.max(g[2] - b[1] - b[3], d)),
                                (g[0] += (b[3] - b[1]) / 2);
                            null !== a[1] ?
                                (h = z(h, d, g[2] - Math.max(b[0], b[2]))) :
                                ((h = z(h, d, g[2] - b[0] - b[2])),
                                    (g[1] += (b[0] - b[2]) / 2));
                            h < g[2] ?
                                ((g[2] = h),
                                    (g[3] = Math.min(L(f.innerSize || 0, h), h)),
                                    this.translate(g),
                                    this.drawDataLabels && this.drawDataLabels()) :
                                (e = !0);
                        }
                        return e;
                    }));
            M.column &&
                (M.column.prototype.alignDataLabel = function(b, g, f, a, d) {
                    var e = this.chart.inverted,
                        h = b.series,
                        p = b.dlBox || b.shapeArgs,
                        k = m(b.below, b.plotY > m(this.translatedThreshold, h.yAxis.len)),
                        q = m(f.inside, !!this.options.stacking);
                    p &&
                        ((a = w(p)),
                            0 > a.y && ((a.height += a.y), (a.y = 0)),
                            (p = a.y + a.height - h.yAxis.len),
                            0 < p && p < a.height && (a.height -= p),
                            e &&
                            (a = {
                                x: h.yAxis.len - a.y - a.height,
                                y: h.xAxis.len - a.x - a.width,
                                width: a.height,
                                height: a.width,
                            }),
                            q ||
                            (e ?
                                ((a.x += k ? 0 : a.width), (a.width = 0)) :
                                ((a.y += k ? a.height : 0), (a.height = 0))));
                    f.align = m(f.align, !e || q ? "center" : k ? "right" : "left");
                    f.verticalAlign = m(
                        f.verticalAlign,
                        e || q ? "middle" : k ? "top" : "bottom"
                    );
                    I.prototype.alignDataLabel.call(this, b, g, f, a, d);
                    f.inside && b.contrastColor && g.css({ color: b.contrastColor });
                });
        }
    );
    Q(
        k,
        "Extensions/OverlappingDataLabels.js", [k["Core/Chart/Chart.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.addEvent,
                D = t.fireEvent,
                J = t.isArray,
                M = t.isNumber,
                n = t.objectEach,
                z = t.pick;
            B(k, "render", function() {
                var k = [];
                (this.labelCollectors || []).forEach(function(d) {
                    k = k.concat(d());
                });
                (this.yAxis || []).forEach(function(d) {
                    d.stacking &&
                        d.options.stackLabels &&
                        !d.options.stackLabels.allowOverlap &&
                        n(d.stacking.stacks, function(d) {
                            n(d, function(d) {
                                k.push(d.label);
                            });
                        });
                });
                (this.series || []).forEach(function(d) {
                    var n = d.options.dataLabels;
                    d.visible &&
                        (!1 !== n.enabled || d._hasPointLabels) &&
                        (d.nodes || d.points).forEach(function(d) {
                            d.visible &&
                                (J(d.dataLabels) ?
                                    d.dataLabels :
                                    d.dataLabel ?
                                    [d.dataLabel] :
                                    []
                                ).forEach(function(n) {
                                    var u = n.options;
                                    n.labelrank = z(
                                        u.labelrank,
                                        d.labelrank,
                                        d.shapeArgs && d.shapeArgs.height
                                    );
                                    u.allowOverlap || k.push(n);
                                });
                        });
                });
                this.hideOverlappingLabels(k);
            });
            k.prototype.hideOverlappingLabels = function(k) {
                var d = this,
                    n = k.length,
                    u = d.renderer,
                    t,
                    w,
                    r,
                    m = !1;
                var z = function(b) {
                    var g,
                        f = b.box ? 0 : b.padding || 0,
                        a = (g = 0),
                        d;
                    if (b && (!b.alignAttr || b.placed)) {
                        var e = b.alignAttr || { x: b.attr("x"), y: b.attr("y") };
                        var h = b.parentGroup;
                        b.width ||
                            ((g = b.getBBox()),
                                (b.width = g.width),
                                (b.height = g.height),
                                (g = u.fontMetrics(null, b.element).h));
                        var m = b.width - 2 * f;
                        (d = { left: "0", center: "0.5", right: "1" }[b.alignValue]) ?
                        (a = +d * m) :
                        M(b.x) &&
                            Math.round(b.x) !== b.translateX &&
                            (a = b.x - b.translateX);
                        return {
                            x: e.x + (h.translateX || 0) + f - (a || 0),
                            y: e.y + (h.translateY || 0) + f - g,
                            width: b.width - 2 * f,
                            height: b.height - 2 * f,
                        };
                    }
                };
                for (w = 0; w < n; w++)
                    if ((t = k[w]))
                        (t.oldOpacity = t.opacity),
                        (t.newOpacity = 1),
                        (t.absoluteBox = z(t));
                k.sort(function(b, g) {
                    return (g.labelrank || 0) - (b.labelrank || 0);
                });
                for (w = 0; w < n; w++) {
                    var q = (z = k[w]) && z.absoluteBox;
                    for (t = w + 1; t < n; ++t) {
                        var h = (r = k[t]) && r.absoluteBox;
                        !q ||
                            !h ||
                            z === r ||
                            0 === z.newOpacity ||
                            0 === r.newOpacity ||
                            h.x >= q.x + q.width ||
                            h.x + h.width <= q.x ||
                            h.y >= q.y + q.height ||
                            h.y + h.height <= q.y ||
                            ((z.labelrank < r.labelrank ? z : r).newOpacity = 0);
                    }
                }
                k.forEach(function(b) {
                    if (b) {
                        var g = b.newOpacity;
                        b.oldOpacity !== g &&
                            (b.alignAttr && b.placed ?
                                (b[g ? "removeClass" : "addClass"](
                                        "highcharts-data-label-hidden"
                                    ),
                                    (m = !0),
                                    (b.alignAttr.opacity = g),
                                    b[b.isOld ? "animate" : "attr"](
                                        b.alignAttr,
                                        null,
                                        function() {
                                            d.styledMode ||
                                                b.css({ pointerEvents: g ? "auto" : "none" });
                                            b.visibility = g ? "inherit" : "hidden";
                                        }
                                    ),
                                    D(d, "afterHideOverlappingLabel")) :
                                b.attr({ opacity: g }));
                        b.isOld = !0;
                    }
                });
                m && D(d, "afterHideAllOverlappingLabels");
            };
        }
    );
    Q(
        k,
        "Core/Interaction.js", [
            k["Core/Series/Series.js"],
            k["Core/Chart/Chart.js"],
            k["Core/Globals.js"],
            k["Core/Legend.js"],
            k["Series/LineSeries.js"],
            k["Core/Options.js"],
            k["Core/Series/Point.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n, z) {
            k = k.seriesTypes;
            var G = I.hasTouch,
                d = I.svg,
                B = M.defaultOptions,
                u = z.addEvent,
                F = z.createElement,
                w = z.css,
                r = z.defined,
                m = z.extend,
                L = z.fireEvent,
                q = z.isArray,
                h = z.isFunction,
                b = z.isNumber,
                g = z.isObject,
                f = z.merge,
                a = z.objectEach,
                p = z.pick;
            ("");
            I = I.TrackerMixin = {
                drawTrackerPoint: function() {
                    var a = this,
                        b = a.chart,
                        f = b.pointer,
                        g = function(a) {
                            var b = f.getPointFromEvent(a);
                            "undefined" !== typeof b &&
                                ((f.isDirectTouch = !0), b.onMouseOver(a));
                        },
                        d;
                    a.points.forEach(function(a) {
                        d = q(a.dataLabels) ?
                            a.dataLabels :
                            a.dataLabel ?
                            [a.dataLabel] :
                            [];
                        a.graphic && (a.graphic.element.point = a);
                        d.forEach(function(b) {
                            b.div ? (b.div.point = a) : (b.element.point = a);
                        });
                    });
                    a._hasTracking ||
                        (a.trackerGroups.forEach(function(e) {
                                if (a[e]) {
                                    a[e]
                                        .addClass("highcharts-tracker")
                                        .on("mouseover", g)
                                        .on("mouseout", function(a) {
                                            f.onTrackerMouseOut(a);
                                        });
                                    if (G) a[e].on("touchstart", g);
                                    !b.styledMode &&
                                        a.options.cursor &&
                                        a[e].css(w).css({ cursor: a.options.cursor });
                                }
                            }),
                            (a._hasTracking = !0));
                    L(this, "afterDrawTracker");
                },
                drawTrackerGraph: function() {
                    var a = this,
                        b = a.options,
                        f = b.trackByArea,
                        g = [].concat(f ? a.areaPath : a.graphPath),
                        h = a.chart,
                        p = h.pointer,
                        m = h.renderer,
                        k = h.options.tooltip.snap,
                        q = a.tracker,
                        n = function(c) {
                            if (h.hoverSeries !== a) a.onMouseOver();
                        },
                        c = "rgba(192,192,192," + (d ? 0.0001 : 0.002) + ")";
                    q
                        ?
                        q.attr({ d: g }) :
                        a.graph &&
                        ((a.tracker = m
                                .path(g)
                                .attr({
                                    visibility: a.visible ? "visible" : "hidden",
                                    zIndex: 2,
                                })
                                .addClass(
                                    f ? "highcharts-tracker-area" : "highcharts-tracker-line"
                                )
                                .add(a.group)),
                            h.styledMode ||
                            a.tracker.attr({
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                stroke: c,
                                fill: f ? c : "none",
                                "stroke-width": a.graph.strokeWidth() + (f ? 0 : 2 * k),
                            }), [a.tracker, a.markerGroup].forEach(function(a) {
                                a.addClass("highcharts-tracker")
                                    .on("mouseover", n)
                                    .on("mouseout", function(a) {
                                        p.onTrackerMouseOut(a);
                                    });
                                b.cursor && !h.styledMode && a.css({ cursor: b.cursor });
                                if (G) a.on("touchstart", n);
                            }));
                    L(this, "afterDrawTracker");
                },
            };
            k.column && (k.column.prototype.drawTracker = I.drawTrackerPoint);
            k.pie && (k.pie.prototype.drawTracker = I.drawTrackerPoint);
            k.scatter && (k.scatter.prototype.drawTracker = I.drawTrackerPoint);
            m(D.prototype, {
                setItemEvents: function(a, b, g) {
                    var e = this,
                        d = e.chart.renderer.boxWrapper,
                        h = a instanceof n,
                        p = "highcharts-legend-" + (h ? "point" : "series") + "-active",
                        m = e.chart.styledMode;
                    (g ? [b, a.legendSymbol] : [a.legendGroup]).forEach(function(g) {
                        if (g)
                            g.on("mouseover", function() {
                                a.visible &&
                                    e.allItems.forEach(function(b) {
                                        a !== b && b.setState("inactive", !h);
                                    });
                                a.setState("hover");
                                a.visible && d.addClass(p);
                                m || b.css(e.options.itemHoverStyle);
                            })
                            .on("mouseout", function() {
                                e.chart.styledMode ||
                                    b.css(f(a.visible ? e.itemStyle : e.itemHiddenStyle));
                                e.allItems.forEach(function(b) {
                                    a !== b && b.setState("", !h);
                                });
                                d.removeClass(p);
                                a.setState();
                            })
                            .on("click", function(b) {
                                var c = function() {
                                    a.setVisible && a.setVisible();
                                    e.allItems.forEach(function(c) {
                                        a !== c && c.setState(a.visible ? "inactive" : "", !h);
                                    });
                                };
                                d.removeClass(p);
                                b = { browserEvent: b };
                                a.firePointEvent ?
                                    a.firePointEvent("legendItemClick", b, c) :
                                    L(a, "legendItemClick", b, c);
                            });
                    });
                },
                createCheckboxForItem: function(a) {
                    a.checkbox = F(
                        "input", {
                            type: "checkbox",
                            className: "highcharts-legend-checkbox",
                            checked: a.selected,
                            defaultChecked: a.selected,
                        },
                        this.options.itemCheckboxStyle,
                        this.chart.container
                    );
                    u(a.checkbox, "click", function(b) {
                        L(
                            a.series || a,
                            "checkboxClick", { checked: b.target.checked, item: a },
                            function() {
                                a.select();
                            }
                        );
                    });
                },
            });
            m(t.prototype, {
                showResetZoom: function() {
                    function a() {
                        b.zoomOut();
                    }
                    var b = this,
                        f = B.lang,
                        g = b.options.chart.resetZoomButton,
                        d = g.theme,
                        h = d.states,
                        p =
                        "chart" === g.relativeTo || "spaceBox" === g.relativeTo ?
                        null :
                        "plotBox";
                    L(this, "beforeShowResetZoom", null, function() {
                        b.resetZoomButton = b.renderer
                            .button(f.resetZoom, null, null, a, d, h && h.hover)
                            .attr({ align: g.position.align, title: f.resetZoomTitle })
                            .addClass("highcharts-reset-zoom")
                            .add()
                            .align(g.position, !1, p);
                    });
                    L(this, "afterShowResetZoom");
                },
                zoomOut: function() {
                    L(this, "selection", { resetSelection: !0 }, this.zoom);
                },
                zoom: function(a) {
                    var b = this,
                        e,
                        f = b.pointer,
                        d = !1,
                        h = b.inverted ? f.mouseDownX : f.mouseDownY;
                    !a || a.resetSelection ?
                        (b.axes.forEach(function(a) {
                                e = a.zoom();
                            }),
                            (f.initiated = !1)) :
                        a.xAxis.concat(a.yAxis).forEach(function(a) {
                            var g = a.axis,
                                p = b.inverted ? g.left : g.top,
                                c = b.inverted ? p + g.width : p + g.height,
                                l = g.isXAxis,
                                m = !1;
                            if ((!l && h >= p && h <= c) || l || !r(h)) m = !0;
                            f[l ? "zoomX" : "zoomY"] &&
                                m &&
                                ((e = g.zoom(a.min, a.max)), g.displayBtn && (d = !0));
                        });
                    var m = b.resetZoomButton;
                    d && !m ?
                        b.showResetZoom() :
                        !d && g(m) && (b.resetZoomButton = m.destroy());
                    e &&
                        b.redraw(
                            p(b.options.chart.animation, a && a.animation, 100 > b.pointCount)
                        );
                },
                pan: function(a, f) {
                    var e = this,
                        g = e.hoverPoints,
                        d = e.options.chart,
                        h = e.options.mapNavigation && e.options.mapNavigation.enabled,
                        m;
                    f = "object" === typeof f ? f : { enabled: f, type: "x" };
                    d && d.panning && (d.panning = f);
                    var k = f.type;
                    L(this, "pan", { originalEvent: a }, function() {
                        g &&
                            g.forEach(function(a) {
                                a.setState();
                            });
                        var f = [1];
                        "xy" === k ? (f = [1, 0]) : "y" === k && (f = [0]);
                        f.forEach(function(f) {
                            var c = e[f ? "xAxis" : "yAxis"][0],
                                g = c.horiz,
                                d = a[g ? "chartX" : "chartY"];
                            g = g ? "mouseDownX" : "mouseDownY";
                            var q = e[g],
                                n = (c.pointRange || 0) / 2,
                                v =
                                (c.reversed && !e.inverted) || (!c.reversed && e.inverted) ?
                                -1 :
                                1,
                                y = c.getExtremes(),
                                A = c.toValue(q - d, !0) + n * v;
                            v = c.toValue(q + c.len - d, !0) - n * v;
                            var r = v < A;
                            q = r ? v : A;
                            A = r ? A : v;
                            var K = c.hasVerticalPanning(),
                                C = c.panningState;
                            c.series.forEach(function(a) {
                                if (K && !f && (!C || C.isDirty)) {
                                    var c = a.getProcessedData(!0);
                                    a = a.getExtremes(c.yData, !0);
                                    C ||
                                        (C = {
                                            startMin: Number.MAX_VALUE,
                                            startMax: -Number.MAX_VALUE,
                                        });
                                    b(a.dataMin) &&
                                        b(a.dataMax) &&
                                        ((C.startMin = Math.min(a.dataMin, C.startMin)),
                                            (C.startMax = Math.max(a.dataMax, C.startMax)));
                                }
                            });
                            v = Math.min(
                                p(null === C || void 0 === C ? void 0 : C.startMin, y.dataMin),
                                n ? y.min : c.toValue(c.toPixels(y.min) - c.minPixelPadding)
                            );
                            n = Math.max(
                                p(null === C || void 0 === C ? void 0 : C.startMax, y.dataMax),
                                n ? y.max : c.toValue(c.toPixels(y.max) + c.minPixelPadding)
                            );
                            c.panningState = C;
                            c.isOrdinal ||
                                ((r = v - q),
                                    0 < r && ((A += r), (q = v)),
                                    (r = A - n),
                                    0 < r && ((A = n), (q -= r)),
                                    c.series.length &&
                                    q !== y.min &&
                                    A !== y.max &&
                                    q >= v &&
                                    A <= n &&
                                    (c.setExtremes(q, A, !1, !1, { trigger: "pan" }),
                                        e.resetZoomButton ||
                                        h ||
                                        q === v ||
                                        A === n ||
                                        !k.match("y") ||
                                        (e.showResetZoom(), (c.displayBtn = !1)),
                                        (m = !0)),
                                    (e[g] = d));
                        });
                        m && e.redraw(!1);
                        w(e.container, { cursor: "move" });
                    });
                },
            });
            m(n.prototype, {
                select: function(a, b) {
                    var e = this,
                        f = e.series,
                        g = f.chart;
                    this.selectedStaging = a = p(a, !e.selected);
                    e.firePointEvent(
                        a ? "select" : "unselect", { accumulate: b },
                        function() {
                            e.selected = e.options.selected = a;
                            f.options.data[f.data.indexOf(e)] = e.options;
                            e.setState(a && "select");
                            b ||
                                g.getSelectedPoints().forEach(function(a) {
                                    var b = a.series;
                                    a.selected &&
                                        a !== e &&
                                        ((a.selected = a.options.selected = !1),
                                            (b.options.data[b.data.indexOf(a)] = a.options),
                                            a.setState(
                                                g.hoverPoints && b.options.inactiveOtherPoints ?
                                                "inactive" :
                                                ""
                                            ),
                                            a.firePointEvent("unselect"));
                                });
                        }
                    );
                    delete this.selectedStaging;
                },
                onMouseOver: function(a) {
                    var b = this.series.chart,
                        e = b.pointer;
                    a = a ?
                        e.normalize(a) :
                        e.getChartCoordinatesFromPoint(this, b.inverted);
                    e.runPointActions(a, this);
                },
                onMouseOut: function() {
                    var a = this.series.chart;
                    this.firePointEvent("mouseOut");
                    this.series.options.inactiveOtherPoints ||
                        (a.hoverPoints || []).forEach(function(a) {
                            a.setState();
                        });
                    a.hoverPoints = a.hoverPoint = null;
                },
                importEvents: function() {
                    if (!this.hasImportedEvents) {
                        var b = this,
                            g = f(b.series.options.point, b.options).events;
                        b.events = g;
                        a(g, function(a, e) {
                            h(a) && u(b, e, a);
                        });
                        this.hasImportedEvents = !0;
                    }
                },
                setState: function(a, b) {
                    var e = this.series,
                        f = this.state,
                        g = e.options.states[a || "normal"] || {},
                        d = B.plotOptions[e.type].marker && e.options.marker,
                        h = d && !1 === d.enabled,
                        k = (d && d.states && d.states[a || "normal"]) || {},
                        q = !1 === k.enabled,
                        n = e.stateMarkerGraphic,
                        c = this.marker || {},
                        l = e.chart,
                        r = e.halo,
                        u,
                        w = d && e.markerAttribs;
                    a = a || "";
                    if (!(
                            (a === this.state && !b) ||
                            (this.selected && "select" !== a) ||
                            !1 === g.enabled ||
                            (a && (q || (h && !1 === k.enabled))) ||
                            (a && c.states && c.states[a] && !1 === c.states[a].enabled)
                        )) {
                        this.state = a;
                        w && (u = e.markerAttribs(this, a));
                        if (this.graphic) {
                            f && this.graphic.removeClass("highcharts-point-" + f);
                            a && this.graphic.addClass("highcharts-point-" + a);
                            if (!l.styledMode) {
                                var E = e.pointAttribs(this, a);
                                var t = p(l.options.chart.animation, g.animation);
                                e.options.inactiveOtherPoints &&
                                    E.opacity &&
                                    ((this.dataLabels || []).forEach(function(a) {
                                            a && a.animate({ opacity: E.opacity }, t);
                                        }),
                                        this.connector &&
                                        this.connector.animate({ opacity: E.opacity }, t));
                                this.graphic.animate(E, t);
                            }
                            u &&
                                this.graphic.animate(
                                    u,
                                    p(l.options.chart.animation, k.animation, d.animation)
                                );
                            n && n.hide();
                        } else {
                            if (a && k) {
                                f = c.symbol || e.symbol;
                                n && n.currentSymbol !== f && (n = n.destroy());
                                if (u)
                                    if (n) n[b ? "animate" : "attr"]({ x: u.x, y: u.y });
                                    else
                                        f &&
                                        ((e.stateMarkerGraphic = n = l.renderer
                                                .symbol(f, u.x, u.y, u.width, u.height)
                                                .add(e.markerGroup)),
                                            (n.currentSymbol = f));
                                    !l.styledMode && n && n.attr(e.pointAttribs(this, a));
                            }
                            n &&
                                (n[a && this.isInside ? "show" : "hide"](),
                                    (n.element.point = this));
                        }
                        a = g.halo;
                        g = ((n = this.graphic || n) && n.visibility) || "inherit";
                        a && a.size && n && "hidden" !== g && !this.isCluster ?
                            (r || (e.halo = r = l.renderer.path().add(n.parentGroup)),
                                r.show()[b ? "animate" : "attr"]({ d: this.haloPath(a.size) }),
                                r.attr({
                                    class: "highcharts-halo highcharts-color-" +
                                        p(this.colorIndex, e.colorIndex) +
                                        (this.className ? " " + this.className : ""),
                                    visibility: g,
                                    zIndex: -1,
                                }),
                                (r.point = this),
                                l.styledMode ||
                                r.attr(
                                    m({
                                            fill: this.color || e.color,
                                            "fill-opacity": a.opacity,
                                        },
                                        a.attributes
                                    )
                                )) :
                            r &&
                            r.point &&
                            r.point.haloPath &&
                            r.animate({ d: r.point.haloPath(0) }, null, r.hide);
                        L(this, "afterSetState");
                    }
                },
                haloPath: function(a) {
                    return this.series.chart.renderer.symbols.circle(
                        Math.floor(this.plotX) - a,
                        this.plotY - a,
                        2 * a,
                        2 * a
                    );
                },
            });
            m(J.prototype, {
                onMouseOver: function() {
                    var a = this.chart,
                        b = a.hoverSeries;
                    a.pointer.setHoverChartIndex();
                    if (b && b !== this) b.onMouseOut();
                    this.options.events.mouseOver && L(this, "mouseOver");
                    this.setState("hover");
                    a.hoverSeries = this;
                },
                onMouseOut: function() {
                    var a = this.options,
                        b = this.chart,
                        f = b.tooltip,
                        g = b.hoverPoint;
                    b.hoverSeries = null;
                    if (g) g.onMouseOut();
                    this && a.events.mouseOut && L(this, "mouseOut");
                    !f ||
                        this.stickyTracking ||
                        (f.shared && !this.noSharedTooltip) ||
                        f.hide();
                    b.series.forEach(function(a) {
                        a.setState("", !0);
                    });
                },
                setState: function(a, b) {
                    var e = this,
                        f = e.options,
                        g = e.graph,
                        d = f.inactiveOtherPoints,
                        h = f.states,
                        m = f.lineWidth,
                        k = f.opacity,
                        q = p(
                            h[a || "normal"] && h[a || "normal"].animation,
                            e.chart.options.chart.animation
                        );
                    f = 0;
                    a = a || "";
                    if (
                        e.state !== a &&
                        ([e.group, e.markerGroup, e.dataLabelsGroup].forEach(function(c) {
                                c &&
                                    (e.state && c.removeClass("highcharts-series-" + e.state),
                                        a && c.addClass("highcharts-series-" + a));
                            }),
                            (e.state = a), !e.chart.styledMode)
                    ) {
                        if (h[a] && !1 === h[a].enabled) return;
                        a &&
                            ((m = h[a].lineWidth || m + (h[a].lineWidthPlus || 0)),
                                (k = p(h[a].opacity, k)));
                        if (g && !g.dashstyle)
                            for (
                                h = { "stroke-width": m }, g.animate(h, q); e["zone-graph-" + f];

                            )
                                e["zone-graph-" + f].attr(h), (f += 1);
                        d || [
                            e.group,
                            e.markerGroup,
                            e.dataLabelsGroup,
                            e.labelBySeries,
                        ].forEach(function(a) {
                            a && a.animate({ opacity: k }, q);
                        });
                    }
                    b && d && e.points && e.setAllPointsToState(a);
                },
                setAllPointsToState: function(a) {
                    this.points.forEach(function(b) {
                        b.setState && b.setState(a);
                    });
                },
                setVisible: function(a, b) {
                    var e = this,
                        f = e.chart,
                        g = e.legendItem,
                        d = f.options.chart.ignoreHiddenSeries,
                        h = e.visible;
                    var p = (e.visible = a = e.options.visible = e.userOptions.visible =
                            "undefined" === typeof a ? !h : a) ?
                        "show" :
                        "hide";
                    ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(
                        function(a) {
                            if (e[a]) e[a][p]();
                        }
                    );
                    if (
                        f.hoverSeries === e ||
                        (f.hoverPoint && f.hoverPoint.series) === e
                    )
                        e.onMouseOut();
                    g && f.legend.colorizeItem(e, a);
                    e.isDirty = !0;
                    e.options.stacking &&
                        f.series.forEach(function(a) {
                            a.options.stacking && a.visible && (a.isDirty = !0);
                        });
                    e.linkedSeries.forEach(function(b) {
                        b.setVisible(a, !1);
                    });
                    d && (f.isDirtyBox = !0);
                    L(e, p);
                    !1 !== b && f.redraw();
                },
                show: function() {
                    this.setVisible(!0);
                },
                hide: function() {
                    this.setVisible(!1);
                },
                select: function(a) {
                    this.selected = a = this.options.selected =
                        "undefined" === typeof a ? !this.selected : a;
                    this.checkbox && (this.checkbox.checked = a);
                    L(this, a ? "select" : "unselect");
                },
                drawTracker: I.drawTrackerGraph,
            });
        }
    );
    Q(
        k,
        "Core/Responsive.js", [k["Core/Chart/Chart.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.find,
                D = t.isArray,
                J = t.isObject,
                M = t.merge,
                n = t.objectEach,
                z = t.pick,
                G = t.splat,
                d = t.uniqueKey;
            k.prototype.setResponsive = function(k, n) {
                var u = this.options.responsive,
                    w = [],
                    r = this.currentResponsive;
                !n &&
                    u &&
                    u.rules &&
                    u.rules.forEach(function(m) {
                        "undefined" === typeof m._id && (m._id = d());
                        this.matchResponsiveRule(m, w);
                    }, this);
                n = M.apply(
                    0,
                    w.map(function(d) {
                        return B(u.rules, function(m) {
                            return m._id === d;
                        }).chartOptions;
                    })
                );
                n.isResponsiveOptions = !0;
                w = w.toString() || void 0;
                w !== (r && r.ruleIds) &&
                    (r && this.update(r.undoOptions, k, !0),
                        w ?
                        ((r = this.currentOptions(n)),
                            (r.isResponsiveOptions = !0),
                            (this.currentResponsive = {
                                ruleIds: w,
                                mergedOptions: n,
                                undoOptions: r,
                            }),
                            this.update(n, k, !0)) :
                        (this.currentResponsive = void 0));
            };
            k.prototype.matchResponsiveRule = function(d, k) {
                var n = d.condition;
                (
                    n.callback ||
                    function() {
                        return (
                            this.chartWidth <= z(n.maxWidth, Number.MAX_VALUE) &&
                            this.chartHeight <= z(n.maxHeight, Number.MAX_VALUE) &&
                            this.chartWidth >= z(n.minWidth, 0) &&
                            this.chartHeight >= z(n.minHeight, 0)
                        );
                    }
                ).call(this) && k.push(d._id);
            };
            k.prototype.currentOptions = function(d) {
                function k(d, m, u, q) {
                    var h;
                    n(d, function(b, g) {
                        if (!q && -1 < t.collectionsWithUpdate.indexOf(g))
                            for (
                                b = G(b), u[g] = [], h = 0; h < Math.max(b.length, m[g].length); h++
                            )
                                m[g][h] &&
                                (void 0 === b[h] ?
                                    (u[g][h] = m[g][h]) :
                                    ((u[g][h] = {}), k(b[h], m[g][h], u[g][h], q + 1)));
                        else
                            J(b) ?
                            ((u[g] = D(b) ? [] : {}), k(b, m[g] || {}, u[g], q + 1)) :
                            (u[g] = "undefined" === typeof m[g] ? null : m[g]);
                    });
                }
                var t = this,
                    w = {};
                k(d, this.options, w, 0);
                return w;
            };
        }
    );
    Q(k, "masters/highcharts.src.js", [k["Core/Globals.js"]], function(k) {
        return k;
    });
    Q(
        k,
        "Core/Axis/NavigatorAxis.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = k.isTouchDevice,
                D = t.addEvent,
                J = t.correctFloat,
                M = t.defined,
                n = t.isNumber,
                z = t.pick,
                G = (function() {
                    function d(d) {
                        this.axis = d;
                    }
                    d.prototype.destroy = function() {
                        this.axis = void 0;
                    };
                    d.prototype.toFixedRange = function(d, k, t, w) {
                        var r = this.axis,
                            m = r.chart;
                        m = m && m.fixedRange;
                        var u = (r.pointRange || 0) / 2;
                        d = z(t, r.translate(d, !0, !r.horiz));
                        k = z(w, r.translate(k, !0, !r.horiz));
                        r = m && (k - d) / m;
                        M(t) || (d = J(d + u));
                        M(w) || (k = J(k - u));
                        0.7 < r && 1.3 > r && (w ? (d = k - m) : (k = d + m));
                        (n(d) && n(k)) || (d = k = void 0);
                        return { min: d, max: k };
                    };
                    return d;
                })();
            return (function() {
                function d() {}
                d.compose = function(d) {
                    d.keepProps.push("navigatorAxis");
                    D(d, "init", function() {
                        this.navigatorAxis || (this.navigatorAxis = new G(this));
                    });
                    D(d, "zoom", function(d) {
                        var k = this.chart.options,
                            n = k.navigator,
                            r = this.navigatorAxis,
                            m = k.chart.pinchType,
                            u = k.rangeSelector;
                        k = k.chart.zoomType;
                        this.isXAxis &&
                            ((n && n.enabled) || (u && u.enabled)) &&
                            ("y" === k ?
                                (d.zoomed = !1) :
                                ((!B && "xy" === k) || (B && "xy" === m)) &&
                                this.options.range &&
                                ((n = r.previousZoom),
                                    M(d.newMin) ?
                                    (r.previousZoom = [this.min, this.max]) :
                                    n &&
                                    ((d.newMin = n[0]),
                                        (d.newMax = n[1]),
                                        (r.previousZoom = void 0))));
                        "undefined" !== typeof d.zoomed && d.preventDefault();
                    });
                };
                d.AdditionsClass = G;
                return d;
            })();
        }
    );
    Q(
        k,
        "Core/Axis/ScrollbarAxis.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.addEvent,
                D = t.defined,
                J = t.pick;
            return (function() {
                function t() {}
                t.compose = function(n, t) {
                    B(n, "afterInit", function() {
                        var n = this;
                        n.options &&
                            n.options.scrollbar &&
                            n.options.scrollbar.enabled &&
                            ((n.options.scrollbar.vertical = !n.horiz),
                                (n.options.startOnTick = n.options.endOnTick = !1),
                                (n.scrollbar = new t(
                                    n.chart.renderer,
                                    n.options.scrollbar,
                                    n.chart
                                )),
                                B(n.scrollbar, "changed", function(d) {
                                    var t = J(n.options && n.options.min, n.min),
                                        u = J(n.options && n.options.max, n.max),
                                        z = D(n.dataMin) ? Math.min(t, n.min, n.dataMin) : t,
                                        w = (D(n.dataMax) ? Math.max(u, n.max, n.dataMax) : u) - z;
                                    D(t) &&
                                        D(u) &&
                                        ((n.horiz && !n.reversed) || (!n.horiz && n.reversed) ?
                                            ((t = z + w * this.to), (z += w * this.from)) :
                                            ((t = z + w * (1 - this.from)), (z += w * (1 - this.to))),
                                            J(
                                                this.options.liveRedraw,
                                                k.svg && !k.isTouchDevice && !this.chart.isBoosting
                                            ) ||
                                            "mouseup" === d.DOMType ||
                                            !D(d.DOMType) ?
                                            n.setExtremes(z, t, !0, "mousemove" !== d.DOMType, d) :
                                            this.setRange(this.from, this.to));
                                }));
                    });
                    B(n, "afterRender", function() {
                        var k = Math.min(
                                J(this.options.min, this.min),
                                this.min,
                                J(this.dataMin, this.min)
                            ),
                            d = Math.max(
                                J(this.options.max, this.max),
                                this.max,
                                J(this.dataMax, this.max)
                            ),
                            n = this.scrollbar,
                            u = this.axisTitleMargin + (this.titleOffset || 0),
                            t = this.chart.scrollbarsOffsets,
                            w = this.options.margin || 0;
                        n &&
                            (this.horiz ?
                                (this.opposite || (t[1] += u),
                                    n.position(
                                        this.left,
                                        this.top + this.height + 2 + t[1] - (this.opposite ? w : 0),
                                        this.width,
                                        this.height
                                    ),
                                    this.opposite || (t[1] += w),
                                    (u = 1)) :
                                (this.opposite && (t[0] += u),
                                    n.position(
                                        this.left + this.width + 2 + t[0] - (this.opposite ? 0 : w),
                                        this.top,
                                        this.width,
                                        this.height
                                    ),
                                    this.opposite && (t[0] += w),
                                    (u = 0)),
                                (t[u] += n.size + n.options.margin),
                                isNaN(k) ||
                                isNaN(d) ||
                                !D(this.min) ||
                                !D(this.max) ||
                                this.min === this.max ?
                                n.setRange(0, 1) :
                                ((t = (this.min - k) / (d - k)),
                                    (k = (this.max - k) / (d - k)),
                                    (this.horiz && !this.reversed) ||
                                    (!this.horiz && this.reversed) ?
                                    n.setRange(t, k) :
                                    n.setRange(1 - k, 1 - t)));
                    });
                    B(n, "afterGetOffset", function() {
                        var k = this.horiz ? 2 : 1,
                            d = this.scrollbar;
                        d &&
                            ((this.chart.scrollbarsOffsets = [0, 0]),
                                (this.chart.axisOffset[k] += d.size + d.options.margin));
                    });
                };
                return t;
            })();
        }
    );
    Q(
        k,
        "Core/Scrollbar.js", [
            k["Core/Axis/Axis.js"],
            k["Core/Globals.js"],
            k["Core/Axis/ScrollbarAxis.js"],
            k["Core/Utilities.js"],
            k["Core/Options.js"],
        ],
        function(k, t, I, D, J) {
            var B = D.addEvent,
                n = D.correctFloat,
                z = D.defined,
                G = D.destroyObjectProperties,
                d = D.fireEvent,
                O = D.merge,
                u = D.pick,
                F = D.removeEvent;
            D = J.defaultOptions;
            var w = t.hasTouch,
                r = t.isTouchDevice,
                m = (t.swapXY = function(d, k) {
                    k &&
                        d.forEach(function(d) {
                            for (var b = d.length, g, f = 0; f < b; f += 2)
                                (g = d[f + 1]),
                                "number" === typeof g &&
                                ((d[f + 1] = d[f + 2]), (d[f + 2] = g));
                        });
                    return d;
                });
            J = (function() {
                function k(d, h, b) {
                    this._events = [];
                    this.from = this.chartY = this.chartX = 0;
                    this.scrollbar = this.group = void 0;
                    this.scrollbarButtons = [];
                    this.scrollbarGroup = void 0;
                    this.scrollbarLeft = 0;
                    this.scrollbarRifles = void 0;
                    this.scrollbarStrokeWidth = 1;
                    this.to = this.size = this.scrollbarTop = 0;
                    this.track = void 0;
                    this.trackBorderWidth = 1;
                    this.userOptions = {};
                    this.y = this.x = 0;
                    this.chart = b;
                    this.options = h;
                    this.renderer = b.renderer;
                    this.init(d, h, b);
                }
                k.prototype.addEvents = function() {
                    var d = this.options.inverted ? [1, 0] : [0, 1],
                        h = this.scrollbarButtons,
                        b = this.scrollbarGroup.element,
                        g = this.track.element,
                        f = this.mouseDownHandler.bind(this),
                        a = this.mouseMoveHandler.bind(this),
                        p = this.mouseUpHandler.bind(this);
                    d = [
                        [h[d[0]].element, "click", this.buttonToMinClick.bind(this)],
                        [h[d[1]].element, "click", this.buttonToMaxClick.bind(this)],
                        [g, "click", this.trackClick.bind(this)],
                        [b, "mousedown", f],
                        [b.ownerDocument, "mousemove", a],
                        [b.ownerDocument, "mouseup", p],
                    ];
                    w &&
                        d.push(
                            [b, "touchstart", f], [b.ownerDocument, "touchmove", a], [b.ownerDocument, "touchend", p]
                        );
                    d.forEach(function(a) {
                        B.apply(null, a);
                    });
                    this._events = d;
                };
                k.prototype.buttonToMaxClick = function(k) {
                    var h = (this.to - this.from) * u(this.options.step, 0.2);
                    this.updatePosition(this.from + h, this.to + h);
                    d(this, "changed", {
                        from: this.from,
                        to: this.to,
                        trigger: "scrollbar",
                        DOMEvent: k,
                    });
                };
                k.prototype.buttonToMinClick = function(k) {
                    var h = n(this.to - this.from) * u(this.options.step, 0.2);
                    this.updatePosition(n(this.from - h), n(this.to - h));
                    d(this, "changed", {
                        from: this.from,
                        to: this.to,
                        trigger: "scrollbar",
                        DOMEvent: k,
                    });
                };
                k.prototype.cursorToScrollbarPosition = function(d) {
                    var h = this.options;
                    h = h.minWidth > this.calculatedWidth ? h.minWidth : 0;
                    return {
                        chartX: (d.chartX - this.x - this.xOffset) / (this.barWidth - h),
                        chartY: (d.chartY - this.y - this.yOffset) / (this.barWidth - h),
                    };
                };
                k.prototype.destroy = function() {
                    var d = this.chart.scroller;
                    this.removeEvents();
                    [
                        "track",
                        "scrollbarRifles",
                        "scrollbar",
                        "scrollbarGroup",
                        "group",
                    ].forEach(function(d) {
                        this[d] && this[d].destroy && (this[d] = this[d].destroy());
                    }, this);
                    d &&
                        this === d.scrollbar &&
                        ((d.scrollbar = null), G(d.scrollbarButtons));
                };
                k.prototype.drawScrollbarButton = function(d) {
                    var h = this.renderer,
                        b = this.scrollbarButtons,
                        g = this.options,
                        f = this.size;
                    var a = h.g().add(this.group);
                    b.push(a);
                    a = h.rect().addClass("highcharts-scrollbar-button").add(a);
                    this.chart.styledMode ||
                        a.attr({
                            stroke: g.buttonBorderColor,
                            "stroke-width": g.buttonBorderWidth,
                            fill: g.buttonBackgroundColor,
                        });
                    a.attr(
                        a.crisp({
                                x: -0.5,
                                y: -0.5,
                                width: f + 1,
                                height: f + 1,
                                r: g.buttonBorderRadius,
                            },
                            a.strokeWidth()
                        )
                    );
                    a = h
                        .path(
                            m(
                                [
                                    ["M", f / 2 + (d ? -1 : 1), f / 2 - 3],
                                    ["L", f / 2 + (d ? -1 : 1), f / 2 + 3],
                                    ["L", f / 2 + (d ? 2 : -2), f / 2],
                                ],
                                g.vertical
                            )
                        )
                        .addClass("highcharts-scrollbar-arrow")
                        .add(b[d]);
                    this.chart.styledMode || a.attr({ fill: g.buttonArrowColor });
                };
                k.prototype.init = function(d, h, b) {
                    this.scrollbarButtons = [];
                    this.renderer = d;
                    this.userOptions = h;
                    this.options = O(k.defaultOptions, h);
                    this.chart = b;
                    this.size = u(this.options.size, this.options.height);
                    h.enabled && (this.render(), this.addEvents());
                };
                k.prototype.mouseDownHandler = function(d) {
                    d = this.chart.pointer.normalize(d);
                    d = this.cursorToScrollbarPosition(d);
                    this.chartX = d.chartX;
                    this.chartY = d.chartY;
                    this.initPositions = [this.from, this.to];
                    this.grabbedCenter = !0;
                };
                k.prototype.mouseMoveHandler = function(k) {
                    var h = this.chart.pointer.normalize(k),
                        b = this.options.vertical ? "chartY" : "chartX",
                        g = this.initPositions || [];
                    !this.grabbedCenter ||
                        (k.touches && 0 === k.touches[0][b]) ||
                        ((h = this.cursorToScrollbarPosition(h)[b]),
                            (b = this[b]),
                            (b = h - b),
                            (this.hasDragged = !0),
                            this.updatePosition(g[0] + b, g[1] + b),
                            this.hasDragged &&
                            d(this, "changed", {
                                from: this.from,
                                to: this.to,
                                trigger: "scrollbar",
                                DOMType: k.type,
                                DOMEvent: k,
                            }));
                };
                k.prototype.mouseUpHandler = function(k) {
                    this.hasDragged &&
                        d(this, "changed", {
                            from: this.from,
                            to: this.to,
                            trigger: "scrollbar",
                            DOMType: k.type,
                            DOMEvent: k,
                        });
                    this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null;
                };
                k.prototype.position = function(d, h, b, g) {
                    var f = this.options.vertical,
                        a = 0,
                        p = this.rendered ? "animate" : "attr";
                    this.x = d;
                    this.y = h + this.trackBorderWidth;
                    this.width = b;
                    this.xOffset = this.height = g;
                    this.yOffset = a;
                    f
                        ?
                        ((this.width = this.yOffset = b = a = this.size),
                            (this.xOffset = h = 0),
                            (this.barWidth = g - 2 * b),
                            (this.x = d += this.options.margin)) :
                        ((this.height = this.xOffset = g = h = this.size),
                            (this.barWidth = b - 2 * g),
                            (this.y += this.options.margin));
                    this.group[p]({ translateX: d, translateY: this.y });
                    this.track[p]({ width: b, height: g });
                    this.scrollbarButtons[1][p]({
                        translateX: f ? 0 : b - h,
                        translateY: f ? g - a : 0,
                    });
                };
                k.prototype.removeEvents = function() {
                    this._events.forEach(function(d) {
                        F.apply(null, d);
                    });
                    this._events.length = 0;
                };
                k.prototype.render = function() {
                    var d = this.renderer,
                        h = this.options,
                        b = this.size,
                        g = this.chart.styledMode,
                        f;
                    this.group = f = d
                        .g("scrollbar")
                        .attr({ zIndex: h.zIndex, translateY: -99999 })
                        .add();
                    this.track = d
                        .rect()
                        .addClass("highcharts-scrollbar-track")
                        .attr({ x: 0, r: h.trackBorderRadius || 0, height: b, width: b })
                        .add(f);
                    g ||
                        this.track.attr({
                            fill: h.trackBackgroundColor,
                            stroke: h.trackBorderColor,
                            "stroke-width": h.trackBorderWidth,
                        });
                    this.trackBorderWidth = this.track.strokeWidth();
                    this.track.attr({ y: (-this.trackBorderWidth % 2) / 2 });
                    this.scrollbarGroup = d.g().add(f);
                    this.scrollbar = d
                        .rect()
                        .addClass("highcharts-scrollbar-thumb")
                        .attr({ height: b, width: b, r: h.barBorderRadius || 0 })
                        .add(this.scrollbarGroup);
                    this.scrollbarRifles = d
                        .path(
                            m(
                                [
                                    ["M", -3, b / 4],
                                    ["L", -3, (2 * b) / 3],
                                    ["M", 0, b / 4],
                                    ["L", 0, (2 * b) / 3],
                                    ["M", 3, b / 4],
                                    ["L", 3, (2 * b) / 3],
                                ],
                                h.vertical
                            )
                        )
                        .addClass("highcharts-scrollbar-rifles")
                        .add(this.scrollbarGroup);
                    g ||
                        (this.scrollbar.attr({
                                fill: h.barBackgroundColor,
                                stroke: h.barBorderColor,
                                "stroke-width": h.barBorderWidth,
                            }),
                            this.scrollbarRifles.attr({
                                stroke: h.rifleColor,
                                "stroke-width": 1,
                            }));
                    this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                    this.scrollbarGroup.translate(
                        (-this.scrollbarStrokeWidth % 2) / 2,
                        (-this.scrollbarStrokeWidth % 2) / 2
                    );
                    this.drawScrollbarButton(0);
                    this.drawScrollbarButton(1);
                };
                k.prototype.setRange = function(d, h) {
                    var b = this.options,
                        g = b.vertical,
                        f = b.minWidth,
                        a = this.barWidth,
                        p,
                        e = !this.rendered ||
                        this.hasDragged ||
                        (this.chart.navigator && this.chart.navigator.hasDragged) ?
                        "attr" :
                        "animate";
                    if (z(a)) {
                        d = Math.max(d, 0);
                        var k = Math.ceil(a * d);
                        this.calculatedWidth = p = n(a * Math.min(h, 1) - k);
                        p < f && ((k = (a - f + p) * d), (p = f));
                        f = Math.floor(k + this.xOffset + this.yOffset);
                        a = p / 2 - 0.5;
                        this.from = d;
                        this.to = h;
                        g
                            ?
                            (this.scrollbarGroup[e]({ translateY: f }),
                                this.scrollbar[e]({ height: p }),
                                this.scrollbarRifles[e]({ translateY: a }),
                                (this.scrollbarTop = f),
                                (this.scrollbarLeft = 0)) :
                            (this.scrollbarGroup[e]({ translateX: f }),
                                this.scrollbar[e]({ width: p }),
                                this.scrollbarRifles[e]({ translateX: a }),
                                (this.scrollbarLeft = f),
                                (this.scrollbarTop = 0));
                        12 >= p ?
                            this.scrollbarRifles.hide() :
                            this.scrollbarRifles.show(!0);
                        !1 === b.showFull &&
                            (0 >= d && 1 <= h ? this.group.hide() : this.group.show());
                        this.rendered = !0;
                    }
                };
                k.prototype.trackClick = function(k) {
                    var h = this.chart.pointer.normalize(k),
                        b = this.to - this.from,
                        g = this.y + this.scrollbarTop,
                        f = this.x + this.scrollbarLeft;
                    (this.options.vertical && h.chartY > g) ||
                    (!this.options.vertical && h.chartX > f) ?
                    this.updatePosition(this.from + b, this.to + b): this.updatePosition(this.from - b, this.to - b);
                    d(this, "changed", {
                        from: this.from,
                        to: this.to,
                        trigger: "scrollbar",
                        DOMEvent: k,
                    });
                };
                k.prototype.update = function(d) {
                    this.destroy();
                    this.init(this.chart.renderer, O(!0, this.options, d), this.chart);
                };
                k.prototype.updatePosition = function(d, h) {
                    1 < h && ((d = n(1 - n(h - d))), (h = 1));
                    0 > d && ((h = n(h - d)), (d = 0));
                    this.from = d;
                    this.to = h;
                };
                k.defaultOptions = {
                    height: r ? 20 : 14,
                    barBorderRadius: 0,
                    buttonBorderRadius: 0,
                    liveRedraw: void 0,
                    margin: 10,
                    minWidth: 6,
                    step: 0.2,
                    zIndex: 3,
                    barBackgroundColor: "#cccccc",
                    barBorderWidth: 1,
                    barBorderColor: "#cccccc",
                    buttonArrowColor: "#333333",
                    buttonBackgroundColor: "#e6e6e6",
                    buttonBorderColor: "#cccccc",
                    buttonBorderWidth: 1,
                    rifleColor: "#333333",
                    trackBackgroundColor: "#f2f2f2",
                    trackBorderColor: "#f2f2f2",
                    trackBorderWidth: 1,
                };
                return k;
            })();
            t.Scrollbar ||
                ((D.scrollbar = O(!0, J.defaultOptions, D.scrollbar)),
                    (t.Scrollbar = J),
                    I.compose(k, J));
            return t.Scrollbar;
        }
    );
    Q(
        k,
        "Core/Navigator.js", [
            k["Core/Axis/Axis.js"],
            k["Core/Series/Series.js"],
            k["Core/Chart/Chart.js"],
            k["Core/Color/Color.js"],
            k["Core/Globals.js"],
            k["Series/LineSeries.js"],
            k["Core/Axis/NavigatorAxis.js"],
            k["Core/Options.js"],
            k["Core/Scrollbar.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n, z, G, d) {
            D = D.parse;
            var B = J.hasTouch,
                u = J.isTouchDevice,
                F = z.defaultOptions,
                w = d.addEvent,
                r = d.clamp,
                m = d.correctFloat,
                L = d.defined,
                q = d.destroyObjectProperties,
                h = d.erase,
                b = d.extend,
                g = d.find,
                f = d.isArray,
                a = d.isNumber,
                p = d.merge,
                e = d.pick,
                E = d.removeEvent,
                H = d.splat,
                y = function(b) {
                    for (var e = [], f = 1; f < arguments.length; f++)
                        e[f - 1] = arguments[f];
                    e = [].filter.call(e, a);
                    if (e.length) return Math[b].apply(0, e);
                };
            t =
                "undefined" === typeof t.seriesTypes.areaspline ? "line" : "areaspline";
            b(F, {
                navigator: {
                    height: 40,
                    margin: 25,
                    maskInside: !0,
                    handles: {
                        width: 7,
                        height: 15,
                        symbols: ["navigator-handle", "navigator-handle"],
                        enabled: !0,
                        lineWidth: 1,
                        backgroundColor: "#f2f2f2",
                        borderColor: "#999999",
                    },
                    maskFill: D("#6685c2").setOpacity(0.3).get(),
                    outlineColor: "#cccccc",
                    outlineWidth: 1,
                    series: {
                        type: t,
                        fillOpacity: 0.05,
                        lineWidth: 1,
                        compare: null,
                        dataGrouping: {
                            approximation: "average",
                            enabled: !0,
                            groupPixelWidth: 2,
                            smoothed: !0,
                            units: [
                                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                                ["second", [1, 2, 5, 10, 15, 30]],
                                ["minute", [1, 2, 5, 10, 15, 30]],
                                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                                ["day", [1, 2, 3, 4]],
                                ["week", [1, 2, 3]],
                                ["month", [1, 3, 6]],
                                ["year", null],
                            ],
                        },
                        dataLabels: { enabled: !1, zIndex: 2 },
                        id: "highcharts-navigator-series",
                        className: "highcharts-navigator-series",
                        lineColor: null,
                        marker: { enabled: !1 },
                        threshold: null,
                    },
                    xAxis: {
                        overscroll: 0,
                        className: "highcharts-navigator-xaxis",
                        tickLength: 0,
                        lineWidth: 0,
                        gridLineColor: "#e6e6e6",
                        gridLineWidth: 1,
                        tickPixelInterval: 200,
                        labels: { align: "left", style: { color: "#999999" }, x: 3, y: -4 },
                        crosshair: !1,
                    },
                    yAxis: {
                        className: "highcharts-navigator-yaxis",
                        gridLineWidth: 0,
                        startOnTick: !1,
                        endOnTick: !1,
                        minPadding: 0.1,
                        maxPadding: 0.1,
                        labels: { enabled: !1 },
                        crosshair: !1,
                        title: { text: null },
                        tickLength: 0,
                        tickWidth: 0,
                    },
                },
            });
            J.Renderer.prototype.symbols["navigator-handle"] = function(
                a,
                b,
                e,
                f,
                d
            ) {
                a = ((d && d.width) || 0) / 2;
                b = Math.round(a / 3) + 0.5;
                d = (d && d.height) || 0;
                return [
                    ["M", -a - 1, 0.5],
                    ["L", a, 0.5],
                    ["L", a, d + 0.5],
                    ["L", -a - 1, d + 0.5],
                    ["L", -a - 1, 0.5],
                    ["M", -b, 4],
                    ["L", -b, d - 3],
                    ["M", b - 1, 4],
                    ["L", b - 1, d - 3],
                ];
            };
            var N = (function() {
                function d(a) {
                    this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0;
                    this.init(a);
                }
                d.prototype.drawHandle = function(a, b, e, f) {
                    var c = this.navigatorOptions.handles.height;
                    this.handles[b][f](
                        e ?
                        {
                            translateX: Math.round(this.left + this.height / 2),
                            translateY: Math.round(this.top + parseInt(a, 10) + 0.5 - c),
                        } :
                        {
                            translateX: Math.round(this.left + parseInt(a, 10)),
                            translateY: Math.round(
                                this.top + this.height / 2 - c / 2 - 1
                            ),
                        }
                    );
                };
                d.prototype.drawOutline = function(a, b, e, f) {
                    var c = this.navigatorOptions.maskInside,
                        d = this.outline.strokeWidth(),
                        g = d / 2,
                        h = (d % 2) / 2;
                    d = this.outlineHeight;
                    var p = this.scrollbarHeight || 0,
                        k = this.size,
                        m = this.left - p,
                        n = this.top;
                    e
                        ?
                        ((m -= g),
                            (e = n + b + h),
                            (b = n + a + h),
                            (h = [
                                ["M", m + d, n - p - h],
                                ["L", m + d, e],
                                ["L", m, e],
                                ["L", m, b],
                                ["L", m + d, b],
                                ["L", m + d, n + k + p],
                            ]),
                            c && h.push(["M", m + d, e - g], ["L", m + d, b + g])) :
                        ((a += m + p - h),
                            (b += m + p - h),
                            (n += g),
                            (h = [
                                ["M", m, n],
                                ["L", a, n],
                                ["L", a, n + d],
                                ["L", b, n + d],
                                ["L", b, n],
                                ["L", m + k + 2 * p, n],
                            ]),
                            c && h.push(["M", a - g, n], ["L", b + g, n]));
                    this.outline[f]({ d: h });
                };
                d.prototype.drawMasks = function(a, b, e, f) {
                    var c = this.left,
                        d = this.top,
                        g = this.height;
                    if (e) {
                        var h = [c, c, c];
                        var p = [d, d + a, d + b];
                        var k = [g, g, g];
                        var m = [a, b - a, this.size - b];
                    } else
                        (h = [c, c + a, c + b]),
                        (p = [d, d, d]),
                        (k = [a, b - a, this.size - b]),
                        (m = [g, g, g]);
                    this.shades.forEach(function(a, c) {
                        a[f]({ x: h[c], y: p[c], width: k[c], height: m[c] });
                    });
                };
                d.prototype.renderElements = function() {
                    var a = this,
                        b = a.navigatorOptions,
                        e = b.maskInside,
                        f = a.chart,
                        c = f.renderer,
                        d,
                        g = { cursor: f.inverted ? "ns-resize" : "ew-resize" };
                    a.navigatorGroup = d = c
                        .g("navigator")
                        .attr({ zIndex: 8, visibility: "hidden" })
                        .add();
                    [!e, e, !e].forEach(function(e, h) {
                        a.shades[h] = c
                            .rect()
                            .addClass(
                                "highcharts-navigator-mask" + (1 === h ? "-inside" : "-outside")
                            )
                            .add(d);
                        f.styledMode ||
                            a.shades[h]
                            .attr({ fill: e ? b.maskFill : "rgba(0,0,0,0)" })
                            .css(1 === h && g);
                    });
                    a.outline = c.path().addClass("highcharts-navigator-outline").add(d);
                    f.styledMode ||
                        a.outline.attr({
                            "stroke-width": b.outlineWidth,
                            stroke: b.outlineColor,
                        });
                    b.handles.enabled && [0, 1].forEach(function(e) {
                        b.handles.inverted = f.inverted;
                        a.handles[e] = c.symbol(
                            b.handles.symbols[e], -b.handles.width / 2 - 1,
                            0,
                            b.handles.width,
                            b.handles.height,
                            b.handles
                        );
                        a.handles[e]
                            .attr({ zIndex: 7 - e })
                            .addClass(
                                "highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][e]
                            )
                            .add(d);
                        if (!f.styledMode) {
                            var h = b.handles;
                            a.handles[e]
                                .attr({
                                    fill: h.backgroundColor,
                                    stroke: h.borderColor,
                                    "stroke-width": h.lineWidth,
                                })
                                .css(g);
                        }
                    });
                };
                d.prototype.update = function(a) {
                    (this.series || []).forEach(function(a) {
                        a.baseSeries && delete a.baseSeries.navigatorSeries;
                    });
                    this.destroy();
                    p(!0, this.chart.options.navigator, this.options, a);
                    this.init(this.chart);
                };
                d.prototype.render = function(b, f, d, g) {
                    var c = this.chart,
                        h = this.scrollbarHeight,
                        p,
                        k = this.xAxis,
                        n = k.pointRange || 0;
                    var q = k.navigatorAxis.fake ? c.xAxis[0] : k;
                    var v = this.navigatorEnabled,
                        y,
                        A = this.rendered;
                    var u = c.inverted;
                    var C = c.xAxis[0].minRange,
                        t = c.xAxis[0].options.maxRange;
                    if (!this.hasDragged || L(d)) {
                        b = m(b - n / 2);
                        f = m(f + n / 2);
                        if (!a(b) || !a(f))
                            if (A)(d = 0), (g = e(k.width, q.width));
                            else return;
                        this.left = e(k.left, c.plotLeft + h + (u ? c.plotWidth : 0));
                        this.size = y = p = e(
                            k.len,
                            (u ? c.plotHeight : c.plotWidth) - 2 * h
                        );
                        c = u ? h : p + 2 * h;
                        d = e(d, k.toPixels(b, !0));
                        g = e(g, k.toPixels(f, !0));
                        (a(d) && Infinity !== Math.abs(d)) || ((d = 0), (g = c));
                        b = k.toValue(d, !0);
                        f = k.toValue(g, !0);
                        var w = Math.abs(m(f - b));
                        w < C ?
                            this.grabbedLeft ?
                            (d = k.toPixels(f - C - n, !0)) :
                            this.grabbedRight && (g = k.toPixels(b + C + n, !0)) :
                            L(t) &&
                            m(w - n) > t &&
                            (this.grabbedLeft ?
                                (d = k.toPixels(f - t - n, !0)) :
                                this.grabbedRight && (g = k.toPixels(b + t + n, !0)));
                        this.zoomedMax = r(Math.max(d, g), 0, y);
                        this.zoomedMin = r(
                            this.fixedWidth ?
                            this.zoomedMax - this.fixedWidth :
                            Math.min(d, g),
                            0,
                            y
                        );
                        this.range = this.zoomedMax - this.zoomedMin;
                        y = Math.round(this.zoomedMax);
                        d = Math.round(this.zoomedMin);
                        v &&
                            (this.navigatorGroup.attr({ visibility: "visible" }),
                                (A = A && !this.hasDragged ? "animate" : "attr"),
                                this.drawMasks(d, y, u, A),
                                this.drawOutline(d, y, u, A),
                                this.navigatorOptions.handles.enabled &&
                                (this.drawHandle(d, 0, u, A), this.drawHandle(y, 1, u, A)));
                        this.scrollbar &&
                            (u ?
                                ((u = this.top - h),
                                    (q =
                                        this.left -
                                        h +
                                        (v || !q.opposite ?
                                            0 :
                                            (q.titleOffset || 0) + q.axisTitleMargin)),
                                    (h = p + 2 * h)) :
                                ((u = this.top + (v ? this.height : -h)),
                                    (q = this.left - h)),
                                this.scrollbar.position(q, u, c, h),
                                this.scrollbar.setRange(
                                    this.zoomedMin / (p || 1),
                                    this.zoomedMax / (p || 1)
                                ));
                        this.rendered = !0;
                    }
                };
                d.prototype.addMouseEvents = function() {
                    var a = this,
                        b = a.chart,
                        e = b.container,
                        f = [],
                        c,
                        d;
                    a.mouseMoveHandler = c = function(c) {
                        a.onMouseMove(c);
                    };
                    a.mouseUpHandler = d = function(c) {
                        a.onMouseUp(c);
                    };
                    f = a.getPartsEvents("mousedown");
                    f.push(
                        w(b.renderTo, "mousemove", c),
                        w(e.ownerDocument, "mouseup", d)
                    );
                    B &&
                        (f.push(
                                w(b.renderTo, "touchmove", c),
                                w(e.ownerDocument, "touchend", d)
                            ),
                            f.concat(a.getPartsEvents("touchstart")));
                    a.eventsToUnbind = f;
                    a.series &&
                        a.series[0] &&
                        f.push(
                            w(a.series[0].xAxis, "foundExtremes", function() {
                                b.navigator.modifyNavigatorAxisExtremes();
                            })
                        );
                };
                d.prototype.getPartsEvents = function(a) {
                    var b = this,
                        e = [];
                    ["shades", "handles"].forEach(function(f) {
                        b[f].forEach(function(c, d) {
                            e.push(
                                w(c.element, a, function(a) {
                                    b[f + "Mousedown"](a, d);
                                })
                            );
                        });
                    });
                    return e;
                };
                d.prototype.shadesMousedown = function(a, b) {
                    a = this.chart.pointer.normalize(a);
                    var e = this.chart,
                        f = this.xAxis,
                        c = this.zoomedMin,
                        d = this.left,
                        g = this.size,
                        h = this.range,
                        p = a.chartX;
                    e.inverted && ((p = a.chartY), (d = this.top));
                    if (1 === b)
                        (this.grabbedCenter = p),
                        (this.fixedWidth = h),
                        (this.dragOffset = p - c);
                    else {
                        a = p - d - h / 2;
                        if (0 === b) a = Math.max(0, a);
                        else if (2 === b && a + h >= g)
                            if (((a = g - h), this.reversedExtremes)) {
                                a -= h;
                                var k = this.getUnionExtremes().dataMin;
                            } else var m = this.getUnionExtremes().dataMax;
                        a !== c &&
                            ((this.fixedWidth = h),
                                (b = f.navigatorAxis.toFixedRange(a, a + h, k, m)),
                                L(b.min) &&
                                e.xAxis[0].setExtremes(
                                    Math.min(b.min, b.max),
                                    Math.max(b.min, b.max), !0,
                                    null, { trigger: "navigator" }
                                ));
                    }
                };
                d.prototype.handlesMousedown = function(a, b) {
                    this.chart.pointer.normalize(a);
                    a = this.chart;
                    var e = a.xAxis[0],
                        f = this.reversedExtremes;
                    0 === b ?
                        ((this.grabbedLeft = !0),
                            (this.otherHandlePos = this.zoomedMax),
                            (this.fixedExtreme = f ? e.min : e.max)) :
                        ((this.grabbedRight = !0),
                            (this.otherHandlePos = this.zoomedMin),
                            (this.fixedExtreme = f ? e.max : e.min));
                    a.fixedRange = null;
                };
                d.prototype.onMouseMove = function(a) {
                    var b = this,
                        f = b.chart,
                        d = b.left,
                        c = b.navigatorSize,
                        g = b.range,
                        h = b.dragOffset,
                        p = f.inverted;
                    (a.touches && 0 === a.touches[0].pageX) ||
                    ((a = f.pointer.normalize(a)),
                        (f = a.chartX),
                        p && ((d = b.top), (f = a.chartY)),
                        b.grabbedLeft ?
                        ((b.hasDragged = !0), b.render(0, 0, f - d, b.otherHandlePos)) :
                        b.grabbedRight ?
                        ((b.hasDragged = !0), b.render(0, 0, b.otherHandlePos, f - d)) :
                        b.grabbedCenter &&
                        ((b.hasDragged = !0),
                            f < h ? (f = h) : f > c + h - g && (f = c + h - g),
                            b.render(0, 0, f - h, f - h + g)),
                        b.hasDragged &&
                        b.scrollbar &&
                        e(
                            b.scrollbar.options.liveRedraw,
                            J.svg && !u && !this.chart.isBoosting
                        ) &&
                        ((a.DOMType = a.type),
                            setTimeout(function() {
                                b.onMouseUp(a);
                            }, 0)));
                };
                d.prototype.onMouseUp = function(b) {
                    var e = this.chart,
                        f = this.xAxis,
                        d = this.scrollbar,
                        c = b.DOMEvent || b,
                        g = e.inverted,
                        h = this.rendered && !this.hasDragged ? "animate" : "attr";
                    if (
                        (this.hasDragged && (!d || !d.hasDragged)) ||
                        "scrollbar" === b.trigger
                    ) {
                        d = this.getUnionExtremes();
                        if (this.zoomedMin === this.otherHandlePos)
                            var p = this.fixedExtreme;
                        else if (this.zoomedMax === this.otherHandlePos)
                            var k = this.fixedExtreme;
                        this.zoomedMax === this.size &&
                            (k = this.reversedExtremes ? d.dataMin : d.dataMax);
                        0 === this.zoomedMin &&
                            (p = this.reversedExtremes ? d.dataMax : d.dataMin);
                        f = f.navigatorAxis.toFixedRange(
                            this.zoomedMin,
                            this.zoomedMax,
                            p,
                            k
                        );
                        L(f.min) &&
                            e.xAxis[0].setExtremes(
                                Math.min(f.min, f.max),
                                Math.max(f.min, f.max), !0,
                                this.hasDragged ? !1 : null, {
                                    trigger: "navigator",
                                    triggerOp: "navigator-drag",
                                    DOMEvent: c,
                                }
                            );
                    }
                    "mousemove" !== b.DOMType &&
                        "touchmove" !== b.DOMType &&
                        (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
                    this.navigatorEnabled &&
                        a(this.zoomedMin) &&
                        a(this.zoomedMax) &&
                        ((e = Math.round(this.zoomedMin)),
                            (b = Math.round(this.zoomedMax)),
                            this.shades && this.drawMasks(e, b, g, h),
                            this.outline && this.drawOutline(e, b, g, h),
                            this.navigatorOptions.handles.enabled &&
                            Object.keys(this.handles).length === this.handles.length &&
                            (this.drawHandle(e, 0, g, h), this.drawHandle(b, 1, g, h)));
                };
                d.prototype.removeEvents = function() {
                    this.eventsToUnbind &&
                        (this.eventsToUnbind.forEach(function(a) {
                                a();
                            }),
                            (this.eventsToUnbind = void 0));
                    this.removeBaseSeriesEvents();
                };
                d.prototype.removeBaseSeriesEvents = function() {
                    var a = this.baseSeries || [];
                    this.navigatorEnabled &&
                        a[0] &&
                        (!1 !== this.navigatorOptions.adaptToUpdatedData &&
                            a.forEach(function(a) {
                                E(a, "updatedData", this.updatedDataHandler);
                            }, this),
                            a[0].xAxis &&
                            E(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
                };
                d.prototype.init = function(a) {
                    var b = a.options,
                        f = b.navigator,
                        d = f.enabled,
                        c = b.scrollbar,
                        g = c.enabled;
                    b = d ? f.height : 0;
                    var h = g ? c.height : 0;
                    this.handles = [];
                    this.shades = [];
                    this.chart = a;
                    this.setBaseSeries();
                    this.height = b;
                    this.scrollbarHeight = h;
                    this.scrollbarEnabled = g;
                    this.navigatorEnabled = d;
                    this.navigatorOptions = f;
                    this.scrollbarOptions = c;
                    this.outlineHeight = b + h;
                    this.opposite = e(f.opposite, !(d || !a.inverted));
                    var m = this;
                    d = m.baseSeries;
                    c = a.xAxis.length;
                    g = a.yAxis.length;
                    var q = (d && d[0] && d[0].xAxis) || a.xAxis[0] || { options: {} };
                    a.isDirtyBox = !0;
                    m.navigatorEnabled ?
                        ((m.xAxis = new k(
                                a,
                                p({ breaks: q.options.breaks, ordinal: q.options.ordinal },
                                    f.xAxis, {
                                        id: "navigator-x-axis",
                                        yAxis: "navigator-y-axis",
                                        isX: !0,
                                        type: "datetime",
                                        index: c,
                                        isInternal: !0,
                                        offset: 0,
                                        keepOrdinalPadding: !0,
                                        startOnTick: !1,
                                        endOnTick: !1,
                                        minPadding: 0,
                                        maxPadding: 0,
                                        zoomEnabled: !1,
                                    },
                                    a.inverted ?
                                    { offsets: [h, 0, -h, 0], width: b } :
                                    { offsets: [0, -h, 0, h], height: b }
                                )
                            )),
                            (m.yAxis = new k(
                                a,
                                p(
                                    f.yAxis, {
                                        id: "navigator-y-axis",
                                        alignTicks: !1,
                                        offset: 0,
                                        index: g,
                                        isInternal: !0,
                                        reversed: e(
                                            f.yAxis && f.yAxis.reversed,
                                            a.yAxis[0] && a.yAxis[0].reversed, !1
                                        ),
                                        zoomEnabled: !1,
                                    },
                                    a.inverted ? { width: b } : { height: b }
                                )
                            )),
                            d || f.series.data ?
                            m.updateNavigatorSeries(!1) :
                            0 === a.series.length &&
                            (m.unbindRedraw = w(a, "beforeRedraw", function() {
                                0 < a.series.length &&
                                    !m.series &&
                                    (m.setBaseSeries(), m.unbindRedraw());
                            })),
                            (m.reversedExtremes =
                                (a.inverted && !m.xAxis.reversed) ||
                                (!a.inverted && m.xAxis.reversed)),
                            m.renderElements(),
                            m.addMouseEvents()) :
                        ((m.xAxis = {
                                chart: a,
                                navigatorAxis: { fake: !0 },
                                translate: function(c, b) {
                                    var e = a.xAxis[0],
                                        f = e.getExtremes(),
                                        d = e.len - 2 * h,
                                        g = y("min", e.options.min, f.dataMin);
                                    e = y("max", e.options.max, f.dataMax) - g;
                                    return b ? (c * e) / d + g : (d * (c - g)) / e;
                                },
                                toPixels: function(a) {
                                    return this.translate(a);
                                },
                                toValue: function(a) {
                                    return this.translate(a, !0);
                                },
                            }),
                            (m.xAxis.navigatorAxis.axis = m.xAxis),
                            (m.xAxis.navigatorAxis.toFixedRange = n.AdditionsClass.prototype.toFixedRange.bind(
                                m.xAxis.navigatorAxis
                            )));
                    a.options.scrollbar.enabled &&
                        ((a.scrollbar = m.scrollbar = new G(
                                a.renderer,
                                p(a.options.scrollbar, {
                                    margin: m.navigatorEnabled ? 0 : 10,
                                    vertical: a.inverted,
                                }),
                                a
                            )),
                            w(m.scrollbar, "changed", function(c) {
                                var b = m.size,
                                    e = b * this.to;
                                b *= this.from;
                                m.hasDragged = m.scrollbar.hasDragged;
                                m.render(0, 0, b, e);
                                (a.options.scrollbar.liveRedraw ||
                                    ("mousemove" !== c.DOMType && "touchmove" !== c.DOMType)) &&
                                setTimeout(function() {
                                    m.onMouseUp(c);
                                });
                            }));
                    m.addBaseSeriesEvents();
                    m.addChartEvents();
                };
                d.prototype.getUnionExtremes = function(a) {
                    var b = this.chart.xAxis[0],
                        f = this.xAxis,
                        d = f.options,
                        c = b.options,
                        g;
                    (a && null === b.dataMin) ||
                    (g = {
                        dataMin: e(
                            d && d.min,
                            y("min", c.min, b.dataMin, f.dataMin, f.min)
                        ),
                        dataMax: e(
                            d && d.max,
                            y("max", c.max, b.dataMax, f.dataMax, f.max)
                        ),
                    });
                    return g;
                };
                d.prototype.setBaseSeries = function(a, b) {
                    var e = this.chart,
                        f = (this.baseSeries = []);
                    a =
                        a ||
                        (e.options && e.options.navigator.baseSeries) ||
                        (e.series.length ?
                            g(e.series, function(a) {
                                return !a.options.isInternal;
                            }).index :
                            0);
                    (e.series || []).forEach(function(b, e) {
                        b.options.isInternal ||
                            (!b.options.showInNavigator &&
                                ((e !== a && b.options.id !== a) ||
                                    !1 === b.options.showInNavigator)) ||
                            f.push(b);
                    });
                    this.xAxis &&
                        !this.xAxis.navigatorAxis.fake &&
                        this.updateNavigatorSeries(!0, b);
                };
                d.prototype.updateNavigatorSeries = function(a, d) {
                    var g = this,
                        h = g.chart,
                        c = g.baseSeries,
                        l,
                        k,
                        m = g.navigatorOptions.series,
                        n,
                        q = {
                            enableMouseTracking: !1,
                            index: null,
                            linkedTo: null,
                            group: "nav",
                            padXAxis: !1,
                            xAxis: "navigator-x-axis",
                            yAxis: "navigator-y-axis",
                            showInLegend: !1,
                            stacking: void 0,
                            isInternal: !0,
                            states: { inactive: { opacity: 1 } },
                        },
                        y = (g.series = (g.series || []).filter(function(a) {
                            var b = a.baseSeries;
                            return 0 > c.indexOf(b) ?
                                (b &&
                                    (E(b, "updatedData", g.updatedDataHandler),
                                        delete b.navigatorSeries),
                                    a.chart && a.destroy(), !1) :
                                !0;
                        }));
                    c &&
                        c.length &&
                        c.forEach(function(a) {
                            var r = a.navigatorSeries,
                                v = b({ color: a.color, visible: a.visible },
                                    f(m) ? F.navigator.series : m
                                );
                            (r && !1 === g.navigatorOptions.adaptToUpdatedData) ||
                            ((q.name = "Navigator " + c.length),
                                (l = a.options || {}),
                                (n = l.navigatorOptions || {}),
                                (k = p(l, q, v, n)),
                                (k.pointRange = e(
                                    v.pointRange,
                                    n.pointRange,
                                    F.plotOptions[k.type || "line"].pointRange
                                )),
                                (v = n.data || v.data),
                                (g.hasNavigatorData = g.hasNavigatorData || !!v),
                                (k.data = v || (l.data && l.data.slice(0))),
                                r && r.options ?
                                r.update(k, d) :
                                ((a.navigatorSeries = h.initSeries(k)),
                                    (a.navigatorSeries.baseSeries = a),
                                    y.push(a.navigatorSeries)));
                        });
                    if ((m.data && (!c || !c.length)) || f(m))
                        (g.hasNavigatorData = !1),
                        (m = H(m)),
                        m.forEach(function(a, b) {
                            q.name = "Navigator " + (y.length + 1);
                            k = p(
                                F.navigator.series, {
                                    color:
                                        (h.series[b] &&
                                            !h.series[b].options.isInternal &&
                                            h.series[b].color) ||
                                        h.options.colors[b] ||
                                        h.options.colors[0],
                                },
                                q,
                                a
                            );
                            k.data = a.data;
                            k.data && ((g.hasNavigatorData = !0), y.push(h.initSeries(k)));
                        });
                    a && this.addBaseSeriesEvents();
                };
                d.prototype.addBaseSeriesEvents = function() {
                    var a = this,
                        b = a.baseSeries || [];
                    b[0] &&
                        b[0].xAxis &&
                        w(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                    b.forEach(function(b) {
                        w(b, "show", function() {
                            this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1);
                        });
                        w(b, "hide", function() {
                            this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1);
                        });
                        !1 !== this.navigatorOptions.adaptToUpdatedData &&
                            b.xAxis &&
                            w(b, "updatedData", this.updatedDataHandler);
                        w(b, "remove", function() {
                            this.navigatorSeries &&
                                (h(a.series, this.navigatorSeries),
                                    L(this.navigatorSeries.options) &&
                                    this.navigatorSeries.remove(!1),
                                    delete this.navigatorSeries);
                        });
                    }, this);
                };
                d.prototype.getBaseSeriesMin = function(a) {
                    return this.baseSeries.reduce(function(a, b) {
                        return Math.min(a, b.xData ? b.xData[0] : a);
                    }, a);
                };
                d.prototype.modifyNavigatorAxisExtremes = function() {
                    var a = this.xAxis,
                        b;
                    "undefined" !== typeof a.getExtremes &&
                        (!(b = this.getUnionExtremes(!0)) ||
                            (b.dataMin === a.min && b.dataMax === a.max) ||
                            ((a.min = b.dataMin), (a.max = b.dataMax)));
                };
                d.prototype.modifyBaseAxisExtremes = function() {
                    var b = this.chart.navigator,
                        f = this.getExtremes(),
                        d = f.dataMin,
                        g = f.dataMax;
                    f = f.max - f.min;
                    var c = b.stickToMin,
                        h = b.stickToMax,
                        p = e(this.options.overscroll, 0),
                        k = b.series && b.series[0],
                        m = !!this.setExtremes;
                    if (!this.eventArgs ||
                        "rangeSelectorButton" !== this.eventArgs.trigger
                    ) {
                        if (c) {
                            var n = d;
                            var q = n + f;
                        }
                        h &&
                            ((q = g + p),
                                c ||
                                (n = Math.max(
                                    d,
                                    q - f,
                                    b.getBaseSeriesMin(
                                        k && k.xData ? k.xData[0] : -Number.MAX_VALUE
                                    )
                                )));
                        m &&
                            (c || h) &&
                            a(n) &&
                            ((this.min = this.userMin = n), (this.max = this.userMax = q));
                    }
                    b.stickToMin = b.stickToMax = null;
                };
                d.prototype.updatedDataHandler = function() {
                    var b = this.chart.navigator,
                        e = this.navigatorSeries,
                        f = b.getBaseSeriesMin(this.xData[0]);
                    b.stickToMax = b.reversedExtremes ?
                        0 === Math.round(b.zoomedMin) :
                        Math.round(b.zoomedMax) >= Math.round(b.size);
                    b.stickToMin =
                        a(this.xAxis.min) &&
                        this.xAxis.min <= f &&
                        (!this.chart.fixedRange || !b.stickToMax);
                    e &&
                        !b.hasNavigatorData &&
                        ((e.options.pointStart = this.xData[0]),
                            e.setData(this.options.data, !1, null, !1));
                };
                d.prototype.addChartEvents = function() {
                    this.eventsToUnbind || (this.eventsToUnbind = []);
                    this.eventsToUnbind.push(
                        w(this.chart, "redraw", function() {
                            var a = this.navigator,
                                b =
                                a &&
                                ((a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis) ||
                                    this.xAxis[0]);
                            b && a.render(b.min, b.max);
                        }),
                        w(this.chart, "getMargins", function() {
                            var a = this.navigator,
                                b = a.opposite ? "plotTop" : "marginBottom";
                            this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
                            this[b] =
                                (this[b] || 0) +
                                (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) +
                                a.navigatorOptions.margin;
                        })
                    );
                };
                d.prototype.destroy = function() {
                    this.removeEvents();
                    this.xAxis &&
                        (h(this.chart.xAxis, this.xAxis), h(this.chart.axes, this.xAxis));
                    this.yAxis &&
                        (h(this.chart.yAxis, this.yAxis), h(this.chart.axes, this.yAxis));
                    (this.series || []).forEach(function(a) {
                        a.destroy && a.destroy();
                    });
                    "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered"
                    .split(" ")
                        .forEach(function(a) {
                            this[a] && this[a].destroy && this[a].destroy();
                            this[a] = null;
                        }, this);
                    [this.handles].forEach(function(a) {
                        q(a);
                    }, this);
                };
                return d;
            })();
            J.Navigator ||
                ((J.Navigator = N),
                    n.compose(k),
                    w(I, "beforeShowResetZoom", function() {
                        var a = this.options,
                            b = a.navigator,
                            e = a.rangeSelector;
                        if (
                            ((b && b.enabled) || (e && e.enabled)) &&
                            ((!u && "x" === a.chart.zoomType) ||
                                (u && "x" === a.chart.pinchType))
                        )
                            return !1;
                    }),
                    w(I, "beforeRender", function() {
                        var a = this.options;
                        if (a.navigator.enabled || a.scrollbar.enabled)
                            this.scroller = this.navigator = new N(this);
                    }),
                    w(I, "afterSetChartSize", function() {
                        var a = this.legend,
                            b = this.navigator;
                        if (b) {
                            var f = a && a.options;
                            var d = b.xAxis;
                            var g = b.yAxis;
                            var c = b.scrollbarHeight;
                            this.inverted ?
                                ((b.left = b.opposite ?
                                        this.chartWidth - c - b.height :
                                        this.spacing[3] + c),
                                    (b.top = this.plotTop + c)) :
                                ((b.left = this.plotLeft + c),
                                    (b.top =
                                        b.navigatorOptions.top ||
                                        this.chartHeight -
                                        b.height -
                                        c -
                                        this.spacing[2] -
                                        (this.rangeSelector && this.extraBottomMargin ?
                                            this.rangeSelector.getHeight() :
                                            0) -
                                        (f &&
                                            "bottom" === f.verticalAlign &&
                                            "proximate" !== f.layout &&
                                            f.enabled &&
                                            !f.floating ?
                                            a.legendHeight + e(f.margin, 10) :
                                            0) -
                                        (this.titleOffset ? this.titleOffset[2] : 0)));
                            d &&
                                g &&
                                (this.inverted ?
                                    (d.options.left = g.options.left = b.left) :
                                    (d.options.top = g.options.top = b.top),
                                    d.setAxisSize(),
                                    g.setAxisSize());
                        }
                    }),
                    w(I, "update", function(a) {
                        var b = a.options.navigator || {},
                            e = a.options.scrollbar || {};
                        this.navigator ||
                            this.scroller ||
                            (!b.enabled && !e.enabled) ||
                            (p(!0, this.options.navigator, b),
                                p(!0, this.options.scrollbar, e),
                                delete a.options.navigator,
                                delete a.options.scrollbar);
                    }),
                    w(I, "afterUpdate", function(a) {
                        this.navigator ||
                            this.scroller ||
                            (!this.options.navigator.enabled &&
                                !this.options.scrollbar.enabled) ||
                            ((this.scroller = this.navigator = new N(this)),
                                e(a.redraw, !0) && this.redraw(a.animation));
                    }),
                    w(I, "afterAddSeries", function() {
                        this.navigator && this.navigator.setBaseSeries(null, !1);
                    }),
                    w(M, "afterUpdate", function() {
                        this.chart.navigator &&
                            !this.options.isInternal &&
                            this.chart.navigator.setBaseSeries(null, !1);
                    }),
                    I.prototype.callbacks.push(function(a) {
                        var b = a.navigator;
                        b &&
                            a.xAxis[0] &&
                            ((a = a.xAxis[0].getExtremes()), b.render(a.min, a.max));
                    }));
            J.Navigator = N;
            return J.Navigator;
        }
    );
    Q(
        k,
        "Core/Axis/OrdinalAxis.js", [
            k["Core/Axis/Axis.js"],
            k["Core/Globals.js"],
            k["Core/Series/CartesianSeries.js"],
            k["Core/Utilities.js"],
            k["Core/Chart/Chart.js"],
        ],
        function(k, t, I, D, J) {
            var B = D.addEvent,
                n = D.css,
                z = D.defined,
                G = D.pick,
                d = D.timeUnits,
                O;
            (function(k) {
                var u = (function() {
                    function d(d) {
                        this.index = {};
                        this.axis = d;
                    }
                    d.prototype.beforeSetTickPositions = function() {
                        var d = this.axis,
                            k = d.ordinal,
                            n = [],
                            q,
                            h = !1,
                            b = d.getExtremes(),
                            g = b.min,
                            f = b.max,
                            a,
                            p = d.isXAxis && !!d.options.breaks;
                        b = d.options.ordinal;
                        var e = Number.MAX_VALUE,
                            u = d.chart.options.chart.ignoreHiddenSeries,
                            t;
                        if (b || p) {
                            d.series.forEach(function(a, b) {
                                q = [];
                                if (!(
                                        (u && !1 === a.visible) ||
                                        (!1 === a.takeOrdinalPosition && !p)
                                    ) &&
                                    ((n = n.concat(a.processedXData)),
                                        (y = n.length),
                                        n.sort(function(a, b) {
                                            return a - b;
                                        }),
                                        (e = Math.min(e, G(a.closestPointRange, e))),
                                        y)
                                ) {
                                    for (b = 0; b < y - 1;)
                                        n[b] !== n[b + 1] && q.push(n[b + 1]), b++;
                                    q[0] !== n[0] && q.unshift(n[0]);
                                    n = q;
                                }
                                a.isSeriesBoosting && (t = !0);
                            });
                            t && (n.length = 0);
                            var y = n.length;
                            if (2 < y) {
                                var w = n[1] - n[0];
                                for (a = y - 1; a-- && !h;) n[a + 1] - n[a] !== w && (h = !0);
                                !d.options.keepOrdinalPadding &&
                                    (n[0] - g > w || f - n[n.length - 1] > w) &&
                                    (h = !0);
                            } else
                                d.options.overscroll &&
                                (2 === y ?
                                    (e = n[1] - n[0]) :
                                    1 === y ?
                                    ((e = d.options.overscroll), (n = [n[0], n[0] + e])) :
                                    (e = k.overscrollPointsRange));
                            h
                                ?
                                (d.options.overscroll &&
                                    ((k.overscrollPointsRange = e),
                                        (n = n.concat(k.getOverscrollPositions()))),
                                    (k.positions = n),
                                    (w = d.ordinal2lin(Math.max(g, n[0]), !0)),
                                    (a = Math.max(
                                        d.ordinal2lin(Math.min(f, n[n.length - 1]), !0),
                                        1
                                    )),
                                    (k.slope = f = (f - g) / (a - w)),
                                    (k.offset = g - w * f)) :
                                ((k.overscrollPointsRange = G(
                                        d.closestPointRange,
                                        k.overscrollPointsRange
                                    )),
                                    (k.positions = d.ordinal.slope = k.offset = void 0));
                        }
                        d.isOrdinal = b && h;
                        k.groupIntervalFactor = null;
                    };
                    d.prototype.getExtendedPositions = function() {
                        var d = this,
                            k = d.axis,
                            n = k.constructor.prototype,
                            q = k.chart,
                            h = k.series[0].currentDataGrouping,
                            b = d.index,
                            g = h ? h.count + h.unitName : "raw",
                            f = k.options.overscroll,
                            a = k.getExtremes(),
                            p;
                        b || (b = d.index = {});
                        if (!b[g]) {
                            var e = {
                                series: [],
                                chart: q,
                                getExtremes: function() {
                                    return { min: a.dataMin, max: a.dataMax + f };
                                },
                                options: { ordinal: !0 },
                                ordinal: {},
                                ordinal2lin: n.ordinal2lin,
                                val2lin: n.val2lin,
                            };
                            e.ordinal.axis = e;
                            k.series.forEach(function(a) {
                                p = {
                                    xAxis: e,
                                    xData: a.xData.slice(),
                                    chart: q,
                                    destroyGroupedData: t.noop,
                                    getProcessedData: I.prototype.getProcessedData,
                                };
                                p.xData = p.xData.concat(d.getOverscrollPositions());
                                p.options = {
                                    dataGrouping: h ?
                                        {
                                            enabled: !0,
                                            forced: !0,
                                            approximation: "open",
                                            units: [
                                                [h.unitName, [h.count]]
                                            ],
                                        } :
                                        { enabled: !1 },
                                };
                                a.processData.apply(p);
                                e.series.push(p);
                            });
                            k.ordinal.beforeSetTickPositions.apply({ axis: e });
                            b[g] = e.ordinal.positions;
                        }
                        return b[g];
                    };
                    d.prototype.getGroupIntervalFactor = function(d, k, n) {
                        n = n.processedXData;
                        var m = n.length,
                            h = [];
                        var b = this.groupIntervalFactor;
                        if (!b) {
                            for (b = 0; b < m - 1; b++) h[b] = n[b + 1] - n[b];
                            h.sort(function(b, f) {
                                return b - f;
                            });
                            h = h[Math.floor(m / 2)];
                            d = Math.max(d, n[0]);
                            k = Math.min(k, n[m - 1]);
                            this.groupIntervalFactor = b = (m * h) / (k - d);
                        }
                        return b;
                    };
                    d.prototype.getOverscrollPositions = function() {
                        var d = this.axis,
                            k = d.options.overscroll,
                            n = this.overscrollPointsRange,
                            q = [],
                            h = d.dataMax;
                        if (z(n))
                            for (q.push(h); h <= d.dataMax + k;)(h += n), q.push(h);
                        return q;
                    };
                    d.prototype.postProcessTickInterval = function(d) {
                        var k = this.axis,
                            n = this.slope;
                        return n ?
                            k.options.breaks ?
                            k.closestPointRange || d :
                            d / (n / k.closestPointRange) :
                            d;
                    };
                    return d;
                })();
                k.Composition = u;
                k.compose = function(u, r, m) {
                    u.keepProps.push("ordinal");
                    var t = u.prototype;
                    u.prototype.getTimeTicks = function(k, h, b, g, f, a, p) {
                        void 0 === f && (f = []);
                        void 0 === a && (a = 0);
                        var e = 0,
                            m,
                            n,
                            q = {},
                            r = [],
                            u = -Number.MAX_VALUE,
                            t = this.options.tickPixelInterval,
                            w = this.chart.time,
                            C = [];
                        if (
                            (!this.options.ordinal && !this.options.breaks) ||
                            !f ||
                            3 > f.length ||
                            "undefined" === typeof h
                        )
                            return w.getTimeTicks.apply(w, arguments);
                        var v = f.length;
                        for (m = 0; m < v; m++) {
                            var c = m && f[m - 1] > b;
                            f[m] < h && (e = m);
                            if (m === v - 1 || f[m + 1] - f[m] > 5 * a || c) {
                                if (f[m] > u) {
                                    for (
                                        n = w.getTimeTicks(k, f[e], f[m], g); n.length && n[0] <= u;

                                    )
                                        n.shift();
                                    n.length && (u = n[n.length - 1]);
                                    C.push(r.length);
                                    r = r.concat(n);
                                }
                                e = m + 1;
                            }
                            if (c) break;
                        }
                        n = n.info;
                        if (p && n.unitRange <= d.hour) {
                            m = r.length - 1;
                            for (e = 1; e < m; e++)
                                if (w.dateFormat("%d", r[e]) !== w.dateFormat("%d", r[e - 1])) {
                                    q[r[e]] = "day";
                                    var l = !0;
                                }
                            l && (q[r[0]] = "day");
                            n.higherRanks = q;
                        }
                        n.segmentStarts = C;
                        r.info = n;
                        if (p && z(t)) {
                            e = C = r.length;
                            l = [];
                            var x;
                            for (w = []; e--;)
                                (m = this.translate(r[e])), x && (w[e] = x - m), (l[e] = x = m);
                            w.sort();
                            w = w[Math.floor(w.length / 2)];
                            w < 0.6 * t && (w = null);
                            e = r[C - 1] > b ? C - 1 : C;
                            for (x = void 0; e--;)
                                (m = l[e]),
                                (C = Math.abs(x - m)),
                                x && C < 0.8 * t && (null === w || C < 0.8 * w) ?
                                (q[r[e]] && !q[r[e + 1]] ?
                                    ((C = e + 1), (x = m)) :
                                    (C = e),
                                    r.splice(C, 1)) :
                                (x = m);
                        }
                        return r;
                    };
                    t.lin2val = function(d, h) {
                        var b = this.ordinal,
                            g = b.positions;
                        if (g) {
                            var f = b.slope,
                                a = b.offset;
                            b = g.length - 1;
                            if (h)
                                if (0 > d) d = g[0];
                                else if (d > b) d = g[b];
                            else {
                                b = Math.floor(d);
                                var k = d - b;
                            } else
                                for (; b--;)
                                    if (((h = f * b + a), d >= h)) {
                                        f = f * (b + 1) + a;
                                        k = (d - h) / (f - h);
                                        break;
                                    }
                            return "undefined" !== typeof k && "undefined" !== typeof g[b] ?
                                g[b] + (k ? k * (g[b + 1] - g[b]) : 0) :
                                d;
                        }
                        return d;
                    };
                    t.val2lin = function(d, h) {
                        var b = this.ordinal,
                            g = b.positions;
                        if (g) {
                            var f = g.length,
                                a;
                            for (a = f; a--;)
                                if (g[a] === d) {
                                    var k = a;
                                    break;
                                }
                            for (a = f - 1; a--;)
                                if (d > g[a] || 0 === a) {
                                    d = (d - g[a]) / (g[a + 1] - g[a]);
                                    k = a + d;
                                    break;
                                }
                            h = h ? k : b.slope * (k || 0) + b.offset;
                        } else h = d;
                        return h;
                    };
                    t.ordinal2lin = t.val2lin;
                    B(u, "afterInit", function() {
                        this.ordinal || (this.ordinal = new k.Composition(this));
                    });
                    B(u, "foundExtremes", function() {
                        this.isXAxis &&
                            z(this.options.overscroll) &&
                            this.max === this.dataMax &&
                            (!this.chart.mouseIsDown || this.isInternal) &&
                            (!this.eventArgs ||
                                (this.eventArgs && "navigator" !== this.eventArgs.trigger)) &&
                            ((this.max += this.options.overscroll), !this.isInternal &&
                                z(this.userMin) &&
                                (this.min += this.options.overscroll));
                    });
                    B(u, "afterSetScale", function() {
                        this.horiz &&
                            !this.isDirty &&
                            (this.isDirty =
                                this.isOrdinal &&
                                this.chart.navigator &&
                                !this.chart.navigator.adaptToUpdatedData);
                    });
                    B(u, "initialAxisTranslation", function() {
                        this.ordinal &&
                            (this.ordinal.beforeSetTickPositions(),
                                (this.tickInterval = this.ordinal.postProcessTickInterval(
                                    this.tickInterval
                                )));
                    });
                    B(r, "pan", function(d) {
                        var h = this.xAxis[0],
                            b = h.options.overscroll,
                            g = d.originalEvent.chartX,
                            f = this.options.chart && this.options.chart.panning,
                            a = !1;
                        if (f && "y" !== f.type && h.options.ordinal && h.series.length) {
                            var k = this.mouseDownX,
                                e = h.getExtremes(),
                                m = e.dataMax,
                                q = e.min,
                                y = e.max,
                                r = this.hoverPoints,
                                u =
                                h.closestPointRange ||
                                (h.ordinal && h.ordinal.overscrollPointsRange);
                            k = (k - g) / (h.translationSlope * (h.ordinal.slope || u));
                            var t = {
                                ordinal: { positions: h.ordinal.getExtendedPositions() },
                            };
                            u = h.lin2val;
                            var w = h.val2lin;
                            if (!t.ordinal.positions) a = !0;
                            else if (1 < Math.abs(k)) {
                                r &&
                                    r.forEach(function(a) {
                                        a.setState();
                                    });
                                if (0 > k) {
                                    r = t;
                                    var C = h.ordinal.positions ? h : t;
                                } else(r = h.ordinal.positions ? h : t), (C = t);
                                t = C.ordinal.positions;
                                m > t[t.length - 1] && t.push(m);
                                this.fixedRange = y - q;
                                k = h.navigatorAxis.toFixedRange(
                                    null,
                                    null,
                                    u.apply(r, [w.apply(r, [q, !0]) + k, !0]),
                                    u.apply(C, [w.apply(C, [y, !0]) + k, !0])
                                );
                                k.min >= Math.min(e.dataMin, q) &&
                                    k.max <= Math.max(m, y) + b &&
                                    h.setExtremes(k.min, k.max, !0, !1, { trigger: "pan" });
                                this.mouseDownX = g;
                                n(this.container, { cursor: "move" });
                            }
                        } else a = !0;
                        a || (f && /y/.test(f.type)) ?
                            b && (h.max = h.dataMax + b) :
                            d.preventDefault();
                    });
                    B(m, "updatedData", function() {
                        var d = this.xAxis;
                        d && d.options.ordinal && delete d.ordinal.index;
                    });
                };
            })(O || (O = {}));
            O.compose(k, J, I);
            return O;
        }
    );
    Q(
        k,
        "Core/Axis/BrokenAxis.js", [
            k["Core/Axis/Axis.js"],
            k["Series/LineSeries.js"],
            k["Extensions/Stacking.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D) {
            var B = D.addEvent,
                M = D.find,
                n = D.fireEvent,
                z = D.isArray,
                G = D.isNumber,
                d = D.pick,
                O = (function() {
                    function u(d) {
                        this.hasBreaks = !1;
                        this.axis = d;
                    }
                    u.isInBreak = function(d, k) {
                        var n = d.repeat || Infinity,
                            m = d.from,
                            u = d.to - d.from;
                        k = k >= m ? (k - m) % n : n - ((m - k) % n);
                        return d.inclusive ? k <= u : k < u && 0 !== k;
                    };
                    u.lin2Val = function(d) {
                        var k = this.brokenAxis;
                        k = k && k.breakArray;
                        if (!k) return d;
                        var n;
                        for (n = 0; n < k.length; n++) {
                            var m = k[n];
                            if (m.from >= d) break;
                            else m.to < d ? (d += m.len) : u.isInBreak(m, d) && (d += m.len);
                        }
                        return d;
                    };
                    u.val2Lin = function(d) {
                        var k = this.brokenAxis;
                        k = k && k.breakArray;
                        if (!k) return d;
                        var n = d,
                            m;
                        for (m = 0; m < k.length; m++) {
                            var t = k[m];
                            if (t.to <= d) n -= t.len;
                            else if (t.from >= d) break;
                            else if (u.isInBreak(t, d)) {
                                n -= d - t.from;
                                break;
                            }
                        }
                        return n;
                    };
                    u.prototype.findBreakAt = function(d, k) {
                        return M(k, function(k) {
                            return k.from < d && d < k.to;
                        });
                    };
                    u.prototype.isInAnyBreak = function(k, n) {
                        var r = this.axis,
                            m = r.options.breaks,
                            t = m && m.length,
                            q;
                        if (t) {
                            for (; t--;)
                                if (u.isInBreak(m[t], k)) {
                                    var h = !0;
                                    q || (q = d(m[t].showPoints, !r.isXAxis));
                                }
                            var b = h && n ? h && !q : h;
                        }
                        return b;
                    };
                    u.prototype.setBreaks = function(t, w) {
                        var r = this,
                            m = r.axis,
                            B = z(t) && !!t.length;
                        m.isDirty = r.hasBreaks !== B;
                        r.hasBreaks = B;
                        m.options.breaks = m.userOptions.breaks = t;
                        m.forceRedraw = !0;
                        m.series.forEach(function(d) {
                            d.isDirty = !0;
                        });
                        B ||
                            m.val2lin !== u.val2Lin ||
                            (delete m.val2lin, delete m.lin2val);
                        B &&
                            ((m.userOptions.ordinal = !1),
                                (m.lin2val = u.lin2Val),
                                (m.val2lin = u.val2Lin),
                                (m.setExtremes = function(d, h, b, g, f) {
                                    if (r.hasBreaks) {
                                        for (
                                            var a, p = this.options.breaks;
                                            (a = r.findBreakAt(d, p));

                                        )
                                            d = a.to;
                                        for (;
                                            (a = r.findBreakAt(h, p));) h = a.from;
                                        h < d && (h = d);
                                    }
                                    k.prototype.setExtremes.call(this, d, h, b, g, f);
                                }),
                                (m.setAxisTranslation = function(q) {
                                    k.prototype.setAxisTranslation.call(this, q);
                                    r.unitLength = null;
                                    if (r.hasBreaks) {
                                        q = m.options.breaks || [];
                                        var h = [],
                                            b = [],
                                            g = 0,
                                            f,
                                            a = m.userMin || m.min,
                                            p = m.userMax || m.max,
                                            e = d(m.pointRangePadding, 0),
                                            t;
                                        q.forEach(function(b) {
                                            f = b.repeat || Infinity;
                                            u.isInBreak(b, a) && (a += (b.to % f) - (a % f));
                                            u.isInBreak(b, p) && (p -= (p % f) - (b.from % f));
                                        });
                                        q.forEach(function(b) {
                                            y = b.from;
                                            for (f = b.repeat || Infinity; y - f > a;) y -= f;
                                            for (; y < a;) y += f;
                                            for (t = y; t < p; t += f)
                                                h.push({ value: t, move: "in" }),
                                                h.push({
                                                    value: t + (b.to - b.from),
                                                    move: "out",
                                                    size: b.breakSize,
                                                });
                                        });
                                        h.sort(function(a, b) {
                                            return a.value === b.value ?
                                                ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) :
                                                a.value - b.value;
                                        });
                                        var w = 0;
                                        var y = a;
                                        h.forEach(function(a) {
                                            w += "in" === a.move ? 1 : -1;
                                            1 === w && "in" === a.move && (y = a.value);
                                            0 === w &&
                                                (b.push({
                                                        from: y,
                                                        to: a.value,
                                                        len: a.value - y - (a.size || 0),
                                                    }),
                                                    (g += a.value - y - (a.size || 0)));
                                        });
                                        m.breakArray = r.breakArray = b;
                                        r.unitLength = p - a - g + e;
                                        n(m, "afterBreaks");
                                        m.staticScale ?
                                            (m.transA = m.staticScale) :
                                            r.unitLength &&
                                            (m.transA *= (p - m.min + e) / r.unitLength);
                                        e && (m.minPixelPadding = m.transA * m.minPointOffset);
                                        m.min = a;
                                        m.max = p;
                                    }
                                }));
                        d(w, !0) && m.chart.redraw();
                    };
                    return u;
                })();
            D = (function() {
                function k() {}
                k.compose = function(k, u) {
                    k.keepProps.push("brokenAxis");
                    var r = t.prototype;
                    r.drawBreaks = function(k, r) {
                        var m = this,
                            h = m.points,
                            b,
                            g,
                            f,
                            a;
                        if (k && k.brokenAxis && k.brokenAxis.hasBreaks) {
                            var p = k.brokenAxis;
                            r.forEach(function(e) {
                                b = (p && p.breakArray) || [];
                                g = k.isXAxis ? k.min : d(m.options.threshold, k.min);
                                h.forEach(function(h) {
                                    a = d(h["stack" + e.toUpperCase()], h[e]);
                                    b.forEach(function(b) {
                                        if (G(g) && G(a)) {
                                            f = !1;
                                            if (
                                                (g < b.from && a > b.to) ||
                                                (g > b.from && a < b.from)
                                            )
                                                f = "pointBreak";
                                            else if (
                                                (g < b.from && a > b.from && a < b.to) ||
                                                (g > b.from && a > b.to && a < b.from)
                                            )
                                                f = "pointInBreak";
                                            f && n(k, f, { point: h, brk: b });
                                        }
                                    });
                                });
                            });
                        }
                    };
                    r.gappedPath = function() {
                        var d = this.currentDataGrouping,
                            k = d && d.gapSize;
                        d = this.options.gapSize;
                        var n = this.points.slice(),
                            h = n.length - 1,
                            b = this.yAxis,
                            g;
                        if (d && 0 < h)
                            for (
                                "value" !== this.options.gapUnit && (d *= this.basePointRange),
                                k && k > d && k >= this.basePointRange && (d = k),
                                g = void 0; h--;

                            )
                                (g && !1 !== g.visible) || (g = n[h + 1]),
                                (k = n[h]), !1 !== g.visible &&
                                !1 !== k.visible &&
                                (g.x - k.x > d &&
                                    ((g = (k.x + g.x) / 2),
                                        n.splice(h + 1, 0, { isNull: !0, x: g }),
                                        b.stacking &&
                                        this.options.stacking &&
                                        ((g = b.stacking.stacks[this.stackKey][g] = new I(
                                                b,
                                                b.options.stackLabels, !1,
                                                g,
                                                this.stack
                                            )),
                                            (g.total = 0))),
                                    (g = k));
                        return this.getGraphPath(n);
                    };
                    B(k, "init", function() {
                        this.brokenAxis || (this.brokenAxis = new O(this));
                    });
                    B(k, "afterInit", function() {
                        "undefined" !== typeof this.brokenAxis &&
                            this.brokenAxis.setBreaks(this.options.breaks, !1);
                    });
                    B(k, "afterSetTickPositions", function() {
                        var d = this.brokenAxis;
                        if (d && d.hasBreaks) {
                            var k = this.tickPositions,
                                n = this.tickPositions.info,
                                h = [],
                                b;
                            for (b = 0; b < k.length; b++)
                                d.isInAnyBreak(k[b]) || h.push(k[b]);
                            this.tickPositions = h;
                            this.tickPositions.info = n;
                        }
                    });
                    B(k, "afterSetOptions", function() {
                        this.brokenAxis &&
                            this.brokenAxis.hasBreaks &&
                            (this.options.ordinal = !1);
                    });
                    B(u, "afterGeneratePoints", function() {
                        var d = this.options.connectNulls,
                            k = this.points,
                            n = this.xAxis,
                            h = this.yAxis;
                        if (this.isDirty)
                            for (var b = k.length; b--;) {
                                var g = k[b],
                                    f = !(null === g.y && !1 === d) &&
                                    ((n &&
                                            n.brokenAxis &&
                                            n.brokenAxis.isInAnyBreak(g.x, !0)) ||
                                        (h &&
                                            h.brokenAxis &&
                                            h.brokenAxis.isInAnyBreak(g.y, !0)));
                                g.visible = f ? !1 : !1 !== g.options.visible;
                            }
                    });
                    B(u, "afterRender", function() {
                        this.drawBreaks(this.xAxis, ["x"]);
                        this.drawBreaks(this.yAxis, d(this.pointArrayMap, ["y"]));
                    });
                };
                return k;
            })();
            D.compose(k, t);
            return D;
        }
    );
    Q(k, "masters/modules/broken-axis.src.js", [], function() {});
    Q(
        k,
        "Extensions/DataGrouping.js", [
            k["Core/Axis/Axis.js"],
            k["Core/Axis/DateTimeAxis.js"],
            k["Core/Globals.js"],
            k["Core/Options.js"],
            k["Core/Series/Point.js"],
            k["Core/Tooltip.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n) {
            "";
            var z = n.addEvent,
                B = n.arrayMax,
                d = n.arrayMin,
                O = n.correctFloat,
                u = n.defined,
                F = n.error,
                w = n.extend,
                r = n.format,
                m = n.isNumber,
                L = n.merge,
                q = n.pick;
            n = I.Series;
            var h = (I.approximations = {
                    sum: function(a) {
                        var b = a.length;
                        if (!b && a.hasNulls) var e = null;
                        else if (b)
                            for (e = 0; b--;) e += a[b];
                        return e;
                    },
                    average: function(a) {
                        var b = a.length;
                        a = h.sum(a);
                        m(a) && b && (a = O(a / b));
                        return a;
                    },
                    averages: function() {
                        var a = [];
                        [].forEach.call(arguments, function(b) {
                            a.push(h.average(b));
                        });
                        return "undefined" === typeof a[0] ? void 0 : a;
                    },
                    open: function(a) {
                        return a.length ? a[0] : a.hasNulls ? null : void 0;
                    },
                    high: function(a) {
                        return a.length ? B(a) : a.hasNulls ? null : void 0;
                    },
                    low: function(a) {
                        return a.length ? d(a) : a.hasNulls ? null : void 0;
                    },
                    close: function(a) {
                        return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0;
                    },
                    ohlc: function(a, b, e, d) {
                        a = h.open(a);
                        b = h.high(b);
                        e = h.low(e);
                        d = h.close(d);
                        if (m(a) || m(b) || m(e) || m(d)) return [a, b, e, d];
                    },
                    range: function(a, b) {
                        a = h.low(a);
                        b = h.high(b);
                        if (m(a) || m(b)) return [a, b];
                        if (null === a && null === b) return null;
                    },
                }),
                b = function(a, b, e, d) {
                    var f = this,
                        g = f.data,
                        k = f.options && f.options.data,
                        c = [],
                        l = [],
                        p = [],
                        n = a.length,
                        q = !!b,
                        r = [],
                        y = f.pointArrayMap,
                        t = y && y.length,
                        w = ["x"].concat(y || ["y"]),
                        E = 0,
                        z = 0,
                        H;
                    d =
                        "function" === typeof d ?
                        d :
                        h[d] ?
                        h[d] :
                        h[
                            (f.getDGApproximation && f.getDGApproximation()) || "average"
                        ];
                    t
                        ?
                        y.forEach(function() {
                            r.push([]);
                        }) :
                        r.push([]);
                    var B = t || 1;
                    for (H = 0; H <= n && !(a[H] >= e[0]); H++);
                    for (H; H <= n; H++) {
                        for (;
                            ("undefined" !== typeof e[E + 1] && a[H] >= e[E + 1]) || H === n;

                        ) {
                            var N = e[E];
                            f.dataGroupInfo = { start: f.cropStart + z, length: r[0].length };
                            var K = d.apply(f, r);
                            f.pointClass &&
                                !u(f.dataGroupInfo.options) &&
                                ((f.dataGroupInfo.options = L(
                                        f.pointClass.prototype.optionsToObject.call({ series: f },
                                            f.options.data[f.cropStart + z]
                                        )
                                    )),
                                    w.forEach(function(a) {
                                        delete f.dataGroupInfo.options[a];
                                    }));
                            "undefined" !== typeof K &&
                                (c.push(N), l.push(K), p.push(f.dataGroupInfo));
                            z = H;
                            for (N = 0; N < B; N++)(r[N].length = 0), (r[N].hasNulls = !1);
                            E += 1;
                            if (H === n) break;
                        }
                        if (H === n) break;
                        if (y)
                            for (
                                N = f.cropStart + H,
                                K =
                                (g && g[N]) ||
                                f.pointClass.prototype.applyOptions.apply({ series: f }, [
                                    k[N],
                                ]),
                                N = 0; N < t; N++
                            ) {
                                var D = K[y[N]];
                                m(D) ? r[N].push(D) : null === D && (r[N].hasNulls = !0);
                            }
                        else
                            (N = q ? b[H] : null),
                            m(N) ? r[0].push(N) : null === N && (r[0].hasNulls = !0);
                    }
                    return { groupedXData: c, groupedYData: l, groupMap: p };
                },
                g = { approximations: h, groupData: b },
                f = n.prototype,
                a = f.processData,
                p = f.generatePoints,
                e = {
                    groupPixelWidth: 2,
                    dateTimeLabelFormats: {
                        millisecond: [
                            "%A, %b %e, %H:%M:%S.%L",
                            "%A, %b %e, %H:%M:%S.%L",
                            "-%H:%M:%S.%L",
                        ],
                        second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                        minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                        hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                        day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                        week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                        month: ["%B %Y", "%B", "-%B %Y"],
                        year: ["%Y", "%Y", "-%Y"],
                    },
                },
                E = {
                    line: {},
                    spline: {},
                    area: {},
                    areaspline: {},
                    arearange: {},
                    column: { groupPixelWidth: 10 },
                    columnrange: { groupPixelWidth: 10 },
                    candlestick: { groupPixelWidth: 10 },
                    ohlc: { groupPixelWidth: 5 },
                },
                H = (I.defaultDataGroupingUnits = [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1]],
                    ["week", [1]],
                    ["month", [1, 3, 6]],
                    ["year", null],
                ]);
            f.getDGApproximation = function() {
                return this.is("arearange") ?
                    "range" :
                    this.is("ohlc") ?
                    "ohlc" :
                    this.is("column") ?
                    "sum" :
                    "average";
            };
            f.groupData = b;
            f.processData = function() {
                var b = this.chart,
                    e = this.options.dataGrouping,
                    d = !1 !== this.allowDG && e && q(e.enabled, b.options.isStock),
                    g = this.visible || !b.options.chart.ignoreHiddenSeries,
                    h,
                    k = this.currentDataGrouping,
                    p = !1;
                this.forceCrop = d;
                this.groupPixelWidth = null;
                this.hasProcessed = !0;
                d && !this.requireSorting && (this.requireSorting = p = !0);
                d = !1 === a.apply(this, arguments) || !d;
                p && (this.requireSorting = !1);
                if (!d) {
                    this.destroyGroupedData();
                    d = e.groupAll ? this.xData : this.processedXData;
                    var c = e.groupAll ? this.yData : this.processedYData,
                        l = b.plotSizeX;
                    b = this.xAxis;
                    var m = b.options.ordinal,
                        n = (this.groupPixelWidth =
                            b.getGroupPixelWidth && b.getGroupPixelWidth());
                    if (n) {
                        this.isDirty = h = !0;
                        this.points = null;
                        p = b.getExtremes();
                        var r = p.min;
                        p = p.max;
                        m =
                            (m &&
                                b.ordinal &&
                                b.ordinal.getGroupIntervalFactor(r, p, this)) ||
                            1;
                        n = ((n * (p - r)) / l) * m;
                        l = b.getTimeTicks(
                            t.AdditionsClass.prototype.normalizeTimeTickInterval(
                                n,
                                e.units || H
                            ),
                            Math.min(r, d[0]),
                            Math.max(p, d[d.length - 1]),
                            b.options.startOfWeek,
                            d,
                            this.closestPointRange
                        );
                        c = f.groupData.apply(this, [d, c, l, e.approximation]);
                        d = c.groupedXData;
                        m = c.groupedYData;
                        var w = 0;
                        if (e.smoothed && d.length) {
                            var E = d.length - 1;
                            for (d[E] = Math.min(d[E], p); E-- && 0 < E;) d[E] += n / 2;
                            d[0] = Math.max(d[0], r);
                        }
                        for (E = 1; E < l.length; E++)
                            (l.info.segmentStarts &&
                                -1 !== l.info.segmentStarts.indexOf(E)) ||
                            (w = Math.max(l[E] - l[E - 1], w));
                        r = l.info;
                        r.gapSize = w;
                        this.closestPointRange = l.info.totalRange;
                        this.groupMap = c.groupMap;
                        if (u(d[0]) && d[0] < b.min && g) {
                            if (
                                (!u(b.options.min) && b.min <= b.dataMin) ||
                                b.min === b.dataMin
                            )
                                b.min = Math.min(d[0], b.min);
                            b.dataMin = Math.min(d[0], b.dataMin);
                        }
                        e.groupAll &&
                            ((e = this.cropData(d, m, b.min, b.max, 1)),
                                (d = e.xData),
                                (m = e.yData));
                        this.processedXData = d;
                        this.processedYData = m;
                    } else this.groupMap = null;
                    this.hasGroupedData = h;
                    this.currentDataGrouping = r;
                    this.preventGraphAnimation =
                        (k && k.totalRange) !== (r && r.totalRange);
                }
            };
            f.destroyGroupedData = function() {
                this.groupedData &&
                    (this.groupedData.forEach(function(a, b) {
                            a && (this.groupedData[b] = a.destroy ? a.destroy() : null);
                        }, this),
                        (this.groupedData.length = 0));
            };
            f.generatePoints = function() {
                p.apply(this);
                this.destroyGroupedData();
                this.groupedData = this.hasGroupedData ? this.points : null;
            };
            z(J, "update", function() {
                if (this.dataGroup) return F(24, !1, this.series.chart), !1;
            });
            z(M, "headerFormatter", function(a) {
                var b = this.chart,
                    d = b.time,
                    f = a.labelConfig,
                    g = f.series,
                    h = g.tooltipOptions,
                    k = g.options.dataGrouping,
                    c = h.xDateFormat,
                    l = g.xAxis,
                    p = h[(a.isFooter ? "footer" : "header") + "Format"];
                if (l && "datetime" === l.options.type && k && m(f.key)) {
                    var n = g.currentDataGrouping;
                    k = k.dateTimeLabelFormats || e.dateTimeLabelFormats;
                    if (n)
                        if (((h = k[n.unitName]), 1 === n.count)) c = h[0];
                        else {
                            c = h[1];
                            var q = h[2];
                        }
                    else !c && k && (c = this.getXDateFormat(f, h, l));
                    c = d.dateFormat(c, f.key);
                    q && (c += d.dateFormat(q, f.key + n.totalRange - 1));
                    g.chart.styledMode && (p = this.styledModeFormat(p));
                    a.text = r(p, { point: w(f.point, { key: c }), series: g }, b);
                    a.preventDefault();
                }
            });
            z(n, "destroy", f.destroyGroupedData);
            z(n, "afterSetOptions", function(a) {
                a = a.options;
                var b = this.type,
                    d = this.chart.options.plotOptions,
                    f = D.defaultOptions.plotOptions[b].dataGrouping,
                    g = this.useCommonDataGrouping && e;
                if (E[b] || g)
                    f || (f = L(e, E[b])),
                    (a.dataGrouping = L(
                        g,
                        f,
                        d.series && d.series.dataGrouping,
                        d[b].dataGrouping,
                        this.userOptions.dataGrouping
                    ));
            });
            z(k, "afterSetScale", function() {
                this.series.forEach(function(a) {
                    a.hasProcessed = !1;
                });
            });
            k.prototype.getGroupPixelWidth = function() {
                var a = this.series,
                    b = a.length,
                    d,
                    f = 0,
                    g = !1,
                    h;
                for (d = b; d--;)
                    (h = a[d].options.dataGrouping) &&
                    (f = Math.max(f, q(h.groupPixelWidth, e.groupPixelWidth)));
                for (d = b; d--;)
                    (h = a[d].options.dataGrouping) &&
                    a[d].hasProcessed &&
                    ((b = (a[d].processedXData || a[d].data).length),
                        a[d].groupPixelWidth ||
                        b > this.chart.plotSizeX / f ||
                        (b && h.forced)) &&
                    (g = !0);
                return g ? f : 0;
            };
            k.prototype.setDataGrouping = function(a, b) {
                var e;
                b = q(b, !0);
                a || (a = { forced: !1, units: null });
                if (this instanceof k)
                    for (e = this.series.length; e--;)
                        this.series[e].update({ dataGrouping: a }, !1);
                else
                    this.chart.options.series.forEach(function(b) {
                        b.dataGrouping = a;
                    }, !1);
                this.ordinal && (this.ordinal.slope = void 0);
                b && this.chart.redraw();
            };
            I.dataGrouping = g;
            ("");
            return g;
        }
    );
    Q(
        k,
        "Series/OHLCSeries.js", [k["Core/Series/Series.js"], k["Core/Series/Point.js"]],
        function(k, t) {
            var B = k.seriesTypes;
            k.seriesType(
                "ohlc",
                "column", {
                    lineWidth: 1,
                    tooltip: {
                        pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>',
                    },
                    threshold: null,
                    states: { hover: { lineWidth: 3 } },
                    stickyTracking: !0,
                }, {
                    directTouch: !1,
                    pointArrayMap: ["open", "high", "low", "close"],
                    toYData: function(k) {
                        return [k.open, k.high, k.low, k.close];
                    },
                    pointValKey: "close",
                    pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" },
                    init: function() {
                        B.column.prototype.init.apply(this, arguments);
                        this.options.stacking = void 0;
                    },
                    pointAttribs: function(k, t) {
                        t = B.column.prototype.pointAttribs.call(this, k, t);
                        var D = this.options;
                        delete t.fill;
                        !k.options.color &&
                            D.upColor &&
                            k.open < k.close &&
                            (t.stroke = D.upColor);
                        return t;
                    },
                    translate: function() {
                        var k = this,
                            t = k.yAxis,
                            I = !!k.modifyValue,
                            n = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                        B.column.prototype.translate.apply(k);
                        k.points.forEach(function(z) {
                            [z.open, z.high, z.low, z.close, z.low].forEach(function(B, d) {
                                null !== B &&
                                    (I && (B = k.modifyValue(B)), (z[n[d]] = t.toPixels(B, !0)));
                            });
                            z.tooltipPos[1] = z.plotHigh + t.pos - k.chart.plotTop;
                        });
                    },
                    drawPoints: function() {
                        var k = this,
                            t = k.chart,
                            B = function(k, t, B) {
                                var d = k[0];
                                k = k[1];
                                "number" === typeof d[2] && (d[2] = Math.max(B + t, d[2]));
                                "number" === typeof k[2] && (k[2] = Math.min(B - t, k[2]));
                            };
                        k.points.forEach(function(n) {
                            var z = n.graphic,
                                D = !z;
                            if ("undefined" !== typeof n.plotY) {
                                z || (n.graphic = z = t.renderer.path().add(k.group));
                                t.styledMode ||
                                    z.attr(k.pointAttribs(n, n.selected && "select"));
                                var d = z.strokeWidth();
                                var I = (d % 2) / 2;
                                var u = Math.round(n.plotX) - I;
                                var F = Math.round(n.shapeArgs.width / 2);
                                var w = [
                                    ["M", u, Math.round(n.yBottom)],
                                    ["L", u, Math.round(n.plotHigh)],
                                ];
                                if (null !== n.open) {
                                    var r = Math.round(n.plotOpen) + I;
                                    w.push(["M", u, r], ["L", u - F, r]);
                                    B(w, d / 2, r);
                                }
                                null !== n.close &&
                                    ((r = Math.round(n.plotClose) + I),
                                        w.push(["M", u, r], ["L", u + F, r]),
                                        B(w, d / 2, r));
                                z[D ? "attr" : "animate"]({ d: w }).addClass(
                                    n.getClassName(), !0
                                );
                            }
                        });
                    },
                    animate: null,
                }, {
                    getClassName: function() {
                        return (
                            t.prototype.getClassName.call(this) +
                            (this.open < this.close ?
                                " highcharts-point-up" :
                                " highcharts-point-down")
                        );
                    },
                }
            );
            ("");
        }
    );
    Q(
        k,
        "Series/CandlestickSeries.js", [k["Core/Series/Series.js"], k["Core/Options.js"], k["Core/Utilities.js"]],
        function(k, t, I) {
            t = t.defaultOptions;
            I = I.merge;
            var B = k.seriesTypes.column.prototype;
            k.seriesType(
                "candlestick",
                "ohlc",
                I(t.plotOptions.column, {
                    states: { hover: { lineWidth: 2 } },
                    tooltip: t.plotOptions.ohlc.tooltip,
                    threshold: null,
                    lineColor: "#000000",
                    lineWidth: 1,
                    upColor: "#ffffff",
                    stickyTracking: !0,
                }), {
                    pointAttribs: function(k, t) {
                        var n = B.pointAttribs.call(this, k, t),
                            z = this.options,
                            D = k.open < k.close,
                            d = z.lineColor || this.color;
                        n["stroke-width"] = z.lineWidth;
                        n.fill =
                            k.options.color || (D ? z.upColor || this.color : this.color);
                        n.stroke = k.options.lineColor || (D ? z.upLineColor || d : d);
                        t &&
                            ((k = z.states[t]),
                                (n.fill = k.color || n.fill),
                                (n.stroke = k.lineColor || n.stroke),
                                (n["stroke-width"] = k.lineWidth || n["stroke-width"]));
                        return n;
                    },
                    drawPoints: function() {
                        var k = this,
                            t = k.chart,
                            n = k.yAxis.reversed;
                        k.points.forEach(function(z) {
                            var B = z.graphic,
                                d = !B;
                            if ("undefined" !== typeof z.plotY) {
                                B || (z.graphic = B = t.renderer.path().add(k.group));
                                k.chart.styledMode ||
                                    B.attr(k.pointAttribs(z, z.selected && "select")).shadow(
                                        k.options.shadow
                                    );
                                var D = (B.strokeWidth() % 2) / 2;
                                var u = Math.round(z.plotX) - D;
                                var F = z.plotOpen;
                                var w = z.plotClose;
                                var r = Math.min(F, w);
                                F = Math.max(F, w);
                                var m = Math.round(z.shapeArgs.width / 2);
                                w = n ?
                                    F !== z.yBottom :
                                    Math.round(r) !== Math.round(z.plotHigh);
                                var I = n ?
                                    Math.round(r) !== Math.round(z.plotHigh) :
                                    F !== z.yBottom;
                                r = Math.round(r) + D;
                                F = Math.round(F) + D;
                                D = [];
                                D.push(
                                    ["M", u - m, F], ["L", u - m, r], ["L", u + m, r], ["L", u + m, F], ["Z"], ["M", u, r], ["L", u, w ? Math.round(n ? z.yBottom : z.plotHigh) : r], ["M", u, F], ["L", u, I ? Math.round(n ? z.plotHigh : z.yBottom) : F]
                                );
                                B[d ? "attr" : "animate"]({ d: D }).addClass(
                                    z.getClassName(), !0
                                );
                            }
                        });
                    },
                }
            );
            ("");
        }
    );
    Q(
        k,
        "Mixins/OnSeries.js", [k["Core/Globals.js"], k["Core/Utilities.js"]],
        function(k, t) {
            var B = t.defined,
                D = t.stableSort,
                J = k.seriesTypes;
            return {
                getPlotBox: function() {
                    return k.Series.prototype.getPlotBox.call(
                        (this.options.onSeries && this.chart.get(this.options.onSeries)) ||
                        this
                    );
                },
                translate: function() {
                    J.column.prototype.translate.apply(this);
                    var k = this,
                        n = k.options,
                        t = k.chart,
                        G = k.points,
                        d = G.length - 1,
                        I,
                        u = n.onSeries;
                    u = u && t.get(u);
                    n = n.onKey || "y";
                    var F = u && u.options.step,
                        w = u && u.points,
                        r = w && w.length,
                        m = t.inverted,
                        L = k.xAxis,
                        q = k.yAxis,
                        h = 0,
                        b;
                    if (u && u.visible && r) {
                        h = (u.pointXOffset || 0) + (u.barW || 0) / 2;
                        t = u.currentDataGrouping;
                        var g = w[r - 1].x + (t ? t.totalRange : 0);
                        D(G, function(a, b) {
                            return a.x - b.x;
                        });
                        for (n = "plot" + n[0].toUpperCase() + n.substr(1); r-- && G[d];) {
                            var f = w[r];
                            t = G[d];
                            t.y = f.y;
                            if (f.x <= t.x && "undefined" !== typeof f[n]) {
                                if (
                                    t.x <= g &&
                                    ((t.plotY = f[n]),
                                        f.x < t.x &&
                                        !F &&
                                        (b = w[r + 1]) &&
                                        "undefined" !== typeof b[n])
                                ) {
                                    var a = (t.x - f.x) / (b.x - f.x);
                                    t.plotY += a * (b[n] - f[n]);
                                    t.y += a * (b.y - f.y);
                                }
                                d--;
                                r++;
                                if (0 > d) break;
                            }
                        }
                    }
                    G.forEach(function(a, b) {
                        a.plotX += h;
                        if ("undefined" === typeof a.plotY || m)
                            0 <= a.plotX && a.plotX <= L.len ?
                            m ?
                            ((a.plotY = L.translate(a.x, 0, 1, 0, 1)),
                                (a.plotX = B(a.y) ? q.translate(a.y, 0, 0, 0, 1) : 0)) :
                            (a.plotY = (L.opposite ? 0 : k.yAxis.len) + L.offset) :
                            (a.shapeArgs = {});
                        if ((I = G[b - 1]) && I.plotX === a.plotX) {
                            "undefined" === typeof I.stackIndex && (I.stackIndex = 0);
                            var e = I.stackIndex + 1;
                        }
                        a.stackIndex = e;
                    });
                    this.onSeries = u;
                },
            };
        }
    );
    Q(
        k,
        "Series/FlagsSeries.js", [
            k["Core/Series/Series.js"],
            k["Core/Globals.js"],
            k["Mixins/OnSeries.js"],
            k["Core/Renderer/SVG/SVGElement.js"],
            k["Core/Renderer/SVG/SVGRenderer.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M) {
            function n(d) {
                q[d + "pin"] = function(b, g, f, a, h) {
                    var e = h && h.anchorX;
                    h = h && h.anchorY;
                    "circle" === d && a > f && ((b -= Math.round((a - f) / 2)), (f = a));
                    var k = q[d](b, g, f, a);
                    if (e && h) {
                        var p = e;
                        "circle" === d
                            ?
                            (p = b + f / 2) :
                            ((b = k[0]),
                                (f = k[1]),
                                "M" === b[0] && "L" === f[0] && (p = (b[1] + f[1]) / 2));
                        k.push(["M", p, g > h ? g : g + a], ["L", e, h]);
                        k = k.concat(q.circle(e - 1, h - 1, 2, 2));
                    }
                    return k;
                };
            }
            var z = t.noop,
                B = M.addEvent,
                d = M.defined,
                O = M.isNumber,
                u = M.merge,
                F = M.objectEach,
                w = M.wrap;
            M = t.Renderer;
            var r = t.Series,
                m = t.TrackerMixin,
                L = t.VMLRenderer,
                q = J.prototype.symbols;
            ("");
            k.seriesType(
                "flags",
                "column", {
                    pointRange: 0,
                    allowOverlapX: !1,
                    shape: "flag",
                    stackDistance: 12,
                    textAlign: "center",
                    tooltip: { pointFormat: "{point.text}<br/>" },
                    threshold: null,
                    y: -30,
                    fillColor: "#ffffff",
                    lineWidth: 1,
                    states: { hover: { lineColor: "#000000", fillColor: "#ccd6eb" } },
                    style: { fontSize: "11px", fontWeight: "bold" },
                }, {
                    sorted: !1,
                    noSharedTooltip: !0,
                    allowDG: !1,
                    takeOrdinalPosition: !1,
                    trackerGroups: ["markerGroup"],
                    forceCrop: !0,
                    init: r.prototype.init,
                    pointAttribs: function(d, b) {
                        var g = this.options,
                            f = (d && d.color) || this.color,
                            a = g.lineColor,
                            h = d && d.lineWidth;
                        d = (d && d.fillColor) || g.fillColor;
                        b &&
                            ((d = g.states[b].fillColor),
                                (a = g.states[b].lineColor),
                                (h = g.states[b].lineWidth));
                        return {
                            fill: d || f,
                            stroke: a || f,
                            "stroke-width": h || g.lineWidth || 0,
                        };
                    },
                    translate: I.translate,
                    getPlotBox: I.getPlotBox,
                    drawPoints: function() {
                        var h = this.points,
                            b = this.chart,
                            g = b.renderer,
                            f = b.inverted,
                            a = this.options,
                            k = a.y,
                            e,
                            m = this.yAxis,
                            n = {},
                            q = [];
                        for (e = h.length; e--;) {
                            var r = h[e];
                            var z = (f ? r.plotY : r.plotX) > this.xAxis.len;
                            var B = r.plotX;
                            var A = r.stackIndex;
                            var C = r.options.shape || a.shape;
                            var v = r.plotY;
                            "undefined" !== typeof v &&
                                (v =
                                    r.plotY +
                                    k -
                                    ("undefined" !== typeof A && A * a.stackDistance));
                            r.anchorX = A ? void 0 : r.plotX;
                            var c = A ? void 0 : r.plotY;
                            var l = "flag" !== C;
                            A = r.graphic;
                            "undefined" !== typeof v && 0 <= B && !z ?
                                (A ||
                                    ((A = r.graphic = g.label(
                                            "",
                                            null,
                                            null,
                                            C,
                                            null,
                                            null,
                                            a.useHTML
                                        )),
                                        b.styledMode ||
                                        A.attr(this.pointAttribs(r)).css(u(a.style, r.style)),
                                        A.attr({
                                            align: l ? "center" : "left",
                                            width: a.width,
                                            height: a.height,
                                            "text-align": a.textAlign,
                                        })
                                        .addClass("highcharts-point")
                                        .add(this.markerGroup),
                                        r.graphic.div && (r.graphic.div.point = r),
                                        b.styledMode || A.shadow(a.shadow),
                                        (A.isNew = !0)),
                                    0 < B && (B -= A.strokeWidth() % 2),
                                    (C = { y: v, anchorY: c }),
                                    a.allowOverlapX && ((C.x = B), (C.anchorX = r.anchorX)),
                                    A.attr({ text: r.options.title || a.title || "A" })[
                                        A.isNew ? "attr" : "animate"
                                    ](C),
                                    a.allowOverlapX ||
                                    (n[r.plotX] ?
                                        (n[r.plotX].size = Math.max(n[r.plotX].size, A.width)) :
                                        (n[r.plotX] = {
                                            align: l ? 0.5 : 0,
                                            size: A.width,
                                            target: B,
                                            anchorX: B,
                                        })),
                                    (r.tooltipPos = [B, v + m.pos - b.plotTop])) :
                                A && (r.graphic = A.destroy());
                        }
                        a.allowOverlapX ||
                            (F(n, function(a) {
                                    a.plotX = a.anchorX;
                                    q.push(a);
                                }),
                                t.distribute(q, f ? m.len : this.xAxis.len, 100),
                                h.forEach(function(a) {
                                    var b = a.graphic && n[a.plotX];
                                    b &&
                                        (a.graphic[a.graphic.isNew ? "attr" : "animate"]({
                                                x: b.pos + b.align * b.size,
                                                anchorX: a.anchorX,
                                            }),
                                            d(b.pos) ?
                                            (a.graphic.isNew = !1) :
                                            (a.graphic.attr({ x: -9999, anchorX: -9999 }),
                                                (a.graphic.isNew = !0)));
                                }));
                        a.useHTML &&
                            w(this.markerGroup, "on", function(a) {
                                return D.prototype.on.apply(
                                    a.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1)
                                );
                            });
                    },
                    drawTracker: function() {
                        var d = this.points;
                        m.drawTrackerPoint.apply(this);
                        d.forEach(function(b) {
                            var g = b.graphic;
                            g &&
                                B(g.element, "mouseover", function() {
                                    0 < b.stackIndex &&
                                        !b.raised &&
                                        ((b._y = g.y), g.attr({ y: b._y - 8 }), (b.raised = !0));
                                    d.forEach(function(d) {
                                        d !== b &&
                                            d.raised &&
                                            d.graphic &&
                                            (d.graphic.attr({ y: d._y }), (d.raised = !1));
                                    });
                                });
                        });
                    },
                    animate: function(d) {
                        d && this.setClip();
                    },
                    setClip: function() {
                        r.prototype.setClip.apply(this, arguments);
                        !1 !== this.options.clip &&
                            this.sharedClipKey &&
                            this.markerGroup.clip(this.chart[this.sharedClipKey]);
                    },
                    buildKDTree: z,
                    invertGroups: z,
                }, {
                    isValid: function() {
                        return O(this.y) || "undefined" === typeof this.y;
                    },
                }
            );
            q.flag = function(d, b, g, f, a) {
                var h = (a && a.anchorX) || d;
                a = (a && a.anchorY) || b;
                var e = q.circle(h - 1, a - 1, 2, 2);
                e.push(
                    ["M", h, a], ["L", d, b + f], ["L", d, b], ["L", d + g, b], ["L", d + g, b + f], ["L", d, b + f], ["Z"]
                );
                return e;
            };
            n("circle");
            n("square");
            M === L && ["circlepin", "flag", "squarepin"].forEach(function(d) {
                L.prototype.symbols[d] = q[d];
            });
            ("");
        }
    );
    Q(
        k,
        "Extensions/RangeSelector.js", [
            k["Core/Axis/Axis.js"],
            k["Core/Chart/Chart.js"],
            k["Core/Globals.js"],
            k["Core/Options.js"],
            k["Core/Renderer/SVG/SVGElement.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M) {
            var n = D.defaultOptions,
                z = M.addEvent,
                B = M.createElement,
                d = M.css,
                O = M.defined,
                u = M.destroyObjectProperties,
                F = M.discardElement,
                w = M.extend,
                r = M.fireEvent,
                m = M.isNumber,
                L = M.merge,
                q = M.objectEach,
                h = M.pick,
                b = M.pInt,
                g = M.splat;
            w(n, {
                rangeSelector: {
                    verticalAlign: "top",
                    buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 },
                    floating: !1,
                    x: 0,
                    y: 0,
                    height: void 0,
                    inputPosition: { align: "right", x: 0, y: 0 },
                    buttonPosition: { align: "left", x: 0, y: 0 },
                    labelStyle: { color: "#666666" },
                },
            });
            n.lang = L(n.lang, {
                rangeSelectorZoom: "Zoom",
                rangeSelectorFrom: "From",
                rangeSelectorTo: "To",
            });
            var f = (function() {
                function a(b) {
                    this.buttons = void 0;
                    this.buttonOptions = a.prototype.defaultButtons;
                    this.options = void 0;
                    this.chart = b;
                    this.init(b);
                }
                a.prototype.clickButton = function(a, b) {
                    var e = this.chart,
                        d = this.buttonOptions[a],
                        f = e.xAxis[0],
                        p = (e.scroller && e.scroller.getUnionExtremes()) || f || {},
                        n = p.dataMin,
                        q = p.dataMax,
                        r = f && Math.round(Math.min(f.max, h(q, f.max))),
                        t = d.type;
                    p = d._range;
                    var v,
                        c = d.dataGrouping;
                    if (null !== n && null !== q) {
                        e.fixedRange = p;
                        c &&
                            ((this.forcedDataGrouping = !0),
                                k.prototype.setDataGrouping.call(
                                    f || { chart: this.chart },
                                    c, !1
                                ),
                                (this.frozenStates = d.preserveDataGrouping));
                        if ("month" === t || "year" === t)
                            if (f) {
                                t = { range: d, max: r, chart: e, dataMin: n, dataMax: q };
                                var l = f.minFromRange.call(t);
                                m(t.newMax) && (r = t.newMax);
                            } else p = d;
                        else if (p)(l = Math.max(r - p, n)), (r = Math.min(l + p, q));
                        else if ("ytd" === t)
                            if (f)
                                "undefined" === typeof q &&
                                ((n = Number.MAX_VALUE),
                                    (q = Number.MIN_VALUE),
                                    e.series.forEach(function(a) {
                                        a = a.xData;
                                        n = Math.min(a[0], n);
                                        q = Math.max(a[a.length - 1], q);
                                    }),
                                    (b = !1)),
                                (r = this.getYTDExtremes(q, n, e.time.useUTC)),
                                (l = v = r.min),
                                (r = r.max);
                            else {
                                this.deferredYTDClick = a;
                                return;
                            }
                        else "all" === t && f && ((l = n), (r = q));
                        O(l) && (l += d._offsetMin);
                        O(r) && (r += d._offsetMax);
                        this.setSelected(a);
                        if (f)
                            f.setExtremes(l, r, h(b, 1), null, {
                                trigger: "rangeSelectorButton",
                                rangeSelectorButton: d,
                            });
                        else {
                            var u = g(e.options.xAxis)[0];
                            var w = u.range;
                            u.range = p;
                            var B = u.min;
                            u.min = v;
                            z(e, "load", function() {
                                u.range = w;
                                u.min = B;
                            });
                        }
                    }
                };
                a.prototype.setSelected = function(a) {
                    this.selected = this.options.selected = a;
                };
                a.prototype.init = function(a) {
                    var b = this,
                        d = a.options.rangeSelector,
                        f = d.buttons || b.defaultButtons.slice(),
                        g = d.selected,
                        h = function() {
                            var a = b.minInput,
                                e = b.maxInput;
                            a && a.blur && r(a, "blur");
                            e && e.blur && r(e, "blur");
                        };
                    b.chart = a;
                    b.options = d;
                    b.buttons = [];
                    b.buttonOptions = f;
                    this.unMouseDown = z(a.container, "mousedown", h);
                    this.unResize = z(a, "resize", h);
                    f.forEach(b.computeButtonRange);
                    "undefined" !== typeof g && f[g] && this.clickButton(g, !1);
                    z(a, "load", function() {
                        a.xAxis &&
                            a.xAxis[0] &&
                            z(a.xAxis[0], "setExtremes", function(e) {
                                this.max - this.min !== a.fixedRange &&
                                    "rangeSelectorButton" !== e.trigger &&
                                    "updatedData" !== e.trigger &&
                                    b.forcedDataGrouping &&
                                    !b.frozenStates &&
                                    this.setDataGrouping(!1, !1);
                            });
                    });
                };
                a.prototype.updateButtonStates = function() {
                    var a = this,
                        b = this.chart,
                        d = b.xAxis[0],
                        f = Math.round(d.max - d.min),
                        g = !d.hasVisibleSeries,
                        h = (b.scroller && b.scroller.getUnionExtremes()) || d,
                        k = h.dataMin,
                        n = h.dataMax;
                    b = a.getYTDExtremes(n, k, b.time.useUTC);
                    var q = b.min,
                        r = b.max,
                        t = a.selected,
                        c = m(t),
                        l = a.options.allButtonsEnabled,
                        u = a.buttons;
                    a.buttonOptions.forEach(function(b, e) {
                        var h = b._range,
                            p = b.type,
                            m = b.count || 1,
                            v = u[e],
                            y = 0,
                            w = b._offsetMax - b._offsetMin;
                        b = e === t;
                        var x = h > n - k,
                            E = h < d.minRange,
                            A = !1,
                            C = !1;
                        h = h === f;
                        ("month" === p || "year" === p) &&
                        f + 36e5 >= 864e5 * { month: 28, year: 365 }[p] * m - w &&
                            f - 36e5 <= 864e5 * { month: 31, year: 366 }[p] * m + w ?
                            (h = !0) :
                            "ytd" === p ?
                            ((h = r - q + w === f), (A = !b)) :
                            "all" === p &&
                            ((h = d.max - d.min >= n - k), (C = !b && c && h));
                        p = !l && (x || E || C || g);
                        m = (b && h) || (h && !c && !A) || (b && a.frozenStates);
                        p ? (y = 3) : m && ((c = !0), (y = 2));
                        v.state !== y &&
                            (v.setState(y), 0 === y && t === e && a.setSelected(null));
                    });
                };
                a.prototype.computeButtonRange = function(a) {
                    var b = a.type,
                        d = a.count || 1,
                        f = {
                            millisecond: 1,
                            second: 1e3,
                            minute: 6e4,
                            hour: 36e5,
                            day: 864e5,
                            week: 6048e5,
                        };
                    if (f[b]) a._range = f[b] * d;
                    else if ("month" === b || "year" === b)
                        a._range = 864e5 * { month: 30, year: 365 }[b] * d;
                    a._offsetMin = h(a.offsetMin, 0);
                    a._offsetMax = h(a.offsetMax, 0);
                    a._range += a._offsetMax - a._offsetMin;
                };
                a.prototype.setInputValue = function(a, b) {
                    var e = this.chart.options.rangeSelector,
                        d = this.chart.time,
                        f = this[a + "Input"];
                    O(b) && ((f.previousValue = f.HCTime), (f.HCTime = b));
                    f.value = d.dateFormat(e.inputEditDateFormat || "%Y-%m-%d", f.HCTime);
                    this[a + "DateBox"].attr({
                        text: d.dateFormat(e.inputDateFormat || "%b %e, %Y", f.HCTime),
                    });
                };
                a.prototype.showInput = function(a) {
                    var b = this.inputGroup,
                        f = this[a + "DateBox"];
                    d(this[a + "Input"], {
                        left: b.translateX + f.x + "px",
                        top: b.translateY + "px",
                        width: f.width - 2 + "px",
                        height: f.height - 2 + "px",
                        border: "2px solid silver",
                    });
                };
                a.prototype.hideInput = function(a) {
                    d(this[a + "Input"], { border: 0, width: "1px", height: "1px" });
                    this.setInputValue(a);
                };
                a.prototype.defaultInputDateParser = function(a, b) {
                    var e = new Date();
                    return I.isSafari ?
                        Date.parse(a.split(" ").join("T")) :
                        b ?
                        Date.parse(a + "Z") :
                        Date.parse(a) - 6e4 * e.getTimezoneOffset();
                };
                a.prototype.drawInput = function(a) {
                    function e() {
                        var a = t.value,
                            c = g.xAxis[0];
                        var e = g.scroller && g.scroller.xAxis ? g.scroller.xAxis : c;
                        var d = e.dataMin,
                            h = e.dataMax;
                        e = (p.inputDateParser || l)(a, g.time.useUTC);
                        e !== t.previousValue &&
                            ((t.previousValue = e),
                                m(e) ||
                                ((e = a.split("-")),
                                    (e = Date.UTC(b(e[0]), b(e[1]) - 1, b(e[2])))),
                                m(e) &&
                                (g.time.useUTC || (e += 6e4 * new Date().getTimezoneOffset()),
                                    r ?
                                    e > f.maxInput.HCTime ?
                                    (e = void 0) :
                                    e < d && (e = d) :
                                    e < f.minInput.HCTime ?
                                    (e = void 0) :
                                    e > h && (e = h),
                                    "undefined" !== typeof e &&
                                    c.setExtremes(r ? e : c.min, r ? c.max : e, void 0, void 0, {
                                        trigger: "rangeSelectorInput",
                                    })));
                    }
                    var f = this,
                        g = f.chart,
                        h = g.renderer.style || {},
                        k = g.renderer,
                        p = g.options.rangeSelector,
                        q = f.div,
                        r = "min" === a,
                        t,
                        u,
                        c = this.inputGroup,
                        l = this.defaultInputDateParser;
                    this[a + "Label"] = u = k
                        .label(
                            n.lang[r ? "rangeSelectorFrom" : "rangeSelectorTo"],
                            this.inputGroup.offset
                        )
                        .addClass("highcharts-range-label")
                        .attr({ padding: 2 })
                        .add(c);
                    c.offset += u.width + 5;
                    this[a + "DateBox"] = k = k
                        .label("", c.offset)
                        .addClass("highcharts-range-input")
                        .attr({
                            padding: 2,
                            width: p.inputBoxWidth || 90,
                            height: p.inputBoxHeight || 17,
                            "text-align": "center",
                        })
                        .on("click", function() {
                            f.showInput(a);
                            f[a + "Input"].focus();
                        });
                    g.styledMode ||
                        k.attr({
                            stroke: p.inputBoxBorderColor || "#cccccc",
                            "stroke-width": 1,
                        });
                    k.add(c);
                    c.offset += k.width + (r ? 10 : 0);
                    this[a + "Input"] = t = B(
                        "input", { name: a, className: "highcharts-range-selector", type: "text" }, { top: g.plotTop + "px" },
                        q
                    );
                    g.styledMode ||
                        (u.css(L(h, p.labelStyle)),
                            k.css(L({ color: "#333333" }, h, p.inputStyle)),
                            d(
                                t,
                                w({
                                        position: "absolute",
                                        border: 0,
                                        width: "1px",
                                        height: "1px",
                                        padding: 0,
                                        textAlign: "center",
                                        fontSize: h.fontSize,
                                        fontFamily: h.fontFamily,
                                        top: "-9999em",
                                    },
                                    p.inputStyle
                                )
                            ));
                    t.onfocus = function() {
                        f.showInput(a);
                    };
                    t.onblur = function() {
                        t === I.doc.activeElement && e();
                        f.hideInput(a);
                        t.blur();
                    };
                    t.onchange = e;
                    t.onkeypress = function(a) {
                        13 === a.keyCode && e();
                    };
                };
                a.prototype.getPosition = function() {
                    var a = this.chart,
                        b = a.options.rangeSelector;
                    a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                    return {
                        buttonTop: a + b.buttonPosition.y,
                        inputTop: a + b.inputPosition.y - 10,
                    };
                };
                a.prototype.getYTDExtremes = function(a, b, d) {
                    var e = this.chart.time,
                        f = new e.Date(a),
                        g = e.get("FullYear", f);
                    d = d ? e.Date.UTC(g, 0, 1) : +new e.Date(g, 0, 1);
                    b = Math.max(b || 0, d);
                    f = f.getTime();
                    return { max: Math.min(a || f, f), min: b };
                };
                a.prototype.render = function(a, b) {
                    var e = this,
                        d = e.chart,
                        f = d.renderer,
                        g = d.container,
                        k = d.options,
                        m =
                        k.exporting &&
                        !1 !== k.exporting.enabled &&
                        k.navigation &&
                        k.navigation.buttonOptions,
                        p = n.lang,
                        q = e.div,
                        r = k.rangeSelector,
                        c = h(k.chart.style && k.chart.style.zIndex, 0) + 1;
                    k = r.floating;
                    var l = e.buttons;
                    q = e.inputGroup;
                    var t = r.buttonTheme,
                        u = r.buttonPosition,
                        w = r.inputPosition,
                        z = r.inputEnabled,
                        F = t && t.states,
                        D = d.plotLeft,
                        G = e.buttonGroup,
                        I,
                        J = e.options.verticalAlign,
                        L = d.legend,
                        M = L && L.options,
                        O = u.y,
                        Q = w.y,
                        T = d.hasLoaded,
                        ba = T ? "animate" : "attr",
                        X = 0,
                        V = 0;
                    if (!1 !== r.enabled) {
                        e.rendered ||
                            ((e.group = I = f
                                    .g("range-selector-group")
                                    .attr({ zIndex: 7 })
                                    .add()),
                                (e.buttonGroup = G = f.g("range-selector-buttons").add(I)),
                                (e.zoomText = f.text(p.rangeSelectorZoom, 0, 15).add(G)),
                                d.styledMode ||
                                (e.zoomText.css(r.labelStyle),
                                    (t["stroke-width"] = h(t["stroke-width"], 0))),
                                e.buttonOptions.forEach(function(a, b) {
                                    l[b] = f
                                        .button(
                                            a.text,
                                            0,
                                            0,
                                            function(c) {
                                                var d = a.events && a.events.click,
                                                    f;
                                                d && (f = d.call(a, c));
                                                !1 !== f && e.clickButton(b);
                                                e.isActive = !0;
                                            },
                                            t,
                                            F && F.hover,
                                            F && F.select,
                                            F && F.disabled
                                        )
                                        .attr({ "text-align": "center" })
                                        .add(G);
                                }), !1 !== z &&
                                ((e.div = q = B("div", null, {
                                        position: "relative",
                                        height: 0,
                                        zIndex: c,
                                    })),
                                    g.parentNode.insertBefore(q, g),
                                    (e.inputGroup = q = f.g("input-group").add(I)),
                                    (q.offset = 0),
                                    e.drawInput("min"),
                                    e.drawInput("max")));
                        e.zoomText[ba]({ x: h(D + u.x, D) });
                        var fa = h(D + u.x, D) + e.zoomText.getBBox().width + 5;
                        e.buttonOptions.forEach(function(a, b) {
                            l[b][ba]({ x: fa });
                            fa += l[b].width + h(r.buttonSpacing, 5);
                        });
                        D = d.plotLeft - d.spacing[3];
                        e.updateButtonStates();
                        m &&
                            this.titleCollision(d) &&
                            "top" === J &&
                            "right" === u.align &&
                            u.y + G.getBBox().height - 12 < (m.y || 0) + m.height &&
                            (X = -40);
                        g = u.x - d.spacing[3];
                        "right" === u.align ?
                            (g += X - D) :
                            "center" === u.align && (g -= D / 2);
                        G.align({ y: u.y, width: G.getBBox().width, align: u.align, x: g }, !0,
                            d.spacingBox
                        );
                        e.group.placed = T;
                        e.buttonGroup.placed = T;
                        !1 !== z &&
                            ((X =
                                    m &&
                                    this.titleCollision(d) &&
                                    "top" === J &&
                                    "right" === w.align &&
                                    w.y - q.getBBox().height - 12 <
                                    (m.y || 0) + m.height + d.spacing[0] ?
                                    -40 :
                                    0),
                                "left" === w.align ?
                                (g = D) :
                                "right" === w.align && (g = -Math.max(d.axisOffset[1], -X)),
                                q.align({
                                        y: w.y,
                                        width: q.getBBox().width,
                                        align: w.align,
                                        x: w.x + g - 2,
                                    }, !0,
                                    d.spacingBox
                                ),
                                (m =
                                    q.alignAttr.translateX +
                                    q.alignOptions.x -
                                    X +
                                    q.getBBox().x +
                                    2),
                                (g = q.alignOptions.width),
                                (p = G.alignAttr.translateX + G.getBBox().x),
                                (D = G.getBBox().width + 20),
                                (w.align === u.align ||
                                    (p + D > m && m + g > p && O < Q + q.getBBox().height)) &&
                                q.attr({
                                    translateX: q.alignAttr.translateX + (d.axisOffset[1] >= -X ? 0 : -X),
                                    translateY: q.alignAttr.translateY + G.getBBox().height + 10,
                                }),
                                e.setInputValue("min", a),
                                e.setInputValue("max", b),
                                (e.inputGroup.placed = T));
                        e.group.align({ verticalAlign: J }, !0, d.spacingBox);
                        a = e.group.getBBox().height + 20;
                        b = e.group.alignAttr.translateY;
                        "bottom" === J &&
                            ((L =
                                    M && "bottom" === M.verticalAlign && M.enabled && !M.floating ?
                                    L.legendHeight + h(M.margin, 10) :
                                    0),
                                (a = a + L - 20),
                                (V =
                                    b -
                                    a -
                                    (k ? 0 : r.y) -
                                    (d.titleOffset ? d.titleOffset[2] : 0) -
                                    10));
                        if ("top" === J)
                            k && (V = 0),
                            d.titleOffset && d.titleOffset[0] && (V = d.titleOffset[0]),
                            (V += d.margin[0] - d.spacing[0] || 0);
                        else if ("middle" === J)
                            if (Q === O) V = 0 > Q ? b + void 0 : b;
                            else if (Q || O)
                            V = 0 > Q || 0 > O ? V - Math.min(Q, O) : b - a + NaN;
                        e.group.translate(r.x, r.y + Math.floor(V));
                        !1 !== z &&
                            ((e.minInput.style.marginTop = e.group.translateY + "px"),
                                (e.maxInput.style.marginTop = e.group.translateY + "px"));
                        e.rendered = !0;
                    }
                };
                a.prototype.getHeight = function() {
                    var a = this.options,
                        b = this.group,
                        d = a.y,
                        f = a.buttonPosition.y,
                        g = a.inputPosition.y;
                    if (a.height) return a.height;
                    a = b ? b.getBBox(!0).height + 13 + d : 0;
                    b = Math.min(g, f);
                    if ((0 > g && 0 > f) || (0 < g && 0 < f)) a += Math.abs(b);
                    return a;
                };
                a.prototype.titleCollision = function(a) {
                    return !(a.options.title.text || a.options.subtitle.text);
                };
                a.prototype.update = function(a) {
                    var b = this.chart;
                    L(!0, b.options.rangeSelector, a);
                    this.destroy();
                    this.init(b);
                    b.rangeSelector.render();
                };
                a.prototype.destroy = function() {
                    var b = this,
                        e = b.minInput,
                        d = b.maxInput;
                    b.unMouseDown();
                    b.unResize();
                    u(b.buttons);
                    e && (e.onfocus = e.onblur = e.onchange = null);
                    d && (d.onfocus = d.onblur = d.onchange = null);
                    q(
                        b,
                        function(e, d) {
                            e &&
                                "chart" !== d &&
                                (e instanceof J ?
                                    e.destroy() :
                                    e instanceof window.HTMLElement && F(e));
                            e !== a.prototype[d] && (b[d] = null);
                        },
                        this
                    );
                };
                return a;
            })();
            f.prototype.defaultButtons = [
                { type: "month", count: 1, text: "1m" },
                { type: "month", count: 3, text: "3m" },
                { type: "month", count: 6, text: "6m" },
                { type: "ytd", text: "YTD" },
                { type: "year", count: 1, text: "1y" },
                { type: "all", text: "All" },
            ];
            k.prototype.minFromRange = function() {
                var a = this.range,
                    b = a.type,
                    e = this.max,
                    d = this.chart.time,
                    f = function(a, e) {
                        var f = "year" === b ? "FullYear" : "Month",
                            g = new d.Date(a),
                            c = d.get(f, g);
                        d.set(f, g, c + e);
                        c === d.get(f, g) && d.set("Date", g, 0);
                        return g.getTime() - a;
                    };
                if (m(a)) {
                    var g = e - a;
                    var k = a;
                } else
                    (g = e + f(e, -a.count)),
                    this.chart && (this.chart.fixedRange = e - g);
                var n = h(this.dataMin, Number.MIN_VALUE);
                m(g) || (g = n);
                g <= n &&
                    ((g = n),
                        "undefined" === typeof k && (k = f(g, a.count)),
                        (this.newMax = Math.min(g + k, this.dataMax)));
                m(e) || (g = void 0);
                return g;
            };
            I.RangeSelector ||
                (z(t, "afterGetContainer", function() {
                        this.options.rangeSelector.enabled &&
                            (this.rangeSelector = new f(this));
                    }),
                    z(t, "beforeRender", function() {
                        var a = this.axes,
                            b = this.rangeSelector;
                        b &&
                            (m(b.deferredYTDClick) &&
                                (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick),
                                a.forEach(function(a) {
                                    a.updateNames();
                                    a.setScale();
                                }),
                                this.getAxisMargins(),
                                b.render(),
                                (a = b.options.verticalAlign),
                                b.options.floating ||
                                ("bottom" === a ?
                                    (this.extraBottomMargin = !0) :
                                    "middle" !== a && (this.extraTopMargin = !0)));
                    }),
                    z(t, "update", function(a) {
                        var b = a.options.rangeSelector;
                        a = this.rangeSelector;
                        var e = this.extraBottomMargin,
                            d = this.extraTopMargin;
                        b &&
                            b.enabled &&
                            !O(a) &&
                            ((this.options.rangeSelector.enabled = !0),
                                (this.rangeSelector = new f(this)));
                        this.extraTopMargin = this.extraBottomMargin = !1;
                        a &&
                            (a.render(),
                                (b =
                                    (b && b.verticalAlign) || (a.options && a.options.verticalAlign)),
                                a.options.floating ||
                                ("bottom" === b ?
                                    (this.extraBottomMargin = !0) :
                                    "middle" !== b && (this.extraTopMargin = !0)),
                                this.extraBottomMargin !== e || this.extraTopMargin !== d) &&
                            (this.isDirtyBox = !0);
                    }),
                    z(t, "render", function() {
                        var a = this.rangeSelector;
                        a &&
                            !a.options.floating &&
                            (a.render(),
                                (a = a.options.verticalAlign),
                                "bottom" === a ?
                                (this.extraBottomMargin = !0) :
                                "middle" !== a && (this.extraTopMargin = !0));
                    }),
                    z(t, "getMargins", function() {
                        var a = this.rangeSelector;
                        a &&
                            ((a = a.getHeight()),
                                this.extraTopMargin && (this.plotTop += a),
                                this.extraBottomMargin && (this.marginBottom += a));
                    }),
                    t.prototype.callbacks.push(function(a) {
                        function b() {
                            e = a.xAxis[0].getExtremes();
                            f = a.legend;
                            h = null === d || void 0 === d ? void 0 : d.options.verticalAlign;
                            m(e.min) && d.render(e.min, e.max);
                            d &&
                                f.display &&
                                "top" === h &&
                                h === f.options.verticalAlign &&
                                ((g = L(a.spacingBox)),
                                    (g.y =
                                        "vertical" === f.options.layout ?
                                        a.plotTop :
                                        g.y + d.getHeight()),
                                    (f.group.placed = !1),
                                    f.align(g));
                        }
                        var e,
                            d = a.rangeSelector,
                            f,
                            g,
                            h;
                        if (d) {
                            var k = z(a.xAxis[0], "afterSetExtremes", function(a) {
                                d.render(a.min, a.max);
                            });
                            var n = z(a, "redraw", b);
                            b();
                        }
                        z(a, "destroy", function() {
                            d && (n(), k());
                        });
                    }),
                    (I.RangeSelector = f));
            return I.RangeSelector;
        }
    );
    Q(
        k,
        "Core/Chart/StockChart.js", [
            k["Core/Axis/Axis.js"],
            k["Core/Chart/Chart.js"],
            k["Core/Globals.js"],
            k["Series/LineSeries.js"],
            k["Core/Series/Point.js"],
            k["Core/Renderer/SVG/SVGRenderer.js"],
            k["Core/Utilities.js"],
        ],
        function(k, t, I, D, J, M, n) {
            var z = n.addEvent,
                B = n.arrayMax,
                d = n.arrayMin,
                O = n.clamp,
                u = n.defined,
                F = n.extend,
                w = n.find,
                r = n.format,
                m = n.getOptions,
                L = n.isNumber,
                q = n.isString,
                h = n.merge,
                b = n.pick,
                g = n.splat;
            n = D.prototype;
            var f = n.init,
                a = n.processData,
                p = J.prototype.tooltipFormatter;
            I.StockChart = I.stockChart = function(a, d, f) {
                var e = q(a) || a.nodeName,
                    k = arguments[e ? 1 : 0],
                    n = k,
                    p = k.series,
                    r = m(),
                    u,
                    v = b(k.navigator && k.navigator.enabled, r.navigator.enabled, !0);
                k.xAxis = g(k.xAxis || {}).map(function(a, b) {
                    return h({
                            minPadding: 0,
                            maxPadding: 0,
                            overscroll: 0,
                            ordinal: !0,
                            title: { text: null },
                            labels: { overflow: "justify" },
                            showLastLabel: !0,
                        },
                        r.xAxis,
                        r.xAxis && r.xAxis[b],
                        a, { type: "datetime", categories: null },
                        v ? { startOnTick: !1, endOnTick: !1 } : null
                    );
                });
                k.yAxis = g(k.yAxis || {}).map(function(a, e) {
                    u = b(a.opposite, !0);
                    return h({
                            labels: { y: -2 },
                            opposite: u,
                            showLastLabel: !(!a.categories && "category" !== a.type),
                            title: { text: null },
                        },
                        r.yAxis,
                        r.yAxis && r.yAxis[e],
                        a
                    );
                });
                k.series = null;
                k = h({
                        chart: { panning: { enabled: !0, type: "x" }, pinchType: "x" },
                        navigator: { enabled: v },
                        scrollbar: { enabled: b(r.scrollbar.enabled, !0) },
                        rangeSelector: { enabled: b(r.rangeSelector.enabled, !0) },
                        title: { text: null },
                        tooltip: { split: b(r.tooltip.split, !0), crosshairs: !0 },
                        legend: { enabled: !1 },
                    },
                    k, { isStock: !0 }
                );
                k.series = n.series = p;
                return e ? new t(a, k, f) : new t(k, d);
            };
            z(D, "setOptions", function(a) {
                var b;
                this.chart.options.isStock &&
                    (this.is("column") || this.is("columnrange") ?
                        (b = { borderWidth: 0, shadow: !1 }) :
                        this.is("scatter") ||
                        this.is("sma") ||
                        (b = { marker: { enabled: !1, radius: 2 } }),
                        b && (a.plotOptions[this.type] = h(a.plotOptions[this.type], b)));
            });
            z(k, "autoLabelAlign", function(a) {
                var b = this.chart,
                    e = this.options;
                b = b._labelPanes = b._labelPanes || {};
                var d = this.options.labels;
                this.chart.options.isStock &&
                    "yAxis" === this.coll &&
                    ((e = e.top + "," + e.height), !b[e] &&
                        d.enabled &&
                        (15 === d.x && (d.x = 0),
                            "undefined" === typeof d.align && (d.align = "right"),
                            (b[e] = this),
                            (a.align = "right"),
                            a.preventDefault()));
            });
            z(k, "destroy", function() {
                var a = this.chart,
                    b = this.options && this.options.top + "," + this.options.height;
                b &&
                    a._labelPanes &&
                    a._labelPanes[b] === this &&
                    delete a._labelPanes[b];
            });
            z(k, "getPlotLinePath", function(a) {
                function e(a) {
                    var b = "xAxis" === a ? "yAxis" : "xAxis";
                    a = d.options[b];
                    return L(a) ?
                        [g[b][a]] :
                        q(a) ?
                        [g.get(a)] :
                        f.map(function(a) {
                            return a[b];
                        });
                }
                var d = this,
                    f =
                    this.isLinked && !this.series ?
                    this.linkedParent.series :
                    this.series,
                    g = d.chart,
                    h = g.renderer,
                    k = d.left,
                    m = d.top,
                    n,
                    p,
                    c,
                    l,
                    r = [],
                    t = [],
                    z = a.translatedValue,
                    B = a.value,
                    D = a.force;
                if (
                    (g.options.isStock && !1 !== a.acrossPanes && "xAxis" === d.coll) ||
                    "yAxis" === d.coll
                ) {
                    a.preventDefault();
                    t = e(d.coll);
                    var F = d.isXAxis ? g.yAxis : g.xAxis;
                    F.forEach(function(a) {
                        if (
                            u(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1
                        ) {
                            var b = a.isXAxis ? "yAxis" : "xAxis";
                            b = u(a.options[b]) ? g[b][a.options[b]] : g[b][0];
                            d === b && t.push(a);
                        }
                    });
                    var G = t.length ? [] : [d.isXAxis ? g.yAxis[0] : g.xAxis[0]];
                    t.forEach(function(a) {
                        -1 !== G.indexOf(a) ||
                            w(G, function(b) {
                                return b.pos === a.pos && b.len === a.len;
                            }) ||
                            G.push(a);
                    });
                    var I = b(z, d.translate(B, null, null, a.old));
                    L(I) &&
                        (d.horiz ?
                            G.forEach(function(a) {
                                var b;
                                p = a.pos;
                                l = p + a.len;
                                n = c = Math.round(I + d.transB);
                                "pass" !== D &&
                                    (n < k || n > k + d.width) &&
                                    (D ? (n = c = O(n, k, k + d.width)) : (b = !0));
                                b || r.push(["M", n, p], ["L", c, l]);
                            }) :
                            G.forEach(function(a) {
                                var b;
                                n = a.pos;
                                c = n + a.len;
                                p = l = Math.round(m + d.height - I);
                                "pass" !== D &&
                                    (p < m || p > m + d.height) &&
                                    (D ? (p = l = O(p, m, m + d.height)) : (b = !0));
                                b || r.push(["M", n, p], ["L", c, l]);
                            }));
                    a.path = 0 < r.length ? h.crispPolyLine(r, a.lineWidth || 1) : null;
                }
            });
            M.prototype.crispPolyLine = function(a, b) {
                for (var e = 0; e < a.length; e += 2) {
                    var d = a[e],
                        f = a[e + 1];
                    d[1] === f[1] && (d[1] = f[1] = Math.round(d[1]) - (b % 2) / 2);
                    d[2] === f[2] && (d[2] = f[2] = Math.round(d[2]) + (b % 2) / 2);
                }
                return a;
            };
            z(k, "afterHideCrosshair", function() {
                this.crossLabel && (this.crossLabel = this.crossLabel.hide());
            });
            z(k, "afterDrawCrosshair", function(a) {
                var e, d;
                if (
                    u(this.crosshair.label) &&
                    this.crosshair.label.enabled &&
                    this.cross
                ) {
                    var f = this.chart,
                        g = this.logarithmic,
                        h = this.options.crosshair.label,
                        k = this.horiz,
                        m = this.opposite,
                        n = this.left,
                        p = this.top,
                        c = this.crossLabel,
                        l = h.format,
                        q = "",
                        t = "inside" === this.options.tickPosition,
                        w = !1 !== this.crosshair.snap,
                        z = 0,
                        B = a.e || (this.cross && this.cross.e),
                        D = a.point;
                    a = this.min;
                    var G = this.max;
                    g && ((a = g.lin2log(a)), (G = g.lin2log(G)));
                    g = k ?
                        "center" :
                        m ?
                        "right" === this.labelAlign ?
                        "right" :
                        "left" :
                        "left" === this.labelAlign ?
                        "left" :
                        "center";
                    c ||
                        ((c = this.crossLabel = f.renderer
                                .label(null, null, null, h.shape || "callout")
                                .addClass(
                                    "highcharts-crosshair-label" +
                                    (this.series[0] &&
                                        " highcharts-color-" + this.series[0].colorIndex)
                                )
                                .attr({
                                    align: h.align || g,
                                    padding: b(h.padding, 8),
                                    r: b(h.borderRadius, 3),
                                    zIndex: 2,
                                })
                                .add(this.labelGroup)),
                            f.styledMode ||
                            c
                            .attr({
                                fill: h.backgroundColor ||
                                    (this.series[0] && this.series[0].color) ||
                                    "#666666",
                                stroke: h.borderColor || "",
                                "stroke-width": h.borderWidth || 0,
                            })
                            .css(
                                F({
                                        color: "#ffffff",
                                        fontWeight: "normal",
                                        fontSize: "11px",
                                        textAlign: "center",
                                    },
                                    h.style
                                )
                            ));
                    k
                        ?
                        ((g = w ? D.plotX + n : B.chartX), (p += m ? 0 : this.height)) :
                        ((g = m ? this.width + n : 0), (p = w ? D.plotY + p : B.chartY));
                    l ||
                        h.formatter ||
                        (this.dateTime && (q = "%b %d, %Y"),
                            (l = "{value" + (q ? ":" + q : "") + "}"));
                    q = w ?
                        D[this.isXAxis ? "x" : "y"] :
                        this.toValue(k ? B.chartX : B.chartY);
                    c.attr({
                        text: l ? r(l, { value: q }, f) : h.formatter.call(this, q),
                        x: g,
                        y: p,
                        visibility: q < a || q > G ? "hidden" : "visible",
                    });
                    h = c.getBBox();
                    if (L(c.y))
                        if (k) {
                            if ((t && !m) || (!t && m)) p = c.y - h.height;
                        } else p = c.y - h.height / 2;
                    k
                        ?
                        ((e = n - h.x), (d = n + this.width - h.x)) :
                        ((e = "left" === this.labelAlign ? n : 0),
                            (d =
                                "right" === this.labelAlign ? n + this.width : f.chartWidth));
                    c.translateX < e && (z = e - c.translateX);
                    c.translateX + h.width >= d && (z = -(c.translateX + h.width - d));
                    c.attr({
                        x: g + z,
                        y: p,
                        anchorX: k ? g : this.opposite ? 0 : f.chartWidth,
                        anchorY: k ? (this.opposite ? f.chartHeight : 0) : p + h.height / 2,
                    });
                }
            });
            n.init = function() {
                f.apply(this, arguments);
                this.setCompare(this.options.compare);
            };
            n.setCompare = function(a) {
                this.modifyValue =
                    "value" === a || "percent" === a ?

                    function(b, e) {
                        var d = this.compareValue;
                        return "undefined" !== typeof b && "undefined" !== typeof d ?
                            ((b =
                                    "value" === a ?
                                    b - d :
                                    (b / d) * 100 -
                                    (100 === this.options.compareBase ? 0 : 100)),
                                e && (e.change = b),
                                b) :
                            0;
                    } :
                    null;
                this.userOptions.compare = a;
                this.chart.hasRendered && (this.isDirty = !0);
            };
            n.processData = function(b) {
                var e,
                    d = -1,
                    f = !0 === this.options.compareStart ? 0 : 1;
                a.apply(this, arguments);
                if (this.xAxis && this.processedYData) {
                    var g = this.processedXData;
                    var h = this.processedYData;
                    var k = h.length;
                    this.pointArrayMap &&
                        (d = this.pointArrayMap.indexOf(
                            this.options.pointValKey || this.pointValKey || "y"
                        ));
                    for (e = 0; e < k - f; e++) {
                        var m = h[e] && -1 < d ? h[e][d] : h[e];
                        if (L(m) && g[e + f] >= this.xAxis.min && 0 !== m) {
                            this.compareValue = m;
                            break;
                        }
                    }
                }
            };
            z(D, "afterGetExtremes", function(a) {
                a = a.dataExtremes;
                if (this.modifyValue && a) {
                    var b = [this.modifyValue(a.dataMin), this.modifyValue(a.dataMax)];
                    a.dataMin = d(b);
                    a.dataMax = B(b);
                }
            });
            k.prototype.setCompare = function(a, d) {
                this.isXAxis ||
                    (this.series.forEach(function(b) {
                            b.setCompare(a);
                        }),
                        b(d, !0) && this.chart.redraw());
            };
            J.prototype.tooltipFormatter = function(a) {
                var d = this.series.chart.numberFormatter;
                a = a.replace(
                    "{point.change}",
                    (0 < this.change ? "+" : "") +
                    d(this.change, b(this.series.tooltipOptions.changeDecimals, 2))
                );
                return p.apply(this, [a]);
            };
            z(D, "render", function() {
                var a = this.chart;
                if (!((a.is3d && a.is3d()) || a.polar) &&
                    this.xAxis &&
                    !this.xAxis.isRadial
                ) {
                    var b = this.yAxis.len;
                    if (this.xAxis.axisLine) {
                        var d = a.plotTop + a.plotHeight - this.yAxis.pos - this.yAxis.len,
                            f = Math.floor(this.xAxis.axisLine.strokeWidth() / 2);
                        0 <= d && (b -= Math.max(f - d, 0));
                    }
                    this.clipBox || a.hasRendered ?
                        a[this.sharedClipKey] &&
                        (a[this.sharedClipKey].animate({
                                width: this.xAxis.len,
                                height: b,
                            }),
                            a[this.sharedClipKey + "m"] &&
                            a[this.sharedClipKey + "m"].animate({ width: this.xAxis.len })) :
                        ((this.clipBox = h(a.clipBox)),
                            (this.clipBox.width = this.xAxis.len),
                            (this.clipBox.height = b));
                }
            });
            z(t, "update", function(a) {
                a = a.options;
                "scrollbar" in a &&
                    this.navigator &&
                    (h(!0, this.options.scrollbar, a.scrollbar),
                        this.navigator.update({}, !1),
                        delete a.scrollbar);
            });
        }
    );
    Q(k, "masters/modules/stock.src.js", [], function() {});
    Q(
        k,
        "masters/highstock.src.js", [k["masters/highcharts.src.js"]],
        function(k) {
            k.product = "Highstock";
            return k;
        }
    );
    k["masters/highstock.src.js"]._modules = k;
    return k["masters/highstock.src.js"];
});
//# sourceMappingURL=highstock.js.map