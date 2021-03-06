import React from 'react'
import { RichTextHelper } from '../helpers'

/**
 * Renders a Prismic RichText structured text object. One of the instances of `.text-block`, a class name that changes line height and link rendering.
 * @category CMS Slices
 * @function TextBlock
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function TextBlock({ slice }) {
  const { body_text, set_first_letter } = slice.primary

  if (set_first_letter) {
  }

  return (
    <section className="section container slice debug">
      <div className="columns">
        <div className="column is-full content text-block">
          <RichTextHelper richText={body_text} />
        </div>
      </div>
    </section>
  )
}

export default TextBlock
