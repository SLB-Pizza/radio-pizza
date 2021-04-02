import React, { Fragment } from 'react'
import { Link } from 'gatsby'

/**
 * Renders a section title and maps over the edges array to render links and descriptions in the section.
 * @function SamplesAdminContent
 * @param {Object} section
 * @prop {String} section.titling - the section title
 * @prop {Object[]} section.pages - array of page objects
 * @prop {String} section.pages.linkURL - the url to link out to
 * @prop {String} section.pages.linkLabel - the label for the anchor tag
 * @prop {String} section.pages.linkBlurb -  one-line description of the sample page
 * @returns {jsx}
 */
export default function SamplesAdminContent({ section }) {
  const { titling, pages } = section

  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-12 content">
        <h2 className="title is-4">{titling}</h2>
      </div>
      {pages.map(({ linkURL, linkLabel, linkBlurb }, index) => (
        <Fragment key={`link-and-details-${index}`}>
          <div className="column is-3 content">
            <Link to={linkURL} className="text-block">
              {linkLabel}
            </Link>
          </div>
          <div className="column content">
            <p>{linkBlurb}</p>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
