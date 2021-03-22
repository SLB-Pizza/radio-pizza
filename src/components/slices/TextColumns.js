import React from 'react'
import { RichTextHelper } from '../helpers'
import { mappableDataFilter } from '../../utils'
import { filter } from 'lodash'

/**
 * Renders a set of Prismic RichText columns, with optional header and footer sections. One of the instances of `.text-block`, a class name that changes line height and link rendering. This slice will NOT render if `filteredTextCols` is returned by {@link mappableDataFilter} to be 0.
 * @category CMS Slices
 * @function TextColumns
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */
function TextColumns({ slice }) {
  const { fields, primary } = slice
  const { text_columns_header: header, text_columns_footer: footer } = primary

  /**
   * Filter out any null column items from `fields`.
   */
  const filteredTextColumns = mappableDataFilter(fields)

  /**
   * Boolean used to set `text-column` border styling on TextColumn if columns.length > 1.
   */
  const onlyOneColumn = filteredTextColumns.length === 1

  /**
   * If {@link mappableDataFilter} returns an array, grab up to the first 5 columns.
   */
  const firstFiveColumns = Array.isArray(filteredTextColumns)
    ? filteredTextColumns.slice(0, 5)
    : null

  /**
   * Render this slice ONLY IF Text Columns received column(s) to render.
   */
  return firstFiveColumns ? (
    <section className="section slice text-columns">
      {header && (
        <div className="container">
          <div className="columns text-columns__header">
            <RichTextHelper richText={header} />
          </div>
        </div>
      )}

      <div className="container is-fluid">
        <div className="columns is-mobile is-centered">
          <div className="column is-11">
            <div className="columns is-mobile is-multiline text-columns__main">
              {firstFiveColumns.map(({ text_column }, index) => (
                <RichTextHelper
                  key={`text-column-${index}`}
                  richText={text_column}
                  columnSizing={
                    onlyOneColumn
                      ? 'column is-12-mobile is-6-tablet-only'
                      : 'column is-12-mobile is-6-tablet-only text-column'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {footer && (
        <div className="container text-columns__footer">
          <div className="columns is-mobile is-multiline">
            <RichTextHelper richText={footer} />
          </div>
        </div>
      )}
    </section>
  ) : null
}

export default TextColumns
