import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { serveStaticPage } from './hono.js'
import { router } from './router.js'
import { cache, encoding } from './middlewares'

const app = new Hono()

app.use('*', cache(), encoding())
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './static/favicon.ico' }))
router.applyRoutes(app)
app.get('*', serveStaticPage('404.html'))

export default app
