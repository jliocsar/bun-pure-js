import * as marked from 'marked'
import { Layout } from '../layout.js'
import * as H from '../hono.js'
import { Icon } from '../components/icon-component.js'

export class Index extends H.Controller {
  /** @type {string} */
  #readme = ''
  /** @type {{ icon: string; name: string; description: string; url: string; wip?: true }[]} */
  #projects = [
    {
      icon: '\ud83e\uddfc',
      name: 'better-ts-errors',
      description:
        'A parser and formatter for visualizing a simplified version of TS errors.',
      url: 'https://github.com/jliocsar/better-ts-errors',
    },
    {
      icon: '\ud83c\udccf',
      name: 'jstr',
      description: 'Simple JavaScript CLI tool to read and parse JSON files.',
      url: 'https://github.com/jliocsar/jstr',
    },
    {
      icon: '\u26a1',
      name: 'pipet',
      description:
        'Zero dependency script-running framework for Bun & Node.js.',
      url: 'https://github.com/jliocsar/pipet',
    },
    {
      icon: '\ud83d\udcd4',
      name: 'notiz',
      description: 'Tiny CLI tool to manage notes.',
      url: 'https://github.com/jliocsar/notiz',
    },
    {
      icon: '\ud83e\ude78',
      name: 'elizabeth',
      description: 'BETH stack boilerplate.',
      url: 'https://github.com/jliocsar/elizabeth',
      wip: true,
    },
  ]

  /** @type {H.Routes} */
  routes(app) {
    app.get('/', this.#index.bind(this))
  }

  /** @type {H.AsyncHandler} */
  async #index(ctx) {
    await this.#fetchAndParseReadme()
    return ctx.render(
      <Layout title="jliocsar" style="index">
        <header>
          <div class="godrays-container">
            <div class="godrays"></div>
          </div>
          <h1>jliocsar</h1>
          <nav>
            <a
              target="_blank"
              href="https://github.com/jliocsar"
              aria-label="link to github"
            >
              <Icon id="github" width={24} height={24} />
            </a>
            <a
              target="_blank"
              href="https://linkedin.com/in/jliocsar"
              aria-label="link to linkedin profile"
            >
              <Icon id="linkedin" width={24} height={24} />
            </a>
          </nav>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{ __html: this.#readme }} />
          <h2>Projects</h2>
          <ul>
            {this.#projects.map(project => (
              <li>
                <div class="project-title">
                  <i>{project.icon}</i>
                  <a target="_blank" href={project.url}>
                    {project.name}
                  </a>
                </div>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        </main>
        <footer>
          <small>
            created with{' '}
            <a target="_blank" href="https://hono.dev/">
              hono
            </a>{' '}
            &{' '}
            <a target="_blank" href="https://bun.sh/">
              bun
            </a>
          </small>
        </footer>
      </Layout>,
    )
  }

  async #fetchAndParseReadme() {
    if (this.#readme) return
    const response = await fetch(
      'https://raw.githubusercontent.com/jliocsar/jliocsar/master/README.md',
    )
    const readme = await response.text()
    // remove links from readme for now
    const cleaned = readme.replace(/\[.+/g, '').trim()
    const parsed = marked.parse(cleaned)
    this.#readme = parsed
  }
}
