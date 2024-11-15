const { createThemes } = require("tw-colors");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: [],
    theme: {
        colors: {
            black: "#000",
            bq: {
                danger: "#ff5555",
                tip: "#5555ff",
                caution: "#ffc517",
                warning: "#ffc517",
            },
        },
        extend: {
            width: {
                page: 1536,
            },
            fontFamily: {
                fa: "fa",
                "fa-reg": "fa-regular",
                system: [ "system-ui", "sans-serif" ]
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
                1: "hsl(243, 26%, 16%)",
                2: "hsl(243, 26%, 21%)",
                3: "hsl(243, 26%, 26%)",
                4: "hsl(243, 26%, 31%)",
                text: "hsl(240, 27%, 90%)",
                primary: "hsl(242, 41%, 74%)",
                secondary: "hsl(272, 41%, 74%)",
            },
            light: {
                1: "hsl(243, 10%, 95%)",
                2: "hsl(243, 10%, 90%)",
                3: "hsl(243, 10%, 85%)",
                4: "hsl(243, 10%, 80%)",
                text: "hsl(243, 26%, 16%)",
                primary: "hsl(242, 31%, 44%)",
                secondary: "hsl(272, 31%, 44%)",
            },
            alpha: {
                1: "#331D2D",
                2: "#45283D",
                3: "#58304D",
                4: "#56304C",
                text: "#ffffff",
                primary: "#F876D3",
                secondary: '#EF656E'
            },
            catppuccin: {
                1: "#303446",
                2: "#414559",
                3: "#51576d",
                4: "#626880",
                text: "#c6d0f5",
                primary: "#8caaee",
                secondary: '#babbf1'
            },
        }),
    ],
};
