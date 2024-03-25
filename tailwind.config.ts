import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        bannerBg: "#F4F4F4",
        breaker: "#C1C1C1",
        checkboxUnselect: "#CCCCCC",
      },
      borderRadius: {
        formRadius: "20px",
      },
      fontSize: {
        "3.25xl": "32px",
      },
    },
  },
  plugins: [],
} satisfies Config;
