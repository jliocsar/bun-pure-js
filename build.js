import * as path from 'node:path'
import * as childProcess from 'node:child_process'
import * as fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const NORMALIZE_INITIAL_BUFFER_BYTES_SIZE = 0x10
const NORMALIZE_FILE_PATH = '/tmp/_normalize.css'

class Normalize {
  constructor() {
    this.content = ''
    this.byteLength = 0
    this.firstChunks = Buffer.alloc(NORMALIZE_INITIAL_BUFFER_BYTES_SIZE)
  }
}

class Builder {
  #normalize = new Normalize()
  #dirname = path.dirname(fileURLToPath(import.meta.url))
  #stylesCssPath = path.resolve(this.#dirname, 'static/style.css')
  isWatching = process.argv.includes('--watch')

  async readStylesFileHead(bytes = NORMALIZE_INITIAL_BUFFER_BYTES_SIZE) {
    const stream = fs.createReadStream(this.#stylesCssPath, {
      start: 0,
      end: bytes - 1,
    })
    for await (const head of stream) {
      return head
    }
  }

  findNormalize() {
    if (fs.existsSync(NORMALIZE_FILE_PATH)) {
      this.#normalize.content = fs.readFileSync(NORMALIZE_FILE_PATH, 'utf-8')
    } else {
      this.#normalize.content = childProcess.spawnSync(
        'curl',
        ['-sS', 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'],
        {
          encoding: 'utf-8',
        },
      ).stdout
      fs.writeFileSync(NORMALIZE_FILE_PATH, this.#normalize.content)
    }
    if (this.isWatching) {
      const buffer = Buffer.from(this.#normalize.content)
      const byteLength = buffer.byteLength
      this.#normalize.byteLength = byteLength
      let idx = 0
      while (idx < byteLength) {
        this.#normalize.firstChunks[idx] = buffer[idx]
        idx++
      }
    }
  }

  applyNormalize() {
    this.logInfo('Applying \x1b[33mnormalize.css\x1b[0m')
    fs.writeFileSync(
      this.#stylesCssPath,
      this.#normalize.content + '\n' + unocssContent,
    )
    this.logInfo('Done!')
  }

  watchStylesChanges() {
    let first = true
    fs.watchFile(this.#stylesCssPath, { interval: 128 }, async stats => {
      const head = await this.readStylesFileHead()
      if (first || Buffer.compare(head, this.#normalize.firstChunks) !== 0) {
        this.logInfo('CSS file changed, rebuilding...')
        this.applyNormalize()
        first = false
      }
    })
  }

  logInfo(/** @type {string} */ message) {
    process.stdout.write('\x1b[34mℹ\x1b[0m ' + message + '\n')
  }

  logError(/** @type {string} */ message) {
    process.stdout.write('\x1b[31m✘\x1b[0m ' + message + '\n')
  }
}

let unocssContent = ''

function build() {
  const builder = new Builder()
  if (builder.isWatching) {
    builder.logInfo('Starting \x1b[33munocss\x1b[0m in watch mode...')
  } else {
    builder.logInfo('Building CSS for production...')
    console.time('built in')
  }
  const unocss = childProcess.spawn('bunx', [
    'unocss',
    builder.isWatching ? '--watch' : '',
  ])
  if (unocss.stdout) {
    unocss.stdout.on('data', (/** @type {Buffer} */ buffer) => {
      const data = buffer.toString()
      process.stdout.write(data)
    })
  }
  builder.findNormalize()
  if (builder.isWatching) {
    builder.watchStylesChanges()
  } else {
    unocss.on('exit', code => {
      if (!code) {
        builder.logInfo('CSS built successfully!')
        builder.applyNormalize()
      } else {
        builder.logError('CSS build failed!')
      }
      console.timeEnd('built in')
    })
  }
}

build()
