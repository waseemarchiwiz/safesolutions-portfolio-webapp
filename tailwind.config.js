// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode:"class",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",  
//   ],
  
//   theme: {
//     extend: {
      
//       colors: {
//         primary: '#267cbf',
//         secondary: '#555555',
//         // 'white': '#ffffff',
//         // 'purple': '#3f3cbb',
//         // 'midnight': '#121063',
//         // 'metal': '#565584',
//         // 'tahiti': '#3ab7bf',
//         // 'silver': '#ecebff',
//         // 'bubble-gum': '#ff77e9',
//         // 'bermuda': '#78dcca',
//       },
//     },
//   },
//   plugins: [],
// }

import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: '#267cbf',
        secondary: '#555555',
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },

  plugins: [addVariablesForColors],
};

/**
 * Custom plugin to add CSS variables for all colors
 */
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
