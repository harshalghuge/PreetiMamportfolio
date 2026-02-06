/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        span: ["Span Compressed", "serif"],
        serif: ["Cormorant Garamond", "Cambria", "Times New Roman", "serif"],
        sans: ["Montserrat", "Inter", "Arial", "Helvetica", "sans-serif"],
      },

      animation: {
        fadeInUp: "fadeInUp 1s ease-out",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
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

        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotateX(0deg)",
          },
          "50%": {
            transform: "translateY(-18px) rotateX(6deg)",
          },
        },

        glow: {
          "0%": {
            opacity: "0.25",
            filter: "blur(60px)",
          },
          "100%": {
            opacity: "0.45",
            filter: "blur(90px)",
          },
        },
      },
    },
  },
  plugins: [],
};
