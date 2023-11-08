import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  cli: {
    entry: {
      outFile: 'static/style.css',
      patterns: ['static/**/*.{html,js}', 'server/**/*.{html,js}'],
    },
  },
})
