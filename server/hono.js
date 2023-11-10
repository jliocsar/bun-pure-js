import { serveStatic } from 'hono/bun'

/** @typedef {import('hono').Context} Context */
/** @typedef {import('hono').Next} Next */
/** @typedef {import('hono').Hono} App */
/** @typedef {(app: App) => void} Routes */
/** @typedef {(ctx: Context, next: Next) => Promise<Response>} AsyncHandler */
/** @typedef {(ctx: Context, next: Next) => Response} Handler */

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
 * @param {App} app - Hono instance
 * @param {(new () => Controller)[]} controllers - List of controllers
 * @returns Decorated app
 */
export function withControllers(app, controllers) {
  for (const Controller of controllers) {
    new Controller().routes(app)
  }
  return app
}

/**
 * Serves a static page from its path based on `static/pages`
 * @param {string} path - Path to the page
 * */
export function serveStaticPage(path) {
  return serveStatic({ path: `./pages/${path}` })
}
