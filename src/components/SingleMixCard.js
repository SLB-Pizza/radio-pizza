import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'
import NanoClamp from 'nanoclamp'
import { MixPlayOverlay, TagButtons } from './index'
import {
  getResidentString,
  formatDateTime,
  mappableDataFilter,
  linkResolver,
} from '../utils'

/**
 * @category Utilities
 * @function SingleMixCard
 * @param {Object} props
 * @property {String} props.date - archived mix's date
 * @property {String} props.url - url of the archived mix to play
 * @property {?String} props.title - Mix titles are optional, string of residents will be used to label mix if not present
 * @property {Object[]} props.residents - Array of data objects containing the mix's resident data
 * @property {Object} props.img - object containing the different sizes of a mix's image
 * @property {String[]} props.tags - the mix's tags
 * @property {String} props.columnLayout - string detailing the column layout across different responsive breakpoints @see {@link https://bulma.io/documentation/columns/sizes/ bulma.io column sizing}
 * @property {?String} props.path - optional string passed down only by {@link ResidentTemplate} for use with {@link linkResolver}
 * @returns {jsx}
 */
function SingleMixCard({ mixData, columnLayout, path }) {
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

  const mixDate = formatDateTime(mix_date, 'year-month-day') ?? 'no date'

  const mixResidentsString = getResidentString(featured_residents)

  return (
    <article className={columnLayout}>
      <div className="card">
        <MixPlayOverlay
          url={mix_link}
          title={mix_title}
          residents={mixResidentsString}
          img={mix_image}
          wrapperClassName="card-image"
        />

        <div className="card-content">
          <div className="mix-card-sizing">
            {/**
             * mix_title !== null : format mix_title under list of residents
             * mix_title === null : format list of residents as mix_title
             */
            mix_title !== null ? (
              <div className="mix-text">
                <Link to={linkResolver(linkTo)}>
                  <NanoClamp
                    className="subtitle is-size-7 has-text-grey-lighter"
                    is="p"
                    lines={2}
                    text={`${mixDate}  ${mixResidentsString}`}
                  />
                  <NanoClamp
                    className="title is-size-6"
                    is="p"
                    lines={2}
                    text={mix_title}
                  />
                </Link>
              </div>
            ) : (
              <div className="mix-text">
                <Link to={linkResolver(linkTo)}>
                  <p className="subtitle is-size-7">{mixDate}</p>
                  <NanoClamp
                    className="title is-size-6"
                    is="p"
                    lines={2}
                    text={`${mixResidentsString}`}
                  />
                </Link>
              </div>
            )}
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
