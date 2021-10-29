module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr auto"
      },
    },
  },
  variants: {
    extend: {
      transform: ['active']
    },
  },
  plugins: [],
};
