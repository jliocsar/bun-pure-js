import * as H from '../hono.js'
import { Layout } from '../layout.js'

export class About extends H.Controller {
  /** @type {H.Routes} */
  routes(app) {
    app.get('/about', this.#index)
  }

  /** @type {H.Handler} */
  #index(ctx) {
    return ctx.html(
      Layout({
        title: 'About',
        content: H.html`
          <main>About</main>
        `,
      }),
    )
  }
}
