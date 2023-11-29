import daisyui from 'daisyui'
import typo from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        ...defaultTheme.screens
      }
    },
  },
  plugins: [typo, daisyui],
}

