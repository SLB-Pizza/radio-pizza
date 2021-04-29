import React from 'react'
import { IconMaker } from '../../utils'

/**
 * Renders a {@link SingleAdminLink} style button takes a user to the Prismic CMS in a new tab onClick.
 * @category Admin Helper
 * @function AdminCMSLink
 * @returns {jsx}
 */
export default function AdminCMSLink() {
  return (
    <div className="column is-6-desktop is-12-touch">
      <a href="https://hmbk-cms.prismic.io/" target="_blank" rel="noopener">
        <article className="admin-link columns is-mobile is-vcentered">
          <div className="column is-3 admin-link__icon">
            <figure className="image">
              <IconMaker
                iconToUse={'external-link-alt'}
                iconSize={'3x'}
                spanClass="icon is-large"
              />
            </figure>
          </div>
          <div className="column is-9 admin-link__text">
            <div className="content">
              <p className="title is-size-5 has-text-centered">
                Go to the HMBK CMS
              </p>
            </div>
          </div>
        </article>
      </a>
    </div>
  )
}
