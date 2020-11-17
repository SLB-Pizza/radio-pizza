import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { CMSIssueMessageType } from '../components'

function CMSIssueMessage({ issueData }) {
  const { nodeName, node, entryIssues, uidIssue } = issueData

  let message = 'message'
  let icon = 'info-circle'

  switch (issueData.type) {
    case 'warning':
      message = 'message is-warning'
    case 'danger':
      message = 'message is-danger'
    default:
      break
  }

  function getIcon(type) {
    switch (type) {
      case 'warning':
        return 'info-circle'
      case 'danger':
        return 'exclamation-triangle'
      default:
        return 'info-circle'
    }
  }

  return (
    <CMSIssueMessageType type={issueData.uidIssue.type}>
      <div className="message-header">
        <p className="subtitle has-text-black">
          {`Mix Entry: ${issueData.nodeName}`}
        </p>
      </div>
      <div className="message-body">
        {entryIssues.length &&
          entryIssues.map(issue => (
            // <pre>{JSON.stringify(issue, null, 2)}</pre>
            <article className="media">
              <figure className="media-left">
                <span className="icon">
                  <Icon icon="info-circle" size="lg" />
                </span>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p className="subtitle has-text-black">{issue.reason}</p>
                </div>
              </div>
            </article>
          ))}
        {uidIssue.type && (
          // <pre>{JSON.stringify(uidIssue, null, 2)}</pre>
          <article className="media">
            <figure className="media-left">
              <span className="icon">
                <Icon icon={getIcon(uidIssue.type)} size="2x" />
              </span>
            </figure>
            <div className="media-content">
              <div className="content">
                <p className="title is-5 has-text-black">{uidIssue.reason}</p>
                <p className="subtitle is-6 has-text-black">
                  To fix this issue, open this entry in the CMS and change the
                  current UID to the suggested UID, then save and publish the
                  changes.
                </p>
                <p className="has-text-black">Current UID</p>
                <pre>{node._meta.uid}</pre>
                <p className="has-text-black">Suggested UID</p>
                <pre>{uidIssue.result}</pre>
              </div>
            </div>
          </article>
        )}
        {/* <p className="has-text-black"></p>
        <hr className="has-background-black" />
        <h6 className="subtitle is-6">text</h6>
        <div className="tile is-ancestor has-text-centered">
        <div className="tile is-parent has-background-warning-dark">
        <article className="tile is-child box ">
        <p className="subtitle">Current Mix UID</p>
        <pre>{node._meta.uid}</pre>
        </article>
        </div>
        <div className="tile is-parent has-background-warning-dark">
        <article className="tile is-child box">
        <p className="subtitle">Suggested UID</p>
        <pre>{JSON.stringify(issueData.result, null, 2)}</pre>
        </article>
        </div>
      </div> */}
      </div>
    </CMSIssueMessageType>
  )
}

export default CMSIssueMessage
