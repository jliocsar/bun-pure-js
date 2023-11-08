import { defineConfig, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  cli: {
    entry: {
      outFile: 'static/style.css',
      patterns: ['static/**/*.{html,js}', 'server/**/*.{html,js}'],
    },
  },
})
