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
 * @returns {jsx}
 */
function getResidentLinks(residentsArr, currentPath, residentsAsTitle) {
  console.log(residentsAsTitle)
  const wrapperClassStyling = residentsAsTitle
    ? 'title is-size-5-desktop is-size-6-touch has-text-centered text-block'
    : 'subtitle is-size-6-desktop is-size-7-touch has-text-centered text-block'

  // Address null mix_title AND resident_name case
  for (let i = 0; residentsArr.length; i++) {
    const currResident = residentsArr[i]
    console.log(currResident.mix_resident.resident_name)
    if (!currResident.mix_resident.resident_name) {
      currResident.mix_resident.resident_name = 'HMBK Resident'
    }
  }

  return (
    <p className={wrapperClassStyling}>
      {residentsArr.map(({ mix_resident }, index) => {
        const { _meta, resident_name } = mix_resident

        const linkTo = linkResolver(_meta)
        const linkLabel = resident_name

        /**
         *
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
