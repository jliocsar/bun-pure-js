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
  let index = 0
  do {
    const part = parts[index]
    const value = values[index]
    if (value) {
      markup += part + value
    } else {
      markup += part
    }
    index++
  } while (index < totalParts)
  return markup
}
