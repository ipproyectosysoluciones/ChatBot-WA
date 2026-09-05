;(() => {
    var a = {}
    ;((a.id = 636),
        (a.ids = [636]),
        (a.modules = {
            1867: (a, b) => {
                ;(Object.defineProperty(b, '__esModule', { value: !0 }),
                    !((a, b) => {
                        for (var c in b) Object.defineProperty(a, c, { enumerable: !0, get: b[c] })
                    })(b, {
                        DecodeError: () => o,
                        MiddlewareNotFoundError: () => s,
                        MissingStaticPage: () => r,
                        NormalizeError: () => p,
                        PageNotFoundError: () => q,
                        SP: () => m,
                        ST: () => n,
                        WEB_VITALS: () => c,
                        execOnce: () => d,
                        getDisplayName: () => i,
                        getLocationOrigin: () => g,
                        getURL: () => h,
                        isAbsoluteUrl: () => f,
                        isResSent: () => j,
                        loadGetInitialProps: () => l,
                        normalizeRepeatedSlashes: () => k,
                        stringifyError: () => t,
                    }))
                const c = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']
                function d(a) {
                    let b,
                        c = !1
                    return function () {
                        for (var d = arguments.length, e = Array(d), f = 0; f < d; f++) e[f] = arguments[f]
                        return (c || ((c = !0), (b = a(...e))), b)
                    }
                }
                const e = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
                    f = (a) => e.test(a)
                function g() {
                    const { protocol: a, hostname: b, port: c } = window.location
                    return a + '//' + b + (c ? ':' + c : '')
                }
                function h() {
                    const { href: a } = window.location,
                        b = g()
                    return a.substring(b.length)
                }
                function i(a) {
                    return 'string' == typeof a ? a : a.displayName || a.name || 'Unknown'
                }
                function j(a) {
                    return a.finished || a.headersSent
                }
                function k(a) {
                    const b = a.split('?')
                    return b[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') + (b[1] ? '?' + b.slice(1).join('?') : '')
                }
                async function l(a, b) {
                    const c = b.res || (b.ctx && b.ctx.res)
                    if (!a.getInitialProps)
                        return b.ctx && b.Component ? { pageProps: await l(b.Component, b.ctx) } : {}
                    const d = await a.getInitialProps(b)
                    if (c && j(c)) return d
                    if (!d)
                        throw Object.defineProperty(
                            Error(
                                '"' +
                                    i(a) +
                                    '.getInitialProps()" should resolve to an object. But found "' +
                                    d +
                                    '" instead.'
                            ),
                            '__NEXT_ERROR_CODE',
                            { value: 'E394', enumerable: !1, configurable: !0 }
                        )
                    return d
                }
                const m = 'undefined' != typeof performance,
                    n = m && ['mark', 'measure', 'getEntriesByName'].every((a) => 'function' == typeof performance[a])
                class o extends Error {}
                class p extends Error {}
                class q extends Error {
                    constructor(a) {
                        ;(super(),
                            (this.code = 'ENOENT'),
                            (this.name = 'PageNotFoundError'),
                            (this.message = 'Cannot find module for page: ' + a))
                    }
                }
                class r extends Error {
                    constructor(a, b) {
                        ;(super(), (this.message = 'Failed to load static file for page: ' + a + ' ' + b))
                    }
                }
                class s extends Error {
                    constructor() {
                        ;(super(), (this.code = 'ENOENT'), (this.message = 'Cannot find the middleware module'))
                    }
                }
                function t(a) {
                    return JSON.stringify({ message: a.message, stack: a.stack })
                }
            },
            2015: (a) => {
                a.exports = require('react')
            },
            2403: (a, b) => {
                b._ = (a) => (a && a.__esModule ? a : { default: a })
            },
            5609: (a, b, c) => {
                ;(Object.defineProperty(b, '__esModule', { value: !0 }),
                    Object.defineProperty(b, 'default', { enumerable: !0, get: () => i }))
                const d = c(2403),
                    e = c(8732),
                    f = d._(c(2015)),
                    g = c(1867)
                async function h(a) {
                    const { Component: b, ctx: c } = a
                    return { pageProps: await (0, g.loadGetInitialProps)(b, c) }
                }
                class i extends f.default.Component {
                    render() {
                        const { Component: a, pageProps: b } = this.props
                        return (0, e.jsx)(a, { ...b })
                    }
                }
                ;((i.origGetInitialProps = h),
                    (i.getInitialProps = h),
                    ('function' == typeof b.default || ('object' == typeof b.default && null !== b.default)) &&
                        void 0 === b.default.__esModule &&
                        (Object.defineProperty(b.default, '__esModule', { value: !0 }),
                        Object.assign(b.default, b),
                        (a.exports = b.default)))
            },
            8732: (a) => {
                a.exports = require('react/jsx-runtime')
            },
        }))
    var b = require('../webpack-runtime.js')
    b.C(a)
    var c = b((b.s = 5609))
    module.exports = c
})()
