import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { CMSIssueMessage } from '../../components'
import { cmsNodeValidator, getMixTitle, uidValidator } from '../../utils'

function HMBKAdminPage({ data }) {
  const prismicContent = data.prismic._allDocuments
  if (!prismicContent) return null

  const docCount = prismicContent.totalCount
  let problemMixes = []
  let problemFeatures = []
  let problemEvents = []
  let problemCMSGuides = []
  let problemResidents = []
  let problemCollections = []
  let problemSchedules = []
  let problemStaffs = []

  // Process each node
  for (let i = 0; i < prismicContent.edges.length; i++) {
    const node = prismicContent.edges[i].node

    const entryIssues = cmsNodeValidator(node)
    console.log(
      '\n============================================================'
    )
    console.log(entryIssues)
    const uidIssue = uidValidator(node)

    // If the node has no issues, continue to the next loop
    // else determine the node type and
    // push it to the correct array to process
    if (!entryIssues && !uidIssue) {
      continue
    } else {
      switch (node._meta.type) {
        case 'mix':
          const nodeName = getMixTitle(node)
          const issuePackage = { nodeName, node, entryIssues, uidIssue }
          problemMixes.push(issuePackage)
          break
        case 'event':
          problemEvents.push(issuePackage)
          break
        case 'resident':
          problemResidents.push(issuePackage)
          break
        case 'endless_mix':
          problemCollections.push(issuePackage)
          break
        default:
          console.log(node._meta.type)
      }
    }
  }

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
                  {docCount} HMBK CMS Entries
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
            </div>
            {problemMixes.map((issuePackage, index) => {
              return (
                <CMSIssueMessage
                  key={`problem-mixes-${index}`}
                  issueData={issuePackage}
                />
              )
            })}
          </div>
        )}
        {problemResidents.length && (
          <div className="column is-12">
            <div className="content">
              <h1 className="title">Residents</h1>
            </div>
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
