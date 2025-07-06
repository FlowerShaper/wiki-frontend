import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/app.vue', './src/{components,layouts,pages}/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            black: '#000',
            bq: {
                danger: '#ff5555',
                tip: '#5555ff',
                caution: '#ffc517',
                warning: '#ffc517',
            },
        },
        extend: {
            width: {
                page: 1536,
                settings: 1280,
                search: 1024,
            },
            fontFamily: {
                fa: 'fa',
                'fa-reg': 'fa-regular',
                'mono': ['jbmono', 'mono'],
                'simple': ['campton', 'system-ui', 'sans-serif'],
                system: ['system-ui', 'sans-serif'],
            },
            zIndex: {
                1: '1',
            },
        },
    },
    safelist: [
        {
            pattern: /border-bq-+/,
        },
    ],
    plugins: [
        createThemes({
            dark: {
                1: 'hsl(243, 26%, 16%)',
                2: 'hsl(243, 26%, 21%)',
                3: 'hsl(243, 26%, 26%)',
                4: 'hsl(243, 26%, 31%)',
                text: 'hsl(240, 27%, 90%)',
                primary: 'hsl(242, 41%, 74%)',
                secondary: 'hsl(272, 41%, 74%)',
            },
            light: {
                1: 'hsl(349, 65%, 95%)',
                2: 'hsl(349, 65%, 93%)',
                3: 'hsl(349, 65%, 91%)',
                4: 'hsl(349, 65%, 89%)',
                text: '#140709',
                primary: '#d1566a',
                secondary: '#b273f0',
            },
            alpha: {
                1: '#331D2D',
                2: '#45283D',
                3: '#58304D',
                4: '#56304C',
                text: '#ffffff',
                primary: '#F876D3',
                secondary: '#EF656E',
            },
            catppuccin: {
                1: '#303446',
                2: '#414559',
                3: '#51576d',
                4: '#626880',
                text: '#c6d0f5',
                primary: '#8caaee',
                secondary: '#babbf1',
            },
        }),
    ],
};
