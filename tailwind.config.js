/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['Press Start 2P', 'monospace'],
        'vt323': ['VT323', 'monospace'],
        'dunggeunmo': ['DungGeunMo', 'monospace'],
      },
      colors: {
        'retro-pink': '#e91e63',
        'retro-purple': '#9c27b0',
        'retro-cyan': '#00bcd4',
        'retro-bg': '#fce4ec',
        'retro-bg-light': '#f8bbd0',
      },
    },
  },
  plugins: [],
}



