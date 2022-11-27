module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './components/Navbar.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        ilyas: ['ilyas', 'cursive'],
      },
      transparent: 'transparent',
      colors: {
        pureblack: '#100F10',
        background: '#191819',
        secondbackground: '#232123',
        textwhite: '#FFFFFF',
        textcolor: '#F4F3F4',
        textsecond: '#818081',
        bordercolor: '#383638',
      },
    },
  },
  variants: {},
  plugins: [],
}
