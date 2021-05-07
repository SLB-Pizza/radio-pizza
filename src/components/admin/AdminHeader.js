import React from 'react'
import { Link } from 'gatsby'

/**
 * Renders the `/hmbk-admin` header with options.
 * @category Admin Helper
 * @function AdminHeader
 * @param {?Number} totalCount - passed in on `/hmbk-admin/` landing page
 * @param {?Boolean} renderHomeLink - when true, renders a link back to the `/hmbk-admin` landing page
 * @param {?Boolean} isAdminGuide - when true, size {@link AdminHeader} to fit {@link ArticleHeadline}.
 * @returns {jsx}
 */
export default function AdminHeader({
  totalCount,
  renderHomeLink,
  isAdminGuide,
}) {
  return (
    <header
      className={
        isAdminGuide ? 'container is-fluid admin-guide' : 'container is-fluid'
      }
    >
      <div className="columns is-mobile is-multiline is-vcentered">
        <div className="column">
          <h1 className="title is-3-desktop is-4-touch">
            HalfmoonBK Admin Dashboard
          </h1>
          {renderHomeLink && (
            <p className="subtitle is-5-desktop is-6-touch text-block">
              <Link to={'/hmbk-admin/'}>&larr; Return to Admin Home</Link>
            </p>
          )}
          {isAdminGuide && (
            <p className="subtitle is-5-desktop is-6-touch text-block">
              <Link to={'/hmbk-admin/guides'}>&larr; Return to All Guides</Link>
            </p>
          )}
        </div>
        {totalCount && (
          <div className="column is-narrow">
            <p className="is-size-4">{totalCount} CMS entries</p>
          </div>
        )}
      </div>
    </header>
  )
}
