// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/*.js",
  ],
  theme: {
    extend: {
      screen: {
        md: "768px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              foreground: "#fff",
              DEFAULT: "#f97316",
            },

            warning: {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              foreground: "#fff",
              DEFAULT: "#f97316",
            },

            secondary: {
              "50": "#fafafa",
              "100": "#f4f4f5",
              "200": "#e4e4e7",
              "300": "#d4d4d8",
              "400": "#a1a1aa",
              "500": "#71717a",
              "600": "#52525b",
              "700": "#3f3f46",
              "800": "#27272a",
              "900": "#18181b",
              foreground: "#18181b",
              DEFAULT: "#f4f4f5",
            },

            focus: "#f97316",
          },
        },

        dark: {
          colors: {
            primary: {
              "50": "#fff7ed",
              "100": "#ffedd5",
              "200": "#fed7aa",
              "300": "#fdba74",
              "400": "#fb923c",
              "500": "#f97316",
              "600": "#ea580c",
              "700": "#c2410c",
              "800": "#9a3412",
              "900": "#7c2d12",
              foreground: "#ffffff",
              DEFAULT: "#f97316",
            },
            secondary: {
              "50": "#18181b",
              "100": "#262626",
              "200": "#262626",
              "300": "#2e2e2e",
              "400": "#3a3a3a",
              "500": "#525252",
              "600": "#737373",
              "700": "#a3a3a3",
              "800": "#d4d4d4",
              "900": "#f5f5f5",
              foreground: "#ffffff",
              DEFAULT: "#1f1f1f",
            },
            warning: {
              "50": "#7c2d12",
              "100": "#9a3412",
              "200": "#c2410c",
              "300": "#ea580c",
              "400": "#f97316",
              "500": "#fb923c",
              "600": "#fdba74",
              "700": "#fed7aa",
              "800": "#ffedd5",
              "900": "#fff7ed",
              foreground: "#fff",
              DEFAULT: "#f97316",
            },

            focus: "#f97316",
          },
        },
      },
      layout: {
        disabledOpacity: "0.5",
      },
    }),
  ],
};
