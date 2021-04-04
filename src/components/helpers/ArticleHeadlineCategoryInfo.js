import React from 'react'

/**
 * Renders the category info for {@link ArticleHeadline}.
 * @category Slice Helper
 * @function ArticleHeadlineCategoryInfo
 * @param {String} category - the article's category info
 * @param {String} subcategory - the articles subcategory info
 * @returns {jsx}
 */
export default function ArticleHeadlineCategoryInfo({ category, subcategory }) {
  let details

  if (category) {
    if (subcategory) {
      details = `${category} ‣ ${subcategory}`
    } else {
      details = `${category}`
    }
  }

  return (
    <p className="is-size-6-desktop is-size-7-touch article-category">
      {details}
    </p>
  )
}
