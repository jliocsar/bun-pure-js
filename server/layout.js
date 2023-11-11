import * as H from './hono.js'

/**
 * @typedef {{
 *  content: string
 *  title?: string
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
        <script defer src="https://unpkg.com/htmx.org"></script>
        <script defer type="module" src="static/app.js"></script>
        ${
          props.script
            ? H.html`<script
                defer
                type="module"
                src="static/pages/${props.script}.js"
              ></script>`
            : null
        }
        <link rel="stylesheet" href="static/style.css" />
        <title>${props.title || 'Hono demo'}</title>
      </head>
      <body>
        ${props.content}
      </body>
    </html>
  `
}
