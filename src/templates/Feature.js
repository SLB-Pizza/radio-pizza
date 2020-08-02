import React from "react";
import { graphql } from "gatsby";

const FeatureTemplate = ({ data, path }) => (
  <main className="container is-fluid site-page">
    <section className="columns">
      <div className="column is-full">
        <h1 className="title">Data Path: {path}</h1>
        <h2 className="subtitle">Data from FeaturesQuery</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  </main>
);

export const query = graphql`
  query FeaturesQuery($uid: String) {
    prismic {
      allFeatures(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              tags
            }
            body {
              ... on PRISMIC_FeatureBodyBanner_with_caption {
                type
                label
                primary {
                  image_banner
                  title_of_banner
                  description
                  button_label
                }
              }
              ... on PRISMIC_FeatureBodyText {
                type
                label
                primary {
                  text
                }
              }
              ... on PRISMIC_FeatureBodyQuote {
                type
                label
                primary {
                  quote
                  name_of_the_author
                  portrait_author
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default FeatureTemplate;
