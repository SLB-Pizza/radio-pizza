import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { RichText } from 'prismic-reactjs'
import {
  FallbackImage,
  ResidentSocialLinks,
  mappableDataFilter,
} from '../utils'
import NanoClamp from 'nanoclamp'

/**
 * @category Layout Helper
 * @function ResidentBio
 * @param {object} residentBioData - the data object coming from Prismic CMS that contains all data needed to build the bio section of the individual `/residents/:uid`  page
 * @returns {jsx}
 */
function ResidentBio({ residentBioData }) {
  const [socialMediaData, setMediaData] = useState([])

  const {
    resident_image,
    resident_name,
    resident_status,
    resident_blurb,
    social_media,
  } = residentBioData

  /**
   * Once residentBioData is received, check mappable data subarrays with {@link mappableDataFilter}.
   *
   * If the data subarray has no valid entries
   * --> returns 0
   * If the data subarray has valid entries
   * --> returns a filtered array of only the valid entries
   */
  useEffect(() => {
    const bioDataCheck = () => {
      if (residentBioData) {
        // A nested social_media object requires 2 key-value pairs to be valid
        const socialMediaCheck = mappableDataFilter(social_media, 2)

        // setMediaData to result socialMediaCheck array if array has valid entries
        if (socialMediaCheck) {
          setMediaData(socialMediaCheck)
        }
      }
    }
    return bioDataCheck()
  }, [residentBioData])

  return (
    <div className="column is-3-desktop is-4-tablet is-12-mobile sticky-bio">
      <div className="columns is-multiline">
        <div className="column is-12">
          <figure className="image is-1by1">
            {resident_image ? (
              <img src={resident_image.url} alt={resident_image.alt} />
            ) : (
              <FallbackImage />
            )}
          </figure>
        </div>
        <div className="column is-12 content">
          <NanoClamp
            className="title is-size-4-desktop is-size-5-touch"
            is="p"
            lines={2}
            text={resident_name}
          />
          <p className="subtitle is-size-6-desktop is-size-7-touch">
            {resident_status}
          </p>
          {/* <pre>{JSON.stringify(resident_blurb, null, 2)}</pre> */}
          {RichText.render(resident_blurb)}
        </div>
      </div>
      {socialMediaData.length && (
        <div className="columns is-mobile is-multiline is-vcentered">
          {social_media.map(
            ({ resident_social_page, resident_social_link }, index) => (
              <ResidentSocialLinks
                key={`social-link-${index}-${resident_social_page}`}
                url={resident_social_link.url}
                platform={resident_social_page}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}

export default ResidentBio

ResidentBio.propTypes = {
  residentData: PropTypes.shape({
    resident_image: PropTypes.shape({
      dimensions: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string,
      }),
    }).isRequired,
    resident_name: PropTypes.string,
    resident_status: PropTypes.string,
    resident_blurb: PropTypes.arrayOf(PropTypes.object),
    social_media: PropTypes.arrayOf(PropTypes.object),
  }),
}
