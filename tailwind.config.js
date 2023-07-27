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
        'blue-90': "#032449",
        'blue-100': "#010C18",
        'wb-90': "#262626",
        'wb-100': "#0D0D0D",
        'blue-70': '#0855AB'
      },
      fontFamily: {
        'Archivo_Regular': ['Archivo-Regular'],
        'Archivo-Bold': ['Archivo-Bold'],
        'droid': ['droid'],
        'droidbold': ['droidbold'],
        'Archivo_thin': ['Archivo-thin'],
        'Archivo_Condensed-Black': ['Archivo_Condensed-Black'],
        'Inter_Regular': ['Inter_Regular']
      },
      backgroundImage: {
        "bg-sky": "url('./assets/Background.png')",
        "overlay": "url('./assets/Overlay.png')",
        "connect_wallet": "url('./assets/connectwalletbg.png')",
        "hover": "url('./assets/sidebar/hover.svg')"
      },
      gridTemplateColumns: {
        "custom": "minmax(468px, 1fr) minmax(350px, 1fr) minmax(250px, 1fr)"
      }
    },
  },
  plugins: [],
}

