import React from "react";
import { graphql } from "gatsby";
import { SliceZone } from "../components";

const FeatureTemplate = ({ data, path }) => {
  const prismicContent = data.prismic.allFeatures.edges[0];
  if (!prismicContent) return null;
  const document = prismicContent.node;

  return (
    <main className="site-page">
      <pre>{JSON.stringify(document.body, null, 2)}</pre>
    </main>
  );
};

{
  /* <SliceZone sliceZone={document.body} /> */
}
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
            }
            body {
              ... on PRISMIC_FeatureBodyBlockquote {
                type
                primary {
                  blockquote_type
                  blockquote_text
                  blockquote_attribution
                  blockquote_bg_img
                }
                label
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
