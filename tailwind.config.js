// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#183262", // Color primario
        secondary1: "#FFFFFF", // Blanco
        secondary2: "#E0E847", // Amarillo
        secondary3: "#FF8302", // Naranja
      },
      backgroundImage: {
        'padel-court': "url('/padel3.png')",
      },
    },
  },
  plugins: [],
};
