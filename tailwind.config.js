import('tailwindcss').Config
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        span: ['Span Compressed', 'serif'],
        serif: ['Cormorant Garamon', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter','Arial', 'Helvetica', 'sans-serif'],
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-out",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(-10px)", opacity: "0.5" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
