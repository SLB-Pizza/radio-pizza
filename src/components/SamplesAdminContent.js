import React, { Fragment } from 'react'
import { Link } from 'gatsby'

/**
 *
 *
 * @function SamplesAdminContent
 * @param {Object} section
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
