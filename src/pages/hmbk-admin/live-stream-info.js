import React from 'react'
import { AdminHeader } from '../../components/admin'

/**
 * Renders the `/hmbk-admin/live-stream-info/` page with a form to update the live stream marquee.
 * @category Admin Helper
 * @function AdminLiveStreamInfo
 * @returns {jsx}
 */
export default function AdminLiveStreamInfo() {
  return (
    <main className="black-bg-page">
      <AdminHeader renderHomeLink={true} />
    </main>
  )
}
