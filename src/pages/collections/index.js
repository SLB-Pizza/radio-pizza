import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { SingleCollection } from '../../components'

/**
 * @category Pages
 * @subcategory Indexes
 * @function CollectionsIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @returns {jsx}
 */
function CollectionsIndexPage({ data }) {
  const prismicContent = data.prismic.allEndless_mixs
  if (!prismicContent) return null

  const allCollectionsData = prismicContent.edges

  return (
    <main className="black-bg-page">
      {/* FIRST SECTION - Header Section */}
      <section className="container is-fluid">
        <header className="columns is-mobile">
          <div className="column is-12 content">
            <p className="title is-4-touch">Curated Collections</p>
            <p className="subtitle is-6-touch">
              Where Curated Collections will be displayed
            </p>
          </div>
        </header>

        {allCollectionsData.length &&
          allCollectionsData.map(({ node }, index) => (
            <SingleCollection
              key={`collection-${index}`}
              singleCollection={node}
            />
          ))}
        <pre>{JSON.stringify(allCollectionsData, null, 2)}</pre>
      </section>
    </main>
  )
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
`
export default CollectionsIndexPage

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
