/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM sans", "sans-serif"],
      },
      colors: {
        primary: "#F62682",
      },
      backgroundImage: {
        AuthBanner:
          "url(https://i.pinimg.com/564x/80/5f/c3/805fc36d7e37f14c7c8229b620fabd18.jpg) ",
      },
    },
  },
  plugins: [],
};
