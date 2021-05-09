import React from 'react'

export default function AboutPageCredits() {
  return (
    <section className="section container">
      <div className="columns is-mobile">
        <div className="column context text-block">
          <p className="title is-size-5">Design</p>
          <p className="subtitle is-size-6">
            <a
              href="mailto:christian@christianmejia.dev?subject=Hello!&body=I saw your work as designer and developer for Half Moon and wanted to contact you for information about hiring you for a project."
              rel="noopener"
              target="_blank"
            >
              Christian Mejia
            </a>
          </p>
        </div>
        <div className="column context text-block">
          <p className="title is-size-5">Programming</p>
          <p className="subtitle is-size-6">
            <a
              href="mailto:christian@christianmejia.dev?subject=Hello!&body=I saw your work as designer and developer for Half Moon and wanted to contact you for information about hiring you for a project."
              rel="noopener"
              target="_blank"
            >
              Christian Mejia
            </a>
            {' · '}
            <a
              href="https://www.richarddominguez.dev/"
              rel="noopener"
              target="_blank"
            >
              Richard Dominguez
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
