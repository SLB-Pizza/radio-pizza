import React, { useEffect, useState } from 'react'
import {
  AdminHeader,
  AdminSiteStatus,
  AdminRecentDeploysTable,
} from '../../components/admin'
import { formatDateTime, processDeployInfo } from '../../utils'

/**
 * Renders the current Netlify status on `/hmbk-admin/netlify-status`
 * @category Admin Page
 * @function NetlifyStatus
 * @returns {jsx}
 */
export default function NetlifyStatus() {
  const [fetchTime, setFetchTime] = useState(null)
  const [latestDeploy, setLatestDeploy] = useState(null)
  const [recentDeploys, setRecentDeploys] = useState(null)

  /**
   * Fetches and process the latest deploy records from netlify.
   * @category useEffect
   * @name fetchNetlifyDeployDetails
   */
  useEffect(() => {
    const fetchNetlifyDeployDetails = setInterval(async () => {
      const timeNow = formatDateTime(null, 'current-time')
      const formattedTime = formatDateTime(timeNow, 'short-form-date-time')
      setFetchTime(formattedTime)

      try {
        const response = await fetch(
          `https://api.netlify.com/api/v1/sites/${process.env.GATSBY_NETLIFY_API_ID}/deploys`
        )

        const data = await response.json()

        const mostRecentDeploy = data.shift()
        const latestInfo = processDeployInfo(mostRecentDeploy)
        setLatestDeploy(latestInfo)

        const recentDeploys = data.map(deploy => processDeployInfo(deploy))
        setRecentDeploys(recentDeploys)
      } catch (e) {
        console.error(e)
      }
    }, 30000)

    return () => clearInterval(fetchNetlifyDeployDetails)
  }, [])

  return (
    <main className="black-bg-page">
      <AdminHeader renderHomeLink={true} />
      <AdminSiteStatus fetchTime={fetchTime} latestDeploy={latestDeploy} />
      {recentDeploys && (
        <AdminRecentDeploysTable recentDeploys={recentDeploys} />
      )}
    </main>
  )
}
