import React from 'react'
import { Link } from 'gatsby'
import { IconMaker } from '../../utils'

/**
 * Renders a single `/hmbk-admin` link button.
 * @category Admin Helper
 * @function AdminLinkButtons
 * @param {String} icon - which FontAwesomeIcon to use
 * @param {String} linkPath - string that completes `/hmbk-admin/${linkPath}`
 * @param {String} linkText - text to label the button
 * @param {String} linkDescription - text to link
 * @returns {jsx}
 */
export default function SingleAdminLink({
  icon,
  linkPath,
  linkText,
  linkDescription,
}) {
  return (
    <div className="column is-6-desktop is-12-touch">
      <Link to={`/hmbk-admin/${linkPath}`}>
        <article className="admin-link columns is-mobile is-vcentered">
          <div className="column is-3 admin-link__icon">
            <figure className="image">
              <IconMaker
                iconToUse={icon}
                iconSize={'3x'}
                spanClass="icon is-large"
              />
            </figure>
          </div>
          <div className="column is-9 admin-link__text">
            <div className="content">
              <p className="title is-size-5 has-text-centered">{linkText}</p>
              <p className="subtitle is-size-6 has-text-centered">
                {linkDescription}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}
