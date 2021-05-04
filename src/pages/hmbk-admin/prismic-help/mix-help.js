import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../../../components'
import { HMBKFooter } from '../../../components/helpers'
import { AdminHeader, AdminCategorizedGuides } from '../../../components/admin'

/**
 *
 *
 * @category Help Page
 * @function MixHelp
 * @returns {jsx}
 */
export default function MixHelp({ path }) {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

  return (
    <main className="full-height-page">
      <Helmet defer={false}>
        <title>{`Prismic Mix Guide | ${title}`}</title>
        <meta
          name="description"
          content={
            'Understand how to fill out a Prismic Mix CMS entry properly.'
          }
        />
        <meta property="og:title" content={`Prismic Mix Guide | ${title}`} />
        <meta property="og:url" content={`${siteUrl}${path}`} />
        <meta
          name="og:description"
          content={
            'Understand how to fill out a Prismic Mix CMS entry properly.'
          }
        />
        <meta name="twitter:title" content={`Prismic Mix Guide | ${title}`} />
        <meta
          name="twitter:description"
          content={
            'Understand how to fill out a Prismic Mix CMS entry properly.'
          }
        />
      </Helmet>

      <AdminHeader renderHomeLink={true} />

      <section className="section container is-fluid">
        <div className="columns is-multiline is-mobile">
          <div className="column is-12">
            <div className="content">
              <h1 className="title is-size-2-widescreen is-size-3-desktop is-size-4-touch">
                Prismic Mix CMS Guide
              </h1>
              <p className="subtitle is-size-6-touch">
                Details about the Prismic Mix custom type.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content text-block">
            <h3 className="title is-family-code">Mix Unique UID</h3>
            <p className="subtitle">Required</p>
            <p>
              UID is short for <b>unique identifier</b>.
            </p>
            <p>
              It's extremely important to create a proper UID
              <b> the first time you publish a CMS entry</b> because Prismic
              keeps a history of all the previous UIDs for a given document to
              ensure that old links are not broken. The document will always be
              returned even when searching for it using an older UID.
            </p>
            <p>
              A good rule of thumb is to make your urls clear enough so that a
              user who only sees the url path will have a good idea of what will
              be on the page. Suggested Mix UID formatting rules included below
              are based on presence of a mix title.
            </p>
            <p className="text-block">
              <a
                href="https://user-guides.prismic.io/en/articles/383719-uid"
                rel="noopener"
                target="_blank"
              >
                UID | Prismic Help Center
              </a>
            </p>
          </div>

          <div className="column is-12 content">
            <h4 className="title is-size-4">Titled Mix</h4>
            <p className="subtitle is-size-6">
              Suggested UID Format:{' '}
              <span className="is-family-code">mix-title--month-day-year</span>
            </p>
            <p></p>
            <p>
              If the mix's title is <b>Terraformer</b>, and the mix's date is{' '}
              <b>05-10-2019</b>:
            </p>
            <pre>Mix Unique UID: letargo--10-18-2016</pre>
            <h4 className="title is-size-4">Untitled Mix</h4>
            <p className="subtitle is-size-6">
              Suggested UID Format:{' '}
              <span className="is-family-code">mix-title--month-day-year</span>
            </p>
            <p>Example</p>

            <pre>dj-jazzabella-09-10-2019</pre>
          </div>
        </div>
      </section>

      <section className="section container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content text-block">
            <h3 className="title is-family-code">Mix Unique UID</h3>
            <p className="subtitle">Required</p>
            <p>
              UID is short for <b>unique identifier</b>.
            </p>
            <p>
              It's extremely important to create a proper UID
              <b> the first time you publish a CMS entry</b> because Prismic
              keeps a history of all the previous UIDs for a given document to
              ensure that old links are not broken. The document will always be
              returned even when searching for it using an older UID.
            </p>
            <p className="text-block">
              <a
                href="https://user-guides.prismic.io/en/articles/383719-uid"
                rel="noopener"
                target="_blank"
              >
                UID | Prismic Help Center
              </a>
            </p>
          </div>

          <div className="column is-12 content">
            <p className="title is-size-4">Titled Mix</p>
            <p className="subtitle is-size-6">
              Suggested Format:{' '}
              <span className="is-family-code">mix-title--month-day-year</span>
            </p>
            <p>Example</p>
            <p>Mix Title: Letargo; Mix Date: 10-18-2016</p>
            <pre>Mix Unique UID: letargo--10-18-2016</pre>
            <p className="title is-size-4">Untitled Mix</p>
            <p className="subtitle is-size-6">
              Suggested Format: resident-names--month-day-year
            </p>
            <p>Example</p>

            <pre>dj-jazzabella-09-10-2019</pre>
          </div>
        </div>
      </section>
      <HMBKFooter isFluid={true} renderTopButton={true} />
    </main>
  )
}
