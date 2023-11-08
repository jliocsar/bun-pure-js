import { html } from './hono.js'

/**
 * @typedef {{
 *  title?: string;
 *  script?: string;
 *  content?: string
 * }} TProps
 * */

export function Layout(/** @type {TProps} */ props) {
  if (!props?.content) {
    throw new Error('Content is required!')
  }
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script defer src="https://unpkg.com/htmx.org"></script>
        <script defer type="module" src="static/app.js"></script>
        ${props.script
          ? html`<script
              defer
              type="module"
              src="static/pages/${props.script}.js"
            ></script>`
          : null}
        <link rel="stylesheet" href="static/style.css" />
        <title>${props.title || 'Hono'}</title>
      </head>
      <body class="my-0">
        ${props.content}
      </body>
    </html>
  `
}
