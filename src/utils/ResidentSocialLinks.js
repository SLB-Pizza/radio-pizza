import PropTypes from 'prop-types'
import React from 'react'
import { IconMaker } from './index'

/**
 * Function that returns a column an icon that links to the resident's appropriate social media page.
 * @category Site Elements
 * @function ResidentSocialLinks
 * @param {string} url - link to the resident's page on a platform e.g.bandcamp, soundcloud, mixcloud, etc.
 * @param {icon} platform - name of the corresponding FontAwesomeIcon
 * @returns {jsx}
 *
 * @see {@link https://fontawesome.com/how-to-use/on-the-web/using-with/react#using Using Icons: Font Awesome Icons on the web}
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
    case 'Youtube':
      icon = ['fab', 'youtube']
      break
    default:
      return icon
  }

  return (
    <div className="column resident-links__icon">
      <IconMaker iconToUse={icon} linkAddress={url} />
    </div>
  )
}

ResidentSocialLinks.propTypes = {
  platform: PropTypes.string,
  url: PropTypes.string,
}

export default ResidentSocialLinks
