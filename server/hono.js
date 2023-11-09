import { serveStatic } from 'hono/bun'

/** @typedef {import('hono').Context} TContext */
/** @typedef {import('hono').Next} TNext */
/** @typedef {import('hono').Hono} TApp */
/** @typedef {(app: TApp) => void} TRoutes */
/** @typedef {(c: TContext, next: TNext) => Promise<Response>} TAsyncHandler */
/** @typedef {(c: TContext, next: TNext) => Response} THandler */

export { html } from '../static/html.js'

export class Controller {
  /**
   * Applies routes to the Hono app
   * @abstract
   * @type {TRoutes}
   * */
  routes(_app) {
    throw new Error('routes() must be implemented!')
  }
}

/**
 * Decorates the Hono app with controllers
 * @param {TApp} app - Hono instance
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
  return serveStatic({ path: `./static/pages/${path}` })
}
