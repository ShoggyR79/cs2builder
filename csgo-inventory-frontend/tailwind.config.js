/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],

  theme: {
    extend: {
      maxWidth:{
        '1/4': '25vw',
        '1/2': '50vw',
        '3/4': '75vw',
        '1/5': '20vw',
        '2/5': '40vw',
        '3/5': '60vw',
        '4/5': '80vw',
        '95vw': '95vw',
        '5vw': '5vw',
      },
      maxHeight: {
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        '1/5': '20vh',
        '2/5': '40vh',
        '3/5': '60vh',
        '4/5': '80vh',
        '30vh': '30vh',
        '65vh': '65vh',
        '45vw': '45vw',
      },
      minWidth: {
        '1/4': '25vw',
        '1/2': '50vw',
        '3/4': '75vw',
        '1/5': '20vw',
        '2/5': '40vw',
        '3/5': '60vw',
        '4/5': '80vw',
        '30vw': '30vw',
        '5vw': '5vw',
      },
      minHeight: {
        '1/4': '25vh',
        '1/2': '50vh',
        '3/4': '75vh',
        '1/5': '20vh',
        '2/5': '40vh',
        '3/5': '60vh',
        '4/5': '80vh',
        '65vh': '65vh',
      },
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
  ],
}

