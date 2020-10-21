import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faApple,
  faBandcamp,
  faFacebookSquare,
  faInstagram,
  faMixcloud,
  faSoundcloud,
  faSpotify,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

/**
 * Function that returns a column an icon that links to the resident's appropriate social media page.
 * @category Site Elements
 * @subcategory Layout Helper
 * @function
 * @function ResidentSocialLinks
 * @param {string} url - link to the resident's page on a platform e.g.bandcamp, soundcloud, mixcloud, etc.
 * @param {icon} platform - name of the corresponding FontAwesomeIcon
 * @returns {jsx}
 */
function ResidentSocialLinks({ url, platform }) {
  /**
   * Default the icon to a generic globe icon
   */
  let icon = faGlobe

  switch (platform) {
    case 'Personal Site':
      break // Use the globe
    case 'Apple Music':
      icon = faApple
      break
    case 'Bandcamp':
      icon = faBandcamp
      break
    case 'Facebook':
      icon = faFacebookSquare
      break
    case 'Instagram':
      icon = faInstagram
      break
    case 'Mixcloud':
      icon = faMixcloud
      break
    case 'Soundcloud':
      icon = faSoundcloud
      break
    case 'Spotify':
      icon = faSpotify
      break
    case 'Twitter':
      icon = faTwitter
      break
    default:
      return icon
  }

  return (
    <div className="column social-links">
      <a href={url} rel="noopener" target="_blank">
        <span className="icon">
          <FontAwesomeIcon icon={icon} size="lg" className="icon-color" />
        </span>
      </a>
    </div>
  )
}

ResidentSocialLinks.propTypes = {
  platform: PropTypes.string,
  url: PropTypes.string,
}

export default ResidentSocialLinks
