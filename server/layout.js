import * as H from './hono.js'

/**
 * @typedef {H.PropsWithChild<{
 *  title?: string
 *  style?: string
 *  script?: string
 * }>} TProps
 * */

export function Layout(/** @type {TProps} */ props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="jliocsar's personal website" />
        <meta name="author" content="jliocsar" />
        <script type="module" src="static/app.js"></script>
        <link rel="stylesheet" href="static/styles/global.css" />
        {props.style ? (
          <link rel="stylesheet" href={`static/styles/${props.style}.css`} />
        ) : null}
        {props.script ? (
          <script
            defer
            type="module"
            src={`static/pages/${props.script}.js`}
          ></script>
        ) : null}
        <title>{props.title || 'Default'}</title>
      </head>
      <body>
        <div class="container">{props.children}</div>
      </body>
    </html>
  )
}
