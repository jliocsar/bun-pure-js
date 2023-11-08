import { Controller, html } from '../hono.js'
import { Layout } from '../layout.js'

/** @typedef {import('../hono.js').Routes} Routes */
/** @typedef {import('../hono.js').Handler} Handler */

export class FourOhFour extends Controller {
  /** @type {Routes} */
  routes(app) {
    app.get('*', this.#index)
  }

  /** @type {Handler} */
  #index(ctx) {
    ctx.status(400)
    return ctx.html(
      Layout({
        title: '404',
        content: html`
          <h1>404</h1>
          <p>Page not found</p>
        `,
      }),
    )
  }
}
