import { Router } from './hono'
import { Index } from './controllers/index.js'
import { About } from './controllers/about.js'
import { FourOhFour } from './controllers/404.js'

export const router = new Router([Index, About, FourOhFour])
