import React from 'react'
import NanoClamp from 'nanoclamp'
import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import { linkResolver } from '../utils'

function HighlightFeature({ articleData }) {
  const { _meta, headline_block } = articleData
  const {
    article_headline_img,
    article_headline,
    article_category,
    article_subtitle,
  } = headline_block[0].primary

  // Set up hyperlink url data
  const linkTo = { type: _meta.type, uid: _meta.uid }

  // Grab the specific cropped image details
  const image = article_headline_img.desktop

  // Use the article headline if the image doesn't have alt text
  const altText = image.alt ?? article_headline[0].text

  return (
    <div className="column">
      <Link to={linkResolver(linkTo)}>
        <article
          className="highlight-feature border-color"
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="highlight-details">
            <div className="content">
              <span className="tag is-outlined is-rounded is-black is-hidden-mobile">
                {article_category}
              </span>
              <NanoClamp
                className="title is-5 is-size-6-touch is-size-7-mobile"
                is="p"
                lines={2}
                text={RichText.asText(article_headline)}
              />
              <NanoClamp
                className="subtitle is-7 is-hidden-touch"
                is="p"
                lines={1}
                text={RichText.asText(article_subtitle)}
              />
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}

export default HighlightFeature
