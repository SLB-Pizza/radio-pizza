import React from 'react'
import { HMBKDivider } from '../index'

/**
 * Renders the HMBK Divider as a `<footer>` element.
 * @category Layout Helper
 * @function HMBKFooter
 * @returns {jsx}
 */
export default function HMBKFooter() {
  return (
    <footer className="section container">
      <div className="columns is-mobile is-vcentered">
        <HMBKDivider />
      </div>
    </footer>
  )
}
