import { def, html } from '../html.js'

export class MyComponent extends HTMLElement {
  static tag = /** @type {const} */ ('my-component')

  constructor() {
    super()
    this.innerHTML = html`
      <div class="bg-gray-900 text-white p-2">
        <h1>Hello ${this.innerHTML || 'world'}</h1>
        <button hx-post="/click-me" hx-swap="innerHTML">Click Me</button>
      </div>
    `
  }
}

def(MyComponent)
