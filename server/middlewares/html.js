export function html() {
  /** @type {import('hono').Handler} */
  return async (ctx, next) => {
    await next()
    const body = ctx.res.body
    if (!body) {
      return
    }
    let bodyContent = await Bun.readableStreamToText(body)
    bodyContent = `<!DOCTYPE html>${bodyContent}`
    ctx.res = new Response(bodyContent, ctx.res)
    ctx.res.headers.delete('Content-Length')
  }
}
