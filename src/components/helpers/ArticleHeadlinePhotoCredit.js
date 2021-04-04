import React from 'react'

/**
 * Renders the alt and copyright info for {@link ArticleHeadline} image.
 * If the image has copyright info (photo credit):
 *    Image alt text — photo credit
 * If the image doesn't have copyright info:
 *    Image alt text
 * @category Slice Helper
 * @function ArticleHeadlinePhotoCredit
 * @param {String} alt - photo's alt text
 * @param {String} copyright - photo's copyright credit
 * @returns {jsx}
 */
export default function ArticleHeadlinePhotoCredit({ alt, copyright }) {
  return copyright ? (
    <figcaption className="subtitle credit" id="article-headline-image">
      {`${alt} // ${copyright}`}
    </figcaption>
  ) : (
    <figcaption className="subtitle credit" id="article-headline-image">
      {alt}
    </figcaption>
  )
}
