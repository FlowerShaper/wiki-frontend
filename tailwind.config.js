/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ],
  theme: {
    colors: {
      'dark': {
        '1': 'hsl(243, 26%, 16%)',
        '2': 'hsl(243, 26%, 21%)',
        '3': 'hsl(243, 26%, 26%)',
        'text': '#e0e0ed',
        'accent': '#a3a1d8'
      }
    },
    extend: {
      width: {
        page: 1536
      }
    },
  },
  plugins: [],
}

