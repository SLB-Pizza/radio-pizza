import React from "react";
import { graphql } from "gatsby";

/**
 * @category Templates
 * @subcategory Mix
 * @function MixTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/mixes/:uid`
 * @returns {jsx}
 */

function MixTemplate({ data }) {
  const prismicContent = data.prismic.allMixs.edges[0];
  if (!prismicContent) return null;
  const mixData = prismicContent.node;

  return (
    <main className="black-bg-page">
      <article>
        <section className="container">
          <div className="columns is-mobile is-multiline">
            <div className="column is-full content">
              <pre>{JSON.stringify(mixData, null, 2)}</pre>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

export const query = graphql`
  query MixTemplatePage($uid: String) {
    prismic {
      allMixs(uid: $uid, sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
              lastPublicationDate
              firstPublicationDate
              type
              tags
            }
            mix_date
            mix_image
            mix_link
            mix_title
            featured_residents {
              mix_resident {
                ... on PRISMIC_Resident {
                  resident_name
                  _meta {
                    uid
                    type
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

export default MixTemplate;
