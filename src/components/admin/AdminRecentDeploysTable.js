import React from 'react'

/**
 * Renders a formatted table of data detailing each of the most recent Netlify deploys.
 * @category Admin Helper
 * @function AdminRecentDeploysTable
 * @param {Object[]} recentDeploys - array of deploy objects processed by {@link fetchNetlifyDeployDetails}
 * @returns {jsx}
 */
export default function AdminRecentDeploysTable({ recentDeploys }) {
  return (
    <section className="section container is-fluid">
      <div className="columns is-mobile is-multiline">
        <div className="column is-12">
          <h3 className="title">Recent Deploys</h3>
          {!recentDeploys ? (
            <p>Fetching recent site deploy info...</p>
          ) : (
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th className="has-text-white">
                    <p>
                      <b>State</b>
                    </p>
                  </th>
                  <th className="has-text-white">
                    <p>
                      <b>Started</b>
                    </p>
                  </th>
                  <th className="has-text-white">
                    <p>
                      <b>Published</b>
                    </p>
                  </th>
                  <th className="has-text-white">
                    <p>
                      <b>Deploy Time</b>
                    </p>
                  </th>
                  <th className="has-text-white">
                    <p>
                      <b>Build Message</b>
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentDeploys.map(
                  (
                    { title, state, startedTime, publishTime, deployTime },
                    index
                  ) => (
                    <tr
                      key={`recent-deploy-${index}`}
                      className={
                        state === 'error'
                          ? 'is-selected has-background-danger'
                          : ''
                      }
                    >
                      <td>
                        <p className="is-family-code">
                          <b>{state.toUpperCase()}</b>
                        </p>
                      </td>
                      <td>
                        <p className="is-family-code">{startedTime}</p>
                      </td>
                      <td>
                        {publishTime !== 'Invalid Date' ? (
                          <p className="is-family-code">{publishTime}</p>
                        ) : (
                          <p className="is-family-code">Not Published</p>
                        )}
                      </td>
                      <td>
                        {deployTime ? (
                          <p className="is-family-code">{deployTime}</p>
                        ) : (
                          <p className="is-family-code">---</p>
                        )}
                      </td>
                      <td>
                        <p className="is-family-code">{title}</p>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  )
}
