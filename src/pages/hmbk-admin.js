import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { CMSIssueMessage } from '../components'
import { uidValidator } from '../utils'

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

  prismicContent.edges.forEach(({ node }) => {
    switch (node._meta.type) {
      case 'mix':
        problemMixes.push(node)
      case 'event':
        problemEvents.push(node)
      case 'resident':
        problemResidents.push(node)
      case 'endless_mix':
        problemCollections.push(node)
      default:
        return
    }
  })

  return (
    <main className="black-bg-page">
      {/* FIRST SECTION - Header Section */}
      <header className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h3 className="title is-size-3-desktop is-size-4-touch">
              HalfmoonBK Admin Daskhboard
            </h3>
            <p className="subtitle is-size-5-desktop is-size-6-touch">
              These dummy mixes are the same as the ones on the home page. You
              can hover/touch and play them the same way. Try it!
            </p>
          </div>
          <div className="column is-2">
            <aside className="menu is-hidden-mobile">
              <p className="menu-label">CMS Dashboard</p>
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

          <div className="column is-9">
            <div className="columns is-mobile is-multiline">
              <div className="column is-12">
                <section className="info-tiles">
                  <div className="tile is-ancestor has-text-centered">
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">{docCount}</p>
                        <p className="subtitle">HMBK CMS Entries</p>
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">59k</p>
                        <p className="subtitle">Products</p>
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">3.4k</p>
                        <p className="subtitle">Open Orders</p>
                      </article>
                    </div>
                  </div>
                </section>
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
              {problemMixes.map((node, index) => {
                let checkUID = uidValidator(node)

                if (checkUID) {
                  return (
                    <CMSIssueMessage
                      key={`problem-mixes-${index}`}
                      node={node}
                      issueData={checkUID}
                    />
                  )
                }
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
          <div className="column is-12">
            <section className="section content">
              <pre>{JSON.stringify(prismicContent.edges, null, 2)}</pre>
            </section>
          </div>
        </div>
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
