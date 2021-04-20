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
      <div className="columns is-mobile is-multiline">
        <SingleAdminLink
          icon={'broadcast-tower'}
          linkText={'Update Live Broadcast Info'}
        />
        <SingleAdminLink
          icon={'broadcast-tower'}
          linkText={'Update Live Broadcast Info'}
        />
        <SingleAdminLink
          icon={'broadcast-tower'}
          linkText={'Update Live Broadcast Info'}
        />
      </div>
    </section>
  )
}
