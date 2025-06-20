/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          light: 'rgb(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
        },
        success: {
          DEFAULT: 'rgb(var(--success))',
        },
        warning: {
          DEFAULT: 'rgb(var(--warning))',
        },
        error: {
          DEFAULT: 'rgb(var(--error))',
        },
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        growUp: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        waveAnimation: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        growUp: 'growUp 0.5s ease-out',
        wave: 'waveAnimation 15s linear infinite',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};