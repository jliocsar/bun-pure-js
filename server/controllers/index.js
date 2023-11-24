import { client } from '../db/client.js'
import { Layout } from '../layout.js'
import * as H from '../hono.js'

export class Index extends H.Controller {
  /** @type {H.Routes} */
  routes(app) {
    app.get('/', this.#index.bind(this))
    app.post('/click-me', this.#clickMe.bind(this))
  }

  /** @type {H.AsyncHandler} */
  async #index(ctx) {
    const tenant = ctx.req.header('x-tenant') ?? 'default'
    const thingies = await this.#listThingies(tenant)
    return ctx.html(
      Layout({
        script: 'index',
        content: H.html`
          <main>
            <my-component my-attr="420"></my-component>
            <my-index-component></my-index-component>
            <ul>
              ${thingies.map(thingy => H.html`<li>${thingy.name}</li>`)}
            </ul>
          </main>
        `,
      }),
    )
  }

  /** @type {H.Handler} */
  #clickMe(ctx) {
    return ctx.html(H.html`<p>cLICKED mA homie!!!</p>`)
  }

  async #listThingies(/** @type {string} */ tenant) {
    const thingies = await client
      .db(tenant)
      .collection('thingies')
      .find()
      .toArray()
    return thingies
  }
}
