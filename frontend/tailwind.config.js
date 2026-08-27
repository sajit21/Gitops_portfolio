/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#111827",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#A2D6CC",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        btn: "ffe009",
        golden: "#E2AE00",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        header: [
          "2.5rem",
          {
            lineHeight: "3rem",
            fontWeight: "700",
          },
        ],
        title: [
          "1.75rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "600",
          },
        ],
        paragraph: [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        button: [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "500",
          },
        ],
      },
      spacing: {
        section: "2rem",
        section1: "20rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  //   plugins: [require('@tailwindcss/line-clamp')],
  plugins: [require("tailwindcss-animate")],
};
