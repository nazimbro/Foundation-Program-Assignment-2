/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#150E17',      // near-black plum, main background
        screen: '#1F1823',   // card / surface background
        marquee: '#E3A857',  // warm amber accent — the one bold color
        curtain: '#7A2E3A',  // deep crimson secondary accent
        paper: '#F3EEE6',    // off-white primary text
        fog: '#9C93A6',      // muted lavender-grey secondary text
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        body: ['"Work Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
