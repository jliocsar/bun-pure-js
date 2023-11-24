export function encoding(
  /** @type {{ encoding: 'gzip' }} */ options = { encoding: 'gzip' },
) {
  /** @type {import('hono').Handler} */
  return async (ctx, next) => {
    await next()
    const body = ctx.res.body
    if (!body) {
      return
    }
    const arrayBuffer = await Bun.readableStreamToArrayBuffer(body)
    const buffer = Buffer.from(arrayBuffer)
    ctx.res = new Response(Bun.gzipSync(buffer), ctx.res)
    ctx.res.headers.delete('Content-Length')
    ctx.res.headers.set('Content-Encoding', options.encoding)
  }
}
