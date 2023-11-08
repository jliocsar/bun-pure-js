import { html, def } from '../../html.js'

export class MyIndexComponent extends HTMLElement {
  static name = /** @type {const} */ ('my-index-component')

  constructor() {
    super()
    this.innerHTML = html` <p>This is an ${'index'} only component.</p> `
  }
}

def(MyIndexComponent)
