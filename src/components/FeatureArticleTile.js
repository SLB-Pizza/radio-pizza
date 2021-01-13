import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { htmlSerializer, linkResolver, ResponsiveImage } from '../utils'

function FeatureArticleTile({ secondaryFeature, data }) {
  const { _meta, headline_block } = data
  const { type, uid, firstPublicationDate, lastPublicationDate } = _meta
  const linkTo = { type, uid }

  // headline_block prep
  const {
    article_headline_img,
    article_headline,
    article_subcategory,
    article_subtitle,
  } = headline_block[0].primary

  const fullSizeImg = {
    alt: article_headline_img.alt,
    photoCredit: article_headline_img.copyright,
    url: article_headline_img.url,
    dimensions: article_headline_img.dimensions,
  }

  const responsiveSizes = {
    widescreen: article_headline_img.widescreen,
    desktop: article_headline_img.desktop,
    tablet: article_headline_img.tablet,
    mobile: article_headline_img.mobile,
    lo_fi: article_headline_img.lo_fi_placeholder,
  }

  return (
    <article className="tile is-child box">
      <Link to={linkResolver(linkTo)}>
        <div className="article-image">
          <figure className="image">
            <ResponsiveImage
              largestImg={fullSizeImg}
              responsiveData={responsiveSizes}
            />
          </figure>
        </div>
        {!secondaryFeature ? (
          <div className="article-content">
            <RichText />
            <p className="title">Title</p>
            <p className="subtitle">Subtitle</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        ) : (
          <div className="article-content">
            <p className="title is-5">Title</p>
            <p className="subtitle is-7">Subtitle</p>
            <p className="is-size-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        )}
      </Link>
    </article>
  )
}

export default FeatureArticleTile
