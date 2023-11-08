import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
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
