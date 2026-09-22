// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-06-08',
    devtools: { enabled: true },
    modules: ['@nuxt/icon', '@comark/nuxt', '@nuxt/ui'],
    components: true,
    app: {
        head: {
            htmlAttrs: { 'data-theme': 'dark' },
            meta: [{ name: 'darkreader', content: 'meow' }],
            title: 'Camellia Wiki',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        layoutTransition: { name: 'fade' },
    },
    css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
    extends: ['./wiki-lib'],
    icon: {
        clientBundle: { scan: true },
        provider: 'server',
    },
    experimental: { asyncContext: true },
    ui: { prose: false },
});
