import React from 'react'
import { Link } from 'gatsby'

/**
 * Renders the `/hmbk-admin` header with option
 * @category Admin Helper
 * @function AdminHeader
 * @param {?Boolean} renderHomeLink - when true, renders a link back to the `/hmbk-admin` landing page
 * @returns {jsx}
 */
export default function AdminHeader({ totalCount, renderHomeLink }) {
  return (
    <header className="container is-fluid">
      <div className="columns is-mobile is-multiline is-vcentered">
        <div className={totalCount ? 'column' : 'column is-12'}>
          <h1 className="title is-3-desktop is-4-touch">
            HalfmoonBK Admin Dashboard
          </h1>
          {renderHomeLink && (
            <p className="subtitle is-5-desktop is-6-touch text-block">
              <Link to={'/hmbk-admin/'}>⬅ Return to Admin Home</Link>
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
