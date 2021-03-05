import React from 'react'
import { RichText } from 'prismic-reactjs'
import { htmlSerializer, linkResolver } from '../../utils'

/**
 * @category Layout Helper
 * @function RichTextHelper
 * @param {Object[]} richText - A Prismic Rich Text Array, rendered by `prismic-reactjs`.
 * @param {?String} [columnSizing="column is-full content text-block"] - The `columnSizing` to use for the wrapper column; the default rendered `className` for this component is `column is-full content text-block`. If passed in, function will create new class name: `{columnSizing} content text-block`.
 * @returns {jsx}
 *
 * @see {@link https://prismic.io/docs/technologies/rendering-the-rich-text-and-title-field-reactjs Rendering the Rich Text / Title Field}
 */
export default function RichTextHelper({ richText, columnSizing }) {
  return (
    <div
      className={
        columnSizing
          ? `${columnSizing} content text-block`
          : 'column is-full content text-block'
      }
    >
      <RichText
        render={richText}
        htmlSerializer={htmlSerializer}
        linkResolver={linkResolver}
      />
    </div>
  )
}
