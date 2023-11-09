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

function applyNormalize() {
  logInfo('Applying \x1b[33mnormalize.css\x1b[0m')
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
    fs.writeFileSync(normalizePath, normalize)
  }
  const unocss = fs.readFileSync(stylesCssPath, {
    encoding: 'utf-8',
  })
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
  spawned.on('close', applyNormalize)
  if (spawned.stdout) {
    spawned.stdout.on('data', async (/** @type {Buffer} */ buffer) => {
      const data = buffer.toString()
      process.stdout.write(data)
    })
  }
  if (isWatching) {
    const WATCH_INTERVAL = 100
    /** @type {NodeJS.Timeout | null} */
    let timeout
    /** @type {number} */
    let lastWrite = 0
    fs.watchFile(stylesCssPath, { interval: WATCH_INTERVAL }, stats => {
      if (!timeout && lastWrite + WATCH_INTERVAL * 5 < Date.now()) {
        logInfo('CSS file changed, rebuilding...')
        applyNormalize()
        timeout = setTimeout(() => (timeout = null), WATCH_INTERVAL * 5)
        lastWrite = stats.mtimeMs
      }
    })
  }
}

build()
