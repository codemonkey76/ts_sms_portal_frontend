import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['selector', 'html.dark'],
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F4ECFC',
          100: '#DBC9F0',
          200: '#BCA1DC',
          300: '#A58DC2',
          400: '#927BAF',
          500: '#80699D',
          600: '#7B639A',
          700: '#6E5192',
          800: '#5E3B8A',
          900: '#3B205B'
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: [forms, typography]
}

export default config
