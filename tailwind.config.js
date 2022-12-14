/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          100: "rgb(17 94 87)",
          10: "rgb(231,239,238)",
          20: "rgb(207,223,221)",
          30: "rgb(184,207,205)",
          40: "rgb(160,191,188)",
          50: "rgb(136,175,171)",
          5: "rgb(243,247,247)",
        },
        green: {
          main: "#7d7",
        },
        red: {
          main: "#e33",
        },
        blue: {
          main: "#33a",
        },
      },
      width: {
        clamp: "clamp(50%, 650px, 95%)",
        "clamp-64": "clamp(40%, 16rem, 95%)",
        "clamp-72": "clamp(40%, 18rem, 95%)",
        "clamp-xl": "clamp(70%, 24rem, 95%)",
        "clamp-side": "clamp(50%, 24rem, 85%)",
      },
      minWidth: {
        36: "9rem",
        28: "7rem",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "33.3333%",
        "1/4": "25%",
      },
      height: {
        "fit-screen": "calc(100vh - 3rem)",
      },
      minHeight: {
        "fit-screen": "calc(100vh - 3rem)",
        "1/2": "50%",
        48: "12rem",
        36: "9rem",
        28: "7rem",
      },
      maxHeight: {
        "screen-80": "80vh",
      },
      aspectRatio: {
        "2/1": "2/1",
      },
      keyframes: {
        "rise-6": {
          "0%": { transform: "translate(0, 6rem)", opacity: "0%" },
          "10%, 90%": { opacity: "100%" },
          "100%": { transform: "translate(0, -6rem)", opacity: "0%" },
        },
        "rise-10": {
          "0%": { transform: "translate(0, 10rem)", opacity: "0%" },
          "10%, 90%": { opacity: "100%" },
          "100%": { transform: "translate(0, -10rem)", opacity: "0%" },
        },
        "rise-14": {
          "0%": { transform: "translate(0, 14rem)", opacity: "0%" },
          "10%, 90%": { opacity: "100%" },
          "100%": { transform: "translate(0, -14rem)", opacity: "0%" },
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
}
