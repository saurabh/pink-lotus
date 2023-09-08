import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: {
          "100": "rgba(0, 0, 0, 0.5)",
          "200": "rgba(255, 255, 255, 0.4)",
        },
        lotusGreen: "#B3E56D",
        pink: "#fbbcda",
        deeppink: "#ff007a",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      fontSize: {
        inherit: "inherit",
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
} satisfies Config;
