import * as path from 'node:path'
import * as childProcess from 'node:child_process'
import * as fs from 'node:fs'

const isWatching = process.argv.includes('--watch')
const stylesCssPath = path.resolve(import.meta.dir, 'static/style.css')
const normalizePath = '/tmp/_normalize.css'
const normalizeFile = Bun.file(normalizePath)
let normalize = ''

function logInfo(message) {
  process.stdout.write('\x1b[34mℹ\x1b[0m ' + message + '\n')
}

async function applyNormalize() {
  logInfo('Applying \x1b[33mnormalize.css\x1b[0m')
  const unocss = fs.readFileSync(stylesCssPath, {
    encoding: 'utf-8',
  })
  if (fs.existsSync(normalizePath) && normalize.length === 0) {
    normalize = await normalizeFile.text()
  } else {
    normalize = childProcess.spawnSync(
      'curl',
      ['-sS', 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'],
      {
        encoding: 'utf-8',
      },
    ).stdout
  }
  await Bun.write(stylesCssPath, normalize + '\n' + unocss)
  logInfo('Done!')
}

function build() {
  logInfo(
    isWatching
      ? 'Starting \x1b[33munocss\x1b[0m in watch mode...'
      : 'Building CSS for production...',
  )
  const spawned = childProcess.spawn(
    'bunx',
    ['unocss', isWatching ? '--watch' : ''],
    {
      encoding: 'utf-8',
    },
  )
  process.on('exit', () => {
    spawned.kill()
  })
  spawned.stdout.on('data', async buffer => {
    const data = buffer.toString()
    if (/(change[sd]?|production)/i.test(data)) {
      process.nextTick(applyNormalize)
    }
    process.stdout.write(data)
  })
}

build()
