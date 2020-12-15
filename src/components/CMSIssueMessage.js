import React from 'react'
import { RichText } from 'prismic-reactjs'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { CMSIssueMessageType } from '../components'
import { htmlSerializer, linkResolver } from '../utils'

function CMSIssueMessage({ issueData }) {
  const { nodeName, node, entryIssues, uidIssue } = issueData

  const { entryName, priority, errors } = entryIssues

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
    <CMSIssueMessageType type={priority}>
      <div className="message-header">
        <p className="subtitle has-text-black">{`Entry: ${entryName}`}</p>
      </div>
      <div className="message-body">
        {/* errors is {@link cmsNodeValidator} errors array */
        errors.length &&
          errors.map(singleError => {
            const { field, level, error, instructions, moreInfo } = singleError
            const icon = getIcon(level)

            return (
              <>
                <article className="media">
                  <figure className="media-left">
                    <span className="icon is-small">
                      <Icon icon={icon} size="lg" />
                    </span>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <p className="subtitle is-6 has-text-black">{`${field}: ${error}`}</p>
                      <p>{instructions}</p>
                      {moreInfo && (
                        <RichText
                          render={moreInfo}
                          linkResolver={linkResolver}
                          htmlSerializer={htmlSerializer}
                        />
                      )}
                    </div>
                  </div>
                </article>
                {/* <pre>{JSON.stringify(issue, null, 2)}</pre> */}
              </>
            )
          })}
        {/* {uidIssue.type && (
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
        )} */}
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
