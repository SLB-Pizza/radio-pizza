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
function LandingPageElement({ singleGuide }) {
  const { _meta, body } = singleGuide.node;

  const { type, uid, firstPublicationDate, lastPublicationDate } = _meta;

  const linkTo = {
    type,
    uid,
  };

  const cmsGuideDateDetails = processPublicationDates(
    firstPublicationDate,
    lastPublicationDate
  );

  const {
    article_headline,
    article_subtitle,
    article_headline_img,
  } = body[0].primary;

  return (
    <Link to={linkResolver(linkTo)}>
      <div className="columns is-multiline is-mobile">
        <div className="column is-12">
          <div className="card">
            <div className="card-image">
              <figure className="image is-3by1">
                {/* <img src={img.url} alt={img.alt} /> */}
              </figure>
            </div>
            <div className="card-content">
              <h1
                id="article-headline"
                className="title is-size-3-widescreen is-size-4-desktop is-size-5-touch"
              >
                {RichText.asText(article_headline)}
              </h1>
              <h4 className="subtitle is-size-5-widescreen is-size-6-desktop is-size-7-touch">
                {RichText.asText(article_subtitle)}
              </h4>
              {cmsGuideDateDetails.hasBeenUpdated ? (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  <time dateTime={lastPublicationDate}>
                    Updated {cmsGuideDateDetails.pubDate}
                  </time>
                </p>
              ) : (
                <p className="subtitle is-size-6-desktop is-size-7-touch">
                  <time dateTime={firstPublicationDate}>
                    {cmsGuideDateDetails.pubDate}
                  </time>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LandingPageElement;
