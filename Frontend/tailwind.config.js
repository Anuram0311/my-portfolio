/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          lime: '#D4F244',
          'lime-dim': '#b8d63a',
          dark: '#0C0C0E',
          card: '#111113',
          border: '#1E1E22',
          muted: '#6B6B7A',
          accent: '#D4F244',
        },
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulse_glow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        scroll_text: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fadeInUp 0.75s ease forwards',
        'fade-up-delay-1': 'fadeInUp 0.75s 0.15s ease forwards',
        'fade-up-delay-2': 'fadeInUp 0.75s 0.30s ease forwards',
        'fade-up-delay-3': 'fadeInUp 0.75s 0.45s ease forwards',
        'fade-up-delay-4': 'fadeInUp 0.75s 0.60s ease forwards',
        'fade-left': 'fadeInLeft 0.8s 0.2s ease forwards',
        'fade-right': 'fadeInRight 0.8s 0.1s ease forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse_glow 3s ease-in-out infinite',
        'scroll-text': 'scroll_text 18s linear infinite',
        'blink': 'blink 1.2s step-end infinite',
      },
    },
  },
  plugins: [],
}