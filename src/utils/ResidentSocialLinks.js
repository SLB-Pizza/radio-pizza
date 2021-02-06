import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
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

/**
 * Function that returns a column an icon that links to the resident's appropriate social media page.
 * @category Site Elements
 * @function ResidentSocialLinks
 * @param {string} url - link to the resident's page on a platform e.g.bandcamp, soundcloud, mixcloud, etc.
 * @param {icon} platform - name of the corresponding FontAwesomeIcon
 * @returns {jsx}
 */
function ResidentSocialLinks({ url, platform }) {
  /**
   * Default the icon to a generic globe icon
   */
  let icon = 'globe'

  switch (platform) {
    case 'Personal Site':
      break // Use the globe
    case 'Apple Music':
      icon = ['fab', 'apple']
      break
    case 'Bandcamp':
      icon = ['fab', 'bandcamp']
      break
    case 'Facebook':
      icon = ['fab', 'facebook-square']
      break
    case 'Instagram':
      icon = ['fab', 'instagram']
      break
    case 'Mixcloud':
      icon = ['fab', 'mixcloud']
      break
    case 'Soundcloud':
      icon = ['fab', 'soundcloud']
      break
    case 'Spotify':
      icon = ['fab', 'spotify']
      break
    case 'Twitter':
      icon = ['fab', 'twitter']
      break
    default:
      return icon
  }

  return (
    <div className="column social-links">
      <a href={url} rel="noopener" target="_blank">
        <span className="icon">
          <Icon icon={icon} size="lg" className="icon-color" />
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
