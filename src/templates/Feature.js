import React from "react";
import { graphql } from "gatsby";
import { SliceZone } from "../components";

const FeatureTemplate = ({ data, path }) => {
  const prismicContent = data.prismic.allFeatures.edges[0];
  if (!prismicContent) return null;
  const document = prismicContent.node;

  return (
    <main className="container is-fluid site-page">
      <SliceZone sliceZone={document.body} />
    </main>
  );
};

{
  /* <section className="columns">
<div className="column is-full">
  <h1 className="title">Data Path: {path}</h1>
  <hr />
  <h2 className="subtitle">Slice Types</h2>
  <SliceZone sliceZone={document.body} />
  <hr />
  <h2 className="subtitle">Data from FeaturesQuery</h2>
  <pre>{JSON.stringify(document.body, null, 2)}</pre>
</div>
</section> */
}

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

// Example nested data sections
{
  /* <section className="columns">
<div className="column is-full">
  <h1 className="title">Data Path: {path}</h1>
  <hr />
  <h2 className="subtitle">Slice Types</h2>
  <SliceZone sliceZone={document.body} />
  <hr />
  <h2 className="subtitle">Data from FeaturesQuery</h2>
  <pre>{JSON.stringify(document.body, null, 2)}</pre>
</div>
</section> */
}
