import * as H from '../hono.js'
import { Layout } from '../layout.js'

export class Index extends H.Controller {
  /** @type {H.Routes} */
  routes(app) {
    app.get('/', this.#index)
    app.get('/fetch-db', this.#fetchDb)
    app.post('/click-me', this.#clickMe)
  }

  /** @type {H.AsyncHandler} */
  async #index(ctx) {
    return ctx.html(
      Layout({
        script: 'index',
        content: H.html`
          <main class="flex flex-col bg-gray-700">
            <my-component my-attr="420"></my-component>
            <my-index-component></my-index-component>
          </main>
        `,
      }),
    )
  }

  /** @type {H.Handler} */
  #clickMe(ctx) {
    return ctx.html(H.html`<p>cLICKED mA homie!!!</p>`)
  }

  /** @type {H.AsyncHandler} */
  async #fetchDb(ctx) {
    const data = [
      {
        id: 1,
        name: 'JC',
      },
    ]
    return ctx.html(H.html`<p>${JSON.stringify(data)}</p>`)
  }
}
