import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { serveStaticPage, withControllers } from './hono.js'
import { Index } from './controllers/index.js'
import { FourOhFour } from './controllers/404.js'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
withControllers(app, [Index, FourOhFour])

// apply 404 route
app.get('*', serveStaticPage('404.html'))

export default app
