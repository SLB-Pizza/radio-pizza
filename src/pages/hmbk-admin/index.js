import PropTypes from 'prop-types'
import React, { useEffect, useContext, useRef, useState } from 'react'
import { graphql } from 'gatsby'
import { CMSIssueMessage } from '../../components'
import { cmsNodeValidator, getMixTitle, uidValidator } from '../../utils'
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../../context/GlobalContextProvider'
import { updateRemoteMarquee } from '../../utils/'

function HMBKAdminPage({ data, prismic }) {
  const dispatch = useContext(GlobalDispatchContext)
  const globalState = useContext(GlobalStateContext)

  const entryLimit = 20
  const totalCount = data.prismic._allDocuments.totalCount
  const didMountRef = useRef(false)
  const [page, setPage] = useState(-1)
  const [cmsEntries, setEntries] = useState(data.prismic._allDocuments.edges)

  const [problemMixes, setMixes] = useState([])
  const [problemResidents, setResidents] = useState([])
  const [problemFeatures, setFeatures] = useState([])
  const [problemEvents, setEvents] = useState([])
  const [problemCMSGuides, setCMSGuides] = useState([])
  const [problemCollections, setCollections] = useState([])
  const [problemSchedules, setSchedules] = useState([])
  const [problemStaffs, setStaffs] = useState([])

  const [liveTitle, setLiveTitle] = useState('')
  const [liveGuests, setLiveGuests] = useState('')

  const prismicContent = data.prismic._allDocuments
  if (!prismicContent) return null

  const updateMarqueeTitle = event => {
    event.preventDefault()

    if ('string' !== typeof event.target.value) {
      alert('Please only input alphanumeric characters')
      return
    }

    return setLiveTitle(event.target.value)
  }

  const updateMarqueeGuests = event => {
    event.preventDefault()

    if ('string' !== typeof event.target.value) {
      alert('Please only input alphanumeric characters')
      return
    }

    return setLiveGuests(event.target.value)
  }

  const submitMarquee = async event => {
    event.preventDefault()

    await updateRemoteMarquee('marquee', {
      liveShowGuests: liveGuests,
      liveShowTitle: liveTitle,
    })
  }

  const marqueeSetDefault = async event => {
    event.preventDefault()

    await updateRemoteMarquee('marquee', {
      liveShowGuests: 'NO LIVE GUESTS',
      liveShowTitle: 'NO LIVE TITLE',
    })
  }

  return (
    <main className="black-bg-page">
      {/* FIRST SECTION - Header Section */}
      <header className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h3 className="title is-4-touch">HalfmoonBK Admin Dashboard</h3>

            <h4 className="">Live Streaming Marquee</h4>
            <p className="subtitle is-6-touch">{`Current Marquee:
            ${globalState.liveMarquee.liveShowTitle} + ${globalState.liveMarquee.liveShowGuests}`}</p>

            <form onSubmit={submitMarquee}>
              <label>
                Live Show Title:
                <input
                  type="text"
                  // id='marqueeInput'
                  name="marqueeInput"
                  placeholder="Type new message here"
                  onChange={updateMarqueeTitle}
                  onSubmit={submitMarquee}
                />
              </label>
              <label>
                Live Show Guests:
                <input
                  type="text"
                  // id='marqueeInput'
                  name="marqueeInput"
                  placeholder="Type new message here"
                  onChange={updateMarqueeGuests}
                  onSubmit={submitMarquee}
                />
              </label>
              <input
                className="button is-outlined is-rounded"
                type="submit"
                value="submit"
              />
            </form>

            <button
              className="button is-outlined is-rounded"
              onClick={marqueeSetDefault}
            >
              Set Marquee Default
            </button>
            <br />

            <p className="subtitle is-6-touch">
              These dummy mixes are the same as the ones on the home page. You
              can hover/touch and play them the same way. Try it!
            </p>
          </div>
          <div className="column is-narrow">
            <aside className="menu is-hidden-mobile">
              <p className="menu-label">Dashboard</p>
              <ul className="menu-list">
                {problemMixes.length && (
                  <li>
                    <a href="#mixes">Mixes</a>
                  </li>
                )}

                <li>
                  <a>Other</a>
                </li>
              </ul>
            </aside>
          </div>

          <div className="column has-background-info">
            <div className="columns is-vcentered is-mobile is-multiline">
              <div className="column content">
                <p className="title has-text-centered">
                  {totalCount} HMBK CMS Entries
                </p>
              </div>
            </div>
          </div>
        </div>
        {problemMixes.length && (
          <div className="column is-12">
            <div className="content">
              <h1 className="title">
                <a href="#mixes"># </a>Mixes
              </h1>
              {/* <pre>Problem Mixes {JSON.stringify(problemMixes, null, 2)}</pre> */}
            </div>
            {problemMixes.map((mixIssuePkg, index) => {
              return (
                <>
                  <CMSIssueMessage
                    key={`problem-mixes-${index}`}
                    issueData={mixIssuePkg}
                  />
                  {/* <pre>{JSON.stringify(mixIssuePkg, null, 2)}</pre> */}
                </>
              )
            })}
          </div>
        )}
        {problemResidents.length && (
          <div className="column is-12">
            <div className="content">
              <h1 className="title">Residents</h1>
            </div>
            {problemResidents.map((residentIssuePkg, index) => {
              return (
                <>
                  <CMSIssueMessage
                    key={`problem-residents-${index}`}
                    issueData={residentIssuePkg}
                  />
                  {/* <pre>{JSON.stringify(residentIssuePkg, null, 2)}</pre> */}
                </>
              )
            })}
          </div>
        )}
        {/* <div className="column is-12">
          <section className="section content">
            <pre>{JSON.stringify(prismicContent.edges, null, 2)}</pre>
          </section>
        </div> */}
      </header>
    </main>
  )
}

HMBKAdminPage.propTypes = {
  data: PropTypes.shape({
    prismic: PropTypes.shape({
      allEvents: PropTypes.shape({
        totalCount: PropTypes.number,
      }),
      allFeatures: PropTypes.shape({
        totalCount: PropTypes.number,
      }),
    }),
  }),
}

export default HMBKAdminPage

export const query = graphql`
  query HMBKAdminQuery(
    $first: Int = 20
    $last: Int
    $after: String
    $before: String
  ) {
    prismic {
      _allDocuments(
        sortBy: meta_lastPublicationDate_DESC
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            _meta {
              uid
              type
              tags
              lastPublicationDate
              firstPublicationDate
            }
            # ... on PRISMIC_Feature {
            #   body {
            #     ... on PRISMIC_FeatureBodyHeadline_block {
            #       primary {
            #         article_headline
            #       }
            #     }
            #   }
            # }
            ... on PRISMIC_Event {
              event_name
            }
            # ... on PRISMIC_Cms_guide {
            #   body {
            #     ... on PRISMIC_Cms_guideBodyHeadline_block {
            #       type
            #       primary {
            #         article_headline
            #       }
            #     }
            #   }
            # }
            ... on PRISMIC_Resident {
              resident_name
              resident_image
              resident_blurb
              social_media {
                resident_social_link {
                  ... on PRISMIC__ExternalLink {
                    target
                    url
                  }
                }
                resident_social_page
              }
              resident_mixes {
                resident_mix {
                  ... on PRISMIC_Mix {
                    mix_image
                    mix_title
                  }
                }
              }
            }
            ... on PRISMIC_Endless_mix {
              collection_title
            }
            ... on PRISMIC_Gallery {
              gallery_title
            }
            ... on PRISMIC_Mix {
              mix_link
              mix_date
              mix_title
              featured_residents {
                mix_resident {
                  ... on PRISMIC_Resident {
                    resident_name
                  }
                }
              }
            }
            ... on PRISMIC_Schedule {
              schedule_date
            }
            ... on PRISMIC_Staff {
              hmbk_staff_name
            }
          }
        }
      }
    }
  }
`

// query HMBKAdminQuery(
//     $first: Int = 20
//     $last: Int
//     $after: String
//     $before: String
//   ) {
//     prismic {
//       _allDocuments(
//         sortBy: meta_lastPublicationDate_DESC
//         first: $first
//         last: $last
//         after: $after
//         before: $before
//       ) {
//         totalCount
//         pageInfo {
//           hasNextPage
//           endCursor
//         }
//         edges {
//           node {
//             _meta {
//               uid
//               type
//               tags
//               lastPublicationDate
//               firstPublicationDate
//             }
//             # ... on PRISMIC_Feature {
//             #   body {
//             #     ... on PRISMIC_FeatureBodyHeadline_block {
//             #       primary {
//             #         article_headline
//             #       }
//             #     }
//             #   }
//             # }
//             ... on PRISMIC_Event {
//               event_name
//             }
//             ... on PRISMIC_Cms_guide {
//               body {
//                 ... on PRISMIC_Cms_guideBodyHeadline_block {
//                   type
//                   primary {
//                     article_headline
//                   }
//                 }
//               }
//             }
//             ... on PRISMIC_Resident {
//               resident_name
//               resident_image
//               resident_blurb
//               social_media {
//                 resident_social_link {
//                   ... on PRISMIC__ExternalLink {
//                     target
//                     url
//                   }
//                 }
//                 resident_social_page
//               }
//               resident_mixes {
//                 resident_mix {
//                   ... on PRISMIC_Mix {
//                     mix_image
//                     mix_title
//                   }
//                 }
//               }
//             }
//             ... on PRISMIC_Endless_mix {
//               collection_title
//             }
//             ... on PRISMIC_Gallery {
//               gallery_title
//             }
//             ... on PRISMIC_Mix {
//               mix_link
//               mix_date
//               mix_title
//               featured_residents {
//                 mix_resident {
//                   ... on PRISMIC_Resident {
//                     resident_name
//                   }
//                 }
//               }
//             }
//             ... on PRISMIC_Schedule {
//               schedule_date
//             }
//             ... on PRISMIC_Staff {
//               hmbk_staff_name
//             }
//           }
//         }
//       }
//     }
//   }
