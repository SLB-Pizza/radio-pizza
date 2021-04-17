import React, { useEffect, useState } from 'react'
import { HMBKDivider } from '../index'
import { formatDateTime } from '../../utils'

/**
 * Renders the current Netlify status on `/hmbk-admin`
 * @category Admin Helper
 * @function NetlifyStatus
 * @returns {jsx}
 */
export default function NetlifyStatus() {
  const [fetchTime, setFetchTime] = useState(null)
  const [deployDetails, setDeployDetails] = useState(null)

  useEffect(() => {
    const fetchNetlifyDeployDetails = setInterval(async () => {
      const timeNow = formatDateTime(null, 'current-time')
      const formattedTime = formatDateTime(timeNow, 'short-form-date-time')
      setFetchTime(formattedTime)

      try {
        const response = await fetch(
          'https://api.netlify.com/api/v1/sites/b487e43f-6e4f-415e-8da1-c96925870e26/'
        )

        const data = await response.json()
        const { published_deploy } = data
        const publishTime = formatDateTime(
          published_deploy.published_at,
          'short-form-date-time'
        )

        const details = {
          state: published_deploy.state,
          message: published_deploy.title,
          publishTime,
        }

        setDeployDetails(details)
      } catch (e) {
        console.error(e)
      }
    }, 10000)

    return () => clearInterval(fetchNetlifyDeployDetails)
  }, [])

  return (
    <section className="section container is-fluid">
      <div className="columns is-mobile is-multiline is-vcentered">
        <div className="column is-6 content">
          <h2 className="title">Netlify Status</h2>
          <p className="subtitle">Updates every 10 seconds</p>
        </div>

        {deployDetails ? (
          <div className="column is-2">
            <figure className="image">
              <img
                className="has-ratio"
                src="https://api.netlify.com/api/v1/badges/b487e43f-6e4f-415e-8da1-c96925870e26/deploy-status"
                alt="Current Netlify Deploy Status"
              />
            </figure>
          </div>
        ) : (
          <div className="column is-6">
            <div className="columns is-mobile is-vcentered">
              <HMBKDivider forLoading={true} />
            </div>
          </div>
        )}
      </div>
      <div className="columns is-mobile is-multiline">
        <div className="column is-12-mobile content">
          <p className="title is-5">Last Deploy Status Check</p>
          <p>{fetchTime ? fetchTime : 'Running first fetch...'}</p>
        </div>

        <div className="column is-12-mobile content">
          <p className="title is-5">Last Deploy Info</p>
          {deployDetails ? (
            <>
              <p>
                <b>Published: </b>
                {deployDetails.publishTime}
              </p>
              <p>
                <b>Message: </b>
                {deployDetails.message}
              </p>
            </>
          ) : (
            <p>Running first fetch...</p>
          )}
        </div>
      </div>
    </section>
  )
}
