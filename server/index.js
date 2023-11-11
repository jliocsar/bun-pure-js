import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { serveStaticPage } from './hono.js'
import { router } from './router.js'
import { client } from './db/client.js'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './static/favicon.ico' }))
router.applyRoutes(app)
app.get('*', serveStaticPage('404.html'))

if (process.env.NODE_ENV === 'development') {
  console.info('Server started at http://localhost:3000')
}

export default app
