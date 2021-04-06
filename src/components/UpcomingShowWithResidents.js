import React from 'react'
import { Link } from 'gatsby'
import { linkResolver, mappableDataFilter } from '../utils'

/**
 * Renders the Prismic Mix data object to be display in `.upcoming-show`
 * @category Layout Helper
 * @function UpcomingShowWithResidents
 * @param {String} startTimeStr - DateTime string; preformatted in {@link UpcomingShow}
 * @param {Object} upcomingShow - the Prismic Mix data object
 * @prop {?String} mix_title - optional mix title
 * @prop {}
 * @param {Boolean} isLoading
 * @returns {jsx}
 */
export default function UpcomingShowWithResidents({
  startTimeStr,
  upcomingShow,
  isLoading,
}) {
  const { mix_title, featured_residents } = upcomingShow

  const ResidentLinkSpan = () => (
    <span>
      {featured_residents.map(({ mix_resident }, index) => {
        let { _meta, resident_name } = mix_resident

        /**
         * Reverse engineer resident from UID by replacing hyphens with spaces.
         */
        if (!resident_name) {
          resident_name = _meta.uid.replace('-', ' ')
        }

        const linkTo = linkResolver(_meta)
        const linkLabel = resident_name

        if (index !== featured_residents.length - 1) {
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
    </span>
  )

  if (mix_title) {
    return (
      <div
        className={
          isLoading
            ? 'column upcoming-show is-hidden-mobile text-block'
            : 'column upcoming-show is-hidden-mobile text-block is-loaded'
        }
      >
        <p className="subtitle is-size-6-desktop is-size-7-touch">
          <b>{`${startTimeStr} ${mix_title}`}</b>
          {' | '}
          <ResidentLinkSpan />
        </p>
      </div>
    )
  } else {
    return (
      <div
        className={
          isLoading
            ? 'column upcoming-show is-hidden-mobile text-block'
            : 'column upcoming-show is-hidden-mobile text-block is-loaded'
        }
      >
        <p className="subtitle is-size-6-desktop is-size-7-touch">
          <b>{`${startTimeStr} `}</b>
          <ResidentLinkSpan />
        </p>
      </div>
    )
  }
}
