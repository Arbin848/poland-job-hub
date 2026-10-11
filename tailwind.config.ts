import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#F7F3EC",
          creamDark: "#EFE8DC",
          primary: "#C6A75E",
          primaryHover: "#B3934A",
          primaryDark: "#8F7332",
          text: "#1F1F1F",
          muted: "#6B7280",
          border: "#E5E1D8",
          dark: "#141414",
        },
      },
    },
  },
  plugins: [],
};
export default config;
