import React from 'react'

/**
 * Returns an `<hr>` centered in a container, 8 columns wide.
 * @category CMS Slices
 * @function SectionDivider
 * @returns {jsx}
 */
export default function SectionDivider() {
  return (
    <section className="section container">
      <div className="columns is-centered is-vcentered">
        <div className="column is-8">
          <hr />
        </div>
      </div>
    </section>
  )
}
