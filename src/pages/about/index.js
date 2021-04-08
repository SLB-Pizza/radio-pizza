import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../../components/SiteMetadata'

function AboutIndexPage({ data }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

  return (
    <main className="full-height-page">
      <Helmet defer={false}>
        <html lang="en" />
        <title>About {title}</title>
        <meta name="description" content="HalfMoon Radio About Page" />
        <meta name="theme-color" content="#f600ff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={`About ${title}`} />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta property="og:image" content={`/img/HalfMoon-3.png`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="HalfMoon Radio About Page" />
        <meta name="twitter:site" content={twitterUsername} />
        <meta name="twitter:image" content={`/img/HalfMoon-3.png`} />
      </Helmet>

      {/* <section className="section container is-fluid">
        <div className="columns is-mobile">
          <div className="column">
            <div className="content">
              <p className="title is-size-3">Ears to the concrete.</p>
              <p className="subtitle is-size-5">
                Brooklyn based music network connecting music culture across the
                world through radio, events, and more.
              </p>
              <p>
                Founded in 2017, Half Moon was born out of the need to defy.
                Essentially, we are destroying mainstream radio and building a
                platform that allows music and culture to thrive without limits.
                We pride ourselves in bringing our audience live, uncensored and
                undiscovered music from a grass-roots perspective reminding the
                world that the underground is where the sublime lives, grows and
                becomes timeless.
              </p>

              <p className="title is-size-5">Team</p>
              <p>Surf Allah – Owner & Founder</p>
              <p>Edrick Chu – Head of Marketing & Partnerships</p>
              <p className="title is-size-5">Contact</p>
              <p>Business: business@halfmoonbk.com</p>
              <p>Info: info@halfmoonbk.com</p>
            </div>
          </div>
        </div>
      </section> */}

      <footer className="container is-fluid">
        <div className="columns is-mobile">
          <div className="column">
            <div className="content">
              <p className="title is-5">Design</p>
              <p className="subtitle is-7">Christian Mejia</p>
            </div>
          </div>
          <div className="column">
            <div className="content">
              <p className="title is-5">Programming</p>
              <p className="subtitle is-7">
                Christian Mejia & Richard Dominguez
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default AboutIndexPage

export const query = graphql`
  query AboutIndexPage {
    prismic {
      allAbouts {
        edges {
          node {
            body {
              ... on PRISMIC_AboutBodyText {
                type
                label
                primary {
                  body_text
                }
              }
              ... on PRISMIC_AboutBodyBlockquote {
                type
                label
                primary {
                  blockquote_attribution
                  blockquote_bg_img
                  blockquote_text
                }
              }
              ... on PRISMIC_AboutBodyHmbk_item_and_text {
                type
                label
                primary {
                  oiat_text
                  hmbk_item {
                    ... on PRISMIC_Event {
                      _meta {
                        uid
                        type
                      }
                      event_blurb
                      main_event_image
                      event_name
                      event_end
                      event_start
                      event_location
                    }
                    ... on PRISMIC_Resident {
                      _meta {
                        uid
                        type
                      }
                      resident_name
                      resident_image
                    }
                    ... on PRISMIC_Mix {
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
                }
              }
              ... on PRISMIC_AboutBodyOne_image_and_text {
                type
                label
                primary {
                  oiat_img
                  oiat_text
                }
              }
              ... on PRISMIC_AboutBodyTwo_images_and_text {
                type
                label
                primary {
                  tiat_left_img
                  tiat_right_img
                  tiat_text
                }
              }
              ... on PRISMIC_AboutBodyText_columns {
                type
                label
                fields {
                  text_column
                }
                primary {
                  text_columns_footer
                  text_columns_header
                }
              }
              ... on PRISMIC_AboutBodyRow_of_images {
                type
                label
                fields {
                  single_img
                }
              }
            }
            body1 {
              ... on PRISMIC_AboutBody1Full_width_image {
                type
                label
                primary {
                  full_width_image
                }
              }
            }
          }
        }
      }
    }
  }
`
