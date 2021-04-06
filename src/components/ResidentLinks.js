import React from 'react'
import { Link, path } from 'gatsby'
import { linkResolver } from '../utils'

/**
 * Returns a series of Gatsby Link elements, wrapped in their own span, collectively returned in either a `<p>` tag, or a `<span>` if `returnAsSpan` is passed in as `true.
 * @category Layout
 * @function ResidentLinks
 * @param {Object[]} residentsArr - Array of resident objects, each containing their _meta data to create links to their page and the resident's name
 * @param {String} currentPath - path data; received only from {@link ResidentTemplate} so the mix cards generated on that resident's page dont have links to the resident page they're already on
 * @param {?Boolean} residentsAsTitle - optionally passed by {@link SingleScheduledShowTitling}; used to change the wrapper `<p>` className
 * @param {?Boolean} returnAsSpan - returns all resident link spans wrapped in a `<span>` tag
 * @returns {jsx}
 */
export default function ResidentLinks({
  residentsArr,
  currentPath,
  residentsAsTitle,
  returnAsSpan,
}) {
  const wrapperClassStyling = residentsAsTitle
    ? 'title is-size-5-desktop is-size-6-touch has-text-centered text-block'
    : 'subtitle is-size-6-desktop is-size-7-touch has-text-centered text-block'

  const ResidentSpans = () => (
    <>
      {residentsArr.map(({ mix_resident }, index) => {
        let { _meta, resident_name } = mix_resident

        /**
         * Reverse engineer resident from UID by replacing hyphens with spaces.
         */
        if (!resident_name) {
          resident_name = _meta.uid.replace('-', ' ')
        }

        const linkTo = linkResolver(_meta)
        const linkLabel = resident_name

        /**
         * First if statement was riginally put in place for use with {@link SingleMixCard} and only used on {@link ResidentTemplate}. Currently disabled.
         */
        if (currentPath === linkTo) {
          if (index !== residentsArr.length - 1) {
            return (
              <span
                key={`res-link-${index}-${linkLabel}`}
              >{`${linkLabel}, `}</span>
            )
          } else {
            return (
              <span key={`res-link-${index}-${linkLabel}`}>{linkLabel}</span>
            )
          }
        } else if (index !== residentsArr.length - 1) {
          return (
            <span key={`res-link-${index}-${linkLabel}`}>
              <Link to={linkTo}>{linkLabel}</Link>
              {' · '}
            </span>
          )
        } else {
          return (
            <span key={`res-link-${index}-${linkLabel}`}>
              <Link to={linkTo}>{linkLabel}</Link>
            </span>
          )
        }
      })}
    </>
  )

  if (returnAsSpan) {
    ;<span>
      <ResidentSpans />
    </span>
  } else {
    return (
      <p className={wrapperClassStyling}>
        <ResidentSpans />
      </p>
    )
  }
}
