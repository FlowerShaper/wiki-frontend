// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-06-08',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@comark/nuxt'],
    srcDir: 'src',
    components: true,
    app: {
        head: {
            htmlAttrs: {
                'data-theme': 'dark',
            },
            title: 'Camellia Wiki',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
                },
            ],
            meta: [{ name: 'darkreader', content: 'meow' }],
        },
        pageTransition: {
            name: 'page-fade',
        },
    },
    experimental: {
        asyncContext: true,
    },
});