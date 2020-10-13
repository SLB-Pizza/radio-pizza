import React, { useState } from "react";
import { graphql } from "gatsby";

/**
 * @category Pages
 * @subcategory Indexes
 * @function CollectionsIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @returns {jsx}
 */
function CollectionsIndexPage({ data }) {
  return (
    <main className="black-bg-page">
      {/* FIRST SECTION - Header Section */}
      <header className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h3 className="title is-size-3-desktop is-size-4-touch">
              Curated Collections
            </h3>
            <p className="subtitle is-size-5-desktop is-size-6-touch">
              Where Curated Collections will be displayed
            </p>
          </div>
        </div>
      </header>
    </main>
  );
}

export const query = graphql`
  query CollectionIndexQuery {
    prismic {
      allEndless_mixs(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
              type
              tags
            }
            collection_blurb
            collection_img
            collection_title
            shuffle_mix_order
            collection_playlist {
              endless_mix_entry {
                ... on PRISMIC_Mix {
                  mix_image
                  mix_title
                  _meta {
                    tags
                    type
                    uid
                  }
                  mix_link
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
      }
    }
  }
`;
export default CollectionsIndexPage;

// allEndless_mixs {
//   edges {
//     node {
//       endless_mix_title
//       endless_mix_blurb
//       endless_mix_img
//       shuffle_mix_order
//       endless_mix_playlist {
//         endless_mix_entry {
//           ... on PRISMIC_Mix {
//             _meta {
//               tags
//             }
//             mix_link
//             featured_residents {
//               mix_resident {
//                 ... on PRISMIC_Resident {
//                   resident_name
//                   _meta {
//                     uid
//                     type
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
