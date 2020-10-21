import React from 'react'
import { RichText } from 'prismic-reactjs'

/**
 * Creates a JSX segment that CMS Slices call on to format text content. Its image counterpart is {@link ImageHelper}.
 * @category CMS
 * @subcategory Layout Helper
 * @function
 * @param {?String} columnClassName - optional string prop dictating specific column layouts.
 *
 * **CMS Slices passing this prop**
 * - {@link OneImageAndText}
 * - {@link TwoImagesAndText}
 *
 * **CMS Slices NOT passing this prop**
 * - {@link ImageRow}
 *
 * @param {String} text - a RichText PrismicCMS object that contains text to be rendered by `prismic-reactjs` "RichText" function.
 * @returns {jsx}
 */
function ContentHelper({ columnClassName, text }) {
  const defaultContentClassName = 'column is-12'

  /**
   * If a columnClassName prop was passed in, use that prop value.
   * Else, use the defaultContentClassName defined above.
   */
  const contentColumnClass = columnClassName
    ? columnClassName
    : defaultContentClassName

  return (
    <div className={contentColumnClass}>
      <div className="content">{RichText.render(text)}</div>
    </div>
  )
}

export default ContentHelper
