import React from 'react'
import { HMBKDivider } from '../../components'

/**
 * Renders the current Netlify site status info on `/hmbk-admin/netlify-status`
 * @category Admin Helper
 * @function AdminLatestSiteStatus
 * @param {String} fetchTime - formatted datetime string denoting time of deploy status info fetch
 * @param {Object} latestDeploy - object created and set by {@link fetchNetlifyDeployDetails}
 * @returns {jsx}
 */
export default function AdminLatestSiteStatus({ fetchTime, latestDeploy }) {
  return (
    <section className="section container is-fluid" id="netlify">
      <div className="columns is-mobile is-multiline admin-box">
        <div className="column is-6-tablet is-12-mobile">
          <h2 className="title is-size-3-desktop is-size-4-touch">
            Netlify Status
          </h2>
          <p className="subtitle is-size-5-desktop is-size-6-touch">
            Updates every 30 seconds
          </p>
        </div>

        {latestDeploy ? (
          <div className="column is-3-desktop is-half-tablet is-12-mobile">
            <figure className="image">
              <img
                className="has-ratio"
                src={`https://api.netlify.com/api/v1/badges/${latestDeploy.site_id}/deploy-status`}
                alt="Current Netlify Deploy Status"
              />
            </figure>
          </div>
        ) : (
          <div className="column is-6-tablet">
            <div className="columns is-mobile is-vcentered">
              <HMBKDivider forLoading={true} />
            </div>
          </div>
        )}

        <div className="column is-6-tablet is-12-mobile">
          <h3 className="title is-size-4-desktop is-size-5-touch">
            Latest Deploy Status Check
          </h3>
          <p className="is-size-6-touch is-12-mobile">
            {fetchTime ? fetchTime : 'Running first fetch...'}
          </p>
        </div>

        <div className="column is-6-tablet is-12-mobile">
          <h3 className="title is-size-4-desktop is-size-5-touch">
            Latest Deploy Details
          </h3>
          {latestDeploy ? (
            <>
              <p className="is-size-6-touch">
                <b>State: </b>
                {latestDeploy.state.toUpperCase()}
              </p>
              <p className="is-size-6-touch">
                <b>Published: </b>
                {latestDeploy.publishTime}
              </p>
              <p className="is-size-6-touch">
                <b>Message: </b>
                {latestDeploy.title}
              </p>
            </>
          ) : (
            <p className="is-size-6-touch">Running first fetch...</p>
          )}
        </div>
      </div>
    </section>
  )
}
