import * as H from '../hono.js'

export class FourOhFour extends H.Controller {
  /** @type {H.Routes} */
  routes(app) {
    app.get('*', this.#index.bind(this))
  }

  /** @type {H.Handler} */
  #index(ctx) {
    return ctx.redirect('/')
  }
}
