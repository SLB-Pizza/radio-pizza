import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'
import { TopNav, BottomNav, useSiteMetadata } from '../components'
import { GlobalStateContext } from '../context/GlobalContextProvider'
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
   * Process `globalState` to derive Helmet information based on changes in state.
   * NO DEFAULT MIX ON PAGE
   *    NO LIVESTREAM
   *      "Half Moon | Ears to the concrete."
   *    HAS LIVESTREAM
   *      "ON AIR | Marquee Info | Half Moon"
   *    PLAYING LIVESTREAM
   *      "LIVE | Marquee Info | Half Moon"
   * HAS DEFAULT MIX ON PAGE LOAD
   *    NO LIVESTREAM
   *      "Title - Resident | Half Moon"
   *    HAS LIVESTREAM
   *      "Title - Resident | Half Moon | ON AIR"
   *    PLAYING LIVESTREAM
   *      "LIVE | Marquee Info | Half Moon"
   *
   * LISTENING PRERECORDED
   *    NO LIVESTREAM
   *      "Title - Resident | Half Moon"
   *    HAS LIVESTREAM
   *      "Title - Resident | Half Moon | ON AIR"
   *
   * PLAYING LIVESTREAM
   *   "LIVE | Marquee Info | Half Moon"
   * @category useEffect
   * @name processNowPlayingInfo
   */
  useEffect(() => {
    const processNowPlayingInfo = () => {
      if (globalState) {
        let titling = ''

        if (live) {
          titling += 'ON AIR | '
        }

        // if() {

        // }
        if (title) {
          titling += `${title}`
          if (resident) {
            titling += ` - ${resident}`
          }
        }

        setNowPlayingInfo(titling)
      }
    }
    processNowPlayingInfo()
  }, [title, resident, live])

  return (
    <>
      <Helmet defer={false}>
        <html lang="en" />
        <title>
          {nowPlayingInfo
            ? `${nowPlayingInfo} | ${siteTitle}`
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
