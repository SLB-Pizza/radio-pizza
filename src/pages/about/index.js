import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../../components/SiteMetadata'

function AboutIndexPage() {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()

  return (
    <div className="container is-fluid full-height-page">
      <Helmet defer={false}>
        <html lang="en" />
          <title>About {title}</title>
          <meta name="description" content="HalfMoon Radio About Page" />
          <meta name="theme-color" content="#f600ff" />
          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={`About ${title}`} />
          <meta property="og:url" content={`${siteUrl}/about`} />
          <meta
            property="og:image"
            content={`/img/HalfMoon-3.png`}
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content="HalfMoon Radio About Page" />
          <meta name="twitter:site" content={twitterUsername} />
          <meta name="twitter:image" content={`/img/HalfMoon-3.png`} />
      </Helmet>
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

            <p className="display-text is-size-5">Team</p>
            <p>Surf Allah – Owner & Founder</p>
            <p>Edrick Chu – Head of Marketing & Partnerships</p>
            <p className="display-text is-size-5">Contact</p>
            <p>Business: business@halfmoonbk.com</p>
            <p>Info: info@halfmoonbk.com</p>
            <p className="display-text is-size-5">Site</p>
            <p>Designed by Christian Mejia</p>
            <p>Programmed by Christian Mejia & Richard Dominguez</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutIndexPage

// export const query = graphql``;
