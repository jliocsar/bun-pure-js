import { Router } from './hono'
import { Index } from './controllers/index.js'
import { FourOhFour } from './controllers/404.js'

export const router = new Router([Index, FourOhFour])
