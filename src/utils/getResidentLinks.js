import React from 'react'
import { Link, path } from 'gatsby'
import { linkResolver } from '../utils'

/**
 * Returns a Gatsby Link element with the correctly resolved link path and label {@link SingleMixCard})
 * @category Utilities
 * @function getResidentLinks
 * @param {Object[]} residentsArr - Array of resident objects, each containing their _meta data to create links to their page and the resident's name
 * @param {String} currentPath - path data; received only from {@link ResidentTemplate} so the mix cards generated on that resident's page dont have links to the resident page they're already on
 * @param {?Boolean} residentsAsTitle - optionally passed by {@link SingleScheduledShowTitling}; used to change the wrapper `<p>` className
 * @param {?Boolean} returnAsFragment - returns all resident link spans wrapped in a Fragment
 * @returns {jsx}
 */
function getResidentLinks(
  residentsArr,
  currentPath,
  residentsAsTitle,
  returnAsFragment
) {
  const wrapperClassStyling = residentsAsTitle
    ? 'title is-size-5-desktop is-size-6-touch has-text-centered text-block'
    : 'subtitle is-size-6-desktop is-size-7-touch has-text-centered text-block'

  if (returnAsFragment) {
    return (
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
  }

  return (
    <p className={wrapperClassStyling}>
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
    </p>
  )
}
export default getResidentLinks
