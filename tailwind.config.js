/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:  {
        'blue-50': '#2486F5',
        'blue-main': '#0B77F0',
        'white': "#FFFFFF",
        'blue-80': "#063C7A",
        'wb-40': "#A6A6A6",
        'blue-90': "#032449"
      },
      fontFamily: {
        'Archivo_Regular': ['Archivo-Regular'],
        'Archivo-Bold': ['Archivo-Bold'],
        'droid': ['droid'],
        'droidbold': ['droidbold']
      },
      backgroundImage: {
        "bg-sky": "url('./assets/Background.png')",
        "overlay": "url('./assets/Overlay.png')"
      }
    },
  },
  plugins: [],
}

