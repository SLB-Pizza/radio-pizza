import React, { useContext, useEffect, useState, useRef } from 'react'
import { getCursorFromDocumentIndex } from '@prismicio/gatsby-source-prismic-graphql'
import { graphql } from 'gatsby'
import { useLazyQuery } from '@apollo/client'

import { GET_SELECTED_TAGGED_MIXES } from '../../queries'
import { GlobalStateContext } from '../../context/GlobalContextProvider'
import { AllMixesLayout, DisplayFetchedTaggedMixes } from '../../components'

/**
 * Layout for /mixes landing page. This is also the page layout where mix tag queries are fetched are rendered.
 *
 * How Tag Queries Happen and Render:
 * 1. A {@link TagButtons} is clicked (e.g. "rap")
 * 2. {@link tagNavigateAndDispatch} is called.
 * - If current page is not `/mixes`: navigate to `/mixes`, then call {@link addTagToSearchArray}
 * - If on "/mixes", just call {@link addTagToSearchArray}
 * 3. {@link addTagToSearchArray} dispatches one of {@link ADD_TAG_TO_MIX_SEARCH} or {@link NEW_TAGS_FOR_TAG_QUERY_SEARCH}.
 * 4. {@link addMixToTagSearchArr} `useEffect` detects the change to `globalState.mixSearchTags` and `setSelectedTags` to that array value or nulls both `selectedTags` and `setReceivedTagMixes`.
 * 5. {@link executeTagSearch} `useEffect` detects the change to `selectedTags` and runs the {@link fetchTaggedMixes} only if `selectedTags` isn't null.
 * 6. {@link processFetchedMixes} `useEffect` detects change in `taggedMixesData`, {@link fetchTaggedMixes} returned tag query data, and `setReceivedTagMixes` data object.
 * 7. Now that `receivedTagMixes` is an object with queried data, {@link DisplayFetchedTaggedMixes} renders that data because of a `receivedTagMixes?.data` ternary.
 * @category Pages
 * @function MixesIndexPage
 * @param {Object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @param {Object} prismic - the data object containing Prismic follow up functions
 * @returns {jsx}
 */
function MixesIndexPage({ data, prismic }) {
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
  // manually set loading boolean for Prismic.load calls
  const [mixesLoading, setMixesLoading] = useState(false)

  // useStates for tag selection and querying with tags
  const [selectedTags, setSelectedTags] = useState(null)
  const [receivedTagMixes, setReceivedTagMixes] = useState({
    data: null,
    hasMore: null,
    endCursor: null,
    totalCount: null,
  })

  /**
   * useLazyQuery called by {@link executeTagSearch}.
   * Passes {@link MixesIndexPage} local `selectedTags` as variable to query.
   * Returns data as `taggedMixesData` and a loading state as `isFetching`.
   * @category useLazyQueries
   * @name fetchTaggedMixes
   */
  const [
    fetchTaggedMixes,
    { loading: isFetching, data: taggedMixesData },
  ] = useLazyQuery(GET_SELECTED_TAGGED_MIXES)

  /**
   * Fetch more mixes when the 'More Music' button is clicked in {@link AllMixesLayout} on {@link MixesIndexPage}.
   * Use the loadNextMixes function to call the useEffect.
   * @category Fetch Trigger
   * @function loadNextMixes
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
   * `globalState.mixSearchTags` is an array with tag values
   * - set `selectedTags` to those values.
   *  `globalState.mixSearchTags` is null,
   * - nulls both local `selectedTags` and `receivedTagMixes`.
   * @category useEffect
   * @name addMixToTagSearchArr
   */
  useEffect(() => {
    const addMixToTagSearchArr = () => {
      /**
       * Scenario 1
       *
       * Brings globalState.mixSearchTags to /mixes local useState.
       * Runs when globalState is changed based off a click {@link TagButtons} on {@link MixesIndexPage}, dispatching {@link ADD_TAG_TO_MIX_SEARCH} to add the tag's text to `mixSearchTags`.
       */
      if (globalState.mixSearchTags) {
        console.log('setting selectedTags:', globalState.mixSearchTags)
        setSelectedTags(globalState.mixSearchTags)
      } else {
        /**
         * Scenario 2
         *
         * Resets both `selectedTags ` and `receivedTagMixes` to null states, removing {@link DisplayFetchedTaggedMixes} allowing {@link AllMixesLayout} to render
         */
        console.log('about to null selectedTags and receivedTagMixes')
        setSelectedTags(null)
        setReceivedTagMixes({
          data: null,
          hasMore: null,
          endCursor: null,
          totalCount: null,
        })
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
      /**
       * Only run {@link fetchTaggedMixes} when selectedTags is defined.
       */
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
   * Runs after {@link executeTagSearch} returns a `taggedMixesData` object. Sets `receivedTagMixes` using `taggedMixesData`. `receivedTagMixes` then triggers render of {@link DisplayFetchedTaggedMixes}.
   *
   * Processes based on three scenarios:
   * 1. If `receivedTagMixes.data` is null, use edges arr as currentFetchedMixes.
   * 2. If `globalState.sameTagsInQuery` is true, {@link fetchTaggedMixes} was triggered to fetch MORE mixes using the same tags array as the last fetch by fetch more button in {@link DisplayFetchedTaggedMixes}.
   * Combine the existing `receivedTagMixes` with the incoming `taggedMixesData` edges subarray.
   * 3. `receivedTagMixes.data` has data.
   * `globalState.sameTagsInQuery` is false.
   * Source of query:
   * - {@link TagButtons} or
   * - {@link DisplayFetchedTaggedMixes} 'remove selected tag' buttons Overwrite current `receivedTagMixes` with the incoming `taggedMixesData` edges subarray.
   * @category useEffect
   * @name processFetchedMixes
   */
  useEffect(() => {
    const processFetchedMixes = () => {
      if (taggedMixesData) {
        // Set up a placeholder variable.
        let currentFetchedMixes

        console.log('using same tags for query', globalState.sameTagsInQuery)
        /**
         * SCENARIO 1
         */
        if (receivedTagMixes.data === null) {
          currentFetchedMixes = taggedMixesData.allMixs.edges
        } else if (globalState.sameTagsInQuery) {
          /**
           * SCENARIO 2
           */
          currentFetchedMixes = [
            ...receivedTagMixes.data,
            ...taggedMixesData.allMixs.edges,
          ]
        } else {
          /**
           * SCENARIO 3
           */
          currentFetchedMixes = taggedMixesData.allMixs.edges
        }

        setReceivedTagMixes({
          data: currentFetchedMixes,
          hasMore: taggedMixesData.allMixs.pageInfo.hasNextPage,
          endCursor: taggedMixesData.allMixs.pageInfo.endCursor,
          totalCount: taggedMixesData.allMixs.totalCount,
        })
      }
    }
    return processFetchedMixes()
  }, [taggedMixesData])

  const mixListLayout =
    'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'

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
        className="section container is-fluid media-cards"
        id="all-mixes"
      >
        {receivedTagMixes?.data ? (
          <DisplayFetchedTaggedMixes
            fetchFunc={fetchTaggedMixes}
            fetchedData={receivedTagMixes}
            isFetching={isFetching}
            selectedTags={selectedTags}
          />
        ) : (
          <AllMixesLayout
            loadMixesFunc={loadNextMixes}
            mixesDataToMap={mixesToMap}
            mixLoadState={mixesLoading}
            mixCardLayout={mixListLayout}
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

// const executeTagSearch = useCallback((mixesArr = [], cursor = null) => {
//   if (selectedTags) {
//     fetchTaggedMixes({
//       variables: {
//         after: cursor,
//         tags: selectedTags,
//       },
//     });

//     console.log("taggedMixesData", taggedMixesData);
//     if (taggedMixesData) {
//       console.log("taggedMixesData exists", taggedMixesData);
//       const currentCursor = taggedMixesData.allMixs.pageInfo.endCursor;
//       console.log("currentCursor", currentCursor);

//       const currentFetchedMixes = [
//         ...mixesArr,
//         ...taggedMixesData.allMixs.edges,
//       ];
//       console.log(
//         "currFetchedMixes",
//         currentFetchedMixes.length,
//         currentFetchedMixes
//       );

//       if (taggedMixesData.allMixs.pageInfo.hasNextPage) {
//         executeTagSearch(currentFetchedMixes, currentCursor);
//       } else {
//         setReceivedTagMixes({
//           data: currentFetchedMixes,
//           hasMore: taggedMixesData.allMixs.pageInfo.hasNextPage,
//           endCursor: taggedMixesData.allMixs.pageInfo.endCursor,
//         });
//       }
//     }
//   }
// });
