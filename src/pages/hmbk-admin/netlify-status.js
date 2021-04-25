import React, { useEffect, useState } from 'react'
import {
  AdminHeader,
  AdminSiteStatus,
  AdminRecentDeploysTable,
} from '../../components/admin'
import { HMBKFooter } from '../../components/helpers'
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
   * @name fetchFirstNetlifyDeployDetails
   */
  useEffect(() => {
    const fetchFirstNetlifyDeployDetails = async () => {
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
    }

    return fetchFirstNetlifyDeployDetails()
  }, [])

  /**
   * Fetches and process the latest deploy records from netlify.
   * @category useEffect
   * @name refreshNetlifyDeployDetails
   */
  useEffect(() => {
    const refreshNetlifyDeployDetails = setInterval(async () => {
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
    }, 15000)

    return () => clearInterval(refreshNetlifyDeployDetails)
  }, [])

  return (
    <main className="black-bg-page">
      <AdminHeader renderHomeLink={true} />
      <AdminSiteStatus fetchTime={fetchTime} latestDeploy={latestDeploy} />
      {recentDeploys && (
        <AdminRecentDeploysTable recentDeploys={recentDeploys} />
      )}
      <HMBKFooter />
    </main>
  )
}
