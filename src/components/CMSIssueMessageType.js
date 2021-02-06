import React from 'react'

/**
 * Returns the appropriate outer wrapper for a node's error messages.
 * @function CMSIssueMessageType
 * @param {String} type - the priority level determined by {@link prioritySetter} via {@link cmsNodeValidator}
 * @returns {jsx}
 */
export default function CMSIssueMessageType({ type, children }) {
  if (type === 'info') {
    return <article className="message is-info">{children}</article>
  } else if (type === 'warning') {
    return <article className="message is-warning">{children}</article>
  } else {
    return <article className="message is-danger">{children}</article>
  }
}
