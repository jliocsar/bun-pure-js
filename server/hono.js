import { serveStatic } from 'hono/bun'

/** @typedef {import('hono').Context} Context */
/** @typedef {import('hono').Handler} Handler */
/** @typedef {import('hono').Hono} Hono */
/** @typedef {(app: Hono) => void} Routes */

export { html } from '../static/html.js'

export class Controller {
  /**
   * Applies routes to the Hono app
   * @abstract
   * @type {Routes}
   * */
  routes(_app) {
    throw new Error('routes() must be implemented!')
  }
}

/**
 * Decorates the Hono app with controllers
 * @param {Hono} app - Hono instance
 * @param {Array<Controller>} controllers
 * @returns Decorated app
 */
export function withControllers(app, controllers) {
  for (const Controller of controllers) {
    new Controller().routes(app)
  }
  return app
}

export function serveStaticPage(path) {
  return serveStatic({ path: `./static/pages/${path}` })
}
