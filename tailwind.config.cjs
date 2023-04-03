/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      padding: "1rem",
      center: true
    },
    extend: {
      fontFamily: { "sans": ["Nunito","sans-serif"] }
    }
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen xl": {
            maxWidth: "1280px"
          },
          "@screen 2xl": {
            maxWidth: "1280px"
          }
        }
      });
    }
  ]
};
