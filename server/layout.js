import * as H from './hono.js'

/**
 * @typedef {{
 *  content: string
 *  title?: string
 *  style?: string
 *  script?: string
 * }} TProps
 * */

export function Layout(/** @type {TProps} */ props) {
  if (!props?.content) {
    throw new Error('Content is required!')
  }
  return H.html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module" src="static/app.js"></script>
        <link rel="stylesheet" href="static/styles/global.css" />
        ${
          props.style
            ? H.html`<link
                rel="stylesheet"
                href="static/styles/${props.style}.css"
              />`
            : null
        }
        ${
          props.script
            ? H.html`<script
                defer
                type="module"
                src="static/pages/${props.script}.js"
              ></script>`
            : null
        }
        <title>${props.title || 'Hono demo'}</title>
      </head>
      <body>
        ${props.content}
      </body>
    </html>
  `
}
