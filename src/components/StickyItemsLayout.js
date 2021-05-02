import React from 'react'
import { Link } from 'gatsby'

/**
 * Renders a Sticky Layout section for fetched content on {@link IndexPage} and {@link NotFoundPage}.
 * @category Layout Helper
 * @function StickyItemsLayout
 * @param {String} headline - the label for this section
 * @param {String} blurb - short description to give the user context
 * @param {String} linkURL - content landing page to navigate to
 * @param {String} linkBtnText - label for the button that takes you to `/linkURL/`
 * @param {Object[]} itemsToMap - data from Prismic received from /index; original data set in Prismic Homepage document
 * @param {Function} ItemComponent - React layout component to use when mapping `itemsToMap`
 * @param {String} layout - dictates layout for `ItemComponent`
 * @returns {jsx}
 */
export default function StickyItemsLayout({
  headline,
  blurb,
  linkURL,
  linkBtnText,
  itemsToMap,
  ItemComponent,
  layout,
}) {
  return (
    <section className="section container is-fluid sticky-items">
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
      <div className="columns is-mobile is-hidden-desktop sticky-scroll-items">
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
