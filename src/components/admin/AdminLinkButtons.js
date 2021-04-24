import React from 'react'
import { SingleAdminLink } from './index'

/**
 * Renders the `/hmbk-admin` links section.
 * @category Admin Helper
 * @function AdminLinkButtons
 * @returns {jsx}
 */
export default function AdminLinkButtons() {
  return (
    <section className="section container is-fluid">
      <div className="columns is-multiline">
        <SingleAdminLink
          icon={'broadcast-tower'}
          linkPath={'live-stream-info'}
          linkText={'Update Live Broadcast Info'}
        />
        <SingleAdminLink
          icon={'info-circle'}
          linkPath={'guides'}
          linkText={'Read HalfmoonBK Guides'}
        />
        <SingleAdminLink
          icon={'calendar-alt'}
          linkPath={'full-schedule'}
          linkText={'View Complete Schedule'}
        />
      </div>
    </section>
  )
}
