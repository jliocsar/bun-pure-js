import { def, html } from '../html.js'

export class MyComponent extends HTMLElement {
  static tag = /** @type {const} */ ('my-component')

  constructor() {
    super()
    const attr = this.getAttribute('my-attr')
    this.innerHTML = html`
      <header class="bg-gray-900 text-white p-2">
        <h1 class="font-sans">Hello ${attr || 'world'}</h1>
        <button hx-post="/click-me" hx-swap="innerHTML">Click Me</button>
      </header>
    `
  }
}

def(MyComponent)
