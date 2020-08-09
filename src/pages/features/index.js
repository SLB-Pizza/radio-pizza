import React from "react";

export default function FeaturesIndexPage({ data }) {
  // Focus the node for the prismicContent check below.
  const prismicContent = data.prismic.allFeatures.edges[0];

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * Details: https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!prismicContent) return null;

  // Grab the data object from prismicContent
  const document = prismicContent.node;

  return (
    <div className="container is-fluid site-page">
      <div className="columns is-multiline">
        <div className="column is-12">
          <h1 className="title is-size-3-desktop is-size-4-touch">Features</h1>
          <div className="column is-12">
            <pre>{JSON.stringify(document, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  {
    prismic {
      allFeatures(sortBy: meta_firstPublicationDate_ASC) {
        edges {
          node {
            _meta {
              uid
              type
            }
            body {
              ... on PRISMIC_FeatureBodyHeadline_block {
                type
                label
                primary {
                  feature_headline_img
                  feature_category
                  feature_subcategory
                  feature_headline
                  feature_subtitle
                  feature_author_pic
                }
              }
            }
            body1 {
              ... on PRISMIC_FeatureBody1Deveverycontenttype {
                type
                label
              }
            }
          }
        }
      }
    }
  }
`;
