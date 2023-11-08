import { Controller, html } from '../hono.js'
import { Layout } from '../layout.js'

/** @typedef {import('../hono.js').Handler} Handler */
/** @typedef {import('../hono.js').Routes} Routes */

export class Index extends Controller {
  /** @type {Routes} */
  routes(app) {
    app.get('/', this.#index)
    app.get('/fetch-db', this.#fetchDb)
    app.post('/click-me', this.#clickMe)
  }

  /** @type {Handler} */
  async #index(ctx) {
    return ctx.html(
      Layout({
        script: 'index',
        content: html`
          <my-component my-attr="420"></my-component>
          <my-index-component></my-index-component>
        `,
      }),
    )
  }

  /** @type {Handler} */
  #clickMe(ctx) {
    return ctx.html(html`<p>cLICKED mA homie!!!</p>`)
  }

  /** @type {Handler} */
  async #fetchDb(ctx) {
    const data = [
      {
        id: 1,
        name: 'JC',
      },
    ]
    return ctx.html(html`<p>${JSON.stringify(data)}</p>`)
  }
}
