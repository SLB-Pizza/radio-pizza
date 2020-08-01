import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { withPreview } from "gatsby-source-prismic-graphql";
import { RichText } from "prismic-reactjs";

export default function CMSHelp({ data }) {
  const prismicContent = data.prismic._allDocuments.edges[0];
  if (!prismicContent) return null;
  const document = prismicContent.node;

  // Grab a section of document's data and then destructure for use
  const sampleSlide = document.homepage_carousel[0];
  const slideData = {
    bgUrl: sampleSlide.slide_bg_url.url,
    bgAlt: sampleSlide.slide_bg_url.alt,
    slideHeadline: sampleSlide.slide_headline,
    slideCta: sampleSlide.slide_cta,
    slideLink: sampleSlide.slide_link.url,
    slideLinkTarget: sampleSlide.slide_link.target,
  };

  console.log("slideData", slideData);

  return (
    <section className="container is-fluid site-page">
      <div className="columns">
        <div className="content">
          <div className="column is-12">
            <h1 className="title">Guide to HMBK CMS</h1>
          </div>
        </div>
      </div>
      <div className="columns is-multiline cms-section">
        <div className="column is-12">
          <div className="content">
            <h2 className="subtitle">Sample Slide</h2>
            <p>
              NB: This example uses the <em>current</em> first slide in the Hero
              Carousel.
            </p>
          </div>
        </div>
        <div className="column is-half-desktop">
          <div className="content">
            <h4 className="subtitle">Background Image for Carousel Slide</h4>
          </div>
          <figure className="image is-16by9">
            <img src={slideData.bgUrl} alt={slideData.bgAlt} />
          </figure>
        </div>
        <div className="column is-half-desktop is-flex-desktop">
          <div className={slideData.bgAlt === null ? "cms-warning" : ""}>
            <h4 className="subtitle">Does this BG image have alt text?</h4>
            {slideData.bgAlt === null ? (
              <p>❌ NO</p>
            ) : (
              <p>✅ YES: {slideData.bgAlt}</p>
            )}
            <a
              className="icon-color"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Accessibility_concerns"
              target="_blank"
            >
              Why alt text is important ↗
            </a>
          </div>
          <div>
            <h4 className="subtitle">Slide Headline</h4>
            <p>{RichText.asText(slideData.slideHeadline)}</p>
          </div>
          <div>
            <h4 className="subtitle">Slide Call To Action</h4>
            <p>{RichText.asText(slideData.slideCta)}</p>
          </div>
          <div
            className={
              slideData.slideLinkTarget === "null" ? "cms-warning" : ""
            }
          >
            <h4 className="subtitle">Slide Link</h4>
            <p>{slideData.slideLink}</p>
            <p>
              Opens in new tab?{" "}
              {slideData.slideLinkTarget === "null" ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </section>
  );
}

export const guideQuery = graphql`
  {
    prismic {
      _allDocuments {
        edges {
          node {
            ... on PRISMIC_Homepage {
              _linkType
              homepage_carousel {
                slide_bg_url
                slide_headline
                slide_cta
                slide_link {
                  ... on PRISMIC__ExternalLink {
                    target
                    _linkType
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
