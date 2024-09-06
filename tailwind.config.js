const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: '#858585',
            foreground: "#000",
            primary: {
              50: "#caebdc", // Очень светлый
              100: "#b4e1d2", // Немного светлее
              200: "#8cd2b9", // Светлый оттенок
              300: "#64c2a0", // Приближение к основному цвету
              400: "#26bb79", // Основной цвет (заданный)
              500: "#32a473", // Чуть темнее основного
              600: "#2b8f66", // Более темный
              700: "#257b58", // Еще темнее
              800: "#1e664a", // Очень темный
              900: "#19533d", // Самый темный
              DEFAULT: "#39b880", // Основной цвет по умолчанию
              foreground: "#0558ff", // Цвет текста
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
