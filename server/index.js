import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { Index } from './controllers/index.js'
import { FourOhFour } from './controllers/404.js'
import * as H from './hono.js'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
H.withControllers(app, [Index, FourOhFour])

// apply 404 route
app.get('*', H.serveStaticPage('404.html'))

export default app
