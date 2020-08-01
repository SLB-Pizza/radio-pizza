import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { withPreview } from "gatsby-source-prismic-graphql";
import { RichText } from "prismic-reactjs";

export default function CMSHelp({ data }) {
  const prismicContent = data.prismic._allDocuments.edges[0];
  if (!prismicContent) return null;
  const document = prismicContent.node;

  const guideExamples = {
    sampleSlide: document.homepage_carousel[0],
  };

  console.log(guideExamples);

  return (
    <section className="container is-fluid site-page">
      <div className="columns">
        <div className="content">
          <div className="column is-12">
            <h1 className="title">Guide to HMBK CMS</h1>
            <h2 className="subtitle">Sample Slide</h2>
            <p>This example uses the current first slide.</p>
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
            <img
              src={guideExamples.sampleSlide.slide_bg_url.url}
              alt={guideExamples.sampleSlide.slide_bg_url.alt}
            />
          </figure>
        </div>
        <div className="column is-half-desktop">
          <h4 className="subtitle">Slide Headline</h4>
          <p>{RichText.asText(guideExamples.sampleSlide.slide_headline)}</p>
          <h4 className="subtitle">Slide Call To Action</h4>
          <p>{RichText.asText(guideExamples.sampleSlide.slide_cta)}</p>
          <h4 className="subtitle">Slide Link</h4>
          <p>{guideExamples.sampleSlide.slide_link.url}</p>
          <div className="cms-warning">
            <p>
              Opens in new tab?{" "}
              {guideExamples.sampleSlide.slide_link.target === "null"
                ? "Yes"
                : "No"}
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
