import React, { useContext, useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'
import { useLazyQuery } from '@apollo/client'
import { AllMixesLayout } from '../../components/'

import { GET_SELECTED_TAGGED_MIXES } from '../../queries'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../../context/GlobalContextProvider'
import { DisplayFetchedTaggedMixes } from '../../components'

/**
 * @category Pages
 * @function MixesIndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @param {Object} prismic - the data object containing Prismic follow up functions
 * @returns {jsx}
 */
function MixesIndexPage({ data, prismic }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  // Initial useState is first query results
  // loadNextMixes calls trigger the loadMoreMixes useEffect and add to mixesToMap
  const allMixData = data.prismic.allMixs
  if (!allMixData) return null

  const mixesPerPage = 12
  const didMountRef = useRef(false)

  // for loadMoreMixes useEffect and loadNextMixes function
  const [page, setPage] = useState(-1)
  const [mixesToMap, setMixesToMap] = useState({
    data: allMixData.edges,
    hasMore: allMixData.pageInfo.hasNextPage,
    endCursor: allMixData.pageInfo.endCursor,
  })
  const [mixesLoading, setMixesLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState(null)
  const [receivedTagMixes, setReceivedTagMixes] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
  })

  /**
   * useLazyQuery called by {@link executeTagSearch}.
   * Passes {@link MixesIndexPage} local `selectedTags` as variable to query.
   * Returns data as `fetchedMixes` and a loading state as `currentlyFetching`.
   * @category useLazyQueries
   * @name fetchTaggedMixes
   */
  const [
    fetchTaggedMixes,
    { loading: currentlyFetching, data: fetchedMixes },
  ] = useLazyQuery(GET_SELECTED_TAGGED_MIXES)

  /**
   * Fetch more mixes when the 'More Music' button is clicked in {@link AllMixesLayout} on {@link MixesIndexPage}.
   * Use the loadNextMixes function to call the useEffect.
   * @name loadNextMixes
   */
  const loadNextMixes = () => {
    setPage(page => page + mixesPerPage)
    setMixesLoading(true)
  }

  /**
   * useEffect that fires off a Prismic fetch when "More Mixes" button on {@link MixesIndexPage} is clicked. Adds mixes from Prismic fetch to mixesToMap data array and updates hasMore and endCursor values.
   * @category useEffect
   * @name loadMoreMixes
   */
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
          setMixesToMap({
            data: [...mixesToMap.data, ...res.data.allMixs.edges],
            hasMore: res.data.allMixs.pageInfo.hasNextPage,
            endCursor: res.data.allMixs.pageInfo.endCursor,
          })
        })
    }

    return loadMoreMixes()
  }, [page])

  /**
   * Brings globalState.mixSearchTags to /mixes local useState.
   * Runs when globalState is changed based off a click {@link TagButtons} on {@link MixesIndexPage}, dispatching {@link SELECT_MIX_SEARCH_TAG} to add the tag's text to `mixSearchTags`.
   * @category useEffect
   * @name addMixToTagSearchArr
   */
  useEffect(() => {
    const addMixToTagSearchArr = () => {
      if (globalState.mixSearchTags) {
        setSelectedTags(globalState.mixSearchTags)
      }
    }

    return addMixToTagSearchArr()
  }, [globalState.mixSearchTags])

  /**
   * Runs when local selectedTags is changed.
   * Triggers a fetch using {@link fetchTaggedMixes}.
   * @category useEffect
   * @name executeTagSearch
   */
  useEffect(() => {
    const executeTagSearch = () => {
      if (selectedTags) {
        fetchTaggedMixes({
          variables: {
            tags: selectedTags,
          },
        })
      }
    }
    return executeTagSearch()
  }, [selectedTags])

  /**
   * Runs after {@link executeTagSearch} returns a fetchedMixes object. Sets receivedTagMixes using fetchedMixes. receivedTagMixes then triggers render of {@link DisplayFetchedTaggedMixes}.
   * @category useEffect
   * @name executeTagSearch
   */
  useEffect(() => {
    const processFetchedMixes = () => {
      if (fetchedMixes) {
        setReceivedTagMixes({
          data: [...fetchedMixes.allMixs.edges],
          hasMore: fetchedMixes.allMixs.pageInfo.hasNextPage,
          endCursor: fetchedMixes.allMixs.pageInfo.endCursor,
        })
      }
    }
    return processFetchedMixes()
  }, [fetchedMixes])

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

      <section
        className="section container is-fluid"
        id="all-mixes"
        style={{ paddingBottom: 0 }}
      >
        {receivedTagMixes?.data ? (
          <DisplayFetchedTaggedMixes
            tagMixes={receivedTagMixes.data}
            selectedTags={selectedTags}
          />
        ) : (
          <AllMixesLayout
            loadMixesFunc={loadNextMixes}
            mixesDataToMap={mixesToMap}
            mixLoadState={mixesLoading}
          />
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

{
  /*
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
          </div> */
}
