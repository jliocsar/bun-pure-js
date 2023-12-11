export function cache() {
  const cached = new Map()

  /** @type {import('hono').Handler} */
  return async (ctx, next) => {
    if (process.env.NODE_ENV === 'development') {
      return next()
    }
    const key = ctx.req.url
    let response = cached.get(key)
    if (response) {
      return new Response(response.body, response)
    }
    await next()
    if (!ctx.res.ok) {
      return
    }
    ctx.res.headers.set('Cache-Control', 'max-age=31536000, immutable')
    response = ctx.res.clone()
    cached.set(key, response)
  }
}
