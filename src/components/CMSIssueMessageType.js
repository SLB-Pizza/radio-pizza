import React from 'react'

export default function CMSIssueMessageType({ type, children }) {
  if (type === 'warning') {
    return <article className="message is-warning">{children}</article>
  } else if (type === 'danger') {
    return <article className="message is-danger">{children}</article>
  }
}
