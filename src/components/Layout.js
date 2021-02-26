import React from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import useSiteMetadata from './SiteMetadata'
import { TopNav, BottomNav } from '../components'
import '../styles/index.scss'

const TemplateWrapper = ({ children }) => {
  const { title, description, siteUrl, twitterUsername } = useSiteMetadata()
  return (
    <>
      <Helmet defer={false}>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#f600ff" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/sound-icon.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/sound-icon-small.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#f600ff"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/HalfMoon-3.png`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content={twitterUsername} />
        <meta
          name="twitter:image"
          content={`${withPrefix('/')}img/HalfMoon-3.png`}
        />
      </Helmet>
      <TopNav />
      {children}
      <BottomNav />
    </>
  )
}

export default TemplateWrapper
