import React, { useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CuratedCollections,
  SingleMixCard,
  MixPlayOverlay,
} from '../../components/'

/**
 * @category Pages
 * @subcategory Indexes
 * @function MixesIndexPage
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @returns {jsx}
 */
function MixesIndexPage({ data, prismic }) {
  const entryLimit = 20
  const didMountRef = useRef(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(-1)
  const [mixesData, setMixesData] = useState(data.prismic.allMixs.edges)
  /**
   * **NB:** allMixs is NOT a typo.
   */
  const prismicContent = data.prismic
  if (!prismicContent) return null

  const onNextClick = () => setPage(page + entryLimit)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    if (hasMore === null) {
      console.log('has more is null')
      setHasMore(prismicContent.allMixs.pageInfo.hasNextPage)
      return
    }

    prismic
      .load({ variables: { after: getCursorFromDocumentIndex(page) } })
      .then(res => {
        // spread the received mix objects into the existing mixesData array
        setMixesData([...mixesData, ...res.data.allMixs.edges])
        // if there are no further mixes to get, don't show the load button
        if (!res.data.allMixs.pageInfo.hasNextPage) {
          setHasMore(false)
        }
      })
  }, [page])

  const mixListLayout =
    'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'
  const dummyOptions = [
    'Argentina',
    'Bolivia',
    'Brazil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Guyana',
    'Paraguay',
    'Peru',
    'Suriname',
    'Uruguay',
    'Venezuela',
  ]

  return (
    <main className="black-bg-page">
      {/* FIRST SECTION - Header Section */}
      <header className="container is-fluid" id="mixes-header">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h3 className="title is-size-3-desktop is-size-4-touch">
              Recent Mixes
            </h3>
            <p className="subtitle is-size-5-desktop is-size-6-touch">
              These dummy mixes are the same as the ones on the home page. You
              can hover/touch and play them the same way. Try it!
            </p>
          </div>
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
                  <FontAwesomeIcon icon="search" />
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
                  <FontAwesomeIcon icon="tag" />
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </header>
      {/* SECOND SECTION - Mix section */}
      <section className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          {/* All Mixs data in pulled correctly */}
          {mixesData.map(({ node }, index) => {
            return (
              <SingleMixCard
                key={`mixes-page-#${index}`}
                mixData={node}
                columnLayout={mixListLayout}
              />
            )
          })}
          <hr />
          {/* <pre>{JSON.stringify(mixesData, null, 2)}</pre> */}
        </div>
        {hasMore ? (
          <div className="columns is-mobile">
            <div className="column">
              <button
                className="button is-fullwidth is-outlined is-rounded"
                onClick={onNextClick}
              >
                More Music!
              </button>
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
              <a href="#mixes-header">
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
  query MixesIndexPage(
    $first: Int = 20
    $last: Int
    $after: String
    $before: String
  ) {
    prismic {
      allMixs(
        sortBy: meta_firstPublicationDate_DESC
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
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
