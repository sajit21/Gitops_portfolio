/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
    extend: {
      colors: {
        primary: "#002452",   // blue 
        secondary: "#A2D6CC", // purple
        accent: "#F59E0B",    // orange
        btn:"ffe009",
        golden:"#E2AE00"
        // third: 
      },
      fontSize: {
        header: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],   // 40px
        title: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "600" }], // 28px
        paragraph: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }], // 16px
        button: ["1.125rem", { lineHeight: "1.75rem", fontWeight: "500" }], // 18px
        
      },
      spacing: {
        section: "2rem", // 32px fixed gap for component spacing
        section1:"20rem"
      },
    },
  },
//   plugins: [require('@tailwindcss/line-clamp')],
};
