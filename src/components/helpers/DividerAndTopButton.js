import React from 'react'
import { HMBKDivider } from '../index'
import { scrollToTop } from '../../utils'

/**
 * Renders a `columns` div with a divider and button that scrolls back to top.
 * @category Layout Helper
 * @function DividerAndTopButton
 * @returns {jsx}
 */
export default function DividerAndTopButton() {
  return (
    <div className="columns is-mobile is-vcentered">
      <HMBKDivider />
      <div className="column is-narrow">
        <button
          className="button is-fullwidth is-outlined is-rounded"
          onClick={() => scrollToTop()}
        >
          Top
        </button>
      </div>
    </div>
  )
}
