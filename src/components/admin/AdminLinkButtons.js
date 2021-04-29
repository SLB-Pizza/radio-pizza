import React from 'react'
import { AdminCMSLink, SingleAdminLink } from './index'

/**
 * Renders the `/hmbk-admin` links section.
 * @category Admin Helper
 * @function AdminLinkButtons
 * @returns {jsx}
 */
export default function AdminLinkButtons() {
  return (
    <div className="columns is-mobile is-multiline">
      <SingleAdminLink
        icon={'info-circle'}
        linkPath={'netlify-status'}
        linkText={'View Netlify Status'}
        linkDescription={'Details about current and recent deploys'}
      />
      <SingleAdminLink
        icon={'broadcast-tower'}
        linkPath={'live-stream-info'}
        linkText={'Update Live Broadcast Info'}
        linkDescription={'Edit the details for live shows'}
      />
      <SingleAdminLink
        icon={'book'}
        linkPath={'guides'}
        linkText={'Read HalfmoonBK Guides'}
        linkDescription={'Editorial standards, media rules, and more'}
      />
      <SingleAdminLink
        icon={'calendar-alt'}
        linkPath={'full-schedule'}
        linkText={'View Complete Schedule'}
        linkDescription={''}
      />
      <AdminCMSLink />
    </div>
  )
}
