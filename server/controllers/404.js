import * as H from '../hono.js'
import { Layout } from '../layout.js'

export class FourOhFour extends H.Controller {
  /** @type {H.TRoutes} */
  routes(app) {
    app.get('*', this.#index)
  }

  /** @type {H.THandler} */
  #index(ctx) {
    ctx.status(400)
    return ctx.html(
      Layout({
        title: '404',
        content: H.html`
          <h1>404</h1>
          <p>Page not found</p>
        `,
      }),
    )
  }
}
