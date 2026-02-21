/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bb-black': '#0A0A0F',
        'bb-dark': '#111118',
        'bb-card': '#1A1A24',
        'bb-border': '#2A2A38',
        'bb-red': '#E50914',
        'bb-red-hover': '#F40612',
        'bb-gold': '#F5C518',
        'bb-text': '#E8E8F0',
        'bb-muted': '#8888A0',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'cursive'],
        'body': ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, rgba(10,10,15,1) 30%, rgba(10,10,15,0.5) 70%, transparent 100%)',
        'card-gradient': 'linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.5) 50%, transparent 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}