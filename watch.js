/// <reference types="bun-types" />

import * as path from 'node:path'
import * as fs from 'node:fs'

const NORMALIZE_INITIAL_BUFFER_BYTES_SIZE = 0x10
const NORMALIZE_FILE_PATH = '/tmp/_normalize.css'

class Normalize {
  constructor() {
    this.content = ''
    this.byteLength = 0
    this.firstChunks = Buffer.alloc(NORMALIZE_INITIAL_BUFFER_BYTES_SIZE)
    /** @type {import('bun').BunFile | null} */
    this.file = null
  }
}

class Watcher {
  #normalize = new Normalize()
  #stylesCssPath = path.resolve(import.meta.dir, 'static/style.css')
  #watchInterval = 64
  isWatching = process.argv.includes('--watch')

  async readStylesFileHead(bytes = NORMALIZE_INITIAL_BUFFER_BYTES_SIZE) {
    const stream = fs.createReadStream(this.#stylesCssPath, {
      start: 0,
      end: bytes - 1,
    })
    return stream[Symbol.asyncIterator]().next()
  }

  async findNormalize() {
    if (this.#normalize.content) {
      return this.#normalize.content
    }
    if (this.#normalize.file) {
      this.#normalize.content = await this.#normalize.file.text()
    } else {
      this.#normalize.file = Bun.file(NORMALIZE_FILE_PATH)
      const writer = this.#normalize.file.writer()
      const { stdout } = Bun.spawnSync([
        'curl',
        '-sS',
        'https://necolas.github.io/normalize.css/8.0.1/normalize.css',
      ])
      writer.write(stdout)
      this.#normalize.content = stdout.toString()
      await writer.end()
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

  async applyNormalize() {
    this.logInfo('Applying \x1b[33mnormalize.css\x1b[0m')
    const file = Bun.file(this.#stylesCssPath)
    const writer = file.writer()
    const unocssContent = await file.text()
    writer.write(this.#normalize.content + '\n' + unocssContent)
    await writer.end()
    this.logInfo('Done!')
  }

  watchStylesChanges() {
    let first = true
    fs.watchFile(
      this.#stylesCssPath,
      { interval: this.#watchInterval },
      async () => {
        const { value: head } = await this.readStylesFileHead()
        if (first || Buffer.compare(head, this.#normalize.firstChunks) !== 0) {
          this.logInfo('CSS file changed, rebuilding...')
          await this.applyNormalize()
          first = false
        }
      },
    )
  }

  logInfo(/** @type {string} */ message) {
    process.stdout.write('\x1b[34mℹ\x1b[0m ' + message + '\n')
  }

  logError(/** @type {string} */ message) {
    process.stdout.write('\x1b[31m✘\x1b[0m ' + message + '\n')
  }
}

async function watch() {
  const watcher = new Watcher()
  await watcher.findNormalize()
  if (watcher.isWatching) {
    watcher.watchStylesChanges()
  } else {
    await watcher.applyNormalize()
  }
}

await watch()
