import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { CMSIssueMessage } from '../../components'
import { cmsNodeValidator, getMixTitle, uidValidator } from '../../utils'

function HMBKAdminPage({ data }) {
  const [totalCount, setCount] = useState(0)
  const [problemMixes, setMixes] = useState([])
  const [problemResidents, setResidents] = useState([])
  const [problemFeatures, setFeatures] = useState([])
  const [problemEvents, setEvents] = useState([])
  const [problemCMSGuides, setCMSGuides] = useState([])
  const [problemCollections, setCollections] = useState([])
  const [problemSchedules, setSchedules] = useState([])
  const [problemStaffs, setStaffs] = useState([])

  const prismicContent = data.prismic._allDocuments
  if (!prismicContent) return null

  useEffect(() => {
    const nodeProcessor = () => {
      if (prismicContent) {
        // Set total count of all HMBK entries
        setCount(prismicContent.totalCount)

        // Process each node
        for (let i = 0; i < prismicContent.edges.length; i++) {
          const currentNode = prismicContent.edges[i].node
          const entryType = currentNode._meta.type

          const entryIssues = cmsNodeValidator(currentNode)
          console.log(entryIssues)
          console.log(
            '\n============================================================\n'
          )
          // const uidIssue = uidValidator(currentNode)

          // If the currentNode has no issues, continue to the next loop
          if (!entryIssues) {
            continue
          }
          // else determine the currentNode type and
          // spread it into an existing problem array
          else {
            const issuePackage = { nodeName: '', entryIssues }
            switch (entryType) {
              case 'mix':
                issuePackage.name = getMixTitle(currentNode)
                setMixes([...problemMixes, issuePackage])
                break
              case 'event':
                setEvents([...problemEvents, issuePackage])
                break
              case 'resident':
                setResidents([...problemResidents, issuePackage])
                break
              case 'endless_mix':
                setCollections([...problemCollections, issuePackage])
                break
              default:
                console.log(entryType)
            }
          }
        }
      }
    }

    return nodeProcessor()
  }, [prismicContent])

  return (
    <main className="black-bg-page">
      {/* FIRST SECTION - Header Section */}
      <header className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h3 className="title is-4-touch">HalfmoonBK Admin Dashboard</h3>
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
              {/* <pre>{JSON.stringify(prismicContent, null, 2)}</pre> */}
            </div>
            {problemMixes.map((mixIssue, index) => {
              return (
                <pre>{JSON.stringify(mixIssue, null, 2)}</pre>
                // <CMSIssueMessage
                //   key={`problem-mixes-${index}`}
                //   issueData={issuePackage}
                // />
              )
            })}
          </div>
        )}
        {problemResidents.length && (
          <div className="column is-12">
            <div className="content">
              <h1 className="title">Residents</h1>
            </div>
            {problemResidents.map((residentIssue, index) => {
              return (
                <pre>{JSON.stringify(residentIssue, null, 2)}</pre>
                // <CMSIssueMessage
                //   key={`problem-mixes-${index}`}
                //   issueData={issuePackage}
                // />
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
  query HMBKAdminQuery {
    prismic {
      _allDocuments(sortBy: meta_firstPublicationDate_DESC) {
        totalCount
        edges {
          node {
            _meta {
              uid
              type
              tags
              lastPublicationDate
              firstPublicationDate
            }
            ... on PRISMIC_Feature {
              body {
                ... on PRISMIC_FeatureBodyHeadline_block {
                  primary {
                    article_headline
                  }
                }
              }
            }
            ... on PRISMIC_Event {
              event_name
            }
            ... on PRISMIC_Cms_guide {
              body {
                ... on PRISMIC_Cms_guideBodyHeadline_block {
                  type
                  primary {
                    article_headline
                  }
                }
              }
            }
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
