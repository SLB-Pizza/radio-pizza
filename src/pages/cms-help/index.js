import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import { withPreview } from "gatsby-source-prismic-graphql";

import { CMSSlides } from "../../components";

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

  return (
    <section className="container is-fluid site-page">
      <div className="columns">
        <div className="content">
          <div className="column is-12">
            <h1 className="title">HMBK CMS Guide</h1>
            <h3 className="subtitle">Table of Contents</h3>
            <ul>
              <li>Homepage</li>
              <ul>
                <li>Sample Slide</li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      <CMSSlides slideData={slideData} />
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
