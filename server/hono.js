import { serveStatic } from 'hono/bun'

/** hono types
 * @typedef {import('hono').Next} Next
 * @typedef {import('hono').Context} Context
 * @typedef {import('hono').Hono} App
 * @typedef {import('hono/jsx').Child} Child
 * @typedef {(app: App) => void} Routes
 * @typedef {(ctx: Context, next: Next) => Response | Promise<Response>} Handler
 * @typedef {(ctx: Context, next: Next) => Promise<Response>} AsyncHandler
 */
/** hono/jsx types
 * @typedef {P & { children?: Child[] }} PropsWithChild
 * @template {Record<string, any>} P
 */

export class Router {
  /** @type {(new () => Controller)[]} */
  #controllers = []

  constructor(/** @type {(new () => Controller)[]} */ controllers) {
    this.#controllers = controllers
  }

  /**
   * Decorates the Hono app with controllers
   * @param {App} app - Hono instance
   * @returns Decorated app
   */
  applyRoutes(app) {
    for (const Controller of this.#controllers) {
      const controller = new Controller()
      controller.routes(app)
    }
    return app
  }
}

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
 * Serves a static page from its path based on `static/pages`
 * @param {string} path - Path to the page
 * */
export function serveStaticPage(path) {
  return serveStatic({ path: `./pages/${path}` })
}
