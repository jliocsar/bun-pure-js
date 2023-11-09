/**
 * @typedef {<
 *  TParts extends TemplateStringsArray = TemplateStringsArray,
 *  TValues extends unknown[] = unknown[]
 * >(parts: TParts, ...values: TValues) => string} HtmlTag
 **/

/**
 * Alias typed version of `customElements.define`
 * @type {<
 *  E extends CustomElementConstructor & { tag: string },
 *  _T extends E['tag'] = E['tag'],
 *  O extends ElementDefinitionOptions = ElementDefinitionOptions
 * >(Element: E, options?: O) => void}
 */
export function def(Element, options) {
  customElements.define(Element.tag, Element, options)
}

/** @type {HtmlTag} */
export function html(parts, ...values) {
  const totalParts = parts.length
  let markup = ''
  let idx = 0
  do {
    const part = parts[idx]
    const value = values[idx]
    if (value) {
      markup += part + value
    } else {
      markup += part
    }
    idx++
  } while (idx < totalParts)
  return markup
}
