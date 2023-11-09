import * as H from '../hono.js'
import { Layout } from '../layout.js'

export class Index extends H.Controller {
  /** @type {H.TRoutes} */
  routes(app) {
    app.get('/', this.#index)
    app.get('/fetch-db', this.#fetchDb)
    app.post('/click-me', this.#clickMe)
  }

  /** @type {H.TAsyncHandler} */
  async #index(ctx) {
    return ctx.html(
      Layout({
        script: 'index',
        content: H.html`
          <my-component my-attr="420"></my-component>
          <my-index-component></my-index-component>
        `,
      }),
    )
  }

  /** @type {H.THandler} */
  #clickMe(ctx) {
    return ctx.html(H.html`<p>cLICKED mA homie!!!</p>`)
  }

  /** @type {H.TAsyncHandler} */
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
