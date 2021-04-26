import React from 'react'
import { Link } from 'gatsby'

/**
 *
 *
 * @export
 * @param {*} headline
 * @param {*} blurb
 * @param {*} linkURL
 * @param {*} linkBtnText
 * @param {*} itemsToMap
 * @param {*} layout
 * @param {*} ItemComponent
 * @returns
 */
export default function StickyItemsLayout({
  headline,
  blurb,
  linkURL,
  linkBtnText,
  itemsToMap,
  layout,
  ItemComponent,
}) {
  return (
    <section className="section container is-fluid" id="home-mixes">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section content">
            {headline && <h3 className="title">{headline}</h3>}
            {blurb && <p className="subtitle">{blurb}</p>}
            <Link to={linkURL}>
              <button className="button is-outlined is-rounded">
                {linkBtnText}
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {itemsToMap?.map(({ node }, index) => (
              <ItemComponent
                key={`${linkBtnText}-404-desktop-#${index}`}
                data={node}
                columnLayout={layout}
              />
            ))}
          </div>
        </div>
      </div>
      {/* TOUCH */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          {headline && <h3 className="title is-4">{headline}</h3>}
          {blurb && <p className="subtitle is-6">{blurb}</p>}
        </div>
        <div className="column is-narrow">
          <Link to={linkURL}>
            <button className="button is-small is-outlined is-rounded">
              {linkBtnText}
            </button>
          </Link>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {itemsToMap?.map(({ node }, index) => (
          <ItemComponent
            key={`${linkBtnText}-404-mobile-#${index}`}
            data={node}
            columnLayout={layout}
          />
        ))}
      </div>
    </section>
  )
}
