import React from 'react'
import { FallbackImage } from '../utils'

/**
 * Returns a fragment that is used at the end of mapped media card lists. HMBKDivider is meant to fill out all remaining space inside a `<div className="columns is-mobile is-vcentered">`.
 * @category Layout Helper
 * @function HMBKDivider
 * @param {Boolean} forLoading - when true, applies loading styles to fragment
 * @returns {jsx}
 */
export default function HMBKDivider({ forLoading }) {
  return (
    <>
      <div className="column">
        <hr className={forLoading ? 'divider-left' : ''} />
      </div>
      <div className="column is-narrow">
        <figure className="image is-64x64">
          <FallbackImage styleName={forLoading ? 'divider-logo' : ''} />
        </figure>
      </div>

      <div className="column">
        <hr className={forLoading ? 'divider-right' : ''} />
      </div>
    </>
  )
}
