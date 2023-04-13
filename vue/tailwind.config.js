/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4E9F3D',
        'secondary': '#1E5128',
        'dark': '#191A19',
        'dark-smooth': '#1e1e1e',
        'light': '#D8E9A8',
        'info': '#87ceeb',
        'light-blue': '#318F8A'
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '2rem',
          '2xl': '2rem',
        },
        center: true,
      },
    },
  },
  safelist: [
    'w-52',
    'bg-primary',
    'bg-black',
    'text-white',
    'text-black',
    'w-full',
    'justify-center',
    'justify-start',
    'justify-end',
    'justify-between',
    'justify-around',
    'flex-col',
    'flex-wrap',
    'flex-col-reverse',
    'gap-1',
    'gap-2',
    'gap-x-2',
    'gap-x-4',
    'gap-4',
    'gap-6',
    'gap-8',
    'gap-10',
  ],
  plugins: [],
}

