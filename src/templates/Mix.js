import React from 'react'
import { Link, graphql } from 'gatsby'
import { MixPlayOverlay, TagButtons, SingleResident } from '../components'
import { RichText } from 'prismic-reactjs'
import { linkResolver, getResidentString } from '../utils'
import NanoClamp from 'nanoclamp'

/**
 * @category Templates
 * @subcategory Mix
 * @function MixTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/mixes/:uid`
 * @returns {jsx}
 */

function MixTemplate({ data }) {
  const prismicContent = data.prismic.allMixs.edges[0]
  if (!prismicContent) return null
  const mixData = prismicContent.node

  const {
    _meta,
    mix_date,
    mix_image,
    mix_link,
    mix_title,
    mix_blurb,
    featured_residents,
    related_events,
  } = mixData

  const mixResidentString = getResidentString(featured_residents)

  return (
    <main className="black-bg-page">
      <article className="container">
        <div className="columns is-mobile has-background-grey">
          <div className="column is-9">
            {mix_title !== null ? (
              <div className="content">
                <NanoClamp
                  is="h1"
                  className="title"
                  lines={2}
                  text={mix_title}
                />
                <NanoClamp
                  is="p"
                  className="subtitle"
                  lines={1}
                  text={mixResidentString}
                />
                <p className="is-size-7">{mix_date}</p>
              </div>
            ) : (
              <div className="content">
                <h1 className="title">{mixResidentString}</h1>
                <p className="subtitle">{mix_date}</p>
              </div>
            )}
            <TagButtons tagsArray={_meta.tags} />
          </div>

          <div className="column is-3">
            <MixPlayOverlay
              wrapperClassName="card"
              url={mix_link}
              title={mix_title}
              residents={mixResidentString}
              img={mix_image}
            />
          </div>
        </div>

        <div className="columns is-mobile">
          <div className="column is-12 content">
            <RichText render={mix_blurb} linkResolver={linkResolver} />
          </div>
        </div>

        <div className="columns is-mobile is-multiline">
          <div className="column is-12">
            <div className="content">
              <h2 className="title">Featured Residents</h2>
            </div>
          </div>
          {featured_residents.map(({ mix_resident }, index) => (
            <SingleResident
              key={`mix-resident-${index}`}
              resident={mix_resident}
            />
          ))}
        </div>

        {related_events !== null ? (
          <div className="columns is-mobile is-multiline">
            <div className="column is-12">
              <div className="content">
                <h2 className="title">Related Events</h2>
                <p>There are events that need to be mapped.</p>
              </div>
            </div>

            {/* {featured_residents.map(({ mix_resident }, index) => (
              <SingleResident
                key={`mix-resident-${index}`}
                resident={mix_resident}
              />
            ))} */}
          </div>
        ) : (
          <div className="columns is-mobile is-multiline">
            <div className="column is-12">
              <div className="content">
                <h2 className="title">Related Events</h2>
                <p>No Events Found</p>
              </div>
            </div>
            {/* {featured_residents.map(({ mix_resident }, index) => (
              <SingleResident
                key={`mix-resident-${index}`}
                resident={mix_resident}
              />
            ))} */}
          </div>
        )}

        <div className="columns is-mobile">
          <div className="column is-12 content">
            <h3 className="title">mixData object</h3>
            <pre>{JSON.stringify(mixData, null, 2)}</pre>
          </div>
        </div>
      </article>
    </main>
  )
}

export const query = graphql`
  query MixTemplatePage($uid: String) {
    prismic {
      allMixs(uid: $uid) {
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
            mix_blurb
            featured_residents {
              mix_resident {
                ... on PRISMIC_Resident {
                  _meta {
                    uid
                    type
                  }
                  resident_image
                  resident_name
                }
              }
            }
            related_events {
              mix_event {
                ... on PRISMIC_Event {
                  _linkType
                  _meta {
                    type
                    uid
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

export default MixTemplate
