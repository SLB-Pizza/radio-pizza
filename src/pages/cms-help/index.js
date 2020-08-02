import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";

import { CMSSlides } from "../../components";

export default function CMSHelp({ data }) {
  const prismicContent = data.prismic.allHomepages.edges[0];
  if (!prismicContent) return null;
  const document = prismicContent.node;

  // Grab a section of document's data and then destructure for use
  console.log(document);

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

export const query = graphql`
  query CMSHelpCarouselSection {
    prismic {
      allHomepages {
        edges {
          node {
            home_mixes_headline
            home_mixes_blurb
            home_events_headline
            home_events_blurb
            home_features_headline
            home_features_blurb
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
`;
