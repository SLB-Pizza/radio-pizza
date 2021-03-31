import React from 'react'
import { Link } from 'gatsby'
import { linkResolver } from '../utils'

export default function UpcomingShowWithResidents({
  startTimeStr,
  upcomingShow,
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
      <div className="column next-show is-loaded is-hidden-mobile">
        <p className="subtitle is-size-6-desktop is-size-7-touch text-block">
          <b>{`${startTimeStr} ${mix_title}`}</b>
          {' | '}
          <ResidentLinkSpan />
        </p>
      </div>
    )
  } else {
    return (
      <div className="column next-show is-loaded is-hidden-mobile">
        <p className="subtitle is-size-6-desktop is-size-7-touch text-block">
          {`${startTimeStr} | `}
          <ResidentLinkSpan />
        </p>
      </div>
    )
  }
}
