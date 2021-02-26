import React, { useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'
import { SingleMixCard } from '../../components/'

/**
 * @category Pages
 * @function MixesIndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @param {Object} prismic - the data object containing Prismic follow up functions
 * @returns {jsx}
 */
function MixesIndexPage({ data, prismic }) {
  // Initial useState is first query results
  // loadNextMixes calls trigger the loadMoreMixes useEffect and add to mixesToMap
  const allMixData = data.prismic.allMixs.edges
  if (!allMixData) return null

  const mixesPerPage = 12
  const didMountRef = useRef(false)
  const mixListLayout =
    'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'

  // for loadMoreMixes useEffect and loadNextMixes function
  const [page, setPage] = useState(-1)
  const [hasMoreMixes, setHasMoreMixes] = useState(true)
  const [mixesToMap, setMixesToMap] = useState(allMixData)
  const [mixesLoading, setMixesLoading] = useState(false)

  /**
   * Fetch more mixes when the 'More Music' button is clicked.
   * Use the loadNextMixes function to call the useEffect.
   */
  const loadNextMixes = () => {
    setPage(page => page + mixesPerPage)
    setMixesLoading(true)
  }

  useEffect(() => {
    const loadMoreMixes = () => {
      if (!didMountRef.current) {
        didMountRef.current = true
        return
      }

      // Grab the next 12 mixes
      prismic
        .load({
          variables: {
            after: getCursorFromDocumentIndex(page),
          },
        })
        .then(res => {
          setMixesLoading(false)

          // Spread the received mix objects into the existing mixesToMap array
          setMixesToMap([...mixesToMap, ...res.data.allMixs.edges])
          // If there are no further mixes to get, don't show the load button
          if (!res.data.allMixs.pageInfo.hasNextPage) {
            setHasMoreMixes(false)
          }
        })
    }

    return loadMoreMixes()
  }, [page])

  return (
    <main className="black-bg-page">
      <header className="container is-fluid" id="mixes-header">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h1 className="title is-3-desktop is-4-touch">Recent Mixes</h1>
            <p className="subtitle is-5-desktop is-6-touch">
              These dummy mixes are the same as the ones on the home page. You
              can hover/touch and play them the same way. Try it!
            </p>
          </div>
        </div>
      </header>
      {/*
          Inactive Search Bar!
          <div className="column is-9-widescreen is-8-tablet is-12-mobile">
            <div className="field">
              <div className="control is-expanded has-icons-left has-icons-right">
                <div className="control is-expanded has-icons-left has-icons-right is-loading is-medium">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Search all mixes..."
                />
                <span className="icon is-left">
                  <Icon icon="search" />
                </span>
              </div>
            </div>
          </div>
          <div className="column is-3-widescreen is-4-tablet is-12-mobile">
            <div className="field">
              <div className="control is-expanded has-icons-left">
                <div className="select is-fullwidth is-rounded">
                  <select name="country">
                    <option value="">--Country--</option>
                    {dummyOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="icon is-left">
                  <Icon icon="tag" />
                </span>
              </div>
            </div>
          </div> */}
      <section
        className="section container is-fluid"
        id="all-mixes"
        style={{ paddingBottom: 0 }}
      >
        <div className="columns is-mobile is-multiline">
          {/* All Mixs data in pulled correctly */}
          {mixesToMap?.map(({ node }, index) => (
            <SingleMixCard
              key={`mixes-page-#${index}`}
              mixData={node}
              columnLayout={mixListLayout}
            />
          ))}
        </div>
        {hasMoreMixes ? (
          <div className="columns is-mobile">
            <div className="column">
              {!mixesLoading ? (
                <button
                  className="button is-fullwidth is-outlined is-rounded"
                  onClick={loadNextMixes}
                >
                  More Music!
                </button>
              ) : (
                <progress className="progress is-medium is-primary" max="100">
                  15%
                </progress>
              )}
            </div>
            <div className="column is-narrow">
              <a href="#mixes-header">
                <button className="button is-fullwidth is-outlined is-rounded">
                  Top
                </button>
              </a>
            </div>
          </div>
        ) : (
          <div className="columns is-mobile">
            <div className="column is-offset-10 is-2">
              <a href="#all-mixes">
                <button className="button is-fullwidth is-outlined is-rounded">
                  Top
                </button>
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export const query = graphql`
  query MixesIndexQuery(
    $first: Int = 12
    $last: Int
    $after: String
    $before: String
  ) {
    prismic {
      allMixs(
        sortBy: mix_date_DESC
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        edges {
          node {
            _meta {
              uid
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
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`

export default MixesIndexPage

// Mix img square sizes
// --- MOBILE ---
// --- CMS Size: 500
// --- min-max avg:  513.5---
// --- mean:  495.67---
// 767  - 695

// 768  - 332
// 1023 - 460

// --- DESKTOP ---
// --- min-max avg:  350---
// --- mean:  329.33---
// 1024 - 296
// 1215 - 360

// 1216 - 262
// 1407 - 310

// 1408 - 310
// 1920 - 438
