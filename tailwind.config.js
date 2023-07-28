/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'sm': '7px',
      DEFAULT: '8px',
      'lg': '10px',
      'xl': '15px',
    },
    extend: {
      colors: {
        'primary': '#DFD800',
        'secondary': '#313131',
        'tertiary': '#EEEEEE',
        'success': '#5df752',
        'warning': '#f7bd52',
        'danger': '#F75252',
        'info': '#52C5F7',
        'gray': '#B8B8B8',
      }
    },
  },
  plugins: [],
}

