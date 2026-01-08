import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'], // ✅ important
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
