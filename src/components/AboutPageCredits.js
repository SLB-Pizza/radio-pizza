import React from 'react'

export default function AboutPageCredits() {
  return (
    <section className="section container">
      <div className="columns is-mobile">
        <div className="column context text-block">
          <p className="title is-5">Design</p>
          <p className="subtitle is-7">
            <a href="https://christianmejia.dev" rel="noopener" target="_blank">
              Christian Mejia
            </a>
          </p>
        </div>
        <div className="column context text-block">
          <p className="title is-5">Programming</p>
          <p className="subtitle is-7">
            {/* <a href="https://christianmejia.dev" rel="noopener" target="_blank">
              Christian Mejia
            </a> */}
            {'Christian Mejia · '}
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
