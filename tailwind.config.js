/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "myPurple":"#915EFF",
        "myRed":"#FF5E7B",
        "myGreen":"#CCFF5E",
        "myBlue":"#5EFFE1",
        "myEbony":"#232C18",
        "myViolet":"#5C038C",
        "myNeon":"#B6E305",
        "myWhitish":"#EEEEEE"        
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/herobg.png')",
      },
    },
  },
  plugins: [],
}
