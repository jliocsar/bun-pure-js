/**
 * @typedef {<T extends { name: string }, _N extends T['name'] = T['name'], O extends ElementDefinitionOptions = ElementDefinitionOptions>(Element: T, options?: O) => void} TDefine
 * */
/**
 * Alias typed version of `customElements.define`
 * @type {TDefine}
 * */
export function def(Element, options) {
  if (!('name' in Element)) {
    throw new Error('Element must have a static name property')
  }
  customElements.define(Element.name, Element, options)
}

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
