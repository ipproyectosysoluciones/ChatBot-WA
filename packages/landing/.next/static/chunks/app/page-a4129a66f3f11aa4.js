;(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [974],
    {
        515: (e, r, n) => {
            n.d(r, { default: () => d })
            var i = n(8961),
                o = n(1669),
                s = n(3594),
                t = n(1939)
            const l = 'https://github.com/leifermendez/bot-whatsapp',
                a = [
                    { href: '#hero', label: 'Home' },
                    { href: '#features', label: 'Features' },
                    { href: '#pricing', label: 'Pricing' },
                    { href: '#cta', label: 'Get Started' },
                ],
                d = () => {
                    const [e, r] = o.useState(!1),
                        [n, d] = o.useState(!1)
                    return (
                        o.useEffect(() => {
                            const e = () => r(window.scrollY >= 40)
                            return (
                                e(),
                                window.addEventListener('scroll', e, { passive: !0 }),
                                () => window.removeEventListener('scroll', e)
                            )
                        }, []),
                        (0, i.jsx)('header', {
                            className: (function () {
                                for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) r[n] = arguments[n]
                                return (0, t.QP)((0, s.$)(r))
                            })(
                                'sticky top-0 z-50 w-full transition-shadow duration-200',
                                e
                                    ? 'bg-background/80 backdrop-blur shadow-lg border-b border-border'
                                    : 'bg-background/0 border-b border-transparent'
                            ),
                            children: (0, i.jsxs)('div', {
                                className: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
                                children: [
                                    (0, i.jsxs)('div', {
                                        className: 'flex h-16 items-center justify-between',
                                        children: [
                                            (0, i.jsx)('a', {
                                                href: '#hero',
                                                className:
                                                    'text-lg font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md',
                                                children: 'ChatBot-WA',
                                            }),
                                            (0, i.jsxs)('nav', {
                                                'aria-label': 'Primary',
                                                className: 'hidden md:flex items-center gap-6',
                                                children: [
                                                    a.map((e) =>
                                                        (0, i.jsx)(
                                                            'a',
                                                            {
                                                                href: e.href,
                                                                className:
                                                                    'text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md',
                                                                children: e.label,
                                                            },
                                                            e.href
                                                        )
                                                    ),
                                                    (0, i.jsx)('a', {
                                                        href: l,
                                                        target: '_blank',
                                                        rel: 'noopener noreferrer',
                                                        className:
                                                            'text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md',
                                                        children: 'GitHub',
                                                    }),
                                                ],
                                            }),
                                            (0, i.jsxs)('button', {
                                                type: 'button',
                                                'aria-label': n ? 'Close menu' : 'Open menu',
                                                'aria-expanded': n,
                                                'aria-controls': 'mobile-nav',
                                                onClick: () => d((e) => !e),
                                                className:
                                                    'md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                                children: [
                                                    (0, i.jsx)('span', {
                                                        'aria-hidden': 'true',
                                                        className: 'sr-only',
                                                        children: 'Toggle navigation',
                                                    }),
                                                    n
                                                        ? (0, i.jsxs)('svg', {
                                                              xmlns: 'http://www.w3.org/2000/svg',
                                                              width: '20',
                                                              height: '20',
                                                              viewBox: '0 0 24 24',
                                                              fill: 'none',
                                                              stroke: 'currentColor',
                                                              strokeWidth: '2',
                                                              strokeLinecap: 'round',
                                                              strokeLinejoin: 'round',
                                                              children: [
                                                                  (0, i.jsx)('line', {
                                                                      x1: '18',
                                                                      y1: '6',
                                                                      x2: '6',
                                                                      y2: '18',
                                                                  }),
                                                                  (0, i.jsx)('line', {
                                                                      x1: '6',
                                                                      y1: '6',
                                                                      x2: '18',
                                                                      y2: '18',
                                                                  }),
                                                              ],
                                                          })
                                                        : (0, i.jsxs)('svg', {
                                                              xmlns: 'http://www.w3.org/2000/svg',
                                                              width: '20',
                                                              height: '20',
                                                              viewBox: '0 0 24 24',
                                                              fill: 'none',
                                                              stroke: 'currentColor',
                                                              strokeWidth: '2',
                                                              strokeLinecap: 'round',
                                                              strokeLinejoin: 'round',
                                                              children: [
                                                                  (0, i.jsx)('line', {
                                                                      x1: '3',
                                                                      y1: '6',
                                                                      x2: '21',
                                                                      y2: '6',
                                                                  }),
                                                                  (0, i.jsx)('line', {
                                                                      x1: '3',
                                                                      y1: '12',
                                                                      x2: '21',
                                                                      y2: '12',
                                                                  }),
                                                                  (0, i.jsx)('line', {
                                                                      x1: '3',
                                                                      y1: '18',
                                                                      x2: '21',
                                                                      y2: '18',
                                                                  }),
                                                              ],
                                                          }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    n &&
                                        (0, i.jsxs)('nav', {
                                            id: 'mobile-nav',
                                            'aria-label': 'Mobile primary',
                                            className: 'md:hidden flex flex-col gap-1 pb-4 pt-2 border-t border-border',
                                            children: [
                                                a.map((e) =>
                                                    (0, i.jsx)(
                                                        'a',
                                                        {
                                                            href: e.href,
                                                            onClick: () => d(!1),
                                                            className:
                                                                'px-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md',
                                                            children: e.label,
                                                        },
                                                        e.href
                                                    )
                                                ),
                                                (0, i.jsx)('a', {
                                                    href: l,
                                                    target: '_blank',
                                                    rel: 'noopener noreferrer',
                                                    onClick: () => d(!1),
                                                    className:
                                                        'px-2 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md',
                                                    children: 'GitHub',
                                                }),
                                            ],
                                        }),
                                ],
                            }),
                        })
                    )
                }
        },
        5387: (e, r, n) => {
            Promise.resolve().then(n.bind(n, 515))
        },
    },
    (e) => {
        ;(e.O(0, [612, 460, 809, 358], () => e((e.s = 5387))), (_N_E = e.O()))
    },
])
