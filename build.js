import * as path from 'node:path'
import * as childProcess from 'node:child_process'
import * as fs from 'node:fs'

const isWatching = process.argv.includes('--watch')
const stylesCssPath = path.resolve(__dirname, 'static/style.css')
const normalizePath = '/tmp/_normalize.css'
let normalize = ''

function logInfo(/** @type {string} */ message) {
  process.stdout.write('\x1b[34mℹ\x1b[0m ' + message + '\n')
}

async function applyNormalize() {
  logInfo('Applying \x1b[33mnormalize.css\x1b[0m')
  const unocss = fs.readFileSync(stylesCssPath, {
    encoding: 'utf-8',
  })
  if (fs.existsSync(normalizePath)) {
    normalize = fs.readFileSync(normalizePath, 'utf-8')
  } else {
    normalize = childProcess.spawnSync(
      'curl',
      ['-sS', 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'],
      {
        encoding: 'utf-8',
      },
    ).stdout
  }
  fs.writeFileSync(stylesCssPath, normalize + '\n' + unocss)
  logInfo('Done!')
}

function build() {
  logInfo(
    isWatching
      ? 'Starting \x1b[33munocss\x1b[0m in watch mode...'
      : 'Building CSS for production...',
  )
  const spawned = childProcess.spawn('bunx', [
    'unocss',
    isWatching ? '--watch' : '',
  ])
  process.on('exit', () => {
    spawned.kill()
  })
  if (spawned.stdout) {
    spawned.stdout.on('data', async (/** @type {Buffer} */ buffer) => {
      const data = buffer.toString()
      if (/(change[sd]?|generated)/i.test(data)) {
        process.nextTick(applyNormalize)
      }
      process.stdout.write(data)
    })
  }
}

build()
