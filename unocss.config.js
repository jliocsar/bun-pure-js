import { defineConfig, presetUno, presetWebFonts, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
    presetUno({
      dark: 'class',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        mono: ['Fira Code'],
      },
    }),
  ],
  cli: {
    entry: {
      outFile: 'static/style.css',
      patterns: ['static/**/*.{html,js}', 'server/**/*.{html,js}'],
    },
  },
})
