const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{astro,js,ts,svelte}"],
  safelist: ["dark"],
  theme: {
    fontFamily: {
      sans: ["Fira Code", ...fontFamily.sans],
      serif: ["Castoro", ...fontFamily.serif],
      display: ["Alfa Slab One"],
      mono: ["Fira Mono", ...fontFamily.sans],
    },
    extend: {
      colors: {
        theme: {
          // ...colors,
          primary: "#000B00",
          secondary: "#4D80E6",
        },
        "black-coffee": "#352f33",
        "dutch-white": "#D5C7AA",
        "expired-seaweed-salad": "#47585C",
        "unripe-plum": "#4F455C",
        oldPaper: "#EAE5E3",
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.200"),
          },
        },
        DEFAULT: {
          css: {
            //  TODO: figure out why I can't set default fonts here for paragraph
            // I am not a himbo
            // p: {
            //   "font-family": "Fraunces",
            // },
            // a: {
            //   color: colors.dark.primary,
            //   "&:hover": {
            //     color: colors.primary,
            //   },
            // },
            // h1: {
            //   color: colors.dark.secondary,
            // },
            // h2: {
            //   color: colors.dark.secondary,
            // },
            // h3: {
            //   color: colors.dark.secondary,
            // },
          },
        },
      }),
    },
  },
  variants: {
    extend: { typography: ["dark"] },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
