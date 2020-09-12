import React from "react";
import { Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import {
  linkResolver,
  processPublicationDates,
  ResponsiveImage,
} from "../utils";
/**
 * @category Utilities
 * @subcategory Layout Helper
 * @function LandingPageElement
 * @param {Object} props
 * @returns {jsx}
 */
function LandingPageElement({ pageElement, layout }) {
  const { _meta, body } = pageElement.node;

  const { type, uid, firstPublicationDate, lastPublicationDate } = _meta;
  const linkTo = {
    type,
    uid,
  };
  const pageElementDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  );

  const {
    article_headline,
    article_subtitle,
    article_headline_img,
  } = body[0].primary;

  const fullSizeImg = {
    alt: article_headline_img.alt,
    photoCredit: article_headline_img.copyright,
    url: article_headline_img.url,
    dimensions: article_headline_img.dimensions,
  };

  const responsiveSizes = {
    widescreen: article_headline_img.widescreen,
    desktop: article_headline_img.desktop,
    tablet: article_headline_img.tablet,
    mobile: article_headline_img.mobile,
    lo_fi: article_headline_img.lo_fi_placeholder,
  };

  return (
    <article className={layout}>
      <Link to={linkResolver(linkTo)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-3by1">
              <ResponsiveImage
                largestImg={fullSizeImg}
                responsiveData={responsiveSizes}
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <h1
                id="article-headline"
                className="title is-size-3-widescreen is-size-4-desktop is-size-5-touch"
              >
                {RichText.asText(article_headline)}
              </h1>
              <h2 className="subtitle is-size-5-widescreen is-size-6-desktop is-size-7-touch">
                {RichText.asText(article_subtitle)}
              </h2>
              {pageElementDateDetails.hasBeenUpdated ? (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  <time dateTime={lastPublicationDate}>
                    <em>Updated {pageElementDateDetails.pubDate}</em>
                  </time>
                </p>
              ) : (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  <time dateTime={firstPublicationDate}>
                    <em>{pageElementDateDetails.pubDate}</em>
                  </time>
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default LandingPageElement;
