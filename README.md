# pure-js

## Project structure

```
server/
├─ layout.js # HTMX layout for all pages
├─ index.js # Hono app entrypoint
├─ hono.js # Hono related utilities for route building
├─ router.js # Router with all controllers
├─ controllers/
│  ├─ page-controller.js # Handler returning a `Response` with html content
static/
├─ app.js # Entry point of all app available JS
├─ html.js # Utilities for html templating
├─ style.css # Output from `unocss + normalize.css` build
├─ components/
│  ├─ web-component.js
│  ├─ _regiter.js # Registers all app available components
│  ├─ page-folder/
│  │  ├─ page-web-component.js
├─ pages/
│  ├─ page-script.js
```

## To do

- [ ] 1 CSS per page instead of single global

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
