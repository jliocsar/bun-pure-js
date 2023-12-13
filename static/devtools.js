import './external/axe.min.js'

axe
  .run()
  .then(results => {
    if (results.violations.length) {
      console.error('Accessibility issues found')
      return console.table(results.violations)
    }
    console.info('No accessibility issues found')
  })
  .catch(err => {
    console.error('Something bad happened:', err.message)
  })
