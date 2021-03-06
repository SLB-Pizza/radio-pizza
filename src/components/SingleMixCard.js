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
 * Returns a Mix card with a clickable play button to start the mix in {@link RadioPlayer}, an icon made by {@link IconMaker} that links out to the original mix's page
 * @category Media Card
 * @function SingleMixCard
 * @param {Object} data - this mix's data from Prismic
 * @property {String} data.mix_date - this mix's date
 * @property {String} data.mix_link - this mix's URL; also used by {@link IconMaker} to generate the linking icon for the card
 * @property {?String} data.mix_title - Mix titles are optional, string of residents will be used to label mix if not present; see `useEffect` and `render` comments
 * @property {Object[]} data.featured_residents - Array of data objects containing the mix's resident data
 * @property {Object} data.mix_image - object containing the different sizes of a mix's image
 * @property {String[]} data._meta.tags - the mix's tags; allowed to be empty array
 * @param {String} columnLayout - string detailing the column layout across different responsive breakpoints
 * @param {?Boolean} onMixesPage - optional boolean prop received as `true` from only two layout components: {@link DisplayFetchedTaggedMixes} and {@link AllMixesLayout}, both of which only render on {@link RadioIndexPage}. Passed to {@link TagButtons} for use with {@link tagNavigateAndDispatch}.
 * @returns {jsx}
 * @see {@link https://bulma.io/documentation/columns/sizes/ bulma.io column sizing}
 */
function SingleMixCard({ data, columnLayout, onMixesPage }) {
  const [mixDateStr, setMixDateStr] = useState(null)
  const [mixResidentsStr, setMixResidentsStr] = useState(null)
  const [mixDateResStr, setMixDateResStr] = useState(null)
  const [mixIconInfo, setMixIconInfo] = useState(null)
  const [radioPlayerInfo, setRadioPlayerInfo] = useState(null)

  const {
    _meta,
    mix_date,
    mix_image,
    mix_link,
    mix_title,
    featured_residents,
  } = data

  const { uid, type, tags } = _meta

  // Disabled since MixTemplate is temp. disabled.
  // const linkTo = {
  //   type,
  //   uid,
  // };

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

      /**
       * Used as details field when mix_title doesn't exist
       */
      setMixDateStr(mixDateString)

      /**
       * Used as mix titling when mix_title doesn't exist
       */
      setMixResidentsStr(mixResidentsString)

      /**
       * Used as details when mix_title exists
       */
      setMixDateResStr(dateResStr)

      /**
       * Value passed as props to {@link IconMaker} to make icons linking externally to mix pages
       */
      setMixIconInfo(mixIconDetails)

      /**
       * Same as render ternary.
       * mix_title !== null :
       *    Details: use combined date and resident str: dateResStr
       *    Titling: mix_title
       * mix_title === null :
       *    Details: use formatted mix_date str: mixDateString
       *    Titling: format list of residents: mixResidentsString
       */
      if (mix_title !== null) {
        setRadioPlayerInfo({
          details: dateResStr,
          titling: mix_title,
        })
      } else {
        setRadioPlayerInfo({
          details: mixDateString,
          titling: mixResidentsString,
        })
      }
    }
    return processMixData()
  }, [])

  return (
    <article className={columnLayout}>
      <div className="card">
        {radioPlayerInfo && (
          <MixPlayOverlay
            url={mix_link}
            title={radioPlayerInfo.titling}
            residents={radioPlayerInfo.details}
            img={mix_image}
            wrapperClassName="card-image"
          />
        )}

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
               * mix_title !== null :
               *    Details: use combined date and resident str: mixDateResStr
               *    Titling: mix_title
               * mix_title === null :
               *    Details: use formatted mix_date str: mixDateStr
               *    Titling: format list of residents: mixResidentsStr
               */
              mix_title !== null ? (
                <div className="mix-text">
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
                </div>
              ) : (
                <div className="mix-text">
                  {mixDateStr && (
                    <p className="subtitle is-size-7">{mixDateStr}</p>
                  )}
                  {mixResidentsStr && (
                    <NanoClamp
                      className="title is-size-6"
                      is="p"
                      lines={2}
                      text={mixResidentsStr}
                    />
                  )}
                </div>
              )}
            </div>

            <TagButtons tagsArray={tags} onMixesPage={onMixesPage} />
          </div>
        </div>
      </div>
    </article>
  )
}

SingleMixCard.propTypes = {
  columnLayout: PropTypes.string.isRequired,
  data: PropTypes.shape({
    _meta: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.string),
      uid: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['mix']),
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
  location: PropTypes.string,
}

export default SingleMixCard
