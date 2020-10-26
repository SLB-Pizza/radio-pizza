import React from 'react'

function CMSIssueMessage({ node, issueData }) {
  const messageType = 'message is-' + issueData.type
  return (
    <article className={messageType}>
      <div className="message-header">
        <p className="subtitle has-text-black">{`Issue: ${issueData.reason}`}</p>
      </div>
      <div className="message-body content">
        <p className="has-text-black">{`Mix Entry: ${issueData.entry}`}</p>
        <hr className="has-background-black" />
        <h6 className="subtitle is-6">text</h6>
        <pre>{JSON.stringify(issueData, null, 2)}</pre>
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
              <pre>{issueData.result}</pre>
            </article>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CMSIssueMessage
