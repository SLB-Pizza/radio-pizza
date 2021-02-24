import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import NanoClamp from 'nanoclamp'
import { MixPlayOverlay, TagButtons } from './index'
import {
  getResidentString,
  formatDateTime,
  IconMaker,
  linkResolver,
  mixLinkIconInfo,
} from '../utils'

/**
 * @category Utilities
 * @function SingleMixCard
 * @param {Object} mixData
 * @property {String} mixData.date - archived mix's date
 * @property {String} mixData.url - url of the archived mix to play
 * @property {?String} mixData.title - Mix titles are optional, string of residents will be used to label mix if not present
 * @property {Object[]} mixData.residents - Array of data objects containing the mix's resident data
 * @property {Object} mixData.img - object containing the different sizes of a mix's image
 * @property {String[]} mixData.tags - the mix's tags
 * @param {String} columnLayout - string detailing the column layout across different responsive breakpoints @see {@link https://bulma.io/documentation/columns/sizes/ bulma.io column sizing}
 * @param {?String} path - optional string passed down only by {@link ResidentTemplate} for use with {@link linkResolver}
 * @returns {jsx}
 */
function SingleMixCard({ mixData, columnLayout, path }) {
  const [mixDateStr, setMixDateStr] = useState(null)
  const [mixResidentStr, setMixResidentStr] = useState(null)
  const [mixDateResStr, setMixDateResStr] = useState(null)
  const [mixIconInfo, setMixIconInfo] = useState(null)

  const {
    _meta,
    mix_date,
    mix_image,
    mix_link,
    mix_title,
    featured_residents,
  } = mixData

  const { uid, type, tags } = _meta

  const linkTo = {
    type,
    uid,
  }

  useEffect(() => {
    const processMixData = () => {
      let dateResStr
      /**
       * If mix_date is null, return no_date; else return a formatted date str
       */
      const mixDateString = !mix_date
        ? 'no date'
        : formatDateTime(mix_date, 'year-month-day')

      const mixResidentsString = getResidentString(featured_residents)
      const mixIconDetails = mixLinkIconInfo(mix_link)

      if (mixResidentsString === '') {
        dateResStr = mixDateString
      } else {
        dateResStr = `${mixDateString} | ${mixResidentsString}`
      }

      setMixDateStr(mixDateString)
      setMixResidentStr(mixResidentsString)
      setMixDateResStr(dateResStr)
      setMixIconInfo(mixIconDetails)
    }
    return processMixData()
  }, [])

  return (
    <article className={columnLayout}>
      <div className="card">
        <MixPlayOverlay
          url={mix_link}
          title={mix_title}
          residents={mixResidentStr}
          img={mix_image}
          wrapperClassName="card-image"
        />

        <div className="card-content">
          <div className="mix-card-sizing">
            <div className="mix-details">
              {mixIconInfo && (
                <IconMaker
                  spanClass={'mix-icon icon is-medium'}
                  {...mixIconInfo}
                />
              )}
              {/**
               * mix_title !== null : format mix_title under list of residents
               * mix_title === null : format list of residents as mix_title
               */
              mix_title !== null ? (
                <div className="mix-text">
                  <Link to={linkResolver(linkTo)}>
                    {mixDateResStr && (
                      <NanoClamp
                        className="subtitle is-size-7 has-text-grey-lighter"
                        is="p"
                        lines={2}
                        text={mixDateResStr}
                      />
                    )}
                    {mix_title && (
                      <NanoClamp
                        className="title is-size-6"
                        is="p"
                        lines={2}
                        text={mix_title}
                      />
                    )}
                  </Link>
                </div>
              ) : (
                <div className="mix-text">
                  <Link to={linkResolver(linkTo)}>
                    {mixDateStr && (
                      <p className="subtitle is-size-7">{mixDateStr}</p>
                    )}
                    {mixResidentStr && (
                      <NanoClamp
                        className="title is-size-6"
                        is="p"
                        lines={2}
                        text={mixResidentStr}
                      />
                    )}
                  </Link>
                </div>
              )}
            </div>

            <TagButtons tagsArray={tags} />
          </div>
        </div>
      </div>
    </article>
  )
}

SingleMixCard.propTypes = {
  columnLayout: PropTypes.string.isRequired,
  mixData: PropTypes.shape({
    _meta: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
      uid: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        'cms_guide',
        'event',
        'feature',
        'mix',
        'page',
        'resident',
      ]),
    }),
    mix_date: PropTypes.string.isRequired,
    mix_title: PropTypes.string,
    mix_link: PropTypes.string.isRequired,
    mix_image: PropTypes.shape({
      dimensions: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }),
      alt: PropTypes.string,
      copyright: PropTypes.string,
      url: PropTypes.string.isRequired,
      medium: PropTypes.object,
      now_playing: PropTypes.object,
      featured_residents: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  path: PropTypes.string,
}

export default SingleMixCard
