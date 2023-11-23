import { client } from '../db/client.js'
import { Layout } from '../layout.js'
import * as H from '../hono.js'

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
          <main>
            <my-component my-attr="420"></my-component>
            <my-index-component></my-index-component>
            <div hx-get="/fetch-db" hx-trigger="load" hx-swap="outerHTML"></div>
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
    const tenant = ctx.req.header('x-tenant') ?? 'default'
    const thingies = await client
      .db(tenant)
      .collection('thingies')
      .find()
      .toArray()
    return ctx.html(H.html`<p>${JSON.stringify(thingies)}</p>`)
  }
}
