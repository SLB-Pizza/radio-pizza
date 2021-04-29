import React from 'react'
import { DividerAndTopButton } from './index'
import { HMBKDivider } from '../index'

/**
 * Renders the HMBK Divider as a `<footer>` element.
 * @category Layout Helper
 * @function HMBKFooter
 * @param {Boolean} isFluid - when true, makes wrapper class name `section container is-fluid`
 * @param {Boolean} renderTopButton - when true, use {@link DividerAndTopButton}
 * @returns {jsx}
 */
export default function HMBKFooter({ isFluid, renderTopButton }) {
  return (
    <footer
      className={isFluid ? 'section container is-fluid' : 'section container'}
    >
      {renderTopButton ? (
        <DividerAndTopButton />
      ) : (
        <div className="columns is-mobile is-vcentered">
          <HMBKDivider />
        </div>
      )}
    </footer>
  )
}
