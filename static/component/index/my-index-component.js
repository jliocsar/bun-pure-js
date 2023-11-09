import { html, def } from '../../html.js'

export class MyIndexComponent extends HTMLElement {
  static tag = /** @type {const} */ ('my-index-component')

  constructor() {
    super()
    this.innerHTML = html`
      <p class="font-sans">This is an ${'index'} only component.</p>
    `
  }
}

def(MyIndexComponent)
