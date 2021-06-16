import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import { GlobalStateContext } from '../context/GlobalContextProvider'
import { TopNav, BottomNav, useSiteMetadata } from '../components'
import { setHelmetSiteTitling } from '../utils'
import '../styles/index.scss'

export default function TemplateWrapper({ children }) {
  const {
    title: siteTitle,
    description,
    siteUrl,
    twitterUsername,
  } = useSiteMetadata()
  const globalState = useContext(GlobalStateContext)
  const { title, resident, live } = globalState
  const [nowPlayingInfo, setNowPlayingInfo] = useState(null)

  /**
   * @category useEffect
   * @name processNowPlayingInfo
   */
  useEffect(() => {
    const processNowPlayingInfo = () => {
      if (globalState) {
        let titling = setHelmetSiteTitling(globalState)
        setNowPlayingInfo(titling)
      }
    }
    processNowPlayingInfo()
  }, [globalState])

  return (
    <>
      <Helmet defer={false}>
        <html lang="en" />
        <title>
          {nowPlayingInfo
            ? `${nowPlayingInfo}`
            : `${siteTitle} | Ears to the concrete.`}
        </title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#f600ff" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/head/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/head/favicon-16x16.png`}
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/head/favicon-32x32.png`}
          sizes="32x32"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#f600ff"
        />

        <meta property="og:type" content="music.radio_station" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/Halfmoon-blk-bg.png`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content={twitterUsername} />
        <meta
          name="twitter:image"
          content={`${withPrefix('/')}img/Halfmoon-blk-bg.png`}
        />
      </Helmet>
      <TopNav />
      {children}
      <BottomNav />
    </>
  )
}
