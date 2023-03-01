const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        DarkVector80: "url('./assets/images/DarkVector80.png')",
        DarkVector81: "url('./assets/images/DarkVector81.png')",
        Vector80: "url('./assets/images/Vector80.png')",
        Vector81: "url('./assets/images/Vector81.png')",
        Net: "url('./assets/images/Net.png')",
        DarkNet: "url('./assets/images/DarkNet.png')",
      },
    },
    colors: {
      color1: "#6D47E4",
      color2: "#101115",
      color3: "#F9FBFD",
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
    },
  },
  plugins: [],
});
